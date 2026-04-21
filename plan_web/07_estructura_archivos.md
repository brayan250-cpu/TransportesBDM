# Plan Web — BD & Mariafe Transportes
## 7. Estructura de Archivos del Proyecto

---

### 7.1 Árbol de Archivos Completo

```
bdymariafe-web/
│
├── public/
│   ├── fonts/                        # Fuentes auto-hosted (opcional, si no se usa Google Fonts CDN)
│   ├── images/
│   │   ├── logo.svg                  # Logo principal (vectorial)
│   │   ├── logo-white.svg            # Logo variante blanca
│   │   ├── favicon.ico
│   │   ├── og-image.jpg              # Open Graph 1200×630px
│   │   ├── hero-bg.webp              # Imagen de fondo hero (fallback LOW tier)
│   │   ├── gallery/                  # Fotos optimizadas en WebP ≤ 200KB
│   │   │   ├── cisterna-exterior-01.webp
│   │   │   ├── cisterna-interior-01.webp
│   │   │   ├── proceso-cip-01.webp
│   │   │   ├── cisterna-ruta-01.webp
│   │   │   └── equipo-01.webp
│   │   └── certifications/           # Logos de normativas (SVG o PNG)
│   │       ├── minagri-logo.svg
│   │       ├── digesa-logo.svg
│   │       └── senasa-logo.svg
│   ├── models/                       # Modelos 3D .glb si se usan (vacío por ahora)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── manifest.json
│
├── src/
│   ├── components/
│   │   │
│   │   ├── atoms/
│   │   │   ├── GlowButton.jsx
│   │   │   ├── SectionLabel.jsx
│   │   │   ├── AnimatedCounter.jsx
│   │   │   ├── GradientText.jsx
│   │   │   ├── CertBadge.jsx
│   │   │   ├── StepNumber.jsx
│   │   │   ├── IconBox.jsx
│   │   │   ├── Divider.jsx
│   │   │   ├── Tag.jsx
│   │   │   └── WhatsAppLink.jsx
│   │   │
│   │   ├── molecules/
│   │   │   ├── DifferentiatorCard.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── ProcessStep.jsx
│   │   │   ├── CertificationItem.jsx
│   │   │   ├── MetricBlock.jsx
│   │   │   ├── GalleryThumb.jsx
│   │   │   ├── ContactChannel.jsx
│   │   │   ├── NavItem.jsx
│   │   │   ├── TrustBadge.jsx
│   │   │   └── SocialLink.jsx
│   │   │
│   │   ├── organisms/
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── PropuestaSection.jsx
│   │   │   ├── ServiciosSection.jsx
│   │   │   ├── ProcesoSection.jsx
│   │   │   ├── CertificacionesSection.jsx
│   │   │   ├── MetricasSection.jsx
│   │   │   ├── GaleriaSection.jsx
│   │   │   ├── ContactoSection.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── WhatsAppFloat.jsx
│   │   │
│   │   └── three/
│   │       ├── scenes/
│   │       │   ├── HeroParticleScene.jsx      # Escena 3D del hero (HIGH/MEDIUM)
│   │       │   ├── HeroFallbackCSS.jsx        # Fallback CSS para tier LOW
│   │       │   ├── SteelGeometryScene.jsx     # Torus metálico sección propuesta
│   │       │   ├── SteelFallbackCSS.jsx       # Fallback CSS/SVG
│   │       │   ├── CoverageMapScene.jsx       # Mapa 3D de cobertura
│   │       │   └── CoverageMapSVG.jsx         # Fallback SVG del mapa
│   │       └── utils/
│   │           ├── ParticleField.jsx          # Campo de partículas reutilizable
│   │           ├── useMouseParallax.js        # Hook parallax cursor → cámara
│   │           ├── useScrollOpacity.js        # Hook scroll → opacity del canvas
│   │           ├── particle.vert.glsl         # Vertex shader de partículas
│   │           └── particle.frag.glsl         # Fragment shader de partículas
│   │
│   ├── hooks/
│   │   ├── useDeviceTier.js
│   │   ├── useScrollProgress.js
│   │   ├── useIntersectionObserver.js
│   │   ├── useNavbarScroll.js
│   │   ├── useCountUp.js
│   │   ├── useMousePosition.js
│   │   ├── useGalleryFilter.js
│   │   └── useFormSubmit.js
│   │
│   ├── context/
│   │   ├── DeviceTierContext.jsx
│   │   └── GalleryContext.jsx
│   │
│   ├── data/
│   │   ├── content.js                # TODO el copy de la web — editar aquí
│   │   ├── services.js               # Array de servicios
│   │   ├── differentiators.js        # Array de diferenciadores
│   │   ├── process-steps.js          # Array de pasos del proceso
│   │   ├── certifications.js         # Array de normativas y certificaciones
│   │   ├── metrics.js                # Array de métricas de impacto
│   │   ├── gallery.js                # Array de imágenes de galería
│   │   └── contact.js                # Datos de contacto (WhatsApp, email, teléfono)
│   │
│   ├── styles/
│   │   ├── globals.css               # Variables CSS (design tokens), reset, base
│   │   ├── animations.css            # Keyframes reutilizables
│   │   └── utilities.css             # Clases utilitarias que no cubre Tailwind
│   │
│   ├── App.jsx                       # Composición de secciones en orden
│   ├── MainLayout.jsx                # Layout base: Navbar + children + Footer + Float
│   └── main.jsx                      # Entry point: ReactDOM.createRoot + providers
│
├── .env                              # Variables de entorno (número WhatsApp, email backend)
├── .env.example                      # Template de .env (commiteado, sin valores reales)
├── .gitignore
├── index.html                        # HTML base de Vite con meta tags SEO
├── vite.config.js                    # Config Vite con alias @/ y plugin de GLSL
├── tailwind.config.js                # Extend con design tokens de la marca
├── postcss.config.js
├── package.json
└── README.md                         # Instrucciones de setup, scripts disponibles
```

---

### 7.2 Archivos de Configuración Clave

**`vite.config.js`:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    glsl(), // Para importar archivos .glsl con ?raw o directamente
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Separar Three.js en un chunk propio para lazy loading eficiente
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['framer-motion', 'gsap'],
        },
      },
    },
  },
})
```

**`tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base':     '#0B1E2D',
        'bg-elevated': '#0F2A45',
        'bg-surface':  '#162F4A',
        'brand-primary': '#1A3A5C',
        'brand-secondary': '#2563EB',
        'accent-wa':   '#25D366',
        'accent-steel': '#A8B8C8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'pill': '50px',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s linear infinite',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },
  plugins: [],
}
```

**`index.html`:**
```html
<!DOCTYPE html>
<html lang="es-PE">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Primary -->
  <title>BD & Mariafe Transportes | Transporte de Leche Fresca en Cisternas Sanitarias | Perú</title>
  <meta name="description" content="Empresa peruana especializada en transporte de leche fresca a granel. Cisternas de acero quirúrgico AISI 304/316L, limpieza CIP certificada, trazabilidad total. Normas MINAGRI y DIGESA." />
  <meta name="keywords" content="transporte leche fresca Peru, cisterna acero inoxidable, cisterna sanitaria leche, empresa transporte leche Cajamarca Lima" />
  <link rel="canonical" href="https://bdymariafe.com.pe/" />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://bdymariafe.com.pe/" />
  <meta property="og:title" content="BD & Mariafe Transportes — Pureza en Movimiento" />
  <meta property="og:description" content="Cisternas de acero quirúrgico, limpieza CIP certificada y trazabilidad en cada lote. El estándar más alto en transporte de leche del Perú." />
  <meta property="og:image" content="https://bdymariafe.com.pe/images/og-image.jpg" />
  
  <!-- Fonts preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
  
  <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

**`.env.example`:**
```bash
# Número de WhatsApp (sin + ni espacios, con código país 51 para Perú)
VITE_WHATSAPP_NUMBER=51XXXXXXXXX

# Email de destino del formulario de contacto (backend/Formspree)
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/XXXXXXXX

# Google Analytics 4 Measurement ID
VITE_GA4_ID=G-XXXXXXXXXX
```

---

### 7.3 Scripts de `package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .js,.jsx",
    "lint:fix": "eslint src --ext .js,.jsx --fix",
    "analyze": "npx vite-bundle-visualizer"
  }
}
```

---

### 7.4 Estrategia de Optimización de Imágenes

Todas las imágenes de la galería y el sitio deben seguir estas reglas:

| Tipo de imagen | Formato | Tamaño máximo | Dimensiones máximas | Lazy loading |
| :------------- | :------ | :------------ | :------------------ | :----------- |
| Hero background | WebP | 300KB | 1920×1080 | No (LCP crítico) |
| Galería thumbnails | WebP | 80KB | 600×450 | Sí (`loading="lazy"`) |
| Galería lightbox | WebP | 200KB | 1200×900 | Sí |
| Logo | SVG | — | — | No |
| OG Image | JPEG | 150KB | 1200×630 | No |
| Badges/logos de normativas | SVG | — | — | Sí |

**Script de conversión a WebP (PowerShell con cwebp o sharp):**
```powershell
# Instalar sharp-cli globalmente
npm install -g sharp-cli

# Convertir todas las imágenes en /public/images/gallery/
Get-ChildItem .\public\images\gallery\ -Include *.jpg,*.jpeg,*.png |
  ForEach-Object { sharp -i $_.FullName -o ($_.FullName -replace '\.[^.]+$', '.webp') }
```
