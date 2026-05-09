import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import LoadingSpinner from '../components/LoadingSpinner'

const months = [
  { num: 6, name: 'June 2026' },
  { num: 7, name: 'July 2026' },
  { num: 8, name: 'August 2026' },
  { num: 9, name: 'September 2026' },
]

function spotsColor(left, total) {
  const pct = left / total
  if (pct > 0.5) return 'text-green-600'
  if (pct > 0.2) return 'text-amber-600'
  return 'text-red-500'
}

export default function Calendar() {
  const [activeMonth, setActiveMonth] = useState(null)
  const params = activeMonth ? { month: activeMonth } : {}
  const { data: trips, loading } = useApi('/trips', params)

  return (
    <>
      <section className="bg-primary-900 text-white pt-24 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent-400 font-medium uppercase tracking-widest text-sm mb-3">Plan ahead</p>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-4">Upcoming Trips</h1>
          <p className="text-primary-200 text-lg">Spots are limited. Once a trip fills, it's gone.</p>
        </div>
      </section>

      {/* Month filter */}
      <section className="border-b border-stone-200 bg-white sticky top-20 z-30 py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-stone-500">Month:</span>
          <button
            onClick={() => setActiveMonth(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${!activeMonth ? 'bg-primary-700 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
          >
            All
          </button>
          {months.map(({ num, name }) => (
            <button
              key={num}
              onClick={() => setActiveMonth(num)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeMonth === num ? 'bg-primary-700 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
            >
              {name}
            </button>
          ))}
        </div>
      </section>

      <section className="py-14 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-6">
              {(trips || []).map((trip) => (
                <div key={trip.id} className="card flex flex-col md:flex-row overflow-hidden">
                  <div className="md:w-48 h-40 md:h-auto shrink-0 overflow-hidden">
                    <img src={trip.image_url} alt={trip.destination_name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex flex-col md:flex-row flex-1 p-6 gap-6 items-start md:items-center justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-stone-900">{trip.destination_name}</h3>
                      <p className="text-stone-400 text-sm mb-3">{trip.destination_country}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-stone-600">📅 {new Date(trip.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} → {new Date(trip.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span className={`font-medium ${spotsColor(trip.spots_left, trip.spots_total)}`}>
                          {trip.spots_left === 0 ? 'Fully booked' : `${trip.spots_left} spot${trip.spots_left !== 1 ? 's' : ''} left`}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-display text-2xl font-bold text-primary-700">€{trip.price_eur.toLocaleString()}</p>
                      <p className="text-stone-400 text-xs mb-3">per person</p>
                      <Link
                        to="/contact"
                        className={`btn-primary text-sm py-2 px-5 ${trip.spots_left === 0 ? 'opacity-40 pointer-events-none' : ''}`}
                      >
                        {trip.spots_left === 0 ? 'Sold out' : 'Book Now'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
