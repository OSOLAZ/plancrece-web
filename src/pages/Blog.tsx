import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { MessageCircle, ArrowRight, Clock } from 'lucide-react'
import Reveal from '../components/Reveal'
import {
  ARTICULOS,
  CATEGORIAS,
  catMeta,
  fechaArticulo,
  formatRelativo,
  tiempoLectura,
  type Categoria,
  type Articulo,
} from '../data/blog'

const PAGE_SIZE = 12

function Tarjeta({ a, delay = 0 }: { a: Articulo; delay?: number }) {
  const meta = catMeta(a.categoria)
  return (
    <Reveal delay={delay}>
      <Link
        to={`/blog/${a.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
      >
        <span className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${meta.chip}`}>
          {meta.label}
        </span>
        <h3 className="mt-3 text-lg font-bold leading-snug text-[#0B2447] transition-colors group-hover:text-primary">
          {a.titulo}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/80">{a.extracto}</p>
        <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-xs text-foreground/60">
          <span>{formatRelativo(fechaArticulo(a))}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {tiempoLectura(a)} min
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {a.comentarios.length}
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

export default function Blog() {
  const [filtro, setFiltro] = useState<Categoria | 'todas'>('todas')
  const [visibles, setVisibles] = useState(PAGE_SIZE)

  const filtrados = useMemo(
    () => (filtro === 'todas' ? ARTICULOS : ARTICULOS.filter((a) => a.categoria === filtro)),
    [filtro]
  )
  const conDestacado = filtro === 'todas' && visibles === PAGE_SIZE
  const lista = (conDestacado ? filtrados.slice(1) : filtrados).slice(0, visibles)

  return (
    <>
      {/* Hero del blog */}
      <section className="hero-bg pt-14 pb-8 sm:pt-20 sm:pb-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              Blog de PlanCrece
            </p>
            <h1 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-[#0B2447] sm:text-4xl">
              Emprender en España, en contexto.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/80">
              Ayudas, normativa, consejos y sectores que funcionan. Escribimos sobre emprendimiento
              desde 2014, con la misma regla de siempre: contarte lo que necesitas oír, no lo que
              quieres oír.
            </p>
          </Reveal>

          {/* Filtros por categoría */}
          <Reveal delay={100}>
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
              <button
                type="button"
                onClick={() => {
                  setFiltro('todas')
                  setVisibles(PAGE_SIZE)
                }}
                className={`btn-press rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filtro === 'todas'
                    ? 'bg-primary text-white'
                    : 'bg-white text-foreground ring-1 ring-border hover:bg-secondary'
                }`}
              >
                Todas
              </button>
              {CATEGORIAS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setFiltro(c.id)
                    setVisibles(PAGE_SIZE)
                  }}
                  className={`btn-press rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    filtro === c.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-foreground ring-1 ring-border hover:bg-secondary'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Artículo destacado + listado */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {filtro === 'todas' && visibles === PAGE_SIZE && (
            <Reveal>
              <Link
                to={`/blog/${ARTICULOS[0].slug}`}
                className="group mb-10 grid gap-5 rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                      Último artículo
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${catMeta(ARTICULOS[0].categoria).chip}`}
                    >
                      {catMeta(ARTICULOS[0].categoria).label}
                    </span>
                    <span className="text-xs text-foreground/60">
                      {formatRelativo(fechaArticulo(ARTICULOS[0]))}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-extrabold leading-tight text-[#0B2447] transition-colors group-hover:text-primary sm:text-3xl">
                    {ARTICULOS[0].titulo}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80 sm:text-base">
                    {ARTICULOS[0].extracto}
                  </p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 group-hover:translate-x-1 lg:h-14 lg:w-14">
                  <ArrowRight className="h-6 w-6" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          )}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lista.map((a, i) => (
              <Tarjeta key={a.slug} a={a} delay={(i % 3) * 70} />
            ))}
          </div>

          {visibles < filtrados.length && (
            <Reveal>
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVisibles((v) => v + PAGE_SIZE)}
                  className="btn-press inline-flex h-12 items-center rounded-[10px] border border-primary/30 bg-white px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
                >
                  Cargar más artículos
                </button>
                <p className="mt-3 text-xs text-foreground/60">
                  Mostrando {lista.length} de {filtrados.length} artículos publicados desde 2014
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* CTA final */}
      <section className="navy-bg py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Leer está bien. Saber si tu idea funciona, mejor.
            </h2>
            <p className="mt-4 text-base text-white/80">
              Envíanos tu idea y en menos de 3 días laborables te diremos si es viable. Gratis, con
              NDA firmado y sin compromiso.
            </p>
            <Link
              to="/#formulario"
              className="btn-press mt-7 inline-flex h-[52px] items-center gap-2 rounded-[10px] bg-primary px-7 text-base font-semibold text-white transition-colors hover:bg-[#1a45c0]"
            >
              Valida tu idea gratis
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
