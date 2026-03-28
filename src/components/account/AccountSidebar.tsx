'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, MapPin, Settings, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils/cn'

const navItems = [
  { href: '/account', label: 'Orders', icon: Package },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
  { href: '/account/settings', label: 'Settings', icon: Settings },
] as const

export function AccountSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error(error.message)
      return
    }
    router.push('/')
    router.refresh()
  }

  function isActive(href: string) {
    if (href === '/account') {
      return pathname === '/account' || pathname.startsWith('/account/orders')
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="w-48 shrink-0">
      <ul className="space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href)
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'flex items-center gap-2.5 py-2 pl-4 text-sm transition-colors duration-200',
                  active
                    ? 'font-medium text-black border-l-2 border-black'
                    : 'text-neutral-500 hover:text-black border-l-2 border-transparent',
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            </li>
          )
        })}
        <li>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2.5 py-2 pl-4 text-sm text-neutral-500 hover:text-red-600 transition-colors duration-200 border-l-2 border-transparent"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  )
}
