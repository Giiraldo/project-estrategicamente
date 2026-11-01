import mongoose from 'mongoose'
import { config } from './config'

interface MongooseCache {
  connection: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache
}

const cached = (globalWithMongoose.mongooseCache ??= {
  connection: null,
  promise: null,
})

export async function connectDatabase(): Promise<typeof mongoose> {
  if (cached.connection) {
    return cached.connection
  }

  if (!config.mongodbUri) {
    throw new Error('MONGODB_URI no está configurada en las variables de entorno.')
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 10_000,
    })
  }

  try {
    cached.connection = await cached.promise
    return cached.connection
  } catch (error) {
    cached.promise = null
    throw error
  }
}
