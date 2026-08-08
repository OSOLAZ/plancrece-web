import CTAButton from '../components/CTAButton'
import Reveal from '../components/Reveal'

const PASOS = [
  {
    tiempo: 'Día 0',
    titulo: 'Cuéntanos tu proyecto',
    texto:
      'Formulario de 2 minutos. Queremos entender tu idea — y tu objetivo de financiación — mejor que nadie, y valorarla con los criterios de un banco.',
  },
  {
    tiempo: 'Día 1',
    titulo: 'Propuesta por escrito',
    texto:
      'Alcance, precio y fecha de entrega cerrados. Si buscas una ayuda o el pago único, orientamos el plan a los criterios de esa vía. Firmamos el NDA antes de empezar.',
  },
  {
    tiempo: 'Días 2–5',
    titulo: 'Construcción',
    texto:
      'Analizamos tu mercado, calculamos las proyecciones y redactamos. Te informamos en cada hito.',
  },
  {
    tiempo: 'Días 6–7',
    titulo: 'Entrega y revisión',
    texto: 'Recibes tu plan y lo ajustamos contigo hasta que digas "esto es".',
  },
  {
    tiempo: 'Después',
    titulo: 'A por la financiación',
    texto:
      'Tu plan, listo para banco, ENISA, subvención, pago único o inversor. Y seguimos aquí si necesitas apoyo.',
  },
]

export default function ComoFunciona() {
  return (
    <>
      <section className="hero-bg py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0B2447] sm:text-4xl">
            Primero validamos tu idea. Gratis.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
            Un proceso claro, probado en +3.000 proyectos. Sabrás qué pasa en cada momento — empezando por si tu idea merece la pena.
          </p>
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ol className="relative space-y-5 border-l-2 border-primary/20 pl-6 sm:pl-8">
            {PASOS.map((paso, i) => (
              <li key={paso.tiempo} className="relative">
                <Reveal delay={i * 90}>
                <span
                  className="absolute -left-[31px] top-6 h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-secondary sm:-left-[39px]"
                  aria-hidden="true"
                />
                <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-border sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    {paso.tiempo}
                  </p>
                  <h2 className="mt-1.5 text-lg font-bold text-[#0B2447]">{paso.titulo}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground">{paso.texto}</p>
                </article>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex justify-center">
            <CTAButton full={false} className="w-full sm:w-auto" />
          </div>
        </div>
      </section>
    </>
  )
}
