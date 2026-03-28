'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product } from '@/types/product'

type NewArrivalsCarouselProps = {
  products: Product[]
}

export function NewArrivalsCarousel({ products }: NewArrivalsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scrollBy(direction: 'left' | 'right') {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.querySelector<HTMLElement>(':scope > div')?.offsetWidth ?? 300
    const gap = 16
    const scrollAmount = cardWidth + gap
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-24">
      {/* Header row */}
      <div className="flex items-end justify-between mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight">
          New Arrivals
        </h2>
        <Link
          href="/shop?sort=newest"
          className="text-xs uppercase tracking-widest hover:underline"
        >
          View All &rarr;
        </Link>
      </div>

      {/* Carousel wrapper */}
      <div className="relative">
        {/* Left arrow */}
        <button
          type="button"
          onClick={() => scrollBy('left')}
          className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white border border-neutral-200 shadow-sm hover:bg-neutral-50 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right arrow */}
        <button
          type="button"
          onClick={() => scrollBy('right')}
          className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white border border-neutral-200 shadow-sm hover:bg-neutral-50 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-snap-x-mandatory hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[260px] md:min-w-[300px] flex-shrink-0"
              style={{ scrollSnapAlign: 'start' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
