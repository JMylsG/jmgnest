'use client'

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import MockupSprite from '@/components/MockupSprite'
import { GalleryImage } from '@/lib/types'

const UNIT_LABELS: Record<string, string> = {
  'main-unit': 'Main Unit',
  'unit-a': 'Unit A',
  'unit-b': 'Unit B',
  shared: 'Shared Spaces',
}
const CAT_LABELS: Record<string, string> = {
  'living-room': 'Living Room',
  bedroom: 'Bedroom',
  kitchen: 'Kitchen',
  bathroom: 'Bathroom',
  balcony: 'Balcony',
}

const UNIT_CHIPS = [
  { val: 'all', label: 'All units' },
  { val: 'main-unit', label: 'Main Unit' },
  { val: 'unit-a', label: 'Unit A' },
  { val: 'unit-b', label: 'Unit B' },
]
const CAT_CHIPS = [
  { val: 'all', label: 'All rooms' },
  { val: 'living-room', label: 'Living' },
  { val: 'bedroom', label: 'Bedroom' },
  { val: 'kitchen', label: 'Kitchen' },
  { val: 'bathroom', label: 'Bathroom' },
  { val: 'balcony', label: 'Balcony' },
]

function sizeFor(i: number) {
  const p = i % 8
  if (p === 0) return ' big'
  if (p === 3) return ' wide'
  if (p === 5) return ' tall'
  return ''
}

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [unit, setUnit] = useState('all')
  const [cat, setCat] = useState('all')
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)

  const totalUnits = useMemo(
    () => new Set(images.map((i) => i.unit).filter(Boolean)).size,
    [images]
  )

  const current = useMemo(
    () =>
      images.filter(
        (img) =>
          (unit === 'all' || img.unit === unit) &&
          (cat === 'all' || img.category === cat)
      ),
    [images, unit, cat]
  )

  // Staged fade-in whenever the filtered set changes
  useEffect(() => {
    const tiles = gridRef.current?.querySelectorAll('.gtile') ?? []
    const timers: number[] = []
    const raf = requestAnimationFrame(() => {
      tiles.forEach((t, i) =>
        timers.push(window.setTimeout(() => t.classList.add('shown'), Math.min(i * 45, 420)))
      )
    })
    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
    }
  }, [current])

  const showAt = useCallback(
    (i: number) => {
      if (current.length === 0) return
      setLbIndex((i + current.length) % current.length)
    },
    [current.length]
  )

  const openLightbox = (i: number) => {
    setLbIndex(i)
    setLbOpen(true)
  }
  const closeLightbox = useCallback(() => setLbOpen(false), [])

  // Body scroll lock + keyboard navigation while lightbox is open
  useEffect(() => {
    if (!lbOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowLeft') showAt(lbIndex - 1)
      else if (e.key === 'ArrowRight') showAt(lbIndex + 1)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [lbOpen, lbIndex, showAt, closeLightbox])

  const lbImg = current[lbIndex]

  return (
    <div className="mk">
      <MockupSprite />

      {/* ============ COMPACT GALLERY HERO ============ */}
      <header className="g-hero dark">
        <div className="gh-bg">
          <img src="https://res.cloudinary.com/jmg-nest/image/upload/f_auto,q_auto,w_1600/main-patio-1.jpg" alt="Private porch and mountain views at JMG Nest" />
        </div>
        <div className="gh-scrim" />
        <div className="gh-inner">
          <p className="eyebrow" style={{ color: '#C49863' }}>Gallery</p>
          <h1 className="gh-title">Every corner of the nest</h1>
          <p className="gh-lead">A closer look at all three homes, room by room, from mountain-view porches to bright bedrooms. Browse by unit or by space, then tap any photo to enlarge.</p>
          <div className="gh-stats">
            <span className="gh-stat"><svg className="ic"><use href="#i-images" /></svg><strong>{images.length}</strong> photographs</span>
            <span className="sep" />
            <span className="gh-stat"><svg className="ic"><use href="#i-house" /></svg><strong>{totalUnits}</strong> units</span>
            <span className="sep" />
            <span className="gh-stat"><svg className="ic"><use href="#i-mountain" /></svg>La Trinidad Valley</span>
          </div>
        </div>
      </header>

      {/* ============ FILTER BAR ============ */}
      <section className="filter-bar" id="browse" aria-label="Filter the gallery">
        <div className="wrap filter-inner">
          <div className="filter-group">
            <span className="filter-lbl">Unit</span>
            <div className="chip-row" role="group" aria-label="Filter by unit">
              {UNIT_CHIPS.map((c) => (
                <button key={c.val} type="button" className={`fchip${unit === c.val ? ' active' : ''}`} onClick={() => setUnit(c.val)}>{c.label}</button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <span className="filter-lbl">Room</span>
            <div className="chip-row" role="group" aria-label="Filter by room type">
              {CAT_CHIPS.map((c) => (
                <button key={c.val} type="button" className={`fchip${cat === c.val ? ' active' : ''}`} onClick={() => setCat(c.val)}>{c.label}</button>
              ))}
            </div>
          </div>
          <p className="filter-count"><b>{current.length}</b> {current.length === 1 ? 'photo' : 'photos'}</p>
        </div>
      </section>

      {/* ============ GALLERY GRID ============ */}
      <section className="gallery-sec">
        <div className="wrap">
          <div className="gallery-grid" ref={gridRef}>
            {current.length === 0 ? (
              <p className="g-empty">No photos match that combination yet. Try a different room or unit.</p>
            ) : (
              current.map((img, i) => (
                <button
                  key={img.id}
                  type="button"
                  className={`gtile${sizeFor(i)}`}
                  aria-label={`Enlarge: ${img.caption}`}
                  onClick={() => openLightbox(i)}
                >
                  <img src={img.thumbnail} alt={img.alt} loading="lazy" />
                  <span className="g-zoom"><svg className="ic"><use href="#i-expand" /></svg></span>
                  <span className="g-meta">
                    <span className="g-unit">{UNIT_LABELS[img.unit || 'shared']} · {CAT_LABELS[img.category] || img.category}</span>
                    <span className="g-cap">{img.caption}</span>
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ============ LIGHTBOX ============ */}
      <div
        className={`lightbox${lbOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
        onClick={(e) => {
          const t = e.target as HTMLElement
          if (t.classList.contains('lightbox') || t.classList.contains('lb-stage') || t.classList.contains('lb-figure')) closeLightbox()
        }}
      >
        <button className="lb-close" onClick={closeLightbox} aria-label="Close viewer"><svg className="ic"><use href="#i-close" /></svg></button>
        <div className="lb-stage">
          <div className="lb-figure">
            <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); showAt(lbIndex - 1) }} aria-label="Previous photo"><svg className="ic"><use href="#i-chevron-left" /></svg></button>
            {lbImg && <img className="lb-img" src={lbImg.url} alt={lbImg.alt} />}
            <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); showAt(lbIndex + 1) }} aria-label="Next photo"><svg className="ic"><use href="#i-chevron-right" /></svg></button>
          </div>
          {lbImg && (
            <div className="lb-cap">
              <div className="lb-unit"><svg className="ic ic-fill"><use href="#i-sparkle" /></svg> {UNIT_LABELS[lbImg.unit || 'shared']} · {CAT_LABELS[lbImg.category] || lbImg.category}</div>
              <div className="lb-text">{lbImg.caption}</div>
              <div className="lb-count">{lbIndex + 1} / {current.length}</div>
            </div>
          )}
        </div>
      </div>

      {/* ============ CLOSING CTA ============ */}
      <section className="g-cta dark">
        <div className="wrap">
          <p className="eyebrow" style={{ color: 'var(--gold)' }}>Ready when you are</p>
          <h2 className="display h2">Found the one? Come stay in it</h2>
          <p className="lead">Pictures only go so far. Pick the space that fits your group and settle in above the La Trinidad valley, fifteen minutes from Baguio City.</p>
          <div className="g-cta-actions">
            <Link href="/booking#book" className="btn btn-gold">Check availability <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
            <Link href="/booking" className="btn btn-ghost">View all units <svg className="ic"><use href="#i-arrow-right" /></svg></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
