'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>

        <Heading level="h2">
          Une erreur est survenue
        </Heading>

        <Paragraph muted className="mt-2">
          Nous rencontrons un probleme technique. Veuillez reessayer.
        </Paragraph>

        <div className="mt-8">
          <PrimaryButton onClick={reset} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Reessayer
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}