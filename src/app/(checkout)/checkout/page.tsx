'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/stores/cartStore'
import { formatCurrency } from '@/lib/utils/formatCurrency'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotal())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated && items.length === 0) {
      router.replace('/shop')
    }
  }, [hydrated, items.length, router])

  if (!hydrated || items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  async function handleCheckout() {
    setIsLoading(true)
    setError(null)

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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Spinner size="lg" />
        <p className="text-sm text-neutral-500">
          Redirecting to secure checkout...
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-12 md:py-20">
      <h1 className="font-display text-2xl md:text-3xl font-bold tracking-wide uppercase">
        Order Summary
      </h1>

      {/* Item list */}
      <div className="mt-8 divide-y divide-neutral-100">
        {items.map((item) => (
          <div
            key={item.variant.id}
            className="flex items-start justify-between gap-4 py-4"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{item.product.name}</p>
              <p className="text-xs text-neutral-500 mt-0.5">
                Size: {item.variant.size} / Color: {item.variant.color}
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                Qty: {item.quantity}
              </p>
            </div>
            <p className="text-sm font-medium shrink-0">
              {formatCurrency(item.product.price * item.quantity, item.product.currency)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-neutral-200 mt-2 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Subtotal</span>
          <span className="text-lg font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <p className="text-xs text-neutral-500 mt-1">
          Shipping calculated at checkout
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* CTA */}
      <div className="mt-8">
        <Button fullWidth size="lg" onClick={handleCheckout}>
          Pay with Stripe
        </Button>
      </div>
    </div>
  )
}
