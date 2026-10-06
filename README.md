# SAT Contigo — Propuesta frontend para el portal ciudadano del SAT Lima

> Prototipo funcional de interfaz. Una sola experiencia para **conocer, comprender y resolver a tiempo** una deuda por infracción de tránsito, sin trámites presenciales innecesarios.

Este repositorio presenta una **idea de frontend**: cómo podría verse y comportarse el portal del SAT Lima si se organizara por lo que necesita el ciudadano, y no por los sistemas internos que lo atienden. Todos los datos son simulados; no hay conexión con sistemas reales del SAT.

---

## El problema

El SAT Lima ya cuenta con canales digitales (Web SAT, Agencia Virtual, AVISAT, Mesa de Partes Digital, Pitazo, chatbot y WhatsApp). Aun así, las agencias siguen llenas de consultas sencillas. La causa no es la falta de web, sino tres fallas en la experiencia:

| Falla | Qué ocurre hoy |
| --- | --- |
| **No se entera** | La notificación física depende de direcciones que pueden estar desactualizadas. El 70 % se entera por carta y un 7 % llega a la agencia sin haber recibido aviso previo. |
| **No comprende** | Códigos de infracción poco legibles, monto final poco claro y varios nombres de sistemas (AVISAT, Agencia Virtual, Pitazo, Virtual SAT) que parecen instituciones distintas. |
| **No se atreve a resolver en digital** | Miedo a cometer un error irreparable (brecha de aptitud) o desconfianza en lo virtual (brecha de actitud). |

Datos de referencia (agencias SAT Lima, 2025): el 46 % acude por papeletas, el 48 % va a pedir asesoría a un consultor y se pierden en promedio 2 horas solo en traslados.

## La propuesta

**SAT Contigo** es una capa de experiencia sobre los servicios que ya existen. No reemplaza ningún sistema del SAT: los reúne en una interfaz coherente.

1. **Navegación por necesidad.** El ciudadano entra por lo que le pasa (*tengo una papeleta*, *quiero pagar*, *no estoy de acuerdo*, *quiero pagar en cuotas*), no por el nombre del sistema.
2. **Una sola identidad.** "Iniciar sesión" lleva a un único tablero personal. La diferencia entre AVISAT y Agencia Virtual deja de ser visible para el ciudadano.
3. **Un orientador delante de los trámites.** El Asistente SAT recibe la duda en lenguaje natural y recomienda el trámite correcto, con documentos, tiempo y costo. Es el equivalente digital del consultor por el que hoy se hace cola.
4. **Avisos a tiempo, con consentimiento.** Pitazo, casilla electrónica y notificaciones se unifican en **Mis alertas**. El ciudadano elige su canal (SMS, WhatsApp o correo) en el momento en que le resulta útil, sin un registro adicional.
5. **Flujos guiados paso a paso.** Pago, descargo y fraccionamiento muestran en qué paso está el ciudadano y qué falta, para reducir el miedo a equivocarse.

## Qué incluye el prototipo

| Ruta | Pantalla | Qué demuestra |
| --- | --- | --- |
| `/` | Inicio | Buscador por DNI, placa o número de trámite; servicios organizados por necesidad; invitación a activar avisos; "cómo funciona". |
| `/papeleta` | Consulta de papeletas | Resultado legible: infracción explicada, monto y acciones posibles. |
| `/pagar` | Pagar deuda | Asistente en 3 pasos: consulta de deuda → datos del pago → confirmación y medio de pago (tarjeta, Yape, Plin). |
| `/cuotas` | Facilidades de pago | Simulador de fraccionamiento: elige el número de cuotas y ve la cuota mensual estimada. |
| `/descargo` | Descargo de papeletas | Reclamo guiado contra una papeleta. |
| `/tramite` | Estado de trámite | Búsqueda por número, procedimiento o tipo de trámite. |
| `/mesa-partes` | Mesa de Partes Digital | Asistente SAT arriba, trámites más solicitados y catálogo completo por categoría. |
| `/alertas` | Mis alertas | Centro unificado: placas vigiladas, canales de aviso, alertas por estado, filtros y línea de tiempo. |
| `/perfil` | Acceso y tablero personal | Inicio de sesión, registro simplificado y tablero con módulos de la Agencia Virtual, alertas, accesos rápidos y asistente. |

Todas las pantallas son responsivas y están pensadas para usarse desde el celular, que es donde llega el aviso.

## Principios de diseño

- **Lenguaje claro** en lugar de códigos y siglas internas.
- **Nada se pierde:** cada servicio y enlace del ecosistema actual sigue disponible; cambia la forma de llegar a él.
- **Una acción principal por pantalla**, con el siguiente paso siempre visible.
- **Material Design 3** con la paleta azul institucional del SAT Lima, para una interfaz consistente y accesible.
- **Lo digital suma, no sustituye:** los avisos digitales complementan la notificación legal; no la reemplazan.

## Tecnología

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) como entorno de desarrollo y build
- [React Router](https://reactrouter.com) para la navegación
- [Lucide](https://lucide.dev) para iconografía
- CSS propio con tokens de Material Design 3 (`src/styles/theme.css`)

## Cómo ejecutarlo

Requisitos: Node.js 20.19 o superior.

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en el navegador.

Otros comandos:

```bash
npm run build     # compila para producción en dist/
npm run preview   # sirve la versión compilada
npm run lint      # revisa el código con ESLint
```

Para probar el tablero personal, entra a `/perfil` e inicia sesión con cualquier tipo y número de documento. La sesión se guarda en el navegador (`localStorage`) para que la navegación entre pantallas se comporte como en un portal real.

## Estructura del proyecto

```text
src/
├── components/
│   ├── home/      # Secciones de la página de inicio
│   ├── layout/    # Header, Footer, botón de WhatsApp
│   └── ui/        # Componentes reutilizables (Button, Card, Stepper, AlertOptIn…)
├── data/          # Datos simulados, catálogo de trámites y enlaces oficiales
├── pages/         # Una página por ruta
├── styles/        # Tokens de diseño (Material Design 3)
├── types/         # Tipos compartidos
└── utils/         # Sesión simulada y preferencias de alertas
docs/
└── contexto.md    # Contexto y decisiones del proyecto
```

## Alcance y limitaciones

Este es un **prototipo de interfaz**, no un sistema en producción:

- Las deudas, papeletas, trámites y alertas son datos de ejemplo (`src/data/mockData.ts`).
- El inicio de sesión, los pagos y el envío de avisos están simulados.
- El Asistente SAT funciona con reglas y palabras clave (`src/data/mesaPartes.ts`), no con inteligencia artificial.
- Los enlaces a servicios oficiales del SAT apuntan a las páginas reales (`src/data/externalLinks.ts`).

## Hoja de ruta

| Fase | Alcance |
| --- | --- |
| **1 — Interfaz unificada** (este repositorio) | Portal por necesidades, flujos guiados, alertas unificadas y asistente simulado. |
| **2 — Piloto de avisos** | Consentimiento de canal en el primer pago o consulta; integración de Pitazo con Mis alertas. |
| **3 — SAT Copiloto** | Reemplazar las reglas del asistente por IA generativa que explique la infracción y el siguiente paso, manteniendo la misma interfaz. |
| **4 — Integración** | Inicio de sesión único sobre Agencia Virtual / AVISAT, consulta y pago reales, casilla electrónica. |

---

Proyecto desarrollado como propuesta para la hackatón del SAT Lima. Más detalle sobre las decisiones de diseño en [`docs/contexto.md`](docs/contexto.md).
