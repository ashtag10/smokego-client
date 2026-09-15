import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { User, Address, UpdateProfileData } from '@/lib/types/user'

export const usersApi = {
  getProfile: () => {
    return apiClient.get<{ user: User; addresses: Address[] }>(API_ENDPOINTS.users.profile)
  },

  updateProfile: (data: UpdateProfileData) => {
    return apiClient.put<{ user: User }>(API_ENDPOINTS.users.updateProfile, data)
  },

  getAddresses: () => {
    return apiClient.get<Address[]>(API_ENDPOINTS.users.addresses)
  },

  createAddress: (data: Omit<Address, 'id' | 'userId' | 'createdAt'>) => {
    return apiClient.post<Address>(API_ENDPOINTS.users.addresses, data)
  },

  updateAddress: (id: string, data: Partial<Address>) => {
    return apiClient.put<Address>(API_ENDPOINTS.users.address(id), data)
  },

  deleteAddress: (id: string) => {
    return apiClient.delete(API_ENDPOINTS.users.address(id))
  },

  deleteAccount: () => {
    return apiClient.delete(API_ENDPOINTS.users.account)
  },

  getStats: () => {
    return apiClient.get<{
      totalOrders: number
      totalSpent: number
      loyaltyPoints: number
      isVip: boolean
    }>(API_ENDPOINTS.users.stats)
  },
}