import { Link } from 'react-router-dom'
import { ArrowUpRight, Github } from './Icons'
import { Logo } from './Logo'
import './Footer.css'

const REPOSITORY_URL = 'https://github.com/Giiraldo/project-estrategicamente'
const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Logo />
            <p>
              Marketing digital con estrategia, contenido y datos. Un espacio
              para pensar la próxima jugada antes de ejecutarla.
            </p>
          </div>

          <div>
            <h3>Navegación</h3>
            <div className="site-footer__links">
              <Link to="/">Inicio</Link>
              <Link to="/#insights">Insights</Link>
              <Link to="/about">Sobre el proyecto</Link>
            </div>
          </div>

          <div>
            <h3>Proyecto</h3>
            <div className="site-footer__links">
              <Link to="/saved">Mi biblioteca</Link>
              <Link to="/signup">Crear cuenta</Link>
              <a href={REPOSITORY_URL} target="_blank" rel="noopener noreferrer">
                <Github />
                Repositorio
              </a>
              <a
                href="https://dev.to"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowUpRight />
                Contenido en Dev.to
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {YEAR} ESTRATEGICAMENTE. Todos los derechos reservados.</p>
          <p>React · Express · MongoDB · Dev.to API</p>
        </div>
      </div>
    </footer>
  )
}
