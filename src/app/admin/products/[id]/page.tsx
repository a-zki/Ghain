'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Trash2, Upload, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { getMockProducts, getMockCategories } from '@/lib/mock/products'
import type { ProductVariant, ProductDetail } from '@/types/product'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

type FormVariant = {
  id: string
  size: string
  color: string
  colorHex: string
  sku: string
  stock: number
}

type FormDetail = {
  id: string
  title: string
  content: string
}

export default function AdminProductEditPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'new'
  const products = getMockProducts()
  const categories = getMockCategories()
  const product = isNew ? null : products.find((p) => p.id === params.id)

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [compareAtPrice, setCompareAtPrice] = useState('')
  const [status, setStatus] = useState('active')
  const [categoryId, setCategoryId] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)
  const [isNewArrival, setIsNewArrival] = useState(false)
  const [variants, setVariants] = useState<FormVariant[]>([])
  const [details, setDetails] = useState<FormDetail[]>([])
  const [openDetails, setOpenDetails] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (product) {
      setName(product.name)
      setSlug(product.slug)
      setShortDescription(product.shortDescription)
      setDescription(product.description)
      setPrice(product.price.toString())
      setCompareAtPrice(product.compareAtPrice?.toString() ?? '')
      setStatus(product.isActive ? 'active' : 'draft')
      setCategoryId(product.categoryId)
      setIsFeatured(product.isFeatured)
      setIsNewArrival(product.isNew)
      setVariants(
        product.variants.map((v: ProductVariant) => ({
          id: v.id,
          size: v.size,
          color: v.color,
          colorHex: v.colorHex,
          sku: v.sku,
          stock: v.stock,
        })),
      )
      setDetails(
        product.details.map((d: ProductDetail, i: number) => ({
          id: `detail-${i}`,
          title: d.title,
          content: d.content,
        })),
      )
    }
  }, [product])

  const handleNameChange = useCallback(
    (value: string) => {
      setName(value)
      if (isNew) {
        setSlug(slugify(value))
      }
    },
    [isNew],
  )

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        size: '',
        color: '',
        colorHex: '#000000',
        sku: '',
        stock: 0,
      },
    ])
  }

  const removeVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id))
  }

  const updateVariant = (id: string, field: keyof FormVariant, value: string | number) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v)),
    )
  }

  const addDetail = () => {
    const newId = `detail-${Date.now()}`
    setDetails((prev) => [
      ...prev,
      { id: newId, title: '', content: '' },
    ])
    setOpenDetails((prev) => new Set(prev).add(newId))
  }

  const removeDetail = (id: string) => {
    setDetails((prev) => prev.filter((d) => d.id !== id))
    setOpenDetails((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const updateDetail = (id: string, field: 'title' | 'content', value: string) => {
    setDetails((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)),
    )
  }

  const toggleDetail = (id: string) => {
    setOpenDetails((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleSave = () => {
    // In a real app, this would save to the backend
    router.push('/admin/products')
  }

  if (!isNew && !product) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-neutral-500">Product not found.</p>
        <Link
          href="/admin/products"
          className="text-sm underline text-black mt-2 inline-block"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Back link */}
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black transition-colors duration-150 mb-6"
      >
        <ArrowLeft size={16} />
        Back to Products
      </Link>

      <h2 className="font-display text-2xl font-light mb-8">
        {isNew ? 'New Product' : `Edit: ${product?.name}`}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left column: 3/5 */}
        <div className="lg:col-span-3 space-y-8">
          {/* Product Info */}
          <section className="bg-white border border-neutral-200 p-6">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
              Product Information
            </h3>
            <div className="space-y-4">
              <Input
                label="Name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Product name"
              />
              <Input
                label="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="product-slug"
                hint="URL-friendly identifier. Auto-generated from name."
              />
              <Textarea
                label="Short Description"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief product description"
                className="min-h-[80px]"
              />
              <Textarea
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Full product description"
              />
            </div>
          </section>

          {/* Pricing */}
          <section className="bg-white border border-neutral-200 p-6">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
              Pricing
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              <Input
                label="Compare-at Price"
                type="number"
                value={compareAtPrice}
                onChange={(e) => setCompareAtPrice(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                hint="Original price before discount"
              />
            </div>
          </section>

          {/* Product Details (accordion) */}
          <section className="bg-white border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
                Product Details
              </h3>
              <Button variant="ghost" size="sm" onClick={addDetail}>
                <Plus size={14} className="mr-1" />
                Add Detail
              </Button>
            </div>
            <div className="space-y-2">
              {details.length === 0 && (
                <p className="text-sm text-neutral-400 py-4 text-center">
                  No details yet. Add detail sections like Material, Fit, or Care.
                </p>
              )}
              {details.map((detail) => {
                const isOpen = openDetails.has(detail.id)
                return (
                  <div
                    key={detail.id}
                    className="border border-neutral-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleDetail(detail.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-neutral-50 transition-colors duration-100"
                    >
                      <span className="font-medium">
                        {detail.title || 'Untitled Detail'}
                      </span>
                      {isOpen ? (
                        <ChevronUp size={16} className="text-neutral-400" />
                      ) : (
                        <ChevronDown size={16} className="text-neutral-400" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 space-y-3">
                        <Input
                          label="Title"
                          value={detail.title}
                          onChange={(e) =>
                            updateDetail(detail.id, 'title', e.target.value)
                          }
                          placeholder="e.g. Material"
                        />
                        <Textarea
                          label="Content"
                          value={detail.content}
                          onChange={(e) =>
                            updateDetail(detail.id, 'content', e.target.value)
                          }
                          placeholder="Detail content"
                          className="min-h-[80px]"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDetail(detail.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        {/* Right column: 2/5 */}
        <div className="lg:col-span-2 space-y-8">
          {/* Status */}
          <section className="bg-white border border-neutral-200 p-6">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
              Status
            </h3>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </Select>
          </section>

          {/* Category */}
          <section className="bg-white border border-neutral-200 p-6">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
              Category
            </h3>
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </section>

          {/* Tags/Flags */}
          <section className="bg-white border border-neutral-200 p-6">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
              Tags
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 border-neutral-300 text-black focus:ring-black"
                />
                <span className="text-sm">Featured</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNewArrival}
                  onChange={(e) => setIsNewArrival(e.target.checked)}
                  className="w-4 h-4 border-neutral-300 text-black focus:ring-black"
                />
                <span className="text-sm">New Arrival</span>
              </label>
            </div>
          </section>

          {/* Images */}
          <section className="bg-white border border-neutral-200 p-6">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-4">
              Images
            </h3>
            <div className="border-2 border-dashed border-neutral-300 p-8 flex flex-col items-center justify-center text-center hover:border-neutral-400 transition-colors duration-150 cursor-pointer">
              <Upload size={24} className="text-neutral-400 mb-3" />
              <p className="text-sm text-neutral-500">
                Drop images here or click to upload
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                PNG, JPG up to 5MB
              </p>
            </div>
          </section>

          {/* Variants */}
          <section className="bg-white border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
                Variants
              </h3>
              <Button variant="ghost" size="sm" onClick={addVariant}>
                <Plus size={14} className="mr-1" />
                Add
              </Button>
            </div>
            {variants.length === 0 ? (
              <p className="text-sm text-neutral-400 py-4 text-center">
                No variants yet.
              </p>
            ) : (
              <div className="space-y-3">
                {variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="border border-neutral-200 p-3"
                  >
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <Input
                        placeholder="Size"
                        value={variant.size}
                        onChange={(e) =>
                          updateVariant(variant.id, 'size', e.target.value)
                        }
                        className="h-9 text-xs"
                      />
                      <Input
                        placeholder="Color"
                        value={variant.color}
                        onChange={(e) =>
                          updateVariant(variant.id, 'color', e.target.value)
                        }
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <Input
                        placeholder="SKU"
                        value={variant.sku}
                        onChange={(e) =>
                          updateVariant(variant.id, 'sku', e.target.value)
                        }
                        className="h-9 text-xs"
                      />
                      <Input
                        placeholder="Stock"
                        type="number"
                        value={variant.stock.toString()}
                        onChange={(e) =>
                          updateVariant(
                            variant.id,
                            'stock',
                            parseInt(e.target.value, 10) || 0,
                          )
                        }
                        className="h-9 text-xs"
                        min="0"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVariant(variant.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 text-[10px]"
                    >
                      <Trash2 size={12} className="mr-1" />
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-neutral-200">
        <Button onClick={handleSave}>Save Product</Button>
        <Link href="/admin/products">
          <Button variant="secondary">Cancel</Button>
        </Link>
      </div>
    </div>
  )
}
