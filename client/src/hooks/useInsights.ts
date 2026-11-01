import { useCallback, useEffect, useRef, useState } from 'react'
import type { DevToArticle } from '../types'
import {
  getArticles,
  INSIGHTS_PER_PAGE,
} from '../utils/devtoApi'
import { readCachedInsights, writeCachedInsights } from '../utils/storage'

export const INSIGHTS_ERROR_MESSAGE =
  'Algo salió mal con la solicitud. Puede ser un problema de conexión o del servidor. Inténtalo de nuevo más tarde.'

function mergeArticles(
  current: DevToArticle[],
  incoming: DevToArticle[],
): DevToArticle[] {
  const seen = new Set(current.map((article) => article.id))
  return [...current, ...incoming.filter((article) => !seen.has(article.id))]
}

export function useInsights() {
  const [cached] = useState(readCachedInsights)
  const [tag, setTag] = useState(cached?.tag ?? 'marketing')
  const [articles, setArticles] = useState<DevToArticle[]>(
    cached?.articles ?? [],
  )
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(cached?.hasMore ?? true)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const requestId = useRef(0)

  useEffect(() => {
    const controller = new AbortController()
    const currentRequest = requestId.current + 1
    requestId.current = currentRequest
    const isFirstPage = page === 1

    getArticles({ tag, page, signal: controller.signal })
      .then((data) => {
        if (currentRequest !== requestId.current) {
          return
        }

        setArticles((current) =>
          isFirstPage ? data : mergeArticles(current, data),
        )
        setHasMore(data.length === INSIGHTS_PER_PAGE)
      })
      .catch((requestError: unknown) => {
        if (
          requestError instanceof DOMException &&
          requestError.name === 'AbortError'
        ) {
          return
        }

        if (currentRequest !== requestId.current) {
          return
        }

        setError(INSIGHTS_ERROR_MESSAGE)
      })
      .finally(() => {
        if (currentRequest !== requestId.current) {
          return
        }

        setIsLoading(false)
        setIsLoadingMore(false)
      })

    return () => {
      controller.abort()
    }
  }, [tag, page, reloadKey])

  useEffect(() => {
    if (isLoading || error) {
      return
    }

    writeCachedInsights({ tag, articles, page: 1, hasMore })
  }, [articles, tag, hasMore, isLoading, error])

  const changeTag = useCallback(
    (nextTag: string) => {
      if (nextTag === tag) {
        return
      }

      setTag(nextTag)
      setPage(1)
      setArticles([])
      setHasMore(true)
      setError('')
      setIsLoading(true)
    },
    [tag],
  )

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true)
      setPage((current) => current + 1)
    }
  }, [hasMore, isLoadingMore])

  const retry = useCallback(() => {
    setError('')
    setIsLoading(true)
    setReloadKey((current) => current + 1)
  }, [])

  return {
    tag,
    articles,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    changeTag,
    loadMore,
    retry,
  }
}
