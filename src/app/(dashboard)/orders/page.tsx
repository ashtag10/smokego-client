'use client'

import { useOrders } from '@/lib/hooks/useOrders'
import { OrderCard } from '@/components/orders/OrderCard'
import { toast } from 'react-hot-toast'
import { ordersApi } from '@/lib/api/orders'

import {
  ShoppingBag,
  Package,
  ArrowRight,
} from 'lucide-react'

export default function OrdersPage() {
  const {
    orders,
    pagination,
    isLoading,
    refetch,
  } = useOrders()

  const handleRepeatOrder = async (orderId: string) => {
    try {
      const response = await ordersApi.repeatOrder(orderId)

      if (response.success && response.data) {
        toast.success(
          'Commande dupliquée ! Vérifiez votre panier'
        )

        refetch()
      } else {
        toast.error(
          response.message ||
            'Erreur lors de la duplication'
        )
      }
    } catch (error) {
      console.error('Repeat order error:', error)

      toast.error('Une erreur est survenue')
    }
  }

  const totalOrders = pagination?.total || 0

  /* ============================================================
     LOADING
  ============================================================ */
  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-8 w-48 rounded bg-gray-100 animate-pulse" />
          <div className="mt-8 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-xl border border-gray-200 bg-gray-50 animate-pulse"
              />
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">

        {/* =========================================================
            FIL D'ARIANE
        ========================================================= */}
        <nav className="mb-6 flex items-center gap-2 text-[13px] text-gray-500">
          <a href="/" className="hover:text-black hover:underline">
            Accueil
          </a>
        </nav>

        {/* =========================================================
            TITRE
        ========================================================= */}
        <h1 className="mb-8 text-[28px] font-bold text-black sm:text-[32px]">
          Mes commandes
        </h1>

        {/* =========================================================
            COMPTEUR
        ========================================================= */}
        <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            <ShoppingBag className="h-4 w-4" strokeWidth={2} />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-black">
              Historique des commandes
            </p>
            <p className="mt-0.5 text-[12px] text-gray-500">
              {totalOrders === 0
                ? 'Aucune commande'
                : `${totalOrders} commande${totalOrders > 1 ? 's' : ''} au total`}
            </p>
          </div>
        </div>

        {/* =========================================================
            ÉTAT VIDE
        ========================================================= */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-white">
              <ShoppingBag className="h-7 w-7 text-gray-400" strokeWidth={1.5} />
            </div>

            <h2 className="text-[18px] font-bold text-black">
              Aucune commande pour le moment
            </h2>

            <p className="mt-2 max-w-md text-[13px] leading-relaxed text-gray-500">
              Vos commandes apparaîtront ici dès que vous aurez effectué votre premier achat.
            </p>

            <a
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-purple-600 hover:text-purple-800"
            >
              <span>Découvrez notre collection</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        ) : (
          /* =====================================================
             LISTE DES COMMANDES
          ===================================================== */
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id}>
                <OrderCard
                  order={order}
                  onRepeat={handleRepeatOrder}
                />
              </div>
            ))}
          </div>
        )}

        {/* =========================================================
            FOOTER
        ========================================================= */}
        <div className="mt-10 border-t border-gray-100 pt-6">
          <p className="text-center text-[11px] text-gray-400">
            El-Badia · Premium Hookah Experience
          </p>
        </div>
      </div>
    </main>
  )
}