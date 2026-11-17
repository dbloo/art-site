import { createFileRoute } from '@tanstack/react-router'
import { decrementStockIfAvailable } from '@/serverFunctions/stock'
import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(
  process.env.STRIPE_SECRET_TEST_KEY ?? process.env.STRIPE_SECRET_KEY ?? '',
)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
const resend = new Resend(process.env.RESEND_KEY)

const OWNER_EMAIL = process.env.ORDER_NOTIFY_EMAIL ?? 'art@dominicbloomfield.com'
const FROM = 'Dominic Bloomfield Art <art@dominicbloomfield.com>'

/* ---------- Email helpers ---------- */

// Customer-supplied text goes into HTML, so escape it.
const esc = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const money = (amount: number | null | undefined, currency: string | null) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: (currency ?? 'usd').toUpperCase(),
  }).format((amount ?? 0) / 100)

function formatAddress(a?: Stripe.Address | null) {
  if (!a) return 'No shipping address collected'
  return [
    a.line1,
    a.line2,
    [a.city, a.state, a.postal_code].filter(Boolean).join(', '),
    a.country,
  ]
    .filter(Boolean)
    .map(esc)
    .join('<br/>')
}

async function sendOrderEmail(
  sessionId: string,
  event: Stripe.Event,
  stockIssueIds: number[],
) {
  // The event only holds a summary, so fetch the full session with its items.
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items'],
  })

  // Newer Stripe API versions move shipping under collected_information.
  const shipping =
    (session as any).collected_information?.shipping_details ??
    (session as any).shipping_details

  const customer = session.customer_details
  const items = session.line_items?.data ?? []
  const total = money(session.amount_total, session.currency)

  const rows = items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee">${esc(i.description)}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center">${i.quantity ?? 1}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${money(i.amount_total, session.currency)}</td>
      </tr>`,
    )
    .join('')

  const paymentId =
    typeof session.payment_intent === 'string' ? session.payment_intent : null
  const base = `https://dashboard.stripe.com/${event.livemode ? '' : 'test/'}payments`
  const dashboardUrl = paymentId ? `${base}/${paymentId}` : base

  const stockWarning = stockIssueIds.length
    ? `<p style="background:#FADE3E;padding:10px 12px;font-size:14px;margin:0 0 24px">
         <strong>Stock issue:</strong> couldn't decrement stock for item ID(s) ${stockIssueIds.join(', ')}. Check inventory.
       </p>`
    : ''

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;color:#000">
      <h1 style="font-size:28px;margin:0 0 4px">
        <span style="background:#FADE3E;padding:0 6px">New order</span>
      </h1>
      <p style="color:#6b6b6b;margin:0 0 24px">${total} total${event.livemode ? '' : ' (test mode)'}</p>

      ${stockWarning}

      <h2 style="font-size:16px;margin:0 0 8px">Items</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr style="text-align:left;color:#6b6b6b">
          <th style="padding-bottom:6px">Item</th>
          <th style="padding-bottom:6px;text-align:center">Qty</th>
          <th style="padding-bottom:6px;text-align:right">Amount</th>
        </tr>
        ${rows}
      </table>

      <h2 style="font-size:16px;margin:24px 0 8px">Customer</h2>
      <p style="margin:0;font-size:14px;line-height:1.6">
        ${esc(customer?.name ?? 'No name')}<br/>
        ${esc(customer?.email ?? 'No email')}
        ${customer?.phone ? `<br/>${esc(customer.phone)}` : ''}
      </p>

      <h2 style="font-size:16px;margin:24px 0 8px">Ship to</h2>
      <p style="margin:0;font-size:14px;line-height:1.6">
        ${shipping?.name ? `${esc(shipping.name)}<br/>` : ''}
        ${formatAddress(shipping?.address ?? customer?.address)}
      </p>

      <p style="margin:32px 0 0">
        <a href="${dashboardUrl}" style="color:#000">View in Stripe dashboard</a>
      </p>
    </div>`

  const { error } = await resend.emails.send(
    {
      from: FROM,
      to: [OWNER_EMAIL],
      replyTo: customer?.email ?? undefined,
      subject: `${event.livemode ? '' : '[TEST] '}New order: ${total}${
        customer?.name ? ` from ${customer.name}` : ''
      }`,
      html,
    },
    // Stripe can deliver the same event twice; this prevents duplicate emails.
    { idempotencyKey: `order-${event.id}` },
  )

  if (error) throw new Error(error.message)
    console.log("message sent")
}

/* ---------- Route ---------- */

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

          const cartItems: { id: number }[] = JSON.parse(
            session.metadata?.cart ?? '[]',
          )
          console.log('parsed cart items:', cartItems)

          // 1. Stock first (unchanged behavior), remembering any failures.
          const stockIssueIds: number[] = []
          for (const item of cartItems) {
            const ok = await decrementStockIfAvailable({ data: { id: item.id } })
            console.log(`decrement result for ${item.id}:`, ok)
            if (!ok) stockIssueIds.push(item.id)
          }

          // 2. Notify yourself. Failures are logged but NOT returned as errors:
          //    a non-200 response makes Stripe retry the whole event, which
          //    would decrement stock a second time.
          if (session.payment_status === 'paid') {
            try {
              await sendOrderEmail(session.id, event, stockIssueIds)
            } catch (err) {
              console.error('Failed to send order email:', err)
            }
          }
        } else {
          console.log('ignored event type:', event.type)
        }

        return new Response('ok', { status: 200 })
      },
    },
  },
})