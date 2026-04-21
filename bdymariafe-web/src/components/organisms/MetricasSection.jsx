import { lazy, Suspense } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useCountUp } from '../../hooks/useCountUp'
import { useTier } from '../../context/DeviceTierContext'
import { METRICAS, METRICS } from '../../data/content'
import { WavyDivider } from '../atoms/WavyDivider'

const ColdChainScene = lazy(() => import('../three/scenes/ColdChainScene'))

function StatBlock({ metric, index }) {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.2 })
  const count = useCountUp(metric.value, 2000, visible)

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center', padding: '32px 20px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${index * 0.12}s, transform 0.65s ease ${index * 0.12}s`,
      }}
    >
      {/* Decorative line */}
      <div className="metrics-line" style={{
        width: 40, height: 3,
        background: 'linear-gradient(to right, #38BDF8, #BAE6FD)',
        borderRadius: 2, margin: '0 auto 20px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
        transition: `opacity 0.5s ease ${index * 0.12 + 0.3}s, transform 0.5s ease ${index * 0.12 + 0.3}s`,
        transformOrigin: 'left',
      }} aria-hidden="true" />

      {/* Number */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 2 }}>
        {metric.prefix && (
          <span style={{ color: '#38BDF8', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, lineHeight: 1, marginTop: 6 }}>
            {metric.prefix}
          </span>
        )}
        <span
          className="gradient-text-hero"
          style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1 }}
          aria-label={`${metric.prefix ?? ''}${metric.value}${metric.suffix}`}
        >
          {count.toLocaleString('es-PE')}
        </span>
        {metric.suffix && (
          <span style={{ color: '#38BDF8', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, lineHeight: 1, marginTop: 6 }}>
            {metric.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <p style={{ color: '#F0F4F8', fontWeight: 600, fontSize: '1rem', marginBottom: 6, marginTop: 8 }}>
        {metric.label}
      </p>
      {metric.sublabel && (
        <p style={{ color: '#BAE6FD', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
          {metric.sublabel}
        </p>
      )}
    </div>
  )
}

export function MetricasSection() {
  const tier = useTier()
  const [headRef, headVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section
      id="metricas"
      className="section-padding"
      style={{
        background: 'linear-gradient(135deg, rgba(11,30,45,0.92) 0%, rgba(15,42,69,0.90) 30%, rgba(29,78,216,0.88) 70%, rgba(56,189,248,0.85) 100%)',
        position: 'relative', overflow: 'hidden',
      }}
      aria-labelledby="metricas-heading"
    >
      {/* 3D Cold Chain — ice crystals representing ≤6°C temperature control */}
      {tier !== 'LOW' && (
        <div style={{ position: 'absolute', inset: 0, opacity: 0.55, pointerEvents: 'none' }} aria-hidden="true">
          <Suspense fallback={null}>
            <ColdChainScene />
          </Suspense>
        </div>
      )}

      {/* Gradient overlay for depth */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(56,189,248,0.15) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* Noise texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.08) 0%, transparent 40%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
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
          <span className="section-label" style={{ color: '#BAE6FD' }}>{METRICAS.label}</span>
          <h2 id="metricas-heading" className="section-headline" style={{ color: '#F0F4F8' }}>
            {METRICAS.headline}
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.75 }}>
            {METRICAS.intro}
          </p>
        </div>

        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          gap: 0,
          borderRadius: 24,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          position: 'relative', zIndex: 1,
        }}>
          {METRICS.map((metric, i) => (
            <div key={metric.id} style={{
              borderRight: '1px solid rgba(255,255,255,0.08)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <StatBlock metric={metric} index={i} />
            </div>
          ))}
        </div>
      </div>
      <WavyDivider position="bottom" fill="var(--color-bg-elevated)" />
    </section>
  )
}
