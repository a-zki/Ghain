import type { Product, ProductVariant } from './product'

export type CartItem = {
  product: Product
  variant: ProductVariant
  quantity: number
}

export type CartState = {
  items: CartItem[]
}
