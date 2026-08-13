import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Store, Info, Wallet, MapPin, Calculator } from 'lucide-react'
import Reveal from '../components/Reveal'
import {
  FRANQUICIAS,
  SECTORES,
  formatInversion,
  type SectorFranquicia,
  type Franquicia,
} from '../data/franquicias'

const RANGOS = [
  { id: 'todas', label: 'Cualquier inversión', test: (_: number | null) => true },
  { id: 'baja', label: 'Menos de 10.000 €', test: (n: number | null) => n !== null && n < 10000 },
  { id: 'media', label: '10.000 – 30.000 €', test: (n: number | null) => n !== null && n >= 10000 && n <= 30000 },
  { id: 'alta', label: '30.000 – 100.000 €', test: (n: number | null) => n !== null && n > 30000 && n <= 100000 },
  { id: 'premium', label: 'Más de 100.000 €', test: (n: number | null) => n !== null && n > 100000 },
] as const

// Filtro por capital propio: lo que el emprendedor necesita de su bolsillo.
const RANGOS_APORTE = [
  { id: 'cualquiera', label: 'Cualquier capital propio', test: (_: number | null) => true },
  { id: 'hasta-5k', label: 'Hasta 5.000 €', test: (n: number | null) => n !== null && n <= 5000 },
  { id: 'hasta-10k', label: 'Hasta 10.000 €', test: (n: number | null) => n !== null && n <= 10000 },
  { id: 'hasta-30k', label: '10.000 – 30.000 €', test: (n: number | null) => n !== null && n > 10000 && n <= 30000 },
  { id: 'mas-30k', label: 'Más de 30.000 €', test: (n: number | null) => n !== null && n > 30000 },
] as const

function Tarjeta({ f, delay = 0 }: { f: Franquicia; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to={`/franquicias/${f.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10 hover:ring-primary/40"
      >
        {/* Escaparate: el logo respira en un área amplia, con zoom suave al pasar el ratón */}
        <div className="relative aspect-[8/5] overflow-hidden bg-gradient-to-b from-slate-50 to-white">
          <img
            src={`/franquicias/${f.slug}.png`}
            alt={`Logotipo de ${f.nombre}`}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            loading="lazy"
          />
        </div>

        {/* Panel de vidrio: semitransparente, superpuesto al escaparate */}
        <div className="relative z-10 -mt-10 flex flex-1 flex-col px-4 pb-4">
          <div className="flex flex-1 flex-col rounded-xl bg-white/75 p-4 shadow-md ring-1 ring-white/70 backdrop-blur-md transition-shadow duration-300 group-hover:shadow-lg">
            <h3 className="text-lg font-bold leading-snug text-[#0B2447] transition-colors group-hover:text-primary">
              {f.nombre}
            </h3>
            <p className="mt-0.5 flex-1 text-sm text-foreground/70">{f.actividad}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                {formatInversion(f.inversion)}
              </span>
              {f.unidades !== null && (
                <span className="flex items-center gap-1 text-xs text-foreground/55">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {f.unidades.toLocaleString('es-ES')} establecimientos
                </span>
              )}
            </div>
            {f.aportePropio !== null && (
              <p className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-100">
                <Wallet className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                Capital propio orientativo: {formatInversion(f.aportePropio)}
              </p>
            )}
            <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
              Ver ficha
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </p>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export default function Franquicias() {
  const [sector, setSector] = useState<SectorFranquicia | 'todos'>('todos')
  const [rango, setRango] = useState<(typeof RANGOS)[number]['id']>('todas')
  const [aporte, setAporte] = useState<(typeof RANGOS_APORTE)[number]['id']>('cualquiera')

  const filtradas = useMemo(() => {
    const r = RANGOS.find((x) => x.id === rango)!
    const a = RANGOS_APORTE.find((x) => x.id === aporte)!
    return FRANQUICIAS.filter(
      (f) => (sector === 'todos' || f.sector === sector) && r.test(f.inversion) && a.test(f.aportePropio)
    )
  }, [sector, rango, aporte])

  return (
    <>
      <section className="hero-bg pt-14 pb-8 sm:pt-20 sm:pb-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              Franquicias
            </p>
            <h1 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-[#0B2447] sm:text-4xl">
              ¿Sin idea propia? Emprende con manual de instrucciones.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/80">
              Una franquicia es emprender con un sistema ya probado: marca, método y proveedores. A
              cambio, pagas canon y parte de tu margen. No es mejor ni peor que una idea propia: es
              otra forma de entrar. Explora las opciones y comprueba si tu perfil encaja.
            </p>
          </Reveal>

          {/* Filtros */}
          <Reveal delay={100}>
            <div className="mt-8 space-y-3">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por sector">
                <button
                  type="button"
                  onClick={() => setSector('todos')}
                  className={`btn-press rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    sector === 'todos'
                      ? 'bg-primary text-white'
                      : 'bg-white text-foreground ring-1 ring-border hover:bg-secondary'
                  }`}
                >
                  Todos los sectores
                </button>
                {SECTORES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSector(s.id)}
                    className={`btn-press rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      sector === s.id
                        ? 'bg-primary text-white'
                        : 'bg-white text-foreground ring-1 ring-border hover:bg-secondary'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por inversión total">
                <span className="w-full text-xs font-semibold uppercase tracking-wide text-foreground/50 sm:w-auto">
                  Inversión total:
                </span>
                {RANGOS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRango(r.id)}
                    className={`btn-press rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      rango === r.id
                        ? 'bg-[#0B2447] text-white'
                        : 'bg-white text-foreground/70 ring-1 ring-border hover:bg-secondary'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por capital propio">
                <span className="w-full text-xs font-semibold uppercase tracking-wide text-foreground/50 sm:w-auto">
                  Capital propio:
                </span>
                {RANGOS_APORTE.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAporte(a.id)}
                    className={`btn-press rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      aporte === a.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-foreground/70 ring-1 ring-border hover:bg-secondary'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
              {/* Puente al simulador de capital */}
              <Link
                to="/financiacion"
                className="group flex items-center gap-3 rounded-xl bg-[#0B2447] px-4 py-3 text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Calculator className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                <span className="flex-1 text-sm leading-snug">
                  <strong className="font-semibold">¿No sabes con cuánto puedes empezar?</strong>{' '}
                  <span className="text-white/75">
                    Suma tus ahorros, tu posible pago único y otros recursos en 1 minuto.
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-slate-50/80 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {filtradas.length === 0 ? (
            <Reveal>
              <div className="rounded-2xl border border-border bg-white p-8 text-center">
                <Store className="mx-auto h-8 w-8 text-foreground/30" aria-hidden="true" />
                <p className="mt-3 text-sm text-foreground/70">
                  No hay franquicias con esa combinación de filtros. Prueba con otro sector o rango
                  de inversión.
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtradas.map((f, i) => (
                <Tarjeta key={f.slug} f={f} delay={(i % 4) * 70} />
              ))}
            </div>
          )}

          <Reveal>
            <div className="mt-10 flex gap-3 rounded-xl bg-secondary/60 p-4 text-xs leading-relaxed text-foreground/60">
              <Info className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <p>
                PlanCrece no tiene relación comercial con las marcas mostradas ni percibe comisión
                alguna de ellas. La información (inversión, capital propio, número de unidades) es
                orientativa y procede de datos publicados por las propias franquicias y directorios
                sectoriales; puede haber variado. Antes de firmar cualquier contrato, verifica las
                condiciones directamente con la franquicia.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section className="navy-bg py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              La marca la ponen ellos. Los números, entre los dos.
            </h2>
            <p className="mt-4 text-base text-white/80">
              Elige la franquicia que te interesa y comprueba gratis si tu perfil, tu ubicación y tu
              inversión disponible encajan con ella. Respuesta en menos de 3 días laborables.
            </p>
            <p className="mt-4 text-sm text-white/60">
              {FRANQUICIAS.length} franquicias analizadas · {SECTORES.length} sectores
            </p>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="btn-press mt-7 inline-flex h-[52px] items-center gap-2 rounded-[10px] bg-primary px-7 text-base font-semibold text-white transition-colors hover:bg-[#1a45c0]"
            >
              Ver el catálogo
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
