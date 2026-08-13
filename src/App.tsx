import { Routes, Route, Navigate } from 'react-router'
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

export default function App() {
  return (
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
