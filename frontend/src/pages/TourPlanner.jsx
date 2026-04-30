import { useState } from "react"
import { useParams, Link } from "react-router-dom"

const countryData = {
  germany: {
    name: "Germany",
    image: "/images/germany.webp",
    tagline: "Castles, autobahns and timeless culture",
    highlights: ["Neuschwanstein Castle", "Munich Altstadt", "Rhine Valley", "Black Forest"],
    itinerary: [
      { day: 1, title: "Arrival in Munich", desc: "Land at MUC, private transfer to your boutique hotel. Evening stroll through Marienplatz and a welcome dinner at a local brewery." },
      { day: 2, title: "Neuschwanstein & Fuessen", desc: "Early drive to the fairy-tale castle. Beat the crowds with a guided morning entry, then scenic drive along the Romantic Road to Augsburg." },
      { day: 3, title: "Munich Deep Dive", desc: "English Garden, BMW World, Viktualienmarkt. Afternoon free for Pinakothek museums or a beer garden at your own pace." },
      { day: 4, title: "Rhine Valley Drive", desc: "Head northwest through vineyards, medieval castles and river cruises. Overnight in a riverside wine village." },
      { day: 5, title: "Black Forest & Baden-Baden", desc: "Wind through forest roads, visit a cuckoo-clock workshop, and relax in the thermal baths of Baden-Baden." },
      { day: 6, title: "Heidelberg & Cologne", desc: "Explore the romantic Old Town of Heidelberg, then north to Cologne Cathedral and the old town." },
      { day: 7, title: "Departure Day", desc: "Leisurely breakfast. Private transfer to your departure airport. Take the memories, leave only footprints." },
    ],
  },
  austria: {
    name: "Austria",
    image: "/images/austria.webp",
    tagline: "Vienna, Salzburg and the Alps",
    highlights: ["Vienna Old Town", "Hallstatt Village", "Salzburg", "Alpine Drives"],
    itinerary: [
      { day: 1, title: "Vienna Arrival", desc: "Private airport transfer. Check into a Ringstrasse hotel. Evening walk along the Danube Canal." },
      { day: 2, title: "Imperial Vienna", desc: "Schoenbrunn Palace, Hofburg, Naschmarkt. Late afternoon Sachertorte at Cafe Central." },
      { day: 3, title: "Vienna to Hallstatt", desc: "Drive through the Salzkammergut lake district. Hallstatt village at golden hour -- the most photographed place in Austria." },
      { day: 4, title: "Salzburg", desc: "Mozart birthplace, Getreidegasse, and the Hohensalzburg fortress. Sound-of-Music panorama drive." },
      { day: 5, title: "Alpine Roads", desc: "Grossglockner High Alpine Road -- Europe most scenic mountain pass. Waterfalls, glaciers and total silence." },
      { day: 6, title: "Innsbruck", desc: "The Golden Roof, Nordkette cable car, and craft beer in the old town. Overnight in Tyrol." },
      { day: 7, title: "Departure", desc: "Transfer to Vienna or Salzburg airport. Safe travels." },
    ],
  },
  "czech-republic": {
    name: "Czech Republic",
    image: "/images/czech-republic.webp",
    tagline: "Fairy-tale Prague and beyond",
    highlights: ["Prague Old Town", "Charles Bridge", "Cesky Krumlov", "Karlovy Vary"],
    itinerary: [
      { day: 1, title: "Prague Arrival", desc: "Transfer to your Old Town hotel. Evening river cruise on the Vltava." },
      { day: 2, title: "Prague Castle & Mala Strana", desc: "St Vitus Cathedral, Golden Lane, then downhill to the charming Lesser Town." },
      { day: 3, title: "Old Town & Jewish Quarter", desc: "Astronomical Clock, Josefov cemetery, and the best svickova you will ever have." },
      { day: 4, title: "Karlovy Vary", desc: "Spa town, thermal springs, colonnades and a taste of the famous Becherovka liqueur." },
      { day: 5, title: "Cesky Krumlov", desc: "A UNESCO Baroque town wrapped by a river bend. Castle tour, rafting, medieval streets." },
      { day: 6, title: "Kutna Hora", desc: "The Bone Church (Sedlec Ossuary) and the silver-mining legacy of a once-great city." },
      { day: 7, title: "Departure", desc: "Transfer to Prague Vaclav Havel Airport." },
    ],
  },
  hungary: {
    name: "Hungary",
    image: "/images/hungary.webp",
    tagline: "Culture, spas and river views",
    highlights: ["Budapest Parliament", "Thermal Baths", "Danube Bend", "Castle Hill"],
    itinerary: [
      { day: 1, title: "Budapest Arrival", desc: "Private transfer. Evening walk along the Danube Promenade and dinner in the Jewish Quarter." },
      { day: 2, title: "Buda Side", desc: "Buda Castle, Fisherman Bastion, Matthias Church. Lunch on the hilltop with panoramic views." },
      { day: 3, title: "Pest Side", desc: "Parliament tour, Great Market Hall, ruin bars and chimney cake at Vorosmarty Square." },
      { day: 4, title: "Thermal Baths", desc: "Szechenyi or Gellert -- soak in 100-year-old Neo-Baroque bathhouses. Afternoon free." },
      { day: 5, title: "Danube Bend", desc: "Scenic loop through Szentendre, Visegrad hilltop castle and Esztergom Basilica." },
      { day: 6, title: "Lake Balaton", desc: "Central Europe largest lake -- volcanic wine hills, lavender fields and lakeside villages." },
      { day: 7, title: "Departure", desc: "Transfer to Budapest Ferenc Liszt Airport." },
    ],
  },
  slovenia: {
    name: "Slovenia",
    image: "/images/slovenia.webp",
    tagline: "Lake Bled and alpine-green drives",
    highlights: ["Lake Bled", "Ljubljana", "Triglav National Park", "Soca Valley"],
    itinerary: [
      { day: 1, title: "Ljubljana Arrival", desc: "Dragon Bridge stroll, open-air market and dinner in a riverside terrace restaurant." },
      { day: 2, title: "Lake Bled", desc: "The iconic island church, cliff-top castle, and a traditional cream cake by the lake." },
      { day: 3, title: "Triglav National Park", desc: "Vintgar Gorge, Bohinj Lake -- silent alpine scenery that feels like another world." },
      { day: 4, title: "Soca Valley", desc: "Electric-blue waters, WWI history and the best rafting in Central Europe." },
      { day: 5, title: "Predjama Castle & Postojna", desc: "A castle built inside a cliff and the world most dramatic show caves." },
      { day: 6, title: "Piran & Slovenian Coast", desc: "Tiny Venetian port city on the Adriatic. Sunset seafood by the water." },
      { day: 7, title: "Departure", desc: "Transfer to Ljubljana Joze Pucnik Airport." },
    ],
  },
  slovakia: {
    name: "Slovakia",
    image: "/images/slovakia.webp",
    tagline: "Bratislava, castles and quiet roads",
    highlights: ["Bratislava Old Town", "Spis Castle", "High Tatras", "Slovak Karst"],
    itinerary: [
      { day: 1, title: "Bratislava Arrival", desc: "Stroll the compact Old Town, climb the castle for sunset views over the Danube." },
      { day: 2, title: "Bratislava Deep Dive", desc: "Michael Gate, blue church, hidden courtyards and the best halusky of your life." },
      { day: 3, title: "High Tatras", desc: "Drive to Slovakia mountain playground. Cable cars, alpine lakes and crisp mountain air." },
      { day: 4, title: "Spis Castle", desc: "The largest castle complex in Central Europe -- a UNESCO site rising from a volcanic hill." },
      { day: 5, title: "Slovak Karst", desc: "Domica cave system, karst plateaux and the wild Slovensky Raj canyon gorges." },
      { day: 6, title: "Banska Stiavnica", desc: "A UNESCO mining town with Baroque squares, 17th-century calvary and art nouveau buildings." },
      { day: 7, title: "Departure", desc: "Transfer to Bratislava or Vienna airports." },
    ],
  },
  croatia: {
    name: "Croatia",
    image: "/images/croatia.webp",
    tagline: "Dubrovnik walls and coastal drives",
    highlights: ["Dubrovnik Old City", "Split", "Plitvice Lakes", "Istrian Coast"],
    itinerary: [
      { day: 1, title: "Dubrovnik Arrival", desc: "Private transfer to the Old City. Walk the ancient walls at sunset -- the best view in Europe." },
      { day: 2, title: "Dubrovnik", desc: "Game of Thrones filming locations, Lokrum island, cable car to Mount Srd. Evening on Stradun." },
      { day: 3, title: "Korcula Island", desc: "Ferry to the island birthplace of Marco Polo. Wine, fresh fish and total calm." },
      { day: 4, title: "Split Drive", desc: "Coastal road north to Split. Diocletian Palace -- a Roman emperor retirement home." },
      { day: 5, title: "Plitvice Lakes", desc: "16 cascading turquoise lakes and 90 waterfalls in a primeval forest. Book early -- it sells out." },
      { day: 6, title: "Istria", desc: "Rovinj cobblestone peninsula, truffle hunting in Motovun, and Istrian wine country." },
      { day: 7, title: "Departure", desc: "Transfer to Zagreb or Split Airport." },
    ],
  },
  italy: {
    name: "Italy",
    image: "/images/italy.webp",
    tagline: "Venice, Florence, Rome and Tuscany",
    highlights: ["Venice Canals", "Florence & Uffizi", "Tuscany Roads", "Amalfi Coast"],
    itinerary: [
      { day: 1, title: "Venice Arrival", desc: "Private water taxi to your canal-side hotel. Golden hour Rialto and a Bellini at Harry Bar." },
      { day: 2, title: "Venice", desc: "St Mark Basilica, Doge Palace, gondola through the quiet back canals, Murano glass workshop." },
      { day: 3, title: "Florence", desc: "Drive via Verona. Uffizi Gallery skip-the-line, Ponte Vecchio, Piazzale Michelangelo at sunset." },
      { day: 4, title: "Tuscany Drive", desc: "Val d Orcia cypress roads, Siena Piazza del Campo, wine tasting in Montalcino." },
      { day: 5, title: "Rome", desc: "Private transfer. Colosseum, Forum Romanum, Trastevere dinner. No queues -- we pre-book everything." },
      { day: 6, title: "Amalfi Coast", desc: "Drive the Amalfi cliffside road. Positano, Ravello, fresh buffalo mozzarella and limoncello." },
      { day: 7, title: "Departure", desc: "Transfer to Rome Fiumicino or Naples Airport." },
    ],
  },
  switzerland: {
    name: "Switzerland",
    image: "/images/switzerland.webp",
    tagline: "Luxury, mountains and scenic railways",
    highlights: ["Lake Lucerne", "Jungfrau Region", "Zurich", "Interlaken"],
    itinerary: [
      { day: 1, title: "Zurich Arrival", desc: "Private transfer. Old Town, Lake Zurich promenade, and the best raclette of your trip." },
      { day: 2, title: "Lucerne", desc: "Chapel Bridge, Lion Monument, boat cruise on the lake." },
      { day: 3, title: "Jungfrau Region", desc: "Cogwheel train to the Top of Europe. Grindelwald glaciers, Lauterbrunnen waterfalls." },
      { day: 4, title: "Interlaken", desc: "Adventure capital of Switzerland -- paragliding, canyoning or simply sitting in the meadow." },
      { day: 5, title: "Bern & Montreux", desc: "Bear Park and the arcades of Bern, then Montreux Jazz route and Chillon castle." },
      { day: 6, title: "Zermatt", desc: "Car-free village under the Matterhorn. Gornergrat railway, cheese fondue and mountain silence." },
      { day: 7, title: "Departure", desc: "Train or private transfer to Geneva or Zurich Airport." },
    ],
  },
}

const hotelOptions = [
  { id: "budget",   label: "Budget",   sub: "Clean & central",    icon: "🏨" },
  { id: "3star",    label: "3-Star",   sub: "Comfort & value",    icon: "⭐⭐⭐" },
  { id: "4star",    label: "4-Star",   sub: "Superior style",     icon: "⭐⭐⭐⭐" },
  { id: "5star",    label: "5-Star",   sub: "Luxury & beyond",    icon: "⭐⭐⭐⭐⭐" },
  { id: "boutique", label: "Boutique", sub: "Unique & local",     icon: "🏡" },
  { id: "heritage", label: "Heritage", sub: "Historic palaces",   icon: "🏰" },
]

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const durations = [5, 7, 10, 14, 21]

function budgetLabel(v) {
  if (v < 2000)  return "Budget Explorer"
  if (v < 4000)  return "Comfort Traveller"
  if (v < 7000)  return "Premium Experience"
  if (v < 12000) return "Luxury Journey"
  return "Ultra-Luxury"
}

export default function TourPlanner() {
  const { country } = useParams()
  const data = countryData[country]

  const [hotel,    setHotel]    = useState("")
  const [budget,   setBudget]   = useState(5000)
  const [currency, setCurrency] = useState("EUR") // "EUR" | "INR"
  const EUR_TO_INR = 90
  const [month,    setMonth]    = useState("")
  const [duration, setDuration] = useState(7)
  const [groupSize,setGroupSize]= useState(2)
  const [name,     setName]     = useState("")
  const [email,    setEmail]    = useState("")
  const [phone,    setPhone]    = useState("")
  const [notes,    setNotes]    = useState("")
  const [submitted,setSubmitted]= useState(false)
  const [submitting,setSubmitting]=useState(false)
  const [error,    setError]    = useState("")

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 text-white">
        <div className="text-center">
          <p className="text-4xl font-bold">Country not found</p>
          <Link to="/single-country" className="mt-6 inline-block text-accent-400 underline">Back to tours</Link>
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
          name, email, phone, country: data.name,
          hotel_type: hotel, budget_eur: budget,
          group_size: groupSize, travel_month: month + " 2026",
          duration_days: duration, special_requests: notes,
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
      {/* global dot grid */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Hero */}
      <section className="relative z-10 overflow-hidden" style={{ minHeight: "60vh" }}>
        <img src={data.image} alt={data.name} className="absolute inset-0 h-full w-full object-cover ken-burns" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-stone-950" />
        <div className="relative z-10 flex flex-col items-center justify-center px-5 text-center pb-16 pt-24 sm:pt-32" style={{ minHeight: "60vh" }}>
          <Link to="/single-country" className="mb-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.38em] text-white/50 hover:text-accent-400 transition-colors">
            &larr; Single Country Tours
          </Link>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.42em] text-accent-400">Plan Your Trip</p>
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl" style={{ textShadow: "0 4px 40px rgba(0,0,0,0.7)" }}>
            {data.name}
          </h1>
          <p className="mt-3 text-base text-white/60 sm:text-lg">{data.tagline}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {data.highlights.map(h => (
              <span key={h} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">{h}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      {/* Itinerary */}
      <section className="relative z-10 bg-gradient-to-b from-stone-950 to-stone-900 px-4 py-12 sm:px-8 sm:py-16 overflow-hidden">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent-400/5 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -right-24 h-72 w-72 rounded-full bg-amber-600/5 blur-3xl" />
        <div className="mx-auto max-w-4xl relative z-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">What to expect</p>
          <h2 className="mb-10 text-3xl font-bold sm:text-4xl">Sample {duration}-day itinerary</h2>
          <div className="relative">
            <div className="absolute left-5 top-0 h-full w-px bg-white/10 sm:left-7" />
            <div className="space-y-6">
              {data.itinerary.slice(0, Math.min(duration, data.itinerary.length)).map((day, i) => (
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
          <p className="mt-6 text-center text-sm text-stone-500">Sample outline only -- your actual itinerary is custom-built from your preferences below.</p>
        </div>
      </section>

      {/* Planner */}
      {/* Planner */}
      <section className="relative z-10 bg-stone-900 px-4 py-12 sm:px-8 sm:py-16 overflow-hidden">
        {/* background texture */}
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(245,158,11,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(120,53,15,0.08) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.01) 0%, transparent 70%)" }} />
        {/* top edge glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />
        <div className="mx-auto max-w-4xl relative z-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Build your trip</p>
          <h2 className="mb-2 text-2xl font-bold sm:text-4xl">Customise &amp; enquire</h2>
          <p className="mb-8 text-sm text-stone-400 sm:mb-10 sm:text-base">Not a form -- a trip builder. Tell us what you want and we will handle the rest.</p>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-8 py-12 text-center">
              <div className="mb-4 text-5xl">🎉</div>
              <h3 className="text-2xl font-bold text-white">You are all set, {name}!</h3>
              <p className="mt-3 text-stone-300">Your {data.name} trip enquiry has been saved. We will get back to you within 24 hours with a personalised itinerary.</p>
              <Link to="/single-country" className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                Explore other countries
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
                  {/* Currency toggle */}
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
                    {currency === "EUR" ? (
                      <>{"\u20AC"}{budget.toLocaleString("en-IN")}</>
                    ) : (
                      <>{"\u20B9"}{(budget * EUR_TO_INR).toLocaleString("en-IN")}</>
                    )}
                    <span className="ml-2 text-sm font-normal text-stone-400">per person</span>
                  </p>
                  <span className="rounded-full border border-accent-400/30 bg-accent-400/10 px-3 py-0.5 text-xs font-bold text-accent-400">{budgetLabel(budget)}</span>
                </div>
                <input type="range" min={500} max={20000} step={250} value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="w-full cursor-pointer" style={{ accentColor: "#f59e0b" }} />
                <div className="mt-1 flex justify-between text-[10px] text-stone-500">
                  {currency === "EUR" ? (
                    <><span>{"\u20AC"}500</span><span>{"\u20AC"}5,000</span><span>{"\u20AC"}10,000</span><span>{"\u20AC"}20,000+</span></>
                  ) : (
                    <><span>{"\u20B9"}45k</span><span>{"\u20B9"}4.5L</span><span>{"\u20B9"}9L</span><span>{"\u20B9"}18L+</span></>
                  )}
                </div>
              </div>

              {/* Duration */}
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-400">Duration</p>
                <p className="mb-4 text-lg font-semibold text-white">How many days?</p>
                <div className="flex flex-wrap gap-3">
                  {durations.map(d => (
                    <button key={d} type="button" onClick={() => setDuration(d)}
                      className={"rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 " + (duration === d ? "border-accent-400 bg-accent-400 text-stone-950" : "border-white/15 text-stone-300 hover:border-white/40")}>
                      {d} days
                    </button>
                  ))}
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
                    <div><span className="text-stone-500">Destination</span><br /><span className="font-semibold text-white">{data.name}</span></div>
                    {hotel && <div><span className="text-stone-500">Hotel</span><br /><span className="font-semibold text-white capitalize">{hotel}</span></div>}
                    <div><span className="text-stone-500">Budget</span><br /><span className="font-semibold text-white">{currency === "EUR" ? `\u20AC${budget.toLocaleString("en-IN")}` : `\u20B9${(budget * EUR_TO_INR).toLocaleString("en-IN")}`}/person</span></div>
                    <div><span className="text-stone-500">Duration</span><br /><span className="font-semibold text-white">{duration} days</span></div>
                    <div><span className="text-stone-500">Group</span><br /><span className="font-semibold text-white">{groupSize} {groupSize === 1 ? "person" : "people"}</span></div>
                    {month && <div><span className="text-stone-500">Month</span><br /><span className="font-semibold text-white">{month} 2026</span></div>}
                  </div>
                </div>

              {error && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>
              )}

              <button type="submit" disabled={submitting}
                className="group w-full rounded-xl bg-accent-400 px-8 py-4 text-base font-bold text-stone-950 transition-all duration-300 hover:bg-accent-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent-400/25 disabled:opacity-60 disabled:cursor-not-allowed">
                {submitting ? "Sending your enquiry..." : "Save & send my " + data.name + " trip enquiry \u2192"}
              </button>

              <p className="text-center text-xs text-stone-500">No payment required. We will get back within 24 hours with a personalised itinerary.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}