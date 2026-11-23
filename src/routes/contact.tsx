import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { z } from 'zod'

import { Spinner } from '#/components/ui/spinner'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ConstructionPage } from '#/components/ui/construction'
import { submitContactForm } from '../serverFunctions/contact'
import { StyledButton } from '#/components/ui/button'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Contact | Dominic Bloomfield' },
      {
        name: 'description',
        content:
          'Get in touch with Dominic Bloomfield about commissions, collaborations, prints, or press.',
      },
    ],
  }),
})

// Exported because your server function may import it for validation.
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(1, 'Message is required'),
})

const CONTACT_EMAIL = 'art@dominicbloomfield.com'

type Status = 'idle' | 'success' | 'error'

// Shared field styling: black border, yellow focus ring to match the newsletter input.
const fieldClass =
  'rounded-lg border border-black/80 bg-white text-lg focus-visible:ring-4 focus-visible:ring-[#FADE3E] focus-visible:ring-offset-0'

function RouteComponent() {
  const construction = false

  const reduceMotion = useReducedMotion()
  const [status, setStatus] = useState<Status>('idle')
  const [isLoading, setIsLoading] = useState(false)

  const contactForm = useForm({
    validators: { onSubmit: contactSchema },
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      setStatus('idle')

      try {
        await submitContactForm({ data: value as any })
        contactForm.reset()
        setStatus('success')
      } catch (error) {
        console.error('Error sending message:', error)
        setStatus('error')
      } finally {
        setIsLoading(false)
      }
    },
  })

  if (construction) return <ConstructionPage />

  // One gentle entrance for each column instead of a delay on every element.
  

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-20 pt-28 lg:px-12 lg:pb-32 lg:pt-36">
      <div className="rise-in grid gap-12 lg:grid-cols-[1fr_minmax(0,36rem)] lg:gap-24">
        {/* Left: heading and direct contact */}
        <motion.div>
          <h1 className="text-5xl font-black tracking-tight lg:text-8xl">
            Contact
          </h1>

          <p className="mt-6 max-w-md text-xl font-light leading-relaxed lg:mt-10 lg:text-2xl">
            Drop me a line!
          </p>

          <div className="mt-10 border-t lg:hidden relative border-black/20 pt-6 lg:mt-16">
            
          </div>
        </motion.div>

        {/* Right: form or confirmation */}
        <motion.div >
          <AnimatePresence >
            {status === 'success' ? (
              <motion.div
                key="sent"
                role="status"
            
                className=""
              >
                <p className="text-4xl font-black tracking-tight lg:text-5xl">
                  <span className="bg-[#FADE3E] px-2">Sent!</span>
                </p>
                <p className="mt-6 text-lg font-light leading-relaxed">
                  Thanks for reaching out. I'll get back to you as soon as I
                  can.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-8 cursor-pointer text-lg underline underline-offset-4 decoration-black/30 hover:decoration-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                
                onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  contactForm.handleSubmit()
                }}
                className="flex flex-col gap-6"
              >
                <contactForm.Field
                  name="name"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field>
                        <label htmlFor={field.name} className="font-light">
                          Name
                        </label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                          type="text"
                          placeholder="e.g. John Doe"
                          autoComplete="name"
                          disabled={isLoading}
                          className={fieldClass}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />

                <contactForm.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field>
                        <label htmlFor={field.name} className="font-light">
                          Email
                        </label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                          type="email"
                          inputMode="email"
                          placeholder="e.g. john.doe@example.com"
                          autoComplete="email"
                          disabled={isLoading}
                          className={fieldClass}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />

                <contactForm.Field
                  name="message"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field>
                        <label htmlFor={field.name} className="font-light">
                          Message
                        </label>
                        <Textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                          placeholder="lmk"
                          autoComplete="off"
                          disabled={isLoading}
                          className={`${fieldClass} min-h-44 resize-y`}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />

                <StyledButton
                  type="submit"
                  disabled={isLoading}
                  onClick={contactForm.handleSubmit}
                  className="flex h-14 w-full hover:bg-[#GADE1A] cursor-pointer items-center justify-center gap-3 border-2 border-black bg-[#FADE3E] text-lg  text-black transition-colors  hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      Submitting... <Spinner />
                    </>
                  ) : (
                    'Submit'
                  )}
                </StyledButton>

                <div aria-live="polite">
                  {status === 'error' && (
                    <p role="alert" className="text-red-600">
                      Something went wrong sending your message. Please try
                      again, or email me directly at{' '}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="underline underline-offset-4"
                      >
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  )
}