'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  Heart,
  ShoppingBag,
  Info,
} from 'lucide-react'
import { toast } from 'react-hot-toast'

import { useCart } from '@/lib/hooks/useCart'
import { favoritesApi } from '@/lib/api/favorites'
import { ProductCard } from '@/components/ui/Card/ProductCard'
import { useAuthStore } from '@/lib/stores/authStore'
import type { Product } from '@/lib/types/product'

export default function FavoritesPage() {
  const { addItem } = useCart()
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  )

  const [favorites, setFavorites] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadFavorites = async () => {
    try {
     const response = await favoritesApi.getAll()
const products = (response.data ?? [])
  .map((favorite) => favorite.product)
  .filter((product): product is Product => Boolean(product))

      setFavorites(products)
    } catch (error) {
      console.error('Failed to load favorites:', error)
      toast.error('Impossible de charger vos favoris')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false)
      return
    }

    loadFavorites()
  }, [isAuthenticated])

  const handleAddToCart = async (productId: string) => {
    try {
      await addItem(productId, 1)
      toast.success('Produit ajouté au panier')
    } catch (error) {
      console.error('Failed to add product to cart:', error)
      toast.error("Erreur lors de l'ajout au panier")
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-[60vh] max-w-[1600px] items-center justify-center px-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-black" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <nav
          aria-label="Fil d'Ariane"
          className="mb-8 flex items-center gap-2 text-[13px] text-gray-500"
        >
          <Link
            href="/"
            className="underline underline-offset-2 hover:text-black"
          >
            Accueil
          </Link>

          <ChevronRight
            className="h-3.5 w-3.5"
            aria-hidden="true"
          />

          <Link
            href="/profile"
            className="underline underline-offset-2 hover:text-black"
          >
            Mon compte
          </Link>

          <ChevronRight
            className="h-3.5 w-3.5"
            aria-hidden="true"
          />

          <span className="text-black">
            Mes favoris
          </span>
        </nav>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <aside className="hidden w-full shrink-0 lg:block lg:w-72">
            <div className="sticky top-24">
              <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-black">
                  <Heart
                    className="h-4 w-4"
                    strokeWidth={2}
                  />
                </div>

                <div>
                  <h2 className="text-[14px] font-semibold text-black">
                    Comment ajouter un favori ?
                  </h2>

                  <p className="mt-0.5 text-[12px] text-gray-500">
                    Guide rapide
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[12px] font-bold text-black">
                    1
                  </div>

                  <div>
                    <p className="text-[13px] font-semibold text-black">
                      Parcourez la boutique
                    </p>

                    <p className="mt-1 text-[12px] leading-relaxed text-gray-500">
                      Naviguez dans nos catégories et trouvez les produits qui vous plaisent.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[12px] font-bold text-black">
                    2
                  </div>

                  <div>
                    <p className="text-[13px] font-semibold text-black">
                      Cliquez sur le cœur
                    </p>

                    <p className="mt-1 text-[12px] leading-relaxed text-gray-500">
                      Sur chaque produit, cliquez sur l'icône cœur pour l'ajouter à vos favoris.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[12px] font-bold text-black">
                    3
                  </div>

                  <div>
                    <p className="text-[13px] font-semibold text-black">
                      Retrouvez-les ici
                    </p>

                    <p className="mt-1 text-[12px] leading-relaxed text-gray-500">
                      Tous vos favoris sont sauvegardés et accessibles depuis cette page.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[12px] font-bold text-black">
                    4
                  </div>

                  <div>
                    <p className="text-[13px] font-semibold text-black">
                      Ajoutez au panier
                    </p>

                    <p className="mt-1 text-[12px] leading-relaxed text-gray-500">
                      Depuis vos favoris, ajoutez directement les produits à votre panier.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-gray-200 bg-gray-50 p-3">
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0 text-black"
                  strokeWidth={1.8}
                />

                <p className="text-[11px] leading-relaxed text-gray-600">
                  Vos favoris sont enregistrés sur votre compte et restent disponibles même après déconnexion.
                </p>
              </div>

              <Link
                href="/"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-medium text-black transition-colors hover:border-black"
              >
                <ShoppingBag className="h-4 w-4" />
                Découvrir la boutique
              </Link>
            </div>
          </aside>

          <section className="min-w-0 flex-1">
            <h1 className="mb-12 text-[28px] font-bold leading-tight text-black sm:text-[32px]">
              Mes favoris
            </h1>

            {favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <h2 className="mb-8 text-[16px] font-bold text-black">
                  Qu'est-ce qui fait battre ton cœur ?
                </h2>

                <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
                  <Heart
                    className="h-16 w-16 text-black"
                    strokeWidth={1.2}
                  />
                </div>

                <p className="mb-8 text-[14px] text-gray-600">
                  Tous les articles ajoutés à tes favoris seront enregistrés ici
                </p>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-gray-800"
                >
                  Je shoppe
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
                {favorites.map((product) => (
                  <div
                    key={product.id}
                    className="relative"
                  >
                    <ProductCard product={product} />

                    <button
                      type="button"
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock <= 0}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      {product.stock > 0
                        ? 'Ajouter au panier'
                        : 'Rupture de stock'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}