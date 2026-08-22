import { Link } from 'react-router'
import { Mail, MessagesSquare } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0B2447] text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <img src="/brand/plancrece-icon-navy.svg" alt="PlanCrece" className="h-8 w-8" /><span className="text-lg font-bold text-white">
                Plan<span className="text-[#6d9bff]">Crece</span>
              </span>
            </div>
            <p className="mt-3 text-sm">Planes de negocio que abren puertas.</p>
            <p className="mt-4 text-sm text-slate-400">
              Más de 10 años ayudando a empresas españolas a conseguir financiación.
            </p>
          </div>

          <nav aria-label="Pie de página">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Navegación</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/como-funciona" className="hover:text-white">Cómo funciona</Link></li>
              <li><Link to="/precios" className="hover:text-white">Precios</Link></li>
              <li><Link to="/garantias" className="hover:text-white">Garantías</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/comunidad" className="hover:text-white">Foro</Link></li>
              <li><Link to="/quienes-somos" className="hover:text-white">Quiénes somos</Link></li>
              <li><Link to="/franquicias" className="hover:text-white">Franquicias</Link></li>
              <li><Link to="/financiacion" className="hover:text-white">¿Con cuánto puedes empezar?</Link></li>
              <li><Link to="/faq" className="hover:text-white">Preguntas frecuentes</Link></li>
              <li><Link to="/contacto" className="hover:text-white">Contacto</Link></li>
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Contacto</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#6d9bff]" aria-hidden="true" />
                <a href="mailto:clientes@plancrece.com" className="hover:text-white">clientes@plancrece.com</a>
              </li>
              <li className="text-slate-400">Respuesta en menos de 3 días laborables</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PlanCrece. Todos los derechos reservados.</p>
<Link
  to="/comunidad"
  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
>
  <MessagesSquare className="h-3.5 w-3.5" aria-hidden="true" />
  Comunidad activa desde 2014 · +2.500 consultas resueltas
</Link>
          <div className="flex flex-wrap gap-4">
            <Link to="/legal" className="hover:text-white">Aviso legal</Link>
            <Link to="/legal/privacidad" className="hover:text-white">Privacidad</Link>
            <Link to="/legal/cookies" className="hover:text-white">Cookies</Link>
            <Link to="/legal/condiciones" className="hover:text-white">Condiciones del servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
