export type OrderStatus =
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type Address = {
  firstName: string
  lastName: string
  line1: string
  line2: string | null
  city: string
  state: string
  postalCode: string
  country: string
  phone: string | null
}

export type OrderItem = {
  id: string
  productId: string
  productName: string
  productSlug: string
  productImage: string
  variantId: string
  size: string
  color: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export type Order = {
  id: string
  userId: string
  status: OrderStatus
  items: OrderItem[]
  shippingAddress: Address
  billingAddress: Address
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  currency: string
  stripePaymentIntentId: string | null
  trackingNumber: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
}
