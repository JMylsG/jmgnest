import { sanityClient } from '@/lib/sanity.client'
import { postBySlugQuery, postSlugsQuery, relatedPostsQuery } from '@/lib/sanity.queries'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import RelatedPosts from '@/components/blog/RelatedPosts'
import { getLocalGuide, getLocalGuideSlugs } from '@/lib/guides'
import LocalGuideArticle from '@/components/things-to-do/LocalGuide'

// Only create the image builder when the CMS is configured.
const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

export const revalidate = 3600

// Generate static paths for all posts
export async function generateStaticParams() {
  const slugs = (await sanityClient?.fetch<string[]>(postSlugsQuery).catch(() => [])) ?? []
  const all = new Set([...slugs, ...getLocalGuideSlugs()])
  return Array.from(all).map((slug) => ({ slug }))
}

// PortableText components configuration for Sanity images
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset || !builder) {
        return null
      }
      
      // Build image URL using Sanity image URL builder
      // This works with both asset references and expanded asset objects
      const imageUrl = builder.image(value.asset).width(1200).url()
      
      // Get dimensions from metadata if available, otherwise use defaults
      const width = value.asset?.metadata?.dimensions?.width || 1200
      const height = value.asset?.metadata?.dimensions?.height || 675
      
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || 'Blog image'}
            width={width}
            height={height}
            className="w-full rounded-lg"
            style={{ height: 'auto' }}
            loading="lazy"
          />
        </div>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-serif font-semibold text-forest-green mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-serif font-semibold text-forest-green mb-3 mt-6">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-gray-700 leading-relaxed mb-4 font-sans">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-lg text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 ml-4 text-lg text-gray-700">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-forest-green underline hover:text-warm-gold"
        >
          {children}
        </a>
      )
    },
  },
}

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityClient
    ?.fetch(postBySlugQuery, { slug })
    .catch(() => null)

  if (!post) {
    const guide = getLocalGuide(slug)
    if (guide) {
      return { title: guide.metaTitle, description: guide.metaDescription }
    }
    return {
      title: 'Post Not Found',
    }
  }

  // Use SEO fields if available, otherwise fall back to defaults
  const metaTitle = post.seo?.metaTitle || post.title
  const metaDescription = post.seo?.metaDescription || post.excerpt
  const ogImage = post.seo?.ogImage?.asset?.url || post.featuredImage?.asset?.url

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: post.seo?.keywords || post.tags || [],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : [],
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await sanityClient
    ?.fetch(postBySlugQuery, { slug })
    .catch(() => null)

  if (!post) {
    // Fall back to a hand-written local guide when there is no Sanity post.
    const guide = getLocalGuide(slug)
    if (guide) {
      return <LocalGuideArticle guide={guide} />
    }
    notFound()
  }

  // Fetch related posts based on shared categories
  const categorySlugs = post.categories?.map((cat: any) => cat.slug) || []
  const relatedPosts =
    sanityClient && categorySlugs.length > 0
      ? await sanityClient
          .fetch(relatedPostsQuery, {
            slug,
            categories: categorySlugs,
          })
          .catch(() => [])
      : []

  return (
    <article className="py-20 px-6 bg-cream">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/things-to-do"
          className="inline-flex items-center gap-2 text-forest-green hover:text-warm-gold transition-colors mb-8 font-sans"
        >
          <span>←</span> Back to Things to Do
        </Link>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map((category: any) => (
              <span
                key={category.slug}
                className="px-4 py-1.5 rounded-full text-sm text-white font-medium"
                style={{ backgroundColor: category.color || '#C49863' }}
              >
                {category.title}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-forest-green mb-6">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
          {post.author && (
            <div className="flex items-center gap-3">
              {post.author.avatar?.asset?.url && (
                <Image
                  src={post.author.avatar.asset.url}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <span className="font-medium text-forest-green">{post.author.name}</span>
            </div>
          )}
          <span>•</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
          {(post.distance || post.travelTime) && (
            <>
              <span>•</span>
              <div className="flex items-center gap-3">
                {post.distance && <span>📍 {post.distance}</span>}
                {post.travelTime && <span>🕐 {post.travelTime}</span>}
              </div>
            </>
          )}
        </div>

        {/* Featured Image */}
        {post.featuredImage?.asset?.url && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage.asset.url}
              alt={post.featuredImage.alt || post.title}
              width={1200}
              height={675}
              className="w-full"
              style={{ height: 'auto' }}
              priority
            />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-gray-700 leading-relaxed mb-12 font-serif italic">
            {post.excerpt}
          </p>
        )}

        {/* Body Content */}
        {post.body && (
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-forest-green prose-a:text-forest-green prose-a:no-underline hover:prose-a:text-warm-gold prose-strong:text-forest-green prose-img:rounded-lg">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}

        {/* Location Info */}
        {post.location?.address && (
          <div className="mt-12 p-6 bg-warm-sage/20 rounded-lg border border-warm-sage">
            <h3 className="text-xl font-serif text-forest-green mb-3">Location</h3>
            <p className="text-gray-700">{post.location.address}</p>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-warm-sage/30 text-forest-green rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {post.author?.bio && (
          <div className="mt-12 p-6 bg-cream border border-warm-sage rounded-lg">
            <div className="flex items-start gap-4">
              {post.author.avatar?.asset?.url && (
                <Image
                  src={post.author.avatar.asset.url}
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="text-lg font-serif text-forest-green mb-2">
                  About {post.author.name}
                </h3>
                <p className="text-gray-600 mb-3">{post.author.bio}</p>
                {post.author.socialLinks && (
                  <div className="flex gap-3">
                    {post.author.socialLinks.twitter && (
                      <a
                        href={post.author.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest-green hover:text-warm-gold"
                      >
                        Twitter
                      </a>
                    )}
                    {post.author.socialLinks.linkedin && (
                      <a
                        href={post.author.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest-green hover:text-warm-gold"
                      >
                        LinkedIn
                      </a>
                    )}
                    {post.author.socialLinks.website && (
                      <a
                        href={post.author.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest-green hover:text-warm-gold"
                      >
                        Website
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />
      </div>
    </article>
  )
}
