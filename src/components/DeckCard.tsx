import type { Deck } from '../types'

const typeLabel: Record<Deck['type'], string> = {
  pdf: 'PDF',
  video: 'Video',
  pptx: 'Slides',
}

const typeTint: Record<Deck['type'], string> = {
  pdf: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200',
  video: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
  pptx: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
}

function formatStudents(students: string[]): string {
  const firsts = students.map((s) => s.trim().split(/\s+/)[0])
  if (firsts.length === 0) return ''
  if (firsts.length === 1) return firsts[0]
  if (firsts.length === 2) return firsts.join(' & ')
  return firsts.slice(0, -1).join(', ') + ' & ' + firsts[firsts.length - 1]
}

export function DeckCard({ deck }: { deck: Deck }) {
  const heading = deck.company ?? deck.title
  const students = formatStudents(deck.students)
  return (
    <a
      href={deck.file}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {deck.thumb ? (
          <img
            src={deck.thumb}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover object-top transition group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl text-zinc-400">
            {deck.type === 'video' ? '▶' : '📊'}
          </div>
        )}
        <span
          className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs font-medium ${typeTint[deck.type]}`}
        >
          {typeLabel[deck.type]}
        </span>
        {false && deck.industry && (
          <span className="absolute right-2 top-2 rounded-full bg-zinc-900/75 px-2 py-0.5 text-xs font-medium text-white backdrop-blur">
            {deck.industry}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-base font-bold text-zinc-900 dark:text-zinc-50">
          {heading}
        </h3>
        {students && (
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{students}</p>
        )}
        <p className="mt-auto pt-2 text-xs text-zinc-500 dark:text-zinc-500">
          {deck.pages ? `${deck.pages} pages · ` : ''}
          {deck.sizeMB} MB
        </p>
      </div>
    </a>
  )
}
