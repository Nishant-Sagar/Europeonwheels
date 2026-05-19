import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import CarCard from '../components/CarCard'

const highlights = [
  { icon: '🗺️', title: 'Any Destination', desc: 'One country or ten — we plan it all' },
  { icon: '🚘', title: 'Private Chauffeur', desc: 'Door-to-door in comfort, no driving stress' },
  { icon: '🏨', title: 'Curated Stays', desc: 'Boutique hotels & hidden gems hand-picked' },
  { icon: '✏️', title: 'Fully Bespoke', desc: 'Every detail built around your preferences' },
]

const hotelOptions = [
  { id: 'budget',   label: 'Budget',   sub: 'Clean & central',   icon: '🏨' },
  { id: '3star',    label: '3-Star',   sub: 'Comfort & value',   icon: '⭐⭐⭐' },
  { id: '4star',    label: '4-Star',   sub: 'Superior style',    icon: '⭐⭐⭐⭐' },
  { id: '5star',    label: '5-Star',   sub: 'Luxury & beyond',   icon: '⭐⭐⭐⭐⭐' },
  { id: 'boutique', label: 'Boutique', sub: 'Unique & local',    icon: '🏡' },
  { id: 'heritage', label: 'Heritage', sub: 'Historic palaces',  icon: '🏰' },
]

const carOptions = [
  { id: 'sedan',        label: 'Sedan',        sub: 'Škoda Octavia or similar',        seats: 2,
    imgs: ['/images/cars/sedan-ext.jpg', '/images/cars/sedan-int.jpg', '/images/cars/sedan-dash.jpg'] },
  { id: 'luxury-sedan', label: 'Luxury Sedan', sub: 'Mercedes E-Class or similar',     seats: 2,
    imgs: ['/images/cars/luxury-sedan-ext.jpg', '/images/cars/luxury-sedan-int.jpg', '/images/cars/luxury-sedan-rear.jpg'] },
  { id: 'mpv',          label: 'MPV',          sub: 'Volkswagen Touran or similar',    seats: 3,
    imgs: ['/images/cars/mpv-ext.jpg', '/images/cars/mpv-int.jpg', '/images/cars/mpv-rear.jpg'] },
  { id: 'std-van',      label: 'Standard Van', sub: 'Volkswagen Caravelle or similar', seats: 7,
    imgs: ['/images/cars/std-van-ext.jpg', '/images/cars/std-van-int.jpg', '/images/cars/std-van-rear.jpg'] },
  { id: 'luxury-van',   label: 'Luxury Van',   sub: 'Mercedes V-Class or similar',     seats: 6,
    imgs: ['/images/cars/luxury-van-ext.jpg', '/images/cars/luxury-van-int.jpg', '/images/cars/luxury-van-rear.jpg'] },
]

const countryOptions = [
  { id: 'germany',        label: 'Germany',        flag: '🇩🇪' },
  { id: 'austria',        label: 'Austria',         flag: '🇦🇹' },
  { id: 'czech-republic', label: 'Czech Republic',  flag: '🇨🇿' },
  { id: 'hungary',        label: 'Hungary',          flag: '🇭🇺' },
  { id: 'slovenia',       label: 'Slovenia',         flag: '🇸🇮' },
  { id: 'croatia',        label: 'Croatia',          flag: '🇭🇷' },
  { id: 'italy',          label: 'Italy',            flag: '🇮🇹' },
  { id: 'switzerland',    label: 'Switzerland',      flag: '🇨🇭' },
  { id: 'slovakia',       label: 'Slovakia',         flag: '🇸🇰' },
]

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAY_NAMES = ['Mo','Tu','We','Th','Fr','Sa','Su']

const EUR_TO_INR = 90
const EUR_TO_USD = 1.08

function budgetLabel(v) {
  if (v < 2000)  return 'Budget Explorer'
  if (v < 4000)  return 'Comfort Traveller'
  if (v < 7000)  return 'Premium Experience'
  if (v < 12000) return 'Luxury Journey'
  return 'Ultra-Luxury'
}

function fmtDate(d) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getDaysInMonth(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const offset = firstDay === 0 ? 6 : firstDay - 1
  const total = new Date(year, month + 1, 0).getDate()
  const days = Array(offset).fill(null)
  for (let d = 1; d <= total; d++) days.push(new Date(year, month, d))
  return days
}

export default function CustomTour() {
  const [selectedCountries, setSelectedCountries] = useState([])
  const [calOpen,    setCalOpen]    = useState(false)
  const [calYear,    setCalYear]    = useState(() => new Date().getFullYear())
  const [calMonth,   setCalMonth]   = useState(() => new Date().getMonth())
  const [startDate,  setStartDate]  = useState(null)
  const [endDate,    setEndDate]    = useState(null)
  const [hoverDate,  setHoverDate]  = useState(null)
  const [selecting,  setSelecting]  = useState(false)
  const calRef = useRef(null)

  const [hotel,        setHotel]        = useState('')
  const [car,          setCar]          = useState('')
  const [bootLuggage,  setBootLuggage]  = useState(2)
  const [cabinLuggage, setCabinLuggage] = useState(1)
  const [budget,       setBudget]       = useState(5000)
  const [currency,     setCurrency]     = useState('EUR')
  const [month,        setMonth]        = useState('')
  const [duration,     setDuration]     = useState(7)
  const [groupSize,    setGroupSize]    = useState(2)
  const [name,         setName]         = useState('')
  const [email,        setEmail]        = useState('')
  const [phone,        setPhone]        = useState('')
  const [notes,        setNotes]        = useState('')
  const [submitted,    setSubmitted]    = useState(false)
  const [submitting,   setSubmitting]   = useState(false)
  const [error,        setError]        = useState('')

  const groupLabel = groupSize === 1 ? 'Solo traveller' : groupSize <= 2 ? 'Couple' : groupSize <= 4 ? 'Small group' : 'Large group'

  // Close calendar on outside click
  useEffect(() => {
    if (!calOpen) return
    function handler(e) {
      if (calRef.current && !calRef.current.contains(e.target)) setCalOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [calOpen])

  function toggleCountry(id) {
    setSelectedCountries(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  function getDestinationsString() {
    return selectedCountries.map(id => countryOptions.find(c => c.id === id)?.label).join(', ')
  }

  const today = new Date(); today.setHours(0, 0, 0, 0)

  function handleDayClick(date) {
    if (date < today) return
    if (!selecting || !startDate || date < startDate) {
      setStartDate(date)
      setEndDate(null)
      setSelecting(true)
    } else {
      setEndDate(date)
      setSelecting(false)
      setCalOpen(false)
    }
  }

  function prevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11) }
    else setCalMonth(m => m - 1)
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0) }
    else setCalMonth(m => m + 1)
  }

  const travelDatesStr = startDate && endDate
    ? `${fmtDate(startDate)} – ${fmtDate(endDate)}`
    : startDate ? `${fmtDate(startDate)} – select end date` : ''

  const calDays = getDaysInMonth(calYear, calMonth)
  const isPrevDisabled = calYear === today.getFullYear() && calMonth === today.getMonth()

  function dayState(date) {
    if (!date) return 'empty'
    if (date < today) return 'past'
    const isStart = startDate && date.toDateString() === startDate.toDateString()
    const isEnd   = endDate   && date.toDateString() === endDate.toDateString()
    const rangeEnd = endDate || (selecting && hoverDate)
    const inRange = startDate && rangeEnd && date > Math.min(startDate, rangeEnd) && date < Math.max(startDate, rangeEnd)
    if (isStart) return 'start'
    if (isEnd)   return 'end'
    if (inRange) return 'range'
    if (date.toDateString() === today.toDateString()) return 'today'
    return 'normal'
  }

  const dayStyles = {
    empty:  '',
    past:   'text-stone-700 cursor-not-allowed',
    start:  'bg-accent-400 text-stone-950 font-bold rounded-lg cursor-pointer',
    end:    'bg-accent-400 text-stone-950 font-bold rounded-lg cursor-pointer',
    range:  'bg-accent-400/20 text-white cursor-pointer',
    today:  'border border-accent-400/50 text-accent-400 rounded-lg cursor-pointer hover:bg-white/10',
    normal: 'text-stone-300 rounded-lg cursor-pointer hover:bg-white/10',
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const destinationsStr = getDestinationsString()
    if (!destinationsStr || !hotel || !month || !name || !email) {
      setError('Please select at least one country, your name, email, hotel type and travel month.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const apiBase = import.meta.env.VITE_API_URL || ''
      const res = await fetch(`${apiBase}/api/enquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone,
          country: destinationsStr,
          form_type: 'custom_tour',
          hotel_type: hotel,
          vehicle_type: car,
          budget_eur: budget,
          group_size: groupSize,
          luggage_boot: bootLuggage,
          luggage_cabin: cabinLuggage,
          travel_month: month + ' 2026',
          duration_days: duration,
          special_requests: [travelDatesStr ? `Travel dates: ${travelDatesStr}` : '', notes].filter(Boolean).join('\n'),
        }),
      })
      if (!res.ok) throw new Error('Server error')
      setSubmitted(true)
      window.gtag?.('event', 'conversion', { send_to: 'AW-18164788165/4hgaCMK-ka4cEMXX0tVD', value: 1.0, currency: 'INR' })
    } catch {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative bg-stone-950 min-h-screen text-white">
      <Helmet>
        <title>Custom Tour Enquiry — Europe on Wheels</title>
        <meta name="description" content="Plan a bespoke European road trip. Tell us your dates, countries and budget — we craft a fully personalised private chauffeur tour just for you." />
        <meta property="og:title" content="Custom Tour Enquiry — Europe on Wheels" />
        <meta property="og:description" content="Plan your bespoke European road trip. Private chauffeur, tailored itinerary, your dates and budget." />
        <meta property="og:url" content="https://www.europeonwheels.in/custom-tour" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.europeonwheels.in/custom-tour" />
      </Helmet>
      <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Hero */}
      <section className="relative z-10 overflow-hidden" style={{ minHeight: '52vh' }}>
        <img src="/images/swiss-alps.webp" alt="" className="absolute inset-0 h-full w-full object-cover ken-burns" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-stone-950" />
        <div className="relative z-10 flex flex-col items-center justify-center px-5 text-center pb-16 pt-24 sm:pt-32" style={{ minHeight: '52vh' }}>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.42em] text-accent-400">Bespoke Travel</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl" style={{ textShadow: '0 4px 40px rgba(0,0,0,0.7)' }}>
            Build Your Dream Tour
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/60 sm:text-base">
            Tell us where you want to go, how you want to travel, and we'll craft a private itinerary around you — no templates, no compromises.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
            {highlights.map(({ icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-center backdrop-blur-sm">
                <div className="mb-1 text-xl">{icon}</div>
                <p className="text-[12px] font-semibold text-white">{title}</p>
                <p className="mt-0.5 text-[10px] leading-tight text-stone-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="relative z-10 bg-stone-900 px-4 py-12 sm:px-8 sm:py-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(245,158,11,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(120,53,15,0.08) 0%, transparent 50%)' }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />

        <div className="mx-auto max-w-4xl relative z-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Build your trip</p>
          <h2 className="mb-2 text-2xl font-bold sm:text-4xl">Customise &amp; enquire</h2>
          <p className="mb-8 text-sm text-stone-400 sm:mb-10 sm:text-base">Not a form — a trip builder. Tell us what you want and we will handle the rest.</p>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-8 py-12 text-center">
              <div className="mb-4 text-5xl">🎉</div>
              <h3 className="text-2xl font-bold text-white">You are all set, {name}!</h3>
              <p className="mt-3 text-stone-300">Your custom tour enquiry has been saved. We will get back to you within 24 hours with a personalised itinerary.</p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/919108116181?text=${encodeURIComponent(`Hi, I just submitted a custom tour enquiry.\n\nDestinations: ${getDestinationsString()}\nName: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\nMonth: ${month} 2026\nDuration: ${duration} days\nGroup: ${groupSize} person${groupSize > 1 ? 's' : ''}\nHotel: ${hotel}${car ? `\nCar: ${car}` : ''}\nBudget: €${budget.toLocaleString()}${notes ? `\nNotes: ${notes}` : ''}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.609l4.525-1.468A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.344 0-4.508-.81-6.222-2.163l-.435-.346-2.836.919.946-2.792-.378-.458A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                  Send details on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">

{/* Destinations */}
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-400">Destinations *</p>
                <p className="mb-4 text-lg font-semibold text-white">Which countries?</p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {countryOptions.map(c => {
                    const selected = selectedCountries.includes(c.id)
                    return (
                      <button key={c.id} type="button" onClick={() => toggleCountry(c.id)}
                        className={'relative rounded-xl border px-3 py-3 text-center transition-all duration-200 ' + (selected ? 'border-accent-400 bg-accent-400/10 shadow-lg shadow-accent-400/10' : 'border-white/10 bg-white/[0.03] hover:border-white/25')}>
                        {selected && (
                          <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-400">
                            <svg className="h-2.5 w-2.5 text-stone-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                        <div className="mb-1 text-xl leading-none">{c.flag}</div>
                        <p className="text-[11px] font-semibold leading-tight text-white">{c.label}</p>
                      </button>
                    )
                  })}
                </div>
                {selectedCountries.length > 0 && (
                  <p className="mt-3 text-xs text-stone-500">
                    Selected: <span className="text-accent-400 font-medium">{getDestinationsString()}</span>
                    <button type="button" onClick={() => setSelectedCountries([])} className="ml-3 text-stone-600 hover:text-stone-400 underline">clear</button>
                  </p>
                )}
              </div>

              {/* Month */}
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-400">Travel month</p>
                <p className="mb-4 text-lg font-semibold text-white">When are you planning to go?</p>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-12">
                  {months.map(m => (
                    <button key={m} type="button" onClick={() => setMonth(m)}
                      className={'rounded-lg border py-2 text-sm font-medium transition-all duration-200 text-center ' + (month === m ? 'border-accent-400 bg-accent-400 text-stone-950 font-bold' : 'border-white/15 text-stone-300 hover:border-white/35')}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Dates */}
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-400">Travel Dates</p>
                <p className="mb-4 text-lg font-semibold text-white">When are you going?</p>
                <div ref={calRef} className="relative">
                  {/* Trigger */}
                  <button type="button" onClick={() => setCalOpen(o => !o)}
                    className={'w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ' + (calOpen ? 'border-accent-400/60 ring-1 ring-accent-400/30' : 'border-white/10 hover:border-white/25') + ' bg-white/[0.04]'}>
                    <svg className="h-4 w-4 shrink-0 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {travelDatesStr
                      ? <span className="text-white">{travelDatesStr}</span>
                      : <span className="text-stone-600">Select your travel dates</span>}
                    {(startDate || endDate) && (
                      <button type="button" onClick={e => { e.stopPropagation(); setStartDate(null); setEndDate(null); setSelecting(false) }}
                        className="ml-auto text-stone-500 hover:text-stone-300">✕</button>
                    )}
                  </button>

                  {/* Calendar dropdown */}
                  {calOpen && (
                    <div className="absolute left-0 top-full z-50 mt-2 w-full max-w-xs rounded-2xl border border-white/10 bg-stone-800 p-4 shadow-2xl shadow-black/60 sm:w-80">
                      {/* Header */}
                      <div className="mb-4 flex items-center justify-between">
                        <button type="button" onClick={prevMonth} disabled={isPrevDisabled}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 transition hover:bg-white/10 disabled:opacity-30">
                          ‹
                        </button>
                        <p className="text-sm font-semibold text-white">{MONTH_NAMES[calMonth]} {calYear}</p>
                        <button type="button" onClick={nextMonth}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 transition hover:bg-white/10">
                          ›
                        </button>
                      </div>

                      {/* Day headers */}
                      <div className="mb-1 grid grid-cols-7 text-center">
                        {DAY_NAMES.map(d => (
                          <div key={d} className="py-1 text-[10px] font-bold uppercase tracking-wider text-stone-500">{d}</div>
                        ))}
                      </div>

                      {/* Days grid */}
                      <div className="grid grid-cols-7 gap-px text-center text-sm">
                        {calDays.map((date, i) => {
                          const state = dayState(date)
                          return (
                            <div key={i}
                              className={'flex h-8 items-center justify-center text-xs transition-all ' + dayStyles[state]}
                              onClick={() => date && state !== 'past' && handleDayClick(date)}
                              onMouseEnter={() => date && selecting && date >= today && setHoverDate(date)}
                              onMouseLeave={() => setHoverDate(null)}>
                              {date ? date.getDate() : ''}
                            </div>
                          )
                        })}
                      </div>

                      {/* Hint */}
                      <p className="mt-3 text-center text-[10px] text-stone-600">
                        {!startDate ? 'Click to pick start date' : !endDate ? 'Now pick your end date' : 'Dates selected'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Duration · Group size */}
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    label: 'Duration', question: 'How many days?',
                    value: duration, unit: duration === 1 ? 'day' : 'days',
                    dec: () => setDuration(Math.max(1, duration - 1)),
                    inc: () => setDuration(Math.min(30, duration + 1)),
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
                    {['EUR','USD','INR'].map(c => (
                      <button key={c} type="button" onClick={() => setCurrency(c)}
                        className={'rounded-full px-3 py-1 transition-all duration-200 ' + (currency === c ? 'bg-accent-400 text-stone-950' : 'text-stone-400 hover:text-white')}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-3 flex items-end justify-between">
                  <p className="text-lg font-semibold text-white">
                    {currency === 'EUR' && <>{'€'}{budget.toLocaleString()}</>}
                    {currency === 'USD' && <>${Math.round(budget * EUR_TO_USD).toLocaleString()}</>}
                    {currency === 'INR' && <>{'₹'}{(budget * EUR_TO_INR).toLocaleString('en-IN')}</>}
                    <span className="ml-2 text-sm font-normal text-stone-400">per person</span>
                  </p>
                  <span className="rounded-full border border-accent-400/30 bg-accent-400/10 px-3 py-0.5 text-xs font-bold text-accent-400">{budgetLabel(budget)}</span>
                </div>
                <input type="range" min={500} max={20000} step={250} value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="w-full cursor-pointer" style={{ accentColor: '#f59e0b' }} />
                <div className="mt-1 flex justify-between text-[10px] text-stone-500">
                  {currency === 'EUR' && <><span>{'€'}500</span><span>{'€'}5,000</span><span>{'€'}10,000</span><span>{'€'}20,000+</span></>}
                  {currency === 'USD' && <><span>$540</span><span>$5,400</span><span>$10,800</span><span>$21,600+</span></>}
                  {currency === 'INR' && <><span>{'₹'}45k</span><span>{'₹'}4.5L</span><span>{'₹'}9L</span><span>{'₹'}18L+</span></>}
                </div>
              </div>

              {/* Hotel */}
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-400">Hotel style</p>
                <p className="mb-4 text-lg font-semibold text-white">Where do you like to stay?</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {hotelOptions.map(h => (
                    <button key={h.id} type="button" onClick={() => setHotel(h.id)}
                      className={'rounded-xl border px-4 py-4 text-left transition-all duration-200 ' + (hotel === h.id ? 'border-accent-400 bg-accent-400/10 shadow-lg shadow-accent-400/10' : 'border-white/10 bg-white/[0.03] hover:border-white/25')}>
                      <div className="mb-1 text-lg leading-none">{h.icon}</div>
                      <p className="font-semibold text-white text-sm">{h.label}</p>
                      <p className="text-[11px] text-stone-400">{h.sub}</p>
                    </button>
                  ))}
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
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xl font-bold text-white transition-all hover:border-white/30 hover:bg-white/10">
                          &minus;
                        </button>
                        <div className="min-w-[2rem] text-center">
                          <span className="text-3xl font-bold text-white">{value}</span>
                          <p className="mt-0.5 text-[10px] text-stone-500">{value === 1 ? 'bag' : 'bags'}</p>
                        </div>
                        <button type="button" onClick={inc}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xl font-bold text-white transition-all hover:border-white/30 hover:bg-white/10">
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {(bootLuggage + cabinLuggage) > 0 && (
                  <p className="mt-3 text-center text-xs text-stone-600">
                    {bootLuggage + cabinLuggage} {bootLuggage + cabinLuggage === 1 ? 'bag' : 'bags'} total
                  </p>
                )}
              </div>

              {/* Contact details */}
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
                      placeholder="Anniversary trip, dietary needs, accessibility requirements, must-see places…"
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-stone-600 outline-none focus:border-accent-400/60 focus:ring-1 focus:ring-accent-400/30 transition-all" />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-2xl border border-accent-400/20 bg-gradient-to-br from-accent-400/[0.07] to-stone-950/40 p-6 shadow-lg shadow-accent-400/5">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-400">Your trip summary</p>
                <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                  {selectedCountries.length > 0 && <div className="sm:col-span-2"><span className="text-stone-500">Destinations</span><br /><span className="font-semibold text-white">{getDestinationsString()}</span></div>}
                  {travelDatesStr && endDate && <div><span className="text-stone-500">Dates</span><br /><span className="font-semibold text-white">{travelDatesStr}</span></div>}
                  {hotel && <div><span className="text-stone-500">Hotel</span><br /><span className="font-semibold text-white capitalize">{hotel}</span></div>}
                  {car   && <div><span className="text-stone-500">Vehicle</span><br /><span className="font-semibold text-white">{carOptions.find(c => c.id === car)?.label}</span></div>}
                  <div><span className="text-stone-500">Budget</span><br /><span className="font-semibold text-white">{currency === 'EUR' ? `€${budget.toLocaleString()}` : currency === 'USD' ? `$${Math.round(budget * EUR_TO_USD).toLocaleString()}` : `₹${(budget * EUR_TO_INR).toLocaleString('en-IN')}`}/person</span></div>
                  <div><span className="text-stone-500">Duration</span><br /><span className="font-semibold text-white">{duration} days</span></div>
                  <div><span className="text-stone-500">Group</span><br /><span className="font-semibold text-white">{groupSize} {groupSize === 1 ? 'person' : 'people'}</span></div>
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
                {submitting ? 'Sending your enquiry…' : 'Send my custom tour enquiry →'}
              </button>

              <p className="text-center text-xs text-stone-500">No payment required. We will get back within 24 hours with a personalised itinerary.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
