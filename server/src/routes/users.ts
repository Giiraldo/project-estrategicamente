import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { User } from '../models/User'
import { HttpError } from '../utils/httpError'
import { toPublicUser } from '../utils/serializers'

const router = Router()

router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.userId)

  if (!user) {
    throw new HttpError(401, 'La cuenta no existe o ya no está disponible.')
  }

  res.json({ user: toPublicUser(user) })
})

export default router
