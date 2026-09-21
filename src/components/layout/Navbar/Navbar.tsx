'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, UserRound, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { useAuthStore } from '@/lib/stores/authStore'
import { useCartStore } from '@/lib/stores/cartStore'

import { Logo } from './Logo'
import { MegaMenu } from './MegaMenu'
import { SearchBar } from './SearchBar'
import { CartIcon } from './CartIcon'
import { WishlistIcon } from './WishlistIcon'
import { UserMenu } from './UserMenu'
import { LanguageSelector } from './LanguageSelector'
import { CurrencySelector } from './CurrencySelector'

export const Navbar = () => {
  const pathname = usePathname()

  const { user } = useAuthStore()
  const { itemCount } = useCartStore()

  const [mobileOpen, setMobileOpen] = useState(false)

  const isAuthPage =
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/verify-otp')

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  if (isAuthPage) {
    return null
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#f5f5f5]">
        {/* =====================================================
            DESKTOP
        ====================================================== */}
        <div className="hidden lg:block">
          <div className="relative mx-auto flex h-[140px] w-full max-w-[1600px] items-center px-6 xl:px-10">

            {/* GAUCHE */}
            <div className="flex min-w-0 flex-1 items-center gap-5 xl:gap-7">
              <MegaMenu />

              <div className="w-full max-w-[380px]">
                <SearchBar />
              </div>
            </div>

            {/* LOGO CENTRAL */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Logo />
            </div>

            {/* DROITE */}
            <div className="flex shrink-0 items-center justify-end gap-4 xl:gap-6">
              <CurrencySelector />

              <LanguageSelector />

              {user ? (
                <UserMenu />
              ) : (
                <Link
                  href="/login"
                  aria-label="Mon compte"
                  className="flex h-10 w-10 items-center justify-center text-black transition-colors hover:text-gray-600"
                >
                  <UserRound
                    className="h-[21px] w-[21px]"
                    strokeWidth={1.5}
                  />
                </Link>
              )}

              <WishlistIcon />

              <CartIcon count={itemCount} />
            </div>
          </div>
        </div>

        {/* =====================================================
            MOBILE
        ====================================================== */}
        <div className="lg:hidden">

          {/* =================================================
              LIGNE 1 — MENU + LOGO
          ================================================== */}
          <div className="relative flex h-[60px] items-center border-b border-[#e5e5e5] px-3">

            {/* MENU */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              className="flex h-10 w-10 shrink-0 items-center justify-center text-black"
            >
              <Menu
                className="h-[22px] w-[22px]"
                strokeWidth={1.5}
              />
            </button>

            {/* LOGO */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Logo />
            </div>
          </div>

          {/* =================================================
              LIGNE 2 — ACTIONS
          ================================================== */}
          <div className="flex h-[48px] w-full items-center justify-center border-b border-[#e5e5e5] bg-white px-2">

            <div className="flex w-full max-w-[420px] items-center justify-center">

              {/* FAVORIS */}
              <div className="flex flex-1 justify-center">
                <WishlistIcon />
              </div>

              {/* SÉPARATEUR */}
              <div className="h-5 w-px shrink-0 bg-[#dedede]" />

              {/* PANIER */}
              <div className="flex flex-1 justify-center">
                <CartIcon count={itemCount} />
              </div>

              {/* SÉPARATEUR */}
              <div className="h-5 w-px shrink-0 bg-[#dedede]" />

              {/* COMPTE */}
              <div className="flex flex-1 justify-center">
                {user ? (
                  <UserMenu />
                ) : (
                  <Link
                    href="/login"
                    aria-label="Mon compte"
                    className="flex h-10 w-10 items-center justify-center text-black"
                  >
                    <UserRound
                      className="h-[20px] w-[20px]"
                      strokeWidth={1.5}
                    />
                  </Link>
                )}
              </div>

              {/* SÉPARATEUR */}
              <div className="h-5 w-px shrink-0 bg-[#dedede]" />

              

              {/* MONNAIE */}
              <div className="flex flex-1 justify-center">
                <CurrencySelector />
              </div>

              {/* SÉPARATEUR */}
              <div className="h-5 w-px shrink-0 bg-[#dedede]" />

              
              {/* LANGUE */}
              <div className="flex flex-1 justify-center">
                <LanguageSelector />
              </div>

            </div>
          </div>

          {/* =================================================
              LIGNE 3 — RECHERCHE
          ================================================== */}
          <div className="border-b border-[#e5e5e5] bg-[#f5f5f5] px-3 py-3 sm:px-4">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* =======================================================
          MENU MOBILE
      ======================================================== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          {/* OVERLAY */}
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          {/* PANNEAU */}
          <aside className="relative flex h-full w-[88%] max-w-[420px] flex-col bg-[#f5f5f5] shadow-2xl">

            {/* HEADER */}
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#e5e5e5] px-5">

              <Logo />

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Fermer le menu"
                className="flex h-10 w-10 items-center justify-center text-black"
              >
                <X
                  className="h-[22px] w-[22px]"
                  strokeWidth={1.5}
                />
              </button>

            </div>

            {/* CATÉGORIES */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <MegaMenu
                mobile
                onNavigate={() => setMobileOpen(false)}
              />
            </div>

            {/* CONNEXION */}
            {!user && (
              <div className="shrink-0 border-t border-[#e5e5e5] bg-white p-5">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#D4AF37] hover:text-black"
                >
                  Se connecter
                </Link>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  )
}