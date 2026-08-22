import { Button } from "@/components/ui/button";

export type SuggestionChipsProps = {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
};

export function SuggestionChips({ suggestions, onSuggestionClick }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion}
          variant="secondary"
          size="sm"
          onClick={() => onSuggestionClick(suggestion)}
          className="text-xs"
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}
