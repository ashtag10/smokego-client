'use client'

import { useState } from 'react'
import { TextInput } from '@/components/ui/Input/TextInput'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { formatPrice } from '@/lib/utils/formatters'

interface RedeemPointsFormProps {
  availablePoints: number
  maxDiscountPercent: number
  onSubmit: (points: number) => Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

export const RedeemPointsForm = ({
  availablePoints,
  maxDiscountPercent,
  onSubmit,
  onCancel,
  isLoading = false,
}: RedeemPointsFormProps) => {
  const [points, setPoints] = useState<number>(0)
  const maxPoints = Math.min(
    availablePoints,
    Math.floor(100 / maxDiscountPercent)
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (points > 0 && points <= availablePoints) {
      onSubmit(points)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Heading level="h5" className="mb-2">
          Convertir mes points
        </Heading>
        <Paragraph className="text-grey-600">
          Vous avez {availablePoints} points disponibles.
          <br />
          <span className="text-sm">
            Max {maxDiscountPercent}% de réduction par commande.
          </span>
        </Paragraph>
      </div>

      <div>
        <TextInput
          type="number"
          label="Nombre de points à convertir"
          placeholder="100"
          value={points || ''}
          onChange={(e) => setPoints(Number(e.target.value))}
          min={0}
          max={availablePoints}
          required
        />
        <div className="mt-1 flex justify-between text-xs text-grey-400">
          <span>Min: 1 point</span>
          <span>Max: {Math.min(availablePoints, maxPoints)} points</span>
        </div>
        <p className="text-sm text-gold-main mt-2">
          {points > 0
            ? `Réduction estimée: ${formatPrice(points / 100)}`
            : '100 points = 100 FCFA'}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 pt-4">
        <PrimaryButton
          type="submit"
          isLoading={isLoading}
          disabled={points <= 0 || points > availablePoints}
        >
          Convertir
        </PrimaryButton>
        {onCancel && (
          <SecondaryButton type="button" onClick={onCancel}>
            Annuler
          </SecondaryButton>
        )}
      </div>
    </form>
  )
}