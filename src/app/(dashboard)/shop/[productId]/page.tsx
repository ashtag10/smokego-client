'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Package,
  Sparkles,
  Star,
  ShieldCheck,
} from 'lucide-react'

import { productsApi } from '@/lib/api/products'
import { ImageGallery } from '@/components/shop/ProductDetail/ImageGallery'
import { ProductInfo } from '@/components/shop/ProductDetail/ProductInfo'
import { AddToCart } from '@/components/shop/ProductDetail/AddToCart'
import { ReviewList } from '@/components/shop/ProductDetail/ReviewList'
import { GoldDivider } from '@/components/ui/Divider/GoldDivider'
import type { Product } from '@/lib/types/product'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()

  const productId = params.productId as string

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return

      setIsLoading(true)

      try {
        const response = await productsApi.getProduct(productId)

        if (response.success && response.data) {
          setProduct(response.data)
        } else {
          setProduct(null)
        }
      } catch (error) {
        console.error('Failed to fetch product:', error)
        setProduct(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
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
          {/* Retour */}
          <div className="mb-8">
            <div className="h-5 w-28 animate-pulse rounded bg-grey-100" />
          </div>

          {/* Produit */}
          <div
            className="
              grid
              grid-cols-1
              gap-8
              md:grid-cols-2
              md:gap-10
              lg:gap-14
            "
          >
            {/* Image */}
            <div
              className="
                aspect-square
                animate-pulse
                overflow-hidden
                rounded-2xl
                bg-grey-100
                md:aspect-auto
                md:min-h-[520px]
              "
            />

            {/* Informations */}
            <div className="flex flex-col justify-center space-y-5">
              <div className="h-5 w-28 animate-pulse rounded bg-grey-100" />

              <div className="h-10 w-4/5 animate-pulse rounded bg-grey-100" />

              <div className="h-7 w-1/3 animate-pulse rounded bg-grey-100" />

              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-grey-100" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-grey-100" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-grey-100" />
              </div>

              <div className="h-14 w-full animate-pulse rounded-xl bg-grey-100" />

              <div className="h-14 w-full animate-pulse rounded-xl bg-grey-100" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  /* =========================================================
     PRODUIT INTROUVABLE
  ========================================================= */

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <div
          className="
            mx-auto
            flex
            min-h-[70vh]
            w-full
            max-w-[1600px]
            items-center
            justify-center
            px-4
            py-16
          "
        >
          <div className="max-w-md text-center">
            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-black-main
                text-gold-main
                shadow-[0_8px_30px_rgba(0,0,0,0.10)]
              "
            >
              <Package className="h-7 w-7" />
            </div>

            <h1
              className="
                mt-6
                font-serif
                text-3xl
                font-semibold
                text-black-main
              "
            >
              Produit non trouvé
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-grey-500">
              Le produit que vous recherchez n'existe plus ou
              n'est actuellement pas disponible.
            </p>

            <Link
              href="/shop"
              className="
                mt-7
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-gold-main
                px-6
                py-3
                text-sm
                font-semibold
                text-black-main
                shadow-[0_6px_20px_rgba(245,166,35,0.18)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_10px_28px_rgba(245,166,35,0.25)]
              "
            >
              Retour à la boutique
            </Link>
          </div>
        </div>
      </main>
    )
  }

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
            RETOUR
        ====================================================== */}

        <div className="mb-7">
          <button
            type="button"
            onClick={() => router.back()}
            className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-grey-500
              transition-colors
              duration-200
              hover:text-gold-main
            "
          >
            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-grey-100
                bg-white
                transition-all
                duration-200
                group-hover:border-gold-main/30
                group-hover:bg-gold-main/5
              "
            >
              <ArrowLeft className="h-4 w-4" />
            </span>

            Retour à la boutique
          </button>
        </div>

        {/* =====================================================
            PRODUIT
        ====================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-grey-100
            bg-white
            shadow-[0_8px_35px_rgba(0,0,0,0.05)]
            md:rounded-3xl
          "
        >
          {/* Décoration dorée */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-64
              w-64
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
              -bottom-40
              -left-32
              h-72
              w-72
              rounded-full
              bg-gold-main/5
              blur-3xl
            "
          />

          <div
            className="
              relative
              z-10
              grid
              grid-cols-1
              gap-0
              lg:grid-cols-[1.05fr_0.95fr]
            "
          >
            {/* =================================================
                GALERIE
            ================================================== */}

            <div
              className="
                border-b
                border-grey-100
                bg-[#FAF9F7]
                p-3
                sm:p-5
                lg:border-b-0
                lg:border-r
                lg:p-7
              "
            >
              <div
                className="
                  overflow-hidden
                  rounded-xl
                  sm:rounded-2xl
                "
              >
                <ImageGallery
                  images={product.images}
                  name={product.name}
                />
              </div>
            </div>

            {/* =================================================
                INFORMATIONS
            ================================================== */}

            <div
              className="
                flex
                flex-col
                justify-center
                p-5
                sm:p-7
                md:p-9
                lg:p-12
              "
            >
              {/* Badge */}

              <div
                className="
                  mb-5
                  inline-flex
                  w-fit
                  items-center
                  gap-2
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
                    shadow-[0_2px_8px_rgba(184,134,11,0.20)]
                  "
                >
                  <Sparkles
                    className="h-3.5 w-3.5"
                    strokeWidth={2}
                  />
                </div>

                <span
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#B8860B]
                    sm:text-xs
                  "
                >
                  SmokeGo Collection
                </span>
              </div>

              {/* Produit */}

              <ProductInfo product={product} />

              {/* Ajouter au panier */}

              <div className="mt-6">
                <AddToCart
                  productId={product.id}
                  stock={product.stock}
                />
              </div>

              {/* Garanties */}

              <div
                className="
                  mt-7
                  grid
                  grid-cols-1
                  gap-3
                  border-t
                  border-[#D4AF37]/15
                  pt-6
                  sm:grid-cols-2
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-[#FAF9F7]
                    p-3
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
                      rounded-lg
                      bg-gold-main/10
                      text-gold-main
                    "
                  >
                    <ShieldCheck className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-black-main">
                      Qualité SmokeGo
                    </p>

                    <p className="mt-0.5 text-[11px] text-grey-500">
                      Produits soigneusement sélectionnés
                    </p>
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-[#FAF9F7]
                    p-3
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
                      rounded-lg
                      bg-gold-main/10
                      text-gold-main
                    "
                  >
                    <Star
                      className="h-4 w-4"
                      fill="currentColor"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-black-main">
                      Expérience premium
                    </p>

                    <p className="mt-0.5 text-[11px] text-grey-500">
                      Une sélection pensée pour vous
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ligne dorée */}

          <div
            className="
              absolute
              bottom-0
              left-5
              right-5
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#D4AF37]/40
              to-transparent
              sm:left-10
              sm:right-10
            "
          />
        </section>

        {/* =====================================================
            AVIS
        ====================================================== */}

        <section className="mt-10 md:mt-14">
          <div className="mb-6 flex items-center gap-4">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-black-main
                text-gold-main
              "
            >
              <Star
                className="h-5 w-5"
                fill="currentColor"
              />
            </div>

            <div>
              <h2
                className="
                  font-serif
                  text-2xl
                  font-semibold
                  text-black-main
                  sm:text-3xl
                "
              >
                Avis clients
              </h2>

              <p className="mt-1 text-xs text-grey-500 sm:text-sm">
                Découvrez l'expérience des clients OusmanHOOKAH
              </p>
            </div>
          </div>

          <GoldDivider className="mb-7" />

          <div
            className="
              rounded-2xl
              border
              border-grey-100
              bg-white
              p-5
              shadow-[0_6px_25px_rgba(0,0,0,0.04)]
              sm:p-7
            "
          >
            <ReviewList productId={product.id} />
          </div>
        </section>
      </div>
    </main>
  )
}