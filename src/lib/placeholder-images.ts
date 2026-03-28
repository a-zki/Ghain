import type { ProductImage } from '@/types/product'

/**
 * Generate placeholder product images using picsum.photos.
 * Each product gets 4 unique images seeded by its slug so they stay consistent.
 */
export function getPlaceholderImages(
  slug: string,
  productName: string,
): ProductImage[] {
  return Array.from({ length: 4 }, (_, i) => ({
    src: `https://picsum.photos/seed/${slug}-${i}/800/1067`,
    alt: `${productName} image ${i + 1}`,
    position: i,
  }))
}
