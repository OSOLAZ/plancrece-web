import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import {
  ArrowRight,
  Info,
  CheckCircle2,
  Clock3,
  RotateCcw,
  Landmark,
  Users,
  Sparkles,
  Wallet,
} from 'lucide-react'

// Simulador «¿Con cuánto puedes empezar?» — versión simplificada y orientada a acción.
// Filosofía: el usuario NO necesita saber finanzas. Le mostramos qué tiene, cuánto le falta,
// y le explicamos paso a paso cómo conseguirlo (banco, socio, paro...) conectando cada camino
// con lo que necesita para lograrlo: un plan de empresa profesional.

interface EstadoSim {
  ahorros: number
  paro: number
  familia: number
  socio: number
  noSeParo: boolean
}

const INICIAL: EstadoSim = { ahorros: 0, paro: 0, familia: 0, socio: 0, noSeParo: false }

const fmt = (n: number) => n.toLocaleString('es-ES') + ' €'

function parseEuro(v: string): number {
  const limpio = v.replace(/[^\d]/g, '')
  const n = parseInt(limpio || '0', 10)
  return Number.isNaN(n) ? 0 : Math.min(n, 9999999)
}

function Tooltip({ texto }: { texto: string }) {
  const [abierto, setAbierto] = useState(false)
  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-label="Más información"
        aria-expanded={abierto}
        className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-primary/60 transition-colors hover:bg-primary/10 hover:text-primary"
      >
        <Info className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      {abierto && (
        <span className="absolute left-1/2 top-7 z-30 w-72 -translate-x-1/2 rounded-lg bg-[#0B2447] p-3 text-left text-xs font-normal leading-relaxed text-white shadow-xl">
          {texto}
        </span>
      )}
    </span>
  )
}

function CampoEuro({
  label,
  tooltip,
  value,
  onChange,
  placeholder = '0',
}: {
  label: string
  tooltip: string
  value: number
  onChange: (n: number) => void
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center text-sm font-medium text-[#0B2447]">
        {label}
        <Tooltip texto={tooltip} />
      </span>
      <span className="relative block">
        <input
          type="text"
          inputMode="numeric"
          value={value === 0 ? '' : fmt(value).replace(' €', '')}
          placeholder={placeholder}
          onChange={(e) => onChange(parseEuro(e.target.value))}
          className="w-full rounded-[10px] border border-border bg-white px-4 py-3 pr-10 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-foreground/50">
          €
        </span>
      </span>
    </label>
  )
}

interface Props {
  inversionNecesaria?: number // precargada desde la ficha de franquicia
  nombreFranquicia?: string
}

export default function SimuladorCapital({ inversionNecesaria = 0, nombreFranquicia }: Props) {
  const [s, setS] = useState<EstadoSim>(INICIAL)
  const [visto, setVisto] = useState(false)
  const [inversionInput, setInversionInput] = useState(inversionNecesaria)

  const set = <K extends keyof EstadoSim>(k: K, v: EstadoSim[K]) =>
    setS((prev) => ({ ...prev, [k]: v }))

  const recursosActuales = s.ahorros + s.paro + s.familia + s.socio
  const inversionFinal = inversionNecesaria > 0 ? inversionNecesaria : inversionInput
  const necesidad = Math.max(0, inversionFinal - recursosActuales)

  // Algoritmo de recomendación
  const camino = useMemo(() => {
    if (necesidad === 0) return { tipo: 'cubierto' as const }

    const recomendaciones: { banco?: number; socio?: number; paro?: boolean; ayudas?: boolean } = {}

    // Si no ha puesto paro y no ha dicho que no tiene, sugerimos explorarlo
    if (s.paro === 0 && !s.noSeParo) {
      recomendaciones.paro = true
    }

    // Si necesidad baja: solo préstamo/microcrédito
    if (necesidad <= 15000) {
      recomendaciones.banco = necesidad
      if (necesidad > 8000) recomendaciones.ayudas = true
    } else {
      // Necesidad alta: mix préstamo + socio (60/40 como ejemplo didáctico)
      const banco = Math.round(necesidad * 0.6)
      const socio = necesidad - banco
      recomendaciones.banco = banco
      recomendaciones.socio = socio
      recomendaciones.ayudas = true
    }

    return { tipo: 'necesita' as const, ...recomendaciones }
  }, [necesidad, s.paro, s.noSeParo])

  const calcular = () => {
    if (inversionFinal === 0) return
    try {
      localStorage.setItem(
        'plancrece-mapa-capital',
        JSON.stringify({
          recursosActuales,
          necesidad,
          inversion: inversionFinal,
          franquicia: nombreFranquicia || null,
          fecha: new Date().toISOString(),
        })
      )
    } catch {}
    setVisto(true)
  }

  const reiniciar = () => {
    setS(INICIAL)
    setInversionInput(inversionNecesaria)
    setVisto(false)
  }

  if (visto) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-gradient-to-br from-[#0B2447] to-[#123058] p-6 text-white sm:p-8">
          <h3 className="text-xl font-bold">Tu punto de partida</h3>
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                Recursos que ya tienes
              </span>
              <span className="text-lg font-extrabold">{fmt(recursosActuales)}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="flex items-center gap-2 text-sm text-white/80">
                <Clock3 className="h-4 w-4 text-amber-400" aria-hidden="true" />
                Inversión necesaria{nombreFranquicia ? ` (${nombreFranquicia})` : ''}
              </span>
              <span className="text-lg font-extrabold">{fmt(inversionFinal)}</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-semibold text-white">Lo que te falta por conseguir</span>
              <span className="text-2xl font-extrabold text-amber-400">{fmt(necesidad)}</span>
            </div>
          </div>
        </div>

        {/* Aviso: esto es solo la inversión inicial orientativa */}
        <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <p className="flex items-start gap-2.5 text-xs leading-relaxed text-amber-900">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
            <span>
              <strong>Esto es solo la inversión inicial orientativa.</strong> Todo negocio necesita
              además un colchón para los primeros meses: alquiler del local (si lo hay), reforma,
              personal (si lo hay), proveedores… Esa cifra cambia completamente según tu negocio y
              tu situación. Si validamos que tu perfil y tu idea son adecuados, el Plan Avanzado
              incluye ese cálculo completo y personalizado.
            </span>
          </p>
        </div>

        {/* Frase puente: conecta el número con las tarjetas */}
        {necesidad > 0 && camino.tipo === 'necesita' && (
          <div className="rounded-xl bg-blue-50 p-4 ring-1 ring-blue-200">
            <p className="text-sm leading-relaxed text-blue-900">
              Te faltan <strong>{fmt(necesidad)}</strong>. Nuestra recomendación orientativa:{' '}
              {camino.banco !== undefined && camino.banco > 0 && (
                <>
                  pide <strong>~{fmt(camino.banco)}</strong> en préstamo bancario
                </>
              )}
              {camino.socio !== undefined && camino.socio > 0 && (
                <>
                  {' '}y busca un socio o inversor para los <strong>~{fmt(camino.socio)}</strong>{' '}
                  restantes
                </>
              )}
              . Así es como lo conseguirías:
            </p>
          </div>
        )}

        {camino.tipo === 'cubierto' ? (
          <div className="rounded-xl bg-emerald-50 p-5 ring-1 ring-emerald-200">
            <p className="flex items-start gap-2.5 text-sm leading-relaxed text-emerald-900">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              ¡Enhorabuena! Ya tienes los recursos necesarios. Ahora el siguiente paso es demostrar
              que tu proyecto merece esa inversión: un plan de empresa profesional es lo que
              convierte tu dinero en un negocio que funciona.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-[#0B2447]">Tu camino paso a paso</h3>

            {recursosActuales === 0 && (
              <div className="rounded-xl bg-blue-50 p-4 ring-1 ring-blue-200">
                <p className="flex items-start gap-2.5 text-sm leading-relaxed text-blue-900">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span>
                    <strong>Tener 0 € de ahorros no cierra la puerta.</strong> El pago único del paro,
                    la financiación bancaria y los socios existen precisamente para esto. El primer
                    paso es el mismo en todos los casos: un plan de empresa que lo demuestre.
                  </span>
                </p>
              </div>
            )}

            {camino.paro && (
              <div className="rounded-xl border-l-4 border-emerald-500 bg-white p-4 shadow-sm ring-1 ring-border">
                <h4 className="flex items-center gap-2 font-bold text-[#0B2447]">
                  <Wallet className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  Explora la capitalización del paro
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Si estás cobrando el desempleo, puedes pedir recibir en un solo pago lo que te
                  queda por percibir para invertirlo aquí. Es el recurso que más emprendedores
                  desconocen. <strong>Para solicitarlo necesitas presentar un plan de empresa</strong> —
                  es el documento que demuestra que tu idea es viable.
                </p>
              </div>
            )}

            {camino.banco !== undefined && camino.banco > 0 && (
              <div className="rounded-xl border-l-4 border-blue-500 bg-white p-4 shadow-sm ring-1 ring-border">
                <h4 className="flex items-center gap-2 font-bold text-[#0B2447]">
                  <Landmark className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  Para el banco: ~{fmt(camino.banco)}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Los bancos no dan dinero por una idea bonita: evalúan un documento que demuestre
                  que el negocio funciona en números. Ese documento es <strong>el plan de empresa</strong>.
                  Pero la estrategia no es ir a un banco — es ir a <strong>varios</strong>, sabiendo
                  a cuáles y con qué discurso.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Con tu Plan Avanzado tendrás:
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-foreground/80">
                  <li className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" aria-hidden="true" />
                    <span>
                      <strong>La guía de entidades</strong>: qué bancos encajan mejor con tu perfil y
                      tu proyecto, y qué estrategia seguir con cada uno (no es lo mismo pedir 10.000
                      que 30.000 €).
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" aria-hidden="true" />
                    <span>
                      <strong>El PowerPoint con guion</strong>: en 5 minutos harás una presentación
                      profesional ante el trabajador del banco. Solo eso ya te saca de la media de
                      quien pide financiación — tu presentación dice mucho de ti antes de mirar un
                      solo número.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" aria-hidden="true" />
                    <span>
                      <strong>El plan de empresa editable</strong>: el banco analizará sus números, y
                      si te pide ajustes, lo modificas las veces que quieras sin volver a pagar.
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {camino.socio !== undefined && camino.socio > 0 && (
              <div className="rounded-xl border-l-4 border-amber-500 bg-white p-4 shadow-sm ring-1 ring-border">
                <h4 className="flex items-center gap-2 font-bold text-[#0B2447]">
                  <Users className="h-4 w-4 text-amber-600" aria-hidden="true" />
                  Para el socio o inversor: ~{fmt(camino.socio)}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Un socio o inversor es alguien que pone dinero en tu negocio a cambio de una parte
                  de los beneficios. No tiene por qué ser un millonario desconocido:
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-foreground/80">
                  <li className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" aria-hidden="true" />
                    Un familiar o amigo que cree en ti y tiene ahorros
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" aria-hidden="true" />
                    Un conocido de tu sector que quiere invertir
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" aria-hidden="true" />
                    Un inversor local que busca proyectos como el tuyo
                  </li>
                </ul>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  <strong>El plan de empresa incluye una guía práctica con consejos para buscarlos,
                  acercarte a ellos y convencerlos con datos.</strong> Y la presentación PowerPoint te
                  sirve para dejarles impresionados en la primera reunión. No podemos prometerte que
                  encontrarás socio, pero sí que con un plan profesional tus opciones se multiplican.
                </p>
              </div>
            )}

            {camino.ayudas && (
              <div className="rounded-xl border-l-4 border-purple-500 bg-white p-4 shadow-sm ring-1 ring-border">
                <h4 className="flex items-center gap-2 font-bold text-[#0B2447]">
                  <Sparkles className="h-4 w-4 text-purple-600" aria-hidden="true" />
                  Ayudas y subvenciones: reduce lo que necesitas pedir
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  Cada comunidad tiene ayudas que mucha gente no pide porque no las conoce.{' '}
                  <strong>¿No sabes cuáles encajan contigo?</strong> Nuestro informe personalizado
                  analiza qué subvenciones podrías recibir según tu idea, tu perfil y tu zona — y
                  puede reducir la cantidad que necesitas pedir al banco o a un socio.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-3 border-t border-border pt-5">
          <Link
            to="/precios"
            className="btn-press flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-primary text-base font-semibold text-white transition-colors hover:bg-[#1a45c0]"
          >
            Ver el Plan Avanzado
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="text-center text-xs text-foreground/60">
            El Plan Avanzado incluye: plan de empresa profesional + presentación PowerPoint con guion +
            informe de ayudas personalizado + guía para buscar socios e inversores.
          </p>
          <button
            type="button"
            onClick={reiniciar}
            className="btn-press inline-flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Recalcular con otros datos
          </button>
        </div>

        <p className="border-t border-border pt-4 text-xs leading-relaxed text-foreground/55">
          Herramienta orientativa: no es asesoramiento financiero ni una promesa de financiación.
          Los importes mostrados son ejemplos didácticos de cómo se suele repartir una necesidad de
          capital. La concesión de préstamos o la búsqueda de socios depende de tu proyecto y de
          terceros.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-bold text-[#0B2447]">¿Con cuánto puedes empezar?</h3>
        <p className="mt-1 text-sm text-foreground/70">
          Suma lo que ya tienes y te diremos qué te falta y cómo conseguirlo.
          Herramienta orientativa: estimación inicial, no un cálculo definitivo ni una aprobación bancaria.
        </p>
      </div>

      <CampoEuro
        label="Ahorros propios"
        tooltip="Dinero del que dispones hoy, sin necesidad de pedirlo ni justificarlo."
        value={s.ahorros}
        onChange={(n) => set('ahorros', n)}
      />

      <div className="space-y-2">
        <CampoEuro
          label="Capitalización del paro (pago único)"
          tooltip="Si estás cobrando el desempleo, puedes pedir recibir en un solo pago lo que te queda por percibir para invertirlo en tu negocio. Para solicitarlo necesitas presentar un plan de empresa."
          value={s.paro}
          onChange={(n) => set('paro', n)}
          placeholder="0 si no sabes o no tienes"
        />
        <label className="flex cursor-pointer items-start gap-2.5 pl-1">
          <input
            type="checkbox"
            checked={s.noSeParo}
            onChange={(e) => set('noSeParo', e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border accent-[#1D4ED8]"
          />
          <span className="text-xs text-foreground/70">
            No estoy en paro o no me interesa esta opción
          </span>
        </label>
      </div>

      <CampoEuro
        label="Familia o amigos que te ayudarían"
        tooltip="Dinero que alguien de tu entorno ya se ha comprometido a aportar, o que crees que podrías conseguir."
        value={s.familia}
        onChange={(n) => set('familia', n)}
      />

      <CampoEuro
        label="Socio o inversor ya confirmado"
        tooltip="Capital de un socio con el acuerdo ya cerrado. Si aún lo estás buscando, déjalo en cero: el plan incluye guía para encontrarlo."
        value={s.socio}
        onChange={(n) => set('socio', n)}
      />

      {inversionNecesaria > 0 && (
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-sm text-foreground/80">
            <strong className="font-semibold text-[#0B2447]">Inversión necesaria:</strong>{' '}
            {fmt(inversionNecesaria)}
            {nombreFranquicia && ` (${nombreFranquicia})`}
          </p>
          <p className="mt-1 text-xs text-foreground/60">
            Datos orientativos según la ficha. Puedes ajustarlo abajo si tienes otra cifra.
          </p>
        </div>
      )}

      {inversionNecesaria === 0 && (
        <label className="block">
          <span className="mb-1.5 flex items-center text-sm font-medium text-[#0B2447]">
            Inversión total que necesitas
            <Tooltip texto="Local, reforma, equipamiento, stock, canon de entrada si es franquicia, licencias y un colchón para los primeros meses. Si no lo sabes, nuestra validación gratuita te ayuda a calcularlo." />
          </span>
          <span className="relative block">
            <input
              type="text"
              inputMode="numeric"
              value={inversionInput === 0 ? '' : fmt(inversionInput).replace(' €', '')}
              placeholder="0"
              onChange={(e) => setInversionInput(parseEuro(e.target.value))}
              className="w-full rounded-[10px] border border-border bg-white px-4 py-3 pr-10 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-foreground/50">
              €
            </span>
          </span>
        </label>
      )}

      <button
        type="button"
        onClick={calcular}
        disabled={inversionFinal === 0}
        className="btn-press inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-primary text-base font-semibold text-white transition-colors hover:bg-[#1a45c0] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Calcular mi punto de partida
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>

      <p className="text-center text-xs text-foreground/55">
        Tus números no salen de tu navegador: no se guardan ni se comparten.
        Solo tú decides si quieres compartirlos después. Si quieres una valoración personalizada, completa el formulario de validación.
      </p>
    </div>
  )
}
