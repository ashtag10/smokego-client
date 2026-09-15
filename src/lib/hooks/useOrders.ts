import { useState, useEffect } from 'react'
import { ordersApi } from '@/lib/api/orders'
import type { Order, OrderFilters } from '@/lib/types/order'
import type { PaginatedResponse } from '@/lib/types/api'

export const useOrders = (initialFilters?: OrderFilters) => {
  const [orders, setOrders] = useState<Order[]>([]) // ✅ Toujours un tableau
  const [pagination, setPagination] = useState<PaginatedResponse<Order> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<OrderFilters>(initialFilters || {})

  const fetchOrders = async (newFilters?: OrderFilters) => {
    const currentFilters = newFilters || filters
    setIsLoading(true)
    setError(null)

    try {
      const response = await ordersApi.getMyOrders(currentFilters)
      if (response.success && response.data) {
        const data = response.data as PaginatedResponse<Order>
        setOrders(data.data || []) // ✅ Toujours un tableau
        setPagination(data)
      } else {
        setOrders([]) // ✅ Tableau vide en cas d'erreur
        setError(response.message || 'Erreur lors du chargement des commandes')
      }
    } catch (err) {
      setOrders([]) // ✅ Tableau vide en cas d'erreur
      setError('Erreur de connexion au serveur')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFilters = (newFilters: Partial<OrderFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    fetchOrders(updatedFilters)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return {
    orders, 
    pagination,
    isLoading,
    error,
    filters,
    updateFilters,
    refetch: fetchOrders,
  }
}