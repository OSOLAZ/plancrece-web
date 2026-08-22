export type MockResponse = {
  query: string;
  type: "direct" | "clarification" | "conversational" | "search" | "fallback";
  response?: string;
  card?: {
    title: string;
    description: string;
    cta: string;
    source: string;
  };
  related?: string[];
  options?: string[];
  cards?: Array<{
    title: string;
    description: string;
    cta: string;
    source: string;
  }>;
  afterSelection?: {
    response: string;
    card: {
      title: string;
      description: string;
      cta: string;
      source: string;
    };
  };
};

export const mockResponses: MockResponse[] = [
  {
    query: "\u00bfQu\u00e9 necesito para solicitarlo?",
    type: "direct",
    response: "Para solicitarlo necesitas cumplir una serie de requisitos y preparar cierta documentaci\u00f3n. Aqu\u00ed puedes verlos todos.",
    card: {
      title: "Requisitos para solicitarlo",
      description: "Consulta los requisitos y la documentaci\u00f3n necesaria para realizar la solicitud.",
      cta: "Ver requisitos",
      source: "Requisitos",
    },
    related: ["Documentaci\u00f3n", "C\u00f3mo funciona"],
  },
  {
    query: "\u00bfPuedo acceder?",
    type: "clarification",
    response: "\u00bfA qu\u00e9 quieres acceder exactamente?",
    options: [
      "Acceder a un plan",
      "Acceder a una ayuda",
      "Acceder a un servicio",
      "Otra consulta",
    ],
  },
  {
    query: "\u00bfQu\u00e9 documentos hacen falta?",
    type: "direct",
    response: "Estos son los documentos que necesitas para la solicitud.",
    card: {
      title: "Documentaci\u00f3n necesaria",
      description: "Consulta la lista completa de documentos necesarios.",
      cta: "Ver documentaci\u00f3n",
      source: "Documentaci\u00f3n",
    },
    related: ["Requisitos", "C\u00f3mo se presenta"],
  },
  {
    query: "\u00bfCu\u00e1nto cuesta?",
    type: "direct",
    response: "Aqu\u00ed puedes ver las opciones y precios disponibles.",
    card: {
      title: "Opciones y precios",
      description: "Consulta las distintas opciones y sus precios.",
      cta: "Ver precios",
      source: "Precios",
    },
    related: ["C\u00f3mo funciona", "Ayudas relacionadas"],
  },
  {
    query: "\u00bfC\u00f3mo funciona?",
    type: "direct",
    response: "Te explico el proceso paso a paso.",
    card: {
      title: "C\u00f3mo funciona",
      description: "El proceso completo, desde la solicitud hasta la resoluci\u00f3n.",
      cta: "Ver c\u00f3mo funciona",
      source: "C\u00f3mo funciona",
    },
    related: ["Requisitos", "Plazos"],
  },
  {
    query: "\u00bfD\u00f3nde tengo que hacerlo?",
    type: "clarification",
    response: "\u00bfQu\u00e9 necesitas saber exactamente?",
    options: [
      "Presentar la solicitud",
      "Obtener informaci\u00f3n",
      "Otra consulta",
    ],
  },
  {
    query: "No s\u00e9 qu\u00e9 opci\u00f3n me corresponde",
    type: "conversational",
    response: "Te ayudo a orientarte. \u00bfQu\u00e9 necesitas hacer?",
    options: [
      "Consultar informaci\u00f3n",
      "Realizar una solicitud",
      "Comparar opciones",
      "No estoy seguro",
    ],
    afterSelection: {
      response: "Estas son las opciones disponibles para ti.",
      card: {
        title: "Comparar opciones",
        description: "Compara las distintas opciones disponibles.",
        cta: "Ver comparativa",
        source: "Opciones / Precios",
      },
    },
  },
  {
    query: "No encuentro el documento que necesito",
    type: "clarification",
    response: "\u00bfQu\u00e9 tipo de documento buscas?",
    options: [
      "Certificados",
      "Justificantes",
      "Modelos oficiales",
      "Otro documento",
    ],
  },
  {
    query: "\u00bfQu\u00e9 plazo hay para entregar los documentos?",
    type: "search",
    response: "Estos son los plazos generales para la documentaci\u00f3n.",
    card: {
      title: "Plazos de entrega",
      description: "Consulta los plazos para entregar la documentaci\u00f3n.",
      cta: "Ver plazos",
      source: "Documentaci\u00f3n / Requisitos",
    },
  },
  {
    query: "\u00bfHay alguna ayuda o subvenci\u00f3n relacionada?",
    type: "search",
    response: "Estas son las ayudas y subvenciones relacionadas.",
    cards: [
      {
        title: "Ayudas relacionadas",
        description: "Consulta las ayudas disponibles.",
        cta: "Ver ayudas",
        source: "Ayudas",
      },
      {
        title: "Subvenciones",
        description: "Explora las subvenciones disponibles.",
        cta: "Ver subvenciones",
        source: "Subvenciones",
      },
    ],
  },
];

const STOP_WORDS = new Set([
  "el", "la", "los", "las", "un", "una", "unos", "unas",
  "de", "del", "para", "por", "con", "sin", "sobre", "entre",
  "que", "que", "cual", "cual", "cuales", "cuales",
  "donde", "donde", "como", "como", "cuando", "cuando",
  "quien", "quien", "quienes", "quienes",
  "hay", "tengo", "tiene", "necesito", "quiero", "puedo",
  "debo", "deberia", "hacer", "hago", "haces", "hace",
  "ser", "soy", "eres", "es", "somos", "son",
  "estar", "estoy", "estas", "esta", "estamos", "estan",
  "mi", "mis", "tu", "tus", "su", "sus",
  "me", "te", "se", "nos", "os", "les",
  "lo", "le", "y", "o", "ni", "no", "si", "si",
  "a", "al", "en", "desde", "hasta", "segun", "ante",
  "bajo", "contra", "tras", "mediante", "durante",
  "este", "esta", "estos", "estas", "ese", "esa",
  "esos", "esas", "aquel", "aquella", "aquellos", "aquellas",
  "mismo", "misma", "otro", "otra", "otros", "otras",
  "todo", "toda", "todos", "todas", "algo", "nada",
  "alguien", "nadie", "cualquier", "bastante",
  "mucho", "mucha", "muchos", "muchas",
  "poco", "poca", "pocos", "pocas",
  "mas", "menos", "muy", "tan", "tanto", "tanta",
  "cada", "cuyo", "cuya", "cuyos", "cuyas",
]);

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ");
}

function extractKeywords(text: string): string[] {
  return normalizeText(text)
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

export function findMockResponse(query: string): MockResponse | undefined {
  const normalizedQuery = normalizeText(query.trim());
  const queryKeywords = extractKeywords(normalizedQuery);

  // Exact match first (normalized)
  const exactMatch = mockResponses.find(
    (r) => normalizeText(r.query) === normalizedQuery
  );
  if (exactMatch) return exactMatch;

  if (queryKeywords.length === 0) return undefined;

  let bestMatch: MockResponse | undefined = undefined;
  let bestScore = 0;

  for (const response of mockResponses) {
    const responseKeywords = extractKeywords(normalizeText(response.query));
    // Also index all words in response text for broader matching
    const responseAllWords = new Set([
      ...responseKeywords,
      ...extractKeywords(normalizeText(response.response || "")),
      ...extractKeywords(normalizeText(response.card?.title || "")),
      ...extractKeywords(normalizeText(response.card?.source || "")),
    ]);

    let score = 0;
    for (const keyword of queryKeywords) {
      if (responseAllWords.has(keyword)) score++;
    }

    // Threshold: 1 keyword sufficient for short queries, 2 for longer
    const threshold = queryKeywords.length <= 2 ? 1 : 2;
    if (score >= threshold && score > bestScore) {
      bestMatch = response;
      bestScore = score;
    }
  }

  return bestMatch;
}
