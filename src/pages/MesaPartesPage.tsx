import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  CreditCard,
  FileCheck,
  FilePlus,
  FileText,
  Scale,
  Search,
  Send,
  Shield,
  Sparkles,
  Stamp,
  Wallet,
} from 'lucide-react'
import {
  departamentos,
  getTramiteById,
  mesaPartesGrupos,
  orientarTramite,
  tiposDocumento,
  tiposPersona,
  tramitesDestacadosIds,
  type MesaTramite,
  type ResultadoAsistente,
} from '../data/mesaPartes'
import { AlertBanner } from '../components/ui/AlertBanner'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { SelectField, TextAreaField, TextField } from '../components/ui/TextField'
import { Stepper } from '../components/ui/Stepper'
import './MesaPartesPage.css'

const iconMap: Record<string, React.ReactNode> = {
  'file-plus': <FilePlus size={24} />,
  scale: <Scale size={24} />,
  search: <Search size={24} />,
  'book-open': <BookOpen size={24} />,
  'credit-card': <CreditCard size={24} />,
  shield: <Shield size={24} />,
  clock: <Clock size={24} />,
  'file-check': <FileCheck size={24} />,
  stamp: <Stamp size={24} />,
}

const ejemplosAsistente = [
  'Me pusieron una papeleta injustamente',
  'Necesito un documento que diga que no debo nada',
  'Quiero saber cómo va mi expediente',
  'Me van a embargar por una cobranza',
]

const WIZARD_STEPS = ['Datos del solicitante', 'Detalle', 'Revisión']

export function MesaPartesPage() {
  const navigate = useNavigate()
  const [tramite, setTramite] = useState<MesaTramite | null>(null)

  function handleSelect(t: MesaTramite) {
    if (t.accion.tipo === 'interno') {
      navigate(t.accion.path)
      return
    }
    setTramite(t)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="page-flow">
      <div className="container">
        <PageHeader
          title="Mesa de Partes Digital"
          description="Presenta tus solicitudes y haz seguimiento, 100% en línea"
        />

        {tramite ? (
          <SolicitudWizard tramite={tramite} onBack={() => setTramite(null)} />
        ) : (
          <MesaMenu onSelect={handleSelect} />
        )}
      </div>
    </div>
  )
}

function MesaMenu({ onSelect }: { onSelect: (t: MesaTramite) => void }) {
  const destacados = tramitesDestacadosIds
    .map((id) => getTramiteById(id))
    .filter((t): t is MesaTramite => Boolean(t))

  return (
    <>
      <AsistenteSAT onSelect={onSelect} />

      <section className="mesa-group">
        <h2 className="mesa-group__title">Trámites más solicitados</h2>
        <div className="mesa-grid">
          {destacados.map((t) => (
            <TramiteCard key={t.id} tramite={t} onSelect={onSelect} />
          ))}
        </div>
      </section>

      <section className="mesa-group">
        <h2 className="mesa-group__title">Todos los trámites</h2>
        {mesaPartesGrupos.map((grupo) => (
          <div key={grupo.grupo} className="mesa-subgroup">
            <h3 className="mesa-subgroup__title">{grupo.grupo}</h3>
            <div className="mesa-grid">
              {grupo.tramites.map((t) => (
                <TramiteCard key={t.id} tramite={t} onSelect={onSelect} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

function TramiteCard({ tramite, onSelect }: { tramite: MesaTramite; onSelect: (t: MesaTramite) => void }) {
  return (
    <button type="button" className="mesa-card" onClick={() => onSelect(tramite)}>
      <span className="mesa-card__icon">{iconMap[tramite.icon] ?? <FileText size={24} />}</span>
      <span className="mesa-card__body">
        <span className="mesa-card__title">{tramite.titulo}</span>
        <span className="mesa-card__desc">{tramite.paraQue}</span>
      </span>
      <ArrowRight size={18} className="mesa-card__arrow" />
    </button>
  )
}

function AsistenteSAT({ onSelect }: { onSelect: (t: MesaTramite) => void }) {
  const navigate = useNavigate()
  const [texto, setTexto] = useState('')
  const [resultado, setResultado] = useState<ResultadoAsistente | null>(null)

  function consultar(consulta: string) {
    const q = consulta.trim()
    if (!q) return
    setTexto(q)
    setResultado(orientarTramite(q))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    consultar(texto)
  }

  function resolverOpcion(value: string) {
    if (value.startsWith('/')) {
      navigate(value)
      return
    }
    const tramite = getTramiteById(value)
    if (tramite) setResultado({ tipo: 'recomendacion', tramite })
  }

  function reiniciar() {
    setTexto('')
    setResultado(null)
  }

  return (
    <Card className="asistente">
      <div className="asistente__head">
        <span className="asistente__avatar">
          <Sparkles size={22} />
        </span>
        <div>
          <h2 className="asistente__title">Asistente SAT</h2>
          <p className="asistente__sub">
            Cuéntame tu caso en tus palabras y te digo qué trámite necesitas.
          </p>
        </div>
      </div>

      <form className="asistente__form" onSubmit={handleSubmit}>
        <TextAreaField
          label="¿Qué necesitas resolver hoy?"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Ej.: Me pusieron una papeleta que no me corresponde…"
          rows={2}
        />
        <div className="asistente__actions">
          <div className="asistente__examples">
            {ejemplosAsistente.map((ej) => (
              <button
                key={ej}
                type="button"
                className="asistente__chip"
                onClick={() => consultar(ej)}
              >
                {ej}
              </button>
            ))}
          </div>
          <Button type="submit" variant="filled" color="primary" disabled={!texto.trim()}>
            <Send size={16} />
            Consultar
          </Button>
        </div>
      </form>

      {resultado && (
        <div className="asistente__result">
          {resultado.tipo === 'recomendacion' && (
            <RecomendacionPanel tramite={resultado.tramite} onSelect={onSelect} onReset={reiniciar} />
          )}

          {resultado.tipo === 'pregunta' && (
            <div className="asistente__bubble">
              <p className="asistente__bubble-q">{resultado.pregunta}</p>
              <div className="asistente__options">
                {resultado.opciones.map((op) => (
                  <button
                    key={op.value}
                    type="button"
                    className="asistente__option"
                    onClick={() => resolverOpcion(op.value)}
                  >
                    {op.label}
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {resultado.tipo === 'sin-resultado' && (
            <div className="asistente__bubble">
              <p className="asistente__bubble-q">
                No identifiqué un trámite exacto para tu consulta. Puedes presentar una
                <strong> Nueva solicitud</strong> y la derivamos al área correspondiente, o revisar
                la lista de trámites más abajo.
              </p>
              <div className="asistente__options">
                <button
                  type="button"
                  className="asistente__option"
                  onClick={() => {
                    const t = getTramiteById('nueva-solicitud')
                    if (t) onSelect(t)
                  }}
                >
                  Iniciar una nueva solicitud
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

function RecomendacionPanel({
  tramite,
  onSelect,
  onReset,
}: {
  tramite: MesaTramite
  onSelect: (t: MesaTramite) => void
  onReset: () => void
}) {
  return (
    <div className="reco">
      <div className="reco__header">
        <CheckCircle size={20} />
        <span>Te recomiendo este trámite</span>
      </div>

      <div className="reco__card">
        <span className="reco__icon">{iconMap[tramite.icon] ?? <FileText size={24} />}</span>
        <div className="reco__body">
          <h3 className="reco__title">{tramite.titulo}</h3>
          <p className="reco__desc">{tramite.paraQue}</p>
        </div>
      </div>

      <div className="reco__meta">
        {tramite.documentos && tramite.documentos.length > 0 && (
          <div className="reco__meta-item reco__meta-item--docs">
            <span className="reco__meta-label">
              <FileText size={15} /> Documentos necesarios
            </span>
            <ul className="reco__docs">
              {tramite.documentos.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="reco__meta-item">
          <span className="reco__meta-label">
            <Clock size={15} /> Tiempo estimado
          </span>
          <span className="reco__meta-value">{tramite.tiempo ?? '—'}</span>
        </div>
        <div className="reco__meta-item">
          <span className="reco__meta-label">
            <Wallet size={15} /> Costo
          </span>
          <span className="reco__meta-value">{tramite.costo ?? '—'}</span>
        </div>
      </div>

      <div className="reco__actions">
        <Button variant="text" color="primary" onClick={onReset}>
          Hacer otra consulta
        </Button>
        <Button variant="filled" color="secondary" onClick={() => onSelect(tramite)}>
          Iniciar trámite
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  )
}

function SolicitudWizard({ tramite, onBack }: { tramite: MesaTramite; onBack: () => void }) {
  const [step, setStep] = useState(0)
  const [enviado, setEnviado] = useState(false)

  // Datos del solicitante
  const [tipoPersona, setTipoPersona] = useState(tiposPersona[0])
  const [tipoDoc, setTipoDoc] = useState(tiposDocumento[0])
  const [numDoc, setNumDoc] = useState('')
  const [nombres, setNombres] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo, setCorreo] = useState('')
  const [departamento, setDepartamento] = useState('')
  const [detalle, setDetalle] = useState('')

  const datosCompletos = numDoc.trim() && nombres.trim() && correo.trim()

  if (enviado) {
    return (
      <Card padding="lg" className="success-card">
        <div className="success-card__icon">✓</div>
        <h2 className="success-card__title">¡Solicitud enviada!</h2>
        <p className="success-card__ref">
          Tu trámite de <strong>{tramite.titulo.toLowerCase()}</strong> fue registrado con el número{' '}
          <strong>MP-2026-00{Math.floor(10000 + Math.random() * 89999)}</strong>.
        </p>
        <AlertBanner variant="success">
          Te avisaremos cada vez que tu trámite cambie de estado. También puedes seguirlo en
          &quot;Consulta de trámites&quot;.
        </AlertBanner>
        <div className="success-card__actions">
          <Button variant="filled" color="primary" to="/tramite">
            Consultar mi trámite
          </Button>
          <Button variant="tonal" color="primary" onClick={onBack}>
            Volver a Mesa de Partes
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <button type="button" className="wizard-back" onClick={onBack}>
        ← Todos los trámites
      </button>

      <div className="wizard-head">
        <h2 className="card-section-title" style={{ margin: 0 }}>{tramite.titulo}</h2>
        <p className="wizard-head__help">{tramite.paraQue}</p>
      </div>

      <Stepper steps={WIZARD_STEPS} current={step} />

      {step === 0 && (
        <div className="wizard-step">
          <div className="form-row">
            <SelectField label="Tipo de persona" value={tipoPersona} onChange={(e) => setTipoPersona(e.target.value)}>
              {tiposPersona.map((p) => <option key={p}>{p}</option>)}
            </SelectField>
            <SelectField label="Tipo de documento" value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)}>
              {tiposDocumento.map((d) => <option key={d}>{d}</option>)}
            </SelectField>
            <TextField
              label="N.° de documento *"
              value={numDoc}
              onChange={(e) => setNumDoc(e.target.value)}
              placeholder="76328915"
            />
          </div>
          <div className="form-row">
            <TextField
              label="Nombres y apellidos *"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              placeholder="Gloria Noemi Hancco Sivincha"
            />
            <TextField
              label="N.° de teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="999 999 999"
            />
          </div>
          <div className="form-row">
            <SelectField label="Departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
              <option value="">Seleccione...</option>
              {departamentos.map((d) => <option key={d}>{d}</option>)}
            </SelectField>
            <TextField
              label="Correo electrónico *"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="wizard-actions">
            <Button variant="filled" color="primary" disabled={!datosCompletos} onClick={() => setStep(1)}>
              Continuar
            </Button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="wizard-step">
          <TextAreaField
            label={tramite.detalleLabel ?? 'Describe tu solicitud'}
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            placeholder="Escribe aquí los detalles de tu solicitud..."
          />

          <div className="md-field">
            <span className="md-field__label">Adjuntar documentos (opcional)</span>
            <div className="upload-zone">
              <p>Arrastra archivos aquí o haz clic para adjuntar</p>
              <p className="upload-zone__hint">PDF, JPG o PNG — máx. 10 MB</p>
            </div>
          </div>

          <div className="wizard-actions">
            <Button variant="text" color="primary" onClick={() => setStep(0)}>Atrás</Button>
            <Button variant="filled" color="primary" disabled={!detalle.trim()} onClick={() => setStep(2)}>
              Continuar
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="wizard-step">
          <h3 className="card-section-divider">Revisa tu solicitud</h3>
          <dl className="wizard-review">
            <ReviewRow label="Trámite" value={tramite.titulo} />
            <ReviewRow label="Solicitante" value={nombres} />
            <ReviewRow label="Documento" value={`${tipoDoc} ${numDoc}`} />
            <ReviewRow label="Correo" value={correo} />
            {telefono && <ReviewRow label="Teléfono" value={telefono} />}
            {departamento && <ReviewRow label="Departamento" value={departamento} />}
            <ReviewRow label="Detalle" value={detalle} />
          </dl>

          <AlertBanner variant="info">
            Al enviar, recibirás un número de trámite y te notificaremos cada cambio de estado.
          </AlertBanner>

          <div className="wizard-actions">
            <Button variant="text" color="primary" onClick={() => setStep(1)}>Atrás</Button>
            <Button variant="filled" color="secondary" onClick={() => setEnviado(true)}>
              Enviar solicitud
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="wizard-review__row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}
