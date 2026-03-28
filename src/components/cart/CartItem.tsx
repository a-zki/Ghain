'use client'

import { X } from 'lucide-react'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { useCartStore } from '@/stores/cartStore'
import { formatCurrency } from '@/lib/utils/formatCurrency'
import type { CartItem as CartItemType } from '@/types/cart'

type CartItemProps = {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)

  const { product, variant, quantity } = item
  const lineTotal = product.price * quantity

  return (
    <div className="flex gap-4 py-4 border-b border-neutral-100">
      {/* Thumbnail */}
      <div className="w-20 aspect-[3/4] bg-neutral-100 shrink-0" />

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium truncate">{product.name}</h3>
          <button
            onClick={() => removeItem(variant.id)}
            className="p-0.5 text-neutral-400 hover:text-black transition-colors duration-200 shrink-0"
            aria-label={`Remove ${product.name}`}
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-neutral-500 mt-0.5">
          Size: {variant.size} / Color: {variant.color}
        </p>

        <div className="mt-auto pt-3 flex items-center gap-3">
          <QuantitySelector
            value={quantity}
            onChange={(newQty) => updateQuantity(variant.id, newQty)}
            min={1}
            max={variant.stock}
          />
          <span className="text-sm font-medium ml-auto">
            {formatCurrency(lineTotal, product.currency)}
          </span>
        </div>
      </div>
    </div>
  )
}
