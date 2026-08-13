import { Lightbulb, FileText, Landmark, Store } from 'lucide-react'

const FASES = [
  { icon: Lightbulb, label: 'Tu idea', sub: 'El punto de partida' },
  { icon: FileText, label: 'Tu plan de negocio', sub: 'La pieza central', central: true },
  { icon: Landmark, label: 'La financiación', sub: 'Bancos, ayudas, socios' },
  { icon: Store, label: 'Tu negocio abierto', sub: 'La meta' },
]

export default function ProjectionVisual() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-border">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0B2447]">
          De la idea a la apertura
        </p>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
          Todo el camino
        </span>
      </div>

      {/* Línea de fases */}
      <div className="relative mt-6">
        {/* conector */}
        <div
          className="absolute left-[12%] right-[12%] top-6 h-0.5 bg-gradient-to-r from-border via-primary to-border"
          aria-hidden="true"
        />
        <ol className="relative grid grid-cols-4 gap-1">
          {FASES.map(({ icon: Icon, label, sub, central }, i) => (
            <li key={label} className="flex flex-col items-center text-center">
              <span
                className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ring-4 ring-white ${
                  central
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-secondary text-primary'
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span
                  className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    central ? 'bg-[#0B2447] text-white' : 'bg-white text-primary ring-1 ring-border'
                  }`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              </span>
              <span
                className={`mt-2.5 text-[11px] font-bold leading-tight sm:text-xs ${
                  central ? 'text-primary' : 'text-[#0B2447]'
                }`}
              >
                {label}
              </span>
              <span className="mt-0.5 hidden text-[10px] leading-tight text-muted-foreground sm:block">
                {sub}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-5 rounded-xl bg-secondary/70 px-4 py-3 text-center text-[12px] font-medium leading-snug text-[#0B2447]">
        El plan de negocio es la pieza que conecta todas las fases:
        <span className="block text-[11px] font-normal text-muted-foreground">
          sin él, pocas puertas se abren; con él, todas saben a qué atenerse.
        </span>
      </p>
    </div>
  )
}
