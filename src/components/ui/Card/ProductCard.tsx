import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Sparkles } from 'lucide-react'

import { formatPrice } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils/helpers'
import type { Product } from '@/lib/types/product'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'

interface ProductCardProps {
  product: Product
  className?: string
  onAddToCart?: (productId: string) => void
}

export const ProductCard = ({
  product,
  className,
  onAddToCart,
}: ProductCardProps) => {
  const isInStock = product.stock > 0

  const hasPromo =
    product.promoPrice !== undefined &&
    product.promoPrice !== null &&
    product.promoPrice < product.price

  const discount = hasPromo
    ? Math.round(
        ((product.price - product.promoPrice!) / product.price) * 100
      )
    : 0

  const image = product.images?.[0]

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    if (isInStock) {
      onAddToCart?.(product.id)
    }
  }

  const handleFavorite = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    // TODO: Ajouter aux favoris
  }

  return (
    <article
      className={cn(
        `
          group
          flex
          h-full
          min-w-0
          flex-col
          overflow-hidden
          rounded-xl
          border
          border-grey-100
          bg-white
          shadow-sm

          transition-all
          duration-300

          sm:rounded-2xl
          sm:hover:-translate-y-1
          sm:hover:border-gold-main/30
          sm:hover:shadow-xl
        `,
        className
      )}
    >
      {/* =========================================
          IMAGE
      ========================================= */}
      <div
        className="
          relative
          aspect-square
          w-full
          shrink-0
          overflow-hidden
          bg-grey-50
        "
      >
        <Link
          href={`/shop/${product.id}`}
          className="absolute inset-0"
          aria-label={`Voir ${product.name}`}
        >
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              priority={false}
              sizes="
                (max-width: 639px) 47vw,
                (max-width: 767px) 46vw,
                (max-width: 1023px) 30vw,
                (max-width: 1279px) 23vw,
                22vw
              "
              className="
                object-cover
                transition-transform
                duration-500
                ease-out
                group-hover:scale-105
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                bg-grey-50
              "
            >
              <div className="text-center text-grey-400">
                <ShoppingCart
                  className="
                    mx-auto
                    h-7
                    w-7
                    opacity-30

                    sm:h-8
                    sm:w-8
                  "
                  strokeWidth={1.5}
                />

                <span className="mt-1 block text-[10px] sm:text-xs">
                  Pas d'image
                </span>
              </div>
            </div>
          )}

          {/* Subtle overlay */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/20
              via-transparent
              to-transparent
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          />
        </Link>

        {/* =========================================
            BADGES
        ========================================= */}
        <div
          className="
            pointer-events-none
            absolute
            left-2
            top-2
            z-10
            flex
            max-w-[70%]
            flex-col
            items-start
            gap-1.5

            sm:left-3
            sm:top-3
            sm:gap-2
          "
        >
          {hasPromo && (
            <span
              className="
                rounded-full
                bg-red-500
                px-2
                py-1
                text-[9px]
                font-bold
                leading-none
                text-white
                shadow-sm

                sm:px-2.5
                sm:py-1.5
                sm:text-[10px]
              "
            >
              -{discount}%
            </span>
          )}

          {product.isFeatured && (
            <span
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                bg-gold-main
                px-2
                py-1
                text-[9px]
                font-semibold
                leading-none
                text-white
                shadow-sm

                sm:px-2.5
                sm:py-1.5
                sm:text-[10px]
              "
            >
              <Sparkles
                className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                strokeWidth={2}
              />

              <span className="hidden min-[400px]:inline">
                Vedette
              </span>
            </span>
          )}

          {!isInStock && (
            <span
              className="
                rounded-full
                bg-black-main
                px-2
                py-1
                text-[9px]
                font-semibold
                leading-none
                text-white
                shadow-sm

                sm:px-2.5
                sm:py-1.5
                sm:text-[10px]
              "
            >
              Rupture
            </span>
          )}
        </div>

        {/* =========================================
            FAVORITE
        ========================================= */}
        <button
          type="button"
          aria-label={`Ajouter ${product.name} aux favoris`}
          onClick={handleFavorite}
          className="
            absolute
            right-2
            top-2
            z-20
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-black/5
            bg-white/90
            text-grey-500
            shadow-sm
            backdrop-blur-sm

            transition-all
            duration-200

            hover:bg-white
            hover:text-red-500
            hover:shadow-md

            sm:right-3
            sm:top-3
            sm:h-9
            sm:w-9
          "
        >
          <Heart
            className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* =========================================
          PRODUCT INFORMATION
      ========================================= */}
      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          p-2.5

          min-[375px]:p-3

          sm:p-4
        "
      >
        {/* Product name */}
        <Link
          href={`/shop/${product.id}`}
          className="min-w-0"
        >
          <h3
            className="
              line-clamp-2
              min-h-[2.5rem]
              font-serif
              text-sm
              font-medium
              leading-5
              text-black-main
              transition-colors
              duration-200

              hover:text-gold-main

              min-[375px]:text-[15px]

              sm:min-h-[3rem]
              sm:text-lg
              sm:leading-6
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* Brand */}
        {product.brand && (
          <p
            className="
              mt-0.5
              truncate
              text-[10px]
              font-medium
              uppercase
              tracking-[0.08em]
              text-grey-400

              min-[375px]:text-[11px]

              sm:mt-1
              sm:text-xs
            "
          >
            {product.brand}
          </p>
        )}

        {/* =========================================
            PRICE
        ========================================= */}
        <div
          className="
            mt-2
            flex
            min-w-0
            flex-wrap
            items-baseline
            gap-x-1.5
            gap-y-0.5

            sm:mt-3
            sm:gap-x-2
          "
        >
          {hasPromo ? (
            <>
              <span
                className="
                  truncate
                  text-sm
                  font-bold
                  text-gold-main

                  min-[375px]:text-[15px]

                  sm:text-lg
                "
              >
                {formatPrice(product.promoPrice!)}
              </span>

              <span
                className="
                  truncate
                  text-[10px]
                  text-grey-400
                  line-through

                  sm:text-xs
                  md:text-sm
                "
              >
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span
              className="
                truncate
                text-sm
                font-bold
                text-black-main

                min-[375px]:text-[15px]

                sm:text-lg
              "
            >
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* =========================================
            ADD TO CART
        ========================================= */}
        <div className="mt-auto pt-2.5 sm:pt-3">
          {isInStock ? (
            <PrimaryButton
              type="button"
              aria-label={`Ajouter ${product.name} au panier`}
              onClick={handleAddToCart}
              className="
                !mt-0
                flex
                h-9
                w-full
                items-center
                justify-center
                gap-0
                rounded-lg
                px-2
                text-xs

                sm:h-10
                sm:gap-2
                sm:rounded-xl
                sm:px-4
                sm:text-sm
              "
            >
              <ShoppingCart
                className="
                  h-4
                  w-4
                  shrink-0

                  sm:h-[17px]
                  sm:w-[17px]
                "
                strokeWidth={2}
              />

              <span className="hidden sm:inline">
                Ajouter au panier
              </span>
            </PrimaryButton>
          ) : (
            <div
              className="
                flex
                h-9
                w-full
                items-center
                justify-center
                rounded-lg
                bg-grey-100
                px-2
                text-[10px]
                font-medium
                text-grey-400

                sm:h-10
                sm:rounded-xl
                sm:text-xs
              "
            >
              Rupture de stock
            </div>
          )}
        </div>
      </div>
    </article>
  )
}