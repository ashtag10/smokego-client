'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'

import { TextInput } from '@/components/ui/Input/TextInput'
import { PhoneInput } from '@/components/ui/Input/PhoneInput'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { authApi } from '@/lib/api/auth'

const forgotPasswordSchema = z.object({
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    try {
      const response = await authApi.forgotPassword(data.phone)

      if (response.success) {
        setIsSent(true)
        toast.success('Un code OTP a été envoyé par SMS')
        // Rediriger vers la page de réinitialisation après 2 secondes
        setTimeout(() => {
          router.push(`/reset-password?phone=${encodeURIComponent(data.phone)}`)
        }, 2000)
      } else {
        toast.error(response.message || 'Erreur lors de l\'envoi du code')
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSent) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <Heading level="h3">Code envoyé !</Heading>
        <Paragraph className="mt-2">
          Un code de réinitialisation a été envoyé par SMS.
        </Paragraph>
        <p className="text-sm text-grey-500 mt-4">
          Redirection vers la réinitialisation...
        </p>
      </div>
    )
  }

  return (
    <div>
      <Heading level="h2" className="text-center">
        Mot de passe oublié
      </Heading>
      <Paragraph muted className="text-center mt-2">
        Entrez votre numéro de téléphone pour recevoir un code de réinitialisation
      </Paragraph>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <PhoneInput
          label="Numéro de téléphone"
          placeholder="699123456"
          error={errors.phone?.message}
          {...register('phone')}
        />

        <PrimaryButton type="submit" isLoading={isLoading} fullWidth>
          Envoyer le code
        </PrimaryButton>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm text-grey-500 hover:text-gold-main transition"
        >
          Retour à la connexion
        </Link>
      </div>
    </div>
  )
}