'use client'

import { useEffect, useState } from 'react'
import {
  Phone,
  UserRound,
  Truck,
  ShieldCheck,
} from 'lucide-react'

import { deliveryApi } from '@/lib/api/delivery'
import { OrderStatusTimeline } from './OrderStatusTimeline'

import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'

import { formatPhone } from '@/lib/utils/formatters'

import type {
  Delivery,
  DeliveryStatus,
} from '@/lib/types/delivery'

interface OrderTrackingProps {
  orderId: string
}

export const OrderTracking = ({
  orderId,
}: OrderTrackingProps) => {
  const [tracking, setTracking] = useState<{
    delivery: Delivery
    driver?: {
      name: string
      phone: string
      avatar?: string
    }
    statusHistory: Array<{
      status: DeliveryStatus
      at: string
    }>
  } | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const response = await deliveryApi.trackDelivery(orderId)

        if (response.success && response.data) {
          setTracking(response.data)
        }
      } catch (error) {
        console.error(
          'Failed to fetch tracking:',
          error
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchTracking()
  }, [orderId])

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return (
      <div className="space-y-6">

        {/* Header skeleton */}
        <div className="space-y-2">
          <div className="h-6 w-48 animate-pulse rounded-lg bg-grey-100" />
          <div className="h-3 w-64 animate-pulse rounded bg-grey-50" />
        </div>

        {/* Driver skeleton */}
        <div
          className="
            rounded-2xl
            border
            border-grey-100
            bg-white
            p-5
          "
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 animate-pulse rounded-full bg-grey-100" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-grey-100" />
              <div className="h-3 w-24 animate-pulse rounded bg-grey-50" />
            </div>
          </div>
        </div>

        {/* Timeline skeleton */}
        <div
          className="
            rounded-2xl
            border
            border-grey-100
            bg-white
            p-6
          "
        >
          <div className="mb-6 h-5 w-48 animate-pulse rounded bg-grey-100" />

          <div className="space-y-7">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4"
              >
                <div className="h-10 w-10 animate-pulse rounded-full bg-grey-100" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-36 animate-pulse rounded bg-grey-100" />
                  <div className="h-3 w-24 animate-pulse rounded bg-grey-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // =====================================================
  // NO TRACKING
  // =====================================================

  if (!tracking) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-grey-100
          bg-white
          px-6
          py-10
          text-center
          shadow-[0_4px_20px_rgba(0,0,0,0.03)]
        "
      >
        <div
          className="
            mx-auto
            mb-4
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-[#FFF9E8]
          "
        >
          <Truck
            className="h-7 w-7 text-[#B8860B]"
            strokeWidth={1.7}
          />
        </div>

        <p className="font-medium text-black-main">
          Suivi indisponible
        </p>

        <Paragraph
          muted
          className="mx-auto mt-1 max-w-sm text-sm"
        >
          Le suivi de cette livraison n'est pas encore
          disponible. Veuillez réessayer dans quelques instants.
        </Paragraph>
      </div>
    )
  }

  const {
    delivery,
    driver,
    statusHistory,
  } = tracking

  // =====================================================
  // TRACKING
  // =====================================================

  return (
    <div className="space-y-6">

      {/* =================================================
          LIVREUR
      ================================================== */}

      {driver && (
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-[#D4AF37]/20
            bg-gradient-to-br
            from-[#FFFDF8]
            via-white
            to-[#FFF9E8]/50
            p-5
            shadow-[0_5px_20px_rgba(0,0,0,0.035)]
            transition-all
            duration-300
            hover:border-[#D4AF37]/35
            hover:shadow-[0_8px_25px_rgba(212,175,55,0.08)]
          "
        >
          {/* Accent doré */}
          <div
            className="
              absolute
              left-0
              top-0
              h-full
              w-[3px]
              bg-gradient-to-b
              from-[#C9A94E]
              via-[#D4AF37]
              to-[#B8963E]
            "
          />

          {/* Header */}
          <div className="flex items-center justify-between gap-3">

            <div className="flex items-center gap-2.5">

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#FFF9E8]
                "
              >
                <Truck
                  className="h-4.5 w-4.5 text-[#B8860B]"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-black-main">
                  Votre livreur
                </p>

                <p className="text-[11px] text-grey-500">
                  Livreur assigné à votre commande
                </p>
              </div>
            </div>

            {/* Badge */}
            <span
              className="
                hidden
                items-center
                gap-1.5
                rounded-full
                border
                border-emerald-100
                bg-emerald-50
                px-2.5
                py-1
                text-[10px]
                font-semibold
                text-emerald-600
                sm:inline-flex
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Assigné
            </span>
          </div>

          {/* Driver info */}
          <div
            className="
              mt-5
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex items-center gap-3.5">

              {/* Avatar */}
              <div
                className="
                  relative
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  bg-gradient-to-br
                  from-[#C9A94E]
                  via-[#D4AF37]
                  to-[#B8963E]
                  text-lg
                  font-bold
                  text-white
                  shadow-[0_5px_15px_rgba(212,175,55,0.20)]
                "
              >
                {driver.avatar ? (
                  <img
                    src={driver.avatar}
                    alt={driver.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  driver.name
                    .charAt(0)
                    .toUpperCase()
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold text-black-main">
                  {driver.name}
                </p>

                <div className="mt-1 flex items-center gap-1.5 text-sm text-grey-500">
                  <Phone className="h-3.5 w-3.5 text-[#B8860B]" />
                  {formatPhone(driver.phone)}
                </div>
              </div>
            </div>

            {/* Call button */}
            <a
              href={`tel:${driver.phone}`}
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-[#D4AF37]/40
                bg-white
                px-4
                py-2.5
                text-sm
                font-medium
                text-[#B8860B]
                transition-all
                duration-300
                hover:border-[#D4AF37]
                hover:bg-[#FFF9E8]
                hover:shadow-[0_5px_18px_rgba(212,175,55,0.12)]
                sm:w-auto
              "
            >
              <Phone className="h-4 w-4" />
              Appeler
            </a>
          </div>

          {/* Secure info */}
          <div
            className="
              mt-4
              flex
              items-center
              gap-2
              border-t
              border-[#D4AF37]/10
              pt-4
            "
          >
            <ShieldCheck
              className="h-3.5 w-3.5 shrink-0 text-[#B8860B]"
              strokeWidth={1.8}
            />

            <p className="text-[11px] text-grey-500">
              Vos informations sont protégées et utilisées
              uniquement pour la livraison.
            </p>
          </div>
        </div>
      )}

      {/* =================================================
          TIMELINE
      ================================================== */}

      <div
        className="
          rounded-2xl
          border
          border-grey-100
          bg-white
          p-5
          shadow-[0_4px_20px_rgba(0,0,0,0.03)]
          sm:p-6
        "
      >
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
              from-[#FFF9E8]
              to-[#F5E8BD]
            "
          >
            <Truck
              className="h-5 w-5 text-[#B8860B]"
              strokeWidth={1.8}
            />
          </div>

          <div>
            <Heading level="h5">
              Suivi de la livraison
            </Heading>

            <p className="mt-0.5 text-xs text-grey-500">
              Suivez votre commande en temps réel
            </p>
          </div>
        </div>

        {/* Timeline */}
        <OrderStatusTimeline
          statusHistory={statusHistory.map((s) => ({
            status: s.status as any,
            at: s.at,
          }))}
          currentStatus={delivery.status as any}
        />
      </div>
    </div>
  )
}