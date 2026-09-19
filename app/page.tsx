'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import MockupSprite from '@/components/MockupSprite'

export default function HomePage() {
  const router = useRouter()

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
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    document.querySelectorAll('.mk .reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const onBook = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/booking')
  }

  const CLOUD = 'https://res.cloudinary.com/jmg-nest/image/upload/'

  return (
    <div className="mk">
      <MockupSprite />

      {/* ============ SHOWCASE HERO ============ */}
      <header className="showcase dark" id="top">
        <div className="showcase-bg">
          <img src={`${CLOUD}v1763355326/Patio_ahxmie.jpg`} alt="JMG Nest patio with mountain views in La Trinidad Valley near Baguio City" />
        </div>
        <div className="showcase-scrim" />
        <div className="sc-inner">
          <div className="sc-top">
            <h1 className="sc-title"><span>JMG</span><span>Nest</span></h1>
          </div>
          <div className="sc-bottom">
            <div className="sc-tagline">
              <p className="lead sc-reveal" style={{ animationDelay: '1.2s' }}>A quiet mountain nest above La Trinidad, shaped for stillness that renews.</p>
              <div className="cols sc-reveal" style={{ animationDelay: '1.45s' }}>
                <p>Each stay is a quiet exchange of distance and warmth, arranged to bring you back to yourself. For those who value their own pace and keep it unhurried.</p>
                <span className="year">{'{ 2026 }'}</span>
              </div>
              <div className="sc-rating sc-reveal" style={{ animationDelay: '1.65s' }}>
                <span className="stars"><svg className="ic ic-fill"><use href="#i-star" /></svg><svg className="ic ic-fill"><use href="#i-star" /></svg><svg className="ic ic-fill"><use href="#i-star" /></svg><svg className="ic ic-fill"><use href="#i-star" /></svg><svg className="ic ic-fill"><use href="#i-star" /></svg></span>
                <span><strong>5.0</strong> from recent guests</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="hero-book">
          <form className="qs-card sc-reveal" style={{ animationDelay: '1.5s' }} onSubmit={onBook}>
            <div className="qs-title">Quick stay</div>
            <div className="qs-sub">Check availability in seconds</div>
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
                <select id="qs-unit" defaultValue="Any unit">
                  <option>Any unit</option><option>Main Unit</option><option>Unit A</option><option>Unit B</option>
                </select>
              </div>
            </div>
            <div className="qs-price">
              <div><span className="from">From</span><span className="amt">₱5,250</span> <span className="per">/ night</span></div>
              <div className="qs-note">Free parking · full kitchen included</div>
            </div>
            <button type="submit" className="btn btn-gold btn-block">Check availability <svg className="ic"><use href="#i-arrow-right" /></svg></button>
            <p className="qs-fine">No charge yet. We confirm your dates within a few hours.</p>
          </form>
        </aside>
      </header>

      {/* ============ QUOTE BAND ============ */}
      <section className="sec quote-band dark" id="loved">
        <div className="qb-bg"><img src={`${CLOUD}v1763355667/Balcony_View_wdbvpd.jpg`} alt="Valley view from JMG Nest balcony" /></div>
        <div className="qb-scrim" />
        <div className="wrap qb-inner reveal">
          <div className="qb-mark">&ldquo;</div>
          <blockquote className="qb-quote">A spacious home with a spectacular view off the back terrace. Private, but close enough to everything. We will stay here anytime we are in Baguio.</blockquote>
          <div className="qb-by">
            <span className="qb-stars"><svg className="ic ic-fill"><use href="#i-star" /></svg><svg className="ic ic-fill"><use href="#i-star" /></svg><svg className="ic ic-fill"><use href="#i-star" /></svg><svg className="ic ic-fill"><use href="#i-star" /></svg><svg className="ic ic-fill"><use href="#i-star" /></svg></span>
            <span className="qb-name">Guest from Port St. Lucie · via Airbnb</span>
          </div>
          <div className="qb-sources">
            <a href="https://www.airbnb.com/rooms/1318250624522250354" className="qb-src" target="_blank" rel="noopener noreferrer"><svg className="ic ic-fill"><use href="#i-airbnb" /></svg> 5.0 on Airbnb</a>
            <span className="qb-dot">·</span>
            <a href="https://share.google/cyfHPtWGkfgqE5qzk" className="qb-src" target="_blank" rel="noopener noreferrer"><svg className="ic ic-fill"><use href="#i-google" /></svg> 5.0 on Google</a>
          </div>
          <Link prefetch={false} href="/reviews" className="qb-readall">Read all reviews <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
        </div>
      </section>

      {/* ============ UNITS (library) ============ */}
      <section className="sec units" id="units">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Choose your space</p>
            <h2 className="display h2">Three homes, one quiet property</h2>
            <p className="lead">Hover to step inside each space. Whether it is the two of you or a whole family, one of them is the right fit.</p>
          </div>
          <div className="library reveal d1">
            <article className="lib-panel">
              <img className="lib-img" src={`${CLOUD}v1762619475/main-patio-1.jpg`} alt="JMG Nest Main Unit" />
              <span className="lib-num">01</span>
              <span className="lib-label">Main Unit</span>
              <div className="lib-content">
                <span className="u-badge"><svg className="ic ic-fill"><use href="#i-star" /></svg> Most Popular</span>
                <h3>Main Unit</h3>
                <span className="rate"><svg className="ic ic-fill"><use href="#i-star" /></svg> 5.0</span>
                <div className="u-caps">
                  <span><svg className="ic"><use href="#i-guests" /></svg> Up to 12</span>
                  <span><svg className="ic"><use href="#i-bed" /></svg> 4 Bedrooms</span>
                  <span><svg className="ic"><use href="#i-bath" /></svg> 2 Baths</span>
                </div>
                <div className="lib-price"><span className="from">From</span><span className="amt">₱12,500</span><span className="per">/ night</span></div>
                <Link prefetch={false} href="/booking/main-unit" className="btn btn-gold">Book this unit <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
              </div>
            </article>
            <article className="lib-panel">
              <img className="lib-img" src={`${CLOUD}SDB_9518_yv3b2v.jpg`} alt="JMG Nest Unit A living space" />
              <span className="lib-num">02</span>
              <span className="lib-label">Unit A</span>
              <div className="lib-content">
                <span className="u-badge">Most Affordable</span>
                <h3>Unit A</h3>
                <span className="rate"><svg className="ic ic-fill"><use href="#i-star" /></svg> 5.0</span>
                <div className="u-caps">
                  <span><svg className="ic"><use href="#i-guests" /></svg> Up to 8</span>
                  <span><svg className="ic"><use href="#i-bed" /></svg> 2 Bedrooms</span>
                  <span><svg className="ic"><use href="#i-bath" /></svg> 1 Bath</span>
                </div>
                <div className="lib-price"><span className="from">From</span><span className="amt">₱5,250</span><span className="per">/ night</span></div>
                <Link prefetch={false} href="/booking/unit-a" className="btn btn-gold">Book this unit <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
              </div>
            </article>
            <article className="lib-panel">
              <img className="lib-img" src={`${CLOUD}SDB_9575_dhw1e4.jpg`} alt="JMG Nest Unit B living space" />
              <span className="lib-num">03</span>
              <span className="lib-label">Unit B</span>
              <div className="lib-content">
                <h3>Unit B</h3>
                <span className="rate"><svg className="ic ic-fill"><use href="#i-star" /></svg> 5.0</span>
                <div className="u-caps">
                  <span><svg className="ic"><use href="#i-guests" /></svg> Up to 10</span>
                  <span><svg className="ic"><use href="#i-bed" /></svg> 3 Bedrooms</span>
                  <span><svg className="ic"><use href="#i-bath" /></svg> 2 Baths</span>
                </div>
                <div className="lib-price"><span className="from">From</span><span className="amt">₱6,250</span><span className="per">/ night</span></div>
                <Link prefetch={false} href="/booking/unit-b" className="btn btn-gold">Book this unit <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
              </div>
            </article>
            <article className="lib-panel">
              <img className="lib-img" src={`${CLOUD}v1763355667/Balcony_View_wdbvpd.jpg`} alt="JMG Nest grounds and balcony view" />
              <span className="lib-num">04</span>
              <span className="lib-label">The Property</span>
              <div className="lib-content">
                <h3>The Property</h3>
                <p className="lib-blurb">One quiet building above the valley, shared grounds, and a balcony that looks out over La Trinidad.</p>
                <a href="#about" className="btn btn-ghost">Explore the property <svg className="ic"><use href="#i-arrow-right" /></svg></a>
              </div>
            </article>
          </div>
          <div className="center-cta reveal"><Link prefetch={false} href="/booking" className="btn btn-ghost">Compare all units <svg className="ic"><use href="#i-arrow-right" /></svg></Link></div>
        </div>
      </section>

      {/* ============ AMENITIES ============ */}
      <section className="sec" id="amenities">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow">Everything, handled</p>
            <h2 className="display h2">Comfort that stays out of the way</h2>
            <p className="lead">Every unit comes fully equipped, so the only thing left to plan is how slow you want to go.</p>
          </div>
          <div className="amenity-grid">
            <div className="amenity reveal d1"><div className="ico"><svg className="ic"><use href="#i-wifi" /></svg></div><h4>High-Speed WiFi</h4><p>Stay connected throughout your stay.</p></div>
            <div className="amenity reveal d1"><div className="ico"><svg className="ic"><use href="#i-parking" /></svg></div><h4>Free Parking</h4><p>Large private parking on site.</p></div>
            <div className="amenity reveal d2"><div className="ico"><svg className="ic"><use href="#i-kitchen" /></svg></div><h4>Full Kitchen</h4><p>Cook your favorite meals at home.</p></div>
            <div className="amenity reveal d2"><div className="ico"><svg className="ic"><use href="#i-tv" /></svg></div><h4>Smart TV</h4><p>Netflix and streaming ready.</p></div>
            <div className="amenity reveal d3"><div className="ico"><svg className="ic"><use href="#i-coffee" /></svg></div><h4>Coffee &amp; Tea</h4><p>Complimentary coffee essentials.</p></div>
            <div className="amenity reveal d3"><div className="ico"><svg className="ic"><use href="#i-shower" /></svg></div><h4>Hot Shower</h4><p>Instant hot water, any hour.</p></div>
            <div className="amenity reveal d4"><span className="tag">Main Unit</span><div className="ico"><svg className="ic"><use href="#i-mountain" /></svg></div><h4>Mountain View Balcony</h4><p>Stunning valley scenery.</p></div>
            <div className="amenity reveal d4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', background: 'transparent', borderStyle: 'dashed' }}>
              <p style={{ color: 'var(--muted)', fontSize: '.85rem', marginBottom: '14px' }}>Some amenities are exclusive to specific units.</p>
              <Link prefetch={false} href="/booking" className="btn-text">See amenities by unit <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT (bento) ============ */}
      <section className="sec about" id="about">
        <div className="wrap">
          <div className="about-head reveal">
            <div className="intro-copy">
              <p className="eyebrow">Our story</p>
              <h2 className="display h2">Welcome to JMG Nest</h2>
              <p>Nestled in the heart of La Trinidad Valley, just 15 minutes from Baguio City, JMG Nest is three thoughtfully designed units that blend modern comfort with the natural charm of the mountains. From the moment you arrive, you feel the warm, family hospitality that makes the place ours.</p>
            </div>
            <Link prefetch={false} href="/about" className="btn btn-gold">Learn more about us <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
          </div>

          <div className="bento reveal d1">
            <article className="tile photo big">
              <img src="/images/jmgnest-property-sunset.png" alt="JMG Nest exterior and balconies at sunset" loading="lazy" width={1448} height={1086} />
              <div className="tile-label">The Property</div>
              <div className="photo-cap">One quiet building above the valley<small>La Trinidad, Benguet</small></div>
            </article>

            <article className="tile span2">
              <div className="tile-label">Guest Voice</div>
              <div className="g-rating">
                <span className="stars"><svg className="ic ic-fill"><use href="#i-star" /></svg><svg className="ic ic-fill"><use href="#i-star" /></svg><svg className="ic ic-fill"><use href="#i-star" /></svg><svg className="ic ic-fill"><use href="#i-star" /></svg><svg className="ic ic-fill"><use href="#i-star" /></svg></span>
                5.0 · 8 reviews
              </div>
              <p className="quote">&ldquo;Beautiful spacious home with a spectacular view in the back terrace. The hosts are the friendliest people, and check-in was a breeze.&rdquo;</p>
              <p className="quote-by">Guest from Port St. Lucie</p>
            </article>

            <article className="tile">
              <div className="tile-label">Daily Comforts</div>
              <div className="comfort-grid">
                <div className="ci"><svg className="ic"><use href="#i-wifi" /></svg></div>
                <div className="ci"><svg className="ic"><use href="#i-kitchen" /></svg></div>
                <div className="ci"><svg className="ic"><use href="#i-tv" /></svg></div>
                <div className="ci"><svg className="ic"><use href="#i-coffee" /></svg></div>
                <div className="ci"><svg className="ic"><use href="#i-parking" /></svg></div>
                <div className="ci"><svg className="ic"><use href="#i-shower" /></svg></div>
              </div>
            </article>

            <article className="tile photo">
              <img src={`${CLOUD}v1762640674/MainUnit_Patio2_e73vcr.jpg`} alt="Balcony view at sunset over La Trinidad Valley" />
              <div className="tile-label">The View</div>
            </article>

            <article className="tile span2">
              <div className="tile-label">At a Glance</div>
              <div className="facts">
                <div className="fact"><div className="f-ic"><svg className="ic"><use href="#i-house" /></svg></div><div><h5>Family-Owned</h5><p>Personal touch in every detail</p></div></div>
                <div className="fact"><div className="f-ic"><svg className="ic"><use href="#i-calendar" /></svg></div><div><h5>Since 2024</h5><p>Warm hospitality, from day one</p></div></div>
                <div className="fact"><div className="f-ic"><svg className="ic ic-fill"><use href="#i-sparkle" /></svg></div><div><h5>3 Unique Spaces</h5><p>Each with its own character</p></div></div>
                <div className="fact"><div className="f-ic"><svg className="ic"><use href="#i-pin" /></svg></div><div><h5>Prime Location</h5><p>Minutes from top attractions</p></div></div>
              </div>
            </article>

            <article className="tile reach span2">
              <div className="tile-label">Reach Us</div>
              <a href="mailto:info@jmgnest.com" className="r-arrow" aria-label="Email us"><svg className="ic"><use href="#i-arrow-right" /></svg></a>
              <div className="reach-body">
                <a href="mailto:info@jmgnest.com" className="r-email">info@jmgnest.com</a>
                <div className="r-line"><svg className="ic"><use href="#i-pin" /></svg> La Trinidad Valley, Benguet, Philippines</div>
                <div className="r-line"><svg className="ic"><use href="#i-chat" /></svg> Message us directly, any time</div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ HOW TO CHOOSE ============ */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow">Find your fit</p>
            <h2 className="display h2">Not sure which unit to choose?</h2>
            <p className="lead">A quick read on who each space is for.</p>
          </div>
          <div className="choose-grid">
            <div className="choose reveal d1">
              <div className="cico"><svg className="ic ic-fill"><use href="#i-sparkle" /></svg></div>
              <h3>The Star of the Property</h3>
              <p>The Main Unit is made for large families, with the best views of the La Trinidad valley and the most room to gather.</p>
              <Link prefetch={false} href="/booking/main-unit" className="btn-text">View Main Unit <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
            </div>
            <div className="choose reveal d2">
              <div className="cico"><svg className="ic"><use href="#i-house" /></svg></div>
              <h3>Spacious &amp; Versatile</h3>
              <p>Units A and B offer generous rooms for couples, small families, or anyone who wants comfort with a bit more flexibility.</p>
              <Link prefetch={false} href="/booking" className="btn-text">View Units A &amp; B <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
            </div>
            <div className="choose reveal d3">
              <div className="cico"><svg className="ic ic-fill"><use href="#i-celebrate" /></svg></div>
              <h3>For Special Events</h3>
              <p>Book the function hall to host your celebration in one beautiful property, with space for everyone.</p>
              <Link prefetch={false} href="/contact" className="btn-text">Contact us <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LOCATION ============ */}
      <section className="sec" id="location">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow">One prime location</p>
            <h2 className="display h2">Close to everything, far from the noise</h2>
            <p className="lead">Three units in one building in La Trinidad Valley, just 15 minutes from Baguio City.</p>
          </div>
          <div className="loc-split">
            <div className="loc-map reveal">
              <iframe title="Nearby Attractions Map" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=tourist%20attractions%20near%20La%20Trinidad%20Benguet&output=embed" />
              <div className="map-cta">
                <a href="https://www.google.com/maps/search/?api=1&query=tourist+attractions+near+La+Trinidad+Benguet" target="_blank" rel="noopener noreferrer" className="btn-text">Open in Google Maps <svg className="ic"><use href="#i-arrow-right" /></svg></a>
              </div>
            </div>
            <div className="attractions reveal d1">
              <h3 className="display h3">Everything you need nearby</h3>
              <div className="attraction"><div className="a-ic"><svg className="ic"><use href="#i-berry" /></svg></div><div><h4>Strawberry Farm</h4><p>Fresh strawberries and local farm produce</p></div><span className="a-time">10 min</span></div>
              <div className="attraction"><div className="a-ic"><svg className="ic"><use href="#i-tree" /></svg></div><div><h4>Burnham Park</h4><p>Boating, biking, and picnic grounds</p></div><span className="a-time">20 min</span></div>
              <div className="attraction"><div className="a-ic"><svg className="ic"><use href="#i-bag" /></svg></div><div><h4>SM Baguio</h4><p>Shopping, dining, cinema, and groceries</p></div><span className="a-time">25 min</span></div>
              <div className="attraction"><div className="a-ic"><svg className="ic"><use href="#i-mountain" /></svg></div><div><h4>Mines View Park</h4><p>Panoramic views of the mountain ranges</p></div><span className="a-time">35 min</span></div>
              <Link prefetch={false} href="/things-to-do" className="btn btn-ghost btn-block">Explore all local attractions <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section className="sec cta dark">
        <div className="cta-bg"><img src={`${CLOUD}v1762669722/Baguio_tfutl3.jpg`} alt="Mountains around La Trinidad and Baguio City" /></div>
        <div className="cta-scrim" />
        <div className="wrap">
          <p className="eyebrow reveal" style={{ justifyContent: 'center' }}>Your mountain nest awaits</p>
          <h2 className="display h2 reveal d1">Ready to choose your perfect space?</h2>
          <p className="lead reveal d2">Three spaces in one quiet property above La Trinidad, minutes from Baguio City. Choose yours, pick your dates, and settle in.</p>
          <div className="row reveal d3">
            <Link prefetch={false} href="/booking" className="btn btn-gold">View all units <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
            <Link prefetch={false} href="/booking" className="btn btn-ghost">Check availability</Link>
          </div>
        </div>
      </section>

      {/* ============ MOBILE BOOKING DOCK ============ */}
      <div className="book-dock dark">
        <div className="bd-price"><span className="from">From</span> <strong>₱5,250</strong> <span className="per">/ night</span></div>
        <Link prefetch={false} href="/booking" className="btn btn-gold">Check availability <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
      </div>
    </div>
  )
}
