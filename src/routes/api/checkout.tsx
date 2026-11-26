import { createFileRoute } from '@tanstack/react-router'
import Stripe from 'stripe'
import { and, eq, gt, sql } from 'drizzle-orm'

import { products, sellingPrints, sellingOriginals } from '@/siteinfo/products' // adjust path
import { getDb} from '@/db' // adjust to wherever your drizzle instance lives
import { couponCodes, originalsStock } from '@/db/schema' // adjust path
import {SALE, applySale} from "@/components/ui/sale"

const stripe = new Stripe(
  process.env.NODE_ENV === 'development'
    ? process.env.STRIPE_SECRET_TEST_KEY ?? ''
    : process.env.STRIPE_SECRET_KEY ?? ''
)

const db = getDb();

const SHIPPING_COUNTRIES = [
  // North America
  'US', 'CA', 'MX',
  // UK and Europe
  'GB', 'IE', 'FR', 'DE', 'ES', 'IT', 'NL', 'BE', 'PT', 'AT', 'CH',
  'SE', 'NO', 'DK', 'FI',
  // Caribbean
  'JM', 'BS', 'BB', 'TT',
  // Asia-Pacific
  'AU', 'NZ', 'JP', 'SG',
] as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[]


function resolveItem(item: any) {
  const { productType, slug, selectedSize } = item ?? {}
  if (typeof slug !== 'string') throw new Error('Bad item')

  if (productType === 'print') {
    const p = products.prints.find((p) => p.slug === slug)
    if (!p || !sellingPrints.includes(p.name)) throw new Error('Not for sale')
    const option = p.prints.find((o) => o.sizes === selectedSize)
    if (!option) throw new Error('Invalid size')
    return {
      productType: 'print' as const,
      name: p.name,
      slug: p.slug,
      image: p.productImage,
      size: option.sizes as string | undefined,
      unitPrice: applySale(option.price, p.slug),
    }
  }

  if (productType === 'original') {
    const p = products.paintings.find((p) => p.slug === slug)
    if (!p || !sellingOriginals.includes(p.name)) throw new Error('Not for sale')
    return {
      productType: 'original' as const,
      name: p.name,
      slug: p.slug,
      image: p.productImage,
      size: undefined as string | undefined,
      unitPrice: applySale(p.price, p.slug),
    }
  }

  throw new Error('Unknown product type')
}

async function restoreStock(names: string[]) {
  for (const name of names) {
    await db
      .update(originalsStock)
      .set({ stock: sql`${originalsStock.stock} + 1` })
      .where(eq(originalsStock.name, name))
  }
}

export const Route = createFileRoute('/api/checkout')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const reserved: string[] = [] // originals we've decremented, for rollback
        try {
          const { cart, code } = await request.json()

          if (!Array.isArray(cart) || cart.length === 0 || cart.length > 20) {
            return Response.json({ error: 'Invalid cart' }, { status: 400 })
          }

          // 1. Resolve everything from your own data, never from client prices
          const resolved = cart.map((item: any) => {
            const r = resolveItem(item)
            const qty = Number.isInteger(item.quantity) ? item.quantity : 0
            if (qty < 1 || qty > 10) throw new Error('Invalid quantity')
            if (r.productType === 'original' && qty !== 1) throw new Error('Invalid quantity')
            return { ...r, qty }
          })

          // 2. Discount code, validated against your coupon_codes table
          let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined
          if (code) {
            const [offer] = await db
              .select()
              .from(couponCodes)
              .where(eq(couponCodes.code, String(code).trim().toUpperCase()))
              .limit(1)

            // assumes offer is stored as a fraction, e.g. 0.10 = 10% off
            const percent = offer ? Math.round(Number(offer.offer) * 10000) / 100 : 0
            if (!offer || percent <= 0 || percent > 100) {
              return Response.json({ error: 'Invalid discount code' }, { status: 400 })
            }

            const coupon = await stripe.coupons.create({
              percent_off: percent,
              duration: 'once',
              max_redemptions: 1,
            })
            discounts = [{ coupon: coupon.id }]
          }

          // 3. Atomically reserve originals (this is both the check and the decrement)
          for (const r of resolved) {
            if (r.productType !== 'original') continue

            const [row] = await db
              .select()
              .from(originalsStock)
              .where(and(eq(originalsStock.name, r.name), gt(originalsStock.stock, 0)))
              .limit(1)

            if (!row) {
              return Response.json({ error: `${r.name} is no longer available` }, { status: 409 })
            }
}

          // 4. Create the Checkout Session
          const baseUrl =
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000'
              : process.env.SITE_URL

          const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: resolved.map((r) => ({
              price_data: {
                currency: 'usd',
                product_data: {
                  name: `${r.name}${r.size ? ` (${r.size})` : ''}`,
                  images: [`${process.env.SITE_URL}${r.image}`],
                },
                unit_amount: Math.round(r.unitPrice * 100),
              },
              quantity: r.qty,
            })),
            discounts,
            shipping_address_collection: { allowed_countries: SHIPPING_COUNTRIES },
            success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/cart`,
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
            metadata: {
              // t = type (p/o), s = slug, z = size, q = qty. Short keys to stay under Stripe's 500 char limit.
              cart: JSON.stringify(
                resolved.map((r) => ({
                  t: r.productType === 'print' ? 'p' : 'o',
                  s: r.slug,
                  z: r.size,
                  q: r.qty,
                }))
              ),
            },
          })

          return Response.json({ url: session.url })
        } catch (e) {
          await restoreStock(reserved)
          console.error(e)
          return Response.json({ error: 'checkout failed' }, { status: 500 })
        }
      },
    },
  },
})