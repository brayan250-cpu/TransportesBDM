import { useState } from 'react'
import { useNavbarScroll } from '../../hooks/useNavbarScroll'
import { NAV_LINKS, CONTACT } from '../../data/content'

export function Navbar() {
  const scrolled = useNavbarScroll(80)
  const [mobileOpen, setMobileOpen] = useState(false)

  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.whatsappMessage}`

  const navStyle = scrolled
    ? { background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 2px 20px rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(37,99,235,0.08)' }
    : { background: 'transparent' }

  return (
    <>
      <header
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)', ...navStyle }}
        role="banner"
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          {/* Logo */}
          <a href="#hero" aria-label="Transportes BDM — Inicio" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img
              src="/logo-bdm.png"
              alt="Transportes BDM"
              style={{
                height: 'clamp(48px, 7vw, 68px)',
                width: 'auto',
                objectFit: 'contain',
                transition: 'height 0.3s ease',
                flexShrink: 0,
              }}
            />
          </a>

          {/* Desktop nav */}
          <nav aria-label="Navegación principal" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: scrolled ? '#334155' : '#CBD5E1', fontSize: '0.9rem', fontWeight: 500,
                  transition: 'color 0.2s ease', textDecoration: 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.color = scrolled ? '#2563EB' : '#FFFFFF'}
                onMouseLeave={e => e.currentTarget.style.color = scrolled ? '#334155' : '#CBD5E1'}
              >
                {link.label}
              </a>
            ))}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '10px 20px', fontSize: '0.875rem' }}
              aria-label="Contactar por WhatsApp"
              title="Escríbenos ahora — respuesta inmediata"
            >
              <WhatsAppIcon size={18} /> WhatsApp
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú de navegación"
            style={{ color: scrolled ? '#0F172A' : '#F0F4F8', padding: 8, transition: 'color 0.3s ease' }}
          >
            <HamburgerIcon />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '2.5rem',
            animation: 'fadeIn 0.25s ease both',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
            style={{ position: 'absolute', top: 24, right: 24, color: '#0F172A', padding: 8 }}
          >
            <CloseIcon />
          </button>

          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ color: '#0F172A', fontSize: '2rem', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}
            >
              {link.label}
            </a>
          ))}

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ fontSize: '1.1rem', padding: '16px 36px' }}
            onClick={() => setMobileOpen(false)}
          >
            <WhatsAppIcon size={22} /> Contáctanos por WhatsApp
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 768px) { .show-mobile { display: none !important; } }
        .show-mobile { display: flex; background: none; border: none; cursor: pointer; }
      `}</style>
    </>
  )
}

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
