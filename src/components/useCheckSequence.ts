import { useEffect, useRef } from 'react'

/**
 * Observa el elemento y añade la clase `check-seq-in` cuando entra en el
 * viewport, disparando la animación secuenciada de los checks.
 * Uso: const ref = useCheckSequence(); <ul ref={ref} className="check-seq">
 */
export default function useCheckSequence<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const icons = el.querySelectorAll<HTMLElement>('.check-icon')
    icons.forEach((icon, i) => {
      icon.style.setProperty('--check-delay', `${i * 140}ms`)
    })
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('check-seq-in')
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
