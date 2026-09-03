'use client'

import { Unit } from '@/lib/types'
import Card from '@/components/cards/Card'

interface Pricing {
  baseRate: number
  nights: number
  subtotal: number
  weeklyDiscount: number
  cleaningFee: number
  total: number
}

interface SelectedDates {
  checkIn: string
  checkOut: string
}

interface PricingSummaryProps {
  unit: Unit
  pricing: Pricing | null
  selectedDates: SelectedDates
}

export default function PricingSummary({ unit, pricing, selectedDates }: PricingSummaryProps) {
  // Format price with "P" prefix
  const formatPrice = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-PH', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
    return `P${formatted}`
  }

  return (
    <Card variant="elevated" className="sticky top-24">
      <h3 className="heading-h4 mb-6">Price Summary Estimate</h3>
      {pricing ? (
        <div className="space-y-4">
          <div className="flex justify-between text-body font-sans">
            <span className="text-text-secondary">
              {formatPrice(pricing.baseRate)} × {pricing.nights} night{pricing.nights !== 1 ? 's' : ''}
            </span>
            <span className="text-text-primary font-medium">
              {formatPrice(pricing.subtotal)}
            </span>
          </div>
          {pricing.weeklyDiscount > 0 && (
            <div className="flex justify-between text-body font-sans">
              <span className="text-text-secondary">Weekly Discount</span>
              <span className="text-warm-gold font-medium">
                -{formatPrice(pricing.weeklyDiscount)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-body font-sans">
            <span className="text-text-secondary">Cleaning Fee</span>
            <span className="text-text-primary font-medium">
              {formatPrice(pricing.cleaningFee)}
            </span>
          </div>
          <div className="border-t border-border-light pt-4 mt-4">
            <div className="flex justify-between text-lg font-sans font-semibold">
              <span className="text-forest-green">Total</span>
              <span className="text-forest-green">
                {formatPrice(pricing.total)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-body text-text-tertiary font-sans">
          Select your dates to see pricing
        </p>
      )}
    </Card>
  )
}

