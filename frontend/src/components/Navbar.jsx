import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const leftLinks = [
  { to: '/#country-cards', label: 'Destinations' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/stories', label: 'Stories' },
]

const rightLinks = [
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contacts' },
]

function DesktopLink({ to, label, transparent }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `whitespace-nowrap text-[14px] font-normal uppercase tracking-[0.08em] transition-colors ${
          transparent
            ? isActive ? 'text-white' : 'text-white/88 hover:text-white'
            : isActive ? 'text-primary-700' : 'text-stone-700 hover:text-stone-950'
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
    <header
      className={`absolute left-0 right-0 top-0 z-50 transition-colors duration-300 ${
        transparent ? 'bg-transparent text-white' : 'bg-primary-900 text-white'
      }`}
    >
      <div className={`h-[100px] border-b transition-colors ${transparent ? 'border-white/10' : 'border-white/10'}`}>
        <div className="mx-auto flex h-full max-w-[1920px] items-center justify-between px-[68px]">
          <div className="hidden items-center gap-14 xl:flex">
            {leftLinks.map((link) => (
              <DesktopLink key={link.to} {...link} transparent={transparent} />
            ))}
          </div>

          <div className="hidden items-center gap-14 xl:flex">
            {rightLinks.map((link) => (
              <DesktopLink key={link.to} {...link} transparent={transparent} />
            ))}
          </div>

          <Link to="/" className="flex h-full items-center gap-3 xl:hidden">
            <div className={`flex h-11 w-11 items-center justify-center rounded-full border font-bold ${transparent ? 'border-white text-white' : 'border-primary-700 text-primary-700'}`}>
              E
            </div>
            <span className={`text-base font-semibold ${transparent ? 'text-white' : 'text-stone-900'}`}>Europe on Wheels</span>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`rounded-lg p-2 xl:hidden ${transparent ? 'text-white' : 'text-stone-700'}`}
            aria-label="Toggle menu"
          >
            <span className="mb-1.5 block h-0.5 w-6 bg-current"></span>
            <span className="mb-1.5 block h-0.5 w-6 bg-current"></span>
            <span className="block h-0.5 w-6 bg-current"></span>
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
  )
}
