'use client'

import Link from 'next/link'
import {
  CalendarDays,
  Clock,
  History,
  Plus,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

import { useReservations } from '@/lib/hooks/useReservations'
import { ReservationCard } from '@/components/reservations/ReservationCard'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { toast } from 'react-hot-toast'

export default function ReservationsPage() {
  const {
    reservations,
    isLoading,
    cancelReservation,
  } = useReservations()

  /* =========================================================
     ACTIONS
  ========================================================= */

  const handleCancel = async (id: string) => {
    if (!confirm('Voulez-vous vraiment annuler cette réservation ?')) {
      return
    }

    try {
      await cancelReservation(id)

      toast.success('Réservation annulée')
    } catch (error) {
      console.error('Failed to cancel reservation:', error)

      toast.error("Erreur lors de l'annulation")
    }
  }

  const handleViewQR = (id: string) => {
    window.location.href = `/reservations/${id}`
  }

  /* =========================================================
     DATA
  ========================================================= */

  const safeReservations = Array.isArray(reservations)
    ? reservations
    : []

  const upcoming = safeReservations.filter((reservation) =>
    ['PENDING', 'CONFIRMED'].includes(reservation.status)
  )

  const past = safeReservations.filter((reservation) =>
    ['COMPLETED', 'CANCELLED', 'REJECTED'].includes(
      reservation.status
    )
  )

  const reservationCount = safeReservations.length

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <main className="min-h-screen w-full bg-[#FAF9F7]">
        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
            px-2
            py-5
            sm:px-3
            sm:py-8
            lg:px-4
            lg:py-10
          "
        >
          {/* =================================================
              HERO SKELETON
          ================================================= */}

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
            {/* Badge */}

            <div
              className="
                h-10
                w-44
                animate-pulse
                rounded-full
                bg-white/10
              "
            />

            {/* Category */}

            <div
              className="
                mt-5
                h-4
                w-28
                animate-pulse
                rounded
                bg-white/10
              "
            />

            {/* Title */}

            <div
              className="
                mt-3
                h-20
                w-72
                animate-pulse
                rounded-lg
                bg-white/10
                sm:w-96
              "
            />

            {/* Description */}

            <div
              className="
                mt-5
                h-4
                w-full
                max-w-xl
                animate-pulse
                rounded
                bg-white/10
              "
            />

            <div
              className="
                mt-2
                h-4
                w-4/5
                max-w-lg
                animate-pulse
                rounded
                bg-white/10
              "
            />

            {/* Counter */}

            <div
              className="
                mt-7
                h-14
                w-48
                animate-pulse
                rounded-xl
                bg-white/10
                lg:absolute
                lg:bottom-10
                lg:right-10
              "
            />

            {/* Gold line */}

            <div
              className="
                absolute
                bottom-0
                left-5
                right-5
                h-px
                bg-gold-main/20
                sm:left-7
                sm:right-7
                md:left-10
                md:right-10
              "
            />
          </section>

          {/* =================================================
              PAGE HEADER SKELETON
          ================================================= */}

          <div
            className="
              mb-7
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <div
                className="
                  h-7
                  w-48
                  animate-pulse
                  rounded
                  bg-grey-100
                "
              />

              <div
                className="
                  mt-2
                  h-4
                  w-64
                  animate-pulse
                  rounded
                  bg-grey-100
                "
              />
            </div>

            <div
              className="
                h-11
                w-full
                animate-pulse
                rounded-xl
                bg-grey-100
                sm:w-48
              "
            />
          </div>

          {/* =================================================
              CARDS SKELETON
          ================================================= */}

          <div className="space-y-3 sm:space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-grey-100
                  bg-white
                  p-4
                  shadow-[0_6px_25px_rgba(0,0,0,0.035)]
                  sm:p-6
                "
              >
                <div
                  className="
                    h-5
                    w-40
                    animate-pulse
                    rounded
                    bg-grey-100
                  "
                />

                <div
                  className="
                    mt-4
                    h-4
                    w-full
                    max-w-md
                    animate-pulse
                    rounded
                    bg-grey-100
                  "
                />

                <div
                  className="
                    mt-2
                    h-4
                    w-2/3
                    max-w-sm
                    animate-pulse
                    rounded
                    bg-grey-100
                  "
                />

                <div
                  className="
                    mt-5
                    h-10
                    w-32
                    animate-pulse
                    rounded-xl
                    bg-grey-100
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="min-h-screen w-full bg-[#FAF9F7]">
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-2
          py-5
          sm:px-3
          sm:py-8
          lg:px-4
          lg:py-10
        "
      >
        {/* =====================================================
            HERO — IDENTIQUE AU SHOP
        ====================================================== */}

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
          {/* =================================================
              GOLD GLOW — TOP RIGHT
          ================================================= */}

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

          {/* =================================================
              GOLD GLOW — BOTTOM LEFT
          ================================================= */}

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

          {/* =================================================
              CENTER GLOW
          ================================================= */}

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

          {/* =================================================
              HERO CONTENT
          ================================================= */}

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
            {/* =================================================
                TEXT
            ================================================= */}

            <div className="max-w-2xl">
              {/* =================================================
                  BADGE — IDENTIQUE SHOP
              ================================================= */}

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
                  SmokeGo Collection
                </span>
              </div>

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <p
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  tracking-wide
                  text-[#D4AF37]
                  sm:text-base
                "
              >
                <CalendarDays className="h-4 w-4" />

                Réservations
              </p>

              {/* =================================================
                  TITLE
              ================================================= */}

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
                Votre expérience

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
                  SmokeGo
                </span>
              </h1>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

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
                Retrouvez vos réservations, consultez vos
                prochaines visites et profitez pleinement de
                votre expérience au lounge OusmanHOOKAH.
              </Paragraph>
            </div>

            {/* =================================================
                COUNTER — IDENTIQUE SHOP
            ================================================= */}

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
                <CalendarDays
                  className="h-5 w-5"
                  strokeWidth={2}
                />
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
                  {reservationCount}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-white/40
                  "
                >
                  {reservationCount > 1
                    ? 'réservations au total'
                    : 'réservation au total'}
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              GOLD LINE — IDENTIQUE SHOP
          ================================================= */}

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

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <section className="mb-7 sm:mb-8">
          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* =================================================
                TITLE
            ================================================= */}

            <div className="flex items-center gap-3">
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
                  shadow-[0_3px_12px_rgba(212,175,55,0.14)]
                "
              >
                <CalendarDays
                  className="h-4 w-4"
                  strokeWidth={2}
                />
              </div>

              <div>
                <h2
                  className="
                    font-serif
                    text-xl
                    font-semibold
                    text-black-main
                    sm:text-2xl
                    md:text-3xl
                  "
                >
                  Mes réservations
                </h2>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-grey-500
                    sm:text-sm
                  "
                >
                  Gérez facilement vos réservations OusmanHOOKAH.
                </p>
              </div>
            </div>

            {/* =================================================
                NEW RESERVATION
            ================================================= */}

            <Link
              href="/reservations/new"
               onClick={() => console.log('🔗 Navigation vers /reservations/new')}
              className="w-full sm:w-auto"
            >
              <PrimaryButton
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-5
                  py-3
                  text-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_8px_25px_rgba(245,166,35,0.20)]
                  sm:w-auto
                "
              >
                <Plus className="h-4 w-4" />

                <span>Nouvelle réservation</span>
              </PrimaryButton>
            </Link>
          </div>
        </section>

        {/* =====================================================
            UPCOMING RESERVATIONS
        ====================================================== */}

        {upcoming.length > 0 && (
          <section className="mb-9 sm:mb-10">
            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div className="mb-4 flex items-center gap-3 sm:mb-5">
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
                  shadow-[0_3px_12px_rgba(212,175,55,0.14)]
                "
              >
                <Clock
                  className="h-4 w-4"
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
                    sm:text-xl
                  "
                >
                  À venir
                </h2>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    text-grey-500
                    sm:text-xs
                  "
                >
                  Vos prochaines expériences SmokeGo
                </p>
              </div>
            </div>

            {/* =================================================
                RESERVATION CARDS
            ================================================= */}

            <div className="space-y-3 sm:space-y-4">
              {upcoming.map((reservation) => (
                <div
                  key={reservation.id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-grey-100
                    bg-white
                    shadow-[0_5px_20px_rgba(0,0,0,0.035)]
                    transition-all
                    duration-300
                    hover:border-gold-main/20
                    hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                  "
                >
                  <ReservationCard
                    reservation={reservation}
                    onCancel={handleCancel}
                    onViewQR={handleViewQR}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
            HISTORY
        ====================================================== */}

        {past.length > 0 && (
          <section>
            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-black-main
                  text-gold-main
                  shadow-sm
                "
              >
                <History
                  className="h-4 w-4"
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
                    sm:text-xl
                  "
                >
                  Historique
                </h2>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    text-grey-500
                    sm:text-xs
                  "
                >
                  Vos anciennes réservations
                </p>
              </div>
            </div>

            {/* =================================================
                HISTORY CARDS
            ================================================= */}

            <div className="space-y-3 sm:space-y-4">
              {past.map((reservation) => (
                <div
                  key={reservation.id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-grey-100
                    bg-white
                    shadow-[0_5px_20px_rgba(0,0,0,0.03)]
                    transition-all
                    duration-300
                    hover:border-gold-main/15
                  "
                >
                  <ReservationCard
                    reservation={reservation}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
            EMPTY STATE
        ====================================================== */}

        {safeReservations.length === 0 && (
          <section
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-grey-100
              bg-white
              px-5
              py-12
              text-center
              shadow-[0_6px_25px_rgba(0,0,0,0.035)]
              sm:px-8
              sm:py-16
            "
          >
            {/* =================================================
                GOLD DECORATION — TOP RIGHT
            ================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-48
                w-48
                rounded-full
                bg-gold-main/5
                blur-3xl
              "
            />

            {/* =================================================
                GOLD DECORATION — BOTTOM LEFT
            ================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-20
                -left-20
                h-48
                w-48
                rounded-full
                bg-gold-main/5
                blur-3xl
              "
            />

            <div className="relative z-10">
              {/* =================================================
                  ICON
              ================================================= */}

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-black-main
                  text-gold-main
                  shadow-[0_8px_25px_rgba(0,0,0,0.10)]
                "
              >
                <CalendarDays
                  className="h-7 w-7"
                  strokeWidth={2}
                />
              </div>

              {/* =================================================
                  TITLE
              ================================================= */}

              <h2
                className="
                  mt-5
                  font-serif
                  text-2xl
                  font-semibold
                  text-black-main
                  sm:mt-6
                  sm:text-3xl
                "
              >
                Aucune réservation
              </h2>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-md
                  text-xs
                  leading-relaxed
                  text-grey-500
                  sm:text-sm
                "
              >
                Vous n'avez pas encore de réservation.
                Réservez maintenant votre prochaine expérience
                au lounge OusmanHOOKAH.
              </p>

              {/* =================================================
                  CTA
              ================================================= */}

              <Link
                href="/reservations/new"
                className="mt-6 inline-block sm:mt-7"
              >
                <PrimaryButton
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    px-5
                    py-3
                    text-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_8px_25px_rgba(245,166,35,0.20)]
                  "
                >
                  <Plus className="h-4 w-4" />

                  Réserver une table

                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </Link>
            </div>

            {/* =================================================
                GOLD LINE
            ================================================= */}

            <div
              className="
                absolute
                bottom-0
                left-8
                right-8
                h-px
                bg-gradient-to-r
                from-transparent
                via-[#D4AF37]/40
                to-transparent
              "
            />
          </section>
        )}
      </div>
    </main>
  )
}