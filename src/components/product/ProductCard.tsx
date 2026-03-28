'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils/cn'
import { formatCurrency } from '@/lib/utils/formatCurrency'
import { useWishlistStore } from '@/stores/wishlistStore'
import type { Product } from '@/types/product'

type ProductCardProps = {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id))
  const addItem = useWishlistStore((s) => s.addItem)
  const removeItem = useWishlistStore((s) => s.removeItem)

  const primaryImage = product.images[0]
  const secondaryImage = product.images[1]
  const hasSale = product.compareAtPrice !== null

  function handleWishlistToggle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (isInWishlist) {
      removeItem(product.id)
    } else {
      addItem(product.id, product.slug)
    }
  }

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      {/* Image container */}
      <div className="aspect-[3/4] relative overflow-hidden bg-neutral-100">
        {primaryImage && primaryImage.src ? (
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-200" />
        )}

        {/* Hover second image */}
        {secondaryImage && secondaryImage.src && (
          <Image
            src={secondaryImage.src}
            alt={secondaryImage.alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          />
        )}

        {/* Badges */}
        {product.isNew && (
          <Badge className="absolute top-3 left-3">New</Badge>
        )}
        {!product.isNew && hasSale && (
          <Badge className="absolute top-3 left-3">Sale</Badge>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className={cn(
            'absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm',
            'transition-colors duration-200 hover:bg-white',
          )}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            className={cn(
              'transition-colors duration-200',
              isInWishlist
                ? 'fill-black text-black'
                : 'fill-none text-neutral-600',
            )}
          />
        </button>
      </div>

      {/* Product info */}
      <div>
        <h3 className="text-sm font-medium mt-3 truncate">{product.name}</h3>
        <p className="text-xs text-neutral-500 mt-0.5">{product.categoryName}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-medium">
            {formatCurrency(product.price, product.currency)}
          </span>
          {hasSale && product.compareAtPrice && (
            <span className="text-xs text-neutral-400 line-through">
              {formatCurrency(product.compareAtPrice, product.currency)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
