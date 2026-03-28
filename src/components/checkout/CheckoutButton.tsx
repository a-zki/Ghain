'use client'

import { useState } from 'react'
import { useCartStore } from '@/stores/cartStore'
import { useUIStore } from '@/stores/uiStore'
import { Button } from '@/components/ui/Button'

export function CheckoutButton() {
  const items = useCartStore((s) => s.items)
  const closeCart = useUIStore((s) => s.closeCart)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEmpty = items.length === 0

  async function handleCheckout() {
    if (isEmpty) return

    setIsLoading(true)
    setError(null)
    closeCart()

    try {
      const checkoutItems = items.map((item) => ({
        productId: item.product.id,
        variantId: item.variant.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        size: item.variant.size,
        color: item.variant.color,
        image: item.product.images[0]?.src,
      }))

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: checkoutItems }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err) {
      setIsLoading(false)
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <div>
      <Button
        fullWidth
        disabled={isEmpty}
        isLoading={isLoading}
        onClick={handleCheckout}
      >
        {isLoading ? 'Redirecting...' : 'Proceed to Checkout'}
      </Button>
      {error && (
        <p className="text-xs text-red-600 mt-2 text-center">{error}</p>
      )}
    </div>
  )
}
