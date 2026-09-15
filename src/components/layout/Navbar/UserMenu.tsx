'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/lib/stores/authStore'
import { getInitials } from '@/lib/utils/helpers'

export const UserMenu = () => {
  const { user, logout } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!user) return null

  const initials = getInitials(user.name)

  const menuItemClass = `
    group
    flex
    items-center
    gap-3
    px-4
    py-2.5
    text-sm
    text-black-main
    transition-all
    duration-200
    hover:bg-[#D4AF37]/8
    hover:text-[#B8860B]
  `

  return (
    <div className="relative" ref={menuRef}>

      {/* USER BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="
          group
          flex
          items-center
          gap-1.5
          rounded-full
          p-0.5
          transition-all
          duration-300
          hover:bg-[#D4AF37]/10
        "
      >
        {/* AVATAR */}
        <div
          className="
            relative
            flex
            h-9
            w-9
            items-center
            justify-center
            overflow-hidden
            rounded-full
            border
            border-[#D4AF37]/60
            bg-gradient-to-br
            from-[#C89B3C]
            via-[#D4AF37]
            to-[#B8860B]
            text-xs
            font-semibold
            text-white
            shadow-[0_3px_10px_rgba(184,134,11,0.16)]
            transition-all
            duration-300
            group-hover:border-[#B8860B]
            group-hover:shadow-[0_4px_14px_rgba(184,134,11,0.25)]
          "
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        {/* NAME */}
        <span
          className="
            hidden
            max-w-[90px]
            truncate
            text-sm
            font-medium
            text-black-main
            transition-colors
            duration-300
            group-hover:text-[#B8860B]
            sm:block
          "
        >
          {user.name.split(' ')[0]}
        </span>

        {/* CHEVRON */}
        <svg
          className={`
            hidden
            h-3.5
            w-3.5
            text-grey-400
            transition-all
            duration-300
            group-hover:text-[#B8860B]
            sm:block
            ${isOpen ? 'rotate-180 text-[#B8860B]' : ''}
          `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 9l6 6 6-6"
          />
        </svg>
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          className="
            absolute
            right-0
            mt-2.5
            w-60
            overflow-hidden
            rounded-2xl
            border
            border-[#D4AF37]/20
            bg-white
            shadow-[0_12px_35px_rgba(0,0,0,0.12)]
            animate-in
            fade-in
            slide-in-from-top-2
            duration-200
          "
        >

          {/* USER INFO */}
          <div
            className="
              border-b
              border-[#D4AF37]/15
              bg-gradient-to-br
              from-[#FFFCF5]
              to-white
              px-4
              py-3.5
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
                  overflow-hidden
                  rounded-full
                  border
                  border-[#D4AF37]/50
                  bg-gradient-to-br
                  from-[#C89B3C]
                  via-[#D4AF37]
                  to-[#B8860B]
                  text-xs
                  font-semibold
                  text-white
                "
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-black-main">
                  {user.name}
                </p>

                <p className="truncate text-xs text-grey-500">
                  {user.email || user.phone}
                </p>
              </div>
            </div>

            {user.isVip && (
              <div className="mt-3">
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                    rounded-full
                    border
                    border-[#D4AF37]/30
                    bg-[#D4AF37]/10
                    px-2.5
                    py-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-[#B8860B]
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  VIP
                </span>
              </div>
            )}
          </div>

          {/* MENU */}
          <div className="py-1.5">

            {/* PROFIL */}
            <Link
              href="/profile"
              className={menuItemClass}
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="
                  h-5
                  w-5
                  text-grey-400
                  transition-colors
                  group-hover:text-[#B8860B]
                "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>

              <span>Mon profil</span>
            </Link>

            {/* COMMANDES */}
            <Link
              href="/orders"
              className={menuItemClass}
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="
                  h-5
                  w-5
                  text-grey-400
                  transition-colors
                  group-hover:text-[#B8860B]
                "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>

              <span>Mes commandes</span>
            </Link>

            {/* FAVORIS */}
            <Link
              href="/profile/favorites"
              className={menuItemClass}
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="
                  h-5
                  w-5
                  text-grey-400
                  transition-colors
                  group-hover:text-[#B8860B]
                "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>

              <span>Favoris</span>
            </Link>

            {/* FIDELITE */}
            <Link
              href="/loyalty"
              className={menuItemClass}
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="
                  h-5
                  w-5
                  text-grey-400
                  transition-colors
                  group-hover:text-[#B8860B]
                "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span>Fidélité</span>
            </Link>
          </div>

          {/* LOGOUT */}
          <div className="border-t border-[#D4AF37]/15 py-1.5">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                logout()
              }}
              className="
                group
                flex
                w-full
                items-center
                gap-3
                px-4
                py-2.5
                text-sm
                text-red-600
                transition-all
                duration-200
                hover:bg-red-50
              "
            >
              <svg
                className="
                  h-5
                  w-5
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>

              <span>Déconnexion</span>
            </button>
          </div>

        </div>
      )}
    </div>
  )
}