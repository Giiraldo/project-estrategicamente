import { useState } from 'react'
import type { FormEvent } from 'react'
import { Search } from './Icons'

interface SearchFormProps {
  activeTag: string
  onSearch: (tag: string) => void
}

function normalizeTag(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '')
}

export function SearchForm({ activeTag, onSearch }: SearchFormProps) {
  const [query, setQuery] = useState(activeTag)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextTag = normalizeTag(query)

    if (nextTag) {
      onSearch(nextTag)
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <label className="visually-hidden" htmlFor="insights-search">
        Buscar insights por tema
      </label>
      <Search className="search-form__icon" />
      <input
        id="insights-search"
        name="tag"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Busca un tema: seo, branding, analytics..."
        autoComplete="off"
      />
      <button type="submit" className="button button--dark">
        Buscar
      </button>
    </form>
  )
}
