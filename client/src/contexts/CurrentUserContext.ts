import { createContext, useContext } from 'react'
import type { User } from '../types'

export interface CurrentUserContextValue {
  currentUser: User | null
  isAuthLoading: boolean
  setCurrentUser: (user: User | null) => void
  completeSignIn: (token: string, user: User) => void
  signOut: () => void
}

export const CurrentUserContext =
  createContext<CurrentUserContextValue | null>(null)

export function useCurrentUser(): CurrentUserContextValue {
  const context = useContext(CurrentUserContext)

  if (!context) {
    throw new Error(
      'useCurrentUser debe utilizarse dentro de CurrentUserProvider.',
    )
  }

  return context
}
