import type { DevToArticle } from '../types'
import { DEVTO_API_URL, DEVTO_ERROR_MESSAGE, INSIGHTS_PER_PAGE, MARKETING_TAGS } from '../config/constants'

interface FetchArticlesParams {
  tag: string
  page?: number
  perPage?: number
  signal?: AbortSignal
}

export async function getArticles({
  tag,
  page = 1,
  perPage = INSIGHTS_PER_PAGE,
  signal,
}: FetchArticlesParams): Promise<DevToArticle[]> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  })

  if (tag) {
    params.set('tag', tag)
  }

  const response = await fetch(`${DEVTO_API_URL}/articles?${params.toString()}`, {
    signal,
  })

  if (!response.ok) {
    throw new Error(DEVTO_ERROR_MESSAGE)
  }

  return (await response.json()) as DevToArticle[]
}

export function getTagLabel(tag: string): string {
  return MARKETING_TAGS.find((item) => item.value === tag)?.label ?? tag
}
