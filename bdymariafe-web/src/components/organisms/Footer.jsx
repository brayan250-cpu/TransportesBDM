import { NAV_LINKS, FOOTER, CONTACT, SITE } from '../../data/content'

export function Footer() {
  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.whatsappMessage}`
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: '#0F172A',
        padding: 'clamp(3rem, 6vw, 5rem) 0 2rem',
        position: 'relative',
        boxShadow: 'inset 0 40px 90px rgba(56,189,248,0.06)',
      }}
      role="contentinfo"
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48,
          marginBottom: 56,
        }}>
          {/* Brand column */}
          <div style={{ gridColumn: '1', minWidth: 200 }}>
            {/* Logo */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 16,
              background: 'rgba(255,255,255,0.96)',
              padding: '10px 14px',
              borderRadius: 18,
              boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
            }}>
              <img
                src={`${import.meta.env.BASE_URL}logo-bdm.png`}
                alt="Transportes BDM"
                style={{
                  height: 'clamp(52px, 8vw, 76px)',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            <p style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 20 }}>
              {FOOTER.brand_description}
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 12 }}>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#25D366', transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,211,102,0.1)'}
              >
                <WAIcon size={18} />
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h3 style={{ color: '#F0F4F8', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
              Navegación
            </h3>
            <nav aria-label="Enlaces de pie de página">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {NAV_LINKS.map(link => (
                  <li key={link.href}>
                    <a href={link.href} style={{
                      color: '#A8B8C8', fontSize: '0.9rem', textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#F0F4F8'}
                    onMouseLeave={e => e.currentTarget.style.color = '#A8B8C8'}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Services column */}
          <div>
            <h3 style={{ color: '#F0F4F8', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
              Servicios
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FOOTER.services_links.map(s => (
                <li key={s}>
                  <a href="#servicios" style={{
                    color: '#A8B8C8', fontSize: '0.9rem', textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F0F4F8'}
                  onMouseLeave={e => e.currentTarget.style.color = '#A8B8C8'}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 style={{ color: '#F0F4F8', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
              Contacto
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>WhatsApp</p>
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  style={{ color: '#25D366', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
                  {CONTACT.phone}
                </a>
              </div>
              <div>
                <p style={{ color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Ubicación</p>
                <p style={{ color: '#A8B8C8', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
                  {CONTACT.address}
                </p>
              </div>
              <div>
                <p style={{ color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Horario</p>
                <p style={{ color: '#A8B8C8', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
                  {CONTACT.schedule}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(56,189,248,0.12)',
          paddingTop: 24,
          display: 'flex', flexWrap: 'wrap', gap: 16,
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ color: '#64748B', fontSize: '0.8rem', margin: 0 }}>
            © {year} {SITE.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

function WAIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
