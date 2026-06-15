import { useState } from 'react'
import { Bell, CheckCircle, Lock, MessageCircle, Mail } from 'lucide-react'
import { Button } from './Button'
import { saveAlertSubscription, type CanalAviso } from '../../utils/alertStorage'
import './AlertOptIn.css'

interface AlertOptInProps {
  /** Texto contextual opcional, p. ej. referido a una papeleta concreta */
  contexto?: string
  /** Variante compacta para incrustar bajo una tarjeta de resultado */
  compact?: boolean
  /** DNI inicial si ya lo conocemos por la consulta previa */
  dniInicial?: string
}

export function AlertOptIn({ contexto, compact = false, dniInicial = '' }: AlertOptInProps) {
  const [canal, setCanal] = useState<CanalAviso>('whatsapp')
  const [dni, setDni] = useState(dniInicial)
  const [contacto, setContacto] = useState('')
  const [activado, setActivado] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!dni.trim() || !contacto.trim()) return
    saveAlertSubscription({ dni: dni.trim(), canal, contacto: contacto.trim() })
    setActivado(true)
  }

  if (activado) {
    return (
      <div className={`optin optin--done ${compact ? 'optin--compact' : ''}`}>
        <CheckCircle size={22} className="optin__done-icon" />
        <div>
          <p className="optin__done-title">¡Listo! Avisos activados</p>
          <p className="optin__done-text">
            Te escribiremos por {canal === 'whatsapp' ? 'WhatsApp' : 'correo'} antes de cada
            vencimiento para que pagues a tiempo y evites recargos.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`optin ${compact ? 'optin--compact' : ''}`}>
      <div className="optin__head">
        <span className="optin__icon">
          <Bell size={22} />
        </span>
        <div>
          <h3 className="optin__title">
            No pagues de más por un aviso que no llegó
          </h3>
          <p className="optin__subtitle">
            {contexto ?? 'Te avisamos antes del vencimiento'} por WhatsApp o correo.
            Evita intereses, recargos y embargos. Es gratis.
          </p>
        </div>
      </div>

      <form className="optin__form" onSubmit={handleSubmit}>
        <div className="optin__channels" role="radiogroup" aria-label="Canal de aviso">
          <button
            type="button"
            role="radio"
            aria-checked={canal === 'whatsapp'}
            className={`optin__channel ${canal === 'whatsapp' ? 'optin__channel--active' : ''}`}
            onClick={() => setCanal('whatsapp')}
          >
            <MessageCircle size={18} />
            WhatsApp
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={canal === 'correo'}
            className={`optin__channel ${canal === 'correo' ? 'optin__channel--active' : ''}`}
            onClick={() => setCanal('correo')}
          >
            <Mail size={18} />
            Correo
          </button>
        </div>

        <div className="optin__row">
          <input
            className="optin__input optin__input--dni"
            type="text"
            inputMode="numeric"
            maxLength={8}
            placeholder="Tu DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
            aria-label="Número de DNI"
          />
          <input
            className="optin__input"
            type={canal === 'whatsapp' ? 'tel' : 'email'}
            inputMode={canal === 'whatsapp' ? 'tel' : 'email'}
            placeholder={canal === 'whatsapp' ? 'Tu número de WhatsApp' : 'Tu correo electrónico'}
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            aria-label={canal === 'whatsapp' ? 'Número de WhatsApp' : 'Correo electrónico'}
          />
          <Button type="submit" variant="filled" color="secondary">
            Activar avisos gratis
          </Button>
        </div>

        <p className="optin__privacy">
          <Lock size={13} />
          Solo usamos tus datos para avisarte. No los compartimos.
        </p>
      </form>
    </div>
  )
}
