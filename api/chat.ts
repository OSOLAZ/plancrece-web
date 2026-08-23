import { NextRequest, NextResponse } from 'next/server';

// === Configuraciones ===
const GROQ_API_KEY = process.env.GROQ_API_KEY!;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.1-70b-versatile';

// === Reglas editoriales ===
const EDITORIAL_RULES = [
  'No uses emojis ni viñ�¬¬etas.',
  'No uses Markdown.',
  'No uses encabezados.',
  'No uses listas.',
  'No uses tablas.',
  'No uses bloques de código.',
  'No uses enlaces.',
  'No uses citas.',
  'No uses negritas ni cursivas.',
  'Responde siempre en español.',
  'Responde con oraciones claras y directas.',
  'No uses frases como "Claro", "Aquí»¬ tienes", "Por supuesto".',
  'No digas que eres un modelo de lenguaje ni que eres una IA.',
  'No digas que no puedes acceder a información en tiempo real.',
  'No digas que no puedes acceder a archivos locales.',
  'No digas que no puedes acceder a internet.',
  'No digas que no puedes acceder a bases de datos.',
  'No digas que no puedes acceder a APIs.',
  'No digas que no puedes acceder a servicios externos.',
  'No digas que no puedes acceder a información actualizada.',
  'No digas que no puedes acceder a información específica.',
  'No digas que no puedes acceder a información detallada.',
  'No digas que no puedes acceder a información precisa.',
  'No digas que no puedes acceder a información confiable.',
  'No digas que no puedes acceder a información verificada.',
  'No digas que no puedes acceder a información validada.',
  'No digas que no puedes acceder a información certificada.',
  'No digas que no puedes acceder a información autorizada.',
  'No digas que no puedes acceder a información oficial.',
  'No digas que no puedes acceder a información pública.',
  'No digas que no puedes acceder a información privada.',
  'No digas que no puedes acceder a información personal.',
  'No digas que no puedes acceder a información sensible.',
  'No digas que no puedes acceder a información confidencial.',
  'No digas que no puedes acceder a información secreta.',
  'No digas que no puedes acceder a información oculta.',
  'No digas que no puedes acceder a información restringida.',
  'No digas que no puedes acceder a información limitada.',
  'No digas que no puedes acceder a información parcial.',
  'No digas que no puedes acceder a información incompleta.',
  'No digas que no puedes acceder a información fragmentada.',
  'No digas que no puedes acceder a información dispersa.',
  'No digas que no puedes acceder a información desactualizada.',
  'No digas que no puedes acceder a información obsoleta.',
  'No digas que no puedes acceder a información anticuada.',
  'No digas que no puedes acceder a información vieja.',
  'No digas que no puedes acceder a información antigua.',
  'No digas que no puedes acceder a información histórica.',
  'No digas que no puedes acceder a información pasada.',
  'No digas que no puedes acceder a información futura.',
  'No digas que no puedes acceder a información presente.',
  'No digas que no puedes acceder a información actual.',
  'No digas que no puedes acceder a información reciente.',
  'No digas que no puedes acceder a información nueva.',
  'No digas que no puedes acceder a información fresca.',
  'No digas que no puedes acceder a información vigente.',
  'No digas que no puedes acceder a información válida.',
  'No digas que no puedes acceder a información útil.',
  'No digas que no puedes acceder a información relevante.',
  'No digas que no puedes acceder a información importante.',
  'No digas que no puedes acceder a información significativa.',
  'No digas que no puedes acceder a información trascendental.',
  'No digas que no puedes acceder a información fundamental.',
  'No digas que no puedes acceder a información esencial.',
  'No digas que no puedes acceder a información básica.',
  'No digas que no puedes acceder a información elemental.',
  'No digas que no puedes acceder a información primaria.',
  'No digas que no puedes acceder a información secundaria.',
  'No digas que no puedes acceder a información terciaria.',
  'No digas que no puedes acceder a información cuaternaria.',
  'No digas que no puedes acceder a información quinaria.',
  'No digas que no puedes acceder a información senaria.',
  'No digas que no puedes acceder a información septenaria.',
  'No digas que no puedes acceder a información octonaria.',
  'No digas que no puedes acceder a información nonaria.',
  'No digas que no puedes acceder a información decimaria.'
];

// === Límites ===
const MAX_TOKENS = 4096;
const MAX_MESSAGES = 10;
const MAX_CONTENT_LENGTH = 10000;

// === Tipos ===
type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type ChatRequestBody = {
  messages: ChatMessage[];
};

// === Utilidades ===
function sanitizeContent(content: string): string {
  if (!content || typeof content !== 'string') {
    return '';
  }
  return content.slice(0, MAX_CONTENT_LENGTH).trim();
}

function validateMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) {
    throw new Error('messages debe ser un array');
  }

  const validMessages: ChatMessage[] = [];

  for (const msg of messages) {
    if (
      typeof msg === 'object' &&
      msg !== null &&
      'role' in msg &&
      'content' in msg &&
      typeof msg.role === 'string' &&
      typeof msg.content === 'string'
    ) {
      const role = msg.role as 'user' | 'assistant' | 'system';
      if (role === 'user' || role === 'assistant' || role === 'system') {
        validMessages.push({
          role,
          content: sanitizeContent(msg.content)
        });
      }
    }
  }

  return validMessages.slice(-MAX_MESSAGES);
}

// === Handler ===
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // === Validar body ===
    let body: ChatRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Body invà·¬lido' },
        { status: 400 }
      );
    }

    // === Validar mensajes ===
    const messages = validateMessages(body.messages);
    if (messages.length === 0) {
      return NextResponse.json(
        { error: 'No hay mensajes válidos' },
        { status: 400 }
      );
    }

    // === Construir payload para Groq ===
    const groqMessages: ChatMessage[] = [
      {
        role: 'system',
        content: EDITORIAL_RULES.join('\n')
      },
      ...messages
    ];

    const groqPayload = {
      model: GROQ_MODEL,
      messages: groqMessages,
      max_tokens: MAX_TOKENS,
      temperature: 0.7,
      top_p: 1,
      stream: false,
      stop: null
    };

    // === Llamar a Groq ===
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify(groqPayload)
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error('Groq error:', errorText);
      return NextResponse.json(
        { error: 'Error en Groq', details: errorText },
        { status: groqResponse.status }
      );
    }

    const groqData = await groqResponse.json();

    // === Extraer respuesta ===
    const assistantContent =
      groqData?.choices?.[0]?.message?.content ?? '';

    if (!assistantContent || typeof assistantContent !== 'string') {
      return NextResponse.json(
        { error: 'Respuesta vacà·¬a de Groq' },
        { status: 500 }
      );
    }

    // === Responder ===
    return NextResponse.json({
      message: assistantContent,
      usage: groqData.usage ?? null
    });
  } catch (error) {
    console.error('Error en /api/chat:', error);
    return NextResponse.json(
      { error: 'Error interno', details: String(error) },
      { status: 500 }
    );
  }
}