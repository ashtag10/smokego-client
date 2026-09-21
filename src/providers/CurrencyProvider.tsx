'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  getCurrencyRates,
} from '@/lib/api/currency'

export type CurrencyCode =
  | 'AED'
  | 'AUD'
  | 'CAD'
  | 'CHF'
  | 'DKK'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'NOK'
  | 'NZD'
  | 'PLN'
  | 'SEK'
  | 'USD'
  | 'XAF'

export interface Currency {
  code: CurrencyCode
  symbol: string
  name: string
}

export const currencies: Currency[] = [
  { code: 'AED', symbol: 'د.إ', name: 'AED' },
  { code: 'AUD', symbol: '$', name: 'AUD' },
  { code: 'CAD', symbol: '$', name: 'CAD' },
  { code: 'CHF', symbol: 'CHF', name: 'CHF' },
  { code: 'DKK', symbol: 'kr', name: 'DKK' },
  { code: 'EUR', symbol: '€', name: 'EUR' },
  { code: 'GBP', symbol: '£', name: 'GBP' },
  { code: 'JPY', symbol: '¥', name: 'JPY' },
  { code: 'NOK', symbol: 'kr', name: 'NOK' },
  { code: 'NZD', symbol: '$', name: 'NZD' },
  { code: 'PLN', symbol: 'zł', name: 'PLN' },
  { code: 'SEK', symbol: 'kr', name: 'SEK' },
  { code: 'USD', symbol: '$', name: 'USD' },
  { code: 'XAF', symbol: 'FCFA', name: 'XAF' },
]

interface CurrencyContextValue {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
  currentCurrency: Currency
  rates: Record<string, number>
  loading: boolean
  convertFromXAF: (amount: number) => number
  formatPrice: (amount: number) => string
}

const CurrencyContext =
  createContext<CurrencyContextValue | null>(null)

export function CurrencyProvider({
  children,
}: {
  children: ReactNode
}) {
  const [currency, setCurrencyState] =
    useState<CurrencyCode>('XAF')

  const [rates, setRates] =
    useState<Record<string, number>>({
      XAF: 1,
    })

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const saved =
      localStorage.getItem(
        'ousmane-chicha-currency',
      ) as CurrencyCode | null

    if (
      saved &&
      currencies.some(
        (item) => item.code === saved,
      )
    ) {
      setCurrencyState(saved)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadRates() {
      try {
        setLoading(true)

        const data =
          await getCurrencyRates()

        if (!cancelled) {
          setRates(data.rates)
        }
      } catch (error) {
        console.error(
          'Impossible de récupérer les taux de change:',
          error,
        )
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadRates()

    return () => {
      cancelled = true
    }
  }, [])

  const setCurrency = (
    value: CurrencyCode,
  ) => {
    setCurrencyState(value)

    localStorage.setItem(
      'ousmane-chicha-currency',
      value,
    )
  }

  const currentCurrency = useMemo(
    () =>
      currencies.find(
        (item) =>
          item.code === currency,
      ) ?? currencies.find(
        (item) => item.code === 'XAF',
      )!,
    [currency],
  )

  const convertFromXAF = (
    amount: number,
  ) => {
    const rate = rates[currency] ?? 1

    return amount * rate
  }

  const formatPrice = (
    amount: number,
  ) => {
    const converted =
      convertFromXAF(amount)

    return new Intl.NumberFormat(
      'fr-FR',
      {
        minimumFractionDigits:
          currency === 'XAF' ? 0 : 2,

        maximumFractionDigits:
          currency === 'XAF' ? 0 : 2,
      },
    ).format(converted) +
      ` ${currentCurrency.symbol}`
  }

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currentCurrency,
        rates,
        loading,
        convertFromXAF,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context =
    useContext(CurrencyContext)

  if (!context) {
    throw new Error(
      'useCurrency doit être utilisé à l’intérieur de CurrencyProvider',
    )
  }

  return context
}