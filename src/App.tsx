import { SmoothScrollProvider } from './components/layout/SmoothScrollProvider'
import { ScrollProgressBar } from './components/layout/ScrollProgressBar'
import { GridOverlay } from './components/layout/GridOverlay'
import { NoiseOverlay } from './components/layout/NoiseOverlay'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Tracks } from './components/sections/Tracks'
import { Timeline } from './components/sections/Timeline'
import { Prizes } from './components/sections/Prizes'
import { Judging } from './components/sections/Judging'
import { Rules } from './components/sections/Rules'
import { Faq } from './components/sections/Faq'
import { Register } from './components/sections/Register'
import { Organizers } from './components/sections/Organizers'

function App() {
  return (
    <SmoothScrollProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      <GridOverlay />
      <NoiseOverlay />
      <ScrollProgressBar />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Tracks />
        <Timeline />
        <Prizes />
        <Judging />
        <Rules />
        <Faq />
        <Register />
        <Organizers />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}

export default App
