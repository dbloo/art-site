import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from '@tanstack/react-form'
import { useState, useEffect } from 'react'
import { z } from 'zod'
import { submitEmail } from '@/serverFunctions/email'
import { Spinner } from './spinner'
import { Field, FieldError } from '@/components/ui/field'
import { useRouterState } from '@tanstack/react-router'

const emailSchema = z.object({
  email: z.email('Please enter a valid email address'),
})

type Status = 'idle' | 'success' | 'duplicate' | 'error'

export const EmailCapture = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  const hash = useRouterState({ select: (s) => s.location.hash })
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    if (hash !== 'newsletter') return

    const input = document.getElementById(
      'newsletter-email',
    ) as HTMLInputElement | null

    input?.focus({ preventScroll: true })

    setFlash(true)
    const timer = setTimeout(() => setFlash(false), 1800)
    return () => clearTimeout(timer)
  }, [hash])

  const emailForm = useForm({
    validators: { onSubmit: emailSchema },
    defaultValues: {
      email: '',
    },

    onSubmit: async ({ value }) => {
      setIsLoading(true)
      setStatus('idle')

      try {
        const result = await submitEmail({ data: value as any })

        if (result.success) {
          emailForm.reset()
          setStatus('success')
        } else if (result.reason === 'duplicate') {
          setStatus('duplicate')
        } else {
          setStatus('error')
        }
      } catch (error) {
        console.error(error)
        setStatus('error')
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <div className=" relative w-full lg:w-100 rise-in">
      <emailForm.Field
        name="email"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid

          return (
            <Field>
              <Input
              id="newsletter-email"
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                  if (status !== 'idle') setStatus('idle')
                }}
                onBlur={field.handleBlur}
                aria-invalid={isInvalid || status === 'duplicate'}
                type="text"
                autoComplete="off"
                disabled={isLoading}
                placeholder="put it here"
                className={`relative border border-black transition-shadow focus-visible:ring-4 focus-visible:ring-[#FADE3E] ${
                flash ? 'ring-4 ring-[#FADE3E]' : ''
  }`}
              />

              {isInvalid && <FieldError errors={field.state.meta.errors} />}

              <div className = "text-center" aria-live="polite">
                {status === 'error' && (
                  <p className="text-red-500 mt-2">
                    There was an error submitting your email. Please try again.
                  </p>
                )}
                {status === 'duplicate' && (
                  <p className="rise-in mt-2">
                    You're already on the list. Nothing more to do!
                  </p>
                )}
                {status === 'success' && (
                  <p className="rise-in mt-2">You're locked in!</p>
                )}
              </div>
            </Field>
          )
        }}
      />

      <Button
        disabled={isLoading}
        onClick={emailForm.handleSubmit}
        type="submit"
        className="bg-transparent right-0 top-0 text-black border-black border hover:bg-black/10 cursor-pointer absolute"
      >
        {isLoading ? 'Submitting' : 'Submit'}
        {isLoading && <Spinner />}
      </Button>
    </div>
  )
}