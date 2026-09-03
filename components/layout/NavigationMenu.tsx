'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import Button from '@/components/ui/Button'

interface NavigationMenuProps {
  isOpen: boolean
  onClose: () => void
}

const NavigationMenu = ({ isOpen, onClose }: NavigationMenuProps) => {
  const pathname = usePathname()

  // Lock body scroll when menu is open
  useEffect(() => {
    if (typeof window === 'undefined' || !document.body) return
    
    if (isOpen) {
      document.body.style.overflow = 'hidden'

      // Handle ESC key press
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
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
  }, [isOpen, onClose])

  // Close menu when clicking a nav link
  const handleLinkClick = () => {
    onClose()
  }

  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/things-to-do', label: 'Things to Do' },
    { path: '/booking', label: 'Our Units' },
    { path: '/contact', label: 'Contact' }
  ]

  // Check if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    // Special handling for /booking paths (Our Units)
    if (path === '/booking') {
      return pathname === '/booking' || pathname.startsWith('/booking/')
    }
    return pathname.startsWith(path)
  }

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-out menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full md:w-[400px] 
          bg-cream z-50
          shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <h2 className="text-h4 font-serif font-semibold text-forest-green">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-forest-green hover:text-warm-gold hover:bg-warm-gold hover:bg-opacity-10 rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col p-6 pb-24">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={handleLinkClick}
              className={`
                px-4 py-4 mb-2
                text-body font-sans font-medium
                text-forest-green
                rounded-lg
                transition-all duration-300
                min-h-[44px] flex items-center
                ${
                  isActive(link.path)
                    ? 'bg-warm-gold bg-opacity-10 text-warm-gold font-semibold'
                    : 'hover:bg-warm-gold hover:bg-opacity-10 hover:text-warm-gold'
                }
              `}
              aria-current={isActive(link.path) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Check Availability button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border-light bg-cream">
          <Link href="/booking" onClick={handleLinkClick} className="block">
            <Button variant="primary" className="w-full">
              CHECK AVAILABILITY
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NavigationMenu

