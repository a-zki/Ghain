import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { PageContainer } from '@/components/layout/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { EmptyState } from '@/components/ui/EmptyState'
import { ProductGrid } from '@/components/product/ProductGrid'
import { searchProducts } from '@/actions/products'
import { Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Search',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const q = typeof params.q === 'string' ? params.q.trim() : ''

  if (!q) {
    redirect('/shop')
  }

  const results = await searchProducts(q)

  return (
    <PageContainer className="py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Search' },
        ]}
      />

      <div className="mt-6">
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Results for &lsquo;{q}&rsquo;
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          {results.length} {results.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      <div className="mt-8">
        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <EmptyState
            icon={<Search size={48} strokeWidth={1} />}
            title="No results found"
            description="Try a different search term or browse our full collection."
            action={{ label: 'Browse All Products', href: '/shop' }}
          />
        )}
      </div>
    </PageContainer>
  )
}
