import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Menu, X, TrendingUp } from 'lucide-react'

const NAV = [
  { to: '/como-funciona', label: 'Cómo funciona' },
  { to: '/precios', label: 'Precios' },
  { to: '/garantias', label: 'Garantías' },
  { to: '/blog', label: 'Blog' },
  { to: '/comunidad', label: 'Comunidad' },
  { to: '/franquicias', label: 'Franquicias' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? 'header-scrolled' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <TrendingUp className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-[#0B2447]">
            Plan<span className="text-primary">Crece</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-foreground'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/#formulario"
            className="btn-press inline-flex h-11 items-center rounded-[10px] bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1a45c0]"
          >
            Solicita tu plan
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-[#0B2447] lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-white px-4 pb-4 pt-2 lg:hidden" aria-label="Menú móvil">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-3.5 text-base font-medium ${
                location.pathname === item.to ? 'bg-secondary text-primary' : 'text-foreground'
              }`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
