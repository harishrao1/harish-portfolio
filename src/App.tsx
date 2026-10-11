import { useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import { Header } from './components/layout/Header'
import { BackToTop } from './components/layout/BackToTop'
import { CustomCursor } from './components/fx/CustomCursor'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'
import { useTheme } from './hooks/useTheme'
import { destroyLenis, initLenis, scrollToId } from './lib/scroll'

export default function App() {
  const { theme, toggle } = useTheme()

  useEffect(() => {
    initLenis()
    // honour a deep link like /#projects on first load
    const hash = location.hash.slice(1)
    if (hash) window.setTimeout(() => scrollToId(hash), 300)
    return destroyLenis
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>

      <Header theme={theme} onToggleTheme={toggle} />

      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <BackToTop />
      <CustomCursor />
    </MotionConfig>
  )
}
