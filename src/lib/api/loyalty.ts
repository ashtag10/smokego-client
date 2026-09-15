import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { LoyaltyPoints, VIPStatus, LoyaltyTransaction } from '@/lib/types/loyalty'

export const loyaltyApi = {
  getPoints: () => {
    return apiClient.get<{
      points: LoyaltyPoints
      history: LoyaltyTransaction[]
    }>(API_ENDPOINTS.loyalty.points)
  },

  getVipStatus: () => {
    return apiClient.get<VIPStatus>(API_ENDPOINTS.loyalty.vipStatus)
  },

  redeemPoints: (points: number, orderId?: string) => {
    return apiClient.post<{
      success: boolean
      discount: number
      remainingPoints: number
    }>(API_ENDPOINTS.loyalty.redeem, { points, orderId })
  },
}