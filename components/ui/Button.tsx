import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-sans font-medium uppercase tracking-wider transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60'
  
  const variantStyles = {
    primary: 'bg-forest-green text-cream rounded-full px-8 py-3.5 shadow-md hover:bg-[#2A5447] hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md active:bg-[#163128] disabled:bg-warm-sage disabled:text-text-tertiary disabled:shadow-none',
    secondary: 'bg-transparent text-forest-green border-2 border-forest-green rounded-full px-[30px] py-3 hover:bg-forest-green hover:text-cream hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:bg-[#163128]',
    text: 'bg-transparent text-warm-gold border-none rounded px-4 py-2 hover:bg-warm-gold/10 hover:text-[#A87B4A] active:bg-warm-gold/15 active:text-[#8B6238]',
  }
  
  const sizeStyles = {
    sm: 'text-sm px-6 py-2.5',
    md: 'text-base',
    lg: 'text-lg px-10 py-4',
  }
  
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

