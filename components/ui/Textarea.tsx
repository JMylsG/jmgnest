import React from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  helperText?: string
}

export default function Textarea({ className, error, helperText, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      <textarea
        className={cn(
          'input-text w-full resize-none',
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

