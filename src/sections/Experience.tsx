import { experience } from '../data/experience'
import type { Job } from '../types'
import { AnchorLink, Badge, Reveal, Section, Tag } from '../components/ui'

export function Experience() {
  return (
    <Section
      id="experience"
      num="02"
      label="Experience"
      title="Where I’ve worked."
      intro="3+ years building enterprise B2B SaaS — analytics and no-code builders, schema-driven forms, real-time voice, and the performance and delivery work behind them."
      tinted
    >
      <div className="relative">
        <span aria-hidden className="absolute bottom-10 left-2 top-10 w-px bg-rule-strong" />
        <ol className="flex flex-col gap-5">
          {experience.map((job, i) => (
            <li key={`${job.company}-${job.role}`} className="relative pl-8 sm:pl-12">
              <span
                aria-hidden
                className="absolute left-[calc(0.5rem-5px)] top-9 h-[11px] w-[11px] rounded-full bg-accent ring-4 ring-page"
                style={{ boxShadow: '0 0 12px 1px var(--color-accent)' }}
              />
              <Reveal delay={i}>
                <JobCard job={job} />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

function JobCard({ job }: { job: Job }) {
  return (
    <article className="rounded-2xl border border-rule bg-gradient-to-br from-surface/70 via-page to-page p-6 transition-colors duration-500 hover:border-accent/40 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="flex items-center gap-2">
              <BriefcaseIcon />
              <h3 className="font-display font-semibold leading-tight tracking-[-0.03em] text-ink" style={{ fontSize: 'var(--text-h3)' }}>
                {job.company}
              </h3>
            </span>
            {job.current && <Badge>Current</Badge>}
          </div>
          <p className="mt-1.5 font-medium text-ink-muted" style={{ fontSize: 'var(--text-body)' }}>
            {job.role}
          </p>
        </div>
        <div className="shrink-0 text-left sm:text-right">
          <p className="font-mono text-xs tracking-wide text-ink-subtle">
            {job.start} — {job.end}
          </p>
          <p className="mt-1 font-mono text-[0.68rem] tracking-wide text-ink-subtle">{job.location}</p>
        </div>
      </div>

      <p className="mt-5 max-w-[68ch] text-ink-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 1.7 }}>
        {job.summary}
      </p>

      {job.highlights && job.highlights.length > 0 && (
        <ul className="mt-4 grid max-w-[80ch] gap-2.5 sm:grid-cols-2 sm:gap-x-8">
          {job.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-ink-muted" style={{ fontSize: 'var(--text-body)', lineHeight: 1.6 }}>
              <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <ul className="flex flex-wrap gap-2">
          {job.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </ul>
        {job.caseStudyId && (
          <AnchorLink
            to={`project-${job.caseStudyId}`}
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm text-accent transition-colors hover:text-ink"
          >
            Read the case study
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </AnchorLink>
        )}
      </div>
    </article>
  )
}

const BriefcaseIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-accent">
    <rect x="2.5" y="7" width="19" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <path d="M2.5 12.5h19" />
  </svg>
)
