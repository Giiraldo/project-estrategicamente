import { useState } from 'react'
import type { SavedArticle } from '../types'
import { getTagLabel } from '../utils/devtoApi'
import { formatDate } from '../utils/format'
import { Calendar, Sparkles, Trash } from './Icons'

interface SavedArticleCardProps {
  article: SavedArticle
  onDelete: (id: string) => Promise<void>
}

export function SavedArticleCard({
  article,
  onDelete,
}: SavedArticleCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const primaryTag = article.tags[0] ?? 'marketing'

  async function handleDelete() {
    if (isDeleting) {
      return
    }

    setDeleteError('')
    setIsDeleting(true)

    try {
      await onDelete(article._id)
    } catch {
      setDeleteError('No se pudo eliminar. Inténtalo de nuevo.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <article className="insight-card saved-card">
      <a
        className="insight-card__cover-link"
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Leer "${article.title}" en Dev.to (se abre en una pestaña nueva)`}
      >
        {article.coverImage ? (
          <img
            className="insight-card__cover"
            src={article.coverImage}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="insight-card__cover-fallback" aria-hidden="true">
            <Sparkles />
          </span>
        )}
        <span className="insight-card__tag">{getTagLabel(primaryTag)}</span>
      </a>

      <div className="insight-card__body">
        <div className="insight-card__meta">
          <span>
            <Calendar />
            Guardado el {formatDate(article.createdAt)}
          </span>
        </div>

        <h3>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {article.title}
          </a>
        </h3>

        {article.description ? <p>{article.description}</p> : null}

        <div className="insight-card__footer">
          <span className="author">
            <span>{article.author}</span>
          </span>

          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label={`Eliminar "${article.title}" de mi biblioteca`}
          >
            <Trash />
            <span>{isDeleting ? 'Eliminando...' : 'Eliminar'}</span>
          </button>
        </div>

        {deleteError ? (
          <p className="card-error" role="alert">
            {deleteError}
          </p>
        ) : null}
      </div>
    </article>
  )
}
