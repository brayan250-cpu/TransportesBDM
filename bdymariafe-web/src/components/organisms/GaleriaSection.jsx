import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { GALERIA } from '../../data/content'
import { WavyDivider } from '../atoms/WavyDivider'

const PLACEHOLDER_ITEMS = [
  { id: 1, label: 'Flota de Cisternas', desc: 'Unidades certificadas ADN para transporte seguro' },
  { id: 2, label: 'Zona de Carga Segura', desc: 'Infraestructura preparada con protocolos OSHA' },
  { id: 3, label: 'Sistema de Monitoreo', desc: 'GPS en tiempo real en cada unidad' },
  { id: 4, label: 'Equipo Operativo', desc: 'Conductores certificados y personal especializado' },
  { id: 5, label: 'Documentación en Regla', desc: 'Permisos y certificaciones vigentes y auditados' },
  { id: 6, label: 'Despacho 24/7', desc: 'Operaciones continuas sin interrupciones' },
]

function GalleryItem({ item, index }) {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.95)',
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s ease ${index * 0.07}s`,
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        aspectRatio: '4/3',
        background: 'linear-gradient(135deg, rgba(37,99,235,0.06), rgba(240,247,255,0.95))',
        border: '1px solid rgba(37,99,235,0.08)',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const overlay = e.currentTarget.querySelector('.gallery-overlay')
        if (overlay) overlay.style.opacity = '1'
      }}
      onMouseLeave={e => {
        const overlay = e.currentTarget.querySelector('.gallery-overlay')
        if (overlay) overlay.style.opacity = '0'
      }}
    >
      {/* Placeholder visual pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(circle at ${20 + index * 12}% ${30 + index * 8}%, rgba(37,99,235,0.15) 0%, transparent 50%),
          repeating-linear-gradient(
            ${45 + index * 15}deg,
            transparent,
            transparent 10px,
            rgba(168,184,200,0.03) 10px,
            rgba(168,184,200,0.03) 11px
          )
        `,
      }} aria-hidden="true" />

      {/* Camera icon placeholder */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 12,
      }}>
        <CameraIcon />
        <p style={{ color: '#A8B8C8', fontSize: '0.8rem', textAlign: 'center', padding: '0 16px', margin: 0 }}>
          Foto del cliente — próximamente
        </p>
      </div>

      {/* Hover overlay */}
      <div
        className="gallery-overlay"
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.6) 60%, transparent 100%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 20, opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <p style={{ color: '#0F172A', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 4px' }}>
          {item.label}
        </p>
        <p style={{ color: '#64748B', fontSize: '0.8rem', margin: 0 }}>
          {item.desc}
        </p>
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

export function GaleriaSection() {
  const [headRef, headVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section
      id="galeria"
      className="section-padding"
      style={{
        background: 'var(--color-bg-base)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="galeria-heading"
    >
      <div className="container">
        {/* Header */}
        <div
          ref={headRef}
          style={{
            textAlign: 'center', maxWidth: 620, margin: '0 auto 4rem',
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span className="section-label">{GALERIA.label}</span>
          <h2 id="galeria-heading" className="section-headline">
            {GALERIA.headline}
          </h2>
          <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: 1.75 }}>
            {GALERIA.intro}
          </p>
        </div>

        {/* Gallery grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {PLACEHOLDER_ITEMS.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Note */}
        <p style={{ textAlign: 'center', color: '#64748B', fontSize: '0.85rem', marginTop: 24 }}>
          {GALERIA.note}
        </p>
      </div>
      <WavyDivider position="bottom" fill="var(--color-bg-surface)" flipped />
    </section>
  )
}
