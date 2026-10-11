import { useEffect, useState } from 'react'

export function useScrollDirection() {
  const [dir, setDir] = useState<'down' | 'up'>('down')

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (Math.abs(y - last) < 4) return
      setDir(y > last ? 'down' : 'up')
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return dir
}
