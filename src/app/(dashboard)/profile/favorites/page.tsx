'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react'

import { useCart } from '@/lib/hooks/useCart'
import { ProductCard } from '@/components/ui/Card/ProductCard'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { toast } from 'react-hot-toast'
import type { Product } from '@/lib/types/product'

export default function FavoritesPage() {
  const { addItem } = useCart()

  const [favorites, setFavorites] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Récupérer les favoris depuis l'API
    // const fetchFavorites = async () => { ... }

    setIsLoading(false)
  }, [])

  const handleAddToCart = async (productId: string) => {
    try {
      await addItem(productId, 1)
      toast.success('Produit ajouté au panier')
    } catch (error) {
      console.error('Failed to add product to cart:', error)
      toast.error("Erreur lors de l'ajout au panier")
    }
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <div className="mx-auto w-full max-w-[1600px] px-3 py-8 sm:px-4 sm:py-10 lg:px-6 lg:py-12">

          {/* Header skeleton */}
          <div className="relative mb-8 overflow-hidden rounded-2xl bg-black-main px-5 py-8 sm:px-8 md:mb-10 md:rounded-3xl md:py-10">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-40 rounded-full bg-white/10" />
              <div className="h-10 w-72 rounded-lg bg-white/10" />
              <div className="h-5 w-96 max-w-full rounded bg-white/10" />
            </div>
          </div>

          {/* Products skeleton */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-grey-100 bg-white"
              >
                <div className="aspect-square animate-pulse bg-grey-100" />

                <div className="space-y-3 p-4">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-grey-100" />
                  <div className="h-5 w-1/2 animate-pulse rounded bg-grey-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (favorites.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <div className="mx-auto w-full max-w-[1600px] px-3 py-8 sm:px-4 sm:py-10 lg:px-6 lg:py-12">

          {/* Hero */}
          <section className="relative mb-8 overflow-hidden rounded-2xl bg-black-main px-5 py-8 sm:px-8 md:mb-10 md:rounded-3xl md:px-10 md:py-10">

            {/* Glow */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute -right-24 -top-24
                h-72 w-72
                rounded-full
                bg-gold-main/10
                blur-3xl
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute -bottom-32 -left-24
                h-72 w-72
                rounded-full
                bg-gold-main/5
                blur-3xl
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
                  px-4 py-2
                  text-black-main
                  shadow-[0_4px_24px_rgba(245,166,35,0.18)]
                "
              >
                <Sparkles className="h-3.5 w-3.5" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-xs">
                  SmokeGo Collection
                </span>
              </div>

              {/* Category */}
              <p className="mb-2 flex items-center gap-2 text-sm font-medium tracking-wide text-gold-main sm:text-base">
                <Heart className="h-4 w-4 fill-current" />
                Mes favoris
              </p>

              {/* Title */}
              <h1
                className="
                  max-w-3xl
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
                Vos produits
                <span className="mt-1 block text-gold-main">
                  préférés
                </span>
              </h1>

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
                Retrouvez ici les produits que vous souhaitez garder
                précieusement pour votre prochaine expérience SmokeGo.
              </Paragraph>
            </div>

            {/* Gold line */}
            <div
              className="
                absolute
                bottom-0
                left-5
                right-5
                sm:left-8
                sm:right-8
                md:left-10
                md:right-10
              "
            >
              <div className="h-px bg-gradient-to-r from-transparent via-gold-main/40 to-transparent" />
            </div>
          </section>

          {/* Empty card */}
          <section
            className="
              relative
              overflow-hidden
              rounded-2xl
              border border-grey-100
              bg-white
              px-5 py-12
              text-center
              shadow-[0_10px_40px_rgba(0,0,0,0.04)]
              sm:px-8
              sm:py-16
            "
          >
            {/* Decorative glow */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute left-1/2 top-1/2
                h-64 w-64
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-gold-main/5
                blur-3xl
              "
            />

            <div className="relative z-10 mx-auto max-w-md">

              {/* Icon */}
              <div
                className="
                  mx-auto
                  flex h-20 w-20
                  items-center justify-center
                  rounded-2xl
                  border border-gold-main/20
                  bg-gold-main/10
                  text-gold-main
                  shadow-[0_8px_30px_rgba(245,166,35,0.10)]
                "
              >
                <Heart className="h-9 w-9" strokeWidth={1.6} />
              </div>

              <h2
                className="
                  mt-6
                  font-serif
                  text-2xl
                  font-semibold
                  text-black-main
                  sm:text-3xl
                "
              >
                Aucun favori pour le moment
              </h2>

              <Paragraph
                muted
                className="mt-3 text-sm leading-relaxed sm:text-base"
              >
                Explorez notre collection et ajoutez vos produits
                préférés à vos favoris pour les retrouver facilement.
              </Paragraph>

              <Link
                href="/shop"
                className="
                  group
                  mt-7
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-gold-main
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-black-main
                  shadow-[0_8px_24px_rgba(245,166,35,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_12px_30px_rgba(245,166,35,0.28)]
                "
              >
                <ShoppingBag className="h-4 w-4" />

                Découvrir la boutique

                <ArrowRight
                  className="
                    h-4 w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </section>
        </div>
      </main>
    )
  }

  /* =========================================================
     FAVORITES
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#FAF9F7]">
      <div className="mx-auto w-full max-w-[1600px] px-3 py-8 sm:px-4 sm:py-10 lg:px-6 lg:py-12">

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
            px-5 py-8
            sm:px-8
            md:mb-10
            md:rounded-3xl
            md:px-10
            md:py-10
          "
        >
          {/* Glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-24 -top-24
              h-72 w-72
              rounded-full
              bg-gold-main/10
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -bottom-32 -left-24
              h-72 w-72
              rounded-full
              bg-gold-main/5
              blur-3xl
            "
          />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            {/* Text */}
            <div className="max-w-3xl">

              {/* Badge */}
              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-gold-main
                  px-4 py-2
                  text-black-main
                  shadow-[0_4px_24px_rgba(245,166,35,0.18)]
                "
              >
                <Sparkles className="h-3.5 w-3.5" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-xs">
                  SmokeGo Collection
                </span>
              </div>

              <p className="mb-2 flex items-center gap-2 text-sm font-medium tracking-wide text-gold-main sm:text-base">
                <Heart className="h-4 w-4 fill-current" />
                Mes favoris
              </p>

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
                Vos produits
                <span className="mt-1 block text-gold-main">
                  préférés
                </span>
              </h1>

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
                Retrouvez votre sélection personnelle de produits
                SmokeGo et gardez vos essentiels toujours à portée de main.
              </Paragraph>
            </div>

            {/* Counter */}
            <div className="flex items-center gap-3 self-start lg:self-auto">
              <div
                className="
                  flex h-12 w-12
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-gold-main
                  text-black-main
                  shadow-[0_4px_16px_rgba(245,166,35,0.12)]
                "
              >
                <Heart
                  className="h-5 w-5 fill-current"
                  strokeWidth={2}
                />
              </div>

              <div>
                <p className="text-2xl font-semibold leading-none text-white">
                  {favorites.length}
                </p>

                <p className="mt-1 text-xs text-white/40">
                  {favorites.length > 1
                    ? 'produits favoris'
                    : 'produit favori'}
                </p>
              </div>
            </div>
          </div>

          {/* Gold line */}
          <div className="absolute bottom-0 left-5 right-5 sm:left-8 sm:right-8 md:left-10 md:right-10">
            <div className="h-px bg-gradient-to-r from-transparent via-gold-main/40 to-transparent" />
          </div>
        </section>

        {/* =====================================================
            PRODUCTS HEADER
        ====================================================== */}

        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">

            <div className="flex shrink-0 items-center gap-3">
              <div
                className="
                  flex h-10 w-10
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  border border-grey-100
                  bg-white
                  text-gold-main
                  shadow-sm
                "
              >
                <Heart className="h-4 w-4 fill-current" />
              </div>

              <div>
                <p className="text-sm font-semibold text-black-main">
                  Ma sélection
                </p>

                <p className="mt-0.5 text-xs text-grey-500">
                  {favorites.length} produit
                  {favorites.length > 1 ? 's' : ''} sauvegardé
                  {favorites.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="hidden h-px flex-1 bg-grey-100 sm:block" />

            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-main shadow-[0_0_6px_rgba(245,166,35,0.5)]" />

              <span className="text-xs font-medium tracking-wide text-gold-main">
                Collection SmokeGo
              </span>
            </div>
          </div>

          {/* ===================================================
              PRODUCTS GRID
          ==================================================== */}

          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}