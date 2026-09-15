import Link from 'next/link'
import { ShoppingBag, Sparkles } from 'lucide-react'

import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'

export const EmptyCart = () => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-14
        text-center
        sm:py-16
      "
    >
      {/* =========================
          ICON CONTAINER
      ========================== */}
      <div className="relative mb-6">

        {/* Glow doré */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-[#D4AF37]/10
            blur-xl
          "
        />

        {/* Cercle principal */}
        <div
          className="
            relative
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            border
            border-[#D4AF37]/20
            bg-gradient-to-br
            from-[#FFF9E8]
            via-white
            to-[#F8F1D8]
            shadow-[0_8px_25px_rgba(184,134,11,0.10)]
          "
        >
          {/* Cercle intérieur */}
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-[#C89B3C]
              via-[#D4AF37]
              to-[#B8860B]
              shadow-[0_5px_18px_rgba(184,134,11,0.22)]
            "
          >
            <ShoppingBag
              className="h-7 w-7 text-white"
              strokeWidth={1.8}
            />
          </div>
        </div>

        {/* Petit élément décoratif */}
        <div
          className="
            absolute
            -right-1
            -top-1
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            border
            border-white
            bg-gradient-to-br
            from-[#D4AF37]
            to-[#B8860B]
            shadow-sm
          "
        >
          <Sparkles
            className="h-3.5 w-3.5 text-white"
          />
        </div>
      </div>

      {/* =========================
          TITLE
      ========================== */}
      <Heading level="h3">
        Votre panier est vide
      </Heading>

      {/* =========================
          DESCRIPTION
      ========================== */}
      <Paragraph
        muted
        className="
          mx-auto
          mt-2
          max-w-md
          text-sm
          leading-relaxed
          sm:text-base
        "
      >
        Explorez notre boutique et découvrez nos chichas,
        saveurs et accessoires premium.
      </Paragraph>

      {/* =========================
          BUTTON
      ========================== */}
      <Link href="/shop">
        <PrimaryButton
          className="
            mt-6
            px-7
            py-3.5
            text-sm
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
          Découvrir la boutique
        </PrimaryButton>
      </Link>

      {/* =========================
          PETITE SIGNATURE
      ========================== */}
      <div className="mt-5 flex items-center gap-2">
        <span
          className="
            h-px
            w-8
            bg-gradient-to-r
            from-transparent
            to-[#D4AF37]/40
          "
        />

        <span
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-[#B8860B]/70
          "
        >
          OusmanHOOKAH
        </span>

        <span
          className="
            h-px
            w-8
            bg-gradient-to-l
            from-transparent
            to-[#D4AF37]/40
          "
        />
      </div>
    </div>
  )
}