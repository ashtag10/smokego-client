import { useState, useEffect } from 'react'
import { reservationsApi } from '@/lib/api/reservations'
import type { Reservation, Table } from '@/lib/types/reservation'

export const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [tables, setTables] = useState<Table[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchReservations = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await reservationsApi.getMyReservations()
      if (response.success && response.data) {
        setReservations(response.data as Reservation[])
      } else {
        setError(response.message || 'Erreur lors du chargement des réservations')
      }
    } catch (err) {
      setError('Erreur de connexion au serveur')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTables = async () => {
    try {
      const response = await reservationsApi.getTables()
      if (response.success && response.data) {
        setTables(response.data as Table[])
      }
    } catch (err) {
      console.error('Failed to fetch tables:', err)
    }
  }

  const createReservation = async (data: Omit<Reservation, 'id' | 'status' | 'userId' | 'createdAt' | 'qrCodeToken'>) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await reservationsApi.createReservation(data)
      if (response.success && response.data) {
        const newReservation = response.data as Reservation
        setReservations(prev => [newReservation, ...prev])
        return newReservation
      } else {
        setError(response.message || 'Erreur lors de la création de la réservation')
        throw new Error(response.message)
      }
    } catch (err) {
      setError('Erreur de connexion au serveur')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const cancelReservation = async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await reservationsApi.cancelReservation(id)
      if (response.success && response.data) {
        const updated = response.data as Reservation
        setReservations(prev => prev.map(r => r.id === id ? updated : r))
        return updated
      } else {
        setError(response.message || 'Erreur lors de l\'annulation')
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
    fetchReservations()
    fetchTables()
  }, [])

  return {
    reservations,
    tables,
    isLoading,
    error,
    fetchReservations,
    createReservation,
    cancelReservation,
  }
}
