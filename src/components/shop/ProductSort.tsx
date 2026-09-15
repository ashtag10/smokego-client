'use client'

import { SelectInput } from '@/components/ui/Input/SelectInput'
import { SlidersHorizontal } from 'lucide-react'

interface ProductSortProps {
  value: string
  onChange: (value: string) => void
}

const sortOptions = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'popularity', label: 'Plus populaires' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
]

export const ProductSort = ({ value, onChange }: ProductSortProps) => {
  return (
    <div className="flex items-center justify-between gap-3">
      {/* Label */}
      <div className="flex items-center gap-2 shrink-0">
        <SlidersHorizontal className="w-4 h-4 text-gold-main" />

        <span className="text-sm font-medium text-grey-600 hidden sm:inline">
          Trier par
        </span>
      </div>

      {/* Select */}
      <div className="relative w-full sm:w-48">
        <SelectInput
          options={sortOptions}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            py-2.5
            px-4
            bg-white
            border-grey-200
            rounded-full
            text-sm
            font-medium
            text-black-main
            hover:border-gold-main/50
            focus:border-gold-main
            transition-all
            duration-200
          "
        />
      </div>
    </div>
  )
}