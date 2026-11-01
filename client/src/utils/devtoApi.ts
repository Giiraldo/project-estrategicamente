import type { DevToArticle } from '../types'

const DEVTO_API_URL = 'https://dev.to/api'
export const INSIGHTS_PER_PAGE = 9

export const MARKETING_TAGS = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'seo', label: 'SEO' },
  { value: 'socialmedia', label: 'Social media' },
  { value: 'content', label: 'Contenido' },
  { value: 'branding', label: 'Branding' },
  { value: 'analytics', label: 'Analytics' },
] as const

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
    throw new Error('No se pudieron obtener los artículos.')
  }

  return (await response.json()) as DevToArticle[]
}

export function getTagLabel(tag: string): string {
  return MARKETING_TAGS.find((item) => item.value === tag)?.label ?? tag
}
