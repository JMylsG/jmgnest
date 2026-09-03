'use client'

import { useState } from 'react'
import Image from 'next/image'

interface SafeImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  quality?: number
  fallbackText?: string
  placeholder?: 'blur' | 'empty'
}

export default function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
  quality,
  fallbackText = 'Image Coming Soon',
  placeholder = 'empty',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false)
  const [imgSrc, setImgSrc] = useState(src)

  if (hasError) {
    // Show placeholder when image fails
    if (fill) {
      return (
        <div className={`absolute inset-0 flex items-center justify-center bg-warm-sage ${className || ''}`}>
          <span className="text-body text-text-tertiary text-center px-4">{fallbackText}</span>
        </div>
      )
    }
    return (
      <div className={`flex items-center justify-center bg-warm-sage ${className || ''}`} style={{ width, height }}>
        <span className="text-body text-text-tertiary text-center px-4">{fallbackText}</span>
      </div>
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      quality={quality || 85}
      placeholder={placeholder}
      onError={() => setHasError(true)}
      unoptimized={process.env.NODE_ENV === 'development'}
      loading={priority ? undefined : 'lazy'}
    />
  )
}

