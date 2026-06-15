import type { HTMLAttributes, ReactNode } from 'react'
import './Card.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  elevated?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export function Card({ children, elevated = true, padding = 'md', className = '', ...props }: CardProps) {
  return (
    <div
      className={['md-card', elevated && 'md-card--elevated', `md-card--${padding}`, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
