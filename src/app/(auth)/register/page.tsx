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
import { authApi } from '@/lib/api/auth'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    phone: z.string().min(8, 'Numéro de téléphone invalide'),
    email: z.string().email('Email invalide').optional().or(z.literal('')),
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        'Le mot de passe doit contenir au moins 1 lettre et 1 chiffre'
      ),
    confirmPassword: z.string().min(8, 'Veuillez confirmer votre mot de passe'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      const response = await authApi.register({
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        password: data.password,
      })

      if (response.success) {
        toast.success('Inscription réussie ! Vérifiez votre téléphone.')
        router.push(`/verify-otp?phone=${encodeURIComponent(data.phone)}`)
      } else {
        toast.error(response.message || "Erreur lors de l'inscription")
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">

      {/* Titre */}
      <h2 className="text-center text-[22px] font-bold text-black sm:text-[26px]">
        Inscription
      </h2>

      <p className="mt-2 text-center text-[13px] text-gray-500">
        Créez votre compte SmokeGo
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">

        {/* Nom complet */}
        <div>
          <TextInput
            label="Nom complet"
            placeholder="Jean Dupont"
            error={errors.name?.message}
            {...register('name')}
          />
        </div>

        {/* Téléphone */}
        <div>
          <PhoneInput
            label="Téléphone"
            placeholder="699123456"
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>

        {/* Email */}
        <div>
          <TextInput
            label="Email (optionnel)"
            type="email"
            placeholder="jean@email.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        {/* Mot de passe */}
        <div>
          <TextInput
            label="Mot de passe"
            type="password"
            placeholder="8 caractères minimum"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        {/* Confirmer mot de passe */}
        <div>
          <TextInput
            label="Confirmer le mot de passe"
            type="password"
            placeholder="Confirmez votre mot de passe"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>

        {/* Bouton */}
        <PrimaryButton
          type="submit"
          isLoading={isLoading}
          fullWidth
          className="rounded-lg bg-black py-3 text-[13px] font-medium text-white transition-colors hover:bg-gray-800"
        >
          S'inscrire
        </PrimaryButton>
      </form>

      <div className="mt-6 text-center">
        <p className="text-[13px] text-gray-500">
          Déjà un compte ?{' '}
          <Link
            href="/login"
            className="font-medium text-purple-600 transition-colors hover:text-purple-800"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}