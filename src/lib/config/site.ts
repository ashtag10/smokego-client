// ============================================
// CONFIGURATION DU SITE
// ============================================

export const siteConfig = {
  name: 'SmokeGo',
  description: 'Application de vente, livraison et réservation de lounge',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  keywords: ['chicha', 'lounge', 'livraison', 'réservation', 'SmokeGo'],
  author: 'SmokeGo',
} as const

export type SiteConfig = typeof siteConfig


export default siteConfig


export const config = siteConfig