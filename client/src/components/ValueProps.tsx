import { Chart, Layers, Target } from './Icons'

const values = [
  {
    number: '01',
    icon: Target,
    title: 'Estrategia antes que táctica',
    description:
      'Partimos de objetivos claros para que cada acción tenga una razón y no sea solo una respuesta al ruido.',
  },
  {
    number: '02',
    icon: Layers,
    title: 'Contenido con criterio',
    description:
      'Curamos ideas y tendencias del ecosistema digital para convertir información en decisiones aplicables.',
  },
  {
    number: '03',
    icon: Chart,
    title: 'Datos para mejorar',
    description:
      'Leemos señales, comparamos perspectivas y ajustamos el rumbo con una mirada que prioriza el aprendizaje.',
  },
]

export function ValueProps() {
  return (
    <section className="section approach" id="enfoque">
      <div className="container approach__grid">
        <div className="approach__intro">
          <p className="eyebrow">Nuestro enfoque</p>
          <h2>
            Menos ruido. Más <em>dirección</em>.
          </h2>
          <p>
            El marketing digital cambia rápido. Por eso separamos las
            tendencias útiles del ruido y las convertimos en criterios para
            decidir mejor.
          </p>
        </div>

        <div className="approach__cards">
          {values.map((value) => {
            const Icon = value.icon

            return (
              <article className="approach-card" key={value.number}>
                <span className="approach-card__number">{value.number}</span>
                <span className="approach-card__icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
