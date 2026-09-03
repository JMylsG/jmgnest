'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import MockupSprite from '@/components/MockupSprite'

const CLOUD = 'https://res.cloudinary.com/jmg-nest/image/upload/'
const img = (file: string, w: number) => `${CLOUD}f_auto,q_auto,w_${w}/${file}`

type Thumb = { file: string; alt: string }

type UnitData = {
  id: string
  anchor: string
  name: string
  badge: string
  badgeStar: boolean
  alt: boolean
  rev: boolean
  thumbs: Thumb[]
  cap: string
  rateLine: string
  desc: string
  caps: { ic: string; b: string; s: string }[]
  amenities: { ic: string; t: string }[]
  amenMore: string
  review: { q: string; nm: string; dt: string }
  priceNightly: string
  priceMonthly: string
  save: string
  airbnb: string
}

const UNITS: UnitData[] = [
  {
    id: 'main-unit',
    anchor: 'main-unit',
    name: 'Main Unit',
    badge: 'Most Popular',
    badgeStar: true,
    alt: false,
    rev: false,
    thumbs: [
      { file: 'main-patio-1.jpg', alt: 'Main Unit porch' },
      { file: 'SDB_9291_bobgxm.jpg', alt: 'Main Unit living room' },
      { file: 'SDB_9259_ndkkk0.jpg', alt: 'Main Unit kitchen and dining' },
      { file: 'SDB_9356_o608aw.jpg', alt: 'Main Unit master bedroom' },
      { file: 'main-bathroom-1.jpg', alt: 'Main Unit bathroom' },
    ],
    cap: 'Private porch, spacious living room, full kitchen, four bedrooms, and a mountain-view balcony.',
    rateLine: '5.0 from recent guests',
    desc: 'Our flagship home. Four bedrooms, the best views of the La Trinidad valley off the back terrace, and room enough for the whole family to gather in one place.',
    caps: [
      { ic: 'i-guests', b: 'Up to 12', s: 'Guests' },
      { ic: 'i-bed', b: '4', s: 'Bedrooms' },
      { ic: 'i-bath', b: '2', s: 'Baths' },
    ],
    amenities: [
      { ic: 'i-kitchen', t: 'Full Kitchen' },
      { ic: 'i-wifi', t: 'High-Speed WiFi' },
      { ic: 'i-shower', t: 'Hot Water' },
      { ic: 'i-parking', t: 'Free Parking' },
      { ic: 'i-tv', t: 'Smart TV' },
      { ic: 'i-coffee', t: 'Coffee Maker' },
      { ic: 'i-mountain', t: 'Mountain View Balcony' },
    ],
    amenMore: 'Plus microwave, refrigerator, hair dryer, dining area, and a full living room.',
    review: {
      q: '"The place is jaw dropping, great furniture and a very relaxing environment. Very spacious, huge balcony with a great view. Will definitely be back!"',
      nm: 'Michael',
      dt: 'February 2025',
    },
    priceNightly: '₱12,500',
    priceMonthly: '₱281,250',
    save: 'Save 25% · ≈ ₱9,375/night',
    airbnb: 'https://www.airbnb.com/rooms/1318250624522250354',
  },
  {
    id: 'unit-a',
    anchor: 'unit-a',
    name: 'Unit A',
    badge: 'Most Affordable',
    badgeStar: false,
    alt: true,
    rev: true,
    thumbs: [
      { file: 'SDB_9518_yv3b2v.jpg', alt: 'Unit A living space' },
      { file: 'SDB_9506_u8atd5.jpg', alt: 'Unit A bedroom' },
      { file: 'SDB_9500_trnbz3.jpg', alt: 'Unit A second bedroom' },
      { file: 'SDB_9475_qor51f.jpg', alt: 'Unit A kitchenette' },
      { file: 'SDB_9484_tu7bbv.jpg', alt: 'Unit A bathroom' },
    ],
    cap: 'A bright living area, two peaceful bedrooms, a full kitchenette, and a clean modern bath.',
    rateLine: '5.0 from recent guests',
    desc: 'The most affordable nest. A charming two-bedroom escape, ideal for couples or a small family who want calm and value, away from the traffic yet minutes from the city proper.',
    caps: [
      { ic: 'i-guests', b: 'Up to 8', s: 'Guests' },
      { ic: 'i-bed', b: '2', s: 'Bedrooms' },
      { ic: 'i-bath', b: '1', s: 'Bath' },
    ],
    amenities: [
      { ic: 'i-kitchen', t: 'Kitchenette' },
      { ic: 'i-wifi', t: 'High-Speed WiFi' },
      { ic: 'i-shower', t: 'Hot Water' },
      { ic: 'i-parking', t: 'Free Parking' },
      { ic: 'i-tv', t: 'Smart TV' },
      { ic: 'i-coffee', t: 'Coffee Maker' },
    ],
    amenMore: 'Plus microwave, refrigerator, hair dryer, dining area, and a comfortable living area.',
    review: {
      q: '"The place was beyond my expectations and the host was very responsive. Manang Devina is friendly and gave us local recommendations. We had a great time staying there."',
      nm: 'Gwen',
      dt: 'February 2025',
    },
    priceNightly: '₱5,250',
    priceMonthly: '₱118,125',
    save: 'Save 25% · ≈ ₱3,938/night',
    airbnb: 'https://www.airbnb.com/rooms/1318333157071110017',
  },
  {
    id: 'unit-b',
    anchor: 'unit-b',
    name: 'Unit B',
    badge: 'Family Haven',
    badgeStar: false,
    alt: false,
    rev: false,
    thumbs: [
      { file: 'SDB_9575_dhw1e4.jpg', alt: 'Unit B living area' },
      { file: 'SDB_9576_lvigsb.jpg', alt: 'Unit B kitchen' },
      { file: 'ARC_9818_im6ish.jpg', alt: 'Unit B master bedroom' },
      { file: 'SDB_9610_rp2cr6.jpg', alt: 'Unit B second bedroom' },
      { file: 'SDB_9568_ken7kd.jpg', alt: 'Unit B bathroom' },
    ],
    cap: 'A large living area, full kitchen, three furnished bedrooms, two baths, and a small balcony.',
    rateLine: '5.0 from recent guests',
    desc: 'A cozy three-bedroom haven with a bright, airy living space and its own balcony for morning coffee. Sized for growing families and groups who want a little more room to spread out.',
    caps: [
      { ic: 'i-guests', b: 'Up to 10', s: 'Guests' },
      { ic: 'i-bed', b: '3', s: 'Bedrooms' },
      { ic: 'i-bath', b: '2', s: 'Baths' },
    ],
    amenities: [
      { ic: 'i-kitchen', t: 'Full Kitchen' },
      { ic: 'i-wifi', t: 'High-Speed WiFi' },
      { ic: 'i-shower', t: 'Hot Water' },
      { ic: 'i-parking', t: 'Free Parking' },
      { ic: 'i-tv', t: 'Smart TV' },
      { ic: 'i-coffee', t: 'Coffee Maker' },
      { ic: 'i-mountain', t: 'Balcony' },
    ],
    amenMore: 'Plus microwave, refrigerator, hair dryer, dining area, and a full living room.',
    review: {
      q: '"From the moment we walked in, we were greeted by a beautifully designed space that felt like a home away from home, clean, cozy, and filled with thoughtful touches."',
      nm: 'Jonas Ian',
      dt: 'March 2025',
    },
    priceNightly: '₱6,250',
    priceMonthly: '₱140,625',
    save: 'Save 25% · ≈ ₱4,688/night',
    airbnb: 'https://www.airbnb.com/rooms/1318338566291278964',
  },
]

const LONG_STAYS = [
  { name: 'Main Unit', month: '₱281,250', eff: '≈ ₱9,375 / night', was: '₱12,500 nightly' },
  { name: 'Unit A', month: '₱118,125', eff: '≈ ₱3,938 / night', was: '₱5,250 nightly' },
  { name: 'Unit B', month: '₱140,625', eff: '≈ ₱4,688 / night', was: '₱6,250 nightly' },
]

const Stars = ({ n = 5 }: { n?: number }) => (
  <>
    {Array.from({ length: n }).map((_, i) => (
      <svg key={i} className="ic ic-fill">
        <use href="#i-star" />
      </svg>
    ))}
  </>
)

export default function UnitsClient() {
  const router = useRouter()
  const [rateMode, setRateMode] = useState<'nightly' | 'monthly'>('nightly')
  // Active thumbnail index per unit gallery
  const [active, setActive] = useState<Record<string, number>>({
    'main-unit': 0,
    'unit-a': 0,
    'unit-b': 0,
  })
  const [qsUnit, setQsUnit] = useState('Any unit')

  // Reveal-on-scroll (ported from the mockup)
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

  const monthly = rateMode === 'monthly'

  const onQuickStay = (e: React.FormEvent) => {
    e.preventDefault()
    const slug: Record<string, string> = {
      'Main Unit': '/booking/main-unit',
      'Unit A': '/booking/unit-a',
      'Unit B': '/booking/unit-b',
    }
    router.push(slug[qsUnit] || '/booking')
  }

  return (
    <div className="mk">
      <MockupSprite />

      {/* ============ COMPACT HERO ============ */}
      <header className="units-hero dark">
        <div className="uh-bg">
          <img src={img('v1763355667/Balcony_View_wdbvpd.jpg', 1600)} alt="Valley view from the JMG Nest balcony above La Trinidad" />
        </div>
        <div className="uh-scrim" />
        <div className="uh-inner">
          <p className="eyebrow" style={{ color: '#C49863' }}>Our Units</p>
          <h1 className="uh-title">Three homes, one quiet property</h1>
          <p className="uh-lead">A single building above La Trinidad Valley, fifteen minutes from Baguio City. Pick the space that fits your group, then settle in.</p>
          <div className="uh-rating">
            <span className="stars"><Stars /></span>
            <span><strong>5.0</strong> across all three units</span>
          </div>
          <div className="uh-jump">
            <a href="#main-unit" className="uh-chip">Main Unit <span className="amt">₱12,500</span></a>
            <a href="#unit-a" className="uh-chip">Unit A <span className="amt">₱5,250</span></a>
            <a href="#unit-b" className="uh-chip">Unit B <span className="amt">₱6,250</span></a>
            <a href="#long-stays" className="uh-chip">Monthly stay <span className="amt">-25%</span></a>
            <a href="#compare" className="uh-chip">Compare all <svg className="ic"><use href="#i-arrow-right" /></svg></a>
          </div>
        </div>
      </header>

      {/* ============ STAY OPTIONS (nightly / monthly toggle) ============ */}
      <section className="stay-intro" id="stay-options">
        <div className="wrap">
          <div className="stay-intro-inner reveal">
            <div className="si-copy">
              <p className="eyebrow">Two ways to stay</p>
              <h2 className="display">Book a night, or settle in for a month</h2>
              <p className="lead">Stay by the night, or book 30 nights or more and every rate drops 25%. Switch the pricing to see how each unit compares.</p>
            </div>
            <div className="rate-toggle" role="group" aria-label="Pricing mode">
              <button type="button" className={`rt-opt${!monthly ? ' active' : ''}`} aria-pressed={!monthly} onClick={() => setRateMode('nightly')}>Nightly</button>
              <button type="button" className={`rt-opt${monthly ? ' active' : ''}`} aria-pressed={monthly} onClick={() => setRateMode('monthly')}>Monthly <span className="rt-save">-25%</span></button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ UNIT DETAILS ============ */}
      {UNITS.map((u) => (
        <section key={u.id} className={`unit-detail${u.alt ? ' alt' : ''}`} id={u.anchor}>
          <div className="wrap">
            <div className={`ud-grid${u.rev ? ' rev' : ''} reveal`}>
              <div className="ud-gallery">
                <div className="ud-main">
                  {u.badge && (
                    <span className="ud-badge-float">
                      {u.badgeStar && <svg className="ic ic-fill"><use href="#i-star" /></svg>} {u.badge}
                    </span>
                  )}
                  <img src={img(u.thumbs[active[u.id]].file, 1400)} alt={u.thumbs[active[u.id]].alt} />
                </div>
                <div className="ud-thumbs">
                  {u.thumbs.map((t, i) => (
                    <button
                      key={t.file}
                      type="button"
                      className={`ud-thumb${active[u.id] === i ? ' active' : ''}`}
                      onClick={() => setActive((s) => ({ ...s, [u.id]: i }))}
                    >
                      <img src={img(t.file, 400)} alt={t.alt} />
                    </button>
                  ))}
                </div>
                <p className="ud-cap">{u.cap}</p>
              </div>
              <div className="ud-info">
                <span className="u-badge">
                  {u.badgeStar ? <svg className="ic ic-fill"><use href="#i-star" /></svg> : u.badge === 'Family Haven' ? <svg className="ic"><use href="#i-house" /></svg> : null} {u.badge}
                </span>
                <h2 className="display">{u.name}</h2>
                <span className="ud-rate"><svg className="ic ic-fill"><use href="#i-star" /></svg> {u.rateLine}</span>
                <p className="ud-desc">{u.desc}</p>
                <div className="ud-caps">
                  {u.caps.map((c) => (
                    <div className="cap" key={c.s}>
                      <svg className="ic"><use href={`#${c.ic}`} /></svg>
                      <span><b>{c.b}</b><small>{c.s}</small></span>
                    </div>
                  ))}
                </div>
                <p className="am-title">What is included</p>
                <div className="am-chips">
                  {u.amenities.map((a) => (
                    <span className="am-chip" key={a.t}><svg className="ic"><use href={`#${a.ic}`} /></svg> {a.t}</span>
                  ))}
                </div>
                <p className="am-more">{u.amenMore}</p>
                <div className="ud-review">
                  <div className="stars"><Stars /></div>
                  <p className="q">{u.review.q}</p>
                  <div className="by"><span className="nm">{u.review.nm}</span><span className="dt">{u.review.dt}</span></div>
                </div>
                <div className="ud-price-row">
                  <div className="ud-price">
                    <span className="from">From</span>
                    <span className="amt">{monthly ? u.priceMonthly : u.priceNightly}</span>{' '}
                    <span className="per">{monthly ? '/ month' : '/ night'}</span>
                    {monthly && <span className="ud-save">{u.save}</span>}
                  </div>
                  <div className="ud-actions">
                    <Link href={`/booking/${u.id}`} className="btn btn-ghost">Check availability</Link>
                    <a href={u.airbnb} target="_blank" rel="noopener noreferrer" className="btn btn-gold">Book on Airbnb <svg className="ic"><use href="#i-arrow-right" /></svg></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ============ LONG STAYS ============ */}
      <section className="sec longstay dark" id="long-stays">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow">Long stays</p>
            <h2 className="display h2">Settle in for a month or more</h2>
            <p className="lead">Staying thirty nights or longer? Every unit is priced 25% below its nightly rate. Made for remote work, extended family visits, and slow travel in the mountains.</p>
          </div>
          <div className="ls-grid reveal d1">
            {LONG_STAYS.map((l) => (
              <article className="ls-card" key={l.name}>
                <div className="ls-nm">{l.name}</div>
                <span className="ls-save">Save 25%</span>
                <div><span className="ls-amt">{l.month}</span> <span className="ls-per">/ month</span></div>
                <p className="ls-eff">{l.eff} · <s>{l.was}</s></p>
                <Link href="/contact" className="btn btn-gold btn-block">Enquire for a month <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
              </article>
            ))}
          </div>
          <div className="ls-notes reveal d2">
            <span className="ls-note"><svg className="ic"><use href="#i-calendar" /></svg> Minimum 30 nights</span>
            <span className="ls-note"><svg className="ic ic-fill"><use href="#i-sparkle" /></svg> 25% below the nightly rate</span>
            <span className="ls-note"><svg className="ic"><use href="#i-wifi" /></svg> WiFi and utilities included</span>
            <span className="ls-note"><svg className="ic"><use href="#i-mountain" /></svg> Ideal for remote work and slow travel</span>
          </div>
          <div className="ls-cta reveal d3"><Link href="/contact" className="btn btn-gold">Plan a long stay <svg className="ic"><use href="#i-arrow-right" /></svg></Link></div>
        </div>
      </section>

      {/* ============ COMPARE ============ */}
      <section className="sec compare" id="compare">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow">Side by side</p>
            <h2 className="display h2">Compare the three units</h2>
            <p className="lead">Same warm hospitality, same quiet property. The difference is space, price, and who you are bringing.</p>
          </div>
          <div className="compare-wrap reveal d1">
            <table className="compare-tbl">
              <thead>
                <tr>
                  <th></th>
                  <th><div className="u-nm">Main Unit</div><span className="u-tag">Most Popular</span></th>
                  <th><div className="u-nm">Unit A</div><span className="u-tag">Most Affordable</span></th>
                  <th><div className="u-nm">Unit B</div><span className="u-tag">Family Haven</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Sleeps</th>
                  <td><svg className="ic"><use href="#i-guests" /></svg>Up to 12</td>
                  <td><svg className="ic"><use href="#i-guests" /></svg>Up to 8</td>
                  <td><svg className="ic"><use href="#i-guests" /></svg>Up to 10</td>
                </tr>
                <tr>
                  <th>Bedrooms</th>
                  <td><svg className="ic"><use href="#i-bed" /></svg>4 Bedrooms</td>
                  <td><svg className="ic"><use href="#i-bed" /></svg>2 Bedrooms</td>
                  <td><svg className="ic"><use href="#i-bed" /></svg>3 Bedrooms</td>
                </tr>
                <tr>
                  <th>Bathrooms</th>
                  <td><svg className="ic"><use href="#i-bath" /></svg>2 Baths</td>
                  <td><svg className="ic"><use href="#i-bath" /></svg>1 Bath</td>
                  <td><svg className="ic"><use href="#i-bath" /></svg>2 Baths</td>
                </tr>
                <tr>
                  <th>Kitchen</th>
                  <td>Full kitchen</td>
                  <td>Kitchenette</td>
                  <td>Full kitchen</td>
                </tr>
                <tr>
                  <th>Balcony</th>
                  <td><svg className="ic"><use href="#i-check" /></svg>Mountain view</td>
                  <td>Shared grounds</td>
                  <td><svg className="ic"><use href="#i-check" /></svg>Private balcony</td>
                </tr>
                <tr>
                  <th>Rating</th>
                  <td><svg className="ic ic-fill"><use href="#i-star" /></svg>5.0</td>
                  <td><svg className="ic ic-fill"><use href="#i-star" /></svg>5.0</td>
                  <td><svg className="ic ic-fill"><use href="#i-star" /></svg>5.0</td>
                </tr>
                <tr>
                  <th>Nightly rate</th>
                  <td className="price"><b>₱12,500</b> <span>/ night</span></td>
                  <td className="price"><b>₱5,250</b> <span>/ night</span></td>
                  <td className="price"><b>₱6,250</b> <span>/ night</span></td>
                </tr>
                <tr>
                  <th>Monthly · 30+ nights</th>
                  <td className="price"><b>₱281,250</b> <span>/ mo · save 25%</span></td>
                  <td className="price"><b>₱118,125</b> <span>/ mo · save 25%</span></td>
                  <td className="price"><b>₱140,625</b> <span>/ mo · save 25%</span></td>
                </tr>
                <tr className="row-book">
                  <th>Reserve</th>
                  <td><a href="#main-unit" className="btn-text">View Main Unit <svg className="ic"><use href="#i-arrow-right" /></svg></a></td>
                  <td><a href="#unit-a" className="btn-text">View Unit A <svg className="ic"><use href="#i-arrow-right" /></svg></a></td>
                  <td><a href="#unit-b" className="btn-text">View Unit B <svg className="ic"><use href="#i-arrow-right" /></svg></a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="compare-note">All units include high-speed WiFi, hot water, free parking, and warm family hospitality. Minimum stay two nights.</p>
        </div>
      </section>

      {/* ============ QUICK STAY (glass booking) ============ */}
      <section className="sec quickstay dark" id="book">
        <div className="qs-bg"><img src={img('v1762640674/MainUnit_Patio2_e73vcr.jpg', 1600)} alt="Balcony view at sunset over La Trinidad Valley" /></div>
        <div className="qs-scrim" />
        <div className="wrap">
          <div className="qs-inner">
            <div className="qs-copy reveal">
              <p className="eyebrow" style={{ color: 'var(--gold)' }}>Reserve your dates</p>
              <h2 className="display h2">Quick stay booking</h2>
              <p className="lead">Tell us when you are coming and which space fits your group. We hold no charge until your dates are confirmed, usually within a few hours.</p>
              <div className="qs-rating">
                <span className="stars"><Stars /></span>
                <span><strong>5.0</strong> from recent guests</span>
              </div>
            </div>
            <form className="qs-card reveal d1" onSubmit={onQuickStay}>
              <div className="qs-title">Quick stay</div>
              <div className="qs-sub">Check availability in seconds</div>
              <div className="qs-stay">
                <span className="qs-stay-lbl">Stay type</span>
                <div className="rate-toggle" role="group" aria-label="Stay type">
                  <button type="button" className={`rt-opt${!monthly ? ' active' : ''}`} aria-pressed={!monthly} onClick={() => setRateMode('nightly')}>Nightly</button>
                  <button type="button" className={`rt-opt${monthly ? ' active' : ''}`} aria-pressed={monthly} onClick={() => setRateMode('monthly')}>Monthly <span className="rt-save">-25%</span></button>
                </div>
              </div>
              <div className="qs-row two">
                <div className="q-field"><label htmlFor="qs-in">Check in</label><input id="qs-in" type="date" /></div>
                <div className="q-field"><label htmlFor="qs-out">Check out</label><input id="qs-out" type="date" /></div>
              </div>
              <div className="qs-row two">
                <div className="q-field"><label htmlFor="qs-guests">Guests</label>
                  <select id="qs-guests" defaultValue="2 guests">
                    <option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4 guests</option>
                    <option>5 guests</option><option>6 guests</option><option>8 guests</option><option>10 guests</option><option>12 guests</option>
                  </select>
                </div>
                <div className="q-field"><label htmlFor="qs-unit">Unit</label>
                  <select id="qs-unit" value={qsUnit} onChange={(e) => setQsUnit(e.target.value)}>
                    <option>Any unit</option><option>Main Unit</option><option>Unit A</option><option>Unit B</option>
                  </select>
                </div>
              </div>
              <div className="qs-price">
                <div>
                  <span className="from">From</span>
                  <span className="amt">{monthly ? '₱118,125' : '₱5,250'}</span>{' '}
                  <span className="per">{monthly ? '/ month' : '/ night'}</span>
                </div>
                <div className="qs-note">{monthly ? 'Minimum 30 nights · 25% below nightly' : 'Free parking · full kitchen included'}</div>
              </div>
              <button type="submit" className="btn btn-gold btn-block">Check availability <svg className="ic"><use href="#i-arrow-right" /></svg></button>
              <p className="qs-fine">No charge yet. We confirm your dates within a few hours.</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
