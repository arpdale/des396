export type DeckType = 'pdf' | 'video' | 'pptx'

export interface Deck {
  slug: string
  title: string
  students: string
  type: DeckType
  file: string
  thumb: string | null
  pages: number | null
  sizeMB: number
  sourceSizeMB: number
  sourceFilename: string
}

export type SortKey = 'title' | 'pages' | 'size'
