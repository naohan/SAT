import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import './CuotasPage.css'

const DEUDA_TOTAL = 858
const TASA_INTERES = 0.012

export function CuotasPage() {
  const [cuotas, setCuotas] = useState(6)
  const cuotaMensual = (DEUDA_TOTAL * (1 + TASA_INTERES * cuotas)) / cuotas

  return (
    <div className="page-flow">
      <div className="container">
        <PageHeader
          title="Simulador de fraccionamiento"
          description="Calcula tu cuota mensual y solicita un plan de pagos"
        />

        <Card>
          <div className="cuotas-total">
            <span className="cuotas-total__label">Deuda total</span>
            <span className="cuotas-total__amount">S/ {DEUDA_TOTAL.toFixed(2)}</span>
          </div>

          <div className="md-field">
            <span className="md-field__label">Cantidad de cuotas</span>
            <div className="cuotas-stepper">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setCuotas((c) => Math.max(2, c - 1))}
                aria-label="Reducir cuotas"
              >
                −
              </Button>
              <input
                type="number"
                min={2}
                max={24}
                value={cuotas}
                onChange={(e) => setCuotas(Math.min(24, Math.max(2, Number(e.target.value))))}
                className="cuotas-stepper__input"
                aria-label="Cantidad de cuotas"
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setCuotas((c) => Math.min(24, c + 1))}
                aria-label="Aumentar cuotas"
              >
                +
              </Button>
              <span className="cuotas-stepper__unit">meses</span>
            </div>
          </div>

          <div className="cuotas-result">
            <span className="cuotas-result__label">Cuota mensual estimada</span>
            <span className="cuotas-result__amount">S/ {cuotaMensual.toFixed(2)}</span>
            <p className="cuotas-result__note">
              * Incluye tasa de interés referencial. El monto final puede variar según evaluación.
            </p>
          </div>

          <Button variant="filled" color="secondary" block>
            Solicitar fraccionamiento
          </Button>
        </Card>
      </div>
    </div>
  )
}
