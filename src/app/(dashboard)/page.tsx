import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { PopularProducts } from '@/components/home/PopularProducts'
import { NewArrivals } from '@/components/home/NewArrivals'
import { LoungePreview } from '@/components/home/LoungePreview'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <PopularProducts />
      <NewArrivals />
      <LoungePreview />
    </div>
  )
}