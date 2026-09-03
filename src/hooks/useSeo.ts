import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { resolveSeo } from '../data/seoMeta'

// ---------------------------------------------------------------------------
// useSeo (SEO-3): aplica title, description, robots, canonical, Open Graph y
// Twitter Cards según la ruta actual. Puro DOM, sin dependencias nuevas.
// og:image queda omitido provisionalmente hasta aprobar el asset og.png.
// ---------------------------------------------------------------------------

function setMetaByName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setMetaByProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!href) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function useSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = resolveSeo(pathname)

    document.title = meta.title
    setMetaByName('description', meta.description)
    setMetaByName('robots', meta.robots)
    setCanonical(meta.canonical)

    // Open Graph
    setMetaByProperty('og:type', meta.ogType)
    setMetaByProperty('og:title', meta.title)
    setMetaByProperty('og:description', meta.description)
    setMetaByProperty('og:locale', 'es_ES')
    setMetaByProperty('og:site_name', 'PlanCrece')
    if (meta.canonical) {
      setMetaByProperty('og:url', meta.canonical)
    } else {
      document.head.querySelector('meta[property="og:url"]')?.remove()
    }

    // Twitter Cards (sin imagen: summary)
    setMetaByName('twitter:card', 'summary')
    setMetaByName('twitter:title', meta.title)
    setMetaByName('twitter:description', meta.description)
  }, [pathname])
}
