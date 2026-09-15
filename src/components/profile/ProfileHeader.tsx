'use client'

import Image from 'next/image'
import {
  Crown,
  Coins,
  UserRound,
  CalendarDays,
  Pencil,
  Sparkles,
} from 'lucide-react'

import { getInitials } from '@/lib/utils/helpers'
import { GoldBadge } from '@/components/ui/Badge/GoldBadge'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import type { User } from '@/lib/types/user'

interface ProfileHeaderProps {
  user: User
  onEdit?: () => void
}

export const ProfileHeader = ({ user, onEdit }: ProfileHeaderProps) => {
  const initials = getInitials(user.name)

  const memberSince = new Date(user.createdAt).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div
      className="
        relative
        overflow-hidden
        bg-white
        rounded-2xl
        border border-grey-100
        p-6 md:p-8
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
        hover:border-gold-main/20
      "
    >
      {/* Décorations */}
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gold-main/5" />
      <div className="absolute -bottom-20 -left-10 w-40 h-40 rounded-full bg-gold-main/5" />

      <div className="relative flex flex-col lg:flex-row items-center gap-6 lg:gap-8">

        {/* =========================
            AVATAR
        ========================== */}
        <div className="relative flex-shrink-0">

          {/* Halo */}
          <div
            className="
              absolute
              -inset-2
              rounded-full
              border
              border-gold-main/20
            "
          />

          <div
            className="
              absolute
              -inset-4
              rounded-full
              bg-gold-main/5
            "
          />

          <div
            className="
              relative
              w-24 h-24 md:w-28 md:h-28
              rounded-full
              overflow-hidden
              border-4
              border-white
              ring-2
              ring-gold-main/40
              shadow-lg
              bg-gold-light
            "
          >
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={user.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            ) : (
              <div
                className="
                  w-full
                  h-full
                  bg-gradient-to-br
                  from-[#D4AF37]
                  via-[#C9A94E]
                  to-[#B8963E]
                  text-white
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-bold
                "
              >
                {initials}
              </div>
            )}
          </div>

          {/* Indicateur */}
          <div
            className="
              absolute
              bottom-1
              right-1
              w-5
              h-5
              rounded-full
              bg-white
              flex
              items-center
              justify-center
              shadow-sm
            "
          >
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
        </div>

        {/* =========================
            INFORMATIONS
        ========================== */}
        <div className="flex-1 min-w-0 w-full text-center lg:text-left">

          {/* Nom + VIP */}
          <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">

            <h2 className="text-2xl md:text-3xl font-serif text-black-main">
              {user.name}
            </h2>

            {user.isVip && (
              <div className="flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-gold-main" />
                <GoldBadge>VIP</GoldBadge>
              </div>
            )}
          </div>

          {/* Contact */}
          <p className="text-sm text-grey-500 mt-1 truncate">
            {user.email || user.phone}
          </p>

          {/* Ligne décorative */}
          <div className="flex items-center gap-2 mt-4 justify-center lg:justify-start">
            <span className="w-8 h-px bg-gold-main/40" />
            <Sparkles className="w-3.5 h-3.5 text-gold-main" />
            <span className="w-8 h-px bg-gold-main/40" />
          </div>

          {/* =========================
              STATISTIQUES
          ========================== */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-3
              mt-5
            "
          >

            {/* Points */}
            <div
              className="
                group
                flex
                items-center
                gap-3
                p-3
                rounded-xl
                bg-gold-light/20
                border
                border-gold-main/10
                transition-all
                duration-300
                hover:bg-gold-light/40
                hover:border-gold-main/25
              "
            >
              <div
                className="
                  w-9 h-9
                  rounded-lg
                  bg-gold-light
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <Coins className="w-4 h-4 text-gold-main" />
              </div>

              <div className="text-left">
                <span className="block text-xs text-grey-500">
                  Points
                </span>

                <p className="font-bold text-gold-main">
                  {user.loyaltyPoints || 0}
                </p>
              </div>
            </div>

            {/* Rôle */}
            <div
              className="
                group
                flex
                items-center
                gap-3
                p-3
                rounded-xl
                bg-grey-50
                border
                border-transparent
                transition-all
                duration-300
                hover:bg-grey-100
              "
            >
              <div
                className="
                  w-9 h-9
                  rounded-lg
                  bg-white
                  border
                  border-grey-100
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <UserRound className="w-4 h-4 text-grey-500" />
              </div>

              <div className="text-left min-w-0">
                <span className="block text-xs text-grey-500">
                  Rôle
                </span>

                <p className="font-medium text-black-main truncate">
                  {user.role}
                </p>
              </div>
            </div>

            {/* Membre depuis */}
            <div
              className="
                group
                flex
                items-center
                gap-3
                p-3
                rounded-xl
                bg-grey-50
                border
                border-transparent
                transition-all
                duration-300
                hover:bg-grey-100
              "
            >
              <div
                className="
                  w-9 h-9
                  rounded-lg
                  bg-white
                  border
                  border-grey-100
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <CalendarDays className="w-4 h-4 text-grey-500" />
              </div>

              <div className="text-left min-w-0">
                <span className="block text-xs text-grey-500">
                  Membre depuis
                </span>

                <p className="font-medium text-black-main">
                  {memberSince}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* =========================
            BOUTON
        ========================== */}
        {onEdit && (
          <div className="flex-shrink-0 w-full lg:w-auto">
            <PrimaryButton
              onClick={onEdit}
              className="
                w-full
                lg:w-auto
                flex
                items-center
                justify-center
                text-sm
                px-5
                py-3
                transition-all
                duration-300
                hover:bg-gradient-to-r
                hover:from-[#C9A94E]
                hover:via-[#D4AF37]
                hover:to-[#B8963E]
                hover:text-white
                hover:shadow-[0_8px_25px_rgba(212,175,55,0.28)]
                hover:scale-[1.02]
              "
            >
              <Pencil className="w-4 h-4 mr-2" />
              Modifier le profil
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  )
}