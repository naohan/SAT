import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertOptIn } from '../components/ui/AlertOptIn'
import { FrequentServices } from '../components/home/FrequentServices'
import { Hero } from '../components/home/Hero'
import { HowItWorks } from '../components/home/HowItWorks'
import { SearchSection } from '../components/home/SearchSection'
import { ServiceGrid } from '../components/home/ServiceGrid'

export function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/papeleta?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <>
      <Hero />
      <SearchSection query={query} onQueryChange={setQuery} onSubmit={handleSearch} />
      <ServiceGrid />

      <section className="section section--tight">
        <div className="container">
          <AlertOptIn contexto="Activa tus avisos y no dejes vencer ninguna papeleta" />
        </div>
      </section>

      <HowItWorks />
      <FrequentServices />
    </>
  )
}
