import type { ProductImage } from '@/types/product'

/**
 * Curated placeholder images from Unsplash for each product category.
 * These are real fashion/clothing photos that match the B&W luxury aesthetic.
 * Replace with actual product photos when available.
 */

const clothingImages: string[][] = [
  // Essential Oversized Tee
  [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=1067&fit=crop',
  ],
  // Relaxed Cargo Pants
  [
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1067&fit=crop',
  ],
  // Heavyweight Hoodie
  [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1578768079470-9a1956093f1e?w=800&h=1067&fit=crop',
  ],
  // Minimal Track Jacket
  [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1067&fit=crop',
  ],
  // Structured Bomber Jacket
  [
    'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&h=1067&fit=crop',
  ],
  // Essential Sweatpants
  [
    'https://images.unsplash.com/photo-1580906853149-2b14cb4c813e?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1519722417352-7d6959729417?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&h=1067&fit=crop',
  ],
]

const footwearImages: string[][] = [
  // Court Low Sneaker
  [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=1067&fit=crop',
  ],
  // Chelsea Boot
  [
    'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&h=1067&fit=crop',
  ],
]

const accessoryImages: string[][] = [
  // Canvas Tote Bag
  [
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1067&fit=crop',
  ],
  // Leather Belt
  [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1585856331426-b4d2e0e2b3a4?w=800&h=1067&fit=crop',
  ],
  // Wool Beanie
  [
    'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1510598969022-c4c6c5d05769?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&h=1067&fit=crop',
  ],
  // Minimal Crossbody Bag
  [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&h=1067&fit=crop',
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=1067&fit=crop',
  ],
]

const slugToImages: Record<string, string[]> = {
  'essential-oversized-tee': clothingImages[0],
  'relaxed-cargo-pants': clothingImages[1],
  'heavyweight-hoodie': clothingImages[2],
  'minimal-track-jacket': clothingImages[3],
  'structured-bomber-jacket': clothingImages[4],
  'essential-sweatpants': clothingImages[5],
  'court-low-sneaker': footwearImages[0],
  'chelsea-boot': footwearImages[1],
  'canvas-tote-bag': accessoryImages[0],
  'leather-belt': accessoryImages[1],
  'wool-beanie': accessoryImages[2],
  'minimal-crossbody-bag': accessoryImages[3],
}

// Generic fallbacks by category
const genericFallbacks: string[] = [
  'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=1067&fit=crop',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1067&fit=crop',
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1067&fit=crop',
]

export function getPlaceholderImages(
  slug: string,
  productName: string,
): ProductImage[] {
  const images = slugToImages[slug] || genericFallbacks
  return images.map((src, i) => ({
    src,
    alt: `${productName} image ${i + 1}`,
    position: i,
  }))
}
