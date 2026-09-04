import { createFileRoute } from '@tanstack/react-router'
import { decrementStockIfAvailable } from '#/serverFunctions/stock';
import { getStock } from '@/serverFunctions/stock';
import Stripe from 'stripe'

const stripe = new Stripe(
  process.env.NODE_ENV === 'development'
    ? process.env.STRIPE_SECRET_TEST_KEY ?? ''
    : process.env.STRIPE_SECRET_KEY ?? ''
)

export const Route = createFileRoute('/api/checkout')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { cart } = await request.json()

          for (const item of cart) {
      const stock = await getStock({ data: item.id })
      if (stock === null || stock <= 0) {
        return Response.json(
          { error: `${item.name} is no longer available` },
          { status: 409 }
        )
      }
    }

          const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: cart.map((item: any) => ({
              price_data: {
                currency: 'usd',
                product_data: {
                  name: `${item.name}${item.selectedSize ? ` (${item.selectedSize})` : ''}`,
                },
                unit_amount: Math.round(item.price * 100),
              },
              quantity: item.quantity,
            })),
            success_url: `${process.env.SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.SITE_URL}/cart`,
             metadata: {
    cart: JSON.stringify(
      cart.map((item: any) => ({ id: item.id, size: item.selectedSize, qty: item.quantity }))
    ),
  },
          })



          return Response.json({ url: session.url })
        } catch (e) {
          console.error(e)
          return Response.json({ error: 'checkout failed' }, { status: 500 })
        }
      },
    },
  },
})