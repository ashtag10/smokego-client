'use client'

import { useEffect, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from '@/lib/stores/authStore'
import { Providers } from '@/providers'

interface LayoutClientProps {
  children: ReactNode
}

export function LayoutClient({ children }: LayoutClientProps) {
  // ✅ Hydrater l'état d'authentification au chargement
  useEffect(() => {
    useAuthStore.getState().hydrate()
  }, [])

  return (
    <>
      <Providers>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FFFFFF',
              color: '#1A1A1A',
              border: '1px solid #F0F0F0',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#C9A94E',
                secondary: '#FFFFFF',
              },
            },
            error: {
              style: {
                border: '1px solid #FEE2E2',
                background: '#FEF2F2',
              },
              iconTheme: {
                primary: '#EF4444',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
      </Providers>
    </>
  )
}