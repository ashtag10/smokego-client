'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { productsApi } from '@/lib/api/products'
import { siteConfig } from '@/lib/config/site'

import type { Product } from '@/lib/types/product'

const mediaUrl = (path?: string | null) => {
  if (!path) return null

  if (path.startsWith('http')) {
    return path
  }

  return `${siteConfig.apiUrl.replace('/api', '')}${path}`
}

export const FeaturedCollection = () => {
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
          'Failed to fetch featured collection:',
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
      <section className="bg-white py-16 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="grid min-h-[520px] animate-pulse grid-cols-1 bg-[#F0F0F0] lg:grid-cols-2" />
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

  const featuredProduct = products[0]
  const image = mediaUrl(featuredProduct.images?.[0])

  if (!image) {
    return null
  }

  return (
    <section className="bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid overflow-hidden bg-[#F5F1E8] lg:grid-cols-2">
          {/* IMAGE */}
          <Link
            href={`/shop/${featuredProduct.id}`}
            className="group relative min-h-[430px] overflow-hidden sm:min-h-[520px] lg:min-h-[640px]"
          >
            <Image
              src={image}
              alt={featuredProduct.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

            <div className="absolute left-5 top-5 border border-white/50 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm sm:left-7 sm:top-7">
              Sélection Ousmane
            </div>
          </Link>

          {/* CONTENT */}
          <div className="flex flex-col justify-center px-7 py-12 sm:px-10 md:px-14 lg:px-16 xl:px-20">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[#B8943E]">
              La sélection Ousmane Hooka
            </p>

            <h2 className="max-w-xl font-serif text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-[#1A1A1A] sm:text-5xl lg:text-6xl">
              {featuredProduct.name}
            </h2>

            {featuredProduct.brand && (
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-[#6B6B6B]">
                {featuredProduct.brand}
              </p>
            )}

            {featuredProduct.description && (
              <p className="mt-6 max-w-lg text-sm leading-7 text-[#6B6B6B] sm:text-base">
                {featuredProduct.description}
              </p>
            )}

            {/* PRICE */}
            <div className="mt-8 flex items-baseline gap-3">
              {featuredProduct.promoPrice ? (
                <>
                  <span className="text-xl font-medium text-[#1A1A1A]">
                    {featuredProduct.promoPrice.toLocaleString('fr-FR')} FCFA
                  </span>

                  <span className="text-sm text-[#8A8A8A] line-through">
                    {featuredProduct.price.toLocaleString('fr-FR')} FCFA
                  </span>
                </>
              ) : (
                <span className="text-xl font-medium text-[#1A1A1A]">
                  {featuredProduct.price.toLocaleString('fr-FR')} FCFA
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Link
                href={`/shop/${featuredProduct.id}`}
                className="group inline-flex items-center gap-4 border-b border-[#1A1A1A] pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1A1A1A] transition-colors hover:border-[#C9A94E] hover:text-[#C9A94E]"
              >
                Découvrir le produit

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}