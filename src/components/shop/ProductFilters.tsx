'use client'

import { useState } from 'react'
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  PackageCheck,
} from 'lucide-react'
import type { ProductFilters as ProductFiltersType } from '@/lib/types/product'

interface ProductFiltersProps {
  onFilterChange: (filters: Partial<ProductFiltersType>) => void
  onReset: () => void
}

export const ProductFilters = ({
  onFilterChange,
  onReset,
}: ProductFiltersProps) => {
  const [brand, setBrand] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [inStock, setInStock] = useState(false)
  const [sortBy, setSortBy] =
    useState<ProductFiltersType['sortBy']>('newest')
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleApply = () => {
    onFilterChange({
      brand: brand.trim() || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      inStock: inStock || undefined,
      sortBy,
      page: 1,
    })

    setIsMobileOpen(false)
  }

  const handleReset = () => {
    setBrand('')
    setMinPrice('')
    setMaxPrice('')
    setInStock(false)
    setSortBy('newest')

    onReset()
    setIsMobileOpen(false)
  }

  const filterContent = (
    <div className="space-y-6">
      {/* Brand */}
      <div>
        <label
          htmlFor="product-brand"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Marque
        </label>

        <div className="relative">
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="product-brand"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Ex. ADALYA"
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
          />
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">
          Prix
        </p>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
          />

          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
          />
        </div>
      </div>

      {/* Stock */}
      <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 accent-[#D4AF37]"
        />

        <span className="flex items-center gap-2">
          <PackageCheck size={17} />
          Produits disponibles uniquement
        </span>
      </label>

      {/* Sort */}
      <div>
        <label
          htmlFor="product-sort"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Trier par
        </label>

        <select
          id="product-sort"
          value={sortBy ?? 'newest'}
          onChange={(e) =>
            setSortBy(
              e.target.value as ProductFiltersType['sortBy'],
            )
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
        >
          <option value="newest">Plus récents</option>
          <option value="popularity">Popularité</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <RotateCcw size={16} />
          Réinitialiser
        </button>

        <button
          type="button"
          onClick={handleApply}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#C5A028]"
        >
          <SlidersHorizontal size={16} />
          Appliquer
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile */}
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800"
        >
          <SlidersHorizontal size={18} />
          {isMobileOpen ? 'Masquer les filtres' : 'Afficher les filtres'}
        </button>

        {isMobileOpen && (
          <div className="mt-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            {filterContent}
          </div>
        )}
      </div>

      {/* Desktop */}
      <aside className="hidden w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:block">
        <div className="mb-5 flex items-center gap-2 border-b border-gray-200 pb-4">
          <SlidersHorizontal size={19} className="text-[#D4AF37]" />

          <h2 className="text-base font-semibold text-gray-900">
            Filtrer les produits
          </h2>
        </div>

        {filterContent}
      </aside>
    </>
  )
}