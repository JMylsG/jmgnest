import { groq } from 'next-sanity'

// ============================================
// BLOG POST QUERIES
// ============================================

export const POST_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage{
    asset->{
      _id,
      url
    },
    alt
  },
  "author": author->{
    name,
    "slug": slug.current,
    avatar{
      asset->{
        _id,
        url
      }
    }
  },
  "categories": categories[]->{
    title,
    "slug": slug.current,
    color
  },
  tags,
  distance,
  travelTime,
  publishedAt,
  featured
`

export const POST_DETAIL_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage{
    asset->{
      _id,
      url
    },
    alt
  },
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      }
    }
  },
  "author": author->{
    name,
    "slug": slug.current,
    bio,
    avatar{
      asset->{
        _id,
        url
      }
    },
    socialLinks
  },
  "categories": categories[]->{
    title,
    "slug": slug.current,
    color,
    description
  },
  tags,
  location,
  distance,
  travelTime,
  seo{
    metaTitle,
    metaDescription,
    keywords,
    ogImage{
      asset->{
        _id,
        url
      },
      alt
    }
  },
  publishedAt,
  featured
`

// Get all published posts, ordered by date
export const allPostsQuery = groq`*[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0...50]{${POST_CARD_FIELDS}}`

// Get a single post by slug
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{${POST_DETAIL_FIELDS}}`

// Get all post slugs (for static generation)
export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`

// Get featured posts
export const featuredPostsQuery = groq`*[_type == "post" && featured == true && defined(publishedAt)] | order(publishedAt desc)[0...6]{${POST_CARD_FIELDS}}`

// Get posts by category
export const postsByCategoryQuery = groq`*[_type == "post" && $categorySlug in categories[]->slug.current && defined(publishedAt)] | order(publishedAt desc){${POST_CARD_FIELDS}}`

// Get all categories with post counts
export const allCategoriesQuery = groq`*[_type == "category"] | order(title asc){
  _id,
  title,
  "slug": slug.current,
  description,
  color,
  "postCount": count(*[_type == "post" && references(^._id)])
}`

// Get related posts by shared categories (exclude current post)
export const relatedPostsQuery = groq`*[
  _type == "post" 
  && slug.current != $slug 
  && count((categories[]->slug.current)[@ in $categories]) > 0
  && defined(publishedAt)
] | order(publishedAt desc)[0...3]{${POST_CARD_FIELDS}}`

// ============================================
// LEGACY ATTRACTION QUERIES (Keep for now)
// ============================================

export const ATTRACTION_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage{
    asset->{
      _id,
      url
    }
  },
  category,
  distance,
  travelTime
`

export const ATTRACTION_DETAIL_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage{
    asset->{
      _id,
      url
    }
  },
  images[]{
    asset->{
      _id,
      url
    }
  },
  category,
  distance,
  travelTime,
  content[]
`

export const allAttractionsQuery = groq`*[_type == "attraction"] | order(_createdAt desc)[0...50]{${ATTRACTION_CARD_FIELDS}}`

export const attractionBySlugQuery = groq`*[_type == "attraction" && slug.current == $slug][0]{${ATTRACTION_DETAIL_FIELDS}}`

export const attractionSlugsQuery = groq`*[_type == "attraction" && defined(slug.current)][].slug.current`
