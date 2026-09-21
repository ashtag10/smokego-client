import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { CategoryMenuNode, Category } from '@/lib/types/category'

export const categoriesApi = {
  /**
   * Arbre de catégories (parent + enfants) pour le mega-menu / menu hamburger
   */
  getMenu: async () => {
    const response = await apiClient.get<any>(API_ENDPOINTS.categories.menu)

    if (response.success && response.data) {
      const data = response.data
      if (Array.isArray(data)) {
        return { ...response, data: data as CategoryMenuNode[] }
      }
      if (data.data && Array.isArray(data.data)) {
        return { ...response, data: data.data as CategoryMenuNode[] }
      }
    }

    return { ...response, data: [] as CategoryMenuNode[] }
  },

  /**
   * Récupère une catégorie par son slug, avec ses sous-catégories,
   * pour la page /shop/c/[slug]
   */
  getBySlug: async (slug: string) => {
    const response = await apiClient.get<any>(API_ENDPOINTS.categories.bySlug(slug))

    if (response.success && response.data) {
      const data = response.data

      // La catégorie est dans data.data
      if (data.data && typeof data.data === 'object' && !Array.isArray(data.data)) {
        return {
          ...response,
          data: data.data as Category,
        }
      }

      // La catégorie est directement l'objet
      if (typeof data === 'object' && !Array.isArray(data) && data.id) {
        return {
          ...response,
          data: data as Category,
        }
      }
    }

    return response as any
  },

  // Admin
  getAll: () => apiClient.get<Category[]>(API_ENDPOINTS.categories.list),
  create: (data: Partial<Category>) => apiClient.post<Category>(API_ENDPOINTS.categories.list, data),
  update: (id: string, data: Partial<Category>) => apiClient.patch<Category>(API_ENDPOINTS.categories.detail(id), data),
  remove: (id: string) => apiClient.delete(API_ENDPOINTS.categories.detail(id)),
}