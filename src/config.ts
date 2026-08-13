// Datos de contacto centrales de PlanCrece.
// El envío de formularios usa FormSubmit (https://formsubmit.co), servicio gratuito
// que reenvía los envíos al email sin necesidad de backend propio.
// IMPORTANTE: la primera vez que se envíe un formulario, FormSubmit mandará un
// email de activación a esta dirección. Hay que confirmarlo UNA VEZ para que
// los envíos empiecen a llegar.

export const EMAIL_CONTACTO = 'clientes@plancrece.com'

const ENDPOINT = `https://formsubmit.co/ajax/${EMAIL_CONTACTO}`

/**
 * Envía los datos de un formulario a clientes@plancrece.com.
 * Lanza error si el envío falla para que el formulario pueda avisar al usuario.
 */
export async function enviarFormulario(asunto: string, datos: Record<string, string>) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: asunto,
      _template: 'table',
      _captcha: 'false',
      ...datos,
    }),
  })
  if (!res.ok) throw new Error('Error al enviar')
}
