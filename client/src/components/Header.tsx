import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../contexts/CurrentUserContext'
import { getInitials } from '../utils/format'
import { Close, LogOut, Menu } from './Icons'
import { Logo } from './Logo'
import './Header.css'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentUser, isAuthLoading, signOut } = useCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function handleSignOut() {
    signOut()
    setIsMenuOpen(false)
    navigate('/')
  }

  const authActions = currentUser ? (
    <>
      <Link to="/saved" className="user-chip" onClick={() => setIsMenuOpen(false)}>
        <span className="avatar" aria-hidden="true">
          {getInitials(currentUser.name)}
        </span>
        <span className="user-chip__name">
          {currentUser.name.split(' ')[0]}
        </span>
      </Link>
      <button
        type="button"
        className="icon-button"
        onClick={handleSignOut}
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
      >
        <LogOut />
      </button>
    </>
  ) : (
    <>
      <Link
        to="/signin"
        className="button button--ghost"
        onClick={() => setIsMenuOpen(false)}
      >
        Iniciar sesión
      </Link>
      <Link
        to="/signup"
        className="button button--lime"
        onClick={() => setIsMenuOpen(false)}
      >
        Crear cuenta
      </Link>
    </>
  )

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo onClick={() => setIsMenuOpen(false)} />

        <nav
          id="site-navigation"
          className={`site-nav${isMenuOpen ? ' is-open' : ''}`}
          aria-label="Navegación principal"
        >
          <div className="site-nav__links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link${isActive ? ' is-active' : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </NavLink>
            <Link
              to="/#insights"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Insights
            </Link>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link${isActive ? ' is-active' : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre el proyecto
            </NavLink>
          </div>

          {!isAuthLoading ? (
            <div className="site-nav__auth">{authActions}</div>
          ) : null}
        </nav>

        {!isAuthLoading ? (
          <div className="site-header__actions">{authActions}</div>
        ) : null}

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMenuOpen ? <Close /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
