import { Link } from 'react-router-dom'

const stats = [
  { value: '500+', label: 'Travellers hosted' },
  { value: '9',    label: 'Countries covered' },
  { value: '4.9',  label: 'Avg. rating' },
  { value: '6+',   label: 'Years operating' },
]

const values = [
  { num: '01', title: 'Private, always',            body: 'Every journey runs on private transfers — no shared coaches, no fixed group schedules. Your pace, your vehicle.' },
  { num: '02', title: 'One country or nine',         body: 'Single-country depth or a grand multi-country circuit — we shape the route around your time and interests.' },
  { num: '03', title: 'Selected countries, done well', body: 'Germany, Austria, Czech Republic, Hungary, Slovenia, Slovakia, Croatia, Italy and Switzerland — nine countries we know exceptionally well.' },
  { num: '04', title: 'Built for Indian travellers', body: 'Food preferences, family pace, hotel comfort, shopping time and on-trip support are embedded into every plan.' },
]

const team = [
  { name: 'Lena Fischer',  role: 'Route Operations Lead',     origin: 'Germany',     trips: 'Germany, Austria, Switzerland', img: 'https://i.pravatar.cc/300?img=25' },
  { name: 'Sophie Laurent',role: 'Experience Designer',        origin: 'Switzerland', trips: 'Italy, Switzerland, Austria',   img: 'https://i.pravatar.cc/300?img=20' },
  { name: 'Marco Bianchi', role: 'Luxury and Golf Specialist', origin: 'Italy',       trips: 'Italy, Croatia, Golf + Europe', img: 'https://i.pravatar.cc/300?img=15' },
]

export default function About() {
  return (
    <>
      {/* Hero — full screen, maximum quality image */}
      <section className="relative min-h-screen overflow-hidden text-white">
        <img
          src="/images/about-hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover hero-drift"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/85" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_40%,transparent_30%,rgba(0,0,0,0.5)_100%)]" />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-36 pt-32 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.38em] text-accent-400">Our story</p>
          <h1
            className="max-w-3xl text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
            style={{ textShadow: '0 4px 48px rgba(0,0,0,0.7)' }}
          >
            Private Europe travel, planned around your pace
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/60 md:text-lg" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}>
            Chauffeur-driven journeys crafted for travellers who want comfort, flexibility and a route that feels personal.
          </p>
        </div>

        {/* Stats band */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="mx-auto grid max-w-3xl grid-cols-2 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`py-6 text-center ${i < stats.length - 1 ? 'border-r border-white/10' : ''}`}>
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/45">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story — image + text */}
      <section className="bg-stone-900 px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src="/images/hallstatt.jpg"
                alt="Hallstatt, Austria"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
              <p className="absolute bottom-5 left-5 text-[10px] font-bold uppercase tracking-[0.3em] text-accent-400">Hallstatt · Austria</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold leading-snug text-white sm:text-4xl">
                Europe works best when the local network is strong.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-400">
                <p>We focus on a selected part of Europe because private travel works best when the local network is deep. Our routes span Germany, Austria, Czech Republic, Hungary, Slovenia, Slovakia, Croatia, Italy and Switzerland.</p>
                <p>Some travellers want one country in depth — Italy for food and culture, Switzerland for luxury scenery, Austria for alpine stays. Others want a grand road journey connecting multiple countries without the stress of fixed coach schedules.</p>
                <p>Tell us your time, budget and travel style — we shape the journey around you.</p>
              </div>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-400 px-7 py-3.5 text-sm font-semibold text-stone-950 transition-all duration-300 hover:bg-accent-300 hover:scale-105"
              >
                Plan your trip →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scenic break — full-width image strip */}
      <div className="relative h-64 overflow-hidden sm:h-80">
        <img src="/images/swiss-alps.jpg" alt="" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Values */}
      <section className="bg-stone-950 px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-3xl font-bold text-white sm:text-4xl">How we work</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.num}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.025] p-8 transition-all duration-300 hover:border-accent-500/25 hover:bg-white/[0.05]"
              >
                <p className="mb-2 select-none text-7xl font-black leading-none text-white/[0.04]">{v.num}</p>
                <div className="-mt-6">
                  <h3 className="text-xl font-bold text-white">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">{v.body}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent-400 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-stone-900 px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-3xl font-bold text-white sm:text-4xl">The people behind the plans</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {team.map(({ name, role, origin, trips, img }) => (
              <div
                key={name}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.025] p-8 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05]"
              >
                <img
                  src={img}
                  alt={name}
                  className="h-20 w-20 rounded-full object-cover ring-2 ring-accent-400/25 ring-offset-2 ring-offset-stone-900"
                />
                <h3 className="mt-6 text-xl font-bold text-white">{name}</h3>
                <p className="mt-1 text-sm font-semibold text-accent-400">{role}</p>
                <div className="mt-4 space-y-1 text-sm text-stone-500">
                  <p>From {origin}</p>
                  <p className="text-xs">Plans: {trips}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent-400/50 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
