import { useState } from 'react'
import { ArrowRight, ShieldCheck, Clock, Check, Loader2 } from 'lucide-react'

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

export default function LeadForm({ variant = 'home', id }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    idea: '',
    ubicacion: '',
    anio: '',
    privacidad: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = (field: string, value: string | boolean): string => {
    switch (field) {
      case 'nombre':
        return String(value).trim() ? '' : 'Indícanos tu nombre'
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? '' : 'Introduce un email válido'
      case 'idea':
        return String(value).trim().length >= 20 ? '' : 'Cuéntanos tu idea con un poco más de detalle'
      case 'ubicacion':
        return String(value).trim() ? '' : 'Necesitamos tu ubicación para calcular ayudas'
      case 'anio': {
        const anio = parseInt(String(value), 10)
        return value && !isNaN(anio) && anio >= 1930 && anio <= new Date().getFullYear() - 16
          ? ''
          : 'Introduce un año válido (p. ej. 1988)'
      }
      case 'privacidad':
        return value ? '' : 'Debes aceptar la política de privacidad'
      default:
        return ''
    }
  }

  const update = (field: string, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (touched[field]) {
      setErrors((e) => ({ ...e, [field]: validateField(field, value) }))
    }
  }

  const blur = (field: string) => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors((e) => ({ ...e, [field]: validateField(field, form[field as keyof typeof form]) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fields = ['nombre', 'idea', 'ubicacion', 'anio', 'email']
    if (variant === 'contact') fields.push('privacidad')
    const next: Record<string, string> = {}
    const nextTouched: Record<string, boolean> = {}
    fields.forEach((field) => {
      next[field] = validateField(field, form[field as keyof typeof form])
      nextTouched[field] = true
    })
    setErrors(next)
    setTouched((t) => ({ ...t, ...nextTouched }))
    if (Object.values(next).every((v) => !v)) {
      setStatus('sending')
      setTimeout(() => setStatus('sent'), 1200)
    }
  }

  if (status === 'sent') {
    return (
      <div className="success-pop flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-lg ring-1 ring-border">
        <svg viewBox="0 0 52 52" className="h-16 w-16" aria-hidden="true">
          <circle cx="26" cy="26" r="24" fill="none" stroke="#15803D" strokeWidth="2.5" className="draw-circle" />
          <path fill="none" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" d="M14 27l8 8 16-17" className="draw-check" />
        </svg>
        <h3 className="mt-4 text-xl font-bold text-[#0B2447]">Idea recibida</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-foreground">
          Gracias, {form.nombre.split(' ')[0]}. En menos de <strong>3 días laborables</strong> te
          diremos si tu idea es viable.
        </p>
        <p className="mt-3 rounded-lg bg-secondary px-4 py-3 text-sm leading-relaxed text-foreground">
          Si lo es, te pediremos más información para empezar. Si no lo es, te diremos por qué —
          también gratis. Esa es nuestra forma de trabajar.
        </p>
      </div>
    )
  }

  const fieldError = (field: string) =>
    errors[field] && touched[field] ? (
      <p className="mt-1 text-sm text-destructive">{errors[field]}</p>
    ) : null

  const fieldOk = (field: string) =>
    touched[field] && !errors[field] && String(form[field as keyof typeof form]).trim() ? (
      <Check className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#15803D]" aria-hidden="true" />
    ) : null

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-border sm:p-8"
    >
      <h2 className="text-xl font-bold text-[#0B2447]">Valida tu idea gratis</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        En menos de 3 días te decimos si es viable. Y si no lo es, te diremos por qué.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor={`${variant}-nombre`} className="mb-1.5 block text-sm font-medium text-[#0B2447]">
            Nombre *
          </label>
          <div className="relative">
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
            {fieldOk('nombre')}
          </div>
          {fieldError('nombre')}
        </div>

        <div>
          <label htmlFor={`${variant}-idea`} className="mb-1.5 block text-sm font-medium text-[#0B2447]">
            Cuéntanos tu idea de negocio *
          </label>
          <textarea
            id={`${variant}-idea`}
            rows={3}
            className={`${baseInput} min-h-0 py-3 ${inputTone(errors.idea, !!touched.idea, form.idea)}`}
            placeholder="Qué quieres montar, a quién venderás y en qué punto estás"
            value={form.idea}
            onChange={(e) => update('idea', e.target.value)}
            onBlur={() => blur('idea')}
          />
          {fieldError('idea')}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor={`${variant}-ubicacion`} className="mb-1.5 block text-sm font-medium text-[#0B2447]">
              Ubicación *
            </label>
            <input
              id={`${variant}-ubicacion`}
              type="text"
              autoComplete="address-level2"
              className={`${baseInput} ${inputTone(errors.ubicacion, !!touched.ubicacion, form.ubicacion)}`}
              placeholder="Provincia"
              value={form.ubicacion}
              onChange={(e) => update('ubicacion', e.target.value)}
              onBlur={() => blur('ubicacion')}
            />
            {fieldError('ubicacion')}
          </div>
          <div>
            <label htmlFor={`${variant}-anio`} className="mb-1.5 block text-sm font-medium text-[#0B2447]">
              Año de nacimiento *
            </label>
            <input
              id={`${variant}-anio`}
              type="number"
              inputMode="numeric"
              min={1930}
              max={new Date().getFullYear() - 16}
              className={`${baseInput} ${inputTone(errors.anio, !!touched.anio, form.anio)}`}
              placeholder="p. ej. 1988"
              value={form.anio}
              onChange={(e) => update('anio', e.target.value)}
              onBlur={() => blur('anio')}
            />
            {fieldError('anio')}
          </div>
        </div>
        <p className="-mt-2 text-xs text-muted-foreground">
          Ubicación y edad nos permiten calcular las ayudas que puedes pedir.
        </p>

        <div>
          <label htmlFor={`${variant}-email`} className="mb-1.5 block text-sm font-medium text-[#0B2447]">
            Email *
          </label>
          <div className="relative">
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
            {fieldOk('email')}
          </div>
          {fieldError('email')}
        </div>

        <div>
          <label htmlFor={`${variant}-telefono`} className="mb-1.5 block text-sm font-medium text-[#0B2447]">
            Teléfono
          </label>
          <input
            id={`${variant}-telefono`}
            type="tel"
            autoComplete="tel"
            className={`${baseInput} border-input focus:border-primary focus:ring-2 focus:ring-primary/20`}
            placeholder="+34 ..."
            value={form.telefono}
            onChange={(e) => update('telefono', e.target.value)}
          />
        </div>

        {variant === 'contact' && (
          <div>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="input-flush mt-1 h-5 w-5 cursor-pointer rounded border-input text-primary focus:ring-primary"
                checked={form.privacidad}
                onChange={(e) => update('privacidad', e.target.checked)}
                onBlur={() => blur('privacidad')}
              />
              <span className="text-sm text-foreground">Acepto la política de privacidad *</span>
            </label>
            {fieldError('privacidad')}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-press flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-primary text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#1a45c0] disabled:cursor-wait disabled:opacity-80"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="spinner h-5 w-5" aria-hidden="true" />
              Validando tu idea…
            </>
          ) : (
            <>
              Valida mi idea gratis
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </>
          )}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          Respuesta en menos de 3 días laborables · NDA firmado · Sin compromiso
        </p>
        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Si tu idea no es viable, te diremos por qué. También gratis.
        </p>
      </div>
    </form>
  )
}
