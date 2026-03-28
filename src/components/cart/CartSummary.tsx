'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/stores/cartStore'
import { useUIStore } from '@/stores/uiStore'
import { formatCurrency } from '@/lib/utils/formatCurrency'

export function CartSummary() {
  const subtotal = useCartStore((s) => s.subtotal())
  const closeCart = useUIStore((s) => s.closeCart)

  return (
    <div className="border-t border-neutral-200 pt-4 mt-auto">
      {/* Subtotal */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-600">Subtotal</span>
        <span className="text-lg font-medium">{formatCurrency(subtotal)}</span>
      </div>

      <p className="text-xs text-neutral-500 mt-1">
        Shipping calculated at checkout
      </p>

      {/* Checkout button */}
      <Link href="/checkout" onClick={closeCart} className="block mt-4">
        <Button fullWidth>Proceed to Checkout</Button>
      </Link>

      {/* Continue shopping */}
      <button
        onClick={closeCart}
        className="w-full mt-3 text-center text-xs text-neutral-500 underline hover:text-black transition-colors duration-200"
      >
        Continue Shopping
      </button>
    </div>
  )
}
