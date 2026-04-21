# Plan Web — BD & Mariafe Transportes
## 4. Sistema de Diseño Visual

---

### 4.1 Concepto Visual

**"Acero limpio en movimiento"** — El design system evoca la precisión y pureza del acero inoxidable sanitario. Fondos profundos azul-noche representan la seriedad industrial; el blanco y el plateado hablan de higiene y limpieza; el verde WhatsApp ancla la conversión. Las formas son geométricas y limpias — sin decoración innecesaria. La tipografía es bold y directa. El sistema completo trabaja en modo oscuro (dark mode) como default, que comunica modernidad y premium para el sector industrial B2B.

---

### 4.2 Paleta de Colores

#### 4.2.1 Tokens de Color — Modo Oscuro (Default)

| Token CSS | Valor HEX | RGB | Uso principal |
| :-------- | :-------- | :-- | :------------ |
| `--color-bg-base` | `#0B1E2D` | 11, 30, 45 | Fondo de página principal — azul noche profundo |
| `--color-bg-elevated` | `#0F2A45` | 15, 42, 69 | Fondo de secciones alternas (hero, métricas) |
| `--color-bg-surface` | `#162F4A` | 22, 47, 74 | Cards, modales, formularios |
| `--color-bg-surface-hover` | `#1A3A5C` | 26, 58, 92 | Cards en hover |
| `--color-bg-overlay` | `rgba(11,30,45,0.92)` | — | Overlays, navbar mobile |
| `--color-brand-primary` | `#1A3A5C` | 26, 58, 92 | Azul acero — color principal de marca |
| `--color-brand-secondary` | `#2563EB` | 37, 99, 235 | Azul eléctrico — acentos, links activos |
| `--color-accent-whatsapp` | `#25D366` | 37, 211, 102 | Todos los CTAs de WhatsApp |
| `--color-accent-whatsapp-hover` | `#1DA851` | 29, 168, 81 | Hover de botones WhatsApp |
| `--color-accent-steel` | `#A8B8C8` | 168, 184, 200 | Plata acero — badges, iconos, bordes sutiles |
| `--color-accent-glow` | `rgba(37,99,235,0.35)` | — | Glow de objetos 3D, partículas, bordes de énfasis |
| `--color-text-primary` | `#F0F4F8` | 240, 244, 248 | Titulares en modo oscuro |
| `--color-text-body` | `#CBD5E1` | 203, 213, 225 | Cuerpo de texto, descripciones |
| `--color-text-muted` | `#64748B` | 100, 116, 139 | Texto secundario, microcopy |
| `--color-text-inverse` | `#0B1E2D` | 11, 30, 45 | Texto sobre fondos claros |
| `--color-border-subtle` | `rgba(168,184,200,0.15)` | — | Bordes de cards, divisores |
| `--color-border-active` | `rgba(37,99,235,0.5)` | — | Bordes en hover/focus |
| `--color-success` | `#10B981` | 16, 185, 129 | Estados de éxito (form enviado) |
| `--color-warning` | `#F59E0B` | 245, 158, 11 | Alertas no críticas |
| `--color-error` | `#EF4444` | 239, 68, 68 | Errores de formulario |

#### 4.2.2 Tokens de Color — Modo Claro (Alternativo para secciones)

> Algunas secciones (Certificaciones, Galería) se muestran sobre fondo claro para generar contraste visual y respiración.

| Token CSS | Valor HEX | Uso |
| :-------- | :-------- | :-- |
| `--color-bg-light` | `#F8FAFC` | Fondo de secciones sobre blanco |
| `--color-bg-light-surface` | `#FFFFFF` | Cards sobre fondo claro |
| `--color-text-on-light` | `#0F2A45` | Titulares sobre fondos claros |
| `--color-text-body-on-light` | `#334155` | Cuerpo sobre fondos claros |

---

### 4.3 Tipografía

| Rol | Familia | Peso | Tamaño | Line-height | Uso |
| :-- | :------ | :--- | :----- | :---------- | :-- |
| **Display / Hero** | Inter | 800 (ExtraBold) | `clamp(3rem, 7vw, 6rem)` | 1.05 | H1 del hero, números de métricas grandes |
| **Heading 1** | Inter | 700 (Bold) | `clamp(2rem, 4vw, 3.5rem)` | 1.15 | H2 de secciones |
| **Heading 2** | Inter | 600 (SemiBold) | `clamp(1.25rem, 2.5vw, 2rem)` | 1.3 | H3, títulos de cards |
| **Body Large** | Inter | 400 (Regular) | `1.125rem (18px)` | 1.7 | Párrafos introductores, descripciones importantes |
| **Body** | Inter | 400 (Regular) | `1rem (16px)` | 1.65 | Cuerpo de texto, listas |
| **Body Small** | Inter | 400 (Regular) | `0.875rem (14px)` | 1.5 | Microcopy, footnotas, badges |
| **Label / Badge** | Inter | 600 (SemiBold) | `0.75rem (12px)` | 1.4 | Labels de sección, badges, etiquetas uppercase |
| **Mono** | JetBrains Mono | 400 | `0.875rem (14px)` | 1.5 | Datos técnicos (AISI 304/316L), normativas |

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap');
```

**Reglas tipográficas:**
- Labels de sección: `font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-brand-secondary);`
- Nunca usar `font-weight < 400` en la web
- Mínimo 16px en mobile para todo texto legible (WCAG AA)
- `font-display: swap` para evitar FOIT

---

### 4.4 Espaciado

Sistema de escala 4px (base = 4px):

| Token | Valor | Uso típico |
| :---- | :---- | :--------- |
| `--space-1` | `4px` | Micro gaps |
| `--space-2` | `8px` | Padding interno pequeño |
| `--space-3` | `12px` | Gap entre elementos inline |
| `--space-4` | `16px` | Padding de badge, gap de lista |
| `--space-5` | `20px` | Espaciado base |
| `--space-6` | `24px` | Padding de cards |
| `--space-8` | `32px` | Margen entre elementos |
| `--space-10` | `40px` | Padding interno de secciones (mobile) |
| `--space-12` | `48px` | Gap entre secciones (mobile) |
| `--space-16` | `64px` | Padding de secciones (desktop) |
| `--space-20` | `80px` | Gap entre secciones grandes (desktop) |
| `--space-24` | `96px` | Padding de hero (desktop) |
| `--space-32` | `128px` | Margen superior de secciones grandes |

**Contenedor máximo:** `max-width: 1200px; margin: 0 auto; padding: 0 clamp(1rem, 5vw, 4rem);`

---

### 4.5 Bordes y Radios

| Token | Valor | Uso |
| :---- | :---- | :-- |
| `--radius-sm` | `4px` | Badges, inputs |
| `--radius-md` | `8px` | Botones secundarios |
| `--radius-lg` | `12px` | Cards pequeñas |
| `--radius-xl` | `16px` | Cards de servicios, modales |
| `--radius-2xl` | `24px` | Secciones con fondo destacado |
| `--radius-pill` | `50px` | Botones CTA principales (pill) |
| `--radius-full` | `9999px` | Avatares, badges circulares, botón flotante WhatsApp |

---

### 4.6 Sombras

| Token | Valor CSS | Uso |
| :---- | :-------- | :-- |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.3)` | Cards en reposo |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.4)` | Cards en hover (modo oscuro) |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.5)` | Modales, formularios elevados |
| `--shadow-glow-blue` | `0 0 40px rgba(37,99,235,0.3)` | Hover de elementos interactivos, objetos 3D |
| `--shadow-glow-green` | `0 0 30px rgba(37,211,102,0.4)` | Hover del botón WhatsApp flotante |
| `--shadow-glow-steel` | `0 0 20px rgba(168,184,200,0.2)` | Bordes de acero en objetos 3D |
| `--shadow-navbar` | `0 2px 20px rgba(0,0,0,0.4)` | Navbar con scroll |

---

### 4.7 Gradientes y Efectos

| Nombre | CSS Value | Uso |
| :----- | :-------- | :-- |
| `gradient-hero-bg` | `linear-gradient(135deg, #0B1E2D 0%, #0F2A45 50%, #162F4A 100%)` | Fondo del hero |
| `gradient-section-dark` | `linear-gradient(180deg, #0B1E2D 0%, #0F2A45 100%)` | Secciones oscuras (métricas, contacto) |
| `gradient-card-hover` | `linear-gradient(145deg, rgba(26,58,92,0.8) 0%, rgba(22,47,74,0.6) 100%)` | Cards en hover |
| `gradient-text-hero` | `linear-gradient(90deg, #F0F4F8 0%, #A8B8C8 100%)` | Efecto de texto metálico en hero |
| `gradient-whatsapp` | `linear-gradient(135deg, #25D366 0%, #1DA851 100%)` | Botones de WhatsApp |
| `gradient-glow-radial` | `radial-gradient(ellipse at center, rgba(37,99,235,0.15) 0%, transparent 70%)` | Glow detrás de objetos 3D en hero |
| `gradient-overlay-hero` | `linear-gradient(to right, rgba(11,30,45,0.9) 40%, transparent 100%)` | Overlay sobre imagen hero en mobile |
| `gradient-metrics-line` | `linear-gradient(90deg, transparent, #25D366, transparent)` | Línea decorativa bajo counters |

**Glassmorphism (navbar y overlays):**
```css
.glass {
  background: rgba(15, 42, 69, 0.75);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(168, 184, 200, 0.1);
}
```

**Efecto de acero / metallic sheen (cards premium):**
```css
.steel-surface {
  background: linear-gradient(135deg,
    rgba(168,184,200,0.08) 0%,
    rgba(168,184,200,0.02) 50%,
    rgba(168,184,200,0.06) 100%
  );
  border: 1px solid rgba(168,184,200,0.15);
}
```

---

### 4.8 Animaciones CSS (sin 3D)

| Nombre | Duración | Easing | Uso |
| :----- | :------- | :----- | :-- |
| `fadeInUp` | `0.7s` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrada de secciones al scroll |
| `fadeInLeft` | `0.6s` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrada de texto del hero |
| `fadeInRight` | `0.6s` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrada del canvas 3D |
| `staggerChildren` | `0.12s` delay entre hijos | `ease-out` | Listas, cards en grid |
| `scaleIn` | `0.5s` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Badges, íconos de diferenciadores |
| `pulseGlow` | `2.5s infinite` | `ease-in-out` | Botón flotante WhatsApp (pulse ring) |
| `shimmer` | `1.5s infinite` | `linear` | Efecto shimmer sobre botones en hover |
| `strokeDraw` | `1.5s` | `ease-in-out` | SVG stroke animation en el proceso timeline |
| `countUp` | Variable | `ease-out` | Counters de métricas |
| `morphBlob` | `10s infinite` | `ease-in-out` | Blobs SVG de fondo (decorativos) |

**Keyframes base (globals.css):**
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
  50%       { box-shadow: 0 0 0 16px rgba(37,211,102,0); }
}

@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
```

---

### 4.9 Componentes Visuales Clave

**Botón WhatsApp (primario):**
```css
.btn-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: 16px 32px;
  background: var(--gradient-whatsapp);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-glow-green);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-whatsapp:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 40px rgba(37,211,102,0.5);
}
```

**Card de servicio (glassmorphism + hover tilt):**
```css
.service-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  transform-style: preserve-3d;
  will-change: transform;
}
.service-card:hover {
  border-color: var(--color-border-active);
  box-shadow: var(--shadow-glow-blue);
}
```

**Badge de normativa:**
```css
.cert-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: rgba(168,184,200,0.08);
  border: 1px solid rgba(168,184,200,0.2);
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-accent-steel);
}
```

---

### 4.10 Consideraciones de Accesibilidad Visual

- **Contraste mínimo:** Todos los textos sobre fondos oscuros deben superar WCAG AA (ratio 4.5:1). Verificado: `#F0F4F8` sobre `#0B1E2D` = ratio 12.8:1 ✅
- **Focus states:** `outline: 2px solid var(--color-brand-secondary); outline-offset: 3px;` en todos los elementos interactivos
- **Motion:** Todas las animaciones respetan `@media (prefers-reduced-motion: reduce)` — animar solo opacity, sin transforms
- **Color no es el único indicador:** Los estados de error del formulario incluyen ícono + texto + borde, no solo color
