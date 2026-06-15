import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './Button.css'

type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text' | 'elevated'
type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'error'

interface BaseProps {
  variant?: ButtonVariant
  color?: ButtonColor
  block?: boolean
  children: ReactNode
  className?: string
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: never; href?: never }

type LinkButtonProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string; href?: never }

type AnchorButtonProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: never }

export function Button({
  variant = 'filled',
  color = 'secondary',
  block = false,
  children,
  className = '',
  ...props
}: ButtonProps | LinkButtonProps | AnchorButtonProps) {
  const cls = ['md-btn', `md-btn--${variant}`, `md-btn--${color}`, block && 'md-btn--block', className]
    .filter(Boolean)
    .join(' ')

  if ('to' in props && props.to) {
    const { to, ...rest } = props as LinkButtonProps
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    const { href, target, rel, ...rest } = props as AnchorButtonProps
    return (
      <a href={href} target={target} rel={rel} className={cls} {...rest}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...buttonProps } = props as ButtonProps
  return (
    <button type={type} className={cls} {...buttonProps}>
      {children}
    </button>
  )
}
