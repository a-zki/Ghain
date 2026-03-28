'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ArrowLeft,
  LogOut,
  Bell,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

function getPageTitle(pathname: string): string {
  if (pathname === '/admin') return 'Dashboard'
  if (pathname.startsWith('/admin/products')) return 'Products'
  if (pathname.startsWith('/admin/orders')) return 'Orders'
  if (pathname.startsWith('/admin/customers')) return 'Customers'
  if (pathname.startsWith('/admin/settings')) return 'Settings'
  return 'Admin'
}

function isNavActive(pathname: string, href: string): boolean {
  if (href === '/admin') return pathname === '/admin'
  return pathname.startsWith(href)
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 flex flex-col shrink-0">
        <div className="px-6 py-8">
          <Link href="/admin" className="block">
            <span className="font-display text-2xl font-bold tracking-[0.2em] uppercase text-white select-none">
              GHAIN
            </span>
          </Link>
          <span className="mt-1 inline-block text-[10px] uppercase tracking-widest text-neutral-500 font-medium border border-neutral-700 px-2 py-0.5">
            Admin
          </span>
        </div>

        <nav className="flex-1 px-2">
          {navItems.map((item) => {
            const active = isNavActive(pathname, item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm text-neutral-400 hover:text-white flex items-center gap-3 py-2.5 px-4 transition-colors duration-150',
                  active && 'text-white bg-white/10',
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="px-2 pb-6 mt-auto space-y-1">
          <Link
            href="/"
            className="text-sm text-neutral-400 hover:text-white flex items-center gap-3 py-2.5 px-4 transition-colors duration-150"
          >
            <ArrowLeft size={18} />
            Back to Store
          </Link>
          <button
            type="button"
            className="w-full text-sm text-neutral-400 hover:text-white flex items-center gap-3 py-2.5 px-4 transition-colors duration-150"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 bg-neutral-50 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center px-6 shrink-0">
          <h1 className="font-display text-lg font-bold tracking-tight uppercase">
            {pageTitle}
          </h1>
          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-neutral-500 hover:text-black transition-colors duration-150"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-medium text-neutral-600">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
