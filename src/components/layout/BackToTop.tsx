import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { scrollToId } from '../../lib/scroll'

export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollToId('top')
          }}
          aria-label="Back to top"
          title="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-6 right-[clamp(1rem,4vw,2.5rem)] z-50 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-page shadow-[0_6px_24px_rgba(0,0,0,0.35)] transition-colors hover:bg-accent hover:text-accent-fg"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5">
            <path d="M12 20V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
