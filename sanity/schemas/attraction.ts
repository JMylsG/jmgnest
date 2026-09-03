import { defineField, defineType } from 'sanity'

const attraction = defineType({
  name: 'attraction',
  title: 'Attraction',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Short Description',
      rows: 3,
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Culture & History', value: 'culture' },
          { title: 'Nature & Scenery', value: 'nature' },
          { title: 'Adventure & Activities', value: 'adventure' },
          { title: 'Dining & Food', value: 'food' },
          { title: 'Shopping & Markets', value: 'shopping' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'distance',
      type: 'string',
      title: 'Distance (e.g. 5 km)',
    }),
    defineField({
      name: 'travelTime',
      type: 'string',
      title: 'Travel Time (e.g. 15 min)',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Gallery Images',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'category',
    },
  },
})

export default attraction
