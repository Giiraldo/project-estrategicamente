import type { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { HttpError } from '../utils/httpError'

interface MongoError {
  code?: number
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (res.headersSent) {
    next(error)
    return
  }

  if (error instanceof HttpError) {
    res.status(error.status).json({ message: error.message })
    return
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const firstError = Object.values(error.errors)[0]
    res.status(400).json({
      message: firstError?.message ?? 'Los datos enviados no son válidos.',
    })
    return
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: 'El identificador enviado no es válido.' })
    return
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    (error as MongoError).code === 11000
  ) {
    res.status(409).json({ message: 'El recurso ya existe.' })
    return
  }

  console.error(
    'Error no controlado:',
    error instanceof Error ? error.message : error,
  )
  res.status(500).json({ message: 'Error interno del servidor.' })
}
