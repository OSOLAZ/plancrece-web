import { CircleHelp } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface InfoHintProps {
  /** Texto accesible del botón, p. ej. "Más información sobre la validación previa". */
  label: string
  /** Contenido breve de la ayuda (una o dos frases). */
  children: React.ReactNode
}

/**
 * Ayuda contextual discreta: botón "?" que abre un popover.
 * Funciona con clic, Enter, Espacio y tap; se cierra con Escape o al
 * interactuar fuera, y el foco vuelve al botón (gestionado por Radix).
 * La información esencial nunca depende de este componente: es suplementaria.
 */
export default function InfoHint({ label, children }: InfoHintProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className="ml-1.5 inline-flex h-5 w-5 shrink-0 translate-y-0.5 items-center justify-center rounded-full text-foreground/40 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <CircleHelp className="h-4 w-4" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        collisionPadding={12}
        className="w-64 text-sm leading-relaxed"
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
