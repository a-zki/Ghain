'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { getMockProducts, getMockCategories } from '@/lib/mock/products'
import { formatCurrency } from '@/lib/utils/formatCurrency'

export default function AdminProductsPage() {
  const products = getMockProducts()
  const categories = getMockCategories()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        !categoryFilter || p.categoryId === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [products, search, categoryFilter])

  const totalStock = (variants: { stock: number }[]) =>
    variants.reduce((sum, v) => sum + v.stock, 0)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-light">Products</h2>
        <Link href="/admin/products/new">
          <Button size="sm">
            <Plus size={14} className="mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 max-w-sm relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
          />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11"
          />
        </div>
        <div className="w-48">
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="text-left text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                Image
              </th>
              <th className="text-left text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                Name
              </th>
              <th className="text-left text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                Category
              </th>
              <th className="text-right text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                Price
              </th>
              <th className="text-right text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                Stock
              </th>
              <th className="text-left text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                Status
              </th>
              <th className="text-right text-[10px] uppercase tracking-widest text-neutral-500 font-medium px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr
                key={product.id}
                className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 cursor-pointer transition-colors duration-100"
              >
                <td className="px-6 py-3">
                  <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-400 uppercase">
                    img
                  </div>
                </td>
                <td className="px-6 py-3">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {product.slug}
                  </p>
                </td>
                <td className="px-6 py-3 text-sm text-neutral-600">
                  {product.categoryName}
                </td>
                <td className="px-6 py-3 text-sm text-right">
                  {formatCurrency(product.price)}
                  {product.compareAtPrice && (
                    <span className="text-xs text-neutral-400 line-through ml-2">
                      {formatCurrency(product.compareAtPrice)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-3 text-sm text-right">
                  {totalStock(product.variants)}
                </td>
                <td className="px-6 py-3">
                  {product.isActive ? (
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline">Draft</Badge>
                  )}
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/products/${product.id}`}>
                      <Button variant="icon" size="sm" aria-label="Edit">
                        <Pencil size={14} />
                      </Button>
                    </Link>
                    <Button
                      variant="icon"
                      size="sm"
                      aria-label="Delete"
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-neutral-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  )
}
