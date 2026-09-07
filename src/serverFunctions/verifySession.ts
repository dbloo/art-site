
import { createServerFn } from '@tanstack/react-start'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY ?? process.env.STRIPE_SECRET_KEY ?? '')

export const verifyCheckoutSession = createServerFn({ method: 'GET' })
  .validator((sessionId: string) => sessionId)
  .handler(async ({ data: sessionId }) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      return { paid: session.payment_status === 'paid' }
    } catch (error) {
      console.error('Error verifying checkout session:', error)
      return { paid: false }
    }
  })