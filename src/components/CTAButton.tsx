import { ArrowRight } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

interface CTAButtonProps {
  to?: string
  className?: string
  full?: boolean
  label?: string
}

export default function CTAButton({ to = '/#formulario', className = '', full = true, label = 'Analiza mi idea gratis' }: CTAButtonProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleClick = () => {
    if (to === '/#formulario') {
      if (pathname === '/') {
        document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        navigate('/', { state: { scrollTo: 'formulario' } })
      }
      return
    }

    navigate(to)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn-press group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] bg-primary px-8 text-base font-semibold text-white shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:bg-[#1a45c0] hover:shadow-lg ${
        full ? 'w-full sm:w-auto' : ''
      } ${className}`}
    >
      {label}
      <ArrowRight className="h-5 w-5 transition-transform duration-250 group-hover:translate-x-1" aria-hidden="true" />
    </button>
  )
}
