import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy-load all pages — each route becomes its own JS chunk,
// so the browser only downloads the code it actually needs.
const Home            = lazy(() => import('./pages/Home'))
const Destinations    = lazy(() => import('./pages/Destinations'))
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'))
const Calendar        = lazy(() => import('./pages/Calendar'))
const Stories         = lazy(() => import('./pages/Stories'))
const Gallery         = lazy(() => import('./pages/Gallery'))
const About           = lazy(() => import('./pages/About'))
const Contact         = lazy(() => import('./pages/Contact'))
const SingleCountry   = lazy(() => import('./pages/SingleCountry'))
const MultiCountry    = lazy(() => import('./pages/MultiCountry'))
const TourPlanner     = lazy(() => import('./pages/TourPlanner'))
const TourPlannerMulti = lazy(() => import('./pages/TourPlannerMulti'))
const CustomTour       = lazy(() => import('./pages/CustomTour'))
const ThankYou         = lazy(() => import('./pages/ThankYou'))
const PrivacyPolicy    = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService   = lazy(() => import('./pages/TermsOfService'))
const CookiePolicy     = lazy(() => import('./pages/CookiePolicy'))

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
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToHash />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
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
                <Route path="/custom-tour" element={<CustomTour />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}
