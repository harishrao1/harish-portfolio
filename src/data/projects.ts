import type { Project } from '../types'

/**
 * Case studies built from the resume. Facts and numbers come from it;
 * the "lesson" lines are drafts — rewrite them in your own words.
 */
export const projects: Project[] = [
  {
    id: 'report-builder',
    index: '01',
    title: 'Analytics & No-code Report Builder',
    roleLine: 'SDE II (Frontend) · Extraaedge · 2023 — Present',
    summary:
      'An analytics dashboard and a no-code Report Builder for admissions teams — charts, grids and pivot tables that clients configure themselves instead of waiting on hand-written JSON.',
    metrics: [
      { value: '~60%', label: 'Faster report turnaround' },
      { value: '0', label: 'Manual JSON configs' },
      { value: '4', label: 'Viz engines combined' },
    ],
    sections: [
      {
        label: 'The problem',
        heading: 'Every report was a JSON file someone had to write.',
        body: 'Client reports were defined through manual JSON configurations, so each new report or change waited on an engineer and turnaround was slow.',
      },
      {
        label: 'The decision',
        heading: 'Let admins build reports themselves.',
        body: 'I led end-to-end development of the analytics dashboard and a no-code Report Builder, so reports are composed in a UI and saved as configuration — no hand-written JSON.',
      },
      {
        label: 'The system',
        heading: 'ECharts, AG Grid, TanStack Table and pivots.',
        body: 'Charts in ECharts, large data grids in AG Grid and TanStack Table, and pivot tables for cross-tab analysis — all driven by the same report configuration.',
      },
    ],
    lesson:
      'The fastest report is the one a client can build without filing a ticket — turning configuration into a UI removed the engineer from the loop.',
    tags: ['React', 'Next.js', 'ECharts', 'AG Grid', 'TanStack Table', 'Pivot Tables'],
  },
  {
    id: 'form-engine',
    index: '02',
    title: 'Schema-driven Application Form Engine',
    roleLine: 'SDE II (Frontend) · Extraaedge',
    summary:
      'A form engine built from scratch: a builder for admins and a dynamic renderer for applicants, powering admission forms for more than 20,000 applicants every year.',
    metrics: [
      { value: '20K+', label: 'Applicants a year' },
      { value: '2', label: 'Builder + renderer' },
      { value: '1', label: 'Monorepo, shared logic' },
    ],
    sections: [
      {
        label: 'The engine',
        heading: 'Describe the form once, render it anywhere.',
        body: 'I architected a schema-driven engine: admins design forms in a builder, and a dynamic renderer turns the same schema into the applicant experience.',
      },
      {
        label: 'The hard parts',
        heading: 'Conditional logic, multi-step flows, validation.',
        body: 'Fields that appear based on earlier answers, multi-step journeys with saved progress, and validation rules defined in the schema rather than in code.',
      },
      {
        label: 'The consolidation',
        heading: 'One monorepo, independent deployables.',
        body: 'I merged the standalone Application Form into the CRM Turborepo, removing duplicated Builder and rendering logic while keeping independent builds and deployment targets.',
      },
    ],
    lesson:
      'A good schema is the real product: once the format was right, the builder, the renderer and validation all became views of the same data.',
    tags: ['React', 'Next.js', 'TypeScript', 'Schema-driven UI', 'Turborepo'],
  },
  {
    id: 'voice-agent',
    index: '03',
    title: 'Real-time AI Voice Agent',
    roleLine: 'SDE II (Frontend) · Extraaedge',
    summary:
      'Frontend for AI voice calling over WebRTC using LiveKit — the part that has to keep working when the browser, the network or the user does something unexpected.',
    metrics: [
      { value: 'WebRTC', label: 'LiveKit transport' },
      { value: 'Multi-tab', label: 'Session handling' },
      { value: 'E2E', label: 'Frontend ownership' },
    ],
    sections: [
      {
        label: 'The stakes',
        heading: 'A call can’t just show an error and retry.',
        body: 'Voice is real-time and stateful. If the UI loses track of the call, the person on the other end hears silence — so the frontend has to model the call, not just display it.',
      },
      {
        label: 'The edge cases',
        heading: 'Permissions, drops and duplicate tabs.',
        body: 'I owned the frontend implementation, handling browser media permissions, network interruptions, the full call lifecycle and multi-tab scenarios where the same user opens the app twice.',
      },
      {
        label: 'The approach',
        heading: 'Explicit call states over scattered flags.',
        body: 'Treating the call as a lifecycle of clear states makes every interruption a known transition — connecting, live, reconnecting, ended — instead of a combination of booleans to debug.',
      },
    ],
    lesson:
      'With real-time media, the happy path is the easy 20% — the work is in permissions, reconnects and the second tab nobody planned for.',
    tags: ['React', 'TypeScript', 'LiveKit', 'WebRTC'],
  },
  {
    id: 'performance-delivery',
    index: '04',
    title: 'Performance, Delivery & Reliability',
    roleLine: 'SDE II (Frontend) · Extraaedge',
    summary:
      'Making the product fast to load, fast to ship and safe to run: a 20 MB+ upfront bundle, half-hour deployments, render crashes in production, and a steady stream of client issues.',
    metrics: [
      { value: '34%', label: 'Faster initial load' },
      { value: '83%', label: 'Faster deploys (30 → 5 min)' },
      { value: '100+', label: 'Prod issues resolved' },
    ],
    sections: [
      {
        label: 'The bundle',
        heading: '20 MB+ before you could even log in.',
        body: 'Everything shipped up front — even the login page. Route-level code splitting, lazy loading and tree shaking cut what loads first and reduced initial load time by 34%.',
      },
      {
        label: 'The pipeline',
        heading: 'Thirty-minute deploys down to five.',
        body: 'I optimized multi-stage GitHub Actions pipelines across 5 deployment tiers, cutting deployment time by 83%.',
      },
      {
        label: 'The crashes',
        heading: 'VirtualSelect across 180+ files.',
        body: 'Render crashes were reaching production. I led a migration to VirtualSelect across 180+ files, which eliminated them.',
      },
      {
        label: 'Ownership',
        heading: 'Fixes in 24–48 hours, without regressions.',
        body: 'I own triage and resolution of client-reported production issues across the CRM, Application Form and Widget — 100+ resolved by finding root causes rather than patching symptoms.',
      },
    ],
    lesson:
      'Speed compounds: a smaller bundle helps every user on every visit, and a five-minute pipeline turns a hotfix into a routine release instead of an event.',
    tags: ['Webpack', 'Code splitting', 'Tree shaking', 'Virtualization', 'GitHub Actions'],
  },
  {
    id: 'ai-mock-interviewer',
    index: '05',
    title: 'AI Mock Interviewer',
    roleLine: 'Side project · 2025',
    summary:
      'An interview-prep platform that generates role-specific questions from a job description and streams the model’s responses into the UI in real time.',
    metrics: [
      { value: 'SSE', label: 'Streaming responses' },
      { value: 'LLaMA 3.1', label: 'Via Groq API' },
      { value: '1', label: 'Batched evaluation call' },
    ],
    sections: [
      {
        label: 'The idea',
        heading: 'Questions from the job you actually want.',
        body: 'Paste a job description, get questions for that role — generated by LLaMA 3.1 through the Groq API.',
      },
      {
        label: 'The interface',
        heading: 'Stream it with Server-Sent Events.',
        body: 'Model responses stream to the UI over SSE, so answers appear as they’re generated instead of after a long wait.',
      },
      {
        label: 'The state',
        heading: 'One store, one evaluation request.',
        body: 'State lives in Zustand, and answer evaluation is batched into a single API call so scoring stays off the main UI flow.',
      },
    ],
    lesson:
      'Batching the evaluation into one request made the app both cheaper to run and simpler to reason about.',
    tags: ['React', 'TypeScript', 'Zustand', 'Groq API', 'SSE'],
    demo: 'https://ai-mock-interviewer-coral.vercel.app/',
  },
  {
    id: 'nlp-task-extractor',
    index: '06',
    title: 'Client-Side NLP Task Extractor',
    roleLine: 'Side project · 2025',
    summary:
      'Extracts actionable tasks from text entirely in the browser with Transformers.js — no data is sent to an external API.',
    metrics: [
      { value: 'On-device', label: 'Inference' },
      { value: '0', label: 'External API calls' },
      { value: 'Web Workers', label: 'Off the main thread' },
    ],
    sections: [
      {
        label: 'The constraint',
        heading: 'Private by design.',
        body: 'Running the model with Transformers.js keeps the user’s text on their device — nothing is sent to a server for inference.',
      },
      {
        label: 'The hard part',
        heading: 'ML in the browser without freezing it.',
        body: 'Model loading and inference run in Web Workers, keeping compute-heavy work off the main thread so the UI stays responsive.',
      },
    ],
    lesson: 'In-browser ML is mostly a scheduling problem: where the work runs matters as much as the model.',
    tags: ['React', 'TypeScript', 'Transformers.js', 'Web Workers'],
  },
]
