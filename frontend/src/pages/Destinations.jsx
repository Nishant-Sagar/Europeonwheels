import { Link } from 'react-router-dom'

const countries = [
  'Germany', 'Austria', 'Czech Republic', 'Hungary',
  'Slovenia', 'Slovakia', 'Croatia', 'Italy', 'Switzerland',
]

const singleFeatures = [
  '7 – 14 day itineraries',
  'Private chauffeur throughout',
  'Hotels curated to your budget',
  'Flexible daily pace — no fixed schedule',
  'Deep cultural immersion',
  'Food, stays & off-the-beaten-path stops',
]

const multiFeatures = [
  '14 – 21 day circuits',
  '2 to 5 countries in one journey',
  'Cross-border private transfers',
  'No shared coaches or group schedules',
  'Scenic stopovers planned in advance',
  'Single point of contact throughout',
]

const sampleRoutes = [
  { name: 'Central Europe Loop',  leg: 'Germany · Austria · Czech Republic · Hungary', days: '14 days' },
  { name: 'Alps & Adriatic',      leg: 'Austria · Slovenia · Croatia',                 days: '10 days' },
  { name: 'The Grand Nine',       leg: 'All nine countries',                            days: '21 days' },
  { name: 'Italian Circuit',      leg: 'Italy · Switzerland · Austria',                days: '12 days' },
]

const customPerks = [
  { icon: '🗓️', label: 'Any duration' },
  { icon: '🌍', label: 'Any combination of countries' },
  { icon: '🏨', label: 'Luxury or comfort stays' },
  { icon: '🎭', label: 'Food, culture or scenic focus' },
  { icon: '👨‍👩‍👧', label: 'Family, couple or group travel' },
  { icon: '📞', label: 'Dedicated planner, start to finish' },
]

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-accent-400">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  )
}

export default function Destinations() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: '62vh' }}>
        <img
          src="/images/dubrovnik-hero.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover hero-drift"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-stone-900" />

        <div
          className="relative z-10 flex flex-col items-center justify-center px-5 pb-12 pt-24 text-center sm:px-6 sm:pt-32"
          style={{ minHeight: '62vh' }}
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.42em] text-accent-400">Private Europe tours</p>
          <h1
            className="text-3xl font-bold leading-tight sm:text-5xl lg:whitespace-nowrap lg:text-6xl"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
          >
            Find the journey that fits you
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-7 text-white/82 sm:text-base">
            Single-country depth, multi-country circuits, or a fully bespoke experience — all private, chauffeur-driven.
          </p>

          {/* Jump links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[['#single', 'Single Country'], ['#multi', 'Multi Country'], ['#custom', 'Custom Tour']].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-lg border border-white/25 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/40"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 01 Single Country ── */}
      <section id="single" className="bg-gradient-to-b from-stone-900 to-stone-950 px-5 pb-10 pt-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">

            {/* Text */}
            <div>
              <p className="select-none text-8xl font-black leading-none text-white/[0.04]">01</p>
              <div className="-mt-10">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-accent-400">Single Country</p>
                <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                  One destination.<br />Done properly.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-stone-400">
                  Pick any one of our nine countries and we'll build a private itinerary that goes beyond the highlights —
                  the right hotels, the right drives, the right stops. No rushing, no groups.
                </p>

                <ul className="mt-7 space-y-3">
                  {singleFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-stone-300">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Country pills */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {countries.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-stone-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <Link
                  to="/single-country"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent-400 px-7 py-3 text-sm font-semibold text-stone-950 transition-all duration-300 hover:bg-accent-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-400/25"
                >
                  Explore single country trips →
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl">
              <img
                src="/images/switzerland.webp"
                alt="Lake Lucerne, Switzerland"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-400">Lake Lucerne · Switzerland</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── 02 Multi Country ── */}
      <section id="multi" className="bg-gradient-to-b from-stone-950 to-stone-900 px-5 pb-20 pt-0 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">

            {/* Image — left on large */}
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl lg:order-first">
              <img
                src="/images/dest-grand-europe.webp"
                alt="Grand Europe Route"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-400">Grand Europe Route</p>
              </div>
            </div>

            {/* Text — right on large */}
            <div>
              <p className="select-none text-8xl font-black leading-none text-white/[0.04]">02</p>
              <div className="-mt-10">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-accent-400">Multi Country</p>
                <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                  The grand<br />European circuit.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-stone-400">
                  Connect two to five countries in a single seamless journey. Private transfers across borders,
                  pre-planned scenic stopovers and a route shaped around what you want to see — not a coach operator's timetable.
                </p>

                <ul className="mt-7 space-y-3">
                  {multiFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-stone-300">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Sample routes */}
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {sampleRoutes.map((r) => (
                    <div
                      key={r.name}
                      className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 transition-colors hover:border-white/10 hover:bg-white/[0.06]"
                    >
                      <p className="text-sm font-semibold text-white">{r.name}</p>
                      <p className="mt-1 text-[11px] text-stone-500">{r.leg}</p>
                      <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-accent-400">{r.days}</p>
                    </div>
                  ))}
                </div>

                <Link
                  to="/multi-country"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent-400 px-7 py-3 text-sm font-semibold text-stone-950 transition-all duration-300 hover:bg-accent-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-400/25"
                >
                  Explore multi country circuits →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 Custom Tour ── full-bleed with overlay */}
      <section id="custom" className="relative overflow-hidden">
        <img
          src="/images/exp-luxury.webp"
          alt="Luxury Custom Tour"
          className="absolute inset-0 h-full w-full object-cover" loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/70 to-stone-950/20" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-stone-900 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-8">
          <p className="select-none text-8xl font-black leading-none text-white/[0.06]">03</p>
          <div className="-mt-10 max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-accent-400">Custom Tour</p>
            <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              Your Europe,<br />built from scratch.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/90">
              No templates. No fixed packages. Tell us your travel dates, group size, interests and budget —
              we design the entire journey around you. Luxury stays, golf courses, family-friendly pacing,
              food trails — whatever your Europe looks like, we plan it privately.
            </p>
          </div>

          {/* Perk tiles */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {customPerks.map((p) => (
              <div
                key={p.label}
                className="rounded-2xl border border-white/25 bg-white/10 px-4 py-5 text-center backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/40"
              >
                <p className="text-2xl">{p.icon}</p>
                <p className="mt-2 text-xs font-semibold text-white">{p.label}</p>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent-400 px-8 py-3.5 text-sm font-semibold text-stone-950 transition-all duration-300 hover:bg-accent-300 hover:scale-105 hover:shadow-xl hover:shadow-accent-400/30"
          >
            Start planning your custom tour →
          </Link>
        </div>
      </section>
    </>
  )
}
