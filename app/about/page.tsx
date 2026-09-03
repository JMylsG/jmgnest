import { Metadata } from 'next'
import Link from 'next/link'
import { getProperty } from '@/lib/data'
import Hero from '@/components/sections/Hero'
import Card from '@/components/cards/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Discover the story behind your perfect mountain retreat at JMG Nest in Baguio City.',
}

export default async function AboutPage() {
  const property = await getProperty()

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="About Us"
        subtitle="Discover the story behind your perfect mountain retreat"
        imageUrl="https://res.cloudinary.com/jmg-nest/image/upload/v1762619475/main-patio-1.jpg"
        imageAlt="JMG Nest main patio"
      />

      {/* Property Story */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-serif font-normal text-forest-green mb-6">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-body text-text-secondary font-sans leading-relaxed mb-6">
              JMG Nest was born from a desire to share our home and the beauty of the mountain city of Baguio. 
              What was once our family home filled with memories has been thoughtfully renovated into a modern retreat that still carries the warmth and character.
            </p>
            <p className="text-body text-text-secondary font-sans leading-relaxed mb-6">
              Every detail of our property has been carefully curated to ensure your comfort and 
              enjoyment. From the thoughtfully designed interiors to the breathtaking mountain views, 
              JMG Nest is a sanctuary where you can relax, recharge, and create lasting memories.
            </p>
          </div>
        </div>
      </section>

      {/* Guest Support Team */}
      <section className="py-20 px-6 bg-background-subtle">
        <div className="max-w-[1400px] mx-auto">
          <Card variant="elevated" className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-h3 font-serif font-semibold text-forest-green mb-4">
                We're Here to Help
              </h3>
              <p className="text-body text-text-secondary font-sans leading-relaxed">
                Our team is passionate about hospitality and ensuring every guest has an exceptional stay. 
                Whether you need recommendations for local restaurants, help planning your itinerary, 
                or have any questions during your visit, our dedicated team is here to help make your 
                Baguio experience unforgettable.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Property Features */}
      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-h2 font-serif font-normal text-forest-green mb-12 text-center">
            Property Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card variant="standard">
              <h3 className="text-h3 font-serif font-semibold text-forest-green mb-4">
                Modern Comfort
              </h3>
              <p className="text-body text-text-secondary font-sans leading-relaxed">
                Our property features modern amenities including high-speed WiFi and fully equipped 
                kitchens. Every room is designed with your comfort in mind.
              </p>
            </Card>

            <Card variant="standard">
              <h3 className="text-h3 font-serif font-semibold text-forest-green mb-4">
                Stunning Views
              </h3>
              <p className="text-body text-text-secondary font-sans leading-relaxed">
                Experience breathtaking panoramic mountain views from the Main Unit's private balcony, 
                overlooking the beautiful La Trinidad Valley. The perfect spot to enjoy your morning 
                coffee or watch the sunset over the mountains.
              </p>
            </Card>

            <Card variant="standard">
              <h3 className="text-h3 font-serif font-semibold text-forest-green mb-4">
                Prime Location
              </h3>
              <p className="text-body text-text-secondary font-sans leading-relaxed">
                Located in La Trinidad Valley, you're just minutes away from popular attractions, 
                restaurants, and shopping centers. We are also just 15 minutes away from Baguio City.
              </p>
            </Card>

            <Card variant="standard">
              <h3 className="text-h3 font-serif font-semibold text-forest-green mb-4">
                Function Hall Available
              </h3>
              <p className="text-body text-text-secondary font-sans leading-relaxed">
                Host your special events at our beautiful function hall. Perfect for birthdays, 
                anniversaries, corporate gatherings, and celebrations. Combine your event with 
                accommodation by booking one or more of our units for a complete experience.
              </p>
              <div className="mt-4">
                <Link href="/contact">
                  <Button variant="text" className="text-warm-gold hover:text-forest-green p-0">
                    Contact us for function hall rental →
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* House Rules */}
      <section className="py-20 px-6 bg-background-subtle">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-serif font-normal text-forest-green mb-8 text-center">
            House Rules
          </h2>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Badge variant="default">No Smoking</Badge>
            <Badge variant="default">No Pets</Badge>
            <Badge variant="default">No Parties</Badge>
            <Badge variant="default">Check-in: 3:00 PM</Badge>
            <Badge variant="default">Check-out: 11:00 AM</Badge>
            <Badge variant="default">Minimum Stay: 2 Nights</Badge>
          </div>
          <p className="text-body text-text-secondary font-sans text-center leading-relaxed">
            We ask all guests to respect our property and neighbors. Please follow these guidelines to ensure a pleasant stay for everyone.
          </p>
        </div>
      </section>
    </>
  )
}

