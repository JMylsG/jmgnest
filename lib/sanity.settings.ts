export const DEFAULT_SANITY_PROJECT_ID = '6hp1010s'
export const DEFAULT_SANITY_DATASET = 'production'
export const DEFAULT_SANITY_API_VERSION = '2024-10-01'

export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  DEFAULT_SANITY_PROJECT_ID

export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  DEFAULT_SANITY_DATASET

export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  process.env.SANITY_API_VERSION ||
  DEFAULT_SANITY_API_VERSION

// Keep the local placeholder as an explicit opt-out for offline development.
export const isSanityEnabled = sanityProjectId !== 'devplaceholder'
