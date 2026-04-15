import { useMemo, useState } from 'react'
import decksData from './data/decks.json'
import type { Deck, DeckType, SortKey } from './types'
import { DeckCard } from './components/DeckCard'
import { FilterBar } from './components/FilterBar'

const decks = decksData as Deck[]

function App() {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<DeckType | 'all'>('all')
  const [sort, setSort] = useState<SortKey>('title')

  const counts = useMemo(() => {
    const c = { all: decks.length, pdf: 0, video: 0, pptx: 0 } as Record<DeckType | 'all', number>
    for (const d of decks) c[d.type]++
    return c
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = decks.filter((d) => {
      if (typeFilter !== 'all' && d.type !== typeFilter) return false
      if (!q) return true
      const hay = [
        d.title,
        d.company ?? '',
        d.industry ?? '',
        d.tagline ?? '',
        ...d.students,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
    list = [...list].sort((a, b) => {
      if (sort === 'pages') return (b.pages ?? 0) - (a.pages ?? 0)
      if (sort === 'size') return b.sizeMB - a.sizeMB
      return (a.company ?? a.title).localeCompare(b.company ?? b.title)
    })
    return list
  }, [query, typeFilter, sort])

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            DES 396 · The Value of Design in Business
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Final Project Archive
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Pitch decks and final presentations from past cohorts. Use these as
            reference for your own final — look at how teams framed the problem,
            positioned the business, and structured their story.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <FilterBar
            query={query}
            setQuery={setQuery}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            sort={sort}
            setSort={setSort}
            counts={counts}
          />
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-zinc-500">
            No decks match that search.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {filtered.map((d) => (
              <li key={d.slug}>
                <DeckCard deck={d} />
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-4 text-center text-xs text-zinc-500 sm:px-6">
        {decks.length} projects archived · click any card to open the deck
      </footer>
    </div>
  )
}

export default App
