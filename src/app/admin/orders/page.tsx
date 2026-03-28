'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils/formatCurrency'
import { formatDate } from '@/lib/utils/formatDate'
import type { OrderStatus } from '@/types/order'

type MockOrder = {
  id: string
  orderNumber: string
  customerEmail: string
  itemsCount: number
  status: OrderStatus
  total: number
  date: string
}

const mockOrders: MockOrder[] = [
  {
    id: 'order-001',
    orderNumber: 'ORD-1001',
    customerEmail: 'sarah.johnson@email.com',
    itemsCount: 3,
    status: 'delivered',
    total: 375.0,
    date: '2026-03-27T14:00:00Z',
  },
  {
    id: 'order-002',
    orderNumber: 'ORD-1002',
    customerEmail: 'michael.chen@email.com',
    itemsCount: 1,
    status: 'shipped',
    total: 165.0,
    date: '2026-03-27T11:30:00Z',
  },
  {
    id: 'order-003',
    orderNumber: 'ORD-1003',
    customerEmail: 'emma.wilson@email.com',
    itemsCount: 4,
    status: 'processing',
    total: 520.0,
    date: '2026-03-26T16:45:00Z',
  },
  {
    id: 'order-004',
    orderNumber: 'ORD-1004',
    customerEmail: 'james.park@email.com',
    itemsCount: 1,
    status: 'confirmed',
    total: 95.0,
    date: '2026-03-26T09:20:00Z',
  },
  {
    id: 'order-005',
    orderNumber: 'ORD-1005',
    customerEmail: 'olivia.martinez@email.com',
    itemsCount: 2,
    status: 'cancelled',
    total: 310.0,
    date: '2026-03-25T18:10:00Z',
  },
  {
    id: 'order-006',
    orderNumber: 'ORD-1006',
    customerEmail: 'liam.nguyen@email.com',
    itemsCount: 2,
    status: 'shipped',
    total: 210.0,
    date: '2026-03-25T10:05:00Z',
  },
  {
    id: 'order-007',
    orderNumber: 'ORD-1007',
    customerEmail: 'ava.smith@email.com',
    itemsCount: 5,
    status: 'processing',
    total: 680.0,
    date: '2026-03-24T15:30:00Z',
  },
  {
    id: 'order-008',
    orderNumber: 'ORD-1008',
    customerEmail: 'noah.williams@email.com',
    itemsCount: 1,
    status: 'delivered',
    total: 285.0,
    date: '2026-03-24T08:15:00Z',
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

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = useMemo(() => {
    if (!statusFilter) return mockOrders
    return mockOrders.filter((o) => o.status === statusFilter)
  }, [statusFilter])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-light">Orders</h2>
        <div className="w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </div>
      </div>

      {/* Table */}
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
              <th className="text-right text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                Items
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
              <th className="text-right text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const badgeProps = statusBadgeProps[order.status]
              return (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="contents"
                >
                  <tr className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 cursor-pointer transition-colors duration-100">
                    <td className="px-6 py-4 text-sm font-medium">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {order.customerEmail}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-neutral-600">
                      {order.itemsCount}
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
                    <td className="px-6 py-4 text-sm text-right">
                      <span className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors duration-150 font-medium">
                        View
                      </span>
                    </td>
                  </tr>
                </Link>
              )
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-neutral-500">
            No orders found.
          </div>
        )}
      </div>
    </div>
  )
}
