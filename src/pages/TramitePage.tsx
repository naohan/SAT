import { useState } from 'react'
import { mockTramite } from '../data/mockData'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { DetailGrid, DetailItem } from '../components/ui/DetailGrid'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import { SelectField, TextField } from '../components/ui/TextField'
import './TramitePage.css'

const procedimientos = [
  'Tributario',
  'Tránsito',
  'Multas Administrativas',
  'Documento Simple',
  'Acceso a la Información Pública',
]

const tiposTramite = [
  'Descargo de papeletas',
  'Suspensión de cobranza coactiva',
  'Prescripción de papeletas',
  'Constancia de no adeudo',
  'Solicitud de ratificación',
  'Otro',
]

export function TramitePage() {
  const [procedimiento, setProcedimiento] = useState('')
  const [tipo, setTipo] = useState('')
  const [numero, setNumero] = useState('')
  const [result, setResult] = useState<typeof mockTramite | null>(null)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (numero.trim()) setResult(mockTramite)
  }

  return (
    <div className="page-flow">
      <div className="container">
        <PageHeader
          title="Tengo un trámite"
          description="Consulta el estado de tus solicitudes en Mesa de Partes"
        />

        <Card>
          <h2 className="card-section-title">Criterios de búsqueda</h2>
          <form onSubmit={handleSearch} className="tramite-search">
            <SelectField
              label="Procedimiento"
              value={procedimiento}
              onChange={(e) => setProcedimiento(e.target.value)}
            >
              <option value="">Seleccione...</option>
              {procedimientos.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </SelectField>
            <SelectField
              label="Tipo de trámite"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Seleccione...</option>
              {tiposTramite.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </SelectField>
            <TextField
              label="Número de trámite"
              id="tramite"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="Ej: MP-2026-0045821"
              className="tramite-search__field"
            />
            <Button type="submit" variant="filled" color="primary">
              Buscar
            </Button>
          </form>
        </Card>

        {result && (
          <Card className="tramite-result">
            <div className="tramite-result__header">
              <h2 className="tramite-result__title">{result.numero}</h2>
              <StatusBadge status={result.estado} variant="pending" />
            </div>

            <DetailGrid columns={2}>
              <DetailItem label="Tipo de trámite" value={result.tipo} />
              <DetailItem label="Fecha de ingreso" value={result.fechaIngreso} />
              <DetailItem label="Área responsable" value={result.area} />
              <DetailItem label="Última actualización" value={result.ultimaActualizacion} />
            </DetailGrid>

            <Button variant="outlined" color="primary" className="tramite-result__download">
              Descargar constancia
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
