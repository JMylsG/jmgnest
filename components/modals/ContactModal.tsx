'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'
import { cn } from '@/lib/utils'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
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

  // Focus management
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-forest-green/80 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-cream rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-cream border-b border-border-light px-6 py-4 flex items-center justify-between z-10">
          <h2 className="heading-h3 text-forest-green">Contact Us</h2>
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
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

