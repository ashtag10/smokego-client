'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  MapPin,
  Plus,
  Check,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  Home,
} from 'lucide-react'

import { usersApi } from '@/lib/api/users'
import { useAuthStore } from '@/lib/stores/authStore'

import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { AddressForm } from '@/components/checkout/AddressForm'

import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
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

          const defaultAddress = response.data.find(
            (address) => address.isDefault
          )

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
        toast.error(
          response.message || "Erreur lors de l'ajout de l'adresse"
        )
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

    // ✅ Sauvegarder l'adresse sélectionnée dans sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('checkoutAddressId', selectedAddress)
    }

    router.push('/checkout/payment')
  }

  return (
    <main className="min-h-screen bg-[#FAF9F7]">
      <div
        className="
          mx-auto
          w-full
          max-w-[1200px]
          px-4
          py-8
          sm:px-6
          sm:py-10
          lg:px-8
          lg:py-12
        "
      >
        {/* HEADER */}
        <section className="mb-8">
          <div className="flex items-start gap-4">
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-[#C89B3C]
                via-[#D4AF37]
                to-[#B8860B]
                text-white
                shadow-[0_6px_20px_rgba(212,175,55,0.18)]
              "
            >
              <MapPin
                className="h-5 w-5"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <p
                className="
                  mb-1
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#B8860B]
                "
              >
                Étape 02
              </p>

              <Heading
                level="h1"
                className="
                  text-3xl
                  tracking-tight
                  text-black-main
                  sm:text-4xl
                "
              >
                Adresse de livraison
              </Heading>

              <Paragraph muted className="mt-2 max-w-xl">
                Sélectionnez une adresse existante ou ajoutez une nouvelle
                adresse pour recevoir votre commande.
              </Paragraph>
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
            p-4
            shadow-[0_4px_20px_rgba(0,0,0,0.035)]
            sm:p-5
          "
        >
          <CheckoutStepper
            currentStep={1}
            steps={steps}
          />
        </section>

        {/* CONTENU */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
          {/* ADRESSES */}
          <section className="lg:col-span-2">
            {!showForm ? (
              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-grey-100
                  bg-white
                  shadow-[0_4px_20px_rgba(0,0,0,0.035)]
                "
              >
                {/* Section header */}
                <div
                  className="
                    flex
                    flex-col
                    gap-3
                    border-b
                    border-grey-100
                    px-5
                    py-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:px-6
                  "
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#D4AF37]/10
                        "
                      >
                        <Home
                          className="h-4 w-4 text-[#D4AF37]"
                          strokeWidth={1.8}
                        />
                      </div>

                      <h2 className="font-semibold text-black-main">
                        Mes adresses
                      </h2>
                    </div>

                    <p className="mt-1 text-xs text-grey-500">
                      {addresses.length > 0
                        ? `${addresses.length} adresse${
                            addresses.length > 1 ? 's' : ''
                          } enregistrée${
                            addresses.length > 1 ? 's' : ''
                          }`
                        : 'Aucune adresse enregistrée'}
                    </p>
                  </div>

                  {!isFetchingAddresses && addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        self-start
                        rounded-xl
                        border
                        border-[#D4AF37]/25
                        bg-[#D4AF37]/5
                        px-3.5
                        py-2
                        text-sm
                        font-medium
                        text-[#B8860B]
                        transition-all
                        duration-200
                        hover:border-[#D4AF37]/40
                        hover:bg-[#D4AF37]/10
                        sm:self-auto
                      "
                    >
                      <Plus
                        className="h-4 w-4"
                        strokeWidth={2}
                      />
                      Ajouter
                    </button>
                  )}
                </div>

                {/* Loading */}
                {isFetchingAddresses ? (
                  <div className="space-y-4 p-5 sm:p-6">
                    {[1, 2].map((item) => (
                      <div
                        key={item}
                        className="
                          animate-pulse
                          rounded-2xl
                          border
                          border-grey-100
                          p-5
                        "
                      >
                        <div className="flex gap-4">
                          <div className="h-10 w-10 rounded-xl bg-grey-100" />
                          <div className="flex-1 space-y-3">
                            <div className="h-4 w-32 rounded bg-grey-100" />
                            <div className="h-3 w-48 rounded bg-grey-100" />
                            <div className="h-3 w-64 rounded bg-grey-100" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : addresses.length > 0 ? (
                  <div className="space-y-3 p-5 sm:p-6">
                    {addresses.map((address) => {
                      const isSelected =
                        selectedAddress === address.id

                      return (
                        <button
                          key={address.id}
                          type="button"
                          onClick={() =>
                            setSelectedAddress(address.id)
                          }
                          className={`
                            group
                            relative
                            w-full
                            rounded-2xl
                            border
                            p-4
                            text-left
                            transition-all
                            duration-200
                            sm:p-5
                            ${
                              isSelected
                                ? `
                                  border-[#D4AF37]/70
                                  bg-gradient-to-r
                                  from-[#D4AF37]/[0.08]
                                  via-white
                                  to-white
                                  shadow-[0_5px_20px_rgba(212,175,55,0.08)]
                                  ring-1
                                  ring-[#D4AF37]/20
                                `
                                : `
                                  border-grey-100
                                  bg-white
                                  hover:border-[#D4AF37]/35
                                  hover:bg-[#FAF9F7]
                                `
                            }
                          `}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                transition-all
                                ${
                                  isSelected
                                    ? 'bg-gradient-to-br from-[#C89B3C] via-[#D4AF37] to-[#B8860B] text-white shadow-[0_4px_12px_rgba(212,175,55,0.18)]'
                                    : 'bg-grey-50 text-grey-500 group-hover:bg-[#D4AF37]/10 group-hover:text-[#B8860B]'
                                }
                              `}
                            >
                              <MapPin
                                className="h-5 w-5"
                                strokeWidth={1.8}
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-semibold text-black-main">
                                  {address.name}
                                </h3>

                                {address.isDefault && (
                                  <span
                                    className="
                                      inline-flex
                                      items-center
                                      gap-1
                                      rounded-full
                                      border
                                      border-[#D4AF37]/20
                                      bg-[#D4AF37]/10
                                      px-2
                                      py-0.5
                                      text-[10px]
                                      font-semibold
                                      uppercase
                                      tracking-wide
                                      text-[#B8860B]
                                    "
                                  >
                                    <Check
                                      className="h-3 w-3"
                                      strokeWidth={2.5}
                                    />
                                    Par défaut
                                  </span>
                                )}
                              </div>

                              <div className="mt-2 space-y-1">
                                <p className="text-sm font-medium text-grey-700">
                                  {address.recipientName}
                                </p>

                                <p className="text-sm text-grey-500">
                                  {address.phone}
                                </p>

                                <p className="text-sm leading-relaxed text-grey-500">
                                  {address.detailedAddress}
                                  {address.district &&
                                    `, ${address.district}`}
                                  {address.city &&
                                    `, ${address.city}`}
                                </p>
                              </div>
                            </div>

                            <div
                              className={`
                                flex
                                h-6
                                w-6
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                border-2
                                transition-all
                                ${
                                  isSelected
                                    ? 'border-[#D4AF37] bg-[#D4AF37]'
                                    : 'border-grey-200 bg-white group-hover:border-[#D4AF37]/50'
                                }
                              `}
                            >
                              {isSelected && (
                                <Check
                                  className="h-3.5 w-3.5 text-white"
                                  strokeWidth={3}
                                />
                              )}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="px-5 py-12 text-center sm:px-6">
                    <div
                      className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#D4AF37]/10
                        text-[#B8860B]
                      "
                    >
                      <MapPin
                        className="h-6 w-6"
                        strokeWidth={1.7}
                      />
                    </div>

                    <h3 className="mt-4 font-semibold text-black-main">
                      Aucune adresse enregistrée
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-grey-500">
                      Ajoutez votre première adresse pour pouvoir
                      recevoir vos commandes.
                    </p>

                    <PrimaryButton
                      onClick={() => setShowForm(true)}
                      className="mt-5"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Ajouter une adresse
                      </span>
                    </PrimaryButton>
                  </div>
                )}

                {/* Bottom action */}
                {!isFetchingAddresses &&
                  addresses.length > 0 && (
                    <div
                      className="
                        border-t
                        border-grey-100
                        bg-[#FAF9F7]/60
                        px-5
                        py-4
                        sm:px-6
                      "
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldCheck
                            className="h-4 w-4 text-[#D4AF37]"
                            strokeWidth={1.8}
                          />

                          <span className="text-xs text-grey-500">
                            Vos informations sont sécurisées
                          </span>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                          <SecondaryButton
                            onClick={() =>
                              router.push('/cart')
                            }
                          >
                            <span className="inline-flex items-center gap-2">
                              <ChevronLeft className="h-4 w-4" />
                              Retour au panier
                            </span>
                          </SecondaryButton>

                          <PrimaryButton
                            onClick={handleProceedToPayment}
                            disabled={!selectedAddress}
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
              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-grey-100
                  bg-white
                  shadow-[0_4px_20px_rgba(0,0,0,0.035)]
                "
              >
                <div
                  className="
                    border-b
                    border-grey-100
                    px-5
                    py-5
                    sm:px-6
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
                        bg-[#D4AF37]/10
                        text-[#B8860B]
                      "
                    >
                      <Plus
                        className="h-5 w-5"
                        strokeWidth={1.8}
                      />
                    </div>

                    <div>
                      <h2 className="font-semibold text-black-main">
                        Nouvelle adresse
                      </h2>

                      <p className="mt-0.5 text-xs text-grey-500">
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

          {/* SIDE PANEL */}
          <aside className="lg:sticky lg:top-24">
            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[#D4AF37]/15
                bg-black-main
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
              "
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-[#D4AF37]/10
                  blur-3xl
                "
              />

              <div className="relative p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
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
                    <MapPin
                      className="h-5 w-5"
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[#D4AF37]">
                      Livraison
                    </p>

                    <h3 className="mt-0.5 font-serif text-lg text-black">
                      Où souhaitez-vous recevoir votre commande ?
                    </h3>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-black">
                  Choisissez une adresse enregistrée ou ajoutez-en
                  une nouvelle. Vous pourrez ensuite sélectionner
                  votre moyen de paiement.
                </p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-3">
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
                      <ShieldCheck
                        className="h-4 w-4 text-[#D4AF37]"
                        strokeWidth={1.8}
                      />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-black">
                        Paiement sécurisé
                      </p>

                      <p className="mt-0.5 text-[11px] text-black">
                        Vos données restent protégées
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[#D4AF37]/50
                  to-transparent
                "
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}