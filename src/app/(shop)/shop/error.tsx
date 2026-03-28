'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { PageContainer } from '@/components/layout/PageContainer'

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <PageContainer className="py-8">
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Something went wrong
        </h1>
        {process.env.NODE_ENV === 'development' && error.message && (
          <p className="mt-3 text-sm text-red-600 font-mono max-w-lg break-words">
            {error.message}
          </p>
        )}
        <p className="mt-3 text-sm text-neutral-500 max-w-md">
          We couldn&apos;t load the shop. Please try again or browse from the
          home page.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Button variant="primary" size="md" onClick={reset}>
            Try again
          </Button>
          <Link
            href="/"
            className="text-sm text-neutral-600 underline hover:text-black transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </PageContainer>
  )
}
