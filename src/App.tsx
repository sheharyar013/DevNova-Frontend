import { TopBar } from './components/Navbar'
import Hero, { TechMarquee } from './components/Hero'
import Services, { Games, Products } from './components/Services'
import Work from './components/Work'
import Industries from './components/Industries'
import Process from './components/Process'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen w-full bg-white">
      <TopBar />
      <Hero />
      <TechMarquee />
      <Services />
      <Products />
      <Games />
      <Work />
      <Industries />
      <Process />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
