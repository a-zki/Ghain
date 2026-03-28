'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { SizeGuideModal } from '@/components/shared/SizeGuideModal'
import type { ProductVariant } from '@/types/product'

type ProductVariantSelectorProps = {
  variants: ProductVariant[]
  selectedColor: string
  selectedSize: string
  onColorChange: (color: string) => void
  onSizeChange: (size: string) => void
}

export function ProductVariantSelector({
  variants,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}: ProductVariantSelectorProps) {
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  const uniqueColors = useMemo(() => {
    const seen = new Map<string, string>()
    for (const v of variants) {
      if (!seen.has(v.color)) {
        seen.set(v.color, v.colorHex)
      }
    }
    return Array.from(seen.entries()).map(([name, hex]) => ({ name, hex }))
  }, [variants])

  const uniqueSizes = useMemo(() => {
    const seen = new Set<string>()
    const sizes: string[] = []
    for (const v of variants) {
      if (!seen.has(v.size)) {
        seen.add(v.size)
        sizes.push(v.size)
      }
    }
    return sizes
  }, [variants])

  function getStockForColorSize(color: string, size: string): number {
    const variant = variants.find(
      (v) => v.color === color && v.size === size,
    )
    return variant ? variant.stock : 0
  }

  return (
    <div className="space-y-6">
      {/* Color selector */}
      <div>
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
          Color — {selectedColor}
        </p>
        <div className="flex items-center gap-3">
          {uniqueColors.map((color) => (
            <button
              key={color.name}
              onClick={() => onColorChange(color.name)}
              className={cn(
                'w-8 h-8 rounded-full border-2 transition-all duration-200',
                selectedColor === color.name
                  ? 'ring-2 ring-offset-2 ring-black border-black'
                  : 'border-neutral-300 hover:border-neutral-500',
              )}
              style={{ backgroundColor: color.hex }}
              aria-label={`Color: ${color.name}`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-widest text-neutral-500">
            Size
          </p>
          <button
            onClick={() => setSizeGuideOpen(true)}
            className="text-xs uppercase tracking-widest text-neutral-500 underline hover:text-black transition-colors duration-200"
          >
            Size Guide
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {uniqueSizes.map((size) => {
            const stock = getStockForColorSize(selectedColor, size)
            const isOutOfStock = stock === 0
            const isSelected = selectedSize === size

            return (
              <button
                key={size}
                onClick={() => {
                  if (!isOutOfStock) onSizeChange(size)
                }}
                disabled={isOutOfStock}
                className={cn(
                  'min-w-[48px] h-12 px-3 border text-xs uppercase tracking-widest transition-all duration-200',
                  isSelected &&
                    'bg-black text-white border-black',
                  !isSelected &&
                    !isOutOfStock &&
                    'bg-white text-black border-neutral-300 hover:border-black',
                  isOutOfStock &&
                    'text-neutral-300 border-neutral-200 line-through cursor-not-allowed',
                )}
                aria-label={
                  isOutOfStock
                    ? `Size ${size} - Out of stock`
                    : `Size ${size}`
                }
              >
                {size}
              </button>
            )
          })}
        </div>
      </div>

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  )
}
