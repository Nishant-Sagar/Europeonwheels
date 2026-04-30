import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const leftLinks = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/stories', label: 'Stories' },
]

const rightLinks = [
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contacts' },
]

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]">
      <defs>
        <linearGradient id="ig-nav" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#f09433" />
          <stop offset="33%"  stopColor="#e6683c" />
          <stop offset="55%"  stopColor="#dc2743" />
          <stop offset="78%"  stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ig-nav)"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
      />
    </svg>
  )
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" className="h-[18px] w-[18px]">
      <path
        stroke="#4A9EFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75"
      />
    </svg>
  )
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

function DesktopLink({ to, label, transparent }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `whitespace-nowrap text-[14px] font-normal uppercase tracking-[0.08em] transition-colors pb-0.5 border-b-[2px] ${
          transparent
            ? isActive
              ? 'text-white border-white'
              : 'text-white/80 hover:text-white border-transparent'
            : isActive
              ? 'text-primary-700 border-primary-700'
              : 'text-stone-700 hover:text-stone-950 border-transparent'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setMenuOpen(false), [pathname])

  const transparent = true
  const mobileLinks = [...leftLinks, ...rightLinks]

  return (
    <>
      <header
        className={`absolute left-0 right-0 top-0 z-50 transition-colors duration-300 ${
          transparent ? 'bg-transparent text-white' : 'bg-primary-900 text-white'
        }`}
      >
        <div className={`h-[72px] border-b transition-colors ${transparent ? 'border-white/10' : 'border-white/10'}`}>
          {/* 3-column layout: left links | center logo gap | right links + icons */}
          <div className="mx-auto flex h-full max-w-7xl items-center px-10">

            {/* Left nav links — anchored to left */}
            <div className="hidden flex-1 items-center gap-10 xl:flex">
              {leftLinks.map((link) => (
                <DesktopLink key={link.to} {...link} transparent={transparent} />
              ))}
            </div>

            {/* Center — reserved for logo */}
            <div className="hidden w-48 xl:block" />

            {/* Right nav links + social icons — anchored to right */}
            <div className="hidden flex-1 items-center justify-end gap-9 xl:flex">
              {rightLinks.map((link) => (
                <DesktopLink key={link.to} {...link} transparent={transparent} />
              ))}

              {/* Divider */}
              <div className={`h-4 w-px ${transparent ? 'bg-white/20' : 'bg-stone-200'}`} />

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-all duration-200 hover:scale-110 hover:opacity-80"
              >
                <IconInstagram />
              </a>

              {/* Email */}
              <a
                href="mailto:hello@europeonwheels.com"
                aria-label="Email us"
                className="transition-all duration-200 hover:scale-110 hover:opacity-80"
              >
                <IconMail />
              </a>
            </div>

            {/* Mobile: logo */}
            <Link to="/" className="flex h-full items-center gap-3 xl:hidden">
              <div className={`flex h-11 w-11 items-center justify-center rounded-full border font-bold ${transparent ? 'border-white text-white' : 'border-primary-700 text-primary-700'}`}>
                E
              </div>
              <span className={`text-base font-semibold ${transparent ? 'text-white' : 'text-stone-900'}`}>Europe on Wheels</span>
            </Link>

            {/* Mobile: hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`rounded-lg p-2 xl:hidden ${transparent ? 'text-white' : 'text-stone-700'}`}
              aria-label="Toggle menu"
            >
              <span className="mb-1.5 block h-0.5 w-6 bg-current" />
              <span className="mb-1.5 block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="xl:hidden border-t border-stone-100 bg-white shadow-lg">
            <nav className="flex flex-col gap-1 px-6 py-4">
              {mobileLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-700' : 'text-stone-600 hover:text-stone-900'}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-green-500/40 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-green-500/50"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25" />
        <IconWhatsApp />
        <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
          Chat with us
          <span className="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-stone-900" />
        </span>
      </a>
    </>
  )
}
