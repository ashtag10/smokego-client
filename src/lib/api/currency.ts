import { apiClient } from './client'
import type { CurrencyCode } from '@/providers/CurrencyProvider'

export interface CurrencyRatesResponse {
  base: 'XAF'
  rates: Record<CurrencyCode, number>
  updatedAt: string | null
  source: string
}

export async function getCurrencyRates(): Promise<CurrencyRatesResponse> {
  const response = await apiClient.get<CurrencyRatesResponse>(
    '/currency/rates',
  )

  if (!response.success || !response.data) {
    throw new Error(
      response.message || 'Impossible de récupérer les taux de change',
    )
  }

  return response.data
}