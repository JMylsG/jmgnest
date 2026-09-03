'use client'

import { useState, useEffect, useMemo } from 'react'
import { Unit, GalleryImage } from '@/lib/types'
import { getGalleryImages, getImagesByUnit } from '@/lib/data'
import { getBlockedDatesArray } from '@/lib/calendar'
import Card from '@/components/cards/Card'
import Badge from '@/components/ui/Badge'
import AvailabilityDatePicker from './AvailabilityDatePicker'
import PricingSummary from './PricingSummary'
import { useBooking } from '@/hooks/useBooking'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SafeImage from '@/components/ui/SafeImage'
import { Star } from 'lucide-react'
import BookingOptions from './BookingOptions'

interface UnitBookingContentProps {
  unit: Unit
}

export default function UnitBookingContent({ unit }: UnitBookingContentProps) {
  const {
    selectedDates,
    setSelectedDates,
    guests,
    setGuests,
    pricing,
    calculatePrice,
    loading,
    error: bookingError,
  } = useBooking(unit)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [blockedDates, setBlockedDates] = useState<string[]>([])
  const [blockedDateRanges, setBlockedDateRanges] = useState<Array<{ start: string; end: string; title: string }>>([])
  const [availabilityStatus, setAvailabilityStatus] = useState<'available' | 'blocked' | null>(null)
  const [availabilityError, setAvailabilityError] = useState<string | null>(null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [imagesLoading, setImagesLoading] = useState(true)

  // Fetch gallery images for this unit
  useEffect(() => {
    async function loadGalleryImages() {
      try {
        setImagesLoading(true)
        const allImages = await getGalleryImages()
        console.log('All gallery images loaded:', allImages.length)
        
        const unitImages = getImagesByUnit(unit.id, allImages)
        console.log(`Filtered images for unit "${unit.id}":`, unitImages.length)
        console.log('Unit images:', unitImages.map(img => ({ id: img.id, unit: img.unit, url: img.url })))
        
        // Sort images by order for consistent display
        const sortedImages = unitImages.sort((a, b) => (a.order || 0) - (b.order || 0))
        setGalleryImages(sortedImages)
        
        // Reset image index when new images load
        if (sortedImages.length > 0) {
          setCurrentImageIndex(0)
        }
      } catch (error) {
        console.error('Error loading gallery images:', error)
        // Fallback to unit.images if gallery fetch fails
        setGalleryImages([])
        setCurrentImageIndex(0)
      } finally {
        setImagesLoading(false)
      }
    }
    loadGalleryImages()
  }, [unit.id])

  // Fetch blocked dates from Google Calendar via API route
  useEffect(() => {
    async function loadBlockedDates() {
      if (!unit.calendarId) {
        console.log('No calendar ID for unit:', unit.id)
        return
      }

      try {
        console.log('Fetching blocked dates for calendar:', unit.calendarId)
        
        // Use the API route instead of direct fetch (same as calendar page)
        const currentMonth = new Date()
        const month = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        
        const response = await fetch(`/api/availability/${unit.id}?month=${month}&tz=${encodeURIComponent(timezone)}`)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `Failed to fetch availability: ${response.status}`)
        }
        
        const data = await response.json()
        const blockedRanges = data.blocked || []
        
        // Transform to the format expected by the component
        const transformedRanges = blockedRanges.map((range: any) => ({
          start: range.start.split('T')[0], // Extract date part
          end: range.end.split('T')[0], // Extract date part
          title: range.summary || 'Blocked'
        }))
        
        setBlockedDateRanges(transformedRanges)
        
        // Convert ranges to array of individual dates for the calendar display
        const datesArray = getBlockedDatesArray(transformedRanges)
        setBlockedDates(datesArray)
        console.log('Loaded blocked dates:', datesArray.length)
      } catch (error) {
        console.error('Error loading blocked dates:', error)
        // Keep existing blocked dates on error
        setAvailabilityError('Unable to load calendar availability. Please try again.')
      }
    }
    loadBlockedDates()
  }, [unit.calendarId, unit.id])

  // Determine which images to use: gallery images if available, otherwise fallback to unit.images
  const displayImages = useMemo(() => {
    if (galleryImages.length > 0) {
      console.log('Using gallery images:', galleryImages.length)
      return galleryImages.map(img => img.url)
    } else {
      console.log('Using unit.images fallback:', unit.images.length)
      return unit.images
    }
  }, [galleryImages, unit.images])

  // Debug logging
  useEffect(() => {
    console.log('=== Image Debug ===')
    console.log('Gallery images count:', galleryImages.length)
    console.log('Unit images count:', unit.images.length)
    console.log('Display images count:', displayImages.length)
    console.log('Current image index:', currentImageIndex)
    if (displayImages.length > 0) {
      console.log('Current image URL:', displayImages[currentImageIndex])
      console.log('All display image URLs:', displayImages)
    }
    console.log('==================')
  }, [displayImages, galleryImages.length, unit.images.length, currentImageIndex])

  // Ensure currentImageIndex is within bounds
  useEffect(() => {
    if (displayImages.length > 0 && currentImageIndex >= displayImages.length) {
      setCurrentImageIndex(0)
    }
  }, [displayImages.length, currentImageIndex])

  const handleDateChange = async (field: 'checkIn' | 'checkOut', value: string) => {
    const newDates = { ...selectedDates, [field]: value }
    setSelectedDates(newDates)
    setAvailabilityStatus(null)
    setAvailabilityError(null)

    // Calculate price immediately
    if (newDates.checkIn && newDates.checkOut) {
      calculatePrice(newDates.checkIn, newDates.checkOut, guests)
      
      // Check availability from Google Calendar via API
      if (unit.calendarId && newDates.checkIn && newDates.checkOut) {
        try {
          // Check if dates overlap with blocked ranges
          const checkInDate = new Date(newDates.checkIn)
          const checkOutDate = new Date(newDates.checkOut)
          
          const isBlocked = blockedDateRanges.some(range => {
            const rangeStart = new Date(range.start)
            const rangeEnd = new Date(range.end)
            
            // Check for overlap: check-in must be before range end, check-out must be after range start
            // Also account for same-day turnaround (check-in can be on day after check-out)
            const availableFromDate = new Date(rangeEnd)
            availableFromDate.setDate(availableFromDate.getDate() + 1) // Day after last blocked day
            
            return checkInDate < availableFromDate && checkOutDate > rangeStart
          })
          
          setAvailabilityStatus(isBlocked ? 'blocked' : 'available')
          setAvailabilityError(null)
        } catch (error) {
          console.error('Error checking availability:', error)
          setAvailabilityError('Unable to check availability. Please try again.')
        }
      }
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)
  }

  return (
    <section className="py-20 px-6 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Unit Details + Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Unit Image Gallery */}
            {!imagesLoading && displayImages.length > 0 && (
              <Card variant="elevated">
                <div className="relative aspect-video overflow-hidden rounded-xl -m-10 mb-0">
                  <SafeImage
                    key={`${displayImages[currentImageIndex]}-${currentImageIndex}`}
                    src={displayImages[currentImageIndex]}
                    alt={galleryImages.length > 0 && galleryImages[currentImageIndex] 
                      ? galleryImages[currentImageIndex].alt 
                      : unit.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority={currentImageIndex === 0}
                    quality={85}
                  />
                  {displayImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-colors z-10"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5 text-forest-green" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-colors z-10"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5 text-forest-green" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {displayImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex
                                ? 'bg-white'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </Card>
            )}
            {imagesLoading && (
              <Card variant="elevated">
                <div className="relative aspect-video overflow-hidden rounded-xl -m-10 mb-0 bg-warm-sage flex items-center justify-center">
                  <p className="text-body text-text-secondary">Loading images...</p>
                </div>
              </Card>
            )}

            {/* Photo strip (removed per request to revert changes) */}

            {/* Unit Description Section */}
            <Card variant="elevated">
              <h2 className="heading-h3 mb-4">About This Space</h2>
              <div className="text-body text-text-primary mb-8 space-y-4">
                {unit.fullDescription
                  .split(/\n{3,}/) // Split on 3+ consecutive newlines
                  .filter((para) => para.trim()) // Remove empty paragraphs
                  .map((para, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {para.trim()}
                    </p>
                  ))}
              </div>

              {/* Amenities */}
              <div className="mt-8">
                <h3 className="heading-h3 mb-4">Amenities</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {unit.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-2 text-body text-text-primary">
                      <span className="text-warm-gold">✓</span>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* House Rules */}
              {unit.houseRules && unit.houseRules.length > 0 && (
                <div className="mt-8 pt-8 border-t border-border-light">
                  <h3 className="text-h3 font-serif font-semibold text-forest-green mb-8 text-center">
                    House Rules
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center mb-8">
                    <Badge variant="default">No Smoking</Badge>
                    <Badge variant="default">No Pets</Badge>
                    <Badge variant="default">No Parties</Badge>
                    <Badge variant="default">Check-in: 3:00 PM</Badge>
                    <Badge variant="default">Check-out: 11:00 AM</Badge>
                    <Badge variant="default">Minimum Stay: {unit.pricing.minNights} Nights</Badge>
                  </div>
                  <p className="text-body text-text-secondary font-sans text-center leading-relaxed">
                    We ask all guests to respect our property and neighbors. Please follow these guidelines to ensure a pleasant stay for everyone.
                  </p>
                </div>
              )}

              {/* Reviews Preview */}
              {unit.reviews && unit.reviews.length > 0 && (
                <div className="mt-8 pt-8 border-t border-border-light">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < (unit.rating || 5)
                              ? 'fill-warm-gold text-warm-gold'
                              : 'fill-border-light text-border-light'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-body text-text-secondary font-medium">
                      {unit.rating || 5} · {unit.reviews.length} review{unit.reviews.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {unit.airbnbUrl && (
                    <a
                      href={unit.airbnbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body text-warm-gold hover:text-forest-green transition-colors"
                    >
                      View All Reviews on Airbnb →
                    </a>
                  )}
                </div>
              )}
            </Card>

            {/* Booking Form Card */}
            <Card variant="elevated">
              <h2 className="heading-h3 mb-8">Check Availability</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AvailabilityDatePicker
                    label="Check-in Date *"
                    value={selectedDates.checkIn}
                    onChange={(value) => handleDateChange('checkIn', value)}
                    unit={unit}
                    mode="check-in"
                    minDate={new Date().toISOString().split('T')[0]}
                    blockedDates={blockedDates}
                    groupId={unit.id} // link check-in and check-out pickers
                  />
                  <AvailabilityDatePicker
                    label="Check-out Date *"
                    value={selectedDates.checkOut}
                    onChange={(value) => handleDateChange('checkOut', value)}
                    unit={unit}
                    mode="check-out"
                    checkInDate={selectedDates.checkIn}
                    minDate={selectedDates.checkIn || new Date().toISOString().split('T')[0]}
                    blockedDates={blockedDates}
                    groupId={unit.id} // link check-in and check-out pickers
                  />
                </div>

                {/* Availability Status */}
                {availabilityStatus === 'blocked' && (
                  <div className="p-4 bg-[#8B4513]/10 border border-[#8B4513] rounded-lg">
                    <p className="text-sm text-[#8B4513] font-sans font-medium">
                      The selected dates are not available. Please choose different dates.
                    </p>
                  </div>
                )}
                {availabilityStatus === 'available' && (
                  <div className="p-4 bg-forest-green/10 border border-forest-green rounded-lg">
                    <p className="text-sm text-forest-green font-sans font-medium">
                      Selected dates are available.
                    </p>
                  </div>
                )}
                {availabilityError && (
                  <div className="p-4 bg-[#8B4513]/10 border border-[#8B4513] rounded-lg">
                    <p className="text-sm text-[#8B4513] font-sans">{availabilityError}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-sans font-medium text-text-primary mb-2">
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-12 h-12 rounded-full border-2 border-border-light flex items-center justify-center hover:border-forest-green transition-colors"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-sans text-lg text-text-primary">
                      {guests} {guests === 1 ? 'Guest' : 'Guests'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(unit.capacity.guests, guests + 1))}
                      className="w-12 h-12 rounded-full border-2 border-border-light flex items-center justify-center hover:border-forest-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={guests >= unit.capacity.guests}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-sans text-text-secondary mt-2">
                    Maximum {unit.capacity.guests} guests
                  </p>
                </div>

                {bookingError && (
                  <div className="p-4 bg-[#8B4513]/10 border border-[#8B4513] rounded-lg">
                    <p className="text-sm text-[#8B4513] font-sans">{bookingError}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Three Ways to Book */}
            <BookingOptions
              unit={unit}
              checkIn={selectedDates.checkIn || undefined}
              checkOut={selectedDates.checkOut || undefined}
              className="mt-8"
            />
          </div>

          {/* Right: Price Summary (sticky) */}
          <div>
            <PricingSummary unit={unit} pricing={pricing} selectedDates={selectedDates} />
          </div>
        </div>
      </div>
    </section>
  )
}

