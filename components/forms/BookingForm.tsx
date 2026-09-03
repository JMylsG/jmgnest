'use client'

import { useState } from 'react'
import { submitBooking } from '@/app/actions/booking'
import FormField from './FormField'
import Button from '@/components/ui/Button'

interface BookingFormProps {
  onSuccess?: () => void
  className?: string
  defaultCheckIn?: string
  defaultCheckOut?: string
  defaultGuests?: number
}

export default function BookingForm({ 
  onSuccess, 
  className,
  defaultCheckIn,
  defaultCheckOut,
  defaultGuests,
}: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const formData = new FormData(e.currentTarget)
      await submitBooking(formData)
      setSuccess(true)
      e.currentTarget.reset()
      if (onSuccess) {
        setTimeout(() => {
          onSuccess()
        }, 2000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit booking request')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get tomorrow's date as minimum check-in date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-6">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Check-in Date"
            name="checkIn"
            type="date"
            required
            min={minDate}
            defaultValue={defaultCheckIn}
          />
          <FormField
            label="Check-out Date"
            name="checkOut"
            type="date"
            required
            min={defaultCheckIn || minDate}
            defaultValue={defaultCheckOut}
          />
        </div>

        <FormField
          label="Number of Guests"
          name="guests"
          type="number"
          required
          min={1}
          max={8}
          placeholder="1-8"
          defaultValue={defaultGuests?.toString()}
        />

        <FormField
          label="Additional Message (Optional)"
          name="message"
          type="textarea"
          placeholder="Tell us about your stay preferences..."
        />

        {error && (
          <div className="p-4 bg-[#8B4513]/10 border border-[#8B4513] rounded-lg">
            <p className="text-[#8B4513] text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-accent/10 border border-green-accent rounded-lg">
            <p className="text-forest-green text-sm">
              Booking request submitted successfully! We'll get back to you soon.
            </p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? 'Submitting...' : 'Request Booking'}
        </Button>
      </div>
    </form>
  )
}

