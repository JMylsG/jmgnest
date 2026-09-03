import { Metadata } from 'next'
import { getGalleryImages } from '@/lib/data'
import GalleryClient from './GalleryClient'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Every corner of the nest, room by room. Browse all three JMG Nest units by unit or by space, from mountain-view porches to bright bedrooms.',
}

export const revalidate = 60

export default async function GalleryPage() {
  const images = await getGalleryImages()
  return <GalleryClient images={images} />
}
