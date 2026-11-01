import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getJwtSecret } from '../config'
import { HttpError } from '../utils/httpError'

export function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const authorization = req.headers.authorization

  if (!authorization?.startsWith('Bearer ')) {
    next(new HttpError(401, 'No autorizado. Inicia sesión para continuar.'))
    return
  }

  const token = authorization.slice('Bearer '.length).trim()

  try {
    const payload = jwt.verify(token, getJwtSecret())

    if (typeof payload === 'string' || !payload.sub) {
      throw new Error('Token sin usuario')
    }

    req.userId = payload.sub
    next()
  } catch {
    next(
      new HttpError(
        401,
        'Tu sesión expiró o no es válida. Inicia sesión de nuevo.',
      ),
    )
  }
}
