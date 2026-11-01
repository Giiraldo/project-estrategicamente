import type {
  SavedArticle,
  SavedArticleInput,
  User,
} from '../types'
import { request } from './http'

export async function getCurrentUser(): Promise<User> {
  const data = await request<{ user: User }>('/users/me')
  return data.user
}

export async function getSavedArticles(): Promise<SavedArticle[]> {
  const data = await request<{ articles: SavedArticle[] }>('/articles')
  return data.articles
}

export async function saveArticle(
  article: SavedArticleInput,
): Promise<SavedArticle> {
  const data = await request<{ article: SavedArticle }>('/articles', {
    method: 'POST',
    body: JSON.stringify(article),
  })

  return data.article
}

export async function deleteSavedArticle(id: string): Promise<void> {
  await request<{ message: string }>(`/articles/${id}`, {
    method: 'DELETE',
  })
}
