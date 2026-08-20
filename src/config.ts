export const EMAIL_CONTACTO = 'clientes@plancrece.com'

/**
 * Envía los datos de un formulario al endpoint /api/leads.
 * Misma firma que la versión anterior: los formularios no necesitan cambios.
 * Lanza error si el envío falla para que el formulario pueda avisar al usuario.
 *
 * El parámetro opcional `hp` es el honeypot anti-bots: un campo invisible que
 * los humanos dejan vacío y los bots rellenan. Solo se añade al payload si
 * llega con valor; el servidor lo valida (debe llegar vacío) y rechaza si no.
 */
export async function enviarFormulario(asunto: string, datos: Record<string, string>, hp = '') {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hp ? { asunto, datos, _hp: hp } : { asunto, datos }),
  })
  if (!res.ok) throw new Error('Error al enviar')
}
