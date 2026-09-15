export enum DeliveryStatus {
  ACCEPTED = 'ACCEPTED',
  PREPARING = 'PREPARING',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
}

export interface Delivery {
  id: string
  orderId: string
  driverId?: string
  status: DeliveryStatus
  zone: string
  statusHistory: Array<{
    status: DeliveryStatus
    at: string
  }>
  createdAt: string
  updatedAt?: string
}

export interface DeliveryZone {
  id: string
  name: string
  city: string
  fee: number
  isActive: boolean
  createdAt: string
  updatedAt?: string
}