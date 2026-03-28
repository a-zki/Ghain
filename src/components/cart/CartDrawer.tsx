'use client'

import { Drawer } from '@/components/ui/Drawer'
import { useUIStore } from '@/stores/uiStore'
import { useCartStore } from '@/stores/cartStore'
import { CartItem } from './CartItem'
import { CartSummary } from './CartSummary'
import { CartEmptyState } from './CartEmptyState'

export function CartDrawer() {
  const isOpen = useUIStore((s) => s.isCartOpen)
  const closeCart = useUIStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const totalItems = useCartStore((s) => s.totalItems())

  const title = `Your Bag (${totalItems})`

  return (
    <Drawer isOpen={isOpen} onClose={closeCart} side="right" title={title}>
      {items.length === 0 ? (
        <CartEmptyState />
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto -mx-4 px-4">
            {items.map((item) => (
              <CartItem key={item.variant.id} item={item} />
            ))}
          </div>
          <CartSummary />
        </div>
      )}
    </Drawer>
  )
}
