'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="font-display text-2xl font-bold tracking-tight">
        Something went wrong
      </h1>
      {process.env.NODE_ENV === 'development' && error.message && (
        <p className="mt-3 text-sm text-red-600 font-mono max-w-lg break-words">
          {error.message}
        </p>
      )}
      <p className="mt-3 text-sm text-neutral-500 max-w-md">
        An unexpected error occurred. Please try again or return to the home
        page.
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
  )
}
