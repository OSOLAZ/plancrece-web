"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { MessageBubble } from "./MessageBubble";
import { SuggestionChips } from "./SuggestionChips";
import { ClarificationOptions } from "./ClarificationOptions";
import { ResultCard } from "./ResultCard";
import { FallbackView } from "./FallbackView";
import { AssistantState, Message } from "@/hooks/useAssistant";
import { PageContext } from "@/data/assistant/pageContexts";
import { MockResponse, findMockResponse } from "@/data/assistant/mockResponses";

export type AssistantPanelProps = {
  pageContext: PageContext;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  state: AssistantState;
  sendMessage: (content: string) => void;
  setResult: (mockResponse: MockResponse | null) => void;
  addAssistantMessage: (content: string) => void;
  resetConversation: () => void;
};

export function AssistantPanel({
  pageContext,
  open,
  onOpenChange,
  state,
  sendMessage,
  setResult,
  addAssistantMessage,
  resetConversation,
}: AssistantPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, state]);

  const resolveAndRespond = useCallback(
    (query: string) => {
      setTimeout(() => {
        const response = findMockResponse(query);
        if (response) {
          if (response.response) addAssistantMessage(response.response);
          setResult(response);
        } else {
          addAssistantMessage("No he encontrado informaci\u00f3n oficial sobre eso.");
          setResult(null);
        }
      }, 200);
    },
    [addAssistantMessage, setResult]
  );

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;
    const query = inputValue;
    sendMessage(query);
    setInputValue("");
    setSelectedOption(null);
    resolveAndRespond(query);
  }, [inputValue, sendMessage, resolveAndRespond]);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      sendMessage(suggestion);
      setSelectedOption(null);
      resolveAndRespond(suggestion);
    },
    [sendMessage, resolveAndRespond]
  );

  // Fix: capture currentMockResponse before state transitions to searching
  const handleOptionClick = useCallback(
    (option: string, currentMockResponse: MockResponse | null) => {
      setSelectedOption(option);
      sendMessage(option);
      setTimeout(() => {
        if (currentMockResponse?.afterSelection) {
          addAssistantMessage(currentMockResponse.afterSelection.response);
          setResult(currentMockResponse);
        } else {
          resolveAndRespond(option);
        }
      }, 200);
    },
    [sendMessage, addAssistantMessage, setResult, resolveAndRespond]
  );

  const handleFallbackOptionClick = useCallback(
    (option: string) => {
      sendMessage(option);
      resolveAndRespond(option);
    },
    [sendMessage, resolveAndRespond]
  );

  const handleClose = useCallback(() => {
    onOpenChange(false);
    resetConversation();
    setSelectedOption(null);
  }, [onOpenChange, resetConversation]);

  const renderContent = () => {
    if (state.status === "closed") return null;
    const messages = state.messages;
    const currentMockResponse =
      state.status === "result" ? state.mockResponse : null;

    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="border-b px-4 py-3 shrink-0">
          <p className="text-sm font-medium">Asistente PlanCrece</p>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div
            ref={scrollRef}
            className="p-4 space-y-4 overflow-y-auto"
          >
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm">{pageContext.greeting}</p>
                <p className="text-sm text-muted-foreground">
                  Puedes escribir tu pregunta directamente.
                </p>
                <SuggestionChips
                  suggestions={pageContext.suggestions}
                  onSuggestionClick={handleSuggestionClick}
                />
              </div>
            )}

            {messages.map((message: Message) => (
              <MessageBubble key={message.id} type={message.type} content={message.content} />
            ))}

            {state.status === "searching" && (
              <p className="text-sm text-muted-foreground">Buscando en PlanCrece...</p>
            )}

            {state.status === "result" && currentMockResponse && (
              <div className="space-y-3">
                {currentMockResponse.card && (
                  <ResultCard
                    title={currentMockResponse.card.title}
                    description={currentMockResponse.card.description}
                    cta={currentMockResponse.card.cta}
                    source={currentMockResponse.card.source}
                  />
                )}
                {currentMockResponse.cards?.map((card, i) => (
                  <ResultCard
                    key={i}
                    title={card.title}
                    description={card.description}
                    cta={card.cta}
                    source={card.source}
                  />
                ))}
                {currentMockResponse.related && currentMockResponse.related.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {currentMockResponse.related.map((r, i) => (
                      <Button
                        key={i}
                        variant="secondary"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleSuggestionClick(r)}
                      >
                        {r}
                      </Button>
                    ))}
                  </div>
                )}
                {currentMockResponse.options && !selectedOption && (
                  <ClarificationOptions
                    options={currentMockResponse.options}
                    onOptionClick={(opt) => handleOptionClick(opt, currentMockResponse)}
                  />
                )}
                {currentMockResponse.afterSelection && selectedOption && (
                  <ResultCard
                    title={currentMockResponse.afterSelection.card.title}
                    description={currentMockResponse.afterSelection.card.description}
                    cta={currentMockResponse.afterSelection.card.cta}
                    source={currentMockResponse.afterSelection.card.source}
                  />
                )}
                <Button variant="link" className="h-auto p-0 text-sm" onClick={resetConversation}>
                  Hacer otra pregunta
                </Button>
              </div>
            )}

            {state.status === "result" && !currentMockResponse && (
              <FallbackView onOptionClick={handleFallbackOptionClick} />
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-3 shrink-0">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe tu pregunta..."
              aria-label="Escribe tu pregunta"
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!inputValue.trim()}>
              Enviar
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleClose}>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>Asistente PlanCrece</DrawerTitle>
          </DrawerHeader>
          {renderContent()}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="w-[400px] max-w-none h-[80vh] max-h-none p-0 fixed bottom-20 right-6 top-auto translate-x-0 translate-y-0 left-auto"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Asistente PlanCrece</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
