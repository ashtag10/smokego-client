import { HeroCarousel } from '@/components/home/HeroCarousel'
import { StoriesBar } from '@/components/home/StoriesBar'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { NewArrivals } from '@/components/home/NewArrivals'
import { PopularProducts } from '@/components/home/PopularProducts'
import { FeaturedCollection } from '@/components/home/FeaturedCollection'
import { CategoryShowcase } from '@/components/home/CategoryShowcase'
import { BrandSection } from '@/components/home/BrandSection'
import { NewsletterSection } from '@/components/home/NewsletterSection'

export default function HomePage() {
  return (
    <div>
      <HeroCarousel />
      <StoriesBar />
      <FeaturedProducts />
      <NewArrivals />
      <PopularProducts />
      <FeaturedCollection />
      <CategoryShowcase />
      <BrandSection />
      <NewsletterSection />
    </div>
  )
}