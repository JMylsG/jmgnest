'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import BookingForm from '@/components/forms/BookingForm'
import { cn } from '@/lib/utils'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Close on Escape key
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Focus trap
  useEffect(() => {
    if (typeof window === 'undefined' || !document.body) return
    
    if (isOpen) {
      closeButtonRef.current?.focus()
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

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/80 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-cream rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-cream border-b border-border-light px-6 py-4 flex items-center justify-between z-10">
          <h2 className="heading-h3 text-forest-green">Request a Booking</h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 text-forest-green hover:bg-warm-sage rounded-lg transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 lg:p-8">
          <BookingForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  )
}

