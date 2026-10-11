import Lenis from 'lenis'

let lenis: Lenis | null = null

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Start Lenis smooth scrolling (skipped when the user prefers reduced motion). */
export function initLenis() {
  if (lenis || prefersReducedMotion()) return lenis
  lenis = new Lenis({
    autoRaf: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
  })
  return lenis
}

export function destroyLenis() {
  lenis?.destroy()
  lenis = null
}

/** Smoothly scroll to a section id ("top" scrolls to the very top). */
export function scrollToId(id: string) {
  const target: number | HTMLElement | null = id === 'top' ? 0 : document.getElementById(id)
  if (target === null) return

  if (lenis) {
    lenis.scrollTo(target, { offset: id === 'top' ? 0 : -80 })
  } else if (typeof target === 'number') {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }
  history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`)
}

export const stopScroll = () => lenis?.stop()
export const startScroll = () => lenis?.start()
