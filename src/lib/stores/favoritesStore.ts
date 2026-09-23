'use client'

import { create } from 'zustand'
import { favoritesApi } from '@/lib/api/favorites'

interface FavoritesState {
  favoriteIds: string[]
  isLoading: boolean
  isInitialized: boolean
  initialize: () => Promise<void>
  addFavorite: (productId: string) => Promise<void>
  removeFavorite: (productId: string) => Promise<void>
  toggleFavorite: (productId: string) => Promise<boolean>
  isFavorite: (productId: string) => boolean
  clear: () => void
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteIds: [],
  isLoading: false,
  isInitialized: false,

  initialize: async () => {
    if (get().isInitialized || get().isLoading) {
      return
    }

    set({ isLoading: true })

    try {
      const response = await favoritesApi.getAll()
        const favoriteIds = (response.data ?? [])
        .map((favorite) => favorite.product?.id)
        .filter((id): id is string => Boolean(id))

      set({
        favoriteIds,
        isInitialized: true,
        isLoading: false,
      })
    } catch {
      set({
        favoriteIds: [],
        isInitialized: true,
        isLoading: false,
      })
    }
  },

  addFavorite: async (productId: string) => {
    await favoritesApi.add(productId)

    set((state) => ({
      favoriteIds: state.favoriteIds.includes(productId)
        ? state.favoriteIds
        : [...state.favoriteIds, productId],
    }))
  },

  removeFavorite: async (productId: string) => {
    await favoritesApi.remove(productId)

    set((state) => ({
      favoriteIds: state.favoriteIds.filter((id) => id !== productId),
    }))
  },

  toggleFavorite: async (productId: string) => {
    const isFavorite = get().isFavorite(productId)

    if (isFavorite) {
      await get().removeFavorite(productId)
      return false
    }

    await get().addFavorite(productId)
    return true
  },

  isFavorite: (productId: string) => {
    return get().favoriteIds.includes(productId)
  },

  clear: () => {
    set({
      favoriteIds: [],
      isInitialized: false,
      isLoading: false,
    })
  },
}))