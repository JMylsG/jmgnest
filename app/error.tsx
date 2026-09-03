'use client'

import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="text-center max-w-2xl">
        <h1 className="heading-h1 text-forest-green mb-4">Something went wrong!</h1>
        <p className="text-body text-text-secondary mb-8">
          We apologize for the inconvenience. An unexpected error occurred. 
          Please try again or contact us if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" onClick={reset}>
            Try Again
          </Button>
          <Link href="/">
            <Button variant="secondary">
              Go Home
            </Button>
          </Link>
        </div>
        {error.digest && (
          <p className="text-caption text-text-tertiary mt-8">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}

