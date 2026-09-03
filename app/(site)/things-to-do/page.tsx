import Card from '@/components/cards/Card'
import ImageCard from '@/components/cards/ImageCard'
import { sanityClient } from '@/lib/sanity.client'
import { allPostsQuery, allCategoriesQuery, postsByCategoryQuery } from '@/lib/sanity.queries'
import Link from 'next/link'

export const revalidate = 3600

interface Post {
  _id: string
  title: string
  slug: string
  excerpt: string
  featuredImage?: {
    asset?: {
      url: string
    }
    alt?: string
  }
  author?: {
    name: string
    slug: string
  }
  categories?: Array<{
    title: string
    slug: string
    color: string
  }>
  tags?: string[]
  distance?: string
  travelTime?: string
  publishedAt: string
  featured?: boolean
}

interface Category {
  _id: string
  title: string
  slug: string
  description?: string
  color: string
  postCount: number
}

interface ThingsToDoPageProps {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function ThingsToDoPage({ searchParams }: ThingsToDoPageProps) {
  const params = await searchParams
  const selectedCategory = params.category

  // Fetch posts based on category filter
  const [posts, categories] = await Promise.all([
    selectedCategory
      ? sanityClient.fetch<Post[]>(postsByCategoryQuery, { categorySlug: selectedCategory }).catch(() => [])
      : sanityClient.fetch<Post[]>(allPostsQuery).catch(() => []),
    sanityClient.fetch<Category[]>(allCategoriesQuery).catch(() => [])
  ])

  return (
    <section className="py-20 px-6 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-normal text-forest-green mb-4">
            Things to Do
          </h1>
          <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
            Discover amazing attractions, activities, and experiences near JMG Nest
          </p>
        </div>

        {/* Categories Filter */}
        {categories && categories.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/things-to-do"
                className={`px-4 py-2 rounded-full border-2 transition-colors font-sans text-sm ${
                  !selectedCategory
                    ? 'bg-forest-green text-white border-forest-green'
                    : 'border-forest-green text-forest-green hover:bg-forest-green hover:text-white'
                }`}
              >
                All Posts
              </Link>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/things-to-do?category=${category.slug}`}
                  className={`px-4 py-2 rounded-full text-white transition-opacity font-sans text-sm ${
                    selectedCategory === category.slug ? 'ring-2 ring-offset-2 ring-forest-green' : 'hover:opacity-90'
                  }`}
                  style={{ backgroundColor: category.color || '#C49863' }}
                >
                  {category.title} ({category.postCount})
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Filter Status Message */}
        {selectedCategory && (
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Showing posts in:{' '}
              <span className="font-semibold text-forest-green">
                {categories.find(cat => cat.slug === selectedCategory)?.title || selectedCategory}
              </span>
              {' '}•{' '}
              <Link href="/things-to-do" className="text-warm-gold hover:underline">
                Clear filter
              </Link>
            </p>
          </div>
        )}

        {/* Posts Grid */}
        {(!posts || posts.length === 0) ? (
          <Card variant="standard" className="p-8 text-center">
            <p className="text-lg text-gray-600 mb-4">
              {selectedCategory ? 'No posts found in this category.' : 'No posts found yet.'}
            </p>
            {!selectedCategory && (
              <p className="text-sm text-gray-500">
                Create your first blog post in the{' '}
                <a href="/studio" className="text-forest-green underline hover:text-warm-gold">
                  Sanity Studio
                </a>
              </p>
            )}
            {selectedCategory && (
              <Link href="/things-to-do" className="text-forest-green underline hover:text-warm-gold">
                View all posts
              </Link>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post._id} className="group">
                <ImageCard
                  src={post.featuredImage?.asset?.url || '/images/placeholder.jpg'}
                  alt={post.featuredImage?.alt || post.title}
                  title={post.title}
                  description={post.excerpt}
                  href={`/things-to-do/${post.slug}`}
                />
                
                {/* Post Meta */}
                <div className="mt-4 space-y-2">
                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category) => (
                        <span
                          key={category.slug}
                          className="px-3 py-1 rounded-full text-xs text-white font-medium"
                          style={{ backgroundColor: category.color || '#C449863' }}
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Distance & Travel Time */}
                  {(post.distance || post.travelTime) && (
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      {post.distance && (
                        <span className="flex items-center gap-1">
                          📍 {post.distance}
                        </span>
                      )}
                      {post.travelTime && (
                        <span className="flex items-center gap-1">
                          🕐 {post.travelTime}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Author & Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {post.author && (
                      <>
                        <span>By {post.author.name}</span>
                        <span>•</span>
                      </>
                    )}
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
