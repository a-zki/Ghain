export type ProductImage = {
  src: string
  alt: string
  position: number
}

export type ProductVariant = {
  id: string
  size: string
  color: string
  colorHex: string
  stock: number
  sku: string
}

export type ProductDetail = {
  title: string
  content: string
}

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice: number | null
  currency: string
  categoryId: string
  categorySlug: string
  categoryName: string
  images: ProductImage[]
  variants: ProductVariant[]
  details: ProductDetail[]
  isNew: boolean
  isFeatured: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  position: number
}
