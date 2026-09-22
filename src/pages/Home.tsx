import { Link } from 'react-router'
import {
  Landmark, Clock, Building2, FileText, RefreshCw, Briefcase, CheckCircle2, X,
  BarChart3, Calculator, Target, FileCheck, Lightbulb, Rocket, Store, Building,
  ClipboardList, Check, ChevronDown, ArrowRight, ShieldCheck,
} from 'lucide-react'
import { useRef, useState } from 'react'
import CTAButton from '../components/CTAButton'
import ConsultantTip from '../components/ConsultantTip'
import LeadForm from '../components/LeadForm'
import Reveal from '../components/Reveal'

const CASOS = [
  { icon: Lightbulb, label: 'Emprendedores con una idea', img: '/negocios/cafeteria.jpg', alt: 'Interior de una cafetería de barrio' },
  { icon: RefreshCw, label: 'Personas en el paro que quieren emprender', img: '/negocios/panaderia.jpg', alt: 'Panadero amasando en su obrador' },
  { icon: ClipboardList, label: 'Autónomos que quieren crecer', img: '/negocios/peluqueria.jpg', alt: 'Peluquería en pleno trabajo' },
  { icon: Rocket, label: 'Startups en busca de inversión', img: '/negocios/bicis.jpg', alt: 'Taller de alquiler y reparación de bicicletas' },
  { icon: Store, label: 'Franquiciados antes de abrir', img: '/negocios/zapateria.jpg', alt: 'Zapatería tradicional con su mercancía expuesta' },
  { icon: Building, label: 'Pymes que se expanden', img: '/negocios/taller.jpg', alt: 'Mecánico trabajando en su taller' },
]

const VIAS_FINANCIACION = [
  { icon: Landmark, title: 'Financiación bancaria y préstamos blandos', text: 'Estructura, ratios y previsiones en el formato que las entidades esperan ver — incluidas líneas con condiciones bonificadas, como las ICO.', info: 'Un préstamo blando es un préstamo con condiciones más favorables que las del mercado (tipo de interés bonificado, plazos largos o carencia), normalmente impulsado por entidades públicas como el ICO para apoyar a emprendedores y pymes. Suelen pedir un plan de negocio solvente que demuestre que podrás devolverlo. Concederlo o no es siempre decisión de la entidad.' },
  { icon: Building2, title: 'Microcréditos', text: 'Para importes más pequeños, hay entidades y programas que valoran el proyecto y la persona, no solo las garantías. Tu plan es el documento que presentan.', info: 'Un microcrédito es un préstamo de importe reducido (habitualmente hasta 25.000 €, según la entidad y el programa) pensado para personas que empiezan y no siempre pueden aportar avales. Algunas entidades los conceden valorando sobre todo la viabilidad del proyecto y el perfil del emprendedor, sujeto a requisitos y análisis de cada entidad.' },
  { icon: RefreshCw, title: 'Capitalización del paro', text: 'Proyecto de viabilidad para justificar tu pago único, redactado con los criterios que se exigen en la solicitud.', info: 'Si estás en paro y tienes prestación pendiente de cobrar, puedes solicitar cobrarla de una sola vez (el "pago único" o capitalización) para invertirla en iniciar tu actividad, siempre que cumplas los requisitos del SEPE. Suele exigirse una memoria o plan de viabilidad que justifique el proyecto: es exactamente el documento que preparamos.' },
  { icon: FileText, title: 'Ayudas públicas y subvenciones', text: 'Documento adaptado a las bases de tu convocatoria, sin construir el proyecto sobre una ayuda que aún no tienes.', info: 'Las ayudas y subvenciones (estatales, autonómicas o locales) suelen tener convocatorias con plazos, requisitos y gastos elegibles concretos, y muchas se conceden por concurrencia: presentarse no garantiza conseguirla. Por eso nunca construimos un plan contando con una subvención como si fuera segura: analizamos si existe una oportunidad real y adaptamos el documento a las bases.' },
  { icon: Briefcase, title: 'Inversores', text: 'Proyecciones y escenarios defendibles que sostienen la negociación — y la presentación ejecutiva para contarlo en quince minutos.', info: 'Un inversor aporta dinero a tu proyecto a cambio de una participación, no como un préstamo: gana si el negocio gana. Antes de decidir, examinará tus números, tu mercado y tu capacidad de ejecutar. Un plan con proyecciones defendibles y una presentación clara no garantizan la inversión, pero son la condición para que te tomen en serio.' },
  { icon: CheckCircle2, title: 'Socios', text: 'El plan y la presentación para explicar tu proyecto con claridad a quien puede aportar capital, experiencia o contactos.', info: 'Un socio no solo puede aportar dinero: también experiencia, contactos, capacidad comercial u operativa. Para convencer a la persona adecuada necesitas explicar tu proyecto con claridad: qué es, cómo gana dinero, qué necesitas y qué ofreces a cambio. Eso es exactamente lo que el plan y la presentación ejecutiva ponen sobre la mesa.' },
]

const INCLUYE = [
  { icon: BarChart3, title: 'Análisis de mercado', text: 'Competencia, demanda y oportunidad real de tu sector.' },
  { icon: Calculator, title: 'Finanzas a 3 años', text: 'Ventas, costes y punto de equilibrio defendibles.' },
  { icon: Target, title: 'Estrategia clara', text: 'Propuesta de valor, canales, precios y hoja de ruta.' },
  { icon: FileCheck, title: 'Documento profesional', text: 'Impecable en forma y fondo, listo para presentar.' },
]

const TESTIMONIOS = [
  { cita: 'yo venia con la idea dandome vueltas en la cabeza desde hace un año largo pero de numeros ni idea, eso de las previsiones me sonaba a chino. Hice lo de la valoracion gratis casi por probar y me dijeron cosas muy concretas de mi proyecto, no cosas genericas. Al final pille el plan entero y con eso fui a dos bancos. En el segundo ya llevaba las respuestas preparadas jeje.', nombre: 'Cafetería de especialidad', detalle: 'Financiación bancaria · Andalucía · 2024 · Plan Estándar' },
  { cita: 'el bar ya lo tengo abierto desde hace años, lo que necesitaba era el papel para pedir la subvencion de aqui. Pense que seria un tramite de rellenar huecos y ya. Pues no, me hicieron preguntas que ni mi gestor me habia planteado en la vida, alguna me incomodo la verdad, pero luego vi que tenia sentido. La subvencion esta presentada, a ver que pasa.', nombre: 'Bar-restaurante', detalle: 'Ayudas y subvenciones · Castilla-La Mancha · 2023 · Plan Avanzado' },
  { cita: 'vendo ropa online desde 2022 y para lo del kit digital me pedian un monton de cosas. Lo que mas me ha servido es la presentacion esa resumida, porque en la reunion con la entidad de ayudas en un cuarto de hora lo tenian claro, cuando otras veces me ha tocado explicarme mil veces y ni asi. Eso lo pague con gusto.', nombre: 'E-commerce de moda', detalle: 'Kit Digital + financiación · Comunidad Valenciana · 2024 · Plan Avanzado' },
  { cita: 'soy fisio y de negocios poca idea, queria montar mi clinica pero el banco me pedia cosas que no sabia ni lo que eran. Lo mejor es que las previsiones me las explicaron hasta que las entendi yo, y cuando el director de la oficina pregunto por el punto de equilibrio supe contestarle sin mirar el papel. eso no tiene precio.', nombre: 'Clínica de fisioterapia', detalle: 'Financiación bancaria · Galicia · 2024 · Plan Avanzado' },
  { cita: 'pedi presupuesto en una gestoria antes y me ofrecian un plan "tipo" por casi el doble. aqui lo primero que hicieron fue preguntarme media hora de cosas de MI academia, mi zona, la competencia de al lado. se nota mucho la diferencia cuando lees el documento final.', nombre: 'Academia de idiomas', detalle: 'Plan de negocio completo · Madrid · 2023 · Plan Estándar' },
  { cita: 'el plan me vino bien para ordenar la idea y descarte dos cosas que habrian sido un agujero de dinero. la primera revision tardo algo mas de lo que me esperaba, aunque la segunda llego en dos dias. en general contento.', nombre: 'Estudio de tatuaje', detalle: 'Validación de idea · País Vasco · 2024 · Plan Estándar' },
  { cita: 'proyecto agricola con transformacion propia, necesitaba el plan para una ayuda leader. conocian la convocatoria mejor que yo y eso que yo llevaba meses leyendomela. presentado en plazo.', nombre: 'Explotación agraria', detalle: 'Ayuda LEADER · Castilla y León · 2023 · Plan Avanzado' },
  { cita: 'taller de toda la vida, familiar. queria meter el servicio de diagnosis para flotas y mi hermano era el esceptico. el plan le hizo ver los numeros y al final fue el quien dijo vamos a ello. si llego a ser por mi...', nombre: 'Taller mecánico', detalle: 'Expansión de servicios · Murcia · 2024 · Plan Estándar' },
  { cita: 'tenia una app de reparto de producto local en mente. con la valoracion gratuita me dijeron que parte del modelo no se sostenia antes de gastar un euro en desarrollo. me ahorro meses, literal.', nombre: 'Startup de logística local', detalle: 'Validación de idea · Cataluña · 2024 · Valoración gratuita' },
  { cita: 'estaba a punto de firmar con una franquicia y pedi la valoracion para contrastar. me señalaron dos clausulas del contrato que yo no habia entendido bien. solo por eso ya merecio la pena escribirles.', nombre: 'Futuro franquiciado', detalle: 'Análisis previo a franquicia · Aragón · 2023 · Valoración gratuita' },
  { cita: 'no es mi primer negocio, sabia lo que queria: proyecciones serias y un documento presentable para el inversor. entregado en plazo, editable, y sin ninguna marca de quien lo habia preparado. tal cual lo pedi.', nombre: 'Empresa de servicios B2B', detalle: 'Búsqueda de inversor · Madrid · 2024 · Plan Avanzado' },
  { cita: 'somos dos hermanos con una panaderia artesana y queriamos dar el salto a obrador. el plan nos obligo a pensar cosas que llevabamos años evitando, duele un poco al principio la verdad. pero era lo que necesitabamos.', nombre: 'Panadería artesana', detalle: 'Expansión a obrador · Andalucía · 2025 · Plan Avanzado' },
]

const FAQ_HOME = [
  { q: '¿Necesito entrada o avales para financiar mi negocio?', a: 'No siempre. Existen vías sin avales personales (pago único, ENISA, microcréditos). El plan es el requisito común para explorarlas.' },
  { q: '¿Sirve para mi banco / ENISA / subvención / pago único?', a: 'Sí. Adaptamos estructura y enfoque a cada entidad, convocatoria u organismo.' },
  { q: '¿Cuánto tarda?', a: '7 días laborables desde que empezamos a trabajar en él, una vez validada tu idea.' },
  { q: '¿Mi idea está protegida?', a: 'Desde la valoración gratuita tu información se trata como confidencial: solo se usa para valorar tu proyecto y no se comparte con nadie. Si contratas, la confidencialidad queda por escrito en las condiciones del servicio.' },
  { q: '¿Garantizáis la financiación?', a: 'Nadie serio puede prometerlo. Lo que sí podemos asegurar es un plan sólido y bien fundamentado que maximiza tus opciones reales.' },
]

function Section({ children, alt = false, className = '' }: { children: React.ReactNode; alt?: boolean; className?: string }) {
  return <section className={`${alt ? 'bg-secondary' : 'bg-white'} py-12 sm:py-16 ${className}`}><div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div></section>
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold tracking-tight text-[#0B2447] sm:text-3xl">{children}</h2>
}

export default function Home() {
  const [testimonio, setTestimonio] = useState(0)
  const [faqOpen, setFaqOpen] = useState<number | null>(0)
  const [viaInfo, setViaInfo] = useState<number | null>(null)
  const swipeStart = useRef<number | null>(null)

  return (
    <>
      {/* 1 · HERO estilo referencia: titular + badges a la izquierda, formulario a la derecha */}
      <section className="hero-bg pb-10 pt-10 sm:pb-16 sm:pt-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-x-14 lg:gap-y-0">
          <div>
            <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              Consultoría de planes de negocio · España · Desde 2008
            </p>
            <h1 className="mt-4 text-[30px] font-extrabold leading-[1.12] tracking-tight text-[#0B2447] sm:text-4xl lg:text-5xl">
              Consigue la financiación que tu <span className="text-primary">proyecto</span> necesita.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground sm:text-lg">
              Elaboramos tu plan de negocio con el rigor que exigen bancos, ENISA, inversores y convocatorias públicas.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 max-w-xl">
              <div className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span className="text-xs sm:text-sm text-slate-700 font-medium">Validación gratuita previa</span></div>
              <div className="flex items-start gap-2"><Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span className="text-xs sm:text-sm text-slate-700 font-medium">Entrega en 7 días con penalización</span></div>
              <div className="flex items-start gap-2"><ShieldCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span className="text-xs sm:text-sm text-slate-700 font-medium">Cláusula de confidencialidad incluida</span></div>
              <div className="flex items-start gap-2"><FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" /><span className="text-xs sm:text-sm text-slate-700 font-medium">Documento 100% sin nuestra marca</span></div>
            </div>
            <p className="mt-5 flex max-w-xl items-start gap-2 text-sm font-medium leading-snug text-[#0B2447]">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              Tu idea. Tu nombre. Tu plan. — el documento se entrega sin marca de PlanCrece, listo para presentar como tuyo.
            </p>
          </div>
          <div id="formulario" className="scroll-mt-24">
            <LeadForm variant="home" />
          </div>
        </div>
        {/* Vídeo preservado al 100%, a todo el ancho bajo el hero */}
        <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
          <Reveal delay={200}>
            <div className="relative overflow-hidden rounded-2xl shadow-md ring-1 ring-border">
              <video className="block aspect-video w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster="/hero-negocios.jpg" aria-hidden="true">
                <source src="/hero-negocios.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2447]/45 via-transparent to-transparent" aria-hidden="true" />
              <p className="absolute bottom-3 left-4 right-4 text-[13px] font-medium leading-snug text-white drop-shadow sm:bottom-4 sm:left-6 sm:text-sm">Negocios como el tuyo, cada mañana, en cada barrio de España.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 · Bifurcador: segmentación temprana */}
      <Section><div className="mx-auto max-w-4xl">
        <H2>¿Por dónde quieres empezar?</H2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a href="#formulario" className="group h-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-border transition-all duration-250 hover:-translate-y-1 hover:shadow-md">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" /></span>
            <h3 className="mt-3 text-base font-bold text-[#0B2447]">Ya tengo una idea de negocio</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground">Cuéntanosla en 2 minutos y te diremos gratis si la vemos viable antes de que inviertas en un plan.</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Validar mi idea gratis<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></span>
          </a>
          <Link to="/franquicias" className="group h-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-border transition-all duration-250 hover:-translate-y-1 hover:shadow-md">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><Store className="h-5 w-5 text-primary" aria-hidden="true" /></span>
            <h3 className="mt-3 text-base font-bold text-[#0B2447]">Aún no tengo una idea clara</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground">Explora franquicias con marca y método ya probados, y comprueba gratis si tu perfil y tu inversión encajan.</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Explorar franquicias<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></span>
          </Link>
        </div>
      </div></Section>

      {/* 3 · Proceso en 3 pasos como tarjetas numeradas (estilo referencia) */}
      <Section alt><H2>De tu idea a una reunión ganada.</H2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {[['Cuéntanos tu idea', 'Formulario de 2 minutos. Te decimos en hasta 3 días laborables si es viable, gratis.'], ['Si es viable, construimos tu plan', 'Solo si tu idea supera la validación: investigamos, calculamos y redactamos.'], ['Preséntalo con seguridad', 'Entrega en 7 días. No se cierra hasta que lo des por bueno.']].map(([title, text], i) => (
            <Reveal key={title} delay={i * 120}>
              <li className="h-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-border transition-all duration-250 hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-bold text-white shadow-md ring-4 ring-primary/15">{i + 1}</span>
                <h3 className="mt-4 text-base font-bold text-[#0B2447]">{title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-foreground">{text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="mt-8"><CTAButton /></div>
        <p className="mt-3 text-sm"><Link to="/como-funciona" className="font-medium text-primary underline-offset-4 hover:underline">Ver el proceso completo</Link></p>
      </Section>

      {/* 4 · Banda de cifras (claims verificables propios) */}
      <Section className="!py-10 sm:!py-12"><div className="mx-auto max-w-4xl">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-border sm:rounded-2xl sm:bg-white sm:shadow-sm sm:ring-1 sm:ring-border">
          <div className="px-3 py-4 text-center sm:px-4 sm:py-5">
            <dt className="sr-only">años de experiencia</dt>
            <dd className="text-base font-extrabold leading-snug text-[#0B2447] sm:text-lg">Consultores con experiencia desde 2008</dd>
          </div>
          <div className="px-3 py-4 text-center sm:px-4 sm:py-5">
            <dt className="sr-only">planes elaborados</dt>
            <dd className="text-base font-extrabold leading-snug text-[#0B2447] sm:text-lg">Más de 3.000 planes</dd>
            <dd className="mt-1 text-[11px] leading-tight text-muted-foreground sm:text-sm text-center">Experiencia acumulada de los consultores que colaboran con PlanCrece</dd>
          </div>
          <div className="px-3 py-4 text-center sm:px-4 sm:py-5">
            <dt className="sr-only">plazo de entrega</dt>
            <dd className="text-base font-extrabold leading-snug text-[#0B2447] sm:text-lg">Entrega en 7 días</dd>
            <dd className="mt-1 text-[11px] leading-tight text-muted-foreground sm:text-sm text-center">o te devolvemos el 20 %</dd>
          </div>
          <div className="px-3 py-4 text-center sm:px-4 sm:py-5">
            <dt className="sr-only">confidencialidad</dt>
            <dd className="text-base font-extrabold leading-snug text-[#0B2447] sm:text-lg">Confidencial por escrito (NDA)</dd>
            <dd className="mt-1 text-[11px] leading-tight text-muted-foreground sm:text-sm text-center">desde el primer contacto</dd>
          </div>
        </dl>
        <p className="mt-2 text-[11px] leading-snug text-muted-foreground sm:text-xs">
          Las cifras reflejan la experiencia profesional acumulada de los consultores colaboradores, incluidos trabajos realizados antes de su colaboración con PlanCrece.
        </p>
      </div></Section>

      {/* 5 · Casos (tarjetas con foto, slot visual de la referencia) */}
      <Section alt><H2>Trabajamos con quien está en tu situación.</H2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CASOS.map(({ icon: Icon, label, img, alt }, i) => (
            <Reveal key={label} delay={i * 70}>
              <div className="group h-full overflow-hidden rounded-xl bg-white ring-1 ring-border transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md">
                <div className="aspect-[3/2] overflow-hidden"><img src={img} alt={alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                <div className="flex items-center gap-2.5 px-4 py-3.5"><Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" /><span className="text-sm font-medium text-[#0B2447]">{label}</span></div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-[15px] leading-relaxed text-foreground">Sea cual sea tu caso, el objetivo es el mismo: llegar a la mesa de decisión con un trabajo sólido.</p>
      </Section>

      {/* 6 · Navy: los cuatro caminos (bloque oscuro de contraste, literal) */}
      <section className="navy-bg py-14 sm:py-20"><div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#6d9bff] sm:text-sm"><span className="h-px w-8 bg-[#6d9bff]" aria-hidden="true" />La objeción que nadie dice en voz alta</p>
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">No necesitas una hipoteca para empezar.</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-300 sm:text-base">Mucha gente renuncia antes de empezar pensando que hace falta una gran entrada o avales, como al comprar una casa. Tu idea no necesita solo un documento: necesita un camino para empezar. Estos son los cuatro que exploramos contigo, según tu situación:</p>
        <ul className="mt-7 grid gap-4 sm:grid-cols-2">
          {[['Usar tu prestación para empezar', 'Si ya tienes una prestación por desempleo pendiente y cumples los requisitos, quizá puedas valorar el pago único para impulsar tu proyecto.'], ['Pedir financiación para tu proyecto', 'Existen préstamos y microcréditos que, según perfil y entidad, pueden no exigir garantía real. Un buen plan ayuda a demostrar viabilidad y capacidad de devolución.'], ['Empezar acompañado', 'Para algunos proyectos, un socio aporta capital, experiencia o capacidad comercial. Te ayudamos a estructurar el proyecto y a explicarlo ante posibles socios o inversores.'], ['Buscar ayudas que encajen contigo', 'Las ayudas y subvenciones pueden complementar la financiación. No construimos un proyecto contando con una subvención como si estuviera garantizada: analizamos si existe una oportunidad real.']].map(([title, desc], i) => (
            <Reveal key={title} delay={i * 90}>
              <li className="flex h-full flex-col rounded-xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-sm transition-colors duration-250 hover:bg-white/10">
                <span className="flex items-center gap-2.5"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6EE7B7] text-sm font-bold text-[#0B2447]">{i + 1}</span><strong className="text-[15px] font-bold text-white sm:text-base">{title}</strong></span>
                <span className="mt-3 text-sm leading-relaxed text-slate-300">{desc}</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <p className="mt-7 rounded-xl bg-primary px-5 py-4 text-[15px] font-medium leading-relaxed text-white shadow-lg sm:text-base">Cada camino pide lo mismo: un proyecto bien planteado sobre el papel. <span className="font-bold">Ahí entra tu plan.</span></p>
        <div className="mt-8"><CTAButton /></div>
      </div></section>

      {/* 7 · Franquicias (literal) */}
      <Section><div className="grid items-center gap-8 lg:grid-cols-2">
        <Reveal><div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><span className="h-px w-8 bg-primary" aria-hidden="true" />¿Sin idea propia?</p>
          <H2>Una franquicia es emprender con manual de instrucciones.</H2>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground">Marca, método y proveedores ya probados, a cambio de un canon y parte del margen. Explora nuestro catálogo y comprueba gratis si tu perfil, tu ubicación y tu inversión encajan con la franquicia que te interesa.</p>
          <Link to="/franquicias" className="btn-press mt-6 inline-flex h-12 items-center gap-2 rounded-[10px] bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1a45c0]">Explora el catálogo de franquicias<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></Link>
          <p className="mt-3 text-xs text-foreground/60">Sin relación comercial con las marcas · Compatibilidad en hasta 3 días laborables · Gratis</p>
        </div></Reveal>
        <Reveal delay={120}><div className="grid grid-cols-3 gap-3">
          {['halcon-viajes', 'naturhouse', 'kumon', 'eroski', 'speed-queen', 'yves-rocher'].map((slug, i) => (
            <Link key={slug} to={`/franquicias/${slug}`} className="flex h-20 items-center justify-center rounded-xl bg-white p-3 shadow-sm ring-1 ring-border transition-all duration-250 hover:-translate-y-1 hover:shadow-md sm:h-24" aria-label={`Ver franquicia ${i + 1}`}>
              <img src={`/franquicias/${slug}.png`} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
            </Link>
          ))}
        </div></Reveal>
      </div></Section>

      {/* 8 · Qué lleva un plan + vías (fusionadas, textos literales) */}
      <Section alt><H2>Qué lleva un plan que convence.</H2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUYE.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="h-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-border transition-all duration-250 hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><Icon className="h-5 w-5 text-primary" aria-hidden="true" /></span>
                <h3 className="mt-3 text-base font-bold text-[#0B2447]">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="mt-12 text-xl font-bold tracking-tight text-[#0B2447] sm:text-2xl">Un plan, preparado para cada puerta.</h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground">No hay dos fuentes de financiación que pidan lo mismo. Adaptamos estructura, ratios y enfoque a los criterios de la vía que encaje contigo.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VIAS_FINANCIACION.map(({ icon: Icon, title, text, info }, idx) => (
            <div key={title} className="relative rounded-xl bg-white p-5 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><Icon className="h-5 w-5 text-primary" aria-hidden="true" /></span>
                <button type="button" onClick={() => setViaInfo(viaInfo === idx ? null : idx)} aria-expanded={viaInfo === idx} aria-label={`Qué es: ${title}`} className="btn-press flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary ring-1 ring-border transition-colors hover:bg-primary hover:text-white">i</button>
              </div>
              <h4 className="mt-3 text-base font-bold text-[#0B2447]">{title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">{text}</p>
              <div className={`grid transition-all duration-300 ease-out ${viaInfo === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden"><p className="mt-3 rounded-lg bg-secondary/70 p-3.5 text-[13px] leading-relaxed text-foreground ring-1 ring-border">{info}</p></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <ConsultantTip title="Lo vemos a diario">
            <p>Hay ayudas para emprender en prácticamente todas las comunidades autónomas y muchos ayuntamientos. Las que encajan contigo dependen de tu sector, tu ubicación y tu perfil.</p>
            <p>Al validar tu idea te orientamos sobre qué convocatorias suelen encajar en casos como el tuyo.</p>
          </ConsultantTip>
        </div>
        <div className="mt-7"><CTAButton /></div>
        <p className="mt-3 text-sm"><Link to="/precios" className="font-medium text-primary underline-offset-4 hover:underline">Ver planes y precios</Link></p>
      </Section>

      {/* 9 · Comparativa IA vs PlanCrece (literal) */}
      <Section><div className="mx-auto max-w-4xl">
        <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm"><span className="h-px w-8 bg-primary" aria-hidden="true" />La pregunta de moda</p>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0B2447] sm:text-3xl">¿Y si le pido el plan a una inteligencia artificial?</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-foreground">Puedes hacerlo, y para empezar a ordenar ideas te puede ayudar. Nosotros mismos usamos herramientas modernas cuando aportan eficiencia. El problema aparece después: un texto generado en minutos, sin análisis ni contexto, tiende a sonar como el de cualquier otro proyecto del mismo sector. Y el día que un banco, un inversor o un técnico de una subvención pregunte <em>¿de dónde sale esta cifra? ¿por qué esta estrategia y no otra?</em>, el plan hay que defenderlo en persona.</p>
        <p className="mt-4 text-[15px] font-semibold text-[#0B2447]">Tu proyecto no debería sonar como todos los demás.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-border">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Una respuesta automática</p>
            <ul className="mt-4 space-y-3">{['Estructura genérica, intercambiable entre proyectos', 'Cifras sin contrastar con tu mercado real', 'No conoce tu experiencia, tus recursos ni tu zona', 'Difícil de defender cuando te pregunten en serio'].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[15px] text-muted-foreground"><X className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />{item}</li>
            ))}</ul>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md ring-2 ring-primary/20">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Un plan trabajado contigo</p>
            <ul className="mt-4 space-y-3">{['Análisis de tu contexto real: sector, zona, competencia', 'Hipótesis y cifras que entiendes y puedes defender', 'Tu experiencia y tu historia como parte del argumento', 'La voz del proyecto es la tuya, no la de una plantilla'].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[15px] font-medium text-[#0B2447]"><Check className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />{item}</li>
            ))}</ul>
          </div>
        </div>
        <p className="mt-6 border-l-4 border-primary bg-secondary px-4 py-3 text-[15px] font-medium leading-relaxed text-[#0B2447]">La inteligencia artificial puede ayudarte a empezar. Un plan que debes defender necesita criterio, contexto y una voz propia. Los consultores que colaboran con PlanCrece combinan experiencia profesional desde 2008, mucho antes de que existiera la IA generativa.</p>
      </div></Section>

      {/* 10 · Testimonios (literal) */}
      <Section alt><H2>Ellos ya presentaron su plan.</H2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/70">Cada testimonio pertenece a un cliente real que autorizó compartir su experiencia. No publicamos nombres, negocios ni datos que permitan identificarlos: es la misma discreción con la que trataremos tu proyecto.</p>
        <div className="mt-6 touch-pan-y sm:hidden" onTouchStart={(e) => { swipeStart.current = e.touches[0].clientX }} onTouchEnd={(e) => { if (swipeStart.current === null) return; const delta = e.changedTouches[0].clientX - swipeStart.current; if (Math.abs(delta) > 50) { setTestimonio((t) => delta < 0 ? Math.min(t + 1, TESTIMONIOS.length - 1) : Math.max(t - 1, 0)); } swipeStart.current = null }}>
          <blockquote key={testimonio} className="testimonial-enter relative rounded-xl bg-white p-6 pt-8 shadow-sm ring-1 ring-border">
            <span className="absolute -top-4 left-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-2xl font-bold leading-none text-white shadow-md" aria-hidden="true">”</span>
            <p className="font-serif text-[16px] italic leading-relaxed text-foreground">{TESTIMONIOS[testimonio].cita}</p>
            <footer className="mt-4"><p className="text-sm font-bold text-[#0B2447]">{TESTIMONIOS[testimonio].nombre}</p><p className="mt-0.5 text-xs font-medium text-primary">{TESTIMONIOS[testimonio].detalle}</p></footer>
          </blockquote>
          <div className="mt-4 flex justify-center gap-2">{TESTIMONIOS.map((_, i) => (<button key={i} type="button" aria-label={`Ver testimonio ${i + 1}`} onClick={() => setTestimonio(i)} className={`dot-btn h-2.5 rounded-full ${i === testimonio ? 'w-6 bg-primary' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`} />))}</div>
        </div>
        <div className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIOS.map((t) => (<blockquote key={t.nombre} className="rounded-xl bg-white p-6 ring-1 ring-border"><p className="font-serif text-[16px] italic leading-relaxed text-foreground">“{t.cita}”</p><footer className="mt-4"><p className="text-sm font-bold text-[#0B2447]">{t.nombre}</p><p className="mt-0.5 text-xs font-medium text-primary">{t.detalle}</p></footer></blockquote>))}
        </div>
      </Section>

      {/* 11 · FAQ (literal) */}
      <Section><H2>Lo que todos preguntan.</H2>
        <div className="mt-6 space-y-3">
          {FAQ_HOME.map((item, i) => (
            <div key={item.q} className="rounded-xl bg-white ring-1 ring-border">
              <button type="button" className="btn-press flex w-full items-center justify-between gap-3 rounded-xl px-5 py-4 text-left transition-colors hover:bg-slate-50" onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i}>
                <span className="text-[15px] font-semibold text-[#0B2447]">{item.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              <div className={`grid transition-all duration-300 ease-out ${faqOpen === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden"><p className="px-5 pb-4 text-[15px] leading-relaxed text-foreground">{item.a}</p></div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm"><Link to="/faq" className="font-medium text-primary underline-offset-4 hover:underline">Ver todas las preguntas</Link></p>
      </Section>

      {/* 12 · CTA final navy + segundo formulario (variant="contact" para IDs únicos) */}
      <section className="navy-bg py-14 sm:py-20"><div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Tu proyecto merece llegar bien preparado.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-300 sm:text-base">Valida tu idea gratis: en hasta 3 días laborables sabrás si es viable. Y si no lo es, te diremos por qué — también gratis.</p>
        </div>
        <div className="mt-8"><LeadForm variant="contact" /></div>
        <p className="mt-4 text-center text-sm text-slate-400">Validación gratuita · Respuesta en hasta 3 días laborables · Confidencial</p>
      </div></section>
    </>
  )
}
