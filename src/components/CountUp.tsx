import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end: number
  decimals?: number
  suffix?: string
  className?: string
}

export default function CountUp({ end, decimals = 0, suffix = '', className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const animate = () => {
      if (reduced) {
        setValue(end)
        return
      }
      const duration = 1500
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(end * eased)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end])

  const formatted = value.toFixed(decimals).replace('.', ',')

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  )
}
