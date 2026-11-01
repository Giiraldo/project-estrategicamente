import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/User'
import { HttpError } from '../utils/httpError'
import { toPublicUser } from '../utils/serializers'
import { signToken } from '../utils/token'
import {
  readEmail,
  readName,
  readPassword,
  readString,
} from '../utils/validation'

const router = Router()

router.post('/signup', async (req, res) => {
  const body = req.body as Record<string, unknown>
  const name = readName(body.name)
  const email = readEmail(body.email)
  const password = readPassword(body.password)

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new HttpError(409, 'Ya existe una cuenta con este correo electrónico.')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  try {
    const user = await User.create({ name, email, password: passwordHash })

    res.status(201).json({
      token: signToken(user._id.toString()),
      user: toPublicUser(user),
    })
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      (error as { code?: number }).code === 11000
    ) {
      throw new HttpError(
        409,
        'Ya existe una cuenta con este correo electrónico.',
      )
    }

    throw error
  }
})

router.post('/signin', async (req, res) => {
  const body = req.body as Record<string, unknown>
  const email = readEmail(body.email)
  const password = readString(body.password, 'contraseña')

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    throw new HttpError(401, 'Correo o contraseña incorrectos.')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new HttpError(401, 'Correo o contraseña incorrectos.')
  }

  res.json({
    token: signToken(user._id.toString()),
    user: toPublicUser(user),
  })
})

export default router
