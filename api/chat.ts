// api/chat.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import knowledgeBaseData from '../src/data/knowledge-base.json' with { type: 'json' };

type ChatCompletionMessageParam = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = 'openai/gpt-oss-20b';

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_LENGTH = 6;
const MAX_TOTAL_LENGTH = 20000;

function loadKnowledgeBase(): Record<string, unknown> {
  return knowledgeBaseData as Record<string, unknown>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // === Método ===
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Método no permitido' });
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
    res.status(400).json({ error: 'Entrada inválida' });
    return;
  }

  const { message, history = [] } = body as {
    message?: unknown;
    history?: unknown;
  };

  // === Validar message ===
  if (typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'Entrada inválida' });
    return;
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    res.status(400).json({ error: 'Entrada inválida' });
    return;
  }

  // === Validar history ===
  if (!Array.isArray(history)) {
    res.status(400).json({ error: 'Entrada inválida' });
    return;
  }

  if (history.length > MAX_HISTORY_LENGTH) {
    res.status(400).json({ error: 'Entrada inválida' });
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
      res.status(400).json({ error: 'Entrada inválida' });
      return;
    }

    const role = entry.role as string;
    if (role !== 'user' && role !== 'assistant') {
      res.status(400).json({ error: 'Entrada inválida' });
      return;
    }

    if (!entry.content.trim()) {
      res.status(400).json({ error: 'Entrada inválida' });
      return;
    }

    if (role === 'user' && entry.content.length > MAX_MESSAGE_LENGTH) {
      res.status(400).json({ error: 'Entrada inválida' });
      return;
    }

    // Las respuestas del asistente pueden superar MAX_MESSAGE_LENGTH;
    // solo las entradas del historial con rol assistant se truncan.
    const content =
      role === 'assistant' && entry.content.length > MAX_MESSAGE_LENGTH
        ? entry.content.slice(0, MAX_MESSAGE_LENGTH)
        : entry.content;

    validHistory.push({ role: role as 'user' | 'assistant', content });
  }

  // === Reservar espacio para reglas y mensaje ===
  const editorialPrompt = editorialRules.rules.join('\n');
  let usedLength = editorialPrompt.length + message.length + 120;

  // === Construir formatTonePrompt ===
  const formatTonePrompt = [
    'FORMATO',
    '- Responde en español y en texto plano.',
    '- No uses Markdown: no #, ##, **, tablas con | ni bloques de código.',
    '- Usa párrafos breves.',
    '- Usa listas simples con guiones solo cuando ayuden.',
    '- Para comparar planes, usa etiquetas claras y listas; no tablas.',
    '',
    'TONO',
    '- Tono cercano, profesional, claro y tranquilo.',
    '- Sé útil y responde primero a las preguntas objetivas.',
    '- No seas insistente y no uses presión comercial ni urgencia artificial.',
    '- No inventes datos, plazos, experiencia, número de clientes, ayudas, financiación, condiciones o garantías.',
    '- No prometas resultados.',
    '- No valides automáticamente ideas de negocio.',
    '',
    'CUÁNDO RESPONDER Y CUÁNDO DERIVAR AL FORMULARIO',
    '- Para preguntas informativas sobre precios, planes, contenidos, proceso o plazos: responde de forma completa usando únicamente el knowledge base. Solo si encaja, termina con una invitación breve y opcional al formulario de validación gratuita y sin compromiso.',
    '- Para preguntas sobre qué plan conviene a un caso concreto, una idea concreta o una validación: da únicamente orientación general. Explica que la valoración real la realizan los consultores de PlanCrece e invita al formulario de validación gratuita y sin compromiso.',
    '- Para ayudas, subvenciones o financiación: no garantices resultados; explica que se revisan según el caso.',
    '- Nunca evites responder una pregunta objetiva para derivar al formulario.',
    '',
    'SI LA PREGUNTA NO TIENE RESPUESTA ESPECÍFICA EN LA BASE DE CONOCIMIENTO',
    '- Antes de sugerir el formulario, responde siempre a la parte de la pregunta que pueda resolverse con orientación general o con la base de conocimiento.',
    '- No respondas con una negativa seca ni derives directamente al formulario.',
    '- Reconoce primero, en una frase, el objetivo o la preocupación del usuario.',
    '- Da orientación general prudente y comprensible: qué suele influir, qué opciones habituales existen y qué conviene tener en cuenta, sin afirmar nada sobre el caso concreto del usuario.',
    '- Explica qué factores cambian la respuesta personalizada: sector, fase del proyecto, inversión inicial, modelo de negocio y situación personal.',
    '- No prometas financiación, subvenciones, viabilidad, aprobación ni resultados.',
    '- No inventes ni estimes plazos de respuesta, tiempos de atención, prioridades, disponibilidad, resultados, condiciones comerciales o compromisos del equipo.',
    '- Si la base de conocimiento no incluye un dato concreto, dilo con naturalidad y ofrece que el equipo podrá concretarlo mediante el formulario o el correo.',
    '- No uses frases como "te atenderemos con prioridad" ni "normalmente contestamos en X horas" salvo que ese dato figure literalmente en knowledge-base.json.',
    '- Si el usuario ha contado poco de su proyecto, invítale a contarte algo más (idea, sector, fase) antes de sugerir el formulario.',
    '- Después de aportar valor, y solo si encaja de forma natural, termina con una invitación breve y opcional al formulario de validación gratuita, confidencial y sin compromiso, explicando qué recibirá: una valoración inicial de su caso por parte del equipo de PlanCrece.',
    '- Cuando recomiendes el formulario, puedes indicar que la valoración inicial es gratuita, confidencial, sin compromiso y con respuesta en hasta 3 días laborables, porque esos datos constan en knowledge-base.json.',
    '- Ofrece como alternativa escribir a clientes@plancrece.com.',
    '- Presenta el formulario siempre como una opción, nunca como un requisito para recibir ayuda.',
    '- Evita repetir la invitación al formulario de forma mecánica. No la menciones en dos respuestas consecutivas salvo que el usuario pida expresamente cómo recibir una valoración personalizada o cómo contactar con el equipo.',
    '',
    'PRECIOS Y PROMOCIÓN',
    '- Usa exclusivamente los datos de planes, precios y promociones existentes en knowledge-base.json.',
    '- Menciona la promoción del Plan de Empresa Avanzado solo si el usuario pregunta por precios, compara planes o pide orientación para elegir.',
    '- Menciona el Informe de Ayudas y Subvenciones solo si el usuario pregunta específicamente por ayudas, subvenciones o financiación pública.',
    '- Explica únicamente los extras relevantes según la consulta.',
    '- No afirmes que el Plan de Empresa Avanzado sea el mejor plan para todo el mundo.',
  ].join('\n');

  const systemPrompt = `${editorialPrompt}\n\n${formatTonePrompt}`;

  // === Construir contexto de conocimiento (prioridad sobre historial) ===
  let knowledgeContext = '';
  const excludedKeys = new Set(['editorialRules']);
  const knowledgePrefix = 'Conocimiento:\n';

  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (excludedKeys.has(key)) continue;

    const entryObj = { [key]: value };
    const entryJson = JSON.stringify(entryObj, null, 2) + '\n\n';

    const prefixLength = knowledgeContext ? 0 : knowledgePrefix.length;

    if (usedLength + prefixLength + knowledgeContext.length + entryJson.length > MAX_TOTAL_LENGTH) {
      continue;
    }

    if (!knowledgeContext && value !== editorialRules) {
      knowledgeContext = knowledgePrefix;
    }
    knowledgeContext += entryJson;
  }

  usedLength += knowledgeContext.length;

  // === Incorporar historial (más recientes primero, luego restaurar orden) ===
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

  const groqMessages: ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
  ];

  if (knowledgeContext.trim()) {
    groqMessages.push({ role: 'system', content: knowledgeContext });
  }

  groqMessages.push(...context, { role: 'user', content: message });

  let reply: string;

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: groqMessages,
        temperature: 0.2,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null,
      }),
    });

    if (!groqResponse.ok) {
      res.status(502).json({ error: 'GROQ_FAILED' });
      return;
    }

    const completion = (await groqResponse.json()) as {
      choices?: Array<{ message?: { content?: string | null } | null }>;
    };

    reply = completion.choices?.[0]?.message?.content ?? fallback;

    if (!reply || !reply.trim()) {
      reply = fallback;
    }

    res.status(200).json({ reply });
  } catch {
    res.status(502).json({ error: 'GROQ_FAILED' });
  }
}
