'use client'

import { useRouter } from 'next/navigation'
import {
  Crown,
  Sparkles,
  Coins,
  ArrowRight,
  History,
  Gift,
} from 'lucide-react'

import { useLoyalty } from '@/lib/hooks/useLoyalty'
import { VIPStatusCard } from '@/components/loyalty/VIPStatusCard'
import { PointsHistory } from '@/components/loyalty/PointsHistory'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'

export default function LoyaltyPage() {
  const router = useRouter()
  const { points, history, vipStatus, isLoading } = useLoyalty()

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
            px-2
            py-8
            sm:px-3
            sm:py-10
            lg:px-4
            lg:py-12
          "
        >
          {/* Hero skeleton */}
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              bg-black-main
              px-5
              py-8
              sm:px-7
              sm:py-9
              md:rounded-3xl
              md:px-10
              md:py-10
            "
          >
            <div className="animate-pulse space-y-5">
              <div className="h-7 w-40 rounded-full bg-white/10" />
              <div className="h-4 w-24 rounded bg-white/10" />
              <div className="h-14 w-72 rounded bg-white/10" />
              <div className="h-4 w-full max-w-xl rounded bg-white/10" />
            </div>
          </div>

          {/* Content skeleton */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="h-72 animate-pulse rounded-2xl bg-grey-100 lg:col-span-2" />
            <div className="h-72 animate-pulse rounded-2xl bg-grey-100" />
          </div>

          <div className="mt-8 h-80 animate-pulse rounded-2xl bg-grey-100" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAF9F7]">
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-2
          py-8
          sm:px-3
          sm:py-10
          lg:px-4
          lg:py-12
        "
      >
        {/* =========================================================
            HERO — SMOKEGO LOYALTY
        ========================================================= */}
        <section
          className="
            relative
            mb-9
            overflow-hidden
            rounded-2xl
            bg-black-main
            px-5
            py-8
            sm:px-7
            sm:py-9
            md:mb-10
            md:rounded-3xl
            md:px-10
            md:py-10
          "
        >
          {/* Décorations dorées */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-72
              w-72
              rounded-full
              bg-[#D4AF37]/10
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-40
              -left-32
              h-80
              w-80
              rounded-full
              bg-[#D4AF37]/5
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-0
              right-1/4
              h-36
              w-36
              rounded-full
              bg-[#D4AF37]/5
              blur-3xl
            "
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-8
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            {/* Texte */}
            <div className="max-w-2xl">
              {/* Badge */}
              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2.5
                  rounded-full
                  border
                  border-[#D4AF37]/25
                  bg-[#D4AF37]/10
                  px-3.5
                  py-2
                "
              >
                <div
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-[#C89B3C]
                    via-[#D4AF37]
                    to-[#B8860B]
                    text-white
                  "
                >
                  <Crown className="h-3.5 w-3.5" strokeWidth={2} />
                </div>

                <span
                  className="
                    text-xs
                    font-semibold
                    tracking-wide
                    text-[#D4AF37]
                  "
                >
                  SmokeGo Privilege
                </span>
              </div>

              {/* Catégorie */}
              <p
                className="
                  mb-2
                  text-sm
                  font-medium
                  tracking-wide
                  text-[#D4AF37]
                  sm:text-base
                "
              >
                Programme fidélité
              </p>

              {/* Titre */}
              <h1
                className="
                  font-serif
                  text-3xl
                  font-semibold
                  leading-[1.05]
                  tracking-tight
                  text-white
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                "
              >
                Votre fidélité

                <span
                  className="
                    mt-1
                    block
                    bg-gradient-to-r
                    from-[#B8860B]
                    via-[#D4AF37]
                    to-[#C89B3C]
                    bg-clip-text
                    text-transparent
                  "
                >
                  récompensée
                </span>
              </h1>

              <Paragraph
                className="
                  mt-5
                  max-w-xl
                  text-sm
                  leading-relaxed
                  text-black
                  md:text-base
                "
              >
                Accumulez des points, profitez de privilèges exclusifs
                et faites évoluer votre statut au sein de l'expérience
                SmokeGo.
              </Paragraph>
            </div>

            {/* Résumé points */}
            {points && (
              <div
                className="
                  flex
                  items-center
                  gap-3
                  self-start
                  lg:self-auto
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-[#C89B3C]
                    via-[#D4AF37]
                    to-[#B8860B]
                    text-white
                    shadow-[0_5px_20px_rgba(212,175,55,0.18)]
                  "
                >
                  <Coins className="h-5 w-5" strokeWidth={2} />
                </div>

                <div>
                  <p
                    className="
                      text-2xl
                      font-semibold
                      leading-none
                      text-white
                    "
                  >
                    {points.available}
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    points disponibles
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Ligne dorée */}
          <div
            className="
              absolute
              bottom-0
              left-5
              right-5
              sm:left-7
              sm:right-7
              md:left-10
              md:right-10
            "
          >
            <div
              className="
                h-px
                bg-gradient-to-r
                from-transparent
                via-[#D4AF37]/50
                to-transparent
              "
            />
          </div>
        </section>

        {/* =========================================================
            STATUT VIP + POINTS
        ========================================================= */}
        <section className="mb-10">
          <div
            className="
              mb-5
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-[#C89B3C]
                via-[#D4AF37]
                to-[#B8860B]
                text-white
                shadow-[0_3px_12px_rgba(212,175,55,0.16)]
              "
            >
              <Sparkles className="h-4 w-4" strokeWidth={2} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-black-main">
                Vos privilèges
              </h2>

              <p className="mt-0.5 text-xs text-grey-500">
                Votre statut et vos avantages SmokeGo
              </p>
            </div>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-6
              lg:grid-cols-3
            "
          >
            {/* VIP */}
            {vipStatus && (
              <div className="lg:col-span-2">
                <VIPStatusCard
                  status={vipStatus}
                  onRedeem={() => router.push('/loyalty/redeem')}
                />
              </div>
            )}

            {/* Points */}
            {points && (
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#D4AF37]/15
                  bg-white
                  p-6
                  shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                "
              >
                {/* Décoration */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-12
                    -top-12
                    h-32
                    w-32
                    rounded-full
                    bg-[#D4AF37]/5
                    blur-2xl
                  "
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#B8860B]">
                        Solde actuel
                      </p>

                      <h3 className="mt-2 font-serif text-xl text-black-main">
                        Mes points
                      </h3>
                    </div>

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#D4AF37]/10
                        text-[#B8860B]
                      "
                    >
                      <Coins className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-6">
                    <p
                      className="
                        bg-gradient-to-r
                        from-[#B8860B]
                        via-[#D4AF37]
                        to-[#C89B3C]
                        bg-clip-text
                        text-4xl
                        font-bold
                        text-transparent
                      "
                    >
                      {points.available}
                    </p>

                    <p className="mt-1 text-sm text-grey-500">
                      {points.total} points cumulés
                    </p>
                  </div>

                  {points.available > 0 && (
                    <PrimaryButton
                      onClick={() => router.push('/loyalty/redeem')}
                      className="mt-6 w-full"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Utiliser mes points
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </PrimaryButton>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================
            STATISTIQUES
        ========================================================= */}
        {points && (
          <section className="mb-10">
            <div
              className="
                grid
                grid-cols-1
                overflow-hidden
                rounded-2xl
                border
                border-[#D4AF37]/15
                bg-white
                shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                sm:grid-cols-3
              "
            >
              {/* Disponibles */}
              <div
                className="
                  relative
                  p-5
                  sm:p-6
                  sm:border-r
                  sm:border-grey-100
                "
              >
                <p className="text-xs uppercase tracking-wide text-grey-500">
                  Disponibles
                </p>

                <p className="mt-2 text-2xl font-bold text-[#B8860B]">
                  {points.available}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  <span className="text-xs text-grey-500">
                    Prêts à être utilisés
                  </span>
                </div>
              </div>

              {/* Utilisés */}
              <div
                className="
                  p-5
                  sm:p-6
                  sm:border-r
                  sm:border-grey-100
                "
              >
                <p className="text-xs uppercase tracking-wide text-grey-500">
                  Utilisés
                </p>

                <p className="mt-2 text-2xl font-bold text-black-main">
                  {points.used}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-grey-400" />
                  <span className="text-xs text-grey-500">
                    Points convertis
                  </span>
                </div>
              </div>

              {/* Expirés */}
              <div className="p-5 sm:p-6">
                <p className="text-xs uppercase tracking-wide text-grey-500">
                  Expirés
                </p>

                <p className="mt-2 text-2xl font-bold text-grey-400">
                  {points.expired}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-grey-300" />
                  <span className="text-xs text-grey-500">
                    Points expirés
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            HISTORIQUE
        ========================================================= */}
        <section>
          <div
            className="
              mb-5
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[#D4AF37]/20
                bg-white
                text-[#D4AF37]
                shadow-sm
              "
            >
              <History className="h-4 w-4" strokeWidth={2} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-black-main">
                Historique de fidélité
              </h2>

              <p className="mt-0.5 text-xs text-grey-500">
                Retrouvez toutes vos transactions de points
              </p>
            </div>
          </div>

          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-[#D4AF37]/15
              bg-white
              shadow-[0_4px_20px_rgba(0,0,0,0.04)]
            "
          >
            <PointsHistory transactions={history} />
          </div>
        </section>

        {/* =========================================================
            CALL TO ACTION
        ========================================================= */}
        {points && points.available > 0 && (
          <section
            className="
              relative
              mt-10
              overflow-hidden
              rounded-2xl
              border
              border-[#D4AF37]/20
              bg-gradient-to-r
              from-[#FFF9E8]
              via-white
              to-[#FFF9E8]
              p-6
              sm:p-8
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-16
                -top-16
                h-40
                w-40
                rounded-full
                bg-[#D4AF37]/10
                blur-3xl
              "
            />

            <div
              className="
                relative
                flex
                flex-col
                gap-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-[#C89B3C]
                    via-[#D4AF37]
                    to-[#B8860B]
                    text-white
                    shadow-[0_4px_15px_rgba(212,175,55,0.18)]
                  "
                >
                  <Gift className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-serif text-lg text-black-main">
                    Vos points vous attendent
                  </h3>

                  <p className="mt-1 max-w-xl text-sm text-grey-600">
                    Transformez vos points en avantages exclusifs et
                    profitez pleinement de l'expérience SmokeGo.
                  </p>
                </div>
              </div>

              <PrimaryButton
                onClick={() => router.push('/loyalty/redeem')}
                className="shrink-0"
              >
                Découvrir mes récompenses
              </PrimaryButton>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}