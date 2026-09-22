'use client'

import { NextIntlClientProvider } from 'next-intl'
import { useEffect, useState, type ReactNode } from 'react'
import { useAuthStore } from '@/lib/stores/authStore'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [messages, setMessages] = useState<Record<string, unknown> | null>(null)
  const [locale, setLocale] = useState('fr')
  const hydrate = useAuthStore((state) => state.hydrate)

  useEffect(() => {
    hydrate()

    const savedLocale = localStorage.getItem('ousmane-chicha-language') || 'fr'

    setLocale(savedLocale)

    import(`../../messages/${savedLocale}.json`)
      .then((module) => {
        setMessages(module.default)
      })
      .catch(() => {
        import('../messages/fr.json').then((module) => {
          setMessages(module.default)
          setLocale('fr')
        })
      })
  }, [hydrate])

  if (!messages) {
    return <>{children}</>
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}