import { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'A family\'s nest in the mountains. The story behind JMG Nest, three homes above La Trinidad Valley, 15 minutes from Baguio City, and the hosts who run it.',
}

export default function AboutPage() {
  return <AboutClient />
}
