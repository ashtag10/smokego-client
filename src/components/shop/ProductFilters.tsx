'use client'

import { useState, useEffect } from 'react'
import {
  SlidersHorizontal,
  CircleDollarSign,
  RotateCcw,
  Check,
  ChevronDown,
  Tag,
} from 'lucide-react'

import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'

interface BrandCount {
  brand: string
  count: number
}

interface CategoryFiltersProps {
  brands: BrandCount[]
  priceRange: { min: number; max: number }
  selectedBrands: string[]
  selectedPrice: { min?: number; max?: number }
  onChange: (next: { brands: string[]; price: { min?: number; max?: number } }) => void
}

export const CategoryFilters = ({
  brands,
  priceRange,
  selectedBrands,
  selectedPrice,
  onChange,
}: CategoryFiltersProps) => {
  // État "brouillon" — appliqué seulement au clic sur "Appliquer les filtres",
  // même logique que ProductFilters (category/sortBy/minPrice/maxPrice)
  const [draftBrands, setDraftBrands] = useState<string[]>(selectedBrands)
  const [minPrice, setMinPrice] = useState<string>(
    selectedPrice.min !== undefined ? String(selectedPrice.min) : ''
  )
  const [maxPrice, setMaxPrice] = useState<string>(
    selectedPrice.max !== undefined ? String(selectedPrice.max) : ''
  )

  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    setDraftBrands(selectedBrands)
  }, [selectedBrands])

  useEffect(() => {
    setMinPrice(selectedPrice.min !== undefined ? String(selectedPrice.min) : '')
    setMaxPrice(selectedPrice.max !== undefined ? String(selectedPrice.max) : '')
  }, [selectedPrice.min, selectedPrice.max])

  const toggleDraftBrand = (brand: string) => {
    setDraftBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  /* =========================================================
     APPLIQUER
  ========================================================= */

  const handleApply = () => {
    onChange({
      brands: draftBrands,
      price: {
        min: minPrice ? parseFloat(minPrice) : undefined,
        max: maxPrice ? parseFloat(maxPrice) : undefined,
      },
    })

    setIsMobileOpen(false)
  }

  /* =========================================================
     RÉINITIALISER
  ========================================================= */

  const handleReset = () => {
    setDraftBrands([])
    setMinPrice('')
    setMaxPrice('')

    onChange({ brands: [], price: {} })
  }

  return (
    <div className="w-full lg:w-72">
      {/* =====================================================
          MOBILE — BOUTON FILTRE
      ====================================================== */}

      <button
        type="button"
        onClick={() => setIsMobileOpen((previous) => !previous)}
        aria-expanded={isMobileOpen}
        aria-controls="mobile-category-filters"
        className="
          flex
          w-full
          items-center
          justify-between
          gap-4
          rounded-2xl
          border
          border-grey-200
          bg-white
          px-4
          py-4
          transition-colors
          duration-200
          lg:hidden
          hover:bg-[#FAF9F7]
        "
      >
        <div className="flex items-center gap-3">
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
              shadow-sm
            "
          >
            <SlidersHorizontal className="h-4.5 w-4.5" strokeWidth={2} />
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold text-black-main">Filtrer par</p>
            <p className="mt-0.5 text-xs text-grey-500">Marques et prix</p>
          </div>
        </div>

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-gold-main/20
            bg-gold-main/5
          "
        >
          <ChevronDown
            className={`h-4 w-4 text-gold-main transition-transform duration-300 ${
              isMobileOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </button>

      {/* =====================================================
          MOBILE — PANNEAU DÉROULANT
      ====================================================== */}

      <div
        id="mobile-category-filters"
        className={`grid lg:hidden transition-[grid-template-rows] duration-300 ease-out ${
          isMobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mt-3 rounded-2xl border border-grey-100 bg-white px-4 pb-5 pt-5">
            <FilterContent
              brands={brands}
              priceRange={priceRange}
              draftBrands={draftBrands}
              onToggleBrand={toggleDraftBrand}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onApply={handleApply}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          DESKTOP — FILTRES VISIBLES
      ====================================================== */}

      <div className="hidden lg:block">
        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-grey-200
            bg-white
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-48
              w-48
              rounded-full
              bg-gold-main/5
              blur-3xl
            "
          />

          <div className="relative p-5 lg:p-6">
            <div className="mb-6 flex items-center gap-3">
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
                  shadow-sm
                "
              >
                <SlidersHorizontal className="h-5 w-5" strokeWidth={2} />
              </div>

              <div>
                <h3 className="text-base font-semibold text-black-main">Filtrer par</h3>
                <p className="mt-0.5 text-xs text-grey-500">Marques et fourchette de prix</p>
              </div>
            </div>

            <FilterContent
              brands={brands}
              priceRange={priceRange}
              draftBrands={draftBrands}
              onToggleBrand={toggleDraftBrand}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onApply={handleApply}
              onReset={handleReset}
              desktop
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   FILTER CONTENT
============================================================ */

interface FilterContentProps {
  brands: BrandCount[]
  priceRange: { min: number; max: number }
  draftBrands: string[]
  onToggleBrand: (brand: string) => void

  minPrice: string
  setMinPrice: (value: string) => void

  maxPrice: string
  setMaxPrice: (value: string) => void

  onApply: () => void
  onReset: () => void

  desktop?: boolean
}

const FilterContent = ({
  brands,
  priceRange,
  draftBrands,
  onToggleBrand,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onApply,
  onReset,
  desktop = false,
}: FilterContentProps) => {
  return (
    <>
      {/* =====================================================
          MARQUES
      ====================================================== */}

      {brands.length > 0 && (
        <div className="mb-5">
          <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-black-main">
            <Tag className="h-4 w-4 text-gold-main" />
            Marques
          </label>

          <div className="max-h-56 space-y-1 overflow-y-auto rounded-lg border border-grey-100 bg-grey-50 p-2">
            {brands.map(({ brand, count }) => {
              const checked = draftBrands.includes(brand)
              return (
                <label
                  key={brand}
                  className={`
                    flex cursor-pointer items-center justify-between gap-2
                    rounded-md px-2.5 py-2 text-sm transition-colors duration-150
                    ${checked ? 'bg-white text-black-main shadow-sm' : 'text-grey-600 hover:bg-white/70'}
                  `}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleBrand(brand)}
                      className="h-4 w-4 rounded border-grey-300 text-gold-main focus:ring-gold-main/30"
                    />
                    {brand}
                  </span>
                  <span className="text-xs text-grey-400">{count}</span>
                </label>
              )
            })}
          </div>
        </div>
      )}

      {/* =====================================================
          PRIX MIN / MAX
      ====================================================== */}

      {priceRange.max > priceRange.min && (
        <div
          className={`grid gap-4 ${desktop ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}
        >
          <div>
            <label
              htmlFor={desktop ? 'cat-min-price-desktop' : 'cat-min-price-mobile'}
              className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-black-main"
            >
              <CircleDollarSign className="h-4 w-4 text-gold-main" />
              Prix minimum
            </label>

            <div className="relative">
              <input
                id={desktop ? 'cat-min-price-desktop' : 'cat-min-price-mobile'}
                type="number"
                min={priceRange.min}
                inputMode="numeric"
                placeholder={String(priceRange.min)}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="
                  h-[50px] w-full rounded-lg border border-grey-200 bg-grey-50
                  px-4 pr-16 text-sm text-black-main placeholder:text-grey-400
                  transition-all duration-200
                  hover:border-grey-300
                  focus:border-gold-main focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold-main/10
                "
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-grey-400">
                FCFA
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor={desktop ? 'cat-max-price-desktop' : 'cat-max-price-mobile'}
              className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-black-main"
            >
              <CircleDollarSign className="h-4 w-4 text-gold-main" />
              Prix maximum
            </label>

            <div className="relative">
              <input
                id={desktop ? 'cat-max-price-desktop' : 'cat-max-price-mobile'}
                type="number"
                min={priceRange.min}
                inputMode="numeric"
                placeholder={String(priceRange.max)}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="
                  h-[50px] w-full rounded-lg border border-grey-200 bg-grey-50
                  px-4 pr-16 text-sm text-black-main placeholder:text-grey-400
                  transition-all duration-200
                  hover:border-grey-300
                  focus:border-gold-main focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold-main/10
                "
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-grey-400">
                FCFA
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          DIVIDER
      ====================================================== */}

      <div className="my-6 h-px bg-gradient-to-r from-transparent via-grey-200 to-transparent" />

      {/* =====================================================
          ACTIONS
      ====================================================== */}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <SecondaryButton
          onClick={onReset}
          className="
            flex items-center justify-center gap-2 border-grey-200
            transition-all duration-200
            hover:border-gold-main/40 hover:text-gold-main
          "
        >
          <RotateCcw className="h-4 w-4" />
          Réinitialiser
        </SecondaryButton>

        <PrimaryButton
          onClick={onApply}
          className="
            flex items-center justify-center gap-2 shadow-md shadow-gold-main/10
            transition-all duration-200
            hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold-main/20
          "
        >
          <Check className="h-4 w-4" />
          Appliquer les filtres
        </PrimaryButton>
      </div>
    </>
  )
}
