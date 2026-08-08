import { Lightbulb } from 'lucide-react'
import type { ReactNode } from 'react'

interface ConsultantTipProps {
  title: string
  children: ReactNode
}

export default function ConsultantTip({ title, children }: ConsultantTipProps) {
  return (
    <aside className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-md ring-1 ring-primary/15 sm:p-8">
      <span
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/5"
        aria-hidden="true"
      />
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary shadow-sm">
          <Lightbulb className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Consejo del consultor
          </p>
          <p className="mt-1 text-base font-bold text-[#0B2447]">{title}</p>
          <div className="mt-3 space-y-2.5 border-l-2 border-primary/20 pl-4 text-[15px] leading-relaxed text-foreground">
            {children}
          </div>
        </div>
      </div>
    </aside>
  )
}
