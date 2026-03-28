import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <p className="font-display text-8xl font-light text-neutral-200">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-neutral-500 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Link href="/">
            <Button variant="primary" size="md">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
