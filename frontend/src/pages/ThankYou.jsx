import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const WHATSAPP_NUMBER = '919108116181'
const ADS_CONVERSION = 'AW-18164788165/4hgaCMK-ka4cEMXX0tVD'

function IconWhatsApp() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.609l4.525-1.468A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.344 0-4.508-.81-6.222-2.163l-.435-.346-2.836.919.946-2.792-.378-.458A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
    </svg>
  )
}

const PAGE_PATH = '/thank-you'

/**
 * Dedicated lead confirmation page.
 *
 * Every enquiry form redirects here after a successful submit, so every lead
 * lands on the exact same URL (/thank-you) — the single Google Ads conversion
 * target. The page fires the Ads conversion + a page_view for that path, and
 * pushes a dataLayer event for GTM (form_type is carried in the event, not the
 * URL, so the URL stays identical for every form).
 */
export default function ThankYou() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const firedRef = useRef(false)

  const {
    lead = false,
    name = '',
    enquiryLabel = '',
    summary = '',
    whatsappText = '',
    backTo = '/',
    backLabel = 'Back to home',
    details = [],
  } = state || {}

  const formType = state?.formType || 'enquiry'

  // Fire conversion tracking exactly once, and only for a real submission.
  useEffect(() => {
    if (!lead || firedRef.current) return
    firedRef.current = true

    // Register the new URL as a page view so URL-based Ads goals can see it.
    window.gtag?.('config', 'AW-18164788165', { page_path: PAGE_PATH })
    window.gtag?.('event', 'conversion', {
      send_to: ADS_CONVERSION,
      value: 1.0,
      currency: 'INR',
    })
    window.dataLayer?.push({ event: 'lead_submitted', form_type: formType, page_path: PAGE_PATH })

    // Drop the `lead` flag from history state so a reload/back does not re-fire.
    navigate(PAGE_PATH, { replace: true, state: { ...state, lead: false } })
  }, [lead, formType, navigate, state])

  const heading = name ? `You are all set, ${name}!` : 'You are all set!'
  const body = summary
    || (enquiryLabel
      ? `Your ${enquiryLabel} enquiry has been saved. We will get back to you within 24 hours with a personalised itinerary.`
      : 'Your enquiry has been saved. We will get back to you within 24 hours with a personalised itinerary.')

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappText || `Hi, I just submitted an enquiry on europeonwheels.in.${name ? `\n\nName: ${name}` : ''}`
  )}`

  return (
    <div className="relative min-h-screen bg-stone-950 text-white">
      <Helmet>
        <title>Thank You — Enquiry Received | Europe on Wheels</title>
        <meta name="description" content="Thanks for your enquiry. Our travel team will get back to you within 24 hours with a personalised itinerary." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.europeonwheels.in/thank-you" />
      </Helmet>

      {/* dot grid */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* warm glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-accent-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-emerald-500/[0.07] blur-3xl" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24 sm:px-8">
        <div className="mx-auto w-full max-w-2xl rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-emerald-500/[0.09] to-white/[0.02] px-6 py-12 text-center shadow-2xl shadow-emerald-500/5 sm:px-10 sm:py-14">
          <div className="mb-5 text-5xl">🎉</div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-accent-400">Enquiry received</p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{heading}</h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-stone-300 sm:text-base">{body}</p>

          {details.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left text-sm sm:grid-cols-3">
              {details.map(({ label, value }) => (
                <div key={label}>
                  <span className="text-[11px] uppercase tracking-widest text-stone-500">{label}</span>
                  <br />
                  <span className="font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waHref}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-500 sm:w-auto"
            >
              <IconWhatsApp />
              Send details on WhatsApp
            </a>
            <Link
              to={backTo}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              {backLabel}
            </Link>
          </div>

          <p className="mt-8 text-xs text-stone-500">
            Prefer email? Write to{' '}
            <a href="mailto:info.europeonwheels@gmail.com" className="text-accent-400 underline underline-offset-2">info.europeonwheels@gmail.com</a>
          </p>
        </div>
      </section>
    </div>
  )
}
