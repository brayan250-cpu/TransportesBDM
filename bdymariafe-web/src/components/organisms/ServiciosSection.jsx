import { useRef, lazy, Suspense } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useTier } from '../../context/DeviceTierContext'
import { SERVICIOS, SERVICES, CONTACT } from '../../data/content'
import { WavyDivider } from '../atoms/WavyDivider'

const FloatingGeometryScene = lazy(() => import('../three/scenes/FloatingGeometryScene'))

function ServiceCard({ service, index }) {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.1 })
  const cardRef = useRef()

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10
    card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`
    card.style.boxShadow = '0 20px 60px rgba(37,99,235,0.18)'
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = ''
      cardRef.current.style.boxShadow = ''
    }
  }

  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=Hola, me interesa el servicio de ${encodeURIComponent(service.title)}`

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.65s ease ${index * 0.12}s, transform 0.65s ease ${index * 0.12}s`,
      }}
    >
      <div
        ref={cardRef}
        className="card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          height: '100%',
          display: 'flex', flexDirection: 'column',
          transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
        }}
      >
        {/* Icon + category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{
            width: 58, height: 58, borderRadius: 14,
            background: `linear-gradient(135deg, ${service.color}20, ${service.color}08)`,
            border: `1px solid ${service.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.7rem', flexShrink: 0,
          }}>
            {service.icon}
          </div>
          <span style={{
            fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: service.color,
          }}>
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ color: '#0F172A', fontWeight: 700, fontSize: '1.15rem', marginBottom: 12, lineHeight: 1.3 }}>
          {service.title}
        </h3>

        {/* Description */}
        <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 20 }}>
          {service.description}
        </p>

        {/* Features */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {service.features.map((feat) => (
            <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.875rem', color: '#475569' }}>
              <CheckIcon color={service.color} />
              {feat}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: 'auto',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: service.color, fontWeight: 600, fontSize: '0.9rem',
            textDecoration: 'none',
            transition: 'gap 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.gap = '12px'}
          onMouseLeave={e => e.currentTarget.style.gap = '8px'}
          aria-label={`Solicitar información sobre ${service.title}`}
        >
          Solicitar información <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  )
}

function CheckIcon({ color }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx={8} cy={8} r={8} fill={`${color}20`} />
      <path d="M5 8l2 2 4-4" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ServiciosSection() {
  const [headRef, headVisible] = useIntersectionObserver({ threshold: 0.1 })
  const tier = useTier()

  return (
    <section
      id="servicios"
      className="section-padding"
      style={{
        background: 'var(--color-bg-base)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="servicios-heading"
    >
      {/* 3D Floating Geometry Background */}
      {tier !== 'LOW' && (
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }} aria-hidden="true">
          <Suspense fallback={null}>
            <FloatingGeometryScene />
          </Suspense>
        </div>
      )}

      {/* Background decorations */}
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <div
          ref={headRef}
          style={{
            textAlign: 'center', maxWidth: 680, margin: '0 auto 4rem',
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span className="section-label">{SERVICIOS.label}</span>
          <h2 id="servicios-heading" className="section-headline">
            {SERVICIOS.headline}
          </h2>
          <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: 1.75 }}>
            {SERVICIOS.intro}
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
      <WavyDivider position="bottom" fill="rgba(11,30,45,0.92)" flipped />
    </section>
  )
}
