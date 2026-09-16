import { notFound } from 'next/navigation'
import StudioClient from './StudioClient'
import { isSanityEnabled } from '@/lib/sanity.settings'

export default function StudioPage() {
  if (!isSanityEnabled) notFound()
  return <StudioClient />
}
