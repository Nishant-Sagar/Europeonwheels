import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Helmet } from 'react-helmet-async'
import LeafletRouteMap from "../components/LeafletRouteMap"
import CarCard from "../components/CarCard"

const CITY_PHOTOS = {
  munich:        '/images/cities/munich.jpg',
  neuschwanstein:'/images/cities/neuschwanstein.jpg',
  rhine:         '/images/cities/rhine.jpg',
  'black forest': '/images/cities/black-forest.jpg',
  heidelberg:    '/images/cities/heidelberg.jpg',
  cologne:       '/images/cities/cologne.jpg',
  vienna:        '/images/cities/vienna.jpg',
  hallstatt:     '/images/cities/hallstatt.jpg',
  salzburg:      '/images/cities/salzburg.jpg',
  grossglockner: '/images/cities/grossglockner.jpg',
  innsbruck:     '/images/cities/innsbruck.jpg',
  prague:        '/images/cities/prague.jpg',
  'karlovy vary':'/images/cities/karlovy-vary.jpg',
  'cesky krumlov':'/images/cities/cesky-krumlov.jpg',
  'kutna hora':  '/images/cities/kutna-hora.jpg',
  budapest:      '/images/cities/budapest.jpg',
  balaton:       '/images/cities/balaton.jpg',
  ljubljana:     '/images/cities/ljubljana-multi.jpg',
  bled:          '/images/cities/bled-multi.jpg',
  bohinj:        '/images/cities/bohinj.jpg',
  soca:          '/images/cities/soca.jpg',
  postojna:      '/images/cities/postojna.jpg',
  piran:         '/images/cities/piran.jpg',
  bratislava:    '/images/cities/bratislava-multi.jpg',
  tatras:        '/images/cities/tatras.jpg',
  spis:          '/images/cities/spis.jpg',
  karst:         '/images/cities/karst.jpg',
  'banska':      '/images/cities/banska.jpg',
  dubrovnik:     '/images/cities/dubrovnik-multi.jpg',
  split:         '/images/cities/split.jpg',
  plitvice:      '/images/cities/plitvice.jpg',
  hvar:          '/images/cities/hvar.jpg',
  zagreb:        '/images/cities/zagreb.jpg',
  warsaw:        '/images/cities/warsaw.jpg',
  krakow:        '/images/cities/krakow.jpg',
  gdansk:        '/images/cities/gdansk.jpg',
  zakopane:      '/images/cities/zakopane.jpg',
  frankfurt:     '/images/cities/frankfurt.jpg',
  berlin:        '/images/cities/berlin.jpg',
  amsterdam:     '/images/cities/amsterdam.jpg',
  brussels:      '/images/cities/brussels.jpg',
  paris:         '/images/cities/paris.jpg',
  alps:          '/images/cities/alps-multi.jpg',
  venice:        '/images/cities/venice.jpg',
  florence:      '/images/cities/florence.jpg',
  rome:          '/images/cities/rome.jpg',
  departure:     '/images/cities/departure.jpg',
  geneva:        '/images/cities/geneva.jpg',
  zurich:        '/images/cities/zurich.jpg',
  lucerne:       '/images/cities/lucerne.jpg',
  jungfrau:      '/images/cities/jungfrau.jpg',
  interlaken:    '/images/cities/interlaken.jpg',
  bern:          '/images/cities/bern.jpg',
  zermatt:       '/images/cities/zermatt.jpg',
  siena:         '/images/cities/siena.jpg',
  amalfi:        '/images/cities/amalfi.jpg',
  milan:         '/images/cities/milan.jpg',
  como:          '/images/cities/como.jpg',
  korcula:       '/images/cities/korcula.jpg',
  rovinj:        '/images/cities/rovinj.jpg',
}

const FALLBACK_PHOTO = '/images/cities/fallback.jpg'

function getCityImage(title) {
  const lower = title.toLowerCase()
  for (const [key, url] of Object.entries(CITY_PHOTOS)) {
    if (lower.includes(key)) return url
  }
  return FALLBACK_PHOTO
}

const routeData = {
  "central-europe-loop": {
    name: "Central Europe Loop",
    label: "4 Countries - 14 Days",
    image: "/images/route-4-countries.webp",
    tagline: "The classic Central Europe circuit -- cities, culture and grand architecture",
    countries: ["Germany", "Austria", "Czech Republic", "Hungary"],
    mapStops: [
      { day: 1,  title: "Frankfurt",  coords: [50.1109, 8.6821],  desc: "Land at FRA. Private transfer to your hotel." },
      { day: 3,  title: "Cologne",    coords: [50.9333, 6.9500],  desc: "Cologne Cathedral and the old town." },
      { day: 4,  title: "Munich",     coords: [48.1351, 11.5820], desc: "Marienplatz, Viktualienmarkt and beer gardens." },
      { day: 6,  title: "Vienna",     coords: [48.2082, 16.3738], desc: "Schoenbrunn Palace, Hofburg and Naschmarkt." },
      { day: 8,  title: "Prague",     coords: [50.0755, 14.4378], desc: "Prague Castle, Charles Bridge and Old Town." },
      { day: 11, title: "Budapest",   coords: [47.4979, 19.0402], desc: "Buda Castle, Fisherman Bastion and thermal baths." },
    ],
    itinerary: [
      { day: 1,  title: "Arrive Frankfurt",      desc: "Land at FRA. Private transfer to your hotel. Evening walk along the River Main." },
      { day: 2,  title: "Frankfurt to Rhine",     desc: "Explore the old town, then drive the scenic Rhine Valley -- vineyards and medieval castles." },
      { day: 3,  title: "Cologne",                desc: "Cologne Cathedral, the old town and a riverside dinner." },
      { day: 4,  title: "Drive to Munich",        desc: "Cross into Bavaria. Neuschwanstein detour optional en route. Check in Munich." },
      { day: 5,  title: "Munich",                 desc: "Marienplatz, Viktualienmarkt, English Garden and evening in a beer garden.", image: '/images/cities/marienplatz.jpg' },
      { day: 6,  title: "Munich to Vienna",       desc: "Scenic drive through the Alps. Arrive Vienna -- Ringstrasse and Opera House orientation.", image: '/images/cities/alps-multi.jpg' },
      { day: 7,  title: "Imperial Vienna",        desc: "Schoenbrunn Palace, Hofburg, Naschmarkt and Cafe Central.", image: '/images/cities/schoenbrunn.jpg' },
      { day: 8,  title: "Vienna to Prague",       desc: "Drive north through Bohemian countryside. Arrive Prague, evening river cruise.", image: '/images/cities/prague-castle.jpg' },
      { day: 9,  title: "Prague",                 desc: "Prague Castle, Charles Bridge, Old Town Square and Astronomical Clock." },
      { day: 10, title: "Cesky Krumlov Day Trip", desc: "UNESCO Baroque town wrapped by a river bend -- the highlight of Bohemia." },
      { day: 11, title: "Prague to Budapest",     desc: "Drive through the Slovak lowlands. Arrive Budapest, Danube Promenade dinner.", image: '/images/cities/old-town-prague.jpg' },
      { day: 12, title: "Budapest",               desc: "Buda Castle, Fisherman Bastion, Parliament tour and thermal baths." },
      { day: 13, title: "Danube Bend",            desc: "Day trip to Szentendre, Visegrad and Esztergom. Back for a farewell dinner.", image: '/images/cities/danube-bend.jpg' },
      { day: 14, title: "Departure",              desc: "Transfer to Budapest Ferenc Liszt Airport. Safe travels." },
    ],
  },
  "central-extended": {
    name: "Central Extended",
    label: "6 Countries - 18 Days",
    image: "/images/slovenia.webp",
    tagline: "Central Europe with Adriatic beauty -- from Alps to the coast",
    countries: ["Germany", "Austria", "Czech Republic", "Hungary", "Slovenia", "Croatia"],
    mapStops: [
      { day: 1,  title: "Munich",      coords: [48.1351, 11.5820], desc: "Private airport transfer. Evening in Marienplatz." },
      { day: 3,  title: "Vienna",      coords: [48.2082, 16.3738], desc: "Schoenbrunn, Hofburg and evening opera." },
      { day: 5,  title: "Prague",      coords: [50.0755, 14.4378], desc: "Castle, Charles Bridge and Jewish Quarter." },
      { day: 7,  title: "Budapest",    coords: [47.4979, 19.0402], desc: "Buda side, thermal baths and ruin bars." },
      { day: 9,  title: "Ljubljana",   coords: [46.0569, 14.5058], desc: "Dragon Bridge, castle and riverside market." },
      { day: 11, title: "Lake Bled",   coords: [46.3683, 14.0934], desc: "Island church, cliff castle and kremsnita." },
      { day: 14, title: "Dubrovnik",   coords: [42.6507, 18.0944], desc: "Walk the ancient walls at sunset." },
      { day: 17, title: "Split",       coords: [43.5147, 16.4435], desc: "Diocletian Palace and coastal farewell dinner." },
    ],
    itinerary: [
      { day: 1,  title: "Arrive Munich",          desc: "Private airport transfer. Evening in Marienplatz." },
      { day: 2,  title: "Neuschwanstein",         desc: "The fairy-tale castle that inspired Disney. Afternoon in Augsburg." },
      { day: 3,  title: "Munich to Vienna",       desc: "Alpine highway crossing into Austria. Arrive Vienna.", image: '/images/cities/alps-multi.jpg' },
      { day: 4,  title: "Imperial Vienna",        desc: "Schoenbrunn, Hofburg, Naschmarkt and evening opera." },
      { day: 5,  title: "Vienna to Prague",       desc: "Morning coffee at Cafe Central, then drive to Prague.", image: '/images/cities/schoenbrunn.jpg' },
      { day: 6,  title: "Prague",                 desc: "Castle, Charles Bridge and Jewish Quarter." },
      { day: 7,  title: "Prague to Budapest",     desc: "Full day drive with a Brno stopover.", image: '/images/cities/prague-castle.jpg' },
      { day: 8,  title: "Budapest",               desc: "Buda side, thermal baths and ruin bars." },
      { day: 9,  title: "Budapest to Ljubljana",  desc: "Cross into Slovenia via Austria. Arrive Ljubljana.", image: '/images/cities/buda-castle.jpg' },
      { day: 10, title: "Ljubljana",              desc: "Dragon Bridge, castle and riverside market." },
      { day: 11, title: "Lake Bled",              desc: "Island church, cliff castle and traditional kremsnita." },
      { day: 12, title: "Triglav Park",           desc: "Vintgar Gorge and Lake Bohinj -- total alpine serenity.", image: '/images/cities/bohinj.jpg' },
      { day: 13, title: "Soca Valley",            desc: "Electric-blue river and WWI history." },
      { day: 14, title: "Drive to Dubrovnik",     desc: "Coastal road through Croatia. Arrive Dubrovnik." },
      { day: 15, title: "Dubrovnik",              desc: "Walk the ancient walls at sunset -- best view in Europe.", image: '/images/cities/dubrovnik-walls.jpg' },
      { day: 16, title: "Korcula Island",         desc: "Marco Polo island, fresh fish and local wine.", image: '/images/cities/korcula.jpg' },
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
    mapStops: [
      { day: 1,  title: "Frankfurt",  coords: [50.1109, 8.6821],  desc: "Transfer and settle in. Evening along the Main." },
      { day: 2,  title: "Baden-Baden",coords: [48.7606, 8.2394],  desc: "Black Forest drive and thermal baths." },
      { day: 3,  title: "Zurich",     coords: [47.3769, 8.5417],  desc: "Cross the Rhine into Switzerland." },
      { day: 4,  title: "Lucerne",    coords: [47.0502, 8.3093],  desc: "Chapel Bridge and Lake Lucerne cruise." },
      { day: 6,  title: "Milan",      coords: [45.4642, 9.1900],  desc: "Duomo, Galleria and last supper." },
      { day: 7,  title: "Venice",     coords: [45.4408, 12.3155], desc: "St Mark, Doge Palace and gondola." },
      { day: 9,  title: "Florence",   coords: [43.7696, 11.2558], desc: "Uffizi, Ponte Vecchio and Tuscany." },
      { day: 11, title: "Rome",       coords: [41.9028, 12.4964], desc: "Colosseum, Forum and Trastevere." },
    ],
    itinerary: [
      { day: 1,  title: "Arrive Frankfurt",       desc: "Transfer and settle in. Evening stroll along the Main." },
      { day: 2,  title: "Black Forest Drive",     desc: "Cuckoo clocks, forest roads and Baden-Baden thermal baths." },
      { day: 3,  title: "Drive to Zurich",        desc: "Cross the Rhine into Switzerland. Zurich evening on the Limmat." },
      { day: 4,  title: "Lucerne",                desc: "Chapel Bridge, Lion Monument and boat cruise." },
      { day: 5,  title: "Jungfrau",               desc: "Cogwheel train to the Top of Europe. Grindelwald glaciers." },
      { day: 6,  title: "Zurich to Milan",        desc: "Cross the Alps. Milan -- Duomo, Galleria and last supper.", image: '/images/cities/milan.jpg' },
      { day: 7,  title: "Drive to Venice",        desc: "Arrive Venice by afternoon. Water taxi to the hotel." },
      { day: 8,  title: "Venice",                 desc: "St Mark, Doge Palace and gondola through back canals.", image: '/images/cities/st-marks.jpg' },
      { day: 9,  title: "Drive to Florence",      desc: "Via Verona. Uffizi skip-the-line, Ponte Vecchio." },
      { day: 10, title: "Tuscany Drive",          desc: "Val d Orcia cypress roads and Siena Piazza del Campo.", image: '/images/cities/siena.jpg' },
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
    mapStops: [
      { day: 1, title: "Vienna",    coords: [48.2082, 16.3738], desc: "Private transfer. Ringstrasse and welcome dinner." },
      { day: 3, title: "Salzburg",  coords: [47.8095, 13.0550], desc: "Mozart, fortress and Sound-of-Music drive." },
      { day: 4, title: "Grossglockner", coords: [47.0746, 12.6954], desc: "Europe's most scenic mountain pass." },
      { day: 5, title: "Zurich",    coords: [47.3769, 8.5417],  desc: "Cross into Switzerland. Lake Zurich evening." },
      { day: 6, title: "Lucerne",   coords: [47.0502, 8.3093],  desc: "Chapel Bridge and Jungfrau panorama." },
      { day: 7, title: "Zermatt",   coords: [46.0207, 7.7491],  desc: "Car-free village under the Matterhorn." },
      { day: 8, title: "Milan",     coords: [45.4642, 9.1900],  desc: "Cross into Italy. Duomo and Brera." },
      { day: 9, title: "Lake Como", coords: [45.9848, 9.2713],  desc: "Bellagio and the most beautiful lake." },
    ],
    itinerary: [
      { day: 1,  title: "Arrive Vienna",          desc: "Private transfer. Ringstrasse and welcome dinner." },
      { day: 2,  title: "Imperial Vienna",        desc: "Schoenbrunn, Hofburg and Sachertorte at Cafe Central.", image: '/images/cities/schoenbrunn.jpg' },
      { day: 3,  title: "Salzburg",               desc: "Mozart, Hohensalzburg fortress and Sound-of-Music location drive." },
      { day: 4,  title: "Grossglockner",          desc: "Europe most scenic mountain pass -- glaciers and total silence." },
      { day: 5,  title: "Drive to Zurich",        desc: "Cross into Switzerland via Innsbruck. Lake Zurich evening." },
      { day: 6,  title: "Lucerne and Interlaken", desc: "Chapel Bridge, Jungfrau panorama and mountain village lunch." },
      { day: 7,  title: "Zermatt",               desc: "Car-free village under the Matterhorn. Gornergrat railway." },
      { day: 8,  title: "Milan",                 desc: "Cross into Italy. Duomo, Brera and Aperol at sunset.", image: '/images/cities/milan.jpg' },
      { day: 9,  title: "Lake Como",             desc: "Bellagio, villa gardens and the most beautiful lake in Europe.", image: '/images/cities/como.jpg' },
      { day: 10, title: "Departure",             desc: "Transfer to Milan Malpensa Airport." },
    ],
  },
  "castle-capital-loop": {
    name: "Castle and Capital Loop",
    label: "4 Countries - 12 Days",
    image: "/images/route-central-loop.webp",
    tagline: "Four capitals and countless castles in a compact, efficient circuit",
    countries: ["Czech Republic", "Austria", "Slovakia", "Hungary"],
    mapStops: [
      { day: 1,  title: "Prague",       coords: [50.0755, 14.4378], desc: "Transfer to Old Town. Evening river cruise." },
      { day: 3,  title: "Cesky Krumlov",coords: [48.8127, 14.3175], desc: "UNESCO Baroque town and castle." },
      { day: 4,  title: "Vienna",       coords: [48.2082, 16.3738], desc: "Schoenbrunn, Hofburg and Naschmarkt." },
      { day: 6,  title: "Bratislava",   coords: [48.1486, 17.1077], desc: "Old Town, castle and halusky." },
      { day: 8,  title: "High Tatras",  coords: [49.1194, 20.0609], desc: "Slovakia's alpine playground." },
      { day: 10, title: "Budapest",     coords: [47.4979, 19.0402], desc: "Parliament, Fisherman Bastion and baths." },
    ],
    itinerary: [
      { day: 1,  title: "Arrive Prague",          desc: "Transfer to Old Town. Evening river cruise on the Vltava." },
      { day: 2,  title: "Prague",                 desc: "Castle, Charles Bridge and Jewish Quarter.", image: '/images/cities/prague-castle.jpg' },
      { day: 3,  title: "Cesky Krumlov",          desc: "UNESCO Baroque town -- castle, rafting and medieval streets." },
      { day: 4,  title: "Prague to Vienna",       desc: "Drive south via Brno. Arrive Vienna evening." },
      { day: 5,  title: "Imperial Vienna",        desc: "Schoenbrunn, Hofburg and Naschmarkt.", image: '/images/cities/schoenbrunn.jpg' },
      { day: 6,  title: "Vienna to Bratislava",   desc: "Only 60km apart -- the world closest capital pair. Afternoon arrival.", image: '/images/cities/bratislava-castle.jpg' },
      { day: 7,  title: "Bratislava",             desc: "Old Town, castle and the best halusky of your life." },
      { day: 8,  title: "High Tatras Day Trip",   desc: "Slovakia alpine playground -- cable cars and glacial lakes." },
      { day: 9,  title: "Spis Castle",           desc: "Largest UNESCO castle complex in Central Europe." },
      { day: 10, title: "Drive to Budapest",      desc: "Follow the Danube south into Hungary." },
      { day: 11, title: "Budapest",               desc: "Parliament, Fisherman Bastion and farewell thermal bath soak.", image: '/images/cities/parliament-budapest.jpg' },
      { day: 12, title: "Departure",              desc: "Transfer to Budapest Airport." },
    ],
  },
  "grand-nine": {
    name: "The Grand Nine",
    label: "9 Countries - 25 Days",
    image: "/images/route-grand-9.webp",
    tagline: "All nine countries in one epic private journey -- the definitive Europe road trip",
    countries: ["Germany", "Austria", "Czech Republic", "Hungary", "Slovenia", "Slovakia", "Croatia", "Italy", "Switzerland"],
    mapStops: [
      { day: 1,  title: "Frankfurt",   coords: [50.1109, 8.6821],  desc: "Begin the grand journey." },
      { day: 3,  title: "Munich",      coords: [48.1351, 11.5820], desc: "Neuschwanstein and beer gardens." },
      { day: 5,  title: "Vienna",      coords: [48.2082, 16.3738], desc: "Imperial Austria." },
      { day: 7,  title: "Prague",      coords: [50.0755, 14.4378], desc: "Fairy-tale Bohemia." },
      { day: 9,  title: "Budapest",    coords: [47.4979, 19.0402], desc: "Pearl of the Danube." },
      { day: 11, title: "Bratislava",  coords: [48.1486, 17.1077], desc: "Slovak capital." },
      { day: 13, title: "Ljubljana",   coords: [46.0569, 14.5058], desc: "Slovenia and Lake Bled." },
      { day: 15, title: "Dubrovnik",   coords: [42.6507, 18.0944], desc: "Croatia coast." },
      { day: 17, title: "Venice",      coords: [45.4408, 12.3155], desc: "Canals and gondolas." },
      { day: 19, title: "Florence",    coords: [43.7696, 11.2558], desc: "Uffizi and Tuscany." },
      { day: 21, title: "Rome",        coords: [41.9028, 12.4964], desc: "The eternal city." },
      { day: 23, title: "Zurich",      coords: [47.3769, 8.5417],  desc: "Swiss alpine finale." },
    ],
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

const carOptions = [
  { id: "sedan",        label: "Sedan",        sub: "Škoda Octavia or similar",        seats: 2,
    imgs: ["/images/cars/sedan-ext.jpg", "/images/cars/sedan-int.jpg", "/images/cars/sedan-dash.jpg"] },
  { id: "luxury-sedan", label: "Luxury Sedan", sub: "Mercedes E-Class or similar",     seats: 2,
    imgs: ["/images/cars/luxury-sedan-ext.jpg", "/images/cars/luxury-sedan-int.jpg", "/images/cars/luxury-sedan-rear.jpg"] },
  { id: "mpv",          label: "MPV",          sub: "Volkswagen Touran or similar",    seats: 3,
    imgs: ["/images/cars/mpv-ext.jpg", "/images/cars/mpv-int.jpg", "/images/cars/mpv-rear.jpg"] },
  { id: "std-van",      label: "Standard Van", sub: "Volkswagen Caravelle or similar", seats: 7,
    imgs: ["/images/cars/std-van-ext.jpg", "/images/cars/std-van-int.jpg", "/images/cars/std-van-rear.jpg"] },
  { id: "luxury-van",   label: "Luxury Van",   sub: "Mercedes V-Class or similar",     seats: 6,
    imgs: ["/images/cars/luxury-van-ext.jpg", "/images/cars/luxury-van-int.jpg", "/images/cars/luxury-van-rear.jpg"] },
]

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const EUR_TO_INR = 90
const EUR_TO_USD  = 1.08

function budgetLabel(v) {
  if (v < 2000)  return "Budget Explorer"
  if (v < 4000)  return "Comfort Traveller"
  if (v < 7000)  return "Premium Experience"
  if (v < 12000) return "Luxury Journey"
  return "Ultra-Luxury"
}

export default function TourPlannerMulti() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const data = routeData[slug]

  const [car,          setCar]          = useState("")
  const [bootLuggage,  setBootLuggage]  = useState(2)
  const [cabinLuggage, setCabinLuggage] = useState(1)
  const [budget,       setBudget]       = useState(7000)
  const [currency,     setCurrency]     = useState("EUR")
  const [month,        setMonth]        = useState("")
  const [duration,     setDuration]     = useState(data?.itinerary?.length ?? 14)
  const [groupSize,    setGroupSize]    = useState(2)
  const [name,       setName]       = useState("")
  const [email,      setEmail]      = useState("")
  const [phone,      setPhone]      = useState("")
  const [notes,      setNotes]      = useState("")
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
    if (!month || !name || !email || !phone) {
      setError("Please fill in your name, email, phone number and travel month.")
      return
    }
    setError("")
    setSubmitting(true)
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiBase}/api/enquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone,
          country: data.name,
          form_type: "multi_country",
          vehicle_type: car,
          luggage_boot: bootLuggage,
          luggage_cabin: cabinLuggage,
          budget_eur: budget,
          group_size: groupSize,
          travel_month: month + " 2026",
          duration_days: duration,
          special_requests: notes,
        }),
      })
      if (!res.ok) throw new Error("Server error")
      navigate('/thank-you', {
        state: {
          lead: true,
          formType: 'multi-country',
          name,
          enquiryLabel: data.name,
          whatsappText: `Hi, I just submitted a multi-country tour enquiry for ${data.name}.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMonth: ${month} 2026\nDuration: ${duration} days\nGroup: ${groupSize} person${groupSize > 1 ? 's' : ''}${car ? `\nCar: ${car}` : ''}\nBudget: €${budget.toLocaleString()}${notes ? `\nNotes: ${notes}` : ''}`,
          backTo: '/multi-country',
          backLabel: 'Explore other routes',
          details: [
            { label: 'Route', value: data.name },
            { label: 'Month', value: `${month} 2026` },
            { label: 'Duration', value: `${duration} days` },
            { label: 'Group', value: `${groupSize} ${groupSize === 1 ? 'person' : 'people'}` },
          ],
        },
      })
    } catch {
      setError("Something went wrong. Please try again or email us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  const groupLabel = groupSize === 1 ? "Solo traveller" : groupSize <= 2 ? "Couple" : groupSize <= 4 ? "Small group" : "Large group"

  return (
    <div className="relative bg-stone-950 min-h-screen text-white">
      <Helmet>
        <title>{data ? `Plan ${data.label} Route — Europe on Wheels` : 'Multi-Country Tour Planner — Europe on Wheels'}</title>
        <meta name="description" content={data ? `Plan a ${data.label} private chauffeur road trip across Europe. Choose your hotel, car, dates and budget — we handle the rest.` : 'Plan your bespoke multi-country European chauffeur tour with Europe on Wheels.'} />
        <meta property="og:type" content="website" />
      </Helmet>
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
                  <div className="flex-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.02] transition-all duration-200 hover:border-accent-400/20 hover:from-accent-400/5 flex flex-col sm:flex-row sm:h-24">
                    <div className="flex-1 min-w-0 px-5 py-4 sm:px-6 overflow-hidden">
                      <p className="font-semibold text-white truncate">{day.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-stone-400 line-clamp-2">{day.desc}</p>
                    </div>
                    <div className="h-28 sm:h-auto sm:w-36 shrink-0 overflow-hidden -order-1 sm:order-none rounded-t-2xl sm:rounded-t-none">
                      <img
                        src={day.image || getCityImage(day.title)}
                        alt={day.title}
                        className="h-full w-full object-cover opacity-55 transition-opacity duration-300 hover:opacity-75"
                        loading="lazy"
                        onError={e => { e.currentTarget.parentElement.style.display = 'none' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-stone-500">Sample outline -- your actual itinerary is custom-built from your preferences below.</p>
        </div>
      </section>

      {/* Map */}
      {data.mapStops && (
        <section className="relative z-10 bg-stone-950 px-4 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Route overview</p>
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Your journey, mapped</h2>
            <LeafletRouteMap stops={data.mapStops} />
            <p className="mt-3 text-center text-xs text-stone-500">Click any pin to see the stop detail. Map data &copy; OpenStreetMap contributors.</p>
          </div>
        </section>
      )}

      {/* Planner */}
      <section className="relative z-10 bg-stone-900 px-4 py-12 sm:px-8 sm:py-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(245,158,11,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(120,53,15,0.08) 0%, transparent 50%)" }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />
        <div className="mx-auto max-w-4xl relative z-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Build your trip</p>
          <h2 className="mb-2 text-2xl font-bold sm:text-4xl">Customise &amp; enquire</h2>
          <p className="mb-8 text-sm text-stone-400 sm:mb-10 sm:text-base">Not a form -- a trip builder. Tell us what you want and we will handle the rest.</p>

          <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">

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

              {/* Duration · Group size */}
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    label: 'Duration', question: 'How many days?',
                    value: duration, unit: duration === 1 ? 'day' : 'days',
                    dec: () => setDuration(Math.max(1, duration - 1)),
                    inc: () => setDuration(Math.min(60, duration + 1)),
                  },
                  {
                    label: 'Group size', question: 'How many travelling?',
                    value: groupSize, unit: groupLabel,
                    dec: () => setGroupSize(Math.max(1, groupSize - 1)),
                    inc: () => setGroupSize(Math.min(20, groupSize + 1)),
                  },
                ].map(({ label, question, value, unit, dec, inc }) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-stone-400">{label}</p>
                    <p className="mb-6 text-base font-semibold text-white">{question}</p>
                    <div className="flex items-center justify-between">
                      <button type="button" onClick={dec}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-2xl font-bold text-white hover:bg-white/10 hover:border-white/30 transition-all">
                        &minus;
                      </button>
                      <div className="text-center">
                        <span className="text-4xl font-bold text-white">{value}</span>
                        <p className="mt-0.5 text-xs text-stone-500">{unit}</p>
                      </div>
                      <button type="button" onClick={inc}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-2xl font-bold text-white hover:bg-white/10 hover:border-white/30 transition-all">
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Budget */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Total budget</p>
                  <div className="flex items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-xs font-bold">
                    {["EUR","USD","INR"].map(c => (
                      <button key={c} type="button" onClick={() => setCurrency(c)}
                        className={"rounded-full px-3 py-1 transition-all duration-200 " + (currency === c ? "bg-accent-400 text-stone-950" : "text-stone-400 hover:text-white")}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-3 flex items-end justify-between">
                  <p className="text-lg font-semibold text-white">
                    {currency === "EUR" && <>{"€"}{budget.toLocaleString()}</>}
                    {currency === "USD" && <>${Math.round(budget * EUR_TO_USD).toLocaleString()}</>}
                    {currency === "INR" && <>{"₹"}{(budget * EUR_TO_INR).toLocaleString("en-IN")}</>}
                    <span className="ml-2 text-sm font-normal text-stone-400">per person</span>
                  </p>
                  <span className="rounded-full border border-accent-400/30 bg-accent-400/10 px-3 py-0.5 text-xs font-bold text-accent-400">{budgetLabel(budget)}</span>
                </div>
                <input type="range" min={500} max={25000} step={250} value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="w-full cursor-pointer" style={{ accentColor: "#f59e0b" }} />
                <div className="mt-1 flex justify-between text-[10px] text-stone-500">
                  {currency === "EUR" && <><span>{"\u20AC"}500</span><span>{"\u20AC"}6k</span><span>{"\u20AC"}12k</span><span>{"\u20AC"}25k+</span></>}
                  {currency === "USD" && <><span>$540</span><span>$6.5k</span><span>$13k</span><span>$27k+</span></>}
                  {currency === "INR" && <><span>{"\u20B9"}45k</span><span>{"\u20B9"}5.4L</span><span>{"\u20B9"}10.8L</span><span>{"\u20B9"}22.5L+</span></>}
                </div>
              </div>

              {/* Car */}
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-400">Vehicle</p>
                <p className="mb-4 text-lg font-semibold text-white">Choose your ride</p>
                <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0">
                  {carOptions.map(c => (
                    <CarCard key={c.id} car={c} isSelected={car === c.id} onClick={() => setCar(c.id)} />
                  ))}
                </div>
              </div>

              {/* Luggage */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-stone-400">Luggage</p>
                <p className="mb-6 text-base font-semibold text-white">How many luggages?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07]">
                  {[
                    { key: 'boot',  label: 'Boot Luggage',  hint: 'Suitcases & check-in bags', value: bootLuggage,  dec: () => setBootLuggage(Math.max(0, bootLuggage - 1)),   inc: () => setBootLuggage(Math.min(20, bootLuggage + 1))   },
                    { key: 'cabin', label: 'Cabin Luggage', hint: 'Hand bags & carry-ons',      value: cabinLuggage, dec: () => setCabinLuggage(Math.max(0, cabinLuggage - 1)), inc: () => setCabinLuggage(Math.min(20, cabinLuggage + 1)) },
                  ].map(({ key, label, hint, value, dec, inc }) => (
                    <div key={key} className="flex flex-col items-center gap-4 bg-white/[0.02] px-4 py-5">
                      <div className="text-center">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-stone-300">{label}</p>
                        <p className="mt-1 text-[11px] text-stone-500">{hint}</p>
                      </div>
                      <div className="flex items-center gap-5">
                        <button type="button" onClick={dec}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xl font-bold text-white hover:bg-white/10 transition-all">−</button>
                        <span className="w-8 text-center text-3xl font-bold text-white">{value}</span>
                        <button type="button" onClick={inc}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xl font-bold text-white hover:bg-white/10 transition-all">+</button>
                      </div>
                    </div>
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
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-stone-600 outline-none focus:border-accent-400/60 focus:ring-1 focus:ring-accent-400/30 transition-all" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-stone-400">Email *</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-stone-600 outline-none focus:border-accent-400/60 focus:ring-1 focus:ring-accent-400/30 transition-all" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-stone-400">Phone *</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+44 7700 000000" required
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
                    <div><span className="text-stone-500">Route</span><br /><span className="font-semibold text-white">{data.name}</span></div>
                    {car && <div><span className="text-stone-500">Vehicle</span><br /><span className="font-semibold text-white">{carOptions.find(c => c.id === car)?.label}</span></div>}
                    <div><span className="text-stone-500">Budget</span><br /><span className="font-semibold text-white">{currency === "EUR" ? `€${budget.toLocaleString()}` : currency === "USD" ? `$${Math.round(budget * EUR_TO_USD).toLocaleString()}` : `₹${(budget * EUR_TO_INR).toLocaleString("en-IN")}`}/person</span></div>
                    <div><span className="text-stone-500">Duration</span><br /><span className="font-semibold text-white">{duration} days</span></div>
                    <div><span className="text-stone-500">Group</span><br /><span className="font-semibold text-white">{groupSize} {groupSize === 1 ? "person" : "people"}</span></div>
                    <div><span className="text-stone-500">Boot bags</span><br /><span className="font-semibold text-white">{bootLuggage}</span></div>
                    <div><span className="text-stone-500">Cabin bags</span><br /><span className="font-semibold text-white">{cabinLuggage}</span></div>
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
        </div>
      </section>
    </div>
  )
}