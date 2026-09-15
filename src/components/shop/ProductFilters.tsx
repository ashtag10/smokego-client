'use client'

import { useState } from 'react'
import {
  SlidersHorizontal,
  ArrowUpDown,
  CircleDollarSign,
  RotateCcw,
  Check,
  ChevronDown,
} from 'lucide-react'

import { SelectInput } from '@/components/ui/Input/SelectInput'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'
import { PRODUCT_CATEGORY_LABELS } from '@/lib/utils/constants'

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void
  onReset: () => void
}

const categoryOptions = [
  {
    value: '',
    label: 'Toutes les catégories',
  },
  ...Object.entries(PRODUCT_CATEGORY_LABELS).map(
    ([value, label]) => ({
      value,
      label,
    })
  ),
]

const sortOptions = [
  {
    value: 'newest',
    label: 'Plus récents',
  },
  {
    value: 'popularity',
    label: 'Plus populaires',
  },
  {
    value: 'price_asc',
    label: 'Prix croissant',
  },
  {
    value: 'price_desc',
    label: 'Prix décroissant',
  },
]

export const ProductFilters = ({
  onFilterChange,
  onReset,
}: ProductFiltersProps) => {
  const [category, setCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('newest')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')

  // Ouvert uniquement sur mobile
  const [isMobileOpen, setIsMobileOpen] =
    useState(false)

  /* =========================================================
     APPLIQUER
  ========================================================= */

  const handleApply = () => {
    onFilterChange({
      category: category || undefined,
      sortBy,
      minPrice: minPrice
        ? parseFloat(minPrice)
        : undefined,
      maxPrice: maxPrice
        ? parseFloat(maxPrice)
        : undefined,
    })

    // Fermer automatiquement le menu mobile
    setIsMobileOpen(false)
  }

  /* =========================================================
     RÉINITIALISER
  ========================================================= */

  const handleReset = () => {
    setCategory('')
    setSortBy('newest')
    setMinPrice('')
    setMaxPrice('')

    onReset()
  }

  return (
    <div className="w-full">

      {/* =====================================================
          MOBILE — BOUTON FILTRE
      ====================================================== */}

      <button
        type="button"
        onClick={() =>
          setIsMobileOpen((previous) => !previous)
        }
        aria-expanded={isMobileOpen}
        aria-controls="mobile-product-filters"
        className="
          flex
          w-full
          items-center
          justify-between
          gap-4
          px-4
          py-4
          transition-colors
          duration-200
          md:hidden
          hover:bg-[#FAF9F7]
        "
      >
        {/* Gauche */}
        <div className="flex items-center gap-3">

          {/* Icône */}
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
            <SlidersHorizontal
              className="h-4.5 w-4.5"
              strokeWidth={2}
            />
          </div>

          {/* Texte */}
          <div className="text-left">
            <p
              className="
                text-sm
                font-semibold
                text-black-main
              "
            >
              Filtrer les produits
            </p>

            <p
              className="
                mt-0.5
                text-xs
                text-grey-500
              "
            >
              Affinez votre recherche
            </p>
          </div>
        </div>

        {/* Chevron */}
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
            className={`
              h-4
              w-4
              text-gold-main
              transition-transform
              duration-300
              ${
                isMobileOpen
                  ? 'rotate-180'
                  : 'rotate-0'
              }
            `}
          />
        </div>
      </button>

      {/* =====================================================
          MOBILE — PANNEAU DÉROULANT
      ====================================================== */}

      <div
        id="mobile-product-filters"
        className={`
          grid
          md:hidden
          transition-[grid-template-rows]
          duration-300
          ease-out
          ${
            isMobileOpen
              ? 'grid-rows-[1fr]'
              : 'grid-rows-[0fr]'
          }
        `}
      >
        <div className="min-h-0 overflow-hidden">

          <div
            className="
              border-t
              border-grey-100
              bg-white
              px-4
              pb-5
              pt-5
            "
          >
            <FilterContent
              category={category}
              setCategory={setCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
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

      <div className="hidden md:block">

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

          {/* Glow doré */}
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

          <div
            className="
              relative
              p-5
              md:p-6
              lg:p-7
            "
          >
            <FilterContent
              category={category}
              setCategory={setCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
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
   TYPES FILTER CONTENT
============================================================ */

interface FilterContentProps {
  category: string
  setCategory: (value: string) => void

  sortBy: string
  setSortBy: (value: string) => void

  minPrice: string
  setMinPrice: (value: string) => void

  maxPrice: string
  setMaxPrice: (value: string) => void

  onApply: () => void
  onReset: () => void

  desktop?: boolean
}

/* ============================================================
   FILTER CONTENT
============================================================ */

const FilterContent = ({
  category,
  setCategory,
  sortBy,
  setSortBy,
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
          HEADER DESKTOP
      ====================================================== */}

      {desktop && (
        <div
          className="
            mb-6
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Titre */}
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
              <SlidersHorizontal
                className="h-5 w-5"
                strokeWidth={2}
              />
            </div>

            <div>
              <h3
                className="
                  text-base
                  font-semibold
                  text-black-main
                  md:text-lg
                "
              >
                Filtrer les produits
              </h3>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-grey-500
                  md:text-sm
                "
              >
                Affinez votre recherche pour trouver
                votre produit idéal
              </p>
            </div>

          </div>

          {/* Label */}
          <div
            className="
              hidden
              items-center
              gap-1.5
              text-xs
              font-medium
              uppercase
              tracking-wider
              text-grey-400
              md:flex
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-gold-main
              "
            />

            Affiner
          </div>
        </div>
      )}

      {/* =====================================================
          FILTRES
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
          lg:grid-cols-4
        "
      >

        {/* =================================================
            CATÉGORIE
        ================================================== */}

        <div className="relative">
          <SelectInput
            label="Catégorie"
            options={categoryOptions}
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />
        </div>

        {/* =================================================
            TRI
        ================================================== */}

        <div className="relative">
          <SelectInput
            label="Trier par"
            options={sortOptions}
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          />
        </div>

        {/* =================================================
            PRIX MINIMUM
        ================================================== */}

        <div>
          <label
            htmlFor={
              desktop
                ? 'product-min-price-desktop'
                : 'product-min-price-mobile'
            }
            className="
              mb-1.5
              flex
              items-center
              gap-1.5
              text-sm
              font-medium
              text-black-main
            "
          >
            <CircleDollarSign
              className="
                h-4
                w-4
                text-gold-main
              "
            />

            Prix minimum
          </label>

          <div className="relative">

            <input
              id={
                desktop
                  ? 'product-min-price-desktop'
                  : 'product-min-price-mobile'
              }
              type="number"
              min="0"
              inputMode="numeric"
              placeholder="0"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value)
              }
              className="
                h-[50px]
                w-full
                rounded-lg
                border
                border-grey-200
                bg-grey-50
                px-4
                pr-16
                text-sm
                text-black-main
                placeholder:text-grey-400
                transition-all
                duration-200
                hover:border-grey-300
                focus:border-gold-main
                focus:bg-white
                focus:outline-none
                focus:ring-4
                focus:ring-gold-main/10
              "
            />

            <span
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-xs
                font-medium
                text-grey-400
              "
            >
              FCFA
            </span>

          </div>
        </div>

        {/* =================================================
            PRIX MAXIMUM
        ================================================== */}

        <div>
          <label
            htmlFor={
              desktop
                ? 'product-max-price-desktop'
                : 'product-max-price-mobile'
            }
            className="
              mb-1.5
              flex
              items-center
              gap-1.5
              text-sm
              font-medium
              text-black-main
            "
          >
            <CircleDollarSign
              className="
                h-4
                w-4
                text-gold-main
              "
            />

            Prix maximum
          </label>

          <div className="relative">

            <input
              id={
                desktop
                  ? 'product-max-price-desktop'
                  : 'product-max-price-mobile'
              }
              type="number"
              min="0"
              inputMode="numeric"
              placeholder="100 000"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value)
              }
              className="
                h-[50px]
                w-full
                rounded-lg
                border
                border-grey-200
                bg-grey-50
                px-4
                pr-16
                text-sm
                text-black-main
                placeholder:text-grey-400
                transition-all
                duration-200
                hover:border-grey-300
                focus:border-gold-main
                focus:bg-white
                focus:outline-none
                focus:ring-4
                focus:ring-gold-main/10
              "
            />

            <span
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-xs
                font-medium
                text-grey-400
              "
            >
              FCFA
            </span>

          </div>
        </div>
      </div>

      {/* =====================================================
          DIVIDER
      ====================================================== */}

      <div
        className="
          my-6
          h-px
          bg-gradient-to-r
          from-transparent
          via-grey-200
          to-transparent
        "
      />

      {/* =====================================================
          ACTIONS
      ====================================================== */}

      <div
        className="
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        {/* Information */}
        <div
          className="
            flex
            items-center
            gap-2
            text-xs
            text-grey-400
          "
        >
          <ArrowUpDown className="h-4 w-4" />

          <span>
            Choisissez vos critères puis appliquez-les
          </span>
        </div>

        {/* Boutons */}
        <div
          className="
            flex
            flex-col-reverse
            gap-3
            sm:flex-row
          "
        >

          {/* RÉINITIALISER */}
          <SecondaryButton
            onClick={onReset}
            className="
              flex
              items-center
              justify-center
              gap-2
              border-grey-200
              transition-all
              duration-200
              hover:border-gold-main/40
              hover:text-gold-main
            "
          >
            <RotateCcw className="h-4 w-4" />

            Réinitialiser
          </SecondaryButton>

          {/* APPLIQUER */}
          <PrimaryButton
            onClick={onApply}
            className="
              flex
              items-center
              justify-center
              gap-2
              shadow-md
              shadow-gold-main/10
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-lg
              hover:shadow-gold-main/20
            "
          >
            <Check className="h-4 w-4" />

            Appliquer les filtres
          </PrimaryButton>

        </div>
      </div>
    </>
  )
}