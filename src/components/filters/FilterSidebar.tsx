'use client'

import { useCallback, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Drawer } from '@/components/ui/Drawer'
import { FilterGroup } from './FilterGroup'
import type { Category } from '@/types/product'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const

const colors = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Navy', hex: '#0A1128' },
  { name: 'Beige', hex: '#C8AD7F' },
] as const

type FilterSidebarProps = {
  categories: Category[]
}

function useFilterUpdate() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const toggleParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      const current = params.getAll(key)

      if (current.includes(value)) {
        params.delete(key)
        current
          .filter((v) => v !== value)
          .forEach((v) => params.append(key, v))
      } else {
        params.append(key, value)
      }

      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname)
    },
    [router, pathname, searchParams],
  )

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }

      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname)
    },
    [router, pathname, searchParams],
  )

  return { searchParams, toggleParam, setParam }
}

function FilterContent({ categories }: FilterSidebarProps) {
  const { searchParams, toggleParam, setParam } = useFilterUpdate()

  const activeCategories = searchParams.getAll('category')
  const activeSizes = searchParams.getAll('size')
  const activeColors = searchParams.getAll('color')
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''

  const [localMin, setLocalMin] = useState(minPrice)
  const [localMax, setLocalMax] = useState(maxPrice)

  const handlePriceBlur = useCallback(
    (key: 'minPrice' | 'maxPrice', value: string) => {
      const sanitized = value.replace(/[^0-9]/g, '')
      setParam(key, sanitized)
    },
    [setParam],
  )

  return (
    <div>
      {/* Category filter */}
      <FilterGroup title="Category">
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 cursor-pointer group/label"
            >
              <input
                type="checkbox"
                checked={activeCategories.includes(cat.slug)}
                onChange={() => toggleParam('category', cat.slug)}
                className="sr-only peer"
              />
              <span
                className={cn(
                  'h-4 w-4 border border-neutral-300 flex items-center justify-center transition-colors duration-200',
                  'peer-checked:bg-black peer-checked:border-black',
                  'peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-focus-visible:ring-offset-2',
                )}
              >
                <svg
                  className="h-2.5 w-2.5 text-white opacity-0 peer-checked:opacity-100"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 6l3 3 5-5" />
                </svg>
              </span>
              <span className="text-sm text-neutral-700 group-hover/label:text-black transition-colors duration-200">
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Size filter */}
      <FilterGroup title="Size">
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => {
            const isActive = activeSizes.includes(size)
            return (
              <button
                key={size}
                onClick={() => toggleParam('size', size)}
                className={cn(
                  'h-9 text-xs uppercase tracking-widest border transition-colors duration-200',
                  isActive
                    ? 'border-black bg-black text-white'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-black',
                )}
              >
                {size}
              </button>
            )
          })}
        </div>
      </FilterGroup>

      {/* Color filter */}
      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const isActive = activeColors.includes(color.name)
            return (
              <button
                key={color.name}
                onClick={() => toggleParam('color', color.name)}
                className={cn(
                  'h-8 w-8 rounded-full border-2 transition-all duration-200 relative',
                  isActive ? 'border-black scale-110' : 'border-transparent hover:scale-105',
                )}
                style={{ backgroundColor: color.hex }}
                aria-label={`${isActive ? 'Remove' : 'Add'} ${color.name} filter`}
                title={color.name}
              >
                {color.hex === '#FFFFFF' && (
                  <span className="absolute inset-0 rounded-full border border-neutral-200" />
                )}
              </button>
            )
          })}
        </div>
      </FilterGroup>

      {/* Price filter */}
      <FilterGroup title="Price">
        <div className="flex items-center gap-2">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Min"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            onBlur={() => handlePriceBlur('minPrice', localMin)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handlePriceBlur('minPrice', localMin)
            }}
            className="h-9 w-full border border-neutral-200 px-3 text-sm focus:border-black focus:outline-none transition-colors duration-200"
            aria-label="Minimum price"
          />
          <span className="text-neutral-400 text-xs shrink-0">&ndash;</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Max"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            onBlur={() => handlePriceBlur('maxPrice', localMax)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handlePriceBlur('maxPrice', localMax)
            }}
            className="h-9 w-full border border-neutral-200 px-3 text-sm focus:border-black focus:outline-none transition-colors duration-200"
            aria-label="Maximum price"
          />
        </div>
      </FilterGroup>
    </div>
  )
}

export function FilterSidebar({ categories }: FilterSidebarProps) {
  return (
    <aside className="hidden md:block w-64 shrink-0">
      <FilterContent categories={categories} />
    </aside>
  )
}

export function MobileFilterButton({ categories }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center gap-1.5 h-10 px-3 border border-neutral-200 text-xs uppercase tracking-widest hover:border-black transition-colors duration-200"
        aria-label="Open filters"
      >
        <SlidersHorizontal size={14} />
        <span>Filters</span>
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        side="left"
        title="Filters"
      >
        <FilterContent categories={categories} />
      </Drawer>
    </>
  )
}
