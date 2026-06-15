import { Link } from 'react-router-dom'
import { Download, Eye, FileCheck, Globe, CreditCard } from 'lucide-react'
import { frequentServices } from '../../data/services'
import './FrequentServices.css'

const iconList = [Eye, CreditCard, Download, FileCheck, Globe]

export function FrequentServices() {
  return (
    <section className="section frequent-section">
      <div className="container">
        <h2 className="section-title">Servicios frecuentes</h2>
        <div className="frequent-list">
          {frequentServices.map((service, i) => {
            const Icon = iconList[i] ?? Eye
            const content = (
              <>
                <Icon size={18} />
                <span>{service.label}</span>
              </>
            )

            if ('path' in service && service.path) {
              return (
                <Link key={service.label} to={service.path} className="frequent-item">
                  {content}
                </Link>
              )
            }

            return (
              <a
                key={service.label}
                href={'externalUrl' in service ? service.externalUrl : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="frequent-item"
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
