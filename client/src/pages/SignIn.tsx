import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/AuthLayout'
import { AlertCircle, Eye, EyeOff, Lock, Mail } from '../components/Icons'
import { useCurrentUser } from '../contexts/CurrentUserContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { signIn } from '../utils/auth'
import { ApiError } from '../utils/http'

interface LocationState {
  from?: string
  message?: string
}

export function SignIn() {
  usePageTitle('Iniciar sesión')
  const { currentUser, isAuthLoading, completeSignIn } = useCurrentUser()
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isAuthLoading && currentUser) {
      const destination =
        state?.from && state.from !== '/signin' ? state.from : '/'
      navigate(destination, { replace: true })
    }
  }, [currentUser, isAuthLoading, navigate, state?.from])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await signIn({ email: email.trim(), password })
      completeSignIn(response.token, response.user)
      const destination =
        state?.from && state.from !== '/signin' ? state.from : '/'
      navigate(destination, { replace: true })
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : 'No se pudo iniciar sesión. Inténtalo de nuevo.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Bienvenido de nuevo"
      title="Inicia sesión"
      description="Accede a tu biblioteca personal y continúa construyendo tu criterio digital."
      footer={
        <p>
          ¿Aún no tienes cuenta? <Link to="/signup">Crear cuenta</Link>
        </p>
      }
    >
      {state?.message ? (
        <p className="auth-info" role="status">
          {state.message}
        </p>
      ) : null}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="signin-email">Correo electrónico</label>
          <div className="input-wrap">
            <Mail />
            <input
              id="signin-email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@correo.com"
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="signin-password">Contraseña</label>
          <div className="input-wrap">
            <Lock />
            <input
              id="signin-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Tu contraseña"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((isVisible) => !isVisible)}
              aria-label={
                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
              }
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {error ? (
          <p className="form-error" role="alert">
            <AlertCircle />
            <span>{error}</span>
          </p>
        ) : null}

        <button
          type="submit"
          className="button button--dark"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
    </AuthLayout>
  )
}
