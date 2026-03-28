import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils/formatCurrency'
import { formatDate } from '@/lib/utils/formatDate'
import { cn } from '@/lib/utils/cn'
import type { OrderStatus } from '@/types/order'

export const metadata: Metadata = {
  title: 'Order Details',
}

const statusSteps: OrderStatus[] = ['confirmed', 'processing', 'shipped', 'delivered']

const statusLabels: Record<OrderStatus, string> = {
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

const mockOrder = {
  id: 'ORD-20260315-001',
  status: 'processing' as OrderStatus,
  createdAt: '2026-03-15T10:30:00Z',
  items: [
    {
      id: '1',
      productName: 'Essential Cotton Tee',
      productSlug: 'essential-cotton-tee',
      productImage: '/images/placeholder-product.jpg',
      size: 'M',
      color: 'Black',
      quantity: 2,
      unitPrice: 4500,
      totalPrice: 9000,
    },
    {
      id: '2',
      productName: 'Relaxed Linen Pants',
      productSlug: 'relaxed-linen-pants',
      productImage: '/images/placeholder-product.jpg',
      size: 'L',
      color: 'Sand',
      quantity: 1,
      unitPrice: 8900,
      totalPrice: 8900,
    },
  ],
  shippingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    line1: '123 Main Street',
    line2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States',
  },
  subtotal: 17900,
  shippingCost: 0,
  tax: 1593,
  total: 19493,
  currency: 'USD',
}

function StatusTimeline({ currentStatus }: { currentStatus: OrderStatus }) {
  if (currentStatus === 'cancelled') {
    return (
      <div className="flex items-center gap-2 py-4">
        <Badge className="bg-red-600 text-white">Cancelled</Badge>
      </div>
    )
  }

  const currentIndex = statusSteps.indexOf(currentStatus)

  return (
    <div className="flex items-center gap-0 py-4">
      {statusSteps.map((step, index) => {
        const isCompleted = index <= currentIndex
        const isLast = index === statusSteps.length - 1

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium transition-colors',
                  isCompleted
                    ? 'border-black bg-black text-white'
                    : 'border-neutral-200 bg-white text-neutral-400',
                )}
              >
                {index + 1}
              </div>
              <span
                className={cn(
                  'mt-1.5 text-[10px] uppercase tracking-widest font-medium',
                  isCompleted ? 'text-black' : 'text-neutral-400',
                )}
              >
                {statusLabels[step]}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  'mx-1.5 h-0.5 w-8 sm:w-16 md:w-20',
                  index < currentIndex ? 'bg-black' : 'bg-neutral-200',
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function OrderDetailPage() {
  const order = mockOrder

  return (
    <div>
      <Link
        href="/account"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-black transition-colors duration-200 mb-6"
      >
        <ArrowLeft size={16} />
        Back to Orders
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <h2 className="font-display text-xl font-medium tracking-tight uppercase">
            Order {order.id}
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <Badge>{statusLabels[order.status]}</Badge>
      </div>

      {/* Status Timeline */}
      <div className="border border-neutral-200 p-4 sm:p-6 mb-8 overflow-x-auto">
        <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-2">
          Order Status
        </h3>
        <StatusTimeline currentStatus={order.status} />
      </div>

      {/* Items */}
      <div className="border border-neutral-200 mb-8">
        <div className="p-4 sm:p-6 border-b border-neutral-200">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
            Items
          </h3>
        </div>
        <ul className="divide-y divide-neutral-200">
          {order.items.map((item) => (
            <li key={item.id} className="flex gap-4 p-4 sm:p-6">
              <div className="relative h-20 w-20 shrink-0 bg-neutral-100">
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/shop/${item.productSlug}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {item.productName}
                  </Link>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {item.color} / {item.size}
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-xs text-neutral-500">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-sm font-medium">
                    {formatCurrency(item.totalPrice / 100, order.currency)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Address */}
        <div className="border border-neutral-200 p-4 sm:p-6">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
            Shipping Address
          </h3>
          <address className="text-sm not-italic leading-relaxed text-neutral-700">
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            <br />
            {order.shippingAddress.line1}
            <br />
            {order.shippingAddress.line2 && (
              <>
                {order.shippingAddress.line2}
                <br />
              </>
            )}
            {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
            {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.country}
          </address>
        </div>

        {/* Payment Summary */}
        <div className="border border-neutral-200 p-4 sm:p-6">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
            Payment Summary
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-neutral-500">Subtotal</dt>
              <dd>{formatCurrency(order.subtotal / 100, order.currency)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">Shipping</dt>
              <dd>
                {order.shippingCost === 0
                  ? 'Free'
                  : formatCurrency(order.shippingCost / 100, order.currency)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">Tax</dt>
              <dd>{formatCurrency(order.tax / 100, order.currency)}</dd>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-2 font-medium">
              <dt>Total</dt>
              <dd>{formatCurrency(order.total / 100, order.currency)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
