// ---------------------------------------------------------------------------
// Fuente única de verdad para el control de indexación SEO.
// SEO-2 crea SOLO la estructura. No se consume en meta robots, canonical,
// sitemap ni schema hasta SEO-3/SEO-4.
// ---------------------------------------------------------------------------

// Candidatos a indexación: los 11 artículos escritos a mano.
// PENDIENTE de revisión editorial del propietario. SEO-2 NO activa indexación.
export const ARTICULOS_INDEXABLES: readonly string[] = [
  'como-valoramos-una-idea-de-negocio-antes-de-darla-por-viable',
  'las-ayudas-al-emprendimiento-que-siguen-abiertas-este-ano-y-sus-plazos-reales',
  'capitalizar-el-paro-las-dudas-que-nos-llegan-cada-semana-resueltas',
  'que-esta-pidiendo-la-banca-ahora-a-los-nuevos-negocios',
  'negocios-que-estan-funcionando-en-ciudades-medias-y-por-que',
  'franquicias-que-crecen-en-espana-y-que-hay-detras-de-sus-numeros',
  'el-informe-de-ayudas-que-es-y-por-que-cada-vez-mas-emprendedores-lo-piden-primero',
  'cinco-senales-de-que-tu-idea-necesita-un-ajuste-antes-de-pedir-financiacion',
  'servicios-a-personas-mayores-el-nicho-que-nadie-quiere-mirar',
  'abrir-con-un-socio-los-acuerdos-que-conviene-firmar-el-primer-dia',
  'por-que-rechazamos-ideas-y-por-que-es-lo-mejor-que-nos-puede-pasar',
]

// Ningún hilo del foro se indexa.
export const HILOS_INDEXABLES: readonly string[] = []

export const esArticuloIndexable = (slug: string): boolean =>
  ARTICULOS_INDEXABLES.includes(slug)

export const esHiloIndexable = (slug: string): boolean =>
  HILOS_INDEXABLES.includes(slug)
