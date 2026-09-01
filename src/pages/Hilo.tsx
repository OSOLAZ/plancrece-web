import { Link, useParams } from 'react-router'
import {
  ArrowLeft, BadgeCheck, ArrowRight, ShieldCheck, Info,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import { CATEGORIAS_FORO } from '../data/foroContenido'
import { getHilo, formatRelativo, estadoLabel, getPerfil, EQUIPO } from '../data/foro'

function Avatar({
  autorId, size = 'h-10 w-10 text-sm',
}: { autorId: string; size?: string }) {
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

function BadgeRol({ autorId }: { autorId: string }) {
  const p = getPerfil(autorId)
  if (p.rol === 'equipo') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#0B2447] px-2.5 py-0.5 text-xs font-semibold text-white">
        <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
        Equipo PlanCrece
      </span>
    )
  }
  const etiqueta =
    p.rol === 'consultor'
      ? 'Consultor/a colaborador/a'
      : 'Emprendedor/a'
  return (
    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
      {etiqueta}
    </span>
  )
}

export default function Hilo() {
  const { slug } = useParams()
  const h = slug ? getHilo(slug) : undefined

  if (!h) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#0B2447]">Hilo no encontrado</h1>
        <p className="mt-3 text-foreground/70">
          Es posible que se haya movido o archivado.
        </p>
        <Link
          to="/comunidad"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver a la comunidad
        </Link>
      </div>
    )
  }

  const autor = getPerfil(h.autorId)
  const cat = CATEGORIAS_FORO.find((c) => c.id === h.categoria)!
  return (
    <div className="bg-gradient-to-b from-white via-slate-50/60 to-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        <Link
          to="/comunidad"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Comunidad
        </Link>

        {/* Cabecera del hilo */}
        <Reveal>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
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
            {h.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2.5 py-0.5 text-foreground/60"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight text-[#0B2447] sm:text-3xl">
            {h.titulo}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-foreground/60">
            <span>{formatRelativo(h.fecha)}</span>
          </div>
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-slate-50 px-3.5 py-2 text-xs text-foreground/60">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            Por las normas de la comunidad no se mencionan marcas comerciales
            (bancos, franquicias, gestorías): las experiencias se cuentan sin
            nombres de empresa.
          </p>
          <p className="mt-3 flex items-start gap-2.5 rounded-lg border border-primary/20 bg-primary/[0.05] px-3.5 py-2.5 text-xs leading-relaxed text-[#0B2447]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            Este foro muestra conversaciones ilustrativas basadas en situaciones reales planteadas por clientes. Los perfiles se presentan como roles editoriales para proteger la confidencialidad.
          </p>
        </Reveal>

        {/* Mensaje original */}
        <Reveal delay={60}>
          <article className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
            <header className="flex items-start gap-3.5">
              <Avatar autorId={h.autorId} />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-[#0B2447]">{autor.alias}</span>
                  <BadgeRol autorId={h.autorId} />
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-foreground/60">
                  <span>Etapa: {h.etapa}</span>
                  {h.presupuesto && <span>Presupuesto: {h.presupuesto}</span>}
                </div>
              </div>
            </header>
            <div className="mt-4 space-y-3.5 leading-relaxed text-foreground/85">
              {h.cuerpo.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        </Reveal>

        {/* Respuestas */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-[#0B2447]">
            Respuestas
          </h2>
          <div className="mt-4 flex flex-col gap-3.5">
            {h.respuestas.map((r, i) => {
              const ra = getPerfil(r.autorId)
              const esEquipo = r.autorId === EQUIPO.id
              return (
                <Reveal key={r.id} delay={Math.min(i, 5) * 40}>
                  <article
                    className={`rounded-2xl border p-4 shadow-sm sm:p-5 ${
                      esEquipo
                        ? 'border-primary/25 bg-primary/[0.03]'
                        : 'border-border bg-white'
                    }`}
                  >
                    <header className="flex items-start gap-3">
                      <Avatar autorId={r.autorId} size="h-9 w-9 text-xs" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-[#0B2447]">
                            {ra.alias}
                          </span>
                          <BadgeRol autorId={r.autorId} />
                          <span className="text-xs text-foreground/50">
                            {formatRelativo(r.fecha)}
                          </span>
                        </div>
                      </div>
                    </header>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                      {r.texto}
                    </p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* CTA discreto */}
        <Reveal delay={80}>
          <div className="mt-10 rounded-2xl bg-[#0B2447] p-6 text-white sm:p-8">
            <h2 className="text-xl font-bold">¿Tienes una duda parecida?</h2>
            <p className="mt-2 max-w-xl text-white/80">
              Si tu caso tiene que ver con la viabilidad de una idea, puedes
              enviarla para una validación gratuita: en hasta 3 días laborables
              te decimos con sinceridad si le vemos recorrido.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/#formulario"
                className="btn-press inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0B2447] transition-colors hover:bg-slate-100"
              >
                Validar mi idea gratis
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/comunidad"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
              >
                Seguir leyendo la comunidad
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
