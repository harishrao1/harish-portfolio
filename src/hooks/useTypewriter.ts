import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/scroll'

interface Options {
  typeMs?: number
  deleteMs?: number
  holdMs?: number
}

/** Types each word, holds, deletes it, then moves to the next — forever. */
export function useTypewriter(words: string[], { typeMs = 60, deleteMs = 30, holdMs = 1600 }: Options = {}) {
  const [reduced] = useState(prefersReducedMotion)
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) return
    const word = words[index % words.length]
    let delay = deleting ? deleteMs : typeMs
    let next: () => void

    if (!deleting && text === word) {
      delay = holdMs
      next = () => setDeleting(true)
    } else if (deleting && text === '') {
      delay = 250
      next = () => {
        setDeleting(false)
        setIndex((i) => i + 1)
      }
    } else {
      next = () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }

    const t = window.setTimeout(next, delay)
    return () => window.clearTimeout(t)
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs, reduced])

  return reduced ? words[0] : text
}
