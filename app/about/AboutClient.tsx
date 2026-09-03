'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import MockupSprite from '@/components/MockupSprite'

const CLOUD = 'https://res.cloudinary.com/jmg-nest/image/upload/'

const Stars = ({ n = 5 }: { n?: number }) => (
  <>
    {Array.from({ length: n }).map((_, i) => (
      <svg key={i} className="ic ic-fill"><use href="#i-star" /></svg>
    ))}
  </>
)

export default function AboutClient() {
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
      <header className="a-hero dark">
        <div className="ah-bg">
          <img src={`${CLOUD}f_auto,q_auto,w_1600/JMGNest_Sky_View_mx6iqi.png`} alt="JMG Nest above La Trinidad Valley at golden hour" />
        </div>
        <div className="ah-scrim" />
        <div className="ah-inner">
          <p className="eyebrow" style={{ color: '#C49863' }}>Our story</p>
          <h1 className="ah-title">A family&apos;s nest in the mountains</h1>
          <p className="ah-lead">JMG Nest began as a family&apos;s quiet corner above La Trinidad Valley, and grew into three homes we love to share. This is the story behind the stay.</p>
          <div className="ah-stats">
            <span className="ah-stat"><svg className="ic"><use href="#i-heart" /></svg>Family-owned</span>
            <span className="sep" />
            <span className="ah-stat"><svg className="ic"><use href="#i-calendar" /></svg>Since <strong>2024</strong></span>
            <span className="sep" />
            <span className="ah-stat"><svg className="ic"><use href="#i-mountain" /></svg>La Trinidad Valley</span>
          </div>
        </div>
      </header>

      {/* ============ OUR STORY ============ */}
      <section className="sec" id="story">
        <div className="wrap">
          <div className="story-split">
            <div className="story-media reveal">
              <div className="main"><img src={`${CLOUD}f_auto,q_auto,w_1200/SDB_9291_bobgxm.jpg`} alt="Living space at JMG Nest with mountain views" /></div>
              <div className="overlay"><img src={`${CLOUD}f_auto,q_auto,w_600/main-patio-1.jpg`} alt="Private porch at JMG Nest" /></div>
            </div>
            <div className="story-copy reveal d1">
              <p className="eyebrow">Welcome to JMG Nest</p>
              <h2 className="display h2">Built for stillness, shared with warmth</h2>
              <p>Nestled in the heart of La Trinidad Valley, just 15 minutes from Baguio City, JMG Nest is three thoughtfully designed units that blend modern comfort with the natural charm of the Cordillera mountains. What started as one family&apos;s quiet retreat became a place we wanted others to feel at home in.</p>
              <p>Each unit has its own character, but they share the same things: a balcony that looks out over the valley, cool mountain air, and the kind of calm that makes you slow down. From the moment you arrive, our team makes sure the small things are handled, so you can simply settle in.</p>
              <p>We are still a family at heart. You will feel it in the welcome, the local tips, and the quick reply whenever you need something.</p>
              <div className="story-sign">
                <div>
                  <div className="ss-name">The JMG Nest family</div>
                  <div className="ss-role">Your hosts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="sec values-sec">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow">What we care about</p>
            <h2 className="display h2">The little things, done well</h2>
            <p className="lead">A few quiet promises that shape every stay at the nest.</p>
          </div>
          <div className="values">
            <div className="value reveal d1">
              <span className="v-ic"><svg className="ic"><use href="#i-heart" /></svg></span>
              <h3>Family hospitality</h3>
              <p>Owned and run by one family, so the welcome is personal and the details are never an afterthought.</p>
            </div>
            <div className="value reveal d2">
              <span className="v-ic"><svg className="ic"><use href="#i-mountain" /></svg></span>
              <h3>Quiet and elevated</h3>
              <p>Set above the valley, away from the traffic, yet close enough to reach the city in fifteen minutes.</p>
            </div>
            <div className="value reveal d3">
              <span className="v-ic"><svg className="ic"><use href="#i-house" /></svg></span>
              <h3>Three homes, one place</h3>
              <p>Room for couples, families, and big groups, each unit with its own layout and its own character.</p>
            </div>
            <div className="value reveal d4">
              <span className="v-ic"><svg className="ic"><use href="#i-pin" /></svg></span>
              <h3>Local know-how</h3>
              <p>Honest recommendations for where to eat, hike, and wander, from people who actually live here.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MEET THE HOSTS ============ */}
      <section className="sec" id="hosts">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow">Meet the hosts</p>
            <h2 className="display h2">The people behind the nest</h2>
            <p className="lead">A small, warm team that guests mention again and again in their reviews.</p>
          </div>
          <div className="hosts">
            <div className="host reveal d1">
              <div className="mono">J</div>
              <h3>Jason</h3>
              <div className="h-role">Host &amp; bookings</div>
              <p>Quick to reply and happy to help you find the right unit and dates, right down to a good deal for the whole group.</p>
            </div>
            <div className="host reveal d2">
              <div className="mono">D</div>
              <h3>Divina</h3>
              <div className="h-role">Welcome &amp; local tips</div>
              <p>Often the first face you meet, making sure the unit is ready and sharing her favorite spots around the valley.</p>
            </div>
            <div className="host reveal d3">
              <div className="mono">E</div>
              <h3>Ellen</h3>
              <div className="h-role">Welcome &amp; guest care</div>
              <p>Looks after the little comforts through your stay, so everything feels warm, tidy, and taken care of.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS BAND ============ */}
      <section className="stats-band dark">
        <div className="wrap">
          <div className="stats-grid reveal">
            <div className="stat">
              <div className="num">3</div>
              <span className="lbl">Unique homes</span>
            </div>
            <div className="stat">
              <div className="num">30<span className="u">guests</span></div>
              <span className="lbl">Room in total</span>
            </div>
            <div className="stat">
              <div className="num rating">5.0</div>
              <span className="stars"><Stars /></span>
              <span className="lbl">Guest rating</span>
            </div>
            <div className="stat">
              <div className="num">15<span className="u">min</span></div>
              <span className="lbl">To Baguio City</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EVENTS NOTE ============ */}
      <section className="sec" id="events">
        <div className="wrap">
          <div className="events-split">
            <div className="events-media reveal">
              <img src={`${CLOUD}f_auto,q_auto,w_1200/v1762640674/MainUnit_Patio2_e73vcr.jpg`} alt="Balcony and grounds at JMG Nest set for a gathering" />
            </div>
            <div className="events-copy reveal d1">
              <p className="eyebrow">Celebrate with us</p>
              <h3 className="display h3">Room for the whole family</h3>
              <p>Planning a reunion, a birthday, or a small celebration? Book across the units, or ask about the function hall, and host everyone in one quiet property with space to gather and views to remember.</p>
              <Link href="/contact#enquire" className="btn btn-gold">Enquire about events <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLOSING CTA ============ */}
      <section className="a-cta dark">
        <div className="wrap">
          <p className="eyebrow" style={{ color: 'var(--gold)' }}>Come stay with us</p>
          <h2 className="display h2">Your nest is ready</h2>
          <p className="lead">Pick the space that fits your group and settle in above the La Trinidad valley, fifteen minutes from Baguio City. We will take care of the rest.</p>
          <div className="a-cta-actions">
            <Link href="/booking#book" className="btn btn-gold">Check availability <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
            <Link href="/booking" className="btn btn-ghost">View all units <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
