'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'

import { TextInput } from '@/components/ui/Input/TextInput'
import { PhoneInput } from '@/components/ui/Input/PhoneInput'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { authApi } from '@/lib/api/auth'

const resetPasswordSchema = z
  .object({
    phone: z.string().min(8, 'Numéro de téléphone invalide'),

    code: z.string().length(6, 'Le code doit contenir 6 chiffres'),

    newPassword: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        'Le mot de passe doit contenir au moins 1 lettre et 1 chiffre'
      ),

    confirmPassword: z
      .string()
      .min(8, 'Veuillez confirmer votre mot de passe'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const phoneParam = searchParams.get('phone') || ''

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      phone: phoneParam,
      code: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (phoneParam) {
      setValue('phone', phoneParam)
    }
  }, [phoneParam, setValue])

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true)

    try {
      const response = await authApi.resetPassword({
        phone: data.phone,
        code: data.code,
        newPassword: data.newPassword,
      })

      if (response.success) {
        setIsSuccess(true)

        toast.success('Mot de passe réinitialisé avec succès !')

        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        toast.error(
          response.message || 'Erreur lors de la réinitialisation'
        )
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }


  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div
          className="
            w-16
            h-16
            bg-[#D4AF37]/10
            border
            border-[#D4AF37]/40
            rounded-full
            flex
            items-center
            justify-center
            mx-auto
            mb-4
            shadow-[0_0_18px_rgba(212,175,55,0.12)]
          "
        >
          <svg
            className="w-8 h-8 text-[#E7C85A]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <Heading
          level="h3"
          className="
            text-[#E7C85A]
            drop-shadow-[0_0_8px_rgba(212,175,55,0.12)]
          "
        >
          Mot de passe réinitialisé !
        </Heading>

        <Paragraph className="mt-2 text-[#C8C0A9]">
          Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
        </Paragraph>

        <p className="text-sm text-[#A99A70] mt-4">
          Redirection vers la connexion...
        </p>
      </div>
    )
  }

  return (
    <div
      className="
        relative
        rounded-3xl
        border
        border-[#D4AF37]/35
        bg-[#17140D]/60
        shadow-[0_0_22px_rgba(212,175,55,0.06)]
      "
    >

      <div
        className="
          pointer-events-none
          absolute
          -top-16
          left-1/2
          h-32
          w-32
          -translate-x-1/2
          rounded-full
          bg-[#D4AF37]/[0.06]
          blur-3xl
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-3xl
          ring-1
          ring-inset
          ring-[#F5D76E]/[0.08]
        "
      />

      <div className="relative">


        <Heading
          level="h2"
          className="
            text-center
            text-[#E7C85A]
            drop-shadow-[0_0_9px_rgba(212,175,55,0.14)]
          "
        >
          Réinitialisation
        </Heading>

        <Paragraph
          muted
          className="
            text-center
            mt-2
            text-[#B8AD91]
          "
        >
          Entrez le code reçu et votre nouveau mot de passe
        </Paragraph>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-4"
        >


          <div
            className="
              rounded-xl
              transition-all
              duration-300
              focus-within:drop-shadow-[0_0_8px_rgba(212,175,55,0.10)]
            "
          >
            <PhoneInput
              label="Numéro de téléphone"
              placeholder="699123456"
              error={errors.phone?.message}
              {...register('phone')}
            />
          </div>

          <div
            className="
              rounded-xl
              transition-all
              duration-300
              focus-within:drop-shadow-[0_0_8px_rgba(212,175,55,0.10)]
            "
          >
            <TextInput
              label="Code OTP"
              placeholder="123456"
              maxLength={6}
              error={errors.code?.message}
              {...register('code')}
            />
          </div>


          <div
            className="
              rounded-xl
              transition-all
              duration-300
              focus-within:drop-shadow-[0_0_8px_rgba(212,175,55,0.10)]
            "
          >
            <TextInput
              label="Nouveau mot de passe"
              type="password"
              placeholder="8 caractères minimum"
              error={errors.newPassword?.message}
              {...register('newPassword')}
            />
          </div>

          <div
            className="
              rounded-xl
              transition-all
              duration-300
              focus-within:drop-shadow-[0_0_8px_rgba(212,175,55,0.10)]
            "
          >
            <TextInput
              label="Confirmer le mot de passe"
              type="password"
              placeholder="Confirmez votre nouveau mot de passe"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>


          <PrimaryButton
            type="submit"
            isLoading={isLoading}
            fullWidth
            className="
              border
              border-[#D4AF37]/55
              shadow-[0_0_12px_rgba(212,175,55,0.08)]
              transition-all
              duration-300
              hover:border-[#F5D76E]/75
              hover:shadow-[0_0_16px_rgba(212,175,55,0.16)]
            "
          >
            Réinitialiser
          </PrimaryButton>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="
              text-sm
              text-[#A99A70]
              transition-all
              duration-300
              hover:text-[#E7C85A]
              hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.18)]
            "
          >
            Retour à la connexion
          </Link>
        </div>

      </div>
    </div>
  )
}