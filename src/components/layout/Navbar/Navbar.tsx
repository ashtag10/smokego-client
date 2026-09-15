'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

import { useAuthStore } from '@/lib/stores/authStore'
import { useCartStore } from '@/lib/stores/cartStore'

import { Logo } from './Logo'
import { NavLinks } from './NavLinks'
import { SearchBar } from './SearchBar'
import { CartIcon } from './CartIcon'
import { UserMenu } from './UserMenu'

export const Navbar = () => {
  const pathname = usePathname()

  const { isAuthenticated } = useAuthStore()
  const { itemCount } = useCartStore()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  /* =========================================================
     SCROLL
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  /* =========================================================
     FERMER LE MENU MOBILE AU CHANGEMENT DE PAGE
  ========================================================= */

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  /* =========================================================
     PAGES AUTH
  ========================================================= */

  const isAuthPage =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/register') ||
    pathname?.startsWith('/verify-otp') ||
    pathname?.startsWith('/forgot-password') ||
    pathname?.startsWith('/reset-password')

  if (isAuthPage) {
    return null
  }

  return (
    <nav
      className={`
        sticky
        top-0
        z-50
        w-full
        border-b
        border-[#D4AF37]/10
        bg-white/95
        backdrop-blur-xl
        transition-all
        duration-300

        ${
          isScrolled
            ? 'shadow-[0_6px_25px_rgba(180,140,50,0.10)]'
            : 'shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
        }
      `}
    >
      {/* =====================================================
          LIGNE DORÉE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          h-px
          w-full
          bg-gradient-to-r
          from-transparent
          via-[#D4AF37]/50
          to-transparent
        "
      />

      {/* =====================================================
          CONTAINER PRINCIPAL
      ====================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-3
          sm:px-4
          lg:px-6
          xl:px-8
        "
      >
        {/* =====================================================
            DESKTOP / TABLET HEADER
        ====================================================== */}

        <div
          className="
            flex
            min-h-[72px]
            items-center
            gap-3

            sm:min-h-[76px]
            sm:gap-4

            lg:gap-6
          "
        >
          {/* =================================================
              LOGO
          ================================================== */}

          <div
            className="
              shrink-0
            "
          >
            <Logo />
          </div>

          {/* =================================================
              NAVIGATION DESKTOP
          ================================================== */}

          <div
            className="
              hidden
              min-w-0
              flex-1
              items-center
              justify-center

              md:flex
            "
          >
            <NavLinks />
          </div>

          {/* =================================================
              ACTIONS
          ================================================== */}

          <div
            className="
              ml-auto
              flex
              shrink-0
              items-center
              gap-2

              sm:gap-3

              lg:gap-3
            "
          >
            {/* ===============================================
                SEARCH DESKTOP
            ================================================ */}

            <div
              className="
                hidden

                lg:block
                lg:w-48

                xl:w-60
              "
            >
              <SearchBar />
            </div>

            {/* ===============================================
                SEPARATEUR
            ================================================ */}

            <div
              aria-hidden="true"
              className="
                hidden
                h-6
                w-px
                bg-[#D4AF37]/15

                lg:block
              "
            />

            {/* ===============================================
                PANIER
            ================================================ */}

            <div className="shrink-0">
              <CartIcon count={itemCount} />
            </div>

            {/* ===============================================
                CONNEXION
            ================================================ */}

            {isAuthenticated ? (
              <div className="shrink-0">
                <UserMenu />
              </div>
            ) : (
              <Link
                href="/login"
                className="
                  group
                  relative
                  isolate
                  hidden
                  overflow-hidden
                  rounded-full
                  border
                  border-[#D4AF37]/50
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  tracking-wide
                  text-[#B8963E]
                  transition-all
                  duration-300

                  hover:border-transparent
                  hover:text-white
                  hover:shadow-[0_6px_18px_-4px_rgba(212,175,55,0.40)]

                  lg:inline-flex
                  lg:items-center
                  lg:justify-center

                  xl:px-5
                  xl:text-sm
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    -z-10
                    bg-gradient-to-r
                    from-[#C9A94E]
                    via-[#D4AF37]
                    to-[#B8963E]
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

                Connexion
              </Link>
            )}

            {/* ===============================================
                MENU MOBILE
            ================================================ */}

            <button
              type="button"
              aria-label={
                isMobileMenuOpen
                  ? 'Fermer le menu'
                  : 'Ouvrir le menu'
              }
              aria-expanded={isMobileMenuOpen}
              onClick={() =>
                setIsMobileMenuOpen((open) => !open)
              }
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                text-[#8F752F]
                transition-all
                duration-300

                hover:bg-[#D4AF37]/[0.08]
                hover:text-[#B8963E]

                md:hidden
              "
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* =====================================================
            MENU MOBILE
        ====================================================== */}

        <div
          className={`
            grid
            overflow-hidden
            transition-[grid-template-rows]
            duration-300
            ease-out

            md:hidden

            ${
              isMobileMenuOpen
                ? 'grid-rows-[1fr]'
                : 'grid-rows-[0fr]'
            }
          `}
        >
          <div className="min-h-0">
            <div
              className="
                border-t
                border-[#D4AF37]/15
                py-4
              "
            >
              {/* =============================================
                  RECHERCHE MOBILE
              ============================================== */}

              <div className="mb-4">
                <SearchBar fullWidth />
              </div>

              {/* =============================================
                  NAVIGATION MOBILE
              ============================================== */}

              <div
                className="
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#D4AF37]/10
                  bg-[#FFFDF8]
                  p-2
                "
              >
                <NavLinks
                  mobile
                  onNavigate={() =>
                    setIsMobileMenuOpen(false)
                  }
                />
              </div>

              {/* =============================================
                  CONNEXION MOBILE
              ============================================== */}

              {!isAuthenticated && (
                <Link
                  href="/login"
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                  className="
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#D4AF37]/40
                    bg-white
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-[#B8963E]
                    transition-all
                    duration-300

                    hover:border-[#D4AF37]
                    hover:bg-[#D4AF37]/[0.06]
                  "
                >
                  Connexion
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}