'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Download,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'

interface QRCodeDisplayProps {
  reservationId: string
  qrCodeUrl?: string
  token?: string
}

export const QRCodeDisplay = ({
  reservationId,
  qrCodeUrl,
  token,
}: QRCodeDisplayProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleDownload = async () => {
    if (!qrCodeUrl) return

    try {
      setIsLoading(true)

      const response = await fetch(qrCodeUrl)

      if (!response.ok) {
        throw new Error('Impossible de récupérer le QR Code')
      }

      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `qr-code-reservation-${reservationId}.png`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error(
        'Erreur lors du téléchargement du QR Code:',
        error
      )

      window.open(
        qrCodeUrl,
        '_blank',
        'noopener,noreferrer'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const hasQRCode = Boolean(qrCodeUrl && !imageError)

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-grey-100
        bg-white
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        transition-all
        duration-300
        hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)]
      "
    >
      {/* =====================================================
          DÉCORATIONS
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-gold-main/10
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-24
          h-64
          w-64
          rounded-full
          bg-gold-main/5
          blur-3xl
        "
      />

      {/* Ligne dorée supérieure */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          h-1
          bg-gradient-to-r
          from-gold-dark
          via-gold-main
          to-gold-dark
        "
      />

      <div className="relative z-10 p-5 sm:p-7 lg:p-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-black-main
                text-gold-main
                shadow-[0_6px_20px_rgba(0,0,0,0.12)]
              "
            >
              <QrCode className="h-5 w-5" />
            </div>

            <div>
              <Heading
                level="h5"
                className="text-base sm:text-lg"
              >
                Votre QR Code
              </Heading>

              <p className="mt-0.5 text-xs text-grey-500 sm:text-sm">
                Présentez-le à votre arrivée
              </p>
            </div>
          </div>

          {/* Badge confirmé */}

          {hasQRCode && (
            <div
              className="
                hidden
                items-center
                gap-1.5
                rounded-full
                border
                border-green-100
                bg-green-50
                px-3
                py-1.5
                sm:inline-flex
              "
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />

              <span className="text-[11px] font-semibold text-green-700">
                Confirmée
              </span>
            </div>
          )}
        </div>

        {/* =====================================================
            MOBILE STATUS
        ====================================================== */}

        {hasQRCode && (
          <div
            className="
              mt-4
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-green-100
              bg-green-50
              px-3
              py-1.5
              sm:hidden
            "
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />

            <span className="text-[11px] font-semibold text-green-700">
              Réservation confirmée
            </span>
          </div>
        )}

        {/* =====================================================
            QR CODE
        ====================================================== */}

        <div className="mt-7 flex justify-center">

          {hasQRCode ? (
            <div className="group relative">

              {/* Halo doré */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  -inset-5
                  rounded-[2rem]
                  bg-gold-main/10
                  opacity-50
                  blur-2xl
                  transition-opacity
                  duration-500
                  group-hover:opacity-80
                "
              />

              {/* Cadre extérieur */}

              <div
                className="
                  relative
                  rounded-[1.75rem]
                  border
                  border-gold-main/20
                  bg-[#FFFDF8]
                  p-3
                  shadow-[0_12px_35px_rgba(0,0,0,0.08)]
                  transition-transform
                  duration-500
                  group-hover:-translate-y-1
                "
              >

                {/* Coins décoratifs */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-3
                    h-5
                    w-5
                    border-l-2
                    border-t-2
                    border-gold-main
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-3
                    h-5
                    w-5
                    border-r-2
                    border-t-2
                    border-gold-main
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-3
                    left-3
                    h-5
                    w-5
                    border-b-2
                    border-l-2
                    border-gold-main
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-3
                    right-3
                    h-5
                    w-5
                    border-b-2
                    border-r-2
                    border-gold-main
                  "
                />

                {/* QR */}

                <div
                  className="
                    relative
                    h-60
                    w-60
                    rounded-2xl
                    bg-white
                    p-3
                    sm:h-72
                    sm:w-72
                  "
                >
                  <Image
                    src={qrCodeUrl!}
                    alt={`QR Code de la réservation ${reservationId}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 240px, 288px"
                    unoptimized
                    onError={handleImageError}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* =================================================
               QR INDISPONIBLE
            ================================================== */

            <div
              className="
                flex
                h-60
                w-60
                flex-col
                items-center
                justify-center
                rounded-[1.75rem]
                border
                border-dashed
                border-grey-200
                bg-grey-50
                sm:h-72
                sm:w-72
              "
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white
                  text-grey-400
                  shadow-sm
                "
              >
                <QrCode className="h-7 w-7" />
              </div>

              <p className="mt-4 text-sm font-semibold text-grey-500">
                QR Code non disponible
              </p>

              <p className="mt-1 max-w-[180px] text-center text-xs leading-relaxed text-grey-400">
                Veuillez réessayer plus tard.
              </p>
            </div>
          )}
        </div>

        {/* =====================================================
            IDENTIFIANT
        ====================================================== */}

        <div className="mt-6 flex justify-center">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-grey-100
              bg-[#FAF9F7]
              px-4
              py-2
            "
          >
            <span className="text-[11px] text-grey-500">
              Réservation
            </span>

            <span className="font-mono text-xs font-semibold tracking-wide text-black-main">
              #{reservationId.slice(0, 8).toUpperCase()}
            </span>
          </div>
        </div>

        {/* =====================================================
            MESSAGE
        ====================================================== */}

        <div
          className="
            mt-5
            rounded-2xl
            border
            border-gold-main/10
            bg-[#FFFDF8]
            px-4
            py-4
            text-center
          "
        >
          <div className="flex items-center justify-center gap-2">

            <Sparkles className="h-3.5 w-3.5 text-gold-main" />

            <span className="text-xs font-semibold text-black-main">
              Accès au SmokeGo Lounge
            </span>

          </div>

          <Paragraph
            className="
              mx-auto
              mt-1.5
              max-w-sm
              text-xs
              leading-relaxed
              text-grey-500
            "
          >
            Présentez ce QR Code à l'accueil du lounge
            pour confirmer votre réservation.
          </Paragraph>
        </div>

        {/* =====================================================
            TOKEN DE SÉCURITÉ
        ====================================================== */}

        {token && (
          <div
            className="
              mt-4
              rounded-2xl
              border
              border-grey-100
              bg-[#FAF9F7]
              p-4
            "
          >
            <div className="flex items-center gap-2">

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-black-main
                  text-gold-main
                "
              >
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs font-semibold text-black-main">
                  Code de sécurité
                </p>

                <p className="text-[11px] text-grey-400">
                  Identifiant sécurisé de votre réservation
                </p>
              </div>
            </div>

            <div
              className="
                mt-3
                overflow-hidden
                rounded-xl
                border
                border-grey-100
                bg-white
                px-3
                py-2.5
              "
            >
              <p
                className="
                  break-all
                  font-mono
                  text-[11px]
                  leading-relaxed
                  text-grey-500
                "
              >
                {token}
              </p>
            </div>
          </div>
        )}

        {/* =====================================================
            DOWNLOAD
        ====================================================== */}

        {hasQRCode && (
          <div className="mt-6 flex justify-center">

            <PrimaryButton
              onClick={handleDownload}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                px-6
                py-3
                text-sm
                shadow-[0_8px_25px_rgba(245,166,35,0.16)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_12px_30px_rgba(245,166,35,0.25)]
                sm:w-auto
                sm:min-w-[240px]
              "
              isLoading={isLoading}
            >
              {!isLoading && (
                <Download className="h-4 w-4" />
              )}

              {isLoading
                ? 'Téléchargement...'
                : 'Télécharger le QR Code'}
            </PrimaryButton>
          </div>
        )}

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-2
            border-t
            border-grey-100
            pt-4
          "
        >
          <ShieldCheck className="h-3.5 w-3.5 text-gold-main" />

          <p className="text-[10px] leading-relaxed text-grey-400">
            Gardez votre QR Code accessible le jour de votre réservation.
          </p>
        </div>

      </div>
    </section>
  )
}