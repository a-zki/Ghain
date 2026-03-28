'use server'

import { createClient } from '@/lib/supabase/server'
import type { Product, Category, ProductVariant, ProductImage, ProductDetail } from '@/types/product'
import type { FilterState } from '@/types/filters'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type DbProduct = {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  price: number
  compare_at_price: number | null
  category_id: string | null
  images: ProductImage[]
  details: ProductDetail[]
  is_featured: boolean
  is_new: boolean
  is_active: boolean
  search_vector: string | null
  created_at: string
  updated_at: string
  categories: { name: string; slug: string } | null
}

type DbVariant = {
  id: string
  product_id: string
  size: string
  color: string
  color_hex: string
  sku: string
  stock: number
  position: number
}

function mapVariant(v: DbVariant): ProductVariant {
  return {
    id: v.id,
    size: v.size,
    color: v.color,
    colorHex: v.color_hex,
    stock: v.stock,
    sku: v.sku,
  }
}

function mapProduct(row: DbProduct, variants: DbVariant[]): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? '',
    shortDescription: row.short_description ?? '',
    price: Number(row.price),
    compareAtPrice: row.compare_at_price !== null ? Number(row.compare_at_price) : null,
    currency: 'USD',
    categoryId: row.category_id ?? '',
    categorySlug: row.categories?.slug ?? '',
    categoryName: row.categories?.name ?? '',
    images: (row.images ?? []) as ProductImage[],
    variants: variants.map(mapVariant),
    details: (row.details ?? []) as ProductDetail[],
    isNew: row.is_new,
    isFeatured: row.is_featured,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/**
 * Attach variants to an array of DB product rows.
 */
async function attachVariants(
  supabase: Awaited<ReturnType<typeof createClient>>,
  rows: DbProduct[],
): Promise<Product[]> {
  if (rows.length === 0) return []

  const productIds = rows.map((r) => r.id)

  const { data: variants, error } = await supabase
    .from('product_variants')
    .select('*')
    .in('product_id', productIds)
    .order('position', { ascending: true })

  if (error) throw error

  const variantsByProduct = new Map<string, DbVariant[]>()
  for (const v of (variants ?? []) as DbVariant[]) {
    const list = variantsByProduct.get(v.product_id) ?? []
    list.push(v)
    variantsByProduct.set(v.product_id, list)
  }

  return rows.map((row) => mapProduct(row, variantsByProduct.get(row.id) ?? []))
}

// ---------------------------------------------------------------------------
// Public actions
// ---------------------------------------------------------------------------

export async function getProducts(
  filters?: Partial<FilterState>,
  search?: string,
): Promise<Product[]> {
  const supabase = await createClient()

  // When filtering by size or color we need to find product ids that match
  let variantProductIds: string[] | null = null

  if (filters?.sizes?.length || filters?.colors?.length) {
    let variantQuery = supabase.from('product_variants').select('product_id')

    if (filters.sizes?.length) {
      variantQuery = variantQuery.in('size', filters.sizes)
    }
    if (filters.colors?.length) {
      variantQuery = variantQuery.in('color', filters.colors)
    }

    const { data: matchingVariants, error: vErr } = await variantQuery
    if (vErr) throw vErr

    variantProductIds = [
      ...new Set((matchingVariants ?? []).map((v: { product_id: string }) => v.product_id)),
    ]

    // No products match variant filters — short-circuit
    if (variantProductIds.length === 0) return []
  }

  // Build main product query
  let query = supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_active', true)

  // Category filter (by slug)
  if (filters?.categories?.length) {
    // We need to resolve category slugs to IDs
    const { data: cats } = await supabase
      .from('categories')
      .select('id')
      .in('slug', filters.categories)

    if (cats && cats.length > 0) {
      query = query.in('category_id', cats.map((c: { id: string }) => c.id))
    } else {
      return []
    }
  }

  // Price range filter
  if (filters?.priceRange) {
    query = query.gte('price', filters.priceRange.min)
    query = query.lte('price', filters.priceRange.max)
  }

  // Variant-derived product id filter
  if (variantProductIds !== null) {
    query = query.in('id', variantProductIds)
  }

  // Full-text search
  if (search) {
    query = query.textSearch('search_vector', search, { type: 'websearch' })
  }

  // Sort
  const sort = filters?.sort ?? 'newest'
  switch (sort) {
    case 'price-asc':
      query = query.order('price', { ascending: true })
      break
    case 'price-desc':
      query = query.order('price', { ascending: false })
      break
    case 'oldest':
      query = query.order('created_at', { ascending: true })
      break
    case 'name-asc':
      query = query.order('name', { ascending: true })
      break
    case 'name-desc':
      query = query.order('name', { ascending: false })
      break
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false })
      break
  }

  const { data: rows, error } = await query

  if (error) throw error

  return attachVariants(supabase, (rows ?? []) as DbProduct[])
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()

  const { data: row, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !row) return null

  const { data: variants } = await supabase
    .from('product_variants')
    .select('*')
    .eq('product_id', row.id)
    .order('position', { ascending: true })

  return mapProduct(row as DbProduct, (variants ?? []) as DbVariant[])
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient()

  const { data: rows, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error

  return attachVariants(supabase, (rows ?? []) as DbProduct[])
}

export async function getNewArrivals(limit: number = 8): Promise<Product[]> {
  const supabase = await createClient()

  // Prefer products flagged is_new, fall back to newest by created_at
  const { data: rows, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_active', true)
    .order('is_new', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error

  return attachVariants(supabase, (rows ?? []) as DbProduct[])
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string,
  limit: number = 4,
): Promise<Product[]> {
  const supabase = await createClient()

  const { data: rows, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .neq('id', productId)
    .limit(limit)

  if (error) throw error

  return attachVariants(supabase, (rows ?? []) as DbProduct[])
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()

  const { data: rows, error } = await supabase
    .from('categories')
    .select('*')
    .order('position', { ascending: true })

  if (error) throw error

  return (rows ?? []).map((r) => ({
    id: r.id as string,
    name: r.name as string,
    slug: r.slug as string,
    description: (r.description ?? null) as string | null,
    imageUrl: (r.image_url ?? null) as string | null,
    position: r.position as number,
  }))
}

export async function searchProducts(query: string): Promise<Product[]> {
  const supabase = await createClient()

  // Attempt full-text search first
  const { data: ftsRows, error: ftsError } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_active', true)
    .textSearch('search_vector', query, { type: 'websearch' })

  if (!ftsError && ftsRows && ftsRows.length > 0) {
    return attachVariants(supabase, ftsRows as DbProduct[])
  }

  // Fallback: ILIKE on name
  const { data: likeRows, error: likeError } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_active', true)
    .ilike('name', `%${query}%`)

  if (likeError) throw likeError

  return attachVariants(supabase, (likeRows ?? []) as DbProduct[])
}
