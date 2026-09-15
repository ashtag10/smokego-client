import type { Product } from './product'
import type { Address } from './user'
import type { ProductVariant } from './product' // Ajout de l'import

export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  PREPARING = 'PREPARING',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  product: Product
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Order {
  id: string
  userId: string
  totalAmount: number
  deliveryFee: number
  discountAmount?: number
  finalAmount: number
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus
  deliveryAddressId: string
  deliveryAddress: Address
  items: OrderItem[]
  notes?: string
  createdAt: string
  updatedAt?: string
  payment?: {
    id: string
    method: string
    status: PaymentStatus
  }
  delivery?: {
    id: string
    status: string
    driver?: {
      name: string
      phone: string
    }
  }
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  variantId?: string
  variant?: ProductVariant // Utilisation de ProductVariant importé
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  discount?: number
}

export interface OrderFilters {
  status?: OrderStatus
  paymentStatus?: PaymentStatus
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}