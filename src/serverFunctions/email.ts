import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { emailSubmissions } from '../db/schema'
import { getDb } from '../db'
import { render } from 'react-email'
import { z } from 'zod'
import { Resend } from 'resend'
import { WelcomeEmail } from '@/components/ui/emailtemplates'

const emailSchema = z.object({
  email: z.email('Please enter a valid email address.'),
})

const resend = new Resend(process.env.RESEND_KEY)
const db = getDb()

export const submitEmail = createServerFn({ method: 'POST' }).handler(
  async (ctx: any) => {
    const parsed = emailSchema.parse(ctx.data)

    const email = parsed.email.trim().toLowerCase()

    const existing = await db
      .select({ id: emailSubmissions.email })
      .from(emailSubmissions)
      .where(eq(emailSubmissions.email, email))
      .limit(1)

    if (existing.length > 0) {
      return { success: false, reason: 'duplicate' } as const
    }

    const inserted = await db
      .insert(emailSubmissions)
      .values({ email })
      .onConflictDoNothing()
      .returning()

    if (inserted.length === 0) {
      return { success: false, reason: 'duplicate' } as const
    }

    try {
      const html = await render(
        WelcomeEmail({
          firstName: '',
          siteUrl: 'https://dominicbloomfield.com',
          imageUrl: 'https://dominicbloomfield.com/assets/hero.jpg',
          unsubscribeUrl: '{{{RESEND_UNSUBSCRIBE_URL}}}',
        }),
      )

      await resend.emails.send({
        from: 'Dominic Bloomfield Art <art@dominicbloomfield.com>',
        to: [email],
        subject: "You're in!",
        html,
      })
    } catch (e: any) {
      console.error('Failed to send welcome email:', e.message, e.code, e.detail)
    }

    return { success: true } as const
  },
)