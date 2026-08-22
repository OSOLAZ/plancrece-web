import { useState, useCallback } from "react";
import type { MockResponse } from "@/data/assistant/mockResponses";

export type AssistantPage = "home" | "pricing" | "docs" | "generic";
export type AssistantMode = "prototype" | "live";

export type MessageType = "user" | "assistant";

export type Message = {
  id: string;
  type: MessageType;
  content: string;
  timestamp: number;
};

export type AssistantState =
  | { status: "closed" }
  | { status: "open"; messages: Message[] }
  | { status: "searching"; messages: Message[] }
  | {
      status: "result";
      messages: Message[];
      mockResponse: MockResponse | null;
    };

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useAssistant() {
  const [state, setState] = useState<AssistantState>({ status: "closed" });

  const open = useCallback(() => {
    setState((prev) => {
      if (prev.status === "closed") {
        return {
          status: "open",
          messages: [],
        };
      }
      return prev;
    });
  }, []);

  const close = useCallback(() => {
    setState({ status: "closed" });
  }, []);

  const sendMessage = useCallback((content: string) => {
    setState((prev) => {
      if (prev.status === "closed") return prev;

      const userMessage: Message = {
        id: generateId(),
        type: "user",
        content,
        timestamp: Date.now(),
      };

      const newMessages = [...prev.messages, userMessage];

      return {
        status: "searching",
        messages: newMessages,
        mockResponse: null,
      };
    });
  }, []);

  const setResult = useCallback((mockResponse: MockResponse | null) => {
    setState((prev) => {
      if (prev.status === "closed") return prev;
      return {
        status: "result",
        messages: prev.messages,
        mockResponse,
      };
    });
  }, []);

  const addAssistantMessage = useCallback((content: string) => {
    setState((prev) => {
      if (prev.status === "closed") return prev;

      const assistantMessage: Message = {
        id: generateId(),
        type: "assistant",
        content,
        timestamp: Date.now(),
      };

      return {
        ...prev,
        messages: [...prev.messages, assistantMessage],
      };
    });
  }, []);

  const resetConversation = useCallback(() => {
    setState((prev) => {
      if (prev.status === "closed") return prev;
      return { ...prev, status: "open", messages: [], mockResponse: null };
    });
  }, []);

  return {
    state,
    open,
    close,
    sendMessage,
    setResult,
    addAssistantMessage,
    resetConversation,
  };
}
