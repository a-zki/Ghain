import { Skeleton } from '@/components/ui/Skeleton'
import { PageContainer } from '@/components/layout/PageContainer'

function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[3/4] w-full rounded-none" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-3 w-1/3 rounded" />
      </div>
    </div>
  )
}

export default function SearchLoading() {
  return (
    <PageContainer className="py-8">
      {/* Breadcrumbs skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-10 rounded" />
        <Skeleton className="h-3 w-3 rounded" />
        <Skeleton className="h-3 w-12 rounded" />
      </div>

      {/* Title bar skeleton */}
      <div className="mt-6 space-y-2">
        <Skeleton className="h-7 w-56 rounded" />
        <Skeleton className="h-4 w-28 rounded" />
      </div>

      {/* Product grid skeleton */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </PageContainer>
  )
}
