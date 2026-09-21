'use client'

import { useRouter } from 'next/navigation'
import { useLoyalty } from '@/lib/hooks/useLoyalty'
import { RedeemPointsForm } from '@/components/loyalty/RedeemPointsForm'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Gift, Coins, ShieldCheck, Sparkles } from 'lucide-react'

export default function RedeemPointsPage() {
  const router = useRouter()
  const { points, redeemPoints, isLoading } = useLoyalty()

  const handleSubmit = async (pointsToRedeem: number) => {
    try {
      const result = await redeemPoints(pointsToRedeem)
      toast.success(
        `Conversion réussie ! ${pointsToRedeem} points = ${result.discount} FCFA`
      )
      router.push('/loyalty')
    } catch (error) {
      console.error('Failed to redeem points:', error)
      toast.error('Erreur lors de la conversion')
    }
  }

  /* ============================================================
     LOADING
  ============================================================ */
  if (!points) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="h-4 w-24 rounded bg-gray-100 animate-pulse" />
          <div className="mt-6 h-12 w-72 rounded-lg bg-gray-100 animate-pulse" />
          <div className="mt-3 h-5 w-full max-w-xl rounded bg-gray-100 animate-pulse" />
          <div className="mx-auto mt-8 max-w-2xl h-96 rounded-xl bg-gray-100 animate-pulse" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* Retour */}
        <button
          type="button"
          onClick={() => router.push('/loyalty')}
          className="group inline-flex items-center gap-2 text-[13px] font-medium text-gray-500 transition-colors hover:text-purple-600"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour à ma fidélité
        </button>

        {/* Titre */}
        <h1 className="mt-6 mb-3 text-[28px] font-bold text-black sm:text-[32px]">
          Convertir mes points
        </h1>

        <p className="mb-8 max-w-xl text-[13px] text-gray-500">
          Utilisez vos points pour bénéficier d'une réduction sur votre prochaine commande.
        </p>

        {/* =========================================================
            INFOS POINTS
        ========================================================= */}
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">

          {/* Points disponibles */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Coins className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] text-gray-500">Disponibles</p>
                <p className="text-[14px] font-bold text-black">
                  {points.available} pts
                </p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Gift className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] text-gray-500">Total gagné</p>
                <p className="text-[14px] font-bold text-black">
                  {points.total} pts
                </p>
              </div>
            </div>
          </div>

          {/* Réduction max */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] text-gray-500">Réduction max.</p>
                <p className="text-[14px] font-bold text-black">20 %</p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            FORMULAIRE
        ========================================================= */}
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

            {/* Header du formulaire */}
            <div className="border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Gift className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-[16px] font-semibold text-black">
                    Convertir mes points
                  </h2>
                  <p className="mt-0.5 text-[12px] text-gray-500">
                    Choisissez le nombre de points à utiliser
                  </p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="p-5 sm:p-6">
              <RedeemPointsForm
                availablePoints={points.available}
                maxDiscountPercent={20}
                onSubmit={handleSubmit}
                onCancel={() => router.push('/loyalty')}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Info */}
          <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-black">
                  Comment ça fonctionne ?
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-gray-500">
                  Sélectionnez le nombre de points que vous souhaitez convertir. La réduction obtenue sera automatiquement appliquée à votre prochaine commande selon les conditions du programme de fidélité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}