import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ProductImageGallery } from '@/components/product/ProductImageGallery'
import { ProductRelated } from '@/components/product/ProductRelated'
import { ProductJsonLd } from '@/components/seo/ProductJsonLd'
import { getProductBySlug, getRelatedProducts } from '@/actions/products'
import { ProductInfo } from './ProductInfo'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.name,
    description: product.shortDescription || product.description,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.id, product.categoryId)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: product.categoryName, href: `/shop/${product.categorySlug}` },
    { label: product.name },
  ]

  return (
    <PageContainer className="py-6 md:py-10">
      <ProductJsonLd product={product} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} className="mb-6 md:mb-8" />

      {/* Main product section */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left: Image gallery */}
        <div className="lg:w-[55%]">
          <ProductImageGallery images={product.images} />
        </div>

        {/* Right: Product info */}
        <div className="lg:w-[45%] lg:sticky lg:top-24 lg:self-start">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 md:mt-24">
          <ProductRelated products={relatedProducts} />
        </div>
      )}
    </PageContainer>
  )
}
