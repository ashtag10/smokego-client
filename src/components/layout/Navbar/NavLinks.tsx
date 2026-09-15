import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/helpers'

interface NavLinksProps {
  mobile?: boolean
  onNavigate?: () => void
}

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/shop', label: 'Boutique' },
  { href: '/reservations', label: 'Réservations' },
  { href: '/orders', label: 'Commandes' },
  { href: '/loyalty', label: 'Fidélité' },
]

export const NavLinks = ({ mobile, onNavigate }: NavLinksProps) => {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        'flex gap-6',
        mobile ? 'flex-col px-2' : 'items-center'
      )}
    >
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== '/' && pathname?.startsWith(link.href))

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              'group relative font-medium transition-all duration-300',
              mobile && 'py-2 text-lg',

              isActive
                ? 'text-[#B8860B]'
                : 'text-black-main hover:text-[#B8860B]'
            )}
          >
            {link.label}

            {/* Ligne dorée animée */}
            <span
              className={cn(
                `
                  absolute
                  -bottom-1
                  left-0
                  h-[2px]
                  rounded-full
                  bg-gradient-to-r
                  from-[#B8860B]
                  via-[#D4AF37]
                  to-[#C89B3C]
                  transition-all
                  duration-300
                `,
                isActive
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              )}
            />
          </Link>
        )
      })}
    </div>
  )
}