import React from 'react'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import { Amenity } from '@/lib/types'

interface AmenityCardProps {
  amenity: Amenity
  className?: string
}

export default function AmenityCard({ amenity, className }: AmenityCardProps) {
  return (
    <div className={cn('p-6 bg-background-section border border-border-light rounded-lg hover:shadow-md hover:-translate-y-1 transition-all duration-300', className)}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="heading-h4">{amenity.name}</h4>
        {amenity.featured && <Badge variant="accent">Featured</Badge>}
      </div>
      <p className="text-body">{amenity.description}</p>
      <Badge variant="default" className="mt-3">
        {amenity.category}
      </Badge>
    </div>
  )
}

