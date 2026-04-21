import { useRef } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { PROPUESTA, DIFFERENTIATORS, CONTACT } from '../../data/content'
import { WavyDivider } from '../atoms/WavyDivider'

function DifferentiatorCard({ item, index }) {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.1 })
  const cardRef = useRef()

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12
    card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div
        ref={cardRef}
        className="card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ height: '100%', transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease' }}
      >
        {/* Icon */}
        <div style={{
          width: 52, height: 52, borderRadius: 12,
          background: 'rgba(37,99,235,0.12)',
          border: '1px solid rgba(37,99,235,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', marginBottom: 16,
          flexShrink: 0,
        }}>
          {item.icon}
        </div>
        <h3 style={{ color: '#0F172A', fontWeight: 700, fontSize: '1.05rem', marginBottom: 10, lineHeight: 1.3 }}>
          {item.title}
        </h3>
        <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
          {item.description}
        </p>
      </div>
    </div>
  )
}

export function PropuestaSection() {
  const [headRef, headVisible] = useIntersectionObserver({ threshold: 0.1 })
  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.whatsappMessage}`

  return (
    <section
      id="propuesta"
      className="section-padding"
      style={{
        background: 'var(--color-bg-elevated)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="propuesta-heading"
    >
      {/* Background decorative element */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* Animated milk drop decorations — representing fresh milk quality */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }} aria-hidden="true">
        {[
          { top: '12%', left: '8%',   size: 90,  delay: 0 },
          { top: '55%', left: '85%',  size: 70,  delay: 1.8 },
          { top: '78%', left: '12%',  size: 50,  delay: 3.2 },
          { top: '25%', left: '90%',  size: 40,  delay: 2.5 },
        ].map((d, i) => (
          <div key={i} style={{
            position: 'absolute', top: d.top, left: d.left,
            width: d.size, height: d.size * 1.3,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            background: 'radial-gradient(ellipse at 40% 35%, rgba(255,255,255,0.95) 0%, rgba(186,230,253,0.15) 60%, transparent 80%)',
            border: '1px solid rgba(186,230,253,0.12)',
            animation: `milkDrop 5s ease-in-out ${d.delay}s infinite`,
          }} />
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
          <span className="section-label">{PROPUESTA.label}</span>
          <h2 id="propuesta-heading" className="section-headline">
            {PROPUESTA.headline}
          </h2>
          <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: 1.75 }}>
            {PROPUESTA.intro}
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          marginBottom: 48,
        }}>
          {DIFFERENTIATORS.map((item, i) => (
            <DifferentiatorCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <WAIcon /> {PROPUESTA.cta}
          </a>
        </div>
      </div>
      <WavyDivider position="bottom" fill="var(--color-bg-base)" />
    </section>
  )
}

function WAIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
