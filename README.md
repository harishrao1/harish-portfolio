# harish-portfolio

Personal portfolio for Harish Rao — a single-page site built with **Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion (motion) + Lenis**.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the build locally
```

## Edit the content (no JSX needed)

Fonts (Geist, Geist Mono) are self-hosted via `@fontsource` in `src/fonts.ts`.

All text lives in `src/data/`:

| File | What it holds |
| --- | --- |
| `profile.ts` | Name, typewriter roles, status, email, socials, bio, education, resume + avatar paths |
| `skills.ts` | Skill groups shown under "My tech arsenal" |
| `experience.ts` | Timeline cards (link a card to a project with `caseStudyId`) |
| `projects.ts` | Case-study cards: 3 metrics, 3–5 sections, lesson, tags, demo/source links |

### Placeholders to replace before launch

- [ ] Rewrite the `lesson` line on each project in your own words (`src/data/projects.ts`)
- [ ] Add `source` GitHub links to projects and a live demo for the NLP Task Extractor
- [ ] Hero code card text: edit `codeCard` in `profile.ts` (keep values short so lines fit on phones)
- [ ] Replace `public/Harish_Rao_Resume.pdf` whenever your resume changes
- [ ] Domain in `index.html` (canonical, og:url, og:image) and add `public/og-image.png` (1200×630)

## Structure

```
src/
  index.css            design tokens (dark + light), .eyebrow / .display / .gutter, keyframes
  App.tsx              section order, Lenis init, skip link
  data/                content
  hooks/               useTheme, useActiveSection, useTypewriter
  lib/scroll.ts        Lenis singleton + scrollToId()
  components/ui        Section, Reveal, Eyebrow, DisplayHeading, Button, Tag, Badge, MetricTiles, icons
  components/layout    Header (pill nav + mobile menu), BackToTop
  components/fx        ParticleNetwork (constellation canvas), CodeCard (typed hero card)
  sections/            Hero, About (+ skills), Experience, Projects, Contact (+ footer)
```

## Deploy

Push to GitHub → import the repo on Vercel (preset "Vite", build `npm run build`, output `dist`) → add your domain under Settings → Domains.
