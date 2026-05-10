import { useState } from 'react'

/**
 * CarCard — a car-option button with a 3-4 image mini-slider.
 *
 * Props
 *  car        — { id, label, sub, imgs: string[], seats? }
 *  isSelected — boolean
 *  onClick    — () => void
 */

const SLIDE_LABELS = ['Exterior', 'Interior', 'Detail']

export default function CarCard({ car, isSelected, onClick }) {
  const [slide, setSlide] = useState(0)
  const total = car.imgs.length

  function goTo(i, e) {
    e.stopPropagation()
    setSlide(i)
  }

  function prev(e) {
    e.stopPropagation()
    setSlide(s => (s - 1 + total) % total)
  }

  function next(e) {
    e.stopPropagation()
    setSlide(s => (s + 1) % total)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'group relative shrink-0 w-[44vw] sm:w-auto overflow-hidden rounded-2xl border text-left transition-all duration-200 ' +
        (isSelected
          ? 'border-accent-400 shadow-lg shadow-accent-400/15'
          : 'border-white/10 hover:border-white/25')
      }
    >
      {/* ── Image slider ── */}
      <div className="relative h-28 overflow-hidden bg-stone-900 select-none">

        {/* Slides */}
        {car.imgs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${car.label} — ${SLIDE_LABELS[i] ?? ''}`}
            className={
              'absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-500 ' +
              (i === slide ? 'opacity-100' : 'opacity-0')
            }
            draggable={false}
          />
        ))}

        {/* Fallback icon (shown when all images fail) */}
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-gradient-to-br from-stone-800 to-stone-900 text-4xl">
          🚗
        </div>

        {/* Dark gradient for legibility of controls */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Slide label */}
        <span className="absolute bottom-7 left-2.5 rounded bg-black/40 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white/70 backdrop-blur-sm">
          {SLIDE_LABELS[slide] ?? ''}
        </span>

        {/* Dot nav */}
        {total > 1 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {car.imgs.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={e => goTo(i, e)}
                aria-label={`Slide ${i + 1}`}
                className={
                  'rounded-full transition-all duration-300 ' +
                  (i === slide ? 'h-1.5 w-4 bg-accent-400' : 'h-1.5 w-1.5 bg-white/40 hover:bg-white/70')
                }
              />
            ))}
          </div>
        )}

        {/* Prev / Next arrows — visible on hover */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="absolute left-1 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-black/70"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="absolute right-1 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-black/70"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Selected overlay + tick */}
        {isSelected && <div className="absolute inset-0 bg-accent-400/10" />}
        {isSelected && (
          <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent-400">
            <svg className="h-3 w-3 text-stone-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* ── Label ── */}
      <div className="p-2.5">
        <p className="text-xs font-bold leading-tight text-white">{car.label}</p>
        <p className="mt-0.5 text-[10px] leading-tight text-stone-400">{car.sub}</p>
        {car.seats && (
          <p className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-accent-400/70">
            Up to {car.seats} seats
          </p>
        )}
      </div>
    </button>
  )
}
