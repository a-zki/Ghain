'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ProductVariantSelector } from '@/components/product/ProductVariantSelector'
import { ProductDetails } from '@/components/product/ProductDetails'
import { formatCurrency } from '@/lib/utils/formatCurrency'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { cn } from '@/lib/utils/cn'
import type { Product } from '@/types/product'

type ProductInfoProps = {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const addToCart = useCartStore((s) => s.addItem)
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id))
  const addToWishlist = useWishlistStore((s) => s.addItem)
  const removeFromWishlist = useWishlistStore((s) => s.removeItem)

  const defaultColor = product.variants[0]?.color ?? ''
  const [selectedColor, setSelectedColor] = useState(defaultColor)
  const [selectedSize, setSelectedSize] = useState('')
  const [addedFeedback, setAddedFeedback] = useState(false)

  const selectedVariant = useMemo(() => {
    if (!selectedColor || !selectedSize) return null
    return (
      product.variants.find(
        (v) => v.color === selectedColor && v.size === selectedSize,
      ) ?? null
    )
  }, [product.variants, selectedColor, selectedSize])

  const hasSale = product.compareAtPrice !== null

  const handleAddToCart = useCallback(() => {
    if (!selectedVariant) return
    addToCart(product, selectedVariant, 1)
    setAddedFeedback(true)
  }, [addToCart, product, selectedVariant])

  useEffect(() => {
    if (!addedFeedback) return
    const timer = setTimeout(() => setAddedFeedback(false), 2000)
    return () => clearTimeout(timer)
  }, [addedFeedback])

  function handleWishlistToggle() {
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id, product.slug)
    }
  }

  function handleColorChange(color: string) {
    setSelectedColor(color)
    // Reset size if the current size is out of stock for the new color
    if (selectedSize) {
      const variant = product.variants.find(
        (v) => v.color === color && v.size === selectedSize,
      )
      if (!variant || variant.stock === 0) {
        setSelectedSize('')
      }
    }
  }

  function getButtonLabel(): string {
    if (addedFeedback) return 'Added \u2713'
    if (!selectedSize) return 'Select a Size'
    if (selectedVariant && selectedVariant.stock === 0) return 'Out of Stock'
    return 'Add to Bag'
  }

  const isButtonDisabled =
    !selectedSize ||
    addedFeedback ||
    (selectedVariant !== null && selectedVariant.stock === 0)

  return (
    <div>
      {/* Product name */}
      <h1 className="font-display text-2xl md:text-3xl font-light tracking-tight">
        {product.name}
      </h1>

      {/* Price */}
      <div className="mt-3 flex items-center gap-3">
        <span className="text-lg font-medium">
          {formatCurrency(product.price, product.currency)}
        </span>
        {hasSale && product.compareAtPrice && (
          <span className="text-sm text-neutral-400 line-through">
            {formatCurrency(product.compareAtPrice, product.currency)}
          </span>
        )}
      </div>

      {/* Short description */}
      {product.shortDescription && (
        <p className="text-neutral-600 text-sm mt-3">
          {product.shortDescription}
        </p>
      )}

      {/* Variant selector */}
      <div className="mt-6">
        <ProductVariantSelector
          variants={product.variants}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          onColorChange={handleColorChange}
          onSizeChange={setSelectedSize}
        />
      </div>

      {/* Add to Cart */}
      <div className="mt-8">
        <Button
          fullWidth
          size="lg"
          onClick={handleAddToCart}
          disabled={isButtonDisabled}
          className="h-14"
        >
          {getButtonLabel()}
        </Button>
      </div>

      {/* Wishlist link */}
      <div className="mt-3 flex justify-center">
        <button
          onClick={handleWishlistToggle}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black transition-colors duration-200"
        >
          <Heart
            size={14}
            className={cn(
              'transition-colors duration-200',
              isInWishlist ? 'fill-black text-black' : 'fill-none',
            )}
          />
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
      </div>

      {/* Product details accordion */}
      <div className="mt-8 border-t border-neutral-200 pt-2">
        <ProductDetails details={product.details} />
      </div>
    </div>
  )
}
