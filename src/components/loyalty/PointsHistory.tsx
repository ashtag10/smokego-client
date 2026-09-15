import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { formatDate } from '@/lib/utils/formatters'
import type { LoyaltyTransaction } from '@/lib/types/loyalty'

interface PointsHistoryProps {
  transactions: LoyaltyTransaction[]
}

export const PointsHistory = ({ transactions }: PointsHistoryProps) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <Paragraph muted>Pas encore de transactions</Paragraph>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-grey-100 p-6 shadow-sm">
      <Heading level="h5" className="mb-4">
        Historique des points
      </Heading>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center py-3 border-b border-grey-50 last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-black-main">
                {transaction.description}
              </p>
              <p className="text-xs text-grey-500">
                {formatDate(transaction.createdAt)}
              </p>
              {transaction.expiresAt && (
                <p className="text-xs text-grey-400">
                  Expire le {formatDate(transaction.expiresAt)}
                </p>
              )}
            </div>
            <span
              className={`font-medium ${
                transaction.type === 'EARN'
                  ? 'text-green-600'
                  : transaction.type === 'REDEEM'
                  ? 'text-red-600'
                  : 'text-grey-400'
              }`}
            >
              {transaction.type === 'EARN' ? '+' : ''}
              {transaction.points} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}