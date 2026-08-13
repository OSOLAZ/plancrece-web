// ---------------------------------------------------------------------------
// PUNTO ÚNICO DE PAGO (Stripe Payment Links).
// Cuando actives Stripe y crees los Payment Links de cada plan, sustituye
// aquí las URLs. Mientras estén vacías, los botones llevan al formulario
// de solicitud (flujo actual de validación gratuita).
// ---------------------------------------------------------------------------

export const PAYMENT_LINKS: Record<'estandar' | 'avanzado', string> = {
  estandar: '', // p. ej. https://buy.stripe.com/xxxxx (149 €)
  avanzado: '', // p. ej. https://buy.stripe.com/xxxxx (249 € — oferta 3.000 planes: 149 € hasta 31/12/2026)
}

export const pagoUrl = (plan: keyof typeof PAYMENT_LINKS) =>
  PAYMENT_LINKS[plan] || '/#formulario'
