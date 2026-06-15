import type { ReactNode } from 'react'

interface StatusBadgeProps {
  status: string
  variant?: 'pending' | 'success' | 'info' | 'danger'
}

const variantMap: Record<string, string> = {
  pending: 'badge-pending',
  success: 'badge-success',
  info: 'badge-info',
  danger: 'badge-danger',
}

function inferVariant(status: string): string {
  const lower = status.toLowerCase()
  if (lower.includes('pendiente') || lower.includes('evaluación')) return 'pending'
  if (lower.includes('aprob') || lower.includes('pagad')) return 'success'
  if (lower.includes('rechaz') || lower.includes('venc')) return 'danger'
  return 'info'
}

export function StatusBadge({ status, variant }: StatusBadgeProps): ReactNode {
  const cls = variantMap[variant ?? inferVariant(status)] ?? 'badge-info'
  return <span className={`badge ${cls}`}>{status}</span>
}
