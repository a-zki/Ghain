import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { WishlistGrid } from '@/components/wishlist/WishlistGrid'
import { getProducts } from '@/actions/products'

export const metadata: Metadata = {
  title: 'Wishlist',
}

export default async function WishlistPage() {
  const allProducts = await getProducts()

  return (
    <PageContainer className="py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Wishlist' },
        ]}
      />

      <div className="mt-6">
        <h1 className="font-display text-3xl font-light tracking-tight">
          Wishlist
        </h1>
      </div>

      <div className="mt-8">
        <WishlistGrid allProducts={allProducts} />
      </div>
    </PageContainer>
  )
}
