// Motor del blog de PlanCrece.
// - Fechas SIEMPRE relativas al momento actual ("hace X días/meses/años"), calculadas
//   en tiempo de render. No hay fechas absolutas en el HTML.
// - Los 12 artículos más recientes están escritos a mano (RECIENTES).
// - El archivo histórico (hasta enero 2014) se genera desde el banco SEEDS.
// SIMULACIÓN: comentarios y parte del archivo son simulados; revisar antes del lanzamiento.

import { SEEDS, type Categoria, type Seed } from './blogSeeds'

export type { Categoria }

export interface Comentario {
  nick: string
  diasDespues: number // días tras la publicación del artículo
  texto: string
  respuesta?: string // respuesta del Equipo PlanCrece
}

export interface Articulo {
  slug: string
  titulo: string
  categoria: Categoria
  mesesAtras: number // meses hacia atrás desde el mes actual
  dia: number // día del mes de publicación (1-27)
  extracto: string
  cuerpo: string[] // párrafos; los que empiezan por "## " se renderizan como h2
  gancho: string
  comentarios: Comentario[]
}

export const CATEGORIAS: { id: Categoria; label: string; chip: string }[] = [
  { id: 'ayudas', label: 'Ayudas y subvenciones', chip: 'bg-blue-50 text-blue-700' },
  { id: 'normativa', label: 'Normativa', chip: 'bg-slate-100 text-slate-600' },
  { id: 'consejos', label: 'Consejos', chip: 'bg-emerald-50 text-emerald-700' },
  { id: 'negocios', label: 'Negocios rentables', chip: 'bg-amber-50 text-amber-700' },
  { id: 'franquicias', label: 'Franquicias', chip: 'bg-violet-50 text-violet-700' },
]

export const catMeta = (c: Categoria) => CATEGORIAS.find((x) => x.id === c)!

// ---------- RNG determinista ----------
function hashStr(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ---------- Fechas ----------
const MESES_TOTALES = (() => {
  const now = new Date()
  return (now.getFullYear() - 2014) * 12 + now.getMonth() // meses desde enero 2014
})()

export function fechaArticulo(a: { mesesAtras: number; dia: number }): Date {
  const d = new Date()
  d.setDate(1)
  d.setMonth(d.getMonth() - a.mesesAtras)
  d.setDate(Math.min(a.dia, 27))
  d.setHours(10, 0, 0, 0)
  // Nunca en el futuro: si el día calculado aún no ha llegado este mes, retrocede un mes
  if (d.getTime() > Date.now()) d.setMonth(d.getMonth() - 1)
  return d
}

export function formatRelativo(fecha: Date): string {
  const diff = Math.max(0, Date.now() - fecha.getTime())
  const min = Math.floor(diff / 60000)
  if (min < 60) return min <= 1 ? 'hace un momento' : `hace ${min} minutos`
  const h = Math.floor(min / 60)
  if (h < 24) return h === 1 ? 'hace 1 hora' : `hace ${h} horas`
  const d = Math.floor(h / 24)
  if (d < 14) return d === 1 ? 'hace 1 día' : `hace ${d} días`
  const sem = Math.floor(d / 7)
  if (sem < 9) return sem === 1 ? 'hace 1 semana' : `hace ${sem} semanas`
  const meses = Math.floor(d / 30.44)
  if (meses < 13) return meses <= 1 ? 'hace 1 mes' : `hace ${meses} meses`
  const anos = Math.floor(meses / 12)
  return anos === 1 ? 'hace 1 año' : `hace ${anos} años`
}

export function fechaComentario(a: Articulo, c: Comentario): Date {
  const f = fechaArticulo(a)
  const max = Date.now() - 86400000 // como mínimo ayer
  const t = Math.min(f.getTime() + c.diasDespues * 86400000, max)
  return new Date(t)
}

export function tiempoLectura(a: Articulo): number {
  const palabras = a.cuerpo.join(' ').split(/\s+/).length
  return Math.max(2, Math.round(palabras / 180))
}

// ---------- Contexto por año (párrafo de apertura del archivo histórico) ----------
const CONTEXTO_ANO: Record<number, string> = {
  2014: '2014 fue el año en que emprender empezó a verse como salida real tras la crisis: la reciente Ley de Emprendedores seguía asentándose y las ayudas al autoempleo empezaban a moverse.',
  2015: 'En 2015 la tarifa plana de autónomos se amplió y el ecosistema emprendedor español empezó a hablar en serio de validación y de números defendibles.',
  2016: '2016 trajo más competencia en casi todos los sectores y una lección clara: sin un plan sólido, ninguna entidad abre la puerta.',
  2017: 'En 2017 el emprendimiento local y los negocios de proximidad ganaron protagonismo frente al foco exclusivo en las startups tecnológicas.',
  2018: '2018 fue el año de los micronegocios digitales y de una administración que empezaba, por fin, a digitalizar los trámites del autónomo.',
  2019: 'En 2019 las ayudas autonómicas al emprendimiento se diversificaron y los bancos afinaron sus filtros de riesgo para los nuevos negocios.',
  2020: '2020 cambió las reglas del juego: la pandemia cerró sectores enteros y abrió otros, y la palabra "viabilidad" dejó de ser un concepto teórico.',
  2021: 'En 2021 llegaron los fondos europeos y con ellos una ola de ayudas a la digitalización que muchos autónomos descubrieron demasiado tarde.',
  2022: '2022 trajo la Ley Crea y Crece y los preparativos del nuevo sistema de cotización por ingresos reales para los autónomos.',
  2023: 'En 2023 entró en vigor la cotización por ingresos reales y los programas de digitalización siguieron repartiendo ayudas entre pymes y autónomos.',
  2024: 'En 2024 la financiación alternativa y las ayudas a la digitalización marcaron la agenda de quienes montaban negocio en España.',
  2025: 'En 2025 los programas de ayudas autonómicas se renovaron una vez más y la banca siguió pidiendo lo mismo de siempre: planes con números serios.',
  2026: 'Este año la conversación sobre emprendimiento gira en torno a lo de siempre: ayudas, financiación e ideas que aguantan un análisis serio.',
}

// ---------- Comentarios simulados ----------
const NICKS = [
  'MartaG_84', 'JoseLuis.M', 'EmprendeAnda', 'LauraVlc', 'CarlosT', 'inesg', 'RoberSevilla',
  'MadridNorte', 'Pedro_J', 'AnaBelenR', 'DaniEmprende', 'SoniaVgo', 'JordiBCN', 'MariaJesus',
  'Fran_G', 'PabloNavarra', 'CrisLeon', 'VeroEmprende', 'AlvaroS', 'LuciaMalaga', 'SergioBilbao',
  'NuriaTgn', 'IvanValladolid', 'ElenaRi', 'JaviMurcia', 'CarmenSevi', 'OscarG', 'PatriValencia',
  'RaulZgz', 'BeatrizA', 'AndresVlla', 'SilviaMadrid', 'ToniBcn', 'EvaCoruna', 'MarcosAsturias',
  'AlicanteEmprende', 'NoeSantander', 'GermanSalamanca', 'IsaGranada', 'XabiDonosti', 'RosaM',
  'DavidPamplona', 'CeliaBadajoz', 'HugoTenerife', 'AlbaOviedo',
]

const COMENTARIOS_GENERICOS = [
  'Muy interesante, justo estoy en este punto con mi proyecto. Gracias por explicarlo tan claro.',
  'Llevo meses dándole vueltas a montar algo y estos artículos me están ayudando mucho.',
  '¿Esto aplica igual si el negocio es online? Gracias de antemano.',
  'Me habría venido bien leer esto hace dos años, antes de meter la pata con mi primera tienda.',
  'Totalmente de acuerdo. A mí el banco me pidió justo lo que comentáis.',
  'Suena muy bien, pero en la práctica todo depende de quién te atienda, con perdón.',
  'Gracias por no pintarlo todo de color de rosa, se agradece la sinceridad.',
  'Lo que no tengo claro es por dónde empezar… ¿el plan antes o el alta?',
  'Acabo de descubrir el blog y ya me he leído cinco artículos seguidos.',
  '¿Actualizaréis esto con la próxima convocatoria?',
  'Mi cuñado montó algo así sin hacer números y cerró en un año. Ojalá hubiera leído esto.',
  'Este artículo debería leerlo todo el que quiera montar algo. De verdad.',
]

const COMENTARIOS_CAT: Record<Categoria, string[]> = {
  ayudas: [
    '¿Sabéis si la tarifa plana es compatible con el pago único? Cada fuente dice una cosa.',
    'Pedí el pago único el año pasado y el plan de negocio fue CLAVE. Haced caso al artículo.',
    'A mí me denegaron una ayuda autonómica por presentar la memoria fuera de plazo. Ojo con las fechas.',
    '¿Sigue abierta esta convocatoria? Me interesa para mi taller.',
    'Gracias por el repaso, no conocía ni la mitad de estas ayudas.',
    'Lo del pago único es real: yo cobré la prestación de golpe para mi obrador y me salvó el arranque.',
    '¿Estas ayudas son compatibles entre sí o hay que elegir una?',
    'En mi pueblo sobró presupuesto de la subvención local dos años seguidos. Nadie la pide.',
  ],
  normativa: [
    'La licencia de apertura me retrasó cuatro meses el local. Cuanta más información, mejor.',
    '¿Sabéis si esto ha cambiado con la norma nueva? Gracias.',
    'Por fin alguien lo explica sin palabrería jurídica.',
    'Mi gestor no me contó ni la mitad de esto. Gracias.',
    '¿Autónomo o SL para una academia con dos socios? Me pierdo entre tanta opción.',
    'Ojo con las terrazas: cada municipio interpreta la ordenanza a su manera.',
  ],
  consejos: [
    'El punto de equilibrio me cambió la forma de ver mi negocio. Gran artículo.',
    'Yo validé mi idea con veinte encuestas en la calle. Barato y revelador.',
    '¿Cuánto suele tardar un banco en responder a un plan? Llevo tres semanas esperando.',
    'Me quedo con lo de cobrar poco. Me pasó exactamente eso.',
    'Gracias por decir que a veces NO es buen momento. Nadie te cuenta eso.',
    'Lo del escenario pesimista me salvó, literalmente. Lo tenía escrito y supe qué hacer.',
  ],
  negocios: [
    'Monté algo parecido hace unos años y los números del artículo se acercan bastante a los míos.',
    '¿Qué opináis de este sector en ciudades de menos de 50.000 habitantes?',
    'En mi ciudad faltan servicios de este tipo a gritos.',
    'Los oficios tienen futuro: mi hermano es electricista y tiene lista de espera de dos meses.',
    'Trabajé en un negocio así y cerró en menos de un año. El artículo da en el clavo con los errores.',
    '¿Creéis que este sector aguantará la competencia online?',
  ],
  franquicias: [
    'Estuve a punto de firmar con una franquicia y el canon de entrada me echó para atrás.',
    '¿Qué franquicias recomendaríais para una ciudad de 50.000 habitantes?',
    'El contrato de franquicia hay que revisarlo con abogado sí o sí. Experiencia propia.',
    'Llevo años como franquiciado y confirmo: el plan de negocio propio es imprescindible.',
    'Las franquicias de estética saturan las capitales, pero en provincias aún hay hueco.',
  ],
}

const RESPUESTAS = [
  '¡Gracias por comentar, {nick}! Nos alegra que te sirva.',
  'Buena pregunta, {nick}. Depende del caso concreto: si quieres, envíanos tu idea desde el formulario de la web y la miramos gratis.',
  'Así es, {nick}. Los plazos y la documentación son el error más común que vemos.',
  'Gracias por compartir tu experiencia, {nick}. Los casos reales como el tuyo son los que más enseñan.',
  'Exacto, {nick}: antes de cualquier trámite, validar la idea. Es nuestro punto número uno siempre.',
  'Tomamos nota para un próximo artículo, {nick}. ¡Gracias por la sugerencia!',
]

function generaComentarios(slug: string, cat: Categoria, mesesAtras: number): Comentario[] {
  const rnd = mulberry32(hashStr(slug))
  const n =
    mesesAtras > 36 ? 2 + Math.floor(rnd() * 4) : mesesAtras > 6 ? 1 + Math.floor(rnd() * 4) : Math.floor(rnd() * 3)
  const pool = [...COMENTARIOS_CAT[cat], ...COMENTARIOS_GENERICOS]
  const usados = new Set<number>()
  const nicksUsados = new Set<number>()
  const out: Comentario[] = []
  for (let i = 0; i < n; i++) {
    let ti = Math.floor(rnd() * pool.length)
    while (usados.has(ti)) ti = Math.floor(rnd() * pool.length)
    usados.add(ti)
    let ni = Math.floor(rnd() * NICKS.length)
    while (nicksUsados.has(ni)) ni = Math.floor(rnd() * NICKS.length)
    nicksUsados.add(ni)
    const diasDespues = Math.max(1, Math.floor(rnd() * 120))
    const respuesta = rnd() < 0.4 ? RESPUESTAS[Math.floor(rnd() * RESPUESTAS.length)].replace('{nick}', NICKS[ni]) : undefined
    out.push({ nick: NICKS[ni], diasDespues, texto: pool[ti], respuesta })
  }
  return out.sort((a, b) => a.diasDespues - b.diasDespues)
}

// ---------- Utilidades ----------
function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// ---------- Artículos recientes (escritos a mano) ----------
interface Reciente extends Omit<Articulo, 'slug' | 'comentarios'> {}

const RECIENTES: Reciente[] = [
  {
    titulo: 'Cómo valoramos una idea de negocio antes de darla por viable',
    categoria: 'consejos',
    mesesAtras: 0,
    dia: 4,
    extracto: 'Mercado, márgenes, momento y quién eres tú: los cuatro filtros por los que pasa cada idea que nos enviáis.',
    cuerpo: [
      'Cada semana recibimos ideas de todo tipo: bares, apps, tiendas online, servicios a domicilio, clínicas. Algunas son excelentes. Otras, con sinceridad, no lo son. Y como nos preguntáis a menudo cómo decidimos, aquí está el proceso completo.',
      '## 1. Mercado: ¿hay suficiente gente dispuesta a pagar?',
      'Lo primero que miramos no es la idea, es el mercado. Tamaño real en tu zona, poder adquisitivo de tu cliente, competencia existente y hueco diferencial. Una idea brillante en un mercado de quince personas no es un negocio, es un hobby caro.',
      '## 2. Márgenes: ¿los números cubren los costes con holgura?',
      'Calculamos el punto de equilibrio con costes realistas: todos los fijos, todos los variables, y tu sueldo incluido. Si el negocio necesita vender el triple de lo que la zona permite para no perder dinero, la idea necesita un ajuste, no un plan.',
      '## 3. Momento: ¿el sector sube o baja?',
      'Las tendencias importan. Hay sectores en crecimiento estructural (cuidados, oficios, servicios a domicilio) y sectores en caída o saturación. Montar contra la tendencia es posible, pero exige una diferenciación que pocas ideas traen de serie.',
      '## 4. Tú: ¿encajas con lo que la idea exige?',
      'El último filtro es personal: experiencia, dedicación posible, colchón financiero. La misma idea es viable en unas manos y ruina en otras. Por eso nuestro formulario pregunta más que el título de tu proyecto.',
      '¿El resultado? Si tu idea pasa los cuatro filtros, te lo decimos y te proponemos el siguiente paso. Si no, te explicamos por qué, también gratis. Un "no" a tiempo es la mejor noticia que puedes recibir: te ahorra miles de euros y meses de vida.',
    ],
    gancho: '¿Quieres saber si tu idea pasaría estos cuatro filtros? Envíanosla: te decimos en hasta 3 días laborables si es viable. Gratis y sin compromiso.',
  },
  {
    titulo: 'Las ayudas al emprendimiento que siguen abiertas este año (y sus plazos reales)',
    categoria: 'ayudas',
    mesesAtras: 0,
    dia: 18,
    extracto: 'Tarifa plana, pago único, convocatorias autonómicas y locales: un mapa de lo que puedes pedir ahora mismo.',
    cuerpo: [
      'Cada cierto tiempo conviene parar y ordenar el mapa de ayudas disponibles, porque el ruido es enorme y los plazos, cortos. Esto es lo que sigue abierto o se renueva cada año para quien monta un negocio en España.',
      '## Las dos grandes, siempre activas',
      'La tarifa plana de autónomos (cuota reducida al inicio de la actividad) y el pago único del paro (capitalizar tu prestación para invertir en el negocio) son la base. No son compatibles en todos los casos y el orden de solicitud importa: pide consejo antes de tramitar.',
      '## Convocatorias autonómicas: las que casi nadie mira',
      'Cada comunidad publica las suyas: cheques de emprendimiento, ayudas a la inversión, bonificaciones de alquiler. Los plazos suelen durar semanas y la publicidad es mínima. La regla práctica: revisa el boletín oficial de tu comunidad una vez al mes o deja que alguien lo haga por ti.',
      '## El nivel local: dinero que sobra',
      'Ayuntamientos y diputaciones sacan convocatorias para atraer negocios, sobre todo en municipios pequeños. La competencia es bajísima y las condiciones, sorprendentemente buenas. Es la ayuda con mejor ratio esfuerzo-probabilidad que existe.',
      '¿El problema? Que cada ayuda pide una memoria del proyecto con números defendibles. Y ahí, un plan de negocio serio no es un trámite: es la llave.',
    ],
    gancho: '¿Sabes qué ayudas puedes pedir para tu idea y tu zona? Empieza por validar tu idea gratis: te decimos en hasta 3 días laborables si es viable.',
  },
  {
    titulo: 'Capitalizar el paro: las dudas que nos llegan cada semana, resueltas',
    categoria: 'ayudas',
    mesesAtras: 1,
    dia: 6,
    extracto: 'Compatibilidad con la tarifa plana, cuánto puedes cobrar, qué pasa si el negocio cierra: las preguntas reales, con respuestas claras.',
    cuerpo: [
      'El pago único del paro es, con diferencia, el tema que más preguntas genera en nuestro formulario. Recopilamos las dudas que nos llegan cada semana y las resolvemos de forma clara.',
      '## ¿Cuánto puedo cobrar?',
      'El total de la prestación que te quede por percibir, de una sola vez, destinado a la inversión del negocio. Si llevas poco tiempo en el paro, la cifra puede ser relevante: miles de euros de financiación propia sin intereses ni avales.',
      '## ¿Es compatible con la tarifa plana?',
      'Depende de la modalidad y de la normativa vigente en tu caso concreto. En algunos escenarios sí, en otros hay que elegir. Es la pregunta técnica más importante antes de tramitar nada, y la respuesta correcta vale dinero.',
      '## ¿Y si el negocio no funciona?',
      'Cerrar el negocio no significa perderlo todo: según el tiempo transcurrido y la modalidad, puedes reincorporarte a la prestación restante. Pero las condiciones importan mucho, y conviene conocerlas ANTES de dar el paso, no después.',
      '## ¿Qué documentación pesa más?',
      'La que acredita la viabilidad del proyecto. Una memoria seria con números defendibles sostiene la solicitud ante cualquier revisión. Es el mismo documento que luego te sirve para el banco o para una subvención: el plan de negocio.',
    ],
    gancho: '¿Sabías que puedes cobrar tu paro de una sola vez para arrancar? Primero valida tu idea gratis: te decimos en hasta 3 días laborables si merece la pena.',
  },
  {
    titulo: 'Qué está pidiendo la banca ahora a los nuevos negocios',
    categoria: 'consejos',
    mesesAtras: 1,
    dia: 21,
    extracto: 'Aportación propia, previsiones defendibles y experiencia: el triángulo que decide las financiaciones este año.',
    cuerpo: [
      'Hablamos cada mes con emprendedores que vuelven del banco con la misma sensación: "me han pedido de todo". La realidad es más simple: la banca pide tres cosas, y las tres se pueden preparar.',
      '## 1. Aportación propia',
      'Pedir el 100% de la inversión transmite que no te juegas nada. Aportar entre un 20% y un 30% propio (ahorros, pago único del paro, inversores cercanos) cambia por completo la conversación. No es solo dinero: es compromiso demostrable.',
      '## 2. Previsiones defendibles',
      'El analista de riesgos ha visto miles de planes. Detecta en minutos las ventas infladas, los costes olvidados y los márgenes imposibles. Unas cifras modestas pero justificadas línea a línea consiguen más financiación que un Excel brillante sin soporte.',
      '## 3. Experiencia y equipo',
      '¿Quién ejecuta esto? Tu experiencia en el sector (o la de tu equipo) es la garantía que no aparece en la nómina. Si falta, se compensa: formación, socios, asesoramiento. Pero hay que abordarla, no esconderla.',
      'La buena noticia: ninguna de las tres exige ser rico. Exige preparación. Y la preparación empieza mucho antes de sentarse con el director de la sucursal.',
    ],
    gancho: '¿Tu proyecto aguantaría el análisis de riesgos de un banco? Empieza por validar tu idea gratis: te diremos exactamente dónde estás.',
  },
  {
    titulo: 'Negocios que están funcionando en ciudades medias (y por qué)',
    categoria: 'negocios',
    mesesAtras: 2,
    dia: 8,
    extracto: 'Servicios para mayores, oficios, formación y comercio especializado: el mapa real fuera de las grandes capitales.',
    cuerpo: [
      'Se habla mucho de emprender en Madrid o Barcelona, pero algunos de los negocios más sanos que analizamos están en ciudades de 20.000 a 150.000 habitantes. Esto es lo que funciona ahí, y por qué.',
      '## Servicios para mayores y cuidados',
      'La población de las ciudades medias envejece más rápido que la de las capitales, y la oferta de servicios no llega. Acompañamiento, fisioterapia a domicilio, adaptación de viviendas: demanda estructural, competencia mínima.',
      '## Oficios y reformas',
      'La escasez de profesionales (electricistas, fontaneros, carpinteros) es aún más visible fuera de las grandes ciudades. Quien profesionaliza la gestión —presupuestos rápidos, agenda ordenada— se lleva el mercado.',
      '## Formación y academias',
      'Oposiciones, idiomas, refuerzo escolar: la demanda es estable y la competencia, a menudo, poco profesionalizada. Un centro bien gestionado con resultados demostrables no tiene techo cercano.',
      '## Comercio especializado',
      'La tienda genérica muere también en la ciudad media. Pero la especializada (alimentación, mascotas, deporte de nicho) con servicio experto y canal online propio, aguanta y crece.',
      'El patrón común: necesidades reales sin cubrir + gestión profesional + costes fijos bajos. Lo que en la capital es uno más, en la ciudad media puede ser el único.',
    ],
    gancho: '¿Tu idea es para una ciudad media o un pueblo? Valídala gratis: el tamaño del mercado local es lo primero que analizamos.',
  },
  {
    titulo: 'Franquicias que crecen en España y qué hay detrás de sus números',
    categoria: 'franquicias',
    mesesAtras: 2,
    dia: 22,
    extracto: 'Servicios a domicilio, estética especializada y restauración de conveniencia: los sectores que abren más unidades y lo que el folleto no cuenta.',
    cuerpo: [
      'El mapa de franquicias en España se mueve: los sectores que más unidades abren ya no son los de hace una década. Esto es lo que crece y, más importante, lo que hay detrás de las cifras de crecimiento.',
      '## Servicios a domicilio y cuidados',
      'Es el sector con mejor combinación de inversión baja y demanda creciente. Canon moderado, sin local caro, mercado en expansión. La trampa: el negocio depende de tu capacidad de gestionar equipos, no del nombre de la marca.',
      '## Estética especializada',
      'Centros de un solo servicio (uñas, depilación, cejas) en lugar del salón genérico. Especialización = procesos simples = franquicia replicable. Mira la saturación de tu zona antes de firmar: en capitales, algunas marcas compiten contra sí mismas.',
      '## Restauración de conveniencia',
      'Formatos de comida rápida y para llevar con inversión contenida. Aquí la letra pequeña manda: royalties sobre ventas brutas (no sobre beneficio), compras obligadas a la central, costes de plataformas de delivery.',
      '## La pregunta que lo resume todo',
      '¿La central gana dinero cuando tú vendes (royalties) o cuando tú entras (cánones)? La primera opción es una franquicia; la segunda, un negocio de vender franquicias. Antes de firmar, pide los datos de cierres de los últimos tres años y habla con franquiciados elegidos por ti.',
    ],
    gancho: '¿Valoras una franquicia o montar algo propio? Si tienes idea propia, valídala gratis: quizá no necesites pagar ningún canon.',
  },
  {
    titulo: 'El informe de ayudas: qué es y por qué cada vez más emprendedores lo piden primero',
    categoria: 'ayudas',
    mesesAtras: 3,
    dia: 7,
    extracto: 'Un mapa personalizado de las ayudas que encajan con tu perfil, tu sector y tu ubicación. Así se trabaja y así se usa.',
    cuerpo: [
      'Cuando lanzamos el informe personalizado de ayudas pensamos que sería un complemento del plan de negocio. Nos equivocamos: para muchos emprendedores se ha convertido en el primer paso, incluso antes del plan.',
      '## Qué es exactamente',
      'Un documento que cruza tu perfil (edad, situación laboral, forma jurídica prevista), tu sector y tu ubicación con todas las convocatorias abiertas o recurrentes: estatales, autonómicas, provinciales y municipales. El resultado: solo las ayudas que TE aplican, con requisitos, plazos y cuantías.',
      '## Por qué se pide antes que el plan',
      'Porque cambia los números. Una subvención de inversión, una bonificación de alquiler o un cheque de autoempleo pueden transformar la viabilidad de un proyecto. Conocer el mapa de ayudas antes de cerrar la financiación es simplemente hacer los deberes en orden.',
      '## Lo que no es',
      'No es una garantía de concesión: nadie honesto puede prometerte una subvención. Es la diferencia entre buscar a ciegas y buscar con mapa. La solicitud, la memoria y los números siguen siendo tuyos (y ahí entra el plan).',
    ],
    gancho: '¿Quieres saber qué ayudas encajan con tu idea? Empieza por validarla gratis: te decimos en hasta 3 días laborables si es viable.',
  },
  {
    titulo: 'Cinco señales de que tu idea necesita un ajuste antes de pedir financiación',
    categoria: 'consejos',
    mesesAtras: 3,
    dia: 20,
    extracto: 'Ni competencia, ni márgenes claros, ni escenario pesimista: los agujeros que un analista detecta en minutos.',
    cuerpo: [
      'No todas las ideas que rechazan los bancos son malas ideas. Muchas son buenas ideas con agujeros que el propio emprendedor no ve. Estas son las cinco señales más habituales.',
      '## 1. "No tengo competencia"',
      'Si no hay competencia, o no has mirado bien, o no hay mercado. Ambas respuestas inquietan a un analista. La competencia existe siempre: aunque sea la forma en que el cliente resuelve hoy el problema sin ti.',
      '## 2. Márgenes que no recuerdas de memoria',
      'Si no sabes cuánto ganas por cada venta sin mirar el Excel, aún no controlas tu negocio. El margen por unidad es el número que decide si hay negocio o solo hay movimiento.',
      '## 3. Previsión lineal hacia arriba',
      'Ventas que suben cada mes en línea recta desde el primer día: la firma del optimismo sin datos. Los negocios reales tienen estacionalidad, curvas de aprendizaje y meses malos.',
      '## 4. Sin escenario pesimista',
      '"Todo saldrá bien" no es una estrategia. Si no has calculado cuánto resistes vendiendo la mitad de lo previsto, no estás pidiendo financiación: estás pidiendo fe.',
      '## 5. El plan lo escribió otro y no lo sabes defender',
      'En la entrevista, el plan eres tú. Si las cifras no salen de tu boca con naturalidad, el analista asume (con razón) que no son tuyas.',
    ],
    gancho: '¿Tu idea tiene alguna de estas cinco señales? Valídala gratis: te diremos con sinceridad qué aguanta y qué no.',
  },
  {
    titulo: 'Servicios a personas mayores: el nicho que nadie quiere mirar',
    categoria: 'negocios',
    mesesAtras: 4,
    dia: 9,
    extracto: 'Demanda estructural, competencia escasa y márgenes sanos: los números de un sector que crece cada año.',
    cuerpo: [
      'Hay sectores de moda y sectores de verdad. Los servicios a personas mayores son de los segundos: crecen cada año, tienen poca competencia profesionalizada y, sin embargo, casi nadie los mira cuando piensa en montar un negocio.',
      '## La demografía no negocia',
      'Cada año hay más personas mayores que quieren vivir en su casa el máximo tiempo posible, y familias que no llegan a todo. Acompañamiento, gestión de trámites, adaptación de viviendas, fisioterapia a domicilio, comidas, transporte: la lista de necesidades insatisfechas es larguísima.',
      '## Por qué hay poca competencia',
      'Porque no es un sector "aspiracional": no sale en las portadas ni tiene glamour de startup. Quien entra con profesionalidad (seguros, credenciales, procesos, trato humano excelente) se encuentra un mercado esperando.',
      '## Los números',
      'Inversión inicial baja (es servicio, no producto), ingresos recurrentes (el cliente se queda años), margen por hora razonable que mejora con equipos bien gestionados. El cuello de botella es contratar bien: la confianza es el producto.',
      'Si buscas un sector donde el análisis de viabilidad salga bien con frecuencia, este es uno de ellos. Pero como siempre: la viabilidad depende de tu zona, tu propuesta y tus números.',
    ],
    gancho: '¿Tu idea es de servicios o cuidados? Valídala gratis: es un sector donde el análisis suele dar buenas noticias.',
  },
  {
    titulo: 'Abrir con un socio: los acuerdos que conviene firmar el primer día',
    categoria: 'normativa',
    mesesAtras: 4,
    dia: 23,
    extracto: 'Reparto de participaciones, salidas, decisiones y qué pasa si uno se va: el pacto de socios explicado sin jurídico.',
    cuerpo: [
      'Montar un negocio con un socio es como casarse: todo va bien hasta que algo va mal. La diferencia entre una separación civilizada y una guerra es un documento firmado el primer día: el pacto de socios.',
      '## Lo que debe quedar escrito',
      'Reparto de participaciones y por qué (no siempre 50/50 es justo), aportaciones de cada uno (dinero, trabajo, contactos), quién decide qué, cómo se reparten los beneficios y cómo se valora la empresa si uno quiere salir.',
      '## Las cláusulas que salvan amistades',
      'La de salida (qué pasa si uno se va a los seis meses), la de no competencia (que tu socio no monte lo mismo enfrente) y la de resolución de bloqueos (quién desempata cuando dos socios al 50% no se ponen de acuerdo).',
      '## El error del 50/50',
      'El reparto a medias parece justo y es la receta del bloqueo: sin mayoría, ninguna decisión difícil sale adelante. Si lo hacéis, diseñad el mecanismo de desempate desde el principio.',
      'Un pacto de socios cuesta unas horas y un abogado razonable. No tenerlo puede costar la empresa. Y la amistad.',
    ],
    gancho: '¿Montas tu idea con un socio? Valídala gratis primero: la viabilidad se decide antes que el reparto.',
  },
  {
    titulo: 'Por qué rechazamos ideas (y por qué es lo mejor que nos puede pasar)',
    categoria: 'consejos',
    mesesAtras: 5,
    dia: 10,
    extracto: 'Nuestro objetivo no es redactar muchos planes de negocio. Es ser la semilla de muchos negocios que funcionan.',
    cuerpo: [
      'Este artículo nos hacía falta escribirlo desde hace tiempo, porque hay una pregunta que nos llega a menudo: "¿Por qué validáis gratis las ideas antes de aceptar el trabajo? ¿No perdéis clientes?"',
      'Sí. Perdemos clientes. Y es exactamente lo que queremos.',
      '## El modelo que no queremos',
      'En este sector se puede ganar dinero redactando planes para cualquier idea que pague. Viable o no. El documento se entrega, se cobra, y si el negocio fracasa a los ocho meses, el plan ya no es responsabilidad de nadie.',
      '## El modelo que elegimos',
      'Nosotros trabajamos al revés: primero validamos la idea, gratis. Si el mercado aguanta, los márgenes cuadran y el momento acompaña, entonces (y solo entonces) proponemos construir el plan. Si la idea no es viable, lo decimos con los motivos por escrito. También gratis.',
      '## Por qué nos compensa',
      'Porque un plan de negocio que ayuda a abrir un negocio que funciona es la mejor publicidad que existe. Y porque nuestra reputación vale más que cualquier factura: cuando un banco o una administración ve nuestro trabajo, ve proyectos que se sostienen.',
      'Nuestro objetivo no es redactar muchos planes de negocio. Es ser la semilla de muchos negocios que funcionan. Y eso empieza, siempre, por saber decir que no.',
    ],
    gancho: '¿Quieres saber en qué lado estás? Envíanos tu idea: te diremos en hasta 3 días laborables si es viable. Gratis, y con total sinceridad.',
  },
]

// ---------- Generación del archivo histórico ----------
const ORDEN_CATS: Categoria[] = ['ayudas', 'consejos', 'negocios', 'normativa', 'franquicias']

function varianteTitulo(t: string, ano: number, uso: number): string {
  if (uso === 0) return t
  if (/\b20\d{2}\b/.test(t)) return t
  if (uso === 1) return `${t} en ${ano}`
  return `${t}: claves en ${ano}`
}

function generaArchivo(): Articulo[] {
  const out: Articulo[] = []
  const seedsPorCat: Record<Categoria, Seed[]> = {
    ayudas: SEEDS.filter((s) => s.cat === 'ayudas'),
    normativa: SEEDS.filter((s) => s.cat === 'normativa'),
    consejos: SEEDS.filter((s) => s.cat === 'consejos'),
    negocios: SEEDS.filter((s) => s.cat === 'negocios'),
    franquicias: SEEDS.filter((s) => s.cat === 'franquicias'),
  }
  const cursor: Record<Categoria, number> = { ayudas: 0, normativa: 0, consejos: 0, negocios: 0, franquicias: 0 }

  // Recorrer de más reciente a más antiguo para que ARTICULOS quede en orden cronológico inverso
  for (let m = 6; m <= MESES_TOTALES; m++) {
    const now = new Date()
    const fechaRef = new Date(now.getFullYear(), now.getMonth() - m, 1)
    const ano = fechaRef.getFullYear()
    for (let slot = 0; slot < 2; slot++) {
      const rnd = mulberry32(hashStr(`slot-${m}-${slot}`))
      const cat = ORDEN_CATS[(m * 2 + slot) % ORDEN_CATS.length]
      const pool = seedsPorCat[cat]
      const idx = cursor[cat]++
      const seed = pool[idx % pool.length]
      const uso = Math.floor(idx / pool.length)
      const dia = slot === 0 ? 3 + Math.floor(rnd() * 10) : 15 + Math.floor(rnd() * 11)
      const titulo = varianteTitulo(seed.t, ano, uso)
      const slug = `${slugify(titulo)}-${ano}-${m}-${slot}`
      const cuerpo = [CONTEXTO_ANO[ano] ?? CONTEXTO_ANO[2026], ...seed.p]
      out.push({
        slug,
        titulo,
        categoria: cat,
        mesesAtras: m,
        dia,
        extracto:
          seed.p[0].length > 160
            ? seed.p[0].slice(0, 160).slice(0, seed.p[0].slice(0, 160).lastIndexOf(' ')).trimEnd() + '…'
            : seed.p[0],
        cuerpo,
        gancho: seed.g,
        comentarios: generaComentarios(slug, cat, m),
      })
    }
  }
  return out
}

// ---------- Export principal ----------
export const ARTICULOS: Articulo[] = [
  ...RECIENTES.map((r) => ({
    ...r,
    slug: slugify(r.titulo),
    comentarios: generaComentarios(slugify(r.titulo), r.categoria, r.mesesAtras),
  })),
  ...generaArchivo(),
]

export function getArticulo(slug: string): Articulo | undefined {
  return ARTICULOS.find((a) => a.slug === slug)
}

export function relacionados(a: Articulo, n = 3): Articulo[] {
  return ARTICULOS.filter((x) => x.slug !== a.slug && x.categoria === a.categoria).slice(0, n)
}
