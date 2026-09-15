export enum UserRole {
  CLIENT = 'CLIENT',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string
  name: string
  email?: string
  phone: string
  role: UserRole
  avatarUrl?: string
  isActive: boolean
  isVip: boolean
  vipSince?: string
  loyaltyPoints: number
  createdAt: string
  updatedAt?: string
}

export interface Address {
  id: string
  userId: string
  name: string
  recipientName: string
  phone: string
  city: string
  district: string
  detailedAddress: string
  gpsLat?: number
  gpsLng?: number
  isDefault: boolean
  createdAt: string
  updatedAt?: string
}

export interface LoginCredentials {
  phone?: string
  email?: string
  password: string
}

export interface RegisterData {
  name: string
  phone: string
  email?: string
  password: string
  avatarUrl?: string
}

export interface VerifyOtpData {
  phone: string
  code: string
}

export interface ResetPasswordData {
  phone: string
  code: string
  newPassword: string
}

export interface UpdateProfileData {
  name?: string
  email?: string
  avatarUrl?: string
}