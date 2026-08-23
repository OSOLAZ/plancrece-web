import { useRef } from 'react'
import { TrendingUp, Users, Shield, Star, Sparkles, Award, Target, Lightbulb } from 'lucide-react'
import CTAButton from '../components/CTAButton'
import LeadForm from '../components/LeadForm'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import { PlanCreceAssistant } from '@/components/assistant/PlanCreceAssistant'

export default function Home() {
  const leadFormRef = useRef<HTMLDivElement>(null)

  const scrollToLeadForm = () => {
    leadFormRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B2447] via-[#193763] to-[#5B7C99] text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 text-[#A5D659]" />
                <span>Asesoramiento financiero personalizado</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Planifica tu futuro con{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A5D659] to-[#7CB84F]">
                  expertos en finanzas
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Desde 2008, ayudamos a personas como tú a tomar decisiones financieras inteligentes. 
                Más de 3.000 planes elaborados con una valoración media de 4,9/5.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CTAButton href="/" variant="primary" size="large" />
                <CTAButton href="/" variant="secondary" size="large" />
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={400}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-[#0B2447] sm:text-3xl">
                    <CountUp end={17} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-300 mt-1 text-center">aÃ±os de experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-[#0B2447] sm:text-3xl">
                    <CountUp end={3000} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-300 mt-1 text-center">planes elaborados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-[#0B2447] sm:text-3xl">
                    <CountUp end={4.9} suffix="/5" decimals={1} />
                  </div>
                  <div className="text-sm text-gray-300 mt-1 text-center">valoraciÃ³n media</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2447] mb-4">
                Â ¿Por quÃ© elegir PlanCrece?
              </h2>
              <p className="text-lg text-gray-600">
                Combinamos experiencia, tecnologÃ¬a y un enfoque personalizado para ofrecerte el mejor servicio.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Reveal delay={100}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 bg-[#A5D659]/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-[#A5D659]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B2447] mb-2">Experiencia certificada</h3>
                <p className="text-gray-600">MÃ¡s de 17 aÃ±os asesorando a clientes con situaciones financieras complejas.</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 bg-[#A5D659]/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-[#A5D659]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B2447] mb-2">Enfoque personalizado</h3>
                <p className="text-gray-600">Cada plan se adapta a tus objetivos, perfil de riesgo y circunstancias Ãnicas.</p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 bg-[#A5D659]/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-[#A5D659]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B2447] mb-2">Seguridad y confianza</h3>
                <p className="text-gray-600">Tu informaciÃ³n estÃ¡ protegida y nuestros consejos son 100% independientes.</p>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 bg-[#A5D659]/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-[#A5D659]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B2447] mb-2">Proyecciones realistas</h3>
                <p className="text-gray-600">Simulaciones basadas en datos reales del mercado y escenarios conservadores.</p>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 bg-[#A5D659]/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#A5D659]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B2447] mb-2">Soporte continuo</h3>
                <p className="text-gray-600">AcompaÃ±amiento durante todo el proceso, desde la planificaciÃ³n hasta la ejecuciÃ³n.</p>
              </div>
            </Reveal>

            <Reveal delay={600}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 bg-[#A5D659]/10 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-[#A5D659]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B2447] mb-2">Ideas innovadoras</h3>
                <p className="text-gray-600">Estrategias financieras actualizadas con las Ãltimas tendencias del sector.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2447] mb-4">
                CÃ³mo funciona
              </h2>
              <p className="text-lg text-gray-600">
                Un proceso simple y transparente en 4 pasos.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Reveal delay={100}>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#A5D659] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-[#0B2447] mb-2">Consulta inicial</h3>
                <p className="text-gray-600">Hablamos sobre tus objetivos y situaciÃ³n actual.</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#A5D659] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-[#0B2447] mb-2">AnÃ¡lisis</h3>
                <p className="text-gray-600">Estudiamos tu caso e identificamos oportunidades.</p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#A5D659] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-[#0B2447] mb-2">Propuesta</h3>
                <p className="text-gray-600">Te presentamos un plan personalizado y detallado.</p>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#A5D659] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-lg font-semibold text-[#0B2447] mb-2">EjecuciÃ³n</h3>
                <p className="text-gray-600">Implementamos el plan y hacemos seguimiento.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section ref={leadFormRef} className="py-14 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2447] mb-4">
                Comienza tu planificaciÃ³n financiera
              </h2>
              <p className="text-lg text-gray-600">
                Rellena el formulario y te contactaremos en menos de 24 horas.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="max-w-2xl mx-auto">
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B2447] mb-4">
                Lo que dicen nuestros clientes
              </h2>
              <p className="text-lg text-gray-600">
                Historias reales de personas que ya confiaron en nosotros.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Reveal delay={100}>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FDB813] text-[#FDB813]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"Gracias a PlanCrece pude organizar mis finanzas y empezar a invertir con confianza. El equipo es muy profesional y cercano."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#A5D659] rounded-full flex items-center justify-center text-white font-semibold">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2447]">MarÃ¬a G.</div>
                    <div className="text-sm text-gray-500">Emprendedora</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FDB813] text-[#FDB813]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"Llevaba aÃ±os buscando asesoramiento financiero de calidad. Por fin encontrÃ© un equipo que realmente se preocupa por mis intereses."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#A5D659] rounded-full flex items-center justify-center text-white font-semibold">
                    C
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2447]">Carlos R.</div>
                    <div className="text-sm text-gray-500">AutÃ³nomo</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FDB813] text-[#FDB813]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"El plan de jubilaciÃ³n que diseÃ±aron para mÃ¬ es perfecto. Ahora sÃ© exactamente cÃ³mo llegar a mis objetivos."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#A5D659] rounded-full flex items-center justify-center text-white font-semibold">
                    L
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2447]">Laura M.</div>
                    <div className="text-sm text-gray-500">Directiva</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="navy-bg py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Â ¿Listo para tomar el control de tus finanzas?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
        Ãnete a las mÃ¡s de 3.000 personas que ya confiaron en PlanCrece para su planificaciÃ³n financiera.
              </p>
              <CTAButton href="/" variant="primary" size="large" />
            </div>
          </Reveal>
        </div>
      </section>

      <PlanCreceAssistant page="home" />
    </>
  )
}
