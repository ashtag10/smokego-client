import {
  MapPin,
  Phone,
  User,
  Check,
  Pencil,
  Trash2,
  Star,
} from 'lucide-react'

import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'
import { GoldBadge } from '@/components/ui/Badge/GoldBadge'
import type { Address } from '@/lib/types/user'

interface AddressCardProps {
  address: Address
  onEdit?: (address: Address) => void
  onDelete?: (id: string) => void
  onSetDefault?: (id: string) => void
}

export const AddressCard = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) => {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-grey-100
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-[2px]
        hover:border-gold-main/30
        hover:shadow-[0_10px_30px_rgba(212,175,55,0.10)]
      "
    >
      {/* Accent doré */}
      <div
        className="
          absolute
          left-0
          top-0
          h-full
          w-[3px]
          bg-gradient-to-b
          from-[#C9A94E]
          via-[#D4AF37]
          to-[#B8963E]
          opacity-70
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            {/* Icône adresse */}
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-gold-light
                to-gold-light/40
                text-gold-main
                ring-1
                ring-gold-main/10
              "
            >
              <MapPin className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="truncate font-serif text-lg font-semibold text-black-main">
                  {address.name}
                </h4>

                {address.isDefault && (
                  <GoldBadge>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Par défaut
                    </span>
                  </GoldBadge>
                )}
              </div>

              <p className="mt-0.5 text-xs text-grey-400">
                Adresse de livraison
              </p>
            </div>
          </div>

          {/* Indicateur par défaut */}
          {address.isDefault && (
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gold-main
                text-white
                shadow-[0_4px_12px_rgba(212,175,55,0.25)]
              "
              title="Adresse par défaut"
            >
              <Check className="h-4 w-4" strokeWidth={2.5} />
            </div>
          )}
        </div>

        {/* Informations */}
        <div
          className="
            rounded-xl
            border
            border-grey-100
            bg-grey-50/50
            p-4
            transition-colors
            duration-300
            group-hover:border-gold-main/10
          "
        >
          <div className="space-y-3">
            {/* Destinataire */}
            <div className="flex items-start gap-3">
              <User className="mt-0.5 h-4 w-4 shrink-0 text-gold-main" />

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wider text-grey-400">
                  Destinataire
                </p>

                <p className="mt-0.5 text-sm font-medium text-black-main">
                  {address.recipientName}
                </p>
              </div>
            </div>

            {/* Téléphone */}
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-main" />

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wider text-grey-400">
                  Téléphone
                </p>

                <p className="mt-0.5 text-sm text-grey-700">
                  {address.phone}
                </p>
              </div>
            </div>

            {/* Adresse */}
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-main" />

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wider text-grey-400">
                  Adresse
                </p>

                <p className="mt-0.5 text-sm leading-relaxed text-grey-700">
                  {address.detailedAddress}
                </p>

                <p className="mt-0.5 text-sm font-medium text-black-main">
                  {address.district}, {address.city}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 border-t border-grey-100 pt-4">
          {!address.isDefault && onSetDefault && (
            <button
              type="button"
              onClick={() => onSetDefault(address.id)}
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-gold-main/40
                px-3.5
                py-2
                text-xs
                font-medium
                text-gold-dark
                transition-all
                duration-300
                hover:border-gold-main
                hover:bg-gold-main
                hover:text-white
                hover:shadow-[0_4px_15px_rgba(212,175,55,0.18)]
              "
            >
              <Star className="h-3.5 w-3.5" />
              Définir par défaut
            </button>
          )}

          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(address)}
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-grey-200
                bg-white
                px-3.5
                py-2
                text-xs
                font-medium
                text-grey-700
                transition-all
                duration-300
                hover:border-gold-main/40
                hover:bg-gold-light/30
                hover:text-gold-dark
              "
            >
              <Pencil className="h-3.5 w-3.5" />
              Modifier
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(address.id)}
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                px-3.5
                py-2
                text-xs
                font-medium
                text-red-500
                transition-all
                duration-300
                hover:bg-red-50
                hover:text-red-600
              "
            >
              <Trash2 className="h-3.5 w-3.5" />
              Supprimer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}