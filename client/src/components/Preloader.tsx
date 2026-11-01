interface PreloaderProps {
  label?: string
}

export function Preloader({ label = 'Cargando...' }: PreloaderProps) {
  return (
    <div className="preloader" role="status" aria-live="polite">
      <span className="preloader__mark" aria-hidden="true">
        E
      </span>
      <span className="preloader__label">{label}</span>
    </div>
  )
}
