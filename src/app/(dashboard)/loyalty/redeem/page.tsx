'use client'

import { useRouter } from 'next/navigation'
import { useLoyalty } from '@/lib/hooks/useLoyalty'
import { RedeemPointsForm } from '@/components/loyalty/RedeemPointsForm'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { toast } from 'react-hot-toast'
import {
  ArrowLeft,
  Gift,
  Sparkles,
  Coins,
  ShieldCheck,
} from 'lucide-react'

export default function RedeemPointsPage() {
  const router = useRouter()
  const { points, redeemPoints, isLoading } = useLoyalty()

  const handleSubmit = async (pointsToRedeem: number) => {
    try {
      const result = await redeemPoints(pointsToRedeem)

      toast.success(
        `Conversion réussie ! ${pointsToRedeem} points = ${result.discount} FCFA`
      )

      router.push('/loyalty')
    } catch (error) {
      console.error('Failed to redeem points:', error)
      toast.error('Erreur lors de la conversion')
    }
  }

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (!points) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <div className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

          {/* Header skeleton */}
          <div className="h-4 w-24 rounded bg-grey-100 animate-pulse" />

          <div className="mt-6 h-12 w-72 rounded-lg bg-grey-100 animate-pulse" />

          <div className="mt-3 h-5 w-full max-w-xl rounded bg-grey-100 animate-pulse" />

          {/* Hero skeleton */}
          <div className="mt-8 h-56 rounded-3xl bg-grey-100 animate-pulse" />

          {/* Form skeleton */}
          <div className="mx-auto mt-8 max-w-2xl h-96 rounded-2xl bg-grey-100 animate-pulse" />
        </div>
      </main>
    )
  }

  /*
   * ============================================================
   * PAGE
   * ============================================================
   */

  return (
    <main className="min-h-screen bg-[#FAF9F7]">
      <div
        className="
          mx-auto
          w-full
          max-w-[1100px]
          px-3
          py-6
          sm:px-5
          sm:py-8
          lg:px-8
          lg:py-10
        "
      >

        {/* ======================================================
            RETOUR
        ======================================================= */}

        <button
          type="button"
          onClick={() => router.push('/loyalty')}
          className="
            group
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-grey-500
            transition-colors
            hover:text-[#B8860B]
          "
        >
          <ArrowLeft
            className="
              h-4
              w-4
              transition-transform
              group-hover:-translate-x-1
            "
          />

          Retour à ma fidélité
        </button>

        {/* ======================================================
            HERO
        ======================================================= */}

        <section
          className="
            relative
            mt-6
            overflow-hidden
            rounded-2xl
            bg-black-main
            px-5
            py-7
            sm:px-8
            sm:py-9
            md:rounded-3xl
            md:px-10
            md:py-10
          "
        >

          {/* Décoration haut droite */}

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

          {/* Décoration bas gauche */}

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

          {/* Décoration centrale */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-0
              right-1/3
              h-32
              w-32
              rounded-full
              bg-[#D4AF37]/5
              blur-3xl
            "
          />

          {/* Contenu */}

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-8
              md:flex-row
              md:items-center
              md:justify-between
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
                  bg-gradient-to-r
                  from-[#D4AF37]/10
                  via-[#FFF9E8]
                  to-white
                  px-3.5
                  py-2
                  shadow-[0_3px_12px_rgba(184,134,11,0.08)]
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
                    shadow-[0_2px_8px_rgba(184,134,11,0.2)]
                  "
                >
                  <Sparkles
                    className="h-3.5 w-3.5"
                    strokeWidth={2}
                  />
                </div>

                <span
                  className="
                    text-xs
                    font-semibold
                    tracking-wide
                    text-[#B8860B]
                  "
                >
                  SmokeGo Loyalty
                </span>
              </div>

              {/* Petite catégorie */}

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
                "
              >
                Transformez vos

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
                  points en avantages
                </span>
              </h1>

              <Paragraph
                className="
                  mt-5
                  max-w-xl
                  text-sm
                  leading-relaxed
                  text-white/60
                  md:text-base
                "
              >
                Utilisez vos points SmokeGo pour bénéficier
                d'une réduction sur votre prochaine commande.
              </Paragraph>
            </div>

            {/* ==================================================
                SOLDE POINTS
            =================================================== */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-3
                rounded-2xl
                border
                border-[#D4AF37]/20
                bg-white/[0.04]
                px-4
                py-4
                backdrop-blur-sm
                sm:px-5
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
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
                <Coins
                  className="h-5 w-5"
                  strokeWidth={2}
                />
              </div>

              <div>
                <p className="text-xs text-white/40">
                  Points disponibles
                </p>

                <p
                  className="
                    mt-1
                    text-2xl
                    font-semibold
                    leading-none
                    text-white
                  "
                >
                  {points.available}
                </p>
              </div>
            </div>
          </div>

          {/* Ligne dorée */}

          <div
            className="
              absolute
              bottom-0
              left-5
              right-5
              sm:left-8
              sm:right-8
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

        {/* ======================================================
            CONTENU
        ======================================================= */}

        <div className="mx-auto mt-8 max-w-2xl">

          {/* Informations */}

          <div
            className="
              mb-5
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-3
            "
          >

            {/* Points */}

            <div
              className="
                rounded-2xl
                border
                border-[#D4AF37]/15
                bg-white
                p-4
                shadow-[0_4px_20px_rgba(0,0,0,0.03)]
              "
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#D4AF37]/10
                    text-[#B8860B]
                  "
                >
                  <Coins className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs text-grey-500">
                    Disponibles
                  </p>

                  <p className="text-sm font-bold text-black-main">
                    {points.available} pts
                  </p>
                </div>

              </div>
            </div>

            {/* Total */}

            <div
              className="
                rounded-2xl
                border
                border-grey-100
                bg-white
                p-4
                shadow-[0_4px_20px_rgba(0,0,0,0.03)]
              "
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-black-main
                    text-[#D4AF37]
                  "
                >
                  <Gift className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs text-grey-500">
                    Total gagné
                  </p>

                  <p className="text-sm font-bold text-black-main">
                    {points.total} pts
                  </p>
                </div>

              </div>
            </div>

            {/* Sécurité */}

            <div
              className="
                rounded-2xl
                border
                border-grey-100
                bg-white
                p-4
                shadow-[0_4px_20px_rgba(0,0,0,0.03)]
              "
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-green-50
                    text-green-600
                  "
                >
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs text-grey-500">
                    Réduction max.
                  </p>

                  <p className="text-sm font-bold text-black-main">
                    20 %
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* ==================================================
              FORMULAIRE
          =================================================== */}

          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-[#D4AF37]/15
              bg-white
              shadow-[0_8px_30px_rgba(0,0,0,0.05)]
            "
          >

            {/* Header */}

            <div
              className="
                border-b
                border-grey-100
                bg-gradient-to-r
                from-[#FFFDF7]
                via-white
                to-white
                px-5
                py-5
                sm:px-6
              "
            >
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
                    from-[#C89B3C]
                    via-[#D4AF37]
                    to-[#B8860B]
                    text-white
                    shadow-[0_3px_12px_rgba(212,175,55,0.16)]
                  "
                >
                  <Gift
                    className="h-5 w-5"
                    strokeWidth={2}
                  />
                </div>

                <div>
                  <h2
                    className="
                      font-serif
                      text-lg
                      font-semibold
                      text-black-main
                    "
                  >
                    Convertir mes points
                  </h2>

                  <p className="mt-0.5 text-xs text-grey-500">
                    Choisissez le nombre de points à utiliser
                  </p>
                </div>

              </div>
            </div>

            {/* Formulaire */}

            <div className="p-5 sm:p-6">
              <RedeemPointsForm
                availablePoints={points.available}
                maxDiscountPercent={20}
                onSubmit={handleSubmit}
                onCancel={() => router.push('/loyalty')}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* ==================================================
              INFORMATION
          =================================================== */}

          <div
            className="
              mt-5
              rounded-2xl
              border
              border-[#D4AF37]/15
              bg-[#FFFDF7]
              p-4
              sm:p-5
            "
          >
            <div className="flex gap-3">

              <div
                className="
                  mt-0.5
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#D4AF37]/10
                  text-[#B8860B]
                "
              >
                <Sparkles className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-black-main">
                  Comment ça fonctionne ?
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-relaxed
                    text-grey-500
                  "
                >
                  Sélectionnez le nombre de points que vous
                  souhaitez convertir. La réduction obtenue sera
                  automatiquement appliquée à votre prochaine
                  commande selon les conditions du programme
                  SmokeGo Loyalty.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  )
}