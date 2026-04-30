import { useState } from 'react'
import { api } from '../hooks/useApi'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/newsletter', { email })
      setStatus({ ok: res.data.success, msg: res.data.message })
      if (res.data.success) setEmail('')
    } catch {
      setStatus({ ok: false, msg: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-primary-700 py-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          Don't miss the next departure
        </h2>
        <p className="text-primary-200 mb-8">
          New routes, early-bird spots, and field dispatches from the road — straight to your inbox. No spam, ever.
        </p>

        {status ? (
          <div className={`rounded-xl px-6 py-4 font-medium ${status.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status.msg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3 rounded-full bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-accent-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-accent whitespace-nowrap disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
