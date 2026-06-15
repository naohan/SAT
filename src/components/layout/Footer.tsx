import { externalLinks } from '../../data/externalLinks'
import { MessageCircle } from 'lucide-react'
import satLogoBlanco from '../../assets/sat-logo-blanco.png'
import './Footer.css'

const socialLinks = [
  { label: 'Facebook', abbr: 'FB' },
  { label: 'Instagram', abbr: 'IG' },
  { label: 'YouTube', abbr: 'YT' },
  { label: 'LinkedIn', abbr: 'IN' },
]

const infoLinks = [
  { label: 'Quiénes somos', href: externalLinks.portalPrincipal },
  { label: 'Transparencia', href: externalLinks.transparenciaConsulta },
  { label: 'Términos y condiciones', href: externalLinks.portalPrincipal },
  { label: 'Política de privacidad', href: externalLinks.portalPrincipal },
]

const interestLinks = [
  { label: 'Pagos en línea', href: externalLinks.pagosEnLinea },
  { label: 'Verificar documento', href: externalLinks.verificaDocumento },
  { label: 'Bolsa de trabajo', href: externalLinks.vacantes },
  { label: 'SmartSAT (App)', href: externalLinks.portalPrincipal },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <img
            src={satLogoBlanco}
            alt="SAT - Servicio de Administración Tributaria de Lima"
            className="footer-logo-img"
          />
          <div className="footer-social">
            {socialLinks.map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="footer-social-link">
                {s.abbr}
              </a>
            ))}
          </div>
          <div className="footer-contact">
            <p><strong>Teléfono:</strong> (054) 200-1200</p>
            <p><strong>Correo:</strong> consultas@sat.gob.pe</p>
            <p><strong>Dirección:</strong> Av. Ejército 123, Arequipa</p>
            <p><strong>Horario:</strong> Lun–Vie 8:30–16:30</p>
          </div>
        </div>

        <div className="footer-col">
          <h4>Información</h4>
          <ul>
            {infoLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Enlaces de interés</h4>
          <ul>
            {interestLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-attention">
          <h4>Atención al ciudadano</h4>
          <p>¿Necesitas ayuda? Escríbenos por WhatsApp y te orientamos.</p>
          <a
            href={externalLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-whatsapp-btn"
          >
            <MessageCircle size={20} />
            Ir a WhatsApp
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 SAT — Servicio de Administración Tributaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
