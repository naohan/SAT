import { Check } from 'lucide-react'
import './Stepper.css'

interface StepperProps {
  steps: string[]
  current: number
}

export function Stepper({ steps, current }: StepperProps) {
  return (
    <ol className="stepper" aria-label="Progreso">
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'pending'
        return (
          <li key={label} className={`stepper__item stepper__item--${state}`}>
            <span className="stepper__marker">
              {state === 'done' ? <Check size={16} /> : i + 1}
            </span>
            <span className="stepper__label">{label}</span>
            {i < steps.length - 1 && <span className="stepper__line" aria-hidden="true" />}
          </li>
        )
      })}
    </ol>
  )
}
