import { create } from 'zustand'

type UIStore = {
  isCartOpen: boolean
  isMobileNavOpen: boolean
  isSearchOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleMobileNav: () => void
  openSearch: () => void
  closeSearch: () => void
}

export const useUIStore = create<UIStore>()((set) => ({
  isCartOpen: false,
  isMobileNavOpen: false,
  isSearchOpen: false,

  openCart: () => set({ isCartOpen: true, isMobileNavOpen: false }),
  closeCart: () => set({ isCartOpen: false }),

  toggleMobileNav: () =>
    set((state) => ({
      isMobileNavOpen: !state.isMobileNavOpen,
      isCartOpen: false,
    })),

  openSearch: () =>
    set({ isSearchOpen: true, isMobileNavOpen: false, isCartOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),
}))
