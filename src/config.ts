// Datos de contacto centrales de PlanCrece.
// Los formularios se envían a nuestro endpoint propio /api/leads
// (Vercel Serverless Function), que valida con zod en servidor y
// reenvía el lead por email vía Resend. La API key nunca sale del servidor.

export const EMAIL_CONTACTO = 'clientes@plancrece.com'

/**
 * Envía los datos de un formulario al endpoint /api/leads.
 * Misma firma que la versión anterior: los formularios no necesitan cambios.
 * Lanza error si el envío falla para que el formulario pueda avisar al usuario.
 */
export async function enviarFormulario(asunto: string, datos: Record<string, string>) {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ asunto, datos }),
  })
  if (!res.ok) throw new Error('Error al enviar')
}
