'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/lib/stores/authStore'

export default function VerifyOTPPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth } = useAuthStore()
  const phone = searchParams.get('phone') || ''

  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timer, setTimer] = useState(300)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Timer
  useEffect(() => {
    if (timer <= 0) return

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  // Focus premier input
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value.slice(0, 1)
    setCode(newCode)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()

    const pasted = e.clipboardData.getData('text')
    const digits = pasted.replace(/\D/g, '').slice(0, 6)

    const newCode = [...code]

    for (let i = 0; i < digits.length; i++) {
      newCode[i] = digits[i]
    }

    setCode(newCode)

    const lastIndex = Math.min(digits.length, 5)
    inputRefs.current[lastIndex]?.focus()
  }

  const handleVerify = async () => {
    const otpCode = code.join('')

    if (otpCode.length !== 6) {
      toast.error('Veuillez entrer les 6 chiffres du code')
      return
    }

    setIsLoading(true)

    try {
      const response = await authApi.verifyOtp({
        phone,
        code: otpCode,
      })

      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data

        setAuth(user, accessToken, refreshToken)

        toast.success('Compte activé avec succès !')

        router.push('/')
      } else {
        toast.error(response.message || 'Code OTP invalide')

        setCode(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)

    try {
      await authApi.forgotPassword(phone)

      toast.success('Un nouveau code a été envoyé')

      setTimer(300)
      setCode(['', '', '', '', '', ''])

      inputRefs.current[0]?.focus()
    } catch (error) {
      toast.error('Erreur lors du renvoi du code')
    } finally {
      setIsResending(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60

    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative">
      {/* Glow doré très léger derrière le contenu */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-32
          w-32
          -translate-x-1/2
          rounded-full
          bg-[#D4AF37]/[0.04]
          blur-3xl
        "
      />

      <Heading
        level="h2"
        className="
          relative
          text-center
          text-[#C9A94E]
          drop-shadow-[0_0_8px_rgba(212,175,55,0.12)]
        "
      >
        Vérification OTP
      </Heading>

      <Paragraph
        muted
        className="
          relative
          mt-2
          text-center
          text-gray-500
        "
      >
        Un code à 6 chiffres a été envoyé à
        <br />

        <span
          className="
            font-medium
            text-[#B8963E]
            drop-shadow-[0_0_5px_rgba(212,175,55,0.10)]
          "
        >
          {phone}
        </span>
      </Paragraph>


      <div className="relative mt-8">
        <div
          className="flex justify-center gap-3"
          onPaste={handlePaste}
        >
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(index, e.target.value)
              }
              onKeyDown={(e) =>
                handleKeyDown(index, e)
              }
              className="
                h-14
                w-12
                rounded-xl
                border-2
                bg-[#FFFDF7]
                text-center
                text-2xl
                font-bold
                text-[#8F752F]
                shadow-[0_2px_8px_rgba(212,175,55,0.04)]
                transition-all
                duration-200
                focus:outline-none
                focus:border-[#D4AF37]
                focus:ring-2
                focus:ring-[#D4AF37]/20
                focus:shadow-[0_0_10px_rgba(212,175,55,0.10)]
              "
              style={{
                borderColor: digit
                  ? '#C9A94E'
                  : '#DDD6C4',
              }}
            />
          ))}
        </div>


        <div className="mt-4 flex justify-center">
          <p
            className="
              text-sm
              text-[#9A8A62]
            "
          >
            Code valable{' '}
            <span
              className="
                font-medium
                text-[#B8963E]
              "
            >
              {formatTime(timer)}
            </span>
          </p>
        </div>


        <div className="mt-6 space-y-3">
          <PrimaryButton
            onClick={handleVerify}
            isLoading={isLoading}
            fullWidth
            disabled={code.some((d) => !d)}
            className="
              border
              border-[#C9A94E]/60
              shadow-[0_4px_14px_rgba(212,175,55,0.08)]
              transition-all
              duration-300
              hover:border-[#D4AF37]
              hover:shadow-[0_4px_18px_rgba(212,175,55,0.16)]
            "
          >
            Vérifier
          </PrimaryButton>

          <SecondaryButton
            onClick={handleResend}
            isLoading={isResending}
            fullWidth
            disabled={timer > 0}
            className="
              border
              border-[#C9A94E]/40
              text-[#9A7B32]
              shadow-[0_2px_10px_rgba(212,175,55,0.04)]
              transition-all
              duration-300
              hover:border-[#D4AF37]/70
              hover:text-[#B8963E]
              hover:shadow-[0_2px_14px_rgba(212,175,55,0.10)]
            "
          >
            {timer > 0
              ? `Renvoyer (${formatTime(timer)})`
              : 'Renvoyer le code'}
          </SecondaryButton>
        </div>
      </div>


      <div className="relative mt-6 text-center">
        <button
          onClick={() => router.push('/login')}
          className="
            text-sm
            text-[#9A8A62]
            transition-all
            duration-300
            hover:text-[#B8963E]
            hover:drop-shadow-[0_0_5px_rgba(212,175,55,0.15)]
          "
        >
          Retour à la connexion
        </button>
      </div>
    </div>
  )
}