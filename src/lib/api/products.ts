import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { Product, ProductFilters } from '@/lib/types/product'
import type { PaginatedResponse } from '@/lib/types/api'

export const productsApi = {
  /**
   * Récupère la liste des produits avec filtres
   */
  getProducts: async (filters?: ProductFilters) => {
    const params = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value))
        }
      })
    }
    
    const url = `${API_ENDPOINTS.products.list}${params.toString() ? `?${params.toString()}` : ''}`
    
    console.log('📡 API Products URL:', url)
    
    // Récupérer les données brutes
    const response = await apiClient.get<any>(url)
    
    console.log('📥 API Response brute:', response)
    
    // Normaliser la réponse en PaginatedResponse
    if (response.success && response.data) {
      const data = response.data
      
      // Structure 1: { data: [], total, page, limit, totalPages }
      if (data.data && Array.isArray(data.data)) {
        return {
          ...response,
          data: {
            data: data.data,
            total: data.total || data.data.length,
            page: data.page || 1,
            limit: data.limit || data.data.length,
            totalPages: data.totalPages || 1,
          } as PaginatedResponse<Product>
        }
      }
      
      // Structure 2: data est directement un tableau
      if (Array.isArray(data)) {
        return {
          ...response,
          data: {
            data: data,
            total: data.length,
            page: 1,
            limit: data.length,
            totalPages: 1,
          } as PaginatedResponse<Product>
        }
      }
      
      // Structure 3: { products: [], total, ... }
      if (data.products && Array.isArray(data.products)) {
        return {
          ...response,
          data: {
            data: data.products,
            total: data.total || data.products.length,
            page: data.page || 1,
            limit: data.limit || data.products.length,
            totalPages: data.totalPages || 1,
          } as PaginatedResponse<Product>
        }
      }
      
      // Structure 4: { items: [], total, ... }
      if (data.items && Array.isArray(data.items)) {
        return {
          ...response,
          data: {
            data: data.items,
            total: data.total || data.items.length,
            page: data.page || 1,
            limit: data.limit || data.items.length,
            totalPages: data.totalPages || 1,
          } as PaginatedResponse<Product>
        }
      }
      
      // Structure 5: chercher la première propriété qui est un tableau
      const keys = Object.keys(data)
      for (const key of keys) {
        if (Array.isArray(data[key]) && data[key].length > 0) {
          return {
            ...response,
            data: {
              data: data[key],
              total: data.total || data[key].length,
              page: data.page || 1,
              limit: data.limit || data[key].length,
              totalPages: data.totalPages || 1,
            } as PaginatedResponse<Product>
          }
        }
      }
      
      // Structure 6: aucun tableau trouvé, retourner un tableau vide
      return {
        ...response,
        data: {
          data: [],
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        } as PaginatedResponse<Product>
      }
    }
    
    return response as any
  },

  /**
   * Récupère les produits en vedette
   */
  getFeatured: async () => {
    const response = await apiClient.get<any>(API_ENDPOINTS.products.featured)
    
    if (response.success && response.data) {
      const data = response.data
      // Si c'est un tableau, le retourner directement
      if (Array.isArray(data)) {
        return {
          ...response,
          data: data as Product[]
        }
      }
      // Si c'est un objet avec une propriété data
      if (data.data && Array.isArray(data.data)) {
        return {
          ...response,
          data: data.data as Product[]
        }
      }
    }
    
    return response
  },

  /**
   * Récupère les produits populaires
   */
  getPopular: async () => {
    const response = await apiClient.get<any>(API_ENDPOINTS.products.popular)
    
    if (response.success && response.data) {
      const data = response.data
      if (Array.isArray(data)) {
        return {
          ...response,
          data: data as Product[]
        }
      }
      if (data.data && Array.isArray(data.data)) {
        return {
          ...response,
          data: data.data as Product[]
        }
      }
    }
    
    return response
  },

  /**
   * Récupère les nouveaux produits
   */
  getNewArrivals: async () => {
    const response = await apiClient.get<any>(API_ENDPOINTS.products.newArrivals)
    
    if (response.success && response.data) {
      const data = response.data
      if (Array.isArray(data)) {
        return {
          ...response,
          data: data as Product[]
        }
      }
      if (data.data && Array.isArray(data.data)) {
        return {
          ...response,
          data: data.data as Product[]
        }
      }
    }
    
    return response
  },

  /**
   * Recherche des produits
   */
  searchProducts: async (query: string, category?: string) => {
    const params = new URLSearchParams({ q: query })
    if (category) params.append('category', category)
    
    const url = `${API_ENDPOINTS.products.search}?${params.toString()}`
    const response = await apiClient.get<any>(url)
    
    if (response.success && response.data) {
      const data = response.data
      
      if (data.data && Array.isArray(data.data)) {
        return {
          ...response,
          data: {
            data: data.data,
            total: data.total || data.data.length,
            page: data.page || 1,
            limit: data.limit || data.data.length,
            totalPages: data.totalPages || 1,
          } as PaginatedResponse<Product>
        }
      }
      
      if (Array.isArray(data)) {
        return {
          ...response,
          data: {
            data: data,
            total: data.length,
            page: 1,
            limit: data.length,
            totalPages: 1,
          } as PaginatedResponse<Product>
        }
      }
    }
    
    return response
  },

  /**
   * Récupère un produit par son ID
   */
  getProduct: async (id: string) => {
    const response = await apiClient.get<any>(API_ENDPOINTS.products.detail(id))
    
    if (response.success && response.data) {
      const data = response.data
      // Si le produit est dans data.data
      if (data.data && typeof data.data === 'object' && !Array.isArray(data.data)) {
        return {
          ...response,
          data: data.data as Product
        }
      }
      // Si le produit est directement l'objet
      if (typeof data === 'object' && !Array.isArray(data) && data.id) {
        return {
          ...response,
          data: data as Product
        }
      }
    }
    
    return response
  },

  /**
   * Crée un nouveau produit (Admin)
   */
  createProduct: (data: Partial<Product>) => {
    return apiClient.post<Product>(API_ENDPOINTS.products.list, data)
  },

  /**
   * Met à jour un produit (Admin)
   */
  updateProduct: (id: string, data: Partial<Product>) => {
    return apiClient.put<Product>(API_ENDPOINTS.products.detail(id), data)
  },

  /**
   * Supprime un produit (Admin)
   */
  deleteProduct: (id: string) => {
    return apiClient.delete(API_ENDPOINTS.products.detail(id))
  },

  updateStock: (id: string, adjustment: number, reason?: string) => {
    return apiClient.put(API_ENDPOINTS.products.stock(id), { adjustment, reason })
  },
}