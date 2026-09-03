import { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Say hello and we\'ll take it from here. Reach the JMG Nest host team by email, Facebook, or Airbnb, or send an enquiry about dates, long stays, and events.',
}

export default function ContactPage() {
  return <ContactClient />
}
