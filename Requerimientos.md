# 🥛 BD & Mariafe Transportes — Página Web Corporativa
### Documento de Requerimientos de Sitio Web (SRS Web)
**Versión:** 1.0.0  
**Fecha:** Abril 2026  
**Clasificación:** Uso Interno  
**Propósito:** Definir los requerimientos completos para el desarrollo del sitio web informativo de BD & Mariafe Transportes, empresa especializada en el transporte de leche fresca en cisternas de acero quirúrgico inyectado.

---

## 📌 Tabla de Contenido

1. [Visión General del Proyecto](#1-visión-general-del-proyecto)
2. [Análisis del Sector y Competencia](#2-análisis-del-sector-y-competencia)
3. [Público Objetivo](#3-público-objetivo)
4. [Requerimientos Funcionales](#4-requerimientos-funcionales)
5. [Requerimientos No Funcionales](#5-requerimientos-no-funcionales)
6. [Estructura y Contenido del Sitio](#6-estructura-y-contenido-del-sitio)
7. [Diseño y Experiencia de Usuario (UI/UX)](#7-diseño-y-experiencia-de-usuario-uiux)
8. [Botón de Contacto WhatsApp](#8-botón-de-contacto-whatsapp)
9. [Cumplimiento Normativo y Certificaciones](#9-cumplimiento-normativo-y-certificaciones)
10. [Requerimientos Técnicos](#10-requerimientos-técnicos)
11. [SEO y Posicionamiento Digital](#11-seo-y-posicionamiento-digital)
12. [Glosario](#12-glosario)

---

## 1. Visión General del Proyecto

### 1.1 Descripción de la Empresa

**BD & Mariafe Transportes** es una empresa peruana especializada en el transporte de leche fresca a granel, utilizando cisternas de **acero quirúrgico inyectado (acero inoxidable grado sanitario 304/316L)**. La empresa se distingue por operar bajo estrictos estándares biológicos e higienico-sanitarios, empleando artículos certificados para la limpieza y desinfección de cisternas, garantizando la inocuidad de cada lote transportado desde los centros de acopio hasta las plantas procesadoras.

### 1.2 Objetivo del Sitio Web

El sitio web de BD & Mariafe Transportes es un **sitio informativo y de captación de clientes**. No requiere funcionalidades de comercio electrónico, login de usuarios ni plataformas de gestión. Su objetivo es:

- Presentar profesionalmente los servicios de la empresa.
- Transmitir confianza a ganaderos, cooperativas y plantas procesadoras (como Gloria, Laive, Nestlé).
- Destacar las certificaciones sanitarias, los estándares de higiene y la calidad del equipo.
- Facilitar el contacto inmediato vía **botón directo a WhatsApp**.
- Posicionarse en buscadores (Google) frente a la competencia local.

### 1.3 Tipo de Sitio

> ✅ Sitio web **informativo de una sola empresa** (no plataforma, no e-commerce, no portal de gestión).

| Característica | Detalle |
|---|---|
| Tipo | Landing page / Sitio corporativo informativo |
| Idioma | Español (Perú) |
| Páginas estimadas | 5–7 secciones en una sola página o multi-página simple |
| Integración principal | Botón WhatsApp directo |
| Dispositivos | Responsive (móvil, tablet, desktop) |

---

## 2. Análisis del Sector y Competencia

### 2.1 Contexto del Mercado Lácteo en Perú

El Perú cuenta con un mercado lácteo altamente concentrado: **Gloria, Nestlé y Laive** controlan más del 90% del mercado, con plantas de acopio en Cajamarca, Trujillo, Huachipa, Arequipa y otras regiones. Estas empresas demandan constantemente servicios de transporte especializado de leche cruda desde las zonas de producción ganadera hasta sus plantas procesadoras.

La **leche cruda transportada en cisterna** es uno de los eslabones más críticos y delicados de la cadena láctea peruana. Las normativas del MINAGRI (DS Nº 7-2017-MINAGRI) y la Directiva Sanitaria Nº 147-MINSA/DIGESA-2023 exigen trazabilidad, control de temperatura y protocolos rigurosos de limpieza a todos los transportistas.

### 2.2 Competencia Identificada

| Empresa / Tipo | Fortaleza | Debilidad (oportunidad para BD & Mariafe) |
|---|---|---|
| **Transportistas informales** (cántaras, vehículos no certificados) | Precio bajo | Sin certificación sanitaria, sin trazabilidad, sin control de temperatura |
| **Operadores logísticos generales** (Ransa, Dinet, T-Logic) | Gran flota, cobertura nacional | No especializados en productos lácteos ni en cisternas sanitarias |
| **Transportistas de cisterna sin estándar biológico** | Cuentan con cisternas | Sin certificación de limpieza con productos homologados, sin acero quirúrgico |
| **Flotas propias de Gloria / Laive** | Alta eficiencia interna | Capacidad limitada; subcontratan servicios externos en temporadas altas |

### 2.3 Ventajas Competitivas de BD & Mariafe

La propuesta de valor de BD & Mariafe se construye sobre pilares que la mayoría de competidores locales no pueden ofrecer:

- **Cisternas de acero quirúrgico inyectado** (grado 304/316L): más resistentes, más higiénicas y 100% aptas para contacto con alimentos.
- **Limpieza con productos certificados**: uso de detergentes y desinfectantes homologados para industria láctea (CIP — Clean-In-Place), con registros de cada lavado.
- **Cumplimiento biológico estricto**: protocolos HACCP aplicados al transporte, verificación de parámetros de la leche antes de la carga.
- **Trazabilidad de cada lote**: registros de temperatura, hora de carga/descarga, conductor responsable y documentación sanitaria.
- **Confiabilidad y puntualidad**: factor crítico para las plantas procesadoras que operan con ventanas horarias de recepción muy ajustadas.

---

## 3. Público Objetivo

El sitio debe estar diseñado para comunicarse con tres tipos de visitantes:

### 3.1 Clientes Potenciales Directos

- **Ganaderos y cooperativas lecheras**: productores de leche fresca que necesitan un transportista confiable para llevar su producción a la planta.
- **Plantas procesadoras y acopiadoras**: empresas como Gloria, Laive, Nestlé o cooperativas regionales que subcontratan transporte.
- **Intermediarios y brókers logísticos**: que buscan proveedores certificados para contratos con empresas grandes.

### 3.2 Perfil del Visitante Típico

| Atributo | Detalle |
|---|---|
| Dispositivo más usado | Smartphone (más del 70% del tráfico esperado) |
| Canal de llegada | Google, WhatsApp, recomendación boca a boca |
| Lo que más busca | Confianza, certificación sanitaria, precio y disponibilidad |
| Acción esperada en el sitio | Llamar por WhatsApp o dejar sus datos de contacto |

---

## 4. Requerimientos Funcionales

Los siguientes requerimientos definen las funcionalidades que **el sitio web debe cumplir**.

### RF-001 — Botón de WhatsApp permanente y visible
El sitio debe incluir un botón flotante de WhatsApp, visible en todas las secciones del sitio, tanto en desktop como en móvil, que abra directamente una conversación con el número de la empresa con un mensaje predefinido. Ver sección 8 para detalle completo.

### RF-002 — Formulario de contacto básico
El sitio debe incluir un formulario de contacto con los campos: Nombre, Empresa/Ganadería, Teléfono, Región/Provincia y Mensaje. Los datos deben ser enviados al correo electrónico de la empresa.

### RF-003 — Sección de servicios clara y detallada
El sitio debe mostrar los servicios ofrecidos con descripción, imágenes referenciales y los diferenciadores clave (acero quirúrgico, limpieza certificada, trazabilidad).

### RF-004 — Sección de certificaciones y estándares
El sitio debe incluir una sección dedicada a mostrar las certificaciones, normativas cumplidas y los productos certificados usados para la limpieza de cisternas.

### RF-005 — Galería fotográfica / visual
El sitio debe mostrar imágenes o visuales de las cisternas, el proceso de limpieza, y el equipo de la empresa para generar confianza visual.

### RF-006 — Sección "¿Por qué elegirnos?"
Sección comparativa o de argumentos de venta que diferencie a BD & Mariafe de la competencia informal y de transportistas sin certificación.

### RF-007 — Información de contacto siempre visible
Teléfono, WhatsApp, correo electrónico y zona de operaciones deben aparecer en el encabezado y/o pie de página en todas las páginas.

### RF-008 — Mapa o zona de cobertura
Indicar visualmente las regiones o rutas donde opera la empresa (por ejemplo: Cajamarca – Lima, Arequipa – Lima, etc.).

### RF-009 — Sección "Nosotros"
Breve historia de la empresa, valores (puntualidad, higiene, responsabilidad) y el compromiso con la cadena láctea peruana.

### RF-010 — Navegación simple y accesible
El menú de navegación debe ser claro, con no más de 6 secciones, y funcionar correctamente en móviles (menú hamburguesa).

---

## 5. Requerimientos No Funcionales

### RNF-001 — Rendimiento
El sitio debe cargar en menos de 3 segundos en conexión 4G desde Lima. Las imágenes deben estar optimizadas (WebP o comprimidas). Se debe apuntar a un puntaje de Google PageSpeed Insights ≥ 80 en móvil.

### RNF-002 — Diseño Responsive
El sitio debe verse y funcionar correctamente en: smartphones (desde 360px de ancho), tablets (768px) y desktop (1280px+).

### RNF-003 — Disponibilidad
El sitio debe estar disponible 24/7. Se recomienda hosting con uptime garantizado ≥ 99.5%.

### RNF-004 — Seguridad
El sitio debe contar obligatoriamente con certificado SSL (HTTPS). No debe almacenar datos sensibles en el frontend.

### RNF-005 — Mantenimiento sencillo
El sitio debe estar construido en un CMS o con código que permita actualizaciones de contenido (textos, imágenes, teléfonos) sin necesidad de un desarrollador. Se recomienda WordPress, Webflow o similar.

### RNF-006 — Sin funcionalidades complejas
El sitio es exclusivamente informativo. No requiere: registro de usuarios, pasarela de pagos, panel de administración de pedidos, ni integración GPS.

---

## 6. Estructura y Contenido del Sitio

### 6.1 Arquitectura de Páginas Recomendada

Se recomienda un sitio de **una sola página (One-Page)** con desplazamiento fluido entre secciones, más una página independiente de "Política de Privacidad" si se usa formulario. Esto facilita el mantenimiento y mejora la experiencia en móviles.

```
BD & Mariafe Web
│
├── [1] HERO / INICIO
│   └── Titular de impacto + botón WhatsApp + llamada a la acción
│
├── [2] NOSOTROS
│   └── Historia, misión, valores, equipo
│
├── [3] SERVICIOS
│   └── Transporte de leche fresca, cobertura, capacidad de cisternas
│
├── [4] ¿POR QUÉ ELEGIRNOS?
│   └── Acero quirúrgico, limpieza certificada, trazabilidad, puntualidad
│
├── [5] CERTIFICACIONES Y ESTÁNDARES
│   └── Normativas cumplidas, productos certificados de limpieza
│
├── [6] GALERÍA
│   └── Fotos de las cisternas, procesos, equipo humano
│
├── [7] CONTACTO
│   └── Formulario + WhatsApp + teléfono + correo + zona de operación
│
└── [FOOTER]
    └── Logo, teléfono, redes sociales, aviso legal
```

### 6.2 Contenido Recomendado por Sección

#### SECCIÓN 1 — HERO / INICIO
- **Titular sugerido:** *"Transportamos la frescura de tu leche con los más altos estándares sanitarios del Perú"*
- **Subtítulo:** *"Cisternas de acero quirúrgico inyectado • Limpieza certificada • Trazabilidad total"*
- **Botón principal:** `💬 Contáctanos por WhatsApp` (enlace directo)
- **Botón secundario:** `Conoce nuestros servicios ↓`
- Imagen de fondo: cisterna en ruta o proceso de carga de leche.

#### SECCIÓN 2 — NOSOTROS
- Historia de BD & Mariafe: origen, experiencia en el sector, compromiso.
- Misión: *"Garantizar el traslado seguro e higiénico de la leche fresca, preservando su calidad desde el origen hasta la planta."*
- Valores: Puntualidad · Higiene · Responsabilidad · Compromiso con el productor.
- Dato de impacto: años de experiencia, litros transportados, regiones atendidas.

#### SECCIÓN 3 — SERVICIOS
- **Transporte de leche fresca a granel** en cisternas de acero quirúrgico inyectado.
  - Capacidad: indicar litros por cisterna (ej.: 10,000 – 25,000 litros).
  - Temperatura controlada: leche cruda ≤ 6°C durante el trayecto.
  - Sellado con precintos de seguridad para cada carga.
- **Recojo en granja o centro de acopio**.
- **Rutas y cobertura regional**: indicar departamentos y plantas destino.
- **Registros y documentación sanitaria** incluidos en cada servicio.

#### SECCIÓN 4 — ¿POR QUÉ ELEGIRNOS?
Presentar en tarjetas visuales o íconos:

| ✅ Diferenciador | Descripción |
|---|---|
| 🔬 Acero quirúrgico inyectado | Cisternas 304/316L: el más alto estándar para contacto con alimentos, sin porosidades, sin riesgo de contaminación |
| 🧴 Limpieza con productos certificados | Usamos detergentes y desinfectantes homologados para industria láctea, con registro de cada lavado |
| 🌡️ Control de temperatura | Monitoreo continuo de la cadena de frío durante todo el trayecto |
| 📋 Trazabilidad completa | Cada lote documentado: hora de carga, temperatura, conductor, ruta, hora de descarga |
| ⚖️ Cumplimiento normativo | Operamos bajo DS Nº 7-2017-MINAGRI y Directiva Sanitaria Nº 147-MINSA/DIGESA |
| 🕐 Puntualidad garantizada | Cumplimos con las ventanas horarias de recepción de las plantas procesadoras |

#### SECCIÓN 5 — CERTIFICACIONES Y ESTÁNDARES
- **Normativas cumplidas:**
  - DS Nº 7-2017-MINAGRI: Reglamento de la Leche y Productos Lácteos (Perú).
  - Directiva Sanitaria Nº 147-MINSA/DIGESA-2023: Trazabilidad en alimentos procesados.
  - Principios Generales del Codex Alimentarius para productos lácteos.
  - Buenas Prácticas de Higiene (BPH) en transporte de alimentos.
- **Tipo de acero:** Inoxidable quirúrgico grado sanitario (AISI 304 / 316L), cumple con EHEDG (European Hygienic Engineering & Design Group).
- **Productos de limpieza:** Mencionar que se utilizan productos con ficha técnica y certificación para uso en industria alimentaria/láctea.
- **Sistema de lavado:** CIP (Clean-In-Place) con registro de cada operación.

#### SECCIÓN 6 — GALERÍA
- Fotos reales de las cisternas de la empresa.
- Proceso de limpieza y desinfección.
- Cisternas en ruta o en planta de acopio.
- Equipo humano (conductores con EPP adecuado).
- *Nota al desarrollador: solicitar fotos de alta calidad a la empresa. Si no están disponibles, usar imágenes referenciales de calidad hasta conseguirlas.*

#### SECCIÓN 7 — CONTACTO
- Número de WhatsApp (botón de acción directa).
- Teléfono de oficina/gerencia.
- Correo electrónico.
- Zona de operaciones (mapa visual o lista de departamentos).
- Formulario simple: Nombre, Empresa, Teléfono, Región, Mensaje.

---

## 7. Diseño y Experiencia de Usuario (UI/UX)

### 7.1 Paleta de Colores Sugerida

| Elemento | Color | Justificación |
|---|---|---|
| Color primario | Azul acero `#1A3A5C` o similar | Transmite confianza, profesionalismo, industrial |
| Color secundario | Blanco `#FFFFFF` | Limpieza, higiene, pureza |
| Acento / CTA | Verde WhatsApp `#25D366` | Inmediatamente reconocible para botón de contacto |
| Texto principal | Gris oscuro `#2D2D2D` | Legibilidad |
| Fondo alternativo | Gris muy claro `#F5F5F5` | Separación visual entre secciones |

> Alternativa: Usar azul+blanco (confianza industrial) o verde+blanco (frescura, naturaleza, sector lácteo).

### 7.2 Tipografía Sugerida
- **Títulos:** Fuente sans-serif moderna y sólida (ej.: Montserrat Bold, Inter, o similar de Google Fonts).
- **Texto:** Fuente legible y limpia (ej.: Open Sans, Roboto).
- **Tamaño mínimo en móvil:** 16px para cuerpo de texto.

### 7.3 Principios de Diseño
- **Mobile-first**: más del 70% del tráfico llegará desde smartphones.
- **Claridad sobre creatividad**: el visitante debe entender en 5 segundos qué hace la empresa.
- **Llamadas a la acción visibles**: el botón de WhatsApp debe ser el elemento más notorio.
- **Imágenes reales**: fotos propias de las cisternas generan más confianza que imágenes de stock.
- **Sin texto excesivo**: secciones concisas con bullet points o tarjetas visuales.

### 7.4 Elementos Visuales de Confianza ("Trust Signals")
- Logos de normativas cumplidas (MINAGRI, DIGESA/MINSA, SENASA si aplica).
- Número de años de experiencia (destacado visualmente).
- Número de litros transportados o clientes atendidos.
- Testimonios breves de ganaderos o plantas (si están disponibles).

---

## 8. Botón de Contacto WhatsApp

Este es el **elemento más importante del sitio** en términos de conversión. Debe implementarse de la siguiente manera:

### 8.1 Especificaciones del Botón Flotante

- **Posición:** Fijo en la esquina inferior derecha de la pantalla en **todas** las páginas y secciones.
- **Visibilidad:** Siempre visible al hacer scroll, sin que se oculte ni desaparezca.
- **Tamaño:** Botón circular de 56-64px de diámetro en móvil; puede ser más grande en desktop.
- **Ícono:** Logo oficial de WhatsApp (verde `#25D366` sobre blanco, o blanco sobre verde).
- **Sombra:** Leve sombra para que resalte sobre cualquier fondo.
- **Animación (opcional):** Leve rebote o pulso para captar atención sin ser invasivo.

### 8.2 Mensaje Predefinido al Abrir WhatsApp

Al hacer clic, debe abrirse WhatsApp con el siguiente mensaje predefinido (personalizable):

```
Hola, me comunico desde la web de BD & Mariafe. Quisiera recibir 
información sobre sus servicios de transporte de leche fresca. 
Gracias.
```

### 8.3 Código de Enlace WhatsApp

```html
<!-- Reemplazar 51XXXXXXXXX con el número real de la empresa -->
<a href="https://wa.me/51XXXXXXXXX?text=Hola%2C%20me%20comunico%20desde%20la%20web%20de%20BD%20%26%20Mariafe.%20Quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20transporte%20de%20leche%20fresca.%20Gracias." 
   target="_blank" 
   rel="noopener noreferrer"
   class="whatsapp-float-btn"
   aria-label="Contactar por WhatsApp">
  <img src="whatsapp-icon.svg" alt="WhatsApp" />
</a>
```

### 8.4 Botones CTA Adicionales en el Sitio

Además del botón flotante, debe incluirse un botón de WhatsApp en:
- La sección **HERO** (principal llamada a la acción).
- Al final de la sección **SERVICIOS**.
- En la sección **CONTACTO**.

---

## 9. Cumplimiento Normativo y Certificaciones

La empresa opera bajo las siguientes normativas peruanas e internacionales, que deben mencionarse en el sitio para generar confianza:

### 9.1 Normativa Peruana Aplicable

| Norma | Entidad | Descripción relevante |
|---|---|---|
| DS Nº 7-2017-MINAGRI | MINAGRI | Reglamento de la Leche y Productos Lácteos del Perú. Regula identificación, registro y condiciones de transporte de leche cruda |
| Directiva Sanitaria Nº 147-MINSA/DIGESA-2023 | MINSA/DIGESA | Establece pautas de trazabilidad en alimentos procesados industrialmente, vigentes desde noviembre 2023 |
| DS-007-98-SA | MINSA | Reglamento sobre Vigilancia y Control Sanitario de Alimentos y Bebidas |
| Normativa SENASA | SENASA | Buenas Prácticas Ganaderas y requisitos sanitarios para el procesamiento primario de alimentos |

### 9.2 Estándares de la Cisterna

- **Material:** Acero inoxidable AISI 304 / 316L (grado quirúrgico / sanitario).
- **Sistema de limpieza:** CIP (Clean-In-Place) — limpieza sin desmontar la cisterna.
- **Temperatura:** Cisterna aislada térmicamente para mantener leche cruda ≤ 6°C.
- **Productos de limpieza:** Detergentes alcalinos y ácidos certificados para industria alimentaria, más desinfectantes con registro sanitario.
- **Registro de lavados:** Cada operación de limpieza queda documentada con fecha, hora, productos usados y responsable.

### 9.3 Contenido Recomendado para la Sección de Certificaciones

- Mencionar las normativas anteriores de forma visible y comprensible para el público no técnico.
- Usar íconos o badges visuales para cada certificación o normativa.
- Si la empresa cuenta con certificados físicos (habilitación sanitaria, autorizaciones DIGESA, registros SUTRAN), escanearlos y mostrarlos como imagen o PDF descargable.

---

## 10. Requerimientos Técnicos

### 10.1 Tecnologías Recomendadas

| Componente | Recomendación | Alternativa |
|---|---|---|
| CMS / Constructor | WordPress + Elementor | Webflow, Wix, HTML estático |
| Hosting | Hostinger Perú, SiteGround, o AWS Lightsail | Cualquier hosting con SSL incluido |
| Dominio | `.com.pe` preferible (ej.: `bdymariafe.com.pe`) | `.com` o `.pe` |
| Formulario | WPForms (WordPress) o Formspree | Google Forms embebido |
| Imágenes | Formato WebP, comprimidas ≤ 200KB por imagen | JPEG optimizado |
| Analytics | Google Analytics 4 (GA4) | — |
| Mapa | Google Maps embed (zona de cobertura) | Imagen estática de mapa |

### 10.2 Requisitos de Hosting

- Certificado SSL gratuito incluido (Let's Encrypt o similar).
- Ancho de banda ilimitado o suficiente para tráfico informativo.
- Soporte PHP 8.x (si se usa WordPress).
- Backup automático diario.
- Panel de control cPanel o similar para gestión sencilla.

### 10.3 Dominio

- Registrar dominio bajo `.com.pe` en NIC Perú o proveedor nacional.
- Ejemplo: `bdymariafe.com.pe` o `transportesbdmariafe.com.pe`.
- Configurar redirección de `www` a versión sin `www` (o viceversa) para evitar contenido duplicado.

---

## 11. SEO y Posicionamiento Digital

### 11.1 Palabras Clave Objetivo

El sitio debe optimizarse para que aparezca en Google cuando potenciales clientes busquen:

**Palabras clave primarias:**
- "transporte de leche fresca Perú"
- "cisterna de leche acero inoxidable"
- "transporte leche cruda cisterna Peru"
- "empresa transporte leche Cajamarca Lima"

**Palabras clave secundarias:**
- "transporte alimentos refrigerados Peru"
- "cisterna sanitaria leche Peru"
- "recolección leche granja Peru"
- "transporte lácteos norma sanitaria Peru"

### 11.2 Requerimientos SEO On-Page

- **RF-SEO-001:** Cada sección debe tener un encabezado `<h2>` con palabras clave naturales.
- **RF-SEO-002:** El título de la página (`<title>`) debe incluir: nombre de empresa + servicio + ubicación.  
  Ejemplo: *"BD & Mariafe Transportes | Transporte de Leche Fresca en Cisternas Sanitarias | Perú"*
- **RF-SEO-003:** Meta descripción de 150–160 caracteres con servicio y zona geográfica.
- **RF-SEO-004:** Todas las imágenes deben tener atributo `alt` descriptivo.
- **RF-SEO-005:** El sitio debe estar registrado en **Google Business Profile** (antes Google My Business) para aparecer en búsquedas locales de Lima y regiones operativas.
- **RF-SEO-006:** URL amigables y en español (sin números ni códigos raros).
- **RF-SEO-007:** Sitemap XML generado y enviado a Google Search Console.

### 11.3 Google Business Profile

Además del sitio web, se recomienda enfáticamente crear y optimizar el perfil de Google Business:
- Nombre de empresa, dirección, teléfono y WhatsApp.
- Categoría: "Empresa de transporte" / "Transporte de alimentos".
- Fotos de las cisternas y el equipo.
- Publicar actualizaciones periódicas.

---

## 12. Glosario

| Término | Definición |
|---|---|
| **Acero quirúrgico inyectado** | Acero inoxidable de grado sanitario (AISI 304 o 316L), sin soldaduras expuestas ni porosidades, apto para contacto directo con alimentos y fluidos biológicos |
| **CIP (Clean-In-Place)** | Sistema de limpieza automatizado de cisternas sin necesidad de desmontar el equipo; incluye enjuague, lavado alcalino, lavado ácido y desinfección final |
| **EHEDG** | European Hygienic Engineering & Design Group; organismo internacional que certifica estándares de diseño higiénico en equipos para industria alimentaria |
| **Trazabilidad** | Capacidad de rastrear el recorrido completo de un lote de leche: desde el productor, durante el transporte, hasta la planta de destino |
| **Cadena de frío** | Control continuo de temperatura de refrigeración (≤ 6°C para leche cruda) durante todo el proceso de transporte |
| **DIGESA** | Dirección General de Salud Ambiental; órgano técnico-normativo del Ministerio de Salud del Perú en higiene alimentaria |
| **SENASA** | Servicio Nacional de Sanidad Agraria; entidad del MINAGRI que regula la sanidad agropecuaria en el Perú |
| **HACCP** | Hazard Analysis Critical Control Points; sistema preventivo de inocuidad alimentaria basado en identificar y controlar puntos críticos del proceso |
| **One-Page** | Sitio web donde todo el contenido está organizado en una sola página con desplazamiento vertical (scroll), en lugar de múltiples páginas separadas |
| **CTA (Call to Action)** | Botón o elemento visual que invita al visitante a realizar una acción específica (ej.: "Contáctanos por WhatsApp") |

---

## 📎 Apéndice A — Checklist de Lanzamiento

Antes de publicar el sitio, verificar:

- [ ] Botón de WhatsApp flotante funcionando correctamente con número real
- [ ] Formulario de contacto enviando correos al destinatario correcto
- [ ] Certificado SSL activo (candado verde en el navegador)
- [ ] Sitio carga en menos de 3 segundos en móvil 4G
- [ ] Todas las imágenes tienen texto alternativo (`alt`)
- [ ] Menú hamburguesa funciona en dispositivos móviles
- [ ] Sección de certificaciones con normativas actualizadas
- [ ] Google Analytics 4 instalado y verificado
- [ ] Google Business Profile creado y vinculado al sitio
- [ ] Google Search Console configurado con sitemap enviado
- [ ] Dominio `.com.pe` registrado y apuntando al hosting
- [ ] Textos revisados por la empresa (nombres, teléfonos, zonas de operación)
- [ ] Política de privacidad básica incluida (requerida si hay formulario)

---

## 📎 Apéndice B — Prioridad de Desarrollo

| Prioridad | Elemento | Impacto |
|---|---|---|
| 🔴 Crítico | Botón WhatsApp flotante + Hero section | Conversión directa |
| 🔴 Crítico | Sección de Servicios con diferenciadores | Convence al cliente |
| 🔴 Crítico | SSL + Mobile responsive | Confianza y accesibilidad |
| 🟠 Alto | Sección Certificaciones y Normativas | Genera credibilidad |
| 🟠 Alto | Formulario de contacto | Canal alternativo a WhatsApp |
| 🟠 Alto | SEO básico (title, meta, alt) | Visibilidad en Google |
| 🟡 Medio | Galería fotográfica | Confianza visual |
| 🟡 Medio | Mapa de cobertura | Claridad geográfica |
| 🟢 Deseable | Google Business Profile | Presencia local |
| 🟢 Deseable | Testimonios de clientes | Social proof |

---

*Documento preparado para BD & Mariafe Transportes. Versión 1.0 — Abril 2026.*  
*Este documento define exclusivamente los requerimientos de un sitio web informativo. No incluye plataforma de gestión, GPS ni funcionalidades de comercio electrónico.*