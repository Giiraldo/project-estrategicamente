import { Link } from 'react-router-dom'
import { ArrowLeft } from '../components/Icons'
import { usePageTitle } from '../hooks/usePageTitle'

export function NotFound() {
  usePageTitle('Página no encontrada')

  return (
    <section className="not-found">
      <div className="container">
        <p className="eyebrow">Error 404</p>
        <h1>Esta página no existe.</h1>
        <p>
          Puede que el enlace haya cambiado o que la página ya no esté
          disponible. Vuelve al inicio y sigue explorando.
        </p>
        <Link to="/" className="button button--dark">
          <ArrowLeft />
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
