import { ArrowRight } from 'lucide-react'
import { Link, useLocation } from 'react-router'

interface CTAButtonProps {
  to?: string
  className?: string
  full?: boolean
  label?: string
}

export default function CTAButton({ to = '/#formulario', className = '', full = true, label = 'Analiza mi idea gratis' }: CTAButtonProps) {
  const { pathname } = useLocation()

  const scrollToForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // En la home no navegamos a un hash: el hash no cambia en el segundo clic
    // y React Router no volvería a disparar el scroll. Desplazamos directamente.
    if (to === '/#formulario' && pathname === '/') {
      event.preventDefault()
      document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Link
      to={to}
      onClick={scrollToForm}
      className={`btn-press group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] bg-primary px-8 text-base font-semibold text-white shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:bg-[#1a45c0] hover:shadow-lg ${
        full ? 'w-full sm:w-auto' : ''
      } ${className}`}
    >
      {label}
      <ArrowRight className="h-5 w-5 transition-transform duration-250 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  )
}
