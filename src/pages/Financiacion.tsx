import { Link } from 'react-router'
import { ArrowRight, Banknote, Landmark, HandCoins, Info } from 'lucide-react'
import Reveal from '../components/Reveal'
import SimuladorCapital from '../components/SimuladorCapital'

const VIAS = [
  {
    icon: Banknote,
    titulo: 'Capitalización del paro (pago único)',
    texto:
      'Si estás cobrando la prestación por desempleo, puedes solicitar recibir en un solo pago lo que te queda por percibir para invertirlo en tu negocio. Es el recurso que más emprendedores desconocen — y el que más cambia el punto de partida. El importe exacto depende de tu prestación y tu situación: el SEPE es quien lo confirma.',
  },
  {
    icon: Landmark,
    titulo: 'Financiación bancaria',
    texto:
      'Existen préstamos pensados para emprendedores, pero ninguna entidad concede nada sin un proyecto que defender. La diferencia entre un sí y un no suele estar en cómo se presentan los números: un plan de empresa sólido es lo que más mejora tus opciones. La concesión y las condiciones dependen siempre de la entidad.',
  },
  {
    icon: HandCoins,
    titulo: 'Ayudas, socios y otros caminos',
    texto:
      'Cada comunidad autónoma tiene sus propias ayudas y subvenciones, y muchas personas que encajarían nunca las piden. También hay socios e inversores buscando proyectos como el tuyo. Eso sí: las ayudas suelen justificarse después del gasto y un socio no es un recurso hasta que está por escrito.',
  },
]

export default function Financiacion() {
  return (
    <>
      <section className="hero-bg pt-14 pb-10 sm:pt-20 sm:pb-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <span className="h-px w-8 bg-primary" aria-hidden="true" />
                Financiación
              </p>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0B2447] sm:text-4xl">
                ¿Con cuánto puedes empezar?
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-foreground/80">
                Dinos lo que tienes hoy y cuánto necesita tu proyecto. Te diremos exactamente qué te
                falta y cómo conseguirlo — banco, socio, pago único, ayudas — en lenguaje claro, sin
                tecnicismos. Tus números no salen de tu navegador.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-foreground/75">
                <li className="flex gap-2.5">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  Aunque tengas 0 € de ahorros, hay caminos: el pago único, la financiación y los
                  socios existen precisamente para eso.
                </li>
                <li className="flex gap-2.5">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  No es un simulador bancario: no prometemos préstamos, te ordenamos las opciones
                  reales que tienes delante.
                </li>
                <li className="flex gap-2.5">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  Cada camino te dice qué necesitas para recorrerlo — y casi todos empiezan por el
                  mismo documento: un plan de empresa.
                </li>
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-border sm:p-8">
                <SimuladorCapital />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-slate-50/80 to-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="max-w-2xl text-2xl font-extrabold tracking-tight text-[#0B2447] sm:text-3xl">
              Los tres caminos para financiar tu idea, explicados sin letra pequeña
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {VIAS.map((v, i) => (
              <Reveal key={v.titulo} delay={i * 90} className="h-full">
                <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
                  <v.icon className="h-7 w-7 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold text-[#0B2447]">{v.titulo}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/75">{v.texto}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 flex gap-3 rounded-xl bg-secondary/60 p-4 text-xs leading-relaxed text-foreground/60">
              <Info className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <p>
                Esta página es orientativa y no constituye asesoramiento financiero. Los importes
                estimados dependen de tu situación real y de terceros (SEPE, entidades financieras,
                administraciones públicas). Antes de comprometer dinero, confirma siempre las cifras
                con el organismo correspondiente.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="navy-bg py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              El dinero es solo la mitad. La otra mitad es saber defenderlo.
            </h2>
            <p className="mt-4 text-base text-white/80">
              Cuando sepas con cuánto puedes empezar, el siguiente paso es demostrar que tu proyecto
              merece esa financiación. Validamos tu idea gratis y, si encaja, preparamos el plan de
              empresa que la defiende.
            </p>
            <Link
              to="/contacto"
              className="btn-press mt-7 inline-flex h-[52px] items-center gap-2 rounded-[10px] bg-primary px-7 text-base font-semibold text-white transition-colors hover:bg-[#1a45c0]"
            >
              Validar mi idea gratis
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
