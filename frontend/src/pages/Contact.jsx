import { useState } from 'react'
import { api } from '../hooks/useApi'

const faqs = [
  { q: 'Do I need driving experience?', a: "No. These are private chauffeur-driven tours, so your driver handles the road while you enjoy the journey." },
  { q: 'Which countries do you cover?', a: 'We plan trips only across Germany, Austria, Czech Republic, Hungary, Slovenia, Slovakia, Croatia, Italy and Switzerland.' },
  { q: 'Can I choose one country only?', a: 'Yes. You can choose a single-country deep-dive or a multi-country road journey depending on your time, budget and travel style.' },
  { q: 'Are the trips suitable for families?', a: 'Yes. We can build relaxed routes with shorter drives, family-friendly hotels, theme parks, scenic stops and downtime.' },
  { q: 'Can you plan luxury or golf-focused trips?', a: 'Yes. Luxury country experiences and Golf + Europe journeys are both available as private custom plans.' },
]

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
      <section className="bg-primary-900 text-white pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent-400 font-medium uppercase tracking-widest text-sm mb-3">Get in touch</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-primary-200 text-lg">Questions, bookings, or just curious? We reply within 24 hours.</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="font-display text-3xl font-bold text-stone-900 mb-8">Send us a message</h2>

            {status ? (
              <div className={`rounded-2xl p-6 text-center ${status.ok ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p className="text-4xl mb-3">{status.ok ? '✉️' : '⚠️'}</p>
                <p className="font-semibold text-lg">{status.msg}</p>
                {!status.ok && (
                  <button onClick={() => setStatus(null)} className="mt-4 text-sm underline">Try again</button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: 'name', label: 'Your name', type: 'text', placeholder: 'Jane Smith' },
                  { name: 'email', label: 'Email address', type: 'email', placeholder: 'jane@example.com' },
                  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Booking enquiry - Switzerland and Italy' },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label htmlFor={name} className="block text-sm font-medium text-stone-700 mb-1.5">{label}</label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      value={form[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 text-stone-800 placeholder-stone-300"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1.5">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what you're looking for..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 text-stone-800 placeholder-stone-300 resize-none"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h2 className="font-display text-3xl font-bold text-stone-900 mb-8">FAQ</h2>
            <div className="space-y-3">
              {faqs.map(({ q, a }, i) => (
                <div key={i} className="border border-stone-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-stone-800 hover:bg-stone-50 transition-colors"
                  >
                    <span>{q}</span>
                    <span className={`text-primary-600 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-stone-500 text-sm leading-relaxed border-t border-stone-100 pt-4">
                      {a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-primary-50 rounded-2xl">
              <p className="font-semibold text-stone-900 mb-1">Prefer email or phone?</p>
              <p className="text-stone-500 text-sm mb-3">We're a small team - you'll get a real person, not a bot.</p>
              <p className="text-primary-700 font-medium text-sm">hello@europeonwheels.com</p>
              <p className="text-primary-700 font-medium text-sm">+44 20 1234 5678</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
