import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types'
import { getCurrentUser } from '../utils/api'
import { getToken, removeToken, saveToken } from '../utils/storage'
import { CurrentUserContext } from './CurrentUserContext'

interface CurrentUserProviderProps {
  children: ReactNode
}

export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    async function restoreSession() {
      const token = getToken()

      if (!token) {
        if (isActive) {
          setIsAuthLoading(false)
        }
        return
      }

      try {
        const user = await getCurrentUser()

        if (isActive) {
          setCurrentUser(user)
        }
      } catch {
        removeToken()

        if (isActive) {
          setCurrentUser(null)
        }
      } finally {
        if (isActive) {
          setIsAuthLoading(false)
        }
      }
    }

    restoreSession()

    return () => {
      isActive = false
    }
  }, [])

  const completeSignIn = useCallback((token: string, user: User) => {
    saveToken(token)
    setCurrentUser(user)
  }, [])

  const signOut = useCallback(() => {
    removeToken()
    setCurrentUser(null)
  }, [])

  const value = useMemo(
    () => ({
      currentUser,
      isAuthLoading,
      setCurrentUser,
      completeSignIn,
      signOut,
    }),
    [currentUser, isAuthLoading, completeSignIn, signOut],
  )

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  )
}
