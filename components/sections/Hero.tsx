import React from 'react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import SafeImage from '@/components/ui/SafeImage'

interface HeroProps {
  title: string
  subtitle?: string
  imageUrl: string
  imageAlt: string
  ctaText?: string
  ctaHref?: string
  className?: string
}

export default function Hero({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  ctaText = 'Check Availability',
  ctaHref = '/booking',
  className,
}: HeroProps) {
  return (
    <section className={cn('relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-forest-green', className)}>
      {/* Background Image */}
      <div className="absolute inset-0 bg-forest-green">
        <SafeImage
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1410px"
        />
      </div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-green/85 via-forest-green/70 to-forest-green/60 z-10" />
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 py-20 max-w-6xl mx-auto">
        <h1 className="heading-h1 mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-light font-sans text-cream mb-8 tracking-[0.02em] max-w-3xl mx-auto opacity-95">
            {subtitle}
          </p>
        )}
        {ctaText && (
          <a href={ctaHref}>
            <Button variant="primary" size="lg">
              {ctaText}
            </Button>
          </a>
        )}
      </div>
    </section>
  )
}

