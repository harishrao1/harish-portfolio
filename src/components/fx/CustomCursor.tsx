import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const INTERACTIVE = 'a, button, [role="button"], summary, label[for], select'
const TEXT_INPUT = 'input, textarea, [contenteditable="true"]'

/**
 * Gold dot that tracks the pointer exactly, plus a ring that trails it on a spring.
 * - Ring grows and fills over links/buttons, shrinks while pressed
 * - Hides over text inputs (the native text caret takes over) and when the pointer leaves the window
 * - Only enabled for fine pointers (mouse/trackpad) without reduced-motion preference
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [overText, setOverText] = useState(false)
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(fine.matches && !reduced.matches)
    update()
    fine.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (!enabled) {
      root.classList.remove('has-custom-cursor')
      return
    }
    root.classList.add('has-custom-cursor')

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const el = e.target as Element | null
      setHovering(!!el?.closest?.(INTERACTIVE))
      setOverText(!!el?.closest?.(TEXT_INPUT))
    }
    const onLeave = () => setVisible(false)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('blur', onLeave)
    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('blur', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const show = visible && !overText
  const ringSize = hovering ? 52 : 34

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      {/* trailing ring */}
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-accent"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: show ? 1 : 0,
          scale: pressed ? 0.82 : 1,
          backgroundColor: hovering
            ? 'color-mix(in srgb, var(--color-accent) 14%, transparent)'
            : 'color-mix(in srgb, var(--color-accent) 0%, transparent)',
          borderColor: hovering
            ? 'color-mix(in srgb, var(--color-ink) 65%, transparent)'
            : 'color-mix(in srgb, var(--color-accent) 45%, transparent)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      />
      {/* exact dot */}
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: show ? 1 : 0, scale: hovering ? 0 : pressed ? 0.6 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  )
}
