// ---------------------------------------------------------------------------
// SIMULACIÓN: perfiles sintéticos de la comunidad. Antes del lanzamiento real,
// sustituir por usuarios reales o eliminar. Todos llevan isDemo: true.
// ---------------------------------------------------------------------------

export type RolForo =
  | 'miembro'
  | 'miembro_activo'
  | 'emprendedor'
  | 'consultor'
  | 'equipo'

export interface PerfilForo {
  id: string
  alias: string
  initials: string
  color: string // fondo del avatar
  zona: string
  alta: number // año aproximado de alta
  rol: RolForo
  intereses: string[]
  isDemo: true
}

const COLORES = [
  '#1D4ED8', '#0E7490', '#047857', '#B45309', '#B91C1C', '#6D28D9',
  '#0F766E', '#9D174D', '#374151', '#A16207', '#1E40AF', '#15803D',
  '#9333EA', '#C2410C', '#0369A1', '#4D7C0F',
]

// --- Veteranxs con arco narrativo (aparecen durante años) -------------------
export interface Veterano extends PerfilForo {
  arco: string // descripción interna del arco (para coherencia al redactar)
}

export const VETERANOS: Veterano[] = [
  {
    id: 'u-marta', alias: 'MartaEmprende', initials: 'ME', color: '#1D4ED8',
    zona: 'Madrid', alta: 2015, rol: 'emprendedor',
    intereses: ['hostelería', 'cafeterías', 'costes'],
    arco: 'Pregunta en 2015 por montar una cafetería cerca de una zona de oficinas. Abre en 2017. En 2020 cuenta el giro al delivery y la cafetería de barrio como ancla. En 2023 comparte cómo revisó costes (luz, café, personal) y en 2025 ayuda a nuevos con números de hostelería.',
    isDemo: true,
  },
  {
    id: 'u-jose', alias: 'JoseR_84', initials: 'JR', color: '#0E7490',
    zona: 'Sevilla', alta: 2014, rol: 'miembro_activo',
    intereses: ['autónomos', 'pago único', 'gestión'],
    arco: 'De los primeros del foro (2014). Preguntó por capitalizar el paro para un estudio de diseño. En 2016 confirmó que le concedieron el pago único. Desde entonces responde dudas de documentación con prudencia, siempre diciendo que cada caso es distinto.',
    isDemo: true,
  },
  {
    id: 'u-laura', alias: 'Laura_Valencia', initials: 'LV', color: '#B45309',
    zona: 'Valencia', alta: 2016, rol: 'emprendedor',
    intereses: ['formación', 'ayudas', 'academias'],
    arco: 'Preguntó por pago único en 2016. Abrió un centro de formación en 2018. En 2021 contó cómo pasó las clases a online. Desde 2022 ayuda a otros con la documentación de ayudas y con la gestión de la conciliación.',
    isDemo: true,
  },
  {
    id: 'u-franqui', alias: 'FranquiDudas', initials: 'FD', color: '#6D28D9',
    zona: 'Zaragoza', alta: 2018, rol: 'emprendedor',
    intereses: ['franquicias', 'contratos', 'compatibilidad'],
    arco: 'En 2018 preguntó por una franquicia de estética. En 2019 contó que la descartó tras estudiar la compatibilidad (royalty alto para su zona). En 2021 abrió un negocio propio de servicios y en 2024 explica a otros qué miró en el contrato antes de descartar.',
    isDemo: true,
  },
  {
    id: 'u-pau', alias: 'PauBCN', initials: 'PB', color: '#B91C1C',
    zona: 'Barcelona', alta: 2017, rol: 'miembro_activo',
    intereses: ['ecommerce', 'marketplaces', 'logística'],
    arco: 'Empezó con un ecommerce de complementos en 2017. En 2019 compartió sus números de marketplace vs web propia. En 2022 habló de subida de costes de envío. En 2025 comenta el uso de herramientas de IA para fichas de producto, con cautela.',
    isDemo: true,
  },
  {
    id: 'u-nerea', alias: 'NereaValida', initials: 'NV', color: '#047857',
    zona: 'Bilbao', alta: 2019, rol: 'emprendedor',
    intereses: ['viabilidad', 'planes de negocio', 'análisis'],
    arco: 'Llegó en 2019 preguntando si merecía la pena pagar por validar una idea. Descartó su primera idea (un obrador) tras validar números. En 2022 abrió un servicio de organización de espacios y lo atribuye a no haberse lanzado a ciegas.',
    isDemo: true,
  },
  {
    id: 'u-rafa', alias: 'RafaAutónomo', initials: 'RA', color: '#374151',
    zona: 'Málaga', alta: 2015, rol: 'miembro_activo',
    intereses: ['autónomos', 'cotizaciones', 'fiscalidad básica'],
    arco: 'Autónomo desde 2015 (reformas). En 2023 explicó su experiencia con la cotización por ingresos reales. Responde con tono llano, reconociendo cuando algo se le escapa y hay que preguntar a una gestoría.',
    isDemo: true,
  },
  {
    id: 'u-cafe', alias: 'CaféConNúmeros', initials: 'CN', color: '#0F766E',
    zona: 'A Coruña', alta: 2016, rol: 'consultor',
    intereses: ['financiación', 'banca', 'proyecciones'],
    arco: 'Consultor financiero que llegó en 2016. Responde dudas de préstamos y ratios con lenguaje claro. En 2022-2024 insistió en que la banca se había vuelto más selectiva y en defender las proyecciones con datos.',
    isDemo: true,
  },
  {
    id: 'u-isa', alias: 'IsaPyme', initials: 'IP', color: '#9D174D',
    zona: 'Murcia', alta: 2017, rol: 'emprendedor',
    intereses: ['comercio', 'tiendas', 'precios'],
    arco: 'Abrió una tienda de productos de limpieza a granel en 2018. En 2020 contó el susto del cierre y el giro a pedidos por WhatsApp. En 2023 habló de márgenes con la inflación. Suele mojarse en debates de precios con respeto.',
    isDemo: true,
  },
  {
    id: 'u-norte', alias: 'NorteEmprende', initials: 'NE', color: '#1E40AF',
    zona: 'Oviedo', alta: 2018, rol: 'miembro_activo',
    intereses: ['rural', 'ayudas locales', 'servicios'],
    arco: 'Montó un servicio de mantenimiento para comunidades en 2018. Defiende los negocios en zonas despobladas y conoce bien las ayudas locales de su región. En 2025 comenta el relevo generacional como oportunidad.',
    isDemo: true,
  },
  {
    id: 'u-miguel', alias: 'MiguelFinancia', initials: 'MF', color: '#9333EA',
    zona: 'Madrid', alta: 2015, rol: 'consultor',
    intereses: ['ENISA', 'startups', 'inversores'],
    arco: 'Asesor de startups desde 2015. Explica ENISA y préstamos participativos sin tecnicismos. Siempre matiza que no hay dinero gratis y que el proyecto debe defenderse. En 2024-2026 habla del análisis de ubicaciones con datos.',
    isDemo: true,
  },
  {
    id: 'u-hostelero', alias: 'HosteleríaConCabeza', initials: 'HC', color: '#C2410C',
    zona: 'Granada', alta: 2019, rol: 'emprendedor',
    intereses: ['hostelería', 'personal', 'licencias'],
    arco: 'Abrió un bar de tapas en 2019. En 2020 contó el ERTE y la reapertura. En 2022-2023 habló de la dificultad de encontrar personal y de cómo ajustó horarios. Muy práctico, nada teórico.',
    isDemo: true,
  },
  {
    id: 'u-sur', alias: 'EmprendeSur', initials: 'ES', color: '#0369A1',
    zona: 'Cádiz', alta: 2020, rol: 'emprendedor',
    intereses: ['turismo', 'temporadas', 'servicios'],
    arco: 'Llegó en plena pandemia preguntando si era mal momento para emprender. Montó un servicio de experiencias turísticas en 2021. Comparte cómo gestiona la estacionalidad y los meses flojos.',
    isDemo: true,
  },
  {
    id: 'u-marga', alias: 'MargaNegocio', initials: 'MN', color: '#A16207',
    zona: 'Valladolid', alta: 2014, rol: 'miembro_activo',
    intereses: ['comercio local', 'proveedores', 'barrio'],
    arco: 'De las primeras (2014). Tienda de alimentación de barrio heredada de su familia. Aporta la visión del comercio tradicional: proveedores, fidelización, el trato. En 2024 habla del relevo y de digitalizar sin perder la esencia.',
    isDemo: true,
  },
  {
    id: 'u-proyecto', alias: 'ProyectoLocal', initials: 'PL', color: '#4D7C0F',
    zona: 'Logroño', alta: 2021, rol: 'miembro_activo',
    intereses: ['sostenibilidad', 'producción local', 'ayudas'],
    arco: 'Montó en 2022 una pequeña producción de conservas con producto local. En 2024-2026 habla de sostenibilidad como argumento comercial real, no como postureo, y de las ayudas al sector agroalimentario.',
    isDemo: true,
  },
]

// --- Resto de la comunidad (alias naturales, sin nombres completos) ---------
const ALIAS: [string, string, number, RolForo, string[]][] = [
  ['ToniGestiona', 'TG', 2014, 'miembro', ['autónomos', 'gestión']],
  ['VerónicaTienda', 'VT', 2015, 'emprendedor', ['comercio', 'moda']],
  ['AndresPymes', 'AP', 2015, 'miembro', ['financiación', 'préstamos']],
  ['CrisTaller', 'CT', 2015, 'emprendedor', ['talleres', 'automoción']],
  ['RubenDigital', 'RD', 2016, 'emprendedor', ['ecommerce', 'marketing']],
  ['SoniaAyudas', 'SA', 2016, 'miembro_activo', ['subvenciones', 'documentación']],
  ['JaviLogistica', 'JL', 2016, 'emprendedor', ['logística', 'reparto']],
  ['ElenaCostas', 'EC', 2017, 'miembro', ['turismo', 'hostelería']],
  ['MarcosInversor', 'MI', 2017, 'consultor', ['inversión', 'startups']],
  ['BeaEstetica', 'BE', 2017, 'emprendedor', ['estética', 'salud']],
  ['OscarReformas', 'OR', 2018, 'emprendedor', ['reformas', 'obra']],
  ['NatiCocina', 'NC', 2018, 'emprendedor', ['hostelería', 'obrador']],
  ['DavidTecnico', 'DT', 2018, 'miembro', ['servicios', 'técnico']],
  ['CarmenRural', 'CR', 2019, 'emprendedor', ['rural', 'turismo']],
  ['IvanFreelance', 'IF', 2019, 'miembro', ['freelance', 'digital']],
  ['RocioModa', 'RM', 2019, 'emprendedor', ['moda', 'tienda online']],
  ['SergioAhorro', 'SH', 2020, 'miembro', ['costes', 'ahorro']],
  ['AlbaDisena', 'AD', 2020, 'emprendedor', ['diseño', 'servicios']],
  ['FranCarnicero', 'FC', 2020, 'emprendedor', ['alimentación', 'comercio']],
  ['LuciaTerapia', 'LT', 2021, 'emprendedor', ['salud', 'terapias']],
  ['HugoStartups', 'HS', 2021, 'miembro', ['startups', 'tecnología']],
  ['InesArtesana', 'IA', 2021, 'emprendedor', ['artesanía', 'online']],
  ['BorjaGym', 'BG', 2021, 'emprendedor', ['deporte', 'gimnasio']],
  ['MartaSEO', 'MS', 2022, 'miembro', ['marketing', 'SEO']],
  ['DiegoFinanzas', 'DF', 2022, 'consultor', ['finanzas', 'banca']],
  ['CarlaIdiomas', 'CI', 2022, 'emprendedor', ['formación', 'idiomas']],
  ['AlexMovilidad', 'AM', 2022, 'miembro', ['movilidad', 'flotas']],
  ['NuriaChef', 'NC', 2022, 'emprendedor', ['restauración', 'carta']],
  ['PacoVeterano', 'PV', 2014, 'miembro_activo', ['comercio', 'barrio']],
  ['SilviaApps', 'SP', 2023, 'emprendedor', ['apps', 'digital']],
  ['RaulEnergia', 'RE', 2023, 'miembro', ['energía', 'costes']],
  ['TeresaCuidados', 'TC', 2023, 'emprendedor', ['cuidados', 'mayores']],
  ['JorgeDatos', 'JD', 2023, 'miembro', ['datos', 'análisis']],
  ['EvaImprenta', 'EI', 2015, 'emprendedor', ['imprenta', 'servicios']],
  ['MoiTransporte', 'MT', 2016, 'emprendedor', ['transporte', 'furgoneta']],
  ['SaraEco', 'SE', 2023, 'emprendedor', ['sostenibilidad', 'producto']],
  ['AdrianLocal', 'AL', 2024, 'miembro', ['local', 'ubicación']],
  ['MeryPeluqueria', 'MP', 2017, 'emprendedor', ['peluquería', 'estética']],
  ['GonzaloTech', 'GT', 2024, 'miembro', ['IA', 'automatización']],
  ['PatriConsulta', 'PC', 2018, 'emprendedor', ['consultoría', 'servicios']],
  ['KikeBicis', 'KB', 2019, 'emprendedor', ['bicicletas', 'taller']],
  ['DesiMarketing', 'DM', 2024, 'miembro', ['marketing', 'redes']],
  ['AbelFrutero', 'AF', 2015, 'emprendedor', ['alimentación', 'barrio']],
  ['VickyEventos', 'VE', 2016, 'emprendedor', ['eventos', 'servicios']],
  ['IkerNorte', 'IN', 2020, 'miembro', ['industria', 'norte']],
  ['LolaPapelera', 'LP', 2021, 'emprendedor', ['papelería', 'comercio']],
  ['NicoInmobiliario', 'NI', 2024, 'miembro', ['inmobiliaria', 'alquiler']],
  ['RosaMayores', 'RM', 2022, 'emprendedor', ['mayores', 'cuidados']],
  ['SamuJoven', 'SJ', 2025, 'miembro', ['jóvenes', 'primer empleo']],
  ['AinhoaEuskadi', 'AE', 2017, 'miembro', ['industria', 'ayudas']],
  ['PepeHostelero', 'PH', 2014, 'miembro_activo', ['bares', 'hostelería']],
  ['CrisPsicologa', 'CP', 2020, 'emprendedor', ['salud mental', 'consulta']],
  ['TomasAgro', 'TA', 2021, 'emprendedor', ['agro', 'campo']],
  ['MartaJurista', 'MJ', 2019, 'consultor', ['legal', 'contratos']],
  ['XabiLogista', 'XL', 2022, 'miembro', ['logística', 'almacén']],
  ['CandeFlores', 'CF', 2023, 'emprendedor', ['floristería', 'eventos']],
  ['RoberMecanico', 'RM', 2015, 'emprendedor', ['taller', 'mecánica']],
  ['AliciaVeterinaria', 'AV', 2024, 'emprendedor', ['mascotas', 'salud']],
  ['PauFotografia', 'PF', 2018, 'emprendedor', ['fotografía', 'creativo']],
  ['MiriamChina', 'MC', 2025, 'miembro', ['importación', 'ecommerce']],
  ['FranSeguros', 'FS', 2016, 'consultor', ['seguros', 'riesgos']],
  ['GemaPilates', 'GP', 2021, 'emprendedor', ['pilates', 'salud']],
  ['IsmaCerveza', 'IC', 2022, 'emprendedor', ['cerveza', 'artesana']],
  ['NoeliaKids', 'NK', 2023, 'emprendedor', ['infantil', 'ocio']],
  ['DarioSolar', 'DS', 2024, 'miembro', ['solar', 'energía']],
  ['VeroInterior', 'VI', 2019, 'emprendedor', ['interiorismo', 'reformas']],
  ['CarlosPan', 'CP', 2014, 'miembro', ['panadería', 'obrador']],
  ['AnnaNails', 'AN', 2025, 'emprendedor', ['uñas', 'estética']],
  ['SebasCoches', 'SC', 2020, 'miembro', ['coches', 'compra-venta']],
  ['IreneTraduce', 'IT', 2021, 'emprendedor', ['traducción', 'idiomas']],
  ['MarcosFit', 'MF', 2025, 'miembro', ['fitness', 'entrenamiento']],
  ['JuliaDeco', 'JD', 2022, 'emprendedor', ['decoración', 'hogar']],
  ['AdriaPrograma', 'AP', 2023, 'miembro', ['software', 'desarrollo']],
  ['NievesCosmetica', 'NC', 2024, 'emprendedor', ['cosmética', 'natural']],
  ['TitoBar', 'TB', 2016, 'miembro_activo', ['bar', 'copas']],
  ['SaraNutri', 'SN', 2025, 'emprendedor', ['nutrición', 'salud']],
  ['VictorMudanza', 'VM', 2019, 'emprendedor', ['mudanzas', 'logística']],
  ['CrisTatuajes', 'CT', 2024, 'emprendedor', ['tatuajes', 'arte']],
  ['LuisJubilado', 'LJ', 2023, 'miembro', ['relevo', 'traspaso']],
  ['AroaModa', 'AM', 2025, 'emprendedor', ['moda', 'sostenible']],
  ['DaniImpresion3D', 'DI', 2024, 'miembro', ['3D', 'fabricación']],
  ['LeireEuskera', 'LE', 2022, 'miembro', ['formación', 'euskera']],
  ['ManuGaming', 'MG', 2025, 'miembro', ['gaming', 'ocio digital']],
  ['EstherFarma', 'EF', 2018, 'consultor', ['farma', 'regulación']],
  ['QuiqueCafe', 'QC', 2021, 'emprendedor', ['café', 'especialidad']],
  ['YolandaMayor', 'YM', 2015, 'miembro_activo', ['comercio', 'mayor']],
]

const ZONAS = [
  'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga',
  'Bilbao', 'Murcia', 'A Coruña', 'Oviedo', 'Granada', 'Cádiz',
  'Valladolid', 'Logroño', 'Alicante', 'Palma', 'Vigo', 'Santander',
  'Toledo', 'Salamanca', 'Tarragona', 'Castellón', 'Almería', 'León',
]

export const PERFILES: PerfilForo[] = [
  ...VETERANOS.map(({ arco: _arco, ...p }) => p),
  ...ALIAS.map(([alias, ini, alta, rol, intereses], i): PerfilForo => ({
    id: 'u-' + alias.toLowerCase().replace(/[^a-z0-9]/g, ''),
    alias,
    initials: ini,
    color: COLORES[(i + VETERANOS.length) % COLORES.length],
    zona: ZONAS[i % ZONAS.length],
    alta,
    rol,
    intereses,
    isDemo: true,
  })),
]

export const EQUIPO: PerfilForo = {
  id: 'equipo-plancrece',
  alias: 'Equipo PlanCrece',
  initials: 'PC',
  color: '#0B2447',
  zona: 'España',
  alta: 2017,
  rol: 'equipo',
  intereses: ['validación', 'planes de negocio', 'financiación'],
  isDemo: true,
}

export const PERFILES_POR_ID: Record<string, PerfilForo> = Object.fromEntries(
  [...PERFILES, EQUIPO].map((p) => [p.id, p])
)

// Roles editoriales visibles. Los perfiles internos alimentan el motor del
// foro (fechas y coherencia), pero en pantalla solo se muestran estos roles;
// el banner de transparencia de /comunidad explica el motivo.
const ROL_VISIBLE: Record<RolForo, { alias: string; initials: string }> = {
  emprendedor: { alias: 'Emprendedor/a', initials: 'EM' },
  miembro: { alias: 'Emprendedor/a', initials: 'EM' },
  miembro_activo: { alias: 'Emprendedor/a', initials: 'EM' },
  consultor: { alias: 'Consultor/a colaborador/a', initials: 'CO' },
  equipo: { alias: 'Equipo PlanCrece', initials: 'PC' },
}

export function getPerfil(id: string): PerfilForo {
  const p = PERFILES_POR_ID[id] ?? PERFILES[0]
  const v = ROL_VISIBLE[p.rol]
  return { ...p, alias: v.alias, initials: v.initials }
}
