'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import NavigationMenu from './NavigationMenu'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  // Scroll detection for sticky header style change
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/things-to-do', label: 'Things to Do' },
    { href: '/booking', label: 'Our Units' },
    { href: '/contact', label: 'Contact' },
  ]

  // Check if a path is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    // Special handling for /booking paths (Our Units)
    if (href === '/booking') {
      return pathname === '/booking' || pathname.startsWith('/booking/')
    }
    return pathname.startsWith(href)
  }

  // Determine nav styling based on page and scroll state
  const getNavStyles = () => {
    if (isHomePage) {
      // On home page: transparent overlay, hide when scrolled, no blur
      if (isScrolled) {
        return 'lg:opacity-0 lg:pointer-events-none'
      }
      return 'bg-transparent border-transparent'
    } else {
      // On other pages: solid background with blur
      return isScrolled
        ? 'bg-cream/98 shadow-md border-border-light backdrop-blur-[10px]'
        : 'bg-cream/95 border-border-light backdrop-blur-[10px]'
    }
  }

  // Determine logo visibility
  const getLogoStyles = () => {
    if (isHomePage && isScrolled) {
      return 'opacity-0 pointer-events-none'
    }
    return 'opacity-100'
  }

  // Determine menu button styles
  const getMenuButtonStyles = () => {
    if (isHomePage) {
      return 'text-cream hover:text-warm-gold hover:bg-white hover:bg-opacity-10'
    }
    return 'text-forest-green hover:text-warm-gold'
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-30 py-4 
          transition-opacity duration-300
          ${isHomePage ? '' : 'backdrop-blur-[10px]'}
          ${getNavStyles()}
        `}
      >
        <div className="w-full flex items-center justify-between px-6 md:px-12 lg:px-16">
          {/* Logo - Hidden on all devices when scrolled on home page */}
          <Link 
            href="/" 
            className={`
              flex items-center transition-opacity duration-300
              ${getLogoStyles()}
            `}
          >
            <span className={`text-2xl font-serif font-bold ${
              isHomePage ? 'text-cream' : 'text-forest-green'
            }`}>
              JMG Nest
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on home page, visible and aligned right on other pages */}
          {!isHomePage && (
            <div className="hidden lg:flex items-center gap-2 ml-2">
              {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-[0.938rem] font-medium font-sans tracking-[0.05em] rounded transition-all duration-200 ${
                      active
                        ? 'text-forest-green bg-warm-sage font-semibold'
                        : 'text-forest-green hover:text-warm-gold hover:bg-warm-gold/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          )}

          {/* Hamburger Menu Button - Always visible on home page, only mobile/tablet on other pages */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`${isHomePage ? '' : 'lg:hidden'} p-2 rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center group ${
              getMenuButtonStyles()
            }`}
            aria-label="Open navigation menu"
          >
            <div className="flex flex-col gap-1.5">
              {/* Top line - solid */}
              <div className={`w-6 h-0.5 rounded-full transition-all duration-300 ${
                isHomePage ? 'bg-cream' : 'bg-forest-green'
              }`}></div>
              {/* Middle line - recessed/darker */}
              <div className={`w-6 h-0.5 rounded-full transition-all duration-300 ${
                isHomePage ? 'bg-cream bg-opacity-40 group-hover:bg-opacity-60' : 'bg-forest-green bg-opacity-40 group-hover:bg-opacity-60'
              }`}></div>
              {/* Bottom line - solid */}
              <div className={`w-6 h-0.5 rounded-full transition-all duration-300 ${
                isHomePage ? 'bg-cream' : 'bg-forest-green'
              }`}></div>
            </div>
          </button>
        </div>
      </nav>

      {/* Navigation Menu Slide-out - Works on all screen sizes */}
      <NavigationMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
