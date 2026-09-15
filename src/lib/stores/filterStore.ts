import { create } from 'zustand'
import type { ProductCategory } from '@/lib/types/product'

interface FilterState {
  category: ProductCategory | null
  minPrice: number | null
  maxPrice: number | null
  inStock: boolean
  sortBy: 'price_asc' | 'price_desc' | 'popularity' | 'newest'
  searchQuery: string

  // Actions
  setCategory: (category: ProductCategory | null) => void
  setPriceRange: (min: number | null, max: number | null) => void
  setInStock: (inStock: boolean) => void
  setSortBy: (sortBy: 'price_asc' | 'price_desc' | 'popularity' | 'newest') => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

const initialState: Omit<FilterState, 'setCategory' | 'setPriceRange' | 'setInStock' | 'setSortBy' | 'setSearchQuery' | 'resetFilters'> = {
  category: null,
  minPrice: null,
  maxPrice: null,
  inStock: false,
  sortBy: 'newest',
  searchQuery: '',
}

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,

  setCategory: (category) => set({ category }),

  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),

  setInStock: (inStock) => set({ inStock }),

  setSortBy: (sortBy) => set({ sortBy }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  resetFilters: () => set(initialState),
}))