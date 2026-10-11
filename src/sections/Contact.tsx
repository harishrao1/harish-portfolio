import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { profile } from '../data/profile'
import { Glow, Reveal } from '../components/ui'
import { SocialIcon } from '../components/ui/icons'

const YEAR = new Date().getFullYear()

async function copyText(value: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value)
      return true
    }
    const ta = document.createElement('textarea')
    ta.value = value
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onCopy = async () => {
    if (await copyText(profile.email)) {
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section
      id="contact"
      className="gutter relative isolate scroll-mt-24 overflow-hidden border-t border-rule py-[clamp(4rem,10vw,9rem)] text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-surface via-surface/40 to-transparent"
      />
      <Glow className="left-1/2 top-0 h-[52vmax] w-[52vmax] -translate-x-1/2 -translate-y-1/3" opacity={0.18} />

      <Reveal>
        <span className="eyebrow">04 — Contact</span>
        <h2 className="display mx-auto mt-5 max-w-[18ch] text-ink" style={{ fontSize: 'var(--text-h1)' }}>
          Let’s build something{' '}
          <span className="bg-gradient-to-r from-accent-hi to-accent bg-clip-text text-transparent">together.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[52ch] text-ink-muted" style={{ fontSize: 'var(--text-lead)', lineHeight: 1.6 }}>
          Hiring for a frontend role, or want to talk Next.js architecture, performance or real-time UI? I’m always open to a
          conversation.
        </p>
      </Reveal>

      <Reveal delay={1}>
        <p
          className="mt-10 flex items-center justify-center gap-2.5 font-mono uppercase tracking-[0.14em] text-accent"
          style={{ fontSize: 'var(--text-eyebrow)' }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
          </span>
          Happy to connect
        </p>
      </Reveal>

      <Reveal delay={2}>
        <ul className="mt-10 flex items-center justify-center gap-3">
          {profile.socials.map((s) => {
            const external = s.href.startsWith('http')
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-rule bg-surface/50 text-ink-muted transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <SocialIcon icon={s.icon} className="h-[17px] w-[17px]" />
                </a>
              </li>
            )
          })}
        </ul>
      </Reveal>

      <Reveal delay={3}>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-rule bg-surface/40 py-1.5 pl-4 pr-1.5">
          <span className="font-mono text-xs tracking-wide text-ink-muted sm:text-sm">{profile.email}</span>
          <button
            type="button"
            onClick={onCopy}
            aria-label={copied ? 'Email address copied' : 'Copy email address'}
            title={copied ? 'Copied' : 'Click to copy'}
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border transition-colors ${
              copied
                ? 'border-accent/50 bg-accent/10 text-accent'
                : 'border-rule text-ink-subtle hover:border-accent/50 hover:text-accent'
            }`}
          >
            {copied ? <Check size={13} strokeWidth={2.4} /> : <Copy size={13} />}
          </button>
          <span aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </div>
      </Reveal>

      <footer className="mt-16 flex flex-col gap-3 border-t border-rule pt-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="font-mono text-[0.7rem] tracking-wide text-ink-subtle">
          © {YEAR} {profile.name}
        </p>
        <p className="font-mono text-[0.7rem] tracking-wide text-ink-subtle">
          React · TypeScript · Tailwind · Framer Motion · Lenis
        </p>
      </footer>
    </section>
  )
}
