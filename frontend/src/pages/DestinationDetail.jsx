import { useParams, Link } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import LoadingSpinner from '../components/LoadingSpinner'

const difficultyColor = {
  Easy: 'bg-green-100 text-green-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Challenging: 'bg-red-100 text-red-700',
}

export default function DestinationDetail() {
  const { slug } = useParams()
  const { data: dest, loading, error } = useApi(`/destinations/${slug}`)

  if (loading) return <div className="pt-32"><LoadingSpinner /></div>
  if (error || !dest) return (
    <div className="pt-40 text-center">
      <p className="text-5xl mb-4">🗺️</p>
      <h2 className="font-display text-3xl font-bold text-stone-800 mb-4">Destination not found</h2>
      <Link to="/destinations" className="btn-primary">Back to destinations</Link>
    </div>
  )

  return (
    <>
      {/* Hero image */}
      <section className="relative h-[70vh] overflow-hidden">
        <img src={dest.image_url} alt={dest.name} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-4xl">
          <div className="flex gap-3 mb-4">
            <span className={`badge ${difficultyColor[dest.difficulty]}`}>{dest.difficulty}</span>
            <span className="badge bg-white/90 text-stone-700">{dest.transport}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-2">{dest.name}</h1>
          <p className="text-white/70 text-lg">{dest.country}</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: details */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">About this trip</h2>
              <p className="text-stone-600 leading-relaxed text-lg">{dest.description}</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">Highlights</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dest.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-stone-700">
                    <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {dest.tags.map((t) => (
                  <span key={t} className="badge bg-stone-100 text-stone-600 capitalize">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-28">
              <div className="text-center mb-6">
                <p className="text-stone-400 text-sm">Starting from</p>
                <p className="font-display text-4xl font-bold text-primary-700">€{dest.price_eur.toLocaleString()}</p>
                <p className="text-stone-400 text-sm">per person</p>
              </div>

              <div className="space-y-3 border-t border-stone-100 pt-6 mb-6">
                {[
                  ['Duration', `${dest.duration_days} days`],
                  ['Group size', `Max ${dest.max_group_size} people`],
                  ['Difficulty', dest.difficulty],
                  ['Transport', dest.transport],
                  ['Rating', `★ ${dest.rating} (${dest.reviews_count} reviews)`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-stone-400">{k}</span>
                    <span className="font-medium text-stone-800">{v}</span>
                  </div>
                ))}
              </div>

              <Link to="/calendar" className="btn-primary w-full justify-center">
                Check Availability
              </Link>
              <Link to="/contact" className="btn-outline w-full justify-center mt-3">
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
