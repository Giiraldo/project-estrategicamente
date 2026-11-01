export interface DevToUser {
  name: string
  username: string
  profile_image: string
}

export interface DevToArticle {
  id: number
  title: string
  description: string
  cover_image: string | null
  social_image: string
  published_at: string
  reading_time_minutes: number
  tag_list: string[]
  url: string
  user: DevToUser
  positive_reactions_count: number
  comments_count: number
}

export interface User {
  _id: string
  email: string
  name: string
}

export interface SavedArticle {
  _id: string
  articleId: number
  title: string
  url: string
  coverImage: string | null
  description: string
  author: string
  tags: string[]
  createdAt: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface SignUpData {
  name: string
  email: string
  password: string
}

export interface SignInData {
  email: string
  password: string
}

export interface SavedArticleInput {
  articleId: number
  title: string
  url: string
  coverImage: string | null
  description: string
  author: string
  tags: string[]
}

export interface CachedInsights {
  tag: string
  articles: DevToArticle[]
  page: number
  hasMore: boolean
}
