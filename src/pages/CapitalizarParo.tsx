import { Link } from 'react-router'
import { FileText, FileCheck, ClipboardCheck, Clock, ShieldCheck } from 'lucide-react'
import Reveal from '../components/Reveal'
import CTAButton from '../components/CTAButton'

// ---------------------------------------------------------------------------
// Landing /capitalizar-paro (SEO-6B)
// Copy editorial aprobado: SEO-6A v4 + títulos de sección corregidos.
// Sin metadata, schema ni FAQPage: llegan en SEO-3/SEO-4/SEO-5.
// ---------------------------------------------------------------------------

const MEMORIA_PUNTOS = [
  'Qué actividad vas a desarrollar y por qué tiene sentido en tu zona o mercado.',
  'En qué vas a invertir el pago único, con importes coherentes y justificables.',
  'Cómo se sostienen tus previsiones de ingresos y gastos.',
  'Qué documentación adicional apoya tu caso (presupuestos, facturas proforma, contratos, titulaciones, según tu situación).',
]

const HACEMOS_PUNTOS = [
  'Hablas directamente con el consultor que elabora tu plan, sin intermediarios.',
  'Trabajamos con la información real de tu proyecto; si falta información, te la pedimos.',
  'Confidencialidad por escrito (NDA) desde el primer contacto.',
  'Consultores con experiencia desde 2008.',
]

const DEPENDE_SEPE = [
  'No presentamos la solicitud ante el SEPE ni intervenimos en su resolución. La tramitación corresponde a la persona solicitante.',
  'No garantizamos la concesión del pago único: depende de los requisitos aplicables y de tu caso.',
  'No prometemos plazos de la administración: el SEPE revisará tu expediente en los suyos.',
]

const FAQS = [
  {
    q: '¿Qué significa capitalizar el paro?',
    a: [
      'Es una medida que puede permitir recibir de una sola vez parte o la totalidad de la prestación por desempleo pendiente para destinarla a un proyecto de emprendimiento, según tu situación y los requisitos aplicables.',
      'Consulta siempre la información vigente del SEPE antes de iniciar el trámite.',
    ],
  },
  {
    q: '¿Qué documentación puede necesitar mi proyecto?',
    a: [
      'La documentación puede variar según tu situación y el tipo de proyecto. Puede incluir una memoria explicativa, previsiones, presupuestos u otros documentos que respalden la inversión prevista. Tu plan de negocio puede aportar el análisis y la estructura que necesites para preparar esa memoria, siempre según la información disponible y los requisitos de tu caso.',
    ],
  },
  {
    q: '¿Qué incluye el plan de negocio de PlanCrece?',
    a: [
      'El contenido se adapta a tu proyecto e incluye, cuando procede, la presentación de la actividad, análisis de mercado, inversiones, previsiones económico-financieras y estructura operativa. No sustituye el asesoramiento jurídico, fiscal o laboral específico que pueda requerir tu caso.',
    ],
  },
  {
    q: '¿Cuál es el precio y el plazo de entrega?',
    a: [
      'Plan Estándar: 149 € + IVA. Entrega habitual en 7 días laborables; si tu caso requiere más tiempo, te lo comunicamos con el motivo.',
    ],
  },
  {
    q: '¿Qué ocurre si falta información?',
    a: [
      'Te la pedimos. No elaboramos el plan con datos inventados: si algo falta o no encaja, lo hablamos contigo antes de seguir.',
    ],
  },
  {
    q: '¿PlanCrece garantiza la aprobación del SEPE?',
    a: [
      'No. La concesión depende del SEPE y de las circunstancias de cada solicitud. Nuestro trabajo es ayudarte a documentar el proyecto con rigor.',
    ],
  },
]

export default function CapitalizarParo() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0B2447] text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:py-16">
          <Reveal>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Plan de negocio para capitalizar el paro
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Si estás cobrando el paro y quieres emprender, el pago único puede ayudarte a
              utilizar parte o la totalidad de la prestación pendiente para poner en marcha un
              proyecto, según tu situación y los requisitos aplicables. Para solicitarlo,
              tendrás que preparar la documentación que corresponda a tu proyecto y a los
              requisitos aplicables. Una memoria clara y unos números coherentes pueden
              ayudarte a presentar el proyecto con rigor.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CTAButton label="Valida tu idea gratis" full={false} />
              <Link
                to="/precios"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Ver precios
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Qué es capitalizar el paro */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <Reveal>
          <h2 className="flex items-center gap-3 text-2xl font-bold text-[#0B2447]">
            <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
            Qué es capitalizar el paro (pago único)
          </h2>
          <p className="mt-4 text-foreground/80">
            Capitalizar el paro —también llamado pago único— es una medida del Servicio Público
            de Empleo Estatal (SEPE) que permite recibir de una sola vez una parte o la
            totalidad de la prestación por desempleo pendiente, para destinarla, por ejemplo,
            al inicio de una actividad por cuenta propia o a determinados proyectos de
            cooperativa o sociedad laboral.
          </p>
          <p className="mt-4 text-foreground/80">
            No es una ayuda adicional: es tu propia prestación, adelantada. El SEPE revisa la
            documentación y el destino previsto de la inversión conforme a los requisitos
            aplicables a cada solicitud. El momento de presentar la solicitud puede ser
            relevante. Consulta siempre la información vigente del SEPE antes de iniciar la
            actividad.
          </p>
        </Reveal>
      </section>

      {/* Qué conviene revisar */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <Reveal>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-[#0B2447]">
              <ClipboardCheck className="h-6 w-6 text-primary" aria-hidden="true" />
              Qué conviene revisar antes de solicitar el pago único
            </h2>
            <p className="mt-4 text-foreground/80">
              El SEPE revisa la situación de la persona solicitante, la prestación pendiente,
              el momento en que se presenta la solicitud y el destino previsto de la inversión.
            </p>
            <p className="mt-4 text-foreground/80">
              También puede ser necesario aportar documentación que ayude a explicar y
              justificar el proyecto. Las condiciones aplicables pueden variar según tu
              situación y la normativa vigente.
            </p>
            <p className="mt-4 text-foreground/80">
              Consulta siempre la información vigente en la página oficial del SEPE antes de
              iniciar el trámite.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Memoria explicativa */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <Reveal>
          <h2 className="flex items-center gap-3 text-2xl font-bold text-[#0B2447]">
            <FileCheck className="h-6 w-6 text-primary" aria-hidden="true" />
            La memoria explicativa: qué puede contar de tu proyecto
          </h2>
          <p className="mt-4 text-foreground/80">
            Según el caso, la solicitud puede requerir una memoria explicativa del proyecto y
            de la inversión, junto con documentación que la respalde.
          </p>
          <p className="mt-4 text-foreground/80">
            Una memoria bien preparada suele explicar:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-foreground/80">
            {MEMORIA_PUNTOS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="mt-4 text-foreground/80">
            El nivel de detalle necesario dependerá del proyecto, de la inversión prevista y de
            la documentación aplicable a tu caso.
          </p>
        </Reveal>
      </section>

      {/* Qué hacemos */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <Reveal>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-[#0B2447]">
              <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
              Qué hacemos en PlanCrece por ti
            </h2>
            <p className="mt-4 text-foreground/80">
              Un plan de negocio elaborado con la información de tu proyecto, preparado para
              apoyar la documentación que corresponda.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-foreground/80">
              {HACEMOS_PUNTOS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="mt-4 text-foreground/80">
              Más de 3.000 planes elaborados por los consultores que colaboran con PlanCrece.{' '}
              <span className="text-foreground/60">
                Las cifras reflejan la experiencia profesional acumulada de los consultores
                colaboradores, incluidos trabajos realizados antes de su colaboración con
                PlanCrece.
              </span>
            </p>
            <p className="mt-4 text-sm">
              <Link to="/como-funciona" className="font-semibold text-primary hover:underline">
                Cómo trabajamos
              </Link>
              {' · '}
              <Link to="/financiacion" className="font-semibold text-primary hover:underline">
                Otras vías de financiación
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Qué puede hacer PlanCrece y qué depende del SEPE */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <Reveal>
          <h2 className="flex items-center gap-3 text-2xl font-bold text-[#0B2447]">
            <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
            Qué puede hacer PlanCrece y qué depende del SEPE
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-foreground/80">
            {DEPENDE_SEPE.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="mt-4 text-foreground/80">
            Lo que sí hacemos es ayudarte a estructurar y documentar el proyecto con la
            información disponible.
          </p>
        </Reveal>
      </section>

      {/* Precio y plazo */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <Reveal>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-[#0B2447]">
              <Clock className="h-6 w-6 text-primary" aria-hidden="true" />
              Precio y plazo
            </h2>
            <p className="mt-4 text-foreground/80">
              <strong className="text-[#0B2447]">Plan Estándar: 149 € + IVA.</strong>
            </p>
            <p className="mt-4 text-foreground/80">
              <strong className="text-[#0B2447]">Entrega habitual en 7 días laborables.</strong>{' '}
              Si la complejidad del caso o la información pendiente requiere más tiempo, te
              informaremos del motivo.
            </p>
            <p className="mt-4 text-sm italic text-foreground/60">
              El Plan Estándar es compatible con un proyecto de capitalización o pago único
              siempre que la información facilitada por el cliente sea suficiente y correcta.
              Si falta información, PlanCrece la solicitará.
            </p>
            <p className="mt-2 text-sm italic text-foreground/60">
              La documentación y la resolución dependen de los requisitos aplicables del SEPE y
              de las circunstancias de cada caso. PlanCrece no garantiza la concesión.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <Reveal>
          <h2 className="text-2xl font-bold text-[#0B2447]">
            Preguntas frecuentes sobre capitalizar el paro
          </h2>
          <div className="mt-6 space-y-6">
            {FAQS.map(({ q, a }) => (
              <article key={q}>
                <h3 className="text-lg font-semibold text-[#0B2447]">{q}</h3>
                {a.map((p) => (
                  <p key={p} className="mt-2 text-foreground/80">
                    {p}
                  </p>
                ))}
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm">
            <Link to="/faq" className="font-semibold text-primary hover:underline">
              Ver todas las preguntas frecuentes
            </Link>
          </p>
        </Reveal>
      </section>

      {/* Fuentes oficiales */}
      <section className="border-t border-border bg-secondary/60">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Reveal>
            <p className="text-sm text-foreground/70">
              Información oficial y tramitación:{' '}
              <a
                href="https://www.sepe.es/HomeSepe/autonomos/capitaliza-tu-prestacion.html"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                SEPE — Capitaliza tu prestación
              </a>
              {' · '}
              <a
                href="https://sede.sepe.gob.es"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Sede Electrónica del SEPE
              </a>
            </p>
            <p className="mt-2 text-xs italic text-foreground/50">
              Información consultada el 2 de septiembre de 2026; verifica siempre la
              información vigente.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#0B2447] text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center">
          <Reveal>
            <h2 className="text-2xl font-extrabold sm:text-3xl">¿Empezamos?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Cuéntanos tu idea en 2 minutos. Te diremos en hasta 3 días laborables si parece
              viable, gratis y sin compromiso.
            </p>
            <div className="mt-7">
              <CTAButton label="Valida tu idea gratis" full={false} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
