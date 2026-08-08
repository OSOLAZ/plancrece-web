import { Link } from 'react-router'
import { Check, Lock, ArrowRight, FileSearch, MapPin, Flag, ClipboardList, MessageSquare, Bell } from 'lucide-react'
import ConsultantTip from '../components/ConsultantTip'
import Reveal from '../components/Reveal'
import { pagoUrl } from '../data/pagos'

const PLANES = [
  {
    id: 'estandar' as const,
    nombre: 'Plan Estándar',
    destacado: false,
    precio: '149 €',
    precioAntes: null as string | null,
    oferta: null as string | null,
    para: 'Para conseguir financiación bancaria con un plan sólido.',
    items: [
      'Plan de empresa profesional, adaptado y personalizado para conseguir los mejores préstamos',
      'Análisis de mercado y proyecciones defendibles',
      'Validación previa de tu idea incluida',
      'Entrega en PDF y formato editable (Word/Excel)',
      'Revisiones incluidas · Entrega en 7 días',
    ],
  },
  {
    id: 'avanzado' as const,
    nombre: 'Plan Avanzado',
    destacado: true,
    precio: '149 €',
    precioAntes: '199 €',
    oferta: 'Oferta de lanzamiento: el Avanzado al precio del Estándar',
    para: 'El equilibrio perfecto: tu plan y tus ayudas.',
    items: [
      'Plan de empresa profesional, adaptado y personalizado para conseguir los mejores préstamos',
      'Informe personalizado de ayudas y subvenciones',
      'Basado en tu tipo de negocio, perfil personal, situación familiar y ubicación',
      'Entrega en PDF y formato editable (Word/Excel)',
      'Revisiones incluidas · Entrega en 7 días',
    ],
  },
  {
    id: 'premium' as const,
    nombre: 'Plan Premium',
    destacado: false,
    precio: '249 €',
    precioAntes: null as string | null,
    oferta: null as string | null,
    para: 'La opción más completa: plan, ayudas y a qué puerta llamar.',
    items: [
      'Todo lo del Plan Avanzado',
      'Estudio personalizado con recomendación directa de bancos y entidades',
      'Basado en nuestra experiencia con casos como el tuyo',
      'Entrega en PDF y formato editable (Word/Excel)',
      'Revisiones incluidas · Entrega en 7 días',
    ],
  },
]

const INFORME_ITEMS = [
  { icon: MapPin, text: 'Análisis personalizado por zona' },
  { icon: FileSearch, text: 'Subvenciones disponibles para tu caso' },
  { icon: Flag, text: 'Ayudas europeas aplicables' },
  { icon: ClipboardList, text: 'Requisitos y plazos detallados' },
  { icon: MessageSquare, text: 'Asesoramiento para la solicitud' },
  { icon: Bell, text: 'Seguimiento de convocatorias' },
]

export default function Precios() {
  return (
    <>
      <section className="hero-bg py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0B2447] sm:text-4xl">
            Inversión clara, sin sorpresas.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
            Elige según tu objetivo. Todos incluyen validación de tu idea, revisiones y garantía
            de satisfacción.
          </p>
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-3 lg:items-center">
            {PLANES.map((plan, i) => (
              <Reveal key={plan.nombre} delay={i * 110}>
                <article
                  className={`relative rounded-2xl bg-white p-6 transition-all duration-250 hover:-translate-y-1 sm:p-8 ${
                    plan.destacado
                      ? 'border-t-[6px] border-t-primary shadow-xl ring-1 ring-primary/20 lg:-my-4 lg:py-12'
                      : 'shadow-md ring-1 ring-border hover:shadow-lg'
                  }`}
                >
                  {plan.destacado && (
                    <span className="absolute left-6 top-4 flex flex-wrap items-center gap-2 sm:left-8">
                      <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
                        Más elegido
                      </span>
                      {plan.oferta && (
                        <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-700 ring-1 ring-amber-300">
                          Oferta de lanzamiento
                        </span>
                      )}
                    </span>
                  )}
                  <h2 className={`text-xl font-bold text-[#0B2447] ${plan.destacado ? 'mt-6' : ''}`}>
                    {plan.nombre}
                  </h2>
                  <p className="mt-4 flex items-baseline gap-3">
                    <span
                      className={`font-extrabold text-[#0B2447] ${
                        plan.destacado ? 'text-5xl' : 'text-4xl'
                      }`}
                    >
                      {plan.precio}
                    </span>
                    {plan.precioAntes && (
                      <span className="text-2xl font-bold text-foreground/40 line-through">
                        {plan.precioAntes}
                      </span>
                    )}
                  </p>
                  {plan.oferta ? (
                    <p className="mt-2 text-sm font-semibold text-amber-700">
                      {plan.oferta}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm font-medium text-primary">{plan.para}</p>
                  <ul className="mt-6 space-y-3">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] text-foreground">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={pagoUrl(plan.id)}
                    className={`btn-press group mt-8 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[10px] text-base font-semibold transition-all duration-250 hover:-translate-y-0.5 ${
                      plan.destacado
                        ? 'bg-primary text-white shadow-md hover:bg-[#1a45c0] hover:shadow-lg'
                        : 'bg-secondary text-[#0B2447] ring-1 ring-border hover:bg-slate-200'
                    }`}
                  >
                    Solicita tu plan
                    <ArrowRight
                      className="h-5 w-5 transition-transform duration-250 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Informe de ayudas por separado */}
          <Reveal delay={150}>
            <article className="mt-8 rounded-2xl bg-white p-6 shadow-md ring-1 ring-border sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h2 className="text-xl font-bold text-[#0B2447]">
                      Informe personalizado de Ayudas y Subvenciones
                    </h2>
                    <p className="text-2xl font-extrabold text-[#0B2447]">60 €</p>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground">
                    Está <strong>incluido en los planes Avanzado y Premium</strong>. También lo
                    ofrecemos por separado para quien solo necesita saber qué ayudas puede pedir.
                    Y si después contratas un plan Avanzado o Premium,{' '}
                    <strong>te descontamos estos 60 €</strong>.
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
                Primero validamos tu idea gratis: en menos de 3 días sabrás si es viable. Si lo
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
