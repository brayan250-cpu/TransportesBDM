# 🚀 Business Web Generator — Webs Informativas de Alto Impacto con React & 3D

Sistema de agentes de IA para construir webs informativas extraordinarias para negocios: visualmente impactantes, con animaciones 3D complejas, completamente adaptativas según el dispositivo y orientadas a convertir visitantes en clientes.

> **Estándar de calidad objetivo:** Awwwards · Webby Awards · Sitio del Año

---

## ¿Qué genera este sistema?

Una **Single Page Application en React** que muestra todo lo que puede hacer tu empresa y por qué los clientes deberían elegirte. No una web normal. Una experiencia.

### Características de la web generada
- 🎨 **Diseño personalizado** — Design system único derivado de la identidad de tu marca
- 🌐 **Animaciones 3D complejas** — Escenas interactivas con Three.js / React Three Fiber (partículas, geometrías, shaders GLSL, post-processing)
- 📱 **Adaptativo por dispositivo** — Tres niveles (HIGH / MEDIUM / LOW) detectados automáticamente según RAM, GPU y cores del visitante
- ⚡ **Rendimiento optimizado** — Bundle <200KB, lazy loading de escenas 3D, target 60fps en HIGH / 30fps en MEDIUM
- ♿ **Accesible** — `prefers-reduced-motion`, `aria-hidden` en Canvas, estructura semántica
- 📝 **Copy persuasivo** — Copywriting orientado a conversión generado desde el brief del negocio

---

## PASO 0: Prerequisitos

Configurar los siguientes MCP Servers en VS Code (`.vscode/mcp.json`):

```json
{
  "servers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"],
      "type": "stdio"
    },
    "imageReader": {
      "command": "npx",
      "args": ["-y", "mcp-image-extractor@latest"]
    }
  }
}
```

> **Nota OCR:** Para extraer texto de imágenes en documentos, instala Tesseract: https://github.com/UB-Mannheim/tesseract/wiki  
> Luego actualiza la ruta en `.github/agents/Business_Extractor.agent.md`

---

## PASO 1: Extraer Información del Negocio

Ejecutar el agente **`Business_Extractor`** para procesar los documentos o brief del cliente y construir el `brief_web.md`.

**Ejemplo de prompt:**
```
Extraer información del negocio de "presentacion_empresa.pdf" y "servicios_catalogo.docx"
```

El agente genera:
- `brief_web.md` — Identidad de marca, propuesta de valor, servicios, métricas, testimonios, equipo y dirección visual
- `imagenes_marca.md` — Análisis visual de logos, fotos y assets de marca
- `checklist_contenido.md` — Elementos pendientes de confirmar con el cliente

---

## PASO 2: Planificar la Web

Ejecutar el agente **`Web_Planner`** para transformar el brief en un plan completo de diseño e implementación.

**Ejemplo de prompt:**
```
Generar el plan completo de la web para [Nombre de la empresa]. 
La web debe transmitir modernidad y confianza, orientada a empresas B2B del sector tecnológico.
```

El agente genera en la carpeta `plan_web/`:
| Archivo | Contenido |
| :------ | :-------- |
| `01_estrategia_concepto_creativo.md` | Big Idea, arco narrativo, tono visual |
| `02_arquitectura_web.md` | Mapa de secciones, navegación, layouts |
| `03_copywriting.md` | Copy completo y final para cada sección |
| `04_sistema_diseno.md` | Paleta, tipografía, tokens, gradientes |
| `05_animaciones_3d.md` | Especificaciones técnicas de escenas Three.js |
| `06_inventario_componentes.md` | Todos los componentes React a implementar |
| `07_estructura_archivos.md` | Árbol de carpetas del proyecto |
| `08_guia_implementacion.md` | Stack, orden de implementación, reglas |

---

## PASO 3: Construir la Web

Ejecutar el agente **`Web_Builder`** para implementar la web completa en React.

**Ejemplo de prompt:**
```
Implementar la web de [Nombre de la empresa] siguiendo el plan generado. 
Comenzar por la Fase 0 (setup) y continuar hasta la Fase 6 (verificación final).
```

El agente construye el proyecto React completo con:
- Setup de Vite + React + Tailwind + Three.js + Framer Motion + GSAP
- Design tokens CSS globales
- Hook `useDeviceTier` para rendimiento adaptativo
- Todas las secciones implementadas con copy real y animaciones reales
- Escenas 3D con fallbacks para dispositivos de baja gama
- Verificación en Chrome DevTools en cada componente

---

## PASO 4: Revisar y Ajustar (Opcional)

Si hay correcciones de copy, cambios de diseño o ajustes de animaciones:

**Ejemplo de prompt:**
```
Revisar la sección Hero: el headline debe ser más directo y el efecto de partículas 
más intenso en dispositivos HIGH. También cambiar el color de acento a #6366F1.
```

---

## PASO 5: Build de Producción

```powershell
cd [nombre-empresa]-web
npm run build
npm run preview
```

Para análisis del bundle:
```powershell
npx vite-bundle-visualizer
```

---

## Arquitectura del Sistema de Agentes

```
📄 Documentos del cliente
        │
        ▼
┌─────────────────────┐
│  Business_Extractor  │  — Extrae información del negocio
│                      │    y analiza assets visuales
└──────────┬──────────┘
           │ brief_web.md
           │ imagenes_marca.md
           ▼
┌─────────────────────┐
│     Web_Planner      │  — Define el plan creativo, diseño,
│                      │    copy, animaciones 3D y arquitectura
└──────────┬──────────┘
           │ plan_web/*.md
           ▼
┌─────────────────────┐
│     Web_Builder      │  — Implementa la web React completa
│                      │    con animaciones 3D adaptativas
└──────────┬──────────┘
           │
           ▼
    🌐 Web producción
```

---

## Estructura de Secciones Típicas de la Web Generada

| # | Sección | Propósito | Animación |
| :- | :------ | :-------- | :-------- |
| 1 | **Hero** | Primera impresión, captar atención | Escena 3D interactiva (partículas / geometría) |
| 2 | **Propuesta de Valor** | Por qué elegirnos | Texto animado + geometría flotante |
| 3 | **Servicios** | Qué hacemos | Grid con hover 3D tilt + stagger scroll |
| 4 | **Cómo Trabajamos** | Proceso y metodología | Timeline con stroke animation |
| 5 | **Métricas de Impacto** | Credibilidad con números | Animated counters al scroll |
| 6 | **Testimonios** | Prueba social | Carrusel 3D o glassmorphism cards |
| 7 | **Clientes / Partners** | Confianza por asociación | Marquee infinito de logos |
| 8 | **Equipo** | Factor humano | Grid con reveal animado |
| 9 | **Contacto / CTA Final** | Conversión | Escena 3D + formulario |

---

## Niveles de Calidad Adaptativa (Device Tiers)

| Tier | Condición de Detección | Experiencia |
| :--- | :--------------------- | :---------- |
| **HIGH** | RAM ≥ 6GB · Cores ≥ 8 · DPR ≥ 2 · Desktop | Escenas 3D completas · Post-processing (Bloom, ChromaticAberration) · Custom cursor con partículas · 60 FPS |
| **MEDIUM** | RAM ≥ 3GB · Cores ≥ 4 | Escenas 3D reducidas · Sin post-processing · DPR limitado a 1 · 30 FPS |
| **LOW** | Resto + `prefers-reduced-motion` | Fallbacks CSS (gradientes animados + SVG) · Sin Three.js · Sin animaciones de scroll complejas |

---

## Stack Tecnológico

| Categoría | Tecnología | Versión |
| :-------- | :--------- | :------ |
| Framework | React | ^18.3 |
| Build Tool | Vite | ^5.x |
| 3D Engine | Three.js + @react-three/fiber | ^8.17 |
| 3D Helpers | @react-three/drei | ^9.x |
| Post-processing | @react-three/postprocessing | ^2.x |
| Animación UI | Framer Motion | ^11.x |
| Animación avanzada | GSAP + ScrollTrigger | ^3.12 |
| Estilos | Tailwind CSS | ^3.4 |

---

**Nota:** Se recomienda utilizar **Claude Sonnet 4.5 o superior** para ejecutar todos los agentes, especialmente el `Web_Builder` que requiere mantener contexto de múltiples archivos simultáneamente.