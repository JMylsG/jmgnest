import type { Metadata, Viewport } from 'next'
import { Crimson_Text } from 'next/font/google'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import './mockup-ui.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { LocalBusinessSchema } from '@/components/StructuredData'

const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'JMG Nest | Premium Vacation Rentals in Baguio City & La Trinidad',
    template: '%s | JMG Nest',
  },
  description: 'Experience mountain comfort at JMG Nest. 3 unique vacation rental units in La Trinidad Valley near Baguio - from ₱2,500/night. Modern amenities, stunning views.',
  keywords: ['vacation rental baguio', 'transient house la trinidad', 'baguio accommodation', 'staycation baguio', 'airbnb baguio alternative', 'la trinidad vacation rental', 'baguio city rental', 'mountain retreat baguio', 'JMG Nest', 'baguio transient'],
  authors: [{ name: 'JMG Nest' }],
  openGraph: {
    title: 'JMG Nest | Premium Vacation Rentals in Baguio City & La Trinidad',
    description: 'Experience mountain comfort at JMG Nest. 3 unique vacation rental units in La Trinidad Valley near Baguio - from ₱2,500/night. Modern amenities, stunning views.',
    url: 'https://jmgnest.com',
    siteName: 'JMG Nest',
    images: [
      {
        url: 'https://jmgnest.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JMG Nest - Premium Vacation Rentals in Baguio City and La Trinidad Valley',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JMG Nest | Premium Vacation Rentals in Baguio City & La Trinidad',
    description: 'Experience mountain comfort at JMG Nest. 3 unique vacation rental units in La Trinidad Valley near Baguio - from ₱2,500/night.',
    images: ['https://jmgnest.com/images/og-image.jpg'],
  },
  metadataBase: new URL('https://jmgnest.com'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'JMG Nest',
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1E3D34',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" className={crimsonText.variable}>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
      <body className="font-sans bg-cream text-text-primary antialiased">
        <LocalBusinessSchema />
        <Navigation />
        <Breadcrumbs />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
