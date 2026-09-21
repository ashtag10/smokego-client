'use client'

import { useRouter } from 'next/navigation'
import { Crown, Coins, ArrowRight, History, Gift } from 'lucide-react'

import { useLoyalty } from '@/lib/hooks/useLoyalty'
import { VIPStatusCard } from '@/components/loyalty/VIPStatusCard'
import { PointsHistory } from '@/components/loyalty/PointsHistory'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'

export default function LoyaltyPage() {
  const router = useRouter()
  const { points, history, vipStatus, isLoading } = useLoyalty()

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-8 w-48 rounded bg-gray-100 animate-pulse" />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="h-72 animate-pulse rounded-xl bg-gray-100 lg:col-span-2" />
            <div className="h-72 animate-pulse rounded-xl bg-gray-100" />
          </div>
          <div className="mt-8 h-80 animate-pulse rounded-xl bg-gray-100" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">

        {/* Fil d'Ariane */}
        <nav className="mb-6 flex items-center gap-2 text-[13px] text-gray-500">
          <a href="/" className="hover:text-black hover:underline">
            Accueil
          </a>
        </nav>

        {/* Titre */}
        <h1 className="mb-8 text-[28px] font-bold text-black sm:text-[32px]">
          Ma fidélité
        </h1>

        {/* =========================================================
            STATUT VIP + POINTS
        ========================================================= */}
        <section className="mb-10">
          <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Crown className="h-4 w-4" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-[14px] font-semibold text-black">
                Vos privilèges
              </h2>
              <p className="mt-0.5 text-[12px] text-gray-500">
                Votre statut et vos avantages
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* VIP */}
            {vipStatus && (
              <div className="lg:col-span-2">
                <VIPStatusCard
                  status={vipStatus}
                  onRedeem={() => router.push('/loyalty/redeem')}
                />
              </div>
            )}

            {/* Points */}
            {points && (
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
                      Solde actuel
                    </p>
                    <h3 className="mt-1 text-[16px] font-semibold text-black">
                      Mes points
                    </h3>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <Coins className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-[32px] font-bold text-black">
                    {points.available}
                  </p>
                  <p className="mt-1 text-[12px] text-gray-500">
                    {points.total} points cumulés
                  </p>
                </div>

                {points.available > 0 && (
                  <PrimaryButton
                    onClick={() => router.push('/loyalty/redeem')}
                    className="mt-5 w-full rounded-md bg-black py-2.5 text-[13px] font-medium text-white hover:bg-gray-800"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Utiliser mes points
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </PrimaryButton>
                )}
              </div>
            )}
          </div>
        </section>

        {/* =========================================================
            STATISTIQUES
        ========================================================= */}
        {points && (
          <section className="mb-10">
            <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-gray-200 bg-white sm:grid-cols-3">
              <div className="relative p-5 sm:border-r sm:border-gray-100">
                <p className="text-[11px] uppercase tracking-wide text-gray-500">
                  Disponibles
                </p>
                <p className="mt-2 text-[22px] font-bold text-black">
                  {points.available}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                  <span className="text-[11px] text-gray-500">
                    Prêts à être utilisés
                  </span>
                </div>
              </div>

              <div className="p-5 sm:border-r sm:border-gray-100">
                <p className="text-[11px] uppercase tracking-wide text-gray-500">
                  Utilisés
                </p>
                <p className="mt-2 text-[22px] font-bold text-black">
                  {points.used}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                  <span className="text-[11px] text-gray-500">
                    Points convertis
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-[11px] uppercase tracking-wide text-gray-500">
                  Expirés
                </p>
                <p className="mt-2 text-[22px] font-bold text-gray-400">
                  {points.expired}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                  <span className="text-[11px] text-gray-500">
                    Points expirés
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            HISTORIQUE
        ========================================================= */}
        <section>
          <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-purple-600">
              <History className="h-4 w-4" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-[14px] font-semibold text-black">
                Historique de fidélité
              </h2>
              <p className="mt-0.5 text-[12px] text-gray-500">
                Retrouvez toutes vos transactions de points
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <PointsHistory transactions={history} />
          </div>
        </section>

        {/* =========================================================
            CALL TO ACTION
        ========================================================= */}
        {points && points.available > 0 && (
          <section className="mt-10 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Gift className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-black">
                    Vos points vous attendent
                  </h3>
                  <p className="mt-1 max-w-xl text-[13px] text-gray-500">
                    Transformez vos points en avantages exclusifs et profitez pleinement de votre expérience.
                  </p>
                </div>
              </div>

              <PrimaryButton
                onClick={() => router.push('/loyalty/redeem')}
                className="shrink-0 rounded-md bg-black px-5 py-2.5 text-[13px] font-medium text-white hover:bg-gray-800"
              >
                Découvrir mes récompenses
              </PrimaryButton>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}