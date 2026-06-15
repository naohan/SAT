import { Search } from 'lucide-react'
import { Button } from '../ui/Button'
import './SearchSection.css'

interface SearchSectionProps {
  query: string
  onQueryChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function SearchSection({ query, onQueryChange, onSubmit }: SearchSectionProps) {
  return (
    <section className="section search-section">
      <div className="container">
        <h2 className="section-title">¿Qué deseas resolver hoy?</h2>
        <p className="section-subtitle">
          Busca por DNI, placa o número de trámite para comenzar
        </p>
        <form className="search-form" onSubmit={onSubmit}>
          <Search size={22} className="search-form__icon" aria-hidden="true" />
          <input
            type="search"
            className="search-form__input"
            placeholder="Buscar por DNI, placa o número de trámite"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Buscar por DNI, placa o número de trámite"
          />
          <Button type="submit" variant="filled" color="secondary" className="search-form__btn">
            Buscar
          </Button>
        </form>
      </div>
    </section>
  )
}
