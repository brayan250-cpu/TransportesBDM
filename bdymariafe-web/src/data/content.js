// ─── Configuración central de todos los datos del sitio ─────────────────────
// Editar aquí para actualizar textos, datos de contacto y contenido sin tocar JSX

export const SITE = {
  name:    'BD & Mariafe Transportes',
  company: 'BD & Mariafe Transportes',
  tagline: 'Pureza en Movimiento',
  description: 'Empresa peruana especializada en transporte de leche fresca a granel con cisternas de acero quirúrgico AISI 304/316L.',
  domain: 'bdymariafe.com.pe',
}

export const CONTACT = {
  whatsapp:        '51926948155',
  whatsappMessage: 'Hola%2C%20me%20comunico%20desde%20la%20web%20de%20Transportes%20BDM.%20Quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20transporte%20de%20leche%20fresca.%20Gracias.',
  phone:    '+51 926 948 155',
  email:    'contacto@bdymariafe.com.pe',
  formspree: 'https://formspree.io/f/XXXXXXXX',
  zones:    ['Cajamarca', 'Lima (Huachipa)', 'Arequipa', 'Trujillo'],
  address:  'Lima, Perú — con cobertura en Cajamarca, Arequipa y Trujillo',
  schedule: 'Lunes a Sábado: 6:00 am – 8:00 pm\nDomingos y emergencias: coordinación previa',
}

export const NAV_LINKS = [
  { label: 'Inicio',          href: '#hero' },
  { label: 'Servicios',       href: '#servicios' },
  { label: 'Certificaciones', href: '#certificaciones' },
  { label: 'Galería',         href: '#galeria' },
  { label: 'Contacto',        href: '#contacto' },
]

export const HERO = {
  badge:       'BD & Mariafe Transportes',
  headline:    'Leche fresca protegida en cada kilómetro',
  subheadline: 'Cisternas de acero quirúrgico AISI 304/316L · Limpieza CIP certificada · Trazabilidad en cada lote. El estándar más alto en transporte de leche del Perú.',
  ctaPrimary:  'Contáctanos por WhatsApp',
  ctaSecondary:'Ver nuestros servicios',
  microcopy:   'Sin compromiso · Respuesta en minutos · Operamos desde Lima hasta Cajamarca',
  trustBadges: ['✅ MINAGRI', '✅ DIGESA/MINSA', '✅ AISI 304/316L', '✅ CIP Certificado'],
}

export const PROPUESTA = {
  label:      'Nuestra propuesta de valor',
  headline:   'Tu leche rechazada en planta no tiene precio. Nosotros sí tenemos solución.',
  intro:      'Cada lote de leche que llega contaminada, fuera de temperatura o sin documentación sanitaria significa pérdida directa para el productor y problemas para la planta. BD & Mariafe existe para que eso no pase.',
  gridHeadline: 'Seis razones que nos separan de cualquier otro transportista',
  cta:        'Quiero saber más',
}

export const DIFFERENTIATORS = [
  {
    id: 1,
    icon: '🔬',
    title: 'Acero quirúrgico inyectado',
    description: 'Nuestras cisternas son AISI 304/316L — el mismo grado usado en quirófanos e industria farmacéutica. Sin porosidades, sin soldaduras expuestas, sin ninguna superficie donde la bacteria pueda anidar.',
  },
  {
    id: 2,
    icon: '🧴',
    title: 'Limpieza CIP certificada',
    description: 'Aplicamos el sistema CIP (Clean-In-Place) con detergentes y desinfectantes homologados para industria láctea. Cada operación queda documentada: fecha, productos, responsable.',
  },
  {
    id: 3,
    icon: '🌡️',
    title: 'Cadena de frío ≤ 6°C',
    description: 'Cisternas aisladas térmicamente con monitoreo continuo de temperatura. Tu leche llega a la planta tan fría como salió de la granja.',
  },
  {
    id: 4,
    icon: '📋',
    title: 'Trazabilidad documental',
    description: 'Cada lote tiene su historia: hora de carga, parámetros de la leche, temperatura durante el trayecto, conductor, ruta y hora de descarga. Documentación lista para auditorías DIGESA y MINAGRI.',
  },
  {
    id: 5,
    icon: '⚖️',
    title: 'Cumplimiento normativo pleno',
    description: 'Operamos bajo DS Nº 7-2017-MINAGRI, Directiva Sanitaria Nº 147-MINSA/DIGESA-2023 y los principios del Codex Alimentarius. Tu proveedor ya viene certificado.',
  },
  {
    id: 6,
    icon: '🕐',
    title: 'Puntualidad en cada ventana',
    description: 'Las plantas procesadoras operan con ventanas horarias de recepción cerradas. Llegamos cuando dijimos. Sin excusas, sin variaciones.',
  },
]

export const SERVICIOS = {
  label:   'Nuestros servicios',
  headline: 'Transporte especializado de leche fresca — de la granja a la planta sin perder un grado',
  intro:   'No transportamos cualquier carga. Solo leche. Solo con cisternas certificadas. Solo bajo los más altos estándares biológicos del Perú.',
  cta:     'Solicitar cotización por WhatsApp',
  ctaMicro:'Respuesta en minutos. Cobertura confirmada al instante.',
}

export const SERVICES = [
  {
    id: 1,
    icon: '🚛',
    color: '#2563EB',
    category: 'Servicio principal',
    title: 'Transporte a Granel',
    description: 'Traslado de leche cruda desde centros de acopio o granjas hasta plantas procesadoras como Gloria, Laive y Nestlé. Cisternas AISI 304/316L de alta capacidad.',
    features: ['Cisternas selladas con precintos de seguridad', 'Temperatura monitorizada ≤ 6°C', 'Documentación sanitaria incluida', 'Registro de trazabilidad por lote'],
    badge: 'Servicio principal',
    cta: 'Consultar disponibilidad',
  },
  {
    id: 2,
    icon: '🏡',
    color: '#25D366',
    category: 'Comodidad',
    title: 'Recojo Directo',
    description: 'Llegamos hasta tu granja o centro de acopio. El productor no tiene que movilizar su leche — la cisterna va al origen. Coordinación directa por WhatsApp.',
    features: ['Llegamos a tu granja o centro de acopio', 'Coordinación por WhatsApp', 'Verificación de parámetros antes de cargar', 'Sin demoras innecesarias'],
    badge: null,
    cta: 'Coordinar recojo',
  },
  {
    id: 3,
    icon: '📋',
    color: '#A8B8C8',
    category: 'Cumplimiento',
    title: 'Documentación Incluida',
    description: 'Cada servicio incluye registros de temperatura, hora de carga/descarga, conductor y datos del lote. Lista para auditorías de DIGESA, MINAGRI y plantas certificadas.',
    features: ['Registros de temperatura en trayecto', 'Datos de carga y descarga', 'Documentación DIGESA / MINAGRI', 'Archivo digital del lote'],
    badge: null,
    cta: 'Ver qué incluye',
  },
  {
    id: 4,
    icon: '🗺️',
    color: '#7C3AED',
    category: 'Cobertura',
    title: 'Cobertura Interregional',
    description: 'Operamos rutas entre las principales zonas ganaderas y plantas procesadoras del Perú: Cajamarca, Lima, Arequipa y Trujillo.',
    features: ['Cajamarca → Lima (Huachipa)', 'Arequipa → Lima', 'Trujillo → Lima', 'Otras rutas a coordinar'],
    badge: null,
    cta: '¿Llegas a mi zona?',
  },
]

export const PROCESO = {
  label:     'Proceso',
  headline:  'Así trabajamos contigo — sin sorpresas, sin errores',
  intro:     'Cada lote sigue el mismo protocolo riguroso. Transparencia total desde el primer contacto hasta la entrega final.',
  cta_intro: '¿Tienes dudas del proceso? Coordinemos tu primera ruta.',
  cta:       'Iniciar coordinación por WhatsApp',
}

export const PROCESS_STEPS = [
  { number: '01', title: 'Nos coordinas por WhatsApp', description: 'Escríbenos con tu zona, volumen estimado y frecuencia. Confirmamos disponibilidad y acordamos la ruta en minutos.' },
  { number: '02', title: 'Verificamos los parámetros', description: 'Antes de cargar, nuestro operador verifica los parámetros de la leche (temperatura, acidez inicial). Sin leche fuera de norma, sin problemas en planta.' },
  { number: '03', title: 'Cargamos y sellamos', description: 'La cisterna se llena y se sella con precintos de seguridad numerados. Iniciamos el registro de trazabilidad del lote.' },
  { number: '04', title: 'Transportamos con monitoreo', description: 'La leche viaja a ≤ 6°C, monitoreo continuo durante todo el trayecto. Si hay alguna incidencia, te notificamos de inmediato.' },
  { number: '05', title: 'Entregamos en planta', description: 'Llegamos dentro de la ventana horaria de recepción. Entregamos la leche junto a toda la documentación sanitaria del lote.' },
  { number: '06', title: 'Te enviamos el registro', description: 'Post-entrega recibes el registro completo del viaje: tiempo, temperatura, conductor y datos del lote para tus archivos.' },
]

export const CERTIFICACIONES = {
  label:   'Certificaciones y normativas',
  headline: 'Operamos bajo las normativas más exigentes del Perú e internacionales',
  intro:   'No son promesas. Son certificados. BD & Mariafe cumple con el marco normativo completo que exigen las plantas procesadoras y las autoridades sanitarias del Perú.',
  steelTitle: 'AISI 304 / 316L — Acero inoxidable grado sanitario',
  steelDesc:  'El mismo estándar usado en la industria farmacéutica y quirúrgica. Sin soldaduras expuestas, sin porosidades. Cumple con los criterios EHEDG (European Hygienic Engineering & Design Group).',
  cipTitle:   'CIP — Clean In Place',
  cipDesc:    'Limpieza automatizada sin desmontar la cisterna: enjuague, lavado alcalino, lavado ácido y desinfección final. Cada operación documentada con fecha, hora, productos y responsable.',
  cta:        'Solicitar ficha técnica completa',
  trust_headline: 'Documentación disponible para auditorías en 24 horas',
  trust_body:     'Todas nuestras certificaciones y registros están digitalizados y disponibles para inspecciones de DIGESA, MINAGRI o clientes que requieran auditar nuestra operación.',
}

export const CERTIFICATIONS = [
  { id: 1, code: 'MINAGRI', title: 'Reglamento de la Leche y Productos Lácteos', authority: 'Ministerio de Agricultura y Riego — DS Nº 7-2017-MINAGRI', description: 'Regula condiciones de transporte de leche cruda: temperatura, materiales permitidos y documentación requerida.', status: 'Vigente' },
  { id: 2, code: 'DIGESA',  title: 'Trazabilidad en alimentos procesados', authority: 'MINSA / DIGESA — Directiva Nº 147-MINSA/DIGESA-2023', description: 'Vigente desde noviembre 2023. Establece los registros de trazabilidad exigibles en toda la cadena de frío láctea.', status: 'Vigente' },
  { id: 3, code: 'MINSA',   title: 'Vigilancia y Control Sanitario', authority: 'Ministerio de Salud — DS-007-98-SA', description: 'Marco normativo base para el control sanitario de alimentos y bebidas, incluidas las condiciones de transporte.', status: 'Vigente' },
  { id: 4, code: 'SENASA',  title: 'Buenas Prácticas Ganaderas', authority: 'SENASA — Normativa de sanidad agropecuaria', description: 'Complementa las buenas prácticas en el origen: granja y centro de acopio. Nuestro proceso inicia desde aquí.', status: 'Vigente' },
  { id: 5, code: 'CODEX',   title: 'Codex Alimentarius — Lácteos', authority: 'FAO / OMS — Estándar Internacional', description: 'Principios generales internacionales para productos lácteos. Base de referencia para las normativas nacionales.', status: 'Referencia' },
]

export const METRICAS = {
  label:   'Nuestra trayectoria',
  headline: 'Números que hablan por sí solos',
  intro:   'Cada número representa una entrega puntual, una familia ganadera atendida y un estándar de calidad que no negociamos.',
}

export const METRICS = [
  { id: 1, value: 15,       suffix: '+', prefix: '', label: 'Años de experiencia',         sublabel: 'Sirviendo al sector lácteo peruano' },
  { id: 2, value: 2000000,  suffix: '+', prefix: '', label: 'Litros transportados',         sublabel: 'Con inocuidad garantizada' },
]

export const GALERIA = {
  label:   'Galería',
  headline: 'Nuestras cisternas, nuestro proceso, nuestro equipo',
  intro:   'No vendemos palabras — mostramos lo que hay detrás de cada servicio.',
  categories: ['Todas', 'Cisternas', 'Proceso CIP', 'En ruta', 'Equipo'],
  placeholder: 'Las fotos reales de la empresa se mostrarán aquí. Solicitar al cliente.',
  note:    'Las imágenes finales serán proporcionadas por el cliente. Esta galería se actualizará con fotos reales de la flota y el equipo.',
}

export const CONTACTO = {
  label:            'Contáctanos',
  headline:         '¿Listo para transportar con los más altos estándares sanitarios?',
  intro:            'Escríbenos hoy. Coordinamos tu primera ruta sin compromiso. Sin papeleos innecesarios — solo transporte de calidad.',
  cta_whatsapp:     'Iniciar chat por WhatsApp',
  whatsapp_microcopy: 'Respuesta en minutos · Mensaje predefinido incluido',
  form_title:       'O cuéntanos tu necesidad',
  waTitle:          'Contáctanos por WhatsApp',
  waDesc:           'Respuesta inmediata. Sin formularios, sin esperas. Habla directamente con el equipo de BD & Mariafe.',
  waCta:            'Abrir WhatsApp ahora',
  waMicro:          'Mensaje predefinido incluido — solo toca el botón',
  formTitle:        'O déjanos tus datos',
  formBtn:          'Enviar consulta',
  formMicro:        'Respondemos en menos de 24 horas hábiles. Tus datos son confidenciales.',
  formSuccess:      '¡Gracias! Recibimos tu consulta. Nos comunicaremos contigo a la brevedad.',
}

export const FOOTER = {
  tagline:           'Pureza en Movimiento — Transporte certificado de leche fresca en el Perú',
  brand_description: 'Empresa peruana especializada en transporte de leche fresca a granel. Cisternas AISI 304/316L, limpieza CIP certificada y trazabilidad completa en cada lote.',
  copyright:         '© 2026 BD & Mariafe Transportes. Todos los derechos reservados.',
  ruc_text:          'RUC: 10801671093 — Lima, Perú',
  services_links: [
    'Transporte a Granel',
    'Recojo Directo',
    'Documentación Sanitaria',
    'Cobertura Interregional',
  ],
  links: [
    { label: 'Inicio',          href: '#hero' },
    { label: 'Servicios',       href: '#servicios' },
    { label: 'Certificaciones', href: '#certificaciones' },
    { label: 'Galería',         href: '#galeria' },
    { label: 'Contacto',        href: '#contacto' },
  ],
}
