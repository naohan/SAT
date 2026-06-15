import { Link } from 'react-router-dom'
import { Building2, Bell, FileText, Globe, Search } from 'lucide-react'
import { quickAccess } from '../../data/services'
import './QuickAccess.css'

const iconMap: Record<string, React.ReactNode> = {
  avisat: <Globe size={24} />,
  agencia: <Building2 size={24} />,
  mesa: <FileText size={24} />,
  pitazo: <Bell size={24} />,
  consulta: <Search size={24} />,
}

export function QuickAccess() {
  return (
    <section className="section quick-access-section">
      <div className="container">
        <h2 className="section-title">Accesos rápidos</h2>
        <p className="section-subtitle">Sistemas y herramientas del ecosistema SAT</p>
        <div className="quick-access-grid">
          {quickAccess.map((item) => {
            const content = (
              <>
                <span className="quick-access-icon">{iconMap[item.id]}</span>
                <span className="quick-access-label">{item.label}</span>
              </>
            )

            if (item.path) {
              return (
                <Link key={item.id} to={item.path} className="quick-access-item">
                  {content}
                </Link>
              )
            }

            return (
              <a
                key={item.id}
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="quick-access-item"
              >
                {content}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
