# Especificación derivada (auto-generada)

> Documento generado automáticamente a partir de insumos suministrados. Revísese manualmente.

## Requerimientos Funcionales (RF)

- **RF-1**: Público Objetivo
 El sitio debe estar diseñado para comunicarse con tres tipos de visitantes:
 ### 3.1 Clientes Potenciales Directos
 - **Ganaderos y cooperativas lecheras**: productores de leche fresca que necesitan un transportista confiable para llevar su producción a la planta. _(origen: Requerimientos.md)_
- **RF-2**: Requerimientos Funcionales
 Los siguientes requerimientos definen las funcionalidades que **el sitio web debe cumplir**. _(origen: Requerimientos.md)_
- **RF-3**: ### RF-001 — Botón de WhatsApp permanente y visible El sitio debe incluir un botón flotante de WhatsApp, visible en todas las secciones del sitio, tanto en desktop como en móvil, que abra directamente una conversación con el número de la empresa con un mensaje predefinido. _(origen: Requerimientos.md)_
- **RF-4**: ### RF-002 — Formulario de contacto básico El sitio debe incluir un formulario de contacto con los campos: Nombre, Empresa/Ganadería, Teléfono, Región/Provincia y Mensaje. _(origen: Requerimientos.md)_
- **RF-5**: ### RF-003 — Sección de servicios clara y detallada El sitio debe mostrar los servicios ofrecidos con descripción, imágenes referenciales y los diferenciadores clave (acero quirúrgico, limpieza certificada, trazabilidad). _(origen: Requerimientos.md)_
- **RF-6**: ### RF-004 — Sección de certificaciones y estándares El sitio debe incluir una sección dedicada a mostrar las certificaciones, normativas cumplidas y los productos certificados usados para la limpieza de cisternas. _(origen: Requerimientos.md)_
- **RF-7**: ### RF-005 — Galería fotográfica / visual El sitio debe mostrar imágenes o visuales de las cisternas, el proceso de limpieza, y el equipo de la empresa para generar confianza visual. _(origen: Requerimientos.md)_
- **RF-8**: ### RF-010 — Navegación simple y accesible El menú de navegación debe ser claro, con no más de 6 secciones, y funcionar correctamente en móviles (menú hamburguesa). _(origen: Requerimientos.md)_
- **RF-9**: Requerimientos No Funcionales
 ### RNF-001 — Rendimiento El sitio debe cargar en menos de 3 segundos en conexión 4G desde Lima. _(origen: Requerimientos.md)_
- **RF-10**: Se debe apuntar a un puntaje de Google PageSpeed Insights ≥ 80 en móvil. _(origen: Requerimientos.md)_
- **RF-11**: ### RNF-002 — Diseño Responsive El sitio debe verse y funcionar correctamente en: smartphones (desde 360px de ancho), tablets (768px) y desktop (1280px+). _(origen: Requerimientos.md)_
- **RF-12**: ### RNF-003 — Disponibilidad El sitio debe estar disponible 24/7. _(origen: Requerimientos.md)_
- **RF-13**: ### RNF-004 — Seguridad El sitio debe contar obligatoriamente con certificado SSL (HTTPS). _(origen: Requerimientos.md)_
- **RF-14**: No debe almacenar datos sensibles en el frontend. _(origen: Requerimientos.md)_
- **RF-15**: ### RNF-005 — Mantenimiento sencillo El sitio debe estar construido en un CMS o con código que permita actualizaciones de contenido (textos, imágenes, teléfonos) sin necesidad de un desarrollador. _(origen: Requerimientos.md)_
- **RF-16**: ``` BD & Mariafe Web │ ├── [1] HERO / INICIO │ └── Titular de impacto + botón WhatsApp + llamada a la acción │ ├── [2] NOSOTROS │ └── Historia, misión, valores, equipo │ ├── [3] SERVICIOS │ └── Transporte de leche fresca, cobertura, capacidad de cisternas │ ├── [4] ¿POR QUÉ ELEGIRNOS? _(origen: Requerimientos.md)_
- **RF-17**: - **Claridad sobre creatividad**: el visitante debe entender en 5 segundos qué hace la empresa. _(origen: Requerimientos.md)_
- **RF-18**: - **Llamadas a la acción visibles**: el botón de WhatsApp debe ser el elemento más notorio. _(origen: Requerimientos.md)_
- **RF-19**: Debe implementarse de la siguiente manera:
 ### 8.1 Especificaciones del Botón Flotante
 - **Posición:** Fijo en la esquina inferior derecha de la pantalla en **todas** las páginas y secciones. _(origen: Requerimientos.md)_
- **RF-20**: ### 8.2 Mensaje Predefinido al Abrir WhatsApp
 Al hacer clic, debe abrirse WhatsApp con el siguiente mensaje predefinido (personalizable):
 ``` Hola, me comunico desde la web de BD & Mariafe. _(origen: Requerimientos.md)_
- **RF-21**: ```
 ### 8.3 Código de Enlace WhatsApp
 ```html <!-- Reemplazar 51XXXXXXXXX con el número real de la empresa --> <a href="https://wa.me/51XXXXXXXXX?text=Hola%2C%20me%20comunico%20desde%20la%20web%20de%20BD%20%26%20Mariafe.%20Quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20transporte%20de%20leche%20fresca.%20Gracias." target="_blank" rel="noopener noreferrer" class="whatsapp-float-btn" aria-label="Contactar por WhatsApp"> <img src="whatsapp-icon.svg" alt="WhatsApp" /> </a> ```
 ### 8.4 Botones CTA Adicionales en el Sitio
 Además del botón flotante, debe incluirse un botón de WhatsApp en:
- La sección **HERO** (principal llamada a la acción). _(origen: Requerimientos.md)_
- **RF-22**: SEO y Posicionamiento Digital
 ### 11.1 Palabras Clave Objetivo
 El sitio debe optimizarse para que aparezca en Google cuando potenciales clientes busquen:
 **Palabras clave primarias:** - "transporte de leche fresca Perú" - "cisterna de leche acero inoxidable" - "transporte leche cruda cisterna Peru" - "empresa transporte leche Cajamarca Lima"
 **Palabras clave secundarias:** - "transporte alimentos refrigerados Peru" - "cisterna sanitaria leche Peru" - "recolección leche granja Peru" - "transporte lácteos norma sanitaria Peru"
 ### 11.2 Requerimientos SEO On-Page
 - **RF-SEO-001:** Cada sección debe tener un encabezado `<h2>` con palabras clave naturales. _(origen: Requerimientos.md)_
- **RF-23**: - **RF-SEO-002:** El título de la página (`<title>`) debe incluir: nombre de empresa + servicio + ubicación. _(origen: Requerimientos.md)_
- **RF-24**: - **RF-SEO-005:** El sitio debe estar registrado en **Google Business Profile** (antes Google My Business) para aparecer en búsquedas locales de Lima y regiones operativas. _(origen: Requerimientos.md)_
- **RF-25**: Glosario
 | Término | Definición | |---|---| | **Acero quirúrgico inyectado** | Acero inoxidable de grado sanitario (AISI 304 o 316L), sin soldaduras expuestas ni porosidades, apto para contacto directo con alimentos y fluidos biológicos | | **CIP (Clean-In-Place)** | Sistema de limpieza automatizado de cisternas sin necesidad de desmontar el equipo; incluye enjuague, lavado alcalino, lavado ácido y desinfección final | | **EHEDG** | European Hygienic Engineering & Design Group; organismo internacional que certifica estándares de diseño higiénico en equipos para industria alimentaria | | **Trazabilidad** | Capacidad de rastrear el recorrido completo de un lote de leche: desde el productor, durante el transporte, hasta la planta de destino | | **Cadena de frío** | Control continuo de temperatura de refrigeración (≤ 6°C para leche cruda) durante todo el proceso de transporte | | **DIGESA** | Dirección General de Salud Ambiental; órgano técnico-normativo del Ministerio de Salud del Perú en higiene alimentaria | | **SENASA** | Servicio Nacional de Sanidad Agraria; entidad del MINAGRI que regula la sanidad agropecuaria en el Perú | | **HACCP** | Hazard Analysis Critical Control Points; sistema preventivo de inocuidad alimentaria basado en identificar y controlar puntos críticos del proceso | | **One-Page** | Sitio web donde todo el contenido está organizado en una sola página con desplazamiento vertical (scroll), en lugar de múltiples páginas separadas | | **CTA (Call to Action)** | Botón o elemento visual que invita al visitante a realizar una acción específica (ej.: "Contáctanos por WhatsApp") |
 ---
 ## 📎 Apéndice A — Checklist de Lanzamiento
 Antes de publicar el sitio, verificar:
 - [ ] Botón de WhatsApp flotante funcionando correctamente con número real - [ ] Formulario de contacto enviando correos al destinatario correcto - [ ] Certificado SSL activo (candado verde en el navegador) - [ ] Sitio carga en menos de 3 segundos en móvil 4G - [ ] Todas las imágenes tienen texto alternativo (`alt`) - [ ] Menú hamburguesa funciona en dispositivos móviles - [ ] Sección de certificaciones con normativas actualizadas - [ ] Google Analytics 4 instalado y verificado - [ ] Google Business Profile creado y vinculado al sitio - [ ] Google Search Console configurado con sitemap enviado - [ ] Dominio `.com.pe` registrado y apuntando al hosting - [ ] Textos revisados por la empresa (nombres, teléfonos, zonas de operación) - [ ] Política de privacidad básica incluida (requerida si hay formulario)
 ---
 ## 📎 Apéndice B — Prioridad de Desarrollo
 | Prioridad | Elemento | Impacto | |---|---|---| | 🔴 Crítico | Botón WhatsApp flotante + Hero section | Conversión directa | | 🔴 Crítico | Sección de Servicios con diferenciadores | Convence al cliente | | 🔴 Crítico | SSL + Mobile responsive | Confianza y accesibilidad | | 🟠 Alto | Sección Certificaciones y Normativas | Genera credibilidad | | 🟠 Alto | Formulario de contacto | Canal alternativo a WhatsApp | | 🟠 Alto | SEO básico (title, meta, alt) | Visibilidad en Google | | 🟡 Medio | Galería fotográfica | Confianza visual | | 🟡 Medio | Mapa de cobertura | Claridad geográfica | | 🟢 Deseable | Google Business Profile | Presencia local | | 🟢 Deseable | Testimonios de clientes | Social proof |
 ---
 *Documento preparado para BD & Mariafe Transportes. _(origen: Requerimientos.md)_

## Reglas de Negocio (RB)

- **RB-1**: Análisis del Sector y Competencia
 ### 2.1 Contexto del Mercado Lácteo en Perú
 El Perú cuenta con un mercado lácteo altamente concentrado: **Gloria, Nestlé y Laive** controlan más del 90% del mercado, con plantas de acopio en Cajamarca, Trujillo, Huachipa, Arequipa y otras regiones. _(origen: Requerimientos.md)_
- **RB-2**: ### 2.2 Competencia Identificada
 | Empresa / Tipo | Fortaleza | Debilidad (oportunidad para BD & Mariafe) | |---|---|---| | **Transportistas informales** (cántaras, vehículos no certificados) | Precio bajo | Sin certificación sanitaria, sin trazabilidad, sin control de temperatura | | **Operadores logísticos generales** (Ransa, Dinet, T-Logic) | Gran flota, cobertura nacional | No especializados en productos lácteos ni en cisternas sanitarias | | **Transportistas de cisterna sin estándar biológico** | Cuentan con cisternas | Sin certificación de limpieza con productos homologados, sin acero quirúrgico | | **Flotas propias de Gloria / Laive** | Alta eficiencia interna | Capacidad limitada; subcontratan servicios externos en temporadas altas |
 ### 2.3 Ventajas Competitivas de BD & Mariafe
 La propuesta de valor de BD & Mariafe se construye sobre pilares que la mayoría de competidores locales no pueden ofrecer:
 - **Cisternas de acero quirúrgico inyectado** (grado 304/316L): más resistentes, más higiénicas y 100% aptas para contacto con alimentos. _(origen: Requerimientos.md)_
- **RB-3**: ### 3.2 Perfil del Visitante Típico
 | Atributo | Detalle | |---|---| | Dispositivo más usado | Smartphone (más del 70% del tráfico esperado) | | Canal de llegada | Google, WhatsApp, recomendación boca a boca | | Lo que más busca | Confianza, certificación sanitaria, precio y disponibilidad | | Acción esperada en el sitio | Llamar por WhatsApp o dejar sus datos de contacto |
 ---
 ## 4. _(origen: Requerimientos.md)_
- **RB-4**: ### RF-002 — Formulario de contacto básico El sitio debe incluir un formulario de contacto con los campos: Nombre, Empresa/Ganadería, Teléfono, Región/Provincia y Mensaje. _(origen: Requerimientos.md)_
- **RB-5**: Se recomienda hosting con uptime garantizado ≥ 99.5%. _(origen: Requerimientos.md)_
- **RB-6**: Estructura y Contenido del Sitio
 ### 6.1 Arquitectura de Páginas Recomendada
 Se recomienda un sitio de **una sola página (One-Page)** con desplazamiento fluido entre secciones, más una página independiente de "Política de Privacidad" si se usa formulario. _(origen: Requerimientos.md)_
- **RB-7**: │ └── Acero quirúrgico, limpieza certificada, trazabilidad, puntualidad │ ├── [5] CERTIFICACIONES Y ESTÁNDARES │ └── Normativas cumplidas, productos certificados de limpieza │ ├── [6] GALERÍA │ └── Fotos de las cisternas, procesos, equipo humano │ ├── [7] CONTACTO │ └── Formulario + WhatsApp + teléfono + correo + zona de operación │ └── [FOOTER] └── Logo, teléfono, redes sociales, aviso legal ```
 ### 6.2 Contenido Recomendado por Sección
 #### SECCIÓN 1 — HERO / INICIO - **Titular sugerido:** *"Transportamos la frescura de tu leche con los más altos estándares sanitarios del Perú"* - **Subtítulo:** *"Cisternas de acero quirúrgico inyectado • Limpieza certificada • Trazabilidad total"* - **Botón principal:** `💬 Contáctanos por WhatsApp` (enlace directo) - **Botón secundario:** `Conoce nuestros servicios ↓` - Imagen de fondo: cisterna en ruta o proceso de carga de leche. _(origen: Requerimientos.md)_
- **RB-8**: Presentar en tarjetas visuales o íconos:
 | ✅ Diferenciador | Descripción | |---|---| | 🔬 Acero quirúrgico inyectado | Cisternas 304/316L: el más alto estándar para contacto con alimentos, sin porosidades, sin riesgo de contaminación | | 🧴 Limpieza con productos certificados | Usamos detergentes y desinfectantes homologados para industria láctea, con registro de cada lavado | | 🌡️ Control de temperatura | Monitoreo continuo de la cadena de frío durante todo el trayecto | | 📋 Trazabilidad completa | Cada lote documentado: hora de carga, temperatura, conductor, ruta, hora de descarga | | ⚖️ Cumplimiento normativo | Operamos bajo DS Nº 7-2017-MINAGRI y Directiva Sanitaria Nº 147-MINSA/DIGESA | | 🕐 Puntualidad garantizada | Cumplimos con las ventanas horarias de recepción de las plantas procesadoras |
 #### SECCIÓN 5 — CERTIFICACIONES Y ESTÁNDARES - **Normativas cumplidas:** - DS Nº 7-2017-MINAGRI: Reglamento de la Leche y Productos Lácteos (Perú). _(origen: Requerimientos.md)_
- **RB-9**: - Formulario simple: Nombre, Empresa, Teléfono, Región, Mensaje. _(origen: Requerimientos.md)_
- **RB-10**: ### 7.3 Principios de Diseño - **Mobile-first**: más del 70% del tráfico llegará desde smartphones. _(origen: Requerimientos.md)_
- **RB-11**: ```
 ### 8.3 Código de Enlace WhatsApp
 ```html <!-- Reemplazar 51XXXXXXXXX con el número real de la empresa --> <a href="https://wa.me/51XXXXXXXXX?text=Hola%2C%20me%20comunico%20desde%20la%20web%20de%20BD%20%26%20Mariafe.%20Quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20transporte%20de%20leche%20fresca.%20Gracias." target="_blank" rel="noopener noreferrer" class="whatsapp-float-btn" aria-label="Contactar por WhatsApp"> <img src="whatsapp-icon.svg" alt="WhatsApp" /> </a> ```
 ### 8.4 Botones CTA Adicionales en el Sitio
 Además del botón flotante, debe incluirse un botón de WhatsApp en:
- La sección **HERO** (principal llamada a la acción). _(origen: Requerimientos.md)_
- **RB-12**: Cumplimiento Normativo y Certificaciones
 La empresa opera bajo las siguientes normativas peruanas e internacionales, que deben mencionarse en el sitio para generar confianza:
 ### 9.1 Normativa Peruana Aplicable
 | Norma | Entidad | Descripción relevante | |---|---|---| | DS Nº 7-2017-MINAGRI | MINAGRI | Reglamento de la Leche y Productos Lácteos del Perú. _(origen: Requerimientos.md)_
- **RB-13**: Regula identificación, registro y condiciones de transporte de leche cruda | | Directiva Sanitaria Nº 147-MINSA/DIGESA-2023 | MINSA/DIGESA | Establece pautas de trazabilidad en alimentos procesados industrialmente, vigentes desde noviembre 2023 | | DS-007-98-SA | MINSA | Reglamento sobre Vigilancia y Control Sanitario de Alimentos y Bebidas | | Normativa SENASA | SENASA | Buenas Prácticas Ganaderas y requisitos sanitarios para el procesamiento primario de alimentos |
 ### 9.2 Estándares de la Cisterna
 - **Material:** Acero inoxidable AISI 304 / 316L (grado quirúrgico / sanitario). _(origen: Requerimientos.md)_
- **RB-14**: Requerimientos Técnicos
 ### 10.1 Tecnologías Recomendadas
 | Componente | Recomendación | Alternativa | |---|---|---| | CMS / Constructor | WordPress + Elementor | Webflow, Wix, HTML estático | | Hosting | Hostinger Perú, SiteGround, o AWS Lightsail | Cualquier hosting con SSL incluido | | Dominio | `.com.pe` preferible (ej.: `bdymariafe.com.pe`) | `.com` o `.pe` | | Formulario | WPForms (WordPress) o Formspree | Google Forms embebido | | Imágenes | Formato WebP, comprimidas ≤ 200KB por imagen | JPEG optimizado | | Analytics | Google Analytics 4 (GA4) | — | | Mapa | Google Maps embed (zona de cobertura) | Imagen estática de mapa |
 ### 10.2 Requisitos de Hosting
 - Certificado SSL gratuito incluido (Let's Encrypt o similar). _(origen: Requerimientos.md)_
- **RB-15**: Glosario
 | Término | Definición | |---|---| | **Acero quirúrgico inyectado** | Acero inoxidable de grado sanitario (AISI 304 o 316L), sin soldaduras expuestas ni porosidades, apto para contacto directo con alimentos y fluidos biológicos | | **CIP (Clean-In-Place)** | Sistema de limpieza automatizado de cisternas sin necesidad de desmontar el equipo; incluye enjuague, lavado alcalino, lavado ácido y desinfección final | | **EHEDG** | European Hygienic Engineering & Design Group; organismo internacional que certifica estándares de diseño higiénico en equipos para industria alimentaria | | **Trazabilidad** | Capacidad de rastrear el recorrido completo de un lote de leche: desde el productor, durante el transporte, hasta la planta de destino | | **Cadena de frío** | Control continuo de temperatura de refrigeración (≤ 6°C para leche cruda) durante todo el proceso de transporte | | **DIGESA** | Dirección General de Salud Ambiental; órgano técnico-normativo del Ministerio de Salud del Perú en higiene alimentaria | | **SENASA** | Servicio Nacional de Sanidad Agraria; entidad del MINAGRI que regula la sanidad agropecuaria en el Perú | | **HACCP** | Hazard Analysis Critical Control Points; sistema preventivo de inocuidad alimentaria basado en identificar y controlar puntos críticos del proceso | | **One-Page** | Sitio web donde todo el contenido está organizado en una sola página con desplazamiento vertical (scroll), en lugar de múltiples páginas separadas | | **CTA (Call to Action)** | Botón o elemento visual que invita al visitante a realizar una acción específica (ej.: "Contáctanos por WhatsApp") |
 ---
 ## 📎 Apéndice A — Checklist de Lanzamiento
 Antes de publicar el sitio, verificar:
 - [ ] Botón de WhatsApp flotante funcionando correctamente con número real - [ ] Formulario de contacto enviando correos al destinatario correcto - [ ] Certificado SSL activo (candado verde en el navegador) - [ ] Sitio carga en menos de 3 segundos en móvil 4G - [ ] Todas las imágenes tienen texto alternativo (`alt`) - [ ] Menú hamburguesa funciona en dispositivos móviles - [ ] Sección de certificaciones con normativas actualizadas - [ ] Google Analytics 4 instalado y verificado - [ ] Google Business Profile creado y vinculado al sitio - [ ] Google Search Console configurado con sitemap enviado - [ ] Dominio `.com.pe` registrado y apuntando al hosting - [ ] Textos revisados por la empresa (nombres, teléfonos, zonas de operación) - [ ] Política de privacidad básica incluida (requerida si hay formulario)
 ---
 ## 📎 Apéndice B — Prioridad de Desarrollo
 | Prioridad | Elemento | Impacto | |---|---|---| | 🔴 Crítico | Botón WhatsApp flotante + Hero section | Conversión directa | | 🔴 Crítico | Sección de Servicios con diferenciadores | Convence al cliente | | 🔴 Crítico | SSL + Mobile responsive | Confianza y accesibilidad | | 🟠 Alto | Sección Certificaciones y Normativas | Genera credibilidad | | 🟠 Alto | Formulario de contacto | Canal alternativo a WhatsApp | | 🟠 Alto | SEO básico (title, meta, alt) | Visibilidad en Google | | 🟡 Medio | Galería fotográfica | Confianza visual | | 🟡 Medio | Mapa de cobertura | Claridad geográfica | | 🟢 Deseable | Google Business Profile | Presencia local | | 🟢 Deseable | Testimonios de clientes | Social proof |
 ---
 *Documento preparado para BD & Mariafe Transportes. _(origen: Requerimientos.md)_

## Decisiones / Condiciones (DC)

- **DC-1**: Estructura y Contenido del Sitio
 ### 6.1 Arquitectura de Páginas Recomendada
 Se recomienda un sitio de **una sola página (One-Page)** con desplazamiento fluido entre secciones, más una página independiente de "Política de Privacidad" si se usa formulario. _(origen: Requerimientos.md)_
- **DC-2**: Si no están disponibles, usar imágenes referenciales de calidad hasta conseguirlas.*
 #### SECCIÓN 7 — CONTACTO - Número de WhatsApp (botón de acción directa). _(origen: Requerimientos.md)_
- **DC-3**: ### 7.4 Elementos Visuales de Confianza ("Trust Signals") - Logos de normativas cumplidas (MINAGRI, DIGESA/MINSA, SENASA si aplica). _(origen: Requerimientos.md)_
- **DC-4**: - Testimonios breves de ganaderos o plantas (si están disponibles). _(origen: Requerimientos.md)_
- **DC-5**: - Si la empresa cuenta con certificados físicos (habilitación sanitaria, autorizaciones DIGESA, registros SUTRAN), escanearlos y mostrarlos como imagen o PDF descargable. _(origen: Requerimientos.md)_
- **DC-6**: - Soporte PHP 8.x (si se usa WordPress). _(origen: Requerimientos.md)_
- **DC-7**: SEO y Posicionamiento Digital
 ### 11.1 Palabras Clave Objetivo
 El sitio debe optimizarse para que aparezca en Google cuando potenciales clientes busquen:
 **Palabras clave primarias:** - "transporte de leche fresca Perú" - "cisterna de leche acero inoxidable" - "transporte leche cruda cisterna Peru" - "empresa transporte leche Cajamarca Lima"
 **Palabras clave secundarias:** - "transporte alimentos refrigerados Peru" - "cisterna sanitaria leche Peru" - "recolección leche granja Peru" - "transporte lácteos norma sanitaria Peru"
 ### 11.2 Requerimientos SEO On-Page
 - **RF-SEO-001:** Cada sección debe tener un encabezado `<h2>` con palabras clave naturales. _(origen: Requerimientos.md)_
- **DC-8**: Glosario
 | Término | Definición | |---|---| | **Acero quirúrgico inyectado** | Acero inoxidable de grado sanitario (AISI 304 o 316L), sin soldaduras expuestas ni porosidades, apto para contacto directo con alimentos y fluidos biológicos | | **CIP (Clean-In-Place)** | Sistema de limpieza automatizado de cisternas sin necesidad de desmontar el equipo; incluye enjuague, lavado alcalino, lavado ácido y desinfección final | | **EHEDG** | European Hygienic Engineering & Design Group; organismo internacional que certifica estándares de diseño higiénico en equipos para industria alimentaria | | **Trazabilidad** | Capacidad de rastrear el recorrido completo de un lote de leche: desde el productor, durante el transporte, hasta la planta de destino | | **Cadena de frío** | Control continuo de temperatura de refrigeración (≤ 6°C para leche cruda) durante todo el proceso de transporte | | **DIGESA** | Dirección General de Salud Ambiental; órgano técnico-normativo del Ministerio de Salud del Perú en higiene alimentaria | | **SENASA** | Servicio Nacional de Sanidad Agraria; entidad del MINAGRI que regula la sanidad agropecuaria en el Perú | | **HACCP** | Hazard Analysis Critical Control Points; sistema preventivo de inocuidad alimentaria basado en identificar y controlar puntos críticos del proceso | | **One-Page** | Sitio web donde todo el contenido está organizado en una sola página con desplazamiento vertical (scroll), en lugar de múltiples páginas separadas | | **CTA (Call to Action)** | Botón o elemento visual que invita al visitante a realizar una acción específica (ej.: "Contáctanos por WhatsApp") |
 ---
 ## 📎 Apéndice A — Checklist de Lanzamiento
 Antes de publicar el sitio, verificar:
 - [ ] Botón de WhatsApp flotante funcionando correctamente con número real - [ ] Formulario de contacto enviando correos al destinatario correcto - [ ] Certificado SSL activo (candado verde en el navegador) - [ ] Sitio carga en menos de 3 segundos en móvil 4G - [ ] Todas las imágenes tienen texto alternativo (`alt`) - [ ] Menú hamburguesa funciona en dispositivos móviles - [ ] Sección de certificaciones con normativas actualizadas - [ ] Google Analytics 4 instalado y verificado - [ ] Google Business Profile creado y vinculado al sitio - [ ] Google Search Console configurado con sitemap enviado - [ ] Dominio `.com.pe` registrado y apuntando al hosting - [ ] Textos revisados por la empresa (nombres, teléfonos, zonas de operación) - [ ] Política de privacidad básica incluida (requerida si hay formulario)
 ---
 ## 📎 Apéndice B — Prioridad de Desarrollo
 | Prioridad | Elemento | Impacto | |---|---|---| | 🔴 Crítico | Botón WhatsApp flotante + Hero section | Conversión directa | | 🔴 Crítico | Sección de Servicios con diferenciadores | Convence al cliente | | 🔴 Crítico | SSL + Mobile responsive | Confianza y accesibilidad | | 🟠 Alto | Sección Certificaciones y Normativas | Genera credibilidad | | 🟠 Alto | Formulario de contacto | Canal alternativo a WhatsApp | | 🟠 Alto | SEO básico (title, meta, alt) | Visibilidad en Google | | 🟡 Medio | Galería fotográfica | Confianza visual | | 🟡 Medio | Mapa de cobertura | Claridad geográfica | | 🟢 Deseable | Google Business Profile | Presencia local | | 🟢 Deseable | Testimonios de clientes | Social proof |
 ---
 *Documento preparado para BD & Mariafe Transportes. _(origen: Requerimientos.md)_

## Integraciones / Flujos (INT)

- **INT-1**: - **RF-SEO-007:** Sitemap XML generado y enviado a Google Search Console. _(origen: Requerimientos.md)_

## Supuestos y Observaciones

- _Sin hallazgos_.
