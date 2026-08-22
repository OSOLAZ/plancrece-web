import { Button } from "@/components/ui/button";

export type ClarificationOptionsProps = {
  options: string[];
  onOptionClick: (option: string) => void;
};

export function ClarificationOptions({ options, onOptionClick }: ClarificationOptionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option}
          variant="outline"
          size="sm"
          onClick={() => onOptionClick(option)}
          className="text-xs"
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
