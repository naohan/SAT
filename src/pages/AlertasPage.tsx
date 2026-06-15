import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowLeft,
  Bell,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Info,
  Mail,
  MessageCircle,
  Plus,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { externalLinks } from '../data/externalLinks'
import './AlertasPage.css'

type EstadoAlerta = 'urgente' | 'proximo' | 'info' | 'completado'
type CategoriaAlerta = 'pago' | 'tramite' | 'notificacion' | 'papeleta'

interface AlertaItem {
  id: string
  estado: EstadoAlerta
  categoria: CategoriaAlerta
  titulo: string
  mensaje: string
  grupo: string
  tiempo: string
  fecha: string
  accion: { label: string; to: string }
}

const categoriaLabel: Record<CategoriaAlerta, string> = {
  pago: 'Pagos',
  tramite: 'Trámite',
  notificacion: 'Notificación',
  papeleta: 'Papeletas',
}

const estadoCfg: Record<EstadoAlerta, { icon: React.ReactNode }> = {
  urgente: { icon: <Bell size={22} /> },
  proximo: { icon: <AlertTriangle size={22} /> },
  info: { icon: <Info size={22} /> },
  completado: { icon: <CheckCircle size={22} /> },
}

const alertas: AlertaItem[] = [
  {
    id: '1',
    estado: 'proximo',
    categoria: 'pago',
    titulo: 'Vencimiento próximo',
    mensaje: 'Tu cuota de fraccionamiento vence mañana.',
    grupo: 'Hoy',
    tiempo: 'Vence en 1 día',
    fecha: '13/06/2026',
    accion: { label: 'Realizar pago', to: '/pagar' },
  },
  {
    id: '2',
    estado: 'completado',
    categoria: 'tramite',
    titulo: 'Trámite aprobado',
    mensaje: 'Tu solicitud MP-2026-0045821 fue aprobada.',
    grupo: 'Ayer',
    tiempo: 'Hace 3 días',
    fecha: '10/06/2026',
    accion: { label: 'Ver detalle', to: '/tramite' },
  },
  {
    id: '3',
    estado: 'info',
    categoria: 'notificacion',
    titulo: 'Nueva notificación',
    mensaje: 'Tienes un documento disponible en Mesa de Partes.',
    grupo: 'Hace 5 días',
    tiempo: 'Hace 5 días',
    fecha: '08/06/2026',
    accion: { label: 'Ver documento', to: '/mesa-partes' },
  },
  {
    id: '4',
    estado: 'urgente',
    categoria: 'papeleta',
    titulo: 'Papeleta registrada',
    mensaje: 'Se registró la papeleta G11-004521 a tu nombre.',
    grupo: 'Abril',
    tiempo: 'Hace 2 meses',
    fecha: '03/04/2026',
    accion: { label: 'Ver papeleta', to: '/papeleta' },
  },
  {
    id: '5',
    estado: 'proximo',
    categoria: 'pago',
    titulo: 'Recordatorio de pago',
    mensaje: 'Tu impuesto vehicular vence en 5 días.',
    grupo: 'Esta semana',
    tiempo: 'Vence en 5 días',
    fecha: '19/06/2026',
    accion: { label: 'Pagar ahora', to: '/pagar' },
  },
  {
    id: '6',
    estado: 'completado',
    categoria: 'pago',
    titulo: 'Pago confirmado',
    mensaje: 'Recibimos tu pago de S/ 396.00. ¡Gracias!',
    grupo: 'Esta semana',
    tiempo: 'Hace 7 días',
    fecha: '07/06/2026',
    accion: { label: 'Ver constancia', to: '/pagar' },
  },
  {
    id: '7',
    estado: 'info',
    categoria: 'tramite',
    titulo: 'Trámite en evaluación',
    mensaje: 'Tu descargo MP-2026-0045821 está en revisión.',
    grupo: 'Esta semana',
    tiempo: 'Hace 8 días',
    fecha: '06/06/2026',
    accion: { label: 'Ver estado', to: '/tramite' },
  },
  {
    id: '8',
    estado: 'completado',
    categoria: 'notificacion',
    titulo: 'Notificación leída',
    mensaje: 'Confirmaste la lectura de tu resolución.',
    grupo: 'Mayo',
    tiempo: 'Hace 1 mes',
    fecha: '12/05/2026',
    accion: { label: 'Ver documento', to: '/mesa-partes' },
  },
]

type Filtro = 'todas' | 'urgentes' | 'pagos' | 'tramites' | 'notificaciones' | 'completadas'

const filtros: { id: Filtro; label: string; icon: React.ReactNode }[] = [
  { id: 'todas', label: 'Todas', icon: <Bell size={16} /> },
  { id: 'urgentes', label: 'Urgentes', icon: <AlertTriangle size={16} /> },
  { id: 'pagos', label: 'Pagos', icon: <CreditCard size={16} /> },
  { id: 'tramites', label: 'Trámites', icon: <FileText size={16} /> },
  { id: 'notificaciones', label: 'Notificaciones', icon: <Info size={16} /> },
  { id: 'completadas', label: 'Completadas', icon: <CheckCircle size={16} /> },
]

function coincideFiltro(a: AlertaItem, f: Filtro): boolean {
  switch (f) {
    case 'todas':
      return true
    case 'urgentes':
      return a.estado === 'urgente'
    case 'pagos':
      return a.categoria === 'pago'
    case 'tramites':
      return a.categoria === 'tramite'
    case 'notificaciones':
      return a.categoria === 'notificacion'
    case 'completadas':
      return a.estado === 'completado'
  }
}

const POR_PAGINA = 4

export function AlertasPage() {
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const [orden, setOrden] = useState<'recientes' | 'antiguos'>('recientes')
  const [pagina, setPagina] = useState(1)

  const stats = useMemo(
    () => ({
      urgente: alertas.filter((a) => a.estado === 'urgente').length,
      proximo: alertas.filter((a) => a.estado === 'proximo').length,
      info: alertas.filter((a) => a.estado === 'info').length,
      completado: alertas.filter((a) => a.estado === 'completado').length,
    }),
    [],
  )

  const filtradas = useMemo(() => {
    const base = alertas.filter((a) => coincideFiltro(a, filtro))
    return orden === 'antiguos' ? [...base].reverse() : base
  }, [filtro, orden])

  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / POR_PAGINA))
  const paginaActual = Math.min(pagina, totalPaginas)
  const visibles = filtradas.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA)

  // Agrupa las visibles por su etiqueta de tiempo conservando el orden
  const grupos = visibles.reduce<{ grupo: string; items: AlertaItem[] }[]>((acc, item) => {
    const ult = acc[acc.length - 1]
    if (ult && ult.grupo === item.grupo) ult.items.push(item)
    else acc.push({ grupo: item.grupo, items: [item] })
    return acc
  }, [])

  function cambiarFiltro(f: Filtro) {
    setFiltro(f)
    setPagina(1)
  }

  return (
    <div className="page-flow">
      <div className="container">
        <Link to="/" className="alertas-back">
          <ArrowLeft size={18} />
          Volver al inicio
        </Link>

        <header className="alertas-head">
          <h1 className="alertas-head__title">Mis alertas</h1>
          <p className="alertas-head__sub">Notificaciones, recordatorios y avisos de Pitazo SAT</p>
        </header>

        <ConfigAlertas />

        <div className="alertas-stats">
          <StatCard estado="urgente" num={stats.urgente} label="Urgente" sub="Requiere acción" />
          <StatCard estado="proximo" num={stats.proximo} label="Próximas a vencer" sub="En los próximos días" />
          <StatCard estado="info" num={stats.info} label="Informativas" sub="Nuevas notificaciones" />
          <StatCard estado="completado" num={stats.completado} label="Completadas" sub="Trámites finalizados" />
        </div>

        <div className="alertas-toolbar">
          <div className="alertas-chips" role="tablist" aria-label="Filtrar alertas">
            {filtros.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`alerta-chip ${filtro === f.id ? 'alerta-chip--active' : ''}`}
                onClick={() => cambiarFiltro(f.id)}
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </div>
          <select
            className="alertas-sort"
            value={orden}
            onChange={(e) => setOrden(e.target.value as 'recientes' | 'antiguos')}
            aria-label="Ordenar alertas"
          >
            <option value="recientes">Más recientes</option>
            <option value="antiguos">Más antiguas</option>
          </select>
        </div>

        <div className="alertas-timeline">
          {filtradas.length === 0 && (
            <p className="alertas-empty">No hay alertas en esta categoría.</p>
          )}
          {grupos.map((g) => (
            <div key={g.grupo} className="alertas-group">
              <span className="alertas-group__label">{g.grupo}</span>
              {g.items.map((a) => (
                <article key={a.id} className={`alerta-row alerta-row--${a.estado}`}>
                  <span className="alerta-row__icon">{estadoCfg[a.estado].icon}</span>
                  <div className="alerta-row__main">
                    <h3 className="alerta-row__title">{a.titulo}</h3>
                    <p className="alerta-row__msg">{a.mensaje}</p>
                    <span className={`alerta-row__badge alerta-row__badge--${a.categoria}`}>
                      {categoriaLabel[a.categoria]}
                    </span>
                  </div>
                  <div className="alerta-row__meta">
                    <span className={`alerta-row__time alerta-row__time--${a.estado}`}>{a.tiempo}</span>
                    <span className="alerta-row__date">{a.fecha}</span>
                  </div>
                  <Button variant="outlined" color="primary" to={a.accion.to} className="alerta-row__action">
                    {a.accion.label}
                  </Button>
                  <ChevronRight size={18} className="alerta-row__chevron" />
                </article>
              ))}
            </div>
          ))}
        </div>

        {filtradas.length > 0 && (
          <div className="alertas-pagination">
            <span className="alertas-pagination__info">
              Mostrando {visibles.length} de {filtradas.length} alertas
            </span>
            <div className="alertas-pagination__pages">
              <button
                type="button"
                className="page-btn"
                disabled={paginaActual === 1}
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
                aria-label="Página anterior"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`page-btn ${p === paginaActual ? 'page-btn--active' : ''}`}
                  onClick={() => setPagina(p)}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                className="page-btn"
                disabled={paginaActual === totalPaginas}
                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                aria-label="Página siguiente"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({
  estado,
  num,
  label,
  sub,
}: {
  estado: EstadoAlerta
  num: number
  label: string
  sub: string
}) {
  return (
    <div className={`stat-card stat-card--${estado}`}>
      <span className="stat-card__icon">{estadoCfg[estado].icon}</span>
      <div className="stat-card__body">
        <span className="stat-card__num">{num}</span>
        <span className="stat-card__label">{label}</span>
        <span className="stat-card__sub">{sub}</span>
      </div>
    </div>
  )
}

const CONFIG_KEY = 'sat:pitazo-config'

interface PitazoConfig {
  placas: string[]
  canales: { sms: boolean; whatsapp: boolean; correo: boolean }
  activo: boolean
}

const configInicial: PitazoConfig = {
  placas: ['ABC-123'],
  canales: { sms: true, whatsapp: false, correo: false },
  activo: true,
}

function leerConfig(): PitazoConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY)
    return raw ? (JSON.parse(raw) as PitazoConfig) : configInicial
  } catch {
    return configInicial
  }
}

function ConfigAlertas() {
  const [config, setConfig] = useState<PitazoConfig>(leerConfig)
  const [nuevaPlaca, setNuevaPlaca] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
    } catch {
      // Demo: si falla el almacenamiento no bloqueamos al usuario
    }
    // TODO (producción): sincronizar con el motor de Pitazo/WhatSAT vía API
  }, [config])

  function agregarPlaca(e: React.FormEvent) {
    e.preventDefault()
    const placa = nuevaPlaca.trim().toUpperCase()
    if (!placa || config.placas.includes(placa)) return
    setConfig((c) => ({ ...c, placas: [...c.placas, placa], activo: true }))
    setNuevaPlaca('')
  }

  function quitarPlaca(placa: string) {
    setConfig((c) => ({ ...c, placas: c.placas.filter((p) => p !== placa) }))
  }

  function toggleCanal(canal: keyof PitazoConfig['canales']) {
    setConfig((c) => ({ ...c, canales: { ...c.canales, [canal]: !c.canales[canal] } }))
  }

  const algunCanal = config.canales.sms || config.canales.whatsapp || config.canales.correo
  const activa = config.activo && config.placas.length > 0 && algunCanal

  return (
    <Card className="alertas-config">
      <div className="alertas-config__head">
        <span className="alertas-config__icon">
          <Bell size={22} />
        </span>
        <div>
          <h2 className="alertas-config__title">Tus alertas automáticas</h2>
          <p className="alertas-config__sub">
            Te avisamos al día siguiente de registrada una papeleta, ante una orden de captura y
            antes de cada vencimiento. Reemplaza el registro de Pitazo: aquí gestionas todo en un
            solo lugar.
          </p>
        </div>
        <span className={`alertas-config__estado ${activa ? 'is-on' : 'is-off'}`}>
          {activa ? 'Alertas activas' : 'Alertas en pausa'}
        </span>
      </div>

      <div className="alertas-config__grid">
        <div className="alertas-config__col">
          <h3 className="alertas-config__label">Placas vigiladas</h3>
          <div className="placa-chips">
            {config.placas.length === 0 && (
              <span className="placa-empty">Agrega una placa para recibir avisos.</span>
            )}
            {config.placas.map((placa) => (
              <span key={placa} className="placa-chip">
                {placa}
                <button type="button" onClick={() => quitarPlaca(placa)} aria-label={`Quitar ${placa}`}>
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <form className="placa-add" onSubmit={agregarPlaca}>
            <input
              className="placa-add__input"
              type="text"
              placeholder="Ej.: XYZ-789"
              value={nuevaPlaca}
              onChange={(e) => setNuevaPlaca(e.target.value)}
              aria-label="Nueva placa"
            />
            <Button type="submit" variant="tonal" color="primary">
              <Plus size={16} />
              Agregar
            </Button>
          </form>
        </div>

        <div className="alertas-config__col">
          <h3 className="alertas-config__label">Canales de aviso</h3>
          <div className="canal-toggles">
            <button
              type="button"
              className={`canal-toggle ${config.canales.sms ? 'is-active' : ''}`}
              onClick={() => toggleCanal('sms')}
              aria-pressed={config.canales.sms}
            >
              <Smartphone size={18} />
              SMS (Pitazo)
            </button>
            <button
              type="button"
              className={`canal-toggle ${config.canales.whatsapp ? 'is-active' : ''}`}
              onClick={() => toggleCanal('whatsapp')}
              aria-pressed={config.canales.whatsapp}
            >
              <MessageCircle size={18} />
              WhatsApp
            </button>
            <button
              type="button"
              className={`canal-toggle ${config.canales.correo ? 'is-active' : ''}`}
              onClick={() => toggleCanal('correo')}
              aria-pressed={config.canales.correo}
            >
              <Mail size={18} />
              Correo
            </button>
          </div>
        </div>
      </div>

      <div className="alertas-config__foot">
        <span className="alertas-config__privacy">
          <ShieldCheck size={14} />
          Servicio gratuito. Solo usamos tus datos para avisarte.
        </span>
        <a
          href={externalLinks.pitazo}
          target="_blank"
          rel="noopener noreferrer"
          className="alertas-config__legacy"
        >
          Usar el registro clásico de Pitazo
        </a>
      </div>
    </Card>
  )
}
