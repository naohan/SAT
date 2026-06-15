import type { ReactNode } from 'react'
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'
import './AlertBanner.css'

type BannerVariant = 'warning' | 'success' | 'info' | 'error'

interface AlertBannerProps {
  variant: BannerVariant
  children: ReactNode
}

const icons: Record<BannerVariant, ReactNode> = {
  warning: <AlertTriangle size={20} />,
  success: <CheckCircle size={20} />,
  info: <Info size={20} />,
  error: <XCircle size={20} />,
}

export function AlertBanner({ variant, children }: AlertBannerProps) {
  return (
    <div className={`alert-banner alert-banner--${variant}`} role="alert">
      <span className="alert-banner__icon">{icons[variant]}</span>
      <span className="alert-banner__text">{children}</span>
    </div>
  )
}
