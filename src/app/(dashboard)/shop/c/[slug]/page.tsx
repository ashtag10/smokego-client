'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Filter, Loader2 } from 'lucide-react'

import { categoriesApi } from '@/lib/api/categories'
import { productsApi } from '@/lib/api/products'

import { ProductGrid } from '@/components/shop/ProductGrid'
import { ProductSort } from '@/components/shop/ProductSort'
import {
  CategoryFilters,
  type AdvancedFilter,
  type AdvancedSelectedFilters,
} from '@/components/shop/CategoryFilters'

import { cn } from '@/lib/utils/helpers'

const PAGE_SIZE = 20

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string | null
  children?: Category[]
}

interface BrandCount {
  brand: string
  count: number
}

interface CategoryFiltersData {
  brands: BrandCount[]
  minPrice: number
  maxPrice: number
  advancedFilters?: AdvancedFilter[]
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [activeSlug, setActiveSlug] = useState('')
  const [category, setCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [filterOptions, setFilterOptions] = useState<CategoryFiltersData>({
    brands: [],
    minPrice: 0,
    maxPrice: 0,
    advancedFilters: [],
  })
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPrice, setSelectedPrice] = useState<{ min?: number; max?: number }>({})
  const [selectedAdvancedFilters, setSelectedAdvancedFilters] =
    useState<AdvancedSelectedFilters>({})
  const [sortBy, setSortBy] = useState('relevance')
  const [page, setPage] = useState(1)
  const [isLoadingCategory, setIsLoadingCategory] = useState(true)
  const [isLoadingFilters, setIsLoadingFilters] = useState(true)
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let mounted = true
    params.then(({ slug }) => {
      if (mounted) setActiveSlug(slug)
    })
    return () => { mounted = false }
  }, [params])

  useEffect(() => {
    if (!activeSlug) return
    let cancelled = false

    const loadCategory = async () => {
      setIsLoadingCategory(true)
      setNotFound(false)
      try {
        const response = await categoriesApi.getBySlug(activeSlug)
        if (cancelled) return
        if (!response?.success || !response?.data) {
          setCategory(null)
          setCategories([])
          setNotFound(true)
          return
        }
        const categoryData = response.data as Category
        setCategory(categoryData)
        setCategories(Array.isArray(categoryData.children) ? categoryData.children : [])
        setSelectedBrands([])
        setSelectedPrice({})
        setSelectedAdvancedFilters({})
        setPage(1)
      } catch (error) {
        console.error('Erreur catégorie:', error)
        if (!cancelled) {
          setCategory(null)
          setCategories([])
          setNotFound(true)
        }
      } finally {
        if (!cancelled) setIsLoadingCategory(false)
      }
    }

    loadCategory()
    return () => { cancelled = true }
  }, [activeSlug])

  const isParentView = useMemo(() => categories.length > 0, [categories])

  useEffect(() => {
    if (!activeSlug) return
    let cancelled = false

    const loadFilters = async () => {
      setIsLoadingFilters(true)
      try {
        const response = await productsApi.getCategoryFilters(activeSlug, isParentView)
        if (cancelled) return
        const data = response?.data
        setFilterOptions({
          brands: Array.isArray(data?.brands) ? data.brands : [],
          minPrice: Number(data?.minPrice ?? 0),
          maxPrice: Number(data?.maxPrice ?? 0),
          advancedFilters: [],
        })
      } catch (error) {
        console.error('Erreur filtres:', error)
        if (!cancelled) {
          setFilterOptions({ brands: [], minPrice: 0, maxPrice: 0, advancedFilters: [] })
        }
      } finally {
        if (!cancelled) setIsLoadingFilters(false)
      }
    }

    loadFilters()
    return () => { cancelled = true }
  }, [activeSlug, isParentView])

  const categoryFilters = useMemo(() => {
    return [
      ...(filterOptions.brands.length > 0
        ? [{
            key: 'brand',
            label: 'Marques',
            type: 'checkbox' as const,
            options: filterOptions.brands.map(({ brand, count }) => ({
              value: brand,
              label: brand,
              count,
            })),
          }]
        : []),
      ...(filterOptions.maxPrice > filterOptions.minPrice
        ? [{
            key: 'price',
            label: 'Prix',
            type: 'range' as const,
            min: filterOptions.minPrice,
            max: filterOptions.maxPrice,
            unit: 'FCFA',
          }]
        : []),
      ...(filterOptions.advancedFilters ?? []),
    ]
  }, [filterOptions])

  const selectedFilters = useMemo(
    () => ({
      brand: selectedBrands,
      price: selectedPrice,
      ...selectedAdvancedFilters,
    }),
    [selectedBrands, selectedPrice, selectedAdvancedFilters]
  )

  useEffect(() => {
    if (!activeSlug) return
    let cancelled = false

    const loadProducts = async () => {
      setIsLoadingProducts(true)
      try {
        const response = await productsApi.getByCategory(activeSlug, {
          includeSubcategories: isParentView,
          filters: {
            sortBy,
            brand: selectedBrands.length > 0 ? selectedBrands : undefined,
            minPrice: selectedPrice.min,
            maxPrice: selectedPrice.max,
            skip: (page - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
          } as any,
        })

        if (cancelled) return
        const paginatedData = response?.data
        setProducts(Array.isArray(paginatedData?.data) ? paginatedData.data : [])
        setTotal(Number(paginatedData?.total ?? 0))
      } catch (error) {
        console.error('Erreur produits:', error)
        if (!cancelled) { setProducts([]); setTotal(0) }
      } finally {
        if (!cancelled) setIsLoadingProducts(false)
      }
    }

    loadProducts()
    return () => { cancelled = true }
  }, [activeSlug, isParentView, sortBy, selectedBrands, selectedPrice, selectedAdvancedFilters, page])

  const handleFiltersChange = (next: AdvancedSelectedFilters) => {
    const nextBrands = Array.isArray(next.brand) ? next.brand : []
    const nextPrice = next.price && !Array.isArray(next.price) ? next.price : {}
    const { brand, price, ...advanced } = next
    setSelectedBrands(nextBrands)
    setSelectedPrice(nextPrice)
    setSelectedAdvancedFilters(advanced)
    setPage(1)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    setPage(1)
  }

  const handleChildCategoryChange = (slug: string) => {
    setSelectedBrands([])
    setSelectedPrice({})
    setSelectedAdvancedFilters({})
    setPage(1)
    setActiveSlug(slug)
  }

  const handleResetFilters = () => {
    setSelectedBrands([])
    setSelectedPrice({})
    setSelectedAdvancedFilters({})
    setPage(1)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  if (isLoadingCategory && !category) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-[60vh] max-w-[1600px] items-center justify-center px-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" aria-hidden="true" />
        </div>
      </main>
    )
  }

  if (notFound || !category) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-[60vh] max-w-[1600px] flex-col items-center justify-center px-4 text-center">
          <h1 className="text-[20px] font-bold text-black sm:text-[24px]">
            Catégorie introuvable
          </h1>
          <p className="mt-3 max-w-md text-[13px] text-gray-500">
            Cette catégorie n'existe pas ou n'est plus disponible.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center justify-center bg-black px-6 py-3 text-[13px] font-medium text-white transition hover:bg-gray-800"
          >
            Retour à la boutique
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1600px] px-3 py-5 sm:px-4 sm:py-6 lg:px-6 xl:px-8">

        {/* Fil d'Ariane — sans "Boutique" */}
        <nav
          aria-label="Fil d'Ariane"
          className="mb-5 flex items-center gap-2 text-[11px] text-gray-500 sm:text-[12px]"
        >
          <Link href="/" className="transition hover:text-black hover:underline">
            Accueil
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
          <span className="font-medium text-black">{category.name}</span>
        </nav>

        {/* Titre */}
        <header className="mb-5">
          <h1 className="text-[18px] font-bold leading-tight text-black sm:text-[20px] md:text-[22px]">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-2 max-w-3xl text-[12px] leading-5 text-gray-500 sm:text-[13px]">
              {category.description}
            </p>
          )}
        </header>

        {/* Sous-catégories — onglets plats */}
        {categories.length > 0 && (
          <div className="mb-6 w-full max-w-full overflow-x-auto border-b border-gray-200 scrollbar-hide">
            <div className="flex w-max min-w-full gap-3 pb-2 sm:gap-4">
              {categories.map((child) => {
                const isActive = child.slug === activeSlug
                return (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => handleChildCategoryChange(child.slug)}
                    className={cn(
                      'shrink-0 max-w-[180px] truncate border-b-2 px-1 py-1 text-[10px] font-medium uppercase tracking-[0.08em] transition-colors sm:max-w-[220px] sm:text-[11px]',
                      isActive
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-black'
                    )}
                  >
                    {child.name}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Contenu principal */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">

          {/* Sidebar filtres */}
          <aside className="w-full shrink-0 lg:w-72">
            <div className="sticky top-24">
              {isLoadingFilters ? (
                <div className="flex items-center gap-2 border-t border-gray-200 py-5 text-[13px] text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin text-purple-600" aria-hidden="true" />
                  <span>Chargement des filtres...</span>
                </div>
              ) : categoryFilters.length > 0 ? (
                <CategoryFilters
                  filters={categoryFilters}
                  selectedFilters={selectedFilters}
                  onChange={handleFiltersChange}
                />
              ) : (
                <div className="border-t border-gray-200 py-5 text-[13px] text-gray-500">
                  Aucun filtre disponible.
                </div>
              )}
            </div>
          </aside>

          {/* Produits */}
          <section className="min-w-0 flex-1">

            {/* Compteur + tri */}
            <div className="mb-4 flex flex-col gap-3 border-b border-gray-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-gray-500 sm:text-[12px]">
                <span className="font-medium text-black">{total}</span>{' '}
                produit{total > 1 ? 's' : ''}
              </p>
              <ProductSort value={sortBy} onChange={handleSortChange} />
            </div>

            {/* Chargement */}
            {isLoadingProducts ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" aria-hidden="true" />
              </div>
            ) : products.length > 0 ? (
              <>
                <ProductGrid products={products} />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => setPage((c) => Math.max(1, c - 1))}
                      className={cn(
                        'border px-3 py-1.5 text-[12px] transition',
                        page <= 1
                          ? 'cursor-not-allowed border-gray-100 text-gray-300'
                          : 'border-gray-200 text-black hover:border-black'
                      )}
                    >
                      Précédent
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                        <button
                          key={pageNumber}
                          type="button"
                          onClick={() => setPage(pageNumber)}
                          className={cn(
                            'h-8 min-w-8 border px-2 text-[12px] transition',
                            pageNumber === page
                              ? 'border-black bg-black text-white'
                              : 'border-gray-200 text-black hover:border-black'
                          )}
                        >
                          {pageNumber}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => setPage((c) => Math.min(totalPages, c + 1))}
                      className={cn(
                        'border px-3 py-1.5 text-[12px] transition',
                        page >= totalPages
                          ? 'cursor-not-allowed border-gray-100 text-gray-300'
                          : 'border-gray-200 text-black hover:border-black'
                      )}
                    >
                      Suivant
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center border border-gray-200 px-6 text-center">
                <div className="mb-4 flex h-10 w-10 items-center justify-center border border-gray-200">
                  <Filter className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <h2 className="text-[15px] font-semibold text-black">
                  Aucun produit trouvé
                </h2>
                <p className="mt-2 max-w-md text-[12px] leading-5 text-gray-500">
                  Aucun produit ne correspond aux critères sélectionnés dans cette catégorie.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-5 border border-black bg-black px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-gray-800"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}