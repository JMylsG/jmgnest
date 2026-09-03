'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import MockupSprite from '@/components/MockupSprite'
import { submitContactForm } from '@/app/actions/contact'

const CLOUD = 'https://res.cloudinary.com/jmg-nest/image/upload/'

export default function ContactClient() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    document.querySelectorAll('.mk .reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)
    const name = (data.get('name') as string) || ''
    const email = (data.get('email') as string) || ''
    const baseMessage = (data.get('message') as string) || ''
    const unit = (data.get('unit') as string) || ''
    const guests = (data.get('guests') as string) || ''
    const checkin = (data.get('checkin') as string) || ''
    const checkout = (data.get('checkout') as string) || ''

    // Fold the enquiry details into the message so the real email
    // (name/email/message only) still carries everything the guest picked.
    const details: string[] = []
    if (unit) details.push(`Unit of interest: ${unit}`)
    if (guests) details.push(`Guests: ${guests}`)
    if (checkin) details.push(`Check in: ${checkin}`)
    if (checkout) details.push(`Check out: ${checkout}`)
    const composedMessage = details.length
      ? `${baseMessage}\n\n--- Enquiry details ---\n${details.join('\n')}`
      : baseMessage

    const payload = new FormData()
    payload.set('name', name)
    payload.set('email', email)
    payload.set('message', composedMessage)

    try {
      const result = await submitContactForm(payload)
      if (result.success) {
        setStatus('success')
        formRef.current?.reset()
      } else {
        setStatus('error')
        setErrorMsg(result.error || 'Failed to send message. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Failed to send message. Please try again.')
    }
  }

  return (
    <div className="mk">
      <MockupSprite />

      {/* ============ COMPACT HERO ============ */}
      <header className="c-hero dark">
        <div className="ch-bg">
          <img src={`${CLOUD}f_auto,q_auto,w_1600/SDB_9291_bobgxm.jpg`} alt="Warm living space at JMG Nest" />
        </div>
        <div className="ch-scrim" />
        <div className="ch-inner">
          <p className="eyebrow" style={{ color: '#C49863' }}>Contact</p>
          <h1 className="ch-title">Say hello, we&apos;ll take it from here</h1>
          <p className="ch-lead">Questions about dates, a long stay, or what to do nearby? Reach us the way you like best, and our host team will get back to you, usually within a day.</p>
          <div className="ch-stats">
            <span className="ch-stat"><svg className="ic"><use href="#i-chat" /></svg>Replies within a day</span>
            <span className="sep" />
            <span className="ch-stat"><svg className="ic"><use href="#i-house" /></svg><strong>3</strong> homes</span>
            <span className="sep" />
            <span className="ch-stat"><svg className="ic"><use href="#i-mountain" /></svg>La Trinidad Valley</span>
          </div>
        </div>
      </header>

      {/* ============ CONTACT METHODS ============ */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow">Ways to reach us</p>
            <h2 className="display h2">Pick whatever is easiest</h2>
            <p className="lead">However you get in touch, you reach the same friendly host team. For the quickest hold on your dates, book straight through Airbnb.</p>
          </div>
          <div className="methods">
            <div className="method reveal d1">
              <span className="m-ic"><svg className="ic"><use href="#i-mail" /></svg></span>
              <h3>Email</h3>
              <p>Best for detailed questions, long stays, and group bookings.</p>
              <span className="m-val">info@jmgnest.com</span>
              <a className="btn-text" href="mailto:info@jmgnest.com">Send an email <svg className="ic"><use href="#i-arrow-right" /></svg></a>
            </div>
            <div className="method reveal d2">
              <span className="m-ic"><svg className="ic"><use href="#i-chat" /></svg></span>
              <h3>Message us</h3>
              <p>Quick questions? Send us a message on Facebook and we&apos;ll reply fast.</p>
              <span className="m-val">facebook.com/jmgnest</span>
              <a className="btn-text" href="https://www.facebook.com/jmgnest" target="_blank" rel="noopener noreferrer">Open Messenger <svg className="ic"><use href="#i-arrow-right" /></svg></a>
            </div>
            <div className="method reveal d3">
              <span className="m-ic"><svg className="ic"><use href="#i-phone" /></svg></span>
              <h3>Call or text</h3>
              <p>Prefer to talk it through? Reach us during the day, Baguio time.</p>
              <span className="m-val">+63 9XX XXX XXXX</span>
              <a className="btn-text" href="mailto:info@jmgnest.com">Ask for our number <svg className="ic"><use href="#i-arrow-right" /></svg></a>
            </div>
            <div className="method reveal d4">
              <span className="m-ic"><svg className="ic"><use href="#i-airbnb" /></svg></span>
              <h3>Book on Airbnb</h3>
              <p>See live availability and reserve instantly, with Airbnb protection.</p>
              <span className="m-val">Instant booking · verified reviews</span>
              <a className="btn-text" href="https://www.airbnb.com/rooms/1318250624522250354" target="_blank" rel="noopener noreferrer">View on Airbnb <svg className="ic"><use href="#i-arrow-right" /></svg></a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT FORM + INFO ============ */}
      <section className="sec contact-sec" id="enquire">
        <div className="wrap">
          <div className="contact-split">
            {/* Form */}
            <form className="form-card reveal" ref={formRef} onSubmit={handleSubmit}>
              <h3 className="display h3">Send an enquiry</h3>
              <p className="fc-sub">Tell us a little about your trip and we&apos;ll come back with dates, rates, and a few local tips.</p>
              <div className="form-grid">
                <div className="f-field">
                  <label htmlFor="cf-name">Full name</label>
                  <input id="cf-name" name="name" type="text" placeholder="Your name" required />
                </div>
                <div className="f-field">
                  <label htmlFor="cf-email">Email</label>
                  <input id="cf-email" name="email" type="email" placeholder="you@email.com" required />
                </div>
                <div className="f-field">
                  <label htmlFor="cf-unit">Unit of interest</label>
                  <select id="cf-unit" name="unit" defaultValue="">
                    <option value="">Any / not sure yet</option>
                    <option value="Main Unit">Main Unit · up to 12 guests</option>
                    <option value="Unit A">Unit A · up to 8 guests</option>
                    <option value="Unit B">Unit B · up to 10 guests</option>
                    <option value="Monthly / long stay">Monthly / long stay</option>
                  </select>
                </div>
                <div className="f-field">
                  <label htmlFor="cf-guests">Guests</label>
                  <select id="cf-guests" name="guests" defaultValue="">
                    <option value="">Select guests</option>
                    <option>1 – 2</option>
                    <option>3 – 4</option>
                    <option>5 – 6</option>
                    <option>7 – 8</option>
                    <option>9 – 10</option>
                    <option>11 – 12</option>
                  </select>
                </div>
                <div className="f-field">
                  <label htmlFor="cf-in">Check in</label>
                  <input id="cf-in" name="checkin" type="date" />
                </div>
                <div className="f-field">
                  <label htmlFor="cf-out">Check out</label>
                  <input id="cf-out" name="checkout" type="date" />
                </div>
                <div className="f-field full">
                  <label htmlFor="cf-msg">Message</label>
                  <textarea id="cf-msg" name="message" placeholder="Anything you'd like us to know, questions, or special requests." required />
                </div>
              </div>
              <div className="form-foot">
                <button type="submit" className="btn btn-gold" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'} <svg className="ic"><use href="#i-arrow-right" /></svg>
                </button>
                {status === 'success' && (
                  <span className="form-success"><svg className="ic"><use href="#i-check" /></svg> Thanks, your message is on its way. We&apos;ll reply soon.</span>
                )}
                {status === 'error' && (
                  <span className="form-error">{errorMsg}</span>
                )}
                {status !== 'success' && status !== 'error' && (
                  <p className="form-note">We only use your details to answer your enquiry. No spam, ever.</p>
                )}
              </div>
            </form>

            {/* Info panel */}
            <aside className="info-panel reveal d1">
              <h3 className="display h3">Contact details</h3>
              <p className="ip-sub">The nest, at a glance.</p>
              <div className="ip-row">
                <span className="ip-ic"><svg className="ic"><use href="#i-pin" /></svg></span>
                <div><h4>Where we are</h4><p>La Trinidad Valley, Benguet · about 15 minutes from Baguio City. Exact address shared on booking.</p></div>
              </div>
              <div className="ip-row">
                <span className="ip-ic"><svg className="ic"><use href="#i-mail" /></svg></span>
                <div><h4>Email</h4><p><a className="ip-link" href="mailto:info@jmgnest.com">info@jmgnest.com</a></p></div>
              </div>
              <div className="ip-row">
                <span className="ip-ic"><svg className="ic"><use href="#i-clock" /></svg></span>
                <div><h4>Response time</h4><p>Usually within a day, often much sooner during the day, Baguio time.</p></div>
              </div>
              <div className="ip-row">
                <span className="ip-ic"><svg className="ic"><use href="#i-key" /></svg></span>
                <div><h4>Check-in · check-out</h4><p>Check in from 3:00 PM · check out by 11:00 AM. Early or late by arrangement.</p></div>
              </div>
              <div className="ip-row">
                <span className="ip-ic"><svg className="ic"><use href="#i-guests" /></svg></span>
                <div><h4>Your hosts</h4><p>A warm local team on the ground, ready with directions and recommendations.</p></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============ LOCATION (Google Maps) ============ */}
      <section className="sec" id="location">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow">Getting here</p>
            <h2 className="display h2">Find your way to the nest</h2>
            <p className="lead">We sit above La Trinidad Valley, a quiet fifteen minutes from the heart of Baguio City. Once your stay is confirmed, we&apos;ll send the exact pin and check-in details.</p>
          </div>
          <div className="loc-split">
            <div className="loc-map reveal">
              <iframe title="JMG Nest location map" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=La%20Trinidad%20Benguet%20Philippines&output=embed" />
              <div className="map-cta">
                <a href="https://www.google.com/maps/search/?api=1&query=La+Trinidad+Benguet+Philippines" target="_blank" rel="noopener noreferrer" className="btn-text">Open in Google Maps <svg className="ic"><use href="#i-arrow-right" /></svg></a>
              </div>
            </div>
            <div className="loc-info reveal d1">
              <h3 className="display h3">A few notes for arrival</h3>
              <p className="lead">Small things that make the drive up easy.</p>
              <div className="loc-fact"><div className="lf-ic"><svg className="ic"><use href="#i-house" /></svg></div><div><h4>Free private parking</h4><p>Bring the car right up · secure, on-site parking is included</p></div></div>
              <div className="loc-fact"><div className="lf-ic"><svg className="ic"><use href="#i-pin" /></svg></div><div><h4>Quiet, elevated setting</h4><p>Up the mountain, away from the traffic, yet close to the city</p></div></div>
              <div className="loc-fact"><div className="lf-ic"><svg className="ic"><use href="#i-chat" /></svg></div><div><h4>Directions on request</h4><p>Message us anytime and we&apos;ll guide you to the door</p></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLOSING CTA ============ */}
      <section className="c-cta dark">
        <div className="wrap">
          <p className="eyebrow" style={{ color: 'var(--gold)' }}>Ready when you are</p>
          <h2 className="display h2">Let&apos;s plan your stay</h2>
          <p className="lead">Tell us your dates and we&apos;ll take care of the rest. Pick the unit that fits your group and settle in above the La Trinidad valley, fifteen minutes from Baguio City.</p>
          <div className="c-cta-actions">
            <Link href="/booking#book" className="btn btn-gold">Check availability <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
            <Link href="/booking" className="btn btn-ghost">View all units <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
