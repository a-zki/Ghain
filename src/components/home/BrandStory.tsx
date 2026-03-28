import Link from 'next/link'

export function BrandStory() {
  return (
    <section className="py-24">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Image placeholder */}
        <div className="lg:w-1/2">
          <div className="aspect-[4/5] bg-neutral-200" />
        </div>

        {/* Text content */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4">
            Our Philosophy
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight mb-6">
            The Art of Less
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            At Ghain, we believe that true luxury lies in restraint. Every piece
            in our collection is stripped to its essence, designed with
            meticulous attention to proportion, fabric, and finish. We source the
            finest materials and work with skilled artisans to create garments
            that transcend seasons and trends.
          </p>
          <p className="text-neutral-600 leading-relaxed mt-4">
            Our approach is intentional: fewer pieces, better made. Each
            silhouette is refined over months of development, ensuring that
            nothing is added without purpose and nothing essential is left out.
            The result is a wardrobe built on quiet confidence, where every
            detail earns its place.
          </p>
          <Link
            href="/about"
            className="text-xs uppercase tracking-widest underline hover:text-neutral-500 mt-6 inline-block"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
