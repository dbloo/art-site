import { createFileRoute } from '@tanstack/react-router'
import { decrementStockIfAvailable } from '@/serverFunctions/stock'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY ?? process.env.STRIPE_SECRET_KEY ?? '')
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export const Route = createFileRoute('/api/webhooks/stripe')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const sig = request.headers.get('stripe-signature')!
        const body = await request.text() 

        let event: Stripe.Event
        try {
          event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
        } catch (err) {
          console.error('Webhook signature verification failed', err)
          return new Response('Invalid signature', { status: 400 })
        }

        if (event.type === 'checkout.session.completed') {
  const session = event.data.object as Stripe.Checkout.Session
  console.log('metadata:', session.metadata)  

  const cartItems: { id: number }[] = JSON.parse(session.metadata?.cart ?? '[]')
  console.log('parsed cart items:', cartItems)

  for (const item of cartItems) {
    const ok = await decrementStockIfAvailable({ data: { id: item.id } })
    console.log(`decrement result for ${item.id}:`, ok)
  }
} else {
  console.log('ignored event type:', event.type)  
}

        return new Response('ok', { status: 200 })
      },
    },
  },
})