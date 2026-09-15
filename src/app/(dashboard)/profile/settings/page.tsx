'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Bell,
  BellRing,
  Check,
  LogOut,
  Save,
  Settings,
  ShoppingBag,
  Truck,
  CalendarDays,
  CreditCard,
  Megaphone,
  Sparkles,
} from 'lucide-react'

import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'
import { useAuthStore } from '@/lib/stores/authStore'
import { toast } from 'react-hot-toast'

export default function SettingsPage() {
  const router = useRouter()
  const { logout } = useAuthStore()

  const [notifications, setNotifications] = useState({
    order: true,
    delivery: true,
    reservation: true,
    payment: true,
    promo: true,
  })

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = async () => {
    // TODO: Sauvegarder les préférences
    toast.success('Paramètres sauvegardés')
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
    toast.success('Déconnecté')
  }

  const notificationItems = [
    {
      key: 'order' as const,
      label: 'Commandes',
      description: 'Recevoir les mises à jour de vos commandes',
      icon: ShoppingBag,
    },
    {
      key: 'delivery' as const,
      label: 'Livraisons',
      description: 'Suivre l’état et la progression de vos livraisons',
      icon: Truck,
    },
    {
      key: 'reservation' as const,
      label: 'Réservations',
      description: 'Recevoir les confirmations et rappels',
      icon: CalendarDays,
    },
    {
      key: 'payment' as const,
      label: 'Paiements',
      description: 'Être informé de vos paiements et transactions',
      icon: CreditCard,
    },
    {
      key: 'promo' as const,
      label: 'Promotions',
      description: 'Découvrir nos offres et nouveautés SmokeGo',
      icon: Megaphone,
    },
  ]

  return (
    <main className="min-h-screen bg-[#FAF9F7]">
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-2
          py-8
          sm:px-3
          sm:py-10
          lg:px-4
          lg:py-12
        "
      >
        {/* =====================================================
            HERO
        ====================================================== */}

        <section
          className="
            relative
            mb-8
            overflow-hidden
            rounded-2xl
            bg-black-main
            px-5
            py-8
            sm:px-7
            sm:py-9
            md:mb-10
            md:rounded-3xl
            md:px-10
            md:py-10
          "
        >
          {/* Glow droite */}
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

          {/* Glow gauche */}
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

          {/* Glow central */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-1/4
              top-1/2
              h-24
              w-24
              rounded-full
              bg-gold-main/5
              blur-2xl
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
              <Sparkles
                className="h-3.5 w-3.5"
                strokeWidth={2}
              />

              <span
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  sm:text-xs
                "
              >
                SmokeGo
              </span>
            </div>

            {/* Catégorie */}
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
              <Settings className="h-4 w-4" />

              Préférences
            </p>

            {/* Titre */}
            <Heading
              level="h1"
              className="
                font-serif
                text-3xl
                font-semibold
                leading-[1.05]
                tracking-tight
                text-white
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
              "
            >
              Vos paramètres

              <span
                className="
                  mt-1
                  block
                  text-gold-main
                "
              >
                SmokeGo
              </span>
            </Heading>

            {/* Description */}
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
              Personnalisez vos préférences de notification
              et gérez facilement votre expérience SmokeGo.
            </Paragraph>
          </div>

          {/* Ligne dorée */}
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
            <div
              className="
                h-px
                bg-gradient-to-r
                from-transparent
                via-gold-main/40
                to-transparent
              "
            />
          </div>
        </section>

        {/* =====================================================
            CONTENU
        ====================================================== */}

        <div className="mx-auto w-full max-w-5xl">
          {/* Section intro */}
          <div className="mb-5 flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-black-main
                text-gold-main
                shadow-sm
              "
            >
              <Settings className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-black-main">
                Gestion des préférences
              </h2>

              <p className="mt-0.5 text-xs text-grey-500">
                Contrôlez les notifications que vous souhaitez recevoir
              </p>
            </div>
          </div>

          {/* =================================================
              NOTIFICATIONS
          ================================================== */}

          <section
            className="
              overflow-hidden
              rounded-2xl
              border
              border-grey-100
              bg-white
              shadow-[0_8px_30px_rgba(0,0,0,0.04)]
            "
          >
            {/* Header */}
            <div
              className="
                border-b
                border-grey-100
                bg-gradient-to-r
                from-[#FFFDF8]
                via-white
                to-white
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
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-gold-main
                    text-black-main
                    shadow-[0_4px_14px_rgba(245,166,35,0.12)]
                  "
                >
                  <BellRing className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-black-main">
                    Notifications
                  </h3>

                  <p className="mt-0.5 text-xs text-grey-500 sm:text-sm">
                    Choisissez les informations que vous souhaitez recevoir
                  </p>
                </div>
              </div>
            </div>

            {/* Liste */}
            <div className="divide-y divide-grey-100">
              {notificationItems.map(
                ({
                  key,
                  label,
                  description,
                  icon: Icon,
                }) => {
                  const enabled = notifications[key]

                  return (
                    <div
                      key={key}
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        px-5
                        py-4
                        transition-colors
                        hover:bg-[#FFFDF8]
                        sm:px-6
                        sm:py-5
                      "
                    >
                      {/* Informations */}
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            transition-colors
                            ${
                              enabled
                                ? 'bg-gold-main/10 text-gold-main'
                                : 'bg-grey-100 text-grey-400'
                            }
                          `}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              text-sm
                              font-medium
                              text-black-main
                            "
                          >
                            {label}
                          </p>

                          <p
                            className="
                              mt-0.5
                              max-w-md
                              text-xs
                              leading-relaxed
                              text-grey-500
                            "
                          >
                            {description}
                          </p>
                        </div>
                      </div>

                      {/* Toggle */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={enabled}
                        aria-label={`Notifications ${label}`}
                        onClick={() => handleToggle(key)}
                        className={`
                          relative
                          h-7
                          w-12
                          shrink-0
                          rounded-full
                          border
                          transition-all
                          duration-300
                          focus:outline-none
                          focus:ring-4
                          focus:ring-gold-main/10
                          ${
                            enabled
                              ? 'border-gold-main bg-gold-main'
                              : 'border-grey-200 bg-grey-200'
                          }
                        `}
                      >
                        <span
                          className={`
                            absolute
                            top-1/2
                            flex
                            h-5
                            w-5
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            shadow-sm
                            transition-transform
                            duration-300
                            ${
                              enabled
                                ? 'translate-x-6'
                                : 'translate-x-0.5'
                            }
                          `}
                        >
                          {enabled && (
                            <Check
                              className="h-3 w-3 text-gold-main"
                              strokeWidth={3}
                            />
                          )}
                        </span>
                      </button>
                    </div>
                  )
                }
              )}
            </div>

            {/* Footer */}
            <div
              className="
                border-t
                border-grey-100
                bg-[#FAF9F7]
                px-5
                py-4
                sm:px-6
              "
            >
              <div className="flex items-center gap-2 text-xs text-grey-500">
                <Bell className="h-3.5 w-3.5 text-gold-main" />

                <span>
                  Les modifications seront appliquées après sauvegarde.
                </span>
              </div>
            </div>
          </section>

          {/* =================================================
              ACTIONS
          ================================================== */}

          <section className="mt-6">
            <div className="mb-4 flex items-center gap-2">
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-black-main
                  text-gold-main
                "
              >
                <Settings className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-black-main">
                  Actions du compte
                </h2>

                <p className="text-xs text-grey-500">
                  Gérez votre session SmokeGo
                </p>
              </div>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-grey-100
                bg-white
                p-5
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                sm:p-6
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                {/* Texte */}
                <div>
                  <p className="text-sm font-semibold text-black-main">
                    Enregistrer vos préférences
                  </p>

                  <p className="mt-1 text-xs text-grey-500">
                    Sauvegardez vos choix de notification.
                  </p>
                </div>

                {/* Boutons */}
                <div
                  className="
                    flex
                    w-full
                    flex-col
                    gap-3
                    sm:w-auto
                    sm:flex-row
                  "
                >
                  <PrimaryButton
                    onClick={handleSave}
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      px-6
                      shadow-md
                      shadow-gold-main/10
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:shadow-lg
                      hover:shadow-gold-main/20
                    "
                  >
                    <Save className="h-4 w-4" />
                    Sauvegarder
                  </PrimaryButton>

                  <SecondaryButton
                    onClick={handleLogout}
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      px-6
                      transition-all
                      duration-200
                      hover:border-red-200
                      hover:bg-red-50
                      hover:text-red-600
                    "
                  >
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </section>

          {/* Signature */}
          <div
            className="
              mt-8
              flex
              items-center
              justify-center
              gap-2
              border-t
              border-grey-100
              pt-6
            "
          >
            <span className="h-px w-10 bg-gold-main/20" />

            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-grey-400
              "
            >
              SmokeGo Premium Experience
            </span>

            <span className="h-px w-10 bg-gold-main/20" />
          </div>
        </div>
      </div>
    </main>
  )
}