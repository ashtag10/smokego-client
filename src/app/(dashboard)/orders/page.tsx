'use client'

import { useOrders } from '@/lib/hooks/useOrders'
import { OrderCard } from '@/components/orders/OrderCard'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { toast } from 'react-hot-toast'
import { ordersApi } from '@/lib/api/orders'

import {
  ShoppingBag,
  Sparkles,
  Package,
  ArrowRight,
} from 'lucide-react'

export default function OrdersPage() {
  const {
    orders,
    pagination,
    isLoading,
    refetch,
  } = useOrders()

  const handleRepeatOrder = async (orderId: string) => {
    try {
      const response = await ordersApi.repeatOrder(orderId)

      if (response.success && response.data) {
        toast.success(
          'Commande dupliquée ! Vérifiez votre panier'
        )

        refetch()
      } else {
        toast.error(
          response.message ||
            'Erreur lors de la duplication'
        )
      }
    } catch (error) {
      console.error('Repeat order error:', error)

      toast.error('Une erreur est survenue')
    }
  }

  const totalOrders = pagination?.total || 0

  return (
    <main className="min-h-screen bg-[#FAF9F7]">
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-2
          py-8
          sm:px-3
          sm:py-10
          lg:px-4
          lg:py-12
        "
      >
        {/* =========================================================
            HERO — SMOKEGO COLLECTION
        ========================================================= */}
        <section
          className="
            relative
            mb-9
            overflow-hidden
            rounded-2xl
            bg-black-main
            px-5
            py-8
            sm:px-7
            sm:py-9
            md:mb-10
            md:rounded-3xl
            md:px-10
            md:py-10
          "
        >
          {/* Glow haut droite */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-72
              w-72
              rounded-full
              bg-[#D4AF37]/10
              blur-3xl
            "
          />

          {/* Glow bas gauche */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-40
              -left-32
              h-80
              w-80
              rounded-full
              bg-[#D4AF37]/5
              blur-3xl
            "
          />

          {/* Glow central */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-0
              right-1/4
              h-36
              w-36
              rounded-full
              bg-[#D4AF37]/5
              blur-3xl
            "
          />

          {/* =====================================================
              CONTENU HERO
          ====================================================== */}
          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-8
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            {/* ===================================================
                TEXTE
            ==================================================== */}
            <div className="max-w-2xl">
              {/* BADGE */}
              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2.5
                  rounded-full
                  border
                  border-[#D4AF37]/25
                  bg-gradient-to-r
                  from-[#D4AF37]/10
                  via-[#FFF9E8]
                  to-white
                  px-3.5
                  py-2
                  shadow-[0_3px_12px_rgba(184,134,11,0.08)]
                "
              >
                <div
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-[#C89B3C]
                    via-[#D4AF37]
                    to-[#B8860B]
                    text-white
                    shadow-[0_2px_8px_rgba(184,134,11,0.2)]
                  "
                >
                  <Sparkles
                    className="h-3.5 w-3.5"
                    strokeWidth={2}
                  />
                </div>

                <span
                  className="
                    text-xs
                    font-semibold
                    tracking-wide
                    text-[#B8860B]
                  "
                >
                  SmokeGo Collection
                </span>
              </div>

              {/* PETITE CATÉGORIE */}
              <p
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  tracking-wide
                  text-[#D4AF37]
                  sm:text-base
                "
              >
                <ShoppingBag className="h-4 w-4" />

                Mon espace
              </p>

              {/* TITRE */}
              <h1
                className="
                  font-serif
                  text-3xl
                  font-semibold
                  leading-[1.05]
                  tracking-tight
                  text-white
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                "
              >
                Mes

                <span
                  className="
                    ml-2
                    bg-gradient-to-r
                    from-[#B8860B]
                    via-[#D4AF37]
                    to-[#C89B3C]
                    bg-clip-text
                    text-transparent
                  "
                >
                  commandes
                </span>
              </h1>

              {/* DESCRIPTION */}
              <Paragraph
                className="
                  mt-5
                  max-w-xl
                  text-sm
                  leading-relaxed
                  text-black
                  md:text-base
                "
              >
                Retrouvez l'ensemble de vos commandes,
                consultez leur statut et recommandez
                facilement vos produits préférés.
              </Paragraph>
            </div>

            {/* ===================================================
                COMPTEUR
            ==================================================== */}
            <div
              className="
                flex
                items-center
                gap-3
                self-start
                lg:self-auto
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-[#C89B3C]
                  via-[#D4AF37]
                  to-[#B8860B]
                  text-white
                  shadow-[0_5px_20px_rgba(212,175,55,0.18)]
                "
              >
                <Package
                  className="h-5 w-5"
                  strokeWidth={2}
                />
              </div>

              <div>
                <p
                  className="
                    text-2xl
                    font-semibold
                    leading-none
                    text-white
                  "
                >
                  {totalOrders}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-white/40
                  "
                >
                  commande
                  {totalOrders > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              LIGNE DORÉE
          ====================================================== */}
          <div
            className="
              absolute
              bottom-0
              left-5
              right-5
              sm:left-7
              sm:right-7
              md:left-10
              md:right-10
            "
          >
            <div
              className="
                h-px
                bg-gradient-to-r
                from-transparent
                via-[#D4AF37]/50
                to-transparent
              "
            />
          </div>
        </section>

        {/* =========================================================
            SECTION COMMANDES
        ========================================================= */}
        <section>
          {/* =======================================================
              HEADER DES RÉSULTATS
          ======================================================== */}
          <div
            className="
              mb-6
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
            "
          >
            {/* Informations */}
            <div
              className="
                flex
                shrink-0
                items-center
                gap-3
              "
            >
              {/* Icône */}
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#D4AF37]/20
                  bg-white
                  shadow-sm
                "
              >
                <ShoppingBag
                  className="h-4 w-4 text-[#D4AF37]"
                  strokeWidth={2}
                />
              </div>

              <div>
                <p
                  className="
                    text-sm
                    font-semibold
                    text-black-main
                  "
                >
                  Historique des commandes
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-grey-500
                  "
                >
                  {totalOrders === 0
                    ? 'Aucune commande'
                    : `${totalOrders} commande${
                        totalOrders > 1 ? 's' : ''
                      } au total`}
                </p>
              </div>
            </div>

            {/* Ligne */}
            <div
              className="
                hidden
                h-px
                flex-1
                bg-gradient-to-r
                from-[#D4AF37]/20
                via-grey-100
                to-transparent
                sm:block
              "
            />

            {/* Collection */}
            <div
              className="
                hidden
                shrink-0
                items-center
                gap-2
                sm:flex
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#D4AF37]
                  shadow-[0_0_7px_rgba(212,175,55,0.5)]
                "
              />

              <span
                className="
                  text-xs
                  font-medium
                  tracking-wide
                  text-[#B8860B]
                "
              >
                SmokeGo Collection
              </span>
            </div>
          </div>

          {/* =======================================================
              ÉTAT VIDE
          ======================================================== */}
          {orders.length === 0 ? (
            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-[#D4AF37]/15
                bg-white
                px-5
                py-14
                text-center
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                sm:px-8
                sm:py-16
              "
            >
              {/* Glow */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-0
                  h-40
                  w-40
                  -translate-x-1/2
                  rounded-full
                  bg-[#D4AF37]/5
                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  z-10
                  mx-auto
                  max-w-md
                "
              >
                {/* Icône */}
                <div
                  className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-black-main
                    text-[#D4AF37]
                    shadow-[0_8px_24px_rgba(0,0,0,0.12)]
                  "
                >
                  <ShoppingBag
                    className="h-7 w-7"
                    strokeWidth={1.7}
                  />
                </div>

                {/* Titre */}
                <h2
                  className="
                    mt-5
                    font-serif
                    text-xl
                    font-semibold
                    text-black-main
                    sm:text-2xl
                  "
                >
                  Aucune commande pour le moment
                </h2>

                {/* Description */}
                <Paragraph
                  muted
                  className="
                    mt-2
                    text-sm
                    leading-relaxed
                  "
                >
                  Vos commandes apparaîtront ici dès que
                  vous aurez effectué votre premier achat
                  chez SmokeGo.
                </Paragraph>

                {/* CTA décoratif */}
                <div
                  className="
                    mx-auto
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-[#B8860B]
                  "
                >
                  <span>
                    Découvrez notre collection
                  </span>

                  <ArrowRight
                    className="h-3.5 w-3.5"
                  />
                </div>
              </div>

              {/* Ligne dorée */}
              <div
                className="
                  absolute
                  bottom-0
                  left-8
                  right-8
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[#D4AF37]/30
                  to-transparent
                "
              />
            </div>
          ) : (
            /* =====================================================
               LISTE DES COMMANDES
            ====================================================== */
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                  "
                >
                  <OrderCard
                    order={order}
                    onRepeat={handleRepeatOrder}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =========================================================
            FOOTER
        ========================================================= */}
        <div
          className="
            mt-10
            border-t
            border-grey-100
            pt-6
          "
        >
          <p
            className="
              text-center
              text-[11px]
              leading-relaxed
              text-grey-400
            "
          >
            SmokeGo · Premium Hookah Experience
          </p>
        </div>
      </div>
    </main>
  )
}