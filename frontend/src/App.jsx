import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import Calendar from './pages/Calendar'
import Stories from './pages/Stories'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import SingleCountry from './pages/SingleCountry'
import MultiCountry from './pages/MultiCountry'
import TourPlanner from './pages/TourPlanner'
import TourPlannerMulti from './pages/TourPlannerMulti'

function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const id = hash.replace('#', '')
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [hash, pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:slug" element={<DestinationDetail />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/single-country" element={<SingleCountry />} />
            <Route path="/multi-country" element={<MultiCountry />} />
            <Route path="/plan/:country" element={<TourPlanner />} />
            <Route path="/plan-route/:slug" element={<TourPlannerMulti />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
