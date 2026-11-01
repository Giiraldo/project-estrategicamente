import { Router } from 'express'
import mongoose from 'mongoose'
import { requireAuth } from '../middleware/auth'
import { SavedArticle } from '../models/SavedArticle'
import { HttpError } from '../utils/httpError'
import { toPublicSavedArticle } from '../utils/serializers'
import {
  readHttpUrl,
  readString,
  readTags,
} from '../utils/validation'

const router = Router()

router.use(requireAuth)

router.get('/', async (req, res) => {
  const articles = await SavedArticle.find({ owner: req.userId })
    .select('-owner -__v')
    .sort({ createdAt: -1 })
    .lean()

  res.json({ articles })
})

router.post('/', async (req, res) => {
  const body = req.body as Record<string, unknown>
  const articleId = Number(body.articleId)

  if (!Number.isInteger(articleId) || articleId <= 0) {
    throw new HttpError(400, 'El identificador del artículo no es válido.')
  }

  const title = readString(body.title, 'título')
  const url = readHttpUrl(body.url)
  const description =
    typeof body.description === 'string'
      ? body.description.trim().slice(0, 1000)
      : ''
  const author = readString(body.author, 'autor')
  const tags = readTags(body.tags)
  const coverImage =
    typeof body.coverImage === 'string' && body.coverImage.trim()
      ? readHttpUrl(body.coverImage)
      : null

  const existingArticle = await SavedArticle.findOne({
    owner: req.userId,
    articleId,
  })

  if (existingArticle) {
    throw new HttpError(
      409,
      'Este artículo ya está guardado en tu biblioteca.',
    )
  }

  try {
    const article = await SavedArticle.create({
      articleId,
      title,
      url,
      coverImage,
      description,
      author,
      tags,
      owner: req.userId,
    })

    res.status(201).json({ article: toPublicSavedArticle(article) })
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      (error as { code?: number }).code === 11000
    ) {
      throw new HttpError(
        409,
        'Este artículo ya está guardado en tu biblioteca.',
      )
    }

    throw error
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    throw new HttpError(400, 'El identificador del artículo no es válido.')
  }

  const deletedArticle = await SavedArticle.findOneAndDelete({
    _id: id,
    owner: req.userId,
  })

  if (!deletedArticle) {
    throw new HttpError(404, 'El artículo guardado no existe.')
  }

  res.json({ message: 'Artículo eliminado de tu biblioteca.' })
})

export default router
