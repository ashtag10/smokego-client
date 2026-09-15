'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Package,
  MapPin,
  Phone,
  User,
  CreditCard,
  Truck,
  ShoppingBag,
  CalendarDays,
} from 'lucide-react'

import { ordersApi } from '@/lib/api/orders'
import { OrderTracking } from '@/components/orders/OrderTracking'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { formatPrice, formatDate } from '@/lib/utils/formatters'
import type { Order } from '@/lib/types/order'

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()

  const orderId = params.orderId as string

  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await ordersApi.getOrder(orderId)

        if (response.success && response.data) {
          setOrder(response.data)
        } else {
          router.push('/orders')
        }
      } catch (error) {
        console.error('Failed to fetch order:', error)
        router.push('/orders')
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, router])

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-8 h-5 w-32 animate-pulse rounded bg-grey-100" />

          <div className="mb-8 space-y-3">
            <div className="h-10 w-72 animate-pulse rounded-xl bg-grey-100" />
            <div className="h-4 w-48 animate-pulse rounded bg-grey-100" />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              <div className="h-96 animate-pulse rounded-2xl bg-white border border-grey-100" />
              <div className="h-52 animate-pulse rounded-2xl bg-white border border-grey-100" />
            </div>

            <div className="h-96 animate-pulse rounded-2xl bg-white border border-grey-100" />
          </div>
        </div>
      </main>
    )
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!order) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-black-main text-gold-main">
            <Package className="h-7 w-7" />
          </div>

          <Heading level="h1">
            Commande non trouvée
          </Heading>

          <Paragraph muted className="mt-3">
            Cette commande n'existe pas ou n'est plus disponible.
          </Paragraph>

          <Link href="/orders">
            <PrimaryButton className="mt-6">
              Retour aux commandes
            </PrimaryButton>
          </Link>
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
          max-w-[1400px]
          px-3
          py-5
          sm:px-5
          sm:py-7
          md:px-6
          lg:px-8
          lg:py-10
        "
      >
        {/* =====================================================
            RETOUR
        ====================================================== */}

        <Link
          href="/orders"
          className="
            group
            mb-6
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
          <ArrowLeft
            className="
              h-4
              w-4
              transition-transform
              group-hover:-translate-x-1
            "
          />

          Retour à mes commandes
        </Link>

        {/* =====================================================
            HEADER
        ====================================================== */}

        <section
          className="
            relative
            mb-7
            overflow-hidden
            rounded-2xl
            bg-black-main
            px-5
            py-6
            shadow-[0_15px_45px_rgba(0,0,0,0.10)]
            sm:px-7
            sm:py-7
            md:rounded-3xl
            md:px-9
            md:py-8
          "
        >
          {/* Glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-20
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
              -bottom-24
              -left-20
              h-56
              w-56
              rounded-full
              bg-gold-main/5
              blur-3xl
            "
          />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-gold-main
                    text-black-main
                  "
                >
                  <ShoppingBag className="h-4 w-4" />
                </div>

                <span
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-gold-main
                  "
                >
                  SmokeGo
                </span>
              </div>

              <h1
                className="
                  font-serif
                  text-2xl
                  font-semibold
                  leading-tight
                  text-white
                  sm:text-3xl
                  md:text-4xl
                "
              >
                Commande #{order.id.slice(0, 8)}
              </h1>

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  items-center
                  gap-2
                  text-sm
                  text-white/50
                "
              >
                <CalendarDays className="h-4 w-4 text-gold-main" />

                <span>
                  {formatDate(order.createdAt, 'long')}
                </span>
              </div>
            </div>

            <div className="self-start sm:self-auto">
              <OrderStatusBadge status={order.orderStatus} />
            </div>
          </div>

          {/* Ligne dorée */}

          <div
            className="
              absolute
              bottom-0
              left-5
              right-5
              h-px
              bg-gradient-to-r
              from-transparent
              via-gold-main/40
              to-transparent
              sm:left-7
              sm:right-7
            "
          />
        </section>

        {/* =====================================================
            CONTENU
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:gap-8
          "
        >
          {/* ===================================================
              COLONNE PRINCIPALE
          =================================================== */}

          <div className="min-w-0 space-y-6">

            {/* =================================================
                ARTICLES
            ================================================= */}

            <section
              className="
                overflow-hidden
                rounded-2xl
                border
                border-grey-100
                bg-white
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-grey-100
                  px-5
                  py-5
                  sm:px-6
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
                    bg-black-main
                    text-gold-main
                  "
                >
                  <Package className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-serif text-lg font-semibold text-black-main">
                    Articles commandés
                  </h2>

                  <p className="mt-0.5 text-xs text-grey-500">
                    {order.items.length} article
                    {order.items.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      border-b
                      border-grey-50
                      py-5
                      last:border-0
                    "
                  >
                    <div className="min-w-0">
                      <p
                        className="
                          truncate
                          text-sm
                          font-semibold
                          text-black-main
                          sm:text-base
                        "
                      >
                        {item.product.name}
                      </p>

                      <p className="mt-1 text-xs text-grey-500 sm:text-sm">
                        {item.quantity} × {formatPrice(item.unitPrice)}
                      </p>
                    </div>

                    <p
                      className="
                        shrink-0
                        text-sm
                        font-semibold
                        text-gold-main
                        sm:text-base
                      "
                    >
                      {formatPrice(item.totalPrice)}
                    </p>
                  </div>
                ))}
              </div>

              {/* =================================================
                  TOTALS
              ================================================= */}

              <div
                className="
                  border-t
                  border-grey-100
                  bg-[#FFFEFC]
                  px-5
                  py-5
                  sm:px-6
                "
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-grey-600">
                      Sous-total
                    </span>

                    <span className="font-medium text-black-main">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-grey-600">
                      <Truck className="h-4 w-4 text-gold-main" />
                      Livraison
                    </span>

                    <span className="font-medium text-black-main">
                      {formatPrice(order.deliveryFee)}
                    </span>
                  </div>

                  {order.discountAmount &&
                    order.discountAmount > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-red-500">
                          Réduction
                        </span>

                        <span className="font-medium text-red-500">
                          -{formatPrice(order.discountAmount)}
                        </span>
                      </div>
                    )}
                </div>

                <div
                  className="
                    my-4
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-gold-main/20
                    to-transparent
                  "
                />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-grey-500">
                      Total payé
                    </p>

                    <p className="mt-1 text-xs text-grey-400">
                      Toutes taxes et livraison incluses
                    </p>
                  </div>

                  <p
                    className="
                      text-xl
                      font-bold
                      text-gold-main
                      sm:text-2xl
                    "
                  >
                    {formatPrice(order.finalAmount)}
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================
                ADRESSE
            ================================================= */}

            <section
              className="
                rounded-2xl
                border
                border-grey-100
                bg-white
                p-5
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                sm:p-6
              "
            >
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-gold-main/10
                    text-gold-main
                  "
                >
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-serif text-lg font-semibold text-black-main">
                    Adresse de livraison
                  </h2>

                  <p className="mt-0.5 text-xs text-grey-500">
                    Informations de livraison
                  </p>
                </div>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-grey-100
                  bg-[#FAF9F7]
                  p-4
                "
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="mt-0.5 h-4 w-4 shrink-0 text-gold-main" />

                    <div>
                      <p className="text-xs text-grey-500">
                        Destinataire
                      </p>

                      <p className="mt-0.5 text-sm font-semibold text-black-main">
                        {order.deliveryAddress.recipientName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-main" />

                    <div>
                      <p className="text-xs text-grey-500">
                        Téléphone
                      </p>

                      <p className="mt-0.5 text-sm font-medium text-black-main">
                        {order.deliveryAddress.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-main" />

                    <div>
                      <p className="text-xs text-grey-500">
                        Adresse
                      </p>

                      <p className="mt-0.5 text-sm leading-relaxed text-black-main">
                        {order.deliveryAddress.detailedAddress}
                      </p>

                      <p className="mt-1 text-sm text-grey-600">
                        {order.deliveryAddress.district},{' '}
                        {order.deliveryAddress.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ===================================================
              SIDEBAR / SUIVI
          =================================================== */}

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <section
              className="
                overflow-hidden
                rounded-2xl
                border
                border-grey-100
                bg-white
                shadow-[0_8px_30px_rgba(0,0,0,0.05)]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-grey-100
                  px-5
                  py-5
                  sm:px-6
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
                    bg-black-main
                    text-gold-main
                  "
                >
                  <Truck className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-serif text-lg font-semibold text-black-main">
                    Suivi de la commande
                  </h2>

                  <p className="mt-0.5 text-xs text-grey-500">
                    État actuel de votre commande
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <OrderTracking orderId={order.id} />
              </div>
            </section>

            {/* =================================================
                PAYMENT INFO
            ================================================= */}

            <div
              className="
                mt-4
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-gold-main/15
                bg-gold-main/[0.04]
                px-4
                py-4
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
                  rounded-lg
                  bg-gold-main/10
                  text-gold-main
                "
              >
                <CreditCard className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs font-semibold text-black-main">
                  Paiement sécurisé
                </p>

                <p className="mt-0.5 text-[11px] leading-relaxed text-grey-500">
                  Votre commande est protégée par SmokeGo.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}