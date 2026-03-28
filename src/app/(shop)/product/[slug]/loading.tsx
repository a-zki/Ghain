import { Skeleton } from '@/components/ui/Skeleton'
import { PageContainer } from '@/components/layout/PageContainer'

export default function ProductDetailLoading() {
  return (
    <PageContainer className="py-6 md:py-10">
      {/* Breadcrumbs skeleton */}
      <div className="mb-6 md:mb-8 flex items-center gap-2">
        <Skeleton className="h-3 w-10 rounded" />
        <Skeleton className="h-3 w-3 rounded" />
        <Skeleton className="h-3 w-8 rounded" />
        <Skeleton className="h-3 w-3 rounded" />
        <Skeleton className="h-3 w-16 rounded" />
        <Skeleton className="h-3 w-3 rounded" />
        <Skeleton className="h-3 w-24 rounded" />
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left: Image gallery skeleton */}
        <div className="lg:w-[55%]">
          <Skeleton className="aspect-[3/4] w-full rounded-none" />
          <div className="mt-3 flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-16 h-16 rounded-none flex-shrink-0" />
            ))}
          </div>
        </div>

        {/* Right: Product info skeleton */}
        <div className="lg:w-[45%] space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-8 w-3/4 rounded" />
          </div>

          {/* Price */}
          <Skeleton className="h-6 w-24 rounded" />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-2/3 rounded" />
          </div>

          {/* Variant buttons - Color */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-12 rounded" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-full" />
              ))}
            </div>
          </div>

          {/* Variant buttons - Size */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-8 rounded" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-14 rounded" />
              ))}
            </div>
          </div>

          {/* Add to cart button */}
          <Skeleton className="h-14 w-full rounded-none" />

          {/* Details accordion */}
          <div className="space-y-3 pt-4 border-t border-neutral-200">
            <Skeleton className="h-5 w-32 rounded" />
            <Skeleton className="h-5 w-24 rounded" />
            <Skeleton className="h-5 w-28 rounded" />
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
