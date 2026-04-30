import { useState } from "react"
import { useParams, Link } from "react-router-dom"

const routeData = {
  "central-europe-loop": {
    name: "Central Europe Loop",
    label: "4 Countries - 14 Days",
    image: "/images/route-4-countries.webp",
    tagline: "The classic Central Europe circuit -- cities, culture and grand architecture",
    countries: ["Germany", "Austria", "Czech Republic", "Hungary"],
    itinerary: [
      { day: 1,  title: "Arrive Frankfurt",      desc: "Land at FRA. Private transfer to your hotel. Evening walk along the River Main." },
      { day: 2,  title: "Frankfurt to Rhine",     desc: "Explore the old town, then drive the scenic Rhine Valley -- vineyards and medieval castles." },
      { day: 3,  title: "Cologne",                desc: "Cologne Cathedral, the old town and a riverside dinner." },
      { day: 4,  title: "Drive to Munich",        desc: "Cross into Bavaria. Neuschwanstein detour optional en route. Check in Munich." },
      { day: 5,  title: "Munich",                 desc: "Marienplatz, Viktualienmarkt, English Garden and evening in a beer garden." },
      { day: 6,  title: "Munich to Vienna",       desc: "Scenic drive through the Alps. Arrive Vienna -- Ringstrasse and Opera House orientation." },
      { day: 7,  title: "Imperial Vienna",        desc: "Schoenbrunn Palace, Hofburg, Naschmarkt and Cafe Central." },
      { day: 8,  title: "Vienna to Prague",       desc: "Drive north through Bohemian countryside. Arrive Prague, evening river cruise." },
      { day: 9,  title: "Prague",                 desc: "Prague Castle, Charles Bridge, Old Town Square and Astronomical Clock." },
      { day: 10, title: "Cesky Krumlov Day Trip", desc: "UNESCO Baroque town wrapped by a river bend -- the highlight of Bohemia." },
      { day: 11, title: "Prague to Budapest",     desc: "Drive through the Slovak lowlands. Arrive Budapest, Danube Promenade dinner." },
      { day: 12, title: "Budapest",               desc: "Buda Castle, Fisherman Bastion, Parliament tour and thermal baths." },
      { day: 13, title: "Danube Bend",            desc: "Day trip to Szentendre, Visegrad and Esztergom. Back for a farewell dinner." },
      { day: 14, title: "Departure",              desc: "Transfer to Budapest Ferenc Liszt Airport. Safe travels." },
    ],
  },
  "central-extended": {
    name: "Central Extended",
    label: "6 Countries - 18 Days",
    image: "/images/slovenia.webp",
    tagline: "Central Europe with Adriatic beauty -- from Alps to the coast",
    countries: ["Germany", "Austria", "Czech Republic", "Hungary", "Slovenia", "Croatia"],
    itinerary: [
      { day: 1,  title: "Arrive Munich",          desc: "Private airport transfer. Evening in Marienplatz." },
      { day: 2,  title: "Neuschwanstein",         desc: "The fairy-tale castle that inspired Disney. Afternoon in Augsburg." },
      { day: 3,  title: "Munich to Vienna",       desc: "Alpine highway crossing into Austria. Arrive Vienna." },
      { day: 4,  title: "Imperial Vienna",        desc: "Schoenbrunn, Hofburg, Naschmarkt and evening opera." },
      { day: 5,  title: "Vienna to Prague",       desc: "Morning coffee at Cafe Central, then drive to Prague." },
      { day: 6,  title: "Prague",                 desc: "Castle, Charles Bridge and Jewish Quarter." },
      { day: 7,  title: "Prague to Budapest",     desc: "Full day drive with a Brno stopover." },
      { day: 8,  title: "Budapest",               desc: "Buda side, thermal baths and ruin bars." },
      { day: 9,  title: "Budapest to Ljubljana",  desc: "Cross into Slovenia via Austria. Arrive Ljubljana." },
      { day: 10, title: "Ljubljana",              desc: "Dragon Bridge, castle and riverside market." },
      { day: 11, title: "Lake Bled",              desc: "Island church, cliff castle and traditional kremsnita." },
      { day: 12, title: "Triglav Park",           desc: "Vintgar Gorge and Lake Bohinj -- total alpine serenity." },
      { day: 13, title: "Soca Valley",            desc: "Electric-blue river and WWI history." },
      { day: 14, title: "Drive to Dubrovnik",     desc: "Coastal road through Croatia. Arrive Dubrovnik." },
      { day: 15, title: "Dubrovnik",              desc: "Walk the ancient walls at sunset -- best view in Europe." },
      { day: 16, title: "Korcula Island",         desc: "Marco Polo island, fresh fish and local wine." },
      { day: 17, title: "Split",                  desc: "Diocletian Palace and coastal farewell dinner." },
      { day: 18, title: "Departure",              desc: "Transfer to Split or Dubrovnik Airport." },
    ],
  },
  "western-highlights": {
    name: "Western Highlights",
    label: "3 Countries - 12 Days",
    image: "/images/route-ger-swi-ita.webp",
    tagline: "Alps, art and Italian culture in one sweeping arc",
    countries: ["Germany", "Switzerland", "Italy"],
    itinerary: [
      { day: 1,  title: "Arrive Frankfurt",       desc: "Transfer and settle in. Evening stroll along the Main." },
      { day: 2,  title: "Black Forest Drive",     desc: "Cuckoo clocks, forest roads and Baden-Baden thermal baths." },
      { day: 3,  title: "Drive to Zurich",        desc: "Cross the Rhine into Switzerland. Zurich evening on the Limmat." },
      { day: 4,  title: "Lucerne",                desc: "Chapel Bridge, Lion Monument and boat cruise." },
      { day: 5,  title: "Jungfrau",               desc: "Cogwheel train to the Top of Europe. Grindelwald glaciers." },
      { day: 6,  title: "Zurich to Milan",        desc: "Cross the Alps. Milan -- Duomo, Galleria and last supper." },
      { day: 7,  title: "Drive to Venice",        desc: "Arrive Venice by afternoon. Water taxi to the hotel." },
      { day: 8,  title: "Venice",                 desc: "St Mark, Doge Palace and gondola through back canals." },
      { day: 9,  title: "Drive to Florence",      desc: "Via Verona. Uffizi skip-the-line, Ponte Vecchio." },
      { day: 10, title: "Tuscany Drive",          desc: "Val d Orcia cypress roads and Siena Piazza del Campo." },
      { day: 11, title: "Rome",                   desc: "Colosseum, Forum Romanum and Trastevere dinner." },
      { day: 12, title: "Departure",              desc: "Transfer to Rome Fiumicino Airport." },
    ],
  },
  "alpine-luxury": {
    name: "Alpine Luxury",
    label: "3 Countries - 10 Days",
    image: "/images/route-aut-swi-ita.webp",
    tagline: "Alpine lakes, luxury hotels and Italian elegance",
    countries: ["Austria", "Switzerland", "Italy"],
    itinerary: [
      { day: 1,  title: "Arrive Vienna",          desc: "Private transfer. Ringstrasse and welcome dinner." },
      { day: 2,  title: "Imperial Vienna",        desc: "Schoenbrunn, Hofburg and Sachertorte at Cafe Central." },
      { day: 3,  title: "Salzburg",               desc: "Mozart, Hohensalzburg fortress and Sound-of-Music location drive." },
      { day: 4,  title: "Grossglockner",          desc: "Europe most scenic mountain pass -- glaciers and total silence." },
      { day: 5,  title: "Drive to Zurich",        desc: "Cross into Switzerland via Innsbruck. Lake Zurich evening." },
      { day: 6,  title: "Lucerne and Interlaken", desc: "Chapel Bridge, Jungfrau panorama and mountain village lunch." },
      { day: 7,  title: "Zermatt",               desc: "Car-free village under the Matterhorn. Gornergrat railway." },
      { day: 8,  title: "Milan",                 desc: "Cross into Italy. Duomo, Brera and Aperol at sunset." },
      { day: 9,  title: "Lake Como",             desc: "Bellagio, villa gardens and the most beautiful lake in Europe." },
      { day: 10, title: "Departure",             desc: "Transfer to Milan Malpensa Airport." },
    ],
  },
  "castle-capital-loop": {
    name: "Castle and Capital Loop",
    label: "4 Countries - 12 Days",
    image: "/images/route-central-loop.webp",
    tagline: "Four capitals and countless castles in a compact, efficient circuit",
    countries: ["Czech Republic", "Austria", "Slovakia", "Hungary"],
    itinerary: [
      { day: 1,  title: "Arrive Prague",          desc: "Transfer to Old Town. Evening river cruise on the Vltava." },
      { day: 2,  title: "Prague",                 desc: "Castle, Charles Bridge and Jewish Quarter." },
      { day: 3,  title: "Cesky Krumlov",          desc: "UNESCO Baroque town -- castle, rafting and medieval streets." },
      { day: 4,  title: "Prague to Vienna",       desc: "Drive south via Brno. Arrive Vienna evening." },
      { day: 5,  title: "Imperial Vienna",        desc: "Schoenbrunn, Hofburg and Naschmarkt." },
      { day: 6,  title: "Vienna to Bratislava",   desc: "Only 60km apart -- the world closest capital pair. Afternoon arrival." },
      { day: 7,  title: "Bratislava",             desc: "Old Town, castle and the best halusky of your life." },
      { day: 8,  title: "High Tatras Day Trip",   desc: "Slovakia alpine playground -- cable cars and glacial lakes." },
      { day: 9,  title: "Spis Castle",           desc: "Largest UNESCO castle complex in Central Europe." },
      { day: 10, title: "Drive to Budapest",      desc: "Follow the Danube south into Hungary." },
      { day: 11, title: "Budapest",               desc: "Parliament, Fisherman Bastion and farewell thermal bath soak." },
      { day: 12, title: "Departure",              desc: "Transfer to Budapest Airport." },
    ],
  },
  "grand-nine": {
    name: "The Grand Nine",
    label: "9 Countries - 25 Days",
    image: "/images/route-grand-9.webp",
    tagline: "All nine countries in one epic private journey -- the definitive Europe road trip",
    countries: ["Germany", "Austria", "Czech Republic", "Hungary", "Slovenia", "Slovakia", "Croatia", "Italy", "Switzerland"],
    itinerary: [
      { day: 1,  title: "Arrive Frankfurt",       desc: "Begin the grand journey. Rhine Valley and Cologne en route south." },
      { day: 3,  title: "Munich",                 desc: "The Bavarian gateway -- beer gardens, Neuschwanstein and BMW World." },
      { day: 5,  title: "Vienna",                 desc: "Imperial Austria -- palaces, coffeehouses and opera." },
      { day: 7,  title: "Prague",                 desc: "Fairy-tale Bohemia -- castle, bridges and cobblestones." },
      { day: 9,  title: "Budapest",               desc: "The Pearl of the Danube -- spas, parliament and ruin bars." },
      { day: 11, title: "Bratislava",             desc: "Charming Slovak capital with castle views over the Danube." },
      { day: 13, title: "Ljubljana and Lake Bled",desc: "Slovenia in two perfect days -- city and lake." },
      { day: 15, title: "Dubrovnik",              desc: "Croatia coast -- Game of Thrones walls and Adriatic sunsets." },
      { day: 17, title: "Venice",                 desc: "Italy begins -- canals, gondolas and St Mark." },
      { day: 19, title: "Florence and Tuscany",   desc: "Uffizi, Ponte Vecchio and Val d Orcia cypress drives." },
      { day: 21, title: "Rome",                   desc: "The eternal city -- Colosseum, Forum and Trastevere." },
      { day: 23, title: "Swiss Alps",             desc: "Zurich, Lucerne and Jungfrau -- the grand alpine finale." },
      { day: 25, title: "Departure",              desc: "Transfer to Zurich or Geneva Airport. A journey of a lifetime complete." },
    ],
  },
}

const hotelOptions = [
  { id: "budget",   label: "Budget",   sub: "Clean & central",   icon: "🏨" },
  { id: "3star",    label: "3-Star",   sub: "Comfort & value",   icon: "⭐⭐⭐" },
  { id: "4star",    label: "4-Star",   sub: "Superior style",    icon: "⭐⭐⭐⭐" },
  { id: "5star",    label: "5-Star",   sub: "Luxury & beyond",   icon: "⭐⭐⭐⭐⭐" },
  { id: "boutique", label: "Boutique", sub: "Unique & local",    icon: "🏡" },
  { id: "heritage", label: "Heritage", sub: "Historic palaces",  icon: "🏰" },
]

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const EUR_TO_INR = 90

function budgetLabel(v) {
  if (v < 2000)  return "Budget Explorer"
  if (v < 4000)  return "Comfort Traveller"
  if (v < 7000)  return "Premium Experience"
  if (v < 12000) return "Luxury Journey"
  return "Ultra-Luxury"
}

export default function TourPlannerMulti() {
  const { slug } = useParams()
  const data = routeData[slug]

  const [hotel,      setHotel]      = useState("")
  const [budget,     setBudget]     = useState(7000)
  const [currency,   setCurrency]   = useState("EUR")
  const [month,      setMonth]      = useState("")
  const [groupSize,  setGroupSize]  = useState(2)
  const [name,       setName]       = useState("")
  const [email,      setEmail]      = useState("")
  const [phone,      setPhone]      = useState("")
  const [notes,      setNotes]      = useState("")
  const [submitted,  setSubmitted]  = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error,      setError]      = useState("")

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 text-white">
        <div className="text-center">
          <p className="text-4xl font-bold">Route not found</p>
          <Link to="/multi-country" className="mt-6 inline-block text-accent-400 underline">Back to routes</Link>
        </div>
      </div>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!hotel || !month || !name || !email) {
      setError("Please fill in your name, email, hotel type and travel month.")
      return
    }
    setError("")
    setSubmitting(true)
    try {
      const res = await fetch("http://localhost:8000/api/enquiries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone,
          country: data.name,
          hotel_type: hotel,
          budget_eur: budget,
          group_size: groupSize,
          travel_month: month + " 2026",
          duration_days: data.itinerary.length,
          special_requests: notes,
        }),
      })
      if (!res.ok) throw new Error("Server error")
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again or email us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  const groupLabel = groupSize === 1 ? "Solo traveller" : groupSize <= 2 ? "Couple" : groupSize <= 4 ? "Small group" : "Large group"

  return (
    <div className="relative bg-stone-950 min-h-screen text-white">
      <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Hero */}
      <section className="relative z-10 overflow-hidden" style={{ minHeight: "60vh" }}>
        <img src={data.image} alt={data.name} className="absolute inset-0 h-full w-full object-cover ken-burns" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-stone-950" />
        <div className="relative z-10 flex flex-col items-center justify-center px-5 text-center pb-16 pt-24 sm:pt-32" style={{ minHeight: "60vh" }}>
          <Link to="/multi-country" className="mb-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.38em] text-white/50 hover:text-accent-400 transition-colors">
            &larr; Multi Country Tours
          </Link>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.42em] text-accent-400">{data.label}</p>
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl" style={{ textShadow: "0 4px 40px rgba(0,0,0,0.7)" }}>
            {data.name}
          </h1>
          <p className="mt-3 text-base text-white/60 sm:text-lg max-w-xl">{data.tagline}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {data.countries.map(c => (
              <span key={c} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="relative z-10 bg-gradient-to-b from-stone-950 to-stone-900 px-4 py-12 sm:px-8 sm:py-16 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent-400/5 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -right-24 h-72 w-72 rounded-full bg-amber-600/5 blur-3xl" />
        <div className="mx-auto max-w-4xl relative z-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Day by day</p>
          <h2 className="mb-10 text-3xl font-bold sm:text-4xl">Full itinerary</h2>
          <div className="relative">
            <div className="absolute left-5 top-0 h-full w-px bg-white/10 sm:left-7" />
            <div className="space-y-6">
              {data.itinerary.map((day, i) => (
                <div key={i} className="relative flex gap-5 sm:gap-8">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-400/40 bg-stone-900 text-xs font-bold text-accent-400 sm:h-14 sm:w-14 sm:text-sm">
                    {String(day.day).padStart(2, "0")}
                  </div>
                  <div className="flex-1 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.02] px-5 py-4 sm:px-6 transition-all duration-200 hover:border-accent-400/20 hover:from-accent-400/5">
                    <p className="font-semibold text-white">{day.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-stone-400">{day.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-stone-500">Sample outline -- your actual itinerary is custom-built from your preferences below.</p>
        </div>
      </section>

      {/* Planner */}
      <section className="relative z-10 bg-stone-900 px-4 py-12 sm:px-8 sm:py-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(245,158,11,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(120,53,15,0.08) 0%, transparent 50%)" }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />
        <div className="mx-auto max-w-4xl relative z-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Build your trip</p>
          <h2 className="mb-2 text-2xl font-bold sm:text-4xl">Customise &amp; enquire</h2>
          <p className="mb-8 text-sm text-stone-400 sm:mb-10 sm:text-base">Not a form -- a trip builder. Tell us what you want and we will handle the rest.</p>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-8 py-12 text-center">
              <div className="mb-4 text-5xl">🎉</div>
              <h3 className="text-2xl font-bold text-white">You are all set, {name}!</h3>
              <p className="mt-3 text-stone-300">Your {data.name} enquiry has been saved. We will get back to you within 24 hours with a personalised itinerary.</p>
              <Link to="/multi-country" className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                Explore other routes
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">

              {/* Hotel */}
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-400">Hotel style</p>
                <p className="mb-4 text-lg font-semibold text-white">Where do you like to stay?</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {hotelOptions.map(h => (
                    <button key={h.id} type="button" onClick={() => setHotel(h.id)}
                      className={"rounded-xl border px-4 py-4 text-left transition-all duration-200 " + (hotel === h.id ? "border-accent-400 bg-accent-400/10 shadow-lg shadow-accent-400/10" : "border-white/10 bg-white/[0.03] hover:border-white/25")}>
                      <div className="mb-1 text-lg leading-none">{h.icon}</div>
                      <p className="font-semibold text-white text-sm">{h.label}</p>
                      <p className="text-[11px] text-stone-400">{h.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Total budget</p>
                  <div className="flex items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-xs font-bold">
                    <button type="button" onClick={() => setCurrency("EUR")}
                      className={"rounded-full px-3 py-1 transition-all duration-200 " + (currency === "EUR" ? "bg-accent-400 text-stone-950" : "text-stone-400 hover:text-white")}>
                      EUR
                    </button>
                    <button type="button" onClick={() => setCurrency("INR")}
                      className={"rounded-full px-3 py-1 transition-all duration-200 " + (currency === "INR" ? "bg-accent-400 text-stone-950" : "text-stone-400 hover:text-white")}>
                      INR
                    </button>
                  </div>
                </div>
                <div className="mb-3 flex items-end justify-between">
                  <p className="text-lg font-semibold text-white">
                    {currency === "EUR" ? ("\u20AC" + budget.toLocaleString("en-IN")) : ("\u20B9" + (budget * EUR_TO_INR).toLocaleString("en-IN"))}
                    <span className="ml-2 text-sm font-normal text-stone-400">per person</span>
                  </p>
                  <span className="rounded-full border border-accent-400/30 bg-accent-400/10 px-3 py-0.5 text-xs font-bold text-accent-400">{budgetLabel(budget)}</span>
                </div>
                <input type="range" min={500} max={25000} step={250} value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="w-full cursor-pointer" style={{ accentColor: "#f59e0b" }} />
                <div className="mt-1 flex justify-between text-[10px] text-stone-500">
                  {currency === "EUR"
                    ? <><span>{"\u20AC"}500</span><span>{"\u20AC"}6k</span><span>{"\u20AC"}12k</span><span>{"\u20AC"}25k+</span></>
                    : <><span>{"\u20B9"}45k</span><span>{"\u20B9"}5.4L</span><span>{"\u20B9"}10.8L</span><span>{"\u20B9"}22.5L+</span></>
                  }
                </div>
              </div>

              {/* Group size */}
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-400">Group size</p>
                <p className="mb-4 text-lg font-semibold text-white">How many travelling?</p>
                <div className="flex items-center gap-5">
                  <button type="button" onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl font-bold text-white hover:bg-white/10 transition-colors">
                    &minus;
                  </button>
                  <span className="min-w-[3rem] text-center text-3xl font-bold text-white">{groupSize}</span>
                  <button type="button" onClick={() => setGroupSize(Math.min(20, groupSize + 1))}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl font-bold text-white hover:bg-white/10 transition-colors">
                    +
                  </button>
                  <span className="text-stone-400 text-sm">{groupLabel}</span>
                </div>
              </div>

              {/* Month */}
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-400">Travel month</p>
                <p className="mb-4 text-lg font-semibold text-white">When are you planning to go?</p>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-12">
                  {months.map(m => (
                    <button key={m} type="button" onClick={() => setMonth(m)}
                      className={"rounded-lg border py-2 text-sm font-medium transition-all duration-200 text-center " + (month === m ? "border-accent-400 bg-accent-400 text-stone-950 font-bold" : "border-white/15 text-stone-300 hover:border-white/35")}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-400">Your details</p>
                <p className="mb-4 text-lg font-semibold text-white">Where do we reach you?</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-stone-400">Full name *</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-stone-600 outline-none focus:border-accent-400/60 focus:ring-1 focus:ring-accent-400/30 transition-all" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-stone-400">Email *</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-stone-600 outline-none focus:border-accent-400/60 focus:ring-1 focus:ring-accent-400/30 transition-all" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-stone-400">Phone (optional)</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+44 7700 000000"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-stone-600 outline-none focus:border-accent-400/60 focus:ring-1 focus:ring-accent-400/30 transition-all" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-stone-400">Special requests or notes?</label>
                    <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
                      placeholder="Anniversary trip, dietary needs, accessibility requirements..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-stone-600 outline-none focus:border-accent-400/60 focus:ring-1 focus:ring-accent-400/30 transition-all" />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-2xl border border-accent-400/20 bg-gradient-to-br from-accent-400/[0.07] to-stone-950/40 p-6 shadow-lg shadow-accent-400/5">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Your trip summary</p>
                <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                  <div className="sm:col-span-2"><span className="text-stone-500">Route</span><br /><span className="font-semibold text-white">{data.name}</span></div>
                  {hotel && <div><span className="text-stone-500">Hotel</span><br /><span className="font-semibold text-white capitalize">{hotel}</span></div>}
                  <div><span className="text-stone-500">Budget</span><br /><span className="font-semibold text-white">{currency === "EUR" ? ("\u20AC" + budget.toLocaleString("en-IN")) : ("\u20B9" + (budget * EUR_TO_INR).toLocaleString("en-IN"))}/person</span></div>
                  <div><span className="text-stone-500">Duration</span><br /><span className="font-semibold text-white">{data.label}</span></div>
                  <div><span className="text-stone-500">Group</span><br /><span className="font-semibold text-white">{groupSize} {groupSize === 1 ? "person" : "people"}</span></div>
                  {month && <div><span className="text-stone-500">Month</span><br /><span className="font-semibold text-white">{month} 2026</span></div>}
                </div>
              </div>

              {error && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>
              )}

              <button type="submit" disabled={submitting}
                className="group w-full rounded-xl bg-accent-400 px-8 py-4 text-base font-bold text-stone-950 transition-all duration-300 hover:bg-accent-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent-400/25 disabled:opacity-60 disabled:cursor-not-allowed">
                {submitting ? "Sending your enquiry..." : "Save & send my " + data.name + " enquiry \u2192"}
              </button>

              <p className="text-center text-xs text-stone-500">No payment required. We will get back within 24 hours with a personalised itinerary.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}