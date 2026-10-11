import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { prefersReducedMotion } from '../../lib/scroll'

type Kind = 'kw' | 'var' | 'key' | 'str' | 'bool' | 'punc' | 'com' | 'plain'
type Token = [text: string, kind: Kind]

const color: Record<Kind, string> = {
  kw: 'text-accent',
  var: 'text-ink',
  key: 'text-ink-muted',
  str: 'text-accent-hi',
  bool: 'text-accent',
  punc: 'text-ink-subtle',
  com: 'text-ink-subtle italic',
  plain: 'text-ink',
}

export interface CodeCardData {
  file: string
  variable: string
  fields: { key: string; value: string | string[] | boolean }[]
}

function toLines({ variable, fields }: CodeCardData): Token[][] {
  if (!fields?.length) return []
  const lines: Token[][] = [[['const ', 'kw'], [variable, 'var'], [' = {', 'punc']]]
  for (const f of fields) {
    const line: Token[] = [['  ', 'plain'], [f.key, 'key'], [': ', 'punc']]
    if (typeof f.value === 'boolean') line.push([String(f.value), 'bool'])
    else if (Array.isArray(f.value)) {
      const items = f.value
      line.push(['[', 'punc'])
      items.forEach((v, i) => {
        line.push([`'${v}'`, 'str'])
        if (i < items.length - 1) line.push([', ', 'punc'])
      })
      line.push([']', 'punc'])
    } else line.push([`'${f.value}'`, 'str'])
    line.push([',', 'punc'])
    lines.push(line)
  }
  lines.push([['}', 'punc']])
  return lines
}

/** Slice the token lines to the first `typed` characters; returns where the caret sits. */
function sliceLines(lines: Token[][], typed: number) {
  let budget = typed
  let caretLine = lines.length - 1
  let caretFound = false
  const shown = lines.map((line, li) => {
    const out: Token[] = []
    for (const [text, kind] of line) {
      if (budget <= 0) break
      out.push([text.slice(0, budget), kind])
      budget -= text.length
    }
    if (!caretFound && budget <= 0) {
      caretLine = li
      caretFound = true
    }
    return out
  })
  return { shown, caretLine }
}

/** A floating editor window that types out a small profile object. */
export function CodeCard({ data }: { data?: CodeCardData }) {
  if (!data) return null
  return <CodeCardInner data={data} />
}

function CodeCardInner({ data }: { data: CodeCardData }) {
  const lines = useMemo(() => toLines(data), [data])
  const total = useMemo(() => lines.reduce((n, l) => n + l.reduce((m, [t]) => m + t.length, 0), 0), [lines])
  const [reduced] = useState(prefersReducedMotion)
  const [typed, setTyped] = useState(reduced ? total : 0)

  useEffect(() => {
    if (reduced || typed >= total) return
    const t = window.setTimeout(() => setTyped((n) => Math.min(total, n + 2)), typed === 0 ? 700 : 22)
    return () => window.clearTimeout(t)
  }, [typed, total, reduced])

  // subtle 3D tilt that follows the pointer
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 18 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 })
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const { shown, caretLine } = sliceLines(lines, typed)

  return (
    <div className="relative mx-auto w-[min(27rem,calc(100vw-2.5rem))] [perspective:1000px]">
      {/* soft gold glow + two drifting sparks behind the card */}
      <div aria-hidden className="absolute inset-[-25%] -z-10 bg-[radial-gradient(ellipse_at_center,var(--color-accent)_0%,transparent_60%)] opacity-[0.14]" />
      <span aria-hidden className="absolute -right-3 -top-3 h-2 w-2 animate-[orbit-drift_5s_ease-in-out_infinite] rounded-full bg-accent" />
      <span aria-hidden className="absolute -bottom-2 -left-4 h-1.5 w-1.5 animate-[orbit-drift_7s_ease-in-out_infinite_-2s] rounded-full bg-accent/70" />

      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={reduced ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="overflow-hidden rounded-2xl border border-rule-strong bg-surface/80 text-left shadow-[0_30px_80px_-24px_color-mix(in_srgb,var(--color-ink)_40%,transparent)] backdrop-blur-xl"
      >
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-rule px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule-strong" />
          <span className="ml-2 font-mono text-[0.7rem] tracking-wide text-ink-muted">{data.file}</span>
          <span className="ml-auto font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-subtle">TypeScript</span>
        </div>

        {/* code */}
        <pre
          aria-label={`${data.variable}: ${data.fields.map((f) => `${f.key} ${String(f.value)}`).join(', ')}`}
          className="overflow-hidden px-4 py-4 font-mono text-[10.5px] leading-[1.75] sm:text-[12.5px]"
        >
          <code aria-hidden>
            {shown.map((line, li) => (
              <div key={li} className="flex whitespace-pre">
                <span className="mr-3 w-4 shrink-0 sm:mr-4 select-none text-right text-ink-subtle/60">{li + 1}</span>
                <span>
                  {line.map(([text, kind], ti) => (
                    <span key={ti} className={color[kind]}>
                      {text}
                    </span>
                  ))}
                  {li === caretLine && (
                    <span className="ml-px inline-block h-[1.1em] w-[0.5em] translate-y-[0.18em] animate-blink bg-accent" />
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </motion.div>
    </div>
  )
}
