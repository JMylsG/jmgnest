'use client'

import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Unit } from '@/lib/types'

interface BookingOptionsProps {
  unit: Unit
  checkIn?: string | null
  checkOut?: string | null
  className?: string
}

export default function BookingOptions({ unit, checkIn, checkOut, className }: BookingOptionsProps) {
  // Direct Messenger link to business page
  const message = `Hi! I'm interested in ${unit.name} from ${checkIn || '[Check-in]'} to ${checkOut || '[Check-out]'}.`
  const getFacebookMessengerUrl = () => `https://m.me/61571078790065?text=${encodeURIComponent(message)}`

  // Support both id schemes ('main' from src/units and 'main-unit' from lib/data)
  const unitId: string = (unit as any).id
  const vrboUrl: string | null | undefined = (unit as any).vrboUrl
  const hasValidVrboUrl = !!vrboUrl && (unitId === 'main' || unitId === 'main-unit')
  const gridCols = hasValidVrboUrl ? 'lg:grid-cols-3' : 'lg:grid-cols-2'

  const handleBookingClick = (url?: string | null, label?: string) => {
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className={className}>
      <h3 className="text-h3 font-serif font-normal text-forest-green mb-2 text-center lg:text-left">
        Choose Your Booking Method
      </h3>
      <p className="text-body text-text-secondary mb-6 text-center lg:text-left">
        Select how you'd like to book your stay
      </p>

      {/* Booking Options Grid */}
      <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
        {/* Option 1: Airbnb */}
        <div className="flex flex-col items-center text-center p-6 rounded-xl border-2 border-border-light hover:border-warm-sage transition-colors">
          <div className="text-4xl mb-4">🏠</div>
          <h3 className="text-h4 font-serif font-semibold text-forest-green mb-2">
            Book on Airbnb
          </h3>
          <p className="text-sm font-sans text-text-secondary mb-4">
            Secure booking through Airbnb
          </p>
          <Button
            variant="secondary"
            onClick={() => handleBookingClick(unit?.airbnbUrl, 'Airbnb')}
            disabled={!unit?.airbnbUrl}
            className="w-full"
          >
            Book on Airbnb →
          </Button>
        </div>

        {/* Option 2: VRBO (only shown if valid URL exists) */}
        {hasValidVrboUrl && (
          <div className="flex flex-col items-center text-center p-6 rounded-xl border-2 border-border-light hover:border-warm-sage transition-colors">
            <div className="text-4xl mb-4">🏡</div>
            <h3 className="text-h4 font-serif font-semibold text-forest-green mb-2">
              Book on VRBO
            </h3>
            <p className="text-sm font-sans text-text-secondary mb-4">
              Book through VRBO platform
            </p>
            <Button
              variant="secondary"
              onClick={() => handleBookingClick(vrboUrl as string, 'VRBO')}
              className="w-full"
            >
              Book on VRBO →
            </Button>
          </div>
        )}

        {/* Option 3: Facebook Messenger (Featured) */}
        <div className="relative flex flex-col items-center text-center p-6 rounded-xl border-2 border-green-accent bg-green-accent bg-opacity-5 hover:bg-opacity-10 transition-colors">
          {/* Badge */}
          <div className="absolute -top-3 right-4">
            <Badge variant="accent">💰 Best Rate - Direct Booking</Badge>
          </div>

          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-h4 font-serif font-semibold text-forest-green mb-2">
            Message on Facebook
          </h3>
          <p className="text-sm font-sans text-text-secondary mb-4">
            Get the best rate by booking directly
          </p>
          <Button
            variant="primary"
            onClick={() => handleBookingClick(getFacebookMessengerUrl(), 'Facebook')}
            className="w-full"
          >
            💬 Message on Facebook
          </Button>
        </div>
      </div>

      {/* Informational strip */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">💡</span>
          <p className="text-h4 font-serif font-semibold text-forest-green">
            Why message us directly?
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-text-secondary">
          <li>✓ Best price guarantee</li>
          <li>✓ Special discounts available</li>
          <li>✓ Flexible payment options</li>
          <li>✓ Personal service from your host</li>
        </ul>
      </div>
    </section>
  )
}

