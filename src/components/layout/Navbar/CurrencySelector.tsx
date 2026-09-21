'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/helpers'
import {
  useCurrency,
  currencies,
  type CurrencyCode,
} from '@/providers/CurrencyProvider'

export const CurrencySelector = () => {
  const [open, setOpen] = useState(false)

  const {
    currency,
    setCurrency,
    currentCurrency,
  } = useCurrency()

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Choisir la monnaie"
        className="
          flex
          h-10
          items-center
          px-2
          text-[11px]
          font-medium
          uppercase
          tracking-[0.06em]
          text-black
          transition-opacity
          hover:opacity-80
        "
      >
        {currentCurrency.code} {currentCurrency.symbol}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div
            className="
              absolute
              right-0
              top-full
              z-50
              mt-1
              w-[220px]
              border
              border-[#e5e5e5]
              bg-white
              py-[14px]
              shadow-[0_4px_18px_rgba(0,0,0,0.12)]
            "
          >
            <div
              className="
                max-h-[700px]
                overflow-y-auto
                [&::-webkit-scrollbar]:w-[6px]
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
              "
            >
              {currencies.map((item) => {
                const active = item.code === currency

                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setCurrency(item.code as CurrencyCode)
                      setOpen(false)
                    }}
                    className={cn(
                      `
                        flex
                        h-[56px]
                        w-full
                        items-center
                        justify-between
                        px-[18px]
                        text-left
                        transition-colors
                      `,
                      active
                        ? 'bg-[#f7f7f7]'
                        : 'bg-white hover:bg-[#f7f7f7]',
                    )}
                  >
                    <span
                      className={cn(
                        'text-[14px] leading-none text-[#333]',
                        active && 'font-medium text-black',
                      )}
                    >
                      {item.code} {item.symbol}
                    </span>

                    <span
                      className={cn(
                        'text-[13px] leading-none text-[#999]',
                        active && 'text-[#666]',
                      )}
                    >
                      {item.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}