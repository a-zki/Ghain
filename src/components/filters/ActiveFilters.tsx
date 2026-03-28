'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { useCallback } from 'react'

type FilterChip = {
  key: string
  value: string
  label: string
}

export function ActiveFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const chips: FilterChip[] = []

  searchParams.getAll('category').forEach((v) => {
    chips.push({ key: 'category', value: v, label: `Category: ${v}` })
  })
  searchParams.getAll('size').forEach((v) => {
    chips.push({ key: 'size', value: v, label: `Size: ${v}` })
  })
  searchParams.getAll('color').forEach((v) => {
    chips.push({ key: 'color', value: v, label: `Color: ${v}` })
  })

  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  if (minPrice) {
    chips.push({ key: 'minPrice', value: minPrice, label: `Min: $${minPrice}` })
  }
  if (maxPrice) {
    chips.push({ key: 'maxPrice', value: maxPrice, label: `Max: $${maxPrice}` })
  }

  const removeFilter = useCallback(
    (chip: FilterChip) => {
      const params = new URLSearchParams(searchParams.toString())

      if (chip.key === 'minPrice' || chip.key === 'maxPrice') {
        params.delete(chip.key)
      } else {
        const current = params.getAll(chip.key)
        params.delete(chip.key)
        current
          .filter((v) => v !== chip.value)
          .forEach((v) => params.append(chip.key, v))
      }

      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname)
    },
    [router, pathname, searchParams],
  )

  const clearAll = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')
    params.delete('size')
    params.delete('color')
    params.delete('minPrice')
    params.delete('maxPrice')

    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }, [router, pathname, searchParams])

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.value}`}
          onClick={() => removeFilter(chip)}
          className="inline-flex items-center gap-1 h-7 px-2.5 text-xs bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200"
          aria-label={`Remove ${chip.label} filter`}
        >
          <span>{chip.label}</span>
          <X size={12} className="text-neutral-500" />
        </button>
      ))}
      <button
        onClick={clearAll}
        className="text-xs text-neutral-500 underline hover:text-black transition-colors duration-200 ml-1"
      >
        Clear All
      </button>
    </div>
  )
}
