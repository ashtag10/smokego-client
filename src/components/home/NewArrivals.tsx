'use client'

import { useEffect, useState } from 'react'

import { productsApi } from '@/lib/api/products'
import { ProductCard } from '@/components/ui/Card/ProductCard'
import { Heading } from '@/components/ui/Typography/Heading'
import { ProductCardSkeleton } from '@/components/ui/Loading/Skeleton'

import type { Product } from '@/lib/types/product'

export const NewArrivals = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsApi.getNewArrivals()

        if (response.success && response.data) {
          setProducts(response.data)
        }
      } catch (error) {
        console.error(
          'Failed to fetch new arrivals:',
          error
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  /* =========================
     LOADING
  ========================== */
  if (isLoading) {
    return (
      <section className="bg-white py-12 md:py-14">
        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
            px-2
            sm:px-3
            lg:px-4
          "
        >
          {/* HEADER */}
          <div className="mb-7 flex items-center gap-3">
            <span
              className="
                h-9
                w-1
                rounded-full
                bg-gradient-to-b
                from-[#C89B3C]
                via-[#D4AF37]
                to-[#B8860B]
              "
            />

            <Heading level="h2">
              Nouveautés
            </Heading>
          </div>

          {/* SKELETONS */}
          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:gap-4
              md:grid-cols-3
              md:gap-5
              lg:grid-cols-4
              lg:gap-6
            "
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  /* =========================
     EMPTY
  ========================== */
  if (products.length === 0) {
    return null
  }

  /* =========================
     CONTENT
  ========================== */
  return (
    <section className="bg-white py-12 md:py-14">
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-2
          sm:px-3
          lg:px-4
        "
      >

        {/* SECTION HEADER */}
        <div className="mb-7 flex items-center justify-between">

          {/* TITLE */}
          <div className="flex items-center gap-3">
            <span
              className="
                h-9
                w-1
                shrink-0
                rounded-full
                bg-gradient-to-b
                from-[#C89B3C]
                via-[#D4AF37]
                to-[#B8860B]
              "
            />

            <div>
              <Heading level="h2">
                Nouveautés
              </Heading>

              <p className="mt-1 text-xs text-grey-500 sm:text-sm">
                Derniers produits ajoutés
              </p>
            </div>
          </div>

          {/* BADGE */}
          <span
            className="
              hidden
              rounded-full
              border
              border-[#D4AF37]/25
              bg-[#D4AF37]/8
              px-3.5
              py-1.5
              text-xs
              font-semibold
              tracking-wide
              text-[#B8860B]
              sm:inline-flex
              sm:items-center
            "
          >
            Nouveautés
          </span>
        </div>

        {/* PRODUCTS */}
        <div
          className="
            grid
            grid-cols-2
            gap-3
            sm:gap-4
            md:grid-cols-3
            md:gap-5
            lg:grid-cols-4
            lg:gap-6
          "
        >
          {products
            .slice(0, 4)
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
        </div>

      </div>
    </section>
  )
}