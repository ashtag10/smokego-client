'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Plus, Check, ArrowRight, ShieldCheck, ChevronLeft, Home } from 'lucide-react'

import { usersApi } from '@/lib/api/users'
import { useAuthStore } from '@/lib/stores/authStore'

import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { AddressForm } from '@/components/checkout/AddressForm'

import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'

import { toast } from 'react-hot-toast'
import type { Address } from '@/lib/types/user'

const steps = ['Récapitulatif', 'Adresse', 'Paiement']

export default function CheckoutAddressPage() {
  const router = useRouter()
  const { user } = useAuthStore()

  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingAddresses, setIsFetchingAddresses] = useState(true)

  useEffect(() => {
    const fetchAddresses = async () => {
      setIsFetchingAddresses(true)
      try {
        const response = await usersApi.getAddresses()
        if (response.success && response.data) {
          setAddresses(response.data)
          const defaultAddress = response.data.find((address) => address.isDefault)
          if (defaultAddress) {
            setSelectedAddress(defaultAddress.id)
          }
        }
      } catch (error) {
        console.error('Failed to fetch addresses:', error)
        toast.error('Impossible de charger vos adresses')
      } finally {
        setIsFetchingAddresses(false)
      }
    }
    fetchAddresses()
  }, [])

  const handleAddAddress = async (
    data: Omit<Address, 'id' | 'userId' | 'createdAt'>
  ) => {
    setIsLoading(true)
    try {
      const response = await usersApi.createAddress(data)
      if (response.success && response.data) {
        const newAddress = response.data
        setAddresses((current) => [...current, newAddress])
        setSelectedAddress(newAddress.id)
        setShowForm(false)
        toast.success('Adresse ajoutée avec succès')
      } else {
        toast.error(response.message || "Erreur lors de l'ajout de l'adresse")
      }
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      toast.error('Veuillez sélectionner une adresse de livraison')
      return
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('checkoutAddressId', selectedAddress)
    }
    router.push('/checkout/payment')
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* =========================================================
            HEADER
        ========================================================= */}
        <section className="mb-8">
          <button
            type="button"
            onClick={() => router.push('/checkout')}
            className="group mb-5 inline-flex items-center gap-2 text-[13px] font-medium text-gray-500 transition-colors hover:text-purple-600"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.8} />
            Retour
          </button>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <MapPin className="h-5 w-5" strokeWidth={1.8} />
            </div>

            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-600">
                Étape 02
              </p>

              <h1 className="text-[24px] font-bold leading-tight tracking-tight text-black sm:text-[28px]">
                Adresse de livraison
              </h1>

              <p className="mt-2 max-w-xl text-[13px] text-gray-500">
                Sélectionnez une adresse existante ou ajoutez une nouvelle adresse pour recevoir votre commande.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            STEPPER
        ========================================================= */}
        <section className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <CheckoutStepper currentStep={1} steps={steps} />
        </section>

        {/* =========================================================
            CONTENU
        ========================================================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">

          {/* =======================================================
              ADRESSES
          ======================================================== */}
          <section className="lg:col-span-2">
            {!showForm ? (
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

                {/* Section header */}
                <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
                        <Home className="h-4 w-4 text-purple-600" strokeWidth={1.8} />
                      </div>
                      <h2 className="text-[15px] font-semibold text-black">
                        Mes adresses
                      </h2>
                    </div>
                    <p className="mt-1 text-[12px] text-gray-500">
                      {addresses.length > 0
                        ? `${addresses.length} adresse${addresses.length > 1 ? 's' : ''} enregistrée${addresses.length > 1 ? 's' : ''}`
                        : 'Aucune adresse enregistrée'}
                    </p>
                  </div>

                  {!isFetchingAddresses && addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center gap-2 self-start rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-[13px] font-medium text-black transition-colors hover:border-purple-300 hover:text-purple-600 sm:self-auto"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2} />
                      Ajouter
                    </button>
                  )}
                </div>

                {/* Loading */}
                {isFetchingAddresses ? (
                  <div className="space-y-4 p-5 sm:p-6">
                    {[1, 2].map((item) => (
                      <div key={item} className="animate-pulse rounded-xl border border-gray-100 p-5">
                        <div className="flex gap-4">
                          <div className="h-10 w-10 rounded-lg bg-gray-100" />
                          <div className="flex-1 space-y-3">
                            <div className="h-4 w-32 rounded bg-gray-100" />
                            <div className="h-3 w-48 rounded bg-gray-100" />
                            <div className="h-3 w-64 rounded bg-gray-100" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : addresses.length > 0 ? (
                  <div className="space-y-3 p-5 sm:p-6">
                    {addresses.map((address) => {
                      const isSelected = selectedAddress === address.id

                      return (
                        <button
                          key={address.id}
                          type="button"
                          onClick={() => setSelectedAddress(address.id)}
                          className={`
                            group relative w-full rounded-xl border p-4 text-left transition-all sm:p-5
                            ${isSelected
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-gray-50'}
                          `}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`
                                flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-all
                                ${isSelected
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-gray-100 text-gray-500 group-hover:bg-purple-50 group-hover:text-purple-600'}
                              `}
                            >
                              <MapPin className="h-5 w-5" strokeWidth={1.8} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-[14px] font-semibold text-black">
                                  {address.name}
                                </h3>

                                {address.isDefault && (
                                  <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-purple-700">
                                    <Check className="h-3 w-3" strokeWidth={2.5} />
                                    Par défaut
                                  </span>
                                )}
                              </div>

                              <div className="mt-2 space-y-1">
                                <p className="text-[13px] font-medium text-gray-700">
                                  {address.recipientName}
                                </p>
                                <p className="text-[13px] text-gray-500">
                                  {address.phone}
                                </p>
                                <p className="text-[13px] leading-relaxed text-gray-500">
                                  {address.detailedAddress}
                                  {address.district && `, ${address.district}`}
                                  {address.city && `, ${address.city}`}
                                </p>
                              </div>
                            </div>

                            <div
                              className={`
                                flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all
                                ${isSelected
                                  ? 'border-purple-600 bg-purple-600'
                                  : 'border-gray-200 bg-white group-hover:border-purple-400'}
                              `}
                            >
                              {isSelected && (
                                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                              )}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="px-5 py-12 text-center sm:px-6">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                      <MapPin className="h-6 w-6" strokeWidth={1.7} />
                    </div>

                    <h3 className="mt-4 text-[15px] font-semibold text-black">
                      Aucune adresse enregistrée
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-gray-500">
                      Ajoutez votre première adresse pour pouvoir recevoir vos commandes.
                    </p>

                    <PrimaryButton
                      onClick={() => setShowForm(true)}
                      className="mt-5 rounded-lg bg-black px-5 py-2.5 text-[13px] font-medium text-white hover:bg-gray-800"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Ajouter une adresse
                      </span>
                    </PrimaryButton>
                  </div>
                )}

                {/* Bottom actions */}
                {!isFetchingAddresses && addresses.length > 0 && (
                  <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 sm:px-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-purple-600" strokeWidth={1.8} />
                        <span className="text-[12px] text-gray-500">
                          Vos informations sont sécurisées
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row">
                        <SecondaryButton
                          onClick={() => router.push('/cart')}
                          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-medium text-black hover:border-gray-300"
                        >
                          <span className="inline-flex items-center gap-2">
                            <ChevronLeft className="h-4 w-4" />
                            Retour au panier
                          </span>
                        </SecondaryButton>

                        <PrimaryButton
                          onClick={handleProceedToPayment}
                          disabled={!selectedAddress}
                          className="rounded-lg bg-black px-4 py-2.5 text-[13px] font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                          <span className="inline-flex items-center gap-2">
                            Continuer
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </PrimaryButton>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                      <Plus className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h2 className="text-[15px] font-semibold text-black">
                        Nouvelle adresse
                      </h2>
                      <p className="mt-0.5 text-[12px] text-gray-500">
                        Ajoutez une adresse de livraison
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <AddressForm
                    onSubmit={handleAddAddress}
                    onCancel={() => setShowForm(false)}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            )}
          </section>

          {/* =======================================================
              SIDE PANEL
          ======================================================== */}
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <MapPin className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-purple-600">
                    Livraison
                  </p>
                  <h3 className="mt-0.5 text-[15px] font-semibold text-black">
                    Où souhaitez-vous recevoir votre commande ?
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-[13px] leading-relaxed text-gray-600">
                Choisissez une adresse enregistrée ou ajoutez-en une nouvelle. Vous pourrez ensuite sélectionner votre moyen de paiement.
              </p>

              <div className="mt-5 border-t border-gray-100 pt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                    <ShieldCheck className="h-4 w-4 text-purple-600" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-black">
                      Paiement sécurisé
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-500">
                      Vos données restent protégées
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}