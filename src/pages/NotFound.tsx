import { useEffect } from 'react'
import { Link } from 'react-router'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Página no encontrada — PlanCrece'

    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    robots.content = 'noindex, follow'

    return () => {
      robots?.remove()
    }
  }, [])

  return (
    <section className="hero-bg py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#0B2447] sm:text-4xl">
          Página no encontrada
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground sm:text-lg">
          La página que buscas no existe o ha cambiado de dirección.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-[#0B2447] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#12345f]"
          >
            Volver al inicio
          </Link>
          <Link
            to="/contacto"
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#0B2447] ring-1 ring-border transition-colors hover:bg-secondary"
          >
            Contactar
          </Link>
        </div>
      </div>
    </section>
  )
}
