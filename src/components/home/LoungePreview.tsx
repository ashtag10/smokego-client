import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  Clock,
  Phone,
  Sparkles,
  ImageIcon,
  CircleCheck,
} from 'lucide-react'

import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { GoldDivider } from '@/components/ui/Divider/GoldDivider'

export const LoungePreview = () => {
  const imageExists = true

  return (
    <section className="bg-gold-light/30 py-12">
      <div className="mx-auto w-full max-w-[1600px] px-2 sm:px-3 lg:px-4">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">

         
          <div
            className="
              relative
              order-2
              aspect-video
              overflow-hidden
              rounded-2xl
              bg-grey-200
              shadow-xl
              md:order-1
            "
          >
            {imageExists ? (
              <Image
                src="/images/lounge/lounge-preview.jpg"
                alt="Lounge SmokeGo"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
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
                <ImageIcon className="h-12 w-12 text-grey-300" />

                <span className="mt-2 text-sm text-grey-400">
                  Image du lounge
                </span>
              </div>
            )}

            {/* Overlay léger */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/20
                via-transparent
                to-transparent
              "
            />

            {/* Badge Lounge */}
            <div
              className="
                absolute
                left-4
                top-4
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-white/20
                bg-gradient-to-r
                from-[#C89B3C]/95
                via-[#D4AF37]/95
                to-[#B8860B]/95
                px-3
                py-1.5
                text-xs
                font-semibold
                text-white
                shadow-[0_4px_15px_rgba(0,0,0,0.15)]
                backdrop-blur-sm
              "
            >
              <Sparkles className="h-3.5 w-3.5" />
              Lounge
            </div>
          </div>

          <div className="order-1 space-y-6 md:order-2">

            {/* STATUS BADGE */}
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
              {/* Icône statut */}
              <div
                className="
                  flex
                  h-6
                  w-6
                  shrink-0
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
                <CircleCheck
                  className="h-3.5 w-3.5"
                  strokeWidth={2.5}
                />
              </div>

              {/* Texte */}
              <span
                className="
                  text-xs
                  font-semibold
                  tracking-wide
                  text-[#B8860B]
                "
              >
                Ouvert maintenant
              </span>

              {/* Indicateur */}
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-emerald-400
                    opacity-60
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-emerald-500
                  "
                />
              </span>
            </div>

            {/* TITLE */}
            <Heading level="h2">
              Le Lounge OusmanHOOKAH 
            </Heading>

            {/* DESCRIPTION */}
            <Paragraph>
              Plongez dans une ambiance unique où la chicha rencontre le luxe.
              Profitez de nos saveurs exclusives dans un cadre premium.
            </Paragraph>

            {/* INFORMATIONS */}
            <div className="space-y-2.5 text-sm text-grey-600">

              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                <span>Douala, Bonamoussadi</span>
              </p>

              <p className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                <span>Lun - Dim : 14h - 03h</span>
              </p>

              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                <span>+237 655 046 802</span>
              </p>

            </div>

            {/* DIVIDER */}
            <GoldDivider />

            {/* BUTTON */}
            <Link href="/reservations/new">
              <PrimaryButton
                className="
                  px-8
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
                Réserver une table
              </PrimaryButton>
            </Link>

          </div>
        </div>
      </div>
    </section>
  )
}