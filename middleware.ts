import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Old WordPress URL patterns that should return 410 Gone
  // Check exact matches first, then patterns with slugs
  const exactGonePaths = [
    '/blog',
    '/blog/',
    '/category',
    '/category/',
    '/tag',
    '/tag/',
    '/author',
    '/author/',
    '/places-to-visit-in-baguio',
    '/places-to-visit-in-baguio/',
    '/things-to-do-in-baguio',
    '/things-to-do-in-baguio/',
  ]

  const gonePatterns = [
    /^\/category\/.+/,   // Matches /category/slug (with content after)
    /^\/blog\/.+/,       // Matches /blog/slug (with content after)
    /^\/tag\/.+/,        // Matches /tag/slug (with content after)
    /^\/author\/.+/,     // Matches /author/slug (with content after)
  ]

  // Check if it's an exact match or matches a pattern
  const isGone = exactGonePaths.includes(pathname) || 
                 gonePatterns.some((pattern) => pattern.test(pathname))

  if (isGone) {
    // Rewrite to /410 route handler which will return 410 status
    const url = request.nextUrl.clone()
    url.pathname = '/410'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/category',
    '/category/:path*',
    '/blog',
    '/blog/:path*',
    '/places-to-visit-in-baguio',
    '/places-to-visit-in-baguio/:path*',
    '/things-to-do-in-baguio',
    '/things-to-do-in-baguio/:path*',
    '/tag',
    '/tag/:path*',
    '/author',
    '/author/:path*',
  ],
}
