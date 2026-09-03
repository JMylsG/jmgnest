import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  variant?: 'standard' | 'elevated'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({ variant = 'standard', children, className, onClick }: CardProps) {
  const baseStyles = 'overflow-hidden transition-all duration-300'
  
  const variantStyles = {
    standard: 'card-standard',
    elevated: 'card-elevated',
  }
  
  return (
    <div
      className={cn(baseStyles, variantStyles[variant], onClick && 'cursor-pointer', className)}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

