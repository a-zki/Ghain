'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
] as const

export function SortSelect() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentSort = searchParams.get('sort') || 'newest'

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const params = new URLSearchParams(searchParams.toString())
      const value = e.target.value

      if (value === 'newest') {
        params.delete('sort')
      } else {
        params.set('sort', value)
      }

      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname)
    },
    [router, pathname, searchParams],
  )

  return (
    <select
      value={currentSort}
      onChange={handleChange}
      className="h-10 appearance-none border border-neutral-200 bg-white px-3 pr-8 text-xs uppercase tracking-widest text-black focus:border-black focus:outline-none transition-colors duration-200 cursor-pointer"
      aria-label="Sort products"
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
