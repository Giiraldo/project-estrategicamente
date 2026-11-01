import { useEffect } from 'react'

const BASE_TITLE = 'ESTRATEGICAMENTE'

export function usePageTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE_TITLE}` : BASE_TITLE
  }, [title])
}
