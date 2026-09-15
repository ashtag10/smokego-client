'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  CreditCard,
  ShieldCheck,
  Sparkles,
  LockKeyhole,
  ArrowLeft,
} from 'lucide-react'

import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { PaymentMethod } from '@/components/checkout/PaymentMethod'
import { OrderSummary } from '@/components/checkout/OrderSummary'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { paymentsApi } from '@/lib/api/payments'
import { ordersApi } from '@/lib/api/orders'
import { useCart } from '@/lib/hooks/useCart'
import { useAuthStore } from '@/lib/stores/authStore'
import { toast } from 'react-hot-toast'

import type { PaymentMethod as PaymentMethodType } from '@/lib/types/payment'
import type { Order } from '@/lib/types/order'

const steps = ['Récapitulatif', 'Adresse', 'Paiement']

export default function CheckoutPaymentPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const { user } = useAuthStore()

  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCreatingOrder, setIsCreatingOrder] = useState(true)
  const hasCreatedOrder = useRef(false)

  useEffect(() => {
    // ✅ Éviter les appels multiples
    if (hasCreatedOrder.current) return

    const createOrder = async () => {
      // ✅ Vérifier que le panier n'est pas vide
      if (!cart || cart.items.length === 0) {
        toast.error('Votre panier est vide')
        router.push('/cart')
        return
      }

      // ✅ Vérifier que l'utilisateur est connecté
      if (!user) {
        toast.error('Veuillez vous connecter')
        router.push('/login')
        return
      }

      // ✅ Récupérer l'adresse depuis sessionStorage
      let addressId = null
      if (typeof window !== 'undefined') {
        addressId = sessionStorage.getItem('checkoutAddressId')
      }

      if (!addressId) {
        toast.error('Veuillez sélectionner une adresse de livraison')
        router.push('/checkout/address')
        return
      }

      setIsCreatingOrder(true)

      try {
        const response = await ordersApi.checkout({
          addressId,
        })

        if (response.success && response.data) {
          setOrder(response.data)
          hasCreatedOrder.current = true
        } else {
          toast.error(response.message || 'Erreur lors de la création de la commande')
          router.push('/cart')
        }
      } catch (error) {
        console.error('Failed to create order:', error)
        toast.error('Une erreur est survenue lors de la création de la commande')
        router.push('/cart')
      } finally {
        setIsCreatingOrder(false)
      }
    }

    createOrder()
  }, [cart, user, router])

  const handlePayment = async (method: PaymentMethodType) => {
    if (!order) return

    setIsLoading(true)

    try {
      const response = await paymentsApi.initiatePayment(order.id)

      // ========================================================
      // ⚠️ IMPORTANT
      // ========================================================
      // `initiatePayment` ne fait qu'INITIALISER la transaction
      // auprès de CinetPay. Le paiement n'est PAS encore confirmé
      // à ce stade : l'utilisateur doit être redirigé vers la
      // page CinetPay (paymentUrl) pour choisir son opérateur et
      // valider avec son code secret.
      //
      // On ne vide donc PAS le panier et on ne redirige PAS vers
      // la page de la commande ici. Cela ne doit se produire
      // qu'après confirmation réelle du paiement (côté page
      // /payment/success, après vérification du statut auprès
      // du backend, ou via le webhook CinetPay).
      // ========================================================

      if (response.success && response.data?.paymentUrl) {
        // ✅ Nettoyer sessionStorage avant de quitter la page
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('checkoutAddressId')
        }

        // ✅ Rediriger l'utilisateur vers CinetPay pour qu'il
        //    confirme le paiement avec son code secret.
        window.location.href = response.data.paymentUrl
      } else {
        toast.error(response.message || "Erreur lors de l'initiation du paiement")
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    router.push('/checkout/address')
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (isCreatingOrder || isLoading || !order) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <div
          className="
            mx-auto
            w-full
            max-w-[1200px]
            px-3
            py-8
            sm:px-4
            sm:py-10
            lg:px-6
            lg:py-12
          "
        >
          {/* Header skeleton */}
          <div className="mb-8 space-y-3">
            <div className="h-3 w-28 rounded-full bg-grey-100 animate-pulse" />
            <div className="h-10 w-48 rounded-lg bg-grey-100 animate-pulse" />
            <div className="h-4 w-72 rounded bg-grey-100 animate-pulse" />
          </div>

          {/* Stepper skeleton */}
          <div className="mb-8 h-16 rounded-2xl bg-white border border-grey-100 animate-pulse" />

          {/* Content skeleton */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#D4AF37]/15
                  bg-white
                  p-6
                  shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                "
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-grey-100 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-5 w-40 rounded bg-grey-100 animate-pulse" />
                    <div className="h-3 w-56 rounded bg-grey-100 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="h-20 rounded-xl bg-grey-100 animate-pulse" />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="h-80 rounded-2xl bg-white border border-grey-100 animate-pulse" />
            </div>
          </div>

          {/* Loading */}
          <div className="flex flex-col items-center justify-center py-10">
            <div className="h-10 w-10 rounded-full border-[3px] border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />
            <p className="mt-4 text-sm text-grey-500">Préparation de votre commande...</p>
          </div>
        </div>
      </main>
    )
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#FAF9F7]">
      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-3
          py-8
          sm:px-4
          sm:py-10
          lg:px-6
          lg:py-12
        "
      >
        {/* HEADER */}
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-gradient-to-br
                from-[#C89B3C]
                via-[#D4AF37]
                to-[#B8860B]
                text-white
                shadow-[0_3px_10px_rgba(212,175,55,0.15)]
              "
            >
              <Sparkles
                className="h-3.5 w-3.5"
                strokeWidth={2}
              />
            </span>

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#B8860B]
              "
            >
              SmokeGo Checkout
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Heading
                level="h1"
                className="
                  text-3xl
                  font-semibold
                  tracking-tight
                  text-black-main
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                Paiement
              </Heading>

              <Paragraph
                muted
                className="
                  mt-2
                  max-w-xl
                  text-sm
                  leading-relaxed
                  md:text-base
                "
              >
                Choisissez votre moyen de paiement
                pour finaliser votre commande.
              </Paragraph>
            </div>

            <div
              className="
                hidden
                items-center
                gap-2
                rounded-full
                border
                border-[#D4AF37]/15
                bg-white
                px-3
                py-2
                shadow-sm
                sm:flex
              "
            >
              <LockKeyhole
                className="h-3.5 w-3.5 text-[#B8860B]"
                strokeWidth={2}
              />

              <span
                className="
                  text-xs
                  font-medium
                  text-grey-600
                "
              >
                Paiement sécurisé
              </span>
            </div>
          </div>
        </section>

        {/* STEPPER */}
        <section
          className="
            mb-8
            overflow-hidden
            rounded-2xl
            border
            border-[#D4AF37]/15
            bg-white
            px-4
            py-4
            shadow-[0_4px_20px_rgba(0,0,0,0.04)]
            sm:px-6
          "
        >
          <CheckoutStepper
            currentStep={2}
            steps={steps}
          />
        </section>

        {/* MAIN CONTENT */}
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
          {/* PAYMENT */}
          <section className="lg:col-span-2">
            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[#D4AF37]/15
                bg-white
                shadow-[0_4px_20px_rgba(0,0,0,0.04)]
              "
            >
              <div
                className="
                  border-b
                  border-grey-100
                  px-5
                  py-5
                  md:px-6
                "
              >
                <div className="flex items-start gap-3">
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
                      shadow-[0_4px_14px_rgba(212,175,55,0.16)]
                    "
                  >
                    <CreditCard
                      className="h-5 w-5"
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <h2
                      className="
                        font-serif
                        text-lg
                        font-semibold
                        text-black-main
                        md:text-xl
                      "
                    >
                      Moyen de paiement
                    </h2>

                    <p
                      className="
                        mt-1
                        text-xs
                        leading-relaxed
                        text-grey-500
                        sm:text-sm
                      "
                    >
                      Sélectionnez le mode de paiement
                      qui vous convient.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <PaymentMethod
                  onSelect={handlePayment}
                  onBack={handleBack}
                  isLoading={isLoading}
                />
              </div>
            </div>

            <div
              className="
                mt-4
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-3
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-grey-100
                  bg-white
                  p-4
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
                    rounded-full
                    bg-[#D4AF37]/10
                  "
                >
                  <ShieldCheck
                    className="h-4 w-4 text-[#D4AF37]"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-black-main">
                    Paiement sécurisé
                  </p>

                  <p className="mt-0.5 text-[11px] text-grey-500">
                    Vos données sont protégées
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-grey-100
                  bg-white
                  p-4
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
                    rounded-full
                    bg-[#D4AF37]/10
                  "
                >
                  <LockKeyhole
                    className="h-4 w-4 text-[#D4AF37]"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-black-main">
                    Transactions protégées
                  </p>

                  <p className="mt-0.5 text-[11px] text-grey-500">
                    Processus fiable et sécurisé
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-grey-100
                  bg-white
                  p-4
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
                    rounded-full
                    bg-[#D4AF37]/10
                  "
                >
                  <Sparkles
                    className="h-4 w-4 text-[#D4AF37]"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-black-main">
                    Expérience SmokeGo
                  </p>

                  <p className="mt-0.5 text-[11px] text-grey-500">
                    Simple, rapide et premium
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ORDER SUMMARY */}
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
                shadow-[0_4px_20px_rgba(0,0,0,0.04)]
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-grey-100
                  px-5
                  py-4
                "
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#D4AF37]
                      shadow-[0_0_7px_rgba(212,175,55,0.5)]
                    "
                  />

                  <h2
                    className="
                      text-sm
                      font-semibold
                      text-black-main
                    "
                  >
                    Résumé de la commande
                  </h2>
                </div>

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#B8860B]
                  "
                >
                  SmokeGo
                </span>
              </div>

              <div className="p-5">
                <OrderSummary order={order} />
              </div>
            </div>

            <button
              type="button"
              onClick={handleBack}
              className="
                mt-4
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-grey-500
                transition-colors
                duration-200
                hover:text-[#B8860B]
              "
            >
              <ArrowLeft
                className="h-4 w-4"
                strokeWidth={1.8}
              />

              Retour à l'adresse
            </button>
          </aside>
        </div>
      </div>
    </main>
  )
}