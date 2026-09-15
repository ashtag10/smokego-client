import type { User } from './user'
import type { Product } from './product'

export interface Review {
  id: string
  userId: string
  productId: string
  rating: number
  content: string
  user: {
    id: string
    name: string
    avatarUrl?: string
  }
  product?: Product
  createdAt: string
  updatedAt?: string
}

export interface CreateReviewData {
  productId: string
  rating: number
  content: string
}

export interface ReviewFilters {
  productId?: string
  userId?: string
  rating?: number
  page?: number
  limit?: number
}