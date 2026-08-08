import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

interface CTAButtonProps {
  to?: string
  className?: string
  full?: boolean
}

export default function CTAButton({ to = '/#formulario', className = '', full = true }: CTAButtonProps) {
  return (
    <Link
      to={to}
      className={`btn-press group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] bg-primary px-8 text-base font-semibold text-white shadow-sm transition-all duration-250 hover:-translate-y-0.5 hover:bg-[#1a45c0] hover:shadow-lg ${
        full ? 'w-full sm:w-auto' : ''
      } ${className}`}
    >
      Solicita tu plan
      <ArrowRight className="h-5 w-5 transition-transform duration-250 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  )
}
