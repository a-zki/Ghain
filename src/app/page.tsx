import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageContainer } from '@/components/layout/PageContainer'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedCollections } from '@/components/home/FeaturedCollections'
import { NewArrivalsCarousel } from '@/components/home/NewArrivalsCarousel'
import { BrandStory } from '@/components/home/BrandStory'
import { NewsletterCTA } from '@/components/home/NewsletterCTA'
import { getCategories, getNewArrivals } from '@/actions/products'

export default async function Home() {
  const [categories, newArrivals] = await Promise.all([
    getCategories(),
    getNewArrivals(),
  ])

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PageContainer>
          <FeaturedCollections categories={categories} />
          <NewArrivalsCarousel products={newArrivals} />
          <BrandStory />
        </PageContainer>
        <NewsletterCTA />
      </main>
      <Footer />
    </>
  )
}
