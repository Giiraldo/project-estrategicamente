import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Sparkles } from './Icons'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow eyebrow--light">
            <Sparkles />
            Marketing digital con intención
          </p>

          <h1>
            Estrategia que <em>convierte</em> ideas en crecimiento.
          </h1>

          <p className="hero__lead">
            Exploramos el ecosistema digital para que tu marca tome decisiones
            con criterio: contenido, datos y una ejecución que no se pierde en
            el ruido.
          </p>

          <div className="hero__actions">
            <Link to="/#insights" className="button button--lime">
              Explorar insights
              <ArrowRight />
            </Link>
            <Link to="/about" className="button button--ghost">
              Sobre el proyecto
              <ArrowUpRight />
            </Link>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>6</strong>
              <span>temas para explorar</span>
            </div>
            <div className="hero__stat">
              <strong>En vivo</strong>
              <span>contenido actualizado</span>
            </div>
            <div className="hero__stat">
              <strong>Tuyos</strong>
              <span>insights guardados</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__orbit hero__orbit--one" />
          <div className="hero__orbit hero__orbit--two" />
          <div className="hero__monogram">E</div>

          <div className="strategy-card strategy-card--seo">
            <span className="strategy-card__label">SEO</span>
            <div className="strategy-card__bars">
              <span style={{ width: '82%' }} />
              <span style={{ width: '58%' }} />
              <span style={{ width: '70%' }} />
            </div>
          </div>

          <div className="strategy-card strategy-card--content">
            <span className="strategy-card__label">Contenido</span>
            <div className="strategy-card__lines">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="strategy-card strategy-card--data">
            <span className="strategy-card__label">Datos</span>
            <svg viewBox="0 0 120 56" fill="none" className="strategy-card__chart">
              <path
                d="M4 46 24 34 44 38 64 20 84 27 104 8 116 12"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="64" cy="20" r="3" fill="currentColor" />
              <circle cx="104" cy="8" r="3" fill="currentColor" />
            </svg>
          </div>

          <div className="strategy-card strategy-card--conversion">
            <span className="strategy-card__label">Conversión</span>
            <span className="strategy-card__arrow">↗</span>
          </div>

          <div className="hero__badge">
            <Sparkles />
            Insights en vivo
          </div>
        </div>
      </div>
    </section>
  )
}
