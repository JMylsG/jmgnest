import { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import MockupSprite from '@/components/MockupSprite'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Questions, answered. Everything to know before you book JMG Nest, from check-in times and parking to long stays, policies, and getting here.',
}

type QA = { q: string; a: ReactNode }
type Group = { icon: string; title: string; items: QA[] }

const GROUPS: Group[] = [
  {
    icon: 'i-calendar',
    title: 'Booking & rates',
    items: [
      { q: 'How do I book a stay?', a: <>Book instantly on Airbnb for live availability and platform protection, or send an enquiry through our <Link href="/contact#enquire">contact page</Link> and we&apos;ll hold your dates and share direct rates. A quick message on Facebook works too.</> },
      { q: 'Can I book directly instead of through Airbnb?', a: <>Yes. Message us and we&apos;ll share direct rates and current availability. Direct bookings are handled personally by our host team.</> },
      { q: 'Is there a minimum stay?', a: <>Most dates have a two-night minimum. For peak dates or special periods the minimum may be slightly longer, and we&apos;ll always tell you upfront.</> },
      { q: 'Do you offer discounts for longer stays?', a: <>We do. Book 30 nights or more and every rate drops 25%. Mention your dates when you enquire and we&apos;ll send a tailored long-stay quote.</> },
      { q: 'Are there any extra fees?', a: <>A one-time cleaning fee applies per unit and is shown before you confirm. Any platform service fees appear at checkout when booking through Airbnb.</> },
    ],
  },
  {
    icon: 'i-key',
    title: 'Your stay',
    items: [
      { q: 'What are the check-in and check-out times?', a: <>Check in from 3:00 PM and check out by 11:00 AM. If your travel needs an earlier check-in or later check-out, just ask and we&apos;ll do our best to arrange it.</> },
      { q: 'How many guests can each unit hold?', a: <>The Main Unit sleeps up to 12, Unit B up to 10, and Unit A up to 8. See the <Link href="/booking">units page</Link> for layouts and rates.</> },
      { q: 'What is included in the units?', a: <>High-speed WiFi, hot water, a full kitchen or kitchenette, a smart TV, and free private parking. Coffee and the essentials are stocked for your arrival.</> },
      { q: 'Is the property private?', a: <>It&apos;s one quiet building with three separate units and shared grounds. You&apos;ll have your own unit, with a balcony that looks out over the valley.</> },
      { q: 'Do you allow pets?', a: <>Pets are not allowed in the units, to keep every space fresh and comfortable for all guests.</> },
      { q: 'Is smoking allowed?', a: <>There is no smoking inside the units. You&apos;re welcome to step outside onto the grounds.</> },
    ],
  },
  {
    icon: 'i-pin',
    title: 'Getting here & policies',
    items: [
      { q: 'Where exactly are you located?', a: <>In La Trinidad Valley, Benguet, about 15 minutes from Baguio City proper. For privacy, we share the exact address and map pin once your booking is confirmed.</> },
      { q: 'Is parking available?', a: <>Yes, free and secure private parking is included on-site, so you can leave early to beat the traffic and keep the car close.</> },
      { q: 'How do I get to the nearby attractions?', a: <>Most spots are a short drive away. See the <Link href="/things-to-do">Things to Do page</Link> for distances, travel times, and directions from the nest.</> },
      { q: 'How do I pay?', a: <>Through Airbnb when you book on the platform, or by direct arrangement for direct bookings. We&apos;ll walk you through it either way.</> },
      { q: 'What is your cancellation policy?', a: <>Airbnb bookings follow the platform&apos;s cancellation policy shown at checkout. For direct bookings, just ask and we&apos;ll share the terms before you confirm.</> },
    ],
  },
]

export default function FaqPage() {
  let idx = 0
  return (
    <div className="mk">
      <MockupSprite />

      {/* ============ GRADIENT HERO (no photo) ============ */}
      <header className="faq-hero dark">
        <div className="fh-inner">
          <p className="eyebrow" style={{ color: '#C49863' }}>Help &amp; FAQ</p>
          <h1 className="fh-title">Questions, answered</h1>
          <p className="fh-lead">Everything you might want to know before you book, from check-in times to parking and long stays. Still stuck? We are one message away.</p>
        </div>
      </header>

      {/* ============ FAQ CONTENT ============ */}
      <section className="sec">
        <div className="wrap faq-wrap">
          {GROUPS.map((group) => (
            <div className="faq-group" key={group.title}>
              <div className="faq-cat">
                <span className="fc-ic"><svg className="ic"><use href={`#${group.icon}`} /></svg></span>
                <h2 className="display">{group.title}</h2>
              </div>
              <div className="faq">
                {group.items.map((item) => {
                  const open = idx++ === 0
                  return (
                    <details key={item.q} open={open}>
                      <summary>{item.q} <svg className="ic"><use href="#i-plus" /></svg></summary>
                      <div className="faq-a">{item.a}</div>
                    </details>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CLOSING CTA ============ */}
      <section className="f-cta dark">
        <div className="wrap">
          <p className="eyebrow" style={{ color: 'var(--gold)' }}>Still have questions?</p>
          <h2 className="display h2">We&apos;re happy to help</h2>
          <p className="lead">If you didn&apos;t find your answer here, send us a message and our host team will get back to you, usually within a day.</p>
          <div className="f-cta-actions">
            <Link href="/contact#enquire" className="btn btn-gold">Contact us <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
            <Link href="/booking#book" className="btn btn-ghost">Check availability <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
