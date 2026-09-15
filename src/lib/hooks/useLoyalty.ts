import { useState, useEffect } from 'react'
import { loyaltyApi } from '@/lib/api/loyalty'
import type { LoyaltyPoints, VIPStatus, LoyaltyTransaction } from '@/lib/types/loyalty'

export const useLoyalty = () => {
  const [points, setPoints] = useState<LoyaltyPoints | null>(null)
  const [history, setHistory] = useState<LoyaltyTransaction[]>([])
  const [vipStatus, setVipStatus] = useState<VIPStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPoints = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await loyaltyApi.getPoints()
      if (response.success && response.data) {
        const data = response.data as { points: LoyaltyPoints; history: LoyaltyTransaction[] }
        setPoints(data.points)
        setHistory(data.history)
      } else {
        setError(response.message || 'Erreur lors du chargement des points')
      }
    } catch (err) {
      setError('Erreur de connexion au serveur')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchVipStatus = async () => {
    try {
      const response = await loyaltyApi.getVipStatus()
      if (response.success && response.data) {
        setVipStatus(response.data as VIPStatus)
      }
    } catch (err) {
      console.error('Failed to fetch VIP status:', err)
    }
  }

  const redeemPoints = async (pointsToRedeem: number, orderId?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await loyaltyApi.redeemPoints(pointsToRedeem, orderId)
      if (response.success && response.data) {
        // Rafraîchir les données
        await fetchPoints()
        await fetchVipStatus()
        return response.data
      } else {
        setError(response.message || 'Erreur lors de la conversion des points')
        throw new Error(response.message)
      }
    } catch (err) {
      setError('Erreur de connexion au serveur')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPoints()
    fetchVipStatus()
  }, [])

  return {
    points,
    history,
    vipStatus,
    isLoading,
    error,
    fetchPoints,
    fetchVipStatus,
    redeemPoints,
  }
}