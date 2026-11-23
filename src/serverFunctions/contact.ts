// src/serverFunctions/contact.ts
import { createServerFn } from '@tanstack/react-start'
import { Resend } from 'resend'
import { contactSchema } from '@/routes/contact'

const resend = new Resend(process.env.RESEND_KEY)

// Where messages are delivered. Use an inbox you actually read.
const EMAIL = 'Dominic Bloomfield Art <art@dominicbloomfield.com>'

// The visitor's text goes into HTML, so escape it.
const esc = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export const submitContactForm = createServerFn({ method: 'POST' }).handler(
  async (ctx: any) => {
    // Re-validate on the server: never trust that the browser did it.
    const { name, email, message } = contactSchema.parse(ctx.data)

   

    // Strip line breaks from anything that ends up in a header.
    const safeName = name.replace(/[\r\n]+/g, ' ')

    const html = `
      <div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;color:#000">
        <h1 style="font-size:28px;margin:0 0 24px">
          <span style="background:#FADE3E;padding:0 6px">New message</span>
        </h1>

        <p style="margin:0 0 4px;font-size:14px;color:#6b6b6b">From</p>
        <p style="margin:0 0 24px;font-size:16px">
          ${esc(name)}<br/>
          <a href="mailto:${esc(email)}" style="color:#000">${esc(email)}</a>
        </p>

        <p style="margin:0 0 4px;font-size:14px;color:#6b6b6b">Message</p>
        <p style="margin:0;font-size:16px;line-height:1.6;white-space:pre-wrap">${esc(message)}</p>

        <p style="margin:32px 0 0;font-size:13px;color:#6b6b6b">
          Hit reply to respond directly to ${esc(name)}.
        </p>
      </div>`

    const { error } = await resend.emails.send({
      from: EMAIL,
      to: [EMAIL],
      // Replying in your inbox goes straight to the visitor.
      replyTo: email,
      subject: `New message from ${safeName}`,
      html,
      text: `From: ${name} <${email}>\n\n${message}`,
    })

    if (error) {
      console.error('Failed to send contact email:', error)
      throw new Error('Failed to send message')
    }

    return { success: true } as const
  },
)
