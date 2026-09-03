'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ChevronDown, Star } from 'lucide-react'
import { getUnits, getFeaturedImages } from '@/lib/data'
import Card from '@/components/cards/Card'
import ImageCard from '@/components/cards/ImageCard'
import TestimonialCard from '@/components/cards/TestimonialCard'
import Button from '@/components/ui/Button'
import AmenityItem from '@/components/cards/AmenityItem'
import SafeImage from '@/components/ui/SafeImage'
import FAQAccordion, { FAQItem } from '@/components/sections/FAQAccordion'
import { BreadcrumbSchema, FAQSchema } from '@/components/StructuredData'
import { Unit, GalleryImage, Review } from '@/lib/types'

// Key amenities data - using icon string names that match AmenityItem's iconMap
const keyAmenities = [
  { icon: 'wifi', name: 'High-Speed WiFi', description: 'Stay connected throughout your stay', allUnits: true },
  { icon: 'parking', name: 'Free Parking', description: 'Large private parking', allUnits: true },
  { icon: 'kitchen', name: 'Full Kitchen', description: 'Cook your favorite meals at home', allUnits: true },
  { icon: 'tv', name: 'Smart TV', description: 'Netflix and streaming ready', allUnits: true },
  { icon: 'coffee', name: 'Coffee & Tea', description: 'Complimentary coffee essentials', allUnits: true },
  { icon: 'shower', name: 'Hot Shower', description: 'Instant hot water 24/7', allUnits: true },
  { icon: 'balcony', name: 'Mountain View Balcony', description: 'Stunning Baguio scenery', allUnits: false, exclusiveTo: 'Main Unit' }
]

export default function HomePage() {
  const [units, setUnits] = useState<Unit[]>([])
  const [featuredImages, setFeaturedImages] = useState<GalleryImage[]>([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch data on mount
  useEffect(() => {
    let cancelled = false
    
    async function loadData() {
      try {
        // Fetch async units data
        const unitsData = await getUnits()
        if (!cancelled) {
          setUnits(unitsData || [])
        }
      } catch (error) {
        console.error('Error loading units:', error)
        if (!cancelled) {
          setUnits([])
        }
      }

      // Get synchronous featured images (doesn't need await, but keep try-catch for safety)
      try {
        const imagesData = getFeaturedImages(6)
        if (!cancelled) {
          setFeaturedImages(imagesData || [])
        }
      } catch (error) {
        console.error('Error loading featured images:', error)
        if (!cancelled) {
          setFeaturedImages([])
        }
      }

      // Always set loading to false, even if there were errors
      if (!cancelled) {
        setLoading(false)
      }
    }
    
    loadData()
    
    return () => {
      cancelled = true
    }
  }, [])

  // Handle scroll detection
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Combine all reviews from all units
  const allReviews = useMemo(() => {
    return units.reduce((acc: Review[], unit) => {
      if (unit.reviews && unit.reviews.length > 0) {
        return [...acc, ...unit.reviews]
      }
      return acc
    }, [])
  }, [units])

  // Show first 3 reviews on home page
  const featuredReviews = allReviews.slice(0, 3)

  // FAQ data
  const faqData: FAQItem[] = [
    {
      question: 'Where is JMG Nest located?',
      answer: 'JMG Nest is located in La Trinidad Valley, Benguet, Philippines, just 15 minutes from Baguio City. Our property offers easy access to Baguio\'s top attractions while providing a peaceful mountain retreat in La Trinidad.',
    },
    {
      question: 'What amenities are included?',
      answer: 'All units include high-speed WiFi, free parking, full kitchen with appliances, smart TV with streaming, complimentary coffee & tea, and hot shower 24/7. The Main Unit also features a mountain view balcony. Each unit is fully equipped for a comfortable stay in Baguio.',
    },
    {
      question: 'How many units does JMG Nest have?',
      answer: 'JMG Nest offers three unique vacation rental units: Main Unit (most popular with mountain views), Unit A (most affordable), and Unit B (spacious and versatile). All units are located in the same property in La Trinidad Valley.',
    },
    {
      question: 'What is the price range?',
      answer: 'Rates start from ₱5,250 per night, depending on the unit and season. Each unit has different pricing based on size, amenities, and capacity. Visit our booking page to see current rates and availability for all units.',
    },
    {
      question: 'How far is JMG Nest from Baguio City attractions?',
      answer: 'Located in La Trinidad Valley, we\'re just minutes away from major Baguio attractions including Strawberry Farm (10 min), Burnham Park (20 min), SM Baguio (25 min), and Mines View Park (35 min). Our location offers the perfect balance of accessibility and tranquility.',
    },
    {
      question: 'Is parking available?',
      answer: 'Yes, free parking is available for all guests. Our property in La Trinidad Valley has a large private parking area that can accommodate multiple vehicles, making it convenient for guests traveling by car to Baguio.',
    },
  ]

  // Calculate review statistics
  const totalReviews = allReviews.length
  const averageRatingNum = totalReviews > 0 
    ? allReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    : 0
  const averageRating = averageRatingNum.toFixed(1)

  const handleImageClick = (image: GalleryImage) => {
    const index = featuredImages.findIndex(img => img.id === image.id)
    setCurrentIndex(index >= 0 ? index : 0)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setCurrentIndex((prev) => (prev + 1) % featuredImages.length)
    } else {
      setCurrentIndex((prev) => (prev - 1 + featuredImages.length) % featuredImages.length)
    }
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  // Handle body scroll lock and keyboard navigation
  useEffect(() => {
    if (typeof window === 'undefined' || !document.body) return
    
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setLightboxOpen(false)
        } else if (e.key === 'ArrowLeft') {
          setCurrentIndex((prev) => (prev - 1 + featuredImages.length) % featuredImages.length)
        } else if (e.key === 'ArrowRight') {
          setCurrentIndex((prev) => (prev + 1) % featuredImages.length)
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        if (document.body) {
          document.body.style.overflow = ''
        }
        document.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, featuredImages.length])

  // Generate Schema.org structured data (must be before early return to maintain hook order)
  const lodgingBusinessSchema = useMemo(() => {
    const allAmenities = [
      'High-Speed WiFi',
      'Free Parking',
      'Full Kitchen',
      'Smart TV',
      'Coffee & Tea',
      'Hot Shower',
      'Mountain View Balcony'
    ]

    // Calculate aggregate rating from all reviews
    const aggregateRating = totalReviews > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": averageRating,
      "reviewCount": totalReviews,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined

    const schema = {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "JMG Nest",
      "description": "Premium vacation rental accommodation with three unique units in La Trinidad Valley, near Baguio City. Experience mountain comfort with modern amenities and stunning views.",
      "image": "https://jmgnest.com/images/og-image.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "La Trinidad",
        "addressRegion": "Benguet",
        "addressCountry": "Philippines"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "16.4023",
        "longitude": "120.5960"
      },
      "url": "https://jmgnest.com",
      "priceRange": "₱₱",
      "priceCurrency": "PHP",
      "amenityFeature": allAmenities.map(amenity => ({
        "@type": "LocationFeatureSpecification",
        "name": amenity,
        "value": true
      })),
      ...(aggregateRating && { aggregateRating }),
      "telephone": "+63-XXX-XXX-XXXX",
      "email": "info@jmgnest.com",
      "checkinTime": "14:00",
      "checkoutTime": "11:00",
      "numberOfRooms": "3",
      "numberOfUnits": "3"
    }

    return schema
  }, [totalReviews, averageRating])

  const breadcrumbSchema = {
    items: [
      { name: 'Home', url: 'https://jmgnest.com' }
    ]
  }

  if (loading) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center">
        <p className="text-body text-text-secondary">Loading...</p>
      </div>
    )
  }

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbSchema.items} />
      <FAQSchema faqs={faqData} />

      <div className="bg-cream min-h-screen">
        {/* Full-Screen Hero Section */}
        <section 
          id="hero" 
          className="relative h-screen flex items-center justify-center overflow-hidden bg-espresso"
          aria-label="Hero section with property overview"
        >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://res.cloudinary.com/jmg-nest/image/upload/v1763355326/Patio_ahxmie.jpg"
            alt="JMG Nest vacation rental main patio with mountain views in La Trinidad Valley near Baguio City"
            fill
            className="object-cover"
            sizes="100vw"
            priority
            quality={85}
          />
        </div>

        {/* Warm espresso scrim */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(180deg, rgba(12,9,5,0.62) 0%, rgba(12,9,5,0.32) 40%, rgba(12,9,5,0.55) 78%, rgba(12,9,5,0.92) 100%)'
          }}
        />

        {/* Hero Content - Centered */}
        <div className="relative z-20 text-center px-6 py-10 max-w-5xl">
          <p className="inline-flex items-center gap-3 text-warm-gold font-sans font-bold uppercase tracking-[0.3em] text-xs mb-5">
            Premium mountain stays
          </p>
          <h1 className="text-h1 font-serif font-normal text-cream mb-6 tracking-wide uppercase">
            Premium Vacation Rental in La Trinidad & Close to Baguio City
          </h1>
          <p className="text-lg md:text-xl font-sans font-light text-cream mb-8 tracking-wide max-w-2xl mx-auto opacity-95">
            Three Unique Spaces, One Unforgettable Mountain Escape in La Trinidad Valley
          </p>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <a 
          href="#unit-selection"
          className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer"
          aria-label="Scroll to content"
        >
          <div className="flex flex-col items-center text-cream hover:text-warm-gold transition-colors duration-300">
            <span className="text-sm font-sans font-light mb-2 opacity-80">
              Scroll to explore
            </span>
            <ChevronDown size={24} className="opacity-60" />
          </div>
        </a>
      </section>

      {/* Unit Selection Section */}
      <section 
        id="unit-selection" 
        className="py-20 px-6"
        aria-label="Choose your perfect vacation rental unit"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-serif font-normal text-forest-green mb-4">
              Choose Your Perfect Space
            </h2>
            <p className="text-body text-text-secondary font-sans max-w-2xl mx-auto">
              Three beautifully designed units in one premium property. Whether you're traveling 
              as a couple or with family and friends, we have the perfect space for your Baguio getaway.
            </p>
          </div>

          {units.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-body text-text-secondary mb-4">
                Unable to load units at this time. Please try refreshing the page.
              </p>
              <Button 
                variant="primary" 
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {units.map((unit) => {
              // Determine badge based on unit
              const getBadge = () => {
                if (unit.featured) {
                  return { text: 'Most Popular', color: 'bg-warm-gold', textColor: 'text-[#1b130a]' }
                }
                if (unit.id === 'unit-a') {
                  return { text: 'Most Affordable', color: 'bg-green-accent', textColor: 'text-cream' }
                }
                return null
              }

              // Get display name
              const getDisplayName = () => {
                if (unit.id === 'main-unit') return 'Main Unit'
                if (unit.id === 'unit-a') return 'Unit A'
                if (unit.id === 'unit-b') return 'Unit B'
                return unit.name
              }

              const badge = getBadge()
              const displayName = getDisplayName()

              return (
                <Card key={unit.id} variant="elevated" className="group hover:shadow-xl transition-shadow duration-300 p-0 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <SafeImage
                      src={unit.images[0] || '/images/placeholder-unit.jpg'}
                      alt={`${displayName} vacation rental unit at JMG Nest in La Trinidad Valley near Baguio City`}
                      width={400}
                      height={256}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      quality={85}
                    />
                    {badge && (
                      <div className={`absolute top-4 right-4 ${badge.color} ${badge.textColor} px-3 py-1.5 rounded-full text-sm font-sans font-semibold`}>
                        {badge.text}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-h4 font-serif font-semibold text-forest-green mb-2">
                      {displayName}
                    </h3>
                    
                    {/* Rating */}
                    {unit.rating && (
                      <div className="flex items-center gap-1 mb-4">
                        <Star className="w-4 h-4 fill-warm-gold text-warm-gold" />
                        <span className="text-sm font-sans font-semibold text-forest-green">
                          {unit.rating}
                        </span>
                      </div>
                    )}

                    {/* Capacity */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-text-secondary font-sans">
                        <span>👥</span>
                        <span>Up to {unit.capacity.guests} {unit.capacity.guests === 1 ? 'guest' : 'guests'}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-secondary font-sans">
                        <div className="flex items-center gap-1">
                          <span>🛏️</span>
                          <span>{unit.capacity.bedrooms} {unit.capacity.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>🚿</span>
                          <span>{unit.capacity.bathrooms} {unit.capacity.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mb-6 pb-6 border-b border-border-light">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-sans text-text-secondary">from</span>
                        <span className="text-2xl font-serif font-bold text-forest-green">
                          {unit.pricing.currency}{unit.pricing.baseRate.toLocaleString()}
                        </span>
                        <span className="text-sm font-sans text-text-secondary">/ night</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link href={`/booking/${unit.id}`}>
                      <Button variant="primary" className="w-full">
                        View & Book
                      </Button>
                    </Link>
                  </div>
                </Card>
              )
            })}
            </div>
          )}

          {/* Compare Units CTA */}
          {units.length > 0 && (
            <div className="text-center mt-12">
              <Link href="/booking">
                <Button variant="secondary">
                  Compare All Units
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Amenities Section - COMPACT SECTION WITH EXCLUSIVE AMENITY */}
      <section 
        id="amenities" 
        className="py-16 px-6 bg-cream"
        aria-label="Property amenities and features"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-h2 font-serif font-normal text-forest-green mb-4">
              Everything You Need for Comfort
            </h2>
            <p className="text-body text-text-secondary font-sans max-w-2xl mx-auto">
              All units come fully equipped with modern amenities for a hassle-free stay
            </p>
          </div>

          {/* Compact Grid - 4 columns on desktop, 2 on tablet, 1 on mobile - Second row centered */}
          <div className="flex flex-wrap justify-center gap-6">
            {keyAmenities.map((amenity, index) => {
              // For Hot Shower, ensure allUnits is true and no exclusiveTo indicator shows
              const showExclusiveBadge = !amenity.allUnits && amenity.exclusiveTo
              
              return (
                <div
                  key={index}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                >
                  <AmenityItem
                    name={amenity.name}
                    icon={amenity.icon}
                    description={amenity.description}
                    allUnits={amenity.allUnits}
                    exclusiveTo={showExclusiveBadge ? amenity.exclusiveTo : undefined}
                  />
                </div>
              )
            })}
          </div>

          {/* Note about unit-specific amenities */}
          <div className="text-center mt-8">
            <p className="text-xs text-text-secondary font-sans italic">
              Some amenities are exclusive to specific units. View individual unit pages for complete details.
            </p>
          </div>

          {/* View detailed amenities by unit link */}
          <div className="text-center mt-6">
            <Link href="/booking">
              <Button variant="text" className="text-warm-gold hover:text-forest-green">
                See amenities by unit →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About JMG Nest Section - NEW */}
      <section 
        id="about" 
        className="py-20 px-6 bg-background-subtle"
        aria-label="About JMG Nest vacation rental property"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <SafeImage
                  src="https://res.cloudinary.com/jmg-nest/image/upload/v1762661245/DJI_0012_iz993m.jpg"
                  alt="JMG Nest vacation rental property exterior in La Trinidad Valley with mountain views near Baguio City"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  quality={85}
                />
              </div>
              {/* Optional: Second smaller image overlay */}
              <div className="hidden lg:block absolute -bottom-6 -right-6 w-48 h-48 rounded-xl overflow-hidden shadow-lg border-4 border-white">
                <SafeImage
                  src="https://res.cloudinary.com/jmg-nest/image/upload/v1762640674/MainUnit_Patio2_e73vcr.jpg"
                  alt="JMG Nest Main Unit balcony patio with outdoor seating and La Trinidad Valley mountain views"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  sizes="192px"
                  quality={85}
                />
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <h2 className="text-h2 font-serif font-normal text-forest-green mb-6">
                Welcome to JMG Nest
              </h2>
              <div className="space-y-4 text-body text-text-secondary font-sans">
                <p>
                  Nestled in the heart of La Trinidad Valley, just 15 minutes from Baguio City, JMG Nest offers three beautifully designed 
                  vacation rental units that blend modern comfort with the natural charm of the mountains. Located in the scenic La Trinidad, Benguet area, 
                  our property provides easy access to Baguio City's top attractions while offering a peaceful mountain retreat.
                </p>
                <p>
                  Our property in La Trinidad Valley is thoughtfully designed to give you the comforts of home while you explore 
                  everything Baguio City has to offer. From the moment you arrive, you'll feel the warm hospitality 
                  that makes us special. Whether you're looking for a staycation in Baguio or a vacation rental in La Trinidad, 
                  JMG Nest provides the perfect base for your mountain adventure.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-warm-gold bg-opacity-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🏡</span>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-forest-green text-sm">Family-Owned</h3>
                    <p className="text-xs text-text-secondary">Personal touch in every detail</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-warm-gold bg-opacity-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📅</span>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-forest-green text-sm">Since 2024</h3>
                    <p className="text-xs text-text-secondary">Years of hospitality experience</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-warm-gold bg-opacity-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🏠</span>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-forest-green text-sm">3 Unique Spaces</h3>
                    <p className="text-xs text-text-secondary">Each with its own character</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-warm-gold bg-opacity-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-forest-green text-sm">Prime Location</h3>
                    <p className="text-xs text-text-secondary">Minutes from top attractions</p>
                  </div>
                </div>
              </div>

              {/* Learn More CTA */}
              <div className="mt-8">
                <Link href="/about">
                  <Button variant="secondary">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Choose Your Unit */}
      <section 
        id="choose-unit" 
        className="py-20 px-6 bg-cream"
        aria-label="Guide to choosing the perfect unit"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-serif font-normal text-forest-green mb-4">
              Not Sure Which Unit to Choose?
            </h2>
            <p className="text-body text-text-secondary font-sans max-w-2xl mx-auto">
              We'll help you find the perfect space for your Baguio adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="standard" className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-warm-gold bg-opacity-10 flex items-center justify-center">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-h4 font-serif font-semibold text-forest-green mb-3">
                Main Unit - The Star of the Property
              </h3>
              <p className="text-body text-text-secondary font-sans mb-4">
                Perfect for huge families with beautiful views of the La Trinidad valley. The premier choice for your Baguio getaway.
              </p>
              <Link href="/booking/main-unit">
                <Button variant="text" className="text-warm-gold">
                  View Main Unit →
                </Button>
              </Link>
            </Card>

            <Card variant="standard" className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-warm-gold bg-opacity-10 flex items-center justify-center">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-h4 font-serif font-semibold text-forest-green mb-3">
                Spacious & Versatile
              </h3>
              <p className="text-body text-text-secondary font-sans mb-4">
                Unit A and B provide spacious rooms perfect for couples, families, or individuals seeking comfort and flexibility.
              </p>
              <Link href="/booking">
                <Button variant="text" className="text-warm-gold">
                  View Units A & B →
                </Button>
              </Link>
            </Card>

            <Card variant="standard" className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-warm-gold bg-opacity-10 flex items-center justify-center">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-h4 font-serif font-semibold text-forest-green mb-3">
                For Special Events
              </h3>
              <p className="text-body text-text-secondary font-sans mb-4">
                Book function hall to host your events in one beautiful property
              </p>
              <Link href="/contact">
                <Button variant="text" className="text-warm-gold">
                  Contact Us →
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Gallery Preview */}
      <section 
        id="gallery-preview" 
        className="py-20 px-6 bg-background-subtle"
        aria-label="Property gallery preview"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-serif font-normal text-forest-green mb-4">
              Explore Our Spaces
            </h2>
            <p className="text-body text-text-secondary font-sans max-w-2xl mx-auto">
              Get a glimpse of all three beautifully designed units
            </p>
          </div>

          {featuredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-body text-text-secondary">
                Gallery images are currently unavailable.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {featuredImages.map((image) => (
                <div
                  key={image.id}
                  className="cursor-pointer"
                  onClick={() => handleImageClick(image)}
                >
                  <div className="card-image group">
                    <div className="relative aspect-[16/9] overflow-hidden bg-warm-sage rounded-xl">
                      <SafeImage
                        src={image.thumbnail || image.url}
                        alt={image.alt || `JMG Nest vacation rental ${image.category} in La Trinidad Valley near Baguio City`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[400ms] group-hover:scale-105"
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link href="/gallery">
              <Button variant="secondary">
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Full-Page Image Viewer */}
      {lightboxOpen && featuredImages.length > 0 && featuredImages[currentIndex] && (
        <div
          className="fixed inset-0 z-50 bg-cream"
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-30 p-3 bg-espresso bg-opacity-90 text-cream rounded-full hover:bg-opacity-100 transition-all shadow-lg"
            aria-label="Close viewer"
          >
            <X size={24} />
          </button>

          {/* Main Content Area */}
          <div className="h-full flex">
            {/* Main Image Area - Left Side */}
            <div className="flex-1 flex items-center justify-center relative p-8">
              {/* Navigation Arrow - Left */}
              {featuredImages.length > 1 && (
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-espresso bg-opacity-80 text-cream flex items-center justify-center hover:bg-opacity-100 transition-all shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Main Image */}
              <div className="w-full h-full flex items-center justify-center">
                <SafeImage
                  src={featuredImages[currentIndex].url}
                  alt={featuredImages[currentIndex].caption || featuredImages[currentIndex].alt || 'Gallery image'}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>

              {/* Navigation Arrow - Right */}
              {featuredImages.length > 1 && (
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-espresso bg-opacity-80 text-cream flex items-center justify-center hover:bg-opacity-100 transition-all shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              )}

              {/* Dot Indicators - Bottom Center */}
              {featuredImages.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {featuredImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'bg-warm-gold w-8'
                          : 'bg-white bg-opacity-40 hover:bg-opacity-60'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Sidebar - Right Side (Hidden on mobile) */}
            {featuredImages.length > 1 && (
              <div className="hidden lg:block w-32 bg-warm-sage bg-opacity-30 p-4 overflow-y-auto">
                <div className="space-y-3">
                  {featuredImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => goToImage(index)}
                      className={`w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentIndex
                          ? 'border-forest-green shadow-lg'
                          : 'border-transparent hover:border-forest-green hover:border-opacity-50'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <SafeImage
                        src={image.thumbnail || image.url}
                        alt={image.caption || 'Thumbnail'}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Location Highlights */}
      <section 
        id="location" 
        className="py-20 px-6"
        aria-label="Location and nearby attractions"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-serif font-normal text-forest-green mb-4">
              One Prime Location, Three Perfect Spaces
            </h2>
            <p className="text-body text-text-secondary font-sans max-w-2xl mx-auto">
              3 units in one building in La Trinidad Valley, just 15 minutes from Baguio City
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Embedded Google Map */}
            <div className="relative rounded-xl overflow-hidden border border-border-light" style={{ minHeight: '400px' }}>
              <iframe
                title="Nearby Attractions Map"
                src="https://www.google.com/maps?q=tourist%20attractions%20near%20La%20Trinidad%20Benguet&output=embed"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {/* Open in Google Maps Button */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=tourist+attractions+near+La+Trinidad+Benguet"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="text" className="w-full text-warm-gold hover:text-forest-green">
                  Open in Google Maps →
                </Button>
              </a>
            </div>

            {/* Right: Attractions List */}
            <div className="flex flex-col justify-center">
              <h3 className="text-h3 font-serif font-semibold text-forest-green mb-6">
                Everything You Need Nearby
              </h3>
              
              <div className="space-y-6">
                {/* Strawberry Farm */}
                <Link href="/things-to-do/strawberry-picking-la-trinidad-baguio" className="block">
                  <Card variant="standard" className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-warm-gold bg-opacity-10 flex items-center justify-center flex-shrink-0 group-hover:bg-warm-gold group-hover:bg-opacity-20 transition-colors">
                        <span className="text-2xl">🍓</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-sans font-semibold text-forest-green group-hover:text-warm-gold transition-colors">
                            Strawberry Farm
                          </h4>
                          <span className="text-sm font-sans font-medium text-warm-gold">
                            10 min
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          Fresh strawberries and local farm produce
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>

                {/* Burnham Park */}
                <Link href="/things-to-do/burnham-park-baguio-complete-guide" className="block">
                  <Card variant="standard" className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-warm-gold bg-opacity-10 flex items-center justify-center flex-shrink-0 group-hover:bg-warm-gold group-hover:bg-opacity-20 transition-colors">
                        <span className="text-2xl">🏞️</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-sans font-semibold text-forest-green group-hover:text-warm-gold transition-colors">
                            Burnham Park
                          </h4>
                          <span className="text-sm font-sans font-medium text-warm-gold">
                            20 min
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          Iconic park with boating, biking, and picnic areas
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>

                {/* SM Baguio */}
                <Link href="/things-to-do/sm-city-baguio-complete-shopping-dining-guide" className="block">
                  <Card variant="standard" className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-warm-gold bg-opacity-10 flex items-center justify-center flex-shrink-0 group-hover:bg-warm-gold group-hover:bg-opacity-20 transition-colors">
                        <span className="text-2xl">🛍️</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-sans font-semibold text-forest-green group-hover:text-warm-gold transition-colors">
                            SM Baguio
                          </h4>
                          <span className="text-sm font-sans font-medium text-warm-gold">
                            25 min
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          Shopping mall with dining, cinema, and groceries
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>

                {/* Mines View Park */}
                <Link href="/things-to-do/mines-view-park-baguio-complete-guide" className="block">
                  <Card variant="standard" className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-warm-gold bg-opacity-10 flex items-center justify-center flex-shrink-0 group-hover:bg-warm-gold group-hover:bg-opacity-20 transition-colors">
                        <span className="text-2xl">🏔️</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-sans font-semibold text-forest-green group-hover:text-warm-gold transition-colors">
                            Mines View Park
                          </h4>
                          <span className="text-sm font-sans font-medium text-warm-gold">
                            35 min
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          Breathtaking panoramic views of mountain ranges
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>

              {/* Explore More Button */}
              <div className="mt-8 pt-6 border-t border-border-light">
                <Link href="/things-to-do?category=attractions-and-activities">
                  <Button variant="secondary" className="w-full">
                    Explore All Local Attractions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Testimonials */}
      <section 
        id="testimonials" 
        className="py-20 px-6 bg-background-subtle"
        aria-label="Guest reviews and testimonials"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-serif font-normal text-forest-green mb-4">
              What Our Guests Say
            </h2>
            <p className="text-body text-text-secondary font-sans max-w-2xl mx-auto mb-6">
              Real experiences from guests across all our units
            </p>

            {/* Review Statistics */}
            {totalReviews > 0 && (
              <div className="flex items-center justify-center gap-8 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(averageRatingNum) ? 'fill-warm-gold text-warm-gold' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-serif font-bold text-forest-green">{averageRating}</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-sans text-text-secondary">
                    <span className="font-semibold text-forest-green">{totalReviews}</span> {totalReviews === 1 ? 'review' : 'reviews'}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredReviews.map((review) => (
              <TestimonialCard
                key={review.id}
                guestName={review.guestName}
                guestPhoto={review.guestPhoto}
                rating={review.rating}
                date={review.date}
                comment={review.comment}
                hostResponse={review.hostResponse}
                showPhoto={false}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/reviews">
              <Button variant="secondary">
                Read All {totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section 
        id="faq" 
        className="py-20 px-6 bg-cream"
        aria-label="Frequently asked questions"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-serif font-normal text-forest-green mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-body text-text-secondary font-sans max-w-2xl mx-auto">
              Everything you need to know about staying at JMG Nest in La Trinidad Valley
            </p>
          </div>

          <FAQAccordion faqs={faqData} />
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="cta" 
        className="py-20 px-6 bg-warm-sage"
        aria-label="Call to action for booking"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-h2 font-serif font-normal text-forest-green mb-6">
            Ready to Choose Your Perfect Space?
          </h2>
          <p className="text-body text-text-secondary font-sans mb-8 max-w-2xl mx-auto">
            Browse our three beautiful units in La Trinidad Valley and book the one that's perfect for your 
            Baguio City adventure. Each space offers unique charm and modern comfort, all just minutes from Baguio's top attractions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button variant="primary">
                View All Units
              </Button>
            </Link>
            <Link href="/booking">
              <Button variant="secondary">
                Compare Units
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
