import { Link } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import TestimonialCard from '../components/TestimonialCard'
import LoadingSpinner from '../components/LoadingSpinner'

const countryTours = [
  {
    country: 'Germany',
    title: 'Frankfurt, Munich, scenic drives and castles',
    image: '/images/germany.webp',
  },
  {
    country: 'Austria',
    title: 'Vienna, Salzburg and alpine beauty',
    image: '/images/austria.webp',
  },
  {
    country: 'Czech Republic',
    title: 'Fairy-tale charm of Prague',
    image: '/images/czech-republic.webp',
  },
  {
    country: 'Hungary',
    title: 'Culture, river views and spas in Budapest',
    image: '/images/hungary.webp',
  },
  {
    country: 'Slovenia',
    title: 'Lake Bled, Ljubljana and alpine-green drives',
    image: '/images/slovenia.webp',
  },
  {
    country: 'Slovakia',
    title: 'Bratislava, castles and relaxed Central Europe routing',
    image: '/images/slovakia.webp',
  },
  {
    country: 'Croatia',
    title: 'Zagreb, coastal extensions and scenic leisure days',
    image: '/images/croatia.webp',
  },
  {
    country: 'Italy',
    title: 'Venice, Florence, Milan and Rome',
    image: '/images/italy.webp',
  },
  {
    country: 'Switzerland',
    title: 'Luxury, mountains and scenic experiences',
    image: '/images/switzerland.webp',
  },
]

const heroCountryCards = countryTours.map((tour, index) => ({
  ...tour,
  tag: index === 0 ? 'Grand routes' : index === 5 ? 'Scenic stays' : index === 8 ? 'Luxury' : 'Private tour',
}))


// span = lg bento grid class; imgPos = object-position for scenic framing
const popularRoutes = [
  {
    label: '4 Countries · 14 Days',
    slug: 'central-europe-loop',
    route: 'Germany → Austria → Czech Republic → Hungary',
    tagline: 'The classic Central Europe circuit',
    cities: ['Frankfurt', 'Vienna', 'Prague', 'Budapest'],
    image: '/images/route-4-countries.webp',
    imgPos: 'object-center',
    tag: 'Most Popular',
    span: 'lg:col-span-2',
  },
  {
    label: '6 Countries · 18 Days',
    slug: 'central-extended',
    route: 'Germany → Austria → Czech → Hungary → Slovenia → Croatia',
    tagline: 'Central Europe extended with Adriatic beauty',
    cities: ['Munich', 'Vienna', 'Prague', 'Budapest', 'Ljubljana', 'Dubrovnik'],
    image: '/images/slovenia.webp',
    imgPos: 'object-center',
    tag: 'Fan Favourite',
    span: 'lg:row-span-2',
  },
  {
    label: '3 Countries · 12 Days',
    slug: 'western-highlights',
    route: 'Germany → Switzerland → Italy',
    tagline: 'Western highlights — Alps and Italian art',
    cities: ['Frankfurt', 'Zurich', 'Venice', 'Florence'],
    image: '/images/route-ger-swi-ita.webp',
    imgPos: 'object-center',
    tag: 'Scenic',
    span: '',
  },
  {
    label: '3 Countries · 10 Days',
    slug: 'alpine-luxury',
    route: 'Austria → Switzerland → Italy',
    tagline: 'Alpine luxury, lakes and culture',
    cities: ['Salzburg', 'Zurich', 'Milan', 'Venice'],
    image: '/images/route-aut-swi-ita.webp',
    imgPos: 'object-center',
    tag: 'Luxury',
    span: '',
  },
  {
    label: '4 Countries · 12 Days',
    slug: 'castle-capital-loop',
    route: 'Czech Republic → Austria → Slovakia → Hungary',
    tagline: 'Cities and castles in a Central Europe loop',
    cities: ['Prague', 'Vienna', 'Bratislava', 'Budapest'],
    image: '/images/route-central-loop.webp',
    imgPos: 'object-bottom',
    tag: 'Compact',
    span: '',
  },
  {
    label: '9 Countries · 25 Days',
    slug: 'grand-nine',
    route: 'Grand 9-Country Europe Road Trip',
    tagline: 'Germany · Austria · Czech · Hungary · Slovenia · Slovakia · Croatia · Italy · Switzerland',
    cities: ['Frankfurt', 'Vienna', 'Prague', 'Budapest', 'Bled', 'Split', 'Venice', 'Zurich'],
    image: '/images/route-grand-9.webp',
    imgPos: 'object-center',
    tag: 'Grand Tour',
    span: 'lg:col-span-2',
  },
]

const travelReasons = [
  {
    icon: 'globe',
    title: 'You only need to get to the airport',
    body: "We handle everything else. Just show up with your documents - we have already taken care of the rest.",
  },
  {
    icon: 'smile',
    title: 'You will travel with the right people',
    body: 'Private chauffeur routes, curated stays and local partners make the journey feel personal, smooth and effortless.',
  },
  {
    icon: 'burst',
    title: 'Expect a touch of adventure',
    body: 'Our journeys are carefully planned, but never rigid. Each trip stays flexible and leaves room for surprises along the way.',
  },
]

const experiences = [
  {
    num: '01',
    eyebrow: 'Flagship',
    title: 'Grand Europe Road Journey',
    body: 'Drive across Europe\'s most iconic cities with a private vehicle, flexible itinerary and premium stays.',
    points: ['Frankfurt to Switzerland', 'Private chauffeur', 'Flexible planning'],
    image: '/images/exp-grand-road.webp',
    overlay: 'bg-primary-900/65',
  },
  {
    num: '02',
    eyebrow: 'Luxury',
    title: 'Luxury Country Experiences',
    body: 'Switzerland escapes, Italy food and culture journeys, and Austria plus Salzburg premium stays.',
    points: ['Scenic hotels', 'Curated dining', 'Relaxed pacing'],
    image: '/images/exp-luxury.webp',
    overlay: 'bg-amber-900/65',
  },
  {
    num: '03',
    eyebrow: 'Family',
    title: 'Family and Leisure',
    body: 'Kid-friendly Europe with theme parks, scenic routes, shorter drives and downtime built in.',
    points: ['Family-ready stays', 'Comfortable drives', 'Flexible days'],
    image: '/images/exp-family.webp',
    overlay: 'bg-emerald-900/65',
  },
  {
    num: '04',
    eyebrow: 'Niche',
    title: 'Golf + Europe',
    body: 'Play across top European golf courses while your sightseeing, transfers and stays are handled.',
    points: ['Golf plus sightseeing', 'Premium courses', 'Private transfers'],
    image: '/images/exp-golf.webp',
    overlay: 'bg-stone-900/60',
  },
]

function WhyIcon({ type }) {
  if (type === 'globe') {
    return (
      <svg viewBox="0 0 96 96" className="h-14 w-14" fill="none" aria-hidden="true">
        <circle cx="48" cy="48" r="38" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="48" cy="48" rx="16" ry="38" stroke="currentColor" strokeWidth="2" />
        <path d="M12 48h72M20 28h56M20 68h56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'smile') {
    return (
      <svg viewBox="0 0 96 96" className="h-14 w-14" fill="none" aria-hidden="true">
        <circle cx="48" cy="48" r="38" stroke="currentColor" strokeWidth="2" />
        <path d="M38 32v14M58 32v14M24 58c7 17 41 17 48 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 96 96" className="h-14 w-14" fill="none" aria-hidden="true">
      <path
        d="M48 6l8 20 18-12-4 22 22 2-18 13 14 17-22 1 4 22-18-13-8 21-8-21-18 13 4-22-22-1 14-17-18-13 22-2-4-22 18 12 8-20z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Home() {
  const { data: testimonials, loading: tLoading } = useApi('/testimonials')

  return (
    <>
      <section className="relative min-h-[100svh] overflow-visible text-white">

        {/* Single background image — infinite slow drift like macOS wallpaper */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/swiss-alps.webp"
            alt=""
            className="h-full w-full object-cover hero-drift"
          />
        </div>

        {/* Gradient overlays for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/80" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

        {/* Hero text */}
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center justify-center px-5 pb-40 pt-28 text-center sm:px-6 lg:pt-32">
          <div className="max-w-6xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-accent-400 sm:text-sm">
              Chauffeur-driven · 9 countries · Private journeys
            </p>
            <h1
              className="text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-8xl"
              style={{ textShadow: '0 4px 40px rgba(0,0,0,0.7)' }}
            >
              Private Europe Tours
            </h1>
            <p
              className="mx-auto mt-5 max-w-4xl text-base leading-7 text-white/90 sm:text-xl sm:leading-8 md:text-3xl"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
            >
              One country or grand multi-country journeys with private chauffeur, curated stays and complete flexibility.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#country-cards"
                className="rounded-full bg-white/10 px-8 py-4 text-base font-semibold text-white shadow-2xl backdrop-blur-sm ring-1 ring-white/25 transition-all duration-300 hover:bg-white/20 hover:scale-105 sm:text-lg"
              >
                View All Destinations
              </a>
              <Link
                to="/custom-tour"
                className="rounded-full bg-accent-400 px-8 py-4 text-base font-semibold text-stone-950 shadow-2xl transition-all duration-300 hover:bg-accent-300 hover:scale-105 sm:text-lg"
              >
                Plan My Trip →
              </Link>
            </div>
          </div>
        </div>

        {/* Country cards carousel */}
        <div id="country-cards" className="absolute inset-x-0 bottom-0 z-20 translate-y-[70%]">
          <div className="overflow-x-auto pb-8 pl-5 pr-0 sm:pl-10 lg:pl-[70px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-5">
              {heroCountryCards.map((tour) => (
                <Link key={tour.country} to={`/plan/${tour.country.toLowerCase().replace(/\s+/g, '-')}`} className="group h-[360px] w-[78vw] shrink-0 overflow-hidden rounded-2xl bg-stone-900 shadow-[0_24px_70px_rgba(0,0,0,0.34)] sm:w-[48vw] lg:w-[calc((100vw-180px)/4.25)]">
                  <div className="relative h-full">
                    <img src={tour.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    <div className="absolute right-5 top-5 rounded-full bg-accent-400 px-5 py-2 text-xs font-bold uppercase tracking-wide text-stone-950">
                      {tour.tag}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Europe on Wheels</p>
                      <h2 className="mt-2 text-3xl font-bold leading-tight text-white">{tour.country}</h2>
                      <p className="mt-3 text-sm leading-6 text-white/85">{tour.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="multi-country" className="bg-stone-50 px-5 pb-20 pt-72 sm:px-6 md:pb-28 md:pt-80">
        <div className="mx-auto max-w-7xl">

          {/* Section intro — flex row on md+, stacked on mobile */}
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-500">
                Multi-country Europe journeys
              </p>
              <h2 className="mt-3 text-2xl font-bold text-stone-900 md:text-3xl">
                Travel Across Europe in One Seamless Trip
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-stone-500">
                Perfect for first-time visitors or families wanting to cover multiple destinations in one comfortable private journey.
              </p>
            </div>
            <Link
              to="/destinations"
              className="group inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-primary-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-primary-800 hover:shadow-xl md:self-auto"
            >
              Explore All Routes
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/*
            Bento grid — layout (3 cols × 3 rows, all 9 cells filled):
              Row 1: [C1 col-span-2 ————] [C2 row-span-2]
              Row 2: [C3]        [C4]      [C2 continued ]
              Row 3: [C5]        [C6 col-span-2 —————————]
          */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[290px]">
            {popularRoutes.map((item) => (
              <Link
                key={item.route}
                to={`/plan-route/${item.slug}`}
                className={`group relative block min-h-[290px] overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 ${item.span}`}
              >
                {/* Scenic photo — fills box exactly */}
                <img
                  src={item.image}
                  alt={item.route}
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08] ${item.imgPos}`} loading="lazy"
                />

                {/* Subtle gradient so image stays bright above the text box */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Tag pill — top left */}
                <div className="absolute left-4 top-4 z-10">
                  <span className="rounded-full bg-accent-400 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-stone-950 shadow-lg">
                    {item.tag}
                  </span>
                </div>

                {/* Frosted glass text box — narrower at rest, full-width on hover */}
                <div className="absolute bottom-0 left-6 right-6 z-10 pb-4 transition-all duration-500 group-hover:left-3 group-hover:right-3">
                  <div className="rounded-xl bg-white/[0.07] p-4 backdrop-blur-[3px] ring-1 ring-white/10">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-400">
                      {item.label}
                    </p>
                    <h3
                      className="mt-1.5 text-base font-bold leading-snug text-white"
                      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
                    >
                      {item.route}
                    </h3>
                    <p className="mt-1 hidden text-xs leading-5 text-white/75 md:block md:text-white/0 md:transition-colors md:duration-300 md:group-hover:text-white/80">
                      {item.tagline}
                    </p>
                    <div className="hidden md:block md:mt-0 md:max-h-0 md:overflow-hidden md:transition-all md:duration-500 md:group-hover:mt-3 md:group-hover:max-h-28">
                      <div className="flex flex-wrap gap-1.5">
                        {item.cities.slice(0, 5).map((c) => (
                          <span
                            key={c}
                            className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 text-sm font-semibold text-accent-400">
                        View Route{' '}
                        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 sm:px-6 md:py-12">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-normal uppercase tracking-[0.04em] text-stone-900">
              WHY TRAVEL WITH US?
            </p>

            <div className="mt-6 border-l-[3px] border-[#d9572a] pl-5">
              <h2 className="max-w-[360px] text-[28px] font-semibold leading-[1.16] tracking-[-0.01em] text-stone-950 sm:text-[34px]">
                We know you love planning your own adventures.
              </h2>
            </div>

            <p className="mt-6 max-w-[430px] text-[14px] leading-[1.5] text-stone-900">
              So do we. That is why we take care of the logistics, the details, and the unexpected twists - so you can focus on the experience, not the stress.
            </p>

            <Link
              to="/about"
              className="mt-5 inline-flex rounded-lg bg-[#d9572a] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#c44720]"
            >
              Discover more about us
            </Link>
          </div>

          <div className="space-y-6 lg:ml-auto lg:w-full lg:max-w-[720px] lg:pt-0">
            {travelReasons.map((item) => (
              <article key={item.title} className="grid gap-5 sm:grid-cols-[66px_1fr] sm:items-start">
                <div className="flex text-stone-950">
                  <WhyIcon type={item.icon} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold leading-snug text-stone-950">{item.title}</h3>
                  <p className="mt-2 max-w-[620px] text-[13px] leading-[1.45] text-stone-900">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="single-country" className="bg-stone-100 px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-500">Single country deep-dive experiences</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-stone-900 sm:text-4xl md:text-5xl">Explore One Country in Depth</h2>
              <p className="mt-3 max-w-2xl text-base text-stone-500 sm:text-lg">Ideal for relaxed travel, repeat visitors or luxury-focused experiences.</p>
            </div>
            <Link
              to="/destinations"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-primary-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-primary-800 hover:shadow-xl md:self-auto"
            >
              Explore Country Tours
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {countryTours.map((tour) => (
              <Link
                key={tour.country}
                to={`/plan/${tour.country.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative block h-52 overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Country photo */}
                <img
                  src={tour.image}
                  alt={tour.country}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]" loading="lazy"
                />

                {/* Gradient — stronger at bottom for text, lighter at top to show scenery */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Bottom content */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3
                    className="text-lg font-bold text-white"
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
                  >
                    {tour.country}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-white/75 md:text-white/0 md:transition-colors md:duration-300 md:group-hover:text-white/80">
                    {tour.title}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold text-accent-400 md:translate-y-1 md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    Explore →
                  </p>
                </div>

                {/* Top-right: subtle country initial badge */}
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white backdrop-blur-sm ring-1 ring-white/20 transition-opacity duration-300 group-hover:opacity-0">
                  {tour.country.slice(0, 2).toUpperCase()}
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      <section id="experiences" className="bg-white px-5 pt-10 sm:px-6 md:pt-12">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-500">Signature experiences</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-stone-900 sm:text-4xl md:text-5xl">Pick the Journey That Fits Your Style</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.map((item) => (
              <article
                key={item.title}
                className="group relative h-72 cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Photo */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]" loading="lazy"
                />

                {/* Colour overlay — unique per experience */}
                <div className={`absolute inset-0 ${item.overlay} transition-opacity duration-500 group-hover:opacity-90`} />

                {/* Large ghost number — design accent */}
                <div className="absolute right-4 top-3 font-black text-white/10 text-7xl leading-none select-none">
                  {item.num}
                </div>

                {/* Title — visible on desktop at rest, hidden on mobile (box is always shown there) */}
                <div className="absolute inset-x-0 bottom-0 hidden p-5 md:block md:transition-opacity md:duration-300 md:group-hover:opacity-0">
                  <h3
                    className="text-base font-bold leading-snug text-white"
                    style={{ textShadow: '0 2px 12px rgba(0,0,0,0.95)' }}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Frosted glass box — always visible on mobile, hover-reveal on desktop */}
                <div className="absolute bottom-0 left-2 right-2 z-10 pb-4 transition-all duration-500 md:left-5 md:right-5 md:translate-y-3 md:opacity-0 md:group-hover:left-2 md:group-hover:right-2 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <div className="rounded-xl bg-white/[0.14] p-4 backdrop-blur-[4px] ring-1 ring-white/20">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-400">
                      {item.eyebrow}
                    </p>
                    <h3
                      className="mt-1.5 text-base font-bold leading-snug text-white"
                      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-white/80">
                      {item.body}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.points.map((pt) => (
                        <span
                          key={pt}
                          className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm"
                        >
                          {pt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      <section className="bg-stone-50 px-5 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-500">Traveler stories</p>
            <h2 className="section-title mt-3">What our travelers say</h2>
          </div>
          {tLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                testimonial={{
                  id: 'featured-switzerland-italy',
                  name: 'Neha A.',
                  country: 'India',
                  destination: 'Switzerland and Italy',
                  rating: 5,
                  text: 'We did both Switzerland and Italy - perfectly customized!',
                  avatar_url: '/images/testimonial-avatar.webp',
                }}
              />
              {(testimonials || []).slice(0, 2).map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-16 text-white sm:px-6 sm:py-20 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/cta-bg.webp')" }}
        />
        <div className="absolute inset-0 bg-primary-900/80" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">One Country or Nine - We Plan It Your Way</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-primary-100 sm:mt-5 sm:text-lg sm:leading-8">
            Tell us your travel style, and we will design a personalized Europe experience around your time, budget and pace.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/custom-tour" className="btn-accent justify-center px-8 py-4">Get Custom Plan</Link>
            <a href="https://wa.me/919108116181?text=Hi%2C%20I%27m%20interested%20in%20a%20Europe%20tour.%20Could%20you%20share%20more%20details%3F" target="_blank" rel="noopener noreferrer" className="btn-outline justify-center border-white text-white hover:bg-white hover:text-stone-900 px-8 py-4">Chat on WhatsApp</a>
          </div>
        </div>
      </section>

    </>
  )
}
