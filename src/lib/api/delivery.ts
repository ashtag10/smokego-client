import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { Delivery, DeliveryStatus } from '@/lib/types/delivery'

export const deliveryApi = {
  getAvailableDeliveries: () => {
    return apiClient.get<Delivery[]>(API_ENDPOINTS.delivery.available)
  },

  getMyDeliveries: () => {
    return apiClient.get<Delivery[]>(API_ENDPOINTS.delivery.myDeliveries)
  },

  acceptDelivery: (deliveryId: string) => {
    return apiClient.post<Delivery>(API_ENDPOINTS.delivery.accept(deliveryId))
  },

  updateStatus: (deliveryId: string, status: DeliveryStatus) => {
    return apiClient.put<Delivery>(API_ENDPOINTS.delivery.status(deliveryId), { status })
  },

  getStats: () => {
    return apiClient.get<{
      totalDeliveries: number
      completedDeliveries: number
      averageTime: number
      punctualityRate: number
    }>(API_ENDPOINTS.delivery.stats)
  },

  trackDelivery: (orderId: string) => {
    return apiClient.get<{
      delivery: Delivery
      driver?: { name: string; phone: string; avatar?: string }
      statusHistory: Array<{ status: DeliveryStatus; at: string }>
    }>(API_ENDPOINTS.delivery.track(orderId))
  },
}