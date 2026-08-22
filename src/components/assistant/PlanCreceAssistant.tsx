"use client";

import { useState } from "react";
import { AssistantLauncher } from "./AssistantLauncher";
import { AssistantPanel } from "./AssistantPanel";
import type { PageContext } from "@/data/assistant/pageContexts";
import type { AssistantPage, AssistantMode } from "@/hooks/useAssistant";
import { pageContexts } from "@/data/assistant/pageContexts";
import { useAssistant } from "@/hooks/useAssistant";

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

  const pageContext: PageContext = pageContexts[page] || pageContexts.generic;

  const handleLauncherClick = () => {
    open();
    setPanelOpen(true);
  };

  const handlePanelOpenChange = (newOpen: boolean) => {
    setPanelOpen(newOpen);
    if (!newOpen) {
      close();
    }
  };

  return (
    <>
      <AssistantLauncher
        pageContext={pageContext}
        onClick={handleLauncherClick}
      />
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
