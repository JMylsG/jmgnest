import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/utils'
import Card from './Card'
import SafeImage from '@/components/ui/SafeImage'

interface TestimonialCardProps {
  guestName: string
  guestPhoto: string
  rating: number
  date: string
  comment: string
  hostResponse?: {
    date: string
    comment: string
  }
  className?: string
  showPhoto?: boolean
}

export default function TestimonialCard({
  guestName,
  guestPhoto,
  rating,
  date,
  comment,
  hostResponse,
  className,
  showPhoto = true,
}: TestimonialCardProps) {
  const reviewDate = date?.trim() || 'Date unavailable'
  const hostResponseDate = hostResponse?.date?.trim()

  return (
    <Card variant="standard" className={cn(className)}>
      <div className="flex items-start gap-4 mb-4">
        {showPhoto && (
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-[3px] border-warm-sage flex-shrink-0 bg-warm-sage">
            <SafeImage
              src={guestPhoto}
              alt={guestName}
              fill
              className="object-cover"
              fallbackText={getInitials(guestName)}
            />
          </div>
        )}
        <div className="flex-1">
          <h4 className="heading-h4 mb-1">{guestName}</h4>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    i < rating ? 'fill-warm-gold text-warm-gold' : 'fill-border-light text-border-light'
                  )}
                />
              ))}
            </div>
            <span className="text-caption">{reviewDate}</span>
          </div>
        </div>
      </div>
      <p className="text-body mb-4">{comment}</p>
      {hostResponse && (
        <div className="pt-4 border-t border-border-light">
          <p className="text-small font-medium text-forest-green mb-1">Host Response</p>
          <p className="text-body text-text-secondary">{hostResponse.comment}</p>
          {hostResponseDate && (
            <p className="text-caption mt-2">{hostResponseDate}</p>
          )}
        </div>
      )}
    </Card>
  )
}

