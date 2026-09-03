// ---------------------------------------------------------------------------
// Metadata SEO por ruta (SEO-3). Valores aprobados en SEO-3A.
// Sin og:image provisional (se añadirá cuando se apruebe el asset og.png).
// ---------------------------------------------------------------------------

import { getArticulo } from './blog'
import { FRANQUICIAS, sectorLabel } from './franquicias'
import { esArticuloIndexable } from './seoControl'

export const SITE_URL = 'https://plancrece.com'

export interface SeoMeta {
  title: string
  description: string
  robots: 'index,follow' | 'noindex,follow'
  canonical: string | null // null en 404: un canonical en error sería contradictorio
  ogType: 'website' | 'article'
}

const INDEX = 'index,follow' as const
const NOINDEX = 'noindex,follow' as const

// Páginas comerciales y editoriales aprobadas como index,follow.
const PAGINAS: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Plan de Empresa y Plan de Negocio | PlanCrece — Desde 149 €',
    description:
      'Consultoría de planes de empresa y negocio para emprendedores. Validación gratuita, precio desde 149 € + IVA y consultores con experiencia desde 2008.',
  },
  '/precios': {
    title: 'Precios Plan de Negocio y Empresa | PlanCrece — 149 €+IVA',
    description:
      'Plan Estándar 149 € + IVA y Plan Avanzado. Precios claros, sin sorpresas y con validación de tu idea incluida. Entrega habitual en 7 días laborables.',
  },
  '/como-funciona': {
    title: 'Cómo Funciona PlanCrece: Proceso de tu Plan de Negocio',
    description:
      'Del primer contacto a la entrega: así elaboramos tu plan de negocio, con consultor directo, NDA y validación previa gratuita.',
  },
  '/garantias': {
    title: 'Garantías de PlanCrece: Satisfacción y Confidencialidad',
    description:
      'Garantía de satisfacción, NDA por escrito y trato directo con el consultor. Conoce los compromisos de PlanCrece antes de encargar tu plan.',
  },
  '/faq': {
    title: 'Preguntas Frecuentes sobre Planes de Negocio | PlanCrece',
    description:
      'Resolvemos las dudas habituales: precio, plazos, confidencialidad, validación gratuita y qué incluye tu plan de empresa.',
  },
  '/contacto': {
    title: 'Contacto | PlanCrece',
    description:
      'Consultas generales, dudas o incidencias: escríbenos. Para validar tu idea de negocio gratis, usa el formulario de validación.',
  },
  '/financiacion': {
    title: 'Financiación para Emprender: Opciones y Plan de Negocio',
    description:
      'Capitalización del paro, bancos, ayudas e inversores: qué suele pedir cada vía y cómo un plan de negocio sólido mejora tu presentación.',
  },
  '/quienes-somos': {
    title: 'Quiénes Somos | PlanCrece',
    description:
      'Consultores con experiencia desde 2008 que colaboran con PlanCrece para elaborar planes de empresa y negocio en toda España.',
  },
  '/capitalizar-paro': {
    title: 'Capitalizar el Paro para Emprender | Plan de Negocio SEPE',
    description:
      'Plan de negocio para capitalizar el paro y emprender. Adaptamos la documentación a tu proyecto y a los requisitos aplicables. Desde 149 € + IVA.',
  },
  '/blog': {
    title: 'Blog de Emprendimiento y Planes de Negocio | PlanCrece',
    description:
      'Análisis y contexto sobre emprender en España: financiación, ayudas, franquicias y planes de negocio, escritos por el equipo editorial de PlanCrece.',
  },
  '/franquicias': {
    title: 'Franquicias en España: Catálogo y Datos Clave | PlanCrece',
    description:
      '35 franquicias con inversión, canon, royalty y rentabilidad orientativa. Datos a consultar con cada central; te ayudamos a valorar tu plan.',
  },
}

// Foro Archivo: contenido ilustrativo con banner de transparencia; no indexa.
const COMUNIDAD = {
  title: 'Comunidad PlanCrece: Foro Archivo',
  description:
    'Conversaciones ilustrativas basadas en situaciones reales planteadas por clientes, presentadas con roles editoriales.',
}

// Páginas legales: cumplimiento, no posicionamiento.
const LEGAL = {
  title: 'Información Legal | PlanCrece',
  description: 'Aviso legal, política de privacidad y política de cookies de PlanCrece.',
}

const NOT_FOUND = {
  title: 'Página no encontrada | PlanCrece',
  description: 'La página que buscas no existe o ha cambiado de dirección.',
}

export function resolveSeo(pathname: string): SeoMeta {
  // Rutas estáticas indexables
  const pagina = PAGINAS[pathname]
  if (pagina) {
    return {
      ...pagina,
      robots: INDEX,
      canonical: `${SITE_URL}${pathname === '/' ? '/' : pathname}`,
      ogType: 'website',
    }
  }

  // Artículos de blog: solo los allowlisted en seoControl indexan.
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.slice('/blog/'.length)
    const articulo = getArticulo(slug)
    if (!articulo) {
      return { ...NOT_FOUND, robots: NOINDEX, canonical: null, ogType: 'website' }
    }
    return {
      title: `${articulo.titulo} | PlanCrece`,
      description: articulo.extracto,
      robots: esArticuloIndexable(slug) ? INDEX : NOINDEX,
      canonical: `${SITE_URL}/blog/${slug}`,
      ogType: 'article',
    }
  }

  // Fichas de franquicia: indexables (catálogo real con descargo de datos).
  if (pathname.startsWith('/franquicias/')) {
    const slug = pathname.slice('/franquicias/'.length)
    const ficha = FRANQUICIAS.find((f) => f.slug === slug)
    if (!ficha) {
      return { ...NOT_FOUND, robots: NOINDEX, canonical: null, ogType: 'website' }
    }
    return {
      title: `${ficha.nombre}: Inversión, Canon y Datos Clave | PlanCrece`,
      description: `Franquicia ${ficha.nombre} (${sectorLabel(ficha.sector)}): inversión, canon, royalty y rentabilidad orientativa. Datos a consultar con la central.`,
      robots: INDEX,
      canonical: `${SITE_URL}/franquicias/${slug}`,
      ogType: 'website',
    }
  }

  // Foro Archivo (portada y hilos): noindex.
  if (pathname === '/comunidad' || pathname.startsWith('/comunidad/')) {
    return {
      ...COMUNIDAD,
      robots: NOINDEX,
      canonical: `${SITE_URL}${pathname}`,
      ogType: 'website',
    }
  }

  // Legales: noindex.
  if (pathname === '/legal' || pathname.startsWith('/legal/')) {
    return {
      ...LEGAL,
      robots: NOINDEX,
      canonical: `${SITE_URL}${pathname}`,
      ogType: 'website',
    }
  }

  // 404 y rutas inexistentes: noindex, sin canonical.
  return { ...NOT_FOUND, robots: NOINDEX, canonical: null, ogType: 'website' }
}
