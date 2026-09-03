'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQCarouselProps {
  faqs: FAQItem[]
  className?: string
}

export default function FAQCarousel({ faqs, className }: FAQCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % faqs.length)
  }, [faqs.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + faqs.length) % faqs.length)
  }, [faqs.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
    // Prevent text selection during swipe
    if (Math.abs(e.targetTouches[0].clientX - touchStart) > 10) {
      e.preventDefault()
    }
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false)
      return
    }

    const distance = touchStart - touchEnd
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      goToNext()
    } else if (distance < -minSwipeDistance) {
      goToPrevious()
    }

    setTouchStart(0)
    setTouchEnd(0)
    setIsDragging(false)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle arrow keys when not typing in an input/textarea
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNext()
      }
    }

    // Add listener to window for keyboard navigation
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [goToNext, goToPrevious])

  // Auto-play (optional - pauses on hover/touch)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isAutoPlaying || isPaused || faqs.length <= 1) return

    const interval = setInterval(() => {
      goToNext()
    }, 6000) // Change every 6 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, isPaused, goToNext, faqs.length])

  if (faqs.length === 0) return null

  return (
    <div 
      className={className}
      aria-label="Frequently Asked Questions Carousel"
      role="region"
    >
      {/* Carousel Container */}
      <div 
        ref={containerRef}
        className="relative max-w-4xl mx-auto"
        tabIndex={0}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => {
          // Resume after a delay
          setTimeout(() => setIsPaused(false), 3000)
        }}
      >
        {/* Carousel Track with peek effect */}
        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}%))`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="group"
            aria-roledescription="carousel"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85%] md:w-[83.33%] lg:w-[80%] px-2 md:px-4 lg:px-6"
                role="group"
                aria-roledescription="slide"
                aria-label={`Question ${index + 1} of ${faqs.length}`}
                aria-hidden={index !== currentIndex}
              >
                <div 
                  className={`
                    bg-white rounded-xl p-6 md:p-8 lg:p-10
                    shadow-lg
                    transition-shadow duration-300
                    hover:shadow-xl
                    min-h-[280px] md:min-h-[240px]
                    flex flex-col
                    ${isDragging ? 'select-none' : ''}
                  `}
                >
                  <h3 className="font-sans font-semibold text-lg md:text-xl lg:text-2xl text-forest-green mb-3 md:mb-4 leading-tight">
                    {faq.question}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed flex-1">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {faqs.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute top-1/2 -translate-y-1/2 z-10 left-3 md:-left-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-forest-green text-white flex items-center justify-center shadow-md transition-all duration-200 hover:bg-warm-gold hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-warm-gold focus:ring-offset-2"
                aria-label="Previous question"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <button
                onClick={goToNext}
                className="absolute top-1/2 -translate-y-1/2 z-10 right-3 md:-right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-forest-green text-white flex items-center justify-center shadow-md transition-all duration-200 hover:bg-warm-gold hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-warm-gold focus:ring-offset-2"
                aria-label="Next question"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {faqs.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6" role="tablist">
            {faqs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-200 rounded-full ${
                  index === currentIndex
                    ? 'w-3 h-3 bg-warm-gold'
                    : 'w-2 h-2 bg-warm-sage opacity-40 hover:opacity-60'
                }`}
                aria-label={`Go to question ${index + 1}`}
                aria-selected={index === currentIndex}
                role="tab"
              />
            ))}
          </div>
        )}

        {/* Screen Reader Announcement */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Showing question {currentIndex + 1} of {faqs.length}
        </div>
      </div>
    </div>
  )
}
