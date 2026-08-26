/**
 * Optimize the car-slider photos.
 *
 * The CarCard slider renders these inside a 112px-tall box (`h-28`), so shipping
 * multi-megabyte originals was pure waste — /plan/:country was pulling ~7 MB of
 * images on load. This resizes them to 640px wide WebP, which is still ~3x the
 * largest size they are ever displayed at, even on a 2x-DPR phone.
 *
 * Run from frontend/:  node scripts/optimize-car-images.mjs
 * Re-run any time you drop new car photos into public/images/cars/.
 */
import sharp from 'sharp'
import { readdir, stat, unlink } from 'node:fs/promises'
import path from 'node:path'

const CARS_DIR = path.resolve('public/images/cars')
const MAX_WIDTH = 640
const QUALITY = 80

// Only the slider photos — the standalone `sedan.webp`-style hero shots are
// already optimized and are referenced elsewhere.
const SLIDER = /-(ext|int|rear|dash)\.jpe?g$/i

const kb = (n) => (n / 1024).toFixed(1).padStart(8) + ' KB'

const files = (await readdir(CARS_DIR)).filter((f) => SLIDER.test(f)).sort()
if (!files.length) {
  console.log('No car slider images found — nothing to do.')
  process.exit(0)
}

let before = 0
let after = 0

for (const file of files) {
  const src = path.join(CARS_DIR, file)
  const out = src.replace(/\.jpe?g$/i, '.webp')

  const srcSize = (await stat(src)).size
  await sharp(src)
    .rotate() // honour EXIF orientation before we strip metadata
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out)
  const outSize = (await stat(out)).size

  before += srcSize
  after += outSize
  const saved = ((1 - outSize / srcSize) * 100).toFixed(0)
  console.log(`${kb(srcSize)} -> ${kb(outSize)}  (-${saved.padStart(2)}%)  ${file}`)

  await unlink(src) // originals stay recoverable in git history
}

console.log(
  `\nTotal: ${kb(before)} -> ${kb(after)}  ` +
    `(-${((1 - after / before) * 100).toFixed(1)}%, saved ${((before - after) / 1048576).toFixed(2)} MB)`
)
