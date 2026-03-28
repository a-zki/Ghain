export type SortOption =
  | 'newest'
  | 'oldest'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'

export type PriceRange = {
  min: number
  max: number
}

export type FilterState = {
  categories: string[]
  sizes: string[]
  colors: string[]
  priceRange: PriceRange | null
  sort: SortOption
}
