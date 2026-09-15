import { createClient } from '@sanity/client'

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || process.env.SANITY_API_VERSION || '2024-10-01'
const configuredProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
// The local development placeholder is not a real CMS project.
export const projectId = configuredProjectId === 'devplaceholder' ? undefined : configuredProjectId
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production'

export const sanityClient = projectId ? createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
}) : null


