import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { mockPapeletas } from '../data/mockData'
import { AlertOptIn } from '../components/ui/AlertOptIn'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PapeletaResultCard } from '../components/ui/PapeletaResultCard'
import { PageHeader } from '../components/ui/PageHeader'
import { TextField } from '../components/ui/TextField'

export function PapeletaPage() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [dni, setDni] = useState(initialQuery)
  const [placa, setPlaca] = useState('')
  const [numero, setNumero] = useState('')
  const [results, setResults] = useState<typeof mockPapeletas | null>(null)
  const [searched, setSearched] = useState(false)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearched(true)
    const filtered = mockPapeletas.filter(
      (p) =>
        (!dni || p.dni.includes(dni)) &&
        (!placa || p.placa.toLowerCase().includes(placa.toLowerCase())) &&
        (!numero || p.numero.toLowerCase().includes(numero.toLowerCase())),
    )
    setResults(filtered.length > 0 ? filtered : mockPapeletas)
  }

  return (
    <div className="page-flow">
      <div className="container">
        <PageHeader
          title="Tengo una papeleta"
          description="Consulta tus infracciones de tránsito y conoce tus opciones"
        />

        <Card>
          <form onSubmit={handleSearch}>
            <div className="form-row">
              <TextField
                label="DNI"
                id="dni"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Ej: 76328915"
              />
              <TextField
                label="Placa"
                id="placa"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
                placeholder="Ej: ABC-123"
              />
              <TextField
                label="N.° de papeleta"
                id="numero"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="Ej: M01-000123"
              />
            </div>
            <div className="form-actions">
              <Button type="submit" variant="filled" color="secondary">
                Buscar papeletas
              </Button>
            </div>
          </form>
        </Card>

        {searched && results && (
          <div className="results-stack">
            {results.map((papeleta) => (
              <PapeletaResultCard key={papeleta.id} papeleta={papeleta} />
            ))}
            <AlertOptIn
              contexto="Te recordaremos esta y futuras papeletas antes de que venzan"
              dniInicial={dni}
            />
          </div>
        )}
      </div>
    </div>
  )
}
