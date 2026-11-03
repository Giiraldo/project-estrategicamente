import { AlertCircle } from './Icons'
import './StatusCard.css'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  retryLabel?: string
}

export function ErrorMessage({
  message,
  onRetry,
  retryLabel = 'Reintentar',
}: ErrorMessageProps) {
  return (
    <div className="status-card status-card--error" role="alert">
      <AlertCircle />
      <div>
        <h3>No pudimos completar la solicitud</h3>
        <p>{message}</p>
      </div>
      {onRetry ? (
        <button type="button" className="button button--dark" onClick={onRetry}>
          {retryLabel}
        </button>
      ) : null}
    </div>
  )
}
