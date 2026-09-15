import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { User, LoginCredentials, RegisterData, VerifyOtpData, ResetPasswordData } from '@/lib/types/user'

export const authApi = {
  register: (data: RegisterData) => {
    return apiClient.post<{ user: User }>(API_ENDPOINTS.auth.register, data)
  },

  verifyOtp: (data: VerifyOtpData) => {
    return apiClient.post<{ user: User; accessToken: string; refreshToken: string }>(
      API_ENDPOINTS.auth.verifyOtp,
      data
    )
  },

  login: (credentials: LoginCredentials) => {
    return apiClient.post<{ user: User; accessToken: string; refreshToken: string }>(
      API_ENDPOINTS.auth.login,
      credentials
    )
  },

  refresh: (refreshToken: string) => {
    return apiClient.post<{ accessToken: string; refreshToken: string }>(
      API_ENDPOINTS.auth.refresh,
      { refreshToken }
    )
  },

  logout: () => {
    return apiClient.post(API_ENDPOINTS.auth.logout)
  },

  forgotPassword: (phone: string) => {
    return apiClient.post(API_ENDPOINTS.auth.forgotPassword, { phone })
  },

  resetPassword: (data: ResetPasswordData) => {
    return apiClient.post(API_ENDPOINTS.auth.resetPassword, data)
  },
}