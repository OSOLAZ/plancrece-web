import { Link, useParams } from 'react-router'

// ---------------------------------------------------------------------------
// Páginas legales con PLACEHOLDERS. Antes de publicar, sustituir todos los
// textos entre corchetes […] por los datos reales del titular.
// ---------------------------------------------------------------------------

const DATOS = {
  titular: '[NOMBRE O RAZÓN SOCIAL DEL TITULAR]',
  nif: '[NIF/CIF]',
  domicilio: '[DOMICILIO SOCIAL COMPLETO]',
  email: 'clientes@plancrece.com',
  dominio: 'plancrece.com',
  fecha: '[FECHA DE ÚLTIMA ACTUALIZACIÓN]',
}

function Marco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50/60 to-white">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-extrabold text-[#0B2447]">{titulo}</h1>
        <p className="mt-2 text-sm text-foreground/50">
          Última actualización: {DATOS.fecha}
        </p>
        <div className="prose-sm mt-8 space-y-8 text-[15px] leading-relaxed text-foreground/85">
          {children}
        </div>
        <p className="mt-10 text-sm">
          <Link to="/" className="font-semibold text-primary hover:underline">
            ← Volver a la página principal
          </Link>
        </p>
      </div>
    </div>
  )
}

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-[#0B2447]">{titulo}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  )
}

function AvisoLegal() {
  return (
    <Marco titulo="Aviso legal">
      <Seccion titulo="1. Titular del sitio web">
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de
          Servicios de la Sociedad de la Información y de Comercio Electrónico
          (LSSI-CE), se informa de los siguientes datos:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Titular: {DATOS.titular}</li>
          <li>NIF/CIF: {DATOS.nif}</li>
          <li>Domicilio: {DATOS.domicilio}</li>
          <li>Correo electrónico: {DATOS.email}</li>
          <li>Sitio web: {DATOS.dominio}</li>
        </ul>
      </Seccion>
      <Seccion titulo="2. Objeto">
        <p>
          Este sitio web tiene por objeto la presentación y contratación de
          servicios de elaboración de planes de negocio, validación de ideas
          empresariales y documentación asociada (memorias de viabilidad,
          proyecciones financieras y materiales de presentación).
        </p>
      </Seccion>
      <Seccion titulo="3. Condiciones de uso">
        <p>
          El acceso y uso de este sitio web atribuye la condición de usuario e
          implica la aceptación de las presentes condiciones. El usuario se
          compromete a hacer un uso lícito del sitio y de los contenidos y
          servicios ofrecidos.
        </p>
        <p>
          Los contenidos del blog y de la comunidad tienen carácter orientativo
          y divulgativo: no constituyen asesoramiento legal, fiscal ni
          financiero personalizado, y no garantizan la concesión de ayudas,
          financiación o la viabilidad de ningún proyecto.
        </p>
      </Seccion>
      <Seccion titulo="4. Propiedad intelectual">
        <p>
          Todos los contenidos de este sitio (textos, diseño, logotipos,
          estructura) son titularidad de {DATOS.titular} o de sus licenciantes,
          y no pueden reproducirse sin autorización expresa.
        </p>
        <p>
          Los planes de negocio entregados a clientes se ceden para su uso
          libre por parte del cliente, incluyendo los formatos editables: el
          plan entregado es propiedad del cliente y no lleva ninguna marca de
          PlanCrece.
        </p>
      </Seccion>
      <Seccion titulo="5. Responsabilidad">
        <p>
          El titular no se responsabiliza de las decisiones empresariales
          adoptadas a partir de la información divulgativa del sitio. La
          contratación de servicios se rige por las condiciones del servicio
          publicadas en este mismo sitio.
        </p>
      </Seccion>
      <Seccion titulo="6. Legislación aplicable">
        <p>
          Estas condiciones se rigen por la legislación española. Para cualquier
          controversia serán competentes los juzgados de [CIUDAD DEL TITULAR],
          salvo fuero imperativo distinto.
        </p>
      </Seccion>
    </Marco>
  )
}

function Privacidad() {
  return (
    <Marco titulo="Política de privacidad">
      <Seccion titulo="1. Responsable del tratamiento">
        <ul className="list-disc space-y-1 pl-5">
          <li>Responsable: {DATOS.titular}</li>
          <li>NIF/CIF: {DATOS.nif}</li>
          <li>Domicilio: {DATOS.domicilio}</li>
          <li>Correo electrónico: {DATOS.email}</li>
        </ul>
      </Seccion>
      <Seccion titulo="2. Datos que recogemos y para qué">
        <p>
          A través de los formularios del sitio (validación de idea, contacto,
          solicitud de plan y peticiones sobre franquicias) recogemos los datos
          que nos facilitas voluntariamente: nombre, correo electrónico y la
          descripción de tu idea o consulta.
        </p>
        <p>
          Estos datos se utilizan exclusivamente para: responder a tu solicitud,
          valorar la viabilidad de tu idea, preparar presupuestos y, si contratas
          el servicio, elaborar tu plan de negocio y gestionar la facturación.
        </p>
      </Seccion>
      <Seccion titulo="3. Confidencialidad de tu idea">
        <p>
          La información sobre tu idea de negocio se trata con confidencialidad
          contractual: antes de elaborar ningún plan firmamos un acuerdo de
          confidencialidad (NDA), y tu idea nunca se reutiliza, comparte ni
          publica. Los testimonios que aparecen en la web son anónimos por este
          mismo motivo.
        </p>
      </Seccion>
      <Seccion titulo="4. Base jurídica y conservación">
        <p>
          La base del tratamiento es tu consentimiento (al enviar el formulario)
          y, en su caso, la ejecución del contrato de servicios. Los datos se
          conservan mientras dure la relación y los plazos legales aplicables;
          las consultas que no lleguen a contratación se eliminan en un plazo
          máximo de [PLAZO, p. ej. 12 meses].
        </p>
      </Seccion>
      <Seccion titulo="5. Destinatarios y encargados">
        <p>
          No cedemos tus datos a terceros salvo obligación legal. Para la
          prestación del servicio pueden intervenir encargados de tratamiento
          habituales (alojamiento web, correo electrónico y, si contratas, la
          pasarela de pago Stripe), siempre con las garantías exigidas por el
          RGPD.
        </p>
      </Seccion>
      <Seccion titulo="6. Tus derechos">
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión,
          oposición, limitación y portabilidad escribiendo a {DATOS.email}.
          También puedes reclamar ante la Agencia Española de Protección de
          Datos (www.aepd.es).
        </p>
      </Seccion>
    </Marco>
  )
}

function Cookies() {
  return (
    <Marco titulo="Política de cookies">
      <Seccion titulo="1. Qué son las cookies">
        <p>
          Las cookies son pequeños archivos que los sitios web guardan en tu
          dispositivo para funcionar correctamente o para recoger información
          de uso.
        </p>
      </Seccion>
      <Seccion titulo="2. Cookies que utiliza este sitio">
        <p>
          Este sitio web utiliza únicamente cookies técnicas imprescindibles
          para su funcionamiento (por ejemplo, para recordar tus preferencias
          de navegación). No utiliza cookies publicitarias ni de terceros con
          fines de marketing.
        </p>
        <p>
          [REVISAR ANTES DE PUBLICAR: si se instalan herramientas de analítica
          (p. ej. Google Analytics) o píxeles publicitarios, añadirlas aquí con
          su finalidad y duración, e implementar el banner de consentimiento
          correspondiente.]
        </p>
      </Seccion>
      <Seccion titulo="3. Cómo desactivar las cookies">
        <p>
          Puedes configurar tu navegador para rechazar o eliminar las cookies
          en cualquier momento desde sus ajustes de privacidad. Ten en cuenta
          que bloquear las cookies técnicas puede afectar al funcionamiento de
          algunas partes del sitio.
        </p>
      </Seccion>
    </Marco>
  )
}

function Condiciones() {
  return (
    <Marco titulo="Condiciones del servicio">
      <Seccion titulo="1. Qué incluye el servicio">
        <p>
          PlanCrece elabora planes de negocio personalizados según el plan
          contratado (Estándar o Avanzado), tal y como se describe en
          la página de precios vigente en el momento de la contratación. Antes
          de cualquier pago puedes enviar tu idea para una validación
          gratuita: te diremos con sinceridad si le vemos recorrido.
        </p>
      </Seccion>
      <Seccion titulo="2. Proceso y plazos">
        <ul className="list-disc space-y-1 pl-5">
          <li>Validación gratuita de la idea: respuesta en unos 3 días laborables.</li>
          <li>Tras el encargo y el pago, realizamos una entrevista para recoger la información necesaria.</li>
          <li>El plazo de entrega se confirma por escrito al contratar (habitualmente [PLAZO HABITUAL, p. ej. 7-10 días laborables]).</li>
          <li>Antes de la entrega final, contrastamos el plan contigo y lo cerramos solo cuando lo des por bueno.</li>
        </ul>
      </Seccion>
      <Seccion titulo="3. Entrega y propiedad del plan">
        <p>
          El plan se entrega en PDF y en formato editable (Word/Excel), para
          que puedas presentarlo, adaptarlo y actualizarlo como necesites. El
          documento no lleva ninguna marca de PlanCrece: es íntegramente
          tuyo y su uso es libre.
        </p>
      </Seccion>
      <Seccion titulo="4. Precios y pago">
        <p>
          Los precios vigentes son los publicados en la página de precios e
          incluyen IVA salvo indicación expresa. El pago se realiza por
          adelantado a través de la pasarela segura Stripe, que procesa los
          datos de tu tarjeta; PlanCrece no almacena datos bancarios.
        </p>
      </Seccion>
      <Seccion titulo="5. Política de devolución">
        <p>
          La validación inicial de la idea es gratuita y sin compromiso:
          precisamente para que solo pagues si el análisis indica que tu
          proyecto tiene recorrido.
        </p>
        <p>
          Una vez encargado y elaborado el plan —tratándose de un servicio
          personalizado que se entrega completo en formato descargable y
          editable— no cabe su devolución, conforme a la excepción prevista
          en el artículo 103.m) del Real Decreto Legislativo 1/2007 para
          contenido digital no prestado en soporte material. Precisamente por
          eso el plan se contrasta contigo antes de la entrega final y no se
          cierra hasta que lo das por bueno.
        </p>
      </Seccion>
      <Seccion titulo="6. Naturaleza del servicio">
        <p>
          El plan de negocio es un documento de análisis y presentación.
          PlanCrece no garantiza la concesión de financiación, ayudas o
          subvenciones, ni los resultados del negocio: esas decisiones
          corresponden a entidades y administraciones ajenas. Nuestro
          compromiso es la calidad del análisis y del documento entregado.
        </p>
      </Seccion>
      <Seccion titulo="7. Contacto y reclamaciones">
        <p>
          Para cualquier incidencia con el servicio puedes escribir a{' '}
          {DATOS.email}. Respondemos en menos de 3 días laborables.
        </p>
      </Seccion>
    </Marco>
  )
}

export default function Legal() {
  const { pagina } = useParams()
  if (pagina === 'privacidad') return <Privacidad />
  if (pagina === 'cookies') return <Cookies />
  if (pagina === 'condiciones') return <Condiciones />
  return <AvisoLegal />
}
