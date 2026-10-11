import type { Job } from '../types'

export const experience: Job[] = [
  {
    company: 'Extraaedge',
    role: 'Software Development Engineer II (Frontend)',
    start: '08/2023',
    end: 'Present',
    location: 'Pune, India',
    current: true,
    summary:
      'Building the frontend of an enterprise admissions CRM on Next.js and Turborepo — analytics and a no-code Report Builder, a schema-driven Application Form engine, counselor-facing CRM modules and a real-time AI voice agent — and owning the performance, CI/CD and production support around them.',
    highlights: [
      '~60% faster client report turnaround with a no-code Report Builder',
      'Form engine powering admissions for 20K+ applicants a year',
      '~30% counselor efficiency from Communications, Installments and Filters modules',
      '34% faster initial load after cutting a 20 MB+ upfront bundle',
      '83% faster deployments — 30 min to 5 min across 5 tiers',
      '100+ production issues resolved within 24–48 hours, no regressions',
    ],
    tags: ['Next.js', 'Turborepo', 'ECharts', 'AG Grid', 'LiveKit / WebRTC', 'GitHub Actions'],
    caseStudyId: 'report-builder',
  },
  {
    company: 'Crio.Do',
    role: 'Software Development Intern (Full-Stack)',
    start: '12/2022',
    end: '08/2023',
    location: 'Remote, India',
    summary:
      'Built React and Node.js apps across e-commerce, video and travel (QKart, XFlix, QTrip) with REST APIs, token-based auth, debounced search, responsive UIs and Jest tests.',
    tags: ['React', 'Node.js', 'REST APIs', 'Jest'],
  },
]
