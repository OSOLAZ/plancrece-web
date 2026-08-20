import { useState } from 'react'
import { Link } from 'react-router'
import { Check, Loader2, MapPin, User, Mail, Wallet, FileText, HandCoins } from 'lucide-react'
import { enviarFormulario, EMAIL_CONTACTO } from '../config'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const INVERSIONES = [
  '',
  '0 € (lo financiaría todo)',
  'Menos de 10.000 €',
  '10.000 – 30.000 €',
  '30.000 – 100.000 €',
  'Más de 100.000 €',
]

// Situación de financiación: campo opcional que nos ayuda a ordenar el siguiente paso.
const SITUACIONES = [
  '',
  'Tengo ahorros',
  'Estoy en paro y quiero valorar el pago único',
  'Necesitaría financiación',
  'Busco un socio o inversor',
  'Aún no lo tengo claro',
]

interface Campos {
  nombre: string
  email: string
  ubicacion: string
  inversion: string
  situacion: string
  perfil: string
}

const VACIO: Campos = { nombre: '', email: '', ubicacion: '', inversion: '', situacion: '', perfil: '' }

export default function FranquiciaForm({ franquicia }: { franquicia: string }) {
  const [campos, setCampos] = useState<Campos>(VACIO)
  const [touched, setTouched] = useState<Partial<Record<keyof Campos, boolean>>>({})
  const [privacidad, setPrivacidad] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  // Honeypot anti-bots: los humanos no lo ven (queda vacío); los bots lo rellenan.
  const [hp, setHp] = useState('')

  const validate = (k: keyof Campos, v: string): string => {
    switch (k) {
      case 'nombre':
        return v.trim().length >= 2 ? '' : 'Tu nombre de pila'
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Email no válido'
      case 'ubicacion':
        return v.trim().length >= 2 ? '' : 'Ciudad o provincia'
      case 'inversion':
        return v ? '' : 'Selecciona un rango'
      case 'perfil':
        return v.trim().length >= 30 ? '' : 'Cuéntanos un poco más (mín. 30 caracteres)'
      default:
        return ''
    }
  }

  const errores = (Object.keys(campos) as (keyof Campos)[]).map((k) => validate(k, campos[k]))
  const valido = errores.every((e) => !e) && privacidad

  const set = (k: keyof Campos) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCampos({ ...campos, [k]: e.target.value })
  }
  const blur = (k: keyof Campos) => () => setTouched({ ...touched, [k]: true })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ nombre: true, email: true, ubicacion: true, inversion: true, perfil: true })
    if (!valido) return
    setStatus('sending')
    enviarFormulario(`Interés en franquicia: ${franquicia}`, {
      Franquicia: franquicia,
      Nombre: campos.nombre,
      Email: campos.email,
      Ubicación: campos.ubicacion,
      'Inversión disponible': campos.inversion,
      'Situación de financiación': campos.situacion || '(no indicada)',
      Perfil: campos.perfil,
    }, hp)
      .then(() => setStatus('sent'))
      .catch(() => setStatus('error'))
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
        <svg viewBox="0 0 52 52" className="mx-auto h-16 w-16" aria-hidden="true">
          <circle cx="26" cy="26" r="24" fill="none" stroke="#15803D" strokeWidth="2.5" className="draw-circle" />
          <path d="M14 27l8 8 16-17" fill="none" stroke="#15803D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="draw-check" />
        </svg>
        <h3 className="success-pop mt-4 text-xl font-bold text-[#0B2447]">Solicitud recibida</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/80">
          Analizaremos si tu perfil encaja con <strong>{franquicia}</strong> y te responderemos en
          menos de 3 días laborables. Si encaja, te proponemos el siguiente paso; si no, te diremos
          por qué. También gratis.
        </p>
      </div>
    )
  }

  const campo = (
    k: keyof Campos,
    label: string,
    Icon: typeof User,
    inner: React.ReactNode
  ) => {
    const err = validate(k, campos[k])
    const tocado = touched[k]
    const ok = tocado && !err && campos[k]
    return (
      <div>
        <label htmlFor={`ff-${k}`} className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#0B2447]">
          <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
          {label}
        </label>
        <div className="relative">
          {inner}
          {ok && (
            <Check className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#15803D]" aria-hidden="true" />
          )}
        </div>
        {tocado && err && <p className="mt-1 text-xs text-red-600">{err}</p>}
      </div>
    )
  }

  const base =
    'input-flush w-full rounded-[10px] border bg-white px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary'
  const cls = (k: keyof Campos) =>
    `${base} ${touched[k] && validate(k, campos[k]) ? 'border-red-400' : 'border-border'}`

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
      {/* Honeypot: oculto para humanos (lectores de pantalla incluidos); los bots lo rellenan */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="ff-hp">No rellenes este campo</label>
        <input
          id="ff-hp"
          type="text"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {campo('nombre', 'Tu nombre', User, (
          <input
            id="ff-nombre"
            type="text"
            value={campos.nombre}
            onChange={set('nombre')}
            onBlur={blur('nombre')}
            placeholder="Cómo te llamas"
            className={cls('nombre')}
            autoComplete="given-name"
          />
        ))}
        {campo('email', 'Tu email', Mail, (
          <input
            id="ff-email"
            type="email"
            value={campos.email}
            onChange={set('email')}
            onBlur={blur('email')}
            placeholder="nombre@email.com"
            className={cls('email')}
            autoComplete="email"
          />
        ))}
        {campo('ubicacion', '¿Dónde montarías la franquicia?', MapPin, (
          <input
            id="ff-ubicacion"
            type="text"
            value={campos.ubicacion}
            onChange={set('ubicacion')}
            onBlur={blur('ubicacion')}
            placeholder="Ciudad o provincia"
            className={cls('ubicacion')}
          />
        ))}
        {campo('inversion', 'Inversión disponible', Wallet, (
          <select
            id="ff-inversion"
            value={campos.inversion}
            onChange={set('inversion')}
            onBlur={blur('inversion')}
            className={`${cls('inversion')} ${campos.inversion ? '' : 'text-foreground/50'}`}
          >
            {INVERSIONES.map((op) => (
              <option key={op} value={op} disabled={!op}>
                {op || 'Selecciona un rango'}
              </option>
            ))}
          </select>
        ))}
        {campo('situacion', 'Tu situación de financiación (opcional)', HandCoins, (
          <select
            id="ff-situacion"
            value={campos.situacion}
            onChange={set('situacion')}
            className={`${cls('situacion')} ${campos.situacion ? '' : 'text-foreground/50'}`}
          >
            {SITUACIONES.map((op) => (
              <option key={op} value={op}>
                {op || 'Elige la que más se acerque'}
              </option>
            ))}
          </select>
        ))}
      </div>
      <div className="mt-5">
        {campo('perfil', 'Tu perfil: experiencia y situación', FileText, (
          <textarea
            id="ff-perfil"
            value={campos.perfil}
            onChange={set('perfil')}
            onBlur={blur('perfil')}
            rows={4}
            placeholder="A qué te dedicas, experiencia relevante, si montarías solo o con socio, dedicación prevista…"
            className={`${cls('perfil')} resize-y`}
          />
        ))}
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-foreground/80">
        <input
          type="checkbox"
          checked={privacidad}
          onChange={(e) => setPrivacidad(e.target.checked)}
          className="mt-0.5 h-5 w-5 rounded border-border accent-primary"
        />
        <span>
          He leído y acepto la{' '}
          <Link
            to="/legal/privacidad"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            política de privacidad
          </Link>
          . Mis datos se usan solo para responder a esta solicitud.
        </span>
      </label>

      {status === 'error' && (
        <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          No se ha podido enviar. Inténtalo de nuevo o escríbenos a{' '}
          <a href={`mailto:${EMAIL_CONTACTO}`} className="font-semibold underline">{EMAIL_CONTACTO}</a>.
        </p>
      )}
      
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-press mt-6 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-[#1a45c0] disabled:opacity-70 sm:w-auto"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Analizando tu perfil…
          </>
        ) : (
          'Comprueba tu compatibilidad'
        )}
      </button>
      <p className="mt-3 text-xs text-foreground/60">
        Gratis · Respuesta en menos de 3 días laborables · Sin compromiso
      </p>
    </form>
  )
}
