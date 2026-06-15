/**
 * Trámites de la Mesa de Partes Digital del SAT, descritos en lenguaje claro.
 * Estructura basada en https://app.sat.gob.pe/AVISAT/MesaPartesDigital/
 */

export type TramiteAccion =
  | { tipo: 'wizard' }
  | { tipo: 'interno'; path: string }

export interface MesaTramite {
  id: string
  titulo: string
  /** Explicación en lenguaje simple: ¿para qué sirve? */
  paraQue: string
  icon: string
  accion: TramiteAccion
  /** Etiqueta de detalle en el asistente (paso 2) */
  detalleLabel?: string
  /** Palabras/frases que el Asistente SAT usa para orientar al ciudadano */
  keywords?: string[]
  /** Documentos necesarios (para el panel del asistente) */
  documentos?: string[]
  /** Tiempo estimado del trámite */
  tiempo?: string
  /** Costo del trámite */
  costo?: string
}

export interface MesaGrupo {
  grupo: string
  tramites: MesaTramite[]
}

export const mesaPartesGrupos: MesaGrupo[] = [
  {
    grupo: 'Mesa de partes digital',
    tramites: [
      {
        id: 'nueva-solicitud',
        titulo: 'Nueva solicitud',
        paraQue: 'Presenta cualquier documento o pedido al SAT desde aquí.',
        icon: 'file-plus',
        accion: { tipo: 'wizard' },
        detalleLabel: 'Describe tu solicitud',
        keywords: ['presentar', 'enviar', 'documento', 'solicitud', 'pedido', 'escrito', 'carta'],
        documentos: ['DNI o documento de identidad', 'Documento o escrito que deseas presentar'],
        tiempo: '10 minutos',
        costo: 'Gratuito',
      },
      {
        id: 'descargo',
        titulo: 'Descargo de papeletas',
        paraQue: 'No estás de acuerdo con una papeleta y quieres reclamar.',
        icon: 'scale',
        accion: { tipo: 'interno', path: '/descargo' },
        keywords: [
          'injusta', 'injustamente', 'no me corresponde', 'no fui', 'reclamar', 'reclamo',
          'impugnar', 'no estoy de acuerdo', 'apelar', 'descargo', 'prueba', 'error',
        ],
        documentos: ['DNI', 'Copia de la papeleta', 'Sustento probatorio (fotos, documentos)'],
        tiempo: '15 minutos',
        costo: 'Gratuito',
      },
      {
        id: 'consulta',
        titulo: 'Consulta de trámites',
        paraQue: 'Revisa en qué estado va un trámite que ya presentaste.',
        icon: 'search',
        accion: { tipo: 'interno', path: '/tramite' },
        keywords: [
          'estado', 'expediente', 'seguimiento', 'como va', 'avance', 'consultar',
          'numero de tramite', 'mi tramite', 'situacion',
        ],
        documentos: ['Número de trámite'],
        tiempo: '2 minutos',
        costo: 'Gratuito',
      },
      {
        id: 'acceso-informacion',
        titulo: 'Acceso a la información pública',
        paraQue: 'Solicita información pública del SAT (Ley de Transparencia).',
        icon: 'book-open',
        accion: { tipo: 'wizard' },
        detalleLabel: '¿Qué información solicitas?',
        keywords: [
          'informacion publica', 'transparencia', 'acceso a la informacion', 'datos',
          'solicitar informacion', 'ley de transparencia',
        ],
        documentos: ['DNI', 'Detalle de la información solicitada'],
        tiempo: '10 minutos',
        costo: 'Gratuito',
      },
      {
        id: 'pendientes-pago',
        titulo: 'Solicitudes pendientes de pago',
        paraQue: 'Revisa y paga las solicitudes que tienen un costo.',
        icon: 'credit-card',
        accion: { tipo: 'interno', path: '/pagar' },
        keywords: ['pendiente de pago', 'pagar solicitud', 'costo de tramite', 'deuda de tramite'],
        documentos: ['Número de solicitud'],
        tiempo: '5 minutos',
        costo: 'Según el trámite',
      },
      {
        id: 'suspension-coactiva',
        titulo: 'Suspensión de cobranza coactiva',
        paraQue: 'Pide detener una cobranza coactiva que está en curso.',
        icon: 'shield',
        accion: { tipo: 'wizard' },
        detalleLabel: 'Motivo de la suspensión',
        keywords: [
          'cobranza coactiva', 'embargo', 'suspender', 'detener cobranza', 'medida cautelar',
          'me van a embargar', 'coactiva',
        ],
        documentos: ['DNI', 'Sustento de la suspensión (resolución, comprobante de pago, etc.)'],
        tiempo: '15 minutos',
        costo: 'Gratuito',
      },
    ],
  },
  {
    grupo: 'Servicios automatizados',
    tramites: [
      {
        id: 'prescripcion',
        titulo: 'Prescripción de papeletas',
        paraQue: 'Solicita anular papeletas muy antiguas que ya prescribieron.',
        icon: 'clock',
        accion: { tipo: 'wizard' },
        detalleLabel: 'Indica las papeletas a prescribir',
        keywords: [
          'prescripcion', 'prescribir', 'antigua', 'vieja', 'caducado', 'caduco',
          'muy antigua', 'años', 'anios', 'tiempo',
        ],
        documentos: ['DNI', 'Datos de las papeletas (número o placa)'],
        tiempo: '10 minutos',
        costo: 'Gratuito',
      },
      {
        id: 'constancia-no-adeudo',
        titulo: 'Constancia de no adeudo',
        paraQue: 'Obtén un documento que certifica que no tienes deudas.',
        icon: 'file-check',
        accion: { tipo: 'wizard' },
        detalleLabel: '¿Para qué necesitas la constancia?',
        keywords: [
          'no debo', 'no adeudo', 'constancia', 'certificado', 'no tengo deudas',
          'libre de deuda', 'que no debo nada', 'sin deudas',
        ],
        documentos: ['DNI'],
        tiempo: '5 minutos',
        costo: 'Gratuito',
      },
      {
        id: 'ratificacion',
        titulo: 'Solicitud de ratificación',
        paraQue: 'Pide la ratificación de un acto o resolución administrativa.',
        icon: 'stamp',
        accion: { tipo: 'wizard' },
        detalleLabel: 'Detalle de la ratificación',
        keywords: ['ratificacion', 'ratificar', 'resolucion', 'acto administrativo'],
        documentos: ['DNI', 'Resolución o acto a ratificar'],
        tiempo: '10 minutos',
        costo: 'Gratuito',
      },
    ],
  },
]

export const departamentos = ['Lima', 'Callao', 'Arequipa', 'La Libertad', 'Otro']
export const tiposPersona = ['Persona Natural', 'Persona Jurídica']
export const tiposDocumento = ['DNI', 'RUC', 'Carné de extranjería', 'Pasaporte']

/** Todos los trámites en una sola lista */
export const todosLosTramites: MesaTramite[] = mesaPartesGrupos.flatMap((g) => g.tramites)

/** Trámites más solicitados (accesos rápidos) */
export const tramitesDestacadosIds = ['nueva-solicitud', 'consulta', 'descargo']

export function getTramiteById(id: string): MesaTramite | undefined {
  return todosLosTramites.find((t) => t.id === id)
}

// ===== Asistente SAT (orientador de trámites simulado) =====

export interface OpcionClarificacion {
  label: string
  /** id de trámite, o ruta interna si empieza con "/" */
  value: string
}

export type ResultadoAsistente =
  | { tipo: 'recomendacion'; tramite: MesaTramite }
  | { tipo: 'pregunta'; pregunta: string; opciones: OpcionClarificacion[] }
  | { tipo: 'sin-resultado' }

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Orientador de trámites (Fase 1 / simulado).
 * Hoy usa reglas y coincidencia de palabras clave. En Fase 2, esta función
 * se reemplaza por la respuesta del "SAT Copiloto" (IA generativa), manteniendo
 * el mismo objetivo: identificar QUÉ trámite necesita el ciudadano.
 */
export function orientarTramite(texto: string): ResultadoAsistente {
  const t = normalizar(texto)
  if (!t.trim()) return { tipo: 'sin-resultado' }

  // Regla especial: papeletas/multas suelen ser ambiguas (impugnar vs prescribir vs pagar)
  const mencionaPapeleta = /(papeleta|multa|infraccion|transito|transit)/.test(t)
  if (mencionaPapeleta) {
    const quierePrescripcion = /(prescri|antigua|vieja|caduc|hace anos|hace años|muy vieja)/.test(t)
    const quiereImpugnar = /(injust|no me corresponde|no fui|reclam|impugn|descargo|no estoy de acuerdo|apel|no es mia|no es mio)/.test(t)
    const quierePagar = /(pagar|cancelar|abonar)/.test(t)

    if (quierePrescripcion) return { tipo: 'recomendacion', tramite: getTramiteById('prescripcion')! }
    if (quiereImpugnar) return { tipo: 'recomendacion', tramite: getTramiteById('descargo')! }
    if (quierePagar) {
      return {
        tipo: 'pregunta',
        pregunta: 'Para pagar tu papeleta te llevamos al pago en línea. ¿Continuamos?',
        opciones: [
          { label: 'Sí, quiero pagar mi papeleta', value: '/pagar' },
          { label: 'No estoy de acuerdo con la papeleta', value: 'descargo' },
        ],
      }
    }
    // Ambiguo → preguntar (Nivel 2)
    return {
      tipo: 'pregunta',
      pregunta: 'Sobre tu papeleta, ¿qué deseas hacer?',
      opciones: [
        { label: 'No estoy de acuerdo y quiero impugnarla', value: 'descargo' },
        { label: 'Es muy antigua, solicitar prescripción', value: 'prescripcion' },
        { label: 'Solo quiero pagarla', value: '/pagar' },
      ],
    }
  }

  // Coincidencia por palabras clave (puntaje)
  let mejor: MesaTramite | null = null
  let mejorPuntaje = 0
  for (const tr of todosLosTramites) {
    const puntaje = (tr.keywords ?? []).reduce(
      (acc, kw) => (t.includes(normalizar(kw)) ? acc + 1 : acc),
      0,
    )
    if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje
      mejor = tr
    }
  }

  if (mejor) return { tipo: 'recomendacion', tramite: mejor }
  return { tipo: 'sin-resultado' }
}
