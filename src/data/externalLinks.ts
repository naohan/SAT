/**
 * Enlaces del ecosistema SAT (Fase 1).
 * Objetivo: unificar la interfaz SIN perder ninguna funcionalidad existente.
 * Todos los sistemas actuales siguen accesibles; aquí se centralizan y agrupan.
 */
export const externalLinks = {
  // --- Portal / sesión ---
  portalPrincipal: 'https://www.sat.gob.pe/VirtualSAT/principal.aspx',
  avisatLogin:
    'https://app.sat.gob.pe/avisat/LoginSatExt/Login/Index?sistema=ziwS2Tn2fUvraD8kXDU15TBU3ih2YyA18sg0ZZtlZjo%3d&idaplicacion=7Trfk2olIjG6sCRUQE%2bncsMYEwYxHLJ1A3w7UI60c%2f4%3d',
  agenciaVirtual: 'https://www.sat.gob.pe/VirtualSAT/principal.aspx',

  // --- Acceso SIN cuenta (consulta pública) ---
  ciudadanoPublico: 'https://app.sat.gob.pe/Avisat/ciudadanopublico#',

  // --- Mesa de Partes / trámites ---
  mesaPartes: 'https://app.sat.gob.pe/AVISAT/MesaPartesDigital/Tramite/ConsultaTramite',
  consultaTramite: 'https://app.sat.gob.pe/AVISAT/MesaPartesDigital/Tramite/ConsultaTramite',

  // --- Papeletas / multas ---
  papeletasPendientes:
    'https://www.sat.gob.pe/VirtualSAT/principal.aspx?mysession=A5ZhIjtXha7SZH3Kesgpk7gwGvpUFEEQm34xW6IISdU%3d',
  multasAdmin:
    'https://www.sat.gob.pe/VirtualSAT/modulos/MultasAdmin.aspx?mysession=A5ZhIjtXha7SZH3Kesgpk1pciKJ8qCCp',

  // --- Pagos ---
  pagosEnLinea: 'https://www.sat.gob.pe/pagosenlinea/',

  // --- Verificación / Pitazo ---
  verificaDocumento: 'https://www.sat.gob.pe/VerificaDocumento',
  pitazo: 'https://www.sat.gob.pe/VirtualSAT/modulos/pitazo/Default.aspx',

  // --- Transparencia / acceso a la información pública ---
  transparenciaConsulta: 'https://accesoinformacionpublica.sat.gob.pe/pages/ConsultaSolicitud',
  transparenciaSolicitud: 'https://accesoinformacionpublica.sat.gob.pe/pages/Solicitud',

  // --- Datos abiertos ---
  datasetPapeletas:
    'https://www.gob.pe/institucion/satlima/normas-legales/7760713-286-004-00000230',

  // --- Recursos institucionales ---
  vacantes: 'https://www.sat.gob.pe/cvvirtual/Modulos/frmVacantesPublicacion.aspx',

  // --- Contacto ---
  whatsapp:
    'https://api.whatsapp.com/send/?phone=51999431111&text=Hola%2C+quisiera+m%C3%A1s+Informaci%C3%B3n&type=phone_number&app_absent=0',
} as const

export type ExternalLinkKey = keyof typeof externalLinks
