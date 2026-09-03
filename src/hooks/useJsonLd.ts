import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { resolveSeo, SITE_URL } from '../data/seoMeta'

// ---------------------------------------------------------------------------
// useJsonLd (SEO-5): schema mínimo verificable.
// Emite un único <script type="application/ld+json"> solo en las cuatro rutas
// aprobadas, y lo elimina en cualquier otra ruta o al desmontar.
// Limitación CSR conocida: el JSON-LD no está en el HTML inicial.
// ---------------------------------------------------------------------------

const SCRIPT_SELECTOR = 'script[type="application/ld+json"][data-plancrece-schema]'

const ORG_ID = `${SITE_URL}/#org`
const SITE_ID = `${SITE_URL}/#site`

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'PlanCrece',
  url: `${SITE_URL}/`,
  email: 'clientes@plancrece.com',
}

const WEBSITE = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  name: 'PlanCrece',
  url: `${SITE_URL}/`,
  publisher: { '@id': ORG_ID },
}

function webPage(pathname: string, type: 'WebPage' | 'AboutPage' | 'CollectionPage' = 'WebPage') {
  const meta = resolveSeo(pathname)
  return {
    '@type': type,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}${pathname === '/' ? '/' : pathname}`,
  }
}

// Solo Home enlaza entidades entre sí; las rutas secundarias emiten
// schemas autocontenidos, sin referencias a nodos definidos en otra URL.
function homeWebPage() {
  return { ...webPage('/'), isPartOf: { '@id': SITE_ID } }
}

function resolveJsonLd(pathname: string): object | null {
  switch (pathname) {
    case '/':
      return {
        '@context': 'https://schema.org',
        '@graph': [ORGANIZATION, WEBSITE, homeWebPage()],
      }
    case '/quienes-somos':
      return { '@context': 'https://schema.org', ...webPage('/quienes-somos', 'AboutPage') }
    case '/capitalizar-paro':
      return { '@context': 'https://schema.org', ...webPage('/capitalizar-paro') }
    case '/franquicias':
      return { '@context': 'https://schema.org', ...webPage('/franquicias', 'CollectionPage') }
    default:
      return null
  }
}

function removeScript() {
  document.head.querySelector(SCRIPT_SELECTOR)?.remove()
}

export function useJsonLd() {
  const { pathname } = useLocation()

  useEffect(() => {
    removeScript()
    const data = resolveJsonLd(pathname)
    if (data) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-plancrece-schema', 'true')
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
    }
    return removeScript
  }, [pathname])
}
