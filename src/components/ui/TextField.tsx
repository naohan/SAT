import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import './TextField.css'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
}

export function TextField({ label, hint, id, className = '', ...props }: TextFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s/g, '-')
  return (
    <div className={`md-field ${className}`}>
      <label htmlFor={fieldId} className="md-field__label">{label}</label>
      <input id={fieldId} className="md-field__input" {...props} />
      {hint && <span className="md-field__hint">{hint}</span>}
    </div>
  )
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  children: React.ReactNode
}

export function SelectField({ label, id, children, className = '', ...props }: SelectFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s/g, '-')
  return (
    <div className={`md-field ${className}`}>
      <label htmlFor={fieldId} className="md-field__label">{label}</label>
      <select id={fieldId} className="md-field__input" {...props}>{children}</select>
    </div>
  )
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

export function TextAreaField({ label, id, className = '', ...props }: TextAreaFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s/g, '-')
  return (
    <div className={`md-field ${className}`}>
      <label htmlFor={fieldId} className="md-field__label">{label}</label>
      <textarea id={fieldId} className="md-field__input md-field__textarea" {...props} />
    </div>
  )
}
