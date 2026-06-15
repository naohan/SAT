import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  Car,
  CheckCircle,
  ChevronRight,
  Clock,
  CreditCard,
  Eye,
  EyeOff,
  FileCheck,
  FileText,
  House,
  Info,
  Layers,
  LogOut,
  Mail,
  PieChart,
  Scale,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { externalLinks } from '../data/externalLinks'
import { AlertBanner } from '../components/ui/AlertBanner'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { SelectField, TextField } from '../components/ui/TextField'
import declaracionJurada from '../assets/DJSAC_557052_20260614215357239.pdf'
import satLogo from '../assets/sat-logo.png'
import { clearSession, getSession, saveSession } from '../utils/authSession'
import './PerfilPage.css'

export function PerfilPage() {
  const [mode, setMode] = useState<'login' | 'registro'>('login')

  return (
    <div className="page-flow">
      <div className="container">
        {mode === 'login' ? (
          <LoginAccess onGoRegister={() => setMode('registro')} />
        ) : (
          <RegisterAccess onGoLogin={() => setMode('login')} />
        )}
      </div>
    </div>
  )
}

interface Modulo {
  id: string
  label: string
  desc: string
  icon: ReactNode
  path: string
  acciones: string[]
}

const modulosAgencia: Modulo[] = [
  {
    id: 'perfil',
    label: 'Mi perfil',
    desc: 'Registro del ciudadano',
    icon: <User size={22} />,
    path: '/perfil',
    acciones: ['Ver y actualizar tus datos personales', 'Revisar tu domicilio y contacto', 'Gestionar tu cuenta'],
  },
  {
    id: 'vehicular',
    label: 'Inscripción vehicular',
    desc: 'Declaración jurada del impuesto vehicular',
    icon: <Car size={22} />,
    path: '/mesa-partes',
    acciones: ['Registrar la declaración jurada de tu vehículo', 'Validar los datos del vehículo en SUNARP'],
  },
  {
    id: 'predial',
    label: 'Inscripción predial',
    desc: 'Declaración jurada del impuesto predial',
    icon: <House size={22} />,
    path: '/mesa-partes',
    acciones: ['Registrar la declaración jurada de tu predio', 'Actualizar datos de tu propiedad'],
  },
  {
    id: 'alcabala',
    label: 'Liquidación de alcabala',
    desc: 'Liquidación del impuesto de alcabala',
    icon: <Layers size={22} />,
    path: '/mesa-partes',
    acciones: ['Solicitar la liquidación del impuesto de alcabala', 'Adjuntar el contrato de transferencia'],
  },
  {
    id: 'facilidades',
    label: 'Facilidades de pago',
    desc: 'Fracciona tu deuda en cuotas',
    icon: <PieChart size={22} />,
    path: '/cuotas',
    acciones: ['Simular el fraccionamiento de tu deuda', 'Elegir el número de cuotas', 'Ver el cronograma'],
  },
  {
    id: 'consultas',
    label: 'Consultas',
    desc: 'Cuadernillo tributario y deuda pendiente',
    icon: <Search size={22} />,
    path: '/papeleta',
    acciones: ['Consultar tus papeletas e infracciones', 'Revisar tu deuda pendiente'],
  },
  {
    id: 'constancia',
    label: 'Constancia de no adeudo',
    desc: 'Acredita que no tienes deudas',
    icon: <FileCheck size={22} />,
    path: '/mesa-partes',
    acciones: ['Solicitar tu constancia de no adeudo', 'Descargar el documento oficial'],
  },
  {
    id: 'mesa-partes',
    label: 'Mesa de Partes Digital',
    desc: 'Presenta tus solicitudes',
    icon: <FileText size={22} />,
    path: '/mesa-partes',
    acciones: ['Presentar una nueva solicitud', 'Recibir orientación del Asistente SAT'],
  },
  {
    id: 'casilla',
    label: 'Casilla electrónica',
    desc: 'Tus notificaciones y resoluciones',
    icon: <Mail size={22} />,
    path: '/alertas',
    acciones: ['Revisar tus notificaciones', 'Leer y descargar tus resoluciones'],
  },
  {
    id: 'prescripcion',
    label: 'Prescripción de papeletas',
    desc: 'Solicita prescribir papeletas antiguas',
    icon: <Clock size={22} />,
    path: '/mesa-partes',
    acciones: ['Solicitar prescripción de papeletas antiguas', 'Indicar las papeletas por placa o número'],
  },
  {
    id: 'descargo',
    label: 'Descargo y suspensión coactiva',
    desc: 'Reclama papeletas o suspende cobranza',
    icon: <Scale size={22} />,
    path: '/descargo',
    acciones: ['Presentar un descargo con pruebas', 'Solicitar la suspensión de cobranza coactiva'],
  },
]

const accesosFrecuentes = [
  { label: 'Papeletas', desc: 'Consulta y paga tus papeletas', icon: <Car size={24} />, path: '/papeleta' },
  { label: 'Pagar', desc: 'Realiza tus pagos en línea', icon: <CreditCard size={24} />, path: '/pagar' },
  { label: 'Mesa de Partes', desc: 'Presenta tus solicitudes', icon: <FileText size={24} />, path: '/mesa-partes' },
  { label: 'Alertas', desc: 'Revisa tus notificaciones', icon: <Bell size={24} />, path: '/alertas' },
]

// Agente SAT (orientador simulado del panel) — intención → módulo recomendado
interface AgenteIntent {
  keywords: string[]
  titulo: string
  desc: string
  pasos: string[]
  path: string
}

const agenteIntents: AgenteIntent[] = [
  {
    keywords: ['papeleta', 'multa', 'infraccion', 'transito'],
    titulo: 'Consulta de papeletas',
    desc: 'Revisa tus infracciones de tránsito y su estado.',
    pasos: ['Ingresa tu DNI o placa', 'Revisa la papeleta y su motivo', 'Elige pagar o reclamar'],
    path: '/papeleta',
  },
  {
    keywords: ['pagar', 'pago', 'deuda', 'cancelar', 'abonar'],
    titulo: 'Pagar deuda',
    desc: 'Paga tus papeletas y tributos en línea de forma segura.',
    pasos: ['Consulta tu deuda', 'Completa tus datos', 'Paga con tarjeta, Yape o Plin'],
    path: '/pagar',
  },
  {
    keywords: ['cuota', 'fraccion', 'facilidad', 'partes', 'no puedo pagar todo'],
    titulo: 'Facilidades de pago',
    desc: 'Fracciona tu deuda en cuotas mensuales.',
    pasos: ['Indica tu deuda', 'Elige el número de cuotas', 'Revisa el cronograma'],
    path: '/cuotas',
  },
  {
    keywords: ['reclam', 'descargo', 'no estoy de acuerdo', 'injust', 'no me corresponde', 'impugn'],
    titulo: 'Descargo de papeletas',
    desc: 'Presenta un reclamo con pruebas contra una papeleta.',
    pasos: ['Completa tus datos', 'Adjunta tu sustento', 'Envía el descargo'],
    path: '/descargo',
  },
  {
    keywords: ['constancia', 'no adeudo', 'no debo', 'certificado', 'sin deudas'],
    titulo: 'Constancia de no adeudo',
    desc: 'Obtén un documento que certifica que no tienes deudas.',
    pasos: ['Verifica tu identidad', 'Solicita la constancia', 'Descárgala'],
    path: '/mesa-partes',
  },
  {
    keywords: ['estado', 'expediente', 'seguimiento', 'como va', 'avance', 'tramite'],
    titulo: 'Estado de trámites',
    desc: 'Consulta en qué estado va tu expediente.',
    pasos: ['Elige el procedimiento', 'Ingresa el número de trámite', 'Revisa el estado'],
    path: '/tramite',
  },
  {
    keywords: ['notificacion', 'casilla', 'resolucion', 'documento'],
    titulo: 'Casilla electrónica',
    desc: 'Revisa tus notificaciones y resoluciones.',
    pasos: ['Abre tus notificaciones', 'Lee el documento', 'Descárgalo si lo necesitas'],
    path: '/alertas',
  },
  {
    keywords: ['solicitud', 'mesa de partes', 'presentar', 'embargo', 'coactiva', 'prescrib'],
    titulo: 'Mesa de Partes Digital',
    desc: 'Presenta cualquier solicitud al SAT y te guiamos paso a paso.',
    pasos: ['Describe tu caso al asistente', 'Completa el formulario', 'Envía tu solicitud'],
    path: '/mesa-partes',
  },
]

function normalizarTexto(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function orientarAgente(texto: string): AgenteIntent | null {
  const t = normalizarTexto(texto)
  if (!t.trim()) return null
  let mejor: AgenteIntent | null = null
  let mejorPuntaje = 0
  for (const intent of agenteIntents) {
    const puntaje = intent.keywords.reduce(
      (acc, kw) => (t.includes(normalizarTexto(kw)) ? acc + 1 : acc),
      0,
    )
    if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje
      mejor = intent
    }
  }
  return mejor
}

const ejemplosAgente = [
  'Me llegó una papeleta y no sé qué hacer',
  'Quiero pagar en cuotas',
  'Necesito una constancia de que no debo',
  '¿Cómo va mi trámite?',
]

const accesosRapidosDash = [
  { label: 'Pagar deuda', icon: <CreditCard size={18} />, path: '/pagar' },
  { label: 'Consulta de papeletas', icon: <Car size={18} />, path: '/papeleta' },
  { label: 'Estado de trámites', icon: <FileText size={18} />, path: '/tramite' },
  { label: 'Ver mis notificaciones', icon: <Bell size={18} />, path: '/alertas' },
]

const alertasPreview = [
  {
    icon: <AlertTriangle size={18} />,
    estado: 'proximo',
    titulo: 'Vencimiento próximo',
    mensaje: 'Tu cuota de fraccionamiento vence mañana.',
    tiempo: 'Vence en 1 día',
  },
  {
    icon: <CheckCircle size={18} />,
    estado: 'completado',
    titulo: 'Trámite aprobado',
    mensaje: 'Tu solicitud MP-2026-0045821 fue aprobada.',
    tiempo: 'Hace 3 días',
  },
  {
    icon: <Info size={18} />,
    estado: 'info',
    titulo: 'Nueva notificación',
    mensaje: 'Tienes un documento disponible en Mesa de Partes.',
    tiempo: 'Hace 5 días',
  },
]

function AgenciaDashboard({ usuario, onLogout }: { usuario: string; onLogout: () => void }) {
  const [modulo, setModulo] = useState<Modulo | null>(null)

  function abrirModulo(m: Modulo) {
    setModulo(m)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`av-dashboard ${modulo ? 'av-dashboard--full' : ''}`}>
      <aside className="av-side">
        <nav className="av-nav">
          {modulosAgencia.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`av-nav__item av-nav__item--module ${modulo?.id === m.id ? 'av-nav__item--active' : ''}`}
              onClick={() => abrirModulo(m)}
            >
              <span className="av-nav__icon">{m.icon}</span>
              <span className="av-nav__text">
                <span className="av-nav__label">{m.label}</span>
                <span className="av-nav__desc">{m.desc}</span>
              </span>
            </button>
          ))}
        </nav>
        <button type="button" className="av-nav__item av-logout" onClick={onLogout}>
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </aside>

      <main className="av-main">
        {modulo ? (
          <ModuloDetalle modulo={modulo} usuario={usuario} onBack={() => setModulo(null)} />
        ) : (
          <PanelInicio usuario={usuario} />
        )}
      </main>

      {!modulo && (
        <aside className="av-right">
          <Card className="av-aside-card">
            <div className="av-aside-card__head">
              <h3>Mis alertas</h3>
              <Link to="/alertas" className="av-aside-card__link">Ver todas</Link>
            </div>
            <div className="av-alerts">
              {alertasPreview.map((a) => (
                <div key={a.titulo} className={`av-alert av-alert--${a.estado}`}>
                  <span className="av-alert__icon">{a.icon}</span>
                  <div className="av-alert__body">
                    <span className="av-alert__title">{a.titulo}</span>
                    <span className="av-alert__msg">{a.mensaje}</span>
                    <span className="av-alert__time">{a.tiempo}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/alertas" className="av-aside-card__foot">
              Ir a mis alertas
              <ArrowRight size={16} />
            </Link>
          </Card>

          <Card className="av-aside-card">
            <div className="av-aside-card__head">
              <h3>Accesos rápidos</h3>
            </div>
            <div className="av-quick">
              {accesosRapidosDash.map((a) => (
                <Link key={a.label} to={a.path} className="av-quick__item">
                  <span className="av-quick__icon">{a.icon}</span>
                  {a.label}
                  <ChevronRight size={16} className="av-quick__chevron" />
                </Link>
              ))}
            </div>
          </Card>
        </aside>
      )}
    </div>
  )
}

function PanelInicio({ usuario }: { usuario: string }) {
  return (
    <>
      <div className="av-greet">
        <h2 className="av-greet__title">Hola, {usuario} 👋</h2>
        <p className="av-greet__sub">¿Qué deseas hacer?</p>
      </div>

      <div className="av-banner">
        <div className="av-banner__text">
          <h3>Realiza consultas y pagos de forma rápida y segura</h3>
          <p>Ingresa a Virtual SAT para acceder a más trámites y servicios en línea.</p>
          <Button
            variant="filled"
            color="primary"
            href={externalLinks.agenciaVirtual}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir a Virtual SAT
          </Button>
        </div>
        <div className="av-banner__art" aria-hidden="true">
          <ShieldCheck size={64} />
        </div>
      </div>

      <AgenteSAT />

      <section className="av-frecuentes">
        <h3 className="av-frecuentes__title">Accesos frecuentes</h3>
        <div className="av-frecuentes__grid">
          {accesosFrecuentes.map((a) => (
            <Link key={a.label} to={a.path} className="av-frec-card">
              <span className="av-frec-card__icon">{a.icon}</span>
              <span className="av-frec-card__title">{a.label}</span>
              <span className="av-frec-card__desc">{a.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

function AgenteSAT() {
  const navigate = useNavigate()
  const [texto, setTexto] = useState('')
  const [reco, setReco] = useState<AgenteIntent | null | undefined>(undefined)

  function consultar(consulta: string) {
    const q = consulta.trim()
    if (!q) return
    setTexto(q)
    setReco(orientarAgente(q))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    consultar(texto)
  }

  return (
    <Card className="agente">
      <div className="agente__head">
        <span className="agente__avatar">
          <Sparkles size={20} />
        </span>
        <div>
          <h3 className="agente__title">Agente SAT</h3>
          <p className="agente__sub">¿No sabes qué hacer? Cuéntame tu caso y te guío paso a paso.</p>
        </div>
      </div>

      <form className="agente__form" onSubmit={handleSubmit}>
        <div className="agente__input">
          <input
            type="text"
            placeholder="Ej.: Me llegó una papeleta y no sé qué hacer…"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            aria-label="Describe tu caso"
          />
          <Button type="submit" variant="filled" color="primary" disabled={!texto.trim()}>
            <Send size={16} />
            Consultar
          </Button>
        </div>
        <div className="agente__chips">
          {ejemplosAgente.map((ej) => (
            <button key={ej} type="button" className="agente__chip" onClick={() => consultar(ej)}>
              {ej}
            </button>
          ))}
        </div>
      </form>

      {reco !== undefined && (
        <div className="agente__result">
          {reco ? (
            <div className="agente__reco">
              <div className="agente__reco-head">
                <CheckCircle size={18} />
                Te recomiendo: <strong>{reco.titulo}</strong>
              </div>
              <p className="agente__reco-desc">{reco.desc}</p>
              <ol className="agente__steps">
                {reco.pasos.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
              <Button variant="filled" color="secondary" onClick={() => navigate(reco.path)}>
                Empezar ahora
                <ArrowRight size={16} />
              </Button>
            </div>
          ) : (
            <div className="agente__reco">
              <p className="agente__reco-desc">
                No identifiqué el trámite exacto. Puedes presentar una solicitud en Mesa de Partes
                y te ayudamos a derivarla.
              </p>
              <Button variant="outlined" color="primary" to="/mesa-partes">
                Ir a Mesa de Partes
                <ArrowRight size={16} />
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

function ModuloDetalle({
  modulo,
  usuario,
  onBack,
}: {
  modulo: Modulo
  usuario: string
  onBack: () => void
}) {
  const navigate = useNavigate()

  if (modulo.id === 'perfil') {
    return <PerfilCiudadano usuario={usuario} onBack={onBack} />
  }

  return (
    <Card>
      <button type="button" className="av-detalle-back" onClick={onBack}>
        <ArrowLeft size={18} />
        Volver
      </button>

      <div className="av-detalle-head">
        <span className="av-detalle-icon">{modulo.icon}</span>
        <div>
          <h3 className="av-detalle-title">{modulo.label}</h3>
          <p className="av-detalle-desc">{modulo.desc}</p>
        </div>
      </div>

      <h4 className="av-detalle-subtitle">¿Qué puedes hacer aquí?</h4>
      <ul className="av-detalle-list">
        {modulo.acciones.map((a) => (
          <li key={a}>
            <CheckCircle size={16} />
            {a}
          </li>
        ))}
      </ul>

      <div className="av-detalle-actions">
        <Button variant="filled" color="secondary" onClick={() => navigate(modulo.path)}>
          Continuar
          <ArrowRight size={16} />
        </Button>
      </div>
    </Card>
  )
}

const perfilCiudadano = {
  nombres: 'GLORIA NOEMI',
  apellidos: 'HANCCO SIVINCHA',
  tipoDoc: 'DNI',
  fechaNacimiento: '14/03/1990',
  correo: 'gloria.hancco@ejemplo.com',
  telefono: '972 374 647',
  distrito: 'Cercado de Lima',
  direccion: 'Av. Camaná 370',
}

function PerfilCiudadano({ usuario, onBack }: { usuario: string; onBack: () => void }) {
  const iniciales = perfilCiudadano.nombres.slice(0, 1) + perfilCiudadano.apellidos.slice(0, 1)
  return (
    <Card>
      <button type="button" className="av-detalle-back" onClick={onBack}>
        <ArrowLeft size={18} />
        Volver
      </button>

      <div className="pc-head">
        <span className="pc-avatar">{iniciales}</span>
        <div>
          <h3 className="pc-name">{perfilCiudadano.nombres} {perfilCiudadano.apellidos}</h3>
          <p className="pc-doc">{perfilCiudadano.tipoDoc} {usuario || '76328915'}</p>
        </div>
      </div>

      <h4 className="pc-section">Datos personales</h4>
      <dl className="pc-grid">
        <PcItem label="Tipo de documento" value={perfilCiudadano.tipoDoc} />
        <PcItem label="N.° de documento" value={usuario || '76328915'} />
        <PcItem label="Nombres" value={perfilCiudadano.nombres} />
        <PcItem label="Apellidos" value={perfilCiudadano.apellidos} />
        <PcItem label="Fecha de nacimiento" value={perfilCiudadano.fechaNacimiento} />
      </dl>

      <h4 className="pc-section">Datos de contacto</h4>
      <dl className="pc-grid">
        <PcItem label="Correo electrónico" value={perfilCiudadano.correo} />
        <PcItem label="Teléfono móvil" value={perfilCiudadano.telefono} />
      </dl>

      <h4 className="pc-section">Datos de domicilio</h4>
      <dl className="pc-grid">
        <PcItem label="Distrito" value={perfilCiudadano.distrito} />
        <PcItem label="Dirección" value={perfilCiudadano.direccion} />
      </dl>

      <div className="av-detalle-actions">
        <Button variant="outlined" color="primary">
          Editar datos
        </Button>
      </div>
    </Card>
  )
}

function PcItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="pc-item">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function LoginAccess({ onGoRegister }: { onGoRegister: () => void }) {
  const sesionGuardada = getSession()
  const [tipoDoc, setTipoDoc] = useState(sesionGuardada?.tipoDoc ?? '')
  const [usuario, setUsuario] = useState(sesionGuardada?.usuario ?? '')
  const [showPass, setShowPass] = useState(false)
  const [logueado, setLogueado] = useState(!!sesionGuardada)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!tipoDoc || !usuario.trim()) return
    saveSession({ tipoDoc, usuario: usuario.trim() })
    setLogueado(true)
  }

  function handleLogout() {
    clearSession()
    setLogueado(false)
    setTipoDoc('')
    setUsuario('')
  }

  if (logueado) {
    return <AgenciaDashboard usuario={usuario} onLogout={handleLogout} />
  }

  return (
    <div className="login-wrap">
      <Card padding="lg" className="login-card">
        <img src={satLogo} alt="SAT - Servicio de Administración Tributaria de Lima" className="login-card__logo" />
        <h2 className="login-card__title">Agencia Virtual SAT</h2>
        <p className="login-card__subtitle">Identifícate para realizar tus trámites</p>

        <form onSubmit={handleSubmit} className="login-form">
          <SelectField label="Tipo de documento" value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)}>
            <option value="">Seleccione...</option>
            <option value="DNI">DNI</option>
            <option value="RUC">RUC</option>
            <option value="CE">Carné de extranjería</option>
          </SelectField>

          <TextField
            label="N.° de documento"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="N.° de documento"
          />

          <div className="md-field">
            <label className="md-field__label" htmlFor="login-pass">Contraseña</label>
            <div className="login-pass">
              <input
                id="login-pass"
                className="md-field__input"
                type={showPass ? 'text' : 'password'}
                placeholder="Contraseña..."
              />
              <button
                type="button"
                className="login-pass__toggle"
                onClick={() => setShowPass((s) => !s)}
                aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" variant="filled" color="primary" block disabled={!tipoDoc || !usuario.trim()}>
            Ingresar
          </Button>
        </form>

        <div className="login-card__divider" />

        <div className="login-card__links">
          <Button
            variant="outlined"
            color="primary"
            block
            href={externalLinks.avisatLogin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Olvidé mi contraseña
          </Button>
          <Button
            variant="outlined"
            color="primary"
            block
            href={externalLinks.avisatLogin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cambiar mi contraseña
          </Button>
          <Button variant="outlined" color="primary" block onClick={onGoRegister}>
            No tengo usuario (Registrar)
          </Button>
        </div>
      </Card>

      <p className="login-secure">
        <ShieldCheck size={16} />
        Este es un espacio seguro: tus datos están protegidos por nuestros sistemas de seguridad digital.
      </p>
    </div>
  )
}

function RegisterAccess({ onGoLogin }: { onGoLogin: () => void }) {
  const [sinApellidoMaterno, setSinApellidoMaterno] = useState(false)
  const [esRepresentante, setEsRepresentante] = useState(false)
  const [paso, setPaso] = useState<'form' | 'documento' | 'listo'>('form')
  const [firmado, setFirmado] = useState(false)

  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault()
    setPaso('documento')
  }

  function handleCrearCuenta() {
    if (firmado) setPaso('listo')
  }

  // Paso 3: cuenta creada y activada
  if (paso === 'listo') {
    return (
      <Card padding="lg" className="success-card">
        <div className="success-card__icon">✓</div>
        <h2 className="success-card__title">¡Cuenta creada y activada!</h2>
        <p className="success-card__ref">
          Ya firmaste tu Declaración Jurada. Tu cuenta de la Agencia Virtual está lista.
        </p>
        <AlertBanner variant="success">
          Ya puedes iniciar sesión con tu DNI/RUC y la contraseña que registraste.
        </AlertBanner>
        <div className="success-card__actions">
          <Button variant="filled" color="primary" onClick={onGoLogin}>
            Iniciar sesión
          </Button>
        </div>
      </Card>
    )
  }

  // Paso 2: documento + firma con check
  if (paso === 'documento') {
    return (
      <Card>
        <h2 className="card-section-title">Firma tu Declaración Jurada</h2>
        <p className="perfil-form__intro">
          Para activar tu cuenta al instante, revisa el documento y márcalo como firmado.
          Ya no necesitas enviarlo por Mesa de Partes.
        </p>

        <a
          href={declaracionJurada}
          target="_blank"
          rel="noopener noreferrer"
          className="doc-preview"
        >
          <span className="doc-preview__icon">
            <FileText size={26} />
          </span>
          <span className="doc-preview__info">
            <span className="doc-preview__name">Declaración Jurada de solicitud de acceso</span>
            <span className="doc-preview__meta">PDF · Ábrelo para revisarlo</span>
          </span>
          <FileCheck size={20} className="doc-preview__open" />
        </a>

        <label className="perfil-form__terms doc-sign-check">
          <input
            type="checkbox"
            checked={firmado}
            onChange={(e) => setFirmado(e.target.checked)}
          />
          <span>
            He leído la Declaración Jurada y la <strong>firmo electrónicamente</strong>, declarando
            que la información es verdadera.
          </span>
        </label>

        <div className="success-card__actions" style={{ justifyContent: 'flex-start' }}>
          <Button variant="text" color="primary" onClick={() => setPaso('form')}>
            Volver
          </Button>
          <Button variant="filled" color="secondary" disabled={!firmado} onClick={handleCrearCuenta}>
            Crear cuenta
          </Button>
        </div>
      </Card>
    )
  }

  // Paso 1: formulario de datos
  return (
    <Card>
      <h2 className="card-section-title">Crea tu cuenta — es rápido</h2>
      <p className="perfil-form__intro">
        Completa tus datos y firma la Declaración Jurada en línea. Sin trámites presenciales.
      </p>

      <AlertBanner variant="info">
        Registrarte te permite recibir notificaciones, presentar descargos y ver todo tu historial.
        Si solo quieres consultar o pagar, puedes hacerlo sin cuenta.
      </AlertBanner>

      <form onSubmit={handleSubmitForm} className="register-form">
        {/* Datos personales */}
        <h3 className="card-section-divider">Datos personales</h3>
        <div className="form-row">
          <SelectField label="Tipo de documento *" id="tipo-doc" defaultValue="DNI">
            <option value="DNI">DNI</option>
            <option value="CE">Carné de extranjería</option>
            <option value="PAS">Pasaporte</option>
          </SelectField>
          <TextField label="N.° de documento *" id="num-doc" placeholder="76328915" />
          <TextField label="Fecha de nacimiento *" id="fecha-nac" type="date" />
        </div>
        <div className="form-row">
          <TextField label="Nombres *" id="nombres" placeholder="GLORIA NOEMI" />
          <TextField label="Apellido paterno *" id="ap-paterno" placeholder="HANCCO" />
          <TextField
            label="Apellido materno *"
            id="ap-materno"
            placeholder="SIVINCHA"
            disabled={sinApellidoMaterno}
          />
        </div>
        <label className="perfil-inline-check">
          <input
            type="checkbox"
            checked={sinApellidoMaterno}
            onChange={(e) => setSinApellidoMaterno(e.target.checked)}
          />
          <span>Sin apellido materno</span>
        </label>

        {/* Datos de domicilio */}
        <h3 className="card-section-divider">Datos de domicilio</h3>
        <div className="form-row">
          <SelectField label="Distrito" id="distrito" defaultValue="">
            <option value="">Seleccione...</option>
            <option>Lima</option>
            <option>Miraflores</option>
            <option>San Isidro</option>
            <option>San Juan de Lurigancho</option>
            <option>Otro</option>
          </SelectField>
          <TextField label="Vía" id="via" placeholder="Avenida, Jirón, Calle..." />
          <TextField label="Denominación urbana" id="denominacion" placeholder="Urbanización, A.H., etc." />
        </div>
        <div className="form-row">
          <TextField label="N.° de puerta" id="puerta" placeholder="N.° de puerta" />
          <TextField label="Letra" id="letra" placeholder="Letra" />
          <TextField label="Ingreso" id="ingreso" placeholder="Ingreso" />
        </div>
        <div className="form-row">
          <TextField label="N.° de manzana/UCV" id="manzana" placeholder="Manzana/UCV" />
          <TextField label="Lote" id="lote" placeholder="Lote" />
          <TextField label="N.° de piso" id="piso" placeholder="Piso" />
        </div>
        <div className="form-row">
          <TextField label="Edificio/block/casa" id="edificio" placeholder="Edificio/block/casa" />
          <TextField label="Departamento/interior/oficina" id="depa" placeholder="Dpto/interior/oficina" />
          <TextField label="Sector" id="sector" placeholder="Sector" />
        </div>
        <div className="form-row">
          <TextField label="Zona" id="zona" placeholder="Zona" />
          <TextField label="Etapa" id="etapa" placeholder="Etapa" />
          <TextField label="Grupo" id="grupo" placeholder="Grupo" />
        </div>
        <div className="form-group-full">
          <TextField
            label="Referencia"
            id="referencia"
            placeholder="Ej.: Altura del mercado, frente a la iglesia, paradero..."
          />
        </div>

        {/* Datos del representante */}
        <h3 className="card-section-divider">Datos del representante</h3>
        <label className="perfil-inline-check">
          <input
            type="checkbox"
            checked={esRepresentante}
            onChange={(e) => setEsRepresentante(e.target.checked)}
          />
          <span>Registro en representación de otra persona o empresa</span>
        </label>
        {esRepresentante && (
          <div className="form-row">
            <TextField label="N.° de documento del titular" id="rep-doc" placeholder="Documento del titular" />
            <TextField label="Nombre o razón social" id="rep-nombre" placeholder="Titular representado" />
          </div>
        )}

        {/* Datos de contacto */}
        <h3 className="card-section-divider">Datos de contacto</h3>
        <div className="form-row">
          <TextField label="Correo electrónico *" id="email" type="email" placeholder="correo@ejemplo.com" />
          <TextField label="Confirmar correo electrónico *" id="email-confirm" type="email" placeholder="correo@ejemplo.com" />
        </div>
        <div className="form-row">
          <TextField label="Teléfono fijo" id="tel-fijo" type="tel" placeholder="(01) 000 0000" />
          <TextField label="Anexo" id="anexo" placeholder="Anexo" />
          <TextField label="Teléfono móvil *" id="movil" type="tel" placeholder="999 999 999" />
        </div>

        {/* Datos del usuario */}
        <h3 className="card-section-divider">Datos del usuario</h3>
        <div className="form-row">
          <TextField label="Contraseña *" id="password" type="password" placeholder="Mínimo 8 caracteres" />
          <TextField label="Confirmar contraseña *" id="password-confirm" type="password" placeholder="Ingrese nuevamente" />
        </div>

        <label className="perfil-form__terms">
          <input type="checkbox" required />
          <span>Acepto los Términos y condiciones del SAT.</span>
        </label>

        <Button type="submit" variant="filled" color="primary">
          Continuar a la firma
        </Button>
        <p className="perfil-form__version">Versión 1.0.0 © {new Date().getFullYear()} SAT. Todos los derechos reservados.</p>
      </form>
    </Card>
  )
}
