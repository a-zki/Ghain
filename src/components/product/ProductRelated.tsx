import { ProductCard } from './ProductCard'
import type { Product } from '@/types/product'

type ProductRelatedProps = {
  products: Product[]
}

export function ProductRelated({ products }: ProductRelatedProps) {
  if (products.length === 0) return null

  return (
    <section>
      <h2 className="font-display text-2xl font-light tracking-tight mb-8">
        You May Also Like
      </h2>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden flex overflow-x-auto hide-scrollbar gap-4">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="min-w-[260px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}
