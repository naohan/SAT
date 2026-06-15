export type ServiceId =
  | 'papeleta'
  | 'pagar'
  | 'descargo'
  | 'tramite'
  | 'cuotas'
  | 'alertas'

export type AlertType = 'warning' | 'success' | 'info' | 'danger'

export interface ServiceCard {
  id: ServiceId
  title: string
  description: string
  color: string
  icon: string
  path: string
}

export interface QuickAccess {
  id: string
  label: string
  path?: string
  externalUrl?: string
}

export interface Papeleta {
  id: string
  numero: string
  placa: string
  dni: string
  motivo: string
  fecha: string
  monto: number
  estado: 'Pendiente' | 'Pagada' | 'En descargo'
  diasRestantes: number
  evidenciaDisponible: boolean
}

export interface Deuda {
  id: string
  concepto: string
  referencia: string
  monto: number
  vencimiento: string
}

export interface Tramite {
  numero: string
  tipo: string
  fechaIngreso: string
  estado: string
  area: string
  ultimaActualizacion: string
}

export interface Alerta {
  id: string
  tipo: AlertType
  titulo: string
  mensaje: string
  fecha: string
}
