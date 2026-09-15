import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { Payment, PaymentMethod, PaymentStatus } from '@/lib/types/payment'

export const paymentsApi = {
  initiatePayment: (orderId: string) => {
    return apiClient.post<{
      success: boolean
      paymentId: string
      merchantTransactionId: string
      transactionId: string
      paymentUrl: string
      status: PaymentStatus
    }>(API_ENDPOINTS.payments.initiate, { orderId })
  },

  getPaymentStatus: (paymentId: string) => {
    return apiClient.get<Payment>(API_ENDPOINTS.payments.status(paymentId))
  },

  refundPayment: (paymentId: string) => {
    return apiClient.post<{ message: string }>(API_ENDPOINTS.payments.refund(paymentId))
  },
}