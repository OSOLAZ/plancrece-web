import { Button } from "@/components/ui/button";

export type FallbackViewProps = {
  onOptionClick: (option: string) => void;
};

export function FallbackView({ onOptionClick }: FallbackViewProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm">No he encontrado informaci\u00f3n oficial sobre eso.</p>
      <p className="text-sm text-muted-foreground">
        Puedo ayudarte con informaci\u00f3n general.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => onOptionClick("Ver requisitos")} className="text-xs">
          Ver requisitos
        </Button>
        <Button variant="outline" size="sm" onClick={() => onOptionClick("Preguntas frecuentes")} className="text-xs">
          Preguntas frecuentes
        </Button>
        <Button variant="outline" size="sm" onClick={() => onOptionClick("Contacto")} className="text-xs">
          Contacto
        </Button>
      </div>
    </div>
  );
}
