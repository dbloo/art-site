import { createFileRoute } from '@tanstack/react-router'
import { getStock, decrementStockIfAvailable } from '@/serverFunctions/stock';

import Stripe from 'stripe'

const stripe = new Stripe(
  process.env.NODE_ENV === 'development'
    ? process.env.STRIPE_SECRET_TEST_KEY ?? ''
    : process.env.STRIPE_SECRET_KEY ?? ''
)

const SHIPPING_COUNTRIES = [
  // North America
  'US', 'CA', 'MX',
  // UK and Europe
  'GB', 'IE', 'FR', 'DE', 'ES', 'IT', 'NL', 'BE', 'PT', 'AT', 'CH',
  'SE', 'NO', 'DK', 'FI',
  // Caribbean (add the ones you ship to)
  'JM', 'BS', 'BB', 'TT',
  // Asia-Pacific
  'AU', 'NZ', 'JP', 'SG',
] as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[]

export const Route = createFileRoute('/api/checkout')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { cart } = await request.json()

          for (const item of cart) {

            if (item.productType == "original"){
      const stock = await getStock({ data: item.id })
      if (stock === null || stock <= 0) {
        return Response.json(
          { error: `${item.name} is no longer available` },
          { status: 409 }
        )
      }
    }
    }

          const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: cart.map((item: any) => ({
              price_data: {
                currency: 'usd',
                product_data: {
                  name: `${item.name}${item.selectedSize ? ` (${item.selectedSize})` : ''}`,
                  images: [`${process.env.SITE_URL}${item.productImage}`,]
                },
                unit_amount: Math.round(item.price * 100),
              },
              quantity: item.quantity,
            })),             
             shipping_address_collection: { allowed_countries: SHIPPING_COUNTRIES },
            success_url: `${process.env.NODE_ENV === "development" ? `http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}`: `${process.env.SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`}`,
            cancel_url: `${process.env.NODE_ENV === "development" ? `http://localhost:3000/cart`: `${process.env.SITE_URL}/cart`}`,
             metadata: {
    cart: JSON.stringify(
      cart.map((item: any) => ({ id: item.id, size: item.selectedSize, qty: item.quantity, img: item.productImage }))
    ),
  },
          })

          console.log(session.metadata)

          for(const item of cart) { if(item.productType == "original") { {decrementStockIfAvailable({data: item.id}) }}
}

          return Response.json({ url: session.url })
        } catch (e) {
          console.error(e)
          return Response.json({ error: 'checkout failed' }, { status: 500 })
        }
      },
    },
  },
})