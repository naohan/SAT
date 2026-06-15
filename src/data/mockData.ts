import type { Alerta, Deuda, Papeleta, Tramite } from '../types'

export const mockPapeletas: Papeleta[] = [
  {
    id: '1',
    numero: 'M01-000123',
    placa: 'ABC-123',
    dni: '76328915',
    motivo: 'No respetó la luz roja del semáforo',
    fecha: '12/05/2026',
    monto: 396,
    estado: 'Pendiente',
    diasRestantes: 15,
    evidenciaDisponible: true,
  },
  {
    id: '2',
    numero: 'G11-004521',
    placa: 'XYZ-789',
    dni: '76328915',
    motivo: 'Exceso de velocidad en zona urbana',
    fecha: '03/04/2026',
    monto: 462,
    estado: 'Pendiente',
    diasRestantes: 8,
    evidenciaDisponible: true,
  },
]

export const mockDeudas: Deuda[] = [
  {
    id: '1',
    concepto: 'Papeleta M01-000123',
    referencia: 'Infracción de tránsito',
    monto: 396,
    vencimiento: '27/06/2026',
  },
  {
    id: '2',
    concepto: 'Papeleta G11-004521',
    referencia: 'Infracción de tránsito',
    monto: 462,
    vencimiento: '20/06/2026',
  },
  {
    id: '3',
    concepto: 'Tasa de revisión técnica',
    referencia: 'Vehicular',
    monto: 85,
    vencimiento: '30/06/2026',
  },
]

export const mockTramite: Tramite = {
  numero: 'MP-2026-0045821',
  tipo: 'Descargo por infracción de tránsito',
  fechaIngreso: '15/05/2026',
  estado: 'En evaluación',
  area: 'Subgerencia de Fiscalización',
  ultimaActualizacion: '10/06/2026',
}

export const mockAlertas: Alerta[] = [
  {
    id: '1',
    tipo: 'warning',
    titulo: 'Vencimiento próximo',
    mensaje: 'Tu cuota de fraccionamiento vence mañana.',
    fecha: '13/06/2026',
  },
  {
    id: '2',
    tipo: 'success',
    titulo: 'Trámite aprobado',
    mensaje: 'Tu solicitud MP-2026-0045821 fue aprobada.',
    fecha: '10/06/2026',
  },
  {
    id: '3',
    tipo: 'info',
    titulo: 'Nueva notificación',
    mensaje: 'Tienes un documento disponible en Mesa de Partes.',
    fecha: '08/06/2026',
  },
  {
    id: '4',
    tipo: 'danger',
    titulo: 'Papeleta registrada',
    mensaje: 'Se registró la papeleta G11-004521 a tu nombre.',
    fecha: '03/04/2026',
  },
]

export const motivosDescargo = [
  'No fui el conductor al momento de la infracción',
  'La señalización no era visible',
  'Error en los datos de la papeleta',
  'Circunstancias de fuerza mayor',
  'Otro motivo',
]
