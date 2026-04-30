import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import TripCard from '../components/TripCard'
import LoadingSpinner from '../components/LoadingSpinner'

const difficulties = ['All', 'Easy']
const tags = ['All', 'multi-country', 'single-country', 'luxury', 'family', 'golf', 'culture']

export default function Destinations() {
  const [difficulty, setDifficulty] = useState('All')
  const [tag, setTag] = useState('All')

  const params = {}
  if (difficulty !== 'All') params.difficulty = difficulty
  if (tag !== 'All') params.tag = tag

  const { data: destinations, loading } = useApi('/destinations', params)

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-900 text-white pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent-400 font-medium uppercase tracking-widest text-sm mb-3">Private Europe tours</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Multi-Country and Single Country Tours</h1>
          <p className="text-primary-200 text-lg">
            Germany, Austria, Czech Republic, Hungary, Slovenia, Slovakia, Croatia, Italy and Switzerland, planned around your pace.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-stone-200 bg-white sticky top-20 z-30 py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-stone-500">Pace:</span>
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${difficulty === d ? 'bg-primary-700 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-stone-500">Type:</span>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${tag === t ? 'bg-accent-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingSpinner />
          ) : destinations?.length === 0 ? (
            <div className="text-center py-24 text-stone-400">
              <p className="text-4xl mb-4">🗺️</p>
              <p className="text-lg">No destinations match your filters.</p>
            </div>
          ) : (
            <>
              <p className="text-stone-500 text-sm mb-8">{destinations?.length} destination{destinations?.length !== 1 ? 's' : ''} found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(destinations || []).map((dest) => (
                  <TripCard key={dest.id} destination={dest} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
