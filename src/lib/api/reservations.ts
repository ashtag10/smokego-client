import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { Reservation, ReservationStatus, Table } from '@/lib/types/reservation'

export const reservationsApi = {
  getMyReservations: () => {
    return apiClient.get<Reservation[]>(API_ENDPOINTS.reservations.list)
  },

  createReservation: (data: Omit<Reservation, 'id' | 'status' | 'userId' | 'createdAt' | 'qrCodeToken'>) => {
    return apiClient.post<Reservation>(API_ENDPOINTS.reservations.create, data)
  },

  getReservation: (id: string) => {
    return apiClient.get<Reservation>(API_ENDPOINTS.reservations.detail(id))
  },

  cancelReservation: (id: string) => {
    return apiClient.post<Reservation>(API_ENDPOINTS.reservations.cancel(id))
  },

  getQRCode: (id: string) => {
    return apiClient.get<{ qrCode: string; token: string }>(API_ENDPOINTS.reservations.qrCode(id))
  },

  getTables: () => {
    return apiClient.get<Table[]>(API_ENDPOINTS.reservations.tables)
  },
}