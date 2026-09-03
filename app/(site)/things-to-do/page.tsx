import { Metadata } from 'next'
import { sanityClient } from '@/lib/sanity.client'
import { allPostsQuery } from '@/lib/sanity.queries'
import ThingsToDoClient, { GuidePost } from './ThingsToDoClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Things to Do',
  description: 'The valley, right outside your door. Strawberry farms, mountain parks, museums, and Baguio markets near JMG Nest, plus stories and guides from the team.',
}

export default async function ThingsToDoPage() {
  // Keep the Sanity CMS wiring: the "Stories & guides" section renders the
  // brother's blog posts. Renders empty locally until real Sanity env is set.
  const posts = await sanityClient
    .fetch<GuidePost[]>(allPostsQuery)
    .catch(() => [] as GuidePost[])

  return <ThingsToDoClient posts={posts ?? []} />
}
