import { ProductCard } from '@/components/ui/Card/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Loading/Skeleton'
import type { Product } from '@/lib/types/product'

interface ProductGridProps {
  products?: Product[]
  isLoading?: boolean
}

export const ProductGrid = ({
  products = [],
  isLoading = false,
}: ProductGridProps) => {
  const productList = Array.isArray(products) ? products : []

  /*
   * ==========================================
   * LOADING
   * ==========================================
   */
  if (isLoading) {
    return (
      <div
        className="
          grid
          w-full
          min-w-0

          grid-cols-2
          gap-x-2
          gap-y-4

          min-[375px]:gap-x-2.5
          min-[375px]:gap-y-5

          min-[480px]:gap-x-3
          min-[480px]:gap-y-5

          sm:grid-cols-2
          sm:gap-x-4
          sm:gap-y-6

          md:grid-cols-3
          md:gap-x-4
          md:gap-y-6

          lg:grid-cols-4
          lg:gap-x-5
          lg:gap-y-7

          xl:gap-x-6
          xl:gap-y-8
        "
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="w-full min-w-0"
            style={{
              animationDelay: `${index * 60}ms`,
            }}
          >
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    )
  }

  /*
   * ==========================================
   * EMPTY STATE
   * ==========================================
   */
  if (productList.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[260px]
          w-full
          items-center
          justify-center
          px-3

          sm:min-h-[320px]
          sm:px-4
        "
      >
        <div className="w-full max-w-md text-center">
          <div
            className="
              mx-auto
              mb-4
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border
              border-gold-main/20
              bg-gold-light/30

              sm:mb-5
              sm:h-16
              sm:w-16
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="
                h-6
                w-6
                text-gold-main

                sm:h-7
                sm:w-7
              "
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          <h3
            className="
              font-serif
              text-lg
              leading-tight
              text-black-main

              sm:text-xl
              md:text-2xl
            "
          >
            Aucun produit trouvé
          </h3>

          <p
            className="
              mx-auto
              mt-2
              max-w-sm
              text-xs
              leading-relaxed
              text-grey-500

              sm:text-sm
              md:text-base
            "
          >
            Aucun produit ne correspond à vos critères actuels.
            Essayez de modifier vos filtres ou votre recherche.
          </p>
        </div>
      </div>
    )
  }

  /*
   * ==========================================
   * PRODUCT GRID
   * ==========================================
   */
  return (
    <div
      className="
        grid
        w-full
        min-w-0

        /* MOBILE */
        grid-cols-2
        gap-x-2
        gap-y-4

        /* PETITS MOBILES */
        min-[375px]:gap-x-2.5
        min-[375px]:gap-y-5

        /* MOBILES LARGES */
        min-[480px]:gap-x-3
        min-[480px]:gap-y-5

        /* TABLETTE */
        sm:grid-cols-2
        sm:gap-x-4
        sm:gap-y-6

        /* TABLETTE LARGE */
        md:grid-cols-3
        md:gap-x-4
        md:gap-y-7

        /* DESKTOP */
        lg:grid-cols-4
        lg:gap-x-5
        lg:gap-y-7

        /* GRAND ÉCRAN */
        xl:gap-x-6
        xl:gap-y-8
      "
    >
      {productList.map((product, index) => (
        <div
          key={product.id}
          className="
            min-w-0
            w-full
            max-w-full
            overflow-hidden
          "
          style={{
            animationDelay: `${Math.min(index * 45, 400)}ms`,
          }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}