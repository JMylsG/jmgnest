import Link from 'next/link'
import Image from 'next/image'

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
  categories?: Array<{
    title: string
    slug: string
    color: string
  }>
  distance?: string
  travelTime?: string
  publishedAt: string
}

interface RelatedPostsProps {
  posts: Post[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-3xl font-serif text-forest-green mb-8">
        You Might Also Like
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/things-to-do/${post.slug}`}
            className="group"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
              <Image
                src={post.featuredImage?.asset?.url || '/images/placeholder.jpg'}
                alt={post.featuredImage?.alt || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.categories.slice(0, 2).map((category) => (
                  <span
                    key={category.slug}
                    className="px-2 py-1 rounded-full text-xs text-white font-medium"
                    style={{ backgroundColor: category.color || '#C49863' }}
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h3 className="text-xl font-serif text-forest-green group-hover:text-warm-gold transition-colors mb-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              {post.distance && <span>📍 {post.distance}</span>}
              {post.travelTime && <span>🕐 {post.travelTime}</span>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

