import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { Order, OrderFilters } from '@/lib/types/order'
import type { PaginatedResponse } from '@/lib/types/api' 

export const ordersApi = {
  getMyOrders: (filters?: OrderFilters) => {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value))
        }
      })
    }
    const url = `${API_ENDPOINTS.orders.list}${params.toString() ? `?${params.toString()}` : ''}`
    return apiClient.get<PaginatedResponse<Order>>(url)
  },

  getOrder: (id: string) => {
    return apiClient.get<Order>(API_ENDPOINTS.orders.detail(id))
  },

  checkout: (data: { addressId: string; notes?: string }) => {
    return apiClient.post<Order>(API_ENDPOINTS.orders.checkout, data)
  },

  cancelOrder: (id: string) => {
    return apiClient.post<Order>(API_ENDPOINTS.orders.cancel(id))
  },

  repeatOrder: (id: string) => {
    return apiClient.post<Order>(API_ENDPOINTS.orders.repeat(id))
  },
}