import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from './Icons'
import { Logo } from './Logo'
import './AuthLayout.css'

interface AuthLayoutProps {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
}

export function AuthLayout({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <section className="auth-page">
      <aside className="auth-page__panel">
        <div className="auth-page__panel-top">
          <Link to="/" className="auth-page__back">
            <ArrowLeft />
            Volver al inicio
          </Link>
          <Logo />
        </div>

        <div className="auth-page__statement">
          <p>
            Marketing digital con <em>estrategia</em>, contenido y datos.
          </p>
          <span>ESTRATEGICAMENTE</span>
        </div>

        <div className="auth-page__decor" aria-hidden="true" />
      </aside>

      <div className="auth-page__form-side">
        <div className="auth-card">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
          <div className="auth-card__footer">{footer}</div>
        </div>
      </div>
    </section>
  )
}
