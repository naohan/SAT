import { useState } from 'react'
import { CheckCircle, CreditCard } from 'lucide-react'
import { mockDeudas } from '../data/mockData'
import { AlertOptIn } from '../components/ui/AlertOptIn'
import { AlertBanner } from '../components/ui/AlertBanner'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { Stepper } from '../components/ui/Stepper'
import { SelectField, TextField } from '../components/ui/TextField'
import './PagarPage.css'

const pasos = ['Consulta tu deuda', 'Datos del pago', 'Confirmación']
const tiposTarjeta = ['Visa', 'Mastercard', 'American Express', 'Diners Club', 'Yape', 'Plin']

interface ItemPago {
  id: string
  concepto: string
  referencia: string
  monto: number
  vencimiento?: string
}

export function PagarPage() {
  const [paso, setPaso] = useState(0)

  // Paso 1: consulta
  const [modo, setModo] = useState<'consulta' | 'registro'>('consulta')
  const [tipoBusqueda, setTipoBusqueda] = useState('Placa')
  const [dato, setDato] = useState('')
  const [buscado, setBuscado] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [itemsManual, setItemsManual] = useState<ItemPago[]>([])
  const [numPapeleta, setNumPapeleta] = useState('')
  const [docManual, setDocManual] = useState('')

  // Paso 2: datos del pago
  const [dni, setDni] = useState('')
  const [correo, setCorreo] = useState('')
  const [celular, setCelular] = useState('')

  // Paso 3: pago
  const [tarjeta, setTarjeta] = useState('')
  const [pagado, setPagado] = useState(false)

  const items: ItemPago[] = modo === 'registro' ? itemsManual : mockDeudas
  const seleccionados = items.filter((d) => selected.has(d.id))
  const total = seleccionados.reduce((s, d) => s + d.monto, 0)

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function buscar(e: React.FormEvent) {
    e.preventDefault()
    if (!dato.trim()) return
    setBuscado(true)
    setSelected(new Set(mockDeudas.map((d) => d.id)))
  }

  function agregarManual(e: React.FormEvent) {
    e.preventDefault()
    if (!numPapeleta.trim() || !docManual.trim()) return
    const item: ItemPago = {
      id: `m-${numPapeleta}`,
      concepto: `Papeleta ${numPapeleta.toUpperCase()}`,
      referencia: 'Registro manual de papeleta',
      monto: 440,
    }
    setItemsManual([item])
    setSelected(new Set([item.id]))
    setBuscado(true)
  }

  function cambiarModo(m: 'consulta' | 'registro') {
    setModo(m)
    setBuscado(false)
    setSelected(new Set())
  }

  // ----- Pago confirmado -----
  if (pagado) {
    return (
      <div className="page-flow">
        <div className="container">
          <Card padding="lg" className="success-card">
            <div className="success-card__icon">
              <CheckCircle size={40} />
            </div>
            <h2 className="success-card__title">¡Pago realizado con éxito!</h2>
            <p className="success-card__ref">
              Pagaste <strong>S/ {total.toFixed(2)}</strong> con {tarjeta}. Te enviamos la
              constancia a {correo || 'tu correo'}.
            </p>
            <AlertBanner variant="success">
              Tu pago quedará reflejado en el portal del SAT en un máximo de 48 horas.
            </AlertBanner>
            <div className="success-card__actions">
              <Button variant="outlined" color="primary">
                Descargar constancia
              </Button>
              <Button variant="filled" color="primary" to="/">
                Volver al inicio
              </Button>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <AlertOptIn
                contexto="Te avisamos antes de tu próximo vencimiento"
                dniInicial={dni}
              />
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="page-flow">
      <div className="container">
        <PageHeader
          title="Quiero pagar"
          description="Consulta tu deuda y págala en línea de forma rápida y segura"
        />

        <Stepper steps={pasos} current={paso} />

        {/* ---------- Paso 1: Consulta tu deuda ---------- */}
        {paso === 0 && (
          <Card>
            <div className="pago-modo">
              <button
                type="button"
                className={`pago-modo__tab ${modo === 'consulta' ? 'is-active' : ''}`}
                onClick={() => cambiarModo('consulta')}
              >
                Consultar mi deuda
              </button>
              <button
                type="button"
                className={`pago-modo__tab ${modo === 'registro' ? 'is-active' : ''}`}
                onClick={() => cambiarModo('registro')}
              >
                Registra y paga tu papeleta
              </button>
            </div>

            {modo === 'consulta' ? (
              <form onSubmit={buscar} className="pago-search">
                <SelectField
                  label="Tipo de búsqueda"
                  value={tipoBusqueda}
                  onChange={(e) => setTipoBusqueda(e.target.value)}
                >
                  <option value="Placa">Placa</option>
                  <option value="DNI">DNI / N.° de documento</option>
                  <option value="Papeleta">N.° de papeleta</option>
                </SelectField>
                <TextField
                  label={`Dato a buscar (${tipoBusqueda})`}
                  value={dato}
                  onChange={(e) => setDato(e.target.value)}
                  placeholder={tipoBusqueda === 'Placa' ? 'Ej.: SOS665' : 'Ingrese el dato'}
                />
                <Button type="submit" variant="filled" color="primary" className="pago-search__btn">
                  Buscar
                </Button>
              </form>
            ) : (
              <form onSubmit={agregarManual} className="pago-search">
                <TextField
                  label="Número de papeleta"
                  value={numPapeleta}
                  onChange={(e) => setNumPapeleta(e.target.value)}
                  placeholder="Ej.: C39250"
                />
                <TextField
                  label="Documento de identidad"
                  value={docManual}
                  onChange={(e) => setDocManual(e.target.value)}
                  placeholder="N.° de documento"
                />
                <Button type="submit" variant="filled" color="primary" className="pago-search__btn">
                  Registrar papeleta
                </Button>
              </form>
            )}

            {buscado && items.length > 0 && (
              <>
                <div className="debt-list" style={{ marginTop: '1.5rem' }}>
                  {items.map((deuda) => (
                    <label
                      key={deuda.id}
                      className={`debt-item ${selected.has(deuda.id) ? 'debt-item--selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        className="debt-item__checkbox"
                        checked={selected.has(deuda.id)}
                        onChange={() => toggle(deuda.id)}
                      />
                      <div className="debt-item__info">
                        <p className="debt-item__concept">{deuda.concepto}</p>
                        <p className="debt-item__meta">
                          {deuda.referencia}
                          {deuda.vencimiento ? ` · Vence: ${deuda.vencimiento}` : ''}
                        </p>
                      </div>
                      <span className="debt-item__amount">S/ {deuda.monto.toFixed(2)}</span>
                    </label>
                  ))}
                </div>

                <div className="payment-summary">
                  <span className="payment-summary__label">Total a pagar</span>
                  <span className="payment-summary__amount">S/ {total.toFixed(2)}</span>
                </div>

                <div className="pago-actions">
                  <span />
                  <Button
                    variant="filled"
                    color="secondary"
                    disabled={seleccionados.length === 0}
                    onClick={() => setPaso(1)}
                  >
                    Continuar
                  </Button>
                </div>
              </>
            )}
          </Card>
        )}

        {/* ---------- Paso 2: Datos del pago ---------- */}
        {paso === 1 && (
          <Card>
            <h2 className="card-section-title">Datos del pago</h2>
            <p className="pago-intro">
              Usaremos estos datos para enviarte la constancia y avisarte de tus próximos
              vencimientos.
            </p>
            <div className="pago-datos">
              <TextField
                label="DNI / N.° de documento"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="76328915"
              />
              <TextField
                label="Correo electrónico"
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
              />
              <TextField
                label="Celular"
                type="tel"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                placeholder="999 888 777"
              />
            </div>

            <div className="pago-actions">
              <Button variant="text" color="primary" onClick={() => setPaso(0)}>
                Volver
              </Button>
              <Button
                variant="filled"
                color="secondary"
                disabled={!dni.trim() || !correo.trim()}
                onClick={() => setPaso(2)}
              >
                Continuar
              </Button>
            </div>
          </Card>
        )}

        {/* ---------- Paso 3: Confirmación ---------- */}
        {paso === 2 && (
          <Card>
            <h2 className="card-section-title">Confirmación del pago</h2>

            <div className="pago-resumen">
              <h3 className="pago-resumen__title">Resumen del pago</h3>
              {seleccionados.map((d) => (
                <div key={d.id} className="pago-resumen__row">
                  <span>{d.concepto}</span>
                  <span>S/ {d.monto.toFixed(2)}</span>
                </div>
              ))}
              <div className="pago-resumen__row pago-resumen__row--total">
                <span>Total</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pago-resumen__datos">
              <span>DNI: <strong>{dni}</strong></span>
              <span>Correo: <strong>{correo}</strong></span>
              {celular && <span>Celular: <strong>{celular}</strong></span>}
            </div>

            <p className="payment-label">Selecciona el tipo de tarjeta o medio de pago</p>
            <div className="card-options">
              {tiposTarjeta.map((t) => (
                <button
                  type="button"
                  key={t}
                  className={`card-option ${tarjeta === t ? 'is-active' : ''}`}
                  onClick={() => setTarjeta(t)}
                  aria-pressed={tarjeta === t}
                >
                  <CreditCard size={18} />
                  {t}
                </button>
              ))}
            </div>

            <div className="pago-actions">
              <Button variant="text" color="primary" onClick={() => setPaso(1)}>
                Volver
              </Button>
              <Button
                variant="filled"
                color="secondary"
                disabled={!tarjeta}
                onClick={() => setPagado(true)}
              >
                Proceder al pago — S/ {total.toFixed(2)}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
