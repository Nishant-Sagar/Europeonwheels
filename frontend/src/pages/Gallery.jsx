const featured = [
  { url: '/images/swiss-alps.webp',     caption: 'Swiss Alps',            location: 'Switzerland' },
  { url: '/images/gallery-amalfi.webp', caption: 'Amalfi Coastline',      location: 'Italy' },
  { url: '/images/neuschwanstein.webp', caption: 'Neuschwanstein Castle', location: 'Germany' },
]

const photos = [
  { url: '/images/venice.webp',            caption: 'Venice Canals',        location: 'Italy' },
  { url: '/images/hallstatt.webp',         caption: 'Hallstatt Village',    location: 'Austria' },
  { url: '/images/prague-night.webp',      caption: 'Prague Old Town',      location: 'Czech Republic' },
  { url: '/images/dubrovnik-walls.webp',   caption: 'Dubrovnik Walls',      location: 'Croatia' },
  { url: '/images/florence.webp',          caption: 'Florence Skyline',     location: 'Italy' },
  { url: '/images/budapest.webp',          caption: 'Budapest Parliament',  location: 'Hungary' },
  { url: '/images/switzerland.webp',       caption: 'Lake Lucerne',         location: 'Switzerland' },
  { url: '/images/slovenia.webp',          caption: 'Lake Bled',            location: 'Slovenia' },
  { url: '/images/croatia.webp',           caption: 'Dubrovnik Coast',      location: 'Croatia' },
  { url: '/images/austria.webp',           caption: 'Austrian Alps',        location: 'Austria' },
  { url: '/images/germany.webp',           caption: 'Rhine Valley',         location: 'Germany' },
  { url: '/images/italy.webp',             caption: 'Tuscany',              location: 'Italy' },
  { url: '/images/exp-family.webp',        caption: 'Alpine Road',          location: 'Austria' },
  { url: '/images/dest-grand-europe.webp', caption: 'Grand Europe Route',   location: 'Europe' },
  { url: '/images/exp-luxury.webp',        caption: 'Luxury Stay',          location: 'Switzerland' },
  { url: '/images/exp-golf.webp',          caption: 'Golf & Europe',        location: 'Germany' },
  { url: '/images/cta-bg.webp',            caption: 'Swiss Highlands',      location: 'Switzerland' },
  { url: '/images/czech-republic.webp',    caption: 'Charles Bridge',       location: 'Czech Republic' },
  { url: '/images/hungary.webp',           caption: 'Budapest at Dusk',     location: 'Hungary' },
  { url: '/images/slovakia.webp',          caption: 'Bratislava Castle',    location: 'Slovakia' },
]

export default function Gallery() {
  return (
    <>
      {/* Hero — compact so images are immediately visible below */}
      <section className="relative h-[40vh] overflow-hidden text-white">
        <img
          src="/images/swiss-alps.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover hero-drift"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/85" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_40%,rgba(0,0,0,0.45)_100%)]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.38em] text-accent-400">Visual Diary</p>
          <h1 className="text-3xl sm:text-5xl font-bold md:text-6xl" style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}>
            Gallery
          </h1>
          <p className="mt-3 text-sm text-white/55 md:text-base">
            Mountains, coastlines, cities and roads — across nine European countries.
          </p>
        </div>
      </section>

      {/* Featured 3-up — text only on hover */}
      <section className="bg-stone-950 px-5 pt-5 pb-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {featured.map((p) => (
              <div key={p.url} className="group relative h-[420px] cursor-pointer overflow-hidden rounded-2xl">
                <img
                  src={p.url}
                  alt={p.caption}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]" loading="lazy"
                />
                {/* Gradient + text — hover only */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-7 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.32em] text-accent-400">{p.location}</p>
                  <h3 className="text-2xl font-bold text-white">{p.caption}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry collection — text only on hover */}
      <section className="bg-stone-950 px-5 pb-16 pt-0 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
            {photos.map((p) => (
              <div
                key={p.url}
                className="group relative break-inside-avoid cursor-pointer overflow-hidden rounded-xl"
              >
                <img
                  src={p.url}
                  alt={p.caption}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.28em] text-accent-400">{p.location}</p>
                  <p className="text-sm font-semibold text-white">{p.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
