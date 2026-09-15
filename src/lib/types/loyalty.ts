export enum LoyaltyTransactionType {
  EARN = 'EARN',
  REDEEM = 'REDEEM',
  EXPIRE = 'EXPIRE',
}

export interface LoyaltyPoints {
  total: number
  available: number
  used: number
  expired: number
}

export interface LoyaltyTransaction {
  id: string
  userId: string
  points: number
  type: LoyaltyTransactionType
  description: string
  orderId?: string
  expiresAt?: string
  createdAt: string
}

export interface VIPStatus {
  isVip: boolean
  vipSince?: string
  amountSpentLast90Days: number
  vipThreshold: number
  progressPercent: number
  remainingToVip: number
  benefits: string[]
}