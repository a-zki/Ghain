import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="border-b border-neutral-200 bg-white">
        <div className="h-16 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
          <Link href="/" aria-label="Home">
            <Logo size="md" />
          </Link>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors duration-200"
          >
            Back to bag
          </Link>
        </div>
      </div>
      <main className="flex-1 bg-white">{children}</main>
    </>
  )
}
