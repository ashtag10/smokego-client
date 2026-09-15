'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Edit3, Sparkles, UserRound } from 'lucide-react'

import { useAuthStore } from '@/lib/stores/authStore'
import { EditProfileForm } from '@/components/profile/EditProfileForm'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { usersApi } from '@/lib/api/users'
import { toast } from 'react-hot-toast'

export default function EditProfilePage() {
  const router = useRouter()
  const { user, setUser } = useAuthStore()

  const handleSubmit = async (data: any) => {
    try {
      const response = await usersApi.updateProfile(data)

      if (response.success && response.data) {
        setUser(response.data.user)

        toast.success('Profil mis à jour')

        router.push('/profile')
      } else {
        toast.error(
          response.message || 'Erreur lors de la mise à jour'
        )
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
      toast.error('Une erreur est survenue')
    }
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <div className="mx-auto flex min-h-[60vh] w-full max-w-[1600px] items-center justify-center px-4 py-12">
          <div
            className="
              w-full max-w-md
              rounded-2xl
              border border-grey-100
              bg-white
              p-8
              text-center
              shadow-[0_10px_40px_rgba(0,0,0,0.05)]
            "
          >
            <div
              className="
                mx-auto
                flex h-16 w-16
                items-center justify-center
                rounded-2xl
                bg-gold-main/10
                text-gold-main
              "
            >
              <UserRound className="h-7 w-7" />
            </div>

            <h2 className="mt-5 font-serif text-2xl font-semibold text-black-main">
              Connexion requise
            </h2>

            <Paragraph muted className="mt-2">
              Veuillez vous connecter pour modifier votre profil.
            </Paragraph>

            <button
              type="button"
              onClick={() => router.push('/login')}
              className="
                mt-6
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-gold-main
                px-6
                py-3
                text-sm
                font-semibold
                text-black-main
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_10px_25px_rgba(245,166,35,0.25)]
              "
            >
              Se connecter
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAF9F7]">
      <div
        className="
          mx-auto
          w-full
          max-w-[1100px]
          px-3
          py-6
          sm:px-5
          sm:py-8
          md:py-10
          lg:px-6
          lg:py-12
        "
      >
        {/* =====================================================
            HERO
        ====================================================== */}

        <section
          className="
            relative
            mb-6
            overflow-hidden
            rounded-2xl
            bg-black-main
            px-5
            py-7
            sm:px-7
            sm:py-8
            md:mb-8
            md:rounded-3xl
            md:px-10
            md:py-10
          "
        >
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              bg-gold-main/10
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-32
              -left-24
              h-72
              w-72
              rounded-full
              bg-gold-main/5
              blur-3xl
            "
          />

          <div className="relative z-10">
            {/* Back button */}
            <button
              type="button"
              onClick={() => router.push('/profile')}
              className="
                mb-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
                px-3.5
                py-2
                text-xs
                font-medium
                text-white/65
                transition-all
                duration-300
                hover:border-gold-main/30
                hover:bg-gold-main/10
                hover:text-gold-main
              "
            >
              <ArrowLeft className="h-3.5 w-3.5" />

              Retour au profil
            </button>

            {/* Badge */}
            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-gold-main
                px-4
                py-2
                text-black-main
                shadow-[0_4px_24px_rgba(245,166,35,0.18)]
              "
            >
              <Sparkles className="h-3.5 w-3.5" />

              <span
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  sm:text-xs
                "
              >
                SmokeGo
              </span>
            </div>

            {/* Category */}
            <p
              className="
                mb-2
                flex
                items-center
                gap-2
                text-sm
                font-medium
                tracking-wide
                text-gold-main
                sm:text-base
              "
            >
              <Edit3 className="h-4 w-4" />

              Mon profil
            </p>

            {/* Title */}
            <h1
              className="
                max-w-3xl
                font-serif
                text-3xl
                font-semibold
                leading-[1.05]
                tracking-tight
                text-white
                sm:text-4xl
                md:text-5xl
              "
            >
              Modifier vos
              <span className="mt-1 block text-gold-main">
                informations personnelles
              </span>
            </h1>

            <Paragraph
              className="
                mt-5
                max-w-xl
                text-sm
                leading-relaxed
                text-white/60
                md:text-base
              "
            >
              Gardez vos informations à jour pour profiter pleinement
              de votre expérience SmokeGo.
            </Paragraph>
          </div>

          {/* Gold line */}
          <div
            className="
              absolute
              bottom-0
              left-5
              right-5
              sm:left-7
              sm:right-7
              md:left-10
              md:right-10
            "
          >
            <div
              className="
                h-px
                bg-gradient-to-r
                from-transparent
                via-gold-main/40
                to-transparent
              "
            />
          </div>
        </section>

        {/* =====================================================
            FORM HEADER
        ====================================================== */}

        <div className="mb-5 flex items-center gap-3 px-1 sm:mb-6">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-gold-main/15
              bg-white
              text-gold-main
              shadow-sm
            "
          >
            <UserRound className="h-4.5 w-4.5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-black-main">
              Informations du compte
            </p>

            <p className="mt-0.5 text-xs text-grey-500">
              Modifiez les informations que vous souhaitez mettre à jour.
            </p>
          </div>
        </div>

        {/* =====================================================
            FORM CARD
        ====================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-grey-100
            bg-white
            shadow-[0_10px_40px_rgba(0,0,0,0.05)]
            md:rounded-3xl
          "
        >
          {/* Top accent */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold-main to-transparent" />

          <div
            className="
              p-4
              sm:p-6
              md:p-8
              lg:p-10
            "
          >
            <EditProfileForm
              user={user}
              onSubmit={handleSubmit}
              onCancel={() => router.push('/profile')}
            />
          </div>
        </section>

        {/* =====================================================
            FOOTER NOTE
        ====================================================== */}

        <div className="mt-5 flex items-start gap-2 px-1 sm:mt-6">
          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-main" />

          <p className="text-xs leading-relaxed text-grey-400">
            Vos informations sont utilisées uniquement pour gérer
            votre compte et améliorer votre expérience SmokeGo.
          </p>
        </div>
      </div>
    </main>
  )
}