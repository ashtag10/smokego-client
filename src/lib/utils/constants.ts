import { ProductCategory } from '@/lib/types/product'
import { OrderStatus, PaymentStatus } from '@/lib/types/order'
import { DeliveryStatus } from '@/lib/types/delivery'
import { ReservationStatus } from '@/lib/types/reservation'

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'En attente',
  [OrderStatus.ACCEPTED]: 'Acceptée',
  [OrderStatus.PREPARING]: 'En préparation',
  [OrderStatus.PICKED_UP]: 'Récupérée',
  [OrderStatus.IN_TRANSIT]: 'En route',
  [OrderStatus.DELIVERED]: 'Livrée',
  [OrderStatus.CANCELLED]: 'Annulée',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [OrderStatus.ACCEPTED]: 'bg-blue-100 text-blue-800',
  [OrderStatus.PREPARING]: 'bg-purple-100 text-purple-800',
  [OrderStatus.PICKED_UP]: 'bg-indigo-100 text-indigo-800',
  [OrderStatus.IN_TRANSIT]: 'bg-orange-100 text-orange-800',
  [OrderStatus.DELIVERED]: 'bg-green-100 text-green-800',
  [OrderStatus.CANCELLED]: 'bg-red-100 text-red-800',
}

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'En attente',
  [PaymentStatus.SUCCESS]: 'Payé',
  [PaymentStatus.FAILED]: 'Échoué',
  [PaymentStatus.REFUNDED]: 'Remboursé',
}

export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [PaymentStatus.SUCCESS]: 'bg-green-100 text-green-800',
  [PaymentStatus.FAILED]: 'bg-red-100 text-red-800',
  [PaymentStatus.REFUNDED]: 'bg-grey-100 text-grey-800',
}

export const DELIVERY_STATUS_LABELS: Record<DeliveryStatus, string> = {
  [DeliveryStatus.ACCEPTED]: 'Acceptée',
  [DeliveryStatus.PREPARING]: 'En préparation',
  [DeliveryStatus.PICKED_UP]: 'Récupérée',
  [DeliveryStatus.IN_TRANSIT]: 'En route',
  [DeliveryStatus.DELIVERED]: 'Livrée',
}

export const RESERVATION_STATUS_LABELS: Record<ReservationStatus, string> = {
  [ReservationStatus.PENDING]: 'En attente',
  [ReservationStatus.CONFIRMED]: 'Confirmée',
  [ReservationStatus.REJECTED]: 'Refusée',
  [ReservationStatus.COMPLETED]: 'Terminée',
  [ReservationStatus.CANCELLED]: 'Annulée',
}

export const RESERVATION_STATUS_COLORS: Record<ReservationStatus, string> = {
  [ReservationStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [ReservationStatus.CONFIRMED]: 'bg-green-100 text-green-800',
  [ReservationStatus.REJECTED]: 'bg-red-100 text-red-800',
  [ReservationStatus.COMPLETED]: 'bg-blue-100 text-blue-800',
  [ReservationStatus.CANCELLED]: 'bg-grey-100 text-grey-800',
}

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.CHICHA]: 'Chichas',
  [ProductCategory.SAVEUR]: 'Saveurs',
  [ProductCategory.ACCESSOIRE]: 'Accessoires',
  [ProductCategory.PACK]: 'Packs',
}

export const PRODUCT_CATEGORY_ICONS: Record<ProductCategory, string> = {
  [ProductCategory.CHICHA]: '🫧',
  [ProductCategory.SAVEUR]: '🍃',
  [ProductCategory.ACCESSOIRE]: '🔧',
  [ProductCategory.PACK]: '📦',
}