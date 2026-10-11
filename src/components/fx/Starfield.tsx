import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/scroll'

interface Star {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  phase: number
  gold: boolean
}

/**
 * Lightweight drifting starfield on a 2D canvas.
 * - Pauses when off-screen or the tab is hidden
 * - Caps devicePixelRatio at 2 and star count by area
 * - Re-reads theme colours when data-theme changes
 * - Draws a single static frame for reduced-motion users
 */
export function Starfield({ density = 1, className }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = prefersReducedMotion()
    let w = 0
    let h = 0
    let stars: Star[] = []
    let raf = 0
    let inView = true
    let running = false
    let colors = { ink: '#ede6da', accent: '#c9a227', light: false }

    const readColors = () => {
      const s = getComputedStyle(document.documentElement)
      colors = {
        ink: s.getPropertyValue('--color-ink').trim() || colors.ink,
        accent: s.getPropertyValue('--color-accent').trim() || colors.accent,
        light: document.documentElement.dataset.theme === 'light',
      }
    }

    const seed = () => {
      const isMobile = w < 640
      const cap = isMobile ? 50 : 130
      const count = Math.round(Math.min(cap, (w * h) / 9000) * density)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.15 + 0.25,
        vx: (Math.random() - 0.5) * 0.05,
        vy: -(Math.random() * 0.07 + 0.015),
        phase: Math.random() * Math.PI * 2,
        gold: Math.random() < 0.2,
      }))
    }

    const draw = (t: number, move: boolean) => {
      ctx.clearRect(0, 0, w, h)
      const base = colors.light ? 0.28 : 0.42
      for (const s of stars) {
        if (move) {
          s.x += s.vx
          s.y += s.vy
          if (s.y < -4) {
            s.y = h + 4
            s.x = Math.random() * w
          }
          if (s.x < -4) s.x = w + 4
          else if (s.x > w + 4) s.x = -4
        }
        const twinkle = 0.5 + 0.5 * Math.sin(t * 0.0011 + s.phase)
        ctx.globalAlpha = base * (0.35 + 0.65 * twinkle) * (s.gold ? 1.4 : 1)
        ctx.fillStyle = s.gold ? colors.accent : colors.ink
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.gold ? s.r * 1.25 : s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
      draw(0, false)
    }

    const loop = (t: number) => {
      draw(t, true)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduced || !inView || document.hidden) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    readColors()
    resize()
    start()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) start()
      else stop()
    })
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    const mo = new MutationObserver(() => {
      readColors()
      if (!running) draw(0, false)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [density])

  return <canvas ref={ref} aria-hidden className={className} />
}
