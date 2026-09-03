import { Link } from 'react-router'
import {
  Check,
  Lock,
  ArrowRight,
  FileSearch,
  MapPin,
  Flag,
  ClipboardList,
  MessageSquare,
  Bell,
  Megaphone,
  TrendingUp,
  Network,
  Scale,
  Calculator,
  Gauge,
  MonitorPlay,
  Landmark,
  FileText,
  FileEdit,
  FileSliders,
} from 'lucide-react'
import ConsultantTip from '../components/ConsultantTip'
import Reveal from '../components/Reveal'
import useCheckSequence from '../components/useCheckSequence'
import { pagoUrl } from '../data/pagos'

// Contenido del plan de empresa: módulo compacto icono + etiqueta.
const PLAN_EMPRESA = [
  { icon: ClipboardList, label: 'Presentación del proyecto' },
  { icon: Megaphone, label: 'Plan de marketing' },
  { icon: TrendingUp, label: 'Inversiones' },
  { icon: Network, label: 'Plan de organización y gestión' },
  { icon: Scale, label: 'Plan jurídico-fiscal' },
  { icon: Calculator, label: 'Plan económico-financiero' },
  { icon: Gauge, label: 'Valoración' },
]

const FORMATOS_ESTANDAR = [
  { icon: FileText, label: 'PDF' },
  { icon: FileEdit, label: 'Word' },
]

const FORMATOS_AVANZADO = [
  { icon: FileText, label: 'PDF' },
  { icon: FileEdit, label: 'Word' },
  { icon: FileSliders, label: 'PowerPoint' },
]

// Extras del Plan Avanzado: lead en negrita (texto exacto ya existente hasta
// los dos puntos) + descripción completa sin acortar.
const EXTRAS_AVANZADO = [
  {
    icon: FileSearch,
    lead: 'Informe de ayudas y subvenciones, valorado en 65 € — incluido:',
    resto:
      ' según tu edad, estado civil, situación familiar, zona geográfica y tipo de negocio, investigamos qué ayudas son compatibles contigo',
  },
  {
    icon: MonitorPlay,
    lead: 'Presentación personalizada en PowerPoint con guion:',
    resto:
      ' las partes clave de tu plan y una guía de qué decir en cada una, para practicar en casa antes de ir al banco, a un socio potencial o a tu ayuntamiento',
  },
  {
    icon: Landmark,
    lead: 'Guía orientativa de entidades y líneas de financiación según tu caso:',
    resto:
      ' no es lo mismo pedir 10.000 € que 30.000 €, ni comprar un camión para una empresa de transporte que reformar un local — te indicamos qué tipo de entidades y productos suelen encajar con tu inversión y qué condiciones mirar al comparar',
  },
]

const INCLUYE_ESTANDAR = [
  'Validación previa de tu idea incluida',
  'Documento a tu nombre, sin marca de PlanCrece',
]

const INFORME_ITEMS = [
  { icon: MapPin, text: 'Análisis personalizado por zona' },
  { icon: FileSearch, text: 'Subvenciones disponibles para tu caso' },
  { icon: Flag, text: 'Ayudas europeas aplicables' },
  { icon: ClipboardList, text: 'Requisitos y plazos detallados' },
  { icon: MessageSquare, text: 'Asesoramiento para la solicitud' },
  { icon: Bell, text: 'Seguimiento de convocatorias' },
]

function GrupoTitulo({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="border-t border-border pt-5 text-xs font-bold uppercase tracking-wider text-[#0B2447]">
      {children}
    </h3>
  )
}

function ModuloPlan() {
  return (
    <ol className="mt-3 grid gap-2.5 sm:grid-cols-2">
      {PLAN_EMPRESA.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex items-center gap-2.5 rounded-lg bg-secondary/70 px-3 py-2.5 text-[13.5px] font-medium text-foreground"
        >
          <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ol>
  )
}

function ChipsFormatos({ formatos }: { formatos: { icon: typeof FileText; label: string }[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {formatos.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold text-[#0B2447] ring-1 ring-border"
        >
          <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  )
}

export default function Precios() {
  const checksRef = useCheckSequence<HTMLDivElement>()
  return (
    <>
      <section className="hero-bg py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0B2447] sm:text-4xl">
            Inversión clara, sin sorpresas.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
            Elige según tu objetivo. Todos incluyen validación de tu idea y garantía
            de satisfacción.
          </p>
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div ref={checksRef} className="check-seq grid gap-5 lg:grid-cols-2 lg:items-stretch">
            {/* ---------------- Plan Estándar ---------------- */}
            <Reveal>
              <article className="relative h-full rounded-2xl bg-white p-6 shadow-md ring-1 ring-border transition-all duration-250 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                <h2 className="text-xl font-bold text-[#0B2447]">Plan Estándar</h2>
                <p className="mt-4 flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-[#0B2447]">149 € + IVA</span>
                </p>
                <p className="mt-2 text-sm font-medium text-primary">
                  Tu plan de empresa completo, listo para presentar.
                </p>

                <div className="mt-6 space-y-6">
                  <div>
                    <GrupoTitulo>Contenido del plan</GrupoTitulo>
                    <ModuloPlan />
                  </div>

                  <div>
                    <GrupoTitulo>Incluye</GrupoTitulo>
                    <ul className="mt-3 space-y-3">
                      {INCLUYE_ESTANDAR.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[15px] text-foreground">
                          <Check className="check-icon mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <GrupoTitulo>Formatos de entrega</GrupoTitulo>
                    <ChipsFormatos formatos={FORMATOS_ESTANDAR} />
                  </div>
                </div>

                <Link
                  to={pagoUrl('estandar')}
                  className="btn-press group mt-8 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-secondary text-base font-semibold text-[#0B2447] ring-1 ring-border transition-all duration-250 hover:-translate-y-0.5 hover:bg-slate-200"
                >
                  Solicita tu plan
                  <ArrowRight
                    className="h-5 w-5 transition-transform duration-250 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </article>
            </Reveal>

            {/* ---------------- Plan Avanzado ---------------- */}
            <Reveal delay={110}>
              <article className="sheen relative h-full rounded-2xl border-t-[6px] border-t-primary bg-white p-6 shadow-xl ring-1 ring-primary/20 transition-all duration-250 hover:-translate-y-1 sm:p-8">
                <h2 className="text-xl font-bold text-[#0B2447]">Plan Avanzado</h2>
                <p className="mt-4 flex items-baseline gap-3">
                  <span className="text-5xl font-extrabold text-[#0B2447]">149 € + IVA</span>
                  <span className="text-2xl font-bold text-foreground/40 line-through">
                    249 € + IVA
                  </span>
                </p>
                <p className="mt-2 text-sm font-semibold text-emerald-700">
                  Los consultores que colaboran con PlanCrece han elaborado más de 3.000 planes:
                  celebramos la cifra con el Avanzado a precio de Estándar hasta el 31 de
                  diciembre de 2026
                </p>
                <p className="mt-2 text-sm font-medium text-primary">
                  El plan y todo lo que necesitas para ir a por la financiación.
                </p>

                <div className="mt-6 space-y-6">
                  <p className="rounded-lg bg-primary/5 px-4 py-3 text-sm font-semibold text-primary">
                    Todo lo del Plan Estándar, más:
                  </p>

                  <div>
                    <GrupoTitulo>Extras del Plan Avanzado</GrupoTitulo>
                    <ul className="mt-3 space-y-4">
                      {EXTRAS_AVANZADO.map(({ icon: Icon, lead, resto }) => (
                        <li key={lead} className="flex items-start gap-2.5">
                          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                          <p className="text-[15px] leading-relaxed text-foreground">
                            <strong className="font-semibold text-[#0B2447]">{lead}</strong>
                            {resto}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <GrupoTitulo>Formatos de entrega</GrupoTitulo>
                    <ChipsFormatos formatos={FORMATOS_AVANZADO} />
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-start gap-2.5 text-[15px] text-foreground">
                        <Check className="check-icon mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                        Documento a tu nombre, sin marca de PlanCrece
                      </li>
                    </ul>
                  </div>
                </div>

                <Link
                  to={pagoUrl('avanzado')}
                  className="btn-press group mt-8 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-primary text-base font-semibold text-white shadow-md transition-all duration-250 hover:-translate-y-0.5 hover:bg-[#1a45c0] hover:shadow-lg"
                >
                  Solicita tu plan
                  <ArrowRight
                    className="h-5 w-5 transition-transform duration-250 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </article>
            </Reveal>
          </div>

          {/* Nota presentación ejecutiva */}
          <Reveal delay={100}>
            <div className="mt-8 rounded-2xl border-l-4 border-primary bg-white p-6 ring-1 ring-border sm:p-8">
              <p className="text-[15px] leading-relaxed text-foreground sm:text-base">
                <strong className="text-[#0B2447]">
                  No solo preparamos tu proyecto. Te ayudamos a explicarlo.
                </strong>{' '}
                El Plan Avanzado incluye una presentación personalizada en PowerPoint con guion:
                las partes clave de tu plan y qué decir en cada una, para practicar en casa antes
                de ir al banco, a un socio potencial o a tu ayuntamiento. Si contratas el Estándar
                y la necesitas, puedes añadirla como extra — te lo proponemos tras la validación.
              </p>
            </div>
          </Reveal>

          {/* Informe de ayudas por separado */}
          <Reveal delay={150}>
            <article className="mt-8 rounded-2xl bg-white p-6 shadow-md ring-1 ring-border sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h2 className="text-xl font-bold text-[#0B2447]">
                      Informe personalizado de Ayudas y Subvenciones
                    </h2>
                    <p className="text-2xl font-extrabold text-[#0B2447]">65 € + IVA</p>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground">
                    Está <strong>incluido en el Plan Avanzado</strong>. También lo
                    ofrecemos por separado para quien solo necesita saber qué ayudas puede pedir.
                    Y si después contratas el Plan Avanzado,{' '}
                    <strong>te descontamos estos 65 €</strong>.
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground">
                    <strong className="text-[#0B2447]">Son muchos los emprendedores que nunca
                    piden las ayudas que podrían haber aprovechado</strong> — por no saber que
                    existen o por no saber si encajan con su caso. Este informe existe para que no
                    seas uno de ellos.
                  </p>
                  <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {INFORME_ITEMS.map(({ icon: Icon, text }) => (
                      <li key={text} className="flex items-start gap-2.5 text-[15px] text-foreground">
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/contacto"
                  className="btn-press group flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] bg-primary px-8 text-base font-semibold text-white shadow-md transition-all duration-250 hover:-translate-y-0.5 hover:bg-[#1a45c0] hover:shadow-lg lg:w-auto"
                >
                  Solicitar informe
                  <ArrowRight
                    className="h-5 w-5 transition-transform duration-250 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          </Reveal>

          {/* Ancla: no vale 600 € */}
          <Reveal delay={100}>
            <div className="mt-10 rounded-2xl border-l-4 border-primary bg-white p-6 ring-1 ring-border sm:p-8">
              <p className="text-[15px] leading-relaxed text-foreground sm:text-base">
                <strong className="text-[#0B2447]">
                  Nuestro plan de empresa no vale 600 €.
                </strong>{' '}
                Una gestoría te cobra eso por redactar un plan básico, sin ninguna profundidad.
                Nosotros nos hemos especializado solo en una cosa: analizar ideas de negocio y
                decirte la verdad de forma honesta, basándonos en la experiencia de consultores
                que conocen tu sector. Menos precio, más criterio.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-10 max-w-3xl">
            <ConsultantTip title="Antes de elegir plan, tenlo claro">
              <p>
                Primero validamos tu idea gratis: en hasta 3 días laborables sabrás si es viable. Si lo
                es, te recomendamos el plan que encaja con tu caso — y si no necesitas el más
                completo, te lo diremos.
              </p>
            </ConsultantTip>
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-6 text-center ring-1 ring-border sm:p-8">
            <p className="flex items-center justify-center gap-2 text-[15px] font-semibold text-[#0B2447]">
              <Lock className="h-5 w-5 text-primary" aria-hidden="true" />
              Pago seguro · Factura incluida
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground">
              Pagas <strong>tras</strong> la validación gratuita y la propuesta aceptada. Nunca
              antes.
            </p>
            <p className="mt-4 text-[15px]">
              ¿No sabes cuál encaja con tu caso?{' '}
              <Link to="/contacto" className="font-medium text-primary underline-offset-4 hover:underline">
                Escríbenos y te lo resolvemos
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
