import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/lib/types/user'
import { apiClient } from '@/lib/api/client'

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

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }

  return null
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setAuth: (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => void
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
      isLoading: true,

      setAuth: (user, accessToken, refreshToken) => {
        apiClient.setTokens(accessToken, refreshToken)

        setCookie('accessToken', accessToken)
        setCookie('refreshToken', refreshToken)

        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('refreshToken', refreshToken)
          localStorage.setItem('user', JSON.stringify(user))
        }

        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      setUser: (user) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(user))
        }

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      setTokens: (accessToken, refreshToken) => {
        apiClient.setTokens(accessToken, refreshToken)

        setCookie('accessToken', accessToken)
        setCookie('refreshToken', refreshToken)

        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('refreshToken', refreshToken)
        }

        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      clearAuth: () => {
        apiClient.clearTokens()

        deleteCookie('accessToken')
        deleteCookie('refreshToken')

        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('user')
        }

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        })
      },

      logout: () => {
        get().clearAuth()

        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      },

      hydrate: () => {
        if (typeof window === 'undefined') return

        const accessToken =
          localStorage.getItem('accessToken') ||
          getCookie('accessToken')

        const refreshToken =
          localStorage.getItem('refreshToken') ||
          getCookie('refreshToken')

        const storedUser = localStorage.getItem('user')

        let user = get().user

        if (storedUser) {
          try {
            user = JSON.parse(storedUser) as User
          } catch {
            user = get().user
          }
        }

        if (accessToken && refreshToken && user) {
          apiClient.setTokens(accessToken, refreshToken)

          set({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          })

          return
        }

        set({
          user: user || null,
          accessToken: accessToken || null,
          refreshToken: refreshToken || null,
          isAuthenticated: Boolean(accessToken && refreshToken && user),
          isLoading: false,
        })
      },
    }),
    {
      name: 'smokego-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)