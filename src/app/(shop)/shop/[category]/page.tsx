import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ProductGrid } from '@/components/product/ProductGrid'
import { FilterSidebar, MobileFilterButton } from '@/components/filters/FilterSidebar'
import { ActiveFilters } from '@/components/filters/ActiveFilters'
import { SortSelect } from '@/components/filters/SortSelect'
import { getProducts, getCategories } from '@/actions/products'
import type { FilterState, SortOption } from '@/types/filters'

type PageProps = {
  params: Promise<{ category: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const categories = await getCategories()
  const category = categories.find((c) => c.slug === categorySlug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: category.name,
    description: category.description || `Shop ${category.name} at Ghain.`,
  }
}

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: categorySlug } = await params
  const resolvedSearchParams = await searchParams

  const categories = await getCategories()
  const category = categories.find((c) => c.slug === categorySlug)

  if (!category) {
    notFound()
  }

  const filters: Partial<FilterState> = {
    categories: [categorySlug],
    sizes: toArray(resolvedSearchParams.size),
    colors: toArray(resolvedSearchParams.color),
    sort: (typeof resolvedSearchParams.sort === 'string' ? resolvedSearchParams.sort : 'newest') as SortOption,
  }

  const minPrice = typeof resolvedSearchParams.minPrice === 'string' ? Number(resolvedSearchParams.minPrice) : NaN
  const maxPrice = typeof resolvedSearchParams.maxPrice === 'string' ? Number(resolvedSearchParams.maxPrice) : NaN
  if (!isNaN(minPrice) || !isNaN(maxPrice)) {
    filters.priceRange = {
      min: isNaN(minPrice) ? 0 : minPrice,
      max: isNaN(maxPrice) ? 999999 : maxPrice,
    }
  }

  const products = await getProducts(filters)

  return (
    <PageContainer className="py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/shop' },
          { label: category.name },
        ]}
      />

      {/* Title row */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            {category.name}
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
