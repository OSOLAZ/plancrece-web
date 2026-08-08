// ---------------------------------------------------------------------------
// Motor de la comunidad PlanCrece (2014 → hoy).
// SIMULACIÓN: todo el contenido es sintético (isDemo: true). Antes del
// lanzamiento real, sustituir por contenido real o eliminar.
//
// - Fechas SIEMPRE relativas ("hace X meses"), calculadas en render.
// - Generación determinista (misma semilla → mismo foro en cada visita).
// - Densidad temporal creciente: pocos hilos en 2014, muchos en 2025-2026.
// - Los perfiles no escriben antes de su año de alta (respeto de arcos).
// ---------------------------------------------------------------------------

import {
  SEMILLAS, PESOS, categoriaLabel,
  type CategoriaForo, type SemillaHilo, type RespuestaFijada,
} from './foroContenido'
import {
  TEMAS, APERTURAS, MATICES, NUCLEOS_GENERICOS, NUCLEOS_CAT,
  SEGUIMIENTOS_OP, DISENSOS, FALTAN_DATOS, CORRECCIONES, NUEVOS,
  EQUIPO_RESPUESTAS, EQUIPO_MODERACION, REDACCION, type Tema,
} from './foroBancos'
import { PERFILES, EQUIPO, getPerfil, type PerfilForo } from './foroPerfiles'

export { categoriaLabel }
export type { CategoriaForo }

// ---------- Tipos públicos ----------
export type EstadoHilo = 'resuelta' | 'en_debate' | 'analisis'

export interface RespuestaForo {
  id: string
  autorId: string
  fecha: Date
  texto: string
  util: number
}

export interface HiloForo {
  id: string
  slug: string
  titulo: string
  categoria: CategoriaForo
  tags: string[]
  autorId: string
  fecha: Date
  etapa: string
  presupuesto: string | null
  estado: EstadoHilo
  cuerpo: string[]
  respuestas: RespuestaForo[]
  utiles: number
  vistas: number
  isDemo: true
}

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

const pick = <T,>(rng: () => number, arr: T[]): T =>
  arr[Math.floor(rng() * arr.length)]

// ---------- Fechas ----------
const AHORA = Date.now()

function fechaHilo(mesesAtras: number, dia: number): Date {
  const d = new Date()
  d.setDate(1)
  d.setMonth(d.getMonth() - mesesAtras)
  d.setDate(Math.min(dia, 27))
  d.setHours(11, 0, 0, 0)
  if (d.getTime() > AHORA) d.setMonth(d.getMonth() - 1)
  return d
}

export function formatRelativo(fecha: Date): string {
  const diff = Math.max(0, AHORA - fecha.getTime())
  const dias = Math.floor(diff / 86400000)
  if (dias < 1) return 'hoy'
  if (dias === 1) return 'ayer'
  if (dias < 30) return `hace ${dias} días`
  const meses = Math.floor(dias / 30.44)
  if (meses < 12) return meses === 1 ? 'hace 1 mes' : `hace ${meses} meses`
  const anos = Math.floor(meses / 12)
  return anos === 1 ? 'hace 1 año' : `hace ${anos} años`
}

// ---------- Utilidades ----------
function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '')
}

const PRESUPUESTOS = [
  'menos de 5.000 €', '5.000 - 15.000 €', '15.000 - 30.000 €',
  '30.000 - 60.000 €', 'más de 60.000 €',
]

const ESTADO_LABEL: Record<EstadoHilo, string> = {
  resuelta: 'Resuelta',
  en_debate: 'En debate',
  analisis: 'Requiere análisis individual',
}
export const estadoLabel = (e: EstadoHilo) => ESTADO_LABEL[e]

// ---------- Moldes de cuerpo (para temas generativos) ----------
type Molde = (t: Tema) => string[]
const MOLDES: Molde[] = [
  (t) => [
    `${t.detalle.charAt(0).toUpperCase()}${t.detalle.slice(1)}.`,
    `${t.duda.charAt(0).toUpperCase()}${t.duda.slice(1)}.`,
    '¿Alguien ha pasado por algo parecido? Cualquier experiencia, buena o mala, me sirve.',
  ],
  (t) => [
    `Llevo un tiempo dándole vueltas a ${t.tema} y antes de dar ningún paso prefiero preguntar por aquí.`,
    `${t.detalle.charAt(0).toUpperCase()}${t.detalle.slice(1)}.`,
    `${t.duda.charAt(0).toUpperCase()}${t.duda.slice(1)}. ¿Cómo lo veis?`,
  ],
  (t) => [
    `Abro este hilo sobre ${t.tema} porque no encuentro experiencias de primera mano y aquí la gente cuenta las cosas tal cual.`,
    `${t.detalle.charAt(0).toUpperCase()}${t.detalle.slice(1)}. ${t.duda.charAt(0).toUpperCase()}${t.duda.slice(1)}.`,
  ],
  (t) => [
    `${t.detalle.charAt(0).toUpperCase()}${t.detalle.slice(1)}.`,
    `El caso es que ${t.duda}.`,
    'Se agradece cualquier orientación, aunque sea para decirme que voy mal encaminado.',
  ],
  (t) => [
    `Me presento: estoy en esa fase en la que todo son dudas. ${t.detalle.charAt(0).toUpperCase()}${t.detalle.slice(1)}.`,
    `${t.duda.charAt(0).toUpperCase()}${t.duda.slice(1)}.`,
    'Gracias de antemano a quien se tome el tiempo de contestar.',
  ],
  (t) => [
    `Igual es una pregunta tonta, pero prefiero hacerla aquí que equivocarme luego. El tema es ${t.tema}.`,
    `${t.detalle.charAt(0).toUpperCase()}${t.detalle.slice(1)}. ${t.duda.charAt(0).toUpperCase()}${t.duda.slice(1)}.`,
  ],
  (t) => [
    `${t.detalle.charAt(0).toUpperCase()}${t.detalle.slice(1)}.`,
    `He buscado información y cada fuente dice una cosa, así que recurro a la experiencia real de esta comunidad: ${t.duda}.`,
  ],
  (t) => [
    `Cuento mi situación por si a alguien le suena. ${t.detalle.charAt(0).toUpperCase()}${t.detalle.slice(1)}.`,
    `${t.duda.charAt(0).toUpperCase()}${t.duda.slice(1)}.`,
    'No busco que nadie decida por mí, solo entender cómo lo habéis vivido vosotros.',
  ],
  (t) => [
    `Hola a todos. ${t.detalle.charAt(0).toUpperCase()}${t.detalle.slice(1)}.`,
    `Mi duda concreta: ${t.duda}.`,
    'He visto hilos parecidos antiguos pero el contexto cambia y prefiero preguntar de nuevo.',
  ],
  (t) => [
    `Después de mucho pensarlo me he decidido a escribir sobre ${t.tema}.`,
    `${t.detalle.charAt(0).toUpperCase()}${t.detalle.slice(1)}.`,
    `${t.duda.charAt(0).toUpperCase()}${t.duda.slice(1)}. Gracias por leerme.`,
  ],
]

// ---------- Selección de autores ----------
function eligeAutor(
  rng: () => number, ano: number, evitar?: string
): PerfilForo {
  const cands = PERFILES.filter(
    (p) => p.alta <= ano && p.rol !== 'equipo' && p.id !== evitar
  )
  const pesos = cands.map((p) => {
    let w = 1
    if (p.id.startsWith('u-') && p.alta <= ano - 1) w += 0.5
    // veteranos (los 15 primeros de PERFILES) aparecen más: arcos narrativos
    if (PERFILES.indexOf(p) < 15) w += 2
    return w
  })
  let total = pesos.reduce((a, b) => a + b, 0)
  let r = rng() * total
  for (let i = 0; i < cands.length; i++) {
    r -= pesos[i]
    if (r <= 0) return cands[i]
  }
  return cands[0]
}

// ---------- Generación de respuestas ----------
function generaRespuestas(
  rng: () => number, hiloId: string, cat: CategoriaForo,
  autorHilo: PerfilForo, fechaIni: Date, fijadas?: RespuestaFijada[]
): RespuestaForo[] {
  const ano = fechaIni.getFullYear()
  // Respuestas fijadas (escritas a mano), solo si el autor ya estaba de alta
  const fijasOk = (fijadas ?? []).filter((f) => {
    const p = PERFILES.find((x) => x.id === f.autor)
    return p && p.alta <= ano
  })
  const nResp =
    fijasOk.length + 2 + Math.round(Math.pow(rng(), 1.4) * 10) // sesgo bajo
  const conEquipo = rng() < 0.27 && ano >= EQUIPO.alta
  const posEquipo = conEquipo ? 1 + Math.floor(rng() * Math.max(1, nResp - 1)) : -1

  const respuestas: RespuestaForo[] = []
  let cursorMs = fechaIni.getTime() + 86400000 * (1 + rng() * 5)
  let ultimoAutor = autorHilo.id

  for (let i = 0; i < nResp; i++) {
    const fecha = new Date(Math.min(cursorMs, AHORA - 3600000))
    const esEquipo = i === posEquipo
    let texto: string
    let autorId: string

    if (i < fijasOk.length) {
      const f = fijasOk[i]
      autorId = f.autor
      texto = f.texto
      respuestas.push({
        id: `${hiloId}-r${i}`,
        autorId,
        fecha: new Date(
          Math.min(fechaIni.getTime() + f.dias * 86400000, AHORA - 3600000)
        ),
        texto,
        util: f.util,
      })
      ultimoAutor = autorId
      cursorMs += 86400000 * (1 + rng() * 20)
      continue
    }

    // Más allá de ~2 años de vida, el hilo muere: no se añaden más
    if (cursorMs - fechaIni.getTime() > 730 * 86400000) break

    // Evitar ráfagas irreales: si ya hay 3 respuestas en los últimos 15 días,
    // cortamos el hilo (un foro no revive 6 veces la misma semana)
    if (AHORA - cursorMs < 15 * 86400000) {
      const recientes = respuestas.filter(
        (r) => AHORA - r.fecha.getTime() < 15 * 86400000
      ).length
      if (recientes >= 3) break
    }

    if (esEquipo) {
      autorId = EQUIPO.id
      texto = pick(rng, EQUIPO_RESPUESTAS)
    } else {
      const esOp = rng() < 0.16 && respuestas.length >= 2
      if (esOp) {
        autorId = autorHilo.id
        texto = pick(rng, SEGUIMIENTOS_OP)
      } else {
        const autor = eligeAutor(rng, Math.max(ano, fecha.getFullYear()), ultimoAutor)
        autorId = autor.id
        const nuevo = autor.alta >= 2022 && rng() < 0.3
        if (nuevo) {
          texto = pick(rng, NUEVOS)
        } else {
          const roll = rng()
          let nucleo: string
          if (roll < 0.09) nucleo = pick(rng, DISENSOS)
          else if (roll < 0.15) nucleo = pick(rng, FALTAN_DATOS)
          else if (roll < 0.2) nucleo = pick(rng, CORRECCIONES)
          else if (roll < 0.62) nucleo = pick(rng, NUCLEOS_CAT[cat])
          else nucleo = pick(rng, NUCLEOS_GENERICOS)
          const ap = pick(rng, APERTURAS)
          const mz = pick(rng, MATICES)
          const limpio = nucleo.replace(/[.,;:]\s*$/, '')
          const cuerpo = limpio.charAt(0).toUpperCase() + limpio.slice(1)
          const minus = limpio.charAt(0).toLowerCase() + limpio.slice(1)
          texto = [
            ap ? `${ap}: ${minus}.` : `${cuerpo}.`,
            mz || '',
          ].filter(Boolean).join(' ')
        }
      }
    }

    respuestas.push({
      id: `${hiloId}-r${i}`,
      autorId,
      fecha,
      texto,
      util: esEquipo ? 3 + Math.floor(rng() * 15) : Math.floor(rng() * 20),
    })
    ultimoAutor = autorId
    // Un hilo vivo responde pronto al principio y luego espiga:
    // el avance entre respuestas crece (días → semanas → meses)
    const tramo = 1 + i * i * 1.1
    cursorMs += 86400000 * (tramo * (0.7 + rng() * 0.8))
  }
  return respuestas
}

// ---------- Ensamblado del foro ----------
interface ItemForo {
  cat: CategoriaForo
  titulo: string
  cuerpo: string[]
  tags: string[]
  etapas: string[]
  minAno: number
  maxAno: number
  fijadas?: RespuestaFijada[]
}

const CATS = Object.keys(PESOS) as CategoriaForo[]
const PESOS_LISTA = CATS.map((c) => PESOS[c])
const PESO_TOTAL = PESOS_LISTA.reduce((a, b) => a + b, 0)

function eligeCat(rng: () => number): CategoriaForo {
  let r = rng() * PESO_TOTAL
  for (let i = 0; i < CATS.length; i++) {
    r -= PESOS_LISTA[i]
    if (r <= 0) return CATS[i]
  }
  return CATS[0]
}

function buildHilos(): HiloForo[] {
  const hilos: HiloForo[] = []
  // Un título/combinación puede reaparecer, pero nunca dentro de 3 años
  // (en los foros reales la misma pregunta vuelve cada cierto tiempo).
  const usadoEn = new Map<string, number>()
  const disponible = (clave: string, ano: number) =>
    (usadoEn.get(clave) ?? -99) <= ano - 3
  const marcar = (clave: string, ano: number) => usadoEn.set(clave, ano)

  // Banco unificado: semillas (uso único) + temas (varios usos con moldes)
  const itemsPorCat = {} as Record<CategoriaForo, ItemForo[]>
  for (const c of CATS) itemsPorCat[c] = []

  const deSemilla = (s: SemillaHilo): ItemForo => ({
    cat: s.cat, titulo: s.titulo, cuerpo: s.cuerpo, tags: s.tags,
    etapas: s.etapas, minAno: s.minAno, maxAno: s.maxAno,
    fijadas: s.fijadas,
  })
  SEMILLAS.forEach((s) => itemsPorCat[s.cat].push(deSemilla(s)))

  const now = new Date()
  const mesesTotales = (now.getFullYear() - 2014) * 12 + now.getMonth()

  let contador = 0
  for (let m = mesesTotales; m >= 0; m--) {
    const fechaRef = new Date()
    fechaRef.setMonth(fechaRef.getMonth() - m)
    const ano = fechaRef.getFullYear()
    const prog = 1 - m / mesesTotales // 0 en 2014 → 1 ahora
    const base = 0.75 + prog * 3.4 // densidad creciente
    const rngMes = mulberry32(hashStr('mes-' + m))
    const n = Math.floor(base + rngMes())

    for (let k = 0; k < n; k++) {
      const rng = mulberry32(hashStr(`hilo-${m}-${k}`))
      const cat = eligeCat(rng)

      // Candidatos válidos para el año
      const semillas = itemsPorCat[cat].filter(
        (s) => s.minAno <= ano && s.maxAno >= ano && disponible(`tit:${s.titulo}`, ano)
      )
      const temas = TEMAS.filter((t) => t.cat === cat && t.minAno <= ano && t.maxAno >= ano)
      if (!semillas.length && !temas.length) continue

      let titulo: string
      let cuerpo: string[]
      let tags: string[]
      let etapas: string[]
      let fijadas: RespuestaFijada[] | undefined

      // Preferir semillas sin usar (contenido escrito a mano)
      if (semillas.length && (rng() < 0.55 || !temas.length)) {
        const s = semillas[Math.floor(rng() * semillas.length)]
        marcar(`tit:${s.titulo}`, ano)
        titulo = s.titulo; cuerpo = s.cuerpo; tags = s.tags; etapas = s.etapas
        fijadas = s.fijadas
      } else {
        const t = temas[Math.floor(rng() * temas.length)]
        const moldeIdx = Math.floor(rng() * MOLDES.length)
        const variantes = t.titulos.filter((ti) => disponible(`tit:${ti}`, ano))
        if (!variantes.length) continue
        titulo = pick(rng, variantes)
        const clave = `tema:${titulo}:${moldeIdx}`
        if (!disponible(clave, ano)) continue
        marcar(`tit:${titulo}`, ano)
        marcar(clave, ano)
        cuerpo = MOLDES[moldeIdx](t)
        tags = t.tags; etapas = t.etapas
      }

      const autor = eligeAutor(rng, ano)
      const fecha = fechaHilo(m, 2 + Math.floor(rng() * 24))
      const id = `h-${contador++}`
      const edadFactor = Math.min(1, (AHORA - fecha.getTime()) / (1000 * 86400000 * 365 * 4))
      const utiles = 2 + Math.floor(rng() * 45 * (0.3 + edadFactor))
      const estado: EstadoHilo = rng() < 0.45 ? 'resuelta' : rng() < 0.85 ? 'en_debate' : 'analisis'

      hilos.push({
        id,
        slug: `${slugify(titulo)}-${id.slice(2)}`,
        titulo,
        categoria: cat,
        tags,
        autorId: autor.id,
        fecha,
        etapa: pick(rng, etapas),
        presupuesto: rng() < 0.6 ? pick(rng, PRESUPUESTOS) : null,
        estado,
        cuerpo,
        respuestas: generaRespuestas(rng, id, cat, autor, fecha, fijadas),
        utiles,
        vistas: Math.floor(utiles * (12 + rng() * 30)) + 50 + Math.floor(rng() * 400 * edadFactor),
        isDemo: true,
      })
    }
  }
  const ordenados = hilos.sort((a, b) => b.fecha.getTime() - a.fecha.getTime())

  // Nota de moderación puntual en 2 hilos antiguos (demuestra que las normas
  // se aplican; justifica que nadie nombre entidades comerciales)
  const antiguos = ordenados.filter(
    (h) => h.fecha.getFullYear() >= 2018 && h.fecha.getFullYear() <= 2022 && h.respuestas.length >= 5
  )
  EQUIPO_MODERACION.forEach((nota, i) => {
    const h = antiguos[(i * 7 + 3) % antiguos.length]
    const ultima = h.respuestas[h.respuestas.length - 1].fecha.getTime()
    h.respuestas.push({
      id: `${h.id}-mod${i}`,
      autorId: EQUIPO.id,
      fecha: new Date(Math.min(ultima + 2 * 86400000, AHORA - 86400000)),
      texto: nota,
      util: 6 + i * 3,
    })
  })

  // Una única mención redactada "[marca retirada]" en un hilo de franquicias:
  // demuestra que el filtro existe sin convertir el foro en un campo de minas
  const franq = ordenados.find(
    (h) =>
      h.categoria === 'franquicias' &&
      h.fecha.getFullYear() >= 2019 &&
      h.respuestas.length >= 4 &&
      !h.respuestas.some((r) => r.texto.startsWith('Nota de moderación'))
  )
  if (franq) {
    const rngR = mulberry32(hashStr('redaccion-' + franq.id))
    const autor = eligeAutor(rngR, franq.fecha.getFullYear(), franq.autorId)
    franq.respuestas.push({
      id: `${franq.id}-red`,
      autorId: autor.id,
      fecha: new Date(
        Math.min(
          franq.respuestas[franq.respuestas.length - 1].fecha.getTime() +
            3 * 86400000,
          AHORA - 86400000
        )
      ),
      texto:
        REDACCION[0].charAt(0).toUpperCase() +
        REDACCION[0].slice(1).replace(/[.,;:]\s*$/, '') +
        '.',
      util: 8,
    })
  }

  return ordenados
}

export const HILOS: HiloForo[] = buildHilos()

export const getHilo = (slug: string) => HILOS.find((h) => h.slug === slug)

export { getPerfil, EQUIPO }
export type { PerfilForo }

// Conteos por categoría (para los filtros)
export const CONTEOS: Record<CategoriaForo, number> = Object.fromEntries(
  CATS.map((c) => [c, HILOS.filter((h) => h.categoria === c).length])
) as Record<CategoriaForo, number>
