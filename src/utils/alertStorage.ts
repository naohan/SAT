/**
 * Persistencia de suscripciones de avisos (Fase 1 / demo).
 *
 * Hoy guarda en localStorage para que el prototipo funcione sin backend.
 * En producción, reemplazar `saveAlertSubscription` por una llamada a la
 * API del SAT que valide el DNI y registre el canal en el motor de
 * notificaciones (WhatSAT / correo).
 */

export type CanalAviso = 'whatsapp' | 'correo'

export interface AlertSubscription {
  dni: string
  canal: CanalAviso
  contacto: string
  fecha: string
}

const STORAGE_KEY = 'sat:alert-subscriptions'

export function getAlertSubscriptions(): AlertSubscription[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AlertSubscription[]) : []
  } catch {
    return []
  }
}

export function saveAlertSubscription(
  sub: Omit<AlertSubscription, 'fecha'>,
): AlertSubscription {
  const record: AlertSubscription = { ...sub, fecha: new Date().toISOString() }
  try {
    const all = getAlertSubscriptions()
    // Reemplaza si ya existe una suscripción para ese DNI
    const next = [...all.filter((s) => s.dni !== record.dni), record]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Silencioso: en demo no bloqueamos al usuario si falla el almacenamiento
  }
  // TODO (producción): await fetch('/api/avisos', { method: 'POST', body: JSON.stringify(record) })
  return record
}
