'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, User, Heart, ShoppingBag } from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'
import { useCartStore } from '@/stores/cartStore'
import { Badge } from '@/components/ui/Badge'

export function HeaderActions() {
  const openSearch = useUIStore((s) => s.openSearch)
  const openCart = useUIStore((s) => s.openCart)
  const totalItems = useCartStore((s) => s.totalItems())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const count = hydrated ? totalItems : 0

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={openSearch}
        className="p-2 text-black hover:bg-neutral-100 transition-colors duration-200"
        aria-label="Open search"
      >
        <Search size={20} />
      </button>

      <Link
        href="/account"
        className="p-2 text-black hover:bg-neutral-100 transition-colors duration-200"
        aria-label="Account"
      >
        <User size={20} />
      </Link>

      <Link
        href="/wishlist"
        className="hidden md:inline-flex p-2 text-black hover:bg-neutral-100 transition-colors duration-200"
        aria-label="Wishlist"
      >
        <Heart size={20} />
      </Link>

      <button
        onClick={openCart}
        className="relative p-2 text-black hover:bg-neutral-100 transition-colors duration-200"
        aria-label={`Open cart${count > 0 ? `, ${count} items` : ''}`}
      >
        <ShoppingBag size={20} />
        {count > 0 && (
          <Badge
            variant="cart-count"
            className="absolute -top-0.5 -right-0.5"
          >
            {count}
          </Badge>
        )}
      </button>
    </div>
  )
}
