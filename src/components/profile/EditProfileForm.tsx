'use client'

import { useState } from 'react'
import { TextInput } from '@/components/ui/Input/TextInput'
import { PhoneInput } from '@/components/ui/Input/PhoneInput'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'
import type { User, UpdateProfileData } from '@/lib/types/user'

interface EditProfileFormProps {
  user: User
  onSubmit: (data: UpdateProfileData) => Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

export const EditProfileForm = ({
  user,
  onSubmit,
  onCancel,
  isLoading = false,
}: EditProfileFormProps) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Nom complet */}
      <TextInput
        label="Nom complet"
        placeholder="Votre nom"
        value={formData.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
        required
      />

      {/* Email */}
      <TextInput
        label="Email"
        type="email"
        placeholder="votre@email.com"
        value={formData.email}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value,
          })
        }
      />

      {/* Téléphone */}
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

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-grey-100">
        <PrimaryButton
          type="submit"
          isLoading={isLoading}
          className="
            text-base
            px-6
            py-3
            transition-all
            duration-300
            hover:bg-gradient-to-r
            hover:from-[#C9A94E]
            hover:via-[#D4AF37]
            hover:to-[#B8963E]
            hover:text-white
            hover:shadow-[0_8px_25px_rgba(212,175,55,0.28)]
            hover:scale-[1.02]
          "
        >
          Enregistrer
        </PrimaryButton>

        {onCancel && (
          <SecondaryButton
            type="button"
            onClick={onCancel}
            className="
              text-base
              px-6
              py-3
              transition-all
              duration-300
              hover:border-gold-main
              hover:text-gold-dark
              hover:bg-gold-light/30
            "
          >
            Annuler
          </SecondaryButton>
        )}
      </div>
    </form>
  )
}