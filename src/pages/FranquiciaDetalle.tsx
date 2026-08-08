import { Link, Navigate, useParams } from 'react-router'
import { ArrowLeft, Check, AlertTriangle, ExternalLink, Info, Users } from 'lucide-react'
import Reveal from '../components/Reveal'
import FranquiciaForm from '../components/FranquiciaForm'
import {
  CIFRAS_FRANQUICIA,
  FRANQUICIAS,
  WEB_FRANQUICIA,
  formatInversion,
  getFranquicia,
  sectorLabel,
  type CifrasClave,
} from '../data/franquicias'

// Cada concepto se explica de pasada, junto al propio dato: sin glosarios
// ni tono de lección. Quien ya lo sabe, lo lee como un dato más.
const FILAS_CIFRAS: { campo: keyof CifrasClave; label: string; nota: string }[] = [
  { campo: 'canonEntrada', label: 'Canon de entrada', nota: 'el pago inicial por usar la marca' },
  { campo: 'royalty', label: 'Royalty', nota: 'la cuota periódica por seguir en la red' },
  { campo: 'canonPublicidad', label: 'Canon de publicidad', nota: 'lo que se aporta a la publicidad común' },
  { campo: 'duracionContrato', label: 'Duración del contrato', nota: 'los años que dura el acuerdo' },
  { campo: 'superficie', label: 'Local habitual', nota: 'el tamaño de local que suelen pedir' },
  { campo: 'poblacionMinima', label: 'Población mínima', nota: 'el tamaño de ciudad donde suelen aceptar' },
]

export default function FranquiciaDetalle() {
  const { slug } = useParams<{ slug: string }>()
  const f = slug ? getFranquicia(slug) : undefined

  if (!f) return <Navigate to="/franquicias" replace />

  const relacionadas = FRANQUICIAS.filter((x) => x.slug !== f.slug && x.sector === f.sector).slice(0, 3)
  const cifras = CIFRAS_FRANQUICIA[f.slug]
  const web = WEB_FRANQUICIA[f.slug]

  return (
    <>
      <article className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <Link
              to="/franquicias"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-[#1a45c0]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver al catálogo
            </Link>
          </Reveal>

          {/* Cabecera de la ficha */}
          <Reveal delay={80}>
            <header className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <div className="flex h-24 w-40 shrink-0 items-center justify-center rounded-xl bg-secondary/50 p-3">
                  <img
                    src={`/franquicias/${f.slug}.png`}
                    alt={`Logotipo de ${f.nombre}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    {sectorLabel(f.sector)}
                  </span>
                  <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0B2447] sm:text-3xl">
                    Franquicia {f.nombre}
                  </h1>
                  <p className="mt-1 text-sm text-foreground/70">{f.actividad}</p>
                </div>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-foreground/50">Inversión orientativa</dt>
                  <dd className="mt-1 text-lg font-bold text-[#0B2447]">{formatInversion(f.inversion)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-foreground/50">Unidades</dt>
                  <dd className="mt-1 text-lg font-bold text-[#0B2447]">
                    {f.unidades !== null ? f.unidades.toLocaleString('es-ES') : 'A consultar'}
                  </dd>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <dt className="text-xs text-foreground/50">Sector</dt>
                  <dd className="mt-1 text-lg font-bold text-[#0B2447]">{sectorLabel(f.sector)}</dd>
                </div>
              </dl>
            </header>
          </Reveal>

          {/* Descripción */}
          <Reveal delay={120}>
            <div className="mt-8 space-y-5">
              {f.descripcion.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-foreground/85">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Cifras clave del modelo */}
          {cifras && (
            <Reveal delay={140}>
              <section className="mt-10 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-lg font-bold text-[#0B2447]">Las cifras que conviene conocer</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">
                  Seis datos que dicen mucho de cómo es la relación con la marca, explicados
                  sobre la marcha. Son cifras orientativas recopiladas de directorios del sector.
                </p>
                <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {FILAS_CIFRAS.map(({ campo, label, nota }) => {
                    const valor = cifras[campo]
                    return (
                      <div key={campo} className="border-b border-border/70 pb-4">
                        <dt className="text-sm font-semibold text-[#0B2447]">
                          {label}
                          <span className="block text-xs font-normal text-foreground/55">{nota}</span>
                        </dt>
                        <dd
                          className={`mt-1.5 text-sm ${
                            valor ? 'font-bold text-[#0B2447]' : 'italic text-foreground/50'
                          }`}
                        >
                          {valor ?? 'A consultar con la franquicia'}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </section>
            </Reveal>
          )}

          {/* Qué incluye / para quién / qué revisar */}
          <Reveal delay={160}>
            <div className="mt-10 grid gap-5">
              <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#0B2447]">Qué suele incluir la franquicia</h2>
                <ul className="mt-4 space-y-2.5">
                  {f.incluye.map((x, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-bold text-[#0B2447]">
                  <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                  Para quién encaja
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {f.encaja.map((x, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
                <h2 className="flex items-center gap-2 text-lg font-bold text-[#0B2447]">
                  <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden="true" />
                  Qué revisar antes de firmar nada
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {f.revisar.map((x, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </Reveal>

          {/* Formulario de compatibilidad */}
          <Reveal delay={200}>
            <section id="compatibilidad" className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-extrabold tracking-tight text-[#0B2447]">
                ¿Encajas con {f.nombre}? Te lo decimos en 3 días.
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-foreground/80">
                Cuéntanos quién eres, dónde la montarías y qué inversión tienes disponible.
                Analizamos la compatibilidad de tu perfil con esta franquicia y te respondemos con
                sinceridad: si encaja, te proponemos el siguiente paso; si no, te explicamos por
                qué. Gratis y sin compromiso.
              </p>
              <div className="mt-6">
                <FranquiciaForm franquicia={f.nombre} />
              </div>
            </section>
          </Reveal>

          {/* Descargo */}
          <Reveal delay={240}>
            <div className="mt-10 flex gap-3 rounded-xl bg-secondary/60 p-4 text-xs leading-relaxed text-foreground/60">
              <Info className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <p>
                PlanCrece no tiene relación comercial con {f.nombre} ni percibe comisión alguna de
                la marca. Los datos mostrados son orientativos y proceden de información publicada
                por la propia franquicia y directorios sectoriales; pueden haber variado. Verifica
                siempre las condiciones directamente con la franquicia antes de firmar.
                {web && (
                  <>
                    {' '}
                    <a
                      href={web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-primary underline-offset-2 transition-colors hover:text-[#1a45c0] hover:underline"
                    >
                      Web oficial de {f.nombre}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </>
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </article>

      {/* Relacionadas */}
      {relacionadas.length > 0 && (
        <section className="border-t border-border bg-secondary/40 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-xl font-bold text-[#0B2447]">Otras franquicias de {sectorLabel(f.sector).toLowerCase()}</h2>
            </Reveal>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relacionadas.map((r, i) => (
                <Reveal key={r.slug} delay={i * 70}>
                  <Link
                    to={`/franquicias/${r.slug}`}
                    className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-secondary/50 p-2">
                      <img
                        src={`/franquicias/${r.slug}.png`}
                        alt={`Logotipo de ${r.nombre}`}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold leading-snug text-[#0B2447] transition-colors group-hover:text-primary">
                        {r.nombre}
                      </h3>
                      <p className="mt-0.5 text-xs text-foreground/60">
                        Inversión orientativa: {formatInversion(r.inversion)}
                      </p>
                    </div>
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
