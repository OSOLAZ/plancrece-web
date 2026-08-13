import { Link, Navigate, useParams } from 'react-router'
import { ArrowLeft, ArrowRight, Clock, MessageCircle } from 'lucide-react'
import Reveal from '../components/Reveal'
import {
  catMeta,
  fechaArticulo,
  fechaComentario,
  formatRelativo,
  getArticulo,
  relacionados,
  tiempoLectura,
} from '../data/blog'

function Avatar({ nick }: { nick: string }) {
  const inicial = nick.replace(/[^a-zA-Z]/g, '').charAt(0).toUpperCase() || nick.charAt(0).toUpperCase()
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary"
      aria-hidden="true"
    >
      {inicial}
    </span>
  )
}

export default function BlogArticulo() {
  const { slug } = useParams<{ slug: string }>()
  const articulo = slug ? getArticulo(slug) : undefined

  if (!articulo) return <Navigate to="/blog" replace />

  const meta = catMeta(articulo.categoria)
  const rel = relacionados(articulo)

  return (
    <>
      <article className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-[#1a45c0]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver al blog
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <header className="mt-6">
              <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${meta.chip}`}>
                {meta.label}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#0B2447] sm:text-4xl">
                {articulo.titulo}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground/60">
                <span>{formatRelativo(fechaArticulo(articulo))}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {tiempoLectura(articulo)} min de lectura
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {articulo.comentarios.length} comentarios
                </span>
              </div>
            </header>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-8 space-y-5">
              {articulo.cuerpo.map((p, i) =>
                p.startsWith('## ') ? (
                  <h2 key={i} className="pt-3 text-xl font-bold text-[#0B2447] sm:text-2xl">
                    {p.slice(3)}
                  </h2>
                ) : (
                  <p key={i} className="text-base leading-relaxed text-foreground/85">
                    {p}
                  </p>
                )
              )}
            </div>
          </Reveal>

          {/* Gancho → formulario de validación */}
          <Reveal delay={180}>
            <div className="mt-10 rounded-2xl bg-gradient-to-br from-primary to-[#0B2447] p-6 text-white shadow-md sm:p-8">
              <p className="text-lg font-bold leading-snug sm:text-xl">{articulo.gancho}</p>
              <Link
                to="/#formulario"
                className="btn-press mt-5 inline-flex h-12 items-center gap-2 rounded-[10px] bg-white px-6 text-sm font-semibold text-[#0B2447] transition-colors hover:bg-slate-100"
              >
                Valida tu idea gratis
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="mt-3 text-xs text-white/70">
                Respuesta en menos de 3 días laborables · Confidencial · Sin compromiso
              </p>
            </div>
          </Reveal>

          {/* Comentarios */}
          {articulo.comentarios.length > 0 && (
            <Reveal delay={220}>
              <section className="mt-12" aria-label="Comentarios">
                <h2 className="flex items-center gap-2 text-xl font-bold text-[#0B2447]">
                  <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                  {articulo.comentarios.length}{' '}
                  {articulo.comentarios.length === 1 ? 'comentario' : 'comentarios'}
                </h2>
                <ul className="mt-6 space-y-5">
                  {articulo.comentarios.map((c, i) => (
                    <li key={i}>
                      <div className="flex gap-3">
                        <Avatar nick={c.nick} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm">
                            <span className="font-semibold text-[#0B2447]">{c.nick}</span>{' '}
                            <span className="text-foreground/50">
                              · {formatRelativo(fechaComentario(articulo, c))}
                            </span>
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-foreground/85">{c.texto}</p>
                        </div>
                      </div>
                      {c.respuesta && (
                        <div className="ml-6 mt-3 flex gap-3 rounded-xl border-l-2 border-primary bg-secondary/60 p-3.5 sm:ml-12">
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-extrabold text-white"
                            aria-hidden="true"
                          >
                            PC
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-primary">Equipo PlanCrece</p>
                            <p className="mt-1 text-sm leading-relaxed text-foreground/85">{c.respuesta}</p>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-xl bg-secondary/60 px-4 py-3 text-xs leading-relaxed text-foreground/60">
                  Solo los usuarios registrados pueden comentar. Si tienes una idea de negocio y
                  quieres una respuesta directa, usa el formulario de validación: es gratis y
                  respondemos en menos de 3 días laborables.
                </p>
              </section>
            </Reveal>
          )}
        </div>
      </article>

      {/* Relacionados */}
      {rel.length > 0 && (
        <section className="border-t border-border bg-secondary/40 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-xl font-bold text-[#0B2447]">Artículos relacionados</h2>
            </Reveal>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rel.map((a, i) => (
                <Reveal key={a.slug} delay={i * 70}>
                  <Link
                    to={`/blog/${a.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    <span
                      className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${catMeta(a.categoria).chip}`}
                    >
                      {catMeta(a.categoria).label}
                    </span>
                    <h3 className="mt-3 flex-1 text-base font-bold leading-snug text-[#0B2447] transition-colors group-hover:text-primary">
                      {a.titulo}
                    </h3>
                    <p className="mt-3 text-xs text-foreground/60">{formatRelativo(fechaArticulo(a))}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
