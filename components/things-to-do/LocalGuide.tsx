import Link from 'next/link'
import MockupSprite from '@/components/MockupSprite'
import type { LocalGuide } from '@/lib/guides'

export default function LocalGuideArticle({ guide }: { guide: LocalGuide }) {
  return (
    <div className="mk">
      <MockupSprite />

      {/* ============ GUIDE HERO ============ */}
      <header className="gd-hero dark">
        <div className="ghd-bg">
          <img src={guide.heroImage} alt={guide.heroAlt} />
        </div>
        <div className="ghd-scrim" />
        <div className="ghd-inner">
          <Link href="/things-to-do" className="gd-back"><svg className="ic"><use href="#i-chevron-left" /></svg> Back to Things to Do</Link>
          <p className="eyebrow" style={{ color: '#C49863' }}>{guide.eyebrow}</p>
          <h1 className="gd-title">{guide.title}</h1>
          <p className="gd-lead-hero">{guide.lead}</p>
          <div className="gd-meta">
            <span><svg className="ic"><use href="#i-pin" /></svg>{guide.distance}</span>
            <span><svg className="ic"><use href="#i-clock" /></svg>{guide.travelTime}</span>
            <span><svg className="ic"><use href="#i-sparkle" /></svg>{guide.category}</span>
          </div>
        </div>
      </header>

      {/* ============ QUICK FACTS ============ */}
      <section className="sec gd-facts-sec">
        <div className="wrap">
          <div className="gd-facts">
            {guide.facts.map((f) => (
              <div className="gd-fact" key={f.label}>
                <span className="gf-ic"><svg className="ic"><use href={`#${f.icon}`} /></svg></span>
                <div>
                  <div className="gf-lbl">{f.label}</div>
                  <p className="gf-val">{f.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STORY BODY ============ */}
      <section className="sec gd-body-sec">
        <div className="wrap">
          <article className="gd-body">
            {guide.sections.map((s) => (
              <div className="gd-section" key={s.heading}>
                <h2 className="display">{s.heading}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}

            <aside className="gd-note">
              <h3 className="display"><svg className="ic"><use href="#i-heart" /></svg> {guide.note.heading}</h3>
              {guide.note.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </aside>

            <div className="gd-cta">
              <a className="btn btn-gold" href={guide.mapUrl} target="_blank" rel="noopener noreferrer">Get directions <svg className="ic"><use href="#i-arrow-right" /></svg></a>
              <Link className="btn btn-ghost" href="/things-to-do">Back to Things to Do <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
