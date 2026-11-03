import { useState } from 'react'
import type { DevToArticle } from '../types'
import { getTagLabel } from '../utils/devtoApi'
import { formatDate } from '../utils/format'
import './ArticleCard.css'
import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  Clock,
  Sparkles,
} from './Icons'

interface ArticleCardProps {
  article: DevToArticle
  isSaved: boolean
  onSave: (article: DevToArticle) => Promise<void>
}

export function ArticleCard({ article, isSaved, onSave }: ArticleCardProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const cover = article.cover_image || article.social_image
  const primaryTag = article.tag_list[0] ?? 'marketing'

  async function handleSave() {
    if (isSaved || isSaving) {
      return
    }

    setSaveError('')
    setIsSaving(true)

    try {
      await onSave(article)
    } catch {
      setSaveError('No se pudo guardar. Inténtalo de nuevo.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <article className="insight-card">
      <a
        className="insight-card__cover-link"
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Leer "${article.title}" en Dev.to (se abre en una pestaña nueva)`}
      >
        {cover ? (
          <img
            className="insight-card__cover"
            src={cover}
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
            {formatDate(article.published_at)}
          </span>
          <span>
            <Clock />
            {article.reading_time_minutes} min
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
            <img
              src={article.user.profile_image}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <span>{article.user.name}</span>
          </span>

          <button
            type="button"
            className={`save-button${isSaved ? ' is-saved' : ''}`}
            onClick={handleSave}
            disabled={isSaved || isSaving}
            aria-label={
              isSaved ? 'Artículo guardado' : 'Guardar artículo en mi biblioteca'
            }
          >
            {isSaved ? <BookmarkCheck /> : <Bookmark />}
            <span>
              {isSaved ? 'Guardado' : isSaving ? 'Guardando...' : 'Guardar'}
            </span>
          </button>
        </div>

        {saveError ? (
          <p className="card-error" role="alert">
            {saveError}
          </p>
        ) : null}
      </div>
    </article>
  )
}
