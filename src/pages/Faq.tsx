import { useState } from 'react'
import { Link } from 'react-router'
import { ChevronDown } from 'lucide-react'

const CATEGORIAS = [
  {
    nombre: 'El servicio',
    items: [
      {
        q: '¿Qué pasa si mi idea no es viable?',
        a: 'Te lo decimos gratis, en menos de 3 días, y te explicamos el porqué. Preferimos perder un cliente a que pierdas tus ahorros en una idea que no funciona.',
      },
      {
        q: '¿Por qué validáis las ideas gratis?',
        a: 'Porque nuestro negocio es que los planes funcionen, no redactar muchos. Si solo construimos sobre ideas viables, nuestros clientes consiguen más financiación — y nosotros, más recomendaciones.',
      },
      {
        q: '¿En qué os diferenciáis de una gestoría?',
        a: 'Una gestoría redacta un documento genérico por 600 €. Nosotros primero validamos tu idea y luego la trabaja un consultor especializado en tu sector: un experto en hostelería no valora clínicas dentales.',
      },
      {
        q: '¿Por qué cuesta 149 € y no 600 €?',
        a: 'Porque estamos especializados solo en esto. Menos estructura, más criterio: pagas el análisis y la experiencia, no la burocracia.',
      },
      {
        q: '¿Qué incluye el plan?',
        a: 'Resumen ejecutivo, mercado, estrategia, operaciones y finanzas. Listo para presentar.',
      },
      {
        q: '¿Trabajáis con mi sector?',
        a: 'Sí. Más de 10 años y +3.000 planes en tecnología, hostelería, comercio, salud, industria y más.',
      },
      {
        q: '¿Y si soy autónomo, no empresa?',
        a: 'La mayoría de nuestros clientes lo son. El formato se adapta a tu situación.',
      },
      {
        q: '¿En qué formato lo recibo?',
        a: 'PDF profesional y versión editable. El plan Inversor añade pitch deck.',
      },
      {
        q: '¿Cómo protegéis mi idea?',
        a: 'Desde la valoración gratuita tu información se trata como confidencial: solo la usamos para valorar tu proyecto y nunca se comparte, publica ni reutiliza. Si contratas, la confidencialidad queda además por escrito en las condiciones del servicio (NDA).',
      },
      {
        q: '¿Se notará que no he hecho yo el plan?',
        a: 'No. El documento es 100 % tuyo: no lleva nuestro logo ni nuestra marca en ninguna parte. Cuando lo presentes al banco, a un inversor o a una convocatoria, el protagonista eres tú.',
      },
    ],
  },
  {
    nombre: 'Financiación y ayudas',
    items: [
      {
        q: '¿Sirve para pedir un préstamo al banco?',
        a: 'Sí. Seguimos los criterios y ratios que analizan las entidades.',
      },
      {
        q: '¿Y para ENISA?',
        a: 'Sí. Conocemos sus criterios de viabilidad e innovación y los reflejamos en el documento.',
      },
      {
        q: '¿Y para subvenciones?',
        a: 'Sí. Hay ayudas locales, autonómicas y estatales; adaptamos el plan a las bases de tu convocatoria.',
      },
      {
        q: '¿Cómo sé qué ayudas hay en mi zona?',
        a: 'Depende de tu sector, ubicación y perfil. Al validar tu idea te orientamos sobre las que suelen encajar en casos como el tuyo.',
      },
      {
        q: '¿Sirve para capitalizar el paro (pago único)?',
        a: 'Sí. Para justificar el pago único necesitas un proyecto de viabilidad sólido, y es exactamente lo que elaboramos.',
      },
      {
        q: '¿Necesito entrada o avales como en una hipoteca?',
        a: 'No siempre. Existen vías sin avales personales: pago único, préstamos participativos, microcréditos o ayudas. El plan es el requisito común para explorarlas.',
      },
      {
        q: '¿Garantizáis que me concedan la financiación o la ayuda?',
        a: 'No, y desconfía de quien lo garantice. La decisión es siempre del banco u organismo. Garantizamos un plan riguroso que maximiza tus opciones.',
      },
      {
        q: '¿Trabajáis con franquicias?',
        a: 'Sí. Proyecciones coherentes con los datos de la central, defendibles ante el banco.',
      },
    ],
  },
  {
    nombre: 'Plazos y proceso',
    items: [
      {
        q: '¿Cuánto tarda?',
        a: '7 días laborables desde que empezamos a trabajar en él.',
      },
      {
        q: '¿Puedo pedir cambios?',
        a: 'Sí. Antes de entregar, contrastamos el plan contigo y lo cerramos solo cuando lo das por bueno.',
      },
      {
        q: '¿Tengo prisa?',
        a: 'Entrega exprés en 72 h disponible. Consúltanos.',
      },
    ],
  },
  {
    nombre: 'Pago y confianza',
    items: [
      {
        q: '¿Cuándo se paga?',
        a: 'Solo si tu idea supera la validación gratuita y aceptas la propuesta. Nunca antes.',
      },
      {
        q: '¿Emitís factura?',
        a: 'Sí, siempre.',
      },
      {
        q: '¿Mi idea está segura?',
        a: 'Confidencialidad garantizada desde la valoración gratuita, y por escrito al contratar. Sin excepciones.',
      },
    ],
  },
]

function Acordeon({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl bg-white ring-1 ring-border">
      <button
        type="button"
        className="btn-press flex w-full items-center justify-between gap-3 rounded-xl px-5 py-4 text-left transition-colors hover:bg-slate-50"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-[15px] font-semibold text-[#0B2447]">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-primary transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-[15px] leading-relaxed text-foreground">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <>
      <section className="hero-bg py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0B2447] sm:text-4xl">
            Resolvemos tus dudas.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
            ¿No encuentras la tuya?{' '}
            <Link to="/contacto" className="font-medium text-primary underline-offset-4 hover:underline">
              Escríbenos
            </Link>{' '}
            y te responderemos por email.
          </p>
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6">
          {CATEGORIAS.map((cat) => (
            <div key={cat.nombre}>
              <h2 className="text-lg font-bold text-[#0B2447]">{cat.nombre}</h2>
              <div className="mt-4 space-y-3">
                {cat.items.map((item) => (
                  <Acordeon key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
