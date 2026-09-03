import React from 'react'
import { cn } from '@/lib/utils'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export default function Label({ className, children, required, ...props }: LabelProps) {
  return (
    <label className={cn('input-label', className)} {...props}>
      {children}
      {required && <span className="text-[#8B4513] ml-1">*</span>}
    </label>
  )
}

