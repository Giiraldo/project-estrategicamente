import type { ReactNode } from 'react'
import { Sparkles } from './Icons'
import './StatusCard.css'

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="status-card">
      <Sparkles />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {action}
    </div>
  )
}
