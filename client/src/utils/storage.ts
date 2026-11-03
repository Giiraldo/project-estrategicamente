import type { CachedInsights } from '../types'
import { INSIGHTS_KEY, TOKEN_KEY } from '../config/constants'

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

export function getToken(): string | null {
  if (!isBrowser()) {
    return null
  }

  try {
    return window.localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function saveToken(token: string): void {
  if (!isBrowser()) {
    return
  }

  try {
    window.localStorage.setItem(TOKEN_KEY, token)
  } catch {
    return
  }
}

export function removeToken(): void {
  if (!isBrowser()) {
    return
  }

  try {
    window.localStorage.removeItem(TOKEN_KEY)
  } catch {
    return
  }
}

export function readCachedInsights(): CachedInsights | null {
  if (!isBrowser()) {
    return null
  }

  try {
    const raw = window.localStorage.getItem(INSIGHTS_KEY)

    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw) as CachedInsights

    if (
      typeof parsed.tag !== 'string' ||
      !Array.isArray(parsed.articles) ||
      typeof parsed.page !== 'number' ||
      typeof parsed.hasMore !== 'boolean'
    ) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function writeCachedInsights(insights: CachedInsights): void {
  if (!isBrowser()) {
    return
  }

  try {
    window.localStorage.setItem(INSIGHTS_KEY, JSON.stringify(insights))
  } catch {
    return
  }
}
