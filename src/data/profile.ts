import type { Profile } from '../types'

export const profile: Profile = {
  name: 'Harish Rao',
  firstName: 'Harish',
  wordmark: 'harish',
  roles: ['SDE II · Frontend', 'React & Next.js Engineer', 'Data Visualization', 'AI-powered Interfaces', 'Real-time WebRTC UIs'],
  status: 'Open to work',
  statuses: ['Open to new roles', 'SDE II · Frontend', 'Based in Hyderabad', 'Available for full-time'],
  location: 'Hyderabad, India',
  email: 'harishrao1846@gmail.com',
  resumeUrl: '/Harish_Rao_Resume.pdf',
  // Typed out in the hero card — keep each value short so lines fit on phones.
  codeCard: {
    file: 'harish.ts',
    variable: 'harish',
    fields: [
      { key: 'role', value: 'SDE II (Frontend)' },
      { key: 'experience', value: '3+ years' },
      { key: 'stack', value: ['React', 'Next.js', 'TypeScript'] },
      { key: 'builds', value: 'B2B SaaS platforms' },
      { key: 'based', value: 'Hyderabad, IN' },
      { key: 'openToWork', value: true },
    ],
  },
  bio: [
    [
      { text: 'Software engineer', em: true },
      {
        text: ' with 3+ years building enterprise B2B SaaS products in TypeScript, React, Next.js and Python — frontend architecture, schema-driven builders, data visualization, real-time WebRTC and AI-powered interfaces.',
      },
    ],
    [
      { text: 'At ' },
      { text: 'Extraaedge', em: true },
      { text: ' I own features end to end, from architecture to production support — including ' },
      { text: '34% faster load times', em: true },
      { text: ' and ' },
      { text: '83% faster deployments', em: true },
      { text: '.' },
    ],
  ],
  education: [
    {
      school: 'Guru Nanak Institute of Technology',
      degree: 'B.Tech · GNIT, Hyderabad',
      meta: '2016 — 2020',
    },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/harishrao1', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/harishrao-rangineni-669b99233/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:harishrao1846@gmail.com', icon: 'mail' },
  ],
}
