import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ecosystemMap } from '../../data/services'
import './EcosystemMap.css'

export function EcosystemMap() {
  return (
    <section className="section ecosystem">
      <div className="container">
        <h2 className="section-title">Todo el SAT, reorganizado por lo que necesitas</h2>
        <p className="section-subtitle">
          Unificamos los sistemas existentes (Consultas, Pagos, Agencia Virtual, Mesa de Partes,
          Pitazo y más) en un solo lugar. Nada se pierde: cada servicio sigue disponible.
        </p>

        <div className="ecosystem-grid">
          {ecosystemMap.map((entry) => (
            <div key={entry.need} className="ecosystem-card">
              <h3 className="ecosystem-card__need">{entry.need}</h3>
              <p className="ecosystem-card__desc">{entry.description}</p>
              <ul className="ecosystem-card__systems">
                {entry.systems.map((sys) => (
                  <li key={sys.name}>
                    {sys.path ? (
                      <Link to={sys.path} className="ecosystem-link ecosystem-link--internal">
                        {sys.name}
                      </Link>
                    ) : (
                      <a
                        href={sys.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ecosystem-link"
                      >
                        {sys.name}
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
