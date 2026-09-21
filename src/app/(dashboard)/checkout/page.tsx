'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/hooks/useCart'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
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
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* =========================================================
            HEADER
        ========================================================= */}
        <div className="mb-8">

          {/* Retour */}
          <button
            type="button"
            onClick={() => router.push('/cart')}
            className="group mb-5 inline-flex items-center gap-2 text-[13px] font-medium text-gray-500 transition-colors hover:text-purple-600"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.8} />
            Retour au panier
          </button>

          <div className="flex flex-col gap-5">
            <div>
              {/* Titre */}
              <h1 className="text-[24px] font-bold leading-tight text-black sm:text-[28px] md:text-[32px]">
                Finaliser votre commande
              </h1>

              <p className="mt-2 max-w-xl text-[13px] text-gray-500">
                Vérifiez votre sélection avant de choisir votre adresse et votre mode de paiement.
              </p>
            </div>

            {/* Stepper */}
            <div className="pt-2">
              <CheckoutStepper currentStep={0} steps={steps} />
            </div>
          </div>
        </div>

        {/* =========================================================
            CONTENU PRINCIPAL
        ========================================================= */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8">

          {/* =======================================================
              PANIER
          ======================================================== */}
          <section className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

              {/* Header carte */}
              <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 md:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <ShoppingBag className="h-4 w-4" strokeWidth={1.9} />
                  </div>
                  <div>
                    <h2 className="text-[14px] font-semibold text-black md:text-[15px]">
                      Articles dans votre panier
                    </h2>
                    <p className="mt-0.5 text-[12px] text-gray-500">
                      {cart.items.length} article{cart.items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Liste produits */}
              <div className="p-4 md:p-6">
                <div className="divide-y divide-gray-100">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">

                      {/* Image / placeholder */}
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50 sm:h-20 sm:w-20">
                        <Package className="h-6 w-6 text-gray-400" strokeWidth={1.6} />
                      </div>

                      {/* Informations */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-semibold text-black sm:text-[15px]">
                          {item.product.name}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="text-[12px] text-gray-500">
                            Quantité : {item.quantity}
                          </span>
                          <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />
                          <span className="text-[12px] text-gray-500">
                            {item.product.price} FCFA / unité
                          </span>
                        </div>
                      </div>

                      {/* Prix */}
                      <div className="shrink-0 text-right">
                        <p className="text-[14px] font-semibold text-black sm:text-[15px]">
                          {item.totalPrice} FCFA
                        </p>
                        <p className="mt-1 text-[11px] text-gray-400">Total</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* =====================================================
                AVANTAGES
            ====================================================== */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

              {/* Paiement */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50">
                  <ShieldCheck className="h-4 w-4 text-purple-600" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-black">Paiement sécurisé</p>
                  <p className="mt-0.5 text-[11px] text-gray-500">Transactions protégées</p>
                </div>
              </div>

              {/* Livraison */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50">
                  <Truck className="h-4 w-4 text-purple-600" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-black">Livraison rapide</p>
                  <p className="mt-0.5 text-[11px] text-gray-500">Livraison à votre adresse</p>
                </div>
              </div>

              {/* Qualité */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50">
                  <CheckCircle2 className="h-4 w-4 text-purple-600" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-black">Expérience premium</p>
                  <p className="mt-0.5 text-[11px] text-gray-500">El-Badia Collection</p>
                </div>
              </div>
            </div>
          </section>

          {/* =======================================================
              RÉSUMÉ
          ======================================================== */}
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

              {/* Header résumé */}
              <div className="border-b border-gray-100 px-5 py-4 md:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <CreditCard className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-semibold text-black">Résumé</h2>
                    <p className="text-[12px] text-gray-500">Votre commande</p>
                  </div>
                </div>
              </div>

              {/* Détails */}
              <div className="p-5 md:p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium text-black">{cart.subtotal} FCFA</span>
                  </div>

                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-medium text-black">{cart.deliveryFee} FCFA</span>
                  </div>

                  {cart.discount && cart.discount > 0 && (
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-gray-600">Réduction</span>
                      <span className="font-medium text-red-500">-{cart.discount} FCFA</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="mt-5 border-t border-gray-100 pt-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] text-gray-500">Total à payer</p>
                      <p className="mt-1 text-[24px] font-bold text-black">
                        {cart.total}
                        <span className="ml-1 text-[14px] font-medium text-purple-600">FCFA</span>
                      </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                      <CheckCircle2 className="h-4 w-4 text-purple-600" strokeWidth={1.8} />
                    </div>
                  </div>
                </div>

                {/* Bouton */}
                <PrimaryButton
                  onClick={handleProceedToAddress}
                  isLoading={isLoading}
                  fullWidth
                  className="mt-6 !rounded-lg bg-black text-white hover:bg-gray-800"
                >
                  <span>Continuer vers l'adresse</span>
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.8} />}
                </PrimaryButton>

                {/* Information */}
                <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" strokeWidth={1.8} />
                  <p className="text-[11px] leading-relaxed text-gray-600">
                    À l'étape suivante, vous pourrez sélectionner ou ajouter votre adresse de livraison.
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