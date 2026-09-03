import { Metadata } from 'next'
import UnitsClient from './UnitsClient'

export const metadata: Metadata = {
  title: 'Our Units',
  description: 'Three homes, one quiet property above La Trinidad Valley, 15 minutes from Baguio City. Compare the Main Unit, Unit A, and Unit B, with nightly and monthly rates.',
}

export default function OurUnitsPage() {
  return <UnitsClient />
}
