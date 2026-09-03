'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import SafeImage from '@/components/ui/SafeImage'

interface ImageLightboxProps {
  images: Array<{ src: string; alt: string; caption?: string }>
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export default function ImageLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Update index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') navigate('prev')
      if (e.key === 'ArrowRight') navigate('next')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])

  // Prevent body scroll when open
  useEffect(() => {
    if (typeof window === 'undefined' || !document.body) return
    
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      if (document.body) {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen])

  const navigate = (direction: 'prev' | 'next') => {
    setCurrentIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? images.length - 1 : prev - 1
      }
      return prev === images.length - 1 ? 0 : prev + 1
    })
  }

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-50 bg-forest-green/95 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 bg-forest-green/80 hover:bg-forest-green text-cream rounded-full transition-colors duration-200"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate('prev')
            }}
            className="absolute left-4 z-50 p-3 bg-forest-green/80 hover:bg-forest-green text-cream rounded-full transition-colors duration-200"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate('next')
            }}
            className="absolute right-4 z-50 p-3 bg-forest-green/80 hover:bg-forest-green text-cream rounded-full transition-colors duration-200"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Image Container */}
      <div
        className="relative w-full h-full max-w-7xl max-h-[90vh] p-4 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
          <SafeImage
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain"
            priority
            sizes="100vw"
            fallbackText="Image Coming Soon"
          />
        </div>
        {currentImage.caption && (
          <div className="mt-4 px-4 py-2 bg-forest-green/80 rounded-lg backdrop-blur-sm">
            <p className="text-cream text-body text-center">{currentImage.caption}</p>
          </div>
        )}
        {images.length > 1 && (
          <div className="mt-4 text-cream text-caption">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  )
}

