import { Link } from 'react-router-dom'

const exploreLinks = [
  { to: '/#multi-country', label: 'Multi-Country Tours' },
  { to: '/#single-country', label: 'Single Country Tours' },
  { to: '/destinations', label: 'All Destinations' },
  { to: '/calendar', label: 'Trip Calendar' },
  { to: '/stories', label: 'Travel Stories' },
  { to: '/gallery', label: 'Gallery' },
]

const companyLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
  { to: '/about', label: 'Why Choose Us' },
  { to: '/about', label: 'Our Approach' },
]

const countries = [
  'Germany', 'Austria', 'Czech Republic', 'Hungary',
  'Slovenia', 'Slovakia', 'Croatia', 'Italy', 'Switzerland',
]

function IconMail() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75" />
    </svg>
  )
}

function IconWhatsApp() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function IconYouTube() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer>

      {/* Main footer body */}
      <div className="bg-stone-950 px-5 pt-16 pb-10 sm:px-6">
        <div className="mx-auto max-w-7xl">

          {/* Top grid */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

            {/* Brand */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 font-display text-xl font-bold text-white">
                  E
                </div>
                <span className="font-display text-2xl font-bold text-white">Europe on Wheels</span>
              </div>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone-400">
                Private chauffeur-driven journeys across 9 European countries — crafted for families and first-time Europe travellers from India.
              </p>

              {/* Contact */}
              <div className="mt-7 space-y-3.5">
                <a
                  href="mailto:info.europeonwheels@gmail.com"
                  className="flex items-center gap-3 text-sm text-stone-400 transition-colors hover:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-800 text-stone-400">
                    <IconMail />
                  </span>
                  info.europeonwheels@gmail.com
                </a>
                <a
                  href="https://wa.me/919108116181?text=Hi%2C%20I%27m%20interested%20in%20a%20Europe%20tour.%20Could%20you%20share%20more%20details%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-stone-400 transition-colors hover:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-800 text-green-500">
                    <IconWhatsApp />
                  </span>
                  Chat on WhatsApp
                </a>
              </div>

              {/* Socials */}
              <div className="mt-7 flex gap-3">
                {[
                  { Icon: IconInstagram, label: 'Instagram', href: '#' },
                  { Icon: IconFacebook, label: 'Facebook', href: '#' },
                  { Icon: IconYouTube, label: 'YouTube', href: '#' },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-800 text-stone-400 transition-all hover:bg-primary-700 hover:text-white"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div className="lg:col-span-3">
              <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Explore
              </h4>
              <ul className="space-y-3">
                {exploreLinks.map(({ to, label }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-stone-400 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map(({ to, label }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-stone-400 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust badges */}
            <div className="lg:col-span-2">
              <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Why Us
              </h4>
              <ul className="space-y-3 text-sm text-stone-400">
                {[
                  '★ 4.9 avg. rating',
                  '500+ travellers',
                  'Private chauffeur',
                  'India-based team',
                  'Flexible itineraries',
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent-500 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Countries strip */}
          <div className="mt-14 border-t border-stone-800 pt-8">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-600">
              Destinations we cover
            </p>
            <div className="flex flex-wrap gap-2">
              {countries.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-stone-700 px-3.5 py-1 text-xs text-stone-500 transition-colors hover:border-accent-500 hover:text-accent-400 cursor-default"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 border-t border-stone-800 pt-7 flex flex-col items-center justify-between gap-4 sm:flex-row text-stone-600 text-xs">
            <p>© {new Date().getFullYear()} Europe on Wheels. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="transition-colors hover:text-stone-400">Privacy Policy</Link>
              <Link to="/terms-of-service" className="transition-colors hover:text-stone-400">Terms of Service</Link>
              <Link to="/cookie-policy" className="transition-colors hover:text-stone-400">Cookie Policy</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
