import { useState } from 'react'

const LAST_UPDATED = '8 May 2026'
const COMPANY = 'Europe on Wheels'
const EMAIL = 'hello@europeonwheels.com'

const cookieTable = [
  {
    category: 'Strictly Necessary',
    color: 'text-emerald-400',
    border: 'border-emerald-400/20',
    bg: 'bg-emerald-400/5',
    required: true,
    description: 'These cookies are essential for the website to function and cannot be switched off. They are typically set in response to actions you take such as submitting a form or setting your privacy preferences. They do not store personally identifiable information.',
    cookies: [
      { name: 'session_id',     purpose: 'Maintains your session state across page requests.',              duration: 'Session',  provider: 'Europe on Wheels' },
      { name: 'csrf_token',     purpose: 'Protects form submissions against cross-site request forgery.',  duration: 'Session',  provider: 'Europe on Wheels' },
      { name: 'cookie_consent', purpose: 'Stores your cookie consent preferences.',                        duration: '12 months', provider: 'Europe on Wheels' },
    ],
  },
  {
    category: 'Functional',
    color: 'text-sky-400',
    border: 'border-sky-400/20',
    bg: 'bg-sky-400/5',
    required: false,
    description: 'These cookies enable enhanced functionality and personalisation, such as remembering your currency preference or the country you last selected. Disabling them may affect the quality of your experience.',
    cookies: [
      { name: 'preferred_currency', purpose: 'Remembers your selected currency (EUR / INR / USD).',      duration: '6 months', provider: 'Europe on Wheels' },
      { name: 'ui_theme',           purpose: 'Stores display preferences set by you.',                    duration: '6 months', provider: 'Europe on Wheels' },
    ],
  },
  {
    category: 'Analytics',
    color: 'text-violet-400',
    border: 'border-violet-400/20',
    bg: 'bg-violet-400/5',
    required: false,
    description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve page performance and the user experience.',
    cookies: [
      { name: '_ga',          purpose: 'Google Analytics: distinguishes unique users.',                duration: '2 years',  provider: 'Google LLC' },
      { name: '_ga_XXXXXXXX', purpose: 'Google Analytics: persists session state.',                    duration: '2 years',  provider: 'Google LLC' },
      { name: '_gid',         purpose: 'Google Analytics: distinguishes users (short-lived).',         duration: '24 hours', provider: 'Google LLC' },
      { name: '_gat',         purpose: 'Google Analytics: throttles request rate.',                    duration: '1 minute', provider: 'Google LLC' },
    ],
  },
  {
    category: 'Marketing',
    color: 'text-rose-400',
    border: 'border-rose-400/20',
    bg: 'bg-rose-400/5',
    required: false,
    description: 'These cookies may be set through our site by advertising partners to build a profile of your interests and show you relevant advertisements on other sites. They do not store directly personal information but are based on uniquely identifying your browser and device.',
    cookies: [
      { name: '_fbp',   purpose: 'Meta (Facebook): tracks visits across Meta-partner websites.',  duration: '3 months', provider: 'Meta Platforms, Inc.' },
      { name: 'ttclid', purpose: 'TikTok: click attribution for ad campaigns.',                   duration: '1 year',   provider: 'TikTok Inc.' },
    ],
  },
]

function Section({ title, children }) {
  return (
    <div className="border-t border-white/[0.05] pt-10 first:border-0 first:pt-0">
      <h2 className="mb-4 text-lg font-bold text-white">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function P({ children }) {
  return <p className="text-stone-400 leading-relaxed">{children}</p>
}

function Bold({ label, children }) {
  return (
    <p className="text-stone-400 leading-relaxed">
      <span className="font-semibold text-stone-200">{label}</span>{children}
    </p>
  )
}

export default function CookiePolicy() {
  const [open, setOpen] = useState(null)

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Hero */}
      <div className="border-b border-white/[0.06] bg-gradient-to-b from-stone-900 to-stone-950 px-5 pb-12 pt-28 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-amber-400">Legal</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Cookie Policy</h1>
          <p className="mt-4 text-sm text-stone-500">Last updated: {LAST_UPDATED}</p>
          <p className="mt-5 text-base leading-relaxed text-stone-400">
            This Cookie Policy explains what cookies are, which cookies {COMPANY} uses on this website, why we use them, and how you can control them. It should be read alongside our Privacy Policy.
          </p>
        </div>
      </div>

      {/* Cookie categories */}
      <div className="border-b border-white/[0.05] px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-xl font-bold text-white">Cookies We Use</h2>
          <div className="space-y-4">
            {cookieTable.map((cat, i) => (
              <div key={cat.category} className={`rounded-2xl border ${cat.border} ${cat.bg} overflow-hidden`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${cat.color}`}>{cat.category}</span>
                    {cat.required && (
                      <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                        Always On
                      </span>
                    )}
                  </div>
                  <svg
                    className={`h-4 w-4 text-stone-500 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                    viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l4 4 4-4" />
                  </svg>
                </button>

                {open === i && (
                  <div className="border-t border-white/[0.05] px-5 pb-5 pt-4">
                    <p className="mb-5 text-sm leading-relaxed text-stone-400">{cat.description}</p>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[480px] border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-white/[0.06]">
                            {['Cookie Name', 'Purpose', 'Duration', 'Provider'].map(h => (
                              <th key={h} className="pb-2 pr-4 text-left text-[10px] font-bold uppercase tracking-widest text-stone-500">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {cat.cookies.map(c => (
                            <tr key={c.name} className="border-b border-white/[0.04] last:border-0">
                              <td className="py-2.5 pr-4 font-mono text-stone-300">{c.name}</td>
                              <td className="py-2.5 pr-4 text-stone-400">{c.purpose}</td>
                              <td className="py-2.5 pr-4 text-stone-400 whitespace-nowrap">{c.duration}</td>
                              <td className="py-2.5 text-stone-400">{c.provider}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* General sections */}
      <div className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-12">

          <Section title="1. What Are Cookies?">
            <P>Cookies are small text files placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and to provide information to website operators.</P>
            <P>Similar technologies — including web beacons, pixel tags, local storage objects, and device fingerprinting — may also be used for comparable purposes. For simplicity, all such technologies are referred to as "cookies" in this policy.</P>
          </Section>

          <Section title="2. Who Sets Cookies on This Site?">
            <Bold label="First-party cookies ">are set by Europe on Wheels (this website) and are used exclusively to support your use of our services.</Bold>
            <Bold label="Third-party cookies ">are set by organisations other than us — such as Google, Meta, or Mapbox — when their content or services are embedded on or integrated with our website. We do not control the operation of third-party cookies, and you should refer to the relevant third party's privacy and cookie policies for further information.</Bold>
          </Section>

          <Section title="3. Your Cookie Choices">
            <P>Except for strictly necessary cookies, all other categories of cookies are deployed only with your prior consent, which we seek via the cookie consent banner displayed on your first visit to our website.</P>
            <P>You can change your preferences at any time by clicking the "Cookie Settings" link in the footer of our website.</P>
            <P>In addition to our consent mechanism, you can control cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when a cookie is set. Please note that blocking certain cookies may impair the functionality of this website.</P>
            <P>For third-party analytics cookies, you may also opt out directly through the relevant provider — for example, by installing the Google Analytics Opt-out Browser Add-on available at tools.google.com/dlpage/gaoptout.</P>
          </Section>

          <Section title="4. Retention Periods">
            <P>Session cookies expire when you close your browser. Persistent cookies remain on your device for the duration specified in the table above or until you delete them. Retention periods are set to the minimum necessary to fulfil each cookie's purpose.</P>
          </Section>

          <Section title="5. Embedded Content and Maps">
            <P>Our itinerary pages include interactive maps powered by Mapbox. When these components load, Mapbox may set its own cookies or collect your IP address and usage data in accordance with its own privacy policy. We load map tiles only after you have given consent to functional or analytics cookies, as applicable.</P>
          </Section>

          <Section title="6. Do Not Track">
            <P>Some browsers offer a "Do Not Track" (DNT) feature that sends a signal to websites you visit indicating that you do not wish to be tracked. Because there is currently no universally accepted standard for responding to DNT signals, our website does not alter its behaviour in response to DNT signals at this time. We encourage you to use our cookie consent controls to manage your preferences directly.</P>
          </Section>

          <Section title="7. Updates to This Policy">
            <P>We may update this Cookie Policy periodically to reflect changes in the cookies we use or in applicable law. We will post any updated policy on this page with a revised "Last Updated" date. We encourage you to review this page periodically.</P>
          </Section>

          <Section title="8. Contact Us">
            <P>If you have any questions about our use of cookies or this policy, please contact us at{' '}
              <a href={`mailto:${EMAIL}`} className="text-white underline underline-offset-2 hover:text-amber-400 transition-colors">{EMAIL}</a>.
            </P>
          </Section>

          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6">
            <p className="text-sm font-semibold text-amber-400">Manage your cookie preferences</p>
            <p className="mt-2 text-sm text-stone-400">
              To update your consent choices, clear this site's cookies in your browser settings and reload the page — the consent banner will reappear. Alternatively, contact us at{' '}
              <a href={`mailto:${EMAIL}`} className="text-white underline underline-offset-2 hover:text-amber-400 transition-colors">
                {EMAIL}
              </a>.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
