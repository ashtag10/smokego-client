'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Sparkles,
  ShoppingBag,
  Users,
  Star,
  ImageIcon,
} from 'lucide-react'

import {
  PrimaryButton,
  SecondaryButton,
} from '@/components/ui/Button'

import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'

export const HeroSection = () => {
  const [imageError, setImageError] = useState(false)

  return (
    <section className="relative overflow-hidden bg-white">

      {/* Décoration dorée subtile */}
      <div
        className="
          pointer-events-none
          absolute
          -right-40
          -top-40
          h-80
          w-80
          rounded-full
          bg-[#D4AF37]/5
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-40
          h-80
          w-80
          rounded-full
          bg-[#D4AF37]/5
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1600px]
          px-2
          py-10
          sm:px-3
          sm:py-12
          lg:px-4
          lg:py-16
        "
      >
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-10
            md:grid-cols-2
            md:gap-12
          "
        >

          {/* =========================
              TEXTE
          ========================== */}
          <div className="space-y-6">

            {/* BADGE */}
            <div
              className="
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
                Bienvenue chez OusmanHOOKAH 
              </span>
            </div>

            {/* TITRE */}
            <Heading
              level="h1"
              className="
                text-4xl
                leading-[1.08]
                md:text-5xl
                lg:text-6xl
              "
            >
              L'expérience lounge
              <br />
              <span
                className="
                  bg-gradient-to-r
                  from-[#B8860B]
                  via-[#D4AF37]
                  to-[#C89B3C]
                  bg-clip-text
                  text-transparent
                "
              >
                à portée de main
              </span>
            </Heading>

            {/* DESCRIPTION */}
            <Paragraph
              className="
                max-w-lg
                text-lg
                leading-relaxed
                text-grey-600
              "
            >
              Découvrez notre sélection de chichas, saveurs et accessoires.
              Réservez votre table au lounge ou commandez en livraison.
            </Paragraph>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-3.5">

              {/* COMMANDER */}
              <Link href="/shop">
                <PrimaryButton
                  className="
                    px-7
                    py-3.5
                    text-base
                    transition-all
                    duration-300

                    hover:scale-[1.02]

                    hover:bg-gradient-to-r
                    hover:from-[#C9A94E]
                    hover:via-[#D4AF37]
                    hover:to-[#B8963E]

                    hover:text-white

                    hover:shadow-[0_8px_25px_rgba(212,175,55,0.28)]

                    active:scale-[0.99]
                  "
                >
                  <ShoppingBag className="mr-2 inline h-4 w-4" />
                  Commander maintenant
                </PrimaryButton>
              </Link>

              {/* RESERVATION */}
              <Link href="/reservations/new">
                <SecondaryButton
                  className="
                    border
                    border-[#D4AF37]/50
                    px-7
                    py-3.5
                    text-base
                    transition-all
                    duration-300

                    hover:border-[#D4AF37]
                    hover:bg-[#D4AF37]/10
                    hover:text-[#B8860B]
                    hover:shadow-[0_6px_20px_rgba(212,175,55,0.12)]

                    hover:scale-[1.02]

                    active:scale-[0.99]
                  "
                >
                  Réserver une table
                </SecondaryButton>
              </Link>

            </div>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-7
                gap-y-5
                border-t
                border-[#D4AF37]/15
                pt-5
              "
            >

              {/* PRODUITS */}
              <div>
                <p
                  className="
                    text-2xl
                    font-bold
                    text-black-main
                  "
                >
                  100+
                </p>

                <p
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-xs
                    text-grey-500
                  "
                >
                  <ShoppingBag
                    className="h-3.5 w-3.5 text-[#D4AF37]"
                  />
                  Produits disponibles
                </p>
              </div>

              {/* CLIENTS */}
              <div>
                <p
                  className="
                    text-2xl
                    font-bold
                    text-black-main
                  "
                >
                  50+
                </p>

                <p
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-xs
                    text-grey-500
                  "
                >
                  <Users
                    className="h-3.5 w-3.5 text-[#D4AF37]"
                  />
                  Clients satisfaits
                </p>
              </div>

              {/* NOTE */}
              <div>
                <p
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-2xl
                    font-bold
                    text-black-main
                  "
                >
                  4.8

                  <Star
                    className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]"
                  />
                </p>

                <p className="text-xs text-grey-500">
                  Note moyenne
                </p>
              </div>

            </div>
          </div>

          <div
            className="
              relative
              aspect-square
              overflow-hidden
              rounded-2xl
              bg-grey-100
              shadow-[0_15px_45px_rgba(0,0,0,0.12)]
              md:aspect-auto
              md:h-[500px]
            "
          >

            {!imageError ? (
              <Image
                src="/images/lounge/chicha.jpg"
                alt="Lounge SmokeGo - Expérience premium"
                fill
                className="
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-[1.02]
                "
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  w-full
                  flex-col
                  items-center
                  justify-center
                  bg-grey-100
                "
              >
                <ImageIcon
                  className="h-16 w-16 text-grey-300"
                />

                <span className="mt-3 text-sm text-grey-400">
                  Image du lounge
                </span>

                <span className="mt-1 text-xs text-grey-300">
                  Ajoutez votre image dans /public/images/hero/
                </span>
              </div>
            )}

            {/* OVERLAY */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-br
                from-[#D4AF37]/15
                via-transparent
                to-black/20
              "
            />

            {/* BADGE IMAGE */}
            <div
              className="
                absolute
                bottom-4
                left-4
                z-10
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#D4AF37]/30
                bg-black/65
                px-3.5
                py-2
                text-xs
                font-semibold
                tracking-wide
                text-white
                shadow-[0_5px_20px_rgba(0,0,0,0.2)]
                backdrop-blur-md
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
                "
              >
                <Sparkles
                  className="h-3 w-3 text-white"
                />
              </div>

              Lounge Premium
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}