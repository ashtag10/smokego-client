export enum PaymentMethod {
  MTN_MOMO = 'MTN_MOMO',
  ORANGE_MONEY = 'ORANGE_MONEY',
  CARD = 'CARD',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface Payment {
  id: string
  orderId: string
  method: PaymentMethod
  transactionId?: string
  idempotencyKey: string
  status: PaymentStatus
  amount: number
  rawResponse?: Record<string, any>
  createdAt: string
  updatedAt?: string
}