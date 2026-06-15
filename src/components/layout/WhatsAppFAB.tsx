import { MessageCircle } from 'lucide-react'
import { externalLinks } from '../../data/externalLinks'
import './WhatsAppFAB.css'

export function WhatsAppFAB() {
  return (
    <a
      href={externalLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  )
}
