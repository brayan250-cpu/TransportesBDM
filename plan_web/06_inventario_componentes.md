# Plan Web — BD & Mariafe Transportes
## 6. Inventario de Componentes React

---

### 6.1 Atoms (Elementos base reutilizables)

| Componente | Archivo | Props Clave | Descripción |
| :--------- | :------ | :---------- | :---------- |
| `GlowButton` | `atoms/GlowButton.jsx` | `variant: 'whatsapp'\|'primary'\|'ghost'`, `size: 'sm'\|'md'\|'lg'`, `href`, `onClick`, `icon`, `children` | Botón principal con efecto glow animado. Variante `whatsapp` usa gradiente verde y pulse animation. |
| `SectionLabel` | `atoms/SectionLabel.jsx` | `children`, `color: 'blue'\|'green'\|'steel'` | Etiqueta pequeña uppercase con letra-spacing que aparece sobre cada H2. Ej: "Nuestros servicios" |
| `AnimatedCounter` | `atoms/AnimatedCounter.jsx` | `value: number`, `suffix: string`, `prefix: string`, `duration: number`, `decimals: number` | Counter animado con count-up al entrar en viewport. Usa IntersectionObserver internamente. |
| `GradientText` | `atoms/GradientText.jsx` | `gradient: string`, `as: 'h1'\|'h2'\|'span'`, `children` | Texto con gradiente CSS animado. Para headlines de impacto. |
| `CertBadge` | `atoms/CertBadge.jsx` | `label`, `icon`, `description`, `size: 'sm'\|'md'` | Badge pill de certificación/normativa con estilo acero glassmorphism. |
| `StepNumber` | `atoms/StepNumber.jsx` | `number`, `active: boolean` | Círculo numerado para el proceso timeline. Animación scale-in al aparecer. |
| `IconBox` | `atoms/IconBox.jsx` | `icon: ReactNode`, `size: 'sm'\|'md'\|'lg'`, `color` | Contenedor cuadrado/circular con fondo glassmorphism para íconos de diferenciadores. |
| `Divider` | `atoms/Divider.jsx` | `color`, `animated: boolean` | Línea separadora con gradiente. Versión animada para la sección de métricas. |
| `Tag` | `atoms/Tag.jsx` | `children`, `color` | Chip/tag pequeño para categorías de galería. |
| `WhatsAppLink` | `atoms/WhatsAppLink.jsx` | `phone`, `message`, `children`, `className` | Anchor con href de WhatsApp preformateado. Maneja encoding de URL automáticamente. |

---

### 6.2 Molecules (Combinaciones de 2–4 átomos)

| Componente | Archivo | Props Clave | Descripción |
| :--------- | :------ | :---------- | :---------- |
| `DifferentiatorCard` | `molecules/DifferentiatorCard.jsx` | `icon`, `title`, `description`, `index: number` | Card de diferenciador con ícono grande, título y descripción. Hover: border glow + escala suave. Stagger entry basado en `index`. |
| `ServiceCard` | `molecules/ServiceCard.jsx` | `title`, `description`, `features: string[]`, `badge`, `cta`, `href`, `index` | Tarjeta de servicio con lista de features, badge optativo y CTA. Hover 3D tilt via `onMouseMove`. |
| `ProcessStep` | `molecules/ProcessStep.jsx` | `number`, `title`, `description`, `isLast: boolean` | Un paso del proceso timeline. Incluye StepNumber + línea conectora + contenido de texto. |
| `CertificationItem` | `molecules/CertificationItem.jsx` | `entity`, `norm`, `description`, `year` | Fila de tabla de normativa: entidad emisora + número de norma + descripción. |
| `MetricBlock` | `molecules/MetricBlock.jsx` | `value`, `suffix`, `prefix`, `label`, `description`, `index` | Bloque de métrica con AnimatedCounter grande + label descriptivo. |
| `GalleryThumb` | `molecules/GalleryThumb.jsx` | `src`, `alt`, `category`, `onClick` | Miniatura de galería con overlay en hover + ícono de zoom. |
| `ContactChannel` | `molecules/ContactChannel.jsx` | `type: 'whatsapp'\|'phone'\|'email'`, `value`, `label` | Elemento de canal de contacto con ícono, label y acción (href). |
| `NavItem` | `molecules/NavItem.jsx` | `href`, `label`, `active: boolean` | Ítem del menú de navegación con animación de subrayado en hover/active. |
| `TrustBadge` | `molecules/TrustBadge.jsx` | `items: string[]` | Fila horizontal de badges de confianza (MINAGRI, DIGESA, AISI, CIP). Aparece bajo CTAs del hero. |
| `SocialLink` | `molecules/SocialLink.jsx` | `platform: 'facebook'\|'instagram'\|'linkedin'`, `href` | Ícono de red social con hover animado para el footer. |

---

### 6.3 Organisms (Secciones completas)

| Componente | Archivo | Animación 3D | Animaciones CSS/JS | Descripción |
| :--------- | :------ | :----------- | :----------------- | :---------- |
| `Navbar` | `organisms/Navbar.jsx` | No | Glassmorphism al scroll, hamburger mobile | Navbar sticky con logo, links y botón WhatsApp. Detecta scroll para cambiar estilo. Incluye menú hamburguesa mobile (fullscreen overlay). |
| `HeroSection` | `organisms/HeroSection.jsx` | ✅ Escena de partículas (HeroParticleScene) | fadeInLeft para texto, fadeInRight para canvas | Sección hero full-screen. Split layout desktop. Stack mobile. Incluye H1, subheadline, 2 CTAs, TrustBadge. Canvas 3D lazy-loaded. |
| `PropuestaSection` | `organisms/PropuestaSection.jsx` | ✅ Geometría acero flotante (SteelGeometryScene) | Stagger cards (0.1s delay) | Grid de 6 DifferentiatorCards con headline introductorio y CTA final. |
| `ServiciosSection` | `organisms/ServiciosSection.jsx` | No | Stagger cards (0.15s delay) | Grid de 4 ServiceCards con hover 3D tilt. Incluye CTA de sección. |
| `ProcesoSection` | `organisms/ProcesoSection.jsx` | No | GSAP ScrollTrigger timeline SVG | 6 ProcessStep en timeline vertical con stroke animation progresiva. |
| `CertificacionesSection` | `organisms/CertificacionesSection.jsx` | No | Flip card + badge reveal al scroll | Grid de CertBadge + tabla de normativas + bloque de especificaciones del acero. Fondo claro para contraste. |
| `MetricasSection` | `organisms/MetricasSection.jsx` | No | AnimatedCounter al viewport entry | Fila de 4–5 MetricBlocks sobre fondo oscuro elevado. Línea decorativa con gradiente verde. |
| `GaleriaSection` | `organisms/GaleriaSection.jsx` | No | Row-by-row reveal + lightbox | Masonry grid con filtros de categoría (Todas, Cisternas, CIP, En ruta, Equipo). Lightbox al click. |
| `ContactoSection` | `organisms/ContactoSection.jsx` | ✅ Mapa de cobertura 3D (CoverageMapScene) | Split entrance desde lados opuestos | Layout split: canal WhatsApp + datos izquierda / formulario derecha. Escena 3D de fondo. |
| `Footer` | `organisms/Footer.jsx` | No | Fade-in simple | Logo, links, datos de contacto, redes sociales, copyright, política de privacidad. |
| `WhatsAppFloat` | `organisms/WhatsAppFloat.jsx` | No | Pulse animation idle, scale hover | Botón flotante WhatsApp fijo en esquina inferior derecha. z-index: 9999. |

---

### 6.4 Three.js / R3F Components (src/components/three/)

| Componente | Archivo | Tier | Descripción |
| :--------- | :------ | :--- | :---------- |
| `HeroParticleScene` | `three/scenes/HeroParticleScene.jsx` | HIGH + MEDIUM | Campo de partículas con shader personalizado, reactivo al mouse |
| `HeroFallbackCSS` | `three/scenes/HeroFallbackCSS.jsx` | LOW | Reemplazo CSS con gradiente animado + SVG blur blob |
| `SteelGeometryScene` | `three/scenes/SteelGeometryScene.jsx` | HIGH + MEDIUM | Torus con material metálico + Environment warehouse |
| `SteelFallbackCSS` | `three/scenes/SteelFallbackCSS.jsx` | LOW | SVG animado de geometría con CSS stroke animation |
| `CoverageMapScene` | `three/scenes/CoverageMapScene.jsx` | HIGH + MEDIUM | Nodos 3D de ciudades con líneas animadas |
| `CoverageMapSVG` | `three/scenes/CoverageMapSVG.jsx` | LOW | SVG estático del mapa Perú con dots CSS animados |
| `ParticleField` | `three/utils/ParticleField.jsx` | — | Componente reutilizable de campo de partículas con config por tier |
| `useMouseParallax` | `three/utils/useMouseParallax.js` | — | Hook que convierte coordenadas del mouse a rotación de cámara suave |
| `useScrollOpacity` | `three/utils/useScrollOpacity.js` | — | Hook que reduce opacity del canvas al scrollear fuera del hero |

---

### 6.5 Hooks Personalizados (src/hooks/)

| Hook | Archivo | Descripción |
| :--- | :------ | :---------- |
| `useDeviceTier` | `hooks/useDeviceTier.js` | Detecta tier HIGH/MEDIUM/LOW basado en RAM, cores, DPR, prefers-reduced-motion |
| `useScrollProgress` | `hooks/useScrollProgress.js` | Devuelve el progreso de scroll de 0 a 1 para la página completa |
| `useIntersectionObserver` | `hooks/useIntersectionObserver.js` | Wrapper de IntersectionObserver con threshold y rootMargin configurables |
| `useNavbarScroll` | `hooks/useNavbarScroll.js` | Detecta si el scroll supera N px para cambiar estilo del navbar |
| `useCountUp` | `hooks/useCountUp.js` | Anima un número de 0 a target con easing personalizado al activarse |
| `useMousePosition` | `hooks/useMousePosition.js` | Coordenadas del mouse normalizadas (-1 a 1) para el parallax 3D |
| `useGalleryFilter` | `hooks/useGalleryFilter.js` | Lógica de filtrado de galería por categoría con transición de opacidad |
| `useFormSubmit` | `hooks/useFormSubmit.js` | Maneja submit del formulario de contacto: validación, fetch, estados |

---

### 6.6 Context Providers (src/context/)

| Provider | Archivo | Descripción |
| :------- | :------ | :---------- |
| `DeviceTierProvider` | `context/DeviceTierContext.jsx` | Provee el tier detectado a todos los componentes via `useContext`. Detecta una sola vez al montar. |
| `GalleryProvider` | `context/GalleryContext.jsx` | Estado del lightbox (imagen activa, categoría activa) para la galería. |

---

### 6.7 Templates / Layouts

| Componente | Archivo | Descripción |
| :--------- | :------ | :---------- |
| `MainLayout` | `MainLayout.jsx` | Layout principal: Navbar (sticky) + `{children}` + Footer + WhatsAppFloat + ScrollProgress bar |
| `App` | `App.jsx` | Composición de todas las secciones en orden. Envuelto en `DeviceTierProvider`. |

---

### 6.8 Data Layer (src/data/)

| Archivo | Contenido |
| :------ | :-------- |
| `content.js` | Todo el copy de la web: headlines, descripciones, CTAs, microcopy — editable sin tocar JSX |
| `services.js` | Array de objetos de servicios: `{ id, title, description, features, badge, cta }` |
| `differentiators.js` | Array de diferenciadores: `{ id, icon, title, description }` |
| `process-steps.js` | Array de pasos: `{ number, title, description }` |
| `certifications.js` | Array de normativas: `{ entity, norm, description, year }` |
| `metrics.js` | Array de métricas: `{ value, suffix, prefix, label, description }` |
| `gallery.js` | Array de imágenes: `{ id, src, alt, category, width, height }` |
| `contact.js` | Datos de contacto: whatsapp, phone, email, zones, whatsappMessage |

> **Regla crítica:** Todo el copy y los datos van en `src/data/`. Los componentes React nunca tienen strings hardcodeados — solo importan de `data/`. Esto facilita actualizaciones sin tocar el código.
