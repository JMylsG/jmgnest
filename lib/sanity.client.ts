import { createClient } from '@sanity/client'
import {
  isSanityEnabled,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from './sanity.settings'

export const apiVersion = sanityApiVersion
export const projectId = isSanityEnabled ? sanityProjectId : undefined
export const dataset = sanityDataset

export const sanityClient = projectId ? createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
}) : null

