import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/scroll'

interface Props {
  /** px² of canvas area per node — lower = more nodes */
  density?: number
  /** max distance (px) at which two nodes are joined by a line */
  linkDistance?: number
  lineOpacity?: number
  nodeOpacity?: number
  nodeRadius?: number
  /** CSS custom property to colour nodes/lines with (re-read on theme change) */
  colorVar?: string
  className?: string
}

/**
 * Drifting "constellation": nodes wander slowly and are linked by lines that
 * fade with distance. Pauses when off-screen / tab hidden; static for reduced motion.
 */
export function ParticleNetwork({
  density = 26000,
  linkDistance = 130,
  lineOpacity = 0.16,
  nodeOpacity = 0.34,
  nodeRadius = 1.3,
  colorVar = '--color-ink-muted',
  className = '',
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = prefersReducedMotion()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let running = false
    let inView = true
    let rgb = '163, 152, 135'
    let nodes: { x: number; y: number; vx: number; vy: number }[] = []

    const readColor = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(colorVar).trim()
      if (/^#[0-9a-f]{6}$/i.test(v)) {
        rgb = [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16)).join(', ')
      }
    }

    const draw = (move: boolean) => {
      ctx.clearRect(0, 0, w, h)
      if (move) {
        for (const n of nodes) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < -20) n.x = w + 20
          if (n.x > w + 20) n.x = -20
          if (n.y < -20) n.y = h + 20
          if (n.y > h + 20) n.y = -20
        }
      }
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
          if (d > linkDistance) continue
          ctx.strokeStyle = `rgba(${rgb}, ${lineOpacity * (1 - d / linkDistance)})`
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.stroke()
        }
      }
      ctx.fillStyle = `rgba(${rgb}, ${nodeOpacity})`
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, nodeRadius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(110, Math.max(18, (w * h) / density)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }))
      draw(false)
    }

    const loop = () => {
      draw(true)
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

    readColor()
    resize()
    start()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting
      if (inView) start()
      else stop()
    })
    io.observe(canvas)
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)
    const mo = new MutationObserver(() => {
      readColor()
      if (!running) draw(false)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [density, linkDistance, lineOpacity, nodeOpacity, nodeRadius, colorVar])

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
