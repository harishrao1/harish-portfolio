import { profile } from '../data/profile'
import { skills } from '../data/skills'
import type { SkillGroup } from '../types'
import { Reveal, Section } from '../components/ui'
import { ParticleNetwork } from '../components/fx/ParticleNetwork'

export function About() {
  return (
    <Section id="about" num="01" label="About" title="A bit about me.">
      <div className="grid gap-x-16 gap-y-14 md:grid-cols-[1fr_minmax(0,20rem)]">
        <Reveal>
          <div className="space-y-6">
            {profile.bio.map((para, i) => (
              <p
                key={i}
                className="max-w-[58ch] text-ink-muted"
                style={{ fontSize: 'var(--text-lead)', lineHeight: 1.65 }}
              >
                {para.map((seg, j) =>
                  seg.em ? (
                    <strong key={j} className="font-medium text-accent">
                      {seg.text}
                    </strong>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  ),
                )}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h3 className="eyebrow">Education</h3>
          <ul className="mt-5 space-y-7">
            {profile.education.map((e) => (
              <li key={e.school} className="border-t border-rule-strong pt-4">
                <p
                  className="font-display font-semibold leading-tight tracking-[-0.03em] text-ink"
                  style={{ fontSize: 'var(--text-h3)' }}
                >
                  {e.school}
                </p>
                <p className="mt-1 text-ink-muted" style={{ fontSize: 'var(--text-body)' }}>
                  {e.degree}
                </p>
                <p className="mt-2 font-mono text-[0.7rem] tracking-wide text-ink-subtle">{e.meta}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Proficiency */}
      <div className="relative isolate mt-[clamp(4rem,8vw,6rem)] overflow-hidden border-t border-rule pt-[clamp(2.5rem,5vw,4rem)]">
        <ParticleNetwork
          density={13000}
          linkDistance={155}
          lineOpacity={0.3}
          nodeOpacity={0.55}
          nodeRadius={1.6}
          colorVar="--color-accent"
          className="-z-10 opacity-70"
        />

        <Reveal>
          <div className="mb-10 max-w-[46ch]">
            <span className="eyebrow">Proficiency</span>
            <h3 className="display mt-3 text-ink" style={{ fontSize: 'var(--text-h2)' }}>
              My tech arsenal.
            </h3>
            <p className="mt-4 text-ink-muted" style={{ fontSize: 'var(--text-body)' }}>
              A focused set of tools I reach for, grouped by where they sit in the stack.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {skills.map((group, i) => (
            <Reveal key={group.title} delay={i}>
              <div className="mb-4 flex items-center gap-2">
                <GroupIcon name={group.icon} />
                <h4 className="eyebrow">{group.title}</h4>
              </div>
              <ul className="flex flex-col gap-2">
                {group.items.map((s) => (
                  <li
                    key={s.name}
                    className="rounded-lg border border-rule bg-surface/50 px-3 py-2.5 transition-colors hover:border-accent/50"
                  >
                    <p className="text-sm leading-tight text-ink">{s.name}</p>
                    <p className="mt-1 font-mono text-[0.62rem] leading-tight tracking-wide text-ink-subtle">{s.note}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

function GroupIcon({ name }: { name: SkillGroup['icon'] }) {
  const p = {
    width: 15,
    height: 15,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className: 'shrink-0 text-accent',
  }
  switch (name) {
    case 'code':
      return (
        <svg {...p}>
          <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />
        </svg>
      )
    case 'layers':
      return (
        <svg {...p}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 13 9 5 9-5" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...p}>
          <path d="M3 3v18h18" />
          <path d="M7 15l4-4 3 3 5-6" />
        </svg>
      )
    case 'bolt':
      return (
        <svg {...p}>
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
        </svg>
      )
    case 'spark':
      return (
        <svg {...p}>
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
          <path d="M18 16.5 18.7 19l2.3.7-2.3.8-.7 2.5-.7-2.5-2.3-.8 2.3-.7.7-2.5Z" />
        </svg>
      )
    case 'cloud':
      return (
        <svg {...p}>
          <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97 6 6 0 0 0-11.6 1.35A3.5 3.5 0 0 0 7 19h10.5Z" />
        </svg>
      )
    default:
      return (
        <svg {...p}>
          <path d="M12 3l7.5 3v5.5c0 4.4-3.1 8.1-7.5 9.5-4.4-1.4-7.5-5.1-7.5-9.5V6L12 3Z" />
          <path d="m9.5 12 1.8 1.8 3.4-3.4" />
        </svg>
      )
  }
}
