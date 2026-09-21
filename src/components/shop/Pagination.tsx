'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/helpers'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  if (totalPages <= 1) return null

  // Fenêtre de pages autour de la page active (max 5 numéros visibles)
  const pages: number[] = []
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, start + 4)
  for (let i = Math.max(1, end - 4); i <= end; i++) pages.push(i)

  return (
    <nav className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Page précédente"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-grey-200 text-grey-600 disabled:opacity-30 hover:border-[#D4AF37]/50"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages[0] > 1 && (
        <>
          <button
            onClick={() => onChange(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-sm text-grey-600 hover:bg-[#D4AF37]/10"
          >
            1
          </button>
          {pages[0] > 2 && <span className="text-grey-400">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors',
            p === page
              ? 'bg-[#D4AF37] font-semibold text-white'
              : 'text-grey-600 hover:bg-[#D4AF37]/10'
          )}
        >
          {p}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span className="text-grey-400">…</span>}
          <button
            onClick={() => onChange(totalPages)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-sm text-grey-600 hover:bg-[#D4AF37]/10"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Page suivante"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-grey-200 text-grey-600 disabled:opacity-30 hover:border-[#D4AF37]/50"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
