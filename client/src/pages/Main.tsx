import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CtaBand } from '../components/CtaBand'
import { Hero } from '../components/Hero'
import { InsightsSection } from '../components/InsightsSection'
import { ValueProps } from '../components/ValueProps'
import { useCurrentUser } from '../contexts/CurrentUserContext'
import { useInsights } from '../hooks/useInsights'
import { usePageTitle } from '../hooks/usePageTitle'
import type { DevToArticle, SavedArticleInput } from '../types'
import { getSavedArticles, saveArticle } from '../utils/api'
import { ApiError } from '../utils/http'

const EMPTY_SAVED_IDS: Set<number> = new Set()

function toSavedArticleInput(article: DevToArticle): SavedArticleInput {
  return {
    articleId: article.id,
    title: article.title,
    url: article.url,
    coverImage: article.cover_image || article.social_image || null,
    description: article.description,
    author: article.user.name,
    tags: article.tag_list,
  }
}

export function Main() {
  usePageTitle('Marketing digital con estrategia')
  const { currentUser, signOut } = useCurrentUser()
  const navigate = useNavigate()
  const {
    tag,
    articles,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    changeTag,
    loadMore,
    retry,
  } = useInsights()
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set())

  useEffect(() => {
    let isActive = true

    if (!currentUser) {
      return
    }

    getSavedArticles()
      .then((saved) => {
        if (isActive) {
          setSavedIds(new Set(saved.map((article) => article.articleId)))
        }
      })
      .catch((requestError: unknown) => {
        if (!isActive) {
          return
        }

        if (requestError instanceof ApiError && requestError.status === 401) {
          signOut()
        }

        setSavedIds(new Set())
      })

    return () => {
      isActive = false
    }
  }, [currentUser, signOut])

  async function handleSave(article: DevToArticle) {
    if (!currentUser) {
      navigate('/signin', {
        state: {
          from: '/',
          message: 'Inicia sesión para guardar este insight en tu biblioteca.',
        },
      })
      return
    }

    try {
      await saveArticle(toSavedArticleInput(article))
      setSavedIds((current) => new Set(current).add(article.id))
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        signOut()
        navigate('/signin', {
          state: {
            message: 'Tu sesión expiró. Inicia sesión de nuevo.',
          },
        })
      }

      throw requestError
    }
  }

  return (
    <>
      <Hero />
      <ValueProps />
      <InsightsSection
        tag={tag}
        articles={articles}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        error={error}
        hasMore={hasMore}
        savedIds={currentUser ? savedIds : EMPTY_SAVED_IDS}
        onChangeTag={changeTag}
        onLoadMore={loadMore}
        onRetry={retry}
        onSave={handleSave}
      />
      <CtaBand />
    </>
  )
}
