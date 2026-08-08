export default function ProjectionVisual() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-border">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0B2447]">
          Proyección financiera
        </p>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
          Años 1–3
        </span>
      </div>

      <svg
        viewBox="0 0 340 170"
        className="mt-4 w-full"
        role="img"
        aria-label="Gráfico abstracto de proyección financiera ascendente"
      >
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93b4f5" />
            <stop offset="100%" stopColor="#c8d9fb" />
          </linearGradient>
        </defs>

        {/* rejilla */}
        {[30, 70, 110, 150].map((y) => (
          <line key={y} x1="10" y1={y} x2="330" y2={y} stroke="#E2E8F0" strokeWidth="1" />
        ))}

        {/* barras */}
        <rect x="45" y="112" width="34" height="38" rx="4" fill="url(#barFill)" />
        <rect x="105" y="98" width="34" height="52" rx="4" fill="url(#barFill)" />
        <rect x="165" y="76" width="34" height="74" rx="4" fill="url(#barFill)" />
        <rect x="225" y="58" width="34" height="92" rx="4" fill="#6d9bff" />
        <rect x="285" y="34" width="34" height="116" rx="4" fill="#1D4ED8" />

        {/* área bajo la línea */}
        <path
          d="M 20 130 L 85 118 L 150 100 L 215 74 L 280 48 L 325 26 L 325 150 L 20 150 Z"
          fill="url(#areaFill)"
        />

        {/* línea de tendencia */}
        <path
          d="M 20 130 L 85 118 L 150 100 L 215 74 L 280 48 L 325 26"
          fill="none"
          stroke="#0B2447"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {[
          [20, 130],
          [85, 118],
          [150, 100],
          [215, 74],
          [280, 48],
          [325, 26],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="#ffffff" stroke="#0B2447" strokeWidth="2.5" />
        ))}

        {/* marcador punto de equilibrio */}
        <circle cx="150" cy="100" r="7" fill="none" stroke="#16A34A" strokeWidth="2" />
        <text x="160" y="90" fontSize="10" fontWeight="600" fill="#15803D" fontFamily="Inter, sans-serif">
          Punto de equilibrio
        </text>
      </svg>

      <div className="mt-3 flex justify-between text-[11px] font-medium text-muted-foreground">
        <span>Ventas</span>
        <span>Costes</span>
        <span>Equilibrio</span>
        <span>Crecimiento</span>
      </div>
    </div>
  )
}
