import type { VercelRequest, VercelResponse } from '@vercel/node'
import { z } from 'zod'

// --- Validación en servidor (zod ya es dependencia del proyecto) ---
// Schema genérico: valida el payload { asunto, datos } que envían LeadForm y
// FranquiciaForm a través de enviarFormulario, sin acoplar el endpoint a los
// campos concretos de cada formulario.
const leadSchema = z.object({
  asunto: z.string().trim().min(1).max(120),
  datos: z
    .record(z.string().max(60), z.string().max(2000))
    .refine((d) => Object.keys(d).length >= 1 && Object.keys(d).length <= 40, {
      message: 'Número de campos inválido',
    }),
  // Honeypot opcional: si se añade al formulario en el futuro, debe llegar vacío
  _hp: z.string().max(0).optional(),
})

// --- Anti-spam: solo acepta peticiones desde la web, previews de Vercel y dev local ---
function origenPermitido(req: VercelRequest): boolean {
  const raw = String(req.headers.origin || req.headers.referer || '')
  if (!raw) return false
  try {
    const host = new URL(raw).hostname
    return (
      host === 'plancrece.com' ||
      host.endsWith('.plancrece.com') ||
      host.endsWith('.vercel.app') ||
      host === 'localhost'
    )
  } catch {
    return false
  }
}

// Rate limit best-effort en memoria (se reinicia en cada cold start).
// Primera capa suficiente para el volumen actual; si aparece spam,
// la fase 2 es Upstash + Cloudflare Turnstile.
const hits = new Map<string, { count: number; reset: number }>()
function pasaRateLimit(ip: string): boolean {
  const now = Date.now()
  const e = hits.get(ip)
  if (!e || e.reset < now) {
    hits.set(ip, { count: 1, reset: now + 60_000 })
    return true
  }
  e.count += 1
  return e.count <= 5
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string
  )
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Método no permitido' })
  }
  if (!origenPermitido(req)) {
    return res.status(403).json({ ok: false, error: 'Origen no permitido' })
  }
  const ip = String(req.headers['x-forwarded-for'] || 'desconocida').split(',')[0]
  if (!pasaRateLimit(ip)) {
    return res.status(429).json({ ok: false, error: 'Demasiadas solicitudes' })
  }

  const parsed = leadSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'Datos inválidos' })
  }
  const { asunto, datos } = parsed.data

  // Si el lead dejó su email, lo usamos como reply_to para responderle directo
  const emailCliente = Object.values(datos).find((v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  )

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEADS_TO_EMAIL
  if (!apiKey || !to) {
    console.error('Faltan RESEND_API_KEY o LEADS_TO_EMAIL')
    return res.status(500).json({ ok: false, error: 'Error de configuración' })
  }

  const filas = Object.entries(datos)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 8px;font-weight:bold">${escapeHtml(k)}</td>` +
        `<td style="padding:4px 8px">${escapeHtml(v)}</td></tr>`
    )
    .join('')

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.LEADS_FROM_EMAIL || 'PlanCrece Web <onboarding@resend.dev>',
        to: [to],
        subject: asunto,
        html: `<h2>${escapeHtml(asunto)}</h2><table>${filas}</table>`,
        ...(emailCliente ? { reply_to: emailCliente } : {}),
      }),
    })
    if (!resp.ok) {
      console.error('Resend respondió', resp.status, await resp.text())
      return res.status(502).json({ ok: false, error: 'No se pudo enviar' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Error enviando lead:', err)
    return res.status(500).json({ ok: false, error: 'Error interno' })
  }
}
