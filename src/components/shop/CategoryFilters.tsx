'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  SlidersHorizontal, CircleDollarSign, RotateCcw, Check, ChevronDown,
  Tag, Palette, Ruler, Layers3, Wind, Flame, Cylinder, Magnet,
  Package, CircleDot, Droplets, Sparkles,
} from 'lucide-react'

import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'

export interface AdvancedFilterOption {
  value: string
  label: string
  count?: number
}

export type AdvancedFilterType = 'checkbox' | 'range'

export interface AdvancedFilter {
  key: string
  label: string
  type: AdvancedFilterType
  options?: AdvancedFilterOption[]
  min?: number
  max?: number
  unit?: string
}

export type AdvancedFilterValue = string[] | { min?: number; max?: number }

export type AdvancedSelectedFilters = Record<string, AdvancedFilterValue>

export interface CategoryFiltersProps {
  filters?: AdvancedFilter[]
  selectedFilters?: AdvancedSelectedFilters | null
  onChange: (filters: AdvancedSelectedFilters) => void
}

const getFilterIcon = (key: string) => {
  switch (key.toLowerCase()) {
    case 'brand':
    case 'brands':
    case 'marque':
    case 'marques': return Tag
    case 'color':
    case 'colors':
    case 'couleur':
    case 'couleurs': return Palette
    case 'size':
    case 'height':
    case 'taille': return Ruler
    case 'material':
    case 'matiere':
    case 'matière': return Layers3
    case 'hose':
    case 'tuyau': return Wind
    case 'bowl':
    case 'foyer': return Flame
    case 'base':
    case 'vase': return Cylinder
    case 'fixation': return Magnet
    case 'hiddenpurge':
    case 'purge': return Droplets
    case 'heatingsystem':
    case 'heating':
    case 'systemedechauffe':
    case 'systèmede chauffe': return Flame
    case 'transport': return Package
    case 'diffuser':
    case 'diffuseur': return CircleDot
    case 'flavor':
    case 'saveur':
    case 'gout':
    case 'goût': return Sparkles
    case 'intensity':
    case 'intensite':
    case 'intensité': return Wind
    case 'format': return Package
    case 'compatibility':
    case 'compatibilite':
    case 'compatibilité': return Layers3
    case 'price':
    case 'prix': return CircleDollarSign
    default: return SlidersHorizontal
  }
}

const cloneSelectedFilters = (
  filters?: AdvancedSelectedFilters | null,
): AdvancedSelectedFilters => {
  if (!filters) return {}
  return Object.fromEntries(
    Object.entries(filters).map(([key, value]) => [
      key,
      Array.isArray(value) ? [...value] : { min: value?.min, max: value?.max },
    ])
  )
}

const isRangeValue = (
  value: AdvancedFilterValue | undefined,
): value is { min?: number; max?: number } => {
  return !!value && !Array.isArray(value)
}

const isArrayValue = (
  value: AdvancedFilterValue | undefined,
): value is string[] => {
  return Array.isArray(value)
}

export const CategoryFilters = ({
  filters = [],
  selectedFilters = {},
  onChange,
}: CategoryFiltersProps) => {
  const safeSelectedFilters = selectedFilters ?? {}

  const [draftFilters, setDraftFilters] = useState<AdvancedSelectedFilters>(() =>
    cloneSelectedFilters(safeSelectedFilters)
  )
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const selectedFiltersKey = useMemo(
    () => JSON.stringify(safeSelectedFilters),
    [safeSelectedFilters]
  )

  useEffect(() => {
    setDraftFilters(cloneSelectedFilters(safeSelectedFilters))
  }, [selectedFiltersKey])

  const toggleOption = (filterKey: string, value: string) => {
    setDraftFilters((previous) => {
      const current = previous[filterKey]
      const currentValues = isArrayValue(current) ? current : []
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value]
      return { ...previous, [filterKey]: nextValues }
    })
  }

  const updateRange = (
    filterKey: string,
    type: 'min' | 'max',
    value: number | undefined
  ) => {
    setDraftFilters((previous) => {
      const current = previous[filterKey]
      const currentRange = isRangeValue(current) ? current : {}
      return {
        ...previous,
        [filterKey]: { ...currentRange, [type]: value },
      }
    })
  }

  const toggleSection = (key: string) => {
    setOpenSections((previous) => ({
      ...previous,
      [key]: previous[key] === undefined ? false : !previous[key],
    }))
  }

  const handleApply = () => {
    onChange(cloneSelectedFilters(draftFilters))
    setIsMobileOpen(false)
  }

  const handleReset = () => {
    const emptyFilters: AdvancedSelectedFilters = {}
    setDraftFilters(emptyFilters)
    onChange(emptyFilters)
  }

  const hasActiveFilters = Object.values(safeSelectedFilters).some((value) => {
    if (Array.isArray(value)) return value.length > 0
    return value.min !== undefined || value.max !== undefined
  })

  const filterContent = (
    <>
      {filters.map((filter) => {
        const Icon = getFilterIcon(filter.key)
        const current = draftFilters[filter.key]
        const selectedValues = isArrayValue(current) ? current : []
        const selectedRange = isRangeValue(current) ? current : {}
        const hasSelection =
          selectedValues.length > 0 ||
          selectedRange.min !== undefined ||
          selectedRange.max !== undefined

        return (
          <FilterSection
            key={filter.key}
            filterKey={filter.key}
            label={filter.label}
            icon={Icon}
            openSections={openSections}
            toggleSection={toggleSection}
            badge={
              hasSelection
                ? filter.type === 'checkbox'
                  ? selectedValues.length
                  : '•'
                : undefined
            }
          >
            {filter.type === 'checkbox' && filter.options && filter.options.length > 0 && (
              <div className="max-h-60 space-y-1 overflow-y-auto pr-1">
                {filter.options.map((option) => {
                  const checked = selectedValues.includes(option.value)
                  return (
                    <label
                      key={option.value}
                      className={[
                        'flex cursor-pointer items-center',
                        'justify-between gap-3 rounded-lg',
                        'px-2.5 py-2 text-sm',
                        'transition-colors duration-150',
                        checked
                          ? 'bg-purple-50 text-black'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-black',
                      ].join(' ')}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleOption(filter.key, option.value)}
                          className="h-4 w-4 shrink-0 rounded border-gray-300 text-purple-600 focus:ring-purple-500/30"
                        />
                        <span className="truncate">{option.label}</span>
                      </span>
                      {option.count !== undefined && (
                        <span className="shrink-0 text-xs text-gray-400">{option.count}</span>
                      )}
                    </label>
                  )
                })}
              </div>
            )}

            {filter.type === 'range' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor={`filter-${filter.key}-min`}
                      className="mb-1.5 block text-xs text-gray-500"
                    >
                      Minimum
                    </label>
                    <div className="relative">
                      <input
                        id={`filter-${filter.key}-min`}
                        type="number"
                        min={filter.min}
                        max={selectedRange.max ?? filter.max}
                        value={selectedRange.min ?? ''}
                        placeholder={filter.min !== undefined ? String(filter.min) : ''}
                        onChange={(event) => {
                          const raw = event.target.value
                          updateRange(filter.key, 'min', raw === '' ? undefined : Number(raw))
                        }}
                        className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 pr-12 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                      />
                      {filter.unit && (
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-400">
                          {filter.unit}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`filter-${filter.key}-max`}
                      className="mb-1.5 block text-xs text-gray-500"
                    >
                      Maximum
                    </label>
                    <div className="relative">
                      <input
                        id={`filter-${filter.key}-max`}
                        type="number"
                        min={selectedRange.min ?? filter.min}
                        max={filter.max}
                        value={selectedRange.max ?? ''}
                        placeholder={filter.max !== undefined ? String(filter.max) : ''}
                        onChange={(event) => {
                          const raw = event.target.value
                          updateRange(filter.key, 'max', raw === '' ? undefined : Number(raw))
                        }}
                        className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 pr-12 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                      />
                      {filter.unit && (
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-400">
                          {filter.unit}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {(filter.min !== undefined || filter.max !== undefined) && (
                  <p className="text-xs text-gray-400">
                    {filter.min !== undefined ? filter.min.toLocaleString('fr-FR') : '—'}
                    {' — '}
                    {filter.max !== undefined ? filter.max.toLocaleString('fr-FR') : '—'}
                    {filter.unit ? ` ${filter.unit}` : ''}
                  </p>
                )}
              </div>
            )}

            {filter.type === 'checkbox' && (!filter.options || filter.options.length === 0) && (
              <p className="text-xs text-gray-400">Aucun choix disponible.</p>
            )}
          </FilterSection>
        )
      })}
    </>
  )

  return (
    <div className="w-full lg:w-72">
      <button
        type="button"
        onClick={() => setIsMobileOpen((previous) => !previous)}
        aria-expanded={isMobileOpen}
        aria-controls="mobile-category-filters"
        className="flex w-full items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-4 py-4 transition-colors duration-200 hover:bg-gray-50 lg:hidden"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-purple-600 shadow-sm">
            <SlidersHorizontal className="h-4.5 w-4.5" strokeWidth={2} />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-black">Filtrer par</p>
            <p className="mt-0.5 text-xs text-gray-500">Marques, prix et caractéristiques</p>
          </div>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-purple-200 bg-purple-50">
          <ChevronDown
            className={[
              'h-4 w-4 text-purple-600',
              'transition-transform duration-300',
              isMobileOpen ? 'rotate-180' : 'rotate-0',
            ].join(' ')}
          />
        </div>
      </button>

      <div
        id="mobile-category-filters"
        className={[
          'grid transition-[grid-template-rows]',
          'duration-300 ease-out lg:hidden',
          isMobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        ].join(' ')}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white">
            <div className="divide-y divide-gray-100">{filterContent}</div>
            <FilterActions onReset={handleReset} onApply={handleApply} />
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <div className="relative max-h-[calc(100vh-7rem)] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-purple-600 shadow-sm">
                  <SlidersHorizontal className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-black">Filtrer par</h3>
                  <p className="mt-0.5 text-xs text-gray-500">Affinez votre recherche</p>
                </div>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs font-medium text-purple-600 transition-colors hover:text-purple-800"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Réinitialiser
                </button>
              )}
            </div>
            <div className="divide-y divide-gray-100">{filterContent}</div>
            <FilterActions onReset={handleReset} onApply={handleApply} />
          </div>
        </div>
      </div>
    </div>
  )
}

interface FilterSectionProps {
  filterKey: string
  label: string
  icon: typeof Tag
  openSections: Record<string, boolean>
  toggleSection: (key: string) => void
  badge?: string | number
  children: ReactNode
}

const FilterSection = ({
  filterKey,
  label,
  icon: Icon,
  openSections,
  toggleSection,
  badge,
  children,
}: FilterSectionProps) => {
  const isOpen = openSections[filterKey] !== false

  return (
    <div>
      <button
        type="button"
        onClick={() => toggleSection(filterKey)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
      >
        <div className="flex items-center gap-2.5">
          <Icon className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-semibold text-black">{label}</span>
          {badge !== undefined && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-100 px-1.5 text-[10px] font-semibold text-purple-700">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={[
            'h-4 w-4 text-gray-400',
            'transition-transform duration-200',
            isOpen ? 'rotate-180' : 'rotate-0',
          ].join(' ')}
        />
      </button>

      <div
        className={[
          'grid transition-[grid-template-rows]',
          'duration-200',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        ].join(' ')}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-5 pb-5">{children}</div>
        </div>
      </div>
    </div>
  )
}

interface FilterActionsProps {
  onReset: () => void
  onApply: () => void
}

const FilterActions = ({ onReset, onApply }: FilterActionsProps) => {
  return (
    <div className="rounded-b-2xl border-t border-gray-100 bg-gray-50/50 p-4">
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <SecondaryButton
          onClick={onReset}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-medium text-black transition-all duration-200 hover:border-purple-300 hover:text-purple-600 sm:text-sm"
        >
          <RotateCcw className="h-4 w-4" />
          Réinitialiser
        </SecondaryButton>

        <PrimaryButton
          onClick={onApply}
          className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-[13px] font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg sm:text-sm"
        >
          <Check className="h-4 w-4" />
          Appliquer les filtres
        </PrimaryButton>
      </div>
    </div>
  )
}