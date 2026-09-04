import { Metadata } from 'next'
import ThingsToDoClient from './ThingsToDoClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Things to Do',
  description: 'The valley, right outside your door. Strawberry farms, mountain parks, museums, and Baguio markets near JMG Nest, each with directions and a local guide.',
}

// The Sanity CMS still powers the per-location guide pages at
// /things-to-do/[slug]; each activity card links to its guide there.
export default function ThingsToDoPage() {
  return <ThingsToDoClient />
}
