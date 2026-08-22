export type PageContext = {
  page: "home" | "pricing" | "docs" | "generic";
  greeting: string;
  suggestions: string[];
};

export const pageContexts: Record<string, PageContext> = {
  home: {
    page: "home",
    greeting: "\u00bfQu\u00e9 necesitas encontrar?",
    suggestions: [
      "\u00bfC\u00f3mo funciona?",
      "\u00bfQu\u00e9 requisitos necesito?",
      "\u00bfQu\u00e9 documentaci\u00f3n necesito?",
    ],
  },
  pricing: {
    page: "pricing",
    greeting: "\u00bfTe ayudo a comparar las opciones?",
    suggestions: [
      "Ver precios disponibles",
      "Comparar las opciones",
      "\u00bfHay ayudas relacionadas?",
    ],
  },
  docs: {
    page: "docs",
    greeting: "\u00bfBuscas alg\u00fan documento?",
    suggestions: [
      "Documentaci\u00f3n necesaria para solicitar",
      "Plazos de entrega documentos",
      "Modelos oficiales disponibles",
    ],
  },
  generic: {
    page: "generic",
    greeting: "\u00bfQu\u00e9 necesitas encontrar?",
    suggestions: [
      "\u00bfC\u00f3mo funciona?",
      "\u00bfQu\u00e9 requisitos necesito?",
      "\u00bfQu\u00e9 documentaci\u00f3n necesito?",
    ],
  },
};
