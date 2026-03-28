import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils/formatCurrency'
import { formatDate } from '@/lib/utils/formatDate'
import type { OrderStatus } from '@/types/order'

const stats = [
  { label: 'Total Revenue', value: '$12,450', change: '+12%' },
  { label: 'Orders', value: '156', change: '+8%' },
  { label: 'Products', value: '48', change: null },
  { label: 'Customers', value: '1,204', change: '+15%' },
]

const recentOrders: {
  id: string
  customer: string
  status: OrderStatus
  total: number
  date: string
}[] = [
  {
    id: 'ORD-1001',
    customer: 'Sarah Johnson',
    status: 'delivered',
    total: 245.0,
    date: '2026-03-27T14:00:00Z',
  },
  {
    id: 'ORD-1002',
    customer: 'Michael Chen',
    status: 'shipped',
    total: 165.0,
    date: '2026-03-27T11:30:00Z',
  },
  {
    id: 'ORD-1003',
    customer: 'Emma Wilson',
    status: 'processing',
    total: 520.0,
    date: '2026-03-26T16:45:00Z',
  },
  {
    id: 'ORD-1004',
    customer: 'James Park',
    status: 'confirmed',
    total: 95.0,
    date: '2026-03-26T09:20:00Z',
  },
  {
    id: 'ORD-1005',
    customer: 'Olivia Martinez',
    status: 'cancelled',
    total: 310.0,
    date: '2026-03-25T18:10:00Z',
  },
]

const statusBadgeProps: Record<
  OrderStatus,
  { variant: 'default' | 'outline'; className: string }
> = {
  confirmed: { variant: 'outline', className: '' },
  processing: { variant: 'outline', className: 'border-blue-500 text-blue-600' },
  shipped: { variant: 'outline', className: '' },
  delivered: { variant: 'default', className: 'bg-green-700 text-white' },
  cancelled: { variant: 'default', className: 'bg-red-700 text-white' },
}

export default function AdminDashboardPage() {
  const currentDate = formatDate(new Date(), {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div>
      {/* Greeting */}
      <div className="mb-8">
        <h2 className="font-display text-2xl font-light">Welcome back</h2>
        <p className="text-sm text-neutral-500 mt-1">{currentDate}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 border border-neutral-200"
          >
            <p className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              {stat.label}
            </p>
            <div className="flex items-end gap-3 mt-1">
              <span className="text-3xl font-display font-light">
                {stat.value}
              </span>
              {stat.change && (
                <Badge className="bg-green-100 text-green-800 text-[10px] mb-1">
                  {stat.change}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest">
            Recent Orders
          </h3>
          <Link
            href="/admin/orders"
            className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors duration-150 font-medium"
          >
            View All Orders
          </Link>
        </div>
        <div className="bg-white border border-neutral-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                  Order
                </th>
                <th className="text-left text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                  Customer
                </th>
                <th className="text-left text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                  Status
                </th>
                <th className="text-right text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                  Total
                </th>
                <th className="text-right text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                const badgeProps = statusBadgeProps[order.status]
                return (
                  <tr
                    key={order.id}
                    className="border-b border-neutral-100 last:border-b-0"
                  >
                    <td className="px-6 py-4 text-sm font-medium">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={badgeProps.variant}
                        className={badgeProps.className}
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500 text-right">
                      {formatDate(order.date, {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
