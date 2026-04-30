import { Link } from 'react-router-dom'

const countries = [
  {
    country: 'Germany',
    image: '/images/germany.webp',
    tagline: 'Castles, autobahns and culture',
    duration: '7–10 days',
    highlights: ['Neuschwanstein Castle', 'Munich Altstadt', 'Rhine Valley', 'Black Forest'],
  },
  {
    country: 'Austria',
    image: '/images/austria.webp',
    tagline: 'Vienna, Salzburg and the Alps',
    duration: '7–10 days',
    highlights: ['Vienna Old Town', 'Hallstatt Village', 'Salzburg', 'Alpine Drives'],
  },
  {
    country: 'Czech Republic',
    image: '/images/czech-republic.webp',
    tagline: 'Fairy-tale Prague and beyond',
    duration: '5–8 days',
    highlights: ['Prague Old Town', 'Charles Bridge', 'Český Krumlov', 'Karlovy Vary'],
  },
  {
    country: 'Hungary',
    image: '/images/hungary.webp',
    tagline: 'Culture, spas and river views',
    duration: '5–8 days',
    highlights: ['Budapest Parliament', 'Thermal Baths', 'Danube Bend', 'Castle Hill'],
  },
  {
    country: 'Slovenia',
    image: '/images/slovenia.webp',
    tagline: 'Lake Bled and alpine-green drives',
    duration: '5–7 days',
    highlights: ['Lake Bled', 'Ljubljana', 'Triglav National Park', 'Soča Valley'],
  },
  {
    country: 'Slovakia',
    image: '/images/slovakia.webp',
    tagline: 'Bratislava, castles and quiet roads',
    duration: '4–6 days',
    highlights: ['Bratislava Old Town', 'Spiš Castle', 'High Tatras', 'Slovak Karst'],
  },
  {
    country: 'Croatia',
    image: '/images/croatia.webp',
    tagline: 'Dubrovnik walls and coastal drives',
    duration: '7–10 days',
    highlights: ["King's Landing · Dubrovnik", 'Split', 'Plitvice Lakes', 'Istrian Coast'],
  },
  {
    country: 'Italy',
    image: '/images/italy.webp',
    tagline: 'Venice, Florence, Rome and Tuscany',
    duration: '10–14 days',
    highlights: ['Venice Canals', 'Florence & Uffizi', 'Tuscany Countryside', 'Amalfi Coast'],
  },
  {
    country: 'Switzerland',
    image: '/images/switzerland.webp',
    tagline: 'Luxury, mountains and scenic railways',
    duration: '7–10 days',
    highlights: ['Lake Lucerne', 'Jungfrau Region', 'Zurich', 'Interlaken'],
  },
]

const included = [
  'Private chauffeur throughout the trip',
  'Hotels curated to your budget and style',
  'Flexible daily pace — no fixed schedule',
  'Personalised route planning before you travel',
  'Local knowledge, hidden gems and scenic stops',
  'Pre-trip planning call with your dedicated planner',
  'On-trip WhatsApp support at all times',
  'All cross-city transfers within the country',
]

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-accent-400">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  )
}

export default function SingleCountry() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: '68vh' }}>
        <img
          src="/images/single-country-hero.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover hero-drift"
          fetchpriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-stone-950" />

        <div
          className="relative z-10 flex flex-col items-center justify-center px-5 pb-12 pt-24 text-center sm:px-6 sm:pt-32"
          style={{ minHeight: '68vh' }}
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.42em] text-accent-400">Single Country Tour</p>
          <h1
            className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.65)' }}
          >
            One country. Done properly.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/65 sm:text-base md:text-lg">
            Pick any of our nine countries and we'll build a private itinerary that goes beyond the highlights — the right hotels, the right drives, the right stops.
          </p>
          <a
            href="#countries"
            className="mt-6 rounded-lg border border-white/25 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 sm:mt-8 sm:px-7 sm:py-3"
          >
            Choose your country ↓
          </a>
        </div>
      </section>

      {/* ── Countries grid ── */}
      <section id="countries" className="bg-stone-950 px-5 pb-20 pt-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Nine destinations</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Choose your country</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((c) => (
              <Link
                key={c.country}
                to={`/plan/${c.country.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative block overflow-hidden rounded-2xl"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.country}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]" loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Duration badge */}
                  <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {c.duration}
                  </div>

                  {/* Country name — always visible */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-2xl font-bold text-white">{c.country}</h3>
                    <p className="mt-1 text-sm text-white/65">{c.tagline}</p>

                    {/* Highlights + CTA — slide up on hover */}
                    <div className="mt-3 max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-40">
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {c.highlights.map((h) => (
                          <span
                            key={h}
                            className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-400 group-hover:text-accent-300 transition-colors">
                        Plan this trip →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="bg-gradient-to-b from-stone-950 to-stone-900 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Every single-country trip includes</p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Everything handled.<br />Nothing left to chance.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-400">
                From the first planning call to the last transfer home — we take care of every detail so you can focus entirely on the experience.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-400 px-7 py-3.5 text-sm font-semibold text-stone-950 transition-all duration-300 hover:bg-accent-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-400/25"
              >
                Plan your single country trip →
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
        <img src="/images/winter-alps.webp" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/75 to-stone-950/30" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Ready to go?</p>
          <h2 className="max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Tell us your country.<br />We'll plan the rest.
          </h2>
          <p className="mt-5 max-w-md text-base text-white/65">
            Share your travel dates, group size and budget — we'll come back with a private itinerary within 24 hours.
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
