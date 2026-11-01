import { Link } from 'react-router-dom'

interface LogoProps {
  to?: string
  className?: string
  onClick?: () => void
}

export function Logo({ to = '/', className = '', onClick }: LogoProps) {
  return (
    <Link
      to={to}
      className={`logo ${className}`.trim()}
      aria-label="ESTRATEGICAMENTE, ir al inicio"
      onClick={onClick}
    >
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M10 9h13M10 16h9M10 23h13"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="24.5" cy="16" r="1.8" fill="currentColor" />
        </svg>
      </span>
      <span className="logo__text">ESTRATEGICAMENTE</span>
    </Link>
  )
}
