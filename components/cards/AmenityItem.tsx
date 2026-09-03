import React from 'react'
import { Wifi, Car, UtensilsCrossed, Tv, Coffee, Mountain, Droplet, Wind } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AmenityItemProps {
  name: string
  icon: string
  description: string
  allUnits?: boolean
  exclusiveTo?: string
  className?: string
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  parking: Car,
  kitchen: UtensilsCrossed,
  tv: Tv,
  coffee: Coffee,
  balcony: Mountain,
  shower: Droplet,
  ac: Wind,
}

export default function AmenityItem({ name, icon, description, allUnits, exclusiveTo, className }: AmenityItemProps) {
  const IconComponent = iconMap[icon] || Wifi

  return (
    <div 
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 relative',
        className
      )}
    >
      {/* Exclusive Badge for Main Unit only amenities */}
      {!allUnits && exclusiveTo && (
        <div className="absolute top-2 right-2">
          <span className="text-[10px] font-sans font-semibold text-warm-gold bg-warm-gold bg-opacity-10 px-2 py-0.5 rounded-full">
            {exclusiveTo}
          </span>
        </div>
      )}

      {/* Icon Circle */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-warm-gold bg-opacity-10 flex items-center justify-center">
        <IconComponent className="w-5 h-5 text-forest-green" />
      </div>

      {/* Content */}
      <div>
        <h4 className="font-sans font-semibold text-forest-green text-sm mb-1">
          {name}
        </h4>
        <p className="text-xs text-text-secondary font-sans leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

