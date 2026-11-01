import { HttpError } from './httpError'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function readString(
  value: unknown,
  field: string,
  { required = true }: { required?: boolean } = {},
): string {
  if (typeof value !== 'string') {
    if (!required && value === undefined) {
      return ''
    }

    throw new HttpError(400, `El campo ${field} debe ser texto.`)
  }

  const cleanValue = value.trim()

  if (required && !cleanValue) {
    throw new HttpError(400, `El campo ${field} es obligatorio.`)
  }

  return cleanValue
}

export function readEmail(value: unknown): string {
  const email = readString(value, 'email').toLowerCase()

  if (!EMAIL_PATTERN.test(email)) {
    throw new HttpError(400, 'El correo electrónico no es válido.')
  }

  return email
}

export function readPassword(value: unknown): string {
  if (typeof value !== 'string' || value.length < 8) {
    throw new HttpError(400, 'La contraseña debe tener al menos 8 caracteres.')
  }

  if (value.length > 72) {
    throw new HttpError(400, 'La contraseña no puede superar los 72 caracteres.')
  }

  return value
}

export function readName(value: unknown): string {
  const name = readString(value, 'nombre')

  if (name.length < 2 || name.length > 30) {
    throw new HttpError(400, 'El nombre debe tener entre 2 y 30 caracteres.')
  }

  return name
}

export function readHttpUrl(value: unknown): string {
  const url = readString(value, 'url')

  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new Error('Protocolo no permitido')
    }
  } catch {
    throw new HttpError(400, 'La URL del artículo no es válida.')
  }

  return url
}

export function readTags(value: unknown): string[] {
  if (value === undefined || value === null) {
    return []
  }

  if (!Array.isArray(value)) {
    throw new HttpError(400, 'Las etiquetas deben ser una lista de textos.')
  }

  return value
    .filter((tag): tag is string => typeof tag === 'string')
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 10)
}
