import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/AuthLayout'
import {
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  UserIcon,
} from '../components/Icons'
import { useCurrentUser } from '../contexts/CurrentUserContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { signUp } from '../utils/auth'
import { ApiError } from '../utils/http'

export function SignUp() {
  usePageTitle('Crear cuenta')
  const { currentUser, isAuthLoading } = useCurrentUser()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    if (!isAuthLoading && currentUser) {
      navigate('/', { replace: true })
    }
  }, [currentUser, isAuthLoading, navigate])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await signUp({
        name: name.trim(),
        email: email.trim(),
        password,
      })
      setIsRegistered(true)
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : 'No se pudo crear la cuenta. Inténtalo de nuevo.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Empieza aquí"
      title="Crea tu cuenta"
      description="Guarda los insights que te interesan y construye tu propia biblioteca de estrategia digital."
      footer={
        <p>
          ¿Ya tienes cuenta? <Link to="/signin">Iniciar sesión</Link>
        </p>
      }
    >
      {isRegistered ? (
        <div className="auth-success" role="status">
          <span className="auth-success__icon" aria-hidden="true">
            <Check />
          </span>
          <h2>Tu cuenta se creó correctamente</h2>
          <p>Ya puedes iniciar sesión y empezar a guardar insights.</p>
          <Link to="/signin" className="button button--dark">
            Iniciar sesión
          </Link>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="signup-name">Nombre</label>
            <div className="input-wrap">
              <UserIcon />
              <input
                id="signup-name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="¿Cómo te llamas?"
                autoComplete="name"
                minLength={2}
                maxLength={30}
                required
              />
            </div>
            <span className="form-hint">Entre 2 y 30 caracteres.</span>
          </div>

          <div className="form-field">
            <label htmlFor="signup-email">Correo electrónico</label>
            <div className="input-wrap">
              <Mail />
              <input
                id="signup-email"
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
            <label htmlFor="signup-password">Contraseña</label>
            <div className="input-wrap">
              <Lock />
              <input
                id="signup-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
                minLength={8}
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
            <span className="form-hint">Mínimo 8 caracteres.</span>
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
            {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>
      )}
    </AuthLayout>
  )
}
