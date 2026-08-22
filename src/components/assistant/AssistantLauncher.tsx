"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Search } from "lucide-react";
import type { PageContext } from "@/data/assistant/pageContexts";

export type AssistantLauncherProps = {
  pageContext: PageContext;
  onClick: () => void;
};

export function AssistantLauncher({ pageContext, onClick }: AssistantLauncherProps) {
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
