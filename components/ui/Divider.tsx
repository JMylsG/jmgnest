import React from 'react'
import { cn } from '@/lib/utils'

interface DividerProps {
  variant?: 'light' | 'medium' | 'accent'
  className?: string
}

export default function Divider({ variant = 'light', className }: DividerProps) {
  const variantStyles = {
    light: 'divider-light',
    medium: 'divider-medium',
    accent: 'divider-accent',
  }
  
  return <hr className={cn(variantStyles[variant], className)} />
}

