import { Link } from 'react-router'
import {
  Network,
  Scale,
  FileSearch,
  ShieldCheck,
  EyeOff,
  Check,
  MapPin,
} from 'lucide-react'
import CTAButton from '../components/CTAButton'
import Reveal from '../components/Reveal'
import SpainMap from '../components/SpainMap'

const COMUNIDADES = [
  'Andalucía',
  'Aragón',
  'Asturias',
  'Illes Balears',
  'Canarias',
  'Cantabria',
  'Castilla-La Mancha',
  'Castilla y León',
  'Cataluña',
  'Comunidad Valenciana',
  'Extremadura',
  'Galicia',
  'Comunidad de Madrid',
  'Región de Murcia',
  'Navarra',
  'País Vasco',
  'La Rioja',
  'Ceuta y Melilla',
]

const VENTAJAS = [
  {
    title: 'Sin estructura pesada',
    text: 'No mantenemos oficinas ni plantillas fijas que el cliente acabe pagando.',
  },
  {
    title: 'Especialización real',
    text: 'Cada proyecto lo analiza quien conoce ese sector — no un generalista que hoy hace una herencia y mañana tu plan de negocio.',
  },
  {
    title: 'Nos dedicamos a una sola cosa',
    text: 'Analizar ideas y convertirlas en proyectos defendibles. Una gestoría reparte su tiempo entre decenas de trámites; nosotros no.',
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

export default function QuienesSomos() {
  return (
    <>
      {/* 1. Hero editorial */}
      <section className="hero-bg py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            Quiénes somos
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0B2447] sm:text-4xl">
            El criterio detrás de PlanCrece.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-foreground sm:text-lg">
            Un buen plan de negocio no sale de rellenar una plantilla. Sale de entender a la
            persona que emprende, el sector en el que quiere entrar, el dinero que necesita, el
            mercado que tiene delante y las decisiones que tendrá que defender.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground">
            PlanCrece coordina una red flexible de profesionales independientes con experiencia en
            análisis de negocio, estrategia, financiación, viabilidad y sectores concretos. Por
            respeto a la confidencialidad de sus proyectos y relaciones profesionales, no todos los
            perfiles se muestran públicamente — igual que tampoco publicamos los proyectos de
            nuestros clientes.
          </p>
        </div>
      </section>

      {/* 2. Red flexible */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            Nuestro modelo
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0B2447] sm:text-3xl">
            Una red flexible, no una fábrica de planes.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-foreground">
            Las grandes consultoras reúnen a los mejores especialistas del mercado, pero su
            estructura y sus tarifas las ponen fuera del alcance de quien empieza. Hasta ahora, un
            proyecto pequeño o mediano solo podía optar a la gestoría clásica: un mismo profesional
            para todos los sectores, un documento básico y poco más.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground">
            Nuestro modelo funciona de otra manera. Los profesionales que colaboran con PlanCrece
            desarrollan su actividad principal en el mundo de la consultoría y la empresa — y
            trabajan con nosotros en proyectos como el tuyo porque les permite aplicar su
            conocimiento donde realmente cambia las cosas: en un negocio que está empezando, no en
            una gran corporación que ya lo tiene todo.
          </p>
          <p className="mt-6 border-l-4 border-primary bg-secondary px-4 py-3 text-[15px] font-medium leading-relaxed text-[#0B2447]">
            Tú no podrías contratarlos a través de su consultora. A través de PlanCrece, su
            criterio trabaja para tu proyecto.
          </p>
        </div>
      </Section>

      {/* 2b. Más criterio que una gestoría */}
      <Section alt>
        <div className="mx-auto max-w-4xl">
          <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            La comparación honesta
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0B2447] sm:text-3xl">
            Más criterio que una gestoría. A un precio que una gestoría no puede ofrecer.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground">
            La diferencia de precio no viene de hacer menos. Viene de cómo trabajamos:
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Scale, ...VENTAJAS[0] },
              { icon: FileSearch, ...VENTAJAS[1] },
              { icon: Network, ...VENTAJAS[2] },
            ].map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 90}>
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
          <p className="mt-6 border-l-4 border-primary bg-white px-4 py-3 text-[15px] font-medium leading-relaxed text-[#0B2447]">
            Por eso podemos cobrar menos por más: no es un plan barato, es una consultoría sin el
            coste de la consultoría.
          </p>
        </div>
      </Section>

      {/* 3. Selectividad */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-[#0B2447] sm:text-3xl">
            No todos los proyectos necesitan un plan todavía.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-foreground">
            No vendemos documentos por venderlos. Antes de recomendar un plan completo, analizamos
            si el proyecto está listo, qué debe reforzarse y qué camino puede tener más sentido.
            En nuestra trayectoria profesional, cerca de 4 de cada 10 proyectos necesitaban
            replantearse o reforzarse antes de estar listos.
          </p>
          <p className="mt-4 text-[15px] font-medium leading-relaxed text-[#0B2447]">
            Si creemos que aún no es el momento, te diremos por qué — y qué puedes trabajar para
            avanzar. Gratis.
          </p>
        </div>
      </Section>

      {/* 4. Criterio humano */}
      <Section alt>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-[#0B2447] sm:text-3xl">
            Criterio humano, tecnología bien usada.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-foreground">
            Utilizamos herramientas modernas cuando aportan eficiencia. Pero una respuesta
            automática no analiza tu mercado, no conoce tu experiencia y no puede defender tus
            cifras por ti.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground">
            Cada plan que entregamos pasa por análisis humano: hipótesis contrastadas, números que
            se pueden explicar y una estructura pensada para la conversación real que tendrás con
            tu banco, tu administración o tu futuro socio.
          </p>
        </div>
      </Section>

      {/* 5. Toda España */}
      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0B2447] sm:text-3xl">
              Proyectos en toda España.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground">
              Atendemos proyectos de todo el país, de forma online y confidencial. Analizamos cada
              caso teniendo en cuenta su comunidad autónoma, su sector, su perfil y su objetivo —
              porque las ayudas, los costes y las oportunidades no son iguales en todas partes.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {COMUNIDADES.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium text-[#0B2447] ring-1 ring-border sm:text-sm"
                >
                  <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {c}
                </span>
              ))}
            </div>
          </div>
          <Reveal delay={120} className="mx-auto w-full max-w-xs lg:max-w-sm">
            <SpainMap />
          </Reveal>
        </div>
      </Section>

      {/* 6. Garantías de trabajo (confidencialidad + marca blanca) */}
      <Section alt>
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-border">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold text-[#0B2447]">
                  Confidencial desde el primer mensaje
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                  Lo que nos cuentes solo se usa para valorar tu proyecto. No se comparte, no se
                  publica, no se reutiliza. Si contratas, la confidencialidad queda por escrito en
                  las condiciones del servicio.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="h-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-border">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <EyeOff className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold text-[#0B2447]">
                  El plan no lleva nuestra marca
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                  El documento es 100 % tuyo: sin nuestro logo, sin nuestro nombre, sin rastro.
                  Cuando lo presentes, quien debe brillar en esa mesa eres tú.
                </p>
              </div>
            </Reveal>
          </div>
          <ul className="mt-6 space-y-2.5">
            {[
              'Metodología común, conocimiento específico por sector',
              'Entrega en PDF y formato editable, a tu nombre',
              'Validación gratuita antes de recomendar cualquier plan',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-foreground">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 7. Cierre */}
      <section className="navy-bg py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            PlanCrece no pone su nombre sobre tu proyecto. Pone criterio detrás de él.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-300 sm:text-base">
            El plan que entregamos no lleva nuestro logo ni nuestra marca. Lleva tu proyecto, tu
            nombre y tu visión.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton full={false} className="w-full sm:w-auto" />
          </div>
          <p className="mt-4 text-sm text-slate-400">
            <Link to="/como-funciona" className="font-medium text-[#6d9bff] underline-offset-4 hover:underline">
              Ver cómo trabajamos paso a paso
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
