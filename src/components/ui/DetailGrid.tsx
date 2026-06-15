import type { ReactNode } from 'react'
import './DetailGrid.css'

interface DetailItemProps {
  label: string
  value: ReactNode
  highlight?: boolean
  warning?: boolean
}

export function DetailItem({ label, value, highlight, warning }: DetailItemProps) {
  return (
    <div className="detail-item">
      <span className="detail-item__label">{label}</span>
      <span className={`detail-item__value ${highlight ? 'detail-item__value--highlight' : ''} ${warning ? 'detail-item__value--warning' : ''}`}>
        {value}
      </span>
    </div>
  )
}

interface DetailGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
}

export function DetailGrid({ children, columns = 4 }: DetailGridProps) {
  return <div className={`detail-grid detail-grid--${columns}`}>{children}</div>
}
