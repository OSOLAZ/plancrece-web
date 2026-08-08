// ---------------------------------------------------------------------------
// SIMULACIÓN: bancos de contenido de la comunidad (2014-2026).
// Antes del lanzamiento real, sustituir por contenido real o eliminar.
// ---------------------------------------------------------------------------

export type CategoriaForo =
  | 'paro'
  | 'ayudas'
  | 'financiacion'
  | 'plan'
  | 'hosteleria'
  | 'franquicias'
  | 'comercio'
  | 'ecommerce'
  | 'servicios'
  | 'autonomos'

export const CATEGORIAS_FORO: { id: CategoriaForo; label: string }[] = [
  { id: 'paro', label: 'Capitalizar el paro' },
  { id: 'ayudas', label: 'Ayudas y subvenciones' },
  { id: 'financiacion', label: 'Préstamos y financiación' },
  { id: 'plan', label: 'Plan de negocio y viabilidad' },
  { id: 'hosteleria', label: 'Hostelería y restauración' },
  { id: 'franquicias', label: 'Franquicias' },
  { id: 'comercio', label: 'Comercio y tiendas' },
  { id: 'ecommerce', label: 'Ecommerce y digital' },
  { id: 'servicios', label: 'Servicios profesionales' },
  { id: 'autonomos', label: 'Autónomos, licencias y apertura' },
]

export const categoriaLabel = (c: CategoriaForo) =>
  CATEGORIAS_FORO.find((x) => x.id === c)!.label

// Distribución objetivo (peso relativo)
export const PESOS: Record<CategoriaForo, number> = {
  paro: 18,
  ayudas: 18,
  financiacion: 16,
  plan: 14,
  hosteleria: 10,
  franquicias: 8,
  comercio: 6,
  ecommerce: 5,
  servicios: 3,
  autonomos: 2,
}

export interface RespuestaFijada {
  autor: string // id de perfil (foroPerfiles)
  dias: number // días tras la apertura del hilo
  texto: string
  util: number
}

export interface SemillaHilo {
  cat: CategoriaForo
  titulo: string
  cuerpo: string[]
  tags: string[]
  etapas: string[] // businessStage posibles
  // ventana temporal permitida (año mínimo y máximo en el que este tema tiene sentido)
  minAno: number
  maxAno: number
  // respuestas escritas a mano que aparecen siempre al inicio del hilo
  fijadas?: RespuestaFijada[]
}

// ---------------------------------------------------------------------------
// BANCOS POR CATEGORÍA. minAno/maxAno controlan el realismo temporal:
// nada de IA en 2014, nada de ERTES antes de 2020, etc.
// ---------------------------------------------------------------------------

export const SEMILLAS: SemillaHilo[] = [
  // === CAPITALIZAR EL PARO (18%) =========================================
  {
    cat: 'paro', minAno: 2014, maxAno: 2026,
    titulo: '¿Cuánto tarda el pago único desde que lo pides?',
    cuerpo: [
      'Llevo 8 meses en el paro y estoy pensando en capitalizarlo para montar algo por mi cuenta. He leído que se puede pedir el pago único pero no tengo claro cuánto tardan en resolverlo.',
      '¿Alguien que lo haya pedido hace poco me puede decir más o menos los plazos? Y si piden mucha documentación. Gracias de antemano.',
    ],
    tags: ['pago único', 'plazos', 'documentación'],
    etapas: ['idea', 'explorando'],
  },
  {
    cat: 'paro', minAno: 2014, maxAno: 2026,
    titulo: 'Pago único y seguir trabajando por cuenta ajena, ¿se puede?',
    cuerpo: [
      'Tengo una duda concreta: si capitalizo el paro para emprender, ¿puedo compaginarlo con un trabajo por cuenta ajena a tiempo parcial? Me refiero a algo compatible, no a jornada completa.',
      'He leído cosas contradictorias y no me aclaro. Si alguien ha pasado por esto, agradezco la experiencia.',
    ],
    tags: ['pago único', 'compatibilidad', 'cuenta ajena'],
    etapas: ['idea'],
  },
  {
    cat: 'paro', minAno: 2014, maxAno: 2026,
    titulo: 'El proyecto de viabilidad para capitalizar, ¿qué os pidieron?',
    cuerpo: [
      'Estoy preparando la documentación para el pago único y me piden un proyecto de viabilidad o memoria. No sé si con algo sencillo vale o si tiene que ser muy detallado.',
      '¿Qué presentasteis vosotros? ¿Os lo devolvieron alguna vez para corregir algo?',
    ],
    tags: ['pago único', 'proyecto de viabilidad', 'memoria'],
    etapas: ['preparando documentación'],
  },
  {
    cat: 'paro', minAno: 2015, maxAno: 2026,
    titulo: 'Capitalizar el paro para una SL en vez de autónomo',
    cuerpo: [
      'Tengo claro que quiero capitalizar el paro, pero estoy dudando entre hacerme autónomo o montar directamente una SL con mi hermano.',
      'Entiendo que el procedimiento cambia un poco (desembolso como aportación a la sociedad). ¿Alguien lo ha hecho así? ¿Merece la pena la diferencia de trámite?',
    ],
    tags: ['pago único', 'SL', 'autónomo', 'forma jurídica'],
    etapas: ['idea', 'decidiendo forma jurídica'],
  },
  {
    cat: 'paro', minAno: 2015, maxAno: 2026,
    titulo: '¿Y si capitalizo y el negocio no funciona?',
    cuerpo: [
      'Llevo dándole vueltas meses. Tengo una idea que creo buena, pero me da miedo pedir el pago único, quedarme sin el colchón del paro y que luego no salga.',
      'No busco que nadie me diga "lánzate", busco entender cómo valorasteis vosotros ese riesgo antes de dar el paso.',
    ],
    tags: ['pago único', 'riesgo', 'miedo'],
    etapas: ['idea'],
  },
  {
    cat: 'paro', minAno: 2016, maxAno: 2026,
    titulo: 'Pago único concedido: cuento el proceso por si ayuda',
    cuerpo: [
      'Hace unos meses pregunté aquí por los plazos del pago único. Ya lo tengo concedido y os cuento cómo fue por si le sirve a alguien.',
      'Lo más importante: la memoria la tuve que corregir una vez porque me faltaba desglosar mejor la inversión inicial. Fuera de eso, el trámite fue más sencillo de lo que esperaba.',
    ],
    tags: ['pago único', 'experiencia', 'proceso'],
    etapas: ['en marcha'],
  },
  {
    cat: 'paro', minAno: 2014, maxAno: 2026,
    titulo: '¿Merece la pena capitalizar si el negocio necesita poco dinero?',
    cuerpo: [
      'Mi idea necesita muy poca inversión inicial (un portátil, una web y algo de publicidad). Me pregunto si tiene sentido pedir el pago único o si es mejor guardar el paro por si acaso.',
      '¿Cómo lo veis los que habéis emprendido con poco capital?',
    ],
    tags: ['pago único', 'baja inversión', 'duda'],
    etapas: ['idea'],
  },
  {
    cat: 'paro', minAno: 2020, maxAno: 2026,
    titulo: 'Capitalizar después de un ERTE, ¿algo cambia?',
    cuerpo: [
      'Estuve en ERTE unos meses y ahora estoy en paro. Quiero capitalizar para emprender pero no sé si haber estado en ERTE afecta en algo a la solicitud.',
      'Pregunto por si alguien ha pasado por esta situación, porque con tanta medida extraordinaria no sé si mi caso es el estándar.',
    ],
    tags: ['pago único', 'ERTE', 'situación'],
    etapas: ['idea'],
  },
  // === AYUDAS Y SUBVENCIONES (18%) =======================================
  {
    cat: 'ayudas', minAno: 2014, maxAno: 2026,
    titulo: '¿Cómo os enteráis de las convocatorias de vuestra comunidad?',
    cuerpo: [
      'Me siento un poco perdido con esto de las ayudas. Cada comunidad tiene las suyas, cada ayuntamiento las suyas, y parece que hay que estar pendiente de mil sitios.',
      '¿Qué método usáis para no perderos convocatorias? ¿Boletines, gestoría, algún buscador?',
    ],
    tags: ['convocatorias', 'comunidad autónoma', 'buscar ayudas'],
    etapas: ['idea', 'explorando'],
  },
  {
    cat: 'ayudas', minAno: 2014, maxAno: 2026,
    titulo: 'Ayudas para mujeres emprendedoras, ¿existen de verdad o es papel?',
    cuerpo: [
      'Leo que hay líneas específicas para mujeres emprendedoras, pero no sé si luego en la práctica son accesibles o si piden tantos requisitos que casi nadie las consigue.',
      'Si alguna ha solicitado alguna, me interesa saber si el trámite mereció la pena.',
    ],
    tags: ['mujeres emprendedoras', 'requisitos', 'experiencia'],
    etapas: ['idea', 'explorando'],
  },
  {
    cat: 'ayudas', minAno: 2015, maxAno: 2026,
    titulo: 'Subvención concedida pero sin cobrar: cuánto tardan en pagar',
    cuerpo: [
      'Me han concedido una ayuda de mi comunidad para la apertura de mi tienda. Ya tengo la resolución, pero me dicen que el pago puede tardar.',
      'El problema es que la inversión la tengo que hacer ya. ¿Cuánto os tardaron a vosotros entre resolución y cobro? ¿Pedisteis anticipo?',
    ],
    tags: ['subvención', 'plazos de pago', 'anticipo'],
    etapas: ['en marcha'],
  },
  {
    cat: 'ayudas', minAno: 2015, maxAno: 2026,
    titulo: 'Justificar la subvención: facturas, fechas y despistes',
    cuerpo: [
      'Me han dicho que la fase de justificación es donde más gente falla. Que si una factura está fuera de plazo, que si falta un justificante de pago, etc.',
      '¿Qué errores cometisteis o visteis cometer al justificar? Quiero ir preparado.',
    ],
    tags: ['justificación', 'facturas', 'errores'],
    etapas: ['en marcha'],
  },
  {
    cat: 'ayudas', minAno: 2017, maxAno: 2026,
    titulo: '¿Las ayudas a la digitalización sirven para un comercio pequeño?',
    cuerpo: [
      'Tengo una tienda de barrio y veo que hay líneas para digitalización de pymes. No sé si son para empresas tecnológicas o si alguien como yo (web, TPV, facturación) puede optar.',
      '¿Algún comercio tradicional las ha conseguido? ¿Qué os cubrieron?',
    ],
    tags: ['digitalización', 'comercio', 'kit digital'],
    etapas: ['en marcha'],
  },
  {
    cat: 'ayudas', minAno: 2020, maxAno: 2021,
    titulo: 'Ayudas extraordinarias por la pandemia: mi experiencia pidiéndolas',
    cuerpo: [
      'No sé si a alguien más le pasa: entre unas líneas y otras estoy hecho un lío. Cada semana sale una convocatoria distinta y cambian los requisitos.',
      'Cuento esto con prudencia porque la información cambia constantemente, pero por si a alguien le orienta: yo presenté la de mi comunidad con la memoria de actividad que ya tenía y me la aceptaron. Lo importante era demostrar el descenso de facturación.',
    ],
    tags: ['pandemia', 'ayudas extraordinarias', 'prudencia'],
    etapas: ['en marcha'],
  },
  {
    cat: 'ayudas', minAno: 2022, maxAno: 2026,
    titulo: 'Ayudas a la contratación del primer empleado, ¿las conocíais?',
    cuerpo: [
      'Estoy a punto de contratar a mi primera persona y me comentan que hay bonificaciones y ayudas a la contratación que no conocía.',
      '¿Alguien las ha usado? Me interesa sobre todo si el ahorro compensa el papeleo.',
    ],
    tags: ['contratación', 'bonificaciones', 'primer empleado'],
    etapas: ['creciendo'],
  },
  {
    cat: 'ayudas', minAno: 2023, maxAno: 2026,
    titulo: 'Fondos europeos para pymes pequeñas: ¿accesibles o solo para grandes?',
    cuerpo: [
      'Leo sobre fondos europeos y me da la sensación de que están pensados para empresas más grandes o para proyectos muy tecnológicos.',
      '¿Alguna pyme pequeña (menos de 5 personas) ha conseguido algo? ¿Por qué tipo de proyecto?',
    ],
    tags: ['fondos europeos', 'pymes', 'acceso'],
    etapas: ['explorando'],
  },
  // === PRÉSTAMOS Y FINANCIACIÓN (16%) ====================================
  {
    cat: 'financiacion', minAno: 2014, maxAno: 2026,
    titulo: 'El banco me pide aval para un préstamo pequeño, ¿es normal?',
    cuerpo: [
      'Quiero pedir unos 20.000 € para montar un pequeño obrador y el banco me pide un aval. Pensaba que para cantidades así no haría falta.',
      '¿Os han pedido aval por cantidades parecidas? ¿Hay forma de evitarlo o es lo habitual?',
    ],
    tags: ['préstamo', 'aval', 'banco'],
    etapas: ['buscando financiación'],
  },
  {
    cat: 'financiacion', minAno: 2014, maxAno: 2026,
    titulo: 'Líneas ICO: ¿cómo se piden en la práctica?',
    cuerpo: [
      'Sé que existen las líneas ICO para empresas, pero no tengo claro si se piden al ICO directamente o al banco, y qué miran para concederlas.',
      'Si alguien ha pasado por una línea ICO, agradezco que cuente cómo fue el proceso y qué documentación le pidieron.',
    ],
    tags: ['ICO', 'banco', 'proceso'],
    etapas: ['buscando financiación'],
  },
  {
    cat: 'financiacion', minAno: 2015, maxAno: 2026,
    titulo: 'Microcréditos para empezar: experiencias',
    cuerpo: [
      'Necesito una cantidad pequeña (menos de 15.000 €) y un préstamo tradicional me parece excesivo para lo que necesito. He oído hablar de los microcréditos para emprendedores.',
      '¿Alguien ha pedido alguno? ¿Qué entidad y qué tal la experiencia?',
    ],
    tags: ['microcrédito', 'baja inversión', 'emprender'],
    etapas: ['buscando financiación'],
  },
  {
    cat: 'financiacion', minAno: 2016, maxAno: 2026,
    titulo: 'ENISA: qué miran de verdad para dar un préstamo participativo',
    cuerpo: [
      'Tengo un proyecto con componente innovador y estoy pensando en presentarlo a ENISA. He leído los requisitos pero me interesa la experiencia real.',
      'Para los que habéis pasado: ¿qué pesó más, el equipo, el mercado, las proyecciones? ¿Cuánto tardó el proceso?',
    ],
    tags: ['ENISA', 'préstamo participativo', 'innovación'],
    etapas: ['buscando financiación'],
  },
  {
    cat: 'financiacion', minAno: 2014, maxAno: 2026,
    titulo: 'Cómo defendí las proyecciones ante el director del banco',
    cuerpo: [
      'Después de que me devolvieran el plan una primera vez por "poco defendible", aprendí que el banco no quiere optimismo, quiere que demuestres que conoces tus números.',
      'Cuento lo que me funcionó por si ayuda: llevar desglosado el punto de equilibrio, explicar de dónde sale cada cifra de ventas y tener un escenario pesimista preparado.',
    ],
    tags: ['proyecciones', 'banco', 'punto de equilibrio'],
    etapas: ['buscando financiación'],
  },
  {
    cat: 'financiacion', minAno: 2022, maxAno: 2026,
    titulo: '¿Notáis que la banca está más exigente con los préstamos a pymes?',
    cuerpo: [
      'Hace unos años pedí un préstamo sin mucho problema y ahora, para ampliar, me están pidiendo muchísima más documentación y garantías.',
      '¿Es impresión mía o la banca se ha vuelto más selectiva? ¿Cómo lo estáis llevando los que estáis pidiendo ahora?',
    ],
    tags: ['banca', 'selectividad', 'crédito'],
    etapas: ['buscando financiación'],
  },
  {
    cat: 'financiacion', minAno: 2018, maxAno: 2026,
    titulo: 'Crowdfunding para un negocio local: ¿tiene sentido?',
    cuerpo: [
      'Tengo una pequeña productora y valoro una ronda de crowdfunding para ampliar equipamiento. Pero no sé si es un canal para proyectos locales o solo para productos con tirón nacional.',
      '¿Alguien lo ha intentado con un negocio de ámbito local? ¿Cómo fue?',
    ],
    tags: ['crowdfunding', 'financiación alternativa', 'local'],
    etapas: ['buscando financiación'],
  },
  // === PLAN DE NEGOCIO Y VIABILIDAD (14%) ================================
  {
    cat: 'plan', minAno: 2014, maxAno: 2026,
    titulo: '¿Merece la pena pagar por un plan de negocio o lo hago yo?',
    cuerpo: [
      'Sé escribir y sé usar una hoja de cálculo, así que podría intentar hacer mi plan de negocio yo mismo. Pero me pregunto si un profesional ve cosas que yo no veo.',
      'Los que habéis pagado por uno: ¿qué os aportó que no hubierais hecho solos?',
    ],
    tags: ['plan de negocio', 'hacerlo uno mismo', 'duda'],
    etapas: ['idea', 'preparando documentación'],
    fijadas: [
      {
        autor: 'u-jose', dias: 1, util: 19,
        texto: 'Yo empecé haciéndolo por mi cuenta y acabé pidiendo ayuda solo para la parte de los números. Redactar sabía, pero montar unas proyecciones que aguantaran preguntas, no tanto. Esa mezcla me funcionó.',
      },
      {
        autor: 'u-pau', dias: 2, util: 15,
        texto: 'Por dar la contraria: yo lo hice entero yo mismo y me funcionó. Si te manejas bien con hojas de cálculo y conoces tu sector, inténtalo. Eso sí, que alguien con criterio te lo revise antes de presentarlo a nada serio.',
      },
      {
        autor: 'u-nerea', dias: 3, util: 27,
        texto: 'Lo que me decidió a mí fue que me validaran la idea gratis antes de pagar nada. Que primero te digan con sinceridad si tiene sentido —aunque la respuesta sea que no— y luego ya decidas, me pareció la forma honesta de plantearlo.',
      },
    ],
  },
  {
    cat: 'plan', minAno: 2014, maxAno: 2026,
    titulo: 'Mi gestor me cobró 600 € por un plan de 7 folios',
    cuerpo: [
      'Cuento esto porque sigo dándole vueltas. Para capitalizar el paro necesitaba la memoria y mi gestor me hizo un documento de 7 folios con los datos mínimos que pedía la oficina de empleo.',
      'Me sirvió para el trámite, pero me quedé con la sensación de que no analizaba nada: ni mi mercado, ni si mis números aguantaban. ¿Os ha pasado algo parecido? ¿Es lo normal?',
    ],
    tags: ['plan de negocio', 'gestoría', 'experiencia'],
    etapas: ['preparando documentación'],
    fijadas: [
      {
        autor: 'u-nerea', dias: 2, util: 24,
        texto: 'Me pasó casi igual: la gestoría me hizo la memoria para capitalizar y era justo lo mínimo para el trámite. Cuando luego quise pedir financiación, aquello no defendía nada y tuve que rehacerla entera. Al final pagué dos veces, que es lo que duele.',
      },
      {
        autor: 'u-cafe', dias: 3, util: 31,
        texto: 'No es lo ideal pero tampoco es raro: muchas gestorías entienden la memoria como un trámite, no como un análisis. Si solo necesitabas el papel para el pago único, cumplió su función. El problema viene si ese documento lo usas para decidir o para presentarlo a un banco, porque ahí sí que miran de dónde sale cada cifra.',
      },
      {
        autor: 'u-marga', dias: 4, util: 12,
        texto: 'Por dar otra visión: yo no pagué a nadie y lo hice con una plantilla y muchas horas. Para mi tienda fue suficiente, aunque reconozco que mi caso era sencillo. Si el negocio tiene números complicados, igual sí compensa que lo mire alguien.',
      },
    ],
  },
  {
    cat: 'plan', minAno: 2015, maxAno: 2026,
    titulo: 'Cómo sé si mi idea es viable antes de gastar un euro',
    cuerpo: [
      'Tengo una idea que me entusiasma pero no sé si es viable de verdad o solo me lo parece a mí. No quiero gastar en local, licencias y demás para descubrirlo tarde.',
      '¿Qué pasos disteis vosotros para validar la idea antes de invertir? ¿Hay algo objetivo en lo que fijarse?',
    ],
    tags: ['viabilidad', 'validar', 'antes de invertir'],
    etapas: ['idea'],
  },
  {
    cat: 'plan', minAno: 2016, maxAno: 2026,
    titulo: 'El punto de equilibrio: cómo lo calculáis en un negocio de servicios',
    cuerpo: [
      'Entiendo el punto de equilibrio en una tienda (vender X unidades), pero en un servicio por horas me cuesta más calcularlo.',
      '¿Cómo lo planteáis los que tenéis negocios de servicios? ¿Por horas facturables al mes?',
    ],
    tags: ['punto de equilibrio', 'servicios', 'cálculo'],
    etapas: ['preparando documentación', 'en marcha'],
  },
  {
    cat: 'plan', minAno: 2017, maxAno: 2026,
    titulo: 'Validé mi idea y me dijeron que no era viable. Mejor decisión',
    cuerpo: [
      'Hace tiempo pregunté aquí si merecía la pena validar antes de lanzarse. Al final lo hice y el análisis dijo que mi idea (un obrador con reparto) no aguantaba los números en mi zona.',
      'Dolió, porque le tenía cariño. Pero prefiero saberlo así que con el local alquilado. Lo cuento por si a alguien le sirve: a veces la respuesta es "no", y también es útil.',
    ],
    tags: ['validación', 'no viable', 'experiencia'],
    etapas: ['idea'],
    fijadas: [
      {
        autor: 'u-hostelero', dias: 1, util: 22,
        texto: 'Gracias por contarlo. Todo el mundo presume de aciertos y nadie habla de los frenazos a tiempo, y son los que más dinero ahorran.',
      },
      {
        autor: 'u-miguel', dias: 2, util: 18,
        texto: 'Desde mi experiencia asesorando: un "no" a tiempo es el mejor resultado posible de un análisis. Duele mucho menos que un cierre con deudas.',
      },
    ],
  },
  {
    cat: 'plan', minAno: 2019, maxAno: 2026,
    titulo: '¿Qué preguntas os hicieron al validar vuestra idea?',
    cuerpo: [
      'Estoy pensando en enviar mi idea para que la validen profesionalmente. Me gustaría saber qué tipo de cosas preguntan o miran, para ir preparado.',
      'Los que habéis pasado por una validación: ¿qué os pidieron? ¿Ubicación, presupuesto, experiencia?',
    ],
    tags: ['validación', 'proceso', 'preguntas'],
    etapas: ['idea'],
    fijadas: [
      {
        autor: 'u-nerea', dias: 1, util: 21,
        texto: 'A mí me preguntaron por mi experiencia, mi zona, mi presupuesto real y de dónde pensaba sacar los primeros clientes. Nada raro, pero ahí me di cuenta de que no tenía respuesta para lo último, que es lo importante.',
      },
      {
        autor: 'u-laura', dias: 3, util: 16,
        texto: 'En mi caso me pidieron desglosar la inversión inicial partida por partida. Cuando lo hice vi que me faltaban partidas enteras: la licencia, el seguro, los primeros meses de alquiler. Solo por eso ya mereció la pena.',
      },
    ],
  },
  {
    cat: 'plan', minAno: 2024, maxAno: 2026,
    titulo: 'Usar la IA para hacer el plan de negocio: ¿sustituye al análisis?',
    cuerpo: [
      'He visto que hay herramientas de IA que generan planes de negocio. Me tienta porque es rápido, pero me da la sensación de que el resultado es genérico.',
      '¿Alguien las ha usado para algo serio (presentarlo a un banco o una convocatoria)? ¿Aguantan una pregunta difícil del director del banco?',
    ],
    tags: ['IA', 'plan de negocio', 'herramientas'],
    etapas: ['idea', 'preparando documentación'],
  },
  // === HOSTELERÍA (10%) ==================================================
  {
    cat: 'hosteleria', minAno: 2014, maxAno: 2026,
    titulo: 'Montar una cafetería cerca de una zona de oficinas: números',
    cuerpo: [
      'Llevo tiempo mirando un local cerca de un polígono de oficinas. Creo que el desayuno y el menú del mediodía pueden funcionar, pero no sé cómo estimar los clientes antes de abrir.',
      '¿Cómo calculasteis el potencial de vuestra cafetería/bar antes de firmar el local? ¿Contasteis gente, hablasteis con las oficinas?',
    ],
    tags: ['cafetería', 'oficinas', 'estimar clientes'],
    etapas: ['idea'],
  },
  {
    cat: 'hosteleria', minAno: 2015, maxAno: 2026,
    titulo: 'Traspaso de bar: qué mirar antes de pagar nada',
    cuerpo: [
      'Me ofrecen el traspaso de un bar que "factura mucho". Me fío poco de la palabra del dueño y quiero comprobar cosas antes de dar una señal.',
      '¿Qué pedisteis vosotros? ¿Cuentas, licencias, estado del equipo, contrato de alquiler? Todo lo que se os ocurra me sirve.',
    ],
    tags: ['traspaso', 'bar', 'comprobaciones'],
    etapas: ['idea', 'negociando'],
  },
  {
    cat: 'hosteleria', minAno: 2016, maxAno: 2026,
    titulo: 'El coste de personal en hostelería me está comiendo el margen',
    cuerpo: [
      'Tengo un bar desde hace un año y lo que más me cuesta cuadrar es el personal. Entre salarios, seguridad social y coberturas, se me va una parte enorme de la facturación.',
      '¿Cómo lo gestionáis los veteranos? ¿Horarios, carta más corta, más autoservicio? No quiero bajar calidad pero tengo que ajustar.',
    ],
    tags: ['personal', 'costes', 'margen'],
    etapas: ['en marcha'],
  },
  {
    cat: 'hosteleria', minAno: 2020, maxAno: 2021,
    titulo: 'Reapertura tras el cierre: cómo lo estáis haciendo',
    cuerpo: [
      'Con la reapertura tengo que decidir si vuelvo con el mismo formato o cambio algo. He pensado en reforzar la terraza y empezar con comida para llevar, que nunca había hecho.',
      '¿Cómo lo estáis planteando los de hostelería? Estoy un poco perdido y cualquier experiencia ayuda. No sé ni qué pedirle a la situación.',
    ],
    tags: ['reapertura', 'delivery', 'terraza'],
    etapas: ['en marcha'],
  },
  {
    cat: 'hosteleria', minAno: 2021, maxAno: 2026,
    titulo: 'El delivery en un bar de barrio: ¿merece la pena?',
    cuerpo: [
      'Durante la pandemia empecé a hacer comida para llevar y me fue bien. Ahora dudo si mantenerlo, porque las comisiones de las plataformas se comen el margen.',
      '¿Lo mantenéis? ¿Habéis probado a gestionar el reparto por vuestra cuenta o con alguna alternativa a las grandes plataformas?',
    ],
    tags: ['delivery', 'comisiones', 'plataformas'],
    etapas: ['en marcha'],
  },
  {
    cat: 'hosteleria', minAno: 2022, maxAno: 2026,
    titulo: 'No encuentro camareros: cómo lo estáis solucionando',
    cuerpo: [
      'Llevo meses buscando personal de sala y no hay manera. He subido el sueldo y aun así la gente no dura o directamente no se presenta a las entrevistas.',
      '¿Os pasa a todos? ¿Habéis cambiado horarios, condiciones, la forma de organizar? Estoy pensando en reducir servicios si no encuentro a nadie.',
    ],
    tags: ['personal', 'contratación', 'hostelería'],
    etapas: ['en marcha'],
  },
  {
    cat: 'hosteleria', minAno: 2023, maxAno: 2026,
    titulo: 'Subir precios por la inflación sin perder clientes',
    cuerpo: [
      'Con la subida del café, la luz y el aceite, mis márgenes han desaparecido. Sé que tengo que subir precios pero me da miedo que el cliente de barrio se asuste.',
      '¿Cómo habéis subido precios vosotros? ¿De golpe, poco a poco, avisando? ¿Perdisteis mucha clientela?',
    ],
    tags: ['precios', 'inflación', 'márgenes'],
    etapas: ['en marcha'],
  },
  // === FRANQUICIAS (8%) ==================================================
  {
    cat: 'franquicias', minAno: 2014, maxAno: 2026,
    titulo: 'Franquicia o negocio propio: cómo decidisteis',
    cuerpo: [
      'Estoy en la duda clásica: montar algo propio o entrar en una franquicia. Veo ventajas en las dos y no acabo de decidirme.',
      'Los que habéis pasado por esta decisión, ¿qué os hizo decantaros? No busco "la mejor opción", busco entender qué valorasteis.',
    ],
    tags: ['franquicia', 'negocio propio', 'decisión'],
    etapas: ['idea'],
  },
  {
    cat: 'franquicias', minAno: 2015, maxAno: 2026,
    titulo: 'El canon y el royalty: cómo sabéis si son razonables',
    cuerpo: [
      'Estoy comparando franquicias y cada una cobra de forma distinta: unas canon alto y poco royalty, otras al revés, otras nada de canon.',
      '¿Cómo valoráis si lo que pide una franquicia es razonable? ¿Hay alguna referencia o depende del sector?',
    ],
    tags: ['canon', 'royalty', 'comparar'],
    etapas: ['idea', 'comparando'],
  },
  {
    cat: 'franquicias', minAno: 2016, maxAno: 2026,
    titulo: 'Descarté una franquicia por el contrato: qué me hizo sospechar',
    cuerpo: [
      'Estuve a punto de firmar con una franquicia y al final eché pie atrás. No era nada ilegal, pero había cláusulas que no me cuadraban: exclusividad muy larga, penalización alta por salirme, y el royalty no bajaba aunque vendiera poco.',
      'Lo cuento por si a alguien le sirve: leed el contrato con calma y, si podéis, con alguien que entienda. Lo que importa no es solo cuánto hay que invertir, sino cómo puedes salir si sale mal.',
    ],
    tags: ['contrato', 'descartar', 'cláusulas'],
    etapas: ['comparando'],
  },
  {
    cat: 'franquicias', minAno: 2018, maxAno: 2026,
    titulo: '¿Cómo sabéis si vuestro perfil encaja con una franquicia?',
    cuerpo: [
      'No es solo el dinero. Me pregunto si mi perfil (mi experiencia, mi ciudad, mi forma de trabajar) encaja de verdad con la franquicia que me gusta.',
      '¿Cómo lo valorasteis vosotros? ¿Habéis descartado alguna no por el dinero sino por no veros ahí dentro?',
    ],
    tags: ['compatibilidad', 'perfil', 'encaje'],
    etapas: ['idea', 'comparando'],
  },
  {
    cat: 'franquicias', minAno: 2023, maxAno: 2026,
    titulo: 'Franquicias sin local: ¿alguien ha probado?',
    cuerpo: [
      'Veo que hay franquicias que no necesitan local físico (servicios, online). Me interesa porque el alquiler es lo que más me frena.',
      '¿Alguien opera una franquicia sin local? ¿Cómo es el día a día y cómo se consiguen los clientes?',
    ],
    tags: ['sin local', 'online', 'servicios'],
    etapas: ['idea', 'comparando'],
  },
  // === COMERCIO (6%) =====================================================
  {
    cat: 'comercio', minAno: 2014, maxAno: 2026,
    titulo: 'Tienda de barrio frente a Amazon: cómo competís',
    cuerpo: [
      'Tengo una tienda de barrio y cada vez noto más la competencia de lo online. No puedo ganar por precio, así que tengo que diferenciarme por otra cosa.',
      '¿Cómo lo hacéis los que tenéis tienda física? ¿Qué os funciona para que el cliente siga viniendo?',
    ],
    tags: ['comercio local', 'competencia online', 'diferenciación'],
    etapas: ['en marcha'],
  },
  {
    cat: 'comercio', minAno: 2016, maxAno: 2026,
    titulo: 'Abrir una tienda en 2024: ¿una locura o aún tiene sentido?',
    cuerpo: [
      'Todo el mundo me dice que el comercio físico está muerto, pero yo sigo viendo tiendas de barrio que funcionan. Depende del qué y del dónde, supongo.',
      '¿Alguien ha abierto una tienda física hace poco? ¿Qué tipo de producto y cómo va?',
    ],
    tags: ['tienda física', 'apertura', 'tendencia'],
    etapas: ['idea'],
  },
  {
    cat: 'comercio', minAno: 2020, maxAno: 2021,
    titulo: 'Pedidos por WhatsApp en la tienda: mi apaño de la pandemia',
    cuerpo: [
      'Cuando cerramos, empecé a tomar pedidos por WhatsApp y a repartir yo misma en bici. No era ninguna solución tecnológica, pero me mantuvo a flote.',
      'Ahora lo mantengo como servicio para los clientes de siempre. A veces lo sencillo funciona. ¿A alguien más le sirvió algo parecido?',
    ],
    tags: ['whatsapp', 'pandemia', 'adaptación'],
    etapas: ['en marcha'],
  },
  // === ECOMMERCE (5%) ====================================================
  {
    cat: 'ecommerce', minAno: 2015, maxAno: 2026,
    titulo: 'Marketplace o web propia: números reales',
    cuerpo: [
      'Vendo por un marketplace y estoy pensando en montar mi propia tienda online. En el marketplace tengo visibilidad pero me cobran comisión; con web propia tendría que pagar el tráfico yo.',
      '¿Cómo lo tenéis montado los que vendéis online? ¿Os compensa la web propia o acabáis dependiendo del marketplace igual?',
    ],
    tags: ['marketplace', 'web propia', 'comisiones'],
    etapas: ['en marcha'],
  },
  {
    cat: 'ecommerce', minAno: 2018, maxAno: 2026,
    titulo: 'Los costes de envío me están comiendo el margen',
    cuerpo: [
      'Tengo un ecommerce pequeño y los costes de envío suben cada año. Ofrecer "envío gratis" me revienta el margen, pero cobrarlo aparte frena las ventas.',
      '¿Cómo lo gestionáis? ¿Precio mínimo para envío gratis, recogida en punto, negociar con la mensajería?',
    ],
    tags: ['envíos', 'costes', 'margen'],
    etapas: ['en marcha'],
  },
  {
    cat: 'ecommerce', minAno: 2024, maxAno: 2026,
    titulo: 'IA para las fichas de producto: ¿la usáis?',
    cuerpo: [
      'Tengo cientos de productos y escribir las descripciones me lleva una eternidad. Estoy probando a generarlas con IA y luego repasarlas.',
      '¿Alguien más lo hace? Me preocupa que suene todo igual o que Google lo penalice. Cuento con cautela porque es un tema nuevo para mí.',
    ],
    tags: ['IA', 'fichas de producto', 'contenido'],
    etapas: ['en marcha'],
  },
  // === SERVICIOS PROFESIONALES (3%) ======================================
  {
    cat: 'servicios', minAno: 2015, maxAno: 2026,
    titulo: 'Poner precio a tus servicios cuando empiezas',
    cuerpo: [
      'Voy a empezar a ofrecer mis servicios de forma independiente y no sé cómo poner precio. Por horas me parece poco profesional, pero por proyecto me da miedo quedarme corto.',
      '¿Cómo fijasteis vuestros precios los que ofrecéis servicios profesionales? ¿Mirasteis a la competencia, calculasteis costes?',
    ],
    tags: ['precios', 'servicios', 'tarifas'],
    etapas: ['idea', 'empezando'],
  },
  {
    cat: 'servicios', minAno: 2017, maxAno: 2026,
    titulo: 'Cómo conseguís los primeros clientes sin cartera',
    cuerpo: [
      'El pez que se muerde la cola: sin clientes no tienes referencias, y sin referencias no consigues clientes. Estoy en ese punto.',
      '¿Cómo conseguisteis vuestros primeros clientes los de servicios? ¿Red de contactos, precios de entrada, trabajar alguno gratis para demostrar?',
    ],
    tags: ['primeros clientes', 'cartera', 'captación'],
    etapas: ['empezando'],
  },
  // === AUTÓNOMOS, LICENCIAS Y APERTURA (2%) ==============================
  {
    cat: 'autonomos', minAno: 2014, maxAno: 2026,
    titulo: 'Autónomo o SL para empezar: cómo lo decidisteis',
    cuerpo: [
      'Estoy a punto de empezar y no sé si darme de alta como autónomo o montar una sociedad limitada directamente. Sé que depende de cada caso, pero me interesan los criterios.',
      '¿Qué os hizo decidir a los que habéis pasado por esto? ¿Facturación prevista, responsabilidad, costes?',
    ],
    tags: ['autónomo', 'SL', 'forma jurídica'],
    etapas: ['idea', 'decidiendo forma jurídica'],
  },
  {
    cat: 'autonomos', minAno: 2023, maxAno: 2026,
    titulo: 'Cotización por ingresos reales: cómo os ha ido',
    cuerpo: [
      'Desde que cambió el sistema de cotización de autónomos estoy intentando entender si pago más o menos que antes. La verdad, la tabla me resulta confusa.',
      '¿Cómo os ha ido a los que ya estáis en el sistema? ¿Os ha subido o bajado la cuota? Pregunto desde la ignorancia, que esto se me escapa.',
    ],
    tags: ['cotización', 'ingresos reales', 'cuota'],
    etapas: ['en marcha'],
  },
]
