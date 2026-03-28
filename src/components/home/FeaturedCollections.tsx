import Link from 'next/link'
import Image from 'next/image'
import type { Category } from '@/types/product'

const collectionImages: Record<string, string> = {
  clothing: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1067&fit=crop',
  footwear: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1067&fit=crop',
  accessories: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1067&fit=crop',
}

type FeaturedCollectionsProps = {
  categories: Category[]
}

export function FeaturedCollections({ categories }: FeaturedCollectionsProps) {
  return (
    <section className="py-24">
      <h2 className="font-display text-3xl md:text-4xl font-light text-center tracking-tight mb-12">
        Collections
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/shop/${category.slug}`}
            className="group"
          >
            <div className="aspect-[3/4] relative overflow-hidden bg-neutral-100">
              {/* Collection image */}
              <Image
                src={
                  collectionImages[category.slug] ??
                  `https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=1067&fit=crop`
                }
                alt={`${category.name} collection`}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-xl text-white font-medium">
                  {category.name}
                </h3>
                <span className="text-xs uppercase tracking-widest text-neutral-300 mt-2 inline-block group-hover:underline">
                  Shop Now
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
