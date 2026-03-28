'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils/formatCurrency'
import { formatDate } from '@/lib/utils/formatDate'
import type { OrderStatus, Order, OrderItem, Address } from '@/types/order'

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

const mockAddress: Address = {
  firstName: 'Sarah',
  lastName: 'Johnson',
  line1: '123 Main Street',
  line2: 'Apt 4B',
  city: 'New York',
  state: 'NY',
  postalCode: '10001',
  country: 'US',
  phone: '+1 (555) 123-4567',
}

const mockOrderItems: OrderItem[] = [
  {
    id: 'item-1',
    productId: 'prod-001',
    productName: 'Essential Oversized Tee',
    productSlug: 'essential-oversized-tee',
    productImage: '',
    variantId: 'ot-1-0',
    size: 'M',
    color: 'Black',
    quantity: 2,
    unitPrice: 65,
    totalPrice: 130,
  },
  {
    id: 'item-2',
    productId: 'prod-003',
    productName: 'Heavyweight Hoodie',
    productSlug: 'heavyweight-hoodie',
    productImage: '',
    variantId: 'hh-2-1',
    size: 'L',
    color: 'White',
    quantity: 1,
    unitPrice: 165,
    totalPrice: 165,
  },
  {
    id: 'item-3',
    productId: 'prod-010',
    productName: 'Woven Leather Belt',
    productSlug: 'woven-leather-belt',
    productImage: '',
    variantId: 'wb-1-0',
    size: 'M',
    color: 'Black',
    quantity: 1,
    unitPrice: 95,
    totalPrice: 95,
  },
]

const mockOrders: Record<string, Order> = {
  'order-001': {
    id: 'order-001',
    userId: 'user-001',
    status: 'delivered',
    items: mockOrderItems,
    shippingAddress: mockAddress,
    billingAddress: mockAddress,
    subtotal: 390,
    shippingCost: 0,
    tax: 31.2,
    total: 421.2,
    currency: 'USD',
    stripePaymentIntentId: 'pi_abc123',
    trackingNumber: '1Z999AA10123456784',
    notes: null,
    createdAt: '2026-03-27T14:00:00Z',
    updatedAt: '2026-03-27T18:00:00Z',
  },
  'order-002': {
    id: 'order-002',
    userId: 'user-002',
    status: 'shipped',
    items: [mockOrderItems[0]],
    shippingAddress: { ...mockAddress, firstName: 'Michael', lastName: 'Chen', line1: '456 Oak Ave', line2: null, city: 'San Francisco', state: 'CA', postalCode: '94102' },
    billingAddress: { ...mockAddress, firstName: 'Michael', lastName: 'Chen', line1: '456 Oak Ave', line2: null, city: 'San Francisco', state: 'CA', postalCode: '94102' },
    subtotal: 130,
    shippingCost: 10,
    tax: 11.2,
    total: 151.2,
    currency: 'USD',
    stripePaymentIntentId: 'pi_def456',
    trackingNumber: '1Z999BB20234567895',
    notes: null,
    createdAt: '2026-03-27T11:30:00Z',
    updatedAt: '2026-03-27T15:00:00Z',
  },
  'order-003': {
    id: 'order-003',
    userId: 'user-003',
    status: 'processing',
    items: [mockOrderItems[0], mockOrderItems[1]],
    shippingAddress: { ...mockAddress, firstName: 'Emma', lastName: 'Wilson', line1: '789 Pine Rd', line2: null, city: 'Chicago', state: 'IL', postalCode: '60601' },
    billingAddress: { ...mockAddress, firstName: 'Emma', lastName: 'Wilson', line1: '789 Pine Rd', line2: null, city: 'Chicago', state: 'IL', postalCode: '60601' },
    subtotal: 295,
    shippingCost: 0,
    tax: 23.6,
    total: 318.6,
    currency: 'USD',
    stripePaymentIntentId: 'pi_ghi789',
    trackingNumber: null,
    notes: 'Customer requested gift wrapping.',
    createdAt: '2026-03-26T16:45:00Z',
    updatedAt: '2026-03-26T16:45:00Z',
  },
  'order-004': {
    id: 'order-004',
    userId: 'user-004',
    status: 'confirmed',
    items: [mockOrderItems[2]],
    shippingAddress: { ...mockAddress, firstName: 'James', lastName: 'Park', line1: '321 Elm Blvd', line2: 'Suite 100', city: 'Austin', state: 'TX', postalCode: '73301' },
    billingAddress: { ...mockAddress, firstName: 'James', lastName: 'Park', line1: '321 Elm Blvd', line2: 'Suite 100', city: 'Austin', state: 'TX', postalCode: '73301' },
    subtotal: 95,
    shippingCost: 10,
    tax: 8.4,
    total: 113.4,
    currency: 'USD',
    stripePaymentIntentId: 'pi_jkl012',
    trackingNumber: null,
    notes: null,
    createdAt: '2026-03-26T09:20:00Z',
    updatedAt: '2026-03-26T09:20:00Z',
  },
  'order-005': {
    id: 'order-005',
    userId: 'user-005',
    status: 'cancelled',
    items: [mockOrderItems[1], mockOrderItems[2]],
    shippingAddress: { ...mockAddress, firstName: 'Olivia', lastName: 'Martinez', line1: '654 Maple Dr', line2: null, city: 'Miami', state: 'FL', postalCode: '33101' },
    billingAddress: { ...mockAddress, firstName: 'Olivia', lastName: 'Martinez', line1: '654 Maple Dr', line2: null, city: 'Miami', state: 'FL', postalCode: '33101' },
    subtotal: 260,
    shippingCost: 0,
    tax: 20.8,
    total: 280.8,
    currency: 'USD',
    stripePaymentIntentId: 'pi_mno345',
    trackingNumber: null,
    notes: 'Customer requested cancellation.',
    createdAt: '2026-03-25T18:10:00Z',
    updatedAt: '2026-03-25T19:00:00Z',
  },
  'order-006': {
    id: 'order-006',
    userId: 'user-006',
    status: 'shipped',
    items: [mockOrderItems[0], mockOrderItems[2]],
    shippingAddress: { ...mockAddress, firstName: 'Liam', lastName: 'Nguyen', line1: '987 Cedar Ln', line2: null, city: 'Seattle', state: 'WA', postalCode: '98101' },
    billingAddress: { ...mockAddress, firstName: 'Liam', lastName: 'Nguyen', line1: '987 Cedar Ln', line2: null, city: 'Seattle', state: 'WA', postalCode: '98101' },
    subtotal: 225,
    shippingCost: 0,
    tax: 18.0,
    total: 243.0,
    currency: 'USD',
    stripePaymentIntentId: 'pi_pqr678',
    trackingNumber: '1Z999CC30345678906',
    notes: null,
    createdAt: '2026-03-25T10:05:00Z',
    updatedAt: '2026-03-25T14:00:00Z',
  },
  'order-007': {
    id: 'order-007',
    userId: 'user-003',
    status: 'processing',
    items: mockOrderItems,
    shippingAddress: { ...mockAddress, firstName: 'Ava', lastName: 'Smith', line1: '147 Birch St', line2: 'Floor 3', city: 'Boston', state: 'MA', postalCode: '02101' },
    billingAddress: { ...mockAddress, firstName: 'Ava', lastName: 'Smith', line1: '147 Birch St', line2: 'Floor 3', city: 'Boston', state: 'MA', postalCode: '02101' },
    subtotal: 390,
    shippingCost: 0,
    tax: 31.2,
    total: 421.2,
    currency: 'USD',
    stripePaymentIntentId: 'pi_stu901',
    trackingNumber: null,
    notes: null,
    createdAt: '2026-03-24T15:30:00Z',
    updatedAt: '2026-03-24T15:30:00Z',
  },
  'order-008': {
    id: 'order-008',
    userId: 'user-007',
    status: 'delivered',
    items: [mockOrderItems[1]],
    shippingAddress: { ...mockAddress, firstName: 'Noah', lastName: 'Williams', line1: '258 Walnut Way', line2: null, city: 'Denver', state: 'CO', postalCode: '80201' },
    billingAddress: { ...mockAddress, firstName: 'Noah', lastName: 'Williams', line1: '258 Walnut Way', line2: null, city: 'Denver', state: 'CO', postalCode: '80201' },
    subtotal: 165,
    shippingCost: 10,
    tax: 14.0,
    total: 189.0,
    currency: 'USD',
    stripePaymentIntentId: 'pi_vwx234',
    trackingNumber: '1Z999DD40456789017',
    notes: null,
    createdAt: '2026-03-24T08:15:00Z',
    updatedAt: '2026-03-24T20:00:00Z',
  },
}

const orderNumberMap: Record<string, string> = {
  'order-001': 'ORD-1001',
  'order-002': 'ORD-1002',
  'order-003': 'ORD-1003',
  'order-004': 'ORD-1004',
  'order-005': 'ORD-1005',
  'order-006': 'ORD-1006',
  'order-007': 'ORD-1007',
  'order-008': 'ORD-1008',
}

const customerEmailMap: Record<string, string> = {
  'user-001': 'sarah.johnson@email.com',
  'user-002': 'michael.chen@email.com',
  'user-003': 'emma.wilson@email.com',
  'user-004': 'james.park@email.com',
  'user-005': 'olivia.martinez@email.com',
  'user-006': 'liam.nguyen@email.com',
  'user-007': 'noah.williams@email.com',
}

export default function AdminOrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string
  const order = mockOrders[orderId]

  const [status, setStatus] = useState<OrderStatus>(order?.status ?? 'confirmed')
  const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber ?? '')
  const [notes, setNotes] = useState(order?.notes ?? '')

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-neutral-500">Order not found.</p>
        <Link
          href="/admin/orders"
          className="text-sm underline text-black mt-2 inline-block"
        >
          Back to Orders
        </Link>
      </div>
    )
  }

  const orderNumber = orderNumberMap[orderId] ?? orderId
  const customerEmail = customerEmailMap[order.userId] ?? 'unknown@email.com'
  const addr = order.shippingAddress
  const badgeProps = statusBadgeProps[status]

  return (
    <div>
      {/* Back link */}
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black transition-colors duration-150 mb-6"
      >
        <ArrowLeft size={16} />
        Back to Orders
      </Link>

      {/* Order header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl font-light">{orderNumber}</h2>
            <Badge variant={badgeProps.variant} className={badgeProps.className}>
              {status}
            </Badge>
          </div>
          <p className="text-sm text-neutral-500 mt-1">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="w-48">
          <Select
            label="Update Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
          >
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Items & totals */}
        <div className="lg:col-span-3 space-y-6">
          <section className="bg-white border border-neutral-200 p-6">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
              Items
            </h3>
            <div className="divide-y divide-neutral-100">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="w-14 h-14 bg-neutral-100 shrink-0 flex items-center justify-center text-[10px] text-neutral-400 uppercase">
                    img
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.productName}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {item.size} / {item.color}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm">
                      {formatCurrency(item.unitPrice)} x {item.quantity}
                    </p>
                    <p className="text-sm font-medium mt-0.5">
                      {formatCurrency(item.totalPrice)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-neutral-200 mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Shipping</span>
                <span>
                  {order.shippingCost === 0
                    ? 'Free'
                    : formatCurrency(order.shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Tax</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium pt-2 border-t border-neutral-100">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Customer, shipping, tracking, notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer */}
          <section className="bg-white border border-neutral-200 p-6">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
              Customer
            </h3>
            <p className="text-sm font-medium">
              {addr.firstName} {addr.lastName}
            </p>
            <p className="text-sm text-neutral-500 mt-0.5">{customerEmail}</p>
          </section>

          {/* Shipping address */}
          <section className="bg-white border border-neutral-200 p-6">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
              Shipping Address
            </h3>
            <div className="text-sm text-neutral-600 space-y-0.5">
              <p>
                {addr.firstName} {addr.lastName}
              </p>
              <p>{addr.line1}</p>
              {addr.line2 && <p>{addr.line2}</p>}
              <p>
                {addr.city}, {addr.state} {addr.postalCode}
              </p>
              <p>{addr.country}</p>
              {addr.phone && (
                <p className="text-neutral-400 mt-1">{addr.phone}</p>
              )}
            </div>
          </section>

          {/* Tracking */}
          <section className="bg-white border border-neutral-200 p-6">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
              Tracking
            </h3>
            <div className="space-y-3">
              <Input
                placeholder="Tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <Button size="sm" fullWidth>
                Update Tracking
              </Button>
            </div>
          </section>

          {/* Notes */}
          <section className="bg-white border border-neutral-200 p-6">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
              Notes
            </h3>
            <Textarea
              placeholder="Internal notes about this order..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </section>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-neutral-200">
        <Button
          onClick={() => setStatus('shipped')}
          disabled={status === 'shipped' || status === 'delivered' || status === 'cancelled'}
        >
          Mark as Shipped
        </Button>
        <Button
          variant="secondary"
          onClick={() => setStatus('delivered')}
          disabled={status === 'delivered' || status === 'cancelled'}
        >
          Mark as Delivered
        </Button>
        <Button
          variant="ghost"
          onClick={() => setStatus('cancelled')}
          disabled={status === 'cancelled' || status === 'delivered'}
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          Cancel Order
        </Button>
      </div>
    </div>
  )
}
