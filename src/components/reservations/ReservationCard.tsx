import Link from 'next/link'
import {
  CalendarDays,
  Clock3,
  Users,
  Armchair,
  QrCode,
  Eye,
  XCircle,
  ChevronRight,
} from 'lucide-react'

import { formatDate } from '@/lib/utils/formatters'
import { StatusBadge } from '@/components/ui/Badge/StatusBadge'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'
import { RESERVATION_STATUS_LABELS } from '@/lib/utils/constants'
import type { Reservation } from '@/lib/types/reservation'

interface ReservationCardProps {
  reservation: Reservation
  onCancel?: (id: string) => void
  onViewQR?: (id: string) => void
}

export const ReservationCard = ({
  reservation,
  onCancel,
  onViewQR,
}: ReservationCardProps) => {
  const statusLabel =
    RESERVATION_STATUS_LABELS[reservation.status] ||
    reservation.status

  const isUpcoming = ['PENDING', 'CONFIRMED'].includes(
    reservation.status
  )

  const canCancel = ['PENDING', 'CONFIRMED'].includes(
    reservation.status
  )

  const isConfirmed = reservation.status === 'CONFIRMED'
  const isPending = reservation.status === 'PENDING'

  return (
    <article
      className="
        group
        relative
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
      {/* =====================================================
          GOLD TOP LINE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          left-0
          right-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-gold-main/50
          to-transparent
        "
      />

      {/* =====================================================
          SUBTLE DECORATION
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-gold-main/5
          blur-3xl
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative p-5 sm:p-6">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >
          {/* =================================================
              INFORMATIONS PRINCIPALES
          ================================================== */}

          <div className="min-w-0 flex-1">

            {/* ID + STATUS */}

            <div className="flex flex-wrap items-center gap-2">

              <span
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-wide
                  text-grey-400
                "
              >
                Réservation
              </span>

              <span
                className="
                  text-xs
                  font-semibold
                  tracking-wide
                  text-black-main
                "
              >
                #{reservation.id.slice(0, 8).toUpperCase()}
              </span>

              <StatusBadge status={statusLabel} />
            </div>

            {/* =================================================
                INFORMATIONS
            ================================================== */}

            <div
              className="
                mt-5
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >

              {/* DATE */}

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
                    bg-[#FAF9F7]
                    text-gold-main
                  "
                >
                  <CalendarDays className="h-4 w-4" />
                </div>

                <div className="min-w-0">

                  <p
                    className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.08em]
                      text-grey-400
                    "
                  >
                    Date
                  </p>

                  <p
                    className="
                      mt-1
                      truncate
                      text-sm
                      font-semibold
                      capitalize
                      text-black-main
                    "
                  >
                    {formatDate(
                      reservation.date,
                      'long'
                    )}
                  </p>

                </div>
              </div>

              {/* HEURE */}

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
                    bg-[#FAF9F7]
                    text-gold-main
                  "
                >
                  <Clock3 className="h-4 w-4" />
                </div>

                <div>

                  <p
                    className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.08em]
                      text-grey-400
                    "
                  >
                    Heure
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-semibold
                      text-black-main
                    "
                  >
                    {reservation.time}
                  </p>

                </div>
              </div>

              {/* PARTICIPANTS */}

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
                    bg-[#FAF9F7]
                    text-gold-main
                  "
                >
                  <Users className="h-4 w-4" />
                </div>

                <div>

                  <p
                    className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.08em]
                      text-grey-400
                    "
                  >
                    Participants
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-semibold
                      text-black-main
                    "
                  >
                    {reservation.peopleCount}{' '}
                    {reservation.peopleCount > 1
                      ? 'personnes'
                      : 'personne'}
                  </p>

                </div>
              </div>

              {/* TABLE */}

              {reservation.table && (
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
                      bg-[#FAF9F7]
                      text-gold-main
                    "
                  >
                    <Armchair className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">

                    <p
                      className="
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.08em]
                        text-grey-400
                      "
                    >
                      Table
                    </p>

                    <p
                      className="
                        mt-1
                        truncate
                        text-sm
                        font-semibold
                        text-black-main
                      "
                    >
                      {reservation.table.name}
                    </p>

                  </div>
                </div>
              )}

            </div>
          </div>

          {/* =================================================
              QR CODE
          ================================================== */}

          {isConfirmed && onViewQR && (
            <button
              type="button"
              onClick={() => onViewQR(reservation.id)}
              aria-label="Voir le QR Code"
              className="
                group/qr
                flex
                w-full
                shrink-0
                items-center
                gap-3
                rounded-xl
                border
                border-gold-main/15
                bg-[#FFFDF8]
                p-3
                text-left
                transition-all
                duration-300
                hover:border-gold-main/35
                hover:bg-gold-main/5
                sm:w-auto
                sm:min-w-[170px]
              "
            >

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
                  shadow-[0_3px_12px_rgba(212,175,55,0.18)]
                  transition-transform
                  duration-300
                  group-hover/qr:scale-105
                "
              >
                <QrCode className="h-5 w-5" />
              </div>

              <div className="min-w-0">

                <p
                  className="
                    text-xs
                    font-semibold
                    text-black-main
                  "
                >
                  QR Code
                </p>

                <p
                  className="
                    mt-0.5
                    text-[10px]
                    leading-relaxed
                    text-grey-500
                  "
                >
                  Présenter à l'arrivée
                </p>

              </div>

              <ChevronRight
                className="
                  ml-auto
                  h-4
                  w-4
                  shrink-0
                  text-gold-main
                  transition-transform
                  duration-300
                  group-hover/qr:translate-x-0.5
                "
              />

            </button>
          )}

        </div>

        {/* =====================================================
            SEPARATOR
        ====================================================== */}

        <div
          className="
            my-5
            h-px
            bg-gradient-to-r
            from-grey-100
            via-grey-100
            to-transparent
          "
        />

        {/* =====================================================
            ACTIONS
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
          "
        >

          {/* VOIR DETAILS */}

          <Link
            href={`/reservations/${reservation.id}`}
            className="flex-1"
          >
            <PrimaryButton
              className="
                flex
                w-full
                items-center
                gap-2
                rounded-xl
                px-4
                py-2.5
                text-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_8px_25px_rgba(212,175,55,0.20)]
              "
            >

              <Eye className="h-4 w-4" />

              <span>
                Voir les détails
              </span>

              <ChevronRight
                className="
                  ml-auto
                  h-4
                  w-4
                "
              />

            </PrimaryButton>
          </Link>

          {/* ANNULER */}

          {isUpcoming &&
            canCancel &&
            onCancel && (
              <SecondaryButton
                type="button"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-grey-200
                  px-5
                  py-2.5
                  text-sm
                  text-grey-500
                  transition-all
                  duration-300
                  hover:border-red-200
                  hover:bg-red-50
                  hover:text-red-600
                "
                onClick={() =>
                  onCancel(reservation.id)
                }
              >
                <XCircle className="h-4 w-4" />

                Annuler
              </SecondaryButton>
            )}

        </div>

        {/* =====================================================
            STATUS MESSAGE
        ====================================================== */}

        {isConfirmed && (
          <div
            className="
              mt-4
              flex
              items-center
              gap-2.5
              rounded-xl
              border
              border-green-100
              bg-green-50/70
              px-3.5
              py-2.5
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                animate-pulse
                rounded-full
                bg-green-500
              "
            />

            <p
              className="
                text-xs
                font-medium
                text-green-700
              "
            >
              Votre réservation est confirmée
            </p>

          </div>
        )}

        {isPending && (
          <div
            className="
              mt-4
              flex
              items-center
              gap-2.5
              rounded-xl
              border
              border-amber-100
              bg-amber-50/70
              px-3.5
              py-2.5
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                animate-pulse
                rounded-full
                bg-amber-500
              "
            />

            <p
              className="
                text-xs
                font-medium
                text-amber-700
              "
            >
              Votre réservation est en attente de confirmation
            </p>

          </div>
        )}

      </div>
    </article>
  )
}