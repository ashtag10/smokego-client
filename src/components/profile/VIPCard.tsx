'use client'

import {
  Crown,
  Sparkles,
  Gift,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react'

import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { calculateProgress } from '@/lib/utils/helpers'
import type { VIPStatus } from '@/lib/types/loyalty'

interface VIPCardProps {
  vipStatus: VIPStatus
  onLearnMore?: () => void
}

export const VIPCard = ({ vipStatus, onLearnMore }: VIPCardProps) => {
  const progress = calculateProgress(
    vipStatus.amountSpentLast90Days,
    vipStatus.vipThreshold
  )

  /* =========================
     MEMBRE VIP
  ========================== */
  if (vipStatus.isVip) {
    return (
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          bg-gradient-to-br
          from-[#D4AF37]
          via-[#C9A94E]
          to-[#A67C24]
          p-6 md:p-7
          text-white
          shadow-lg
          shadow-gold-main/20
        "
      >
        {/* Décorations */}
        <div
          className="
            absolute
            -top-20
            -right-20
            w-52
            h-52
            rounded-full
            bg-white/10
          "
        />

        <div
          className="
            absolute
            -bottom-24
            -left-16
            w-56
            h-56
            rounded-full
            bg-black/5
          "
        />

        <Sparkles className="absolute top-5 right-20 w-5 h-5 text-white/40" />
        <Sparkles className="absolute bottom-8 right-8 w-3 h-3 text-white/30" />

        <div className="relative">

          {/* Header */}
          <div className="flex items-start justify-between gap-4">

            <div className="flex items-center gap-3">
              <div
                className="
                  w-12 h-12
                  rounded-xl
                  bg-white/15
                  backdrop-blur-sm
                  border border-white/20
                  flex
                  items-center
                  justify-center
                "
              >
                <Crown className="w-6 h-6 text-white" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                  OusmanHOOKAH 
                </p>

                <Heading
                  level="h3"
                  className="text-white mt-0.5"
                >
                  Statut VIP
                </Heading>
              </div>
            </div>

            <div
              className="
                inline-flex
                items-center
                gap-1.5
                px-3
                py-1.5
                rounded-full
                bg-white/15
                border
                border-white/20
                backdrop-blur-sm
                text-xs
                font-semibold
              "
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              VIP
            </div>
          </div>

          {/* Message */}
          <div className="mt-6 max-w-xl">
            <Paragraph className="text-white/90">
              Vous bénéficiez des avantages exclusifs réservés
              aux membres VIP SmokeGo.
            </Paragraph>
          </div>

          {/* VIP depuis */}
          {vipStatus.vipSince && (
            <div className="flex items-center gap-2 mt-4 text-sm text-white/75">
              <Crown className="w-4 h-4" />

              <span>
                VIP depuis le{' '}
                {new Date(vipStatus.vipSince).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}

          {/* Actions */}
          {onLearnMore && (
            <div className="mt-6">
              <PrimaryButton
                onClick={onLearnMore}
                className="
                  inline-flex
                  items-center
                  bg-white
                  text-gold-dark
                  border-0
                  shadow-sm
                  transition-all
                  duration-300
                   text-black
                  hover:text-gold-main
                  hover:shadow-lg
                  hover:scale-[1.02]
                "
              >
                <Gift className="w-4 h-4 mr-2" />
                Voir les avantages
                <ArrowRight className="w-4 h-4 ml-2" />
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    )
  }

  /* =========================
     PAS ENCORE VIP
  ========================== */

  return (
    <div
      className="
        relative
        overflow-hidden
        bg-white
        rounded-2xl
        border border-grey-100
        p-6 md:p-7
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
        hover:border-gold-main/30
      "
    >
      {/* Décoration */}
      <div
        className="
          absolute
          -top-16
          -right-16
          w-40
          h-40
          rounded-full
          bg-gold-main/5
        "
      />

      <div className="relative">

        {/* Header */}
        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div
              className="
                w-11 h-11
                rounded-xl
                bg-gold-light
                flex
                items-center
                justify-center
              "
            >
              <Crown className="w-5 h-5 text-gold-main" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-grey-400">
                Programme fidélité
              </p>

              <Heading level="h4" className="mt-0.5">
                Devenez VIP
              </Heading>
            </div>

          </div>

          <Star className="w-5 h-5 text-gold-main" />
        </div>

        {/* Description */}
        <Paragraph className="text-grey-600 mt-5">
          Dépensez{' '}
          <span className="font-semibold text-black-main">
            {vipStatus.vipThreshold.toLocaleString()} FCFA
          </span>{' '}
          en 90 jours pour débloquer votre statut VIP.
        </Paragraph>

        {/* Progression */}
        <div className="mt-6">

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-grey-500">
                Déjà dépensé
              </p>

              <p className="text-xl font-bold text-black-main mt-0.5">
                {vipStatus.amountSpentLast90Days.toLocaleString()} FCFA
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-grey-500">
                Objectif
              </p>

              <p className="text-sm font-semibold text-gold-main mt-0.5">
                {vipStatus.vipThreshold.toLocaleString()} FCFA
              </p>
            </div>
          </div>

          {/* Barre */}
          <div className="mt-3">

            <div
              className="
                relative
                w-full
                h-3
                bg-grey-100
                rounded-full
                overflow-hidden
              "
            >
              <div
                className="
                  relative
                  h-full
                  bg-gradient-to-r
                  from-[#C9A94E]
                  via-[#D4AF37]
                  to-[#B8963E]
                  rounded-full
                  transition-all
                  duration-700
                  ease-out
                "
                style={{
                  width: `${Math.min(Math.max(progress, 0), 100)}%`,
                }}
              >
                <div
                  className="
                    absolute
                    inset-y-0
                    right-0
                    w-10
                    bg-white/20
                    blur-sm
                  "
                />
              </div>
            </div>

            {/* Pourcentage */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-grey-500">
                Progression
              </span>

              <span className="text-xs font-semibold text-gold-main">
                {Math.min(Math.round(progress), 100)}%
              </span>
            </div>
          </div>

          {/* Message */}
          <div
            className="
              flex
              items-center
              gap-2
              mt-4
              px-3
              py-2.5
              rounded-xl
              bg-gold-light/30
              border border-gold-main/10
            "
          >
            <Sparkles className="w-4 h-4 text-gold-main flex-shrink-0" />

            <p className="text-sm text-grey-600">
              {vipStatus.remainingToVip > 0 ? (
                <>
                  Encore{' '}
                  <span className="font-semibold text-gold-dark">
                    {vipStatus.remainingToVip.toLocaleString()} FCFA
                  </span>{' '}
                  à dépenser pour devenir VIP.
                </>
              ) : (
                <span className="font-medium text-gold-dark">
                  Félicitations ! Vous êtes éligible au statut VIP.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* CTA */}
        {onLearnMore && (
          <div className="mt-5 pt-5 border-t border-grey-100">
            <PrimaryButton
              onClick={onLearnMore}
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
              <Crown className="w-4 h-4 mr-2" />
              Découvrir les avantages VIP
              <ArrowRight className="w-4 h-4 ml-2" />
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  )
}