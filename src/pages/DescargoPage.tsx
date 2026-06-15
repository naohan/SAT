import { useState } from 'react'
import { motivosDescargo } from '../data/mockData'
import { AlertBanner } from '../components/ui/AlertBanner'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { SelectField, TextAreaField } from '../components/ui/TextField'
import './DescargoPage.css'

export function DescargoPage() {
  const [motivo, setMotivo] = useState('')
  const [explicacion, setExplicacion] = useState('')
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="page-flow">
        <div className="container">
          <PageHeader title="Descargo enviado" description="Tu solicitud ha sido registrada correctamente" />
          <Card padding="lg" className="success-card">
            <div className="success-card__icon">✓</div>
            <h2 className="success-card__title">Descargo registrado</h2>
            <p className="success-card__ref">
              Número de trámite: <strong>MP-2026-0045822</strong>
            </p>
            <AlertBanner variant="info">
              Recibirás una notificación cuando haya una actualización. Puedes dar seguimiento en &quot;Tengo un trámite&quot;.
            </AlertBanner>
            <Button variant="tonal" color="primary" to="/tramite" className="success-card__action">
              Ver estado del trámite
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="page-flow">
      <div className="container">
        <PageHeader
          title="Presentar descargo"
          description="Indica por qué no estás de acuerdo con la infracción"
        />

        <Card>
          <form onSubmit={handleSubmit}>
            <div className="papeleta-ref">
              <span className="papeleta-ref__label">Papeleta asociada</span>
              <span className="papeleta-ref__value">M01-000123</span>
            </div>

            <SelectField
              label="Motivo de desacuerdo"
              id="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
            >
              <option value="">Seleccione un motivo</option>
              {motivosDescargo.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </SelectField>

            <TextAreaField
              label="Explica tu descargo"
              id="explicacion"
              value={explicacion}
              onChange={(e) => setExplicacion(e.target.value)}
              placeholder="Describe los hechos y por qué consideras que la infracción no procede..."
              required
            />

            <div className="md-field">
              <span className="md-field__label">Documentos de sustento (opcional)</span>
              <div className="upload-zone">
                <p>Arrastra archivos aquí o haz clic para adjuntar</p>
                <p className="upload-zone__hint">PDF, JPG o PNG — máx. 5 MB</p>
              </div>
            </div>

            <Button type="submit" variant="filled" color="tertiary" block>
              Enviar descargo
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
