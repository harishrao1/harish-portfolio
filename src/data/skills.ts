import type { SkillGroup } from '../types'

// Six groups of five keeps the grid even on desktop.
export const skills: SkillGroup[] = [
  {
    title: 'Languages',
    icon: 'code',
    items: [
      { name: 'TypeScript', note: 'Strict typing' },
      { name: 'JavaScript', note: 'ES6+ & async' },
      { name: 'Python', note: 'Scripting & AI' },
      { name: 'HTML5', note: 'Semantic markup' },
      { name: 'CSS3', note: 'Layout & motion' },
    ],
  },
  {
    title: 'Frontend',
    icon: 'layers',
    items: [
      { name: 'React', note: 'Component UI' },
      { name: 'Next.js', note: 'App Router' },
      { name: 'Redux Toolkit · Zustand', note: 'State management' },
      { name: 'Tailwind CSS', note: 'Utility-first' },
      { name: 'Turborepo', note: 'Monorepos' },
    ],
  },
  {
    title: 'Data viz',
    icon: 'chart',
    items: [
      { name: 'ECharts', note: 'Analytics charts' },
      { name: 'AG Grid', note: 'Data grids' },
      { name: 'TanStack Table', note: 'Headless tables' },
      { name: 'Nivo Charts', note: 'Dashboards' },
      { name: 'Pivot Tables', note: 'Report builder' },
    ],
  },
  {
    title: 'Performance',
    icon: 'bolt',
    items: [
      { name: 'Webpack · Vite', note: 'Build tooling' },
      { name: 'Code splitting', note: 'Lazy routes' },
      { name: 'Tree shaking', note: 'Smaller bundles' },
      { name: 'Virtualization', note: 'Large lists' },
      { name: 'Core Web Vitals', note: 'Perf budgets' },
    ],
  },
  {
    title: 'Real-time & AI',
    icon: 'spark',
    items: [
      { name: 'WebRTC', note: 'LiveKit' },
      { name: 'Server-Sent Events', note: 'Streaming UI' },
      { name: 'Web Workers', note: 'Off-main-thread' },
      { name: 'LLM APIs', note: 'Groq · LLaMA' },
      { name: 'Transformers.js', note: 'On-device ML' },
    ],
  },
  {
    title: 'Testing & DevOps',
    icon: 'shield',
    items: [
      { name: 'Playwright · Cypress', note: 'E2E testing' },
      { name: 'Jest · RTL', note: 'Unit testing' },
      { name: 'Sentry', note: 'Observability' },
      { name: 'GitHub Actions', note: 'CI/CD' },
      { name: 'Docker · Node.js', note: 'Backend & ops' },
    ],
  },
]
