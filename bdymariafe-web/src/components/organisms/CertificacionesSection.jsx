import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { CERTIFICACIONES, CERTIFICATIONS } from '../../data/content'
import { WavyDivider } from '../atoms/WavyDivider'

function CertCard({ cert, index }) {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s`,
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(37,99,235,0.1)',
          borderRadius: 16,
          padding: '28px 24px',
          height: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14,
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          cursor: 'default',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(37,99,235,0.1)'
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)'
        }}
      >
        {/* Badge */}
        <span
          className="cert-badge"
          style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em' }}
        >
          {cert.code}
        </span>

        {/* Title */}
        <h3 style={{ color: '#0F172A', fontWeight: 700, fontSize: '1rem', lineHeight: 1.4, margin: 0 }}>
          {cert.title}
        </h3>

        {/* Authority */}
        <p style={{ color: '#64748B', fontSize: '0.85rem', margin: 0 }}>
          {cert.authority}
        </p>

        {/* Description */}
        <p style={{ color: '#334155', fontSize: '0.875rem', lineHeight: 1.7, margin: 0, flexGrow: 1 }}>
          {cert.description}
        </p>

        {/* Status badge */}
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: '0.75rem', fontWeight: 600,
          color: cert.status === 'Vigente' ? '#25D366' : '#A8B8C8',
          background: cert.status === 'Vigente' ? 'rgba(37,211,102,0.1)' : 'rgba(168,184,200,0.08)',
          border: `1px solid ${cert.status === 'Vigente' ? 'rgba(37,211,102,0.3)' : 'rgba(168,184,200,0.15)'}`,
          borderRadius: 20, padding: '4px 12px',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: cert.status === 'Vigente' ? '#25D366' : '#A8B8C8', flexShrink: 0 }} />
          {cert.status}
        </span>
      </div>
    </div>
  )
}

export function CertificacionesSection() {
  const [headRef, headVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section
      id="certificaciones"
      className="section-padding"
      style={{
        background: 'var(--color-bg-surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="cert-heading"
    >
      {/* Animated shield decorations — representing protection & compliance */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }} aria-hidden="true">
        {[
          { top: '8%',  left: '5%',  size: 80,  delay: 0,   opacity: 0.05 },
          { top: '60%', left: '88%', size: 60,  delay: 1.5, opacity: 0.04 },
          { top: '35%', left: '92%', size: 45,  delay: 3,   opacity: 0.06 },
          { top: '75%', left: '3%',  size: 55,  delay: 2,   opacity: 0.04 },
          { top: '15%', left: '78%', size: 35,  delay: 4,   opacity: 0.05 },
        ].map((s, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            style={{
              position: 'absolute',
              top: s.top, left: s.left,
              width: s.size, height: s.size,
              opacity: s.opacity,
              fill: '#2563EB',
              animation: `shieldFloat 6s ease-in-out ${s.delay}s infinite alternate`,
            }}
          >
            <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 14.5l-3.5-3.5 1.41-1.41L11 13.67l5.09-5.09L17.5 10 11 16.5z"/>
          </svg>
        ))}
      </div>
      <div className="container">
        {/* Header */}
        <div
          ref={headRef}
          style={{
            textAlign: 'center', maxWidth: 700, margin: '0 auto 4rem',
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span className="section-label">{CERTIFICACIONES.label}</span>
          <h2 id="cert-heading" className="section-headline">
            {CERTIFICACIONES.headline}
          </h2>
          <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: 1.75 }}>
            {CERTIFICACIONES.intro}
          </p>
        </div>

        {/* Certs grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
          marginBottom: 48,
        }}>
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>

        {/* Trust statement */}
        <div style={{
          textAlign: 'center',
          padding: '32px',
          background: 'rgba(37,99,235,0.04)',
          border: '1px solid rgba(37,99,235,0.1)',
          borderRadius: 20,
          maxWidth: 700,
          margin: '0 auto',
        }}>
          <ShieldIcon />
          <p style={{ color: '#0F172A', fontSize: '1.05rem', fontWeight: 600, margin: '16px 0 8px' }}>
            {CERTIFICACIONES.trust_headline}
          </p>
          <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
            {CERTIFICACIONES.trust_body}
          </p>
        </div>
      </div>
      <WavyDivider position="bottom" fill="var(--color-bg-base)" />
    </section>
  )
}

function ShieldIcon() {
  return (
    <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}
