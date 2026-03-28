'use client'

import Link from 'next/link'
import { Drawer } from '@/components/ui/Drawer'
import { IconInstagram, IconX } from './icons'
import { useUIStore } from '@/stores/uiStore'
import { mainNav } from '@/lib/constants/navigation'
import { siteConfig } from '@/lib/constants/siteConfig'

const extraLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const allLinks = [...mainNav, ...extraLinks]

export function MobileNav() {
  const isOpen = useUIStore((s) => s.isMobileNavOpen)
  const toggleMobileNav = useUIStore((s) => s.toggleMobileNav)

  return (
    <Drawer isOpen={isOpen} onClose={toggleMobileNav} side="left" title="Menu">
      <nav className="flex flex-col" aria-label="Mobile navigation">
        {allLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={toggleMobileNav}
            className="text-lg font-medium uppercase tracking-widest py-4 border-b border-neutral-200 text-black hover:text-neutral-600 transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-8 flex items-center gap-4">
        {siteConfig.social.instagram && (
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-neutral-500 hover:text-black transition-colors duration-200"
            aria-label="Instagram"
          >
            <IconInstagram size={20} />
          </a>
        )}
        {siteConfig.social.twitter && (
          <a
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-neutral-500 hover:text-black transition-colors duration-200"
            aria-label="Twitter"
          >
            <IconX size={20} />
          </a>
        )}
        {/* Fallback when no socials are configured */}
        {!siteConfig.social.instagram && !siteConfig.social.twitter && (
          <>
            <span className="p-2 text-neutral-400" aria-label="Instagram">
              <IconInstagram size={20} />
            </span>
            <span className="p-2 text-neutral-400" aria-label="Twitter">
              <IconX size={20} />
            </span>
          </>
        )}
      </div>
    </Drawer>
  )
}
