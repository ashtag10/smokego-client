import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { Review, CreateReviewData, ReviewFilters } from '@/lib/types/review'
import type { PaginatedResponse } from '@/lib/types/api'

export const reviewsApi = {
  getProductReviews: (productId: string, filters?: ReviewFilters) => {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value))
        }
      })
    }
    const url = `${API_ENDPOINTS.reviews.list(productId)}${params.toString() ? `?${params.toString()}` : ''}`
    return apiClient.get<PaginatedResponse<Review>>(url)
  },

  createReview: (data: CreateReviewData) => {
    return apiClient.post<Review>(API_ENDPOINTS.reviews.create, data)
  },

  deleteReview: (id: string) => {
    return apiClient.delete(API_ENDPOINTS.reviews.delete(id))
  },
}