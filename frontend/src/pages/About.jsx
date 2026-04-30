const team = [
  { name: 'Lena Fischer', role: 'Route Operations Lead', origin: 'Germany', trips: 'Germany, Austria, Switzerland', img: 'https://i.pravatar.cc/300?img=25' },
  { name: 'Sophie Laurent', role: 'Experience Designer', origin: 'Switzerland', trips: 'Italy, Switzerland, Austria', img: 'https://i.pravatar.cc/300?img=20' },
  { name: 'Marco Bianchi', role: 'Luxury and Golf Specialist', origin: 'Italy', trips: 'Italy, Croatia, Golf + Europe', img: 'https://i.pravatar.cc/300?img=15' },
]

const values = [
  { label: 'Private', title: 'Chauffeur-led comfort', body: 'Every journey is planned around private transfers, flexible timings and comfortable routing.' },
  { label: 'Curated', title: 'One country or many', body: 'We help you choose between single-country depth and a seamless multi-country Europe route.' },
  { label: 'Focused', title: 'Selected countries only', body: 'We work across Germany, Austria, Czech Republic, Hungary, Slovenia, Slovakia, Croatia, Italy and Switzerland.' },
  { label: 'Personal', title: 'Designed for Indian travelers', body: 'Food preferences, family pace, hotel comfort, shopping time and support are built into the plan.' },
]

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-40">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/exp-family.jpg')" }} />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent-500">Our story</p>
          <h1 className="text-5xl font-bold text-stone-900 md:text-6xl">
            Private Europe travel, planned around your pace
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-500">
            Europe on Wheels creates chauffeur-driven single-country and multi-country journeys for travelers who want comfort, flexibility and a route that feels personal.
          </p>
        </div>
      </section>

      <section className="bg-stone-100 px-6 py-20">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-stone-600">
          <p>
            We focus on a selected part of Europe because private travel works best when the local network is strong. Our routes are built around Germany, Austria, Czech Republic, Hungary, Slovenia, Slovakia, Croatia, Italy and Switzerland.
          </p>
          <p>
            Some travelers want one country in depth: Italy for food and culture, Switzerland for luxury scenery, Austria for alpine stays, or Germany for castles and scenic drives. Others want a grand road journey that connects multiple countries without the stress of fixed coach schedules.
          </p>
          <p>
            The promise is simple: tell us your time, budget and travel style, and we shape the journey around you.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="section-title">How we do it</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {values.map(({ label, title, body }) => (
              <div key={title} className="flex gap-5 rounded-lg bg-stone-50 p-8">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-700 text-xs font-bold uppercase tracking-wider text-white">
                  {label.slice(0, 2)}
                </span>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-stone-900">{title}</h3>
                  <p className="leading-relaxed text-stone-500">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="section-title">The people behind the plans</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {team.map(({ name, role, origin, trips, img }) => (
              <div key={name} className="card overflow-visible text-center">
                <div className="p-8 pb-0">
                  <img src={img} alt={name} className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-primary-100" />
                </div>
                <div className="p-8 pt-4">
                  <h3 className="text-xl font-bold text-stone-900">{name}</h3>
                  <p className="mb-3 text-sm font-medium text-primary-600">{role}</p>
                  <p className="text-sm text-stone-500">From {origin}</p>
                  <p className="mt-2 text-xs text-stone-400">Plans: {trips}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
