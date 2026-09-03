'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs() {
  const pathname = usePathname()
  
  // Generate breadcrumb items from pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  
  // Capitalize and format segment names
  const formatSegment = (segment: string): string => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  
  // Build breadcrumb items
  const breadcrumbItems = [
    { href: '/', label: 'Home' },
    ...pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/')
      return {
        href,
        label: formatSegment(segment),
      }
    }),
  ]
  
  // Don't show breadcrumbs on home page
  if (pathname === '/') {
    return null
  }
  
  return (
    <nav aria-label="Breadcrumb" className="py-4 bg-background-subtle">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-text-tertiary">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1
            
            return (
              <li key={item.href} className="flex items-center gap-2">
                {index === 0 ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 hover:text-warm-gold transition-colors duration-200"
                  >
                    <Home className="w-4 h-4" />
                    <span className="sr-only">Home</span>
                  </Link>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4 text-text-tertiary" />
                    {isLast ? (
                      <span className="font-medium text-forest-green">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="hover:text-warm-gold transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    )}
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

