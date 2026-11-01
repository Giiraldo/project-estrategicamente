import type { SavedArticleDocument } from '../models/SavedArticle'
import type { UserDocument } from '../models/User'

export function toPublicUser(user: UserDocument) {
  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
  }
}

export function toPublicSavedArticle(article: SavedArticleDocument) {
  const articleObject = article.toObject()

  delete (articleObject as { owner?: unknown }).owner
  delete (articleObject as { __v?: unknown }).__v

  return articleObject
}
