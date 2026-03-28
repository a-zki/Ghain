import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ProductGrid } from '@/components/product/ProductGrid'
import { FilterSidebar, MobileFilterButton } from '@/components/filters/FilterSidebar'
import { ActiveFilters } from '@/components/filters/ActiveFilters'
import { SortSelect } from '@/components/filters/SortSelect'
import { getProducts, getCategories } from '@/actions/products'
import type { FilterState, SortOption } from '@/types/filters'

export const metadata: Metadata = {
  title: 'Shop All',
}

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams

  const filters: Partial<FilterState> = {
    categories: toArray(params.category),
    sizes: toArray(params.size),
    colors: toArray(params.color),
    sort: (typeof params.sort === 'string' ? params.sort : 'newest') as SortOption,
  }

  const minPrice = typeof params.minPrice === 'string' ? Number(params.minPrice) : NaN
  const maxPrice = typeof params.maxPrice === 'string' ? Number(params.maxPrice) : NaN
  if (!isNaN(minPrice) || !isNaN(maxPrice)) {
    filters.priceRange = {
      min: isNaN(minPrice) ? 0 : minPrice,
      max: isNaN(maxPrice) ? 999999 : maxPrice,
    }
  }

  const [products, categories] = await Promise.all([
    getProducts(filters),
    getCategories(),
  ])

  return (
    <PageContainer className="py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shop' },
        ]}
      />

      {/* Title row */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            All Products
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Suspense fallback={null}>
            <MobileFilterButton categories={categories} />
          </Suspense>
          <Suspense fallback={null}>
            <SortSelect />
          </Suspense>
        </div>
      </div>

      {/* Active filters */}
      <div className="mt-4">
        <Suspense fallback={null}>
          <ActiveFilters />
        </Suspense>
      </div>

      {/* Main content */}
      <div className="mt-8 flex gap-8">
        <Suspense fallback={null}>
          <FilterSidebar categories={categories} />
        </Suspense>
        <div className="flex-1 min-w-0">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="py-20 text-center">
              <p className="text-neutral-500 text-sm">
                No products found matching your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}
