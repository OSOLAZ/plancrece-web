"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Search } from "lucide-react";
import { PageContext } from "@/data/assistant/pageContexts";

export type AssistantLauncherProps = {
  pageContext: PageContext;
  onClick: () => void;
};

export function AssistantLauncher({ pageContext: _pageContext, onClick }: AssistantLauncherProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 z-50 h-12 rounded-full px-4 gap-2 shadow-lg"
            onClick={onClick}
            aria-label="Abrir asistente PlanCrece"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
            <span>Preguntar</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Encuentra informaci\u00f3n en PlanCrece</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
