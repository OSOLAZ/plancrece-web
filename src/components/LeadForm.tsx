import { useEffect, useState } from 'react'
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react'
import { enviarFormulario, EMAIL_CONTACTO } from '../config'

interface LeadFormProps {
  variant?: 'home' | 'contact'
  id?: string
}

const baseInput =
  'input-flush min-h-[52px] w-full rounded-[10px] border bg-white px-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none'

function inputTone(error: string | undefined, touched: boolean, value: string) {
  if (error && touched) return 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20'
  if (touched && value.trim()) return 'border-[#15803D]/60 focus:border-primary focus:ring-2 focus:ring-primary/20'
  return 'border-input focus:border-primary focus:ring-2 focus:ring-primary/20'
}

// Objetivos como selección única: un clic y Continuar.
// 'sin-idea' cambia el texto del campo idea en el paso 2.
const OBJETIVOS = [
  { id: 'viabilidad', label: 'Validar mi idea de negocio' },
  { id: 'sin-idea', label: 'Emprender, pero aún no sé qué negocio montar' },
  { id: 'pago-unico', label: 'Usar el paro para empezar (pago único)' },
  { id: 'financiacion', label: 'Buscar financiación' },
  { id: 'ayudas', label: 'Encontrar ayudas o subvenciones' },
  { id: 'socios', label: 'Buscar un socio o inversión' },
  { id: 'franquicia', label: 'Tengo una franquicia en mente' },
]

// Solo estos objetivos hacen aparecer el año de nacimiento (hay ayudas por edad)
const OBJETIVOS_CON_EDAD = ['pago-unico', 'ayudas']

const STORAGE_KEY = 'plancrece-lead-borrador'

interface FormState {
  objetivo: string
  idea: string
  ubicacion: string
  anio: string
  nombre: string
  email: string
  privacidad: boolean
  comercial: boolean
}

const VACIO: FormState = {
  objetivo: '',
  idea: '',
  ubicacion: '',
  anio: '',
  nombre: '',
  email: '',
  privacidad: false,
  comercial: false,
}

function cargarBorrador(): FormState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return { ...VACIO, ...JSON.parse(raw) }
  } catch { /* borrador corrupto: se ignora */ }
  return VACIO
}

export default function LeadForm({ variant = 'home', id }: LeadFormProps) {
  const [paso, setPaso] = useState(1)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState<FormState>(cargarBorrador)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Persistir el borrador solo durante la sesión (se borra al cerrar la pestaña)
  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form)) } catch { /* sin espacio */ }
  }, [form])

  const pideEdad = OBJETIVOS_CON_EDAD.includes(form.objetivo)
  const sinIdea = form.objetivo === 'sin-idea'

  const validateField = (field: string, value: string | boolean): string => {
    switch (field) {
      case 'objetivo':
        return value ? '' : 'Elige una opción'
      case 'idea':
        return String(value).trim().length >= 10
          ? ''
          : sinIdea
            ? 'Cuéntanos al menos qué sabes hacer o qué te atrae (una frase basta)'
            : 'Cuéntanos tu idea con una frase al menos'
      case 'ubicacion':
        return String(value).trim() ? '' : 'Indícanos la provincia'
      case 'anio': {
        if (!pideEdad) return ''
        const anio = parseInt(String(value), 10)
        return value && !isNaN(anio) && anio >= 1930 && anio <= new Date().getFullYear() - 16
          ? ''
          : 'Año de nacimiento (p. ej. 1988)'
      }
      case 'nombre':
        return String(value).trim() ? '' : 'Indícanos tu nombre'
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? '' : 'Introduce un email válido'
      case 'privacidad':
        return value ? '' : 'Debes aceptar la política de privacidad'
      default:
        return ''
    }
  }

  const update = (field: keyof FormState, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (touched[field]) {
      setErrors((e) => ({ ...e, [field]: validateField(field, value) }))
    }
  }

  const blur = (field: string) => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors((e) => ({ ...e, [field]: validateField(field, String(form[field as keyof FormState])) }))
  }

  // Valida los campos del paso actual; si todo va bien, avanza
  const continuar = () => {
    const camposPorPaso: Record<number, string[]> = {
      1: ['objetivo'],
      2: pideEdad ? ['idea', 'ubicacion', 'anio'] : ['idea', 'ubicacion'],
      3: ['nombre', 'email', 'privacidad'],
    }
    const campos = camposPorPaso[paso]
    const next: Record<string, string> = {}
    const nextTouched: Record<string, boolean> = {}
    campos.forEach((f) => {
      next[f] = validateField(f, form[f as keyof FormState] as string | boolean)
      nextTouched[f] = true
    })
    setErrors((e) => ({ ...e, ...next }))
    setTouched((t) => ({ ...t, ...nextTouched }))
    if (Object.values(next).every((v) => !v)) {
      if (paso < 3) setPaso(paso + 1)
      else enviar()
    }
  }

  const enviar = () => {
    setStatus('sending')
    const objetivoLabel = OBJETIVOS.find((o) => o.id === form.objetivo)?.label ?? form.objetivo
    enviarFormulario('Nueva idea recibida - PlanCrece', {
      Objetivo: objetivoLabel,
      Idea: form.idea,
      Ubicación: form.ubicacion,
      ...(pideEdad && form.anio ? { 'Año de nacimiento': form.anio } : {}),
      Nombre: form.nombre,
      Email: form.email,
      'Acepta novedades': form.comercial ? 'Sí' : 'No',
    })
      .then(() => {
        setStatus('sent')
        try { sessionStorage.removeItem(STORAGE_KEY) } catch { /* nada */ }
      })
      .catch(() => setStatus('error'))
  }

  const fieldError = (field: string) =>
    errors[field] && touched[field] ? (
      <p className="mt-1 text-sm text-destructive">{errors[field]}</p>
    ) : null

  if (status === 'sent') {
    return (
      <div className="success-pop flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-lg ring-1 ring-border">
        <svg viewBox="0 0 52 52" className="h-16 w-16" aria-hidden="true">
          <circle cx="26" cy="26" r="24" fill="none" stroke="#15803D" strokeWidth="2.5" className="draw-circle" />
          <path fill="none" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" d="M14 27l8 8 16-17" className="draw-check" />
        </svg>
        <h3 className="mt-4 text-xl font-bold text-[#0B2447]">Recibido, {form.nombre.split(' ')[0]}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-foreground">
          En menos de <strong>3 días laborables</strong> recibirás una primera orientación en tu
          email — gratis y sin compromiso.
        </p>
        <p className="mt-3 rounded-lg bg-secondary px-4 py-3 text-sm leading-relaxed text-foreground">
          Si tu proyecto encaja, te diremos cómo seguir. Si no, te explicaremos por qué y cómo
          mejorarlo. También gratis.
        </p>
      </div>
    )
  }

  const Progreso = (
    <div className="mb-6" aria-hidden="true">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Paso {paso} de 3
      </p>
      <div className="flex gap-1.5">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              n <= paso ? 'bg-primary' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  )

  return (
    <form
      id={id}
      onSubmit={(e) => { e.preventDefault(); continuar() }}
      noValidate
      className="relative rounded-xl bg-white p-6 shadow-lg ring-1 ring-border sm:p-8"
    >
      {Progreso}

      {/* ================= PASO 1: OBJETIVO ================= */}
      {paso === 1 && (
        <div className="space-y-3">
          <div>
            <p className="text-lg font-bold text-[#0B2447]">¿Qué es lo que más te urge ahora?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Elige la prioridad principal de tu proyecto. Podrás contarnos el resto después.
            </p>
          </div>
          <div className="grid gap-2">
            {OBJETIVOS.map(({ id: oid, label }) => {
              const activo = form.objetivo === oid
              return (
                <button
                  key={oid}
                  type="button"
                  onClick={() => update('objetivo', oid)}
                  aria-pressed={activo}
                  className={`flex min-h-[52px] items-center gap-3 rounded-[10px] border px-4 text-left text-[15px] font-medium transition-all ${
                    activo
                      ? 'border-primary bg-primary/5 text-[#0B2447] ring-2 ring-primary/20'
                      : 'border-input bg-white text-foreground hover:border-primary/50 hover:bg-secondary/40'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      activo ? 'border-primary bg-primary' : 'border-muted-foreground/40'
                    }`}
                  >
                    {activo && <Check className="h-3 w-3 text-white" strokeWidth={3.5} />}
                  </span>
                  {label}
                </button>
              )
            })}
          </div>
          {fieldError('objetivo')}
        </div>
      )}

      {/* ================= PASO 2: IDEA + CONTEXTO ================= */}
      {paso === 2 && (
        <div className="space-y-4">
          <p className="text-lg font-bold text-[#0B2447]">Cuéntanos un poco más</p>

          <div>
            <label htmlFor={`${variant}-idea`} className="mb-1.5 block text-sm font-semibold text-[#0B2447]">
              {sinIdea ? '¿Qué experiencia, intereses o recursos tienes?' : '¿Qué negocio te gustaría montar o qué idea tienes?'}
            </label>
            <textarea
              id={`${variant}-idea`}
              rows={4}
              className={`${baseInput} resize-none py-3 ${inputTone(errors.idea, !!touched.idea, form.idea)}`}
              placeholder={
                sinIdea
                  ? 'Qué sabes hacer, qué te gusta, el tiempo del que dispones o qué tipo de negocio te atrae. No necesitas tener una idea definida.'
                  : 'Cuéntanos qué negocio quieres montar, en qué punto estás y qué opciones te gustaría combinar.'
              }
              value={form.idea}
              onChange={(e) => update('idea', e.target.value)}
              onBlur={() => blur('idea')}
            />
            {fieldError('idea')}
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">¿Tienes varias vías en mente?</strong>{' '}
              Por ejemplo, usar el pago único del paro, solicitar financiación, buscar ayudas o
              incorporar un socio. Cuéntanoslo aquí y valoraremos tu situación de forma conjunta.
            </p>
          </div>

          <div>
            <label htmlFor={`${variant}-ubicacion`} className="mb-1.5 block text-sm font-semibold text-[#0B2447]">
              ¿Dónde quieres emprender?
            </label>
            <input
              id={`${variant}-ubicacion`}
              type="text"
              className={`${baseInput} ${inputTone(errors.ubicacion, !!touched.ubicacion, form.ubicacion)}`}
              placeholder="Provincia o comunidad autónoma"
              value={form.ubicacion}
              onChange={(e) => update('ubicacion', e.target.value)}
              onBlur={() => blur('ubicacion')}
            />
            {fieldError('ubicacion')}
          </div>

          {pideEdad && (
            <div>
              <label htmlFor={`${variant}-anio`} className="mb-1.5 block text-sm font-semibold text-[#0B2447]">
                Año de nacimiento
              </label>
              <input
                id={`${variant}-anio`}
                type="number"
                inputMode="numeric"
                className={`${baseInput} ${inputTone(errors.anio, !!touched.anio, form.anio)}`}
                placeholder="p. ej. 1988"
                value={form.anio}
                onChange={(e) => update('anio', e.target.value)}
                onBlur={() => blur('anio')}
              />
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                Algunas ayudas y programas pueden depender de tu edad. Solo lo usaremos para valorar
                opciones que puedan encajar contigo.
              </p>
              {fieldError('anio')}
            </div>
          )}
        </div>
      )}

      {/* ================= PASO 3: CONTACTO ================= */}
      {paso === 3 && (
        <div className="space-y-4">
          <p className="text-lg font-bold text-[#0B2447]">¿Dónde te enviamos una primera orientación?</p>

          <div>
            <label htmlFor={`${variant}-nombre`} className="mb-1.5 block text-sm font-semibold text-[#0B2447]">
              Nombre
            </label>
            <input
              id={`${variant}-nombre`}
              type="text"
              autoComplete="given-name"
              className={`${baseInput} ${inputTone(errors.nombre, !!touched.nombre, form.nombre)}`}
              placeholder="Tu nombre de pila"
              value={form.nombre}
              onChange={(e) => update('nombre', e.target.value)}
              onBlur={() => blur('nombre')}
            />
            {fieldError('nombre')}
          </div>

          <div>
            <label htmlFor={`${variant}-email`} className="mb-1.5 block text-sm font-semibold text-[#0B2447]">
              Email
            </label>
            <input
              id={`${variant}-email`}
              type="email"
              autoComplete="email"
              className={`${baseInput} ${inputTone(errors.email, !!touched.email, form.email)}`}
              placeholder="tu@email.com"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              onBlur={() => blur('email')}
            />
            {fieldError('email')}
          </div>

          <div className="space-y-3 border-t border-border pt-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="input-flush mt-1 h-5 w-5 cursor-pointer rounded border-input text-primary focus:ring-primary"
                checked={form.privacidad}
                onChange={(e) => update('privacidad', e.target.checked)}
              />
              <span className="text-sm text-foreground">
                He leído y acepto la{' '}
                <a href="/#/privacidad" className="font-medium text-primary underline">política de privacidad</a>{' '}
                y la confidencialidad de la información que envío
              </span>
            </label>
            {fieldError('privacidad')}

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="input-flush mt-1 h-5 w-5 cursor-pointer rounded border-input text-primary focus:ring-primary"
                checked={form.comercial}
                onChange={(e) => update('comercial', e.target.checked)}
              />
              <span className="text-sm text-muted-foreground">
                Quiero recibir recursos y novedades para emprender (opcional, sin spam)
              </span>
            </label>
          </div>
        </div>
      )}

      {/* ================= NAVEGACIÓN ================= */}
      {status === 'error' && (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          No se ha podido enviar. Inténtalo de nuevo en unos minutos o escríbenos directamente a{' '}
          <a href={`mailto:${EMAIL_CONTACTO}`} className="font-semibold underline">{EMAIL_CONTACTO}</a>.
        </p>
      )}

      <div className={`mt-6 flex gap-3 ${paso > 1 ? '' : ''}`}>
        {paso > 1 && (
          <button
            type="button"
            onClick={() => setPaso(paso - 1)}
            className="btn-press flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] border border-input bg-white px-5 text-base font-semibold text-foreground transition-colors hover:bg-secondary/50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver
          </button>
        )}
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`btn-press flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-[10px] bg-primary text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#1a45c0] disabled:cursor-wait disabled:opacity-80 ${
            status === 'idle' ? 'cta-pulse' : ''
          }`}
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Enviando…
            </>
          ) : paso < 3 ? (
            <>
              Continuar
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </>
          ) : (
            <>
              Solicitar orientación confidencial
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {paso === 3 && (
        <p className="mt-4 text-center text-[13px] text-muted-foreground">
          Gratis · Sin llamadas · Respuesta en menos de 3 días laborables
        </p>
      )}
    </form>
  )
}
