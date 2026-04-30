const countries = [
  {
    name: 'Germany',
    flag: '🇩🇪',
    tagline: 'Castles, autobahns and deep forest roads',
    image: '/images/germany.jpg',
    highlights: [
      'Neuschwanstein Castle, Bavaria',
      'Cologne Cathedral & Rhine River',
      'Black Forest scenic drives',
      'Romantic Road — Würzburg to Füssen',
      'Munich\'s Marienplatz & English Garden',
    ],
    cuisine: [
      'Bratwurst & pretzels at a Bavarian beer garden',
      'Schnitzel Wiener Art with potato salad',
      'Black Forest cake (Schwarzwälder Kirschtorte)',
      'Fresh Weisswurst with sweet mustard',
    ],
    activities: [
      'Drive the Alpine Road from Munich to Berchtesgaden',
      'Rhine Valley castle-hopping by car',
      'Christmas markets in December (Nuremberg, Cologne)',
      'Hiking trails in Berchtesgaden National Park',
      'Exploring WWII history in Berlin',
    ],
  },
  {
    name: 'Austria',
    flag: '🇦🇹',
    tagline: 'Alpine grandeur and imperial cities',
    image: '/images/austria.jpg',
    highlights: [
      'Schönbrunn Palace & Belvedere, Vienna',
      'Hallstatt — the world\'s most photographed village',
      'Grossglockner High Alpine Road',
      'Salzburg\'s Old Town & Mozart birthplace',
      'Innsbruck and Nordkette mountain ridge',
    ],
    cuisine: [
      'Wiener Schnitzel — the original',
      'Sachertorte with whipped cream, Hotel Sacher',
      'Tiroler Gröstl (pan-fried potatoes, beef & egg)',
      'Apfelstrudel warm from a Viennese coffeehouse',
    ],
    activities: [
      'Drive the Grossglockner — highest paved alpine pass',
      'Vienna Opera House evening performance',
      'Boat trip on Lake Hallstatt',
      'Salt mine tour underneath Hallstatt village',
      'Skiing or summer hiking in the Tirol Alps',
    ],
  },
  {
    name: 'Czech Republic',
    flag: '🇨🇿',
    tagline: 'Fairy-tale spires and medieval squares',
    image: '/images/czech-republic.jpg',
    highlights: [
      'Prague Old Town Square & Astronomical Clock',
      'Charles Bridge at sunrise',
      'Český Krumlov — UNESCO castle town',
      'Kutná Hora\'s Bone Church (Sedlec Ossuary)',
      'Bohemian Switzerland National Park',
    ],
    cuisine: [
      'Svíčková — beef sirloin in cream sauce with bread dumplings',
      'Trdelník chimney cake, warm from Old Town stalls',
      'Goulash with dark bread in a Prague pub',
      'Czech pilsner beer — Pilsner Urquell, Kozel, Budvar',
    ],
    activities: [
      'Walking Prague\'s Royal Mile from castle to river',
      'Day trip to Český Krumlov for medieval streets',
      'Beer tasting at a traditional Czech pub (hospoda)',
      'River cruise on the Vltava through Prague',
      'Exploring Bohemian spa towns — Karlovy Vary',
    ],
  },
  {
    name: 'Hungary',
    flag: '🇭🇺',
    tagline: 'Grand boulevards, river bends and thermal baths',
    image: '/images/hungary.jpg',
    highlights: [
      'Budapest Parliament — one of Europe\'s finest buildings',
      'Fisherman\'s Bastion & Buda Castle',
      'Danube Bend — Visegrád, Esztergom & Szentendre',
      'Heroes\' Square and Andrássy Boulevard',
      'Lake Balaton — Central Europe\'s inland sea',
    ],
    cuisine: [
      'Gulyás (goulash) soup — Hungary\'s national dish',
      'Lángos — fried dough with sour cream and cheese',
      'Chicken paprikash with egg dumplings',
      'Dobos torte — caramel-topped layered cake',
    ],
    activities: [
      'Soaking in Széchenyi Thermal Baths, Budapest',
      'Ruin bar crawl in Budapest\'s Jewish Quarter',
      'Sunset cruise on the Danube between the bridges',
      'Wine tasting in Eger — home of Bull\'s Blood wine',
      'Day trip to the Danube Bend by private car',
    ],
  },
  {
    name: 'Slovenia',
    flag: '🇸🇮',
    tagline: 'Little country, extraordinary landscapes',
    image: '/images/slovenia.jpg',
    highlights: [
      'Lake Bled with its island church and clifftop castle',
      'Triglav National Park — the Julian Alps',
      'Ljubljana Old Town and dragon bridges',
      'Postojna Cave — 24 km of underground passages',
      'Soča River Valley — emerald-green water',
    ],
    cuisine: [
      'Potica — walnut roll, Slovenia\'s festive staple',
      'Kranjska klobasa — famous Carniolan sausage',
      'Štruklji — rolled dumplings, sweet or savoury',
      'Local wines from Brda wine region (Slovenia\'s Tuscany)',
    ],
    activities: [
      'Rowing a traditional pletna boat to Bled Island',
      'Hiking up to Bled Castle for panoramic views',
      'Cycling along the Soča River Trail',
      'Guided tour through Postojna Cave by electric train',
      'Ljubljana food market walk on a Friday morning',
    ],
  },
  {
    name: 'Slovakia',
    flag: '🇸🇰',
    tagline: 'Quiet castles and unhurried Central European charm',
    image: '/images/slovakia.jpg',
    highlights: [
      'Bratislava Old Town — compact and walkable',
      'Spiš Castle — largest castle ruins in Central Europe',
      'High Tatras mountains — dramatic alpine scenery',
      'Bojnice Castle — romantic fairy-tale fortress',
      'Slovak Karst — caves and limestone gorges',
    ],
    cuisine: [
      'Bryndzové halušky — potato dumplings with sheep cheese',
      'Kapustnica — sauerkraut soup, Christmas tradition',
      'Lokše — thin potato flatbreads with poppy seed filling',
      'Kofola — Slovak cola, a local favourite',
    ],
    activities: [
      'Strolling Bratislava Old Town and Devin Castle clifftop',
      'Hiking in High Tatras National Park',
      'Exploring Spiš Castle ruins on a clear day',
      'Rafting on the Dunajec River through canyon gorges',
      'Visiting Bojnice Castle during its International Ghost Festival',
    ],
  },
  {
    name: 'Croatia',
    flag: '🇭🇷',
    tagline: 'Walled cities, waterfalls and the Adriatic coast',
    image: '/images/croatia.jpg',
    highlights: [
      'Dubrovnik Old City — the pearl of the Adriatic',
      'Plitvice Lakes National Park — turquoise waterfalls',
      'Split\'s Diocletian\'s Palace (still lived in today)',
      'Rovinj — romantic Istrian harbour town',
      'Krka National Park waterfalls and swimming holes',
    ],
    cuisine: [
      'Peka — slow-cooked lamb or octopus under iron bell',
      'Black risotto (crni rižot) with cuttlefish ink',
      'Fresh grilled fish with Swiss chard and olive oil',
      'Fritule — tiny doughnuts with rum and lemon zest',
    ],
    activities: [
      'Walking the Dubrovnik walls at golden hour',
      'Swimming at Plitvice\'s emerald lakes and waterfalls',
      'Boat trip to the Elafiti Islands from Dubrovnik',
      'Truffle hunting in Motovun Forest, Istria',
      'Sea kayaking around Dubrovnik\'s city walls',
    ],
  },
  {
    name: 'Italy',
    flag: '🇮🇹',
    tagline: 'Art, history and the world\'s most loved food',
    image: '/images/italy.jpg',
    highlights: [
      'Venice — canals, gondolas and Piazza San Marco',
      'Florence — Uffizi Gallery, Duomo and Ponte Vecchio',
      'Rome — Colosseum, Vatican City and Trevi Fountain',
      'Amalfi Coast — clifftop villages and blue sea',
      'Milan — fashion, design and The Last Supper',
    ],
    cuisine: [
      'Homemade pasta with truffles in Tuscany',
      'Neapolitan pizza — the wood-fired original',
      'Venetian cicchetti (small bites) with Aperol spritz',
      'Gelato — every town has a better version than the last',
    ],
    activities: [
      'Vatican Museums and Sistine Chapel tour (book ahead)',
      'Gondola or traghetto ride through Venice\'s canals',
      'Driving the Amalfi Coast road — one of Europe\'s finest',
      'Wine tasting in Chianti between Florence and Siena',
      'Hiking the Cinque Terre coastal path',
    ],
  },
  {
    name: 'Switzerland',
    flag: '🇨🇭',
    tagline: 'Precision, luxury and landscapes that overwhelm',
    image: '/images/switzerland.jpg',
    highlights: [
      'Lucerne — Chapel Bridge, lake and Alpine backdrop',
      'Jungfraujoch — "Top of Europe" at 3,454 m',
      'Zermatt and the Matterhorn',
      'Lake Geneva and the vineyard terraces of Lavaux',
      'Graubünden — the Swiss Grand Canyon (Rhine Gorge)',
    ],
    cuisine: [
      'Fondue — melted Gruyère in a communal pot',
      'Raclette — scraped melted cheese over potatoes',
      'Rösti — crispy shredded potato cake',
      'Swiss chocolate — Lindt, Läderach, local artisan shops',
    ],
    activities: [
      'Glacier Express scenic train — St. Moritz to Zermatt',
      'Paragliding from Interlaken over the Alps',
      'Hiking the Matterhorn trails around Zermatt',
      'Boat cruise on Lake Lucerne at sunset',
      'Day trip to Lauterbrunnen Valley — 72 waterfalls',
    ],
  },
]

function Pin() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-accent-400 mt-0.5">
      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.032 10 19 10 19s.11.032.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
    </svg>
  )
}

function Fork() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-accent-400 mt-0.5">
      <path d="M6.75 9a2.25 2.25 0 1 0-4.5 0 2.25 2.25 0 0 0 4.5 0ZM4.5 11.438v4.812a.75.75 0 0 0 1.5 0v-4.812a3.752 3.752 0 0 0 0-4.877V2.75a.75.75 0 0 0-1.5 0v3.812a3.752 3.752 0 0 0 0 4.876ZM13.25 9a2.25 2.25 0 1 0-4.5 0 2.25 2.25 0 0 0 4.5 0ZM11 2.75a.75.75 0 0 0-1.5 0v3.812a3.752 3.752 0 0 0 0 4.876v4.812a.75.75 0 0 0 1.5 0v-4.812a3.752 3.752 0 0 0 0-4.876V2.75ZM17.25 6.5a2.25 2.25 0 1 0-4.5 0 2.25 2.25 0 0 0 4.5 0ZM15 8.937v7.313a.75.75 0 0 0 1.5 0V8.937a3.752 3.752 0 0 0 0-4.874V2.75a.75.75 0 0 0-1.5 0v1.313a3.752 3.752 0 0 0 0 4.874Z" />
    </svg>
  )
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-accent-400 mt-0.5">
      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
    </svg>
  )
}

export default function Stories() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: '50vh' }}>
        <img
          src="/images/dubrovnik-hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover hero-drift"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-stone-900" />

        <div
          className="relative z-10 flex flex-col items-center justify-center px-4 pb-10 pt-20 text-center sm:px-6 sm:pb-12 sm:pt-32"
          style={{ minHeight: '50vh' }}
        >
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.42em] text-accent-400 sm:text-[11px]">From the road</p>
          <h1
            className="text-2xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
          >
            Nine countries. Every story different.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-xs text-white/65 sm:mt-4 sm:text-sm md:text-base">
            Highlights, flavours and things to do — a quick guide to what makes each destination worth the drive.
          </p>

          {/* Country jump nav */}
          <div className="mt-6 flex flex-wrap justify-center gap-1.5 sm:mt-8 sm:gap-2">
            {countries.map((c) => (
              <a
                key={c.name}
                href={`#${c.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="rounded-lg border border-white/25 bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/40 sm:px-4 sm:py-2 sm:text-xs"
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Country cards ── */}
      {countries.map((c, idx) => {
        const even = idx % 2 === 0
        return (
          <section
            key={c.name}
            id={c.name.toLowerCase().replace(/\s+/g, '-')}
            className={`px-4 py-12 sm:px-8 sm:py-16 ${even ? 'bg-gradient-to-b from-stone-900 to-stone-950' : 'bg-gradient-to-b from-stone-950 to-stone-900'}`}
          >
            <div className="mx-auto max-w-7xl">
              <div className={`flex flex-col gap-6 lg:flex-row lg:gap-10 ${!even ? 'lg:flex-row-reverse' : ''}`}>

                {/* ── Image — sticky on desktop ── */}
                <div className="w-full lg:w-[45%] lg:shrink-0">
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/10] sm:rounded-3xl lg:sticky lg:top-24">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-full w-full object-cover ken-burns group-hover:[animation-play-state:paused] group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Country name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10 sm:px-7 sm:pb-6 sm:pt-14">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="text-3xl sm:text-4xl">{c.flag}</span>
                        <div>
                          <h2
                            className="text-xl font-bold text-white sm:text-2xl lg:text-3xl"
                            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}
                          >
                            {c.name}
                          </h2>
                          <p className="mt-0.5 text-xs italic text-white/60 sm:text-sm">{c.tagline}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Content ── */}
                <div className="flex w-full flex-col gap-4 sm:gap-5 lg:w-[55%]">

                  {/* Must-see places */}
                  <div className="group relative overflow-hidden rounded-xl border border-amber-500/15 bg-amber-950/10 p-4 sm:p-5 sm:rounded-2xl transition-all duration-300 hover:border-amber-400/40 hover:bg-amber-950/25">
                    <div className="absolute -right-4 -top-4 select-none text-[80px] font-black leading-none text-amber-400/[0.04] transition-colors duration-300 group-hover:text-amber-400/[0.08]">01</div>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/10 ring-1 ring-amber-400/20">
                        <Pin />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400 sm:text-[11px]">Must-see places</p>
                    </div>
                    <ul className="space-y-2 sm:space-y-2.5">
                      {c.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-stone-300 sm:text-sm">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-amber-400 transition-all duration-500 group-hover:w-full" />
                  </div>

                  {/* Cuisine */}
                  <div className="group relative overflow-hidden rounded-xl border border-emerald-500/15 bg-emerald-950/10 p-4 sm:p-5 sm:rounded-2xl transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-950/25">
                    <div className="absolute -right-4 -top-4 select-none text-[80px] font-black leading-none text-emerald-400/[0.04] transition-colors duration-300 group-hover:text-emerald-400/[0.08]">02</div>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/20">
                        <Fork />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 sm:text-[11px]">Local cuisine</p>
                    </div>
                    <ul className="space-y-2 sm:space-y-2.5">
                      {c.cuisine.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-stone-300 sm:text-sm">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/60" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-400 transition-all duration-500 group-hover:w-full" />
                  </div>

                  {/* Activities */}
                  <div className="group relative overflow-hidden rounded-xl border border-sky-500/15 bg-sky-950/10 p-4 sm:p-5 sm:rounded-2xl transition-all duration-300 hover:border-sky-400/40 hover:bg-sky-950/25">
                    <div className="absolute -right-4 -top-4 select-none text-[80px] font-black leading-none text-sky-400/[0.04] transition-colors duration-300 group-hover:text-sky-400/[0.08]">03</div>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400/10 ring-1 ring-sky-400/20">
                        <Star />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sky-400 sm:text-[11px]">Things to do</p>
                    </div>
                    <ul className="space-y-2 sm:space-y-2.5">
                      {c.activities.map((a) => (
                        <li key={a} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-stone-300 sm:text-sm">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/60" />
                          {a}
                        </li>
                      ))}
                    </ul>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-sky-400 transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
