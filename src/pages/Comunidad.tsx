import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Search, MessageSquare, Eye, ThumbsUp, Users, ShieldCheck, Info } from 'lucide-react'
import Reveal from '../components/Reveal'
import { CATEGORIAS_FORO, type CategoriaForo } from '../data/foroContenido'
import {
  HILOS, CONTEOS, formatRelativo, estadoLabel, getPerfil,
  type HiloForo,
} from '../data/foro'

const PAGE_SIZE = 15

function Avatar({ autorId, size = 'h-9 w-9 text-xs' }: { autorId: string; size?: string }) {
  const p = getPerfil(autorId)
  return (
    <span
      className={`inline-flex ${size} shrink-0 items-center justify-center rounded-full font-bold text-white`}
      style={{ backgroundColor: p.color }}
      aria-hidden="true"
    >
      {p.initials}
    </span>
  )
}

function FilaHilo({ h, delay = 0 }: { h: HiloForo; delay?: number }) {
  const autor = getPerfil(h.autorId)
  const cat = CATEGORIAS_FORO.find((c) => c.id === h.categoria)!
  return (
    <Reveal delay={delay}>
      <Link
        to={`/comunidad/${h.slug}`}
        className="group flex gap-4 rounded-xl border border-border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:p-5"
      >
        <div className="hidden pt-0.5 sm:block">
          <Avatar autorId={h.autorId} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">
              {cat.label}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 font-medium ${
                h.estado === 'resuelta'
                  ? 'bg-emerald-50 text-emerald-700'
                  : h.estado === 'en_debate'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-slate-100 text-slate-600'
              }`}
            >
              {estadoLabel(h.estado)}
            </span>
            <span className="text-foreground/50">{formatRelativo(h.fecha)}</span>
          </div>
          <h3 className="mt-2 font-bold leading-snug text-[#0B2447] transition-colors group-hover:text-primary">
            {h.titulo}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-foreground/70">{h.cuerpo[0]}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/60">
            <span className="font-medium text-foreground/75">{autor.alias}</span>
            <span>{autor.zona}</span>
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
              {h.respuestas.length}
            </span>
            <span className="inline-flex items-center gap-1">
              <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />
              {h.utiles}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              {h.vistas.toLocaleString('es-ES')}
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export default function Comunidad() {
  const [filtro, setFiltro] = useState<CategoriaForo | 'todas'>('todas')
  const [busqueda, setBusqueda] = useState('')
  const [visibles, setVisibles] = useState(PAGE_SIZE)

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    return HILOS.filter((h) => {
      if (filtro !== 'todas' && h.categoria !== filtro) return false
      if (!q) return true
      return (
        h.titulo.toLowerCase().includes(q) ||
        h.cuerpo.some((p) => p.toLowerCase().includes(q)) ||
        h.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [filtro, busqueda])

  const lista = filtrados.slice(0, visibles)
  const totalRespuestas = useMemo(
    () => HILOS.reduce((acc, h) => acc + h.respuestas.length, 0),
    []
  )

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="navy-bg text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:py-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
              Comunidad PlanCrece
            </p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Emprendedores que se cuentan lo que de verdad pasa
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Hilos desde 2014 sobre capitalizar el paro, ayudas, financiación,
              franquicias y planes de negocio. Sin humo: dudas reales,
              respuestas de primera mano y algún que otro desacuerdo.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4" aria-hidden="true" />
                {HILOS.length} hilos abiertos
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                {totalRespuestas.toLocaleString('es-ES')} respuestas
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Buscador + filtros */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-5xl px-4 py-5">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40"
              aria-hidden="true"
            />
            <input
              type="search"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value)
                setVisibles(PAGE_SIZE)
              }}
              placeholder="Busca por tema: pago único, aval, traspaso, tarifa plana…"
              className="w-full rounded-xl border border-border bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary/50 focus:bg-white"
              aria-label="Buscar en la comunidad"
            />
          </div>
          {/* Normas de la comunidad */}
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/[0.04] p-4">
            <ShieldCheck
<div className="mx-auto max-w-4xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5 ring-1 ring-amber-100 mb-6">
  <p className="flex items-start gap-2.5 text-sm leading-relaxed text-amber-900">
    <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
    <span>
      <strong>Foro en modo lectura.</strong> Nuevos registros y publicaciones en pausa temporal por tareas de mantenimiento programado. Estamos mejorando la experiencia de la comunidad.
    </span>
  </p>
</div>
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div className="text-sm leading-relaxed text-foreground/75">
              <span className="font-semibold text-[#0B2447]">
                Normas de la comunidad.
              </span>{' '}
              Comparte tu experiencia con todo detalle, pero sin nombrar
              entidades comerciales concretas (bancos, gestorías, franquicias,
              consultores). Las menciones a empresas y la publicidad se moderan
              para mantener el foro neutral: aquí se cuentan experiencias, no
              se venden servicios.
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setFiltro('todas')
                setVisibles(PAGE_SIZE)
              }}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                filtro === 'todas'
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 text-foreground/70 hover:bg-slate-200'
              }`}
            >
              Todos ({HILOS.length})
            </button>
            {CATEGORIAS_FORO.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setFiltro(c.id)
                  setVisibles(PAGE_SIZE)
                }}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  filtro === c.id
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-foreground/70 hover:bg-slate-200'
                }`}
              >
                {c.label} ({CONTEOS[c.id] ?? 0})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Listado */}
      <section className="bg-gradient-to-b from-white via-slate-50/80 to-white">
        <div className="mx-auto max-w-5xl px-4 py-10">
          {lista.length === 0 ? (
            <p className="py-16 text-center text-foreground/60">
              No hay hilos que coincidan con tu búsqueda. Prueba con otras
              palabras o revisa las categorías.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {lista.map((h, i) => (
                <FilaHilo key={h.id} h={h} delay={Math.min(i, 6) * 40} />
              ))}
            </div>
          )}
          {filtrados.length > visibles && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setVisibles((v) => v + PAGE_SIZE)}
                className="btn-press rounded-xl border border-primary/30 bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                Ver más hilos ({filtrados.length - visibles} restantes)
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
