'use client'

import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  ShieldCheck,
  Sparkles,
  Users,
  CheckCircle2,
} from 'lucide-react'

import { useReservations } from '@/lib/hooks/useReservations'
import { ReservationForm } from '@/components/reservations/ReservationForm'
import { toast } from 'react-hot-toast'

export default function NewReservationPage() {
  const router = useRouter()

  const {
    tables,
    createReservation,
    isLoading,
  } = useReservations()

  const handleSubmit = async (data: any) => {
    try {
      await createReservation(data)

      toast.success('Réservation créée avec succès')

      router.push('/reservations')
    } catch (error) {
      console.error(
        'Erreur lors de la création de la réservation:',
        error
      )

      toast.error(
        'Erreur lors de la création de la réservation'
      )

      throw error
    }
  }

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
            RETOUR
        ====================================================== */}

        <button
          type="button"
          onClick={() => router.back()}
          className="
            group
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
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:-translate-x-1
            "
          />

          Retour
        </button>

        {/* =====================================================
            HERO — MÊME DESIGN QUE LA BOUTIQUE
        ====================================================== */}

        <section
          className="
            relative
            mt-5
            mb-9
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
          {/* Décoration dorée — haut droite */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-72
              w-72
              rounded-full
              bg-[#D4AF37]/10
              blur-3xl
            "
          />

          {/* Décoration dorée — bas gauche */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-40
              -left-32
              h-80
              w-80
              rounded-full
              bg-[#D4AF37]/5
              blur-3xl
            "
          />

          {/* Décoration centrale */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-0
              right-1/4
              h-36
              w-36
              rounded-full
              bg-[#D4AF37]/5
              blur-3xl
            "
          />

          {/* ===================================================
              CONTENU HERO
          ==================================================== */}

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-8
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            {/* =================================================
                TEXTE
            ================================================== */}

            <div className="max-w-2xl">

              {/* BADGE — IDENTIQUE BOUTIQUE */}

              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2.5
                  rounded-full
                  border
                  border-[#D4AF37]/25
                  bg-gradient-to-r
                  from-[#D4AF37]/10
                  via-[#FFF9E8]
                  to-white
                  px-3.5
                  py-2
                  shadow-[0_3px_12px_rgba(184,134,11,0.08)]
                "
              >
                <div
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-[#C89B3C]
                    via-[#D4AF37]
                    to-[#B8860B]
                    text-white
                    shadow-[0_2px_8px_rgba(184,134,11,0.2)]
                  "
                >
                  <Sparkles
                    className="h-3.5 w-3.5"
                    strokeWidth={2}
                  />
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

              {/* PETITE CATÉGORIE */}

              <p
                className="
                  mb-2
                  text-sm
                  font-medium
                  tracking-wide
                  text-[#D4AF37]
                  sm:text-base
                "
              >
                Réservation
              </p>

              {/* TITRE */}

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
                  lg:text-6xl
                "
              >
                Réservez votre

                <span
                  className="
                    mt-1
                    block
                    bg-gradient-to-r
                    from-[#B8860B]
                    via-[#D4AF37]
                    to-[#C89B3C]
                    bg-clip-text
                    text-transparent
                  "
                >
                  expérience SmokeGo
                </span>
              </h1>

              {/* DESCRIPTION
                  TEXTE NOIR COMME DEMANDÉ
              */}

              <p
                className="
                  mt-5
                  max-w-xl
                  text-sm
                  leading-relaxed
                  text-black
                  md:text-base
                "
              >
                Choisissez votre date, votre heure et votre espace.
                Nous préparons votre table pour vous offrir une
                expérience premium au lounge.
              </p>
            </div>

            {/* =================================================
                INFORMATIONS
            ================================================== */}

            <div
              className="
                flex
                flex-col
                gap-3
                self-start
                lg:self-auto
              "
            >
              {/* Réservation 7 jours */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-black
                "
              >
                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#D4AF37]/10
                  "
                >
                  <CalendarDays
                    className="h-4 w-4 text-[#D4AF37]"
                  />
                </div>

                <span>
                  Réservation jusqu'à 7 jours
                </span>
              </div>

              {/* Horaires */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-black
                "
              >
                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#D4AF37]/10
                  "
                >
                  <Clock3
                    className="h-4 w-4 text-[#D4AF37]"
                  />
                </div>

                <span>
                  18h00 — 02h00
                </span>
              </div>

              {/* Nombre de personnes */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-black
                "
              >
                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#D4AF37]/10
                  "
                >
                  <Users
                    className="h-4 w-4 text-[#D4AF37]"
                  />
                </div>

                <span>
                  Jusqu'à 12 personnes
                </span>
              </div>
            </div>
          </div>

          {/* =====================================================
              LIGNE DORÉE
          ====================================================== */}

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
                via-[#D4AF37]/50
                to-transparent
              "
            />
          </div>
        </section>

        {/* =====================================================
            CONTENU PRINCIPAL
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[minmax(0,1fr)_320px]
            lg:items-start
            xl:grid-cols-[minmax(0,1fr)_360px]
          "
        >
          {/* =================================================
              FORMULAIRE
          ================================================== */}

          <section
            className="
              min-w-0
              overflow-hidden
              rounded-2xl
              border
              border-[#D4AF37]/10
              bg-white
              p-4
              shadow-[0_8px_35px_rgba(0,0,0,0.04)]
              sm:p-6
              md:p-7
            "
          >
            <ReservationForm
              tables={tables}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </section>

          {/* =================================================
              SIDEBAR
          ================================================== */}

          <aside
            className="
              space-y-5
              lg:sticky
              lg:top-6
            "
          >
            {/* =================================================
                EXPÉRIENCE PREMIUM
            ================================================== */}

            <section
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[#D4AF37]/10
                bg-white
                shadow-[0_6px_25px_rgba(0,0,0,0.035)]
              "
            >
              {/* Header */}

              <div
                className="
                  border-b
                  border-grey-100
                  p-5
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
                      bg-black-main
                      text-[#D4AF37]
                    "
                  >
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <h2
                      className="
                        text-sm
                        font-semibold
                        text-black-main
                      "
                    >
                      Une expérience premium
                    </h2>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        text-grey-400
                      "
                    >
                      Votre soirée commence ici
                    </p>
                  </div>
                </div>
              </div>

              {/* Contenu */}

              <div className="space-y-4 p-5">

                {/* Table préparée */}

                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#D4AF37]/10
                      text-[#D4AF37]
                    "
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </div>

                  <div>
                    <p
                      className="
                        text-xs
                        font-semibold
                        text-black-main
                      "
                    >
                      Table préparée
                    </p>

                    <p
                      className="
                        mt-1
                        text-[11px]
                        leading-relaxed
                        text-grey-400
                      "
                    >
                      Votre espace sera préparé avant
                      votre arrivée.
                    </p>
                  </div>
                </div>

                {/* Réservation sécurisée */}

                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#D4AF37]/10
                      text-[#D4AF37]
                    "
                  >
                    <ShieldCheck className="h-4 w-4" />
                  </div>

                  <div>
                    <p
                      className="
                        text-xs
                        font-semibold
                        text-black-main
                      "
                    >
                      Réservation sécurisée
                    </p>

                    <p
                      className="
                        mt-1
                        text-[11px]
                        leading-relaxed
                        text-grey-400
                      "
                    >
                      Votre réservation est enregistrée
                      directement dans notre système.
                    </p>
                  </div>
                </div>

                {/* QR Code */}

                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#D4AF37]/10
                      text-[#D4AF37]
                    "
                  >
                    <QrCodeIcon />
                  </div>

                  <div>
                    <p
                      className="
                        text-xs
                        font-semibold
                        text-black-main
                      "
                    >
                      QR Code
                    </p>

                    <p
                      className="
                        mt-1
                        text-[11px]
                        leading-relaxed
                        text-grey-400
                      "
                    >
                      Une fois confirmée, votre
                      réservation disposera d'un QR Code.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                HORAIRES
            ================================================== */}

            <section
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[#D4AF37]/10
                bg-white
                shadow-[0_6px_25px_rgba(0,0,0,0.035)]
              "
            >
              <div className="p-5">

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
                      shadow-[0_3px_12px_rgba(212,175,55,0.16)]
                    "
                  >
                    <Clock3 className="h-5 w-5" />
                  </div>

                  <div>
                    <p
                      className="
                        text-sm
                        font-semibold
                        text-black-main
                      "
                    >
                      Horaires du lounge
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        text-grey-400
                      "
                    >
                      Profitez de votre soirée
                    </p>
                  </div>
                </div>

                {/* Horaires */}

                <div
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-[#D4AF37]/10
                    bg-[#FAF9F7]
                    p-4
                  "
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-grey-500">
                      Ouverture
                    </span>

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-black-main
                      "
                    >
                      18h00
                    </span>
                  </div>

                  <div className="my-3 h-px bg-grey-100" />

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-grey-500">
                      Fermeture
                    </span>

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-black-main
                      "
                    >
                      02h00
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                CONSEIL
            ================================================== */}

            <div
              className="
                rounded-2xl
                border
                border-[#D4AF37]/15
                bg-[#D4AF37]/5
                p-5
              "
            >
              <div className="flex items-start gap-3">
                <InfoIcon />

                <div>
                  <p
                    className="
                      text-xs
                      font-semibold
                      text-black-main
                    "
                  >
                    Petit conseil
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      leading-relaxed
                      text-grey-500
                    "
                  >
                    Pour une meilleure expérience, pensez
                    à arriver quelques minutes avant l'heure
                    prévue.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div
          className="
            mt-8
            border-t
            border-grey-100
            pt-6
          "
        >
          <p
            className="
              text-center
              text-[11px]
              leading-relaxed
              text-grey-400
            "
          >
            Ousman Lounge · Premium Hookah Experience
          </p>
        </div>
      </div>
    </main>
  )
}

/* =========================================================
   QR CODE ICON
========================================================= */

function QrCodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1"
      />

      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1"
      />

      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1"
      />

      <path d="M14 14h3v3h-3z" />
      <path d="M18 18h3v3h-3z" />
      <path d="M14 20h2" />
      <path d="M20 14v2" />
    </svg>
  )
}

/* =========================================================
   INFO ICON
========================================================= */

function InfoIcon() {
  return (
    <div
      className="
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-lg
        bg-[#D4AF37]/10
        text-[#B8860B]
      "
    >
      <span className="text-sm font-bold">
        i
      </span>
    </div>
  )
}