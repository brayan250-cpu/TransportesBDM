import { useState, lazy, Suspense } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useTier } from '../../context/DeviceTierContext'
import { CONTACTO, CONTACT } from '../../data/content'
import { WavyDivider } from '../atoms/WavyDivider'

const GlobeScene = lazy(() => import('../three/scenes/GlobeScene'))
const INITIAL_FORM = { nombre: '', empresa: '', telefono: '', mensaje: '' }
function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    // Build WhatsApp message with form data
    const lines = [
      `Hola, me comunico desde la web de Transportes BDM.`,
      ``,
      `*Nombre:* ${form.nombre}`,
      form.empresa ? `*Empresa:* ${form.empresa}` : '',
      `*Teléfono:* ${form.telefono}`,
      ``,
      `*Consulta:*`,
      form.mensaje,
    ].filter(Boolean).join('\n')

    const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines)}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')
    setStatus('success')
    setForm(INITIAL_FORM)
  }

  const inputStyle = {
    width: '100%', background: 'rgba(37,99,235,0.03)',
    border: '1px solid rgba(37,99,235,0.12)',
    borderRadius: 12, padding: '14px 16px',
    color: '#0F172A', fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
    fontFamily: 'inherit',
  }

  const labelStyle = { display: 'block', color: '#475569', fontSize: '0.875rem', fontWeight: 500, marginBottom: 8 }

  const handleFocus = (e) => { e.target.style.borderColor = 'rgba(37,99,235,0.5)' }
  const handleBlur  = (e) => { e.target.style.borderColor = 'rgba(37,99,235,0.12)' }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
        <h3 style={{ color: '#0F172A', fontWeight: 700, marginBottom: 12 }}>¡Mensaje enviado!</h3>
        <p style={{ color: '#64748B', lineHeight: 1.7 }}>
          Nos comunicaremos contigo pronto. También puedes escribirnos directamente por WhatsApp para una respuesta inmediata.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'grid', gap: 20 }}>
        <div>
          <label htmlFor="nombre" style={labelStyle}>Nombre completo *</label>
          <input id="nombre" name="nombre" type="text" required
            value={form.nombre} onChange={handleChange}
            onFocus={handleFocus} onBlur={handleBlur}
            placeholder="Tu nombre completo"
            style={inputStyle}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="empresa" style={labelStyle}>Empresa / Organización</label>
          <input id="empresa" name="empresa" type="text"
            value={form.empresa} onChange={handleChange}
            onFocus={handleFocus} onBlur={handleBlur}
            placeholder="Nombre de tu empresa"
            style={inputStyle}
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="telefono" style={labelStyle}>Teléfono / WhatsApp *</label>
          <input id="telefono" name="telefono" type="tel" required
            value={form.telefono} onChange={handleChange}
            onFocus={handleFocus} onBlur={handleBlur}
            placeholder="+51 999 999 999"
            style={inputStyle}
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="mensaje" style={labelStyle}>¿En qué podemos ayudarte? *</label>
          <textarea id="mensaje" name="mensaje" required rows={4}
            value={form.mensaje} onChange={handleChange}
            onFocus={handleFocus} onBlur={handleBlur}
            placeholder="Cuéntanos sobre tu carga, ruta y necesidades..."
            style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
          />
        </div>
      </div>

      {status === 'error' && (
        <p style={{ color: '#F87171', fontSize: '0.875rem', marginTop: 12 }}>
          Ocurrió un error. Por favor, contáctanos por WhatsApp directamente.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary"
        style={{ width: '100%', marginTop: 24, justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
      >
        {status === 'sending' ? 'Enviando…' : 'Enviar consulta'}
      </button>

      <p style={{ color: '#64748B', fontSize: '0.8rem', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
        Al enviar, aceptas que nos comuniquemos contigo para responder tu consulta.
      </p>
    </form>
  )
}

export function ContactoSection() {
  const tier = useTier()
  const [headRef, headVisible] = useIntersectionObserver({ threshold: 0.1 })
  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${CONTACT.whatsappMessage}`

  return (
    <section
      id="contacto"
      className="section-padding"
      style={{
        background: 'var(--color-bg-base)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="contacto-heading"
    >
      {/* 3D Globe — geographic coverage network (Cajamarca, Lima, Arequipa, Trujillo) */}
      {tier !== 'LOW' && (
        <div style={{ position: 'absolute', inset: 0, opacity: 0.28, pointerEvents: 'none' }} aria-hidden="true">
          <Suspense fallback={null}>
            <GlobeScene />
          </Suspense>
        </div>
      )}

      {/* Glow background */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

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
          <span className="section-label">{CONTACTO.label}</span>
          <h2 id="contacto-heading" className="section-headline">
            {CONTACTO.headline}
          </h2>
          <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: 1.75 }}>
            {CONTACTO.intro}
          </p>
        </div>

        {/* Split layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 40,
          alignItems: 'start',
        }}>
          {/* Left: WhatsApp + info */}
          <div>
            {/* WhatsApp primary */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center', fontSize: '1.05rem', padding: '18px 24px', boxSizing: 'border-box', display: 'flex' }}
              aria-label="Iniciar chat por WhatsApp con BD & Mariafe Transportes"
            >
              <WAIcon /> {CONTACTO.cta_whatsapp}
            </a>
            <p style={{ textAlign: 'center', color: '#64748B', fontSize: '0.8rem', marginTop: 10, marginBottom: 32 }}>
              {CONTACTO.whatsapp_microcopy}
            </p>

            {/* Contact info list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: <PhoneIcon />, label: 'WhatsApp', value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
                { icon: <MailIcon />,  label: 'Email',    value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                { icon: <MapIcon />,   label: 'Ubicación', value: CONTACT.address, href: null },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    color: '#2563EB',
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ color: '#64748B', fontSize: '0.8rem', margin: '0 0 4px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} style={{ color: '#334155', fontSize: '0.95rem', fontWeight: 500, textDecoration: 'none' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#2563EB'}
                        onMouseLeave={e => e.currentTarget.style.color = '#334155'}>
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ color: '#334155', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule */}
            <div style={{
              marginTop: 32, padding: '20px 24px',
              background: 'rgba(37,211,102,0.06)',
              border: '1px solid rgba(37,211,102,0.2)',
              borderRadius: 16,
            }}>
              <p style={{ color: '#25D366', fontWeight: 700, fontSize: '0.875rem', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Horario de atención
              </p>
              <p style={{ color: '#334155', fontSize: '0.9rem', margin: 0, lineHeight: 1.7 }}>
                {CONTACT.schedule}
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div
            className="card"
            style={{ padding: '36px' }}
          >
            <h3 style={{ color: '#0F172A', fontWeight: 700, fontSize: '1.2rem', marginBottom: 24 }}>
              {CONTACTO.form_title}
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
      <WavyDivider position="bottom" fill="#0F172A" />
    </section>
  )
}

function WAIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.11 7.84a16 16 0 006.06 6.06l1.02-1.15a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
