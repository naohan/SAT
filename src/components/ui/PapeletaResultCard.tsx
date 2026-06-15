import { Camera, HelpCircle, Scale, TrafficCone } from 'lucide-react'
import type { Papeleta } from '../../types'
import { AlertBanner } from './AlertBanner'
import { Button } from './Button'
import { Card } from './Card'
import { DetailGrid, DetailItem } from './DetailGrid'
import { StatusBadge } from './StatusBadge'
import './PapeletaResultCard.css'

interface PapeletaResultCardProps {
  papeleta: Papeleta
}

export function PapeletaResultCard({ papeleta }: PapeletaResultCardProps) {
  return (
    <Card className="papeleta-result">
      <div className="papeleta-result__header">
        <div className="papeleta-result__title-group">
          <span className="papeleta-result__eyebrow">
            <TrafficCone size={16} />
            Infracción detectada
          </span>
          <h2 className="papeleta-result__title">Papeleta {papeleta.numero}</h2>
        </div>
        <StatusBadge status={papeleta.estado} variant="pending" />
      </div>

      <DetailGrid columns={4}>
        <DetailItem label="Motivo" value={papeleta.motivo} />
        <DetailItem label="Fecha" value={papeleta.fecha} />
        <DetailItem label="Monto" value={`S/ ${papeleta.monto.toFixed(2)}`} highlight />
        <DetailItem
          label="Tiempo restante"
          value={`${papeleta.diasRestantes} días`}
          warning={papeleta.diasRestantes <= 10}
        />
      </DetailGrid>

      <p className="papeleta-result__question">¿Qué desea hacer?</p>

      <div className="papeleta-result__actions">
        <Button variant="outlined" color="primary">
          <Camera size={18} />
          Ver evidencia
        </Button>
        <Button variant="outlined" color="primary" disabled title="Próximamente: SAT Copiloto">
          <HelpCircle size={18} />
          Entender infracción
        </Button>
        <Button variant="outlined" color="primary" to="/descargo">
          <Scale size={18} />
          Presentar descargo
        </Button>
        <Button variant="filled" color="secondary" to="/pagar">
          Pagar S/ {papeleta.monto.toFixed(2)}
        </Button>
      </div>

      {papeleta.diasRestantes <= 10 && (
        <AlertBanner variant="warning">
          Quedan pocos días para pagar sin recargos adicionales.
        </AlertBanner>
      )}
    </Card>
  )
}
