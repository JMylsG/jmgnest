import { Metadata } from 'next'
import { getUnits } from '@/lib/data'
import Hero from '@/components/sections/Hero'
import UnitCard from '@/components/cards/UnitCard'

export const metadata: Metadata = {
  title: 'Our Units',
  description: 'Explore our three unique units at JMG Nest. Each unit offers comfortable accommodations with modern amenities for your perfect mountain getaway in Baguio City.',
}

export const revalidate = 60 // Revalidate every minute

export default async function OurUnitsPage() {
  const units = await getUnits()

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Our Units"
        subtitle="Choose the perfect space for your mountain retreat"
        imageUrl="https://res.cloudinary.com/jmg-nest/image/upload/v1762619475/main-patio-1.jpg"
        imageAlt="JMG Nest units"
      />

      {/* Units Grid */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {units.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

