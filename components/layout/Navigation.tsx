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
    // Transparent only over the home hero at the very top; espresso-solid everywhere else
    if (isHomePage && !isScrolled) {
      return 'bg-transparent border-transparent'
    }
    return 'bg-[rgba(22,17,12,0.9)] backdrop-blur-[16px] border-b border-white/10 shadow-md'
  }

  // Logo stays visible at all times
  const getLogoStyles = () => 'opacity-100'

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
            <span className="text-2xl font-serif font-bold text-cream">
              JMG Nest
            </span>
          </Link>

          {/* Desktop pill nav - visible on all pages */}
          <div className="hidden lg:flex items-center gap-0.5 p-1.5 rounded-full bg-[rgba(32,25,17,0.42)] backdrop-blur-[12px] border border-white/10">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-[17px] py-2.5 rounded-full text-xs font-bold font-sans uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-200 ${
                    active
                      ? 'text-cream bg-white/[0.12]'
                      : 'text-cream/70 hover:text-cream hover:bg-white/[0.07]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Hamburger Menu Button - Always visible on home page, only mobile/tablet on other pages */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center group text-cream hover:text-warm-gold"
            aria-label="Open navigation menu"
          >
            <div className="flex flex-col gap-1.5">
              <div className="w-6 h-0.5 rounded-full bg-cream transition-all duration-300"></div>
              <div className="w-6 h-0.5 rounded-full bg-cream bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300"></div>
              <div className="w-6 h-0.5 rounded-full bg-cream transition-all duration-300"></div>
            </div>
          </button>
        </div>
      </nav>

      {/* Navigation Menu Slide-out - Works on all screen sizes */}
      <NavigationMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
