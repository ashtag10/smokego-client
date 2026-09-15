'use client'

import { useProducts } from '@/lib/hooks/useProducts'
import { useCart } from '@/lib/hooks/useCart'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { ProductFilters } from '@/components/shop/ProductFilters'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { toast } from 'react-hot-toast'

import {
  ShoppingBag,
  Sparkles,
  SlidersHorizontal,
  Package,
} from 'lucide-react'

export default function ShopPage() {
  const {
    products,
    pagination,
    isLoading,
    updateFilters,
    resetFilters,
  } = useProducts()

  const { addItem } = useCart()

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

  const productCount = pagination?.total || 0

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
        {/* =========================================================
            HERO — SMOKEGO COLLECTION
        ========================================================= */}
        <section
          className="
            relative
            mb-9
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
          {/* Décoration dorée — haut droite */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-72
              w-72
              rounded-full
              bg-[#D4AF37]/10
              blur-3xl
            "
          />

          {/* Décoration dorée — bas gauche */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-40
              -left-32
              h-80
              w-80
              rounded-full
              bg-[#D4AF37]/5
              blur-3xl
            "
          />

          {/* Décoration centrale */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-0
              right-1/4
              h-36
              w-36
              rounded-full
              bg-[#D4AF37]/5
              blur-3xl
            "
          />

          {/* =====================================================
              CONTENU HERO
          ====================================================== */}
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
            {/* ===================================================
                TEXTE
            ==================================================== */}
            <div className="max-w-2xl">

              {/* BADGE */}
              <div
                className="
                  mb-5
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
                  SmokeGo Collection
                </span>
              </div>

              {/* PETITE CATÉGORIE */}
              <p
                className="
                  mb-2
                  text-sm
                  font-medium
                  tracking-wide
                  text-[#D4AF37]
                  sm:text-base
                "
              >
                Boutique
              </p>

              {/* TITRE */}
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
                L'expérience

                <span
                  className="
                    mt-1
                    block
                    bg-gradient-to-r
                    from-[#B8860B]
                    via-[#D4AF37]
                    to-[#C89B3C]
                    bg-clip-text
                    text-transparent
                  "
                >
                  OusmanHOOKAH
                </span>
              </h1>

              {/* DESCRIPTION */}
              <Paragraph
                className="
                  mt-5
                  max-w-xl
                  text-sm
                  leading-relaxed
                  text-black
                  md:text-base
                "
              >
                Découvrez notre sélection exclusive de chichas,
                saveurs et accessoires soigneusement sélectionnés
                pour une expérience premium.
              </Paragraph>
            </div>

            {/* ===================================================
                COMPTEUR PRODUITS
            ==================================================== */}
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
                  bg-gradient-to-br
                  from-[#C89B3C]
                  via-[#D4AF37]
                  to-[#B8860B]
                  text-white
                  shadow-[0_5px_20px_rgba(212,175,55,0.18)]
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
                  {productCount}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-white/40
                  "
                >
                  {productCount > 1
                    ? 'produits disponibles'
                    : 'produit disponible'}
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              LIGNE DORÉE
          ====================================================== */}
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
                via-[#D4AF37]/50
                to-transparent
              "
            />
          </div>
        </section>

        {/* =========================================================
            FILTRES
        ========================================================= */}
        <section className="mb-10">

          {/* HEADER FILTRES */}
          <div
            className="
              mb-4
              flex
              items-center
              gap-3
            "
          >
            {/* Icône */}
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-[#C89B3C]
                via-[#D4AF37]
                to-[#B8860B]
                text-white
                shadow-[0_3px_12px_rgba(212,175,55,0.16)]
              "
            >
              <SlidersHorizontal
                className="h-4 w-4"
                strokeWidth={2}
              />
            </div>

            <div>
              <h2
                className="
                  text-sm
                  font-semibold
                  text-black-main
                "
              >
                Affiner votre recherche
              </h2>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-grey-500
                "
              >
                Trouvez exactement ce que vous recherchez
              </p>
            </div>
          </div>

          {/* FILTRES */}
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-[#D4AF37]/15
              bg-white
              shadow-[0_4px_20px_rgba(0,0,0,0.04)]
            "
          >
            <ProductFilters
              onFilterChange={updateFilters}
              onReset={resetFilters}
            />
          </div>
        </section>

        {/* =========================================================
            SECTION PRODUITS
        ========================================================= */}
        <section>

          {/* HEADER RÉSULTATS */}
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
              {/* Icône */}
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
                  border-[#D4AF37]/20
                  bg-white
                  shadow-sm
                "
              >
                <Package
                  className="h-4 w-4 text-[#D4AF37]"
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
                  Notre sélection
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-grey-500
                  "
                >
                  {isLoading
                    ? 'Chargement des produits...'
                    : `${productCount} produit${
                        productCount > 1 ? 's' : ''
                      } trouvé${
                        productCount > 1 ? 's' : ''
                      }`}
                </p>
              </div>
            </div>

            {/* Ligne */}
            <div
              className="
                hidden
                h-px
                flex-1
                bg-gradient-to-r
                from-[#D4AF37]/20
                via-grey-100
                to-transparent
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
                  bg-[#D4AF37]
                  shadow-[0_0_7px_rgba(212,175,55,0.5)]
                "
              />

              <span
                className="
                  text-xs
                  font-medium
                  tracking-wide
                  text-[#B8860B]
                "
              >
                SmokeGo Collection
              </span>
            </div>
          </div>

          {/* =====================================================
              GRILLE PRODUITS
          ====================================================== */}
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