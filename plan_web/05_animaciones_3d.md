# Plan Web — BD & Mariafe Transportes
## 5. Especificaciones de Animaciones 3D Complejas

---

### 5.1 Detección de Tier de Dispositivo

```javascript
// src/hooks/useDeviceTier.js
import { useMemo } from 'react';

export function useDeviceTier() {
  return useMemo(() => {
    const memory  = navigator.deviceMemory ?? 4;       // GB RAM
    const cores   = navigator.hardwareConcurrency ?? 4; // CPU cores
    const dpr     = window.devicePixelRatio ?? 1;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile  = /Mobi|Android/i.test(navigator.userAgent);

    // LOW siempre si prefiere reducción de movimiento
    if (reduced) return 'LOW';

    // HIGH: desktop potente
    if (!mobile && memory >= 6 && cores >= 8 && dpr >= 2) return 'HIGH';

    // MEDIUM: desktop/tablet estándar
    if (memory >= 3 && cores >= 4 && !reduced) return 'MEDIUM';

    // LOW: dispositivos limitados (rural 4G smartphones — mayoría del tráfico)
    return 'LOW';
  }, []);
}
```

> **Nota crítica para BD & Mariafe:** Más del 70% del tráfico viene de smartphones en zonas rurales o semi-rurales (Cajamarca, Arequipa). La mayoría caerá en tier `LOW` o `MEDIUM`. El fallback CSS debe ser visualmente atractivo y estar en producción desde el día 1. El tier `HIGH` es un plus, no el default.

---

### 5.2 Escenas 3D por Sección

#### Escena 1: "Flujo Molecular" — Sección Hero

**Concepto Visual:**
Campo de 6.000 partículas esféricas micro (color blanco-plateado y azul eléctrico) que forman un flujo orgánico en movimiento continuo — evocando moléculas de leche fluyendo dentro de una cisterna. Las partículas responden al movimiento del cursor (parallax sutil), y al hacer scroll se dispersan hacia afuera, revelando la siguiente sección. El canvas ocupa el 50% derecho del hero en desktop; full-width en mobile.

**Detalles Three.js:**
```javascript
// src/components/three/scenes/HeroParticleScene.jsx
import { useRef, useMemo, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Parámetros por tier
const TIER_CONFIG = {
  HIGH:   { count: 6000, size: 0.018, speed: 0.4,  bloom: true,  dpr: [1, 2] },
  MEDIUM: { count: 2000, size: 0.022, speed: 0.25, bloom: false, dpr: [1, 1] },
  LOW:    null, // No se renderiza — fallback CSS
}

// Distribución de partículas: esfera con turbulencia
function generatePositions(count) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = Math.random() * 3.5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos((Math.random() * 2) - 1)
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
  }
  return positions
}
```

**Shader personalizado (partículas con glow):**
```glsl
// src/components/three/utils/particle.vert.glsl
uniform float uTime;
uniform vec2 uMouse;
varying float vDistance;

void main() {
  vec3 pos = position;
  
  // Movimiento fluido tipo onda
  pos.x += sin(uTime * 0.3 + pos.z * 0.5) * 0.15;
  pos.y += cos(uTime * 0.2 + pos.x * 0.4) * 0.12;
  
  // Repulsión suave del cursor (en clip space)
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vDistance = length(mvPosition.xyz);
  
  gl_PointSize = 2.5 * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
```

```glsl
// src/components/three/utils/particle.frag.glsl
varying float vDistance;
uniform vec3 uColorA; // #F0F4F8 - blanco plateado
uniform vec3 uColorB; // #2563EB - azul eléctrico

void main() {
  // Forma circular suave para cada partícula
  vec2 uv = gl_PointCoord - vec2(0.5);
  float d = length(uv);
  if (d > 0.5) discard;
  
  float alpha = smoothstep(0.5, 0.1, d);
  vec3 color = mix(uColorA, uColorB, clamp(vDistance / 5.0, 0.0, 1.0));
  gl_FragColor = vec4(color, alpha * 0.8);
}
```

**Interactividad:**
- `onPointerMove`: Las partículas más cercanas al cursor se repelen suavemente (radio de influencia: 1.2 unidades)
- `scroll`: Al scrollear, `opacity` de todo el canvas disminuye de 1 → 0 entre 0% y 30% del viewport height

**Post-processing (solo HIGH):**
```javascript
// EffectComposer con Bloom sutil
import { EffectComposer, Bloom } from '@react-three/postprocessing'
<EffectComposer>
  <Bloom luminanceThreshold={0.3} intensity={0.6} radius={0.4} />
</EffectComposer>
```

| Tier | Partículas | Post-processing | DPR | FPS Target |
| :--- | :--------- | :-------------- | :-- | :--------- |
| HIGH | 6.000 | Bloom 0.6 | `[1, 2]` | 60 fps |
| MEDIUM | 2.000 | Ninguno | `[1, 1]` | 30 fps |
| LOW | — | — | — | Fallback CSS |

**Fallback CSS (LOW):**
```css
.hero-bg-fallback {
  background: 
    radial-gradient(ellipse at 70% 50%, rgba(37,99,235,0.12) 0%, transparent 60%),
    linear-gradient(135deg, #0B1E2D 0%, #0F2A45 50%, #162F4A 100%);
  animation: morphGlow 8s ease-in-out infinite alternate;
}

@keyframes morphGlow {
  0%   { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
```

---

#### Escena 2: "Cisterna de Acero" — Sección Propuesta de Valor

**Concepto Visual:**
Un toro (Torus) o icosaedro de alta resolución renderizado con material de acero inoxidable (metalness=1, roughness=0.05, env map). Flota suavemente en el centro derecho de la sección, rotando lentamente sobre el eje Y. Al hacer hover sobre cada card de diferenciador, la geometría cambia de color de acento con un flash suave. Representa la cisterna y el acero quirúrgico que diferencia a la empresa.

**Detalles Three.js:**
```javascript
// src/components/three/scenes/SteelGeometryScene.jsx
import { useRef } from '@react-three/fiber'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, MeshReflectorMaterial } from '@react-three/drei'

function SteelTorus({ activeCard }) {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.15
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
  })
  
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.8, 0.6, 64, 128]} />
      <meshStandardMaterial
        metalness={1}
        roughness={0.05}
        color={activeCard !== null ? '#2563EB' : '#A8B8C8'}
        envMapIntensity={2}
      />
    </mesh>
  )
}
```

**Environment map:** `<Environment preset="warehouse" />` (HDRI de interiores industriales — coherente con el sector).

| Tier | Geometría | Resolución | Env Map | Animación |
| :--- | :-------- | :--------- | :------ | :-------- |
| HIGH | TorusGeometry 64×128 segmentos | DPR 2 | Warehouse HDRI | Rotación suave + respuesta a hover de cards |
| MEDIUM | TorusGeometry 32×64 segmentos | DPR 1 | Preset comprimido | Solo rotación Y |
| LOW | SVG estático de geometría (stroke animation CSS) | — | — | CSS rotate keyframe |

---

#### Escena 3: "Red de Cobertura" — Sección Contacto

**Concepto Visual:**
Campo de partículas dispersas formando el contorno aproximado del mapa de Perú, con nodos brillantes en las ciudades de operación (Cajamarca, Lima, Arequipa, Trujillo). Las líneas entre nodos pulsan suavemente representando las rutas activas. Simple y efectivo — comunica cobertura geográfica de forma visual e impactante.

**Detalles Three.js:**
```javascript
// src/components/three/scenes/CoverageMapScene.jsx
// Nodos de ciudades (coordenadas normalizadas del mapa Perú)
const CITIES = [
  { name: 'Lima',      x: -0.15, y: -0.35, z: 0, primary: true  },
  { name: 'Cajamarca', x: -0.25, y:  0.35, z: 0, primary: true  },
  { name: 'Arequipa',  x: -0.05, y: -0.65, z: 0, primary: true  },
  { name: 'Trujillo',  x: -0.30, y:  0.10, z: 0, primary: false },
]

// Lines entre nodos: TubeGeometry sobre CatmullRomCurve3
// Nodo primario: esfera de 0.08 radio con MeshStandardMaterial glow
// Nodo secundario: esfera de 0.05 radio
// Líneas: color #2563EB, opacity animada entre 0.3 y 0.8
```

| Tier | Implementación |
| :--- | :------------- |
| HIGH | Escena 3D completa con nodos, líneas animadas y partículas de fondo |
| MEDIUM | Solo nodos y líneas estáticas, sin partículas |
| LOW | SVG animado del mapa de Perú con puntos CSS animados |

---

### 5.3 Animaciones de Scroll (Framer Motion + GSAP ScrollTrigger)

| Sección | Tipo de Animación | Trigger | Descripción técnica |
| :------ | :---------------- | :------ | :------------------ |
| **Propuesta de Valor** | Stagger cards entrance | `IntersectionObserver` 20% visible | 6 cards entran con `fadeInUp` + `staggerChildren(0.1s)` |
| **Servicios** | Stagger grid cards | `IntersectionObserver` 10% visible | 4 cards con delay escalonado 0.15s |
| **Proceso / Timeline** | Stroke SVG + step reveal | `ScrollTrigger scrub: true` | SVG stroke se dibuja mientras el usuario scrollea; cada step aparece en su momento |
| **Certificaciones** | Flip card reveal | `IntersectionObserver` 30% visible | Badges aparecen con `scale(0.8) → scale(1)` + opacity |
| **Métricas** | Count-up animado | `IntersectionObserver` 50% visible | `countUp(0, valor, duration)` — solo dispara una vez |
| **Galería** | Row-by-row reveal | `IntersectionObserver` 10% visible | Filas de imágenes con `fadeInUp` escalonado |
| **Contacto** | Split entrance | `IntersectionObserver` 20% visible | Bloque izquierdo desde -40px X, bloque derecho desde +40px X |
| **Todas las secciones** | Parallax suave labels | `GSAP ScrollTrigger` | Labels de sección se mueven 20% más lento que el scroll |

**Implementación ScrollTrigger para el proceso (timeline):**
```javascript
// src/components/organisms/ProcesoSection.jsx
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

useEffect(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#proceso-section',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
    }
  })
  
  // Dibuja la línea vertical del timeline progresivamente
  tl.to('.timeline-stroke', { strokeDashoffset: 0, duration: 1 })
  
  // Cada step aparece en su punto del scroll
  steps.forEach((_, i) => {
    tl.from(`.step-${i}`, { opacity: 0, x: -20, duration: 0.3 }, i * 0.15)
  })
}, [])
```

---

### 5.4 Micro-interacciones

| Elemento | Interacción | Animación | Implementación |
| :------- | :---------- | :-------- | :------------- |
| **Botón WhatsApp flotante** | Idle | Pulse ring verde cada 3s | CSS `@keyframes pulseGlow` |
| **Botón WhatsApp flotante** | Hover | Scale 1.1 + glow intensificado | CSS `transition: transform 0.2s` |
| **Botón CTA principal** | Hover | `translateY(-2px)` + shimmer sweep diagonal | CSS `linear-gradient` animado |
| **Card de servicio** | Hover | Tilt 3D con `perspective: 1000px` (hasta ±8°) | JavaScript `mousemove` + `transform: rotateX() rotateY()` |
| **Card de servicio** | Hover | Border glow azul eléctrico | CSS `box-shadow: var(--shadow-glow-blue)` |
| **Badge de certificación** | Hover | Scale 1.05 + border color change | CSS transition |
| **Navbar** | Scroll >80px | Glassmorphism blur aparece | CSS `backdrop-filter` con `transition: 0.4s` |
| **Step del proceso** | Viewport entry | Circle del step: scale 0 → 1 con spring | Framer Motion `spring(stiffness:300, damping:20)` |
| **Counter de métrica** | Viewport entry | Count-up con easing ease-out | `requestAnimationFrame` loop |
| **Íconos de diferenciadores** | Viewport entry | Scale 0 → 1.1 → 1 (overshoot) | Framer Motion `spring` |
| **Input de formulario** | Focus | Border color change + label float | CSS `:focus-within` + `transform` en label |
| **Form submit** | Click | Button → spinner → checkmark | Framer Motion `AnimatePresence` |
| **Imagen de galería** | Hover | Scale 1.05 + overlay con ícono zoom | CSS `transform` + `opacity` en overlay |

---

### 5.5 Composición de Canvas y Performance

```jsx
// src/components/three/scenes/HeroParticleScene.jsx — estructura base
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { useDeviceTier } from '@/hooks/useDeviceTier'

export function HeroScene() {
  const tier = useDeviceTier()
  
  // Tier LOW: no cargar Three.js en absoluto
  if (tier === 'LOW') return <HeroFallbackCSS />
  
  const config = TIER_CONFIG[tier]
  
  return (
    <Canvas
      dpr={config.dpr}
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{
        antialias: tier === 'HIGH',
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ParticleField count={config.count} size={config.size} />
        {config.bloom && (
          <EffectComposer>
            <Bloom luminanceThreshold={0.3} intensity={0.6} radius={0.4} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  )
}
```

**Reglas de performance obligatorias:**
1. `useFrame` solo para animaciones que requieren rAF — no para lógica de estado
2. `useMemo` para todas las geometrías y materiales
3. `dispose()` de geometrías y materiales en el cleanup de `useEffect`
4. Shaders en archivos `.glsl` separados, importados con `?raw`
5. Canvas del hero: `position: absolute`, separado del DOM React para evitar re-renders
6. `<Suspense>` obligatorio en todas las escenas — fallback: `null` (el canvas permanece invisible hasta carga)
7. Lazy import del Canvas: `const HeroScene = lazy(() => import('./three/scenes/HeroScene'))`
