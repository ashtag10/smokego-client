import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { Story } from '@/lib/types/story'

export const storiesApi = {
  getActive: async () => {
    const response = await apiClient.get<any>(API_ENDPOINTS.stories.list)

    if (response.success && response.data) {
      const data = response.data
      if (Array.isArray(data)) {
        return { ...response, data: data as Story[] }
      }
      if (data.data && Array.isArray(data.data)) {
        return { ...response, data: data.data as Story[] }
      }
    }

    return { ...response, data: [] as Story[] }
  },

  // Admin
  getAllAdmin: () => apiClient.get<Story[]>(API_ENDPOINTS.stories.admin),
  create: (data: Partial<Story>) => apiClient.post<Story>(API_ENDPOINTS.stories.list, data),
  remove: (id: string) => apiClient.delete(API_ENDPOINTS.stories.detail(id)),
}