'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { productsApi } from '@/lib/api/products'
import { ProductCard } from '@/components/ui/Card/ProductCard'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { ProductCardSkeleton } from '@/components/ui/Loading/Skeleton'

import type { Product } from '@/lib/types/product'

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsApi.getFeatured()

        if (response.success && response.data) {
          setProducts(response.data)
        }
      } catch (error) {
        console.error(
          'Failed to fetch featured products:',
          error
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

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
          <div className="mb-7 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="
                  h-8
                  w-1
                  rounded-full
                  bg-gradient-to-b
                  from-[#C89B3C]
                  via-[#D4AF37]
                  to-[#B8860B]
                "
              />

              <Heading level="h2">
                Produits en vedette
              </Heading>
            </div>
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

  if (products.length === 0) {
    return null
  }

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

          <div className="flex items-center gap-3">
            {/* Accent doré */}
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

            <div>
              <Heading level="h2">
                Produits en vedette
              </Heading>

              <p className="mt-1 text-xs text-grey-500 sm:text-sm">
                Découvrez notre sélection premium
              </p>
            </div>
          </div>

          {/* VOIR TOUT */}
          <Link href="/shop">
            <PrimaryButton
              className="
                px-4
                py-2
                text-xs
                transition-all
                duration-300

                hover:scale-[1.02]

                hover:bg-gradient-to-r
                hover:from-[#C9A94E]
                hover:via-[#D4AF37]
                hover:to-[#B8963E]

                hover:text-white

                hover:shadow-[0_6px_18px_rgba(212,175,55,0.22)]

                active:scale-[0.99]

                sm:text-sm
              "
            >
              Voir tout
            </PrimaryButton>
          </Link>
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