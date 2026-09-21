'use client'

import { useEffect, useState } from 'react'

import { productsApi } from '@/lib/api/products'
import { ProductCard } from '@/components/ui/Card/ProductCard'
import { Heading } from '@/components/ui/Typography/Heading'
import { ProductCardSkeleton } from '@/components/ui/Loading/Skeleton'

import type { Product } from '@/lib/types/product'

export const PopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsApi.getPopular()

        if (response.success && response.data) {
          setProducts(response.data)
        }
      } catch (error) {
        console.error(
          'Failed to fetch popular products:',
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
      <section className="bg-grey-50 py-10">
        <div className="mx-auto w-full max-w-[1600px] px-2 sm:px-3 lg:px-4">
          <Heading level="h2">Produits populaires</Heading>

          <div className="mt-5 flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-[47vw] shrink-0 sm:w-[30vw] lg:w-1/5">
                <ProductCardSkeleton />
              </div>
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
    <section className="bg-grey-50 py-10">
      <div className="mx-auto w-full max-w-[1600px] px-2 sm:px-3 lg:px-4">
        <Heading level="h2">Produits populaires</Heading>

        {/* PRODUCTS — first 5 visible, rest scrolls horizontally */}
        <div
          className="
            mt-5
            flex
            gap-3
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory
            pb-2
            sm:gap-4
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="
                w-[47vw]
                shrink-0
                snap-start
                sm:w-[30vw]
                lg:w-1/5
              "
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
