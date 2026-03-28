import type { Product } from '@/types/product'
import { siteConfig } from '@/lib/constants/siteConfig'

type ProductJsonLdProps = {
  product: Product
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0)
  const availability =
    totalStock > 0
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription || product.description,
    image: product.images.map((img) => img.src).filter(Boolean),
    sku: product.variants[0]?.sku ?? product.id,
    brand: {
      '@type': 'Brand',
      name: 'Ghain',
    },
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: product.currency,
      availability,
      url: `${siteConfig.url}/product/${product.slug}`,
      seller: {
        '@type': 'Organization',
        name: 'Ghain',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
