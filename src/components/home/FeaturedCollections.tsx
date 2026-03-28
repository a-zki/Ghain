import Link from 'next/link'
import Image from 'next/image'
import type { Category } from '@/types/product'

const collectionImages: Record<string, string> = {
  clothing: 'https://picsum.photos/seed/ghain-clothing/800/1067',
  footwear: 'https://picsum.photos/seed/ghain-footwear/800/1067',
  accessories: 'https://picsum.photos/seed/ghain-accessories/800/1067',
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
                  `https://picsum.photos/seed/ghain-${category.slug}/800/1067`
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
