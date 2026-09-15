'use client'

import {
  Coins,
  TrendingUp,
  Gift,
  Clock3,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from 'lucide-react'

import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { formatDate } from '@/lib/utils/formatters'
import type { LoyaltyPoints, LoyaltyTransaction } from '@/lib/types/loyalty'

interface PointsDisplayProps {
  points: LoyaltyPoints
  history: LoyaltyTransaction[]
  onRedeem?: () => void
}

export const PointsDisplay = ({
  points,
  history,
  onRedeem,
}: PointsDisplayProps) => {
  const redeemablePoints = points.available

  return (
    <div className="space-y-6">

      {/* =========================
          CARTE PRINCIPALE DES POINTS
      ========================== */}
      <div
        className="
          relative overflow-hidden
          bg-white
          rounded-2xl
          border border-grey-100
          shadow-sm
          p-6
          transition-all
          duration-300
          hover:shadow-md
          hover:border-gold-main/30
        "
      >
        {/* Décoration */}
        <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-gold-main/5" />
        <div className="absolute -right-6 -bottom-16 w-40 h-40 rounded-full bg-gold-main/5" />

        <div className="relative">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <div
                  className="
                    w-10 h-10
                    rounded-xl
                    bg-gold-light
                    flex items-center justify-center
                  "
                >
                  <Coins className="w-5 h-5 text-gold-main" />
                </div>

                <div>
                  <Heading level="h5">
                    Mes points fidélité
                  </Heading>

                  <p className="text-xs text-grey-500 mt-0.5">
                    Profitez de vos récompenses SmokeGo
                  </p>
                </div>
              </div>
            </div>

            <Sparkles className="w-5 h-5 text-gold-main" />
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            {/* Total */}
            <div
              className="
                group
                rounded-xl
                bg-grey-50
                border border-transparent
                p-4
                transition-all
                duration-300
                hover:bg-gold-light/30
                hover:border-gold-main/20
              "
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-grey-500">
                  Total
                </p>

                <TrendingUp
                  className="
                    w-4 h-4
                    text-grey-400
                    group-hover:text-gold-main
                    transition-colors
                  "
                />
              </div>

              <p className="text-2xl font-bold text-black-main">
                {points.total}
              </p>
            </div>

            {/* Disponibles */}
            <div
              className="
                group
                rounded-xl
                bg-gold-light/30
                border border-gold-main/10
                p-4
                transition-all
                duration-300
                hover:bg-gold-light/50
                hover:border-gold-main/30
              "
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gold-dark">
                  Disponibles
                </p>

                <Gift
                  className="
                    w-4 h-4
                    text-gold-main
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </div>

              <p className="text-2xl font-bold text-gold-main">
                {points.available}
              </p>
            </div>

            {/* Utilisés */}
            <div
              className="
                group
                rounded-xl
                bg-grey-50
                border border-transparent
                p-4
                transition-all
                duration-300
                hover:bg-grey-100
              "
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-grey-500">
                  Utilisés
                </p>

                <ArrowDownRight className="w-4 h-4 text-grey-400" />
              </div>

              <p className="text-2xl font-bold text-grey-600">
                {points.used}
              </p>
            </div>

            {/* Expirés */}
            <div
              className="
                group
                rounded-xl
                bg-grey-50
                border border-transparent
                p-4
                transition-all
                duration-300
                hover:bg-grey-100
              "
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-grey-500">
                  Expirés
                </p>

                <Clock3 className="w-4 h-4 text-grey-400" />
              </div>

              <p className="text-2xl font-bold text-grey-400">
                {points.expired}
              </p>
            </div>
          </div>

          {/* Conversion */}
          {redeemablePoints > 0 && onRedeem && (
            <div
              className="
                mt-6
                pt-5
                border-t border-grey-100
                flex flex-col sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
              "
            >
              <div>
                <p className="text-sm font-medium text-black-main">
                  Vous avez des points disponibles
                </p>

                <p className="text-xs text-grey-500 mt-1">
                  Utilisez-les pour obtenir une récompense.
                </p>
              </div>

              <PrimaryButton
                onClick={onRedeem}
                className="
                  text-sm
                  px-5
                  py-2.5
                  transition-all
                  duration-300
                  hover:bg-gradient-to-r
                  hover:from-[#C9A94E]
                  hover:via-[#D4AF37]
                  hover:to-[#B8963E]
                  hover:text-white
                  hover:shadow-[0_8px_25px_rgba(212,175,55,0.28)]
                  hover:scale-[1.02]
                "
              >
                <Gift className="w-4 h-4 mr-2" />
                Convertir mes points ({redeemablePoints})
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          HISTORIQUE
      ========================== */}
      {history.length > 0 && (
        <div
          className="
            bg-white
            rounded-2xl
            border border-grey-100
            p-6
            shadow-sm
            transition-all
            duration-300
            hover:shadow-md
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <Heading level="h5">
                Historique des points
              </Heading>

              <p className="text-xs text-grey-500 mt-1">
                Vos dernières activités de fidélité
              </p>
            </div>

            <div
              className="
                w-9 h-9
                rounded-lg
                bg-gold-light
                flex items-center justify-center
              "
            >
              <Coins className="w-4 h-4 text-gold-main" />
            </div>
          </div>

          {/* Transactions */}
          <div className="space-y-1">
            {history.slice(0, 10).map((transaction) => {
              const isEarn = transaction.type === 'EARN'
              const isRedeem = transaction.type === 'REDEEM'

              return (
                <div
                  key={transaction.id}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    gap-4
                    py-3
                    px-3
                    rounded-xl
                    transition-all
                    duration-200
                    hover:bg-gold-light/20
                  "
                >
                  {/* Infos */}
                  <div className="flex items-center gap-3 min-w-0">

                    <div
                      className={`
                        w-9 h-9
                        rounded-full
                        flex
                        items-center
                        justify-center
                        flex-shrink-0
                        ${
                          isEarn
                            ? 'bg-green-50 text-green-600'
                            : isRedeem
                            ? 'bg-red-50 text-red-600'
                            : 'bg-grey-100 text-grey-500'
                        }
                      `}
                    >
                      {isEarn ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : isRedeem ? (
                        <ArrowDownRight className="w-4 h-4" />
                      ) : (
                        <Coins className="w-4 h-4" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-black-main truncate">
                        {transaction.description}
                      </p>

                      <p className="text-xs text-grey-500 mt-0.5">
                        {formatDate(transaction.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Points */}
                  <span
                    className={`
                      flex-shrink-0
                      inline-flex
                      items-center
                      gap-1
                      px-2.5
                      py-1
                      rounded-full
                      text-sm
                      font-semibold
                      ${
                        isEarn
                          ? 'text-green-600 bg-green-50'
                          : isRedeem
                          ? 'text-red-600 bg-red-50'
                          : 'text-grey-500 bg-grey-100'
                      }
                    `}
                  >
                    {isEarn && '+'}
                    {transaction.points}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Aucun historique */}
      {history.length === 0 && (
        <div
          className="
            bg-white
            rounded-2xl
            border border-grey-100
            p-8
            text-center
            shadow-sm
          "
        >
          <div
            className="
              w-14 h-14
              mx-auto
              rounded-full
              bg-gold-light
              flex
              items-center
              justify-center
              mb-4
            "
          >
            <Coins className="w-7 h-7 text-gold-main" />
          </div>

          <Heading level="h5">
            Aucun historique
          </Heading>

          <p className="text-sm text-grey-500 mt-2">
            Vos activités de fidélité apparaîtront ici.
          </p>
        </div>
      )}
    </div>
  )
}