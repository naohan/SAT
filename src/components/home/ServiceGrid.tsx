import { mainServices } from '../../data/services'
import { ServiceCard } from '../ui/ServiceCard'
import './ServiceGrid.css'

export function ServiceGrid() {
  return (
    <section className="section">
      <div className="container">
        <div className="service-grid">
          {mainServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
