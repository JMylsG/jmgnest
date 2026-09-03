import { Metadata } from 'next'
import { getReviews } from '@/lib/data'
import Hero from '@/components/sections/Hero'
import TestimonialCard from '@/components/cards/TestimonialCard'

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'Read reviews and testimonials from our satisfied guests who have stayed at JMG Nest in Baguio City.',
}

export const revalidate = 3600 // Revalidate every hour (ISR)

export default async function ReviewsPage() {
  const { reviews, total } = await getReviews(12, 0)

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  return (
    <>
      {/* Hero Section */}
      <Hero
        eyebrow="Reviews"
        title="What our guests say"
        subtitle="See what our guests have to say"
        ctaText=""
        imageUrl="/images/reviews-hero.jpg"
        imageAlt="Guest reviews"
      />

      {/* Reviews Section */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Summary Stats */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex flex-col items-center p-8 bg-background-section rounded-xl border border-border-light shadow-sm mb-6">
              <div className="text-5xl font-serif text-warm-gold mb-2">{averageRating}</div>
              <div className="text-body text-text-secondary mb-2">Average Rating</div>
              <div className="text-caption text-text-tertiary">{total} Reviews</div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {reviews.map((review) => (
              <TestimonialCard
                key={review.id}
                guestName={review.guestName}
                guestPhoto={review.guestPhoto}
                rating={review.rating}
                date={review.date}
                comment={review.comment}
                hostResponse={review.hostResponse}
              />
            ))}
          </div>

          {reviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-body text-text-secondary">No reviews available yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

