import { apiClient } from './client'

export interface FavoriteProduct {
  id: string
  createdAt: string
  product: {
    id: string
    name: string
    description: string
    price: number
    promoPrice?: number | null
    promoStart?: string | null
    promoEnd?: string | null
    category: string
    brand?: string | null
    images: string[]
    stock: number
    intensity?: string | null
    isFeatured: boolean
    isPopular: boolean
    isActive: boolean
    createdAt: string
    updatedAt?: string
  }
}

export const favoritesApi = {
  getAll: () =>
    apiClient.get<FavoriteProduct[]>('/favorites/products'),

  isFavorite: (productId: string) =>
    apiClient.get<{ isFavorite: boolean }>(
      `/favorites/products/${productId}`,
    ),

  add: (productId: string) =>
    apiClient.post<{
      message: string
      isFavorite: boolean
      favorite: FavoriteProduct
    }>(`/favorites/products/${productId}`),

  remove: (productId: string) =>
    apiClient.delete<{
      message: string
      isFavorite: boolean
    }>(`/favorites/products/${productId}`),
}