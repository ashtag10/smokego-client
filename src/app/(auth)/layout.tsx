import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Authentification - SmokeGo',
  description: 'Connectez-vous ou créez votre compte SmokeGo',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header avec logo */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-12 h-12 bg-gold-main rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-serif font-bold text-2xl">SG</span>
              </div>
              <span className="font-serif text-3xl font-bold text-gold-main">
                SmokeGo
              </span>
            </Link>
            <p className="text-grey-500 text-sm mt-2">
              Vente, livraison et réservation de lounge
            </p>
          </div>

          {/* Contenu */}
          <div className="bg-white rounded-2xl border border-grey-100 p-6 md:p-8 shadow-sm">
            {children}
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-grey-400">
              &copy; {new Date().getFullYear()} SmokeGo. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}