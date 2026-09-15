import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { GoldBadge } from '@/components/ui/Badge/GoldBadge'
import { calculateProgress } from '@/lib/utils/helpers'
import type { VIPStatus } from '@/lib/types/loyalty'

interface VIPStatusCardProps {
  status: VIPStatus
  onRedeem?: () => void
}

export const VIPStatusCard = ({ status, onRedeem }: VIPStatusCardProps) => {
  const progress = calculateProgress(
    status.amountSpentLast90Days,
    status.vipThreshold
  )

  if (status.isVip) {
    return (
      <div className="bg-gradient-to-r from-gold-main to-gold-dark rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">👑</span>
              <Heading level="h3" className=" text-black">
                Statut VIP
              </Heading>
            </div>
            <Paragraph className=" text-black mt-2">
              Vous bénéficiez des avantages exclusifs réservés aux membres VIP.
            </Paragraph>
            {status.vipSince && (
              <p className="text-sm  text-black mt-2">
                VIP depuis le {new Date(status.vipSince).toLocaleDateString('fr-FR')}
              </p>
            )}
          </div>
          <GoldBadge className="bg-white/20  text-black border-white/30">
            Actif
          </GoldBadge>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm  text-black">Avantages VIP :</p>
          <ul className="mt-2 space-y-1 text-sm text-black">
            <li>✨ Accès prioritaire aux réservations</li>
            <li>✨ Remise automatique de 10%</li>
            <li>✨ Badge VIP sur votre profil</li>
            <li>✨ Accès aux créneaux exclusifs</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-grey-100 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">⭐</span>
        <Heading level="h4">Devenez VIP</Heading>
      </div>

      <Paragraph className="text-grey-600">
        Dépensez {status.vipThreshold.toLocaleString()} FCFA en 90 jours
        pour obtenir le statut VIP.
      </Paragraph>

      <div className="mt-4">
        <div className="flex justify-between text-sm">
          <span className="text-grey-600">
            {status.amountSpentLast90Days.toLocaleString()} FCFA
          </span>
          <span className="text-gold-main font-medium">
            {status.vipThreshold.toLocaleString()} FCFA
          </span>
        </div>
        <div className="relative w-full h-2 bg-grey-200 rounded-full mt-1 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-main to-gold-dark rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-sm text-grey-500 mt-1">
          {status.remainingToVip > 0
            ? `Encore ${status.remainingToVip.toLocaleString()} FCFA à dépenser`
            : 'Félicitations ! Vous êtes éligible au statut VIP'}
        </p>
      </div>

      {onRedeem && status.remainingToVip <= 0 && (
        <PrimaryButton onClick={onRedeem} className="mt-4">
          Devenir VIP
        </PrimaryButton>
      )}
    </div>
  )
}