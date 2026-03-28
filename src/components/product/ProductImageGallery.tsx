'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { Package } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { ProductImage } from '@/types/product'

type ProductImageGalleryProps = {
  images: ProductImage[]
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [isZooming, setIsZooming] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const sortedImages = [...images].sort((a, b) => a.position - b.position)
  const selectedImage = sortedImages[selectedIndex]

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setZoomPosition({ x, y })
    },
    [],
  )

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const scrollLeft = container.scrollLeft
    const itemWidth = container.offsetWidth
    const newIndex = Math.round(scrollLeft / itemWidth)
    setSelectedIndex(newIndex)
  }, [])

  if (sortedImages.length === 0) {
    return (
      <div className="aspect-[3/4] bg-neutral-200 flex items-center justify-center">
        <Package size={48} className="text-neutral-400" />
      </div>
    )
  }

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:flex gap-4">
        {/* Thumbnails strip */}
        <div className="flex flex-col gap-2 w-16 shrink-0">
          {sortedImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative w-16 aspect-[3/4] overflow-hidden bg-neutral-100 border-2 transition-colors duration-200',
                selectedIndex === index
                  ? 'border-black'
                  : 'border-transparent cursor-pointer hover:border-neutral-300',
              )}
            >
              {image.src ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-neutral-200" />
              )}
            </button>
          ))}
        </div>

        {/* Main image */}
        <div
          className="flex-1 aspect-[3/4] relative bg-neutral-100 overflow-hidden cursor-crosshair"
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
        >
          {selectedImage && selectedImage.src ? (
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              sizes="(max-width: 1024px) 60vw, 55vw"
              className={cn(
                'object-cover transition-transform duration-100',
                isZooming && 'scale-[2]',
              )}
              style={
                isZooming
                  ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                  : undefined
              }
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
              <Package size={48} className="text-neutral-400" />
            </div>
          )}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden">
        {/* Horizontal scroll carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        >
          {sortedImages.map((image, index) => (
            <div
              key={index}
              className="min-w-full snap-start aspect-[3/4] relative bg-neutral-100"
            >
              {image.src ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              ) : (
                <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
                  <Package size={48} className="text-neutral-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        {sortedImages.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {sortedImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedIndex(index)
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                      left: index * scrollRef.current.offsetWidth,
                      behavior: 'smooth',
                    })
                  }
                }}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors duration-200',
                  selectedIndex === index
                    ? 'bg-black'
                    : 'bg-neutral-300',
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
