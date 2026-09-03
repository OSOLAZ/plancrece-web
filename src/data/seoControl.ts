// ---------------------------------------------------------------------------
// Fuente única de verdad para el control de indexación SEO.
// SEO-2 creó la estructura. SEO-3 la consume en meta robots vía useSeo.
// Sitemap (SEO-4) usará estas mismas listas: solo entran URLs index,follow.
// ---------------------------------------------------------------------------

// Artículos manuales aprobados para indexación (primera tanda, revisión
// editorial del propietario 2026-09-03). El resto de artículos manuales
// y todos los seed reciben noindex hasta nueva revisión.
export const ARTICULOS_INDEXABLES: readonly string[] = [
  'como-valoramos-una-idea-de-negocio-antes-de-darla-por-viable',
  'cinco-senales-de-que-tu-idea-necesita-un-ajuste-antes-de-pedir-financiacion',
  'servicios-a-personas-mayores-el-nicho-que-nadie-quiere-mirar',
  'por-que-rechazamos-ideas-y-por-que-es-lo-mejor-que-nos-puede-pasar',
]

// Ningún hilo del Foro Archivo se indexa.
export const HILOS_INDEXABLES: readonly string[] = []

export const esArticuloIndexable = (slug: string): boolean =>
  ARTICULOS_INDEXABLES.includes(slug)

export const esHiloIndexable = (slug: string): boolean =>
  HILOS_INDEXABLES.includes(slug)
