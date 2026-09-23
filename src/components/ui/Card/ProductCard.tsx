'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { useCurrency } from '@/providers/CurrencyProvider'
import { cn } from '@/lib/utils/helpers'
import { useFavoritesStore } from '@/lib/stores/favoritesStore'
import { useAuthStore } from '@/lib/stores/authStore'
import type { Product } from '@/lib/types/product'

interface ProductCardProps {
  product: Product
  className?: string
}

const ProductRating = ({
  rating,
  reviewsCount,
}: {
  rating: number
  reviewsCount: number
}) => {
  if (reviewsCount <= 0) {
    return null
  }

  const normalizedRating = Math.max(0, Math.min(5, rating))

  return (
    <div
      className="mt-1.5 flex items-center gap-1.5"
      aria-label={`Note ${normalizedRating.toFixed(1)} sur 5, ${reviewsCount} avis`}
    >
      <div className="flex items-center gap-[1px]">
        {Array.from({ length: 5 }).map((_, index) => {
          const starPosition = index + 1
          const isFull = normalizedRating >= starPosition
          const isHalf =
            normalizedRating >= starPosition - 0.5 &&
            normalizedRating < starPosition

          return (
            <div
              key={index}
              className="relative h-[14px] w-[14px]"
            >
              <Star
                className="absolute inset-0 h-[14px] w-[14px] text-gray-300"
                strokeWidth={1.5}
              />

              {isFull && (
                <Star
                  className="absolute inset-0 h-[14px] w-[14px] fill-black text-black"
                  strokeWidth={1.5}
                />
              )}

              {isHalf && (
                <div className="absolute inset-0 w-1/2 overflow-hidden">
                  <Star
                    className="h-[14px] w-[14px] fill-black text-black"
                    strokeWidth={1.5}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <span className="text-[12px] font-medium text-gray-600">
        {normalizedRating.toFixed(1)}
      </span>

      <span className="text-[12px] text-gray-400">
        ({reviewsCount})
      </span>
    </div>
  )
}

export const ProductCard = ({
  product,
  className,
}: ProductCardProps) => {
  const { formatPrice } = useCurrency()
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const initializeFavorites = useFavoritesStore(
    (state) => state.initialize,
  )
  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite,
  )
  const favoriteIds = useFavoritesStore(
    (state) => state.favoriteIds,
  )

  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)

  const isFavorite = favoriteIds.includes(product.id)

  useEffect(() => {
    if (isAuthenticated && user) {
      initializeFavorites()
    }
  }, [isAuthenticated, user, initializeFavorites])

  const isInStock = product.stock > 0

  const hasPromo =
    product.promoPrice !== undefined &&
    product.promoPrice !== null &&
    product.promoPrice < product.price

  const discount = hasPromo
    ? Math.round(
        ((product.price - product.promoPrice!) / product.price) * 100,
      )
    : 0

  const savedAmount = hasPromo
    ? product.price - product.promoPrice!
    : 0

  const productHref = `/shop/${product.id}`
  const image = product.images?.[0]
  const rating = product.averageRating ?? 0
  const reviewsCount = product.reviewsCount ?? 0

  const handleFavorite = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
    event.stopPropagation()

    if (!isAuthenticated) {
      toast.error('Connectez-vous pour ajouter des favoris')
      return
    }

    if (isFavoriteLoading) {
      return
    }

    setIsFavoriteLoading(true)

    try {
      const added = await toggleFavorite(product.id)

      toast.success(
        added
          ? 'Produit ajouté aux favoris'
          : 'Produit retiré des favoris',
      )
    } catch (error) {
      console.error('Failed to update favorite:', error)
      toast.error('Impossible de modifier vos favoris')
    } finally {
      setIsFavoriteLoading(false)
    }
  }

  return (
    <div
      className={cn(
        'group flex h-full min-w-0 flex-col',
        className,
      )}
    >
      <Link
        href={productHref}
        aria-label={`Voir ${product.name}${
          product.brand ? `, ${product.brand}` : ''
        }, ${
          hasPromo
            ? `${formatPrice(product.promoPrice!)} au lieu de ${formatPrice(
                product.price,
              )}`
            : formatPrice(product.price)
        }${!isInStock ? ', rupture de stock' : ''}`}
        className="relative block aspect-square w-full shrink-0 overflow-hidden bg-white"
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
            className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <ShoppingCart
                className="mx-auto h-7 w-7 opacity-40 sm:h-8 sm:w-8"
                strokeWidth={1.5}
              />
              <span className="mt-1 block text-[10px] sm:text-xs">
                Pas d'image
              </span>
            </div>
          </div>
        )}

        {hasPromo && (
          <span className="absolute left-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-red-700 text-[10px] font-bold leading-none text-white sm:left-3 sm:top-3">
            -{discount}%
          </span>
        )}

        {!isInStock && (
          <span className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-white sm:bottom-3">
            Rupture de stock
          </span>
        )}

        <button
          type="button"
          onClick={handleFavorite}
          disabled={isFavoriteLoading}
          aria-label={
            isFavorite
              ? `Retirer ${product.name} des favoris`
              : `Ajouter ${product.name} aux favoris`
          }
          aria-pressed={isFavorite}
          className={cn(
            'absolute right-2 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-200 sm:right-3 sm:top-3',
            isFavorite
              ? 'border-black bg-black text-white'
              : 'border-gray-200 bg-white/95 text-black hover:border-black',
            isFavoriteLoading && 'cursor-wait opacity-60',
          )}
        >
          <Heart
            className={cn(
              'h-[17px] w-[17px] transition-transform duration-200',
              isFavorite && 'scale-105 fill-current',
            )}
            strokeWidth={1.8}
          />
        </button>
      </Link>

      <div className="mt-3 flex min-w-0 flex-1 flex-col">
        {product.brand && (
          <p className="truncate text-[13px] text-gray-600">
            {product.brand}
          </p>
        )}

        <Link
          href={productHref}
          className="mt-0.5"
        >
          <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-black group-hover:underline">
            {product.name}
          </h3>
        </Link>

        <ProductRating
          rating={rating}
          reviewsCount={reviewsCount}
        />

        <div className="mt-1.5 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
          {hasPromo ? (
            <>
              <span className="truncate text-[13px] text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>

              <span className="truncate text-[15px] font-semibold text-black">
                {formatPrice(product.promoPrice!)}
              </span>

              <span className="truncate text-[12px] font-medium text-black">
                -{formatPrice(savedAmount)}
              </span>
            </>
          ) : (
            <span className="truncate text-[15px] text-black">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}