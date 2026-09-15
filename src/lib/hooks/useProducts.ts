import { useState, useEffect } from 'react'
import { productsApi } from '@/lib/api/products'
import type { Product, ProductFilters } from '@/lib/types/product'
import type { PaginatedResponse } from '@/lib/types/api'

export const useProducts = (initialFilters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<PaginatedResponse<Product> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ProductFilters>(initialFilters || {})

  const fetchProducts = async (newFilters?: ProductFilters) => {
    const currentFilters = newFilters || filters
    setIsLoading(true)
    setError(null)

    try {
      const response = await productsApi.getProducts(currentFilters)
      
      console.log('📦 useProducts - Réponse brute:', JSON.stringify(response, null, 2))

      if (response.success && response.data) {
        const data = response.data as any
        
        // ✅ EXTRAIRE LE TABLEAU DE PRODUITS
        let productList: Product[] = []
        let paginationData: PaginatedResponse<Product> | null = null

        // CAS 1: data.data est un tableau (structure paginée)
        if (data.data && Array.isArray(data.data)) {
          productList = data.data
          paginationData = {
            data: data.data,
            total: data.total || data.data.length,
            page: data.page || 1,
            limit: data.limit || data.data.length,
            totalPages: data.totalPages || 1,
          }
        }
        // CAS 2: data est directement un tableau
        else if (Array.isArray(data)) {
          productList = data
          paginationData = {
            data: data,
            total: data.length,
            page: 1,
            limit: data.length,
            totalPages: 1,
          }
        }
        // CAS 3: data.products est un tableau
        else if (data.products && Array.isArray(data.products)) {
          productList = data.products
          paginationData = {
            data: data.products,
            total: data.total || data.products.length,
            page: data.page || 1,
            limit: data.limit || data.products.length,
            totalPages: data.totalPages || 1,
          }
        }
        // CAS 4: chercher la première propriété qui est un tableau
        else {
          const keys = Object.keys(data)
          for (const key of keys) {
            if (Array.isArray(data[key]) && data[key].length > 0) {
              productList = data[key]
              paginationData = {
                data: data[key],
                total: data.total || data[key].length,
                page: data.page || 1,
                limit: data.limit || data[key].length,
                totalPages: data.totalPages || 1,
              }
              break
            }
          }
        }

        console.log('✅ useProducts - Produits extraits:', productList)
        console.log('📊 useProducts - Pagination:', paginationData)

        setProducts(productList)
        setPagination(paginationData)
      } else {
        setProducts([])
        setPagination(null)
        setError(response.message || 'Erreur lors du chargement des produits')
      }
    } catch (err) {
      setProducts([])
      setPagination(null)
      setError('Erreur de connexion au serveur')
      console.error('❌ useProducts - Erreur:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    fetchProducts(updatedFilters)
  }

  const resetFilters = () => {
    setFilters({})
    fetchProducts({})
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return {
    products,
    pagination,
    isLoading,
    error,
    filters,
    updateFilters,
    resetFilters,
    refetch: fetchProducts,
  }
}