import React from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface CTASectionProps {
  title: string
  description?: string
  ctaText: string
  ctaHref: string
  variant?: 'default' | 'dark'
  className?: string
}

export default function CTASection({
  title,
  description,
  ctaText,
  ctaHref,
  variant = 'default',
  className,
}: CTASectionProps) {
  const isDark = variant === 'dark'
  
  return (
    <section className={cn(
      'py-16 lg:py-24',
      isDark ? 'bg-forest-green' : 'bg-background-subtle',
      className
    )}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={cn(
            'heading-h2 mb-6',
            isDark && 'text-cream'
          )}>
            {title}
          </h2>
          {description && (
            <p className={cn(
              'text-body mb-8 max-w-2xl mx-auto',
              isDark ? 'text-warm-sage' : 'text-text-secondary'
            )}>
              {description}
            </p>
          )}
          <Link href={ctaHref}>
            <Button variant={isDark ? 'secondary' : 'primary'} size="lg">
              {ctaText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

