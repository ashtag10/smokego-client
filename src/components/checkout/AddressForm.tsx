'use client'

import { useState } from 'react'
import { Check, MapPin } from 'lucide-react'

import { TextInput } from '@/components/ui/Input/TextInput'
import { PhoneInput } from '@/components/ui/Input/PhoneInput'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'
import type { Address } from '@/lib/types/user'

interface AddressFormProps {
  initialData?: Partial<Address>
  onSubmit: (data: Omit<Address, 'id' | 'userId' | 'createdAt'>) => void
  onCancel?: () => void
  isLoading?: boolean
}

export const AddressForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: AddressFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    recipientName: initialData?.recipientName || '',
    phone: initialData?.phone || '',
    city: initialData?.city || '',
    district: initialData?.district || '',
    detailedAddress: initialData?.detailedAddress || '',
    isDefault: initialData?.isDefault || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-6
        rounded-2xl
        border
        border-[#D4AF37]/15
        bg-white
        p-5
        shadow-[0_8px_30px_rgba(0,0,0,0.04)]
        sm:p-6
      "
    >
      {/* =========================
          HEADER
      ========================== */}
      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-[#D4AF37]/10
          pb-5
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-[#FFF9E8]
            to-[#F5E8BD]
          "
        >
          <MapPin
            className="h-5 w-5 text-[#B8860B]"
            strokeWidth={1.8}
          />
        </div>

        <div>
          <h3 className="text-base font-semibold text-black-main">
            {initialData ? 'Modifier votre adresse' : 'Nouvelle adresse'}
          </h3>

          <p className="mt-0.5 text-xs text-grey-500">
            Renseignez les informations de livraison
          </p>
        </div>
      </div>

      {/* =========================
          INFORMATIONS
      ========================== */}
      <div className="space-y-4">

        <TextInput
          label="Nom de l'adresse"
          placeholder="Ex : Domicile, Bureau"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          required
        />

        <TextInput
          label="Nom du destinataire"
          placeholder="Nom complet"
          value={formData.recipientName}
          onChange={(e) =>
            setFormData({
              ...formData,
              recipientName: e.target.value,
            })
          }
          required
        />

        <PhoneInput
          label="Téléphone"
          placeholder="699123456"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value,
            })
          }
          required
        />

        {/* Ville / Quartier */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextInput
            label="Ville"
            placeholder="Douala"
            value={formData.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                city: e.target.value,
              })
            }
            required
          />

          <TextInput
            label="Quartier"
            placeholder="Bonapriso"
            value={formData.district}
            onChange={(e) =>
              setFormData({
                ...formData,
                district: e.target.value,
              })
            }
            required
          />
        </div>

        <TextInput
          label="Adresse détaillée"
          placeholder="Rue, numéro, point de référence..."
          value={formData.detailedAddress}
          onChange={(e) =>
            setFormData({
              ...formData,
              detailedAddress: e.target.value,
            })
          }
          required
        />
      </div>

      {/* =========================
          DEFAULT ADDRESS
      ========================== */}
      <label
        htmlFor="isDefault"
        className="
          group
          flex
          cursor-pointer
          items-center
          gap-3
          rounded-xl
          border
          border-[#D4AF37]/10
          bg-[#FFFCF3]
          p-3.5
          transition-all
          duration-200
          hover:border-[#D4AF37]/30
          hover:bg-[#FFF9E8]
        "
      >
        <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            id="isDefault"
            checked={formData.isDefault}
            onChange={(e) =>
              setFormData({
                ...formData,
                isDefault: e.target.checked,
              })
            }
            className="
              peer
              absolute
              inset-0
              h-5
              w-5
              cursor-pointer
              opacity-0
            "
          />

          <div
            className="
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-md
              border
              border-[#D4AF37]/40
              bg-white
              transition-all
              duration-200
              peer-checked:border-[#D4AF37]
              peer-checked:bg-gradient-to-br
              peer-checked:from-[#C89B3C]
              peer-checked:to-[#B8860B]
            "
          >
            <Check
              className="
                h-3.5
                w-3.5
                scale-0
                text-white
                opacity-0
                transition-all
                duration-200
                peer-checked:scale-100
                peer-checked:opacity-100
              "
              strokeWidth={3}
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-black-main">
            Adresse par défaut
          </p>

          <p className="mt-0.5 text-xs text-grey-500">
            Utiliser automatiquement cette adresse pour vos commandes
          </p>
        </div>
      </label>

      {/* =========================
          ACTIONS
      ========================== */}
      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-[#D4AF37]/10
          pt-5
          sm:flex-row
        "
      >
        {onCancel && (
          <SecondaryButton
            type="button"
            onClick={onCancel}
            className="
              w-full
              py-3
              transition-all
              duration-300
              hover:border-[#D4AF37]/40
              hover:bg-[#FFF9E8]
              hover:text-[#B8860B]
              sm:w-auto
            "
          >
            Annuler
          </SecondaryButton>
        )}

        <PrimaryButton
          type="submit"
          isLoading={isLoading}
          className="
            w-full
            py-3
            transition-all
            duration-300

            hover:scale-[1.01]

            hover:bg-gradient-to-r
            hover:from-[#C9A94E]
            hover:via-[#D4AF37]
            hover:to-[#B8963E]

            hover:text-white

            hover:shadow-[0_8px_25px_rgba(212,175,55,0.28)]

            active:scale-[0.99]

            sm:w-auto
          "
        >
          {initialData
            ? "Modifier l'adresse"
            : "Ajouter l'adresse"}
        </PrimaryButton>
      </div>
    </form>
  )
}