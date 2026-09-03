import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'default' | 'primary' | 'accent' | 'unit'
  children: React.ReactNode
  className?: string
}

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  const baseStyles = 'px-3 py-1 rounded-full text-[0.813rem] font-medium font-sans tracking-[0.05em] uppercase inline-block'
  
  const variantStyles = {
    default: 'bg-warm-sage text-forest-green',
    primary: 'bg-forest-green text-cream',
    accent: 'bg-warm-gold text-cream',
    unit: 'bg-[#FFB84D] text-forest-green', // Light orange/amber for unit badges (matches screenshot)
  }
  
  return (
    <span className={cn(baseStyles, variantStyles[variant], className)}>
      {children}
    </span>
  )
}

