import type { DevToArticle } from '../types'
import { getTagLabel } from '../utils/devtoApi'
import { ArticleCard } from './ArticleCard'
import { EmptyState } from './EmptyState'
import { ErrorMessage } from './ErrorMessage'
import { ArrowRight } from './Icons'
import { SearchForm } from './SearchForm'
import { TagFilter } from './TagFilter'

interface InsightsSectionProps {
  tag: string
  articles: DevToArticle[]
  isLoading: boolean
  isLoadingMore: boolean
  error: string
  hasMore: boolean
  savedIds: Set<number>
  onChangeTag: (tag: string) => void
  onLoadMore: () => void
  onRetry: () => void
  onSave: (article: DevToArticle) => Promise<void>
}

function SkeletonGrid() {
  return (
    <div className="insights__grid" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton skeleton-card__cover" />
          <div className="skeleton-card__body">
            <div className="skeleton skeleton-card__meta" />
            <div className="skeleton skeleton-card__title" />
            <div className="skeleton skeleton-card__title skeleton-card__title--short" />
            <div className="skeleton skeleton-card__text" />
            <div className="skeleton skeleton-card__text skeleton-card__text--short" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function InsightsSection({
  tag,
  articles,
  isLoading,
  isLoadingMore,
  error,
  hasMore,
  savedIds,
  onChangeTag,
  onLoadMore,
  onRetry,
  onSave,
}: InsightsSectionProps) {
  const showSkeletons = isLoading && articles.length === 0

  return (
    <section className="section insights" id="insights">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Insights</p>
            <h2>Ideas para pensar tu próxima jugada.</h2>
          </div>
          <p className="section-heading__text">
            Explora artículos de marketing digital, SEO, contenido y
            crecimiento. Guarda los que quieras volver a leer.
          </p>
        </div>

        <div className="insights__toolbar">
          <SearchForm key={tag} activeTag={tag} onSearch={onChangeTag} />
          <TagFilter activeTag={tag} onChange={onChangeTag} />
        </div>

        <div className="insights__meta">
          <span>
            {isLoading
              ? 'Cargando insights...'
              : `${articles.length} ${articles.length === 1 ? 'insight' : 'insights'} en ${getTagLabel(tag)}`}
          </span>
          <span>
            Contenido de{' '}
            <a
              href="https://dev.to"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dev.to
            </a>
          </span>
        </div>

        {error ? <ErrorMessage message={error} onRetry={onRetry} /> : null}

        {showSkeletons ? <SkeletonGrid /> : null}

        {!showSkeletons && !error && articles.length === 0 ? (
          <EmptyState
            title="No se encontró nada"
            description="Prueba con otro tema o vuelve a intentarlo con una de las categorías sugeridas."
            action={
              tag !== 'marketing' ? (
                <button
                  type="button"
                  className="button button--dark"
                  onClick={() => onChangeTag('marketing')}
                >
                  Ver marketing
                  <ArrowRight />
                </button>
              ) : (
                <button
                  type="button"
                  className="button button--dark"
                  onClick={onRetry}
                >
                  Reintentar
                  <ArrowRight />
                </button>
              )
            }
          />
        ) : null}

        {articles.length > 0 ? (
          <>
            <div className="insights__grid">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  isSaved={savedIds.has(article.id)}
                  onSave={onSave}
                />
              ))}
            </div>

            <div className="insights__actions">
              {hasMore ? (
                <button
                  type="button"
                  className="button button--dark"
                  onClick={onLoadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? 'Cargando...' : 'Mostrar más'}
                </button>
              ) : (
                <p className="insights__end">
                  Has llegado al final de esta selección.
                </p>
              )}
            </div>
          </>
        ) : null}

        <p className="insights__attribution">
          Contenido obtenido de la API pública de{' '}
          <a
            href="https://dev.to/t/marketing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dev.to
          </a>
          . Los artículos pertenecen a sus autores.
        </p>
      </div>
    </section>
  )
}
