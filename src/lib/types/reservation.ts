export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Reservation {
  id: string
  userId: string
  date: string
  time: string
  peopleCount: number
  tableId?: string
  table?: Table
  message?: string
  status: ReservationStatus
  qrCodeToken?: string
  checkedInAt?: string
  createdAt: string
  updatedAt?: string
}

export interface Table {
  id: string
  name: string
  capacity: number
  isActive: boolean
  createdAt: string
  updatedAt?: string
}