import { Link } from 'react-router-dom'
import { useCurrentUser } from '../contexts/CurrentUserContext'
import { ArrowRight } from './Icons'
import './CtaBand.css'

export function CtaBand() {
  const { currentUser } = useCurrentUser()

  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <p className="eyebrow eyebrow--dark">Tu próxima jugada</p>
          <h2>Convierte ideas en estrategia.</h2>
          <p>
            Crea tu cuenta para guardar insights y construir tu propia
            biblioteca de marketing digital.
          </p>
        </div>

        <div className="cta-band__actions">
          {currentUser ? (
            <Link to="/saved" className="button button--dark">
              Ir a mi biblioteca
              <ArrowRight />
            </Link>
          ) : (
            <>
              <Link to="/signup" className="button button--dark">
                Crear cuenta
                <ArrowRight />
              </Link>
              <Link to="/signin" className="button button--ghost-dark">
                Iniciar sesión
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
