import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import SafeImage from '@/components/ui/SafeImage'

interface ImageCardProps {
  src: string
  alt: string
  title: string
  description?: string
  href?: string
  className?: string
}

export default function ImageCard({ src, alt, title, description, href, className }: ImageCardProps) {
  const content = (
    <div className={cn('card-image group', className)}>
      <div className="relative aspect-[16/9] overflow-hidden bg-warm-sage">
        <SafeImage
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[400ms] group-hover:scale-105"
          fallbackText="Image Coming Soon"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="heading-h3 mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-body line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  )
  
  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }
  
  return content
}

