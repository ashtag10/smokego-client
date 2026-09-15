import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/lib/types/user'
import { apiClient } from '@/lib/api/client'

//  Fonction pour gérer les cookies
const setCookie = (name: string, value: string, days: number = 30) => {
  if (typeof document === 'undefined') return
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`
}

const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean

  setAuth: (user: User, accessToken: string, refreshToken: string) => void
  setUser: (user: User) => void
  setTokens: (accessToken: string, refreshToken: string) => void
  clearAuth: () => void
  logout: () => void
  hydrate: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user, accessToken, refreshToken) => {
        //  Mettre à jour le client API
        apiClient.setTokens(accessToken, refreshToken)
        
        //  Stocker dans les cookies pour le proxy
        setCookie('accessToken', accessToken)
        setCookie('refreshToken', refreshToken)
        
        //  Stocker dans le state
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        })
      },

      setUser: (user) => {
        set({ user })
      },

      setTokens: (accessToken, refreshToken) => {
        apiClient.setTokens(accessToken, refreshToken)
        
        //  Mettre à jour les cookies
        setCookie('accessToken', accessToken)
        setCookie('refreshToken', refreshToken)
        
        set({ accessToken, refreshToken, isAuthenticated: true })
      },

      clearAuth: () => {
        apiClient.clearTokens()
        
        //  Supprimer les cookies
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        })
      },

      logout: () => {
        const { clearAuth } = get()
        clearAuth()
        //  Rediriger vers la page de connexion
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      },

      hydrate: () => {
        //  Récupérer les tokens depuis les cookies
        const accessToken = getCookie('accessToken')
        const refreshToken = getCookie('refreshToken')
        
        if (accessToken && refreshToken) {
          apiClient.setTokens(accessToken, refreshToken)
          set({
            accessToken,
            refreshToken,
            isAuthenticated: true,
          })
        }
      },
    }),
    {
      name: 'smokego-auth',
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
)