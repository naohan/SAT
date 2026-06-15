import type { QuickAccess, ServiceCard } from '../types'
import { externalLinks } from './externalLinks'

export const mainServices: ServiceCard[] = [
  {
    id: 'papeleta',
    title: 'Tengo una papeleta',
    description: 'Consulta y paga tus infracciones de tránsito de forma rápida.',
    color: '#2563eb',
    icon: 'car',
    path: '/papeleta',
  },
  {
    id: 'pagar',
    title: 'Quiero pagar',
    description: 'Realiza el pago de tus deudas pendientes en un solo lugar.',
    color: '#16a34a',
    icon: 'credit-card',
    path: '/pagar',
  },
  {
    id: 'descargo',
    title: 'No estoy de acuerdo',
    description: 'Presenta tu descargo o reclamo ante una infracción.',
    color: '#7c3aed',
    icon: 'scale',
    path: '/descargo',
  },
  {
    id: 'tramite',
    title: 'Tengo un trámite',
    description: 'Consulta el estado de tus solicitudes y trámites.',
    color: '#ea580c',
    icon: 'calendar',
    path: '/tramite',
  },
  {
    id: 'cuotas',
    title: 'Pagar en cuotas',
    description: 'Solicita un fraccionamiento para tus deudas.',
    color: '#0d9488',
    icon: 'pie-chart',
    path: '/cuotas',
  },
  {
    id: 'alertas',
    title: 'Mis alertas',
    description: 'Recibe notificaciones, recordatorios y avisos importantes.',
    color: '#db2777',
    icon: 'bell',
    path: '/alertas',
  },
]

export const quickAccess: QuickAccess[] = [
  { id: 'avisat', label: 'AVISAT', externalUrl: externalLinks.avisatLogin },
  { id: 'agencia', label: 'Agencia Virtual', path: '/perfil', externalUrl: externalLinks.agenciaVirtual },
  { id: 'mesa', label: 'Mesa de Partes', path: '/tramite', externalUrl: externalLinks.mesaPartes },
  { id: 'pitazo', label: 'Pitazo SAT', path: '/alertas', externalUrl: externalLinks.pitazo },
  { id: 'consulta', label: 'Consulta de Trámite', path: '/tramite' },
]

export const frequentServices = [
  { label: 'Ver evidencias', path: '/papeleta' },
  { label: 'Descargar constancia', path: '/tramite' },
  { label: 'Pagos en línea', path: '/pagar', externalUrl: externalLinks.pagosEnLinea },
  { label: 'Verificar documento', externalUrl: externalLinks.verificaDocumento },
  { label: 'Información pública', externalUrl: externalLinks.transparenciaConsulta },
]

export const howItWorks = [
  { step: 1, title: 'Elige tu tarea', description: 'Selecciona lo que necesitas resolver hoy.' },
  { step: 2, title: 'Ingresa tus datos', description: 'DNI, placa o número de trámite.' },
  { step: 3, title: 'Revisa el resultado', description: 'Entiende tu situación de forma clara.' },
  { step: 4, title: 'Completa la acción', description: 'Paga, reclama o da seguimiento.' },
]

/**
 * Mapa del ecosistema: cómo se reorganiza cada sistema SAT existente
 * según la NECESIDAD del ciudadano (no según el sistema interno).
 * Cada item conserva su enlace original para no perder funcionalidad.
 */
export interface EcosystemEntry {
  need: string
  description: string
  systems: { name: string; url?: string; path?: string }[]
}

export const ecosystemMap: EcosystemEntry[] = [
  {
    need: 'Tengo una papeleta',
    description: 'Consulta y revisa tus infracciones de tránsito.',
    systems: [
      { name: 'Consultas en línea', path: '/papeleta' },
      { name: 'Papeletas pendientes (VirtualSAT)', url: externalLinks.papeletasPendientes },
      { name: 'Multas administrativas', url: externalLinks.multasAdmin },
    ],
  },
  {
    need: 'Quiero pagar',
    description: 'Paga deudas, papeletas y tributos.',
    systems: [
      { name: 'Pago en línea', path: '/pagar' },
      { name: 'Pagos en línea (SAT)', url: externalLinks.pagosEnLinea },
    ],
  },
  {
    need: 'No estoy de acuerdo',
    description: 'Presenta descargos o reclamos.',
    systems: [
      { name: 'Presentar descargo', path: '/descargo' },
      { name: 'Mesa de Partes Digital', path: '/mesa-partes' },
    ],
  },
  {
    need: 'Tengo un trámite',
    description: 'Da seguimiento a tus solicitudes.',
    systems: [
      { name: 'Consulta de trámite', path: '/tramite' },
      { name: 'Mesa de Partes Digital', path: '/mesa-partes' },
    ],
  },
  {
    need: 'Mis alertas',
    description: 'Recordatorios y avisos de vencimiento.',
    systems: [
      { name: 'Mis alertas', path: '/alertas' },
      { name: 'Pitazo SAT', url: externalLinks.pitazo },
    ],
  },
  {
    need: 'Mi cuenta',
    description: 'Acceso, registro y datos personales.',
    systems: [
      { name: 'Acceso / registro', path: '/perfil' },
      { name: 'Iniciar sesión AVISAT', url: externalLinks.avisatLogin },
      { name: 'Consulta pública (sin cuenta)', url: externalLinks.ciudadanoPublico },
    ],
  },
  {
    need: 'Otros servicios',
    description: 'Verificación, transparencia y datos abiertos.',
    systems: [
      { name: 'Verificar documento', url: externalLinks.verificaDocumento },
      { name: 'Acceso a información pública', url: externalLinks.transparenciaSolicitud },
      { name: 'Dataset de papeletas', url: externalLinks.datasetPapeletas },
    ],
  },
]
