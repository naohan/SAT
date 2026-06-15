import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="page-flow-header">
      <Link to="/" className="back-link">
        <ArrowLeft size={18} />
        Volver al inicio
      </Link>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}
