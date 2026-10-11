import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const read = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#f5f1e8' : '#0b0b0c')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage unavailable — theme still works for this visit */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}
