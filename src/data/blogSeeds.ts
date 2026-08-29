// Banco de artículos semilla para el archivo histórico del blog.
// SIMULACIÓN: contenido generado para dar profundidad al archivo 2014-2026.
// Antes del lanzamiento real, sustituir por artículos reales o eliminar.

export type Categoria = 'ayudas' | 'normativa' | 'consejos' | 'negocios' | 'franquicias'

export interface Seed {
  cat: Categoria
  t: string // título
  p: string[] // párrafos del cuerpo
  g: string // frase gancho final que lleva al formulario
}

export const SEEDS: Seed[] = [
  // ---------- AYUDAS Y SUBVENCIONES ----------
  {
    cat: 'ayudas',
    t: 'Tarifa plana de autónomos: quién puede pedirla y qué errores la anulan',
    p: [
      'La tarifa plana permite a los nuevos autónomos pagar una cuota reducida durante los primeros meses de actividad. Es probablemente la ayuda más conocida y, al mismo tiempo, la que más errores de solicitud acumula.',
      'Los requisitos cambian con el tiempo, pero hay constantes: no haber estado de alta en los años previos (el plazo varía según la convocatoria vigente), no estar en pluriempleo con ciertas condiciones y solicitarla en el momento correcto. Pedirla tarde puede significar perderla entera.',
      'El error más común que vemos es asumir que se aplica automáticamente. No es así: hay que marcarla, justificarla y vigilar las compatibilidades con otras ayudas. Un descuido aquí puede salir caro en forma de reintegro.',
    ],
    g: '¿Vas a darte de alta para montar tu negocio? Antes de mover un papel, valida tu idea gratis: te decimos en hasta 3 días laborables si es viable.',
  },
  {
    cat: 'ayudas',
    t: 'Pago único del paro: cómo capitalizar tu prestación para abrir un negocio',
    p: [
      'Si estás cobrando el paro y quieres montar un negocio, puedes pedir cobrarlo de una sola vez para financiar el arranque. Es la capitalización de la prestación por desempleo, conocida como pago único, y es de las vías de financiación inicial más potentes que existen en España.',
      'Hay tres modalidades según el uso que le des: aportación a una sociedad, inversión en tu negocio como autónomo o compensación de cuotas a la Seguridad Social. Cada una tiene sus formularios, sus plazos y sus justificaciones.',
      'Lo que casi nadie te cuenta: la documentación que acredita la viabilidad del proyecto pesa mucho. Un plan de negocio serio no es un adorno, es la pieza que sostiene la solicitud ante cualquier revisión.',
    ],
    g: '¿Sabías que puedes cobrar tu paro de una sola vez para arrancar? Valida tu idea gratis y te decimos en hasta 3 días laborables si merece la pena dar el paso.',
  },
  {
    cat: 'ayudas',
    t: 'Kit Digital: qué gastos cubre y cómo pedirlo sin perderte en la convocatoria',
    p: [
      'El Kit Digital reparte bonos para que pymes y autónomos se digitalicen: web, tienda online, gestión de clientes, facturación electrónica, ciberseguridad. Las cuantías dependen del tamaño de la empresa.',
      'La trampa está en la mecánica: no recibes dinero, recibes un bono que canjeas con agentes digitalizadores autorizados. Elegir mal al agente o pedir una categoría que no necesitas son los dos errores habituales.',
      'Nuestro consejo: antes de pedir el bono, ten claro qué problema de tu negocio resuelve cada solución. Digitalizar por digitalizar es quemar una ayuda que no volverá.',
    ],
    g: 'Digitalizar tu idea empieza por saber si la idea funciona. Validarla con nosotros es gratis y sin compromiso.',
  },
  {
    cat: 'ayudas',
    t: 'Ayudas autonómicas al emprendimiento: por qué casi nadie las encuentra a tiempo',
    p: [
      'Cada comunidad autónoma publica sus propias convocatorias para nuevos negocios: cheques de autoempleo, ayudas a la inversión inicial, bonificaciones de alquiler. El problema no es que no existan, es que nadie las anuncia en el mismo sitio.',
      'Las convocatorias se publican en los boletines oficiales autonómicos con plazos que suelen durar semanas, no meses. Cuando llegan a las redes o a la prensa, muchas ya están a punto de cerrar.',
      'La solución práctica: un calendario de convocatorias de tu comunidad y tu sector, revisado cada mes. Es exactamente el tipo de trabajo que hace un informe de ayudas personalizado.',
    ],
    g: '¿Sabes qué ayudas hay abiertas ahora mismo para tu idea y tu zona? Valida tu idea gratis y empieza por lo importante.',
  },
  {
    cat: 'ayudas',
    t: 'Subvenciones para emprender en municipios pequeños: el dinero que sobra cada año',
    p: [
      'Muchos ayuntamientos y diputaciones sacan convocatorias para atraer negocios a sus municipios: bonificaciones del IBI, ayudas a la apertura de locales, premios a iniciativas rurales. Y cada año, parte de ese presupuesto se queda sin gastar.',
      '¿Por qué sobra dinero? Porque casi nadie lo solicita. La gente asume que no hay ayudas en pueblos pequeños cuando es justo al contrario: la competencia por ellas es mínima.',
      'Si tu idea puede funcionar en un municipio de menos de 20.000 habitantes, mira las convocatorias locales antes que las estatales. Es donde más probabilidades tienes de salir elegido.',
    ],
    g: '¿Tu idea podría funcionar en un municipio pequeño? Valídala gratis: te diremos con sinceridad si los números aguantan.',
  },
  {
    cat: 'ayudas',
    t: 'ENISA: qué es, a quién financia y por qué piden un plan sólido',
    p: [
      'ENISA es la Empresa Nacional de Innovación: una entidad pública que concede préstamos participativos a pymes y startups, sin pedir avales personales ni garantías. Es de las pocas vías que financia ideas sin exigirte hipotecar tu vida.',
      'Sus líneas suelen distinguir entre jóvenes emprendedores, proyectos de crecimiento y startups con potencial. Los importes varían, pero la condición común es siempre la misma: un proyecto con fundamentos.',
      'Aquí no vale un PDF bonito. ENISA analiza el modelo de negocio, el mercado y las previsiones con lupa. Un plan de negocio defendible no es una ventaja: es el requisito de entrada.',
    ],
    g: '¿Sabías que hay préstamos públicos sin avales para buenas ideas? Primero lo primero: valida la tuya gratis, con respuesta en hasta 3 días laborables.',
  },
  {
    cat: 'ayudas',
    t: 'Microcréditos para autónomos: financiación cuando el banco dice que no',
    p: [
      'Cuando la banca tradicional cierra la puerta, quedan los microcréditos: préstamos pequeños para personas que quieren montar o consolidar un negocio y no encajan en el perfil de riesgo bancario.',
      'Entidades sociales y fundaciones financieras gestionan estas líneas, a menudo con avales públicos detrás. Los importes no son enormes, pero sí suficientes para un arranque austero y bien calculado.',
      'Lo que todas estas entidades tienen en común: evalúan al emprendedor y su proyecto, no solo sus garantías. Y para evaluar un proyecto necesitan verlo escrito con números serios.',
    ],
    g: 'Si el banco te ha dicho que no, quizá el problema no es tu idea sino cómo está presentada. Valídala gratis y sal de dudas.',
  },
  {
    cat: 'ayudas',
    t: 'Ayudas a la contratación del primer empleado: lo que puedes descontarte',
    p: [
      'Contratar al primer empleado es el salto que más miedo da a un autónomo. Para aliviarlo existen bonificaciones en las cuotas de la Seguridad Social: contratos indefinidos, jóvenes, personas en desempleo de larga duración.',
      'Las bonificaciones cambian con cada presupuesto y cada norma, pero el patrón se repite: cuanto más encaje tu contratación con los colectivos prioritarios, mayor el descuento.',
      'Antes de contratar, calcula el coste real del empleado (salario + cuotas) y réstale las bonificaciones aplicables. Muchas contrataciones que parecen imposibles salen adelante con este número bien hecho.',
    ],
    g: '¿Tu negocio está listo para dar el salto de contratar? Si aún estás validando la idea, empieza por ahí: es gratis.',
  },
  {
    cat: 'ayudas',
    t: 'Ayudas para mujeres emprendedoras: programas activos y requisitos habituales',
    p: [
      'Los programas de apoyo a la mujer emprendedora se reparten entre el nivel estatal, autonómico y local: microcréditos, formación, mentoring y ayudas directas a la creación de empresas lideradas por mujeres.',
      'En zonas rurales las ayudas suelen ser aún más generosas, porque la prioridad es doble: igualdad y fijación de población. Los requisitos típicos son mayoría de participación femenina en el proyecto y antigüedad limitada de la empresa.',
      'El error frecuente es pedir la ayuda con un proyecto genérico. Estas convocatorias puntúan la solidez del plan: cuanto mejor defendida esté la viabilidad, más arriba quedas en la lista.',
    ],
    g: '¿Tienes un proyecto entre manos? Valídalo gratis: en hasta 3 días laborables sabrás si es viable y qué puertas puedes tocar.',
  },
  {
    cat: 'ayudas',
    t: 'Subvenciones para jóvenes emprendedores: lo que hay antes de los 30 (y de los 35)',
    p: [
      'Ser joven emprendedor tiene ventajas fiscales y de financiación que desaparecen con la edad: ampliaciones de la tarifa plana, líneas específicas de préstamos públicos, premios autonómicos y programas de incubación gratuitos.',
      'Las edades de corte varían según la convocatoria: unas dicen menores de 30, otras de 35. Conviene revisar qué te queda disponible antes de cumplir el corte, porque rara vez es retroactivo.',
      'Nuestro consejo si estás en esa franja: aprovecha las ayudas blandas (formación, mentoring, viveros de empresas) aunque no necesites el dinero. El acompañamiento gratuito vale más de lo que parece.',
    ],
    g: '¿Eres menor de 35 y tienes una idea? Es tu mejor momento para validarla. Gratis, en hasta 3 días laborables.',
  },
  {
    cat: 'ayudas',
    t: 'Deducciones fiscales al emprender: lo que puedes recuperar si lo pides bien',
    p: [
      'Emprender tiene su parte amable en la declaración: deducciones por creación de empleo, por inversión en determinados activos, reducciones por inicio de actividad. No son subvenciones, pero al final del año se notan.',
      'El problema es que estas deducciones no se aplican solas ni tu gestor las encontrará si no sabe qué hace tu negocio. Hay que planificarlas desde el primer trimestre, no en mayo del año siguiente.',
      'Un consejo de consultor: guarda desde el día uno la documentación de cada inversión. La deducción que no puedes justificar es una deducción que no existe.',
    ],
    g: 'Los números de tu negocio empiezan mucho antes de abrir. Valida tu idea gratis y empieza con buen pie.',
  },
  {
    cat: 'ayudas',
    t: 'Ayudas a la digitalización de pymes: más allá de la página web',
    p: [
      'Cuando se habla de digitalización todos piensan en una web, pero las ayudas cubren mucho más: gestión de reservas, facturación electrónica, presencia en marketplaces, analítica de clientes, ciberseguridad básica.',
      'Las convocatorias se suceden a nivel estatal y autonómico, a menudo por orden de llegada. Esto significa que la velocidad importa tanto como la calidad de la solicitud.',
      'La clave está en pedir lo que tu negocio realmente usará. Una herramienta de gestión que nadie abre es una ayuda desperdiciada y, peor aún, una justificación pendiente.',
    ],
    g: 'Antes de digitalizar nada, asegúrate de que el negocio se sostiene. Validar tu idea es gratis y te respondemos en hasta 3 días laborables.',
  },
  {
    cat: 'ayudas',
    t: 'Programas de apoyo al comercio local: ayudas que dependen de tu ayuntamiento',
    p: [
      'Los ayuntamientos pelean por mantener vivo su comercio de proximidad: ayudas a la reforma de escaparates, bonificaciones de tasas de terraza, campañas de compra local con subvención detrás.',
      'Estas ayudas rara vez se anuncian fuera del tablón municipal y la web del ayuntamiento. Quien las consigue es quien pregunta directamente en la concejalía de comercio o desarrollo económico.',
      'Si vas a abrir un local, haz esta llamada antes de firmar nada: preguntar qué hay disponible puede ahorrarte miles de euros en el primer año.',
    ],
    g: '¿Vas a abrir un local? Antes de firmar, valida tu idea gratis: te diremos con sinceridad si el proyecto se sostiene.',
  },
  {
    cat: 'ayudas',
    t: 'Emprender en verde: las ayudas que premian la sostenibilidad',
    p: [
      'Economía circular, eficiencia energética, reutilización: los proyectos con componente sostenible tienen líneas de ayuda propias a casi todos los niveles, desde fondos europeos hasta premios locales.',
      'El componente verde no es un adorno en la solicitud: hay que demostrarlo con indicadores. Cuánto reduces, cuánto reutilizas, cuánto ahorras. Lo que no se mide no puntúa.',
      'Si tu idea tiene este ángulo, explótalo desde el plan de negocio. Una memoria de sostenibilidad bien hecha puede ser la diferencia entre conseguir la ayuda o quedarte fuera.',
    ],
    g: '¿Tu idea tiene un ángulo sostenible? Valídala gratis y te diremos si es viable y qué puertas puede abrir.',
  },
  {
    cat: 'ayudas',
    t: 'Cómo enterarte de las convocatorias antes de que cierren (sin volverte loco)',
    p: [
      'El sistema de ayudas español está fragmentado entre boletines estatales, autonómicos, provinciales y municipales. Seguirlo todo a mano es un trabajo a jornada completa, y por eso casi nadie lo hace bien.',
      'La estrategia razonable: suscríbete a los boletines de tu comunidad y tu diputación, sigue a dos o tres entidades de apoyo al emprendedor y reserva una hora al mes para revisar novedades.',
      'La alternativa profesional es un informe de ayudas personalizado: alguien que cruce tu perfil, tu sector y tu ubicación con las convocatorias abiertas y te entregue solo las que te aplican.',
    ],
    g: '¿Quieres saber qué ayudas encajan con tu idea sin rastrear boletines? Empieza por validar tu idea gratis.',
  },
  // ---------- NORMATIVA ----------
  {
    cat: 'normativa',
    t: 'Alta de autónomo: pasos, plazos y lo que casi nadie te cuenta',
    p: [
      'Darse de alta de autónomo es hoy un trámite rápido: censo en Hacienda y alta en la Seguridad Social, ambos online. Lo complicado no es el alta, es todo lo que la rodea.',
      'Epígrafe correcto del IAE, obligaciones de IVA según tu actividad, compatibilidad con ayudas que quieras pedir antes o después: cada decisión del alta tiene consecuencias meses después.',
      'El orden importa. Hay ayudas que exigen no estar de alta todavía y otras que exigen estarlo. Tramitar en el orden equivocado puede cerrarte puertas de financiación que no se reabren.',
    ],
    g: 'Antes del alta, lo esencial: saber si tu idea es viable. Valídala gratis y te respondemos en hasta 3 días laborables.',
  },
  {
    cat: 'normativa',
    t: 'Cotización por ingresos reales: qué cambia para los nuevos autónomos',
    p: [
      'El sistema de cotización por ingresos reales vincula la cuota de autónomos a lo que realmente ganas, por tramos. Para quien empieza con ingresos bajos, puede significar cuotas más asequibles que el sistema antiguo.',
      'La clave práctica está en la previsión: eliges tramo según lo que esperas rendir, y luego se regulariza con lo que realmente declares. Predecir mal te descuadra la tesorería del primer año.',
      'Nuestro consejo: haz números conservadores y revisa el tramo cada vez que tu facturación cambie de forma relevante. La cuota de autónomos ya no es un fijo inamovible, es una variable más del negocio.',
    ],
    g: '¿Sabes cuánto necesitas facturar para que tu idea cubra sus costes? Valídala gratis y calcula con base.',
  },
  {
    cat: 'normativa',
    t: 'Ley Crea y Crece: lo que afecta a quien monta una sociedad limitada',
    p: [
      'La Ley Crea y Crece llegó para facilitar la creación de empresas: constitución telemática, agilización de trámites y, sobre todo, la posibilidad de crear una SL con capital muy reducido mediante las llamadas SL de formación sucesiva.',
      'Para el emprendedor pequeño, la consecuencia práctica es que la barrera de los 3.000 euros de capital inicial ya no es el muro que era. Pero crear una SL sigue teniendo costes de mantenimiento que un autónomo no tiene.',
      'La pregunta correcta no es "¿puedo crear una SL?" sino "¿me compensa?". Y eso depende de tu facturación prevista, tus socios y tu riesgo: tres cosas que salen de un buen plan, no de una notaría.',
    ],
    g: '¿Autónomo o SL para tu idea? Valídala gratis primero: la forma jurídica se decide con números, no con intuición.',
  },
  {
    cat: 'normativa',
    t: 'SL vs autónomo: cuándo compensa cada forma jurídica',
    p: [
      'La duda eterna de todo emprendedor. Como regla general: si vas solo, con ingresos iniciales modestos y riesgo controlado, el autónomo suele ser más barato y más simple de gestionar.',
      'La SL empieza a compensar cuando hay socios, cuando la facturación crece y el tipo de sociedades mejora al del IRPF, o cuando el riesgo del negocio hace prudente separar tu patrimonio personal del de la empresa.',
      'Ojo con el mito: la SL no te protege de todo. Los administradores responden en ciertos supuestos y los bancos suelen pedir aval personal igualmente. La decisión se toma con una tabla de números, no con prejuicios.',
    ],
    g: '¿No tienes claro qué forma encaja con tu proyecto? Valida tu idea gratis y decide después con datos.',
  },
  {
    cat: 'normativa',
    t: 'Licencias de apertura: el trámite que retrasa más negocios de los que crees',
    p: [
      'Pregunta a diez hosteleros qué les retrasó la apertura y ocho dirán lo mismo: la licencia. Los plazos municipales varían enormemente entre ayuntamientos y casi nunca son los que figuran en la web.',
      'Las actividades calificadas (hostelería, música, industria) requieren proyectos técnicos y pueden tardar meses. Las inocuas, en muchos municipios, se resuelven con declaración responsable y puedes abrir casi de inmediato.',
      'El consejo que más dinero ahorra: antes de firmar el alquiler del local, confirma en urbanismo que tu actividad es viable EN ESE local concreto. Un contrato firmado con una licencia imposible es una ruina anunciada.',
    ],
    g: '¿Tienes un local en mente? Antes de firmar nada, valida tu idea gratis: te diremos si el proyecto completo se sostiene.',
  },
  {
    cat: 'normativa',
    t: 'Obligaciones contables de un autónomo, explicadas sin tecnicismos',
    p: [
      'Un autónomo en estimación directa tiene cuatro obligaciones básicas: llevar libros de ingresos y gastos, presentar el IVA trimestral si su actividad lo exige, hacer pagos a cuenta del IRPF y conservar facturas.',
      'No es tan complejo como parece, pero sí es rutinario: trimestre a trimestre, sin falta. Las sanciones más comunes no vienen de engañar, sino de despistes y retrasos.',
      'Con una hoja de cálculo ordenada y un gestor razonable se lleva sin drama. Lo que no perdona Hacienda es el caos: tickets sueltos y cuentas mezcladas con las personales.',
    ],
    g: 'Los números ordenados empiezan antes de abrir. Valida tu idea gratis y monta tu negocio sobre base firme.',
  },
  {
    cat: 'normativa',
    t: 'Facturación electrónica: qué se sabe y qué conviene preparar ya',
    p: [
      'La facturación electrónica obligatoria entre empresas lleva años anunciándose y su implantación se desarrolla por fases. Lo sensato es no esperar al último día: los sistemas de facturación conforme a los nuevos requisitos ya están en el mercado.',
      'Para un negocio pequeño, el impacto real es doble: elegir un software adecuado y acostumbrarse a una trazabilidad que no admite arreglos a posteriori.',
      'Nuestra recomendación práctica: si estás montando ahora, elige desde el día uno un programa de facturación actualizado. Migrar después, con historial de por medio, es doble trabajo.',
    ],
    g: '¿Montas tu negocio ahora? Empieza por validar tu idea gratis: todo lo demás se construye después.',
  },
  {
    cat: 'normativa',
    t: 'Registro de marca: cuándo merece la pena y cuánto cuesta',
    p: [
      'Registrar tu marca en la Oficina Española de Patentes y Marcas cuesta menos de lo que la mayoría cree y te da derechos exclusivos sobre el nombre en tu sector durante diez años renovables.',
      '¿Cuándo merece la pena? Cuando el nombre es un activo del negocio: vas a invertir en hacerlo conocido, tienes presencia online o piensas crecer más allá de tu barrio.',
      'El caso que duele: el emprendedor que dos años después de triunfar recibe una carta porque otro registró el nombre antes. Por el coste que tiene, registrar pronto es un seguro barato.',
    ],
    g: '¿Ya tienes hasta nombre para tu idea? Valídala gratis antes de invertir en ella: te decimos en hasta 3 días laborables si es viable.',
  },
  {
    cat: 'normativa',
    t: 'Protección de datos en negocios pequeños: lo mínimo exigible',
    p: [
      'Si tu negocio guarda nombres, teléfonos o correos de clientes (y todos lo hacen), la protección de datos te aplica. No hace falta un departamento jurídico, pero sí unos mínimos: información clara al recoger datos, seguridad básica y respeto a los derechos de las personas.',
      'Los errores típicos del pequeño negocio: pedir datos que no necesitas, guardarlos sin protección y usar el correo de clientes para publicidad sin su consentimiento.',
      'Las multas a negocios pequeños existen, aunque rara vez salen en las noticias. Un texto de privacidad correcto en tu web y un consentimiento bien gestionado te cubren el 90% del riesgo.',
    ],
    g: 'Montar bien desde el principio empieza por validar la idea. Hazlo gratis y te respondemos en hasta 3 días laborables.',
  },
  {
    cat: 'normativa',
    t: 'Contratar a tu primer empleado: costes reales y obligaciones',
    p: [
      'El primer empleado cuesta bastante más que su sueldo: salario bruto más cuotas empresariales a la Seguridad Social, que añaden en torno a un 30%. Un sueldo de 1.200 euros supone un coste real cercano a los 1.600.',
      'A eso se suman las obligaciones: contrato registrado, nóminas, retenciones de IRPF, prevención de riesgos laborales. Nada insalvable, pero todo con plazos.',
      'El cálculo que hay que hacer antes de contratar: cuánto debe generar ese empleado para pagarse a sí mismo. Si ese número no sale en tu previsión, aún no es el momento.',
    ],
    g: '¿Tu idea necesita empleados desde el día uno? Valídala gratis y comprueba si los números aguantan.',
  },
  {
    cat: 'normativa',
    t: 'Terrazas, ruidos y horarios: la normativa local que puede hundir tu hostelería',
    p: [
      'La hostelería vive de su terraza y su horario, y ambos dependen de ordenanzas municipales que cambian de una ciudad a otra y a veces de un barrio a otro.',
      'Hemos visto negocios con buena comida y buena ubicación hundidos por una licencia de terraza denegada o un horario recortado tras quejas vecinales. Es el riesgo que menos se estudia y más facturas causa.',
      'Antes de enamorarte de un local, estudia la ordenanza: mesas permitidas, horarios de cierre, limitaciones acústicas de la zona. Esa información vale más que el estado de la cocina.',
    ],
    g: '¿Tu idea es un bar o restaurante? Valídala gratis antes de firmar el local: te diremos si el proyecto se sostiene.',
  },
  {
    cat: 'normativa',
    t: 'Venta online desde España: IVA, devoluciones y textos legales obligatorios',
    p: [
      'Vender online no te libra de la letra pequeña: necesitas aviso legal, política de privacidad, condiciones de venta y política de cookies visibles en la web. Su ausencia es de lo más sancionado en ecommerce pequeño.',
      'En el IVA, la venta a consumidores de otros países de la UE tiene reglas propias con umbrales y ventanilla única. Y los consumidores tienen 14 días de derecho de desistimiento, te guste o no.',
      'Montar una tienda online es fácil técnicamente. Montarla cumpliendo es otra cosa: reserva una partida para textos legales y asesoría fiscal antes del lanzamiento.',
    ],
    g: '¿Tu idea es una tienda online? Valídala gratis: en hasta 3 días laborables sabrás si el modelo se sostiene.',
  },
  // ---------- CONSEJOS ----------
  {
    cat: 'consejos',
    t: 'Cómo saber si tu idea de negocio es viable antes de gastar un euro',
    p: [
      'La viabilidad no se intuye, se contrasta. Tres preguntas lo deciden casi todo: ¿hay suficiente gente dispuesta a pagar por esto?, ¿puedes llegar a ellos a un coste razonable?, ¿los números cubren tus costes con margen?',
      'El error típico es enamorarse de la idea y buscar solo datos que la confirmen. La validación honesta busca lo contrario: los motivos por los que podría fallar, para ver si tienen solución.',
      'Haz números pesimistas, habla con clientes reales antes de montar nada y compara con negocios parecidos que ya existen. Si tras eso la idea sigue en pie, tienes algo.',
    ],
    g: 'Nosotros hacemos exactamente este análisis, gratis. Envíanos tu idea y te diremos en hasta 3 días laborables si es viable (y si no, por qué).',
  },
  {
    cat: 'consejos',
    t: 'El error número uno al pedir financiación: números que no se sostienen',
    p: [
      'Cuando una entidad rechaza una solicitud de financiación, la causa más frecuente no es la idea: son las previsiones. Ventas infladas, costes olvidados, plazos de cobro ignorados.',
      'Un analista de riesgos ha visto miles de planes. Detecta una previsión optimista en minutos: crecimiento lineal desde el mes uno, márgenes imposibles para el sector, cero partidas de imprevistos.',
      'La paradoja: unas cifras modestas pero defendibles consiguen más financiación que unas cifras brillantes sin soporte. La credibilidad es la moneda que compra el dinero.',
    ],
    g: '¿Tus números aguantarían un análisis de riesgos? Valida tu idea gratis y empieza a construir sobre datos.',
  },
  {
    cat: 'consejos',
    t: 'Cuánto dinero necesitas de verdad para abrir (y cómo calcularlo)',
    p: [
      'La inversión inicial de un negocio tiene tres bloques: el acondicionamiento (local, equipamiento, licencias), el stock o recursos iniciales, y la tesorería para sobrevivir los primeros meses sin ingresos suficientes.',
      'El tercer bloque es el que casi nadie calcula y el que mata más negocios. Regla práctica: necesitas cubrir entre 6 y 12 meses de costes fijos, según lo rápido que madure tu sector.',
      'Suma los tres bloques, añade un 15% de imprevistos y compara con lo que tienes. Si falta dinero, mejor saberlo ahora que en el mes cuatro.',
    ],
    g: '¿Sabes cuánto necesita tu idea para arrancar de verdad? Valídala gratis y te diremos si los números cuadran.',
  },
  {
    cat: 'consejos',
    t: 'Qué mira un banco cuando le pides un préstamo para tu negocio',
    p: [
      'El analista que lee tu solicitud evalúa tres cosas en este orden: tu capacidad de devolución (flujo de caja previsto), tu solvencia personal (historial, estabilidad, patrimonio) y la calidad del proyecto (plan de negocio).',
      'También ponderan tu aportación: pedir el 100% de la inversión transmite que no te juegas nada. Aportar un 20-30% propio mejora radicalmente las opciones.',
      'Y un detalle que pocos conocen: el sector importa. Los bancos tienen estadísticas de morosidad por actividad. Un plan excelente en un sector castigado necesita ser aún más convincente.',
    ],
    g: '¿Quieres llegar al banco con un proyecto que se tomen en serio? Empieza por validar tu idea gratis.',
  },
  {
    cat: 'consejos',
    t: 'Validar tu idea con clientes reales: métodos baratos que funcionan',
    p: [
      'No necesitas dinero para validar, necesitas calle. Habla con 20 personas de tu público objetivo y pregúntales cómo resuelven hoy el problema que tú quieres resolver. Lo que cuentan vale más que cualquier encuesta online.',
      'Otras técnicas probadas: una landing page con lista de espera, preventas con descuento, un fin de semana de prueba en un mercadillo o un servicio manual que simule el negocio final.',
      'La señal que buscas no es "qué buena idea", es dinero o compromiso: reservas, depósitos, correos de gente real. Los elogios no pagan alquileres.',
    ],
    g: '¿Quieres una segunda opinión profesional sobre tu idea? La nuestra es gratis y llega en hasta 3 días laborables.',
  },
  {
    cat: 'consejos',
    t: 'Los cinco números que debes conocer antes de firmar un local',
    p: [
      'Antes de firmar un alquiler, ten claros estos cinco números: el alquiler mensual con todos los gastos, tus costes fijos totales, tu margen bruto por venta, el punto de equilibrio resultante y las ventas diarias que eso implica.',
      'El último número es el revelador. Si necesitas 90 cafés al día para cubrir costes y la calle tiene tránsito para 40, el local no sirve por bonito que sea.',
      'Este cálculo de 30 minutos ha salvado a más emprendedores que cualquier intuición. Un local caro con números que cuadran es mejor inversión que una ganga con números imposibles.',
    ],
    g: '¿Estás mirando locales? Antes de firmar, valida tu idea gratis: los números primero.',
  },
  {
    cat: 'consejos',
    t: 'Punto de equilibrio: la cifra que decide si tu negocio vive o muere',
    p: [
      'El punto de equilibrio es el nivel de ventas en el que cubres exactamente todos tus costes. Por debajo pierdes dinero, por encima lo ganas. Es la cifra más importante de tu negocio y la que menos emprendedores saben calcular.',
      'La fórmula es simple: costes fijos divididos entre el margen de cada venta. Lo difícil no es la matemática, es ser honesto con los costes (todos, incluido tu sueldo) y con el margen real.',
      'Haz este ejercicio: calcula tu punto de equilibrio y pregúntate si puedes vender eso cada mes de forma sostenida. Si la respuesta te incomoda, la idea necesita un ajuste.',
    ],
    g: '¿No sabes cuál es el punto de equilibrio de tu idea? Valídala gratis: es lo primero que miramos.',
  },
  {
    cat: 'consejos',
    t: 'Cómo elegir ubicación sin dejarte llevar por el corazón',
    p: [
      'La ubicación perfecta no es la más bonita ni la más céntrica: es la que pone tu oferta delante de tu cliente exacto al precio que puedes pagar. Todo lo demás es estética.',
      'Método práctico: cuenta el tránsito real del local en diferentes franjas horarias durante una semana, estudia qué negocios cercanos funcionan (y cuáles cerraron) y pregunta a los vecinos de calle qué echan en falta.',
      'Y un clásico que no falla: mira cuántos negocios han pasado por ese local en los últimos diez años. Un local que cambia de dueño cada año suele tener un problema que no se ve en la visita.',
    ],
    g: '¿Tienes el sitio pero no sabes si la idea aguanta? Valídala gratis antes de firmar nada.',
  },
  {
    cat: 'consejos',
    t: 'Errores en el plan de negocio que te cierran puertas (y nadie te cuenta)',
    p: [
      'Tras revisar cientos de planes, los errores se repiten: resúmenes ejecutivos que no resumen nada, análisis de competencia que dicen "no hay competencia", previsiones sin justificar y equipos presentados sin roles claros.',
      'El más grave es el silencio sobre los riesgos. Un plan que no menciona qué puede salir mal transmite ingenuidad. El analista piensa: o no lo ha visto, o no quiere verlo.',
      'La presentación importa menos que el contenido, pero un plan con erratas y cifras que no cuadran entre apartados mina la confianza antes de llegar a la página cinco.',
    ],
    g: '¿Tu plan aguantaría una revisión profesional? Empieza por validar tu idea gratis: es el primer filtro.',
  },
  {
    cat: 'consejos',
    t: 'Cuándo NO es buen momento para emprender (y cómo saberlo)',
    p: [
      'A veces la respuesta honesta es "todavía no". Señales de que conviene esperar: el sector está en caída estructural, no tienes colchón para 6 meses de costes, o tu idea depende de una moda que ya está bajando.',
      'Esperar no es rendirse. Esperar puede significar ahorrar un año más, formarse en lo que te falta o pivotar la idea hacia donde el mercado sí está yendo.',
      'El peor escenario no es retrasar un proyecto: es quemar tus ahorros y tu crédito en un proyecto que arrancó con viento en contra. Un "no" a tiempo es la mejor noticia que puedes recibir.',
    ],
    g: 'Si tu idea no es viable, te lo diremos. También gratis. Esa honestidad es lo que nos diferencia: valida tu idea sin compromiso.',
  },
  {
    cat: 'consejos',
    t: 'De empleado a autónomo: cómo preparar la transición sin quemar las naves',
    p: [
      'La transición ideal no es un salto al vacío: es un puente. Validar la idea mientras sigues empleado, montar lo mínimo viable en tus horas libres y dar el salto cuando el negocio ya factura algo, cambia completamente el riesgo.',
      'No siempre es posible (conflicto de interés, tiempo, energía), pero incluso sin lanzar nada puedes preparar el terreno: ahorro acumulado, deudas reducidas, contactos cultivados, números hechos.',
      'Y un apunte financiero: si vas a dejar un empleo, revisa qué ayudas a la reincorporación o capitalización te aplican. El orden de tus decisiones puede valer miles de euros.',
    ],
    g: '¿Estás empleado y le das vueltas a una idea? Valídala gratis sin moverte de tu silla: respuesta en hasta 3 días laborables.',
  },
  {
    cat: 'consejos',
    t: 'Negociar con proveedores cuando aún no eres nadie',
    p: [
      'Al empezar no tienes volumen para exigir precios, pero sí tienes algo que negociar: plazos de pago, pedidos mínimos bajos, muestras, exclusividad de zona. Los proveedores también buscan clientes fieles.',
      'La clave es presentarte como un proyecto serio, no como una ocurrencia. Un proveedor que ve un plan de negocio claro te trata diferente: sabe que puedes estar comprándole dentro de cinco años.',
      'Y regla de oro del principiante: dos proveedores por cada producto crítico. La dependencia total de uno solo es un riesgo que no se ve hasta que falla.',
    ],
    g: 'Un proyecto serio se nota desde el primer documento. Valida tu idea gratis y empieza a construirlo.',
  },
  {
    cat: 'consejos',
    t: 'Fijar precios: por qué casi todos los nuevos negocios cobran poco',
    p: [
      'El miedo a no vender lleva a casi todos los emprendedores al mismo error: precios que no cubren el coste real del trabajo. Competir por precio cuando eres pequeño es una carrera hacia la ruina.',
      'Tu precio debe salir de tres datos: lo que cuesta producir (todo, incluido tu tiempo), lo que cobra la competencia comparable y el valor que el cliente percibe. El más bajo de los tres no es el correcto: es el suelo.',
      'Señal inequívoca de que cobras poco: todos te dicen que sí sin negociar. Si nadie protesta jamás tu precio, estás dejando dinero sobre la mesa.',
    ],
    g: '¿Sabes cuánto debería cobrar tu idea para ser rentable? Valídala gratis y te diremos si los números salen.',
  },
  {
    cat: 'consejos',
    t: 'El plan B del emprendedor: escenarios pesimistas que salvan negocios',
    p: [
      'Todo plan de negocio serio incluye tres escenarios: optimista, base y pesimista. El pesimista no es derrotismo: es la herramienta que te dice cuánto tiempo puedes resistir si las cosas tardan en arrancar.',
      'Las preguntas del escenario pesimista: ¿qué pasa si vendo la mitad de lo previsto?, ¿y si un coste clave sube un 20%?, ¿y si el local tarda tres meses más en abrir? Si el negocio muere con cualquiera de ellas, es demasiado frágil.',
      'Los negocios que sobreviven a las crisis no son los que no las previeron: son los que tenían decidido de antemano qué harían cuando llegaran.',
    ],
    g: '¿Tu idea aguantaría un escenario pesimista? Valídala gratis: es exactamente lo que analizamos.',
  },
  {
    cat: 'consejos',
    t: 'Cómo presentar tu proyecto a una entidad pública sin que se duerman',
    p: [
      'Las entidades públicas evalúan decenas de proyectos por convocatoria. El tuyo compite por la atención de un técnico cansado: gana siendo claro, completo y exactamente lo que la convocatoria pide.',
      'Errores que descartan: responder al lado de la pregunta, ignorar los criterios de puntuación publicados, entregar memoria genérica copiada de otra convocatoria.',
      'Truco de consultor: usa las palabras exactas de la convocatoria en tu memoria. Si puntúan "creación de empleo", escribe "creación de empleo" y cifra cuánto y cuándo. Facilitar la evaluación es ganar puntos.',
    ],
    g: '¿Vas a presentar tu proyecto a una ayuda? Empieza por validarlo gratis: un proyecto viable es un proyecto que puntúa.',
  },
  {
    cat: 'consejos',
    t: 'Mentores, viveros y asociaciones: la ayuda gratuita que sí existe',
    p: [
      'España tiene una red de apoyo al emprendedor más grande de lo que parece: viveros de empresas municipales, programas de mentoring de cámaras de comercio, asociaciones sectoriales, aceleradoras públicas.',
      'Gran parte es gratis o casi gratis. El coste real es tu tiempo y la humildad de aceptar que alguien con más experiencia vea las grietas de tu proyecto.',
      'No toda la ayuda es igual de útil: busca mentores que hayan montado negocios, no solo teóricos. Y asociaciones de tu sector concreto, donde los problemas que cuentan serán los tuyos.',
    ],
    g: 'Nuestro primer filtro también es gratis: valida tu idea y te diremos con sinceridad si merece seguir adelante.',
  },
  {
    cat: 'consejos',
    t: 'Franquicia o negocio propio: las preguntas que debes hacerte antes',
    p: [
      'La franquicia compra un sistema probado a cambio de libertad y de una parte del margen. El negocio propio te da todo el control y todo el riesgo. Ninguna opción es mejor: depende de quién seas tú.',
      'Pregúntate: ¿necesito decidir mi producto, mis precios y mi marca, o me cargo de energía seguir un manual que funciona? ¿Tengo una idea diferencial propia o busco un modelo que ya demuestre resultados?',
      'Y la pregunta financiera: el canon y los royalties de una franquicia mediana pueden superar lo que costaría aprender por tu cuenta. Los números, otra vez, mandan.',
    ],
    g: '¿Dudas entre franquicia o idea propia? Si tienes una idea, valídala gratis: puede que no necesites pagar ningún canon.',
  },
  {
    cat: 'consejos',
    t: 'Cuánto tarda un negocio en ser rentable: cifras realistas por sector',
    p: [
      'La rentabilidad no llega al mismo ritmo en todos los sectores. Servicios profesionales pueden equilibrarse en meses; hostelería suele necesitar de uno a dos años; retail, entre año y medio y tres.',
      'Estas horquillas asumen gestión correcta y ubicación adecuada. Lo que las estira es siempre lo mismo: costes fijos sobredimensionados desde el primer día.',
      'Planifica tu tesorería con el escenario lento, no con el rápido. Si tu negocio necesita ser rentable en seis meses para sobrevivir, el problema no es el plazo: es el diseño.',
    ],
    g: '¿Cuánto tardaría tu idea en ser rentable? Valídala gratis: es una de las primeras cosas que estimamos.',
  },
  {
    cat: 'consejos',
    t: 'Documentos que debes tener listos antes de pedir cualquier ayuda',
    p: [
      'Casi toda convocatoria pide el mismo paquete básico: identificación, situación frente a Hacienda y Seguridad Social, memoria del proyecto y presupuesto. Tenerlo preparado te permite solicitar en días lo que otros tardan semanas.',
      'La memoria del proyecto es la pieza que más varía y la que más pesa: qué vas a hacer, dónde, para quién, con qué medios y con qué números. Es, en esencia, un plan de negocio resumido.',
      'Prepara una versión base actualizable de cada documento. Cuando salga la convocatoria perfecta con plazo corto, estarás listo mientras otros empiezan a buscar certificados.',
    ],
    g: '¿Aún no tienes la memoria de tu proyecto? Empieza por validar tu idea gratis: es la base de todo lo demás.',
  },
  {
    cat: 'consejos',
    t: 'Por qué un "no" a tiempo es la mejor noticia para tu bolsillo',
    p: [
      'En este sector hay demasiada gente que te dirá que tu idea es fantástica. Es lo que quieres oír, y a menudo es lo que te lleva a invertir tus ahorros en algo que el mercado no pedía.',
      'Un análisis honesto a veces concluye que la idea no es viable: mercado insuficiente, márgenes imposibles, momento equivocado. Escucharlo antes de invertir no es una mala noticia, es un ahorro de miles de euros.',
      'Los mejores emprendedores que conocemos coleccionan "noes" tempranos. Cada idea descartada a tiempo libera energía y dinero para la que sí funcionará.',
    ],
    g: 'Si tu idea no es viable, te diremos por qué. También gratis. Valídala ahora: respuesta en hasta 3 días laborables.',
  },
  // ---------- NEGOCIOS RENTABLES ----------
  {
    cat: 'negocios',
    t: 'Negocios con poca inversión inicial: mitos y realidades',
    p: [
      'La lista de "negocios con poca inversión" que circula por internet mezcla realidades con espejismos. Sí existen: servicios profesionales, formación, consultoría, mantenimiento. Lo que ahorran en dinero lo cobran en tiempo y experiencia.',
      'El mito peligroso es el negocio sin inversión ni esfuerzo que genera ingresos pasivos desde el mes uno. Cuando algo así se anuncia, quien gana dinero es quien te vende el curso.',
      'La versión honesta: con menos de 3.000 euros se pueden montar negocios reales si pones trabajo especializado. Sin dinero Y sin trabajo especializado, lo que hay es empleo, no negocio.',
    ],
    g: '¿Tu idea es de las que arrancan con poca inversión? Valídala gratis y te diremos si los números cuadran.',
  },
  {
    cat: 'negocios',
    t: 'Hostelería: cuándo un bar es buen negocio y cuándo es una trampa',
    p: [
      'Un bar puede ser un negocio excelente o una máquina de quemar ahorros, y la diferencia rara vez está en la cocina. Está en el alquiler, la ubicación exacta y la gestión de los márgenes por producto.',
      'Los números que mandan: el alquiler no debería superar el 10-15% de la facturación prevista, el coste de materia prima debe quedar bajo el 30-35% y el personal bajo el 30%. Cuando estos tres se descontrolan, no hay cocinero que salve el local.',
      'Y la trampa clásica: traspasos inflados de locales que cambian de manos cada dos años. Si un bar "con marcha" se traspasa cada temporada, pregúntate por qué.',
    ],
    g: '¿Tu idea es un bar o restaurante? Valídala gratis antes de pagar ningún traspaso: te diremos si los números aguantan.',
  },
  {
    cat: 'negocios',
    t: 'Comercio de barrio: qué tiendas aguantan y por qué',
    p: [
      'El comercio de proximidad no está muerto: está especializado. Las tiendas que aguantan venden lo que internet no entrega bien: servicio inmediato, consejo experto, producto fresco o reparación.',
      'Las que desaparecen compiten en el terreno de Amazon: producto estándar, sin experiencia añadida, más caro que online. Esa batalla no se puede ganar desde una tienda de barrio.',
      'La fórmula que funciona: especialización + comunidad + presencia online propia. La ferretería que asesora, la carnicería que prepara, la librería que recomienda. El barrio paga por lo que una caja con drones no puede dar.',
    ],
    g: '¿Tienes una idea de comercio local? Valídala gratis: te diremos con sinceridad si tiene hueco en tu zona.',
  },
  {
    cat: 'negocios',
    t: 'Servicios a domicilio: el sector que crece sin hacer ruido',
    p: [
      'Limpieza, mantenimiento, cuidados, clases, estética, mascotas: los servicios a domicilio crecen año tras año empujados por dos fuerzas imparables, la falta de tiempo y el envejecimiento de la población.',
      'Es un sector de barreras de entrada bajas pero de diferenciación difícil: gana quien profesionaliza lo que otros hacen de forma informal. Seguro, uniformidad, puntualidad, factura: eso es lo que el cliente paga.',
      'Los números suelen ser atractivos: poca inversión inicial, margen alto por hora y demanda recurrente. El techo lo pone tu capacidad de contratar buen personal cuando creces.',
    ],
    g: '¿Tu idea es un servicio a domicilio? Valídala gratis: es de los sectores que mejor responden al análisis de números.',
  },
  {
    cat: 'negocios',
    t: 'Negocios online con base local: la fórmula que mejor envejece',
    p: [
      'Los negocios puramente digitales compiten contra el mundo entero. Los puramente locales, contra la calle. El punto dulce está en medio: negocio local con captación y venta online.',
      'La academia que también vende cursos grabados, el obrador que envía a toda España, el taller que agenda por app: combinan el margen de lo digital con la confianza de lo físico.',
      'Montar este híbrido exige planificar dos negocios en uno: el local y el canal online. Un plan de negocio que solo cubra la mitad te dejará a ciegas en la otra.',
    ],
    g: '¿Tu idea mezcla lo físico y lo online? Valídala gratis: te diremos si el modelo híbrido se sostiene.',
  },
  {
    cat: 'negocios',
    t: 'Clínicas y salud: alta rentabilidad, altísimas exigencias',
    p: [
      'Fisioterapia, psicología, podología, clínicas dentales, estética avanzada: la salud privada es de los sectores más rentables por metro cuadrado. También de los más regulados y exigentes.',
      'Las barreras son reales: titulaciones y colegiaciones, licencias sanitarias, inversión en equipamiento, y una competencia que se profesionaliza rápido. Quien entra "a probar" sale escaldado.',
      'El que funciona es el modelo especializado con diferenciación clara: un nicho, un público definido, una experiencia de paciente cuidada. Y detrás, números muy bien hechos, porque los costes fijos no perdonan.',
    ],
    g: '¿Tu idea es del sector salud? Valídala gratis: un consultor especializado en tu sector analizará su viabilidad.',
  },
  {
    cat: 'negocios',
    t: 'Estética y bienestar: saturación en ciudades, hueco en provincias',
    p: [
      'Los centros de estética se multiplican en las capitales hasta la saturación: mismos servicios, mismos aparatos, guerra de precios. En ciudades medias y pueblos grandes, la oferta sigue siendo escasa.',
      'El negocio vive de la recurrencia: un cliente fiel vale más que diez visitas sueltas. Por eso las cifras que importan son la tasa de repetición y el ticket medio, no el número de seguidores.',
      'Antes de abrir, cuenta cuántos centros similares hay en tu zona y qué servicios no ofrece ninguno. El hueco suele estar en la especialización, no en abrir "otro centro más".',
    ],
    g: '¿Tu idea es un centro de estética o bienestar? Valídala gratis: la ubicación y la saturación son lo primero que analizamos.',
  },
  {
    cat: 'negocios',
    t: 'Formación y academias: negocio estable si sabes diferenciarte',
    p: [
      'La formación privada es un negocio antiguo que sigue funcionando: idiomas, refuerzo escolar, oposiciones, habilidades digitales. La demanda es estructural y la inversión inicial, moderada.',
      'El problema es la competencia: casi cualquiera puede abrir una academia, y muchos lo hacen. La diferenciación real está en resultados demostrables, no en promesas: aprobados, mejoras medibles, casos de éxito.',
      'Los modelos híbridos (presencial + online) han ampliado el mercado: tu academia de barrio puede enseñar a toda España. Pero el núcleo sigue siendo el mismo: calidad docente que se pueda probar.',
    ],
    g: '¿Tu idea es una academia o formación? Valídala gratis: te diremos si el nicho que has elegido tiene demanda real.',
  },
  {
    cat: 'negocios',
    t: 'Alimentación especializada: del obrador artesano a la tienda de barrio',
    p: [
      'Sin gluten, ecológico, producto local, cocina étnica auténtica: la alimentación especializada crece porque el consumidor paga más por lo que encaja con sus valores o su salud.',
      'Es un sector de márgenes atractivos pero de operativa exigente: trazabilidad, alérgenos, caducidades, obradores con normativa propia. La parte romántica del producto artesano es la mitad del trabajo.',
      'La clave comercial: empezar pequeño y validar la demanda (mercadillos, preventas, tiendas que te acojan) antes de firmar un local. La alimentación perdona poco las estanterías llenas de producto invendido.',
    ],
    g: '¿Tu idea es de alimentación? Valídala gratis antes de montar el obrador: te diremos si el modelo aguanta.',
  },
  {
    cat: 'negocios',
    t: 'Lavanderías autoservicio: números reales de un negocio de moda',
    p: [
      'Las lavanderías autoservicio se han puesto de moda como "negocio sin empleados". La realidad: sin empleados no es lo mismo que sin trabajo. Limpieza diaria, mantenimiento, averías, reposición: alguien tiene que hacerlo.',
      'Los números que circulan (rentabilidades del 20% anual) son posibles en ubicaciones buenas: zonas densas, estudiantes, turismo, viviendas pequeñas. En la ubicación equivocada, las máquinas se quedan frías.',
      'La inversión inicial es notable (maquinaria industrial, obra, local) y la recuperación tarda años. Es un negocio de números pacientes, no de dinero rápido.',
    ],
    g: '¿Te atrae una lavandería autoservicio? Valídala gratis: la ubicación y la demanda real lo deciden todo.',
  },
  {
    cat: 'negocios',
    t: 'El negocio de las mascotas: el gasto que ni las crisis recortan',
    p: [
      'España tiene más mascotas que niños, y el gasto por animal sube cada año: alimentación premium, veterinaria, peluquería, guardería, seguros. Es de los pocos sectores que creció incluso en las peores crisis.',
      'Las oportunidades están en la especialización: no "otra tienda de mascotas", sino servicios concretos con demanda insatisfecha: guarderías caninas con transporte, veterinaria a domicilio, alimentación natural.',
      'Como todo sector atractivo, la competencia llega rápido. Entrar bien exige conocer los números reales del sector en tu zona, no los artículos optimistas de internet.',
    ],
    g: '¿Tu idea es del mundo mascota? Valídala gratis: te diremos si tu zona tiene hueco para ella.',
  },
  {
    cat: 'negocios',
    t: 'Negocios rurales que funcionan: más allá del turismo',
    p: [
      'Emprender en el medio rural no es solo casas rurales: es servicios que faltan (fontanería, electricidad, cuidados), alimentación con origen, logística de última milla, talleres que atienden pueblos enteros.',
      'Las ventajas son reales: competencia escasa, costes bajos, ayudas específicas que en las ciudades ni existen. Las limitaciones también: mercado pequeño, distancias, estacionalidad.',
      'El negocio rural que funciona casi siempre tiene dos patas: un servicio de proximidad que paga las facturas y un producto vendible fuera que da el margen. Una sola pata rara vez aguanta.',
    ],
    g: '¿Tu idea es para un pueblo o zona rural? Valídala gratis: hay ayudas específicas que pueden cambiar tus números.',
  },
  {
    cat: 'negocios',
    t: 'Servicios para mayores: la demanda que crece cada año, te guste o no',
    p: [
      'España envejece a un ritmo que ningún negocio puede ignorar: más personas mayores, viviendo más años, queriendo vivir en casa. Ahí hay una demanda estructural de servicios que no para de crecer.',
      'Acompañamiento, adaptación de viviendas, teleasistencia, fisioterapia a domicilio, gestión de trámites, comidas: el abanico es enorme y la oferta, insuficiente en la mayoría de ciudades.',
      'Es un sector donde la confianza es el producto: entra en casa de la gente. Las credenciales, los seguros y el trato humano valen más que cualquier campaña de marketing.',
    ],
    g: '¿Tu idea es de servicios para mayores? Valídala gratis: es un sector con demanda real, pero hay que entrar bien.',
  },
  {
    cat: 'negocios',
    t: 'Reformas y oficios: la escasez de mano de obra como oportunidad',
    p: [
      'Electricistas, fontaneros, albañiles, carpinteros: la escasez de profesionales de oficios es tal que en muchas ciudades hay listas de espera de meses. Donde hay escasez, hay margen.',
      'Para un profesional del oficio, montar por su cuenta nunca fue tan razonable: demanda asegurada, precios al alza y barreras de entrada moderadas. El cuello de botella es la gestión, no la venta.',
      'Los que escalan bien profesionalizan lo administrativo: presupuestos rápidos, facturación al día, agenda ordenada. El oficio lo dominan; lo que les falta suele ser la empresa.',
    ],
    g: '¿Eres de un oficio y quieres montar por tu cuenta? Valida tu idea gratis: los números de tu sector suelen salir bien.',
  },
  {
    cat: 'negocios',
    t: 'Dark kitchens y comida para llevar: lo que dicen los números',
    p: [
      'Las cocinas fantasma prometían hostelería sin los costes del local. La realidad: cambiaste el alquiler de la calle por las comisiones de las plataformas, que pueden comerse el 25-30% de cada pedido.',
      'El modelo funciona con volumen alto y costes muy controlados: carta corta, procesos optimizados, ubicación logística buena. Con volumen bajo, los márgenes no existen.',
      'Quien lo hace funcionar suele combinarlo con marca propia y pedidos directos, escapando poco a poco de la comisión. Como siempre: los números del primer año deciden si hay segundo.',
    ],
    g: '¿Tu idea es comida para llevar o delivery? Valídala gratis: los márgenes de este sector hay que mirarlos con lupa.',
  },
  {
    cat: 'negocios',
    t: 'Vending y negocios automatizados: ¿ingresos pasivos o espejismo?',
    p: [
      'Máquinas de vending, lavadoras automáticas, fotomatones, taquillas inteligentes: el atractivo es evidente, un negocio que vende sin ti. La realidad: vende sin ti, pero no funciona sin ti.',
      'Ubicación, reposición, mantenimiento y averías mandan. Una máquina en un polígono vacío es un mueble caro; la misma en una estación es una mina. Y las buenas ubicaciones se pagan.',
      'Los números serios: inversión por máquina, margen por venta, ventas diarias realistas de esa ubicación. Con esos tres datos, el negocio se evalúa en una tarde. Sin ellos, es una apuesta.',
    ],
    g: '¿Te tienta un negocio automatizado? Valídalo gratis: te diremos si los números que te han contado aguantan.',
  },
  {
    cat: 'negocios',
    t: 'Second hand y economía circular: de moda pasajera a sector serio',
    p: [
      'La segunda mano ha dejado de ser un nicho: ropa, muebles, electrónica, juguetes. El consumidor joven compra usado por precio y por principios, y eso ha convertido un mercado informal en sector.',
      'El negocio físico de segunda mano vive de dos cosas: flujo constante de producto bueno y curaduría. La tienda que selecciona bien cobra más que el rastro; la que acepta todo se convierte en almacén.',
      'Los márgenes pueden ser excelentes (compras a precio de deshacerse, vendes a precio de tesoro), pero el trabajo de selección es el auténtico coste oculto del modelo.',
    ],
    g: '¿Tu idea es de segunda mano o economía circular? Valídala gratis: es un sector donde el análisis de viabilidad marca la diferencia.',
  },
  // ---------- FRANQUICIAS ----------
  {
    cat: 'franquicias',
    t: 'Cómo funciona realmente una franquicia: canon, royalties y letra pequeña',
    p: [
      'Una franquicia es un alquiler de un sistema que funciona: marca, manuales, proveedores, formación. A cambio pagas un canon de entrada, un royalty periódico sobre ventas y, a menudo, un fondo de publicidad.',
      'La letra pequeña importa: duración del contrato, exclusividad de zona, obligación de comprar a proveedores de la central, condiciones de salida. Todo eso define cuánto es tuyo y cuánto del franquiciador.',
      'La franquicia reduce el riesgo del modelo, no lo elimina: la ubicación, la gestión y el equipo siguen siendo tuyos. Una buena marca en malas manos cierra igual que cualquier bar.',
    ],
    g: '¿Comparas franquicias con montar algo propio? Si tienes idea propia, valídala gratis: quizá no necesites pagar canon.',
  },
  {
    cat: 'franquicias',
    t: 'Franquicias con inversión baja: qué esperar de menos de 20.000 euros',
    p: [
      'Las franquicias de baja inversión suelen ser de servicios (academias, agencias, consultoría, estética) o modelos sin local caro. Lo que ahorras en entrada lo pagas en protagonismo: el negocio eres tú trabajando.',
      'Ojo con la cuenta total: el canon anunciado rara vez incluye obra, stock inicial, tesorería de arranque y los meses sin ingresos. Pide siempre la "inversión total estimada", no el canon.',
      'En este rango de precio, la pregunta clave es: ¿qué me aporta la franquicia que no podría hacer solo? Si la respuesta es "poco más que el nombre", quizá tu negocio propio sale más barato.',
    ],
    g: '¿Tienes una idea propia que podría competir con una franquicia? Valídala gratis antes de pagar ningún canon.',
  },
  {
    cat: 'franquicias',
    t: 'Preguntas que debes hacer al franquiciador antes de firmar nada',
    p: [
      'Antes de firmar con una franquicia, pregunta: cuántos franquiciados han cerrado en los últimos tres años (y por qué), cuál es la facturación media real de las unidades, y pide hablar con franquiciados actuales ELEGIDOS POR TI.',
      'Pregunta también por el detalle económico completo: royalty, canon de publicidad, márgenes obligados por compras a la central, costes de renovación de imagen. Y por escrito.',
      'La señal de alarma definitiva: un franquiciador que te presiona para firmar rápido o que evita que hables con franquiciados reales. Las franquicias serias presumen de sus franquiciados, no los esconden.',
    ],
    g: '¿Estás valorando una franquicia? Un plan de negocio propio te da la vara de medir: empieza validando tu idea gratis.',
  },
  {
    cat: 'franquicias',
    t: 'Las franquicias de restauración: las cifras que no salen en el folleto',
    p: [
      'La restauración es el rey de las franquicias: cafeterías, hamburgueserías, poke, cadenas de pizzas. El folleto te enseña la facturación de la mejor tienda; tu realidad será la mediana, no el escaparate.',
      'Las cifras que piden análisis: margen real después de royalties y publicidad, coste de las materias primas compradas a la central, y rentabilidad del metro cuadrado en ubicaciones comparables a la tuya.',
      'La restauración es además el sector con más rotación: incluso las buenas marcas tienen franquiciados que cierran. Pregunta cuántos, dónde y por qué antes de firmar nada.',
    ],
    g: '¿Te han presentado una franquicia de restauración? Contrasta los números: valida tu proyecto gratis con nosotros.',
  },
  {
    cat: 'franquicias',
    t: 'Señales de alarma en una franquicia (y cómo comprobar sus números)',
    p: [
      'Red flags de una franquicia: crecimiento explosivo de franquiciados sin tiendas propias, ingresos de la central que dependen de los cánones de entrada y no de los royalties, y silencio cuando pides datos de cierres.',
      'Cómo comprobar: registro de franquiciadores, cuentas anuales de la central en el Registro Mercantil, y conversaciones con franquiciados actuales y, sobre todo, CON EXFRANQUICIADOS.',
      'Una franquicia sana gana dinero cuando tú ganas dinero (royalties sobre ventas). Una franquicia enferma gana dinero cuando tú entras (cánones). Esa diferencia lo explica casi todo.',
    ],
    g: '¿Dudas de una franquicia que te han ofrecido? Valida tu proyecto gratis: una segunda opinión a tiempo vale miles de euros.',
  },
  {
    cat: 'franquicias',
    t: 'Franquicias de servicios: menos glamour, más margen',
    p: [
      'Sin obradores, sin stock, sin locales de 200 metros: las franquicias de servicios (academias, agencias, reformas, cuidados, consultoría) tienen estructuras de coste mucho más ligeras que las de producto.',
      'La contrapartida: el activo principal eres tú y tu equipo. La marca aporta el método, pero la ejecución diaria depende de tu capacidad comercial y de gestión.',
      'Para perfiles que vienen del mundo laboral sin experiencia en ventas, puede ser una buena escuela: sistema probado, acompañamiento y riesgo contenido. Para quien ya domina su sector, a veces el canon pesa más que lo que aporta.',
    ],
    g: '¿Vienes del mundo laboral y valoras una franquicia de servicios? Si tienes idea propia, valídala gratis: compara antes de decidir.',
  },
  {
    cat: 'franquicias',
    t: 'El contrato de franquicia: cláusulas que debes revisar con lupa',
    p: [
      'El contrato de franquicia define tu vida durante años: duración y renovación, exclusividad territorial, obligaciones de compra, estándares de imagen, condiciones de traspaso y, muy importante, qué pasa si quieres salirte.',
      'Las cláusulas que más conflictos generan: las de no competencia posterior (pueden impedirte trabajar en tu sector años después) y las de compras obligadas a la central a precios no competitivos.',
      'La regla de oro: revisión jurídica independiente antes de firmar. Un abogado que haya visto contratos de franquicia detecta en una hora lo que a ti te costará años descubrir.',
    ],
    g: 'Antes de firmar cualquier contrato, asegúrate de que el negocio en sí merece la pena. Valida tu proyecto gratis.',
  },
  {
    cat: 'franquicias',
    t: 'Cuánto tarda una franquicia en recuperar la inversión',
    p: [
      'El payback típico que anuncian las franquicias serias oscila entre dos y cuatro años. Todo lo que prometa recuperación en meses merece escepticismo inmediato.',
      'El cálculo honesto: inversión total (no solo el canon) dividida entre el beneficio neto mensual realista, que no es la facturación del folleto sino lo que queda después de TODO, incluido tu sueldo.',
      'Y recuerda que recuperar la inversión no es ganar dinero: es volver a cero. La rentabilidad empieza después. Planifica tu vida financiera con ese horizonte, no con el del folleto.',
    ],
    g: '¿Quieres comparar el payback de una franquicia con el de tu propia idea? Valida tu idea gratis y decide con datos.',
  },
  {
    cat: 'franquicias',
    t: 'Franquicias en pueblos y ciudades medias: dónde funcionan mejor',
    p: [
      'Muchas franquicias exigen mínimos de población que dejan fuera a las ciudades pequeñas. Otras, al contrario, tienen su mejor terreno ahí: menos competencia, alquileres bajos, clientela fiel.',
      'El factor decisivo en poblaciones medianas es el boca a boca: un negocio bien llevado se hace conocido en meses; uno mal llevado, en semanas. La marca ayuda menos y la gestión diaria pesa más.',
      'Si vives en una ciudad media, mira franquicias de servicios básicos antes que conceptos de moda urbana: lo que en la capital es uno más, en tu ciudad puede ser el único.',
    ],
    g: '¿Quieres montar algo en tu ciudad? Valida tu idea gratis: el tamaño del mercado local es lo primero que analizamos.',
  },
  {
    cat: 'franquicias',
    t: 'Ser franquiciado no te salva de necesitar un plan de negocio',
    p: [
      'Hay quien cree que con una franquicia el plan ya viene hecho. Error: la central te da el manual de operaciones, pero tu plan financiero (tu inversión, tus costes locales, tu tesorería) es solo tuyo.',
      'Los bancos lo saben: para financiar una franquicia piden el plan de negocio igual que para cualquier otro proyecto. Y el franquiciador serio también te pedirá un análisis de tu mercado local.',
      'De hecho, el plan es tu única herramienta para negociar con la central desde el conocimiento: cuando sabes tus números, sabes qué te están vendiendo de verdad.',
    ],
    g: '¿Vas a montar una franquicia y necesitas el plan para financiarla? Empieza validando el proyecto: es gratis.',
  },
  {
    cat: 'franquicias',
    t: 'De franquiciado a franquiciador: cuándo un negocio puede franquiciarse',
    p: [
      'El otro lado del espejo: si tu negocio funciona y es replicable, franquiciarlo puede ser tu vía de crecimiento sin capital propio. Pero franquiciar no es copiar: es empaquetar un sistema completo.',
      'Los requisitos serios: al menos dos o tres unidades propias funcionando con rentabilidad demostrada, manuales operativos completos, marca registrada y capacidad de dar soporte real a los franquiciados.',
      'Franquiciar antes de tiempo es la vía rápida al desastre: cada franquiciado que cierra daña tu marca más que diez que abren. Primero el sistema, luego la expansión.',
    ],
    g: '¿Tu negocio ya funciona y piensas en escalarlo? Si aún estás en la idea, empieza por validarla gratis.',
  },
]
