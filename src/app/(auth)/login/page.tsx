'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'

import { TextInput } from '@/components/ui/Input/TextInput'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/lib/stores/authStore'

const loginSchema = z.object({
  identifier: z.string().min(1, 'Veuillez entrer votre téléphone ou email'),
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth, isAuthenticated } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get('redirect') || '/'
      router.push(redirect)
    }
  }, [isAuthenticated, router, searchParams])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const isEmail = data.identifier.includes('@')
      const credentials = isEmail
        ? { email: data.identifier, password: data.password }
        : { phone: data.identifier, password: data.password }

      const response = await authApi.login(credentials)

      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data
        setAuth(user, accessToken, refreshToken)
        toast.success('Connexion réussie !')
        const redirect = searchParams.get('redirect') || '/'
        router.push(redirect)
      } else {
        toast.error(response.message || 'Erreur de connexion')
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
      {/* Logo rond à la place de "SG" */}
      <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-black">
        <Image
          src="/logo-smokego.png"
          alt="SmokeGo"
          width={56}
          height={56}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Titre */}
      <h2 className="mt-4 text-center text-[22px] font-bold text-black sm:text-[26px]">
        Connexion
      </h2>

      <p className="mt-2 text-center text-[13px] text-gray-500">
        Connectez-vous à votre compte SmokeGo
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <TextInput
            label="Téléphone ou Email"
            placeholder="+237 699 123 456 ou email@exemple.com"
            error={errors.identifier?.message}
            {...register('identifier')}
          />
        </div>

        <div>
          <TextInput
            label="Mot de passe"
            type="password"
            placeholder="Votre mot de passe"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="mt-1 text-right">
            <Link
              href="/forgot-password"
              className="text-[13px] text-purple-600 transition-colors hover:text-purple-800"
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </div>

        <PrimaryButton
          type="submit"
          isLoading={isLoading}
          fullWidth
          className="rounded-lg bg-black py-3 text-[13px] font-medium text-white transition-colors hover:bg-gray-800"
        >
          Se connecter
        </PrimaryButton>
      </form>

      <div className="mt-6 text-center">
        <p className="text-[13px] text-gray-500">
          Pas encore de compte ?{' '}
          <Link
            href="/register"
            className="font-medium text-purple-600 transition-colors hover:text-purple-800"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}