'use client'

import { Armchair, Check, Users } from 'lucide-react'
import { cn } from '@/lib/utils/helpers'
import type { Table } from '@/lib/types/reservation'

interface TableSelectorProps {
  tables: Table[]
  selectedId?: string
  onSelect: (tableId: string) => void
  disabled?: boolean
}

export const TableSelector = ({
  tables,
  selectedId,
  onSelect,
  disabled = false,
}: TableSelectorProps) => {
  if (tables.length === 0) {
    return (
      <div className="rounded-xl border border-grey-100 bg-grey-50 px-5 py-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-grey-100">
          <Armchair className="h-5 w-5 text-grey-400" />
        </div>

        <p className="mt-3 text-sm font-medium text-black-main">
          Aucune table disponible
        </p>

        <p className="mt-1 text-xs text-grey-500">
          Aucune table n'est actuellement disponible pour cette réservation.
        </p>
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
      role="radiogroup"
      aria-label="Sélection de la table"
    >
      {tables.map((table) => {
        const isSelected = selectedId === table.id

        return (
          <button
            key={table.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`Sélectionner ${table.name}, ${table.capacity} personnes`}
            disabled={disabled}
            onClick={() => onSelect(table.id)}
            className={cn(
              'group relative overflow-hidden rounded-2xl border-2 p-4 text-left',
              'transition-all duration-300 ease-out',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-main focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',

              isSelected
                ? [
                    'border-gold-main',
                    'bg-gradient-to-br from-gold-light/40 via-white to-white',
                    'shadow-lg shadow-gold-main/10',
                  ]
                : [
                    'border-grey-100',
                    'bg-white',
                    'hover:-translate-y-0.5',
                    'hover:border-gold-main/50',
                    'hover:shadow-md',
                  ]
            )}
          >
            {/* Indicateur de sélection */}
            <div
              className={cn(
                'absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full',
                'transition-all duration-300',
                isSelected
                  ? 'bg-gold-main text-white scale-100 opacity-100'
                  : 'scale-90 bg-grey-100 text-transparent opacity-0 group-hover:opacity-50'
              )}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            </div>

            {/* Icône */}
            <div
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-xl',
                'transition-all duration-300',
                isSelected
                  ? 'bg-gold-main text-white'
                  : 'bg-grey-50 text-grey-500 group-hover:bg-gold-light group-hover:text-gold-main'
              )}
            >
              <Armchair className="h-5 w-5" />
            </div>

            {/* Informations */}
            <div className="mt-4 pr-7">
              <p
                className={cn(
                  'font-semibold transition-colors',
                  isSelected
                    ? 'text-gold-dark'
                    : 'text-black-main'
                )}
              >
                {table.name}
              </p>

              <div className="mt-1 flex items-center gap-1.5 text-sm text-grey-500">
                <Users className="h-3.5 w-3.5" />

                <span>
                  {table.capacity} personne
                  {table.capacity > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* État sélectionné */}
            {isSelected && (
              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-gold-main">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-main" />
                Table sélectionnée
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}