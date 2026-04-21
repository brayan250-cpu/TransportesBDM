import { lazy, Suspense } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useTier } from '../../context/DeviceTierContext'
import { PROCESO, PROCESS_STEPS, CONTACT } from '../../data/content'
import { WavyDivider } from '../atoms/WavyDivider'

const WaveScene = lazy(() => import('../three/scenes/WaveScene'))

function ProcessStep({ step, index, total }) {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.15 })
  const isLast = index === total - 1

  return (
    <div
      ref={ref}
      style={{
        display: 'flex', gap: 24, alignItems: 'flex-start',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-24px)',
        transition: `opacity 0.65s ease ${index * 0.1}s, transform 0.65s ease ${index * 0.1}s`,
      }}
    >
      {/* Step indicator column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        {/* Circle */}
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
          border: '2px solid rgba(56,189,248,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(37,99,235,0.25)',
          zIndex: 1,
          flexShrink: 0,
        }}>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem' }}>{step.number}</span>
        </div>
        {/* Connector line */}
        {!isLast && (
          <div style={{
            width: 2,
            flexGrow: 1,
            minHeight: 40,
            background: 'linear-gradient(to bottom, rgba(37,99,235,0.4), rgba(37,99,235,0.05))',
            margin: '4px 0',
          }} aria-hidden="true" />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : 40, paddingTop: 4 }}>
        <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2563EB', marginBottom: 6 }}>
          Paso {step.number}
        </span>
        <h3 style={{ color: '#0F172A', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, lineHeight: 1.3 }}>
          {step.title}
        </h3>
        <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>
          {step.description}
        </p>
      </div>
    </div>
  )
}

export function ProcesoSection() {
  const tier = useTier()
  const [headRef, headVisible] = useIntersectionObserver({ threshold: 0.1 })
  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.whatsappMessage}`

  return (
    <section
      id="proceso"
      className="section-padding"
      style={{
        background: 'var(--color-bg-base)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="proceso-heading"
    >
      {/* 3D Wave — milk flow through the transport process */}
      {tier !== 'LOW' && (
        <div style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} aria-hidden="true">
          <Suspense fallback={null}>
            <WaveScene variant="celeste" />
          </Suspense>
        </div>
      )}

      {/* Decoration */}
      <div style={{
        position: 'absolute', top: '10%', right: '-5%',
        width: 350, height: 350, borderRadius: '50%',
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
          <span className="section-label">{PROCESO.label}</span>
          <h2 id="proceso-heading" className="section-headline">
            {PROCESO.headline}
          </h2>
          <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: 1.75 }}>
            {PROCESO.intro}
          </p>
        </div>

        {/* Two columns layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '0 80px',
          maxWidth: 900,
          margin: '0 auto',
        }}>
          {/* Left column: steps 1–3 */}
          <div>
            {PROCESS_STEPS.slice(0, 3).map((step, i) => (
              <ProcessStep key={`left-${step.number}`} step={step} index={i} total={3} />
            ))}
          </div>
          {/* Right column: steps 4–6 */}
          <div>
            {PROCESS_STEPS.slice(3, 6).map((step, i) => (
              <ProcessStep key={`right-${step.number}`} step={step} index={i} total={3} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ color: '#64748B', fontSize: '1rem', marginBottom: 20 }}>
            {PROCESO.cta_intro}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <WAIcon /> {PROCESO.cta}
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
