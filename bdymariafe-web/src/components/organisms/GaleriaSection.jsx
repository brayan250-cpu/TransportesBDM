import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { GALERIA } from '../../data/content'
import { WavyDivider } from '../atoms/WavyDivider'

const TOTAL = 6
const PLACEHOLDER_ITEMS = [
  { id: 1, label: 'Flota de Cisternas', desc: 'Unidades AISI 304/316L certificadas para transporte de leche fresca' },
  { id: 2, label: 'Zona de Carga', desc: 'Infraestructura preparada con protocolos de higiene y seguridad' },
  { id: 3, label: 'Monitoreo GPS', desc: 'Seguimiento en tiempo real durante todo el trayecto' },
  { id: 4, label: 'Equipo Operativo', desc: 'Conductores certificados y personal especializado en frío' },
  { id: 5, label: 'Documentación', desc: 'Registros DIGESA / MINAGRI listos para cualquier auditoría' },
  { id: 6, label: 'Despacho 24/7', desc: 'Operaciones continuas adaptadas a las ventanas de recepción' },
]

function GalleryItem({ item, index }) {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.1 })
  const COLORS = ['#2563EB', '#0891B2', '#7C3AED', '#059669', '#D97706', '#DC2626']
  const color = COLORS[index % COLORS.length]

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.96)',
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`,
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: 14,
          overflow: 'hidden',
          aspectRatio: '4/3',
          background: `linear-gradient(145deg, ${color}10 0%, rgba(240,247,255,0.9) 100%)`,
          border: `1px solid ${color}20`,
          cursor: 'default',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = `0 12px 32px ${color}25`
          e.currentTarget.style.borderColor = `${color}40`
          const overlay = e.currentTarget.querySelector('.g-overlay')
          if (overlay) overlay.style.opacity = '1'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = `${color}20`
          const overlay = e.currentTarget.querySelector('.g-overlay')
          if (overlay) overlay.style.opacity = '0'
        }}
      >
        {/* Decorative pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at ${25 + index * 13}% ${35 + index * 9}%, ${color}20 0%, transparent 55%)`,
          pointerEvents: 'none',
        }} aria-hidden="true" />

        {/* Accent bar top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${color}, ${color}60)`,
        }} aria-hidden="true" />

        {/* Center content */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 12, padding: 16,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: `${color}12`,
            border: `1px dashed ${color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CameraIcon />
          </div>
          <p style={{ color: '#475569', fontSize: '0.78rem', textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
            Foto del cliente<br />próximamente
          </p>
        </div>

        {/* Hover overlay */}
        <div
          className="g-overlay"
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.5) 55%, transparent 100%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '20px 18px', opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <p style={{ color: '#0F172A', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 4px' }}>{item.label}</p>
          <p style={{ color: '#64748B', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
        </div>
      </div>
    </div>
  )
}

function CameraIcon() {
  return (
    <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

function ArrowBtn({ dir, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Anterior' : 'Siguiente'}
      style={{
        width: 44, height: 44, borderRadius: '50%',
        border: '1px solid rgba(37,99,235,0.2)',
        background: '#FFFFFF',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(37,99,235,0.1)',
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
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        {dir === 'prev' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  )
}

export function GaleriaSection() {
  const [headRef, headVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [current, setCurrent] = useState(0)
  const [perPage, setPerPage] = useState(3)
  const [paused, setPaused] = useState(false)
  const dragStartX = useRef(null)

  const pages = Math.ceil(TOTAL / perPage)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setPerPage(w < 600 ? 1 : w < 900 ? 2 : 3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    setCurrent(c => Math.min(c, Math.ceil(TOTAL / perPage) - 1))
  }, [perPage])

  const next = useCallback(() => setCurrent(c => (c + 1) % Math.ceil(TOTAL / perPage)), [perPage])
  const prev = useCallback(() => setCurrent(c => (c - 1 + Math.ceil(TOTAL / perPage)) % Math.ceil(TOTAL / perPage)), [perPage])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 4200)
    return () => clearInterval(id)
  }, [paused, next])

  const onPointerDown = (e) => { dragStartX.current = e.clientX }
  const onPointerUp = (e) => {
    if (dragStartX.current === null) return
    const diff = dragStartX.current - e.clientX
    if (Math.abs(diff) > 48) diff > 0 ? next() : prev()
    dragStartX.current = null
  }
  const onTouchStart = (e) => { dragStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (dragStartX.current === null) return
    const diff = dragStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 48) diff > 0 ? next() : prev()
    dragStartX.current = null
    setTimeout(() => setPaused(false), 200)
  }

  // Each item = containerWidth/perPage. Track = containerWidth * TOTAL/perPage.
  // Page translate = -(current * containerWidth) as % of track = -(current * perPage/TOTAL * 100)%
  const translateX = -(current * perPage / TOTAL) * 100

  return (
    <section
      id="galeria"
      className="section-padding"
      style={{ background: 'var(--color-bg-base)', position: 'relative', overflow: 'hidden' }}
      aria-labelledby="galeria-heading"
    >
      <div className="container">
        {/* Header */}
        <div
          ref={headRef}
          style={{
            textAlign: 'center', maxWidth: 620, margin: '0 auto 3rem',
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span className="section-label">{GALERIA.label}</span>
          <h2 id="galeria-heading" className="section-headline">{GALERIA.headline}</h2>
          <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: 1.75 }}>{GALERIA.intro}</p>
        </div>

        {/* Carousel */}
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Clip wrapper */}
          <div
            style={{ overflow: 'hidden', borderRadius: 16, cursor: 'grab' }}
            onMouseDown={onPointerDown}
            onMouseUp={onPointerUp}
            onTouchStart={(e) => { setPaused(true); onTouchStart(e) }}
            onTouchEnd={onTouchEnd}
          >
            {/* Animated track */}
            <motion.div
              animate={{ x: `${translateX}%` }}
              transition={{ type: 'spring', stiffness: 280, damping: 32 }}
              style={{
                display: 'flex',
                width: `${(TOTAL / perPage) * 100}%`,
                userSelect: 'none',
              }}
            >
              {PLACEHOLDER_ITEMS.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    flex: `0 0 calc(100% / ${TOTAL})`,
                    padding: '0 8px',
                    boxSizing: 'border-box',
                  }}
                >
                  <GalleryCard item={item} index={index} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 28 }}>
            <ArrowBtn dir="prev" onClick={prev} />
            <div style={{ display: 'flex', gap: 8 }} role="tablist" aria-label="Páginas de la galería">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Página ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 28 : 8, height: 8, borderRadius: 4,
                    background: i === current ? '#2563EB' : 'rgba(37,99,235,0.18)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'width 0.35s ease, background 0.3s ease',
                  }}
                />
              ))}
            </div>
            <ArrowBtn dir="next" onClick={next} />
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: '0.8rem', marginTop: 20, fontStyle: 'italic' }}>
          {GALERIA.note}
        </p>
      </div>
      <WavyDivider position="bottom" fill="var(--color-bg-surface)" flipped />
    </section>
  )
}

function GalleryCard({ item, index }) {
  return <GalleryItem item={item} index={index} />
}
