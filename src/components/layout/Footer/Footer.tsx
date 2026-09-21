import Link from 'next/link'
import { Logo } from '../Navbar/Logo'

export const Footer = () => {
  return (
    <footer
      className="
        mt-auto
        border-t
        border-[#D4AF37]/20
        bg-white
        shadow-[0_-2px_18px_rgba(184,134,11,0.05)]
      "
    >
      <div className="mx-auto max-w-[1600px] px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* BRAND */}
          <div className="md:col-span-5">
            <Logo />

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-grey-600">
              Vente et livraison autour de la chicha.
              L'expérience Ousmane Chicha à portée de main.
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="md:col-span-2 md:col-start-7">
            <h4
              className="
                mb-4
                font-serif
                text-base
                font-semibold
                text-black-main
              "
            >
              Navigation
            </h4>

            <ul className="space-y-2.5 text-sm text-grey-600">
              <li>
                <Link
                  href="/"
                  className="transition-colors duration-300 hover:text-[#B8860B]"
                >
                  Accueil
                </Link>
              </li>

              <li>
                <Link
                  href="/loyalty"
                  className="transition-colors duration-300 hover:text-[#B8860B]"
                >
                  Fidélité
                </Link>
              </li>
            </ul>
          </div>

          {/* AIDE */}
          <div className="md:col-span-2">
            <h4
              className="
                mb-4
                font-serif
                text-base
                font-semibold
                text-black-main
              "
            >
              Aide
            </h4>

            <ul className="space-y-2.5 text-sm text-grey-600">
              <li>
                <Link
                  href="/faq"
                  className="transition-colors duration-300 hover:text-[#B8860B]"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/delivery"
                  className="transition-colors duration-300 hover:text-[#B8860B]"
                >
                  Livraison
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition-colors duration-300 hover:text-[#B8860B]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div
          className="
            mt-10
            border-t
            border-[#D4AF37]/15
            pt-6
            text-center
            text-xs
            text-grey-500
          "
        >
          <span>
            © {new Date().getFullYear()} OusmanHOOKAH. Tous droits réservés.
          </span>
        </div>
      </div>
    </footer>
  )
}