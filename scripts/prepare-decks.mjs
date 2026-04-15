#!/usr/bin/env node
// Compresses source decks into public/decks, renders PDF page-1 thumbs into
// public/thumbs, and writes src/data/decks.json.
//
// Idempotent: skips outputs that already exist and are newer than the source.
// Requires system binaries: gs (Ghostscript), ffmpeg.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync, copyFileSync } from 'node:fs'
import { basename, dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const SRC_DIR = process.env.DECKS_SRC || join(homedir(), 'Documents/Projects/des396-final-projects')
const OUT_DECKS = join(repoRoot, 'public/decks')
const OUT_THUMBS = join(repoRoot, 'public/thumbs')
const MANIFEST = join(repoRoot, 'src/data/decks.json')

const MAX_OK_MB = 50

// Source files to skip (superseded by a newer/cleaner version in the same dir).
const SKIP = new Set([
  'a2_0422 Fumiko Kokura business.pdf',
  'a1_highfieldsabrina_4658434_84523076_Final_ThriveClinic.pptx',
])

// Rich metadata overrides keyed by source filename. Sourced from Gemini
// vision extraction on the page-1 thumbnails (and filename heuristics for
// the two that have no thumbnail). Fields merge into the manifest entry;
// anything unset falls back to filename-parsed defaults.
//
// Shape: { company, students[], industry, tagline, title?, needsReview? }
const META_OVERRIDES = {
  'a3_limnatalie_LATE_4227445_84633104_AfterWords Pitch Deck Presentation.pdf': {
    company: 'AfterWords',
    students: ['Mariam Ahmed', 'Natalie Lim'],
    tagline: 'Understand More. Worry Less.',
  },
  'mallickshariq_4183661_66447655_Business Design Pitch.pdf': {
    company: 'Beyond Health',
    students: ['Shariq Mallick'],
    industry: 'preventative healthcare',
    tagline: 'Keeping people from becoming patients',
  },
  'Business Final Pitch Deck - Ayesha & Iya.pdf': {
    company: 'GoodDays Clinics',
    students: ['Iya Abdulkarim', 'Ayesha Rahman'],
    industry: 'healthcare clinics',
  },
  'c1_agathavalencia_LATE_4687305_84604763_Business Pitch.pdf': {
    company: 'Globowl',
    students: ['Agatha Valencia'],
    industry: 'food',
    tagline: 'Lunches of the future',
  },
  'CAP Consulting.pdf': {
    company: 'CAP Consulting',
    students: ['Claire Moreau'],
    industry: 'student athlete consulting',
    tagline: 'A cap that is tailor-made for you',
  },
  'c2_echevarrialopezmiriam_LATE_4685006_84632900_CAPTA.pdf': {
    company: 'CAPTA',
    students: ['Miriam Echevarria Lopez'],
    industry: 'assistive tech',
    tagline: 'Turning Challenges into Opportunities',
  },
  'c3_schergerleslie_LATE_4099866_84634069_Docent_Scherger_Morris.pdf': {
    company: 'Docent',
    students: ['Leia Morris', 'Leslie Scherger'],
  },
  'flashclub.pdf': {
    company: 'flashclub',
    students: ['Whitney Arostegui'],
    industry: 'menopause support',
    tagline: 'An online support platform for anyone experiencing menopause',
  },
  'fumi-final-project.pdf': {
    title: 'Fumiko Kokura — Final Project',
    students: ['Fumiko Kokura'],
    industry: 'elderly care',
  },
  'wardheidi_LATE_4478406_66470679_Healthd8 - Heidi & Krezia.pdf': {
    company: 'Healthd8',
    students: ['Krezia Savella', 'Heidi Ward'],
  },
  'b2_trangserena_LATE_4683107_84600456_Hear For You Presentation - Business of Design.pdf': {
    company: 'Hear For You',
    students: ['Serena Trang', 'Mili Dhru'],
    industry: 'hearing health',
  },
  'Hearing Health Clinic.pdf': {
    company: 'HereHear',
    students: ['Evan Stack', 'Sanjana Nagaraja'],
    industry: 'hearing health',
  },
  'Kinards_WellnessWorks_Business Final.pdf': {
    company: 'WellnessWorks',
    students: ['Samantha Kinard'],
    industry: 'teacher wellness',
    tagline: 'Prioritizing the Mental Health of Middle School Teachers',
  },
  'MyPO-jewel.pdf': {
    company: 'MyPO',
    students: ['Jewel Thompson-Adiuku'],
    industry: 'healthcare',
    tagline: 'Ontario Patient Portal',
  },
  'North Star.pdf': {
    company: 'North Star',
    students: ['Sandra Bradley', 'Mara Fock'],
    industry: 'wayfinding',
    tagline: 'A wayfinding tool for everyone',
  },
  'b1_riverarodger_LATE_4344779_84625108_Pink and Black Gradient Technology Keynote Presentation.pdf': {
    company: 'AidNow',
    students: ['Rodger Rivera'],
    industry: 'emergency response',
    tagline: 'Your first response when it matters most',
  },
  'a1_highfieldsabrina_4658434_84523076_Final_ThriveClinic.pdf': {
    company: 'ThriveClinic',
    students: ['Sabrina Highfield'],
  },
  // No thumbnail — filename-inferred, flagged for review.
  'tejedamarinmirna_LATE_4506135_66453641_Konotori.mp4': {
    company: 'Konotori',
    students: ['Mirna Tejeda Marin'],
    needsReview: true,
  },
}
const GS_EBOOK = ['-dPDFSETTINGS=/ebook']
const GS_SCREEN = ['-dPDFSETTINGS=/screen']

mkdirSync(OUT_DECKS, { recursive: true })
mkdirSync(OUT_THUMBS, { recursive: true })
mkdirSync(dirname(MANIFEST), { recursive: true })

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)

// Heuristic filename parse. Canvas exports look like:
//   a1_highfieldsabrina_4658434_84523076_Final_ThriveClinic.pptx
//   c3_schergerleslie_LATE_4099866_84634069_Docent_Scherger_Morris.pdf
// Clean names look like:
//   "Business Final Pitch Deck - Ayesha & Iya.pdf"
//   "North Star.pdf"
function parseName(filename) {
  const raw = filename.replace(/\.[^.]+$/, '')
  const parts = raw.split('_')
  const hasCanvasIds = parts.some((p) => /^\d{6,}$/.test(p))
  if (!hasCanvasIds) {
    // Clean name. Try to split "Title - Authors".
    const m = raw.match(/^(.*?)\s+-\s+(.+)$/)
    if (m) return { title: m[1].trim(), students: m[2].trim() }
    return { title: raw.trim(), students: '' }
  }
  // Canvas style: drop prefix section code + student slug + numeric IDs + LATE.
  let studentSlug = ''
  const titleParts = []
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i]
    if (i === 0 && /^[a-c]\d$/i.test(p)) continue
    if (/^\d{4,}$/.test(p)) continue
    if (p === 'LATE') continue
    if (i <= 2 && /^[a-z]{4,}$/i.test(p) && !studentSlug) {
      studentSlug = p
      continue
    }
    titleParts.push(p)
  }
  const title = titleParts.join(' ').replace(/\s+/g, ' ').trim() || raw
  const students = studentSlug ? humanizeStudentSlug(studentSlug) : ''
  return { title, students }
}

function humanizeStudentSlug(slug) {
  // "highfieldsabrina" -> best-effort: capitalize first letter only; we don't
  // have a reliable split. Leave as a single capitalized token.
  return slug.charAt(0).toUpperCase() + slug.slice(1)
}

function isStale(src, out) {
  if (!existsSync(out)) return true
  return statSync(src).mtimeMs > statSync(out).mtimeMs
}

function compressPdf(src, out) {
  const attempt = (flags) =>
    execFileSync(
      'gs',
      [
        '-sDEVICE=pdfwrite',
        '-dCompatibilityLevel=1.4',
        ...flags,
        '-dNOPAUSE',
        '-dQUIET',
        '-dBATCH',
        `-sOutputFile=${out}`,
        src,
      ],
      { stdio: 'inherit' },
    )
  attempt(GS_EBOOK)
  const sizeMb = statSync(out).size / 1024 / 1024
  if (sizeMb > MAX_OK_MB) {
    console.warn(`  still ${sizeMb.toFixed(1)}MB after /ebook — retrying /screen`)
    attempt(GS_SCREEN)
  }
}

function renderThumb(src, out) {
  // gs renders page 1 at ~100 dpi scaled down to 600px wide-ish.
  execFileSync(
    'gs',
    [
      '-sDEVICE=jpeg',
      '-dJPEGQ=80',
      '-r100',
      '-dFirstPage=1',
      '-dLastPage=1',
      '-dNOPAUSE',
      '-dQUIET',
      '-dBATCH',
      `-sOutputFile=${out}`,
      src,
    ],
    { stdio: 'inherit' },
  )
}

function pdfPageCount(src) {
  // Lightweight: scan raw PDF bytes for "/Type /Page" tokens (not /Pages).
  try {
    const buf = readFileSync(src)
    const text = buf.toString('latin1')
    const matches = text.match(/\/Type\s*\/Page[^s]/g)
    return matches ? matches.length : null
  } catch {
    return null
  }
}

function compressMp4(src, out) {
  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-i', src,
      '-vf', 'scale=-2:720',
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '28',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-movflags', '+faststart',
      out,
    ],
    { stdio: 'inherit' },
  )
}

const sources = readdirSync(SRC_DIR)
  .filter((f) => !f.startsWith('.'))
  .sort()

const manifest = []
const usedSlugs = new Set()

for (const name of sources) {
  if (SKIP.has(name)) {
    console.log(`\n• ${name}\n    (skipped — superseded)`)
    continue
  }
  const src = join(SRC_DIR, name)
  const ext = extname(name).toLowerCase()
  const parsed = parseName(name)
  const override = META_OVERRIDES[name] || {}
  const title = override.title ?? parsed.title
  // parsed.students is a filename-derived fallback string (single token).
  // Prefer override array; otherwise wrap parsed into an array if non-empty.
  const students = Array.isArray(override.students)
    ? override.students
    : parsed.students
      ? [parsed.students]
      : []
  const company = override.company ?? null
  const industry = override.industry ?? null
  const tagline = override.tagline ?? null
  const needsReview = override.needsReview ?? false
  let baseSlug = slugify(title) || slugify(name)
  let slug = baseSlug
  let i = 2
  while (usedSlugs.has(slug)) slug = `${baseSlug}-${i++}`
  usedSlugs.add(slug)

  console.log(`\n• ${name}\n    -> ${slug} (${title}${students ? ` — ${students}` : ''})`)

  let outName, type
  if (ext === '.pdf') {
    outName = `${slug}.pdf`
    type = 'pdf'
  } else if (ext === '.mp4') {
    outName = `${slug}.mp4`
    type = 'video'
  } else if (ext === '.pptx') {
    outName = `${slug}.pptx`
    type = 'pptx'
  } else {
    console.warn(`  skipping unsupported type: ${ext}`)
    continue
  }
  const outPath = join(OUT_DECKS, outName)

  if (isStale(src, outPath)) {
    if (type === 'pdf') compressPdf(src, outPath)
    else if (type === 'video') compressMp4(src, outPath)
    else copyFileSync(src, outPath)
  } else {
    console.log('    (output up to date)')
  }

  const outSizeMb = statSync(outPath).size / 1024 / 1024
  const srcSizeMb = statSync(src).size / 1024 / 1024

  let thumb = null
  let pages = null
  if (type === 'pdf') {
    const thumbPath = join(OUT_THUMBS, `${slug}.jpg`)
    if (isStale(outPath, thumbPath)) renderThumb(outPath, thumbPath)
    thumb = `/thumbs/${slug}.jpg`
    pages = pdfPageCount(outPath)
  }

  manifest.push({
    slug,
    title,
    company,
    students,
    industry,
    tagline,
    type,
    file: `/decks/${outName}`,
    thumb,
    pages,
    sizeMB: Math.round(outSizeMb * 10) / 10,
    sourceSizeMB: Math.round(srcSizeMb * 10) / 10,
    sourceFilename: name,
    needsReview,
  })

  console.log(`    ${srcSizeMb.toFixed(1)}MB -> ${outSizeMb.toFixed(1)}MB${pages ? ` (${pages}p)` : ''}`)
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`\n✓ Wrote ${manifest.length} entries to ${MANIFEST}`)

const totalMb = manifest.reduce((s, d) => s + d.sizeMB, 0)
console.log(`✓ Total compressed: ${totalMb.toFixed(1)}MB`)
const oversize = manifest.filter((d) => d.sizeMB > MAX_OK_MB)
if (oversize.length) {
  console.warn(`\n⚠ ${oversize.length} file(s) still over ${MAX_OK_MB}MB:`)
  for (const d of oversize) console.warn(`    ${d.file} — ${d.sizeMB}MB`)
}
