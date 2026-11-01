import 'dotenv/config'

function readPort(value: string | undefined): number {
  const port = Number(value)

  return Number.isInteger(port) && port > 0 ? port : 3001
}

export const config = {
  port: readPort(process.env.PORT),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  mongodbUri: process.env.MONGODB_URI?.trim() ?? '',
  jwtSecret: process.env.JWT_SECRET?.trim() ?? '',
  clientOrigins: (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
}

export function getJwtSecret(): string {
  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET no está configurada en las variables de entorno.')
  }

  return config.jwtSecret
}
