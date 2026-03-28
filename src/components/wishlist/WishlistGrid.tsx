'use client'

import { Heart } from 'lucide-react'
import { useWishlistStore } from '@/stores/wishlistStore'
import { ProductGrid } from '@/components/product/ProductGrid'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Product } from '@/types/product'

type WishlistGridProps = {
  allProducts: Product[]
}

export function WishlistGrid({ allProducts }: WishlistGridProps) {
  const items = useWishlistStore((s) => s.items)

  const wishlistProductIds = new Set(items.map((item) => item.productId))
  const wishlistProducts = allProducts.filter((product) =>
    wishlistProductIds.has(product.id),
  )

  if (wishlistProducts.length === 0) {
    return (
      <EmptyState
        icon={<Heart size={48} strokeWidth={1} />}
        title="Your wishlist is empty"
        description="Save items you love to your wishlist and find them here later."
        action={{ label: 'Start Shopping', href: '/shop' }}
      />
    )
  }

  return <ProductGrid products={wishlistProducts} />
}
