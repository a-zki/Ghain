import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-10 flex justify-center">
          <Link href="/" aria-label="Home">
            <Logo size="lg" />
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
