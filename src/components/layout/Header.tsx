import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import type { Theme } from '../../hooks/useTheme'
import { AnchorLink } from '../ui'
import { SocialIcon } from '../ui/icons'

const NAV = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

const SECTION_IDS = NAV.map((n) => n.id)
const ease = [0.22, 1, 0.36, 1] as const
const enter = (delay: number) => ({
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease, delay },
})

export function Header({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const active = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-32 bg-gradient-to-b from-page via-page/92 to-transparent"
      />

      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex items-center justify-between gap-4 px-[clamp(1rem,4vw,2.5rem)]">
        <motion.div {...enter(0.15)} className="pointer-events-auto shrink-0">
          <AnchorLink to="top" className="font-display text-2xl font-semibold lowercase tracking-[-0.04em] text-ink">
            {profile.wordmark}
            <span className="text-accent">.</span>
          </AnchorLink>
        </motion.div>

        {/* Desktop pill nav */}
        <motion.nav
          {...enter(0.2)}
          aria-label="Primary"
          className="pointer-events-auto hidden items-center gap-1 rounded-full border border-rule-strong/70 bg-surface/85 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-xl md:flex"
        >
          <ul className="flex shrink-0 items-center gap-0.5">
            {NAV.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id} className="relative">
                  <AnchorLink
                    to={item.id}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative block whitespace-nowrap rounded-full px-3.5 py-2 text-sm transition-colors duration-300 lg:px-5 ${
                      isActive ? 'text-accent-fg' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full bg-accent"
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </AnchorLink>
                </li>
              )
            })}
          </ul>
          <span className="mx-1.5 h-5 w-px shrink-0 bg-rule-strong" aria-hidden />
          <ul className="flex shrink-0 items-center gap-0.5 pr-1">
            <SocialLinks />
            <li>
              <ThemeButton theme={theme} onToggle={onToggleTheme} />
            </li>
          </ul>
        </motion.nav>

        {/* Mobile controls */}
        <div className="pointer-events-auto flex items-center gap-2 md:hidden">
          <motion.div {...enter(0.2)} className="flex items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-rule-strong/70 bg-surface/85 backdrop-blur-xl">
              <ThemeButton theme={theme} onToggle={onToggleTheme} />
            </span>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-rule-strong/70 bg-surface/85 text-ink shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            >
              <Burger open={open} />
            </button>
          </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-page/70 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease }}
            className="fixed right-[clamp(1rem,4vw,2.5rem)] top-20 z-50 w-56 origin-top-right overflow-hidden rounded-2xl border border-rule-strong/70 bg-surface/95 shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden"
          >
            <ul className="p-2">
              {NAV.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <AnchorLink
                      to={item.id}
                      onNavigate={() => setOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`block rounded-xl px-4 py-2.5 text-sm transition-colors ${
                        isActive ? 'bg-accent text-accent-fg' : 'text-ink-muted hover:bg-page/60 hover:text-ink'
                      }`}
                    >
                      {item.label}
                    </AnchorLink>
                  </li>
                )
              })}
            </ul>
            <ul className="flex items-center gap-1 border-t border-rule px-3 py-2.5">
              <SocialLinks />
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

function IconLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-page hover:text-ink"
    >
      {children}
    </a>
  )
}

function SocialLinks() {
  return (
    <>
      {profile.socials
        .filter((s) => s.icon !== 'mail')
        .map((s) => (
          <li key={s.label}>
            <IconLink href={s.href} label={s.label}>
              <SocialIcon icon={s.icon} className="h-4 w-4" />
            </IconLink>
          </li>
        ))}
      <li>
        <IconLink href={profile.resumeUrl} label="Resume (PDF)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
            <path d="M14 3v5h5M9 13h6M9 17h6" />
          </svg>
        </IconLink>
      </li>
    </>
  )
}

function ThemeButton({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface hover:text-ink"
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

function Burger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-5" aria-hidden>
      <span
        className={`absolute left-0 block h-[1.5px] w-full rounded bg-current transition-all duration-300 ${
          open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 rounded bg-current transition-opacity duration-200 ${
          open ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`absolute left-0 block h-[1.5px] w-full rounded bg-current transition-all duration-300 ${
          open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
        }`}
      />
    </span>
  )
}
