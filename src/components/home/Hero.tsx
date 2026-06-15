import { useState } from 'react'
import { ChevronDown, Info } from 'lucide-react'
import fondoSat from '../../assets/SAT_FONDO.jpg'
import './Hero.css'

export function Hero() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <section className="hero">
      <div className="hero-text">
        <div className="hero-text__inner">
          <h1>Trabajamos por una Lima ordenada y moderna</h1>
          <p>
            El SAT te acompaña para que conozcas, comprendas y resuelvas a tiempo tus
            obligaciones tributarias y de tránsito, evitando recargos y sanciones.
          </p>

          <button
            type="button"
            className="hero-info-toggle"
            aria-expanded={showInfo}
            onClick={() => setShowInfo((v) => !v)}
          >
            <Info size={18} />
            ¿Qué hace el SAT?
            <ChevronDown size={18} className={`hero-info-chevron ${showInfo ? 'is-open' : ''}`} />
          </button>

          {showInfo && (
            <p className="hero-info-text">
              El SAT administra y recauda los tributos municipales y gestiona las multas de
              tránsito de Lima: papeletas, impuestos, arbitrios, fraccionamientos y trámites
              relacionados.
            </p>
          )}
        </div>
      </div>

      <div className="hero-image">
        <img src={fondoSat} alt="Sede del SAT de Lima" />
      </div>
    </section>
  )
}
