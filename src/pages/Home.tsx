import { Link } from 'react-router'
import { Landmark, Clock, TrendingUp, Users, Shield, CheckCircle, ArrowRight, DollarSign, Percent, FileText, Calendar, Phone, Mail, MapPin, Star, ChevronRight, Sparkles, Target, Zap, Award, Heart, Lightbulb, Briefcase, Home as HomeIcon, Building, PieChart, BarChart3, LineChart, Activity, TrendingDown, ArrowUpRight, ArrowDownRight, RefreshCcw, Repeat, Layers, GitBranch, GitCommit, GitPullRequest, GitMerge, Settings, Sliders, Filter, Search, Menu, X, Plus, Minus, ChevronDown, ChevronUp, ChevronLeft, MoreHorizontal, MoreVertical, Copy, ExternalLink, Download, Upload, Save, Edit, Trash2, Eye, EyeOff, Lock, Unlock, Key, Hash, At, Video, Camera, Image, File, Files, Folder, FolderOpen, Archive, Tag, Tags, Bookmark, Book, Notebook, Pen, Pencil, Eraser, Scissors, Clipboard, Paste, Cut } from 'lucide-react'
import { useRef, useState } from 'react'
import CTAButton from '../components/CTAButton'
import ConsultantTip from '../components/ConsultantTip'
import LeadForm from '../components/LeadForm'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import ProjectionVisual from '../components/ProjectionVisual'
import { PlanCreceAssistant } from '@/components/assistant/PlanCreceAssistant'

export default function Home() {
  const leadFormRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                <CTAButton onClick={scrollToLeadForm} variant="primary" size="large">
                  Comienza ahora
                  <ArrowRight className="w-5 h-5" />
                </CTAButton>
                <CTAButton onClick={() => {}} variant="secondary" size="large">
                  Ver demostración
                </CTAButton>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={400}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-[#0B2447] sm:text-3xl">
                    <CountUp end={17} duration={2000} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-300 mt-1 text-center">años de experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-[#0B2447] sm:text-3xl">
                    <CountUp end={3000} duration={2500} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-300 mt-1 text-center">planes elaborados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-[#0B2447] sm:text-3xl">
                    <CountUp end={4.9} duration={1500} suffix="/5" decimals={1} />
                  </div>
                  <div className="text-sm text-gray-300 mt-1 text-center">valoración media</div>
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
                ¿Por qué elegir PlanCrece?
              </h2>
              <p className="text-lg text-gray-600">
                Combinamos experiencia, tecnología y un enfoque personalizado para ofrecerte el mejor servicio.
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
                <p className="text-gray-600">Más de 17 años asesorando a clientes con situaciones financieras complejas.</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 bg-[#A5D659]/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-[#A5D659]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B2447] mb-2">Enfoque personalizado</h3>
                <p className="text-gray-600">Cada plan se adapta a tus objetivos, perfil de riesgo y circunstancias únicas.</p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 bg-[#A5D659]/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-[#A5D659]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B2447] mb-2">Seguridad y confianza</h3>
                <p className="text-gray-600">Tu información está protegida y nuestros consejos son 100% independientes.</p>
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
                <p className="text-gray-600">Acompañamiento durante todo el proceso, desde la planificación hasta la ejecución.</p>
              </div>
            </Reveal>

            <Reveal delay={600}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="w-12 h-12 bg-[#A5D659]/10 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-[#A5D659]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B2447] mb-2">Ideas innovadoras</h3>
                <p className="text-gray-600">Estrategias financieras actualizadas con las últimas tendencias del sector.</p>
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
                Cómo funciona
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
                <p className="text-gray-600">Hablamos sobre tus objetivos y situación actual.</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#A5D659] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-[#0B2447] mb-2">Análisis</h3>
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
                <h3 className="text-lg font-semibold text-[#0B2447] mb-2">Ejecución</h3>
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
                Comienza tu planificación financiera
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
                    <div className="font-semibold text-[#0B2447]">María G.</div>
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
                <p className="text-gray-700 mb-4">"Llevaba años buscando asesoramiento financiero de calidad. Por fin encontré un equipo que realmente se preocupa por mis intereses."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#A5D659] rounded-full flex items-center justify-center text-white font-semibold">
                    C
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2447]">Carlos R.</div>
                    <div className="text-sm text-gray-500">Autónomo</div>
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
                <p className="text-gray-700 mb-4">"El plan de jubilación que diseñaron para mí es perfecto. Ahora sé exactamente cómo llegar a mis objetivos."</p>
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
                ¿Listo para tomar el control de tus finanzas?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Únete a las más de 3.000 personas que ya confiaron en PlanCrece para su planificación financiera.
              </p>
              <CTAButton onClick={scrollToLeadForm} variant="primary" size="large">
                Solicitar consulta gratuita
                <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>

      <PlanCreceAssistant page="home" />
    </>
  )
}
