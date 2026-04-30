import { useState } from 'react'
import { api } from '../hooks/useApi'

const faqs = [
  { q: 'Do I need driving experience?', a: 'No. These are private chauffeur-driven tours — your driver handles the road while you enjoy the journey.' },
  { q: 'Which countries do you cover?', a: 'Germany, Austria, Czech Republic, Hungary, Slovenia, Slovakia, Croatia, Italy and Switzerland.' },
  { q: 'Can I choose one country only?', a: 'Yes. Single-country deep-dive or multi-country road journey — depending on your time, budget and style.' },
  { q: 'Are the trips suitable for families?', a: 'Yes. Relaxed routes with shorter drives, family-friendly hotels, scenic stops and downtime built in.' },
  { q: 'Can you plan luxury or golf-focused trips?', a: 'Yes. Luxury country experiences and Golf + Europe journeys are both available as private custom plans.' },
]

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75" />
    </svg>
  )
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/contact', form)
      setStatus({ ok: res.data.success, msg: res.data.message })
      if (res.data.success) setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus({ ok: false, msg: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Full-bleed animated background — matches landing page hero */}
      <section className="relative min-h-screen overflow-hidden bg-stone-950">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/swiss-alps.jpg"
            alt=""
            className="h-full w-full object-cover hero-drift"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-primary-950/35 to-stone-950/65" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_45%,transparent_28%,rgba(0,0,0,0.42)_100%)]" />

        {/* Centred content */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-16 sm:px-8 sm:py-24">

          {/* Page label + heading */}
          <div className="mb-8 text-center text-white">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Get in touch</p>
            <h1 className="text-4xl font-bold sm:text-5xl" style={{ textShadow: '0 4px 32px rgba(0,0,0,0.5)' }}>
              Plan your Europe journey
            </h1>
            <p className="mt-2 text-sm text-white/50">Tell us your dates, countries and budget — we reply within 24 hours.</p>
          </div>

          {/* Two-column card */}
          <div className="grid overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20 md:grid-cols-[1fr_1.6fr]">

            {/* Left — contact info strip */}
            <div className="flex flex-col justify-between gap-6 bg-primary-900/70 p-8 backdrop-blur-md">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent-400">Contact us directly</p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  A small team, a real person — not a bot.
                </p>
              </div>

              <div className="space-y-4">
                <a href="mailto:hello@europeonwheels.com"
                  className="group flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 transition-all duration-200 hover:bg-white/10">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white group-hover:bg-accent-400 group-hover:text-stone-950 transition-all duration-200">
                    <IconMail />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/35">Email</p>
                    <p className="text-xs font-medium text-white">hello@europeonwheels.com</p>
                  </div>
                </a>

                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 transition-all duration-200 hover:bg-white/10">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-green-400 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-200">
                    <IconWhatsApp />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/35">WhatsApp</p>
                    <p className="text-xs font-medium text-white">Chat with our team</p>
                  </div>
                </a>
              </div>

              {/* Trust strip */}
              <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-5 text-center">
                {[['4.9★', 'Rating'], ['500+', 'Trips'], ['9', 'Countries']].map(([v, l]) => (
                  <div key={l}>
                    <p className="text-lg font-bold text-white">{v}</p>
                    <p className="text-[10px] uppercase tracking-wider text-white/35">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-white/88 p-8 backdrop-blur-md">
              {status ? (
                <div className={`flex h-full flex-col items-center justify-center rounded-xl p-6 text-center ${status.ok ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  <p className="text-3xl mb-2">{status.ok ? '✉️' : '⚠️'}</p>
                  <p className="font-semibold">{status.msg}</p>
                  {!status.ok && <button onClick={() => setStatus(null)} className="mt-3 text-sm underline">Try again</button>}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { name: 'name',  label: 'Your name',     type: 'text',  placeholder: 'Jane Smith' },
                      { name: 'email', label: 'Email address', type: 'email', placeholder: 'jane@example.com' },
                    ].map(({ name, label, type, placeholder }) => (
                      <div key={name}>
                        <label htmlFor={name} className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">{label}</label>
                        <input
                          id={name} name={name} type={type}
                          value={form[name]} onChange={handleChange}
                          placeholder={placeholder} required
                          className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-800 placeholder-stone-300 transition-colors focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">Subject</label>
                    <input
                      id="subject" name="subject" type="text"
                      value={form.subject} onChange={handleChange}
                      placeholder="e.g. 10-day Switzerland & Italy private tour"
                      required
                      className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-800 placeholder-stone-300 transition-colors focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">Message</label>
                    <textarea
                      id="message" name="message"
                      value={form.message} onChange={handleChange}
                      placeholder="Tell us your travel dates, group size, budget and any preferences..."
                      required rows={4}
                      className="w-full resize-none rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-800 placeholder-stone-300 transition-colors focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
                    />
                  </div>

                  <button
                    type="submit" disabled={loading}
                    className="w-full rounded-lg bg-primary-700 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-800 hover:shadow-lg disabled:opacity-60"
                  >
                    {loading ? 'Sending…' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-stone-50 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-xl font-bold text-stone-900">Frequently asked questions</h2>
          <div className="space-y-2">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-3.5 text-left text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-50"
                >
                  <span>{q}</span>
                  <span className={`ml-4 shrink-0 text-lg text-primary-600 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="border-t border-stone-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-stone-500">{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
