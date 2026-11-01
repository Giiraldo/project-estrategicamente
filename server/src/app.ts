import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from './config'
import { connectDatabase } from './db'
import { errorHandler } from './middleware/errorHandler'
import articlesRouter from './routes/articles'
import authRouter from './routes/auth'
import usersRouter from './routes/users'
import { HttpError } from './utils/httpError'

const app = express()
const allowAllOrigins = config.clientOrigins.includes('*')

app.disable('x-powered-by')
app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowAllOrigins || config.clientOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new HttpError(403, 'Origen no permitido por CORS.'))
    },
  }),
)
app.use(express.json({ limit: '100kb' }))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use(async (_req, _res, next) => {
  try {
    await connectDatabase()
    next()
  } catch (error) {
    next(error)
  }
})

app.use(authRouter)
app.use('/users', usersRouter)
app.use('/articles', articlesRouter)

app.use((_req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada.' })
})

app.use(errorHandler)

export default app
