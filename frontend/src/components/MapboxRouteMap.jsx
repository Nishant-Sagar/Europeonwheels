import { useEffect, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

function haversine([lat1, lon1], [lat2, lon2]) {
  const R = 6371
  const φ1 = (lat1 * Math.PI) / 180, φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}

function driveTime(km) {
  const h = km / 75, hh = Math.floor(h), mm = Math.round((h - hh) * 60)
  if (hh === 0) return `${mm}m`
  return mm > 0 ? `${hh}h ${mm}m` : `${hh}h`
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

const MARKER_STYLE = `
  .mbx-marker {
    width:32px;height:32px;border-radius:50%;
    background:#f59e0b;border:2.5px solid #fff;
    display:flex;align-items:center;justify-content:center;
    font-size:12px;font-weight:800;color:#1c1917;
    font-family:system-ui,sans-serif;cursor:pointer;
    box-shadow:0 0 0 0 rgba(245,158,11,.6),0 4px 16px rgba(0,0,0,.6);
    animation:mbxpop .5s cubic-bezier(.34,1.56,.64,1) both,
              mbxpulse 2.4s ease-out 0.5s infinite;
  }
  @keyframes mbxpop  { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
  @keyframes mbxpulse {
    0%  {box-shadow:0 0 0 0    rgba(245,158,11,.6),0 4px 16px rgba(0,0,0,.6)}
    70% {box-shadow:0 0 0 16px rgba(245,158,11,0), 0 4px 16px rgba(0,0,0,.6)}
    100%{box-shadow:0 0 0 0    rgba(245,158,11,0), 0 4px 16px rgba(0,0,0,.6)}
  }
  .mbx-marker.active {
    background:#fff;color:#1c1917;
    box-shadow:0 0 0 8px rgba(255,255,255,.2),0 4px 20px rgba(0,0,0,.7) !important;
  }
  .mapboxgl-popup-content {
    background:rgba(12,10,9,.96)!important;
    border:1px solid rgba(245,158,11,.3)!important;
    border-radius:12px!important;
    padding:12px 16px!important;
    box-shadow:0 8px 32px rgba(0,0,0,.7)!important;
    color:#e7e5e4;font-family:system-ui,sans-serif;min-width:180px;
  }
  .mapboxgl-popup-tip { border-top-color:rgba(12,10,9,.96)!important }
  .mapboxgl-popup-close-button { color:#6b7280;font-size:16px;top:6px;right:8px }
  .mapboxgl-popup-close-button:hover { color:#fff;background:transparent }
`

export default function MapboxRouteMap({ stops }) {
  const containerRef = useRef(null)
  const mapRef       = useRef(null)
  const cancelRef    = useRef(false)
  const markersRef   = useRef([])
  const [stopIdx, setStopIdx]   = useState(0)
  const [touring, setTouring]   = useState(true)
  const [loaded, setLoaded]     = useState(false)

  const segments = stops.slice(0, -1).map((s, i) => ({
    dist: haversine(s.coords, stops[i + 1].coords),
  }))
  const totalKm   = segments.reduce((a, s) => a + s.dist, 0)

  useEffect(() => {
    if (!TOKEN || !containerRef.current || mapRef.current) return
    cancelRef.current = false

    import('mapbox-gl').then(({ default: mapboxgl }) => {
      if (!containerRef.current || mapRef.current) return

      mapboxgl.accessToken = TOKEN

      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [stops[0].coords[1], stops[0].coords[0]],
        zoom: 8,
        pitch: 55,
        bearing: -20,
        antialias: true,
      })
      mapRef.current = map

      map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right')

      map.on('load', () => {
        // ── Atmosphere / Google-Earth feel ──
        map.setFog({
          color: 'rgb(220,230,240)',
          'high-color': 'rgb(40,90,200)',
          'horizon-blend': 0.03,
          'space-color': 'rgb(8,8,20)',
          'star-intensity': 0.7,
        })

        // ── 3-D terrain ──
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512, maxzoom: 14,
        })
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.6 })

        // ── Route line ──
        const coords = stops.map(s => [s.coords[1], s.coords[0]])
        map.addSource('route', {
          type: 'geojson',
          data: { type: 'Feature', geometry: { type: 'LineString', coordinates: coords } },
        })
        map.addLayer({
          id: 'route-glow',
          type: 'line', source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#f59e0b', 'line-width': 10, 'line-opacity': 0.25, 'line-blur': 6 },
        })
        map.addLayer({
          id: 'route-line',
          type: 'line', source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#fbbf24', 'line-width': 2.5, 'line-dasharray': [2, 3] },
        })

        // ── City markers ──
        stops.forEach((stop, i) => {
          const el = document.createElement('div')
          el.className = 'mbx-marker'
          el.textContent = i + 1
          el.style.animationDelay = `${i * 0.3}s`

          const popup = new mapboxgl.Popup({ offset: 20, closeButton: true })
            .setHTML(`
              <div style="line-height:1.5">
                <div style="font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#f59e0b;margin-bottom:4px">Day ${stop.day}</div>
                <div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:6px">${stop.title}</div>
                <div style="font-size:12px;color:#a8a29e;line-height:1.6">${stop.desc}</div>
                ${i < stops.length - 1 ? `<div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.08);font-size:11px;color:#57534e">Next: ~${segments[i]?.dist ?? ''} km · ${driveTime(segments[i]?.dist ?? 0)} drive</div>` : ''}
              </div>
            `)

          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([stop.coords[1], stop.coords[0]])
            .setPopup(popup)
            .addTo(map)

          el.addEventListener('click', () => {
            setStopIdx(i)
            markersRef.current.forEach((m, j) =>
              m.getElement().classList.toggle('active', j === i)
            )
          })

          markersRef.current.push(marker)
        })

        setLoaded(true)

        // ── Auto-tour: cinematic flyTo each stop ──
        async function runTour() {
          await sleep(1200)

          while (!cancelRef.current) {
            for (let i = 0; i < stops.length; i++) {
              if (cancelRef.current) return
              setStopIdx(i)
              markersRef.current.forEach((m, j) =>
                m.getElement().classList.toggle('active', j === i)
              )

              await new Promise(resolve => {
                map.once('moveend', resolve)
                map.flyTo({
                  center: [stops[i].coords[1], stops[i].coords[0]],
                  zoom: i === 0 ? 9 : 11.5,
                  pitch: 62,
                  bearing: -25 + (i * 22 % 50),
                  duration: 4500,
                  essential: true,
                  curve: 1.4,
                  speed: 0.6,
                })
              })

              await sleep(2800) // linger at each stop
            }

            // Pull back to see the full route before looping
            if (!cancelRef.current) {
              const [minLng, maxLng, minLat, maxLat] = stops.reduce(
                ([mnLng, mxLng, mnLat, mxLat], s) => [
                  Math.min(mnLng, s.coords[1]), Math.max(mxLng, s.coords[1]),
                  Math.min(mnLat, s.coords[0]), Math.max(mxLat, s.coords[0]),
                ],
                [Infinity, -Infinity, Infinity, -Infinity]
              )
              await new Promise(resolve => {
                map.once('moveend', resolve)
                map.fitBounds([[minLng, minLat], [maxLng, maxLat]], {
                  padding: 80, pitch: 40, bearing: 0, duration: 3500, essential: true,
                })
              })
              await sleep(2000)
            }
          }
        }

        runTour()
      })
    })

    return () => {
      cancelRef.current = true
      markersRef.current = []
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null }
    }
  }, [])

  const stop = stops[stopIdx]

  if (!TOKEN) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-2xl border border-white/[0.07] bg-stone-900/60 text-center px-8">
        <div>
          <p className="text-2xl font-bold text-white">3D Satellite Map</p>
          <p className="mt-3 text-sm text-stone-400 max-w-sm">
            Add <code className="rounded bg-white/10 px-1.5 py-0.5 text-accent-400">VITE_MAPBOX_TOKEN=your_token</code> to your <code className="rounded bg-white/10 px-1.5 py-0.5 text-accent-400">.env</code> file.
          </p>
          <p className="mt-2 text-xs text-stone-600">Get a free token at mapbox.com — 50,000 loads/month free.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{MARKER_STYLE}</style>
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]" style={{ height: 500 }}>
        <div ref={containerRef} className="h-full w-full" />

        {/* Current stop info panel */}
        {loaded && stop && (
          <div className="pointer-events-none absolute left-4 top-4 z-10 max-w-[220px] rounded-2xl border border-white/10 bg-stone-950/85 p-4 backdrop-blur-md">
            <p className="text-[9px] font-bold uppercase tracking-[.2em] text-accent-400">
              Stop {stopIdx + 1} of {stops.length}
            </p>
            <p className="mt-1 text-sm font-bold leading-tight text-white">{stop.title}</p>
            <div className="mt-2 flex items-center gap-1.5">
              {stops.map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-all duration-500"
                  style={{ background: i === stopIdx ? '#f59e0b' : 'rgba(255,255,255,0.15)' }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Route summary */}
        {loaded && (
          <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-stone-950/85 px-4 py-3 backdrop-blur-md">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-400/15">
              <svg className="h-4 w-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-stone-500">Total route</p>
              <p className="text-sm font-bold text-white">
                ~{totalKm.toLocaleString()} km
                <span className="ml-2 font-normal text-stone-400">· {driveTime(totalKm)} · {stops.length} stops</span>
              </p>
            </div>
          </div>
        )}

        {/* Edge vignette */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ boxShadow: 'inset 0 0 60px rgba(12,10,9,0.35)' }} />
      </div>
    </>
  )
}
