import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { StatusBadge } from '@/components/ui/Badge/StatusBadge'
import { formatPrice } from '@/lib/utils/formatters'
import { PRODUCT_CATEGORY_LABELS } from '@/lib/utils/constants'
import type { Product } from '@/lib/types/product'

interface ProductInfoProps {
  product: Product
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const hasPromo =
    product.promoPrice !== undefined &&
    product.promoPrice !== null &&
    product.promoPrice < product.price

  const isInStock = product.stock > 0

  const discount = hasPromo
    ? Math.round(
        ((product.price - product.promoPrice!) / product.price) * 100
      )
    : 0

  return (
    <div className="space-y-7">
      {/* Catégorie / marque */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gold-main/10 text-gold-dark text-xs font-semibold uppercase tracking-wider">
          {PRODUCT_CATEGORY_LABELS[product.category]}
        </span>

        {product.brand && (
          <>
            <span className="w-1 h-1 rounded-full bg-grey-300" />
            <span className="text-sm text-grey-500">
              {product.brand}
            </span>
          </>
        )}
      </div>

      {/* Nom */}
      <div>
        <Heading
          level="h1"
          className="text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-tight"
        >
          {product.name}
        </Heading>
      </div>

      {/* Prix */}
      <div className="flex flex-wrap items-end gap-3">
        {hasPromo ? (
          <>
            <span className="text-3xl md:text-4xl font-bold text-gold-main tracking-tight">
              {formatPrice(product.promoPrice!)}
            </span>

            <span className="text-base md:text-lg text-grey-400 line-through mb-1">
              {formatPrice(product.price)}
            </span>

            <span className="inline-flex items-center px-2.5 py-1 mb-1 rounded-full bg-red-50 text-red-600 text-xs font-bold">
              -{discount}%
            </span>
          </>
        ) : (
          <span className="text-3xl md:text-4xl font-bold text-black-main tracking-tight">
            {formatPrice(product.price)}
          </span>
        )}
      </div>

      {/* Disponibilité */}
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge
          status={isInStock ? 'En stock' : 'Rupture de stock'}
          className={
            isInStock
              ? 'bg-green-50 text-green-700 border border-green-100'
              : 'bg-red-50 text-red-700 border border-red-100'
          }
        />

        {isInStock && product.stock < 5 && (
          <span className="inline-flex items-center gap-1.5 text-sm text-orange-600">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Plus que {product.stock} exemplaire
            {product.stock > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Description */}
      <div className="relative pt-6 border-t border-grey-100">
        <div className="absolute top-0 left-0 w-12 h-px bg-gold-main" />

        <Heading level="h5" className="mb-3">
          Description
        </Heading>

        <Paragraph className="text-grey-600 leading-7">
          {product.description}
        </Paragraph>
      </div>
    </div>
  )
}