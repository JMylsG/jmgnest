import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { sanityDataset, sanityProjectId } from './lib/sanity.settings'

export default defineConfig({
  name: 'default',
  title: 'JMG Nest CMS',
  projectId: sanityProjectId,
  dataset: sanityDataset,
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})

