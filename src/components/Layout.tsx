import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import StickyCTA from './StickyCTA'

type ScrollState = { scrollTo?: string } | null

export default function Layout() {
  const { pathname, hash, state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const targetId = (state as ScrollState)?.scrollTo || hash.slice(1)

    if (targetId) {
      const el = document.getElementById(targetId)
      if (el) {
        const timer = window.setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })

          // El estado solo sirve para esta navegación. Lo limpiamos para que
          // volver atrás o hacer scroll manual no vuelva a forzar el formulario.
          if ((state as ScrollState)?.scrollTo) {
            navigate(pathname, { replace: true, state: null })
          }
        }, 50)

        return () => window.clearTimeout(timer)
      }
    }

    window.scrollTo(0, 0)
  }, [pathname, hash, state, navigate])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Outlet />
      </main>
      <StickyCTA />
      <Footer />
    </div>
  )
}
