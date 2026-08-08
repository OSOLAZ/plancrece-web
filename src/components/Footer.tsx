import { Link } from 'react-router'
import { TrendingUp, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0B2447] text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <TrendingUp className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold text-white">
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
              <li><Link to="/comunidad" className="hover:text-white">Comunidad</Link></li>
              <li><Link to="/franquicias" className="hover:text-white">Franquicias</Link></li>
              <li><Link to="/faq" className="hover:text-white">Preguntas frecuentes</Link></li>
              <li><Link to="/contacto" className="hover:text-white">Contacto</Link></li>
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Contacto</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#6d9bff]" aria-hidden="true" />
                <a href="mailto:hola@plancrece.com" className="hover:text-white">hola@plancrece.com</a>
              </li>
              <li className="text-slate-400">Respuesta en menos de 3 días laborables</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PlanCrece. Todos los derechos reservados.</p>
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
