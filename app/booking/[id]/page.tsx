import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getUnits, getUnitById } from '@/lib/data'
import Hero from '@/components/sections/Hero'
import UnitBookingContent from '@/components/booking/UnitBookingContent'

export async function generateStaticParams() {
  const units = await getUnits()
  return units.map((unit) => ({
    id: unit.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const unit = await getUnitById(id)
  
  if (!unit) {
    return {
      title: 'Unit Not Found',
    }
  }

  return {
    title: `${unit.name} - Booking`,
    description: unit.shortDescription || unit.fullDescription.substring(0, 160),
  }
}

export const revalidate = 60 // Revalidate every minute

export default async function UnitBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const unit = await getUnitById(id)

  if (!unit) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <Hero
        eyebrow="Our Units"
        title={unit.name}
        subtitle="Reserve your perfect mountain retreat"
        imageUrl={unit.images[0] || '/images/booking-hero.jpg'}
        imageAlt={unit.name}
      />

      {/* Booking Content */}
      <UnitBookingContent unit={unit} />
    </>
  )
}

