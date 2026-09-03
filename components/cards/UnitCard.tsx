import React from 'react'
import Link from 'next/link'
import Card from './Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import SafeImage from '@/components/ui/SafeImage'
import { formatCurrency } from '@/lib/utils'
import { Unit } from '@/lib/types'
import { Star } from 'lucide-react'

interface UnitCardProps {
  unit: Unit
}

export default function UnitCard({ unit }: UnitCardProps) {
  // Format price with "P" prefix instead of currency symbol
  const formatPrice = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-PH', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
    return `P${formatted}`
  }

  return (
    <Card variant="elevated" className="h-full flex flex-col">
      {/* Unit Image with Featured Badge */}
      <div className="relative w-full h-64 overflow-hidden rounded-t-xl -m-10 mb-0">
        <SafeImage
          src={unit.images[0] || '/images/placeholder-unit.jpg'}
          alt={unit.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          quality={85}
        />
        {/* Featured Badge */}
        {unit.featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="accent">Featured</Badge>
          </div>
        )}
      </div>

      <div className="mt-4 flex-1 flex flex-col">
        {/* Unit Header */}
        <div className="mb-4">
          <h3 className="heading-h3 mb-2">{unit.name}</h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < (unit.rating || 5)
                      ? 'fill-warm-gold text-warm-gold'
                      : 'fill-border-light text-border-light'
                  }`}
                />
              ))}
            </div>
            <span className="text-body text-text-secondary font-medium">
              {unit.rating || 5}
            </span>
          </div>

          {/* Details: House • Guests • Bedrooms • Bathrooms */}
          <p className="text-body text-text-secondary">
            House • {unit.capacity.guests} Guests • {unit.capacity.bedrooms} Bedroom{unit.capacity.bedrooms !== 1 ? 's' : ''} • {unit.capacity.bathrooms} Bathroom{unit.capacity.bathrooms !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Pricing */}
        <div className="mt-auto pt-6 border-t border-border-light">
          <div className="mb-4">
            <p className="text-body text-text-secondary mb-1">
              from <span className="text-h4 font-serif font-semibold text-forest-green">
                {formatPrice(unit.pricing.baseRate)}
              </span> per night
            </p>
          </div>

          <Link href={`/booking/${unit.id}`} className="block w-full">
            <Button variant="primary" className="w-full">
              BOOK NOW
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

