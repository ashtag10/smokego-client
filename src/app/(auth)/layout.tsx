import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

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
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              {/* Rond avec le logo */}
              <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-full">
                <Image
                  src="/logo-smokego.png"
                  alt="SmokeGo"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-3xl font-bold text-black">
                SmokeGo
              </span>
            </Link>
            <p className="text-gray-500 text-sm mt-2">
              Vente, livraison et réservation de lounge
            </p>
          </div>

          {/* Contenu */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            {children}
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} SmokeGo. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}