// api/chat.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { ChatCompletionMessageParam } from 'groq-sdk';
import Groq from 'groq-sdk';
import { readFileSync } from 'fs';
import { join } from 'path';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = 'llama3-70b-8192';

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_LENGTH = 6;
const MAX_TOTAL_LENGTH = 20000;

let _knowledgeBase: Record<string, unknown> | null = null;

function loadKnowledgeBase() {
  if (_knowledgeBase) return _knowledgeBase;
  const kbPath = join(process.cwd(), 'src', 'data', 'knowledge-base.json');
  const raw = readFileSync(kbPath, 'utf-8');
  _knowledgeBase = JSON.parse(raw);
  return _knowledgeBase;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // === Método ===
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'M étodo no permitido' });
    return;
  }

  // === API Key ===
  if (!GROQ_API_KEY) {
    res.status(503).json({ error: 'GROQ_UNAVAILABLE' });
    return;
  }

  // === Cargar knowledge base ===
  let knowledgeBase: Record<string, unknown>;

  try {
    knowledgeBase = loadKnowledgeBase();
  } catch {
    res.status(502).json({ error: 'KB_UNAVAILABLE' });
    return;
  }

  // === Validar editorialRules y fallback ===
  const { editorialRules } = knowledgeBase as {
    editorialRules?: unknown;
  };

  if (
    !editorialRules ||
    typeof editorialRules !== 'object' ||
    !('rules' in editorialRules) ||
    !Array.isArray(editorialRules.rules) ||
    !editorialRules.rules.every((r) => typeof r === 'string')
  ) {
    res.status(502).json({ error: 'KB_INVALID' });
    return;
  }

  const editorialRulesObj = editorialRules as {
    rules: string[];
    fallback?: unknown;
  };

  if (typeof editorialRulesObj.fallback !== 'string' || !editorialRulesObj.fallback.trim()) {
    res.status(502).json({ error: 'KB_INVALID' });
    return;
  }

  const fallback = editorialRulesObj.fallback;

  // === Validar body ===
  const body = req.body;
  if (!body || typeof body !== 'object') {
    res.status(400).json({ error: 'Entrada inv álida' });
    return;
  }

  const { message, history = [] } = body as {
    message?: unknown;
    history?: unknown;
  };

  // === Validar message ===
  if (typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'Entrada inv álida' });
    return;
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    res.status(400).json({ error: 'Entrada inv álida' });
    return;
  }

  // === Validar history ===
  if (!Array.isArray(history)) {
    res.status(400).json({ error: 'Entrada inv álida' });
    return;
  }

  if (history.length > MAX_HISTORY_LENGTH) {
    res.status(400).json({ error: 'Entrada inv álida' });
    return;
  }

  const validHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [];

  for (const entry of history) {
    if (
      typeof entry !== 'object' ||
      entry === null ||
      !('role' in entry) ||
      !('content' in entry) ||
      typeof entry.role !== 'string' ||
      typeof entry.content !== 'string'
    ) {
      res.status(400).json({ error: 'Entrada inv álida' });
      return;
    }

    const role = entry.role as string;
    if (role !== 'user' && role !== 'assistant') {
      res.status(400).json({ error: 'Entrada inv álida' });
      return;
    }

    if (!entry.content.trim()) {
      res.status(400).json({ error: 'Entrada inv álida' });
      return;
    }

    if (entry.content.length > MAX_MESSAGE_LENGTH) {
      res.status(400).json({ error: 'Entrada inv álida' });
      return;
    }

    validHistory.push({ role: role as 'user' | 'assistant', content: entry.content });
  }

  // === Reservar espacio para reglas y mensaje ===
  const systemPrompt = editorialRules.rules.join('\n');
  let usedLength = systemPrompt.length + message.length;

  // === Construir contexto de conocimiento (prioridad sobre historial) ===
  let knowledgeContext = '';
  const excludedKeys = new Set(['editorialRules']);
  const knowledgePrefix = 'Conocimiento:\n';

  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (excludedKeys.has(key)) continue;

    const entryObj = { [key]: value };
    const entryJson = JSON.stringify(entryObj, null, 2) + '\n\n';

    // Probar si esta entrada cabe (con el prefijo si es la primera)
    const prefixLength = knowledgeContext ? 0 : knowledgePrefix.length;
    if (usedLength + prefixLength + knowledgeContext.length + entryJson.length > MAX_TOTAL_LENGTH) {
      continue; // Probar la siguiente entrada
    }

    if (!knowledgeContext) {
      knowledgeContext = knowledgePrefix;
    }
    knowledgeContext += entryJson;
  }

  usedLength += knowledgeContext.length;

  // === Incorporar historial (m ás recientes primero, luego restaurar orden) ===
  const context: Array<{ role: 'user' | 'assistant'; content: string }> = [];

  for (let i = validHistory.length - 1; i >= 0 && context.length < MAX_HISTORY_LENGTH; i--) {
    const entry = validHistory[i];
    if (usedLength + entry.content.length > MAX_TOTAL_LENGTH) {
      break;
    }
    context.push(entry);
    usedLength += entry.content.length;
  }

  context.reverse();

  // === Construir prompt ===
  const groqMessages: ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
  ];

  if (knowledgeContext.trim()) {
    groqMessages.push({ role: 'system', content: knowledgeContext });
  }

  groqMessages.push(...context, { role: 'user', content: message });

  // === Groq ===
  let reply: string;

  try {
    const groq = new Groq({ apiKey: GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: groqMessages,
      temperature: 0.2,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    reply = completion.choices[0]?.message?.content ?? fallback;

    if (!reply || !reply.trim()) {
      reply = fallback;
    }

    res.status(200).json({ reply });
  } catch (err: unknown) {
    const errorObj = err as { message?: string; status?: number; response?: { data?: unknown } };
    const errorDetails = errorObj.message || 'Error desconocido';
    const errorStatus = errorObj.status;
    const errorResponse = errorObj.response?.data;

    console.log('Groq error:', {
      message: errorDetails,
      status: errorStatus,
      response: errorResponse,
      apiKey: GROQ_API_KEY ? `${GROQ_API_KEY.slice(0, 4)}...` : 'missing',
    });

    res.status(502).json({ error: 'GROQ_FAILED', details: errorDetails });
  }
}
