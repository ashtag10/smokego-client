'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { productsApi } from '@/lib/api/products'
import { useCart } from '@/lib/hooks/useCart'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { toast } from 'react-hot-toast'
import {
  Search,
  Sparkles,
  ShoppingBag,
  Package,
} from 'lucide-react'
import type { Product } from '@/lib/types/product'

export default function SearchPage() {
  const searchParams = useSearchParams()

  const query = searchParams.get('q') || ''

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { addItem } = useCart()

  /* =========================================================
     RECHERCHE
  ========================================================= */

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setProducts([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      try {
        const response = await productsApi.searchProducts(
          query.trim()
        )

        if (response.success && response.data) {
          setProducts(response.data.data || [])
        } else {
          setProducts([])
        }
      } catch (error) {
        console.error('Search error:', error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query])

  /* =========================================================
     AJOUT AU PANIER
  ========================================================= */

  const handleAddToCart = async (productId: string) => {
    try {
      await addItem(productId, 1)

      toast.success('Produit ajouté au panier')
    } catch (error) {
      console.error(
        'Failed to add product to cart:',
        error
      )

      toast.error("Erreur lors de l'ajout au panier")
    }
  }

  const resultCount = products.length

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
            HERO RECHERCHE
        ====================================================== */}

        <section
          className="
            relative
            mb-8
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
          {/* =================================================
              DÉCORATIONS DORÉES
          ================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              bg-gold-main/10
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-32
              -left-24
              h-72
              w-72
              rounded-full
              bg-gold-main/5
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-0
              right-1/4
              h-32
              w-32
              rounded-full
              bg-gold-main/5
              blur-2xl
            "
          />

          {/* =================================================
              CONTENU
          ================================================== */}

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
                  px-4
                  py-2
                  text-black-main
                  shadow-[0_4px_24px_rgba(245,166,35,0.18)]
                "
              >
                <Sparkles
                  className="h-3.5 w-3.5"
                  strokeWidth={2}
                />

                <span
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    sm:text-xs
                  "
                >
                  SmokeGo Collection
                </span>
              </div>

              {/* Petite catégorie */}

              <p
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  tracking-wide
                  text-gold-main
                  sm:text-base
                "
              >
                <Search className="h-4 w-4" />

                Recherche
              </p>

              {/* Titre */}

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
                Trouvez votre

                <span
                  className="
                    mt-1
                    block
                    text-gold-main
                  "
                >
                  expérience OusmanHOOKAH
                </span>
              </h1>

              {/* Requête */}

              {query ? (
                <div
                  className="
                    mt-5
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      text-sm
                      text-white/50
                    "
                  >
                    Résultats pour
                  </span>

                  <span
                    className="
                      rounded-full
                      border
                      border-gold-main/25
                      bg-gold-main/10
                      px-3
                      py-1.5
                      text-sm
                      font-medium
                      text-gold-main
                    "
                  >
                    "{query}"
                  </span>
                </div>
              ) : (
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
                  Recherchez parmi notre sélection de
                  chichas, saveurs et accessoires premium.
                </Paragraph>
              )}
            </div>

            {/* =================================================
                COMPTEUR
            ================================================== */}

            <div
              className="
                flex
                items-center
                gap-3
                self-start
                lg:self-auto
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-gold-main
                  text-black-main
                  shadow-[0_4px_16px_rgba(245,166,35,0.12)]
                "
              >
                <ShoppingBag
                  className="h-5 w-5"
                  strokeWidth={2}
                />
              </div>

              <div>
                <p
                  className="
                    text-2xl
                    font-semibold
                    leading-none
                    text-white
                  "
                >
                  {isLoading ? '—' : resultCount}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-white/40
                  "
                >
                  {resultCount > 1
                    ? 'produits trouvés'
                    : 'produit trouvé'}
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              LIGNE DORÉE
          ================================================== */}

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
                via-gold-main/40
                to-transparent
              "
            />
          </div>
        </section>

        {/* =====================================================
            RÉSULTATS
        ====================================================== */}

        <section>
          {/* =================================================
              HEADER RÉSULTATS
          ================================================== */}

          <div
            className="
              mb-6
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
            "
          >
            {/* Informations */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-grey-100
                  bg-white
                  shadow-sm
                "
              >
                <Package
                  className="h-4 w-4 text-gold-main"
                  strokeWidth={2}
                />
              </div>

              <div>
                <p
                  className="
                    text-sm
                    font-semibold
                    text-black-main
                  "
                >
                  Résultats de recherche
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-grey-500
                  "
                >
                  {isLoading
                    ? 'Recherche en cours...'
                    : resultCount === 0
                      ? 'Aucun produit trouvé'
                      : `${resultCount} produit${
                          resultCount > 1 ? 's' : ''
                        } trouvé${
                          resultCount > 1 ? 's' : ''
                        }`}
                </p>
              </div>
            </div>

            {/* Séparateur */}

            <div
              className="
                hidden
                h-px
                flex-1
                bg-grey-100
                sm:block
              "
            />

            {/* Collection */}

            <div
              className="
                hidden
                shrink-0
                items-center
                gap-2
                sm:flex
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-gold-main
                  shadow-[0_0_6px_rgba(245,166,35,0.5)]
                "
              />

              <span
                className="
                  text-xs
                  font-medium
                  tracking-wide
                  text-gold-main
                "
              >
                Collection SmokeGo
              </span>
            </div>
          </div>

          {/* =================================================
              PRODUITS
          ================================================== */}

          <ProductGrid
            products={products}
            isLoading={isLoading}
            onAddToCart={handleAddToCart}
          />
        </section>
      </div>
    </main>
  )
}