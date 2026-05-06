import { useState } from 'react'
import { api } from '../hooks/useApi'

const highlights = [
  { icon: '🗺️', title: 'Any Destination', desc: 'One country or ten — we plan it all' },
  { icon: '🚘', title: 'Private Chauffeur', desc: 'Door-to-door in comfort, no driving stress' },
  { icon: '🏨', title: 'Curated Stays', desc: 'Boutique hotels & hidden gems hand-picked' },
  { icon: '✏️', title: 'Fully Bespoke', desc: 'Every detail built around your preferences' },
]

const travelStyles = ['Cultural & Sightseeing', 'Luxury & Wellness', 'Adventure & Nature', 'Food & Wine', 'Family-Friendly', 'Golf Tour']

export default function CustomTour() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    destinations: '', travel_style: '', duration: '', group_size: '', budget: '',
    notes: '',
  })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const message = [
        `Destinations in mind: ${form.destinations}`,
        `Travel style: ${form.travel_style}`,
        `Duration: ${form.duration}`,
        `Group size: ${form.group_size}`,
        `Budget: ${form.budget}`,
        form.notes ? `Additional notes: ${form.notes}` : '',
        form.phone ? `Phone/WhatsApp: ${form.phone}` : '',
      ].filter(Boolean).join('\n')

      const res = await api.post('/contact', {
        name: form.name,
        email: form.email,
        subject: 'Custom Tour Enquiry',
        message,
      })
      setStatus({ ok: res.data.success, msg: res.data.message })
      if (res.data.success) setForm({ name: '', email: '', phone: '', destinations: '', travel_style: '', duration: '', group_size: '', budget: '', notes: '' })
    } catch {
      setStatus({ ok: false, msg: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-stone-500 outline-none transition focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30'
  const labelCls = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400'

  return (
    <section className="relative min-h-screen overflow-hidden bg-stone-950">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/swiss-alps.webp" alt="" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/80 to-stone-950" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-36">

        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">Bespoke Travel</p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            Build Your Dream Tour
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-stone-400">
            Tell us where you want to go, how you want to travel, and we'll craft a private itinerary around you — no templates, no compromises.
          </p>
        </div>

        {/* Highlights row */}
        <div className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {highlights.map(({ icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-center">
              <div className="mb-2 text-2xl">{icon}</div>
              <p className="text-[13px] font-semibold text-white">{title}</p>
              <p className="mt-0.5 text-[11px] leading-tight text-stone-500">{desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10">
          <h2 className="mb-8 text-lg font-semibold text-white">Tell us about your trip</h2>

          {status && (
            <div className={`mb-6 rounded-xl px-4 py-3 text-sm ${status.ok ? 'bg-green-500/15 text-green-300' : 'bg-red-500/15 text-red-300'}`}>
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact info */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={labelCls}>Your Name *</label>
                <input required value={form.name} onChange={set('name')} placeholder="Antonio Rossi" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Email *</label>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Phone / WhatsApp</label>
                <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 234 567 8900" className={inputCls} />
              </div>
            </div>

            {/* Trip details */}
            <div>
              <label className={labelCls}>Destinations in mind *</label>
              <input required value={form.destinations} onChange={set('destinations')} placeholder="e.g. Austria, Czech Republic, then Italy…" className={inputCls} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={labelCls}>Travel Style</label>
                <select value={form.travel_style} onChange={set('travel_style')} className={inputCls + ' cursor-pointer'}>
                  <option value="">Select style…</option>
                  {travelStyles.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Duration</label>
                <input value={form.duration} onChange={set('duration')} placeholder="e.g. 10 days" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Group Size</label>
                <input type="number" min="1" max="20" value={form.group_size} onChange={set('group_size')} placeholder="e.g. 4 people" className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Approximate Budget (EUR)</label>
              <input value={form.budget} onChange={set('budget')} placeholder="e.g. €5,000 – €8,000 total" className={inputCls} />
            </div>

            <div>
              <label className={labelCls}>Anything else we should know?</label>
              <textarea
                rows={4}
                value={form.notes}
                onChange={set('notes')}
                placeholder="Special occasions, dietary needs, must-see places, preferred hotel style…"
                className={inputCls + ' resize-none'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-amber-400 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-stone-900 transition hover:bg-amber-300 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Sending…' : 'Send My Request'}
            </button>

            <p className="text-center text-xs text-stone-600">
              We typically respond within 24 hours. Prefer WhatsApp?{' '}
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">
                Chat directly
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
