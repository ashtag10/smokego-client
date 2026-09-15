'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'

import { TextInput } from '@/components/ui/Input/TextInput'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/lib/stores/authStore'

// Schéma de validation
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

  //  Rediriger si déjà connecté
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

        //  setAuth stocke maintenant dans les cookies ET localStorage
        setAuth(user, accessToken, refreshToken)

        toast.success('Connexion réussie !')

        //  Rediriger vers la page demandée ou l'accueil
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
    <div>
      <Heading
        level="h2"
        className="
          text-center
          text-[#F5E7B2]
          drop-shadow-[0_0_10px_rgba(212,175,55,0.10)]
        "
      >
        Connexion
      </Heading>

      <Paragraph
        muted
        className="
          mt-2
          text-center
          text-[#CFC6A8]
        "
      >
        Connectez-vous à votre compte SmokeGo
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
          <TextInput
            label="Téléphone ou Email"
            placeholder="+237 699 123 456 ou email@exemple.com"
            error={errors.identifier?.message}
            {...register('identifier')}
          />
        </div>

        <div>
          <div
            className="
              rounded-xl
              transition-all
              duration-300
              focus-within:drop-shadow-[0_0_8px_rgba(212,175,55,0.10)]
            "
          >
            <TextInput
              label="Mot de passe"
              type="password"
              placeholder="Votre mot de passe"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          <div className="mt-1 text-right">
            <Link
              href="/forgot-password"
              className="
                text-sm
                text-[#D4AF37]
                transition
                duration-300
                hover:text-[#F5D76E]
                hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.25)]
              "
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </div>

        <PrimaryButton
          type="submit"
          isLoading={isLoading}
          fullWidth
          className="
            border
            border-[#D4AF37]/60
            shadow-[0_0_12px_rgba(212,175,55,0.08)]
            transition-all
            duration-300
            hover:border-[#F5D76E]/80
            hover:shadow-[0_0_16px_rgba(212,175,55,0.18)]
          "
        >
          Se connecter
        </PrimaryButton>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#AFA78F]">
          Pas encore de compte ?{' '}
          <Link
            href="/register"
            className="
              font-medium
              text-[#D4AF37]
              transition
              duration-300
              hover:text-[#F5D76E]
              hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.25)]
            "
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}