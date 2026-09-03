'use client'

/**
 * DEBUG: When calendar should be open, run this in browser console:
 * 
 * // Check all document.body children
 * Array.from(document.body.children).forEach((el, i) => {
 *   console.log(`Child ${i}:`, {
 *     tag: el.tagName,
 *     id: el.id,
 *     classes: el.className.substring(0, 100),
 *     style: el.getAttribute('style')?.substring(0, 100),
 *     visible: window.getComputedStyle(el).display !== 'none',
 *     zIndex: window.getComputedStyle(el).zIndex,
 *     position: window.getComputedStyle(el).position
 *   });
 * });
 * 
 * // Find calendar element specifically
 * document.querySelector('[role="dialog"][aria-label*="date picker"]')
 * 
 * // Find all fixed positioned elements
 * Array.from(document.querySelectorAll('[style*="position: fixed"]')).map(el => ({
 *   element: el.tagName,
 *   classes: el.className,
 *   top: el.style.top,
 *   left: el.style.left,
 *   zIndex: window.getComputedStyle(el).zIndex,
 *   visible: window.getComputedStyle(el).visibility !== 'hidden' && 
 *            window.getComputedStyle(el).display !== 'none' &&
 *            window.getComputedStyle(el).opacity !== '0'
 * }))
 */

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Unit } from '@/lib/types'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AvailabilityDatePickerProps {
  label: string
  value: string
  onChange: (value: string) => void
  unit: Unit
  mode: 'check-in' | 'check-out'
  minDate?: string
  checkInDate?: string
  blockedDates?: string[]
  className?: string
  /**
   * Optional group identifier so the check-in picker can tell the matching
   * check-out picker to open after a date is selected.
   */
  groupId?: string
}

export default function AvailabilityDatePicker({
  label,
  value,
  onChange,
  unit,
  mode,
  minDate,
  checkInDate,
  blockedDates = [],
  className,
  groupId,
}: AvailabilityDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)

  // Set portal element on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && document.body) {
      setMounted(true)
      setPortalElement(document.body)
      console.log('✅ Portal element set:', document.body)
    }
  }, [])

  useEffect(() => {
    if (value) {
      const date = new Date(value)
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1))
    }
  }, [value])

  // Close calendar when pressing ESC
  // (Click-outside is temporarily disabled to avoid flicker/instant close issues)
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('🔄 Closing calendar - ESC pressed')
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateBlocked = (date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0]
    return blockedDates.includes(dateStr)
  }

  const isDateDisabled = (date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0]

    // Check if before minimum date
    if (minDate && dateStr < minDate) return true

    // Check if blocked
    if (isDateBlocked(date)) return true

    // For check-out, must be after check-in
    if (mode === 'check-out' && checkInDate) {
      if (dateStr <= checkInDate) return true
    }

    return false
  }

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    )
    const dateStr = selectedDate.toISOString().split('T')[0]

    if (!isDateDisabled(selectedDate)) {
      onChange(dateStr)

      // For check-in: close this picker, then ask matching check-out picker to open.
      if (mode === 'check-in') {
        setIsOpen(false)

        if (groupId && typeof window !== 'undefined') {
          const event = new CustomEvent('availability:openNext', {
            detail: { groupId, action: 'open-check-out' as const },
          })
          window.dispatchEvent(event)
        }
      } else {
        // For check-out: close the picker after selection.
        setIsOpen(false)
      }
    }
  }

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    )
  }

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    )
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 })

  // Calculate position for portal - ensure it's visible
  useEffect(() => {
    if (isOpen && inputRef.current && typeof window !== 'undefined') {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (!inputRef.current || typeof window === 'undefined') return
        
        const rect = inputRef.current.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const calendarWidth = 360 // min-w-[360px] from className
        const calendarHeight = 420 // approximate height including padding
        
        // Calculate optimal position
        let left = rect.left + window.scrollX
        let top = rect.bottom + window.scrollY + 8
        
        // Ensure calendar doesn't go off right edge
        if (left + calendarWidth > viewportWidth + window.scrollX) {
          left = Math.max(window.scrollX + 8, viewportWidth + window.scrollX - calendarWidth - 8)
        }
        
        // Ensure calendar doesn't go off left edge
        if (left < window.scrollX) {
          left = window.scrollX + 8
        }
        
        // If calendar goes off bottom, show above input instead
        if (top + calendarHeight > viewportHeight + window.scrollY) {
          const topAbove = rect.top + window.scrollY - calendarHeight - 8
          if (topAbove >= window.scrollY) {
            top = topAbove
          } else {
            // If still off-screen, position at viewport center
            top = window.scrollY + Math.max(8, (viewportHeight - calendarHeight) / 2)
          }
        }
        
        setCalendarPosition({ top, left })
        
        console.log('📍 Calendar position calculated:', {
          inputRect: { 
            top: rect.top, 
            bottom: rect.bottom, 
            left: rect.left, 
            right: rect.right,
            width: rect.width,
            height: rect.height
          },
          viewport: { width: viewportWidth, height: viewportHeight },
          position: { top, left },
          scroll: { x: window.scrollX, y: window.scrollY },
          calendarSize: { width: calendarWidth, height: calendarHeight }
        })
      })
    }
  }, [isOpen])

  // Listen for a custom event to open the check-out picker after check-in selection.
  useEffect(() => {
    if (!groupId) return

    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ groupId: string; action: 'open-check-out' }>
      if (
        custom.detail &&
        custom.detail.groupId === groupId &&
        custom.detail.action === 'open-check-out' &&
        mode === 'check-out'
      ) {
        setIsOpen(true)
      }
    }

    window.addEventListener('availability:openNext', handler as EventListener)
    return () => {
      window.removeEventListener('availability:openNext', handler as EventListener)
    }
  }, [groupId, mode])

  // Debug logging
  useEffect(() => {
    if (isOpen) {
      console.log('📅 AvailabilityDatePicker - Calendar opened:', {
        mode,
        currentMonth: `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`,
        daysInMonth,
        firstDay,
        blockedDatesCount: blockedDates.length,
        position: calendarPosition
      })
    }
  }, [isOpen, currentMonth, daysInMonth, firstDay, blockedDates.length, calendarPosition, mode])


  return (
    <div className={cn('relative', className)}>
      <label className="block text-sm font-sans font-medium text-text-primary mb-2">
        {label}
      </label>
      <div ref={inputRef} className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()

            // Always OPEN the calendar from this button; closing is handled by:
            // - clicking outside (handleClickOutside)
            // - pressing ESC (handleEscape)
            // - selecting a check-in date (handleDateSelect for mode === 'check-in')
            if (!isOpen) {
              setIsOpen(true)

              // Calculate initial position based on input field
              if (inputRef.current && typeof window !== 'undefined') {
                // Defer to next tick so layout is stable
                setTimeout(() => {
                  const rect = inputRef.current?.getBoundingClientRect()
                  if (rect && typeof window !== 'undefined') {
                    const newPosition = {
                      top: rect.bottom + window.scrollY + 8,
                      left: rect.left + window.scrollX,
                    }
                    console.log('📍 Setting initial calendar position (open button):', newPosition)
                    setCalendarPosition(newPosition)
                  }
                }, 0)
              }
            }
          }}
          className={cn(
            'w-full px-4 py-3 text-left border-2 rounded-lg transition-colors flex items-center justify-between',
            value
              ? 'border-forest-green bg-white text-forest-green'
              : 'border-border-light bg-white text-text-secondary hover:border-warm-sage',
            isOpen && 'border-forest-green ring-2 ring-forest-green/10'
          )}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <span className={value ? 'text-forest-green font-medium' : 'text-text-tertiary'}>
            {value ? formatDate(value) : 'Select date'}
          </span>
          <Calendar className={cn(
            'w-5 h-5 transition-colors',
            isOpen ? 'text-forest-green' : 'text-text-tertiary'
          )} />
        </button>

        {/* Calendar Popup - Full calendar with all features */}
        {isOpen && mounted && portalElement && createPortal(
          <div
            ref={calendarRef}
            style={{
              // Centered modal-style positioning so it's always visible in viewport
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 99999,
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              border: '2px solid #2d5016',
              padding: '16px',
              minWidth: '320px',
              maxWidth: '360px',
              display: 'block',
              visibility: 'visible',
              opacity: 1
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`${mode === 'check-in' ? 'Check-in' : 'Check-out'} date picker`}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-warm-sage rounded-lg transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5 text-forest-green" />
              </button>
              <h3 className="text-h4 font-serif font-semibold text-forest-green">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-warm-sage rounded-lg transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5 text-forest-green" />
              </button>
            </div>

            {/* Calendar Grid - Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-text-secondary py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid - Dates */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before first day of month */}
              {Array.from({ length: firstDay }).map((_, index) => (
                <div 
                  key={`empty-${index}`} 
                  className="aspect-square min-h-[36px] bg-gray-50 border border-gray-200 rounded-lg"
                  aria-hidden="true"
                />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1
                const date = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                )
                const dateStr = date.toISOString().split('T')[0]
                const isDisabled = isDateDisabled(date)
                const isBlocked = isDateBlocked(date)
                const isSelected = value === dateStr
                const isToday =
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear()

                return (
                  <button
                    key={`day-${day}`}
                    onClick={() => {
                      console.log('📅 Date clicked in picker:', {
                        day,
                        dateStr,
                        isDisabled,
                        isBlocked,
                        isSelected
                      })
                      handleDateSelect(day)
                    }}
                    disabled={isDisabled}
                    className={cn(
                      'aspect-square min-h-[36px] w-full flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200 relative',
                      'border-2',
                      isSelected
                        ? 'bg-forest-green text-cream font-semibold border-forest-green shadow-md'
                        : isBlocked
                        ? 'bg-[#8B4513]/10 text-[#8B4513] cursor-not-allowed border-[#8B4513]/30'
                        : isDisabled
                        ? 'text-text-tertiary cursor-not-allowed hover:bg-warm-sage border-border-light'
                        : 'text-text-primary hover:bg-warm-sage hover:text-forest-green border-border-light hover:border-forest-green hover:shadow-sm',
                      isToday && !isSelected && 'ring-2 ring-warm-gold ring-offset-1'
                    )}
                    aria-label={`Select ${dateStr}${isBlocked ? ' (blocked)' : isDisabled ? ' (disabled)' : ''}`}
                    style={{
                      display: 'flex',
                      visibility: 'visible',
                      opacity: isDisabled && !isBlocked ? 0.5 : 1
                    }}
                  >
                    <span className="select-none">{day}</span>
                    {isBlocked && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8B4513]" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-4 border-t border-border-light flex items-center gap-4 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-forest-green"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#8B4513]/30"></div>
                <span>Blocked</span>
              </div>
            </div>
          </div>,
          portalElement
        )}
        
      </div>
    </div>
  )
}

