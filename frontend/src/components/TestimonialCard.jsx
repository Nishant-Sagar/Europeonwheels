export default function TestimonialCard({ testimonial }) {
  const { name, country, destination, rating, text, avatar_url } = testimonial

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-4 h-full">
      <div className="flex text-amber-400 gap-0.5">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p className="text-stone-700 leading-relaxed italic flex-1">"{text}"</p>
      <div className="flex items-center gap-4 mt-2">
        <img src={avatar_url} alt={name} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
        <div>
          <p className="font-semibold text-stone-900">{name}</p>
          <p className="text-stone-400 text-sm">{country} · {destination}</p>
        </div>
      </div>
    </div>
  )
}
