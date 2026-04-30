import { Link } from 'react-router-dom'

const routes = [
  {
    label: '4 Countries · 14 Days',
    name: 'Central Europe Loop',
    slug: 'central-europe-loop',
    route: 'Germany → Austria → Czech Republic → Hungary',
    cities: ['Frankfurt', 'Vienna', 'Prague', 'Budapest'],
    image: '/images/route-4-countries.jpg',
    tag: 'Most Popular',
    tagline: 'The classic Central Europe circuit — cities, culture and grand architecture',
    span: 'lg:col-span-2',
  },
  {
    label: '6 Countries · 18 Days',
    name: 'Central Extended',
    slug: 'central-extended',
    route: 'Germany → Austria → Czech → Hungary → Slovenia → Croatia',
    cities: ['Munich', 'Vienna', 'Prague', 'Budapest', 'Ljubljana', 'Dubrovnik'],
    image: '/images/slovenia.jpg',
    tag: 'Fan Favourite',
    tagline: 'Central Europe with Adriatic beauty — from Alps to the coast',
    span: 'lg:row-span-2',
  },
  {
    label: '3 Countries · 12 Days',
    name: 'Western Highlights',
    slug: 'western-highlights',
    route: 'Germany → Switzerland → Italy',
    cities: ['Frankfurt', 'Zurich', 'Venice', 'Florence'],
    image: '/images/route-ger-swi-ita.jpg',
    tag: 'Scenic',
    tagline: 'Alps, art and Italian culture in one sweeping arc',
    span: '',
  },
  {
    label: '3 Countries · 10 Days',
    name: 'Alpine Luxury',
    slug: 'alpine-luxury',
    route: 'Austria → Switzerland → Italy',
    cities: ['Salzburg', 'Zurich', 'Milan', 'Venice'],
    image: '/images/route-aut-swi-ita.jpg',
    tag: 'Luxury',
    tagline: 'Alpine lakes, luxury hotels and Italian elegance',
    span: '',
  },
  {
    label: '4 Countries · 12 Days',
    name: 'Castle & Capital Loop',
    slug: 'castle-capital-loop',
    route: 'Czech Republic → Austria → Slovakia → Hungary',
    cities: ['Prague', 'Vienna', 'Bratislava', 'Budapest'],
    image: '/images/route-central-loop.jpg',
    tag: 'Compact',
    tagline: 'Four capitals and countless castles in a compact, efficient circuit',
    span: '',
  },
  {
    label: '9 Countries · 25 Days',
    name: 'The Grand Nine',
    slug: 'grand-nine',
    route: 'Germany · Austria · Czech · Hungary · Slovenia · Slovakia · Croatia · Italy · Switzerland',
    cities: ['Frankfurt', 'Vienna', 'Prague', 'Budapest', 'Bled', 'Split', 'Venice', 'Zurich'],
    image: '/images/route-grand-9.jpg',
    tag: 'Grand Tour',
    tagline: 'All nine countries in one epic private journey — the definitive Europe road trip',
    span: 'lg:col-span-2',
  },
]

const steps = [
  { num: '01', title: 'Tell us your plan', body: 'Share your travel dates, countries of interest, group size and budget — takes 2 minutes.' },
  { num: '02', title: 'We design the route', body: 'Your planner crafts a private day-by-day itinerary with hotels, transfers and stops.' },
  { num: '03', title: 'You travel privately', body: 'Your dedicated chauffeur handles everything on the road. You just enjoy the journey.' },
]

const included = [
  'Private chauffeur for all cross-country transfers',
  '14–21 day personalised itinerary',
  'Hotels curated at each destination',
  'No shared coaches or group schedules',
  'Scenic stopovers planned in advance',
  'Border crossing logistics handled',
  'Single planner, start to finish',
  'On-trip WhatsApp support',
]

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-accent-400">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  )
}

export default function MultiCountry() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: '68vh' }}>
        <img
          src="/images/multi-country-hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover hero-drift"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-stone-950" />

        <div
          className="relative z-10 flex flex-col items-center justify-center px-5 pb-12 pt-24 text-center sm:px-6 sm:pt-32"
          style={{ minHeight: '68vh' }}
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.42em] text-accent-400">Multi Country Tour</p>
          <h1
            className="text-4xl font-bold leading-tight sm:text-5xl lg:whitespace-nowrap lg:text-6xl"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.65)' }}
          >
            The grand European circuit.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-7 text-white/55 md:text-lg md:leading-8">
            Connect two to five countries — or all nine — in one seamless private journey with no shared coaches, no fixed groups and no stress.
          </p>
          <a
            href="#routes"
            className="mt-8 rounded-lg border border-white/25 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
          >
            See popular routes ↓
          </a>
        </div>
      </section>

      {/* ── Routes grid ── */}
      <section id="routes" className="bg-stone-950 px-5 pb-20 pt-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Popular circuits</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Choose your route</h2>
          </div>

          <div className="grid auto-rows-[260px] gap-4 sm:auto-rows-[300px] sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((r) => (
              <Link
                key={r.name}
                to={`/plan-route/${r.slug}`}
                className={`group relative block overflow-hidden rounded-2xl cursor-pointer ${r.span}`}
              >
                <img
                  src={r.image}
                  alt={r.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Tag */}
                <div className="absolute left-4 top-4 rounded-full bg-accent-400 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-950">
                  {r.tag}
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-400">{r.label}</p>
                  <h3 className="mt-1.5 text-xl font-bold text-white">{r.name}</h3>
                  <p className="mt-1 text-sm text-white/60">{r.tagline}</p>

                  {/* City pills — slide up on hover */}
                  <div className="mt-3 max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-40">
                    <div className="flex flex-wrap gap-1.5">
                      {r.cities.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-400 group-hover:text-accent-300 transition-colors">
                      Plan this circuit →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-gradient-to-b from-stone-950 to-stone-900 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">The process</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">How it works</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.num} className="relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8">
                <p className="select-none text-7xl font-black leading-none text-white/[0.05]">{s.num}</p>
                <div className="-mt-6">
                  <h3 className="text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">{s.body}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-accent-400/60 to-transparent rounded-b-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="bg-stone-900 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Every circuit includes</p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Every border crossed.<br />Every detail planned.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-400">
                Multi-country travel has a lot of moving parts. We handle every one of them — so you cross from Vienna to Prague to Budapest without a single logistical worry.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-400 px-7 py-3.5 text-sm font-semibold text-stone-950 transition-all duration-300 hover:bg-accent-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-400/25"
              >
                Plan your circuit →
              </Link>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5 text-sm text-stone-300">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <img src="/images/dubrovnik-got.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/75 to-stone-950/25" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Ready for the grand circuit?</p>
          <h2 className="max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Tell us your countries.<br />We'll connect the dots.
          </h2>
          <p className="mt-5 max-w-md text-base text-white/65">
            Share your dates, preferred countries and group size — we'll design a seamless private route within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-400 px-8 py-3.5 text-sm font-semibold text-stone-950 transition-all duration-300 hover:bg-accent-300 hover:scale-105"
            >
              Start planning →
            </Link>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              Back to all tours
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
