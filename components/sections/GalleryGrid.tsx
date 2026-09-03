'use client'

import React, { useState } from 'react'
import ImageLightbox from '@/components/modals/ImageLightbox'
import SafeImage from '@/components/ui/SafeImage'
import { GalleryImage } from '@/lib/types'

interface GalleryGridProps {
  images: GalleryImage[]
  className?: string
}

export default function GalleryGrid({ images, className }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const lightboxImages = images.map(img => ({
    src: img.url,
    alt: img.alt,
    caption: img.caption,
  }))

  return (
    <>
      <div className={className}>
        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="card-image group cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-warm-sage">
                <SafeImage
                  src={image.thumbnail || image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[400ms] group-hover:scale-105"
                  priority={index < 6}
                  fallbackText="Image Coming Soon"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-green/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {image.caption && (
                <div className="p-4">
                  <p className="text-caption">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-body text-text-secondary">No images found.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}

