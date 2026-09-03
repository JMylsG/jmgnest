'use client'

import { useState, useMemo, useEffect } from 'react'
import Hero from '@/components/sections/Hero'
import GalleryGrid from '@/components/sections/GalleryGrid'
import { GalleryImage } from '@/lib/types'
import { getGalleryImages, getImagesByUnit, unitLabels } from '@/lib/data'

export default function GalleryPage() {
  const [activeUnit, setActiveUnit] = useState('all')
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch images on mount
  useEffect(() => {
    async function fetchImages() {
      const images = await getGalleryImages()
      setGalleryImages(images)
      setLoading(false)
    }
    fetchImages()
  }, [])

  // Get filtered images based on unit
  const filteredImages = useMemo(() => {
    let images = activeUnit === 'all' 
      ? galleryImages 
      : getImagesByUnit(activeUnit, galleryImages)

    // Category order for consistent grouping
    const categoryOrder: Record<string, number> = {
      'balcony': 1,
      'living-room': 2,
      'kitchen': 3,
      'bedroom': 4,
      'bathroom': 5,
      'exterior': 6,
      'views': 7,
    }

    // Bedroom type order (Master first, then Second, Third, Fourth)
    const getBedroomOrder = (image: GalleryImage): number => {
      if (image.category !== 'bedroom') return 0
      const caption = (image.caption || '').toLowerCase()
      if (caption.includes('master')) return 1
      if (caption.includes('second')) return 2
      if (caption.includes('third')) return 3
      if (caption.includes('fourth')) return 4
      return 5 // Other bedrooms
    }

    // Unit order
    const unitOrder: Record<string, number> = {
      'main-unit': 1,
      'unit-a': 2,
      'unit-b': 3,
      'shared': 4,
    }

    return images.sort((a, b) => {
      const unitA = unitOrder[a.unit || 'shared'] || 99
      const unitB = unitOrder[b.unit || 'shared'] || 99

      // First sort by unit
      if (unitA !== unitB) {
        return unitA - unitB
      }

      // Then sort by category within the same unit
      const categoryA = categoryOrder[a.category] || 99
      const categoryB = categoryOrder[b.category] || 99

      if (categoryA !== categoryB) {
        return categoryA - categoryB
      }

      // For bedrooms, sort by bedroom type (Master, Second, Third, Fourth)
      if (a.category === 'bedroom' && b.category === 'bedroom') {
        const bedroomOrderA = getBedroomOrder(a)
        const bedroomOrderB = getBedroomOrder(b)
        if (bedroomOrderA !== bedroomOrderB) {
          return bedroomOrderA - bedroomOrderB
        }
      }

      // Finally, sort by order within the same category
      return (a.order || 0) - (b.order || 0)
    })
  }, [activeUnit, galleryImages])

  if (loading) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center">
        <p className="text-body text-text-secondary">Loading gallery...</p>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen">
      <Hero
        title="Gallery"
        subtitle="Explore our beautiful property through photos"
        imageUrl="https://res.cloudinary.com/jmg-nest/image/upload/v1762669722/Baguio_tfutl3.jpg"
        imageAlt="JMG Nest gallery"
      />

      <section className="py-20 px-6 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          {/* Unit Filter */}
          <div className="mb-8">
            <h3 className="text-h4 font-serif font-semibold text-forest-green mb-4">
              Filter by Unit
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => {
                  setActiveUnit('all')
                }}
                className={`px-4 py-2 rounded-full text-sm font-sans transition-all ${
                  activeUnit === 'all'
                    ? 'bg-forest-green text-cream'
                    : 'bg-warm-sage text-forest-green hover:bg-opacity-80'
                }`}
              >
                All Units
              </button>
              {Object.entries(unitLabels)
                .filter(([key]) => key !== 'shared')
                .map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveUnit(key)
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-sans transition-all ${
                      activeUnit === key
                        ? 'bg-forest-green text-cream'
                        : 'bg-warm-sage text-forest-green hover:bg-opacity-80'
                    }`}
                  >
                    {label}
                  </button>
                ))}
            </div>
          </div>
          <GalleryGrid
            images={filteredImages}
          />
        </div>
      </section>
    </div>
  )
}
