export interface Social {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'x' | 'mail'
}

export interface Profile {
  name: string
  firstName: string
  wordmark: string
  roles: string[]
  status: string
  /** rotating lines in the hero badge */
  statuses: string[]
  location: string
  email: string
  resumeUrl: string
  /** the typed code card in the hero */
  codeCard: {
    file: string
    variable: string
    fields: { key: string; value: string | string[] | boolean }[]
  }
  /** paragraphs as segments; em: true renders in gold */
  bio: { text: string; em?: boolean }[][]
  education: { school: string; degree: string; meta: string }[]
  socials: Social[]
}

export interface SkillGroup {
  title: string
  icon: 'code' | 'layers' | 'chart' | 'bolt' | 'cloud' | 'shield' | 'spark'
  items: { name: string; note: string }[]
}

export interface Job {
  company: string
  role: string
  start: string
  end: string
  location: string
  current?: boolean
  summary: string
  /** short achievement bullets shown under the summary */
  highlights?: string[]
  tags: string[]
  /** id of a Project to deep-link with "Read the case study" */
  caseStudyId?: string
}

export interface ProjectSection {
  label: string
  heading: string
  body: string
}

export interface Project {
  id: string
  index: string
  title: string
  roleLine: string
  summary: string
  /** exactly three tiles */
  metrics: { value: string; label: string }[]
  /** three to five sub-sections */
  sections: ProjectSection[]
  lesson: string
  tags: string[]
  demo?: string
  source?: string
}
