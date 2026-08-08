import { Mail, Clock, ShieldCheck } from 'lucide-react'
import LeadForm from '../components/LeadForm'

export default function Contacto() {
  return (
    <>
      <section className="hero-bg py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0B2447] sm:text-4xl">
            Hablemos de tu idea.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
            Cuéntanosla y en menos de 3 días laborables te diremos si es viable. Si no lo es, te
            diremos por qué — también gratis.
          </p>
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <LeadForm variant="contact" />

          <aside className="space-y-6">
            <div className="rounded-xl bg-white p-6 ring-1 ring-border sm:p-8">
              <h2 className="text-lg font-bold text-[#0B2447]">Contacto directo</h2>
              <ul className="mt-5 space-y-4">
                <li>
                  <a
                    href="mailto:hola@plancrece.com"
                    className="flex items-center gap-3 text-[15px] font-medium text-[#0B2447] hover:text-primary"
                  >
                    <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                    hola@plancrece.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-[15px] text-foreground">
                  <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                  Respuesta en menos de 3 días laborables
                </li>
              </ul>
            </div>

            <div className="rounded-xl border-l-4 border-primary bg-white p-6 ring-1 ring-border">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#0B2447]">
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                Confidencial
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground">
                Firmamos NDA antes de hablar de tu idea.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground">
                Todo el proceso se gestiona por escrito: tendrás cada propuesta, plazo y revisión
                documentados.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
