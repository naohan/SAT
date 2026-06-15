import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AlertasPage } from './pages/AlertasPage'
import { CuotasPage } from './pages/CuotasPage'
import { DescargoPage } from './pages/DescargoPage'
import { HomePage } from './pages/HomePage'
import { MesaPartesPage } from './pages/MesaPartesPage'
import { PagarPage } from './pages/PagarPage'
import { PapeletaPage } from './pages/PapeletaPage'
import { PerfilPage } from './pages/PerfilPage'
import { TramitePage } from './pages/TramitePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="papeleta" element={<PapeletaPage />} />
          <Route path="pagar" element={<PagarPage />} />
          <Route path="descargo" element={<DescargoPage />} />
          <Route path="tramite" element={<TramitePage />} />
          <Route path="mesa-partes" element={<MesaPartesPage />} />
          <Route path="cuotas" element={<CuotasPage />} />
          <Route path="alertas" element={<AlertasPage />} />
          <Route path="perfil" element={<PerfilPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
