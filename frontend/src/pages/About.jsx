import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FRAME_STYLE = `
  @keyframes shimmerSweep {
    0%   { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(250%)  skewX(-12deg); }
  }
  @keyframes borderGlow {
    0%, 100% { opacity: 0.55; }
    50%       { opacity: 1;    }
  }
  .founder-frame { animation: borderGlow 3s ease-in-out infinite; }
  .founder-shimmer { animation: shimmerSweep 3.5s ease-in-out infinite; }
`

const stats = [
  { value: '500+', label: 'Travellers hosted' },
  { value: '9',    label: 'Countries covered' },
  { value: '4.9',  label: 'Avg. rating' },
  { value: '6+',   label: 'Years operating' },
]

const values = [
  { num: '01', title: 'Private, always',              body: 'Every journey runs on private transfers — no shared coaches, no fixed group schedules. Your pace, your vehicle.' },
  { num: '02', title: 'One country or nine',           body: 'Single-country depth or a grand multi-country circuit — we shape the route around your time and interests.' },
  { num: '03', title: 'Selected countries, done well', body: 'Germany, Austria, Czech Republic, Hungary, Slovenia, Slovakia, Croatia, Italy and Switzerland — nine countries we know exceptionally well.' },
  { num: '04', title: 'Built for Indian travellers',   body: 'Food preferences, family pace, hotel comfort, shopping time and on-trip support are embedded into every plan.' },
]

const team = [
  {
    name: 'Krithika',
    role: 'Founder & Travel Designer',
    origin: 'India',
    bio: 'A passionate traveller and experienced travel designer, Krithika curates seamless European journeys filled with scenic routes, meaningful experiences, and effortless planning. With a strong background in event planning and personalized travel experiences, she carefully designs every itinerary around each traveller\'s pace, comfort, interests, and travel style.',
    details: [
      'From charming countryside drives and iconic cities to hidden local experiences, every journey is created with attention to detail, comfort, and ease — allowing travellers to enjoy Europe stress-free while creating unforgettable memories along the way.',
    ],
    tagline: 'Driven by passion. Designed for unforgettable journeys.',
    img: '/images/team-operations.jpeg',
    imgPos: '50% 0%',
  },
  {
    name: 'Antonio',
    role: 'Co-Founder & Local European Expert',
    origin: 'Croatia',
    bio: 'Born and raised in Croatia, Antonio brings deep local knowledge and a genuine instinct for uncovering Europe\'s most scenic routes and authentic experiences. Travelling with him feels like exploring the continent with a trusted local friend who knows exactly where the magic lies.',
    details: [
      'Antonio leads the local side of the planning, checking routes, drive times, seasonal details and the small stops that make a private European journey feel special.',
      'His on-ground network helps travellers go beyond standard sightseeing with better viewpoints, smoother transfers, local restaurant ideas and flexible day plans.',
    ],
    tagline: 'Where local knowledge meets unforgettable adventure.',
    img: '/images/team-experience.jpeg',
    imgPos: '50% 25%',
  },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us — Europe on Wheels</title>
        <meta name="description" content="Meet the team behind Europe on Wheels — passionate travellers who plan bespoke chauffeur-driven journeys across Germany, Italy, Croatia, Switzerland and more." />
        <meta property="og:title" content="About Us — Europe on Wheels" />
        <meta property="og:description" content="Passionate travellers behind bespoke chauffeur-driven European road journeys." />
        <meta property="og:url" content="https://www.europeonwheels.in/about" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.europeonwheels.in/about" />
      </Helmet>
      {/* ── Hero ── full-screen, drifting image, stats band */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: '78vh' }}>
        <img
          src="/images/swiss-alps.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover hero-drift"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-stone-900" />

        <div className="relative z-10 flex flex-col items-center justify-center px-5 pb-12 pt-24 text-center sm:px-6 sm:pt-28" style={{ minHeight: '78vh' }}>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.42em] text-accent-400">Our story</p>
          <h1
            className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
            style={{ textShadow: '0 4px 48px rgba(0,0,0,0.65)' }}
          >
            Private Europe travel,<br />
            planned around your pace
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl text-sm text-white/60 sm:mt-6 sm:text-base md:text-lg"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}
          >
            Chauffeur-driven journeys crafted for travellers who want comfort, flexibility and a route that feels personal.
          </p>

          {/* Stats — frosted glass cards */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-5 py-4 sm:px-7 sm:py-5 backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:border-white/25"
              >
                <p className="text-3xl font-black text-accent-400" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
                  {s.value}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story ── image left, text right */}
      <section className="bg-gradient-to-b from-stone-900 to-stone-950 px-5 pb-24 pt-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

            {/* Image */}
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl">
              <img
                src="/images/hallstatt.webp"
                alt="Hallstatt, Austria"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              {/* Location badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-400">Hallstatt · Austria</p>
              </div>
            </div>

            {/* Text */}
            <div>
              {/* Decorative rule */}
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-accent-400" />
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent-400">Who we are</p>
              </div>

              <h2 className="text-3xl font-bold leading-snug text-white sm:text-4xl">
                Europe works best when the local network is strong.
              </h2>

              <div className="mt-7 space-y-4 text-base leading-relaxed text-stone-400">
                <p>
                  We focus on a selected part of Europe because private travel works best when the local network is deep.
                  Our routes span Germany, Austria, Czech Republic, Hungary, Slovenia, Slovakia, Croatia, Italy and Switzerland.
                </p>
                <p>
                  Some travellers want one country in depth — Italy for food and culture, Switzerland for luxury scenery,
                  Austria for alpine stays. Others want a grand road journey connecting multiple countries without the stress
                  of fixed coach schedules.
                </p>
                <p>Tell us your time, budget and travel style — we shape the journey around you.</p>
              </div>

              <Link
                to="/contact"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent-400 px-8 py-3.5 text-sm font-semibold text-stone-950 transition-all duration-300 hover:bg-accent-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-400/25"
              >
                Plan your trip →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scenic break ── GoT Dubrovnik */}
      <div className="relative h-72 overflow-hidden sm:h-[420px]">
        <img
          src="/images/dubrovnik-got.webp"
          alt="Dubrovnik, Croatia — King's Landing"
          className="h-full w-full object-cover object-center" loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-stone-950 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-stone-950 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="max-w-2xl text-xl font-bold italic text-white/90 sm:text-3xl" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}>
            "Every road has a story. We help you live the right one."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-px w-8 bg-accent-400/70" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent-400">Europe on Wheels</p>
            <span className="h-px w-8 bg-accent-400/70" />
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-white/35">Dubrovnik · Croatia · King's Landing</p>
        </div>
      </div>

      {/* ── Values ── 2×2 numbered cards */}
      <section className="bg-gradient-to-b from-stone-950 to-stone-900 px-5 pb-24 pt-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex items-end justify-between">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Our approach</p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">How we work</h2>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => {
              const themes = [
                { wrap: 'bg-amber-950/20  border-amber-500/15  hover:border-amber-400/50  hover:bg-amber-950/60',  num: 'text-amber-400/[0.07]',   line: 'bg-amber-400'   },
                { wrap: 'bg-sky-950/20    border-sky-500/15    hover:border-sky-400/50    hover:bg-sky-950/60',    num: 'text-sky-400/[0.07]',     line: 'bg-sky-400'     },
                { wrap: 'bg-emerald-950/20 border-emerald-500/15 hover:border-emerald-400/50 hover:bg-emerald-950/60', num: 'text-emerald-400/[0.07]', line: 'bg-emerald-400' },
                { wrap: 'bg-violet-950/20 border-violet-500/15 hover:border-violet-400/50 hover:bg-violet-950/60', num: 'text-violet-400/[0.07]',   line: 'bg-violet-400'  },
              ]
              const t = themes[i]
              return (
                <div
                  key={v.num}
                  className={`group relative overflow-hidden rounded-2xl border p-5 sm:p-8 transition-all duration-300 ${t.wrap}`}
                >
                  <p className={`mb-1 select-none text-8xl font-black leading-none transition-colors duration-300 ${t.num}`}>
                    {v.num}
                  </p>
                  <div className="-mt-8">
                    <h3 className="text-xl font-bold text-white">{v.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-400">{v.body}</p>
                  </div>
                  <div className={`absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full ${t.line}`} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <style>{FRAME_STYLE}</style>
      <section className="bg-gradient-to-b from-stone-900 to-stone-950 px-5 pb-24 pt-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">The people</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Behind the plans</h2>
          </div>

          <div className="mx-auto max-w-3xl">
            {team.map(({ name, role, origin, bio, details, tagline, img, imgPos }, i) => (
              <div
                key={name}
                className={`flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-10 ${i > 0 ? 'mt-12 border-t border-white/[0.06] pt-12' : ''}`}
              >
                {/* Photo frame */}
                <div className="relative shrink-0 mx-auto sm:mx-0">
                  {/* Ambient glow behind the frame */}
                  <div className="absolute -inset-2 rounded-3xl blur-xl"
                    style={{ background: 'linear-gradient(135deg,rgba(245,158,11,0.35),rgba(120,53,15,0.2))' }} />

                  {/* Gradient border */}
                  <div
                    className="founder-frame relative rounded-2xl p-[1.5px]"
                    style={{ background: 'linear-gradient(145deg,rgba(245,158,11,0.8),rgba(120,53,15,0.4) 50%,rgba(245,158,11,0.6))' }}
                  >
                    <div className="relative overflow-hidden rounded-[14px]">
                      <img
                        src={img}
                        alt={name}
                        className="h-52 w-44 object-cover sm:h-48 sm:w-36"
                        style={{ objectPosition: imgPos }}
                        loading="lazy"
                      />
                      {/* Shimmer sweep */}
                      <div className="founder-shimmer pointer-events-none absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    </div>
                  </div>

                  {/* Corner accents */}
                  {[['top-0 left-0','top-0 left-0','top-0 left-0'],
                    ['top-0 right-0','top-0 right-0','top-0 right-0'],
                    ['bottom-0 left-0','bottom-0 left-0','bottom-0 left-0'],
                    ['bottom-0 right-0','bottom-0 right-0','bottom-0 right-0'],
                  ].map((_, ci) => {
                    const pos  = ['-top-2 -left-2','-top-2 -right-2','-bottom-2 -left-2','-bottom-2 -right-2'][ci]
                    const vBar = ['top-0 left-0','top-0 right-0','bottom-0 left-0','bottom-0 right-0'][ci]
                    const hBar = ['top-0 left-0','top-0 right-0','bottom-0 left-0','bottom-0 right-0'][ci]
                    return (
                      <div key={ci} className={`absolute ${pos} h-5 w-5`}>
                        <div className={`absolute ${vBar} h-full w-[1.5px] bg-accent-400/80`} />
                        <div className={`absolute ${hBar} h-[1.5px] w-full bg-accent-400/80`} />
                      </div>
                    )
                  })}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-white">{name}</h3>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-400">{role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-stone-400 text-left">{bio}</p>
                  {details?.length > 0 && (
                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-stone-400 text-left">
                      {details.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  )}
                  {tagline && (
                    <p className="mt-3 text-sm italic text-stone-300">"{tagline}"</p>
                  )}
                  <p className="mt-3 text-xs font-medium text-stone-500">{origin}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
