import { useRef, useState, type AnchorHTMLAttributes, type CSSProperties, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
import { scrollToId } from '../../lib/scroll'
import { useScrollDirection } from '../../hooks/useScrollDirection'

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

/* ---------------- Reveal ----------------
   Fades up when scrolling down, down when scrolling up, and re-hides once the
   block has fully left the viewport — so it animates every time it enters. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const dir = useScrollDirection()
  const mostlyIn = useInView(ref, { amount: 0.25 })
  const anyIn = useInView(ref, { amount: 'some' })
  const [shown, setShown] = useState(false)

  // adjust state during render (hysteresis: show at 25% visible, hide once fully out)
  if (mostlyIn && !shown) setShown(true)
  else if (!anyIn && shown) setShown(false)

  const y = dir === 'down' ? 32 : -32
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={shown ? { duration: 0.65, delay: delay * 0.06, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
    >
      {children}
    </motion.div>
  )
}

/* ---------------- Glow ---------------- */
export function Glow({ className, opacity, fade = 68 }: { className: string; opacity: number; fade?: number }) {
  return (
    <div
      aria-hidden
      className={cx('pointer-events-none absolute -z-10 rounded-full', className)}
      style={{ opacity, background: `radial-gradient(circle, var(--color-accent) 0%, transparent ${fade}%)` }}
    />
  )
}

/* ---------------- Section shell + header ---------------- */
interface SectionProps {
  id: string
  num?: string
  label?: string
  title: ReactNode
  intro?: ReactNode
  /** struck-through ghost word shown before `word` (~~Projects~~ Products) */
  ghost?: string
  word?: string
  /** surface gradient + two gold glows behind the section */
  tinted?: boolean
  children: ReactNode
}

export function Section({ id, num, label, title, intro, ghost, word, tinted, children }: SectionProps) {
  return (
    <section
      id={id}
      className="gutter relative isolate scroll-mt-24 overflow-x-clip border-t border-rule py-[clamp(4rem,10vw,9rem)]"
    >
      {tinted && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface via-surface/40 to-transparent"
          />
          <Glow className="-top-32 right-[-12%] h-[55vmax] w-[55vmax]" opacity={0.16} />
          <Glow className="bottom-[-20%] left-[-15%] h-[42vmax] w-[42vmax]" opacity={0.09} fade={70} />
        </>
      )}

      <Reveal>
        <div className="mb-[clamp(2.5rem,5vw,4.5rem)]">
          {ghost && word ? (
            <>
              <h2
                className="display flex flex-wrap items-baseline gap-x-[0.25em] text-ink"
                style={{ fontSize: 'var(--text-h1)' }}
              >
                <span className="sr-only">
                  {ghost} — {word}
                </span>
                <span aria-hidden className="select-none text-ghost line-through decoration-[0.055em]">
                  {ghost}
                </span>
                <span aria-hidden>{word}</span>
              </h2>
              <p className="eyebrow mt-5">{title}</p>
            </>
          ) : (
            <>
              <span className="eyebrow">
                {num} — {label}
              </span>
              <h2 className="display mt-4 text-ink" style={{ fontSize: 'var(--text-h1)' }}>
                {title}
              </h2>
            </>
          )}
          {intro && (
            <p className="mt-5 max-w-[56ch] text-ink-muted" style={{ fontSize: 'var(--text-lead)' }}>
              {intro}
            </p>
          )}
        </div>
      </Reveal>

      {children}
    </section>
  )
}

/* ---------------- Chips ---------------- */
export function Tag({ children, mono = false }: { children: ReactNode; mono?: boolean }) {
  return (
    <li
      className={
        mono
          ? 'rounded-full border border-rule bg-page/60 px-3 py-1 font-mono text-[0.68rem] tracking-wide text-ink-subtle'
          : 'rounded-full border border-rule bg-page/60 px-3 py-1 text-xs text-ink-muted'
      }
    >
      {children}
    </li>
  )
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-accent">
      {children}
    </span>
  )
}

/* ---------------- Anchor that uses smooth scroll ---------------- */
export function AnchorLink({
  to,
  children,
  className,
  style,
  onNavigate,
  ...rest
}: {
  to: string
  children: ReactNode
  className?: string
  style?: CSSProperties
  onNavigate?: () => void
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  return (
    <a
      {...rest}
      href={`#${to}`}
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault()
        onNavigate?.()
        scrollToId(to)
      }}
    >
      {children}
    </a>
  )
}
