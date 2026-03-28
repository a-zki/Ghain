import type { Metadata } from 'next'
import { ShoppingBag } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'

export const metadata: Metadata = {
  title: 'Orders',
}

export default function OrdersPage() {
  return (
    <div>
      <h2 className="font-display text-xl font-medium tracking-tight mb-6 uppercase">
        Order History
      </h2>

      {/* Order list table - ready for real data */}
      <div className="hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-left">
              <th className="pb-3 text-xs uppercase tracking-widest text-neutral-500 font-medium">
                Order
              </th>
              <th className="pb-3 text-xs uppercase tracking-widest text-neutral-500 font-medium">
                Date
              </th>
              <th className="pb-3 text-xs uppercase tracking-widest text-neutral-500 font-medium">
                Status
              </th>
              <th className="pb-3 text-xs uppercase tracking-widest text-neutral-500 font-medium text-right">
                Total
              </th>
              <th className="pb-3" />
            </tr>
          </thead>
          <tbody />
        </table>
      </div>

      <EmptyState
        icon={<ShoppingBag size={48} strokeWidth={1} />}
        title="No orders yet"
        description="When you place your first order, it will appear here."
        action={{
          label: 'Start Shopping',
          href: '/shop',
        }}
      />
    </div>
  )
}
