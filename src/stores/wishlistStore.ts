import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type WishlistItem = {
  productId: string
  slug: string
  addedAt: string
}

type WishlistStore = {
  items: WishlistItem[]
  addItem: (productId: string, slug: string) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId, slug) => {
        const { items } = get()
        if (items.some((item) => item.productId === productId)) return

        set({
          items: [
            ...items,
            { productId, slug, addedAt: new Date().toISOString() },
          ],
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }))
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId)
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'ghain-wishlist',
    },
  ),
)
