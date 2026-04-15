export type DeckType = 'pdf' | 'video' | 'pptx'

export interface Deck {
  slug: string
  title: string
  company: string | null
  students: string[]
  industry: string | null
  tagline: string | null
  type: DeckType
  file: string
  thumb: string | null
  pages: number | null
  sizeMB: number
  sourceSizeMB: number
  sourceFilename: string
  needsReview: boolean
}

export type SortKey = 'title' | 'pages' | 'size'
