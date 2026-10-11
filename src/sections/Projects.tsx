import { projects } from '../data/projects'
import type { Project } from '../types'
import { Reveal, Section, Tag } from '../components/ui'

export function Projects() {
  return (
    <Section
      id="projects"
      ghost="Projects"
      word="Products"
      title="Things I shipped, not just built."
      intro="Written as the decisions behind them rather than the tools used to build them."
    >
      <div className="flex flex-col gap-8">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  )
}

function ProjectCard({ project: p }: { project: Project }) {
  const links = [
    p.demo && { label: 'Live demo', href: p.demo },
    p.source && { label: 'Source', href: p.source },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <article
      id={`project-${p.id}`}
      className="group relative scroll-mt-32 overflow-hidden rounded-3xl border border-rule bg-gradient-to-br from-surface/70 via-page to-page p-6 transition-colors duration-500 hover:border-accent/30 sm:p-9"
    >
      <span
        aria-hidden
        className="display pointer-events-none absolute -top-5 right-1 select-none leading-none text-ghost"
        style={{ fontSize: 'clamp(4.5rem,11vw,9rem)' }}
      >
        {p.index}
      </span>

      <Reveal>
        <header className="relative">
          <h3 className="display max-w-[16ch] text-ink" style={{ fontSize: 'var(--text-h2)' }}>
            {p.title}
          </h3>
          <p className="eyebrow mt-3">{p.roleLine}</p>
          <p className="mt-5 max-w-[62ch] text-ink-muted" style={{ fontSize: 'var(--text-lead)', lineHeight: 1.55 }}>
            {p.summary}
          </p>
        </header>
      </Reveal>

      <Reveal delay={1}>
        <dl className="relative mt-8 grid grid-cols-1 divide-y divide-rule overflow-hidden rounded-2xl border border-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {p.metrics.map((m) => (
            <div key={m.label} className="flex flex-col px-5 py-4">
              <dt className="eyebrow order-2 mt-1.5 leading-tight">{m.label}</dt>
              <dd className="display order-1 text-ink" style={{ fontSize: 'clamp(1.35rem,2.6vw,1.9rem)' }}>
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div
        className={`relative mt-10 grid gap-x-12 gap-y-9 border-t border-rule pt-9 md:grid-cols-2 ${
          p.sections.length === 3 ? 'lg:grid-cols-3 lg:gap-x-10' : ''
        }`}
      >
        {p.sections.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i}
            // 3 sections sit three-across on large screens; on tablets the odd last one spans both columns
            className={
              p.sections.length % 2 === 1 && i === p.sections.length - 1
                ? p.sections.length === 3
                  ? 'md:col-span-2 lg:col-span-1'
                  : 'md:col-span-2'
                : undefined
            }
          >
            <div className="border-l-2 border-rule pl-5 transition-colors duration-500 group-hover:border-rule-strong">
              <span className="eyebrow">{s.label}</span>
              <h4
                className="mt-2.5 font-display font-semibold leading-tight tracking-[-0.03em] text-ink"
                style={{ fontSize: 'var(--text-h3)' }}
              >
                {s.heading}
              </h4>
              <p className="mt-3 max-w-[52ch] text-ink-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 1.7 }}>
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <blockquote className="relative mt-10 rounded-2xl border border-accent/25 bg-accent/[0.055] p-6 sm:p-8">
          <span className="eyebrow">What building this taught me</span>
          <p
            className="mt-3 max-w-[54ch] font-display font-medium leading-[1.3] tracking-[-0.02em] text-ink"
            style={{ fontSize: 'var(--text-h3)' }}
          >
            {p.lesson}
          </p>
        </blockquote>
      </Reveal>

      <Reveal>
        <div className="relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ul className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <Tag key={t} mono>
                {t}
              </Tag>
            ))}
          </ul>
          {links.length > 0 && (
            <div className="ml-auto flex shrink-0 flex-wrap items-center gap-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link inline-flex items-center gap-1.5 rounded-full border border-accent/40 px-3.5 py-1.5 text-sm text-accent transition-colors hover:bg-accent hover:text-accent-fg"
                >
                  {l.label}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </article>
  )
}
