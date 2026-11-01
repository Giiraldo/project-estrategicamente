import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Github } from '../components/Icons'
import { usePageTitle } from '../hooks/usePageTitle'

const REPOSITORY_URL = 'https://github.com/Giiraldo/project-estrategicamente'

const stack = [
  'React',
  'TypeScript',
  'Vite',
  'React Router',
  'Node.js',
  'Express',
  'MongoDB',
  'JWT',
  'Dev.to API',
]

export function About() {
  usePageTitle('Sobre el proyecto')

  return (
    <>
      <section className="about-hero">
        <div className="container">
          <p className="eyebrow">Sobre el proyecto</p>
          <h1>
            Estrategia antes de la <em>ejecución</em>.
          </h1>
          <p>
            ESTRATEGICAMENTE es un espacio digital para explorar ideas de
            marketing, guardar las que te sirvan y volver a ellas cuando
            necesites tomar una decisión.
          </p>
        </div>
      </section>

      <section className="section about-content">
        <div className="container about-grid">
          <article className="about-card">
            <h2>Qué puedes hacer aquí</h2>
            <ul className="about-list">
              <li>
                <span>01</span>
                Explorar insights de marketing digital, SEO, contenido,
                branding y analítica.
              </li>
              <li>
                <span>02</span>
                Guardar artículos en tu biblioteca personal para leerlos
                después.
              </li>
              <li>
                <span>03</span>
                Volver a tus ideas guardadas desde cualquier dispositivo con tu
                cuenta.
              </li>
            </ul>
            <Link to="/#insights" className="button button--dark">
              Explorar insights
              <ArrowRight />
            </Link>
          </article>

          <article className="about-card about-card--dark">
            <h2>El proyecto</h2>
            <p>
              Una aplicación full stack construida para conectar una interfaz
              clara con datos reales. El frontend consume la API pública de
              Dev.to y el backend gestiona cuentas y favoritos.
            </p>
            <div className="stack-list">
              {stack.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </article>
        </div>

        <div className="container">
          <article className="about-card about-author">
            <div className="about-author__avatar" aria-hidden="true">
              JF
            </div>
            <div>
              <p className="eyebrow">Autor</p>
              <h2>Jerson Foronda</h2>
              <p>
                Desarrollador Full Stack. Este proyecto forma parte de mi
                proceso de formación y de la construcción de un portafolio
                enfocado en productos digitales útiles.
              </p>
              <a
                href={REPOSITORY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                <Github />
                Ver repositorio
                <ArrowUpRight />
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
