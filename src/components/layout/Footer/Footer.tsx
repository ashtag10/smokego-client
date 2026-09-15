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
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-14">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">

          {/* BRAND */}
          <div className="md:col-span-4">
            <Logo />

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-grey-600">
              Vente, livraison et réservation de lounge autour de la chicha.
              L'expérience SmokeGo à portée de main.
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="md:col-span-2 md:col-start-6">
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
                  href="/shop"
                  className="transition-colors duration-300 hover:text-[#B8860B]"
                >
                  Boutique
                </Link>
              </li>

              <li>
                <Link
                  href="/reservations"
                  className="transition-colors duration-300 hover:text-[#B8860B]"
                >
                  Réservations
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
                  href="/reservations"
                  className="transition-colors duration-300 hover:text-[#B8860B]"
                >
                  Réservations
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

          {/* SUIVEZ-NOUS */}
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
              Suivez-nous
            </h4>

            <div className="flex gap-2.5">

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-[#C89B3C]
                  via-[#D4AF37]
                  to-[#B8860B]
                  text-white
                  shadow-[0_3px_10px_rgba(184,134,11,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_5px_15px_rgba(184,134,11,0.28)]
                "
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-[#C89B3C]
                  via-[#D4AF37]
                  to-[#B8860B]
                  text-white
                  shadow-[0_3px_10px_rgba(184,134,11,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_5px_15px_rgba(184,134,11,0.28)]
                "
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>

            </div>
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