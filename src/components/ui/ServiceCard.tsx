import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bell,
  Calendar,
  Car,
  CreditCard,
  PieChart,
  Scale,
} from 'lucide-react'
import type { ServiceCard as ServiceCardType } from '../../types'
import './ServiceCard.css'

const iconMap = {
  car: Car,
  'credit-card': CreditCard,
  scale: Scale,
  calendar: Calendar,
  'pie-chart': PieChart,
  bell: Bell,
}

interface ServiceCardProps {
  service: ServiceCardType
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Car

  return (
    <Link to={service.path} className="service-card" style={{ '--card-color': service.color } as CSSProperties}>
      <div className="service-card-icon">
        <Icon size={28} strokeWidth={1.75} />
      </div>
      <h3 className="service-card-title">{service.title}</h3>
      <p className="service-card-desc">{service.description}</p>
      <span className="service-card-arrow" aria-hidden="true">
        <ArrowRight size={18} />
      </span>
    </Link>
  )
}
