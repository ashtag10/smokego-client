import Link from 'next/link'
import { Home, Search } from 'lucide-react'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-gold-main/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-12 h-12 text-gold-main" />
        </div>

        <Heading level="h1" className="text-6xl md:text-7xl text-gold-main">
          404
        </Heading>

        <Heading level="h2" className="mt-4">
          Page non trouvee
        </Heading>

        <Paragraph muted className="mt-2">
          La page que vous recherchez n'existe pas ou a ete deplacee.
        </Paragraph>

        <div className="mt-8">
          <Link href="/">
            <PrimaryButton className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Retourner a l'accueil
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  )
}