export const DEVTO_API_URL = 'https://dev.to/api'
export const INSIGHTS_PER_PAGE = 9
export const MARKETING_TAGS = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'seo', label: 'SEO' },
  { value: 'socialmedia', label: 'Social media' },
  { value: 'content', label: 'Contenido' },
  { value: 'branding', label: 'Branding' },
  { value: 'analytics', label: 'Analytics' },
] as const

export const INSIGHTS_ERROR_MESSAGE =
  'Algo salió mal con la solicitud. Puede ser un problema de conexión o del servidor. Inténtalo de nuevo más tarde.'
export const DEVTO_ERROR_MESSAGE = 'No se pudieron obtener los artículos.'
export const REQUEST_ERROR_MESSAGE = 'No se pudo completar la solicitud.'
export const TOKEN_KEY = 'estrategicamente.token'
export const INSIGHTS_KEY = 'estrategicamente.insights'
export const API_URL = (
  (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3001'
).replace(/\/$/, '')
