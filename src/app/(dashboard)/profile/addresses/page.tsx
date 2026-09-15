'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  MapPin,
  Plus,
  Sparkles,
  Navigation,
  ArrowRight,
  MapPinned,
} from 'lucide-react'

import { usersApi } from '@/lib/api/users'
import { AddressCard } from '@/components/profile/AddressCard'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { toast } from 'react-hot-toast'
import type { Address } from '@/lib/types/user'

export default function AddressesPage() {
  const router = useRouter()

  const [addresses, setAddresses] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    setIsLoading(true)

    try {
      const response = await usersApi.getAddresses()

      if (response.success && response.data) {
        setAddresses(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette adresse ?')) {
      return
    }

    try {
      const response = await usersApi.deleteAddress(id)

      if (response.success) {
        toast.success('Adresse supprimée')
        fetchAddresses()
      } else {
        toast.error(
          response.message || 'Erreur lors de la suppression'
        )
      }
    } catch (error) {
      console.error('Failed to delete address:', error)
      toast.error('Une erreur est survenue')
    }
  }

  const handleSetDefault = async (id: string) => {
    try {
      const address = addresses.find((a) => a.id === id)

      if (address) {
        const response = await usersApi.updateAddress(id, {
          ...address,
          isDefault: true,
        })

        if (response.success) {
          toast.success('Adresse par défaut mise à jour')
          fetchAddresses()
        }
      }
    } catch (error) {
      console.error('Failed to set default address:', error)
      toast.error('Une erreur est survenue')
    }
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <div
          className="
            mx-auto
            w-full
            max-w-[1100px]
            px-3
            py-6
            sm:px-5
            sm:py-8
            md:py-10
            lg:px-6
            lg:py-12
          "
        >
          {/* Hero skeleton */}
          <div
            className="
              mb-6
              overflow-hidden
              rounded-2xl
              bg-black-main
              px-5
              py-8
              sm:px-8
              md:mb-8
              md:rounded-3xl
              md:px-10
              md:py-10
            "
          >
            <div className="animate-pulse space-y-4">
              <div className="h-7 w-36 rounded-full bg-white/10" />
              <div className="h-10 w-72 max-w-full rounded-lg bg-white/10" />
              <div className="h-5 w-96 max-w-full rounded bg-white/10" />
            </div>
          </div>

          {/* Header skeleton */}
          <div className="mb-6 flex items-center gap-3 px-1">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-grey-100" />

            <div className="space-y-2">
              <div className="h-4 w-36 animate-pulse rounded bg-grey-100" />
              <div className="h-3 w-48 animate-pulse rounded bg-grey-100" />
            </div>
          </div>

          {/* Address skeletons */}
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-grey-100
                  bg-white
                  p-5
                  shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                  sm:p-6
                "
              >
                <div className="flex gap-4">
                  <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-grey-100" />

                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-32 animate-pulse rounded bg-grey-100" />
                    <div className="h-3 w-3/4 animate-pulse rounded bg-grey-100" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-grey-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (addresses.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <div
          className="
            mx-auto
            w-full
            max-w-[1100px]
            px-3
            py-6
            sm:px-5
            sm:py-8
            md:py-10
            lg:px-6
            lg:py-12
          "
        >
          {/* Hero */}
          <section
            className="
              relative
              mb-6
              overflow-hidden
              rounded-2xl
              bg-black-main
              px-5
              py-8
              sm:px-8
              md:mb-8
              md:rounded-3xl
              md:px-10
              md:py-10
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-72
                w-72
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
                -bottom-32
                -left-24
                h-72
                w-72
                rounded-full
                bg-gold-main/5
                blur-3xl
              "
            />

            <div className="relative z-10">
              {/* Badge */}
              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-gold-main
                  px-4
                  py-2
                  text-black-main
                  shadow-[0_4px_24px_rgba(245,166,35,0.18)]
                "
              >
                <Sparkles className="h-3.5 w-3.5" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-xs">
                  SmokeGo
                </span>
              </div>

              <p
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  tracking-wide
                  text-gold-main
                  sm:text-base
                "
              >
                <MapPin className="h-4 w-4" />

                Mes adresses
              </p>

              <h1
                className="
                  max-w-3xl
                  font-serif
                  text-3xl
                  font-semibold
                  leading-[1.05]
                  tracking-tight
                  text-white
                  sm:text-4xl
                  md:text-5xl
                "
              >
                Gérez vos
                <span className="mt-1 block text-gold-main">
                  adresses
                </span>
              </h1>

              <Paragraph
                className="
                  mt-5
                  max-w-xl
                  text-sm
                  leading-relaxed
                  text-white/60
                  md:text-base
                "
              >
                Enregistrez vos adresses pour simplifier vos commandes
                et profiter d'une expérience SmokeGo plus rapide.
              </Paragraph>
            </div>

            <div
              className="
                absolute
                bottom-0
                left-5
                right-5
                sm:left-8
                sm:right-8
                md:left-10
                md:right-10
              "
            >
              <div className="h-px bg-gradient-to-r from-transparent via-gold-main/40 to-transparent" />
            </div>
          </section>

          {/* Empty */}
          <section
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-grey-100
              bg-white
              px-5
              py-12
              text-center
              shadow-[0_10px_40px_rgba(0,0,0,0.04)]
              sm:px-8
              sm:py-16
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-64
                w-64
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-gold-main/5
                blur-3xl
              "
            />

            <div className="relative z-10 mx-auto max-w-md">
              <div
                className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-gold-main/20
                  bg-gold-main/10
                  text-gold-main
                  shadow-[0_8px_30px_rgba(245,166,35,0.10)]
                "
              >
                <MapPinned
                  className="h-9 w-9"
                  strokeWidth={1.6}
                />
              </div>

              <h2
                className="
                  mt-6
                  font-serif
                  text-2xl
                  font-semibold
                  text-black-main
                  sm:text-3xl
                "
              >
                Aucune adresse enregistrée
              </h2>

              <Paragraph
                muted
                className="mt-3 text-sm leading-relaxed sm:text-base"
              >
                Ajoutez votre première adresse pour faciliter vos
                prochaines commandes.
              </Paragraph>

              <button
                type="button"
                onClick={() =>
                  router.push('/profile/addresses/new')
                }
                className="
                  group
                  mt-7
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-gold-main
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-black-main
                  shadow-[0_8px_24px_rgba(245,166,35,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_12px_30px_rgba(245,166,35,0.28)]
                "
              >
                <Plus className="h-4 w-4" />

                Ajouter une adresse

                <ArrowRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>
            </div>
          </section>
        </div>
      </main>
    )
  }

  /* =========================================================
     ADDRESSES
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#FAF9F7]">
      <div
        className="
          mx-auto
          w-full
          max-w-[1100px]
          px-3
          py-6
          sm:px-5
          sm:py-8
          md:py-10
          lg:px-6
          lg:py-12
        "
      >
        {/* =====================================================
            HERO
        ====================================================== */}

        <section
          className="
            relative
            mb-6
            overflow-hidden
            rounded-2xl
            bg-black-main
            px-5
            py-7
            sm:px-7
            sm:py-8
            md:mb-8
            md:rounded-3xl
            md:px-10
            md:py-10
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-72
              w-72
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
              -bottom-32
              -left-24
              h-72
              w-72
              rounded-full
              bg-gold-main/5
              blur-3xl
            "
          />

          <div className="relative z-10 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              {/* Badge */}
              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-gold-main
                  px-4
                  py-2
                  text-black-main
                  shadow-[0_4px_24px_rgba(245,166,35,0.18)]
                "
              >
                <Sparkles className="h-3.5 w-3.5" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-xs">
                  SmokeGo
                </span>
              </div>

              <p
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  tracking-wide
                  text-gold-main
                  sm:text-base
                "
              >
                <MapPin className="h-4 w-4" />

                Mon compte
              </p>

              <h1
                className="
                  font-serif
                  text-3xl
                  font-semibold
                  leading-[1.05]
                  tracking-tight
                  text-white
                  sm:text-4xl
                  md:text-5xl
                "
              >
                Mes
                <span className="ml-2 text-gold-main">
                  adresses
                </span>
              </h1>

              <Paragraph
                className="
                  mt-5
                  max-w-xl
                  text-sm
                  leading-relaxed
                  text-white/60
                  md:text-base
                "
              >
                Gérez vos adresses de livraison et sélectionnez
                facilement votre adresse par défaut.
              </Paragraph>
            </div>

            {/* Counter */}
            <div
              className="
                flex
                items-center
                gap-3
                self-start
                sm:self-auto
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-gold-main
                  text-black-main
                  shadow-[0_4px_16px_rgba(245,166,35,0.12)]
                "
              >
                <Navigation className="h-5 w-5" />
              </div>

              <div>
                <p className="text-2xl font-semibold leading-none text-white">
                  {addresses.length}
                </p>

                <p className="mt-1 text-xs text-white/40">
                  {addresses.length > 1
                    ? 'adresses enregistrées'
                    : 'adresse enregistrée'}
                </p>
              </div>
            </div>
          </div>

          <div
            className="
              absolute
              bottom-0
              left-5
              right-5
              sm:left-7
              sm:right-7
              md:left-10
              md:right-10
            "
          >
            <div className="h-px bg-gradient-to-r from-transparent via-gold-main/40 to-transparent" />
          </div>
        </section>

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
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
                border
                border-gold-main/15
                bg-white
                text-gold-main
                shadow-sm
              "
            >
              <MapPinned className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-black-main">
                Adresses enregistrées
              </p>

              <p className="mt-0.5 text-xs text-grey-500">
                {addresses.length} adresse
                {addresses.length > 1 ? 's' : ''} disponible
                {addresses.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <PrimaryButton
            onClick={() =>
              router.push('/profile/addresses/new')
            }
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              sm:w-auto
            "
          >
            <Plus className="h-4 w-4" />

            Ajouter une adresse
          </PrimaryButton>
        </div>

        {/* =====================================================
            ADDRESS LIST
        ====================================================== */}

        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-grey-100
                bg-white
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                transition-all
                duration-300
                hover:border-gold-main/20
                hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)]
              "
            >
              <AddressCard
                address={address}
                onEdit={(addr) =>
                  router.push(
                    `/profile/addresses/${addr.id}/edit`
                  )
                }
                onDelete={handleDelete}
                onSetDefault={handleSetDefault}
              />
            </div>
          ))}
        </div>

        {/* Bottom information */}
        <div className="mt-5 flex items-start gap-2 px-1 sm:mt-6">
          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-main" />

          <p className="text-xs leading-relaxed text-grey-400">
            Votre adresse par défaut sera automatiquement utilisée
            lorsque cela est nécessaire pour vos commandes.
          </p>
        </div>
      </div>
    </main>
  )
}