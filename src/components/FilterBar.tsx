import type { DeckType, SortKey } from '../types'

interface Props {
  query: string
  setQuery: (q: string) => void
  typeFilter: DeckType | 'all'
  setTypeFilter: (t: DeckType | 'all') => void
  sort: SortKey
  setSort: (s: SortKey) => void
  counts: Record<DeckType | 'all', number>
}

const types: Array<DeckType | 'all'> = ['all', 'pdf', 'video', 'pptx']
const typeLabel: Record<DeckType | 'all', string> = {
  all: 'All',
  pdf: 'PDFs',
  video: 'Video',
  pptx: 'Slides',
}

export function FilterBar({
  query,
  setQuery,
  typeFilter,
  setTypeFilter,
  sort,
  setSort,
  counts,
}: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="search"
        placeholder="Search titles or students…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 sm:max-w-xs"
      />
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-md border border-zinc-300 bg-white p-0.5 dark:border-zinc-700 dark:bg-zinc-900">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition ${
                typeFilter === t
                  ? 'bg-purple-600 text-white'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              {typeLabel[t]} <span className="opacity-60">({counts[t]})</span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            <option value="title">Title (A–Z)</option>
            <option value="pages">Page count</option>
            <option value="size">File size</option>
          </select>
        </label>
      </div>
    </div>
  )
}
