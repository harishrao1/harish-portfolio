import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile } from '../data/profile'
import { useTypewriter } from '../hooks/useTypewriter'
import { Glow } from '../components/ui'
import { ParticleNetwork } from '../components/fx/ParticleNetwork'
import { CodeCard } from '../components/fx/CodeCard'
import { scrollToId } from '../lib/scroll'

const ease = [0.22, 1, 0.36, 1] as const
const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }

export function Hero() {
  const role = useTypewriter(profile.roles, { typeMs: 65, deleteMs: 32 })
  const [first, ...rest] = profile.name.split(' ')

  return (
    <section id="top" className="relative isolate flex min-h-screen items-center overflow-hidden">
      <ParticleNetwork />
      <Glow className="left-1/2 top-[38%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2" opacity={0.16} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="gutter relative mx-auto flex w-full max-w-4xl flex-col items-center py-28 text-center"
      >
        <motion.div variants={item} className="mb-10">
          <StatusTicker />
        </motion.div>

        <motion.div variants={item}>
          <CodeCard data={profile.codeCard} />
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-12 whitespace-nowrap font-display font-semibold leading-[1] tracking-[-0.045em]"
          // one line on every screen: scales with the viewport, capped at the hero size
          style={{ fontSize: 'clamp(1.9rem, 10.5vw, 6rem)' }}
        >
          <span className="text-ink">Hi, I’m </span>
          <span className="bg-gradient-to-r from-accent-hi to-accent bg-clip-text text-transparent">
            {first} {rest.join(' ')}
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 flex items-center justify-center gap-2.5 font-mono text-ink"
          style={{ fontSize: 'var(--text-lead)' }}
        >
          <Chevron />
          <span className="sr-only">{profile.roles[0]}</span>
          <span aria-hidden className="min-h-[1.4em] min-w-[1ch] text-left">
            {role}
            <span className="ml-1 inline-block h-[1.05em] w-[0.55em] translate-y-[0.12em] animate-blink bg-accent" />
          </span>
        </motion.p>

        <motion.div variants={item} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('projects')
            }}
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent-hi to-accent px-8 py-3.5 text-sm font-medium text-accent-fg shadow-[0_0_30px_-8px_var(--color-accent)] transition-shadow duration-300 hover:shadow-[0_0_40px_-4px_var(--color-accent)]"
          >
            See My Work
            <ArrowDown />
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-rule-strong bg-surface px-8 py-3.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <DownloadIcon />
            Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

/** Cycles through profile.statuses every 3.2s with a small slide. */
function StatusTicker() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (profile.statuses.length < 2) return
    const t = window.setInterval(() => setI((v) => (v + 1) % profile.statuses.length), 3200)
    return () => window.clearInterval(t)
  }, [])

  return (
    <div className="flex h-4 items-center justify-center" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease }}
          className="eyebrow flex items-center gap-2.5 whitespace-nowrap leading-none"
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {profile.statuses[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

const Chevron = () => (
  <svg width="0.8em" height="0.8em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-accent">
    <path d="m9 6 6 6-6 6" />
  </svg>
)

const ArrowDown = () => (
  <svg width="1.05em" height="1.05em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
    <path d="M12 4v15" />
    <path d="m6 13 6 6 6-6" />
  </svg>
)

const DownloadIcon = () => (
  <svg width="1.05em" height="1.05em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
    <path d="M12 3v11" />
    <path d="m7.5 10 4.5 4.5 4.5-4.5" />
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
)
