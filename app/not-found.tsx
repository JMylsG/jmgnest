import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="text-center max-w-2xl">
        <h1 className="heading-h1 text-forest-green mb-4">404</h1>
        <h2 className="heading-h2 mb-4">Page Not Found</h2>
        <p className="text-body text-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Please check the URL or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary">
              Return Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

