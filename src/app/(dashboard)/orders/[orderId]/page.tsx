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
      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-8 h-5 w-32 animate-pulse rounded bg-gray-100" />
          <div className="mb-8 space-y-3">
            <div className="h-8 w-72 animate-pulse rounded-lg bg-gray-100" />
            <div className="h-4 w-48 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              <div className="h-96 animate-pulse rounded-xl border border-gray-200 bg-white" />
              <div className="h-52 animate-pulse rounded-xl border border-gray-200 bg-white" />
            </div>
            <div className="h-96 animate-pulse rounded-xl border border-gray-200 bg-white" />
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
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Package className="h-7 w-7" />
          </div>

          <h1 className="text-[20px] font-bold text-black sm:text-[24px]">
            Commande non trouvée
          </h1>

          <p className="mt-3 text-[13px] text-gray-500">
            Cette commande n'existe pas ou n'est plus disponible.
          </p>

          <Link href="/orders">
            <PrimaryButton className="mt-6 rounded-md bg-black px-5 py-2.5 text-[13px] font-medium text-white hover:bg-gray-800">
              Retour aux commandes
            </PrimaryButton>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

        {/* Retour */}
        <Link
          href="/orders"
          className="group mb-6 inline-flex items-center gap-2 text-[13px] font-medium text-gray-500 transition-colors hover:text-purple-600"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour à mes commandes
        </Link>

        {/* =====================================================
            HEADER
        ====================================================== */}
        <section className="mb-7">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-purple-600">
                  El-Badia
                </span>
              </div>

              <h1 className="text-[24px] font-bold leading-tight text-black sm:text-[28px]">
                Commande #{order.id.slice(0, 8)}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px] text-gray-500">
                <CalendarDays className="h-4 w-4 text-gray-400" />
                <span>{formatDate(order.createdAt, 'long')}</span>
              </div>
            </div>

            <div className="self-start">
              <OrderStatusBadge status={order.orderStatus} />
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTENU
        ====================================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">

          {/* ===================================================
              COLONNE PRINCIPALE
          =================================================== */}
          <div className="min-w-0 space-y-6">

            {/* ARTICLES */}
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 sm:px-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-[16px] font-semibold text-black">
                    Articles commandés
                  </h2>
                  <p className="mt-0.5 text-[12px] text-gray-500">
                    {order.items.length} article{order.items.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 border-b border-gray-50 py-5 last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-black sm:text-[15px]">
                        {item.product.name}
                      </p>
                      <p className="mt-1 text-[12px] text-gray-500 sm:text-[13px]">
                        {item.quantity} × {formatPrice(item.unitPrice)}
                      </p>
                    </div>
                    <p className="shrink-0 text-[14px] font-semibold text-black sm:text-[15px]">
                      {formatPrice(item.totalPrice)}
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTALS */}
              <div className="border-t border-gray-100 bg-gray-50 px-5 py-5 sm:px-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium text-black">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[13px]">
                    <span className="flex items-center gap-2 text-gray-600">
                      <Truck className="h-4 w-4 text-gray-400" />
                      Livraison
                    </span>
                    <span className="font-medium text-black">
                      {formatPrice(order.deliveryFee)}
                    </span>
                  </div>

                  {order.discountAmount && order.discountAmount > 0 && (
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-red-500">Réduction</span>
                      <span className="font-medium text-red-500">
                        -{formatPrice(order.discountAmount)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="my-4 h-px bg-gray-200" />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500">
                      Total payé
                    </p>
                    <p className="mt-1 text-[11px] text-gray-400">
                      Toutes taxes et livraison incluses
                    </p>
                  </div>
                  <p className="text-[20px] font-bold text-black sm:text-[22px]">
                    {formatPrice(order.finalAmount)}
                  </p>
                </div>
              </div>
            </section>

            {/* ADRESSE */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-[16px] font-semibold text-black">
                    Adresse de livraison
                  </h2>
                  <p className="mt-0.5 text-[12px] text-gray-500">
                    Informations de livraison
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                    <div>
                      <p className="text-[11px] text-gray-500">Destinataire</p>
                      <p className="mt-0.5 text-[13px] font-semibold text-black">
                        {order.deliveryAddress.recipientName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                    <div>
                      <p className="text-[11px] text-gray-500">Téléphone</p>
                      <p className="mt-0.5 text-[13px] font-medium text-black">
                        {order.deliveryAddress.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                    <div>
                      <p className="text-[11px] text-gray-500">Adresse</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-black">
                        {order.deliveryAddress.detailedAddress}
                      </p>
                      <p className="mt-1 text-[13px] text-gray-600">
                        {order.deliveryAddress.district}, {order.deliveryAddress.city}
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
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 sm:px-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-[16px] font-semibold text-black">
                    Suivi de la commande
                  </h2>
                  <p className="mt-0.5 text-[12px] text-gray-500">
                    État actuel de votre commande
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <OrderTracking orderId={order.id} />
              </div>
            </section>

            {/* Paiement sécurisé */}
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[12px] font-semibold text-black">
                  Paiement sécurisé
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-gray-500">
                  Votre commande est protégée.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}