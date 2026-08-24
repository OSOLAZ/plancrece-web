// src/components/ChatWidget.tsx

import { useState, useRef, useEffect } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type QuickAction = {
  label: string;
  message: string;
  isPrimary?: boolean;
};

const QUICK_ACTIONS: QuickAction[] = [
  { label: ' ¿ Cómo funciona PlanCrece?', message: ' ¿ Cómo funciona PlanCrece?' },
  { label: ' ¿ Qué incluye el plan?', message: ' ¿ Qué incluye el plan?' },
  { label: ' ¿ Cuá¡¿nto cuesta?', message: ' ¿ Cuá¡¿nto cuesta?' },
  { label: '🚀 Quiero validar mi idea', message: 'Quiero validar mi idea', isPrimary: true },
];

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: 'Los proyectos que cambian una vida suelen empezar con una pregunta.\n\nHazme la tuya y empecemos a dar forma a tu Plan para que pueda CRECER.\n\n ¿ Qué quieres saber?',
};

function formatAssistantMessage(content: string): string {
  return content
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/`([^`]+)`/g, '$1')
    .split('\n')
    .filter((line) => !/^\s*\|?[\s:-]+\|[\s|:-]*$/.test(line))
    .map((line) => {
      const withoutHeading = line.replace(/^\s{0,3}#{1,6}\s+/, '');
      const pipeCount = (withoutHeading.match(/\|/g) ?? []).length;

      if (pipeCount >= 2) {
        return withoutHeading
          .split('|')
          .map((cell) => cell.trim())
          .filter(Boolean)
          .join(' · ');
      }

      return withoutHeading;
    })
    .join('\n');
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: Message = { role: 'user', content: messageContent.trim() };
    const history = messages.slice(-6);
    const lastMessage = userMessage.content;

    setMessages((prev) => [...prev, userMessage].slice(-6));
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: lastMessage, history }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply || 'Lo siento, no pude procesar tu pregunta.',
      };

      setMessages((prev) => [...prev, assistantMessage].slice(-6));
    } catch {
      setError('No pude conectar con el asistente. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (action: QuickAction) => {
    if (action.isPrimary) {
      window.location.href = '/';
      return;
    }
    sendMessage(action.message);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Abrir chat con el asistente"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.71 9.71 0 01-2.68-.38L3 21l1.38-5.34A7.95 7.95 0 013 12c0-4.418-4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      className="fixed bottom-6 right-6 z-50 flex w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:max-w-full"
      role="dialog"
      aria-label="Chat con el asistente de PlanCrece"
      aria-modal="true"
    >
      <div className="flex items-center justify-between bg-[#0B2447] px-4 py-3 text-white">
        <h3 className="text-sm font-semibold">Asistente PlanCrece</h3>
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar chat"
          className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0011.414 0L10 8.586l4.293-4.293a1 1 0111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto bg-gray-50 px-4 py-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 shadow'
              }`}
            >
              {(msg.role === 'assistant'
                ? formatAssistantMessage(msg.content)
                : msg.content
              ).split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-1' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="mb-3 flex justify-start">
            <div className="max-w-[80%] rounded-2xl bg-white px-3 py-2 text-sm text-gray-600 shadow">
              Escribiendo...
            </div>
          </div>
        )}

        {error && (
          <div className="mb-3 flex justify-start">
            <div className="max-w-[80%] rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-700 shadow">
              {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="border-t border-gray-200 bg-white px-4 py-2">
          <div className="flex flex-wrap gap-2">
            {QUICK_ACTIONS.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickAction(action)}
                disabled={isLoading}
                aria-label={action.label}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  action.isPrimary
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 bg-white px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            disabled={isLoading}
            aria-label="Escribe tu pregunta"
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Enviar mensaje"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
