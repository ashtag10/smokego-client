'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/hooks/useCart'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { toast } from 'react-hot-toast'

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from 'lucide-react'

const steps = ['Récapitulatif', 'Adresse', 'Paiement']

export default function CheckoutPage() {
  const router = useRouter()
  const { cart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  if (!cart || cart.items.length === 0) {
    router.push('/cart')
    return null
  }

  const handleProceedToAddress = async () => {
    setIsLoading(true)

    try {
      router.push('/checkout/address')
    } catch (error) {
      console.error('Checkout navigation error:', error)
      toast.error('Une erreur est survenue')
      setIsLoading(false)
    }
  }

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
        {/* =========================================================
            HEADER
        ========================================================= */}
        <div className="mb-8 md:mb-10">
          {/* Retour */}
          <button
            type="button"
            onClick={() => router.push('/cart')}
            className="
              mb-5
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
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
            Retour au panier
          </button>

          <div className="flex flex-col gap-5">
            <div>
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
                  bg-[#D4AF37]/5
                  px-3
                  py-1.5
                "
              >
                <Sparkles
                  className="h-3.5 w-3.5 text-[#D4AF37]"
                  strokeWidth={2}
                />

                <span
                  className="
                    text-xs
                    font-semibold
                    tracking-wide
                    text-[#B8860B]
                  "
                >
                  SmokeGo Checkout
                </span>
              </div>

              {/* Titre */}
              <h1
                className="
                  font-serif
                  text-3xl
                  font-semibold
                  leading-tight
                  tracking-tight
                  text-black-main
                  sm:text-4xl
                  md:text-5xl
                "
              >
                Finaliser votre commande
              </h1>

              <Paragraph
                muted
                className="mt-2 max-w-xl text-sm md:text-base"
              >
                Vérifiez votre sélection avant de choisir votre adresse
                et votre mode de paiement.
              </Paragraph>
            </div>

            {/* Stepper */}
            <div className="pt-2">
              <CheckoutStepper
                currentStep={0}
                steps={steps}
              />
            </div>
          </div>
        </div>

        {/* =========================================================
            CONTENU PRINCIPAL
        ========================================================= */}
        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-3
            lg:gap-8
            lg:items-start
          "
        >
          {/* =======================================================
              PANIER
          ======================================================== */}
          <section className="lg:col-span-2">
            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[#D4AF37]/10
                bg-white
                shadow-[0_4px_24px_rgba(0,0,0,0.035)]
              "
            >
              {/* Header carte */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  border-b
                  border-grey-100
                  px-5
                  py-4
                  md:px-6
                "
              >
                <div className="flex items-center gap-3">
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
                      shadow-[0_4px_12px_rgba(212,175,55,0.16)]
                    "
                  >
                    <ShoppingBag
                      className="h-4.5 w-4.5"
                      strokeWidth={1.9}
                    />
                  </div>

                  <div>
                    <h2
                      className="
                        text-sm
                        font-semibold
                        text-black-main
                        md:text-base
                      "
                    >
                      Articles dans votre panier
                    </h2>

                    <p className="mt-0.5 text-xs text-grey-500">
                      {cart.items.length} article
                      {cart.items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <span
                  className="
                    hidden
                    text-xs
                    font-medium
                    uppercase
                    tracking-[0.15em]
                    text-[#B8860B]
                    sm:block
                  "
                >
                  SmokeGo
                </span>
              </div>

              {/* Liste produits */}
              <div className="p-4 md:p-6">
                <div className="divide-y divide-grey-100">
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="
                        flex
                        items-center
                        gap-4
                        py-4
                        first:pt-0
                        last:pb-0
                      "
                    >
                      {/* Image / placeholder */}
                      <div
                        className="
                          flex
                          h-16
                          w-16
                          shrink-0
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-xl
                          bg-[#FAF9F7]
                          border
                          border-grey-100
                          sm:h-20
                          sm:w-20
                        "
                      >
                        <Package
                          className="h-6 w-6 text-[#D4AF37]"
                          strokeWidth={1.6}
                        />
                      </div>

                      {/* Informations */}
                      <div className="min-w-0 flex-1">
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

                        <div
                          className="
                            mt-1
                            flex
                            flex-wrap
                            items-center
                            gap-x-3
                            gap-y-1
                          "
                        >
                          <span className="text-xs text-grey-500">
                            Quantité : {item.quantity}
                          </span>

                          <span className="hidden h-1 w-1 rounded-full bg-grey-300 sm:block" />

                          <span className="text-xs text-grey-500">
                            {item.product.price} FCFA / unité
                          </span>
                        </div>
                      </div>

                      {/* Prix */}
                      <div className="shrink-0 text-right">
                        <p
                          className="
                            text-sm
                            font-semibold
                            text-[#B8860B]
                            sm:text-base
                          "
                        >
                          {item.totalPrice} FCFA
                        </p>

                        <p className="mt-1 text-[11px] text-grey-400">
                          Total
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* =====================================================
                AVANTAGES
            ====================================================== */}
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
                  <Truck
                    className="h-4 w-4 text-[#D4AF37]"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-black-main">
                    Livraison rapide
                  </p>

                  <p className="mt-0.5 text-[11px] text-grey-500">
                    Livraison à votre adresse
                  </p>
                </div>
              </div>

              {/* Qualité */}
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
                  <CheckCircle2
                    className="h-4 w-4 text-[#D4AF37]"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-black-main">
                    Expérience premium
                  </p>

                  <p className="mt-0.5 text-[11px] text-grey-500">
                    SmokeGo Collection
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =======================================================
              RÉSUMÉ
          ======================================================== */}
          <aside className="lg:sticky lg:top-24">
            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[#D4AF37]/15
                bg-white
                shadow-[0_6px_30px_rgba(0,0,0,0.045)]
              "
            >
              {/* Header résumé */}
              <div
                className="
                  border-b
                  border-grey-100
                  bg-gradient-to-r
                  from-[#FAF9F7]
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
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#D4AF37]/20
                      bg-[#D4AF37]/5
                    "
                  >
                    <CreditCard
                      className="h-4.5 w-4.5 text-[#B8860B]"
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
                      "
                    >
                      Résumé
                    </h2>

                    <p className="text-xs text-grey-500">
                      Votre commande
                    </p>
                  </div>
                </div>
              </div>

              {/* Détails */}
              <div className="p-5 md:p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-grey-600">
                      Sous-total
                    </span>

                    <span className="font-medium text-black-main">
                      {cart.subtotal} FCFA
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-grey-600">
                      Livraison
                    </span>

                    <span className="font-medium text-black-main">
                      {cart.deliveryFee} FCFA
                    </span>
                  </div>

                  {cart.discount && cart.discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-grey-600">
                        Réduction
                      </span>

                      <span className="font-medium text-red-500">
                        -{cart.discount} FCFA
                      </span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div
                  className="
                    mt-5
                    border-t
                    border-grey-100
                    pt-5
                  "
                >
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-grey-500">
                        Total à payer
                      </p>

                      <p
                        className="
                          mt-1
                          font-serif
                          text-2xl
                          font-semibold
                          text-black-main
                          sm:text-3xl
                        "
                      >
                        {cart.total}
                        <span className="ml-1 text-sm font-medium text-[#B8860B]">
                          FCFA
                        </span>
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-[#D4AF37]/10
                      "
                    >
                      <CheckCircle2
                        className="h-4 w-4 text-[#B8860B]"
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>
                </div>

                {/* Bouton */}
                <PrimaryButton
                  onClick={handleProceedToAddress}
                  isLoading={isLoading}
                  fullWidth
                  className="
                    mt-6
                    !rounded-xl
                  "
                >
                  <span>Continuer vers l'adresse</span>

                  {!isLoading && (
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      strokeWidth={1.8}
                    />
                  )}
                </PrimaryButton>

                {/* Information */}
                <div
                  className="
                    mt-4
                    flex
                    items-start
                    gap-2.5
                    rounded-xl
                    border
                    border-[#D4AF37]/10
                    bg-[#D4AF37]/5
                    p-3
                  "
                >
                  <MapPin
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      text-[#B8860B]
                    "
                    strokeWidth={1.8}
                  />

                  <p className="text-[11px] leading-relaxed text-grey-600">
                    À l'étape suivante, vous pourrez sélectionner
                    ou ajouter votre adresse de livraison.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}