"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { MessageBubble } from "./MessageBubble";
import { SuggestionChips } from "./SuggestionChips";
import { ClarificationOptions } from "./ClarificationOptions";
import { ResultCard } from "./ResultCard";
import { FallbackView } from "./FallbackView";
import type { AssistantState, Message } from "@/hooks/useAssistant";
import type { PageContext } from "@/data/assistant/pageContexts";
import type { MockResponse } from "@/data/assistant/mockResponses";
import { findMockResponse } from "@/data/assistant/mockResponses";

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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, state]);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue("");
    setSelectedOption(null);

    setTimeout(() => {
      const response = findMockResponse(inputValue);
      if (response) {
        if (response.response) {
          addAssistantMessage(response.response);
        }
        setResult(response);
      } else {
        addAssistantMessage("No he encontrado información oficial sobre eso.");
        setResult(null);
      }
    }, 200);
  }, [inputValue, sendMessage, addAssistantMessage, setResult]);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      sendMessage(suggestion);
      setSelectedOption(null);

      setTimeout(() => {
        const response = findMockResponse(suggestion);
        if (response) {
          if (response.response) {
            addAssistantMessage(response.response);
          }
          setResult(response);
        } else {
          addAssistantMessage("No he encontrado información oficial sobre eso.");
          setResult(null);
        }
      }, 200);
    },
    [sendMessage, addAssistantMessage, setResult]
  );

  const handleOptionClick = useCallback(
    (option: string) => {
      setSelectedOption(option);
      sendMessage(option);

      setTimeout(() => {
        addAssistantMessage("Estoy buscando información sobre eso.");
        if (state.status === "result" && state.mockResponse?.afterSelection) {
          addAssistantMessage(state.mockResponse.afterSelection.response);
        }
        setResult(state.status === "result" ? state.mockResponse : null);
      }, 200);
    },
    [sendMessage, addAssistantMessage, setResult, state]
  );

  const handleFallbackOptionClick = useCallback(
    (option: string) => {
      sendMessage(`Opciones: ${option}`);
      addAssistantMessage(`Te redirijo a: ${option}`);
    },
    [sendMessage, addAssistantMessage]
  );

  const handleClose = useCallback(() => {
    onOpenChange(false);
    resetConversation();
    setSelectedOption(null);
  }, [onOpenChange, resetConversation]);

  const renderContent = useCallback(() => {
    if (state.status === "closed") return null;

    const messages = state.messages;

    return (
      <div className="flex flex-col h-full">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-base">Asistente PlanCrece</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div ref={scrollRef} className="p-4 space-y-4 overflow-y-auto h-full">
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
              <MessageBubble
                key={message.id}
                type={message.type}
                content={message.content}
              />
            ))}

            {state.status === "searching" && (
              <div className="text-sm text-muted-foreground">
                Buscando en PlanCrece...
              </div>
            )}

            {state.status === "result" && state.mockResponse && (
              <div className="space-y-3">
                {state.mockResponse.card && (
                  <ResultCard
                    title={state.mockResponse.card.title}
                    description={state.mockResponse.card.description}
                    cta={state.mockResponse.card.cta}
                    source={state.mockResponse.card.source}
                  />
                )}

                {state.mockResponse.cards &&
                  state.mockResponse.cards.map((card, index) => (
                    <ResultCard
                      key={index}
                      title={card.title}
                      description={card.description}
                      cta={card.cta}
                      source={card.source}
                    />
                  ))}

                {state.mockResponse.related &&
                  state.mockResponse.related.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {state.mockResponse.related.map((related, index) => (
                        <Button
                          key={index}
                          variant="secondary"
                          size="sm"
                          className="text-xs"
                        >
                          {related}
                        </Button>
                      ))}
                    </div>
                  )}

                {state.mockResponse.options && (
                  <ClarificationOptions
                    options={state.mockResponse.options}
                    onOptionClick={handleOptionClick}
                  />
                )}

                {state.mockResponse.afterSelection && selectedOption && (
                  <div className="space-y-3">
                    <ResultCard
                      title={state.mockResponse.afterSelection.card.title}
                      description={state.mockResponse.afterSelection.card.description}
                      cta={state.mockResponse.afterSelection.card.cta}
                      source={state.mockResponse.afterSelection.card.source}
                    />
                  </div>
                )}

                <Button
                  variant="link"
                  className="h-auto p-0 text-sm"
                  onClick={resetConversation}
                >
                  Hacer otra pregunta
                </Button>
              </div>
            )}

            {state.status === "result" && !state.mockResponse && (
              <FallbackView onOptionClick={handleFallbackOptionClick} />
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-3">
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
  }, [
    state,
    pageContext,
    inputValue,
    selectedOption,
    handleSuggestionClick,
    handleOptionClick,
    handleFallbackOptionClick,
    handleSend,
    resetConversation,
  ]);

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
      <DialogContent className="w-[400px] max-w-none h-[80vh] max-h-none p-0 fixed bottom-20 right-6">
        {renderContent()}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3"
          onClick={handleClose}
          aria-label="Cerrar asistente"
        >
          <X className="h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
