import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'min' | 'max'> {
  error?: string
  helperText?: string
  min?: string | number
  max?: string | number
}

export default function Input({ className, error, helperText, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        className={cn(
          'input-text w-full',
          error && 'border-[#8B4513] ring-[3px] ring-[#8B4513]/10',
          className
        )}
        {...props}
      />
      {error && <p className="input-error">{error}</p>}
      {!error && helperText && <p className="input-helper">{helperText}</p>}
    </div>
  )
}

