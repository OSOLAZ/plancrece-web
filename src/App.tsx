import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Precios from './pages/Precios'
import ComoFunciona from './pages/ComoFunciona'
import Garantias from './pages/Garantias'
import Faq from './pages/Faq'
import Contacto from './pages/Contacto'
import Blog from './pages/Blog'
import BlogArticulo from './pages/BlogArticulo'
import Franquicias from './pages/Franquicias'
import FranquiciaDetalle from './pages/FranquiciaDetalle'
import Financiacion from './pages/Financiacion'
import Comunidad from './pages/Comunidad'
import QuienesSomos from './pages/QuienesSomos'
import Hilo from './pages/Hilo'
import Legal from './pages/Legal'
import CapitalizarParo from './pages/CapitalizarParo'
import NotFound from './pages/NotFound'
import { ChatWidget } from './components/ChatWidget'

// Compatibilidad con URLs antiguas de la época de HashRouter,
// tipo plancrece.com/#/precios: las reescribe a su ruta limpia
// equivalente sin recargar la página.
function HashCompatRedirect() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.hash.startsWith('#/')) {
      const destino = location.hash.slice(1)
      navigate(destino, { replace: true })
    }
  }, [location.hash, navigate])

  return null
}

export default function App() {
  return (
    <>
      <HashCompatRedirect />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/precios" element={<Precios />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/garantias" element={<Garantias />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticulo />} />
          <Route path="/franquicias" element={<Franquicias />} />
          <Route path="/franquicias/:slug" element={<FranquiciaDetalle />} />
          <Route path="/financiacion" element={<Financiacion />} />
          <Route path="/comunidad" element={<Comunidad />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/comunidad/:slug" element={<Hilo />} />
          <Route path="/legal/:pagina" element={<Legal />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/capitalizar-paro" element={<CapitalizarParo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ChatWidget />
    </>
  )
}
