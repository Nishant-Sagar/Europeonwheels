import { useState } from 'react'

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
  { id: 'sedan',        label: 'Sedan',        sub: 'Škoda Octavia or similar',        img: '/images/cars/sedan.webp'        },
  { id: 'luxury-sedan', label: 'Luxury Sedan', sub: 'Mercedes E-Class or similar',     img: '/images/cars/luxury-sedan.webp' },
  { id: 'mpv',          label: 'MPV',          sub: 'Volkswagen Touran or similar',    img: '/images/cars/mpv.webp'          },
  { id: 'std-van',      label: 'Standard Van', sub: 'Volkswagen Caravelle or similar', img: '/images/cars/std-van.webp'      },
  { id: 'luxury-van',   label: 'Luxury Van',   sub: 'Mercedes V-Class or similar',     img: '/images/cars/luxury-van.webp'   },
]

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const EUR_TO_INR = 90
const EUR_TO_USD = 1.08

function budgetLabel(v) {
  if (v < 2000)  return 'Budget Explorer'
  if (v < 4000)  return 'Comfort Traveller'
  if (v < 7000)  return 'Premium Experience'
  if (v < 12000) return 'Luxury Journey'
  return 'Ultra-Luxury'
}

export default function CustomTour() {
  const [destinations, setDestinations] = useState('')
  const [travelDates,  setTravelDates]  = useState('')
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

  async function handleSubmit(e) {
    e.preventDefault()
    if (!destinations || !hotel || !month || !name || !email) {
      setError('Please fill in destinations, your name, email, hotel type and travel month.')
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
          country: destinations,
          form_type: "custom_tour",
          hotel_type: hotel,
          vehicle_type: car,
          budget_eur: budget,
          group_size: groupSize,
          luggage_boot: bootLuggage,
          luggage_cabin: cabinLuggage,
          travel_month: month + ' 2026',
          duration_days: duration,
          special_requests: [travelDates ? `Travel dates: ${travelDates}` : '', notes].filter(Boolean).join('\n'),
        }),
      })
      if (!res.ok) throw new Error('Server error')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative bg-stone-950 min-h-screen text-white">
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
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">

              {/* Countries + Dates */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-400">Destinations *</p>
                  <p className="mb-3 text-base font-semibold text-white">Which countries?</p>
                  <input
                    type="text"
                    value={destinations}
                    onChange={e => setDestinations(e.target.value)}
                    placeholder="e.g. Austria, Czech Republic, Italy…"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-stone-600 outline-none focus:border-accent-400/60 focus:ring-1 focus:ring-accent-400/30 transition-all"
                  />
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-400">Travel Dates</p>
                  <p className="mb-3 text-base font-semibold text-white">When are you going?</p>
                  <input
                    type="text"
                    value={travelDates}
                    onChange={e => setTravelDates(e.target.value)}
                    placeholder="e.g. 10 – 20 July 2026"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-stone-600 outline-none focus:border-accent-400/60 focus:ring-1 focus:ring-accent-400/30 transition-all"
                  />
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
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {carOptions.map(c => (
                    <button key={c.id} type="button" onClick={() => setCar(c.id)}
                      className={'group relative overflow-hidden rounded-2xl border text-left transition-all duration-200 ' + (car === c.id ? 'border-accent-400 shadow-lg shadow-accent-400/15' : 'border-white/10 hover:border-white/25')}>
                      <div className="relative h-28 overflow-hidden bg-stone-800">
                        <img src={c.img} alt={c.label}
                          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex' }} />
                        <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-stone-800 to-stone-900 text-3xl">🚗</div>
                        {car === c.id && <div className="absolute inset-0 bg-accent-400/10" />}
                        {car === c.id && (
                          <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent-400">
                            <svg className="h-3 w-3 text-stone-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-2.5">
                        <p className="font-bold text-white text-xs leading-tight">{c.label}</p>
                        <p className="mt-0.5 text-[10px] leading-tight text-stone-400">{c.sub}</p>
                      </div>
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

              {/* Luggage */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-stone-400">Luggage</p>
                <p className="mb-6 text-base font-semibold text-white">How many luggages?</p>
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07]">
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
                  {destinations && <div className="sm:col-span-2"><span className="text-stone-500">Destinations</span><br /><span className="font-semibold text-white">{destinations}</span></div>}
                  {travelDates  && <div><span className="text-stone-500">Dates</span><br /><span className="font-semibold text-white">{travelDates}</span></div>}
                  {hotel        && <div><span className="text-stone-500">Hotel</span><br /><span className="font-semibold text-white capitalize">{hotel}</span></div>}
                  {car          && <div><span className="text-stone-500">Vehicle</span><br /><span className="font-semibold text-white">{carOptions.find(c => c.id === car)?.label}</span></div>}
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
