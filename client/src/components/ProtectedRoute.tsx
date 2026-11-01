import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useCurrentUser } from '../contexts/CurrentUserContext'
import { Preloader } from './Preloader'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, isAuthLoading } = useCurrentUser()
  const location = useLocation()

  if (isAuthLoading) {
    return (
      <div className="page-loader">
        <Preloader label="Restaurando tu sesión..." />
      </div>
    )
  }

  if (!currentUser) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{
          from: location.pathname,
          message: 'Inicia sesión para acceder a tu biblioteca.',
        }}
      />
    )
  }

  return <>{children}</>
}
