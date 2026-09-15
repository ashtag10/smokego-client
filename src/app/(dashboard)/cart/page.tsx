'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/hooks/useCart'
import { CartItem } from '@/components/cart/CartItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { EmptyCart } from '@/components/cart/EmptyCart'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { toast } from 'react-hot-toast'
import {
  ArrowLeft,
  LockKeyhole,
  Truck,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react'

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
      <main className="min-h-screen bg-[#FAF9F7]">
        <div
          className="
            mx-auto
            w-full
            max-w-[1500px]
            px-3
            py-7
            sm:px-5
            sm:py-9
            lg:px-8
            lg:py-11
          "
        >
          {/* Header skeleton */}

          <div className="space-y-3">
            <div className="h-4 w-28 rounded bg-grey-100 animate-pulse" />

            <div className="h-10 w-48 rounded-lg bg-grey-100 animate-pulse" />

            <div className="h-4 w-72 rounded bg-grey-100 animate-pulse" />
          </div>

          {/* Main skeleton */}

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">

            {/* Items */}

            <div className="lg:col-span-2">
              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-grey-100
                  bg-white
                  shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                "
              >
                <div className="border-b border-grey-100 px-5 py-5 md:px-6">
                  <div className="h-5 w-36 rounded bg-grey-100 animate-pulse" />

                  <div className="mt-2 h-3 w-20 rounded bg-grey-100 animate-pulse" />
                </div>

                <div className="space-y-6 p-5 md:p-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="
                        flex
                        gap-4
                        border-b
                        border-grey-100
                        pb-6
                        last:border-0
                        last:pb-0
                      "
                    >
                      <div
                        className="
                          h-24
                          w-24
                          shrink-0
                          animate-pulse
                          rounded-xl
                          bg-grey-100
                          md:h-28
                          md:w-28
                        "
                      />

                      <div className="flex-1 space-y-3">
                        <div className="h-5 w-3/4 rounded bg-grey-100 animate-pulse" />

                        <div className="h-4 w-1/2 rounded bg-grey-100 animate-pulse" />

                        <div className="h-5 w-1/4 rounded bg-grey-100 animate-pulse" />

                        <div className="h-9 w-32 rounded-lg bg-grey-100 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}

            <div className="lg:col-span-1">
              <div
                className="
                  rounded-2xl
                  border
                  border-grey-100
                  bg-white
                  p-6
                  shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                "
              >
                <div className="h-6 w-32 rounded bg-grey-100 animate-pulse" />

                <div className="mt-5 h-px bg-grey-100" />

                <div className="mt-5 space-y-4">
                  <div className="flex justify-between">
                    <div className="h-4 w-20 rounded bg-grey-100 animate-pulse" />
                    <div className="h-4 w-24 rounded bg-grey-100 animate-pulse" />
                  </div>

                  <div className="flex justify-between">
                    <div className="h-4 w-24 rounded bg-grey-100 animate-pulse" />
                    <div className="h-4 w-20 rounded bg-grey-100 animate-pulse" />
                  </div>
                </div>

                <div className="mt-6 h-12 rounded-xl bg-grey-100 animate-pulse" />
              </div>
            </div>
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
      <main className="min-h-screen bg-[#FAF9F7]">
        <div
          className="
            mx-auto
            w-full
            max-w-[1500px]
            px-3
            py-7
            sm:px-5
            sm:py-9
            lg:px-8
            lg:py-11
          "
        >
          {/* Header */}

          <div className="mb-8">
            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#D4AF37]/20
                bg-[#FFFDF7]
                px-3
                py-1.5
              "
            >
              <Sparkles className="h-3.5 w-3.5 text-[#B8860B]" />

              <span className="text-xs font-semibold tracking-wide text-[#B8860B]">
                SmokeGo Collection
              </span>
            </div>

            <Heading
              level="h1"
              className="text-3xl tracking-tight sm:text-4xl"
            >
              Mon panier
            </Heading>

            <Paragraph muted className="mt-2 max-w-lg">
              Votre sélection apparaîtra ici. Découvrez nos produits
              et composez votre expérience SmokeGo.
            </Paragraph>
          </div>

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[#D4AF37]/15
              bg-white
              shadow-[0_8px_30px_rgba(0,0,0,0.04)]
            "
          >
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
    <main className="min-h-screen bg-[#FAF9F7]">
      <div
        className="
          mx-auto
          w-full
          max-w-[1500px]
          px-3
          py-7
          sm:px-5
          sm:py-9
          lg:px-8
          lg:py-11
        "
      >

        {/* ======================================================
            PAGE HEADER
        ======================================================= */}

        <div className="mb-8">

          {/* Badge */}

          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#D4AF37]/20
              bg-gradient-to-r
              from-[#D4AF37]/10
              via-[#FFFDF7]
              to-white
              px-3
              py-1.5
            "
          >
            <div
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-[#C89B3C]
                via-[#D4AF37]
                to-[#B8860B]
                text-white
              "
            >
              <ShoppingBag className="h-3 w-3" />
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

          {/* Title + counter */}

          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <div className="flex items-center gap-3">
                <Heading
                  level="h1"
                  className="
                    text-3xl
                    tracking-tight
                    sm:text-4xl
                  "
                >
                  Mon panier
                </Heading>

                <span
                  className="
                    inline-flex
                    min-w-8
                    h-8
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-[#C89B3C]
                    via-[#D4AF37]
                    to-[#B8860B]
                    px-2
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_3px_12px_rgba(212,175,55,0.18)]
                  "
                >
                  {itemCount}
                </span>
              </div>

              <Paragraph
                muted
                className="mt-2 max-w-xl"
              >
                Vérifiez votre sélection avant de passer commande.
              </Paragraph>
            </div>

            {/* Continuer achats */}

            <button
              type="button"
              onClick={() => router.push('/shop')}
              className="
                group
                inline-flex
                shrink-0
                items-center
                gap-2
                text-sm
                font-medium
                text-grey-600
                transition-colors
                duration-200
                hover:text-[#B8860B]
              "
            >
              <ArrowLeft
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-200
                  group-hover:-translate-x-1
                "
              />

              Continuer mes achats
            </button>
          </div>
        </div>

        {/* ======================================================
            MAIN CONTENT
        ======================================================= */}

        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-6
            lg:grid-cols-3
            lg:gap-8
          "
        >

          {/* ====================================================
              CART ITEMS
          ===================================================== */}

          <section className="lg:col-span-2">

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[#D4AF37]/15
                bg-white
                shadow-[0_6px_25px_rgba(0,0,0,0.04)]
              "
            >

              {/* Section header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-grey-100
                  bg-gradient-to-r
                  from-[#FFFDF7]
                  via-white
                  to-white
                  px-5
                  py-5
                  md:px-6
                "
              >
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
                      bg-[#D4AF37]/10
                      text-[#B8860B]
                    "
                  >
                    <ShoppingBag
                      className="h-4 w-4"
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <h2
                      className="
                        text-sm
                        font-semibold
                        text-black-main
                      "
                    >
                      Articles sélectionnés
                    </h2>

                    <p className="mt-0.5 text-xs text-grey-500">
                      {itemCount} article{itemCount > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <span 
                  className="
                    hidden
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#B8860B]
                    sm:block
                  "
                >
                  SmokeGo
                </span>
              </div>

              {/* Items */}

              <div className="p-4 md:p-6">
                <div className="divide-y divide-grey-100">
                  {cart.items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ==================================================
                TRUST FEATURES
            =================================================== */}

            <div
              className="
                mt-4
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-3
              "
            >

              {/* Paiement */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-grey-100
                  bg-white
                  p-4
                  shadow-[0_3px_15px_rgba(0,0,0,0.025)]
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
                    rounded-xl
                    bg-[#D4AF37]/10
                    text-[#B8860B]
                  "
                >
                  <LockKeyhole
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-black-main">
                    Paiement sécurisé
                  </p>

                  <p className="mt-0.5 text-[11px] text-grey-500">
                    Transactions protégées
                  </p>
                </div>
              </div>

              {/* Livraison */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-grey-100
                  bg-white
                  p-4
                  shadow-[0_3px_15px_rgba(0,0,0,0.025)]
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
                    rounded-xl
                    bg-[#D4AF37]/10
                    text-[#B8860B]
                  "
                >
                  <Truck
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-black-main">
                    Livraison rapide
                  </p>

                  <p className="mt-0.5 text-[11px] text-grey-500">
                    Suivi de votre commande
                  </p>
                </div>
              </div>

              {/* Premium */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-[#D4AF37]/15
                  bg-[#FFFDF7]
                  p-4
                  shadow-[0_3px_15px_rgba(0,0,0,0.025)]
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
                    rounded-xl
                    bg-gradient-to-br
                    from-[#C89B3C]
                    via-[#D4AF37]
                    to-[#B8860B]
                    text-white
                  "
                >
                  <Sparkles
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-black-main">
                    Expérience premium
                  </p>

                  <p className="mt-0.5 text-[11px] text-grey-500">
                    L'univers SmokeGo
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================
              SUMMARY
          ===================================================== */}

          <aside
            className="
              lg:sticky
              lg:top-24
              lg:col-span-1
            "
          >
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

              {/* Summary header */}

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
                      bg-gradient-to-br
                      from-[#C89B3C]
                      via-[#D4AF37]
                      to-[#B8860B]
                      text-white
                      shadow-[0_3px_12px_rgba(212,175,55,0.15)]
                    "
                  >
                    <ShoppingBag className="h-4 w-4" />
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
                      Résumé
                    </h2>

                    <p className="mt-0.5 text-xs text-grey-500">
                      Votre commande SmokeGo
                    </p>
                  </div>
                </div>
              </div>

              {/* Existing summary */}

              <div className="p-5">
                {/* Summary */}
                <CartSummary
                subtotal={cart.subtotal || 0}
                deliveryFee={cart.deliveryFee || 0}
                discount={cart.discount || 0}
                total={cart.total || (cart.subtotal || 0) + (cart.deliveryFee || 0) - (cart.discount || 0)}
                itemCount={itemCount}
                onCheckout={handleCheckout}
                />
              </div>

              {/* Security */}

              <div
                className="
                  mx-5
                  mb-5
                  flex
                  items-center
                  gap-2.5
                  rounded-xl
                  border
                  border-grey-100
                  bg-grey-50/50
                  px-3
                  py-3
                "
              >
                <ShieldCheck
                  className="
                    h-4
                    w-4
                    shrink-0
                    text-[#B8860B]
                  "
                  strokeWidth={1.8}
                />

                <p className="text-[11px] leading-relaxed text-grey-500">
                  Vos informations et votre paiement sont
                  protégés.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}