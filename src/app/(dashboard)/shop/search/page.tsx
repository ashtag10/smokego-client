'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { productsApi } from '@/lib/api/products'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { Search, ShoppingBag, Package } from 'lucide-react'
import type { Product } from '@/lib/types/product'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setProducts([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const response = await productsApi.searchProducts(query.trim())
        if (response.success && response.data) {
          setProducts(response.data.data || [])
        } else {
          setProducts([])
        }
      } catch (error) {
        console.error('Search error:', error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchResults()
  }, [query])

  const resultCount = products.length

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* Fil d'Ariane */}
        <nav className="mb-6 flex items-center gap-2 text-[13px] text-gray-500">
          <a href="/" className="hover:text-black hover:underline">
            Accueil
          </a>
          <span className="text-gray-400">&gt;</span>
          <span className="font-medium text-black">Recherche</span>
        </nav>

        {/* Titre */}
        <div className="mb-8">
          <h1 className="text-[24px] font-bold leading-tight text-black sm:text-[28px]">
            {query ? `Résultats pour "${query}"` : 'Recherche'}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-[13px] text-gray-500">
            <Search className="h-4 w-4 text-gray-400" />
            <span>
              {isLoading
                ? 'Recherche en cours…'
                : resultCount === 0
                  ? 'Aucun produit trouvé'
                  : `${resultCount} produit${resultCount > 1 ? 's' : ''} trouvé${resultCount > 1 ? 's' : ''}`}
            </span>
          </div>
        </div>

        {/* Résultats */}
        <section>
          <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Package className="h-4 w-4" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-black">
                  Résultats de recherche
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  {isLoading
                    ? 'Chargement…'
                    : `${resultCount} produit${resultCount > 1 ? 's' : ''} correspondant${resultCount > 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
          </div>

          <ProductGrid
            products={products}
            isLoading={isLoading}
          />

          {/* État vide */}
          {!isLoading && products.length === 0 && (
            <div className="flex min-h-[300px] flex-col items-center justify-center py-16 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <ShoppingBag className="h-7 w-7" strokeWidth={1.5} />
              </div>

              <h2 className="text-[16px] font-bold text-black">
                Aucun résultat
              </h2>

              <p className="mt-2 max-w-md text-[13px] text-gray-500">
                {query
                  ? `Aucun produit ne correspond à "${query}". Essayez avec d'autres mots-clés.`
                  : 'Entrez un mot-clé pour lancer une recherche.'}
              </p>

              <a
                href="/shop"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-[#FFB800] px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#E5A600]"
              >
                Je shoppe
              </a>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}