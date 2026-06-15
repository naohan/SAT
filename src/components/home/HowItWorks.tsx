import { howItWorks } from '../../data/services'
import './HowItWorks.css'

export function HowItWorks() {
  return (
    <section className="section how-it-works">
      <div className="container">
        <h2 className="section-title">¿Cómo funciona la experiencia?</h2>
        <p className="section-subtitle">Un recorrido simple para resolver tu trámite</p>
        <div className="steps-grid">
          {howItWorks.map((step) => (
            <div key={step.step} className="step-card">
              <div className="step-number">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
