import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { Slide } from '@/lib/types/slide'

export const slidesApi = {
  getActive: async () => {
    const response = await apiClient.get<any>(API_ENDPOINTS.slides.list)

    if (response.success && response.data) {
      const data = response.data
      if (Array.isArray(data)) {
        return { ...response, data: data as Slide[] }
      }
      if (data.data && Array.isArray(data.data)) {
        return { ...response, data: data.data as Slide[] }
      }
    }

    return { ...response, data: [] as Slide[] }
  },

  // Admin
  getAllAdmin: () => apiClient.get<Slide[]>(API_ENDPOINTS.slides.admin),
  create: (data: Partial<Slide>) => apiClient.post<Slide>(API_ENDPOINTS.slides.list, data),
  update: (id: string, data: Partial<Slide>) => apiClient.patch<Slide>(API_ENDPOINTS.slides.detail(id), data),
  remove: (id: string) => apiClient.delete(API_ENDPOINTS.slides.detail(id)),
}