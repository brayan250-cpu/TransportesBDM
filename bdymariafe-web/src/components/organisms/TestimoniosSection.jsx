import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { TESTIMONIOS, TESTIMONIAL_LIST } from '../../data/content'

const STAR = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

function QuoteIcon() {
  return (
    <svg width={36} height={36} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="rgba(37,99,235,0.12)" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="rgba(37,99,235,0.12)" />
    </svg>
  )
}

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
}

export function TestimoniosSection() {
  const [headRef, headVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const total = TESTIMONIAL_LIST.length

  const go = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }, [current])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent(c => (c + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(c => (c - 1 + total) % total)
  }, [total])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [paused, next])

  const t = TESTIMONIAL_LIST[current]

  return (
    <section
      className="section-padding"
      style={{
        background: 'linear-gradient(180deg, #F8FAFF 0%, #EFF6FF 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="testimonios-heading"
    >
      {/* Subtle background circles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }} aria-hidden="true">
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-8%', left: '-4%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="container" style={{ position: 'relative' }}>
        {/* Header */}
        <div
          ref={headRef}
          style={{
            textAlign: 'center', maxWidth: 560, margin: '0 auto 3.5rem',
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span className="section-label">{TESTIMONIOS.label}</span>
          <h2 id="testimonios-heading" className="section-headline">{TESTIMONIOS.headline}</h2>
          <p style={{ color: '#334155', fontSize: '1rem', lineHeight: 1.75 }}>{TESTIMONIOS.intro}</p>
        </div>

        {/* Slider card */}
        <div
          style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div style={{ overflow: 'hidden', borderRadius: 20 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 20,
                    padding: 'clamp(28px, 5vw, 48px)',
                    boxShadow: '0 4px 32px rgba(37,99,235,0.1), 0 1px 4px rgba(0,0,0,0.04)',
                    border: '1px solid rgba(37,99,235,0.08)',
                    position: 'relative',
                  }}
                >
                  {/* Quote icon */}
                  <div style={{ marginBottom: 16 }}>
                    <QuoteIcon />
                  </div>

                  {/* Stars */}
                  <div style={{ display: 'flex', gap: 3, marginBottom: 20 }} aria-label={`${t.rating} de 5 estrellas`}>
                    {Array.from({ length: t.rating }, (_, i) => <span key={i}>{STAR}</span>)}
                  </div>

                  {/* Quote text */}
                  <blockquote style={{ margin: '0 0 28px', padding: 0 }}>
                    <p style={{
                      color: '#1E293B', fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                      lineHeight: 1.75, fontStyle: 'italic', fontWeight: 400,
                    }}>
                      "{t.quote}"
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem',
                      flexShrink: 0,
                    }}>
                      {t.initial}
                    </div>
                    <div>
                      <p style={{ color: '#0F172A', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 2px' }}>
                        {t.name}
                      </p>
                      <p style={{ color: '#64748B', fontSize: '0.82rem', margin: 0 }}>
                        {t.role}
                      </p>
                    </div>
                  </div>

                  {/* Blue accent border left */}
                  <div style={{
                    position: 'absolute', left: 0, top: '15%', bottom: '15%',
                    width: 3, borderRadius: '0 2px 2px 0',
                    background: 'linear-gradient(to bottom, #2563EB, #60A5FA)',
                  }} aria-hidden="true" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 28 }}>
            {/* Prev */}
            <NavBtn onClick={prev} dir="prev" />

            {/* Dots */}
            <div style={{ display: 'flex', gap: 8 }} role="tablist" aria-label="Testimonios">
              {TESTIMONIAL_LIST.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonio ${i + 1}`}
                  onClick={() => go(i)}
                  style={{
                    width: i === current ? 28 : 8, height: 8, borderRadius: 4,
                    background: i === current ? '#2563EB' : 'rgba(37,99,235,0.2)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'width 0.35s ease, background 0.3s ease',
                  }}
                />
              ))}
            </div>

            {/* Next */}
            <NavBtn onClick={next} dir="next" />
          </div>

          {/* Progress bar */}
          <div style={{
            height: 2, background: 'rgba(37,99,235,0.1)', borderRadius: 2,
            marginTop: 20, overflow: 'hidden',
          }}>
            <motion.div
              key={`progress-${current}`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: paused ? 0 : 5, ease: 'linear' }}
              style={{ height: '100%', background: '#2563EB', borderRadius: 2 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function NavBtn({ onClick, dir }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Anterior testimonio' : 'Siguiente testimonio'}
      style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '1px solid rgba(37,99,235,0.2)',
        background: '#FFFFFF',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
        transition: 'all 0.2s ease',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#EFF6FF'
        e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#FFFFFF'
        e.currentTarget.style.borderColor = 'rgba(37,99,235,0.2)'
      }}
    >
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        {dir === 'prev' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  )
}
