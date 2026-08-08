import { Link } from 'react-router'
import {
  Landmark,
  Building2,
  FileText,
  RefreshCw,
  Briefcase,
  CheckCircle2,
  X,
  BarChart3,
  Calculator,
  Target,
  FileCheck,
  Lightbulb,
  Rocket,
  Store,
  Building,
  ClipboardList,
  Check,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  FileSignature,
  EyeOff,
  Leaf,
} from 'lucide-react'
import { useRef, useState } from 'react'
import CTAButton from '../components/CTAButton'
import ConsultantTip from '../components/ConsultantTip'
import LeadForm from '../components/LeadForm'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import ProjectionVisual from '../components/ProjectionVisual'

const CASOS = [
  { icon: Lightbulb, label: 'Emprendedores con una idea' },
  { icon: RefreshCw, label: 'Personas en el paro que quieren emprender' },
  { icon: ClipboardList, label: 'Autónomos que quieren crecer' },
  { icon: Rocket, label: 'Startups en busca de inversión' },
  { icon: Store, label: 'Franquiciados antes de abrir' },
  { icon: Building, label: 'Pymes que se expanden' },
]

const VIAS_FINANCIACION = [
  { icon: Landmark, title: 'Financiación bancaria', text: 'Estructura y ratios que las entidades esperan ver.' },
  { icon: Building2, title: 'ENISA', text: 'Proyecto innovador con números viables y defendibles.' },
  { icon: FileText, title: 'Subvenciones y ayudas', text: 'Documento adaptado a las bases de tu convocatoria.' },
  { icon: RefreshCw, title: 'Capitalización del paro', text: 'Proyecto de viabilidad para justificar tu pago único.' },
  { icon: Briefcase, title: 'Inversores', text: 'Proyecciones y escenarios que sostienen la negociación.' },
  { icon: CheckCircle2, title: 'Validación', text: 'Saber si tu idea es viable antes de invertir en ella.' },
]

const INCLUYE = [
  { icon: BarChart3, title: 'Análisis de mercado', text: 'Competencia, demanda y oportunidad real de tu sector.' },
  { icon: Calculator, title: 'Finanzas a 3 años', text: 'Ventas, costes y punto de equilibrio defendibles.' },
  { icon: Target, title: 'Estrategia clara', text: 'Propuesta de valor, canales, precios y hoja de ruta.' },
  { icon: FileCheck, title: 'Documento profesional', text: 'Impecable en forma y fondo, listo para presentar.' },
]

const SECTORES = [
  'Tecnología',
  'Hostelería',
  'Comercio',
  'Ecommerce',
  'Salud',
  'Industria',
  'Servicios',
  'Agroalimentario',
  'Franquicias',
]

// Testimonios anonimizados: coherentes con el NDA, la confidencialidad
// se presenta como valor, no como excusa.
const TESTIMONIOS = [
  {
    cita: 'Presenté el plan a dos bancos. Los dos me pidieron la siguiente reunión.',
    nombre: 'Fundadora de un ecommerce de cosmética',
    detalle: 'Zaragoza · Financiación obtenida',
  },
  {
    cita: 'Necesitaba el plan para una ayuda autonómica. Aprobada a la primera.',
    nombre: 'Propietario de un taller de bicicletas',
    detalle: 'Valladolid · Subvención concedida',
  },
  {
    cita: 'Capitalicé mi paro y el proyecto de viabilidad era el requisito clave. Sin él, no hay pago único.',
    nombre: 'Socio de un estudio de diseño',
    detalle: 'Valencia · Pago único concedido',
  },
  {
    cita: 'Las proyecciones fueron lo que convenció al inversor. Sin ellas no hay reunión.',
    nombre: 'Fundadora de una app de logística',
    detalle: 'Madrid · Ronda cerrada',
  },
]

const FAQ_HOME = [
  {
    q: '¿Necesito entrada o avales para financiar mi negocio?',
    a: 'No siempre. Existen vías sin avales personales (pago único, ENISA, microcréditos). El plan es el requisito común para explorarlas.',
  },
  {
    q: '¿Sirve para mi banco / ENISA / subvención / pago único?',
    a: 'Sí. Adaptamos estructura y enfoque a cada entidad, convocatoria u organismo.',
  },
  {
    q: '¿Cuánto tarda?',
    a: '7 días laborables desde que empezamos a trabajar en él, una vez validada tu idea.',
  },
  {
    q: '¿Mi idea está protegida?',
    a: 'Firmamos un acuerdo de confidencialidad antes de empezar.',
  },
  {
    q: '¿Garantizáis la financiación?',
    a: 'Nadie honesto puede hacerlo. Garantizamos un plan sólido que maximiza tus opciones.',
  },
]

function Section({
  children,
  alt = false,
  className = '',
}: {
  children: React.ReactNode
  alt?: boolean
  className?: string
}) {
  return (
    <section className={`${alt ? 'bg-secondary' : 'bg-white'} py-12 sm:py-16 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold tracking-tight text-[#0B2447] sm:text-3xl">{children}</h2>
  )
}

export default function Home() {
  const [testimonio, setTestimonio] = useState(0)
  const [faqOpen, setFaqOpen] = useState<number | null>(0)
  const swipeStart = useRef<number | null>(null)

  return (
    <>
      {/* 1. Hero */}
      <section className="hero-bg pb-10 pt-10 sm:pb-16 sm:pt-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
          <div>
            <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              Consultoría de planes de negocio · España · Desde 2014
            </p>
            <h1 className="mt-4 text-[30px] font-extrabold leading-[1.12] tracking-tight text-[#0B2447] sm:text-4xl lg:text-5xl">
              Consigue la financiación que tu{' '}
              <span className="text-primary">proyecto</span> necesita.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground sm:text-lg">
              Elaboramos tu plan de negocio con el rigor que exigen bancos, ENISA, inversores y
              convocatorias públicas.
            </p>
            <div className="mt-7 lg:hidden">
              <CTAButton />
            </div>
            <div className="mt-7 hidden lg:block">
              <CTAButton full={false} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Te decimos en 3 días si tu idea es viable · Gratis · NDA firmado
            </p>

            {/* 3. Barra de credibilidad */}
            <dl className="mt-9 grid grid-cols-3 divide-x divide-border rounded-2xl bg-white shadow-sm ring-1 ring-border">
              {[
                { end: 10, suffix: '+', decimals: 0, label: 'años de experiencia' },
                { end: 3000, suffix: '+', decimals: 0, label: 'planes elaborados' },
                { end: 4.9, suffix: '/5', decimals: 1, label: 'valoración media' },
              ].map(({ end, suffix, decimals, label }) => (
                <div key={label} className="px-3 py-4 text-center sm:px-4 sm:py-5">
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-2xl font-extrabold text-[#0B2447] sm:text-3xl">
                    <CountUp end={end} suffix={suffix} decimals={decimals} />
                  </dd>
                  <dd className="mt-1 text-[11px] leading-tight text-muted-foreground sm:text-sm">{label}</dd>
                </div>
              ))}
            </dl>

            {/* B2: visual de marca (desktop) */}
            <Reveal delay={200} className="mt-8 hidden lg:block">
              <ProjectionVisual />
            </Reveal>
          </div>

          {/* 2. Formulario */}
          <div id="formulario" className="scroll-mt-24">
            <LeadForm variant="home" />
          </div>
        </div>
      </section>

      {/* 4. ¿Es tu caso? */}
      <Section alt>
        <H2>Trabajamos con quien está en tu situación.</H2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CASOS.map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={i * 70}>
              <div className="flex h-full items-center gap-2.5 rounded-xl bg-white px-4 py-3.5 ring-1 ring-border transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md">
                <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium text-[#0B2447]">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-[15px] leading-relaxed text-foreground">
          Sea cual sea tu caso, el objetivo es el mismo: llegar a la mesa de decisión con un
          trabajo sólido.
        </p>
      </Section>

      {/* 4b. El filtro de validación */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            Primero validamos, luego construimos
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0B2447] sm:text-3xl">
            No todas las ideas pasan nuestro filtro. Y eso es bueno para ti.
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              'Analizamos cada idea con los mismos criterios que usaría un banco',
              'Solo seguimos adelante cuando los números pueden defenderse',
              'Si tu idea no es viable, te lo decimos gratis y te explicamos por qué',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-foreground">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] leading-relaxed text-foreground">
            Somos estrictos porque nuestra reputación — y tu dinero — dependen de ello. Esa
            exigencia previa es la razón de que nuestros planes consigan tan buenas tasas de
            aprobación en préstamos y ayudas.
          </p>
          <p className="mt-6 border-l-4 border-primary bg-secondary px-4 py-3 text-[15px] font-medium leading-relaxed text-[#0B2447]">
            Nuestro objetivo no es redactar muchos planes de negocio. Es ser la semilla de muchos
            negocios que funcionan.
          </p>
        </div>
      </Section>

      {/* 5. El problema */}
      <Section>
        <H2>Pedir financiación sin un buen plan es llegar desarmado.</H2>
        <ul className="mt-6 space-y-3">
          {[
            'Números que no resisten una pregunta',
            'Estructura que no sigue los criterios del banco',
            'Una idea buena que no parece tan buena sobre el papel',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-[15px] text-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[15px] leading-relaxed text-foreground">
          Nosotros preparamos tu proyecto para ese momento:{' '}
          <strong className="text-[#0B2447]">un plan que se defiende solo.</strong>
        </p>
        <div className="mt-7">
          <CTAButton />
        </div>
      </Section>

      {/* 6. Un plan, todas las puertas */}
      <Section alt>
        <H2>Un plan, todas las puertas.</H2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VIAS_FINANCIACION.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-base font-bold text-[#0B2447]">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-7">
          <CTAButton />
        </div>
      </Section>

      {/* 6b. Banda ¿Sabías que…? */}
      <Section className="!py-10 sm:!py-12">
        <div className="mx-auto max-w-3xl space-y-4">
          {[
            '¿Sabías que si estás en el paro puedes cobrarlo de una sola vez para iniciar tu negocio?',
            '¿Sabías que con una buena idea puedes pedir préstamos sin avales y sin entrada?',
          ].map((frase, i) => (
            <Reveal key={frase} delay={i * 100}>
              <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-primary/15 sm:p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <p className="text-[15px] font-semibold leading-relaxed text-[#0B2447] sm:text-base">
                  {frase}
                </p>
              </div>
            </Reveal>
          ))}
          <p className="pt-1 text-center text-sm text-muted-foreground">
            Hay más vías de las que crees. Saber cuál encaja contigo es nuestro trabajo.
          </p>
        </div>
      </Section>

      {/* 7. Bloque desbloqueador — ancla visual de la home */}
      <section className="navy-bg py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#6d9bff] sm:text-sm">
            <span className="h-px w-8 bg-[#6d9bff]" aria-hidden="true" />
            La objeción que nadie dice en voz alta
          </p>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            No necesitas una hipoteca para financiar tu negocio.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-300 sm:text-base">
            Mucha gente renuncia antes de empezar pensando que hace falta una gran entrada o
            avales, como al comprar una casa.
          </p>
          <p className="mt-5 text-[15px] font-semibold text-white sm:text-base">
            La realidad es más amplia:
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ['Pago único del paro', 'capitalizar tu prestación para arrancar'],
              ['Préstamos participativos', 'como ENISA, sin avales personales'],
              ['Ayudas y subvenciones', 'locales, autonómicas y estatales'],
              ['Líneas ICO y microcréditos', 'diseñadas para pequeños proyectos'],
            ].map(([title, desc], i) => (
              <Reveal key={title} delay={i * 90}>
                <li className="flex h-full items-start gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-sm transition-colors duration-250 hover:bg-white/10">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#4ade80]" aria-hidden="true" />
                  <span className="text-[15px] text-slate-200">
                    <strong className="text-white">{title}</strong> — {desc}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="mt-7 rounded-xl bg-primary px-5 py-4 text-[15px] font-medium leading-relaxed text-white shadow-lg sm:text-base">
            Cada vía pide lo mismo: un proyecto bien planteado sobre el papel.{' '}
            <span className="font-bold">Ahí entra tu plan.</span>
          </p>
          <div className="mt-8">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* 8. Tip del consultor */}
      <Section alt className="!py-10 sm:!py-12">
        <div className="mx-auto max-w-3xl">
          <ConsultantTip title="Lo vemos a diario">
            <p>
              Hay ayudas para emprender en prácticamente todas las comunidades autónomas y muchos
              ayuntamientos. Las que encajan contigo dependen de tu sector, tu ubicación y tu perfil.
            </p>
            <p>
              Al validar tu idea te orientamos sobre qué convocatorias suelen encajar en casos
              como el tuyo.
            </p>
          </ConsultantTip>
        </div>
      </Section>

      {/* 9. Qué incluye */}
      <Section>
        <H2>Qué lleva un plan que convence.</H2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUYE.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="h-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-border transition-all duration-250 hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold text-[#0B2447]">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 10. Experiencia y sectores */}
      <Section alt>
        <H2>Más de 10 años junto a empresas españolas.</H2>
        <p className="mt-4 text-[15px] leading-relaxed text-foreground">
          Hemos elaborado planes para proyectos de todos los tamaños, en toda España.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {SECTORES.map((s) => (
            <span
              key={s}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0B2447] ring-1 ring-border"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="mt-6 text-[15px] font-medium text-[#0B2447]">
          Esa experiencia está en cada página de tu plan.
        </p>
      </Section>

      {/* 10b. Sin idea propia → franquicias */}
      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <span className="h-px w-8 bg-primary" aria-hidden="true" />
                ¿Sin idea propia?
              </p>
              <H2>Una franquicia es emprender con manual de instrucciones.</H2>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground">
                Marca, método y proveedores ya probados, a cambio de un canon y parte del margen.
                Explora nuestro catálogo y comprueba gratis si tu perfil, tu ubicación y tu
                inversión encajan con la franquicia que te interesa.
              </p>
              <Link
                to="/franquicias"
                className="btn-press mt-6 inline-flex h-12 items-center gap-2 rounded-[10px] bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1a45c0]"
              >
                Explora el catálogo de franquicias
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <p className="mt-3 text-xs text-foreground/60">
                Sin relación comercial con las marcas · Compatibilidad en 3 días · Gratis
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-3 gap-3">
              {['halcon-viajes', 'naturhouse', 'kumon', 'eroski', 'speed-queen', 'yves-rocher'].map((slug, i) => (
                <Link
                  key={slug}
                  to={`/franquicias/${slug}`}
                  className="flex h-20 items-center justify-center rounded-xl bg-white p-3 shadow-sm ring-1 ring-border transition-all duration-250 hover:-translate-y-1 hover:shadow-md sm:h-24"
                  aria-label={`Ver franquicia ${i + 1}`}
                >
                  <img
                    src={`/franquicias/${slug}.png`}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 11. Cómo funciona (3 pasos) */}
      <Section>
        <H2>De tu idea a una reunión ganada.</H2>
        <ol className="mt-8 space-y-6">
          {[
            ['Cuéntanos tu idea', 'Formulario de 2 minutos. En menos de 3 días te decimos si es viable, gratis.'],
            ['Si es viable, construimos tu plan', 'Solo si tu idea supera la validación: investigamos, calculamos y redactamos.'],
            ['Preséntalo con seguridad', 'Entrega en 7 días, con revisiones incluidas.'],
          ].map(([title, text], i) => (
            <Reveal key={title} delay={i * 120}>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-white shadow-md ring-4 ring-primary/15">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#0B2447]">{title}</h3>
                  <p className="mt-1 text-[15px] text-foreground">{text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="mt-8">
          <CTAButton />
        </div>
        <p className="mt-3 text-sm">
          <Link to="/como-funciona" className="font-medium text-primary underline-offset-4 hover:underline">
            Ver el proceso completo
          </Link>
        </p>
      </Section>

      {/* 11b. Diferenciación vs gestorías */}
      <Section alt>
        <div className="mx-auto max-w-4xl">
          <H2>Un plan de negocio no es un trámite de 600 €.</H2>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground">
            Una gestoría te cobra eso por redactar un plan básico, sin profundidad. Nosotros hemos
            hecho justo lo contrario: especializarnos en analizar ideas y decirte la verdad.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-border">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Una gestoría
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  'Redacta un plan básico sin profundidad',
                  'El mismo redactor para todos los sectores',
                  'Te entrega un documento y hasta aquí',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] text-muted-foreground">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md ring-2 ring-primary/20">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                PlanCrece
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  'Validamos tu idea antes de redactar nada',
                  'Consultores especializados por sector',
                  'Te decimos la verdad sobre tu viabilidad, aunque no te guste',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] font-medium text-[#0B2447]">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 border-l-4 border-primary bg-white px-4 py-3 text-[15px] font-medium leading-relaxed text-[#0B2447]">
            Un consultor de hostelería no debería valorar la viabilidad de una clínica dental.
            Por eso cada idea la analiza quien conoce ese sector — y si la tendencia del mercado
            dice que es mal momento, también te lo diremos.
          </p>
        </div>
      </Section>

      {/* 12. Testimonios */}
      <Section alt>
        <H2>Ellos ya presentaron su plan.</H2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/70">
          Nuestro acuerdo de confidencialidad nos impide publicar nombres ni negocios. Estos
          clientes aceptaron compartir su experiencia de forma anónima — exactamente la misma
          discreción que tendrás tú.
        </p>
        <div
          className="mt-6 touch-pan-y sm:hidden"
          onTouchStart={(e) => {
            swipeStart.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (swipeStart.current === null) return
            const delta = e.changedTouches[0].clientX - swipeStart.current
            if (Math.abs(delta) > 50) {
              setTestimonio((t) =>
                delta < 0
                  ? Math.min(t + 1, TESTIMONIOS.length - 1)
                  : Math.max(t - 1, 0)
              )
            }
            swipeStart.current = null
          }}
        >
          <blockquote
            key={testimonio}
            className="testimonial-enter relative rounded-xl bg-white p-6 pt-8 shadow-sm ring-1 ring-border"
          >
            <span
              className="absolute -top-4 left-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-2xl font-bold leading-none text-white shadow-md"
              aria-hidden="true"
            >
              ”
            </span>
            <p className="font-serif text-[16px] italic leading-relaxed text-foreground">
              {TESTIMONIOS[testimonio].cita}
            </p>
            <footer className="mt-4">
              <p className="text-sm font-bold text-[#0B2447]">{TESTIMONIOS[testimonio].nombre}</p>
              <p className="mt-0.5 text-xs font-medium text-primary">
                {TESTIMONIOS[testimonio].detalle}
              </p>
            </footer>
          </blockquote>
          <div className="mt-4 flex justify-center gap-2">
            {TESTIMONIOS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ver testimonio ${i + 1}`}
                onClick={() => setTestimonio(i)}
                className={`dot-btn h-2.5 rounded-full ${
                  i === testimonio ? 'w-6 bg-primary' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIOS.map((t) => (
            <blockquote key={t.nombre} className="rounded-xl bg-white p-6 ring-1 ring-border">
              <p className="font-serif text-[16px] italic leading-relaxed text-foreground">“{t.cita}”</p>
              <footer className="mt-4">
                <p className="text-sm font-bold text-[#0B2447]">{t.nombre}</p>
                <p className="mt-0.5 text-xs font-medium text-primary">{t.detalle}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* 12b. Tu idea es tuya: confidencialidad y marca blanca */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            Confidencialidad
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0B2447] sm:text-3xl">
            Tu idea es tuya. Punto.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground">
            Cada negocio es único, y tratarlo como tal empieza por no contarlo. A diferencia de
            otras consultoras, nunca revelaremos tu idea, tus cifras ni tu estrategia: ni a otros
            clientes, ni en nuestra web, ni en nuestro portfolio.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-border transition-all duration-250 hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileSignature className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold text-[#0B2447]">
                  NDA firmado antes de empezar
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                  Un acuerdo de confidencialidad (NDA) es un compromiso legal por escrito: lo que
                  nos cuentes no sale de nuestras manos. Lo firmamos contigo antes de hablar de tu
                  idea, no después.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="h-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-border transition-all duration-250 hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <EyeOff className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold text-[#0B2447]">
                  El plan no lleva nuestro logo
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                  El documento es 100 % tuyo: sin nuestra marca, sin nuestro nombre, sin rastro.
                  Cuando lo presentes al banco o a un inversor, parecerá elaborado por ti — porque
                  quien debe brillar en esa mesa eres tú.
                </p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="h-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-border transition-all duration-250 hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold text-[#0B2447]">
                  Tu idea nunca se reutiliza
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                  Ni la vendemos, ni la compartimos, ni la convertimos en "caso de éxito" sin tu
                  permiso. Tu ventaja competitiva sigue siendo solo tuya.
                </p>
              </div>
            </Reveal>
          </div>

          {/* El caso del jardinero */}
          <Reveal delay={120}>
            <div className="mt-10 grid items-center gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:p-8 lg:grid-cols-[auto_1fr]">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#15803D]/10 lg:mx-0">
                <Leaf className="h-8 w-8 text-[#15803D]" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  Un ejemplo real de lo que hacemos
                </p>
                <p className="mt-3 font-serif text-[17px] italic leading-relaxed text-[#0B2447]">
                  "Un emprendedor, jardinero de profesión, soñaba con montar un restaurante de
                  tapas típicas de distintas zonas de España. Nosotros creemos que el pasado
                  siempre cuenta: le propusimos usar su talento para que el restaurante fuera una
                  experiencia verde — lleno de plantas de interior, con la sensación de entrar en
                  un jardín. Ese factor diferencial, suyo desde el primer día, fue lo que hizo
                  único el proyecto."
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-foreground">
                  Un plan de negocio lleva mucho tiempo crearlo. Nuestra experiencia y nuestra red
                  de consultores nos permiten ir más rápido — estrategia económica, inversiones,
                  tendencias, información actualizada de cada sector — y dedicar el tiempo a lo
                  importante: encontrar y potenciar <strong>tu</strong> factor diferencial, tu
                  perfil, tu historia.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 13. Garantías compactas */}
      <Section>
        <H2>Todo por escrito. Sin letra pequeña.</H2>
        <ul className="mt-6 space-y-4">
          {[
            ['NDA firmado', 'antes de hablar de tu idea'],
            ['Marca blanca', 'el plan no lleva nuestro logo: es 100 % tuyo'],
            ['Entrega en 7 días', 'o te devolvemos el 20 %'],
            ['Revisiones incluidas', 'hasta que el plan te convenza'],
          ].map(([title, desc]) => (
            <li key={title} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#15803D]" aria-hidden="true" />
              <span className="text-[15px] text-foreground">
                <strong className="text-[#0B2447]">{title}</strong> {desc}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <CTAButton />
        </div>
      </Section>

      {/* 14. FAQ corto */}
      <Section alt>
        <H2>Lo que todos preguntan.</H2>
        <div className="mt-6 space-y-3">
          {FAQ_HOME.map((item, i) => (
            <div key={item.q} className="rounded-xl bg-white ring-1 ring-border">
              <button
                type="button"
                className="btn-press flex w-full items-center justify-between gap-3 rounded-xl px-5 py-4 text-left transition-colors hover:bg-slate-50"
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                aria-expanded={faqOpen === i}
              >
                <span className="text-[15px] font-semibold text-[#0B2447]">{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                    faqOpen === i ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  faqOpen === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-[15px] leading-relaxed text-foreground">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link to="/faq" className="font-medium text-primary underline-offset-4 hover:underline">
            Ver todas las preguntas
          </Link>
        </p>
      </Section>

      {/* 15. Cierre */}
      <section className="navy-bg py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Tu proyecto merece llegar bien preparado.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-300 sm:text-base">
            Valida tu idea gratis: en menos de 3 días sabrás si es viable. Y si no lo es, te
            diremos por qué — también gratis.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton full={false} className="w-full sm:w-auto" />
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Validación gratuita · Respuesta en 3 días · NDA firmado
          </p>
        </div>
      </section>
    </>
  )
}
