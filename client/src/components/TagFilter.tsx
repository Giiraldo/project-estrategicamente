import { MARKETING_TAGS } from '../config/constants'

interface TagFilterProps {
  activeTag: string
  onChange: (tag: string) => void
}

export function TagFilter({ activeTag, onChange }: TagFilterProps) {
  return (
    <div className="tag-filter" role="group" aria-label="Filtrar por tema">
      {MARKETING_TAGS.map((tag) => (
        <button
          key={tag.value}
          type="button"
          className={`tag-chip${activeTag === tag.value ? ' is-active' : ''}`}
          onClick={() => onChange(tag.value)}
          aria-pressed={activeTag === tag.value}
        >
          {tag.label}
        </button>
      ))}
    </div>
  )
}
