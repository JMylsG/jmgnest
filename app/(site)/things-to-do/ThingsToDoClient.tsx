'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import MockupSprite from '@/components/MockupSprite'

type Activity = {
  name: string
  cat: 'culture' | 'nature' | 'adventure' | 'food' | 'shopping'
  icon: string
  dist: string
  time: string
  lat: number
  lng: number
  desc: string
}

const CAT_LABELS: Record<Activity['cat'], string> = {
  culture: 'Culture',
  nature: 'Nature',
  adventure: 'Adventure',
  food: 'Food',
  shopping: 'Shopping',
}

const CAT_CHIPS: { val: string; label: string }[] = [
  { val: 'all', label: 'All' },
  { val: 'culture', label: 'Culture' },
  { val: 'nature', label: 'Nature' },
  { val: 'adventure', label: 'Adventure' },
  { val: 'food', label: 'Food' },
  { val: 'shopping', label: 'Shopping' },
]

const ACTIVITIES: Activity[] = [
  { name: 'Igorot Stone Kingdom', cat: 'culture', icon: 'i-landmark', dist: '5.2 km', time: '15 minutes', lat: 16.3988, lng: 120.6114, desc: 'Cultural heritage site showcasing the rich traditions and history of the Igorot people, set among stone structures with sweeping views.' },
  { name: 'Burnham Park', cat: 'nature', icon: 'i-tree', dist: '3.8 km', time: '20 minutes', lat: 16.403, lng: 120.5956, desc: 'Baguio’s historic central park with a man-made lake for boating, gardens, and easy walking paths, right in the heart of the city.' },
  { name: 'Session Road', cat: 'shopping', icon: 'i-bag', dist: '4.1 km', time: '25 minutes', lat: 16.4031, lng: 120.5934, desc: 'The city’s main commercial street, lined with shops, cafes, and restaurants. The best place to feel Baguio’s everyday buzz.' },
  { name: 'Strawberry Farm', cat: 'food', icon: 'i-berry', dist: 'approx. 2 km', time: 'approx. 10 minutes', lat: 16.4548, lng: 120.5883, desc: 'La Trinidad’s famous strawberry fields. Pick your own in season, then try strawberry taho and fresh farm produce from the stalls.' },
  { name: 'Mines View Park', cat: 'nature', icon: 'i-mountain', dist: 'approx. 8 km', time: 'approx. 35 minutes', lat: 16.4188, lng: 120.6297, desc: 'A classic Baguio viewpoint over the old mining valley and mountain ranges, with local crafts and warm wraps for the cool breeze.' },
  { name: 'BenCab Museum', cat: 'culture', icon: 'i-landmark', dist: 'approx. 12 km', time: 'approx. 30 minutes', lat: 16.3792, lng: 120.5306, desc: 'National Artist Benedicto Cabrera’s museum on Asin Road, with Cordillera art, galleries, gardens, and a cafe overlooking the ravine.' },
  { name: 'Camp John Hay', cat: 'adventure', icon: 'i-tree', dist: 'approx. 7 km', time: 'approx. 30 minutes', lat: 16.3939, lng: 120.6194, desc: 'Pine-shaded forest trails, the tree-top adventure course, and open lawns. A calm, cool escape wrapped in Benguet pines.' },
  { name: 'Mt. Kalugong', cat: 'adventure', icon: 'i-compass', dist: 'approx. 5 km', time: 'approx. 20 minutes', lat: 16.472, lng: 120.585, desc: 'A short, rewarding climb over limestone rock formations in La Trinidad, with a pine garden and valley views at the top.' },
  { name: 'Baguio Public Market', cat: 'shopping', icon: 'i-bag', dist: 'approx. 4 km', time: 'approx. 25 minutes', lat: 16.4165, lng: 120.596, desc: 'A lively maze of stalls for fresh produce, highland vegetables, coffee, woven goods, and pasalubong to take home.' },
  { name: 'Good Shepherd Convent', cat: 'food', icon: 'i-utensils', dist: 'approx. 8 km', time: 'approx. 34 minutes', lat: 16.4128, lng: 120.631, desc: 'Home of the beloved ube jam and peanut brittle, made by the sisters. Come early on weekends before the favorites sell out.' },
  { name: 'The Mansion', cat: 'culture', icon: 'i-landmark', dist: 'approx. 8 km', time: 'approx. 33 minutes', lat: 16.409, lng: 120.628, desc: 'The official summer residence of the President, known for its grand gate and manicured grounds, a short stop near Wright Park.' },
  { name: 'Wright Park', cat: 'nature', icon: 'i-tree', dist: 'approx. 8 km', time: 'approx. 33 minutes', lat: 16.4106, lng: 120.6266, desc: 'The Pool of Pines promenade and pony rides for the kids, framed by tall trees just across from The Mansion.' },
]

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const mapUrl = (a: Activity) => `https://www.google.com/maps/search/?api=1&query=${a.lat},${a.lng}`
const imgUrl = (a: Activity) => `/things-to-do-images/${slugify(a.name)}.jpg`

export default function ThingsToDoClient() {
  const [cat, setCat] = useState('all')
  const gridRef = useRef<HTMLDivElement>(null)

  const current = useMemo(
    () => ACTIVITIES.filter((a) => cat === 'all' || a.cat === cat),
    [cat]
  )

  // Staged fade-in for activity cards
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.act-card') ?? []
    const timers: number[] = []
    const raf = requestAnimationFrame(() => {
      cards.forEach((c, i) =>
        timers.push(window.setTimeout(() => c.classList.add('shown'), Math.min(i * 55, 480)))
      )
    })
    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
    }
  }, [current])

  // Reveal-on-scroll for the lower sections
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

  return (
    <div className="mk">
      <MockupSprite />

      {/* ============ COMPACT HERO ============ */}
      <header className="t-hero dark">
        <div className="th-bg">
          <img src="/things-to-do-images/hero.jpg" alt="Golden light over La Trinidad Valley near JMG Nest" />
        </div>
        <div className="th-scrim" />
        <div className="th-inner">
          <p className="eyebrow" style={{ color: '#C49863' }}>Things to Do</p>
          <h1 className="th-title">The valley, right outside your door</h1>
          <p className="th-lead">Strawberry farms, mountain parks, museums, and Baguio&apos;s markets are all a short drive away. Browse by what you are in the mood for, then map your route from the nest.</p>
          <div className="th-stats">
            <span className="th-stat"><svg className="ic"><use href="#i-compass" /></svg><strong>12</strong> curated spots</span>
            <span className="sep" />
            <span className="th-stat"><svg className="ic"><use href="#i-clock" /></svg><strong>15</strong> min to Baguio City</span>
            <span className="sep" />
            <span className="th-stat"><svg className="ic"><use href="#i-mountain" /></svg>La Trinidad Valley</span>
          </div>
        </div>
      </header>

      {/* ============ FILTER BAR ============ */}
      <section className="filter-bar" id="browse" aria-label="Filter the activities">
        <div className="wrap filter-inner">
          <div className="filter-group">
            <span className="filter-lbl">Interest</span>
            <div className="chip-row" role="group" aria-label="Filter by category">
              {CAT_CHIPS.map((c) => (
                <button key={c.val} type="button" className={`fchip${cat === c.val ? ' active' : ''}`} onClick={() => setCat(c.val)}>{c.label}</button>
              ))}
            </div>
          </div>
          <p className="filter-count"><b>{current.length}</b> {current.length === 1 ? 'place' : 'places'}</p>
        </div>
      </section>

      {/* ============ ACTIVITY GRID ============ */}
      <section className="acts-sec">
        <div className="wrap">
          <div className="acts-grid" ref={gridRef}>
            {current.length === 0 ? (
              <p className="acts-empty">Nothing in that category yet. Try another interest.</p>
            ) : (
              current.map((a) => (
                <article key={a.name} className="act-card">
                  <span className="act-ph"><svg className="ic"><use href={`#${a.icon}`} /></svg></span>
                  <img
                    className="act-photo"
                    src={imgUrl(a)}
                    alt={a.name}
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).remove() }}
                  />
                  <span className="act-scrim" />
                  <span className="act-top">
                    <span className="act-tag">{CAT_LABELS[a.cat]}</span>
                    <span className="act-dist"><svg className="ic"><use href="#i-pin" /></svg>{a.dist}</span>
                  </span>
                  <div className="act-body">
                    <span className="act-name">{a.name}</span>
                    <div className="act-meta"><span><svg className="ic"><use href="#i-clock" /></svg>{a.time}</span></div>
                    <div className="act-actions">
                      <a className="act-cta" href={mapUrl(a)} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to ${a.name}`}>Get directions <svg className="ic"><use href="#i-arrow-right" /></svg></a>
                      <Link prefetch={false} className="act-cta act-guide" href={`/things-to-do/${slugify(a.name)}`} aria-label={`Read the guide for ${a.name}`}>Read guide <svg className="ic"><use href="#i-book" /></svg></Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ============ LOCATION (Google Maps) ============ */}
      <section className="sec" id="location">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow">Getting around</p>
            <h2 className="display h2">Close to everything, far from the noise</h2>
            <p className="lead">The nest sits above La Trinidad Valley, a quiet fifteen minutes from the heart of Baguio City. Most of these spots are an easy drive or a short ride away.</p>
          </div>
          <div className="loc-split">
            <div className="loc-map reveal">
              <iframe title="Nearby Attractions Map" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=tourist%20attractions%20near%20La%20Trinidad%20Benguet&output=embed" />
              <div className="map-cta">
                <a href="https://www.google.com/maps/search/?api=1&query=tourist+attractions+near+La+Trinidad+Benguet" target="_blank" rel="noopener noreferrer" className="btn-text">Open in Google Maps <svg className="ic"><use href="#i-arrow-right" /></svg></a>
              </div>
            </div>
            <div className="loc-info reveal d1">
              <h3 className="display h3">Good to know</h3>
              <p className="lead">A few things that make day trips from the nest easy.</p>
              <div className="loc-fact"><div className="lf-ic"><svg className="ic"><use href="#i-pin" /></svg></div><div><h4>Central to it all</h4><p>La Trinidad Valley, Benguet · minutes from Baguio City proper</p></div></div>
              <div className="loc-fact"><div className="lf-ic"><svg className="ic"><use href="#i-house" /></svg></div><div><h4>Free private parking</h4><p>Leave early, beat the traffic, and keep the car close</p></div></div>
              <div className="loc-fact"><div className="lf-ic"><svg className="ic"><use href="#i-chat" /></svg></div><div><h4>Local tips on request</h4><p>Our host team is happy to map a route or suggest a favorite</p></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PLAN YOUR DAY ============ */}
      <section className="sec plan-sec">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow">Plan your day</p>
            <h2 className="display h2">A gentle way to spend it</h2>
            <p className="lead">No rush. Here is one easy rhythm that works well from the nest.</p>
          </div>
          <div className="plan-grid">
            <div className="plan-card reveal d1">
              <div className="pc-ic"><svg className="ic"><use href="#i-coffee" /></svg></div>
              <p className="pc-when">Morning</p>
              <h4>Start slow, then wander</h4>
              <p>Coffee on the porch, then a short drive to the strawberry farm before the crowds. Cool air and clear mountain light make it the best window for photos.</p>
            </div>
            <div className="plan-card reveal d2">
              <div className="pc-ic"><svg className="ic"><use href="#i-tree" /></svg></div>
              <p className="pc-when">Afternoon</p>
              <h4>Parks and viewpoints</h4>
              <p>Boating at Burnham Park, panoramas at Mines View, or a quiet hour at a museum. Pace it gently · the valley rewards a slower afternoon.</p>
            </div>
            <div className="plan-card reveal d3">
              <div className="pc-ic"><svg className="ic"><use href="#i-utensils" /></svg></div>
              <p className="pc-when">Evening</p>
              <h4>Market bites and home</h4>
              <p>Wind down along Session Road, pick up ube jam and produce at the market, then head back up to the quiet for the night.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLOSING CTA ============ */}
      <section className="t-cta dark">
        <div className="wrap">
          <p className="eyebrow" style={{ color: 'var(--gold)' }}>Ready when you are</p>
          <h2 className="display h2">Make the nest your base camp</h2>
          <p className="lead">Everything worth seeing is a short drive from your door. Pick the unit that fits your group and settle in above the La Trinidad valley, fifteen minutes from Baguio City.</p>
          <div className="t-cta-actions">
            <Link prefetch={false} href="/booking#book" className="btn btn-gold">Check availability <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
            <Link prefetch={false} href="/booking" className="btn btn-ghost">View all units <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
