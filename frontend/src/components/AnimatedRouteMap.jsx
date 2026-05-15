import { useState } from 'react'

const W = 1000
const H = 580
const PAD = 70

const OUTLINES = {
  Germany: [
    [54.9, 9.4], [54.3, 10.0], [54.1, 13.0], [53.9, 14.1], [52.4, 14.6], [51.8, 14.8],
    [51.0, 15.0], [50.5, 12.6], [50.2, 12.6], [49.8, 13.0], [48.6, 13.5], [47.8, 13.0],
    [47.6, 12.9], [47.5, 11.1], [47.6, 9.7], [47.5, 7.6], [48.0, 7.8], [49.3, 6.5],
    [50.0, 6.8], [50.8, 6.0], [51.9, 6.2], [53.5, 6.8], [54.9, 9.4],
  ],
  Austria: [
    [48.0, 17.1], [47.8, 16.5], [46.9, 16.1], [46.5, 14.1], [46.5, 13.7], [46.7, 13.0],
    [47.1, 12.2], [47.3, 10.8], [47.6, 9.6], [47.7, 9.5], [47.8, 10.2], [47.8, 12.9],
    [47.5, 13.0], [47.8, 14.0], [48.3, 15.0], [48.8, 16.9], [48.0, 17.1],
  ],
  'Czech Republic': [
    [51.1, 12.1], [51.0, 15.0], [51.0, 18.0], [49.5, 18.9], [48.6, 17.9],
    [48.5, 16.9], [48.6, 13.5], [49.8, 12.0], [51.1, 12.1],
  ],
  Hungary: [
    [48.6, 16.2], [47.8, 16.4], [46.9, 16.1], [46.2, 16.6], [45.8, 16.5], [45.7, 18.9],
    [46.1, 20.8], [46.0, 22.9], [47.1, 22.9], [48.4, 22.2], [48.6, 20.5], [48.6, 18.8],
    [48.0, 17.1], [48.6, 16.2],
  ],
  Slovenia: [
    [46.9, 16.1], [46.5, 14.1], [46.6, 13.7], [45.5, 13.7],
    [45.4, 14.9], [45.8, 15.7], [46.3, 16.1], [46.9, 16.1],
  ],
  Slovakia: [
    [49.6, 17.2], [49.5, 22.5], [48.6, 22.9], [47.8, 20.5],
    [48.0, 18.8], [48.0, 17.1], [49.6, 17.2],
  ],
  Croatia: [
    [46.6, 13.7], [45.5, 13.7], [44.0, 14.5], [43.0, 17.0], [42.5, 18.5],
    [43.5, 18.0], [44.5, 17.5], [45.2, 16.3], [45.7, 18.9], [46.2, 16.6],
    [46.9, 16.1], [46.6, 13.7],
  ],
  Italy: [
    [47.1, 10.5], [46.4, 11.0], [45.7, 13.7], [44.8, 12.5], [43.9, 11.7],
    [42.8, 11.0], [41.9, 12.5], [41.5, 13.5], [41.0, 14.0], [39.9, 15.7],
    [38.0, 15.7], [37.5, 15.1], [38.3, 13.5], [37.9, 12.5], [40.5, 10.5],
    [41.0, 9.4], [43.0, 10.2], [44.4, 8.9], [44.0, 7.8], [44.2, 7.5],
    [45.0, 7.2], [45.6, 8.0], [46.5, 8.1], [47.1, 10.5],
  ],
  Switzerland: [
    [47.80, 5.96], [47.58, 6.64], [47.70, 7.60], [47.58, 8.48], [47.72, 9.55],
    [47.42, 9.65], [47.17, 9.48], [46.90, 10.48], [46.55, 10.43], [46.23, 10.12],
    [46.00, 9.45], [45.83, 8.93], [45.98, 8.42], [45.82, 7.78], [45.92, 7.05],
    [46.20, 6.13], [46.48, 6.03], [47.02, 6.45], [47.30, 6.95], [47.55, 6.74],
    [47.80, 5.96],
  ],
}

function haversine([lat1, lon1], [lat2, lon2]) {
  const R = 6371
  const p1 = (lat1 * Math.PI) / 180
  const p2 = (lat2 * Math.PI) / 180
  const dp = ((lat2 - lat1) * Math.PI) / 180
  const dl = ((lon2 - lon1) * Math.PI) / 180
  const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}

function driveTime(km) {
  const h = km / 75
  const hh = Math.floor(h)
  const mm = Math.round((h - hh) * 60)
  return hh === 0 ? `${mm}m` : mm > 0 ? `${hh}h ${mm}m` : `${hh}h`
}

function cleanTitle(title) {
  return title
    .replace(/ Arrival$/, '')
    .replace(/^Departure[— -]+/, '')
    .replace(' & Fuessen', '')
    .replace('Jungfrau & Grindelwald', 'Jungfrau')
    .replace('Bern & Montreux', 'Bern')
    .replace('Triglav & Lake Bohinj', 'Triglav')
    .replace(' City Centre', '')
    .replace(' Castle Hill', '')
    .replace(' Deep Dive', '')
    .replace(' Drive', '')
    .replace(' & Cologne', '')
    .replace('Black Forest & ', '')
}

function scaleFromCoords(coords, padRatio = 0.16, minPad = 0.28) {
  const lats = coords.map((coord) => coord[0])
  const lngs = coords.map((coord) => coord[1])
  const minLt = Math.min(...lats)
  const maxLt = Math.max(...lats)
  const minLg = Math.min(...lngs)
  const maxLg = Math.max(...lngs)
  const latPad = Math.max((maxLt - minLt) * padRatio, minPad)
  const lngPad = Math.max((maxLg - minLg) * padRatio, minPad)
  return { minLt, maxLt, minLg, maxLg, latPad, lngPad }
}

function projectedBounds(stops, scale) {
  const points = stops.map((stop) => toXY(stop.coords, scale))
  const xs = points.map((point) => point.x)
  const ys = points.map((point) => point.y)
  return {
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys),
  }
}

function getScale(stops, outline = []) {
  const stopCoords = stops.map((stop) => stop.coords)
  const outlineScale = scaleFromCoords([...stopCoords, ...outline], 0.06, 0.12)
  const routeBounds = projectedBounds(stops, outlineScale)
  const routeLooksCompressed = routeBounds.width < W * 0.36 || routeBounds.height < H * 0.28

  if (routeLooksCompressed) {
    return scaleFromCoords(stopCoords, 0.48, 0.38)
  }

  return outlineScale
}

function toXY([lat, lng], scale) {
  return {
    x: PAD + ((lng - (scale.minLg - scale.lngPad)) / ((scale.maxLg + scale.lngPad) - (scale.minLg - scale.lngPad))) * (W - PAD * 2),
    y: PAD + (((scale.maxLt + scale.latPad) - lat) / ((scale.maxLt + scale.latPad) - (scale.minLt - scale.latPad))) * (H - PAD * 2),
  }
}

function project(stops, scale) {
  return stops.map((stop, index) => ({ ...stop, index, ...toXY(stop.coords, scale) }))
}

function separateClosePoints(points) {
  const minDistance = 48
  const adjusted = points.map((point) => ({ ...point, sourceX: point.x, sourceY: point.y }))

  for (let pass = 0; pass < 18; pass += 1) {
    for (let i = 0; i < adjusted.length; i += 1) {
      for (let j = i + 1; j < adjusted.length; j += 1) {
        const a = adjusted[i]
        const b = adjusted[j]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const distance = Math.hypot(dx, dy)
        if (distance >= minDistance) continue

        const angle = distance < 0.1 ? (j * 1.35 + i * 0.7) : Math.atan2(dy, dx)
        const push = (minDistance - Math.max(distance, 0.1)) / 2
        const px = Math.cos(angle) * push
        const py = Math.sin(angle) * push

        a.x = Math.max(38, Math.min(W - 38, a.x - px))
        a.y = Math.max(88, Math.min(H - 38, a.y - py))
        b.x = Math.max(38, Math.min(W - 38, b.x + px))
        b.y = Math.max(88, Math.min(H - 38, b.y + py))
      }
    }
  }

  return adjusted
}

function outlinePath(coords, scale, offset = { x: 0, y: 0 }) {
  const points = coords.map((coord) => {
    const point = toXY(coord, scale)
    return { x: point.x + offset.x, y: point.y + offset.y }
  })
  return `M${points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' L')}Z`
}

function curvePath(points) {
  if (!points.length) return ''
  return points.slice(1).reduce((path, point, index) => {
    const prev = points[index]
    const cx = (prev.x + point.x) / 2 + (index % 2 === 0 ? -18 : 18)
    const cy = (prev.y + point.y) / 2 - 14
    return `${path} Q${cx.toFixed(1)},${cy.toFixed(1)} ${point.x.toFixed(1)},${point.y.toFixed(1)}`
  }, `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`)
}

function placeLabels(points) {
  const placed = []
  return points.map((point) => {
    const label = cleanTitle(point.title)
    const width = Math.max(100, Math.min(158, label.length * 7.2 + 52))
    const height = 42
    const gap = 24
    const options = [
      { ox: gap, oy: -(height + gap), ax: width / 2, ay: height },
      { ox: -width - gap, oy: -(height + gap), ax: width / 2, ay: height },
      { ox: gap, oy: -height / 2, ax: 0, ay: height / 2 },
      { ox: -width - gap, oy: -height / 2, ax: width, ay: height / 2 },
      { ox: gap, oy: gap, ax: width / 2, ay: 0 },
      { ox: -width - gap, oy: gap, ax: width / 2, ay: 0 },
      { ox: -width / 2, oy: -(height + gap), ax: width / 2, ay: height },
      { ox: -width / 2, oy: gap, ax: width / 2, ay: 0 },
    ]

    let best = options[0]
    for (const option of options) {
      const x = point.x + option.ox
      const y = point.y + option.oy
      if (x < 8 || x + width > W - 8 || y < 8 || y + height > H - 8) continue
      const clash = placed.some((item) =>
        !(x + width + 8 < item.x || item.x + item.w + 8 < x || y + height + 6 < item.y || item.y + item.h + 6 < y)
      )
      if (!clash) {
        best = option
        break
      }
    }

    placed.push({ x: point.x + best.ox, y: point.y + best.oy, w: width, h: height })
    return {
      ...point,
      label,
      width,
      height,
      px: point.x + best.ox,
      py: point.y + best.oy,
      lx: point.x + best.ox + best.ax,
      ly: point.y + best.oy + best.ay,
    }
  })
}

function visualBounds(points, labels) {
  const boxes = [
    ...points.map((point) => ({
      left: point.x - 36,
      right: point.x + 36,
      top: point.y - 44,
      bottom: point.y + 44,
    })),
    ...labels.map((label) => ({
      left: label.px,
      right: label.px + label.width,
      top: label.py,
      bottom: label.py + label.height,
    })),
  ]

  return {
    left: Math.min(...boxes.map((box) => box.left)),
    right: Math.max(...boxes.map((box) => box.right)),
    top: Math.min(...boxes.map((box) => box.top)),
    bottom: Math.max(...boxes.map((box) => box.bottom)),
  }
}

function centeredOffset(points) {
  const labels = placeLabels(points)
  const bounds = visualBounds(points, labels)
  const targetX = W / 2
  const targetY = H * 0.54
  let x = targetX - (bounds.left + bounds.right) / 2
  let y = targetY - (bounds.top + bounds.bottom) / 2

  const minX = 34
  const maxX = W - 34
  const minY = 88
  const maxY = H - 36
  x = Math.max(minX - bounds.left, Math.min(maxX - bounds.right, x))
  y = Math.max(minY - bounds.top, Math.min(maxY - bounds.bottom, y))

  return { x, y }
}

function applyOffset(points, offset) {
  return points.map((point) => ({
    ...point,
    x: point.x + offset.x,
    y: point.y + offset.y,
    sourceX: point.sourceX + offset.x,
    sourceY: point.sourceY + offset.y,
  }))
}

function Compass({ x, y, radius = 46 }) {
  const ticks = Array.from({ length: 36 }, (_, index) => {
    const angle = (index * 10 * Math.PI) / 180
    const start = index % 9 === 0 ? radius - 14 : index % 3 === 0 ? radius - 9 : radius - 5
    return { angle, start, major: index % 9 === 0 }
  })

  return (
    <g transform={`translate(${x},${y})`}>
      <circle r={radius + 10} fill="#fffaf0" stroke="#d6cab3" strokeWidth="1.5" filter="url(#sh2)" />
      <circle r={radius} fill="#f7ecd8" stroke="#9a6a23" strokeWidth="1" />
      <circle r={radius - 16} fill="none" stroke="rgba(138,86,49,0.2)" strokeWidth="0.8" />
      {ticks.map(({ angle, start, major }, index) => (
        <line
          key={index}
          x1={Math.sin(angle) * start}
          y1={-Math.cos(angle) * start}
          x2={Math.sin(angle) * radius}
          y2={-Math.cos(angle) * radius}
          stroke={major ? '#9a6a23' : 'rgba(138,86,49,0.28)'}
          strokeWidth={major ? 1.5 : 0.7}
        />
      ))}
      <polygon points="0,-38 6,0 0,7 -6,0" fill="#d94b3d" />
      <polygon points="0,38 6,0 0,-7 -6,0" fill="rgba(138,86,49,0.34)" />
      <line x1={radius - 10} y1="0" x2={radius} y2="0" stroke="#9a6a23" strokeWidth="1.5" />
      <line x1={-(radius - 10)} y1="0" x2={-radius} y2="0" stroke="#9a6a23" strokeWidth="1.5" />
      <text y={-radius - 16} textAnchor="middle" fill="#9a6a23" style={{ fontSize: 11, fontWeight: 800, fontFamily: 'system-ui', letterSpacing: '0.05em' }}>N</text>
      <text y={radius + 20} textAnchor="middle" fill="#8a5631" style={{ fontSize: 9, fontWeight: 700, fontFamily: 'system-ui' }}>S</text>
      <text x={radius + 18} y="4" textAnchor="middle" fill="#8a5631" style={{ fontSize: 9, fontWeight: 700, fontFamily: 'system-ui' }}>E</text>
      <text x={-radius - 18} y="4" textAnchor="middle" fill="#8a5631" style={{ fontSize: 9, fontWeight: 700, fontFamily: 'system-ui' }}>W</text>
      <circle r="6" fill="#d94b3d" />
      <circle r="2.5" fill="#fffaf0" />
    </g>
  )
}

function tooltipPlacement(point) {
  const width = 270
  const height = 124
  let x = point.x + 24
  let y = point.y - height - 24

  if (x + width > W - 16) x = point.x - width - 24
  if (x < 16) x = 16
  if (y < 76) y = point.y + 32
  if (y + height > H - 16) y = H - height - 16

  return { x, y, width, height }
}

function shortDesc(desc) {
  if (!desc) return ''
  return desc.length > 118 ? `${desc.slice(0, 115).trim()}...` : desc
}

function Mountain({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity=".78">
      <path d="M0 42 28 0l28 42Z" fill="#f7f1df" stroke="#58756d" strokeWidth="1.4" />
      <path d="M28 0 56 42H35l-7-15-8 15H0Z" fill="#d6dfc6" />
      <path d="M19 14 28 0l10 15-6-2-4 6-4-6Z" fill="#fff" />
    </g>
  )
}

function Pine({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity=".72">
      <path d="M10 0 0 18h6l-9 15h8L0 46h21l-5-13h8l-9-15h6Z" fill="#315f45" />
      <path d="M8 44h5v12H8z" fill="#7b5936" />
    </g>
  )
}

function Cross({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity=".78">
      <path d="M10 0h13v10h10v13H23v10H10V23H0V10h10Z" fill="#d94b3d" />
    </g>
  )
}

const STYLE = `
  @keyframes eowDraw { from{stroke-dashoffset:2800} to{stroke-dashoffset:0} }
  @keyframes eowFlow { to{stroke-dashoffset:-24} }
  @keyframes eowPop { from{opacity:0;transform:scale(.4) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes eowLabel { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
  @keyframes eowGlow { 0%,100%{opacity:.18} 50%{opacity:.32} }
  @keyframes eowCountry { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
  .eow-draw { stroke-dasharray:2800; stroke-dashoffset:2800; animation:eowDraw 2.8s cubic-bezier(.4,0,.2,1) forwards }
  .eow-flow { stroke-dasharray:10 13; animation:eowFlow 1s linear infinite }
  .eow-pin { opacity:0; transform-box:fill-box; transform-origin:center; animation:eowPop .55s cubic-bezier(.34,1.56,.64,1) forwards }
  .eow-label { opacity:0; animation:eowLabel .4s ease-out forwards }
  .eow-glow { animation:eowGlow 3s ease-in-out infinite }
  .eow-country { transform-box:fill-box; transform-origin:center; animation:eowCountry .8s ease-out forwards }
  .eow-pin-group { cursor:pointer; outline:none }
  .eow-pin-core { transform-box:fill-box; transform-origin:center; transition:transform .18s ease, filter .18s ease }
  .eow-pin-group:hover .eow-pin-core,
  .eow-pin-group:focus .eow-pin-core { transform:scale(1.22); filter:drop-shadow(0 0 12px rgba(217,75,61,.45)) }
  .eow-pin-detail { opacity:0; transform:translateY(7px); transition:opacity .18s ease, transform .18s ease; pointer-events:none }
  .eow-pin-group:hover .eow-pin-detail,
  .eow-pin-group:focus .eow-pin-detail { opacity:1; transform:translateY(0) }
`

export default function AnimatedRouteMap({ stops, country = 'Europe', durationLabel = '7-Day Scenic Route' }) {
  const [activePin, setActivePin] = useState(null)
  const outline = OUTLINES[country] || []
  const scale = getScale(stops, outline)
  const projectedPoints = separateClosePoints(project(stops, scale))
  const offset = centeredOffset(projectedPoints)
  const points = applyOffset(projectedPoints, offset)
  const labels = placeLabels(points)
  const path = curvePath(points)
  const outlineSvgPath = outline.length ? outlinePath(outline, scale, offset) : null
  const segments = stops.slice(0, -1).map((stop, index) => ({ dist: haversine(stop.coords, stops[index + 1].coords) }))
  const totalKm = segments.reduce((sum, segment) => sum + segment.dist, 0)

  return (
    <>
      <style>{STYLE}</style>
      <p className="mb-2 text-center text-[11px] text-stone-400 sm:hidden">Tap a pin to see stop details</p>
      <div className="relative overflow-hidden rounded-3xl border border-white/50 shadow-[0_28px_80px_rgba(0,0,0,0.24)]" style={{ background: 'linear-gradient(180deg,#c4edf2 0%,#86cbd5 58%,#69b3bf 100%)' }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="relative z-10 block w-full" style={{ height: 'clamp(300px,40vw,440px)' }} role="img" aria-label={`${country} route map`} onClick={() => setActivePin(null)}>
          <defs>
            <filter id="sh1" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#1c1917" floodOpacity=".24" />
            </filter>
            <filter id="sh2" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1c1917" floodOpacity=".2" />
            </filter>
            <radialGradient id="bgGlow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.42)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <radialGradient id="countryFill" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fff2d2" />
              <stop offset="58%" stopColor="#dce4bf" />
              <stop offset="100%" stopColor="#efd3a4" />
            </radialGradient>
            <linearGradient id="lakeFill" x1="0" x2="1">
              <stop offset="0%" stopColor="#76cee0" />
              <stop offset="100%" stopColor="#29a7c3" />
            </linearGradient>
            <pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="0.9" fill="rgba(49,95,104,0.08)" />
            </pattern>
            <pattern id="lineGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M80 0 L0 0 0 80" fill="none" stroke="rgba(49,95,104,0.055)" strokeWidth="1" />
            </pattern>
            {outlineSvgPath && (
              <clipPath id="countryClip">
                <path d={outlineSvgPath} />
              </clipPath>
            )}
          </defs>

          <rect width={W} height={H} fill="#a9dce4" />
          <rect width={W} height={H} fill="url(#lineGrid)" />
          <rect width={W} height={H} fill="url(#dotGrid)" />
          <rect width={W} height={H} fill="url(#bgGlow)" />

          {[140, 210, 280, 350, 420, 490].map((y) => (
            <line key={y} x1="30" y1={y} x2={W - 30} y2={y} stroke="rgba(49,95,104,0.045)" strokeWidth="1" />
          ))}

          {outlineSvgPath && (
            <g className="eow-country">
              <path d={outlineSvgPath} fill="none" stroke="rgba(28,25,23,0.16)" strokeWidth="17" strokeLinejoin="round" filter="url(#sh1)" />
              <path d={outlineSvgPath} fill="url(#countryFill)" stroke="#315f68" strokeWidth="2.5" strokeLinejoin="round" />
              <path d={outlineSvgPath} fill="none" stroke="rgba(255,255,255,0.58)" strokeWidth="3" strokeLinejoin="round" />
              <rect width={W} height={H} fill="url(#dotGrid)" clipPath="url(#countryClip)" opacity="0.6" />
              <path d={`M${W * 0.18},${H * 0.34} C${W * 0.32},${H * 0.44} ${W * 0.45},${H * 0.27} ${W * 0.6},${H * 0.38} S${W * 0.82},${H * 0.43} ${W * 0.9},${H * 0.32}`} fill="none" stroke="#b9cfaa" strokeWidth="44" strokeLinecap="round" opacity=".42" clipPath="url(#countryClip)" />
              <path d={`M${W * 0.16},${H * 0.72} C${W * 0.34},${H * 0.62} ${W * 0.45},${H * 0.82} ${W * 0.64},${H * 0.68}`} fill="none" stroke="#ecd0a0" strokeWidth="48" strokeLinecap="round" opacity=".52" clipPath="url(#countryClip)" />
            </g>
          )}

          <path d={`M${W * 0.06},${H * 0.84} C${W * 0.1},${H * 0.88} ${W * 0.15},${H * 0.88} ${W * 0.2},${H * 0.84} S${W * 0.29},${H * 0.8} ${W * 0.34},${H * 0.84}`} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".68" />
          <path d={`M${W * 0.78},${H * 0.17} C${W * 0.82},${H * 0.21} ${W * 0.88},${H * 0.2} ${W * 0.93},${H * 0.17}`} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".6" />

          <g clipPath={outlineSvgPath ? 'url(#countryClip)' : undefined}>
            <Mountain x={W * 0.24} y={H * 0.32} scale=".82" />
            <Mountain x={W * 0.48} y={H * 0.62} scale=".98" />
            <Mountain x={W * 0.66} y={H * 0.44} scale=".72" />
            <Pine x={W * 0.28} y={H * 0.49} scale=".58" />
            <Pine x={W * 0.37} y={H * 0.35} scale=".5" />
            <Pine x={W * 0.72} y={H * 0.56} scale=".56" />
            <Pine x={W * 0.59} y={H * 0.29} scale=".5" />
            <Cross x={W * 0.2} y={H * 0.58} scale=".6" />
            <Cross x={W * 0.78} y={H * 0.41} scale=".5" />
          </g>

          <text x={W / 2} y="42" textAnchor="middle" fill="#1c1917" style={{ fontSize: 28, fontWeight: 800, fontFamily: 'system-ui', letterSpacing: '-0.3px' }}>
            {country}
          </text>
          <text x={W / 2} y="64" textAnchor="middle" fill="#8a5d1b" style={{ fontSize: 11, fontWeight: 800, fontFamily: 'system-ui', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            {durationLabel}
          </text>

          <path d={path} fill="none" stroke="#8a5631" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" opacity=".18" className="eow-glow" />
          <path d={path} fill="none" stroke="#c47a3a" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" opacity=".34" />
          <path d={path} fill="none" stroke="#8a5631" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" opacity=".9" />
          <path d={path} fill="none" stroke="#f8d38c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="eow-draw" />
          <path d={path} fill="none" stroke="#fff4ce" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="eow-flow" opacity=".72" />

          {points.slice(0, -1).map((point, index) => {
            const next = points[index + 1]
            const mx = (point.x + next.x) / 2 + (index % 2 === 0 ? -16 : 16)
            const my = (point.y + next.y) / 2 - 22
            const dist = segments[index]?.dist ?? 0
            return (
              <g key={`seg-${index}`} className="eow-label" style={{ animationDelay: `${1.6 + index * 0.18}s` }}>
                <rect x={mx - 36} y={my - 11} width="72" height="22" rx="7" fill="#fffaf0" stroke="#d6cab3" strokeWidth="1" filter="url(#sh2)" />
                <text x={mx} y={my + 4} textAnchor="middle" fill="#8a5631" style={{ fontSize: 9.5, fontWeight: 800, fontFamily: 'system-ui' }}>
                  ~{dist} km
                </text>
              </g>
            )
          })}

          <g filter="url(#sh2)" opacity=".9">
            <g>
              <animateMotion dur="16s" repeatCount="indefinite" rotate="auto" path={path} />
              <rect x="-15" y="-8" width="30" height="16" rx="5" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5" />
              <circle cx="-7" cy="8" r="3" fill="#1c1917" />
              <circle cx="8" cy="8" r="3" fill="#1c1917" />
              <path d="M-4-8h10l5 6h-20Z" fill="#bae6fd" stroke="#92400e" strokeWidth="1.2" />
            </g>
          </g>

          {labels.map((label, index) => (
            <line
              key={`line-${index}`}
              x1={label.x}
              y1={label.y - 16}
              x2={label.lx}
              y2={label.ly}
              stroke="#fffaf0"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity=".85"
              className="eow-label"
              style={{ animationDelay: `${0.55 + index * 0.15}s` }}
            />
          ))}

          {labels.map((label, index) => (
            <g key={`label-${index}`} className="eow-label" style={{ animationDelay: `${0.6 + index * 0.15}s` }} filter="url(#sh2)">
              <rect x={label.px} y={label.py} width={label.width} height={label.height} rx="11" fill="#fffaf0" stroke="#d6cab3" strokeWidth="1" />
              <rect x={label.px} y={label.py} width="3.5" height={label.height} rx="1.75" fill="#d94b3d" />
              <text x={label.px + 13} y={label.py + 15} fill="#9a6a23" style={{ fontSize: 8, fontWeight: 800, fontFamily: 'system-ui', letterSpacing: '0.16em' }}>
                DAY {index + 1}
              </text>
              <text x={label.px + 13} y={label.py + 30} fill="#1c1917" style={{ fontSize: 11.5, fontWeight: 800, fontFamily: 'system-ui' }}>
                {label.label}
              </text>
            </g>
          ))}

          {points.map((point, index) => (
            <g
              key={`pin-${index}`}
              className="eow-pin eow-pin-group"
              style={{ animationDelay: `${0.4 + index * 0.13}s` }}
              tabIndex="0"
              role="button"
              aria-label={`Day ${index + 1}: ${point.title}`}
              onClick={(e) => { e.stopPropagation(); setActivePin(activePin === index ? null : index) }}
            >
              {point.sourceX !== point.x || point.sourceY !== point.y ? (
                <line
                  x1={point.sourceX}
                  y1={point.sourceY}
                  x2={point.x}
                  y2={point.y}
                  stroke="#8a5631"
                  strokeWidth="1.2"
                  strokeDasharray="2.5 3.5"
                  strokeLinecap="round"
                  opacity=".5"
                />
              ) : null}
              <g className="eow-pin-core">
                <circle cx={point.x} cy={point.y} r="14" fill="none" stroke="#d94b3d" strokeWidth="1.5">
                  <animate attributeName="r" from="14" to="28" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle cx={point.x} cy={point.y} r="13" fill="#d94b3d" filter="url(#sh1)" />
                <circle cx={point.x} cy={point.y} r="13" fill="none" stroke="#fff" strokeWidth="2.5" />
                <text x={point.x} y={point.y + 4.5} textAnchor="middle" fill="#fffaf0" style={{ fontSize: 11, fontWeight: 900, fontFamily: 'system-ui' }}>
                  {index + 1}
                </text>
              </g>
              {(() => {
                const tip = tooltipPlacement(point)
                return (
                  <foreignObject
                    x={tip.x} y={tip.y} width={tip.width} height={tip.height}
                    className={activePin === index ? '' : 'eow-pin-detail'}
                    style={activePin === index ? { opacity: 1, pointerEvents: 'auto' } : {}}
                  >
                    <div
                      xmlns="http://www.w3.org/1999/xhtml"
                      className="rounded-xl border border-stone-300 bg-[#fffaf0]/95 p-3 text-left shadow-2xl backdrop-blur-md"
                    >
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#9a6a23]">Day {index + 1}</p>
                      <p className="mt-1 text-sm font-bold leading-tight text-stone-950">{point.title}</p>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-stone-600">{shortDesc(point.desc)}</p>
                    </div>
                  </foreignObject>
                )
              })()}
            </g>
          ))}

          <Compass x={W - 58} y={64} radius={30} />

          <g transform="translate(22,496)" filter="url(#sh2)">
            <rect width="210" height="62" rx="14" fill="#fffaf0" stroke="#d6cab3" strokeWidth="1" />
            <rect width="3.5" height="62" rx="1.75" fill="#d94b3d" />
            <text x="16" y="22" fill="#9a6a23" style={{ fontSize: 9, fontWeight: 800, fontFamily: 'system-ui', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              Total Route
            </text>
            <text x="16" y="47" fill="#1c1917" style={{ fontSize: 22, fontWeight: 900, fontFamily: 'system-ui' }}>
              ~{totalKm.toLocaleString()} km
            </text>
            <text x="133" y="47" fill="#78716c" style={{ fontSize: 12, fontWeight: 600, fontFamily: 'system-ui' }}>
              {driveTime(totalKm)}
            </text>
          </g>
        </svg>
      </div>

      {/* Mobile info card — shows below map when a pin is tapped */}
      <div
        className={`mt-3 sm:hidden transition-all duration-300 ${activePin !== null ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'}`}
      >
        {activePin !== null && stops[activePin] && (
          <div className="rounded-2xl border border-amber-200/60 bg-[#fffaf0] p-4 shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a6a23]">Day {activePin + 1}</p>
                <p className="mt-1 font-bold text-stone-900 leading-snug">{stops[activePin].title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{stops[activePin].desc}</p>
              </div>
              <button
                onClick={() => setActivePin(null)}
                className="shrink-0 mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-400 hover:bg-stone-200"
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
