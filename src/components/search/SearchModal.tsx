'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'
import { getMockProducts } from '@/lib/mock/products'
import { formatCurrency } from '@/lib/utils/formatCurrency'

const suggestedTerms = ['Hoodie', 'Cargo', 'Tote', 'Sneaker', 'Beanie']

export function SearchModal() {
  const isOpen = useUIStore((s) => s.isSearchOpen)
  const closeSearch = useUIStore((s) => s.closeSearch)

  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Debounce input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim())
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    } else {
      setQuery('')
      setDebouncedQuery('')
    }
  }, [isOpen])

  // Escape key handler
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch()
    },
    [closeSearch],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscape])

  // Search results
  const allProducts = getMockProducts()
  const results = debouncedQuery
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
      )
    : []
  const displayedResults = results.slice(0, 6)

  const handleSuggestedClick = (term: string) => {
    setQuery(term)
    setDebouncedQuery(term)
  }

  const handleResultClick = () => {
    closeSearch()
  }

  if (!mounted || !isOpen) return null

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[59]"
        onClick={closeSearch}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed inset-x-0 top-0 z-[60] bg-white border-b border-neutral-200 py-6 md:py-8"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Search input row */}
          <div className="flex items-center gap-4">
            <Search size={20} className="text-neutral-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="text-xl md:text-2xl font-display font-light bg-transparent border-none focus:outline-none w-full placeholder:text-neutral-400"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('')
                  setDebouncedQuery('')
                  inputRef.current?.focus()
                }}
                className="p-1 text-neutral-500 hover:text-black transition-colors duration-200 shrink-0"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
            <button
              onClick={closeSearch}
              className="p-1 text-neutral-500 hover:text-black transition-colors duration-200 shrink-0"
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>

          {/* Results area */}
          <div className="mt-6">
            {debouncedQuery ? (
              results.length > 0 ? (
                <div>
                  <div className="space-y-1">
                    {displayedResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={handleResultClick}
                        className="flex items-center gap-4 py-3 px-2 -mx-2 hover:bg-neutral-50 transition-colors duration-200"
                      >
                        <div className="w-12 h-16 bg-neutral-100 shrink-0" />
                        <span className="text-sm font-medium">
                          {product.name}
                        </span>
                        <span className="text-sm text-neutral-500 ml-auto">
                          {formatCurrency(product.price, product.currency)}
                        </span>
                      </Link>
                    ))}
                  </div>
                  {results.length > 6 && (
                    <Link
                      href={`/search?q=${encodeURIComponent(debouncedQuery)}`}
                      onClick={handleResultClick}
                      className="block mt-4 text-sm font-medium underline hover:text-neutral-700 transition-colors duration-200"
                    >
                      View all {results.length} results
                    </Link>
                  )}
                </div>
              ) : (
                <p className="text-sm text-neutral-500">
                  No results found for &lsquo;{debouncedQuery}&rsquo;
                </p>
              )
            ) : (
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium mb-3">
                  Try searching for...
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTerms.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSuggestedClick(term)}
                      className="px-3 py-1.5 text-sm border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-colors duration-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body,
  )
}
