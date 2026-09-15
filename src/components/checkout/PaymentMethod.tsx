'use client'

import { useState } from 'react'
import { Check, CreditCard, Smartphone, ArrowLeft } from 'lucide-react'

import { cn } from '@/lib/utils/helpers'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'
import type { PaymentMethod as PaymentMethodType } from '@/lib/types/payment'

interface PaymentMethodProps {
  onSelect: (method: PaymentMethodType) => void
  onBack: () => void
  isLoading?: boolean
}

const methods = [
  {
    id: 'MTN_MOMO' as PaymentMethodType,
    name: 'MTN Mobile Money',
    shortName: 'MTN MoMo',
    description: 'Paiement rapide et sécurisé via MTN MoMo',
    initials: 'MTN',
    icon: Smartphone,
  },
  {
    id: 'ORANGE_MONEY' as PaymentMethodType,
    name: 'Orange Money',
    shortName: 'Orange Money',
    description: 'Paiement rapide et sécurisé via Orange Money',
    initials: 'OM',
    icon: Smartphone,
  },
]

export const PaymentMethod = ({
  onSelect,
  onBack,
  isLoading = false,
}: PaymentMethodProps) => {
  const [selected, setSelected] =
    useState<PaymentMethodType | null>(null)

  const handleSubmit = () => {
    if (selected) {
      onSelect(selected)
    }
  }

  return (
    <div className="space-y-6">

      {/* =========================
          HEADER
      ========================== */}
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-[#FFF9E8]
            to-[#F5E8BD]
          "
        >
          <CreditCard
            className="h-5 w-5 text-[#B8860B]"
            strokeWidth={1.8}
          />
        </div>

        <div>
          <h3 className="text-base font-semibold text-black-main">
            Choisissez votre moyen de paiement
          </h3>

          <p className="mt-0.5 text-xs text-grey-500">
            Sélectionnez votre mode de paiement préféré
          </p>
        </div>
      </div>

      {/* =========================
          PAYMENT METHODS
      ========================== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {methods.map((method) => {
          const Icon = method.icon
          const isSelected = selected === method.id

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelected(method.id)}
              className={cn(
                `
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  p-5
                  text-left
                  transition-all
                  duration-300
                  focus:outline-none
                `,
                isSelected
                  ? `
                      border-[#D4AF37]
                      bg-gradient-to-br
                      from-[#FFFDF7]
                      via-[#FFF9E8]
                      to-[#FDF5DC]
                      shadow-[0_8px_25px_rgba(212,175,55,0.14)]
                    `
                  : `
                      border-grey-200
                      bg-white
                      hover:border-[#D4AF37]/50
                      hover:bg-[#FFFCF7]
                      hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)]
                    `
              )}
            >
              {/* Ligne dorée */}
              <div
                className={cn(
                  `
                    absolute
                    left-0
                    top-0
                    h-full
                    w-[3px]
                    rounded-r-full
                    bg-gradient-to-b
                    from-[#C89B3C]
                    via-[#D4AF37]
                    to-[#B8860B]
                    transition-opacity
                    duration-300
                  `,
                  isSelected
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-50'
                )}
              />

              {/* Check */}
              {isSelected && (
                <div
                  className="
                    absolute
                    right-4
                    top-4
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-[#C89B3C]
                    to-[#B8860B]
                    text-white
                    shadow-sm
                  "
                >
                  <Check
                    className="h-3.5 w-3.5"
                    strokeWidth={3}
                  />
                </div>
              )}

              <div className="flex items-center gap-4">

                {/* Logo / initiales */}
                <div
                  className={cn(
                    `
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      text-sm
                      font-bold
                      transition-all
                      duration-300
                    `,
                    isSelected
                      ? `
                          bg-gradient-to-br
                          from-[#C89B3C]
                          via-[#D4AF37]
                          to-[#B8860B]
                          text-white
                          shadow-[0_5px_15px_rgba(212,175,55,0.22)]
                        `
                      : `
                          bg-[#FFF9E8]
                          text-[#B8860B]
                          group-hover:bg-[#F5E8BD]
                        `
                  )}
                >
                  <div className="flex flex-col items-center">
                    <Icon className="mb-0.5 h-5 w-5" />
                    <span className="text-[9px] tracking-wide">
                      {method.initials}
                    </span>
                  </div>
                </div>

                {/* Informations */}
                <div className="min-w-0 pr-6">
                  <h4
                    className={cn(
                      'text-sm font-semibold transition-colors duration-200',
                      isSelected
                        ? 'text-[#9A7200]'
                        : 'text-black-main group-hover:text-[#B8860B]'
                    )}
                  >
                    {method.name}
                  </h4>

                  <p className="mt-1 text-xs leading-relaxed text-grey-500">
                    {method.description}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* =========================
          SECURE PAYMENT INFO
      ========================== */}
      <div
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-[#D4AF37]/10
          bg-[#FFFCF7]
          px-4
          py-3
        "
      >
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#D4AF37]/10
          "
        >
          <CreditCard
            className="h-4 w-4 text-[#B8860B]"
            strokeWidth={1.8}
          />
        </div>

        <p className="text-xs leading-relaxed text-grey-500">
          Votre paiement est traité de manière sécurisée.
          Aucune information bancaire n'est stockée par OusmanHOOKAH.
        </p>
      </div>

      {/* =========================
          ACTIONS
      ========================== */}
      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-[#D4AF37]/10
          pt-5
          sm:flex-row
        "
      >
        <SecondaryButton
          type="button"
          onClick={onBack}
          className="
            w-full
            py-3
            transition-all
            duration-300
            hover:border-[#D4AF37]/40
            hover:bg-[#FFF9E8]
            hover:text-[#B8860B]
            sm:w-auto
          "
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </SecondaryButton>

        <PrimaryButton
          type="button"
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={!selected}
          className="
            w-full
            py-3
            transition-all
            duration-300

            hover:scale-[1.01]

            hover:bg-gradient-to-r
            hover:from-[#C9A94E]
            hover:via-[#D4AF37]
            hover:to-[#B8963E]

            hover:text-white

            hover:shadow-[0_8px_25px_rgba(212,175,55,0.28)]

            active:scale-[0.99]

            disabled:cursor-not-allowed
            disabled:hover:scale-100
            disabled:hover:shadow-none

            sm:w-auto
          "
        >
          Payer maintenant
        </PrimaryButton>
      </div>
    </div>
  )
}