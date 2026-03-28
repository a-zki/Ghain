'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, MapPin, Settings, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils/cn'

const tabItems = [
  { href: '/account', label: 'Orders', icon: Package },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
  { href: '/account/settings', label: 'Settings', icon: Settings },
] as const

export function AccountMobileTabs() {
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
    <div className="flex items-center gap-1 overflow-x-auto border-b border-neutral-200 pb-px -mx-4 px-4 md:hidden">
      {tabItems.map(({ href, label, icon: Icon }) => {
        const active = isActive(href)
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-xs uppercase tracking-widest font-medium transition-colors duration-200 border-b-2',
              active
                ? 'text-black border-black'
                : 'text-neutral-400 border-transparent hover:text-black',
            )}
          >
            <Icon size={14} />
            {label}
          </Link>
        )
      })}
      <button
        onClick={handleSignOut}
        className="flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-xs uppercase tracking-widest font-medium text-neutral-400 hover:text-red-600 transition-colors duration-200 border-b-2 border-transparent"
      >
        <LogOut size={14} />
        Sign Out
      </button>
    </div>
  )
}
