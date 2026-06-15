import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HelpCircle, LogIn, Menu, Search, X } from 'lucide-react'
import { Button } from '../ui/Button'
import satLogo from '../../assets/sat-logo.png'
import './Header.css'

const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Papeletas', path: '/papeleta' },
  { label: 'Pagar', path: '/pagar' },
  { label: 'Mesa de Partes', path: '/mesa-partes' },
  { label: 'Alertas', path: '/alertas' },
  // 'Mi cuenta' se comenta: era redundante con el botón "Iniciar sesión".
  // El acceso/registro queda accesible desde ese botón y desde el ecosistema.
  // { label: 'Mi cuenta', path: '/perfil' },
]

// Accesos rápidos: ocultado temporalmente del navbar.
// const accesosRapidos = [
//   { label: 'Portal Virtual SAT', url: externalLinks.portalPrincipal },
//   { label: 'Verificar documento', url: externalLinks.verificaDocumento },
//   { label: 'Acceso a información pública', url: externalLinks.transparenciaSolicitud },
//   { label: 'Dataset de papeletas', url: externalLinks.datasetPapeletas },
// ]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="header-logo" onClick={closeMenu} aria-label="SAT Lima - Inicio">
          <img src={satLogo} alt="SAT - Servicio de Administración Tributaria de Lima" className="header-logo-img" />
        </Link>

        <nav className={`header-nav ${menuOpen ? 'header-nav--open' : ''}`} aria-label="Navegación principal">
          {navItems.map((item) => {
            const isActive = item.path === location.pathname
            return (
              <Link
                key={item.label}
                to={item.path}
                className={isActive ? 'active' : ''}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            )
          })}

          {/* Accesos rápidos: ocultado temporalmente.
          <div className={`header-dropdown ${accesosOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className="header-dropdown__trigger"
              aria-expanded={accesosOpen}
              onClick={() => setAccesosOpen((v) => !v)}
            >
              Accesos rápidos
              <ChevronDown size={16} className={`header-dropdown__chevron ${accesosOpen ? 'is-open' : ''}`} />
            </button>
            <div className="header-dropdown__menu">
              <span className="header-dropdown__label">Servicios oficiales del SAT</span>
              {accesosRapidos.map((acceso) => (
                <a
                  key={acceso.label}
                  href={acceso.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-dropdown__item"
                  onClick={closeMenu}
                >
                  {acceso.label}
                </a>
              ))}
            </div>
          </div>
          */}
        </nav>

        <div className="header-actions">
          <button type="button" className="header-icon-btn" aria-label="Buscar">
            <Search size={20} />
          </button>
          <button type="button" className="header-icon-btn header-icon-btn--hide-mobile" aria-label="Ayuda">
            <HelpCircle size={20} />
          </button>
          <Button
            variant="filled"
            color="primary"
            to="/perfil"
            className="header-login-btn"
            onClick={closeMenu}
          >
            <LogIn size={18} />
            <span>Iniciar sesión</span>
          </Button>
          <button
            type="button"
            className="header-menu-btn"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && <div className="header-overlay" onClick={closeMenu} aria-hidden="true" />}
    </header>
  )
}
