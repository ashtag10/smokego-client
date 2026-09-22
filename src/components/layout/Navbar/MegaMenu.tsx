'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  ChevronRight,
  X,
} from 'lucide-react'

import { useCategoriesMenu } from '@/lib/hooks/useCategoriesMenu'
import { cn } from '@/lib/utils/helpers'

interface MegaMenuProps {
  mobile?: boolean
  onNavigate?: () => void
}

export const MegaMenu = ({
  mobile = false,
  onNavigate,
}: MegaMenuProps) => {
  const { categories, isLoading } = useCategoriesMenu()

  const [open, setOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeMenu = () => {
    setOpen(false)
    setOpenCategory(null)
    onNavigate?.()
  }

  /*
   * ============================================================
   * VERSION MOBILE
   * ============================================================
   */
  if (mobile) {
    return (
      <nav className="w-full bg-gray-50">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center justify-between border-b border-gray-100 px-5 py-4 text-[13px] font-medium uppercase tracking-[0.05em] text-black"
        >
          Accueil
          <ChevronRight
            className="h-5 w-5 text-purple-600"
            strokeWidth={1.5}
          />
        </Link>

        <Link
          href="/shop/c/nouveautes"
          onClick={onNavigate}
          className="flex items-center justify-between border-b border-gray-100 px-5 py-4 text-[13px] font-medium uppercase tracking-[0.05em] text-black"
        >
          Nouveautés
          <ChevronRight
            className="h-5 w-5 text-purple-600"
            strokeWidth={1.5}
          />
        </Link>

        <Link
          href="/shop/c/nos-packs"
          onClick={onNavigate}
          className="flex items-center justify-between border-b border-gray-100 px-5 py-4 text-[13px] font-medium uppercase tracking-[0.05em] text-black"
        >
          Nos packs
          <ChevronRight
            className="h-5 w-5 text-purple-600"
            strokeWidth={1.5}
          />
        </Link>

        {!isLoading &&
          categories.map((category) => {
            const hasChildren =
              category.children?.length > 0

            const isOpen =
              openCategory === category.id

            return (
              <div
                key={category.id}
                className="border-b border-gray-100"
              >
                <div className="flex items-center">
                  <Link
                    href={`/shop/c/${category.slug}`}
                    onClick={onNavigate}
                    className="flex-1 px-5 py-4 text-[13px] font-medium uppercase tracking-[0.05em] text-black"
                  >
                    {category.name}
                  </Link>

                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenCategory(
                          isOpen ? null : category.id,
                        )
                      }
                      className="flex h-12 w-12 items-center justify-center text-purple-600"
                      aria-label={`Afficher ${category.name}`}
                    >
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 transition-transform',
                          isOpen && 'rotate-180',
                        )}
                        strokeWidth={1.5}
                      />
                    </button>
                  )}
                </div>

                {hasChildren && isOpen && (
                  <div className="bg-white px-5 pb-2">
                    {category.children.map((child) => (
                      <Link
                        key={child.id}
                        href={`/shop/c/${child.slug}`}
                        onClick={onNavigate}
                        className="flex items-center justify-between border-b border-gray-200 py-3 pl-3 text-[13px] text-gray-600 last:border-0"
                      >
                        {child.name}

                        <ChevronRight
                          className="h-4 w-4 text-purple-600"
                          strokeWidth={1.5}
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

       

        <Link
          href="/loyalty"
          onClick={onNavigate}
          className="flex items-center justify-between px-5 py-4 text-[13px] font-medium uppercase tracking-[0.05em] text-black"
        >
          Fidélité
          <ChevronRight
            className="h-5 w-5 text-purple-600"
            strokeWidth={1.5}
          />
        </Link>

        {/* Bouton Espace Pro Mobile */}
        <div className="p-5">
          <Link
            href="/pro"
            onClick={onNavigate}
            className="flex w-full items-center justify-center rounded-md bg-[#FFC107] py-3.5 text-center text-[12px] font-bold uppercase tracking-wider text-black transition-colors hover:bg-yellow-500"
          >
            ESPACE PRO
          </Link>
        </div>
      </nav>
    )
  }

  /*
   * ============================================================
   * BOUTON MENU DESKTOP
   * ============================================================
   */
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        className="group flex h-10 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-black transition-colors hover:text-gold-main"
      >
        <span className="flex w-[21px] flex-col gap-[4px]">
          <span className="h-px w-full bg-current transition-transform group-hover:translate-x-[2px]" />
          <span className="h-px w-[70%] bg-current transition-transform group-hover:translate-x-[2px]" />
          <span className="h-px w-full bg-current transition-transform group-hover:translate-x-[2px]" />
        </span>

        <span>Menu</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100]">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={closeMenu}
            className="absolute inset-0 cursor-default bg-black/40"
          />

          {/* Menu */}
          <aside className="relative flex h-full w-[440px] max-w-[92vw] flex-col bg-gray-50 shadow-2xl">

            {/* Header : uniquement le bouton Fermer */}
            <div className="flex shrink-0 items-center px-6 py-6 pb-2">
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Fermer"
                className="flex h-10 w-10 shrink-0 items-center justify-center text-black transition-colors hover:text-gold-main"
              >
                <X
                  className="h-8 w-8"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* Catalogue avec scrollbar grise */}
            <div
              className="
                flex-1
                overflow-y-auto
                px-6
                pt-4
                [&::-webkit-scrollbar]:w-[6px]
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
              "
            >
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center justify-between py-3 text-[14px] font-medium uppercase tracking-[0.05em] text-black hover:text-gray-600"
              >
                Accueil
              </Link>

              <Link
                href="/shop/c/nouveautes"
                onClick={closeMenu}
                className="flex items-center justify-between py-3 text-[14px] font-medium uppercase tracking-[0.05em] text-black hover:text-gray-600"
              >
                Nouveautés
              </Link>

              <Link
                href="/shop/c/nos-packs"
                onClick={closeMenu}
                className="flex items-center justify-between py-3 text-[14px] font-medium uppercase tracking-[0.05em] text-black hover:text-gray-600"
              >
                Nos packs complets
              </Link>

              {!isLoading &&
                categories.map((category) => {
                  const hasChildren =
                    category.children?.length > 0

                  const isCategoryOpen =
                    openCategory === category.id

                  return (
                    <div
                      key={category.id}
                      className="flex flex-col"
                    >
                      <div className="flex items-center justify-between py-3">
                        <Link
                          href={`/shop/c/${category.slug}`}
                          onClick={closeMenu}
                          className="flex-1 text-[14px] font-medium uppercase tracking-[0.05em] text-black hover:text-gray-600"
                        >
                          {category.name}
                        </Link>

                        {hasChildren && (
                          <button
                            type="button"
                            onClick={() =>
                              setOpenCategory(
                                isCategoryOpen
                                  ? null
                                  : category.id,
                              )
                            }
                            className="ml-4 flex h-8 w-8 items-center justify-center text-purple-600"
                            aria-label={`Afficher les sous-catégories de ${category.name}`}
                          >
                            <ChevronDown
                              className={cn(
                                'h-6 w-6 transition-transform',
                                isCategoryOpen &&
                                  'rotate-180',
                              )}
                              strokeWidth={1.5}
                            />
                          </button>
                        )}
                      </div>

                      {hasChildren &&
                        isCategoryOpen && (
                          <div className="mb-2 flex flex-col gap-2 pl-4">
                            {category.children.map(
                              (child) => (
                                <Link
                                  key={child.id}
                                  href={`/shop/c/${child.slug}`}
                                  onClick={closeMenu}
                                  className="flex items-center justify-between py-2 text-[14px] text-gray-600 transition-colors hover:text-black"
                                >
                                  <span>
                                    {child.name}
                                  </span>

                                  <ChevronRight
                                    className="h-4 w-4 text-purple-600"
                                    strokeWidth={1.5}
                                  />
                                </Link>
                              ),
                            )}
                          </div>
                        )}
                    </div>
                  )
                })}

              <Link
                href="/reservations"
                onClick={closeMenu}
                className="flex items-center justify-between py-3 text-[14px] font-medium uppercase tracking-[0.05em] text-black hover:text-gray-600"
              >
                Réservation Lounge
              </Link>

              <Link
                href="/loyalty"
                onClick={closeMenu}
                className="flex items-center justify-between py-3 text-[14px] font-medium uppercase tracking-[0.05em] text-black hover:text-gray-600"
              >
                Fidélité
              </Link>
            </div>

            {/* Bas : Espace Pro */}
            <div className="shrink-0 p-6 pb-8">
              <Link
                href="/pro"
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded-md bg-[#FFC107] py-3.5 text-center text-[12px] font-bold uppercase tracking-wider text-black transition-colors hover:bg-yellow-500"
              >
                ESPACE PRO
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
