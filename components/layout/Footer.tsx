'use client'

import Link from 'next/link'
import { Facebook, Mail, MapPin } from 'lucide-react'

// Custom Google Icon Component
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"/>
  </svg>
)

// Custom Airbnb Icon Component - Official Airbnb Bélo logo
const AirbnbIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M29.524 22.279c-0.372-1.044-0.752-1.907-1.183-2.74l0.058 0.123v-0.038c-2.361-5.006-4.551-9.507-6.632-13.551l-0.139-0.204c-1.483-3.040-2.544-4.866-5.627-4.866-3.049 0-4.344 2.118-5.667 4.871l-0.101 0.2c-2.086 4.044-4.275 8.551-6.627 13.555v0.066l-0.699 1.525c-0.262 0.63-0.396 0.96-0.431 1.058-0.279 0.691-0.441 1.492-0.441 2.332 0 3.526 2.859 6.385 6.385 6.385 0.020 0 0.040-0 0.060-0l-0.003 0c0.117-0 0.232-0.012 0.342-0.036l-0.011 0.002h0.465c2.744-0.574 5.073-2.061 6.71-4.121l0.018-0.024c1.656 2.082 3.983 3.568 6.65 4.132l0.075 0.013h0.465c0.099 0.021 0.214 0.034 0.331 0.034h0c0.017 0 0.038 0 0.059 0 3.526 0 6.384-2.858 6.384-6.384 0-0.84-0.162-1.642-0.457-2.376l0.015 0.043zM27.999 25.266c-0.262 1.581-1.309 2.87-2.719 3.467l-0.030 0.011c-2.815 1.225-5.602-0.729-7.988-3.379 3.945-4.937 4.674-8.782 2.98-11.269-0.887-1.289-2.353-2.123-4.015-2.123-0.080 0-0.159 0.002-0.237 0.006l0.011-0c-0.023-0-0.049-0.001-0.076-0.001-2.816 0-5.098 2.282-5.098 5.098 0 0.583 0.098 1.142 0.278 1.664l-0.011-0.036c0.782 2.574 2.032 4.8 3.665 6.686l-0.019-0.023c-0.978 1.128-2.103 2.094-3.352 2.879l-0.062 0.036c-0.657 0.387-1.43 0.657-2.256 0.758l-0.029 0.003c-0.186 0.027-0.401 0.043-0.62 0.043-2.474 0-4.48-2.006-4.48-4.48 0-0.599 0.117-1.17 0.33-1.692l-0.011 0.030c0.165-0.431 0.494-1.225 1.056-2.451l0.031-0.066c1.829-3.971 4.051-8.485 6.604-13.49l0.066-0.165 0.725-1.395c0.348-0.857 0.932-1.559 1.672-2.043l0.017-0.010c0.425-0.248 0.935-0.395 1.48-0.395 0.027 0 0.054 0 0.081 0.001l-0.004-0c1.024 0.009 1.933 0.497 2.514 1.251l0.006 0.008c0.197 0.299 0.431 0.696 0.727 1.191l0.697 1.361 0.1 0.199c2.551 5.004 4.775 9.507 6.597 13.489l0.033 0.031 0.666 1.525 0.397 0.955c0.199 0.493 0.314 1.065 0.314 1.664 0 0.232-0.017 0.46-0.051 0.683l0.003-0.025zM16.001 23.841c-1.367-1.544-2.407-3.411-2.991-5.47l-0.024-0.099c-0.126-0.348-0.198-0.749-0.198-1.167 0-0.711 0.21-1.372 0.57-1.927l-0.008 0.014c0.543-0.803 1.45-1.325 2.479-1.325 0.060 0 0.12 0.002 0.18 0.005l-0.008-0c0.052-0.003 0.112-0.005 0.173-0.005 1.030 0 1.938 0.525 2.469 1.323l0.007 0.011c0.351 0.538 0.56 1.196 0.56 1.904 0 0.422-0.074 0.826-0.211 1.201l0.008-0.024c-0.624 2.155-1.661 4.019-3.029 5.588l0.015-0.017z"/>
  </svg>
)

export default function Footer() {
  const quickLinks = [
    { path: '/about', label: 'About Us' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/things-to-do', label: 'Things to Do' },
    { path: '/booking', label: 'Book Now' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' }
  ]

  const socialLinks = [
    { icon: GoogleIcon, href: 'https://share.google/cyfHPtWGkfgqE5qzk', label: 'Google' },
    { icon: Facebook, href: 'https://m.me/61571078790065', label: 'Facebook' },
    { icon: AirbnbIcon, href: 'https://www.airbnb.com/rooms/1318250624522250354?check_in=2025-11-21&check_out=2025-11-26&location=La%20Trinidad%2C%20Benguet%2C%20Philippines&search_mode=regular_search&source_impression_id=p3_1762746703_P3P5dFjMPoGoaXkT&previous_page_section_name=1001&federated_search_id=7cf9fc15-7d30-4371-b6f6-a0769c3e92f0', label: 'Airbnb' }
  ]

  const handleLinkClick = () => {
    // Scroll to top when clicking footer links
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      })
    }
  }

  return (
    <footer className="bg-[#120d07] text-cream border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-sans font-semibold mb-4 uppercase tracking-wider text-warm-gold">
              About JMG Nest
            </h3>
            <p className="text-sm text-warm-sage font-sans leading-relaxed mb-4">
              Your cozy mountain retreat in La Trinidad Valley, just 15 minutes from Baguio City. Experience luxury, comfort, and breathtaking views.
            </p>
            <div className="text-2xl font-serif font-bold text-cream">
              JMG Nest
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-sans font-semibold mb-4 uppercase tracking-wider text-warm-gold">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    onClick={handleLinkClick}
                    className="text-sm text-warm-sage font-sans hover:text-warm-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-sans font-semibold mb-4 uppercase tracking-wider text-warm-gold">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-warm-sage flex-shrink-0 mt-0.5" />
                <span className="text-sm text-warm-sage font-sans">
                  La Trinidad Valley, Benguet, Philippines
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-warm-sage flex-shrink-0" />
                <a
                  href="mailto:info@jmgnest.com"
                  className="text-sm text-warm-sage font-sans hover:text-warm-gold transition-colors duration-200"
                >
                  info@jmgnest.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Facebook className="w-5 h-5 text-warm-sage flex-shrink-0" />
                <a
                  href="https://m.me/61571078790065"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-warm-sage font-sans hover:text-warm-gold transition-colors duration-200"
                >
                  Message us directly
                </a>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="text-lg font-sans font-semibold mb-4 uppercase tracking-wider text-warm-gold">
              Where to Find Us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-[rgba(217,199,184,0.1)] text-warm-sage hover:text-warm-gold hover:bg-[rgba(196,152,99,0.2)] transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-warm-sage border-opacity-30 my-6" />

        {/* Legal Links and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
            <Link
              href="/privacy-policy"
              className="text-warm-sage font-sans hover:text-warm-gold transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="text-warm-sage opacity-50">|</span>
            <Link
              href="/terms-of-service"
              className="text-warm-sage font-sans hover:text-warm-gold transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <span className="text-warm-sage opacity-50">|</span>
            <Link
              href="/cookie-policy"
              className="text-warm-sage font-sans hover:text-warm-gold transition-colors duration-200"
            >
              Cookie Policy
            </Link>
            <span className="text-warm-sage opacity-50">|</span>
            <Link
              href="/disclaimer"
              className="text-warm-sage font-sans hover:text-warm-gold transition-colors duration-200"
            >
              Disclaimer
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-warm-sage font-sans">
            <p>&copy; {new Date().getFullYear()} JMG Nest. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
