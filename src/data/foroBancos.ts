// ---------------------------------------------------------------------------
// SIMULACIÓN: bancos generativos de la comunidad (temas, moldes y respuestas).
// Antes del lanzamiento real, sustituir por contenido real o eliminar.
// ---------------------------------------------------------------------------

import type { CategoriaForo } from './foroContenido'

// Un TEMA define una situación. El motor lo combina con MOLDES de redacción
// para producir hilos distintos entre sí.
// - tema: sintagma nominal ("la capitalización del paro para una tienda online")
// - detalle: frase(s) de contexto en minúscula inicial, sin punto final
// - duda: frase(s) con la pregunta concreta, minúscula inicial, sin punto final
export interface Tema {
  cat: CategoriaForo
  titulos: string[]
  tema: string
  detalle: string
  duda: string
  tags: string[]
  etapas: string[]
  minAno: number
  maxAno: number
}

export const TEMAS: Tema[] = [
  // === CAPITALIZAR EL PARO =================================================
  {
    cat: 'paro', minAno: 2014, maxAno: 2026,
    titulos: [
      'Capitalizar para una tienda online: ¿pago único o ahorros?',
      '¿Pido el pago único o tiro de mis ahorros?',
      'Duda entre capitalizar el paro o usar solo mis ahorros',
    ],
    tema: 'la capitalización del paro para montar una tienda online',
    detalle: 'llevo 3 años trabajando en un almacén y tengo algo ahorrado, pero con el pago único empezaría más desahogada',
    duda: 'no sé si pedir el pago único y quedarme sin el paro, o empezar solo con los ahorros aunque vaya más justa',
    tags: ['pago único', 'ahorros', 'ecommerce'],
    etapas: ['idea'],
  },
  {
    cat: 'paro', minAno: 2014, maxAno: 2026,
    titulos: [
      '¿Cuánto paro hace falta para que compense capitalizar?',
      'Compensa el pago único con pocos meses de paro acumulados?',
      'Tengo poco paro acumulado: ¿merece la pena capitalizar?',
    ],
    tema: 'la decisión de capitalizar teniendo pocos meses de paro acumulados',
    detalle: 'solo tengo acumulados unos 8 meses de prestación, así que el pago único no sería una cantidad muy grande',
    duda: 'me pregunto si con esa cantidad compensa el trámite o si es mejor guardar el paro por si lo necesito más adelante',
    tags: ['pago único', 'cantidad', 'duda'],
    etapas: ['idea', 'explorando'],
  },
  {
    cat: 'paro', minAno: 2015, maxAno: 2026,
    titulos: [
      'Pago único y tarifa plana de autónomos, ¿se pueden juntar?',
      '¿Es compatible capitalizar el paro con la tarifa plana?',
      'Tarifa plana + pago único: ¿compatible o hay que elegir?',
    ],
    tema: 'la compatibilidad entre el pago único y la tarifa plana de autónomos',
    detalle: 'quiero darme de alta como autónomo y capitalizar el paro, y me han dicho que quizá no se pueden pedir las dos cosas a la vez',
    duda: '¿alguien sabe si son compatibles o si hay que renunciar a una para pedir la otra? La información que encuentro es de años distintos y no me aclaro',
    tags: ['pago único', 'tarifa plana', 'autónomos'],
    etapas: ['idea', 'preparando documentación'],
  },
  {
    cat: 'paro', minAno: 2014, maxAno: 2026,
    titulos: [
      'Si cierro antes de tiempo, ¿tengo que devolver el pago único?',
      'Devolución del pago único si el negocio cierra',
      'Miedo a tener que devolver la capitalización si cierro',
    ],
    tema: 'la posible devolución del pago único si el negocio cierra antes de tiempo',
    detalle: 'estoy a punto de solicitar la capitalización pero me frena una cosa: qué pasa si el negocio no funciona y tengo que cerrar al cabo de un año',
    duda: '¿hay que devolver lo cobrado en algún caso? He leído algo de justificar la inversión y quiero entenderlo bien antes de firmar nada',
    tags: ['pago único', 'devolución', 'cierre'],
    etapas: ['idea'],
  },
  {
    cat: 'paro', minAno: 2016, maxAno: 2026,
    titulos: [
      'Capitalizar con un socio: ¿cada uno pide su pago único?',
      'Pago único entre dos socios, ¿cómo funciona?',
      'Montamos una SL entre dos: dudas con la capitalización',
    ],
    tema: 'la capitalización del paro cuando se monta la sociedad entre dos personas',
    detalle: 'mi cuñado y yo queremos montar una SL y los dos estamos en el paro',
    duda: 'no sabemos si cada uno puede pedir su pago único como aportación a la sociedad o si hay alguna limitación al ser dos',
    tags: ['pago único', 'SL', 'socios'],
    etapas: ['idea', 'decidiendo forma jurídica'],
  },
  {
    cat: 'paro', minAno: 2014, maxAno: 2026,
    titulos: [
      'La memoria para capitalizar: ¿quién os la hizo?',
      '¿Hicisteis vosotros la memoria del pago único o la pagasteis?',
      'Proyecto de viabilidad para el pago único: opciones',
    ],
    tema: 'la elaboración de la memoria o proyecto de viabilidad para capitalizar',
    detalle: 'en la oficina de empleo me han dicho que necesito presentar un proyecto de viabilidad y no sé por dónde empezar',
    duda: '¿lo redactasteis vosotros mismos, os lo hizo la gestoría o recurristeis a alguien especializado? Me interesa saber qué nivel de detalle esperan',
    tags: ['pago único', 'memoria', 'proyecto de viabilidad'],
    etapas: ['preparando documentación'],
  },
  // === AYUDAS Y SUBVENCIONES ===============================================
  {
    cat: 'ayudas', minAno: 2015, maxAno: 2026,
    titulos: [
      'Tarifa plana de autónomos: condiciones actuales',
      '¿Quién tiene derecho a la tarifa plana? No me aclaro',
      'Tarifa plana: requisitos y errores que os encontrasteis',
    ],
    tema: 'las condiciones de la tarifa plana para nuevos autónomos',
    detalle: 'voy a darme de alta por primera vez y me interesa la tarifa plana, pero cada fuente cuenta unos requisitos distintos',
    duda: '¿qué os pidieron a vosotros y cometisteis algún error que os la hiciera perder? Prefiero ir sobre seguro',
    tags: ['tarifa plana', 'autónomos', 'requisitos'],
    etapas: ['idea', 'preparando documentación'],
  },
  {
    cat: 'ayudas', minAno: 2014, maxAno: 2026,
    titulos: [
      'Ayudas para emprender en zonas rurales: experiencias',
      'Emprender en un pueblo: ¿qué ayudas hay de verdad?',
      'Ayudas por despoblación: ¿alguien las ha conseguido?',
    ],
    tema: 'las ayudas para montar un negocio en zonas rurales o en riesgo de despoblación',
    detalle: 'quiero montar un pequeño negocio en mi pueblo y en teoría hay ayudas por emprendimiento rural, pero no encuentro a nadie que las haya pedido',
    duda: '¿alguien de aquí ha conseguido alguna? Me interesa si los importes compensan el papeleo y si tardan mucho en resolver',
    tags: ['rural', 'despoblación', 'ayudas locales'],
    etapas: ['idea', 'explorando'],
  },
  {
    cat: 'ayudas', minAno: 2015, maxAno: 2026,
    titulos: [
      'Ayuda del ayuntamiento, de la diputación o de la comunidad: lío',
      'Tres administraciones, tres convocatorias: ¿por dónde empiezo?',
      'Cómo os organizáis con tanta convocatoria distinta',
    ],
    tema: 'el lío de convocatorias entre ayuntamiento, diputación, comunidad y Estado',
    detalle: 'para mi proyecto podría encajar en una ayuda municipal, otra de la diputación y otra autonómica, y no sé si se pueden pedir varias o son incompatibles',
    duda: '¿cómo lo hicisteis vosotros? ¿Pedisteis varias a la vez o fuisteis a por la mayor? Me da miedo pedir una y quedarme fuera de otra mejor',
    tags: ['convocatorias', 'compatibilidad', 'administraciones'],
    etapas: ['explorando'],
  },
  {
    cat: 'ayudas', minAno: 2021, maxAno: 2026,
    titulos: [
      'Kit Digital: ¿lo habéis aprovechado? ¿Para qué os dio?',
      'Experiencia con el Kit Digital en un negocio pequeño',
      '¿Merece la pena el Kit Digital para una pyme de 2 personas?',
    ],
    tema: 'el aprovechamiento del Kit Digital en un negocio pequeño',
    detalle: 'somos dos personas y nos llega publicidad del Kit Digital por todas partes, pero no sé si el trámite compensa para lo que nos darían',
    duda: '¿lo habéis usado? ¿Os cubrió la web, el TPV, algo de marketing? Me interesa la experiencia real, no la del folleto',
    tags: ['kit digital', 'digitalización', 'bono'],
    etapas: ['en marcha'],
  },
  {
    cat: 'ayudas', minAno: 2014, maxAno: 2026,
    titulos: [
      '¿Compensan las ayudas para menores de 30?',
      'Ayudas para jóvenes emprendedores: mi duda antes de pedir',
      'Tengo 27 años: ¿qué ayudas debería mirar?',
    ],
    tema: 'las ayudas específicas para emprendedores jóvenes',
    detalle: 'tengo 27 años y estoy preparando mi primer negocio; veo que casi todas las líneas tienen alguna ventaja para menores de 30 o de 35',
    duda: '¿alguno las habéis aprovechado? No sé si son una ventaja real o solo un pequeño descuento en la cuota',
    tags: ['jóvenes', 'menores de 30', 'ventajas'],
    etapas: ['idea'],
  },
  {
    cat: 'ayudas', minAno: 2024, maxAno: 2026,
    titulos: [
      'Ayudas al relevo generacional en comercios: ¿existen de verdad?',
      'Hacerme con el negocio de un jubilado: ¿hay ayudas?',
      'Relevo generacional: experiencias con las nuevas líneas',
    ],
    tema: 'las ayudas al relevo generacional para hacerse con un negocio existente',
    detalle: 'el dueño de una tienda de mi barrio se jubila y me planteo quedarme con el negocio; he leído que algunas comunidades ayudan al relevo generacional',
    duda: '¿alguien ha pasado por esto? Me interesa cómo se valora el negocio y si las ayudas llegan a tiempo para la operación',
    tags: ['relevo generacional', 'traspaso', 'comercio'],
    etapas: ['idea', 'negociando'],
  },
  // === PRÉSTAMOS Y FINANCIACIÓN ============================================
  {
    cat: 'financiacion', minAno: 2014, maxAno: 2026,
    titulos: [
      'Pedir un préstamo estando en el paro: ¿misión imposible?',
      'Sin nómina y en el paro: ¿me dará el banco un préstamo?',
      'Financiación sin nómina: cómo lo conseguisteis',
    ],
    tema: 'la consecución de un préstamo estando en situación de desempleo',
    detalle: 'estoy en el paro y quiero montar algo pequeño; entre la capitalización y mis ahorros me faltan unos 10.000 €',
    duda: '¿el banco me va a prestar sin nómina? ¿Qué os pidieron a los que estabais en mi situación: aval, plan de negocio, garantías?',
    tags: ['préstamo', 'sin nómina', 'desempleo'],
    etapas: ['buscando financiación'],
  },
  {
    cat: 'financiacion', minAno: 2014, maxAno: 2026,
    titulos: [
      '¿Cuánto tarda el banco en contestar a un préstamo para empresa?',
      'Tiempos reales del banco para un préstamo de negocio',
      'Llevo 3 semanas esperando respuesta del banco, ¿es normal?',
    ],
    tema: 'los plazos reales de los bancos para resolver préstamos a emprendedores',
    detalle: 'presenté la solicitud con todo el plan y la documentación hace casi un mes y solo me dicen que "está en estudio"',
    duda: '¿cuánto os tardaron a vosotros? ¿Es mala señal que tarden o es su ritmo normal? Tengo el local esperando y me urgen',
    tags: ['banco', 'plazos', 'préstamo'],
    etapas: ['buscando financiación'],
  },
  {
    cat: 'financiacion', minAno: 2015, maxAno: 2026,
    titulos: [
      'Renting o compra del equipamiento: cómo lo veis',
      'Equipo del negocio: ¿comprar, renting o leasing?',
      'El equipamiento me descuadra el presupuesto: alternativas',
    ],
    tema: 'la elección entre comprar el equipamiento o hacer renting',
    detalle: 'el equipamiento que necesito sube el presupuesto inicial mucho más de lo previsto y estoy mirando fórmulas de renting para no descapitalizarme',
    duda: '¿cómo lo resolvisteis vosotros? ¿El renting os salió caro a la larga o os vino bien para empezar con menos?',
    tags: ['renting', 'equipamiento', 'inversión inicial'],
    etapas: ['buscando financiación', 'idea'],
  },
  {
    cat: 'financiacion', minAno: 2016, maxAno: 2026,
    titulos: [
      'Póliza de crédito para el circulante: ¿quién la usa?',
      'Financiar el día a día: ¿póliza de crédito o fondo propio?',
      'Cómo financiáis los meses de menos ventas',
    ],
    tema: 'la financiación del circulante en los meses flojos',
    detalle: 'mi negocio tiene meses muy buenos y meses muy flojos, y en los flojos me cuesta pagar a proveedores a tiempo',
    duda: '¿usáis póliza de crédito, descuento de facturas o simplemente colchón de tesorería? Me interesa qué os ha funcionado sin ahogaros en intereses',
    tags: ['circulante', 'póliza', 'tesorería'],
    etapas: ['en marcha'],
  },
  {
    cat: 'financiacion', minAno: 2022, maxAno: 2026,
    titulos: [
      'Con los tipos altos, ¿aplazáis inversiones?',
      'La subida de tipos me ha frenado la ampliación',
      '¿Pedís financiación con estos tipos o esperáis?',
    ],
    tema: 'el efecto de la subida de tipos de interés en los planes de inversión',
    detalle: 'tenía previsto ampliar el negocio pero con los tipos como están el préstamo se me ha encarecido un montón respecto a lo que calculé hace dos años',
    duda: '¿estáis aplazando inversiones o seguís adelante ajustando? Me cuesta decidir si esperar o tragar con el coste',
    tags: ['tipos de interés', 'inversión', 'crédito'],
    etapas: ['creciendo', 'buscando financiación'],
  },
  {
    cat: 'financiacion', minAno: 2014, maxAno: 2026,
    titulos: [
      '¿Quién os avaló? No quiero meter a mi familia',
      'El aval: cómo lo resolvisteis sin hipotecar a nadie',
      'Busco alternativas al aval familiar',
    ],
    tema: 'el problema del aval cuando no quieres involucrar a la familia',
    detalle: 'el banco me pide aval para el préstamo y la única opción sería mi padre, cosa que quiero evitar a toda costa',
    duda: '¿existen sociedades de garantía recíproca u otras vías que hayáis usado? ¿Alguno conseguisteis el préstamo sin aval personal?',
    tags: ['aval', 'SGR', 'garantías'],
    etapas: ['buscando financiación'],
  },
  // === PLAN DE NEGOCIO Y VIABILIDAD ========================================
  {
    cat: 'plan', minAno: 2014, maxAno: 2026,
    titulos: [
      '¿Cuánto habéis pagado por un plan de negocio?',
      'Precios de planes de negocio: ¿qué es razonable?',
      'Me piden 800 € por el plan de negocio, ¿es el precio normal?',
    ],
    tema: 'el precio razonable de un plan de negocio',
    detalle: 'he pedido presupuesto en varios sitios y me encuentro de todo: desde 150 € hasta casi 1.000 €, sin que me quede claro qué incluye cada uno',
    duda: '¿cuánto pagasteis vosotros y qué os dieron a cambio? No sé si lo barato sale caro o si lo caro es humo',
    tags: ['plan de negocio', 'precio', 'comparar'],
    etapas: ['idea', 'preparando documentación'],
  },
  {
    cat: 'plan', minAno: 2015, maxAno: 2026,
    titulos: [
      'Plantilla gratuita vs plan hecho por un profesional',
      '¿Sirve una plantilla descargada para el plan de negocio?',
      'Hice el plan con una plantilla y no sé si vale',
    ],
    tema: 'la diferencia entre usar una plantilla gratuita y encargar el plan a un profesional',
    detalle: 'he rellenado una plantilla que descargué y el resultado me parece correcto, pero no sé si un banco o una convocatoria lo van a ver flojo',
    duda: '¿alguien ha presentado un plan hecho con plantilla y le ha valido? ¿En qué se nota la diferencia con uno profesional?',
    tags: ['plantilla', 'plan de negocio', 'banco'],
    etapas: ['preparando documentación'],
  },
  {
    cat: 'plan', minAno: 2014, maxAno: 2026,
    titulos: [
      '¿Qué mira el banco de verdad en un plan de negocio?',
      'El banco apenas miró mi plan: ¿qué les importa entonces?',
      'Las 3 cosas que el banco sí leyó de mi plan',
    ],
    tema: 'qué partes del plan de negocio mira de verdad un banco',
    detalle: 'preparé un documento muy completo y en la reunión el director fue directo a dos o tres números; el resto apenas lo hojeó',
    duda: '¿a los que habéis pasado por esto: qué os preguntaron? Quiero reforzar lo que de verdad miran en vez de escribir por escribir',
    tags: ['banco', 'plan de negocio', 'números'],
    etapas: ['buscando financiación'],
  },
  {
    cat: 'plan', minAno: 2016, maxAno: 2026,
    titulos: [
      'Proyecciones: ¿a 3 o a 5 años? ¿Y si me equivoco?',
      'Cómo de realistas deben ser las proyecciones',
      'Me invento las ventas del año 3 y lo sé',
    ],
    tema: 'la honestidad y el alcance de las proyecciones financieras',
    detalle: 'estoy haciendo las proyecciones y reconozco que a partir del segundo año casi todo es una suposición optimista por mi parte',
    duda: '¿cómo lo planteasteis vosotros para que fuera defendible? ¿Presentasteis varios escenarios o uno solo prudente?',
    tags: ['proyecciones', 'escenarios', 'finanzas'],
    etapas: ['preparando documentación'],
  },
  {
    cat: 'plan', minAno: 2017, maxAno: 2026,
    titulos: [
      'Validar la idea antes de pagar el plan: mi experiencia',
      'Primero validé la idea gratis, luego decidí sobre el plan',
      '¿Validasteis la idea antes de encargar el plan?',
    ],
    tema: 'la validación de la idea antes de invertir en un plan de negocio completo',
    detalle: 'antes de gastar en un plan completo quería saber si mi idea tenía sentido, así que la envié a validar primero',
    duda: '¿lo hicisteis así los que habéis encargado un plan? A mí me pareció lógico lo de validar antes de pagar, pero no sé si es lo habitual',
    tags: ['validación', 'plan de negocio', 'proceso'],
    etapas: ['idea'],
  },
  {
    cat: 'plan', minAno: 2015, maxAno: 2026,
    titulos: [
      'Cambió el local y tuve que rehacer medio plan',
      'Cuando la realidad te desmonta el plan: rehacer o ajustar',
      '¿Cuántas veces reescribisteis vuestro plan?',
    ],
    tema: 'la necesidad de rehacer el plan cuando cambian las condiciones',
    detalle: 'tenía el plan casi cerrado para un local y al final se cayó la operación; el nuevo local que me ofrecen es más pequeño y en otra zona',
    duda: '¿rehicisteis el plan entero o ajustasteis las partes afectadas? Me da una pereza enorme pero supongo que no queda otra',
    tags: ['plan de negocio', 'cambios', 'local'],
    etapas: ['preparando documentación'],
  },
  // === HOSTELERÍA ==========================================================
  {
    cat: 'hosteleria', minAno: 2014, maxAno: 2026,
    titulos: [
      'Licencia de apertura de un bar: tiempos reales',
      '¿Cuánto os tardó la licencia de apertura?',
      'La licencia me está retrasando toda la apertura',
    ],
    tema: 'los plazos reales de la licencia de apertura en hostelería',
    detalle: 'tengo el local, el proyecto y el dinero, pero la licencia de apertura lleva meses y no avanza',
    duda: '¿cuánto os tardó a vosotros en vuestra ciudad? ¿Contratasteis a un técnico que os agilizara el tema o lo llevasteis por vuestra cuenta?',
    tags: ['licencia', 'apertura', 'ayuntamiento'],
    etapas: ['en marcha', 'negociando'],
  },
  {
    cat: 'hosteleria', minAno: 2015, maxAno: 2026,
    titulos: [
      'Traspaso con deudas ocultas: cómo os protegisteis',
      'Me ofrecen un traspaso y temo deudas escondidas',
      'El bar que quiero traspasar debe dinero a proveedores',
    ],
    tema: 'el riesgo de las deudas ocultas en un traspaso de hostelería',
    detalle: 'estoy negociando el traspaso de un bar y me huele que el dueño debe dinero a proveedores y quizá al arrendador',
    duda: '¿cómo os asegurasteis vosotros antes de firmar? ¿Pedisteis certificados, metisteis cláusulas, retuvisteis parte del precio?',
    tags: ['traspaso', 'deudas', 'bar'],
    etapas: ['negociando'],
  },
  {
    cat: 'hosteleria', minAno: 2016, maxAno: 2026,
    titulos: [
      'Carta corta o carta larga: qué os funciona',
      'Reduje la carta a la mitad y mejoró todo',
      'Demasiados platos en carta: cómo recortar sin quejas',
    ],
    tema: 'la longitud de la carta y su efecto en los costes',
    detalle: 'tengo una carta de más de 30 referencias y el desperdicio y los tiempos de cocina se me están yendo de las manos',
    duda: '¿cómo recortasteis la carta sin que los clientes se quejaran? ¿Lo hicisteis de golpe o poco a poco?',
    tags: ['carta', 'costes', 'cocina'],
    etapas: ['en marcha'],
  },
  {
    cat: 'hosteleria', minAno: 2019, maxAno: 2026,
    titulos: [
      'Café de especialidad en un bar de barrio: ¿encaja?',
      'Diferenciarse con brunch y café de especialidad',
      '¿Merece la pena invertir en café de especialidad?',
    ],
    tema: 'la diferenciación mediante café de especialidad o brunch',
    detalle: 'mi cafetería está en un barrio normal y me planteo diferenciarme con café de especialidad y algo de brunch en vez de competir por el menú barato',
    duda: '¿alguien lo ha probado en zona no turística? Me da miedo que el cliente de toda la vida no lo entienda y el nuevo no llegue',
    tags: ['café de especialidad', 'brunch', 'diferenciación'],
    etapas: ['en marcha', 'idea'],
  },
  {
    cat: 'hosteleria', minAno: 2014, maxAno: 2026,
    titulos: [
      'Terraza: cuánto cuesta y cuánto da',
      'La terraza me pide el ayuntamiento un pastón, ¿compensa?',
      'Rentabilidad de la terraza: números',
    ],
    tema: 'la rentabilidad real de la terraza frente a sus tasas',
    detalle: 'el ayuntamiento me pide una tasa considerable por cuatro mesas en la acera y estoy calculando si me compensa',
    duda: '¿cómo valorasteis vosotros si la terraza os salía rentable? ¿Contasteis solo el verano o todo el año?',
    tags: ['terraza', 'tasas', 'rentabilidad'],
    etapas: ['en marcha', 'idea'],
  },
  {
    cat: 'hosteleria', minAno: 2015, maxAno: 2026,
    titulos: [
      'Bar en pueblo turístico: vivir de 4 meses al año',
      'Estacionalidad brutal: cómo sobrevivís el invierno',
      'Negocio de temporada: cómo cuadráis el año',
    ],
    tema: 'la gestión de la estacionalidad en zonas turísticas',
    detalle: 'mi negocio está en una zona costera donde el 70 % de la facturación se hace entre junio y septiembre',
    duda: '¿cómo lo gestionáis los de temporada? ¿Cerráis en invierno, reducís, buscáis otro ingreso complementario?',
    tags: ['estacionalidad', 'turismo', 'temporada'],
    etapas: ['en marcha'],
  },
  // === FRANQUICIAS =========================================================
  {
    cat: 'franquicias', minAno: 2014, maxAno: 2026,
    titulos: [
      'Franquicias por menos de 15.000 €: ¿cuáles conocéis?',
      'Busco franquicia de baja inversión: experiencias',
      '¿Existen franquicias serias de baja inversión?',
    ],
    tema: 'las franquicias de baja inversión inicial',
    detalle: 'mi presupuesto total no pasa de 15.000 € y me gustaría saber qué franquicias serias hay en ese rango, porque la mayoría se van muy por encima',
    duda: '¿alguien opera una franquicia de baja inversión? Me interesa si el soporte de la central es real o te dejan solo tras pagar el canon',
    tags: ['baja inversión', 'franquicia', 'presupuesto'],
    etapas: ['idea', 'comparando'],
  },
  {
    cat: 'franquicias', minAno: 2014, maxAno: 2026,
    titulos: [
      'Preguntar a franquiciados actuales: cómo lo hicisteis',
      'Antes de firmar: hablad con franquiciados, no solo con la central',
      'Cómo comprobé la rentabilidad real de una franquicia',
    ],
    tema: 'la comprobación de la rentabilidad real hablando con franquiciados',
    detalle: 'la central me ha dado unos números muy bonitos pero quiero hablar con franquiciados reales antes de creerme nada',
    duda: '¿cómo los localizasteis y qué les preguntasteis? No sé si llegar a una tienda y preguntar al dueño es bien visto o raro',
    tags: ['franquiciados', 'rentabilidad', 'comprobación'],
    etapas: ['comparando'],
  },
  {
    cat: 'franquicias', minAno: 2015, maxAno: 2026,
    titulos: [
      'Exclusividad de zona: ¿qué os garantizaron por escrito?',
      'Mi franquicia abrió otro local a 2 km del mío',
      'Zona de exclusividad: la letra pequeña importa',
    ],
    tema: 'la exclusividad de zona en el contrato de franquicia',
    detalle: 'estoy negociando con una franquicia y de palabra me prometen exclusividad en mi ciudad, pero en el contrato no aparece con esa claridad',
    duda: '¿qué os pusieron por escrito a los que sois franquiciados? ¿Radio en kilómetros, población, nada? Quiero saber qué es lo normal antes de firmar',
    tags: ['exclusividad', 'contrato', 'zona'],
    etapas: ['comparando', 'negociando'],
  },
  {
    cat: 'franquicias', minAno: 2016, maxAno: 2026,
    titulos: [
      'Salirse de una franquicia: ¿alguien lo ha hecho?',
      'Quiero salir de mi franquicia antes de que acabe el contrato',
      'Cláusula de salida en franquicia: mi experiencia',
    ],
    tema: 'la salida anticipada de un contrato de franquicia',
    detalle: 'llevo dos años con una franquicia que no me da lo prometido y el contrato es de cinco',
    duda: '¿alguien ha negociado una salida anticipada? Me interesa si la central suele facilitarlo o si te agarras a la penalización y punto',
    tags: ['salida', 'contrato', 'penalización'],
    etapas: ['en marcha'],
  },
  {
    cat: 'franquicias', minAno: 2014, maxAno: 2026,
    titulos: [
      'Franquicia en ciudad pequeña: ¿cuáles funcionan?',
      'Mi ciudad tiene 40.000 habitantes: ¿qué franquicia encaja?',
      'Franquicias que sí funcionan fuera de las capitales',
    ],
    tema: 'la elección de franquicia en ciudades pequeñas o medianas',
    detalle: 'mi ciudad tiene unos 40.000 habitantes y muchas franquicias que me gustan piden poblaciones mínimas más grandes',
    duda: '¿qué formatos habéis visto funcionar en ciudades así? ¿Mejor alimentación, servicios, estética? Acepto ideas y también avisos',
    tags: ['ciudad pequeña', 'población mínima', 'formato'],
    etapas: ['idea', 'comparando'],
  },
  {
    cat: 'franquicias', minAno: 2017, maxAno: 2026,
    titulos: [
      'Franquicia o licencia de marca: diferencias reales',
      '¿Licencia de marca? Me la venden como franquicia',
      'Lo que me ofrecen no parece una franquicia al uso',
    ],
    tema: 'la diferencia entre una franquicia y una licencia de marca',
    detalle: 'una cadena me ofrece "asociarme" usando su marca, pero sin canon de entrada ni royalties claros, y no sé si eso es una franquicia u otra figura',
    duda: '¿alguien conoce la diferencia práctica? Me preocupa quedarme sin las protecciones que entiendo que tiene el franquiciado',
    tags: ['licencia de marca', 'contrato', 'dudas'],
    etapas: ['comparando'],
  },
  // === COMERCIO ============================================================
  {
    cat: 'comercio', minAno: 2014, maxAno: 2026,
    titulos: [
      'Stock inicial: ¿cómo calculasteis cuánto comprar?',
      'No sé cuánto stock comprar para abrir',
      'Me pasé comprando stock y ahora sobra la mitad',
    ],
    tema: 'el cálculo del stock inicial de una tienda',
    detalle: 'abro mi tienda en unos meses y el proveedor me hace mejor precio si compro mucho, pero me da miedo inmovilizar el dinero en producto que no rote',
    duda: '¿cómo calculasteis vuestro stock inicial? ¿Fuisteis conservadores y reponíais rápido o aprovechasteis las rebajas por volumen?',
    tags: ['stock', 'proveedores', 'apertura'],
    etapas: ['idea', 'en marcha'],
  },
  {
    cat: 'comercio', minAno: 2014, maxAno: 2026,
    titulos: [
      '¿Dónde encontráis proveedores fiables?',
      'Proveedores para tienda de barrio: ferias, online, mayoristas',
      'Mis proveedores me fallan: cómo buscáis alternativas',
    ],
    tema: 'la búsqueda de proveedores fiables para una tienda pequeña',
    detalle: 'los mayoristas que conozco me tratan como al cliente número mil y quiero encontrar proveedores que cuiden más a una tienda pequeña',
    duda: '¿dónde los buscáis: ferias sectoriales, plataformas online, contacto directo con el fabricante? Cualquier vía que os haya funcionado me sirve',
    tags: ['proveedores', 'mayoristas', 'ferias'],
    etapas: ['en marcha', 'idea'],
  },
  {
    cat: 'comercio', minAno: 2015, maxAno: 2026,
    titulos: [
      'Fidelizar al cliente de barrio: qué os funciona',
      'Tarjetas de puntos en una tienda pequeña: ¿sí o no?',
      'Cómo hacéis que el cliente vuelva',
    ],
    tema: 'las técnicas de fidelización en el comercio de barrio',
    detalle: 'tengo clientes que vienen una vez y no vuelven, y sé que me sale mucho más barato que repitan que conseguir nuevos',
    duda: '¿qué os funciona: tarjeta de puntos, descuentos a vecinos, WhatsApp con novedades, simplemente el trato? Busco ideas aplicables a una tienda pequeña',
    tags: ['fidelización', 'clientes', 'barrio'],
    etapas: ['en marcha'],
  },
  {
    cat: 'comercio', minAno: 2016, maxAno: 2026,
    titulos: [
      'El escaparate: ¿cuánto importa de verdad?',
      'Renové el escaparate y noté el cambio',
      'Presupuesto para escaparate: ¿cuánto dedicáis?',
    ],
    tema: 'la importancia del escaparate para atraer clientes',
    detalle: 'mi tienda está en una calle de paso y tengo la sensación de que mucha gente pasa de largo porque el escaparate no dice nada',
    duda: '¿cuánto dedicáis de tiempo y dinero al escaparate? ¿Lo cambiáis a menudo? Notáis diferencia real cuando lo renováis',
    tags: ['escaparate', 'imagen', 'ventas'],
    etapas: ['en marcha'],
  },
  {
    cat: 'comercio', minAno: 2017, maxAno: 2026,
    titulos: [
      'Tienda física + online: cómo lo compagináis',
      'Monté la tienda online del negocio y casi no vende',
      '¿Merece la pena vender también online desde la tienda?',
    ],
    tema: 'la combinación de tienda física con venta online',
    detalle: 'tengo la tienda física funcionando y monté una web sencilla, pero el online apenas vende y me consume tiempo',
    duda: '¿a los que compagináis ambos canales: cómo le dedicáis tiempo al online sin descuidar la tienda? ¿Os compensa de verdad?',
    tags: ['online', 'multicanal', 'tiempo'],
    etapas: ['en marcha'],
  },
  {
    cat: 'comercio', minAno: 2014, maxAno: 2026,
    titulos: [
      '¿Abrís por las tardes? El debate de siempre',
      'Horario de tarde: ventas vs vida personal',
      'Cerré por las tardes y no pasó nada',
    ],
    tema: 'la decisión de abrir o no por las tardes',
    detalle: 'abro mañana y tarde como casi todos, pero las tardes venden muy poco y me estoy planteando cerrar',
    duda: '¿alguno habéis cerrado por las tardes? ¿Perdisteis clientes o acabaron viniendo por la mañana? Me interesa también el tema de la conciliación',
    tags: ['horarios', 'tardes', 'conciliación'],
    etapas: ['en marcha'],
  },
  // === ECOMMERCE ===========================================================
  {
    cat: 'ecommerce', minAno: 2015, maxAno: 2026,
    titulos: [
      'Primera tienda online: ¿qué plataforma elegisteis?',
      'Shopify, WooCommerce, PrestaShop: perdido entre opciones',
      'Qué plataforma me recomendáis para empezar a vender',
    ],
    tema: 'la elección de plataforma para la primera tienda online',
    detalle: 'quiero montar mi primera tienda online y entre Shopify, WooCommerce y PrestaShop no sé cuál elegir; cada comparativa dice una cosa',
    duda: '¿cuál usáis y por qué? Me interesa el coste total real (plugins, comisiones, mantenimiento), no solo la cuota que anuncian',
    tags: ['plataforma', 'shopify', 'woocommerce'],
    etapas: ['idea'],
  },
  {
    cat: 'ecommerce', minAno: 2016, maxAno: 2026,
    titulos: [
      'Publicidad online: ¿cuánto presupuesto para empezar?',
      'Me gasté 300 € en anuncios y vendí nada',
      'Meta Ads o Google Ads para un ecommerce pequeño',
    ],
    tema: 'el presupuesto inicial de publicidad para un ecommerce',
    detalle: 'he probado a poner anuncios con un presupuesto pequeño y los resultados han sido decepcionantes; no sé si es el anuncio, el producto o el presupuesto',
    duda: '¿cuánto os gastasteis al principio hasta encontrar anuncios rentables? ¿Y cómo supisteis cuándo parar una campaña que no funcionaba?',
    tags: ['publicidad', 'ads', 'presupuesto'],
    etapas: ['empezando', 'en marcha'],
  },
  {
    cat: 'ecommerce', minAno: 2017, maxAno: 2026,
    titulos: [
      'Las devoluciones me están matando',
      'Cómo gestionáis las devoluciones sin arruinaros',
      'Política de devoluciones: ¿generosa o estricta?',
    ],
    tema: 'la gestión de las devoluciones en un ecommerce pequeño',
    detalle: 'mi tasa de devoluciones está cerca del 20 % y entre el porte de vuelta y el producto que ya no puedo vender como nuevo, se me va el margen',
    duda: '¿qué política tenéis? ¿Cobráis la devolución, ponéis condiciones claras, regaláis algo a cambio de no devolver? Todo consejo es bienvenido',
    tags: ['devoluciones', 'margen', 'política'],
    etapas: ['en marcha'],
  },
  {
    cat: 'ecommerce', minAno: 2016, maxAno: 2026,
    titulos: [
      'SEO o redes sociales para las primeras ventas',
      'Llevo 6 meses con la tienda y el SEO no despega',
      '¿De dónde os llegaron las primeras ventas online?',
    ],
    tema: 'el origen de las primeras ventas de una tienda online',
    detalle: 'llevo unos meses con la tienda online abierta y las visitas apenas llegan; el SEO parece una carrera de fondo eterna',
    duda: '¿de dónde os llegaron a vosotros las primeras ventas: SEO, redes, boca a boca, marketplace? Necesito decidir dónde poner el esfuerzo',
    tags: ['SEO', 'redes sociales', 'primeras ventas'],
    etapas: ['empezando'],
  },
  {
    cat: 'ecommerce', minAno: 2018, maxAno: 2026,
    titulos: [
      'Vender en varios marketplaces a la vez: cómo lo lleváis',
      'Amazon, Miravia, web propia: demasiados frentes',
      'Sincronizar stock entre canales: qué herramientas usáis',
    ],
    tema: 'la venta simultánea en varios marketplaces y web propia',
    detalle: 'vendo en un marketplace y en mi web, y estoy pensando en abrir un segundo canal, pero ya me cuesta sincronizar el stock entre los dos',
    duda: '¿cómo lo gestionáis los que vendéis en varios sitios? ¿Herramientas de sincronización, stock separado, alguien que lo lleve?',
    tags: ['marketplaces', 'stock', 'multicanal'],
    etapas: ['en marcha', 'creciendo'],
  },
  {
    cat: 'ecommerce', minAno: 2015, maxAno: 2026,
    titulos: [
      'Vender online: ¿qué obligaciones fiscales tengo?',
      'Epígrafes y modelos al vender por internet',
      'Alta en hacienda para ecommerce: qué me pidieron',
    ],
    tema: 'las obligaciones fiscales básicas al vender por internet',
    detalle: 'voy a empezar a vender online y entre el alta, los epígrafes, el IVA trimestral y las facturas estoy un poco abrumado',
    duda: '¿qué os exigieron a vosotros al principio? ¿Lo lleváis con gestoría desde el día uno o empezasteis solos y luego delegasteis?',
    tags: ['fiscalidad', 'alta', 'IVA'],
    etapas: ['idea', 'empezando'],
  },
  // === SERVICIOS PROFESIONALES =============================================
  {
    cat: 'servicios', minAno: 2015, maxAno: 2026,
    titulos: [
      'Trabajar gratis para hacer cartera: ¿sí o no?',
      'Me piden trabajar "a cambio de visibilidad"',
      'Primeros trabajos gratis: dónde está el límite',
    ],
    tema: 'el debate sobre trabajar gratis al principio para conseguir cartera',
    detalle: 'estoy empezando como independiente y varias personas me han propuesto trabajar gratis o casi gratis "a cambio de visibilidad"',
    duda: '¿lo hicisteis alguna vez? ¿Os trajo clientes de verdad o solo más gente queriendo lo mismo gratis? Dónde pusisteis el límite',
    tags: ['cartera', 'trabajar gratis', 'empezar'],
    etapas: ['empezando'],
  },
  {
    cat: 'servicios', minAno: 2016, maxAno: 2026,
    titulos: [
      'Clientes que no pagan: cómo lo gestionáis',
      'Llevo 4 meses persiguiendo una factura',
      'Cobrar por adelantado: ¿cómo lo planteáis?',
    ],
    tema: 'la gestión de clientes que no pagan en los servicios',
    detalle: 'un cliente me debe una factura desde hace meses y siempre tiene una excusa nueva; es una cantidad que para mí importa',
    duda: '¿cómo lo prevenís: cobro por adelantado, contrato firmado, señal del 50 %? Y si ya ha pasado, ¿qué vía os funcionó para cobrar?',
    tags: ['impagos', 'facturas', 'clientes'],
    etapas: ['en marcha'],
  },
  {
    cat: 'servicios', minAno: 2017, maxAno: 2026,
    titulos: [
      'Subcontratar cuando no llegas: cómo lo hicisteis',
      'Me sobra trabajo: ¿subcontrato o subo precios?',
      'Primer colaborador: miedo a que la calidad baje',
    ],
    tema: 'la decisión de subcontratar cuando el trabajo supera tu capacidad',
    detalle: 'estoy rechazando encargos porque no doy abasto, y me planteo subcontratar parte del trabajo por primera vez',
    duda: '¿cómo lo hicisteis sin que se resienta la calidad ni el trato con el cliente? ¿Le contasteis al cliente que parte la hacía otra persona?',
    tags: ['subcontratar', 'crecer', 'calidad'],
    etapas: ['creciendo'],
  },
  {
    cat: 'servicios', minAno: 2015, maxAno: 2026,
    titulos: [
      'Presupuesto por horas o por proyecto cerrado',
      'El cliente siempre quiere "una cosita más": alcance',
      'Cómo cerráis el alcance de un proyecto',
    ],
    tema: 'la definición del alcance al presupuestar un proyecto',
    detalle: 'presupuesto por proyecto y me pasa que el cliente va pidiendo pequeños extras que al final duplican el trabajo',
    duda: '¿cómo definís el alcance para que no se desmadre? ¿Documento firmado, tarifa de extras, revisiones limitadas? Acepto plantillas mentales',
    tags: ['alcance', 'presupuesto', 'extras'],
    etapas: ['en marcha'],
  },
  {
    cat: 'servicios', minAno: 2018, maxAno: 2026,
    titulos: [
      'Subir las tarifas a clientes antiguos: cómo lo comunicáis',
      'Llevo 3 años sin subir precios y ya toca',
      'Miedo a perder clientes si subo las tarifas',
    ],
    tema: 'la subida de tarifas a clientes antiguos',
    detalle: 'llevo años sin subir precios a mis clientes de siempre y mis costes han subido mucho; sé que toca pero me da miedo perderlos',
    duda: '¿cómo lo comunicasteis? ¿Aviso con meses, subida escalonada, mantener precio a los fieles? Cuenten sus experiencias, por favor',
    tags: ['tarifas', 'subida', 'clientes'],
    etapas: ['en marcha'],
  },
  // === AUTÓNOMOS, LICENCIAS Y APERTURA =====================================
  {
    cat: 'autonomos', minAno: 2014, maxAno: 2026,
    titulos: [
      'Gestoría: ¿cuánto pagáis al mes y qué os incluye?',
      '¿Merece la pena la gestoría o lo lleváis vosotros?',
      'Cambié de gestoría y fue la mejor decisión',
    ],
    tema: 'el coste y el valor real de la gestoría para un autónomo',
    detalle: 'pago una cuota mensual a mi gestoría y tengo la sensación de que solo me presentan los modelos y poco más',
    duda: '¿cuánto pagáis vosotros y qué os incluye? ¿Os asesoran de verdad o solo cumplimentan papeles? Estoy pensando en cambiar',
    tags: ['gestoría', 'cuota', 'asesoramiento'],
    etapas: ['en marcha'],
  },
  {
    cat: 'autonomos', minAno: 2014, maxAno: 2026,
    titulos: [
      'Alta de autónomo: qué me hubiera gustado saber',
      'Errores al darse de alta de autónomo',
      'Me di de alta y ya la lié con los epígrafes',
    ],
    tema: 'los errores típicos al darse de alta como autónomo',
    detalle: 'me di de alta hace poco y ya sospecho que elegí mal un epígrafe, con lo que puede implicar para las deducciones',
    duda: '¿qué errores cometisteis vosotros al alta? Me sirve cualquier aviso: epígrafes, fechas, bases de cotización, lo que sea',
    tags: ['alta', 'epígrafes', 'errores'],
    etapas: ['empezando'],
  },
  {
    cat: 'autonomos', minAno: 2015, maxAno: 2026,
    titulos: [
      'Licencia de apertura: qué os pidieron en vuestra ciudad',
      'El ayuntamiento me pide proyecto técnico para una oficina',
      'Declaración responsable vs licencia: cómo va en vuestra zona',
    ],
    tema: 'los requisitos de la licencia de apertura según la ciudad',
    detalle: 'para una pequeña oficina me piden más documentación de la que esperaba y en el ayuntamiento cada funcionario me dice una cosa',
    duda: '¿cómo fue en vuestra ciudad: declaración responsable y a abrir, o licencia con proyecto técnico y meses de espera? Sé que varía, pero me orienta',
    tags: ['licencia', 'apertura', 'ayuntamiento'],
    etapas: ['preparando documentación'],
  },
  {
    cat: 'autonomos', minAno: 2016, maxAno: 2026,
    titulos: [
      'Deducir el coche, la luz y el móvil: qué os aceptan',
      'Deducciones de autónomo: lo que me deduzco y lo que no',
      'Mi gestor me dice que no me fie de las deducciones de internet',
    ],
    tema: 'las deducciones habituales del autónomo que sí pasan y las que no',
    detalle: 'leo en internet que se puede deducir de todo y mi gestor me baja a la tierra diciéndome que Hacienda mira mucho ciertas cosas',
    duda: '¿qué os deducís vosotros con tranquilidad: coche, parte de la luz de casa, móvil, comidas? Prefiero experiencias reales a teoría de foros',
    tags: ['deducciones', 'IRPF', 'gestor'],
    etapas: ['en marcha'],
  },
  {
    cat: 'autonomos', minAno: 2017, maxAno: 2026,
    titulos: [
      'Pasar de autónomo a SL: en qué momento lo hicisteis',
      '¿A partir de qué facturación os pasasteis a SL?',
      'Autónomo que factura bien: ¿me compensa la SL?',
    ],
    tema: 'el momento de pasar de autónomo a sociedad limitada',
    detalle: 'mi facturación ha crecido bastante y el gestor me sugiere valorar el paso a SL, pero conlleva más costes y más obligaciones',
    duda: '¿en qué momento disteis el paso los que lo hicisteis? ¿Os compensó fiscalmente o fue más por imagen y responsabilidad limitada?',
    tags: ['SL', 'autónomo', 'fiscalidad'],
    etapas: ['creciendo'],
  },
]

// ---------------------------------------------------------------------------
// RESPUESTAS. El motor combina: [apertura?] + núcleo + [matiz?]
// Los núcleos genéricos sirven para cualquier categoría; los de categoría
// aportan experiencia concreta del tema.
// ---------------------------------------------------------------------------

export const APERTURAS = [
  'A mí me pasó algo parecido',
  'Paso a contar mi experiencia por si sirve',
  'Buenas, te cuento cómo lo vi yo',
  'Me ha recordado a mi caso',
  'Te hablo desde mi experiencia, que cada caso es un mundo',
  'Anduve hace tiempo en una situación parecida',
  'No soy experto, pero esto me suena',
  'Justo pasé por esto hace un tiempo',
  'Llevo años en esto y te digo lo que veo',
  'Me pico, porque yo también dudé con eso',
  '',
  '',
  '',
  '',
]

export const MATICES = [
  'Pero ya te digo, cada caso es distinto.',
  'Tómalo como orientación, no como verdad absoluta.',
  'Aun así, confírmalo con quien corresponda, que las cosas cambian.',
  'Eso sí, esto fue en mi zona; en otra parte puede variar.',
  'Si te sirve de referencia, bien; si no, descártalo sin problema.',
  'Ya nos contarás cómo te fue.',
  'Ánimo con ello, que preguntar antes ya es buena señal.',
  'Espero que te oriente un poco.',
  'Si me equivoco en algo, que me corrijan.',
  'En mi caso fue así, pero el tuyo puede ser distinto.',
  '',
  '',
  '',
]

// Núcleos genéricos (valen para cualquier hilo)
export const NUCLEOS_GENERICOS = [
  'yo al final lo que hice fue pedir toda la documentación por escrito antes de comprometerme a nada, y me quitó bastantes sustos',
  'mi consejo es que no te guíes solo por lo que te digan de palabra: que te lo den por escrito o no cuenta',
  'en mi caso la clave fue hacer números pesimistas, no optimistas; si con los pesimistas aguanta, adelante',
  'yo perdí dinero por no preguntar lo suficiente al principio, así que vas bien haciendo estas preguntas',
  'lo que a mí me funcionó fue hablar con dos o tres personas que ya hubieran pasado por lo mismo, no solo con uno',
  'no te dejes llevar por las prisas del otro lado; si te meten prisa para firmar, suele ser mala señal',
  'yo compararía al menos tres opciones antes de decidir, que la primera que te presentan siempre parece la mejor',
  'mira bien la letra pequeña, que ahí es donde está siempre lo importante',
  'en estos temas lo barato a veces sale caro y lo caro a veces es humo; toca mirar qué incluye cada cosa',
  'yo empecé más pequeño de lo que quería y fue lo mejor: aprendes sin jugarte todo',
  'guarda siempre un colchón para los imprevistos, porque imprevistos habrá seguro',
  'no subestimes los plazos de la administración: calcula el doble de lo que te dicen y no andarás lejos',
  'a mí me sirvió mucho hacer una lista de todo lo que podía salir mal y pensar cómo lo cubriría',
  'mi experiencia es que la documentación bien preparada te ahorra la mitad de los problemas',
  'yo me lancé con más ilusión que análisis y me costó caro; desde entonces, primero números y luego emoción',
  'si el negocio depende solo de ti, piensa qué pasa si te pones enfermo dos meses; eso aclara mucho las ideas',
  'en mi caso pedir cita y hablar directamente con la oficina correspondiente me aclaró más que mil páginas de internet',
  'yo te diría que no firmes nada sin dormirlo al menos una semana',
  'lo importante es saber cuánto puedes perder sin que te hunda; si lo sabes, decides con más calma',
  'mejor empezar con algo aburrido que da dinero que con algo bonito que no lo da, digo yo',
  'los primeros meses casi nadie te lo cuenta, pero son de probar y corregir, no de acertar a la primera',
  'yo hice números con tres escenarios y al final la realidad se pareció al intermedio, curiosamente',
  'desconfía de quien te garantice resultados; en esto nadie serio garantiza nada',
  'en mi experiencia, quien te dice la verdad aunque no te guste vale oro; quien te dice lo que quieres oír, cuidado',
]

// Núcleos por categoría
export const NUCLEOS_CAT: Record<CategoriaForo, string[]> = {
  paro: [
    'yo capitalicé hace años y el trámite en el SEPE fue más sencillo de lo que temía; lo que más tardó fue que me aceptaran la memoria, que la tuve que corregir una vez',
    'en mi caso el pago único tardó unos dos meses desde que presenté todo en el SEPE, pero he visto compañeros a los que les tardó más del doble',
    'lo del pago único tiene una trampa: te lo dan de golpe pero luego tributa en la renta, tenlo en cuenta para los números',
    'yo pedí cita en la oficina de empleo con toda la documentación preparada y me resolvieron las dudas al momento; mejor que leer foros, la verdad',
    'a mí me denegaron la primera solicitud por un fallo en la memoria; la corregí, la volví a presentar y salió, así que no te asustes si pasa',
    'lo que nadie te dice del pago único es que dejas de cobrar el paro, claro, así que calcula bien tus meses de autonomía',
    'yo lo compaginé al principio con un trabajillo a media jornada y pregunté antes en el SEPE si era compatible; en mi caso sí, pero confírmalo porque depende',
    'mi consejo: la memoria que presentes para capitalizar hazla bien, no vale un documento de dos páginas con cuatro números',
    'en mi comunidad además del pago único había una ayuda complementaria que casi no publicitan; pregunta en tu oficina de empleo por si acaso',
    'yo capitalicé para una SL con mi socio y sí, cada uno pidió su pago único como aportación; el trámite fue un poco más largo pero se hizo',
    'toda la info oficial está en la web del SEPE, en la sección de capitalización; yo imprimí los requisitos y fui tachando lo que ya tenía',
  ],
  ayudas: [
    'a mí me concedieron una ayuda autonómica y entre resolución y cobro pasaron casi diez meses; haz la inversión como si la ayuda no existiera',
    'mi experiencia con las subvenciones: la concesión es lo fácil, lo delicado es justificar después cada factura dentro de plazo',
    'yo me enteré de la convocatoria porque me apunté al boletín de mi comunidad; si no, ni me entero',
    'una cosa que aprendí: no compres nada antes de la fecha de solicitud, que muchas ayudas solo cubren gastos posteriores',
    'en mi caso la ayuda pedía estar al corriente con Hacienda y Seguridad Social; me faltaba un papel y casi me quedo fuera por eso',
    'las ayudas de mi ayuntamiento eran pequeñas pero rápidas; las de la comunidad, mayores pero eternas, yo acabé pidiendo las dos',
    'ojo con las incompatibilidades: algunas convocatorias no te dejan sumar otra ayuda para el mismo gasto, léete bien las bases',
    'yo presenté la documentación con una memoria bien hecha y creo que eso pesó en la valoración; no era solo rellenar el formulario',
    'las que dependen de fondos europeos tienen mucha justificación después; merece la pena si el importe compensa el trabajo',
    'a mí una gestora me ayudó con la solicitud y me cobró un porcentaje; no me pareció mal trato, pero pregunta precio antes',
    'el Kit Digital lo pedí por la web oficial en una mañana; lo único tedioso fue esperar a que me asignaran el agente digitalizador',
  ],
  financiacion: [
    'el banco me miró sobre todo dos cosas: cuánto ponía yo de mi bolsillo y si las proyecciones eran defendibles; lo demás, secundario',
    'yo conseguí el préstamo a la tercera entidad; las dos primeras me dijeron que no sin casi mirarlo, no te desanimes con el primer no',
    'en mi caso pedir cita con el director y llevar el plan impreso, defendido número a número, cambió por completo la conversación',
    'la línea ICO la tramité a través de mi banco, no directamente; el banco decide al final, el ICO solo aporta el dinero',
    'yo evité el aval personal con una sociedad de garantía recíproca de mi comunidad; cobran una comisión, pero mi familia se quedó fuera',
    'los microcréditos los miré y en mi caso el importe máximo se quedaba corto, pero el trato era más humano que en el banco',
    'lo que me enseñó mi gestor: al banco no le presentes el mejor escenario, preséntale uno prudente y explícale por qué es prudente',
    'a mí me pidieron aval por una cantidad pequeña y negocié una fianza en su lugar; todo se negocia, aunque no lo parezca',
    'la póliza de crédito me salvó en los meses flojos, pero ojo: se paga por lo dispuesto y por lo no dispuesto, mira las comisiones',
    'yo comparé cuatro bancos y las diferencias eran enormes; el banco de toda la vida no fue el que mejor me trató, curiosamente',
    'mi experiencia: la caja rural de mi zona me trató mejor que los bancos grandes; me conocían de antes y miraron el proyecto, no solo el scoring',
    'al revés también pasa: a mí me lo dio un banco online sin conocerme de nada, solo con el plan bien hecho; así que prueba varios perfiles de entidad',
  ],
  plan: [
    'yo pagué unos 150 € por el plan con una empresa online y la diferencia con la plantilla se notaba: me hicieron preguntas sobre mi zona y mis números que yo solo no me habría hecho',
    'mi gestor me hizo una memoria rapidísima para el paro y sirvió para el trámite, pero cuando fui al banco me pidieron justificar cada cifra y no supe; ahí entendí la diferencia',
    'lo que más me aportó el plan profesional no fue el documento, fue la conversación: me desmontaron dos ideas que yo daba por buenas',
    'yo lo hice con una plantilla y me valió para una ayuda pequeña; para el préstamo grande, en cambio, tuve que hacerlo en serio con ayuda',
    'en mi caso me hicieron el plan por unos 250 € y me incluyeron un escenario pesimista que fue justo el que me preguntó el banco',
    'yo validé la idea antes de pagar nada y me ahorré un disgusto: los números no aguantaban y lo supe antes de firmar el local',
    'el plan lo hice por mi cuenta y no me avergüenza decirlo, pero reconozco que las proyecciones me las tuvo que corregir alguien que entendía',
    'mi consejo: quien te haga el plan que te pregunte mucho antes de escribir; si no te pregunta nada, el plan será genérico y se notará',
    'a mí me sirvió más para ordenarme yo que para el banco: descubrí que no había pensado en la mitad de los costes',
    'yo pregunté en tres sitios y había de todo: desde los 600 € de una gestoría por cuatro folios hasta opciones más serias por mucho menos; compara qué incluye cada uno',
    'al final lo hice con PlanCrece porque primero me validaron la idea gratis y solo pagué cuando vi que tenía sentido; el plan llegó sin logos ni nada, lo presenté como mío y en el banco ni preguntaron',
    'me pareció caro en su momento y casi no lo pago, pero la entrevista previa que me hicieron me cambió tres cosas del negocio, así que lo amorticé antes de empezar',
  ],
  hosteleria: [
    'antes de firmar el local, yo estuve dos semanas contando gente a diferentes horas delante del sitio; un Excel cutre que me evitó un local malo',
    'en el traspaso pedí tres años de declaraciones y las cuentas del negocio real; el dueño se puso nervioso y ahí supe que algo había',
    'la licencia de apertura me tardó ocho meses; contraté a un técnico desde el principio y aun así fue lento, empieza cuanto antes',
    'yo reduje la carta de 40 platos a 15 y subió el ticket medio; el cliente no echa de menos lo que no ve',
    'el coste de personal en hostelería es el monstruo de siempre; yo cuadré horarios con las horas de verdad fuertes y recorté las horas muertas',
    'mi barrio no entendió el café de especialidad al principio; lo que funcionó fue mantener el café de siempre y ofrecer el otro como opción',
    'la terraza me compensa de mayo a octubre; el resto del año la pago por mantener el sitio, pero con esos meses ya sale',
    'en temporada alta vivo de lo que facturo en cuatro meses; el truco está en no gastar en agosto como si fuera agosto todo el año',
    'yo negocié el traspaso con una parte del precio retenida hasta comprobar que no había deudas; el vendedor aceptó y dormí tranquilo',
    'con la falta de personal acabé reduciendo un servicio entre semana; duele, pero menos que quemar al equipo que tienes',
  ],
  franquicias: [
    'prefiero no decir cuál es por las normas del foro, pero te cuento los números y las cláusulas, que es lo importante',
    'me preguntarás cuál era; no puedo decirlo aquí (normas del foro), pero te digo el sector y lo que miré, que es lo que de verdad sirve',
    'yo hablé con tres franquiciados de la marca antes de decidir; uno me abrió los ojos sobre costes que la central no mencionaba',
    'la exclusividad de zona me la dieron de palabra y pedí que la pusieran por escrito con kilómetros concretos; si no, no vale',
    'lo del royalty fijo aunque vendas poco fue lo que me hizo descartar una; mira siempre qué pasa en un mes malo',
    'yo estuve a punto y eché pie atrás por las cláusulas de salida; el contrato lo leí con un abogado y fue el dinero mejor gastado',
    'en mi ciudad pequeña lo que veo funcionar es alimentación y servicios; los formatos de moda necesitan más población de la que tenemos',
    'la central me prometía soporte continuo y al tercer mes ya no contestaban; pregunta a franquiciados actuales cómo es el soporte real',
    'yo descarté la franquicia y monté algo propio; no digo que sea mejor, digo que hay que comparar lo que de verdad te aporta la marca',
    'las franquicias sin local que miré dependían mucho de que tú mismo captaras clientes; si no se te da bien vender, piénsalo',
    'fíjate en la antigüedad de la cadena y en cuántos locales cierran al año, no solo en cuántos abren; ese dato pídelo siempre',
    'el canon bajo con royalty alto me salió más caro a cinco años que el canon alto sin royalty; haz la cuenta a largo plazo',
  ],
  comercio: [
    'mi tienda sobrevive por el trato y por cosas que Amazon no da: probar, llevarse el producto al momento y fiado a los de siempre',
    'el stock inicial lo calculé para dos meses de venta prevista y fui reponiendo; me quedé corto en dos cosas y sobrado en otras diez',
    'los proveedores buenos los encontré en una feria sectorial; online solo encontraba intermediarios que encarecían todo',
    'cerré por las tardes hace dos años y las ventas apenas bajaron; la gente vino por la mañana y yo gané vida',
    'el WhatsApp con novedades a los clientes de siempre me funciona mejor que cualquier red social; es cutre pero efectivo',
    'renovamos el escaparate cada mes y medio y se nota; cuando lo dejamos mucho tiempo, entra menos gente, medido',
    'yo vendo también online y me da un 15 % extra; no me hace rico pero amortiza el local, que ya es',
    'mi consejo: negocia con proveedores el plazo de pago más que el precio; pagar a 60 días vale más que un 2 % de descuento',
    'el primer año en una tienda es de supervivencia pura; si aguantas y ajustas, el segundo ya es otra cosa',
    'yo me especialicé en un nicho concreto en vez de competir en todo; menos clientes potenciales pero míos de verdad',
  ],
  ecommerce: [
    'empecé con WooCommerce porque no quería cuota mensual; con los plugins al final pago casi lo mismo, ojo con la cuenta total',
    'los primeros anuncios los quemé aprendiendo; calcula unos 500 € de "matrícula" hasta que encuentras qué funciona',
    'las devoluciones las bajé poniendo fotos reales y medidas exactas; la mitad eran por expectativas mal puestas',
    'el SEO me empezó a traer ventas al año de abrir; las primeras llegaron de Instagram y del boca a boca, no de Google',
    'vendo en marketplace y web propia; el marketplace da volumen y la web da margen, necesito los dos',
    'sincronizo el stock con una herramienta barata; antes vendía cosas que no tenía y era un desastre de reseñas',
    'el envío gratis lo pongo a partir de un importe que sube el ticket medio; debajo de eso, el cliente paga el porte y no pasa nada',
    'la gestoría me lleva el IVA y los modelos desde el día uno; en ecommerce el papeleo crece rápido y no compensa pelearlo solo',
    'probé a vender en un segundo marketplace y me canibalizó el primero; más canales no siempre son más ventas',
    'las fichas de producto bien escritas me subieron la conversión más que cualquier anuncio; es aburrido pero funciona',
  ],
  servicios: [
    'trabajé gratis exactamente dos veces al principio y me trajo cero clientes; lo que sí funcionó fue hacerlo barato pero cobrando',
    'desde que cobro el 50 % por adelantado, los impagos casi han desaparecido; el que no quiere adelantar nada, ya te está avisando',
    'el contrato con alcance cerrado me salvó: tres revisiones incluidas y a partir de ahí, tarifa de extras pactada',
    'subí tarifas un 15 % con dos meses de aviso y perdí un cliente de doce; los números salieron de sobra',
    'subcontraté a un conocido y definí por escrito qué esperaba de cada entrega; sin eso, la calidad baila',
    'al principio puse precios mirando a la competencia y me quedé bajo; ahora calculo mis costes y decido el margen que necesito',
    'los primeros clientes me llegaron de antiguos compañeros de trabajo; cuenta a todo el mundo lo que haces, aunque te dé vergüenza',
    'mi error fue no firmar nada con un cliente "de confianza"; ahora firmo hasta los trabajos de 200 €',
    'el pack de horas me da estabilidad con dos clientes; el resto lo dejo por proyecto, que se valora mejor el trabajo',
    'cuando no llego, subo precios antes de subcontratar; es mi filtro natural y funciona sorprendentemente bien',
  ],
  autonomos: [
    'pago unos 60 € al mes de gestoría y me incluyen modelos, nóminas y consultas; lo barato que probé antes me salió caro en sustos',
    'me equivoqué de epígrafe al alta y fue un lío cambiarlo; míralo bien antes, que parece una tontería y no lo es',
    'en mi ciudad fue declaración responsable y abrí a la semana; a 30 km de aquí piden proyecto técnico, así que pregunta en tu ayuntamiento',
    'el coche me lo deduzco parcialmente y con facturas guardadas; mi gestor me dijo: dedúcete lo que puedas defender, no lo máximo posible',
    'me pasé a SL al superar cierta facturación y fiscalmente compensó, pero el papeleo se multiplicó; que te hagan números antes',
    'la tarifa plana me vino de lujo los dos primeros años; lee bien las condiciones porque pedirla tarde o mal te la quita',
    'con lo de los ingresos reales regularicé a final de año y me devolvieron; la cuota mensual la tengo baja y luego se ajusta',
    'la gestoría me avisa de deducciones que no conocía; si la tuya solo presenta modelos, quizá te toca cambiar',
    'al alta me urgía y la hice mal; mejor perder una semana preguntando que meses corrigiendo',
    'mi gestor me cobró una vez por un trámite que no necesitaba; desde entonces pido presupuesto cerrado de todo por escrito',
    'el alta en la Seguridad Social la hice online con certificado digital en veinte minutos; lo que me llevó tiempo fue elegir bien los epígrafes en Hacienda',
  ],
}

// Respuestas del autor dando seguimiento a su propio hilo
export const SEGUIMIENTOS_OP = [
  'Gracias a todos por las respuestas, me habéis dado bastante que pensar.',
  'Actualizo: al final fui a preguntar en persona y teníais razón, mejor confirmarlo directamente.',
  'Después de leeros he decidido esperar unos meses y prepararlo mejor. Gracias de verdad.',
  'Pues me habéis convencido de pedir varios presupuestos antes de decidir. Os iré contando.',
  'Gracias, sobre todo por los avisos; hay cosas que no había ni imaginado.',
  'Vuelvo por aquí meses después: seguí vuestros consejos y la cosa va avanzando. Mil gracias.',
  'Me quedo con lo de contrastarlo todo por escrito. Esta semana empiezo a llamar.',
  'La verdad, esperaba otra cosa, pero prefiero leer esto ahora que darme el golpe luego.',
]

// Desacuerdos educados (dan textura real, sin atacar)
export const DISENSOS = [
  'Con respeto, yo lo veo distinto: en mi caso salió mejor arriesgar pronto que prepararlo todo durante meses.',
  'No estoy del todo de acuerdo con lo que se dice arriba; a mí la opción barata me funcionó bien durante años.',
  'Mi experiencia fue justo la contraria, así que supongo que depende mucho del caso concreto.',
  'Permitidme matizar: eso puede valer en una ciudad grande, pero en zonas pequeñas la cosa cambia bastante.',
  'Yo lo hice por mi cuenta sin pagar a nadie y no me arrepiento; también es una opción válida, ¿no?',
  'Discrepo un poco: a veces tanto análisis paraliza, y hay negocios que solo se entienden abriéndolos.',
]

// Respuestas de "faltan datos"
export const FALTAN_DATOS = [
  'Para responderte bien harían falta más datos: ¿zona, presupuesto aproximado, experiencia en el sector?',
  'Depende mucho de tu ciudad y de cuánto capital tengas; si cuentas algo más, te puedo orientar mejor.',
  'Falta información importante: no es lo mismo con local que sin él, ni con socio que solo.',
  'Sin saber tu situación concreta es difícil decirte; cada comunidad y cada caso cambian bastante.',
]

// Correcciones sin atacar
export const CORRECCIONES = [
  'Un matiz a lo de arriba: eso cambió hace un tiempo, conviene mirar la norma actual y no la de hace años.',
  'Ojo, que eso que comentas ya no es exactamente así; yo lo confirmaría en la fuente oficial antes de fiarme.',
  'Solo corregir una cosa con educación: el plazo que dices no es igual en todas las comunidades.',
  'Pequeña precisión: eso depende de la forma jurídica, no es igual para autónomo que para SL.',
]

// Erratas leves, SOLO usuarios nuevos (alta reciente)
export const NUEVOS = [
  'holaa, yo estoy en las mismas la verdad, a ver si alguien nos aclara algo',
  'yo tambien tengo esa duda, gracias por abrir el hilo',
  'perdonar si digo una tonteria que soy nuevo, pero no seria mas facil preguntar directamente en la oficina?',
  'yo acabo de empezar con esto y no me entero de nada, os leo',
  'a mi me pasa igual, encima cada web dice una cosa distinta',
  'uff yo estoy igual, al final que hiciste?',
  'gracias por el hilo, me viene de perlas que estoy con lo mismo',
]

// Mención redactada por moderación (uso puntual, 1 vez en todo el foro)
export const REDACCION = [
  'la cadena era [mención a marca retirada por moderación], una de las que ves en todos los polígonos; el problema no era la marca sino el contrato',
]

// Notas de moderación (uso puntual: el motor las inserta en 1-2 hilos antiguos)
export const EQUIPO_MODERACION = [
  'Nota de moderación: hemos editado un comentario anterior para retirar la mención a una entidad comercial concreta, según las normas de la comunidad. La experiencia que contaba sigue siendo válida y la dejamos visible.',
  'Nota de moderación: se ha retirado una respuesta que recomendaba a un profesional concreto con datos de contacto. Aquí compartimos experiencias, no publicidad. Gracias por entenderlo.',
]

// Respuestas del Equipo PlanCrece: prudentes, sin prometer, CTA ocasional
export const EQUIPO_RESPUESTAS = [
  'Buenas. Desde aquí solo podemos dar orientación general: en estos casos lo sensato es confirmarlo con la administración correspondiente, porque los requisitos y plazos cambian. Si os sirve, lo que vemos con más frecuencia es que la documentación bien preparada desde el principio evita la mayoría de retrasos.',
  'Hola. Cada caso depende mucho de la comunidad autónoma y de la situación personal, así que no nos atrevemos a dar una respuesta cerrada. Sí os recomendamos pedir siempre la información por escrito y guardar copia de todo lo presentado.',
  'Buenas. Sin conocer el detalle (zona, inversión, experiencia) cualquier respuesta sería una aproximación. Como referencia general, los proyectos que mejor salen son los que validan los números antes de comprometer el local o la inversión.',
  'Hola. Nosotros no podemos garantizar que una ayuda o una financiación salgan, nadie serio puede. Lo que sí marca la diferencia, según lo vemos cada semana, es llegar con el plan bien defendido y con escenarios realistas.',
  'Buenas. Si os ayuda, en la web tenéis una validación de idea gratuita: no sustituye al análisis completo, pero orienta sobre si merece la pena seguir adelante antes de gastar nada. Sin compromiso, solo por si os viene bien.',
  'Hola. Añadimos un apunte general: cuando comparéis precios de planes o memorias, mirad qué incluye cada opción (análisis de zona, escenarios, entrevista previa). Un documento barato que nadie haya pensado puede salir caro después.',
  'Buenas. Bonito debate. Solo recordar que aquí no prometemos viabilidad ni financiación: nuestro trabajo es analizar y decir lo que vemos, aunque a veces la respuesta sea que la idea no aguanta los números. Eso también ahorra dinero.',
  'Hola. Si al final necesitáis el plan para presentarlo al banco o a una convocatoria, en la web están los pasos y los precios con todo incluido. Y si no, los consejos que os han dado aquí los compañeros son muy sensatos.',
]
