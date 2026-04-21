# Plan Web — BD & Mariafe Transportes
## 8. Guía de Implementación para Web_Builder

---

### 8.1 Stack Tecnológico Exacto

| Categoría | Librería / Tool | Versión | Propósito |
| :-------- | :-------------- | :------ | :-------- |
| **Core** | React | `^18.3` | Framework UI |
| **Build** | Vite | `^5.x` | Bundler con HMR, alias, plugin GLSL |
| **3D Engine** | Three.js | `^0.165` | Rendering 3D base |
| **3D React** | @react-three/fiber | `^8.17` | React renderer para Three.js |
| **3D Helpers** | @react-three/drei | `^9.x` | Environment, MeshReflectorMaterial, Points, etc. |
| **Post-processing** | @react-three/postprocessing | `^2.x` | Bloom para tier HIGH |
| **Animación UI** | framer-motion | `^11.x` | Scroll animations, layout, AnimatePresence |
| **Animación avanzada** | gsap | `^3.12` | ScrollTrigger para timeline del proceso |
| **Estilos** | Tailwind CSS | `^3.4` | Utility-first CSS |
| **GLSL** | vite-plugin-glsl | `^1.x` | Import de archivos .glsl |
| **Formulario** | @formspree/react | `^2.x` | Envío de formulario sin backend propio |
| **Íconos** | lucide-react | `^0.4x` | Set de íconos SVG (para diferenciadores) |
| **Linter** | ESLint + eslint-plugin-react | latest | Calidad de código |

**Instalación completa:**
```powershell
# Setup del proyecto
npm create vite@latest bdymariafe-web -- --template react
cd bdymariafe-web

# Dependencias de producción
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install framer-motion gsap
npm install @formspree/react
npm install lucide-react

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# GLSL para shaders
npm install -D vite-plugin-glsl

# ESLint (opcional pero recomendado)
npm install -D eslint eslint-plugin-react
```

---

### 8.2 Orden de Implementación por Fases

#### FASE 0 — Setup y Fundación (hacer primero, siempre)
1. Crear proyecto Vite + React con la estructura de carpetas del Archivo 07
2. Implementar `globals.css` con todos los design tokens de la Sección 4.2
3. Implementar `animations.css` con todos los `@keyframes` de la Sección 4.8
4. Configurar `tailwind.config.js` con los colores y animaciones de la marca
5. Configurar `vite.config.js` con alias `@/` y plugin GLSL
6. Crear todos los archivos de `src/data/` con el contenido del Archivo 03
7. Crear el `DeviceTierProvider` y el hook `useDeviceTier`
8. Implementar `MainLayout.jsx` vacío (Navbar placeholder + children + Footer placeholder)

#### FASE 1 — Navbar y Hero (sección de mayor impacto)
1. Implementar `Navbar.jsx` completo con hamburger mobile y scroll detection
2. Implementar `WhatsAppFloat.jsx` con pulse animation
3. Implementar `HeroFallbackCSS.jsx` (tier LOW — el más importante dado el tráfico)
4. Implementar `HeroParticleScene.jsx` (tier HIGH + MEDIUM) — lazy loaded
5. Implementar `HeroSection.jsx` completo con copy de `content.js`
6. Verificar: Hero se ve perfecto en mobile 360px con fallback CSS ✅
7. Verificar: Botón WhatsApp funciona con número real ✅

#### FASE 2 — Secciones de Conversión (servicios + propuesta)
1. Implementar todos los Atoms necesarios: `GlowButton`, `SectionLabel`, `IconBox`, `CertBadge`
2. Implementar `DifferentiatorCard` con hover effects
3. Implementar `PropuestaSection.jsx` con `SteelFallbackCSS` primero, luego `SteelGeometryScene`
4. Implementar `ServiceCard` con hover 3D tilt (JavaScript `onMouseMove`)
5. Implementar `ServiciosSection.jsx` completo
6. Verificar: todos los CTAs de WhatsApp abren la conversación correctamente ✅

#### FASE 3 — Proceso y Certificaciones
1. Implementar `ProcessStep` con StepNumber y línea conectora
2. Implementar `ProcesoSection.jsx` con GSAP ScrollTrigger timeline
3. Implementar `CertificationItem` y `CertBadge`
4. Implementar `CertificacionesSection.jsx` con badges y tabla de normativas
5. Verificar: scroll animation del timeline es suave en mobile ✅

#### FASE 4 — Métricas, Galería y Contacto
1. Implementar `AnimatedCounter` con `useCountUp` hook
2. Implementar `MetricasSection.jsx` con counters
3. Implementar `GaleriaSection.jsx` con filtros y lightbox
4. Implementar `ContactChannel` y `TrustBadge`
5. Implementar `ContactoSection.jsx` con formulario Formspree
6. Implementar `Footer.jsx` completo

#### FASE 5 — Animaciones de Scroll (polish final)
1. Agregar Framer Motion stagger a `PropuestaSection` y `ServiciosSection`
2. Agregar GSAP ScrollTrigger al `ProcesoSection`
3. Agregar `useIntersectionObserver` en `MetricasSection` para activar counters
4. Agregar row-by-row reveal en `GaleriaSection`
5. Agregar dot navigation lateral (solo desktop HIGH)

#### FASE 6 — Verificación y Optimización
1. Audit de accesibilidad: focus states, aria-labels, alt texts
2. Audit de rendimiento en Chrome DevTools (Lighthouse)
3. Verificar LCP < 2.5s en mobile 4G simulado
4. Verificar que ningún bundle individual supera 200KB (sin Three.js)
5. Bundle analysis: `npm run analyze`
6. Test en dispositivos reales: Android Chrome (360px) y desktop Chrome

---

### 8.3 Implementación del Formulario de Contacto

**Opción recomendada: Formspree** (sin backend propio, gratis hasta 50 envíos/mes)

```jsx
// src/components/organisms/ContactoSection.jsx
import { useForm, ValidationError } from '@formspree/react'

function ContactForm() {
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ENDPOINT)
  
  if (state.succeeded) {
    return (
      <div className="success-message">
        <p>¡Gracias! Recibimos tu consulta. Nos comunicaremos pronto.</p>
      </div>
    )
  }
  
  return (
    <form onSubmit={handleSubmit} noValidate>
      <input type="text"    name="nombre"   required placeholder="Nombre completo" />
      <input type="text"    name="empresa"  required placeholder="Empresa / Ganadería" />
      <input type="tel"     name="telefono" required placeholder="Teléfono / WhatsApp" />
      <input type="text"    name="region"   required placeholder="Región / Provincia" />
      <textarea             name="mensaje"           placeholder="¿Cuántos litros necesita transportar? ¿Con qué frecuencia?" />
      
      {/* Honeypot anti-spam */}
      <input type="text" name="_gotcha" style={{ display: 'none' }} />
      
      <button type="submit" disabled={state.submitting}>
        {state.submitting ? 'Enviando...' : 'Enviar consulta →'}
      </button>
    </form>
  )
}
```

**Seguridad del formulario:**
- Honeypot field `_gotcha` para bloquear bots básicos
- No almacenar datos sensibles en el frontend (`localStorage`, `sessionStorage`)
- Formspree maneja el almacenamiento seguro en su backend
- `rel="noopener noreferrer"` en todos los `target="_blank"`
- Validación en cliente (HTML5 `required` + custom) Y en servidor (Formspree)

---

### 8.4 Reglas de Rendimiento 3D (obligatorias)

```javascript
// ✅ CORRECTO: Canvas separado del árbol React principal
function HeroSection() {
  return (
    <section id="hero">
      <div className="hero-content"> {/* DOM React */}
        <h1>...</h1>
        <GlowButton>WhatsApp</GlowButton>
      </div>
      
      {/* Canvas completamente aislado, no recibe props del estado React */}
      <div className="hero-canvas-wrapper" aria-hidden="true">
        <Suspense fallback={<HeroFallbackCSS />}>
          <HeroScene />
        </Suspense>
      </div>
    </section>
  )
}

// ✅ CORRECTO: Dispose al desmontar
function ParticleField({ count }) {
  const geoRef = useRef()
  
  useEffect(() => {
    return () => {
      geoRef.current?.dispose()
    }
  }, [])
  
  const positions = useMemo(() => generatePositions(count), [count])
  // ...
}

// ❌ INCORRECTO: Re-render innecesario
function BadScene({ userColor }) { // userColor cambia con cada keystroke del form
  // Esto re-renderiza el canvas con cada letra escrita — MAL
}
```

---

### 8.5 Accesibilidad y SEO — Checklist

**Accesibilidad:**
- [ ] Todos los Canvas tienen `aria-hidden="true"` — el contenido 3D es decorativo
- [ ] Todos los botones tienen `aria-label` descriptivo si no tienen texto visible
- [ ] Todas las imágenes tienen `alt` con descripción real (no "imagen1.jpg")
- [ ] Focus visible en todos los elementos interactivos (`outline` personalizado)
- [ ] `prefers-reduced-motion` activa automáticamente tier `LOW` (sin 3D, sin animaciones complejas)
- [ ] Contraste WCAG AA verificado en todos los textos (herramienta: WebAIM Contrast Checker)
- [ ] Formulario: campos con `label` o `aria-label` correctos
- [ ] Formulario: mensajes de error descriptivos (no solo color rojo)
- [ ] Botón WhatsApp flotante: tamaño táctil mínimo 56×56px

**SEO On-Page:**
- [ ] `<title>` único con keywords: empresa + servicio + ubicación
- [ ] `<meta name="description">` de 150–160 caracteres
- [ ] Un solo `<h1>` por página
- [ ] `<h2>` en cada sección con keywords naturales
- [ ] Todas las imágenes con `alt` descriptivo en español con keywords
- [ ] `<link rel="canonical">` apuntando al dominio final
- [ ] Open Graph tags completos (`og:title`, `og:description`, `og:image`, `og:url`)
- [ ] `robots.txt` y `sitemap.xml` en `/public/`
- [ ] `lang="es-PE"` en `<html>`
- [ ] URLs amigables en español (si hay rutas adicionales)

---

### 8.6 Performance Targets (Google PageSpeed ≥ 80 mobile)

| Métrica | Target | Estrategia |
| :------ | :----- | :--------- |
| LCP (Largest Contentful Paint) | < 2.5s | Hero image/texto como LCP, preload de fuentes, no 3D en la primera carga del LOW tier |
| FID / INP (Interaction to Next Paint) | < 200ms | Sin JS bloqueante en el head, Three.js lazy loaded |
| CLS (Cumulative Layout Shift) | < 0.1 | Dimensiones de imágenes explícitas (`width` + `height`), fuentes con `font-display: swap` |
| Bundle JS total (sin Three.js) | < 200KB | Code splitting, Three.js en chunk separado |
| Bundle Three.js chunk | < 600KB gzipped | Solo importar lo que se usa, no `import * as THREE` |
| Imágenes | < 200KB cada una | WebP optimizado, lazy loading |
| Time to Interactive | < 4s (mobile 4G) | Prioritizar CSS y HTML crítico, defer Three.js |

**Code splitting para Three.js:**
```javascript
// App.jsx — lazy import del hero 3D
const HeroScene = lazy(() => import('./components/three/scenes/HeroParticleScene'))

// El canvas solo se carga cuando el tier NO es LOW
{tier !== 'LOW' && (
  <Suspense fallback={<HeroFallbackCSS />}>
    <HeroScene />
  </Suspense>
)}
```

---

### 8.7 Variables de Entorno Requeridas

```bash
# .env — NO commitear este archivo
VITE_WHATSAPP_NUMBER=51XXXXXXXXX          # Número real de la empresa
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/XXXXXXXX
VITE_GA4_ID=G-XXXXXXXXXX
```

> **Seguridad:** Las variables `VITE_*` son públicas (van en el bundle del cliente). No incluir contraseñas, API keys privadas ni tokens en el `.env` del frontend.

---

### 8.8 Comandos de Verificación Final

```powershell
# 1. Verificar que el build de producción funciona sin errores
npm run build
npm run preview

# 2. Análisis del bundle
npx vite-bundle-visualizer

# 3. Lighthouse CLI (requiere Chrome instalado)
npx lighthouse http://localhost:4173 --view --output html --output-path ./lighthouse-report.html

# 4. Verificar que el sitemap es válido
# Abrir en browser: http://localhost:4173/sitemap.xml

# 5. Verificar robots.txt
# Abrir en browser: http://localhost:4173/robots.txt
```

---

### 8.9 Advertencias y Trampas Comunes

| Problema | Causa habitual | Solución |
| :------- | :------------- | :------- |
| Canvas 3D causa jank en scroll | `useFrame` ejecuta lógica pesada | Mover cálculos a `useMemo`, simplificar geometrías |
| Partículas se ven en cuadrados | Falta `gl_FragColor` con forma circular | Usar `smoothstep` en el frag shader o `PointMaterial` de drei |
| Fonts no cargan (FOIT) | `font-display` no configurado | Usar `font-display: swap` en el `@import` de Google Fonts |
| CLS alto por imágenes | Imágenes sin `width`/`height` | Siempre especificar dimensiones en `<img>` |
| WhatsApp no abre en iOS | URL no encoded correctamente | Usar `WhatsAppLink` atom que maneja el encoding |
| Formulario envía sin validación | `noValidate` sin validación JS | Implementar validación custom antes del `handleSubmit` |
| Three.js se carga siempre | No hay code splitting | `lazy()` + `Suspense` obligatorio en todas las escenas |
| Background color flash (FCP) | CSS variables no se aplican hasta que carga el JS | Establecer `background-color` en `body` en `index.html` directamente |

**Fix para el background flash:**
```html
<!-- index.html — dentro de <head> -->
<style>
  body { background-color: #0B1E2D; }
</style>
```
