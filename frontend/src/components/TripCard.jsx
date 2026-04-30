import { Link } from 'react-router-dom'

const difficultyColor = {
  Easy: 'bg-green-100 text-green-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Challenging: 'bg-red-100 text-red-700',
}

export default function TripCard({ destination }) {
  const { slug, name, country, description, duration_days, price_eur, difficulty, transport, image_url, highlights, rating, reviews_count, tags } = destination

  return (
    <Link to={`/destinations/${slug}`} className="card group cursor-pointer block">
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={image_url}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`badge ${difficultyColor[difficulty] || 'bg-stone-100 text-stone-700'}`}>
            {difficulty}
          </span>
          <span className="badge bg-white/90 text-stone-700">{transport}</span>
        </div>
        <div className="absolute bottom-4 right-4 bg-white/90 rounded-xl px-3 py-1.5 text-right">
          <p className="text-xs text-stone-500">from</p>
          <p className="text-lg font-bold text-primary-700">€{price_eur.toLocaleString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-display text-xl font-semibold text-stone-900 group-hover:text-primary-700 transition-colors">{name}</h3>
            <p className="text-stone-500 text-sm">{country}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-amber-500 font-semibold text-sm">★ {rating}</p>
            <p className="text-stone-400 text-xs">{reviews_count} reviews</p>
          </div>
        </div>

        <p className="text-stone-600 text-sm leading-relaxed line-clamp-2 mt-2">{description}</p>

        {/* Highlights */}
        <div className="mt-4 flex flex-wrap gap-1">
          {highlights.slice(0, 3).map((h) => (
            <span key={h} className="badge bg-primary-50 text-primary-700">{h}</span>
          ))}
          {highlights.length > 3 && (
            <span className="badge bg-stone-100 text-stone-500">+{highlights.length - 3} more</span>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-sm">
          <span className="text-stone-500">{duration_days} days</span>
          <span className="text-primary-600 font-medium group-hover:underline">View trip →</span>
        </div>
      </div>
    </Link>
  )
}
