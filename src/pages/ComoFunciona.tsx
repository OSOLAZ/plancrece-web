import { Link } from 'react-router'
import { ArrowRight, PackageCheck, Info, Check } from 'lucide-react'
import { useState } from 'react'
import Reveal from '../components/Reveal'

const PASOS = [
  {
    numero: 1,
    titulo: 'Cuéntanos tu idea',
    texto:
      'Rellena el formulario (2 minutos). Queremos entender tu idea — y tu situación personal — mejor que nadie. Sin compromiso y sin coste.',
    media: 'imagen' as const,
    src: '/1.webp',
    alt: 'Persona contando su idea de negocio',
    cta: { label: 'Ir al formulario', to: '/contacto' },
  },
  {
    numero: 2,
    titulo: 'Validación honesta',
    texto:
      'Uno o varios consultores valoran tu idea: si el sector vive un buen momento, los pros y los contras, y si encaja con tu perfil. Si la vemos inviable, te lo decimos con honestidad y te ayudamos a mejorarla o buscar otra. Gratis.',
    media: 'imagen' as const,
    src: '/2.webp',
    alt: 'Consultora analizando documentos con cliente',
  },
  {
    numero: 3,
    titulo: 'Tu plan personalizado',
    texto:
      'Si la vemos viable, te recomendamos el plan que encaja con tu caso (Estándar o Avanzado) y te enviamos un formulario personalizado con las preguntas exactas que necesitamos para valorar y analizar tu proyecto y encontrar la mejor estrategia para ti.',
    media: 'imagen' as const,
    src: '/3b.webp',
    alt: 'Plan de empresa listo con gráficos y fotos del negocio',
  },
  {
    numero: 4,
    titulo: 'Construcción en 7 días',
    texto:
      'Pagas el plan y en unos 7 días (te avisamos si necesita más) lo construimos con los consultores más adecuados para tu sector. Si detectamos alguna ayuda o préstamo que pueda ir bien para ti, te preguntamos durante el proceso.',
    media: 'imagen' as const,
    src: '/4.webp',
    alt: 'Consultores analizando el mercado y construyendo el plan',
  },
  {
    numero: 5,
    titulo: 'Entrega completa',
    texto:
      'Recibes tu plan de empresa y todo lo que lo acompaña. Es tuyo, en PDF y en formato editable: modifícalo las veces que quieras, sin volver a pagar.',
    media: 'imagen' as const,
    src: '/5.webp',
    alt: 'Persona frente a puertas abiertas: banco, socios, ayudas',
    destacado: true,
    entregables: [
      {
        titulo: 'Plan de empresa profesional (PDF + editable)',
        tooltip:
          'El documento que el banco evalúa. En PDF para presentar y en formato editable para que lo ajustes las veces que quieras, sin volver a pagar. Sin nuestra marca: nadie sabrá que no lo has escrito tú.',
      },
      {
        titulo: 'Informe personalizado de ayudas y subvenciones',
        tooltip:
          'Analizamos qué subvenciones encajan con tu idea, tu perfil y tu zona. Muchas personas que podrían pedirlas nunca lo hacen por no conocerlas. Este informe puede reducir lo que necesitas pedir al banco o a un socio.',
      },
      {
        titulo: 'Guía de bancos y préstamos que encajan contigo',
        tooltip:
          'No es lo mismo pedir 10.000 que 30.000 €, ni comprar un camión que reformar un local. Te decimos qué entidades encajan mejor con tu caso y qué estrategia seguir con cada una.',
      },
      {
        titulo: 'Presentación PowerPoint con guion para bancos y socios',
        tooltip:
          '5 minutos de presentación profesional ante el banco o un socio. Con guion de qué decir en cada diapositiva, para practicar en casa. Muy pocos se toman en serio esta parte, y es crucial: el poder de la palabra es parte importante de este camino. Tu presentación dice mucho de ti antes de mirar un solo número.',
      },
      {
        titulo: 'Guía práctica para buscar socios e inversores',
        tooltip:
          'Consejos para buscar, acercarte y convencer a familiares, conocidos del sector o inversores locales. No podemos prometerte que encontrarás socio, pero sí que con un plan profesional tus opciones se multiplican.',
      },
      {
        titulo: 'Guía de arranque: qué delegar para centrarte en vender',
        tooltip:
          'Para cuando abras tu negocio — y confiamos en que lo vas a abrir. Te decimos qué subcontratar según tu perfil: declaración del IVA, pago de impuestos, contabilidad del día a día… Tú no estás para papeleo, estás para captar clientes. Y cómo asegurarte de que quien lo hace, lo hace bien.',
      },
    ],
  },
]

function PasoMedia({ paso, index }: { paso: (typeof PASOS)[number]; index: number }) {
  // Variaciones de Ken Burns por foto: cada una con su propio ritmo y dirección
  const kenBurnsVariants = [
    'animate-kenburns-slow',      // 1: zoom lento hacia adelante
    'animate-kenburns-pan-left',  // 2: paneo suave a la izquierda
    'animate-kenburns-zoom-out',  // 3: zoom out lento
    'animate-kenburns-pan-right', // 4: paneo suave a la derecha
    'animate-kenburns-slow',      // 5: zoom lento (la más importante, la que cierra)
  ]
  const kbClass = kenBurnsVariants[index % kenBurnsVariants.length]

  return (
    <div className="group relative aspect-[8/5] overflow-hidden rounded-xl shadow-md">
      <img
        src={paso.src}
        alt={paso.alt}
        className={`h-full w-full object-cover ${kbClass}`}
        loading="lazy"
      />
      {/* Destello de luz que pasa de vez en cuando */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-sheen absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2447]/20 to-transparent" aria-hidden="true" />
    </div>
  )
}

function TooltipEntregable({ texto }: { texto: string }) {
  const [abierto, setAbierto] = useState(false)
  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-label="Más información"
        aria-expanded={abierto}
        className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-emerald-300/70 transition-colors hover:bg-emerald-400/20 hover:text-emerald-300"
      >
        <Info className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      {abierto && (
        <span className="absolute left-1/2 top-7 z-30 w-72 -translate-x-1/2 rounded-lg bg-[#0B2447] p-3 text-left text-xs font-normal leading-relaxed text-white shadow-xl ring-1 ring-emerald-500/30">
          {texto}
        </span>
      )}
    </span>
  )
}

export default function ComoFunciona() {
  return (
    <>
      <section className="hero-bg pt-14 pb-10 sm:pt-20 sm:pb-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              Cómo funciona
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0B2447] sm:text-4xl">
              De tu idea a tu plan, en 5 pasos
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/80">
              Sin llamadas, sin reuniones, sin tecnicismos. Así es exactamente el camino desde que
              nos cuentas tu idea hasta que tienes el plan en la mano.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-slate-50/80 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="relative">
            {/* Línea de progreso vertical */}
            <div
              className="absolute left-[27px] top-0 h-full w-0.5 bg-gradient-to-b from-primary via-primary/60 to-emerald-500"
              aria-hidden="true"
            />

            <div className="space-y-10">
              {PASOS.map((paso, i) => (
                <Reveal key={paso.numero} delay={i * 80}>
                  <div className="relative flex gap-5">
                    {/* Círculo numerado */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-extrabold shadow-lg ring-4 ring-white ${
                          paso.destacado
                            ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white'
                            : 'bg-white text-primary ring-1 ring-border'
                        }`}
                      >
                        {paso.numero}
                      </div>
                    </div>

                    {/* Contenido del paso */}
                    <div className="flex-1 pb-2">
                      <h2 className="text-xl font-bold text-[#0B2447]">{paso.titulo}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/75 sm:text-base">
                        {paso.texto}
                      </p>

                      <div className="mt-4">
                        <PasoMedia paso={paso} index={i} />
                      </div>

                      {paso.cta && (
                        <Link
                          to={paso.cta.to}
                          className="btn-press mt-4 inline-flex items-center gap-2 rounded-[10px] bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1a45c0]"
                        >
                          {paso.cta.label}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      )}

                      {/* Entregables destacados */}
                      {paso.destacado && paso.entregables && (
                        <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#0B2447] to-[#123058] p-5 text-white shadow-xl sm:p-6">
                          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-emerald-300">
                            <PackageCheck className="h-4 w-4" aria-hidden="true" />
                            Todo esto es tuyo
                          </h3>
                          <ul className="mt-4 space-y-2.5">
                            {paso.entregables.map((item) => (
                              <li key={item.titulo} className="flex items-start gap-2.5 text-sm text-white/90">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                                <span className="flex-1">
                                  {item.titulo}
                                  <TooltipEntregable texto={item.tooltip} />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Nota honesta */}
          <Reveal>
            <div className="mt-12 flex gap-3 rounded-xl bg-secondary/60 p-4 text-xs leading-relaxed text-foreground/60">
              <Info className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <p>
                Los 7 días son una referencia habitual. Si tu proyecto es más complejo (por ejemplo,
                una franquicia con muchas variables o un sector regulado), te avisamos antes de
                empezar y te damos una fecha cerrada por escrito.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section className="navy-bg py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              ¿Empezamos? Cuéntanos tu idea.
            </h2>
            <p className="mt-4 text-base text-white/80">
              Validarla es gratis. Si encaja, te proponemos el siguiente paso; si no, te explicamos
              por qué. En menos de 3 días laborables.
            </p>
            <Link
              to="/contacto"
              className="btn-press mt-7 inline-flex h-[52px] items-center gap-2 rounded-[10px] bg-primary px-7 text-base font-semibold text-white transition-colors hover:bg-[#1a45c0]"
            >
              Rellenar el formulario
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
