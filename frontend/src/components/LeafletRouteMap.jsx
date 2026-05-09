import { useEffect, useRef } from "react"

export default function LeafletRouteMap({ stops }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import("leaflet").then(({ default: L }) => {
      const center = stops[Math.floor(stops.length / 2)].coords
      const map = L.map(containerRef.current, { zoomControl: true, scrollWheelZoom: false }).setView(center, 5)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      const dotIcon = L.divIcon({
        className: "",
        html: `<div style="width:12px;height:12px;background:#f59e0b;border:2px solid #fff;border-radius:50%;box-shadow:0 1px 6px rgba(0,0,0,0.5)"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        popupAnchor: [0, -10],
      })

      const coords = stops.map(s => s.coords)
      L.polyline(coords, { color: "#f59e0b", weight: 2.5, opacity: 0.75, dashArray: "6 4" }).addTo(map)

      stops.forEach(stop => {
        L.marker(stop.coords, { icon: dotIcon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:sans-serif;min-width:140px">
              <p style="margin:0 0 2px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:.06em">Day ${stop.day}</p>
              <p style="margin:0 0 4px;font-weight:700;font-size:13px">${stop.title}</p>
              <p style="margin:0;font-size:12px;color:#374151;line-height:1.4">${stop.desc}</p>
            </div>`,
            { maxWidth: 220 }
          )
      })

      map.fitBounds(coords, { padding: [30, 30] })
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
