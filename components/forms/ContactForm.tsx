'use client'

import { useState, useRef } from 'react'
import { submitContactForm } from '@/app/actions/contact'
import FormField from './FormField'
import Button from '@/components/ui/Button'

interface ContactFormProps {
  className?: string
}

export default function ContactForm({ className }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [resultMessage, setResultMessage] = useState<string>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)
    setResultMessage('')

    try {
      const formData = new FormData(e.currentTarget)
      const result = await submitContactForm(formData)
      
      if (result.success) {
        setSuccess(true)
        setResultMessage(result.message || 'Thank you for your message! We will get back to you soon.')
        // Reset form using ref instead of e.currentTarget
        if (formRef.current) {
          formRef.current.reset()
        }
      } else {
        setError(result.error || 'Failed to send message')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          name="name"
          type="text"
          required
          placeholder="John Doe"
        />
        <FormField
          label="Email Address"
          name="email"
          type="email"
          required
          placeholder="john@example.com"
        />

        <div className="md:col-span-2">
          <FormField
            label="Message"
            name="message"
            type="textarea"
            required
            placeholder="How can we help you?"
            rows={8}
          />
        </div>

        {error && (
          <div className="md:col-span-2 p-4 bg-[#8B4513]/10 border border-[#8B4513] rounded-lg">
            <p className="text-[#8B4513] text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="md:col-span-2 p-4 bg-forest-green/10 border border-forest-green rounded-lg">
            <p className="text-forest-green text-sm">{resultMessage}</p>
          </div>
        )}

        <div className="md:col-span-2">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full md:w-auto"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </div>
    </form>
  )
}

