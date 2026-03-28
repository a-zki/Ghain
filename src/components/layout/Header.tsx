import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { HeaderNav } from './HeaderNav'
import { HeaderActions } from './HeaderActions'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="h-16 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-3 items-center">
        {/* Left: Navigation */}
        <HeaderNav />

        {/* Center: Logo */}
        <div className="flex justify-center">
          <Link href="/" aria-label="Home">
            <Logo size="md" />
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex justify-end">
          <HeaderActions />
        </div>
      </div>
    </header>
  )
}
