import {
  ShieldCheck,
  Lock,
  Clock,
  MessageCircle,
  FileCheck,
  Handshake,
} from 'lucide-react'
import CTAButton from '../components/CTAButton'
import Reveal from '../components/Reveal'

const GARANTIAS = [
  {
    icon: ShieldCheck,
    titulo: 'Validación gratuita y sincera',
    texto:
      'En hasta 3 días laborables te decimos si tu idea es viable. Si no lo es, te explicamos por qué gratis — aunque no trabajemos juntos.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Satisfacción garantizada',
    texto: 'Trabajamos el plan contigo antes de entregarlo: no se cierra hasta que tú lo des por bueno.',
  },
  {
    icon: Lock,
    titulo: 'Confidencialidad total',
    texto: 'Tu idea se trata como confidencial desde la valoración gratuita, y por escrito al contratar. Sin excepciones.',
  },
  {
    icon: Clock,
    titulo: 'Entrega puntual',
    texto: '7 días laborables, por escrito. Si nos retrasamos, te devolvemos el 20 %.',
  },
  {
    icon: MessageCircle,
    titulo: 'Trato directo',
    texto: 'Hablas con el consultor que elabora tu plan, sin intermediarios.',
  },
  {
    icon: FileCheck,
    titulo: 'Cifras defendibles',
    texto:
      'Cada número tiene un fundamento que podrás explicar ante banco, ENISA, SEPE o inversor.',
  },
  {
    icon: Handshake,
    titulo: 'Honestidad primero',
    texto: 'Si tu proyecto no necesita un plan completo, te lo diremos desde el primer mensaje.',
  },
]

export default function Garantias() {
  return (
    <>
      <section className="hero-bg py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0B2447] sm:text-4xl">
            Compromisos firmados, no promesas.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
            Confiar tu idea y tu dinero exige garantías reales.
          </p>
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GARANTIAS.map(({ icon: Icon, titulo, texto }, i) => (
              <Reveal key={titulo} delay={i * 70}>
                <article className="h-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-border transition-all duration-250 hover:-translate-y-1 hover:shadow-md">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-lg font-bold text-[#0B2447]">{titulo}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground">{texto}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <CTAButton full={false} className="w-full sm:w-auto" />
          </div>
        </div>
      </section>
    </>
  )
}
