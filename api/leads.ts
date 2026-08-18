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

// Llamada única a Resend; lanza error si el envío no se acepta
async function enviarEmail(apiKey: string, payload: Record<string, unknown>) {
  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!resp.ok) {
    const detalle = await resp.text()
    throw new Error(`Resend ${resp.status}: ${detalle}`)
  }
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

  // Email del lead con validación estricta: se usa para reply_to y confirmación
  const candidato = Object.values(datos).find((v) => v.includes('@'))
  const parsedEmail = z.email().safeParse(candidato)
  const emailCliente = parsedEmail.success ? parsedEmail.data : undefined

  // Primer nombre del lead, si hay un campo "nombre", para personalizar
  const entradaNombre = Object.entries(datos).find(([k]) => /nombre/i.test(k))
  const nombre = entradaNombre?.[1]?.trim().split(/\s+/)[0]

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEADS_TO_EMAIL
  if (!apiKey || !to) {
    console.error('Faltan RESEND_API_KEY o LEADS_TO_EMAIL')
    return res.status(500).json({ ok: false, error: 'Error de configuración' })
  }
  const from = process.env.LEADS_FROM_EMAIL || 'PlanCrece Web <onboarding@resend.dev>'

  const filas = Object.entries(datos)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 8px;font-weight:bold">${escapeHtml(k)}</td>` +
        `<td style="padding:4px 8px">${escapeHtml(v)}</td></tr>`
    )
    .join('')

  // 1) Email del lead al equipo (crítico: si falla, el envío falla)
  try {
    await enviarEmail(apiKey, {
      from,
      to: [to],
      subject: asunto,
      html: `<h2>${escapeHtml(asunto)}</h2><table>${filas}</table>`,
      ...(emailCliente ? { reply_to: emailCliente } : {}),
    })
  } catch (err) {
    console.error('Error enviando lead:', err)
    return res.status(502).json({ ok: false, error: 'No se pudo enviar' })
  }

  // 2) Confirmación automática al lead (best-effort: nunca tumba el envío principal)
  // Email transaccional: describe el proceso del servicio solicitado, sin promoción.
  if (emailCliente) {
    try {
      await enviarEmail(apiKey, {
        from,
        to: [emailCliente],
        reply_to: to,
        subject: 'Hemos recibido tu solicitud — PlanCrece',
        html:
          `<p>Hola${nombre ? ` ${escapeHtml(nombre)}` : ''},</p>` +
          `<p>Confirmamos que hemos recibido tu solicitud correctamente.</p>` +
          `<p><strong>¿Qué va a pasar ahora?</strong></p>` +
          `<p>Nuestro equipo analizará la información que nos has enviado y en un plazo ` +
          `máximo de <strong>3 días laborables</strong> recibirás nuestra valoración:</p>` +
          `<ul>` +
          `<li>Si vemos potencial, te explicaremos por qué y qué opciones tienes para desarrollarlo.</li>` +
          `<li>Si creemos que no es viable, también te lo diremos con honestidad, explicándote ` +
          `los principales motivos y, cuando sea posible, qué alternativas podrías plantearte.</li>` +
          `<li>Y si nos falta información para darte un veredicto claro, te escribiremos ` +
          `pidiéndote algún dato adicional.</li>` +
          `</ul>` +
          `<p>Tu solicitud es gratuita, confidencial y sin compromiso.</p>` +
          `<p>Si necesitas añadir o corregir algo antes de nuestra respuesta, responde ` +
          `directamente a este email.</p>` +
          `<p>— Equipo PlanCrece<br>` +
          `<a href="mailto:clientes@plancrece.com">clientes@plancrece.com</a> · ` +
          `<a href="https://plancrece.com">plancrece.com</a></p>` +
          `<p style="color:#888;font-size:12px">Has recibido este email porque enviaste ` +
          `un formulario en plancrece.com.</p>`,
      })
    } catch (err) {
      console.error('Confirmación al lead no enviada (el lead sí llegó):', err)
    }
  }

  return res.status(200).json({ ok: true })
}
