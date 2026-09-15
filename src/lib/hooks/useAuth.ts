import { useEffect } from 'react'
import { useAuthStore } from '@/lib/stores/authStore'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, clearAuth } = useAuthStore()

  const logout = () => {
    clearAuth()
    router.push('/login')
  }

  const redirectToLogin = () => {
    if (!isAuthenticated && !isLoading) {
      router.push('/login')
    }
  }

  const redirectToDashboard = () => {
    if (isAuthenticated && !isLoading) {
      router.push('/')
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    redirectToLogin,
    redirectToDashboard,
  }
}