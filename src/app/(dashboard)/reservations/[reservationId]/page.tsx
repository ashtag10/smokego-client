'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Users,
  Table2,
  MessageSquare,
  QrCode,
  Sparkles,
  XCircle,
} from 'lucide-react'

import { reservationsApi } from '@/lib/api/reservations'
import { QRCodeDisplay } from '@/components/reservations/QRCodeDisplay'
import { StatusBadge } from '@/components/ui/Badge/StatusBadge'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { formatDate } from '@/lib/utils/formatters'
import { RESERVATION_STATUS_LABELS } from '@/lib/utils/constants'
import { toast } from 'react-hot-toast'

import type { Reservation } from '@/lib/types/reservation'

export default function ReservationDetailPage() {
  const params = useParams()
  const router = useRouter()

  const reservationId = params.reservationId as string

  const [reservation, setReservation] =
    useState<Reservation | null>(null)

  const [qrCode, setQrCode] = useState<{
    qrCode: string
    token: string
  } | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isCancelling, setIsCancelling] = useState(false)

  /* =========================================================
     FETCH RESERVATION
  ========================================================= */

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response =
          await reservationsApi.getReservation(reservationId)

        if (response.success && response.data) {
          setReservation(response.data)

          if (response.data.status === 'CONFIRMED') {
            const qrResponse =
              await reservationsApi.getQRCode(reservationId)

            if (qrResponse.success && qrResponse.data) {
              setQrCode(qrResponse.data)
            }
          }
        } else {
          router.push('/reservations')
        }
      } catch (error) {
        console.error(
          'Failed to fetch reservation:',
          error
        )

        router.push('/reservations')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReservation()
  }, [reservationId, router])

  /* =========================================================
     CANCEL
  ========================================================= */

  const handleCancel = async () => {
    if (
      !confirm(
        'Voulez-vous vraiment annuler cette réservation ?'
      )
    ) {
      return
    }

    setIsCancelling(true)

    try {
      const response =
        await reservationsApi.cancelReservation(
          reservationId
        )

      if (response.success && response.data) {
        setReservation(response.data)

        toast.success('Réservation annulée')
      } else {
        toast.error(
          response.message ||
            "Erreur lors de l'annulation"
        )
      }
    } catch (error) {
      console.error(error)

      toast.error('Une erreur est survenue')
    } finally {
      setIsCancelling(false)
    }
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <div
          className="
            mx-auto
            w-full
            max-w-[1200px]
            px-2
            py-8
            sm:px-3
            sm:py-10
            lg:px-4
            lg:py-12
          "
        >
          {/* Retour skeleton */}

          <div className="h-5 w-44 animate-pulse rounded bg-grey-100" />

          {/* Hero skeleton */}

          <section
            className="
              relative
              mt-6
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
            <div className="h-9 w-44 animate-pulse rounded-full bg-white/10" />

            <div className="mt-5 h-12 w-72 animate-pulse rounded-lg bg-white/10" />

            <div className="mt-4 h-4 w-full max-w-xl animate-pulse rounded bg-white/10" />

            <div className="mt-2 h-4 w-3/4 max-w-lg animate-pulse rounded bg-white/10" />

            <div className="absolute bottom-0 left-5 right-5 h-px bg-gold-main/20 sm:left-7 sm:right-7 md:left-10 md:right-10" />
          </section>

          {/* Content skeleton */}

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
            <div
              className="
                h-[520px]
                animate-pulse
                rounded-2xl
                border
                border-grey-100
                bg-white
              "
            />

            <div
              className="
                h-[420px]
                animate-pulse
                rounded-2xl
                border
                border-grey-100
                bg-white
              "
            />
          </div>
        </div>
      </main>
    )
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!reservation) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <div
          className="
            mx-auto
            flex
            min-h-[70vh]
            w-full
            max-w-[1200px]
            flex-col
            items-center
            justify-center
            px-4
            text-center
          "
        >
          <div
            className="
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
            <CalendarDays className="h-7 w-7" />
          </div>

          <h1
            className="
              mt-5
              font-serif
              text-2xl
              font-semibold
              text-black-main
            "
          >
            Réservation non trouvée
          </h1>

          <Paragraph
            muted
            className="mt-2 max-w-md"
          >
            Cette réservation n'existe plus ou n'est pas
            accessible.
          </Paragraph>

          <Link href="/reservations">
            <PrimaryButton className="mt-6 rounded-xl">
              Retour aux réservations
            </PrimaryButton>
          </Link>
        </div>
      </main>
    )
  }

  /* =========================================================
     DATA
  ========================================================= */

  const statusLabel =
    RESERVATION_STATUS_LABELS[reservation.status] ||
    reservation.status

  const canCancel = [
    'PENDING',
    'CONFIRMED',
  ].includes(reservation.status)

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#FAF9F7]">
      <div
        className="
          mx-auto
          w-full
          max-w-[1200px]
          px-2
          py-8
          sm:px-3
          sm:py-10
          lg:px-4
          lg:py-12
        "
      >
        {/* =====================================================
            RETOUR
        ====================================================== */}

        <Link
          href="/reservations"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-grey-500
            transition-colors
            hover:text-gold-main
          "
        >
          <ArrowLeft className="h-4 w-4" />

          Retour à mes réservations
        </Link>

        {/* =====================================================
            HERO — MÊME DESIGN QUE LA BOUTIQUE
        ====================================================== */}

        <section
          className="
            relative
            mt-6
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
          {/* ===================================================
              DÉCORATION HAUT DROITE
          ==================================================== */}

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

          {/* ===================================================
              DÉCORATION BAS GAUCHE
          ==================================================== */}

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

          {/* ===================================================
              DÉCORATION CENTRALE
          ==================================================== */}

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

          {/* ===================================================
              CONTENU
          ==================================================== */}

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
                TEXTE
            ================================================== */}

            <div className="max-w-2xl">
              {/* BADGE — IDENTIQUE À LA BOUTIQUE */}

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

              {/* PETITE CATÉGORIE */}

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
                <QrCode className="h-4 w-4" />

                Détail de la réservation
              </p>

              {/* TITRE */}

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
                Votre réservation

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

              {/* DESCRIPTION */}

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
                Retrouvez tous les détails de votre
                réservation et préparez votre prochaine
                expérience au lounge OusmanHOOKAH.
              </Paragraph>

              {/* IDENTIFIANT */}

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    rounded-lg
                    border
                    border-white/10
                    bg-white/[0.04]
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-white/50
                  "
                >
                  Réservation
                </span>

                <span
                  className="
                    rounded-lg
                    border
                    border-[#D4AF37]/20
                    bg-[#D4AF37]/10
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    tracking-wide
                    text-[#D4AF37]
                  "
                >
                  #{reservation.id.slice(0, 8)}
                </span>
              </div>
            </div>

            {/* =================================================
                STATUT
            ================================================== */}

            <div
              className="
                flex
                items-center
                gap-3
                self-start
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                px-4
                py-3
                backdrop-blur-sm
                lg:self-auto
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
                  shadow-[0_5px_20px_rgba(212,175,55,0.18)]
                "
              >
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/35">
                  Statut
                </p>

                <div className="mt-1">
                  <StatusBadge status={statusLabel} />
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              LIGNE DORÉE
          ==================================================== */}

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
            INFORMATIONS + QR
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[1fr_420px]
          "
        >
          {/* =================================================
              INFORMATIONS
          ================================================== */}

          <section
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-grey-100
              bg-white
              shadow-[0_6px_25px_rgba(0,0,0,0.04)]
            "
          >
            {/* Glow */}

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
              "
            />

            <div className="relative p-5 sm:p-7">
              {/* Header */}

              <div className="mb-7 flex items-center gap-3">
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
                    shadow-[0_3px_12px_rgba(212,175,55,0.14)]
                  "
                >
                  <CalendarDays className="h-5 w-5" />
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
                    Informations
                  </h2>

                  <p className="mt-0.5 text-xs text-grey-500">
                    Détails de votre réservation
                  </p>
                </div>
              </div>

              {/* Informations */}

              <div className="divide-y divide-grey-100">
                {/* DATE */}

                <div className="flex items-start gap-4 py-4 first:pt-0">
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

                  <div>
                    <p className="text-xs text-grey-400">
                      Date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-black-main">
                      {formatDate(
                        reservation.date,
                        'long'
                      )}
                    </p>
                  </div>
                </div>

                {/* HEURE */}

                <div className="flex items-start gap-4 py-4">
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
                    <p className="text-xs text-grey-400">
                      Heure
                    </p>

                    <p className="mt-1 text-sm font-semibold text-black-main">
                      {reservation.time}
                    </p>
                  </div>
                </div>

                {/* PERSONNES */}

                <div className="flex items-start gap-4 py-4">
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
                    <p className="text-xs text-grey-400">
                      Nombre de personnes
                    </p>

                    <p className="mt-1 text-sm font-semibold text-black-main">
                      {reservation.peopleCount}{' '}
                      personne
                      {reservation.peopleCount > 1
                        ? 's'
                        : ''}
                    </p>
                  </div>
                </div>

                {/* TABLE */}

                {reservation.table && (
                  <div className="flex items-start gap-4 py-4">
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
                      <Table2 className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-xs text-grey-400">
                        Table
                      </p>

                      <p className="mt-1 text-sm font-semibold text-black-main">
                        {reservation.table.name}
                      </p>

                      <p className="mt-0.5 text-xs text-grey-500">
                        Capacité :{' '}
                        {reservation.table.capacity}{' '}
                        personnes
                      </p>
                    </div>
                  </div>
                )}

                {/* MESSAGE */}

                {reservation.message && (
                  <div className="flex items-start gap-4 py-4">
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
                      <MessageSquare className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-grey-400">
                        Message
                      </p>

                      <p className="mt-1 break-words text-sm leading-relaxed text-black-main">
                        {reservation.message}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* DATE DE CRÉATION */}

              <div className="mt-5 rounded-xl bg-[#FAF9F7] p-4">
                <p className="text-xs text-grey-400">
                  Réservation créée le
                </p>

                <p className="mt-1 text-sm font-medium text-black-main">
                  {formatDate(
                    reservation.createdAt,
                    'long'
                  )}
                </p>
              </div>

              {/* ANNULATION */}

              {canCancel && (
                <div className="mt-5 border-t border-grey-100 pt-5">
                  <SecondaryButton
                    onClick={handleCancel}
                    disabled={isCancelling}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border-grey-200
                      transition-all
                      hover:border-red-200
                      hover:bg-red-50
                      hover:text-red-600
                    "
                  >
                    <XCircle className="h-4 w-4" />

                    {isCancelling
                      ? 'Annulation...'
                      : 'Annuler la réservation'}
                  </SecondaryButton>
                </div>
              )}
            </div>

            {/* Bottom line */}

            <div
              className="
                absolute
                bottom-0
                left-8
                right-8
                h-px
                bg-gradient-to-r
                from-transparent
                via-[#D4AF37]/30
                to-transparent
              "
            />
          </section>

          {/* =================================================
              QR CODE
          ================================================== */}

          {reservation.status === 'CONFIRMED' &&
          qrCode ? (
            <section
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-grey-100
                bg-white
                shadow-[0_6px_25px_rgba(0,0,0,0.04)]
              "
            >
              {/* Glow */}

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
                  bg-gold-main/10
                  blur-3xl
                "
              />

              <div className="relative p-5 sm:p-7">
                {/* Header */}

                <div className="mb-6 flex items-center gap-3">
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
                      shadow-[0_3px_12px_rgba(212,175,55,0.14)]
                    "
                  >
                    <QrCode className="h-5 w-5" />
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
                      Votre QR Code
                    </h2>

                    <p className="mt-0.5 text-xs text-grey-500">
                      Présentez-le à votre arrivée
                    </p>
                  </div>
                </div>

                {/* QR */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-gold-main/15
                    bg-[#FFFDF8]
                    p-4
                    sm:p-6
                  "
                >
                  <QRCodeDisplay
                    reservationId={reservation.id}
                    qrCodeUrl={qrCode.qrCode}
                    token={qrCode.token}
                  />
                </div>

                {/* Info */}

                <div className="mt-5 rounded-xl bg-[#FAF9F7] p-4 text-center">
                  <p className="text-xs leading-relaxed text-grey-500">
                    Conservez ce QR Code. Il pourra être
                    demandé lors de votre arrivée au
                    lounge.
                  </p>
                </div>
              </div>

              {/* Bottom line */}

              <div
                className="
                  absolute
                  bottom-0
                  left-8
                  right-8
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[#D4AF37]/30
                  to-transparent
                "
              />
            </section>
          ) : reservation.status === 'CONFIRMED' ? (
            /* =================================================
               QR EN PRÉPARATION
            ================================================== */

            <section
              className="
                relative
                flex
                min-h-[360px]
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                border
                border-grey-100
                bg-white
                p-6
                text-center
                shadow-[0_6px_25px_rgba(0,0,0,0.04)]
              "
            >
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
                "
              />

              <div className="relative">
                <div
                  className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-black-main
                    text-gold-main
                    shadow-[0_8px_25px_rgba(0,0,0,0.10)]
                  "
                >
                  <QrCode className="h-6 w-6" />
                </div>

                <h3 className="mt-5 font-serif text-xl font-semibold text-black-main">
                  QR Code en préparation
                </h3>

                <Paragraph
                  muted
                  className="mx-auto mt-2 max-w-xs"
                >
                  Votre QR Code est en cours de
                  génération. Veuillez patienter quelques
                  instants.
                </Paragraph>
              </div>

              <div
                className="
                  absolute
                  bottom-0
                  left-8
                  right-8
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[#D4AF37]/30
                  to-transparent
                "
              />
            </section>
          ) : (
            /* =================================================
               QR INDISPONIBLE
            ================================================== */

            <section
              className="
                relative
                flex
                min-h-[360px]
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                border
                border-grey-100
                bg-white
                p-6
                text-center
                shadow-[0_6px_25px_rgba(0,0,0,0.04)]
              "
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -bottom-20
                  -left-20
                  h-40
                  w-40
                  rounded-full
                  bg-gold-main/5
                  blur-3xl
                "
              />

              <div className="relative">
                <div
                  className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#FAF9F7]
                    text-gold-main
                  "
                >
                  <CalendarDays className="h-6 w-6" />
                </div>

                <h3 className="mt-5 font-serif text-xl font-semibold text-black-main">
                  QR Code indisponible
                </h3>

                <Paragraph
                  muted
                  className="mx-auto mt-2 max-w-xs"
                >
                  Le QR Code sera disponible lorsque votre
                  réservation sera confirmée.
                </Paragraph>
              </div>

              <div
                className="
                  absolute
                  bottom-0
                  left-8
                  right-8
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[#D4AF37]/30
                  to-transparent
                "
              />
            </section>
          )}
        </div>
      </div>
    </main>
  )
}