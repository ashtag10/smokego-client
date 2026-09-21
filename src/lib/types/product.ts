export enum ProductCategory {
  CHICHA = 'CHICHA',
  SAVEUR = 'SAVEUR',
  ACCESSOIRE = 'ACCESSOIRE',
  PACK = 'PACK',
}

export enum Intensity {
  LIGHT = 'LIGHT',
  MEDIUM = 'MEDIUM',
  STRONG = 'STRONG',
}

export interface ProductVariant {
  id: string
  name: string
  price: number
  stock: number
  attributes?: Record<string, string>
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  promoPrice?: number
  promoStart?: string
  promoEnd?: string
  category: ProductCategory
  brand?: string
  images: string[]
  stock: number
  isFeatured: boolean
  isPopular: boolean
  isActive: boolean
  intensity?: Intensity
  variants?: ProductVariant[]
  createdAt: string
  updatedAt?: string
  // Aggregated
  averageRating?: number
  reviewsCount?: number
}

export interface ProductFilters {
  category?: ProductCategory
  brand?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  sortBy?: 'price_asc' | 'price_desc' | 'popularity' | 'newest'
  page?: number
  limit?: number
  skip?: number
  take?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}