"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Search } from "lucide-react";

export type AssistantLauncherProps = {
  onClick: () => void;
};

export function AssistantLauncher({ onClick }: AssistantLauncherProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 h-12 rounded-full px-4 gap-2 shadow-lg"
            onClick={onClick}
            aria-label="Abrir asistente PlanCrece"
          >
            <Search className="h-5 w-5" />
            <span>Preguntar</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Encuentra información en PlanCrece</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
