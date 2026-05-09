import { useEffect, useRef } from "react"

function bezierArc(p1, p2, steps = 40) {
  // Quadratic bezier arc: control point offset perpendicular to midpoint
  const midLat = (p1[0] + p2[0]) / 2
  const midLng = (p1[1] + p2[1]) / 2
  const dLat = p2[0] - p1[0]
  const dLng = p2[1] - p1[1]
  const k = 0.25  // arc curvature — higher = more curved
  const ctrlLat = midLat - dLng * k
  const ctrlLng = midLng + dLat * k
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    pts.push([
      (1 - t) * (1 - t) * p1[0] + 2 * (1 - t) * t * ctrlLat + t * t * p2[0],
      (1 - t) * (1 - t) * p1[1] + 2 * (1 - t) * t * ctrlLng + t * t * p2[1],
    ])
  }
  return pts
}

export default function LeafletRouteMap({ stops }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import("leaflet").then(({ default: L }) => {
      const center = stops[Math.floor(stops.length / 2)].coords
      const map = L.map(containerRef.current, { zoomControl: true, scrollWheelZoom: false }).setView(center, 5)

      // Dark tile — free, no API key
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map)

      // Draw curved arcs between consecutive stops
      const coords = stops.map(s => s.coords)
      for (let i = 0; i < coords.length - 1; i++) {
        const arc = bezierArc(coords[i], coords[i + 1])
        // Glow layer — thick, dim
        L.polyline(arc, { color: "#f59e0b", weight: 8, opacity: 0.12, lineCap: "round" }).addTo(map)
        // Main line — thin, sharp
        L.polyline(arc, { color: "#f59e0b", weight: 2, opacity: 0.9, lineCap: "round" }).addTo(map)
      }

      // Markers
      stops.forEach((stop, i) => {
        const isFirst = i === 0
        const isLast  = i === stops.length - 1
        const size    = isFirst || isLast ? 14 : 10
        const ring    = isFirst || isLast ? `box-shadow:0 0 0 3px rgba(245,158,11,0.35),0 2px 8px rgba(0,0,0,0.6)` : `box-shadow:0 1px 5px rgba(0,0,0,0.5)`

        const icon = L.divIcon({
          className: "",
          html: `<div style="width:${size}px;height:${size}px;background:#f59e0b;border:2px solid #1c1917;border-radius:50%;${ring}"></div>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
          popupAnchor: [0, -size / 2 - 4],
        })

        L.marker(stop.coords, { icon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:sans-serif;min-width:150px;background:#1c1917;color:#fff;border-radius:8px;padding:10px 12px;">
              <p style="margin:0 0 2px;font-size:10px;color:#f59e0b;text-transform:uppercase;letter-spacing:.08em;font-weight:700">Day ${stop.day}</p>
              <p style="margin:0 0 4px;font-weight:700;font-size:13px;color:#fff">${stop.title}</p>
              <p style="margin:0;font-size:11px;color:#a8a29e;line-height:1.5">${stop.desc}</p>
            </div>`,
            { maxWidth: 240, className: "dark-popup" }
          )
      })

      map.fitBounds(coords, { padding: [36, 36] })
      mapRef.current = map
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ height: "420px", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}
    />
  )
}
