# PlanCrece Web

Web comercial de PlanCrece: comparador de franquicias, simulador de financiación,
blog y captación de leads.

Stack: Vite 7 + React 19 + TypeScript, Tailwind CSS, shadcn/ui (Radix),
react-router 7, react-hook-form + zod. Despliegue en Vercel.

## Desarrollo

```bash
npm install
npm run dev      # desarrollo local (puerto 3000)
npm run build    # tsc -b && vite build
npm run lint     # ESLint
```

## Endpoint de leads

Los formularios (LeadForm, FranquiciaForm) envían a `POST /api/leads`, una
Vercel Serverless Function (`api/leads.ts`) que:

1. Valida el payload en servidor con zod
2. Aplica controles anti-spam (origen permitido, rate limit best-effort, honeypot opcional)
3. Reenvía el lead por email con Resend

## Variables de entorno

Configurar en Vercel → Settings → Environment Variables (Production + Preview).
Ver `.env.example` para el formato. Los valores reales nunca se suben al repo.

| Variable | Descripción |
|---|---|
| `RESEND_API_KEY` | API key de resend.com (obligatoria) |
| `LEADS_TO_EMAIL` | Email que recibe los leads (obligatoria) |
| `LEADS_FROM_EMAIL` | Remitente verificado en Resend; si falta, se usa `onboarding@resend.dev` |

## Ramas y despliegue

- `main` → producción en Vercel
- Ramas `feat/*` → deploys de preview automáticos para validar antes del merge
