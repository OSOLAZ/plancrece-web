"use client";

import { useState } from "react";
import { AssistantLauncher } from "./AssistantLauncher";
import { AssistantPanel } from "./AssistantPanel";
import { pageContexts, PageContext } from "@/data/assistant/pageContexts";
import { useAssistant, AssistantPage, AssistantMode } from "@/hooks/useAssistant";

export type PlanCreceAssistantProps = {
  page: AssistantPage;
  mode?: AssistantMode;
};

export function PlanCreceAssistant({ page, mode = "prototype" }: PlanCreceAssistantProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const {
    state,
    open,
    close,
    sendMessage,
    setResult,
    addAssistantMessage,
    resetConversation,
  } = useAssistant();

  const pageContext: PageContext = pageContexts[page] ?? pageContexts["generic"];

  const handleLauncherClick = () => {
    open();
    setPanelOpen(true);
  };

  const handlePanelOpenChange = (newOpen: boolean) => {
    setPanelOpen(newOpen);
    if (!newOpen) close();
  };

  // mode prop reserved for future live/prototype toggle
  void mode;

  return (
    <>
      <AssistantLauncher pageContext={pageContext} onClick={handleLauncherClick} />
      <AssistantPanel
        pageContext={pageContext}
        open={panelOpen}
        onOpenChange={handlePanelOpenChange}
        state={state}
        sendMessage={sendMessage}
        setResult={setResult}
        addAssistantMessage={addAssistantMessage}
        resetConversation={resetConversation}
      />
    </>
  );
}

/**
 * Usage example — add to any page before the closing root fragment:
 *
 * import { PlanCreceAssistant } from '@/components/assistant/PlanCreceAssistant'
 *
 * // In JSX:
 * <PlanCreceAssistant page="home" mode="prototype" />
 *
 * Valid page values: "home" | "pricing" | "docs" | "generic"
 */
