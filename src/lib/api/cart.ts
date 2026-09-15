import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { Cart, CartItem } from '@/lib/types/order'

export const cartApi = {
  getCart: () => {
    return apiClient.get<any>(API_ENDPOINTS.cart.get)
  },

  addToCart: (productId: string, quantity: number, variantId?: string) => {
    return apiClient.post<any>(API_ENDPOINTS.cart.add, {
      productId,
      quantity,
      variantId,
    })
  },

  updateQuantity: (itemId: string, quantity: number) => {
    return apiClient.put<any>(API_ENDPOINTS.cart.item(itemId), { quantity })
  },

  removeItem: (itemId: string) => {
    return apiClient.delete<any>(API_ENDPOINTS.cart.item(itemId))
  },

  clearCart: () => {
    return apiClient.delete<any>(API_ENDPOINTS.cart.clear)
  },
}