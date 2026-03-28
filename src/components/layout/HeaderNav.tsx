'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { mainNav } from '@/lib/constants/navigation'
import { useUIStore } from '@/stores/uiStore'

export function HeaderNav() {
  const toggleMobileNav = useUIStore((s) => s.toggleMobileNav)

  return (
    <div className="flex items-center">
      {/* Mobile hamburger */}
      <button
        onClick={toggleMobileNav}
        className="md:hidden p-2 -ml-2 text-black hover:bg-neutral-100 transition-colors duration-200"
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      {/* Desktop nav links */}
      <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-xs uppercase tracking-widest font-medium text-black hover:underline transition-all duration-200"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
