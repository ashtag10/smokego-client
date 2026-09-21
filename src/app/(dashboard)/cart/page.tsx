'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/hooks/useCart'
import { CartItem } from '@/components/cart/CartItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { EmptyCart } from '@/components/cart/EmptyCart'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Lock, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const router = useRouter()
  const { cart, isLoading, updateQuantity, removeItem } = useCart()

  const itemCount =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0

  const handleCheckout = () => {
    if (!cart || cart.items.length === 0) {
      toast.error('Votre panier est vide')
      return
    }
    router.push('/checkout')
  }

  /* ============================================================
     LOADING
  ============================================================ */
  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-8 w-32 rounded bg-gray-100 animate-pulse" />
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 rounded-xl border border-gray-200 bg-gray-50 animate-pulse"
                />
              ))}
            </div>
            <div className="h-96 rounded-xl border border-gray-200 bg-gray-50 animate-pulse" />
          </div>
        </div>
      </main>
    )
  }

  /* ============================================================
     EMPTY CART
  ============================================================ */
  if (!cart || cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-[13px] text-gray-500">
            <Link href="/" className="hover:text-black hover:underline">
              Accueil
            </Link>
          </nav>

          <h1 className="mb-10 text-[28px] font-bold text-black sm:text-[32px]">
            Panier
          </h1>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <EmptyCart />
          </div>
        </div>
      </main>
    )
  }

  /* ============================================================
     CART
  ============================================================ */
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">

        {/* Fil d'Ariane */}
        <nav className="mb-6 flex items-center gap-2 text-[13px] text-gray-500">
          <Link href="/" className="hover:text-black hover:underline">
            Accueil
          </Link>
        </nav>

        {/* Titre */}
        <h1 className="mb-10 text-[28px] font-bold text-black sm:text-[32px]">
          Panier
        </h1>

        {/* Layout 2 colonnes */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3 lg:gap-10">

          {/* ============================================
              COLONNE GAUCHE : Articles
          ============================================ */}
          <section className="lg:col-span-2">
            <div className="divide-y divide-gray-100">
              {cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            {/* Continuer mes achats */}
            <button
              type="button"
              onClick={() => router.push('/')}
              className="group mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-gray-600 transition-colors hover:text-purple-600"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Continuer mes achats
            </button>
          </section>

          {/* ============================================
              COLONNE DROITE : Résumé
          ============================================ */}
          <aside className="lg:col-span-1">
            <div className="rounded-xl border border-gray-200 bg-white p-5">

              {/* Titre */}
              <h2 className="mb-5 text-[18px] font-bold text-black">
                Résumé
              </h2>

              {/* Résumé via le composant existant */}
              <CartSummary
                subtotal={cart.subtotal || 0}
                deliveryFee={cart.deliveryFee || 0}
                discount={cart.discount || 0}
                total={
                  cart.total ||
                  (cart.subtotal || 0) +
                    (cart.deliveryFee || 0) -
                    (cart.discount || 0)
                }
                itemCount={itemCount}
                onCheckout={handleCheckout}
              />

              {/* Paiement sécurisé */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-gray-500">
                <Lock className="h-3.5 w-3.5" />
                <span>Paiement 100% sécurisé</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}