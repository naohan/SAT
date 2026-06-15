/**
 * Sesión simulada de la Agencia Virtual (Fase 1 / demo).
 * Persiste en localStorage para que la sesión sobreviva al navegar
 * entre páginas o usar el botón Atrás del navegador.
 */

export interface AuthSession {
  tipoDoc: string
  usuario: string
  fecha: string
}

const STORAGE_KEY = 'sat:session'

export function getSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthSession) : null
  } catch {
    return null
  }
}

export function saveSession(session: Omit<AuthSession, 'fecha'>): AuthSession {
  const record: AuthSession = { ...session, fecha: new Date().toISOString() }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Silencioso en demo
  }
  // TODO (producción): reemplazar por token JWT / cookie de sesión del SAT
  return record
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Silencioso en demo
  }
}
