import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { ErrorMessage } from '../components/ErrorMessage'
import { ArrowRight } from '../components/Icons'
import { Preloader } from '../components/Preloader'
import { SavedArticleCard } from '../components/SavedArticleCard'
import { useCurrentUser } from '../contexts/CurrentUserContext'
import { usePageTitle } from '../hooks/usePageTitle'
import type { SavedArticle } from '../types'
import { deleteSavedArticle, getSavedArticles } from '../utils/api'
import { ApiError } from '../utils/http'

export function Saved() {
  usePageTitle('Mi biblioteca')
  const { currentUser, signOut } = useCurrentUser()
  const [articles, setArticles] = useState<SavedArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let isActive = true

    if (!currentUser) {
      return
    }

    getSavedArticles()
      .then((saved) => {
        if (isActive) {
          setArticles(saved)
        }
      })
      .catch((requestError: unknown) => {
        if (!isActive) {
          return
        }

        if (requestError instanceof ApiError && requestError.status === 401) {
          signOut()
          return
        }

        setError(
          'No se pudieron cargar tus insights guardados. Inténtalo de nuevo.',
        )
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [currentUser, reloadKey, signOut])

  async function handleDelete(id: string) {
    try {
      await deleteSavedArticle(id)
      setArticles((current) => current.filter((article) => article._id !== id))
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        signOut()
      }

      throw requestError
    }
  }

  return (
    <section className="saved-page">
      <div className="container">
        <div className="saved-page__header">
          <div>
            <p className="eyebrow">Mi biblioteca</p>
            <h1>Tus ideas, en un solo lugar.</h1>
            <p>
              {articles.length > 0
                ? `${articles.length} ${articles.length === 1 ? 'insight guardado' : 'insights guardados'} para volver cuando los necesites.`
                : 'Guarda los insights que quieras releer y construye tu propia biblioteca de estrategia digital.'}
            </p>
          </div>
          <Link to="/#insights" className="button button--dark">
            Explorar más
            <ArrowRight />
          </Link>
        </div>

        {isLoading ? (
          <div className="page-loader">
            <Preloader label="Cargando tu biblioteca..." />
          </div>
        ) : null}

        {!isLoading && error ? (
          <ErrorMessage
            message={error}
            onRetry={() => {
              setError('')
              setIsLoading(true)
              setReloadKey((current) => current + 1)
            }}
          />
        ) : null}

        {!isLoading && !error && articles.length === 0 ? (
          <EmptyState
            title="Tu biblioteca está vacía"
            description="Explora los insights y guarda los artículos que quieras volver a leer."
            action={
              <Link to="/#insights" className="button button--dark">
                Descubrir insights
                <ArrowRight />
              </Link>
            }
          />
        ) : null}

        {!isLoading && !error && articles.length > 0 ? (
          <div className="saved-grid">
            {articles.map((article) => (
              <SavedArticleCard
                key={article._id}
                article={article}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
