import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

export default function StickyCTA() {
  const [scrolled, setScrolled] = useState(false)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const form = document.getElementById('formulario')
    if (!form) {
      setFormVisible(false)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0.15 }
    )
    observer.observe(form)
    return () => observer.disconnect()
  })

  const visible = scrolled && !formVisible

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <Link
        to="/#formulario"
        tabIndex={visible ? 0 : -1}
        className="btn-press flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-primary text-base font-semibold text-white shadow-md"
      >
        Solicita tu plan
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </div>
  )
}
