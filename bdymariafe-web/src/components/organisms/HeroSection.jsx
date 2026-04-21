import { lazy, Suspense } from 'react'
import { useTier } from '../../context/DeviceTierContext'
import { HERO, CONTACT } from '../../data/content'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { WavyDivider } from '../atoms/WavyDivider'

const HeroParticleScene = lazy(() => import('../three/scenes/HeroParticleScene'))

function HeroFallback() {
  return (
    <div
      className="hero-bg-fallback"
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '20%', right: '15%',
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'floatY 6s ease-in-out infinite',
      }} aria-hidden="true" />
      <div style={{
        position: 'absolute', bottom: '25%', right: '25%',
        width: 280, height: 280,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,211,102,0.08) 0%, transparent 70%)',
        filter: 'blur(32px)',
        animation: 'floatY 8s ease-in-out infinite reverse',
      }} aria-hidden="true" />

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(168,184,200,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,184,200,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} aria-hidden="true" />
    </div>
  )
}

function TrustBadge({ items }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
      {items.map((item) => (
        <span key={item} className="cert-badge" style={{ fontSize: '0.8rem' }}>
          {item}
        </span>
      ))}
    </div>
  )
}

export function HeroSection() {
  const tier = useTier()
  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.whatsappMessage}`
  const [ref, visible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 72,
      }}
      aria-label="Sección principal"
    >
      {/* Background */}
      {tier !== 'LOW' ? (
        <div style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
          <Suspense fallback={<HeroFallback />}>
            <HeroParticleScene tier={tier} />
          </Suspense>
        </div>
      ) : (
        <HeroFallback />
      )}

      {/* Dark overlay for text readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(11,30,45,0.92) 55%, rgba(11,30,45,0.3) 100%)',
      }} aria-hidden="true" />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, padding: 'clamp(3rem,8vw,5rem) clamp(1rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 620 }}>
          {/* Badge */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <span className="section-label">{HERO.badge}</span>
          </div>

          {/* H1 */}
          <h1
            className="gradient-text-hero"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              marginBottom: '1.5rem',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            {HERO.headline}
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#CBD5E1',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            {HERO.subheadline}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
              maxWidth: 400,
            }}
          >
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              aria-label="Contactar a BD & Mariafe por WhatsApp"
              style={{ justifyContent: 'center' }}
            >
              <WAIcon /> {HERO.ctaPrimary}
            </a>
            <a href="#servicios" className="btn-ghost" style={{ justifyContent: 'center' }}>
              {HERO.ctaSecondary} ↓
            </a>
          </div>

          {/* Microcopy */}
          <p
            style={{
              marginTop: 16,
              fontSize: '0.8rem',
              color: '#64748B',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.7s ease 0.4s',
            }}
          >
            {HERO.microcopy}
          </p>

          {/* Trust badges */}
          <div style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.5s',
          }}>
            <TrustBadge items={HERO.trustBadges} />
          </div>
        </div>
      </div>

      {/* Scroll indicator — subtle chevron only */}
      <a
        href="#servicios"
        style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 2,
          animation: 'scrollBounce 2.2s ease-in-out infinite',
          opacity: 0.5,
          transition: 'opacity 0.3s ease',
          textDecoration: 'none',
        }}
        aria-label="Ir a servicios"
        onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
      >
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#BAE6FD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="7 10 12 15 17 10" />
        </svg>
      </a>

      <WavyDivider position="bottom" fill="var(--color-bg-elevated)" />
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
