import { getToken } from './storage'

const API_URL = (
  (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3001'
).replace(/\/$/, '')

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken()
  const headers = new Headers(options.headers)

  headers.set('Accept', 'application/json')

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  const data = (await response.json().catch(() => null)) as {
    message?: string
  } | null

  if (!response.ok) {
    throw new ApiError(
      data?.message ?? 'No se pudo completar la solicitud.',
      response.status,
    )
  }

  return data as T
}
