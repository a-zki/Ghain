import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'

export const metadata: Metadata = {
  title: 'About',
}

const values = [
  {
    title: 'Quality First',
    description:
      'Every piece is crafted from premium materials sourced from the finest mills. We never compromise on construction, hand-selecting fabrics that age with grace and wear with intention.',
  },
  {
    title: 'Less is More',
    description:
      'We design with restraint. Each collection is deliberately small, each piece essential. By making less, we ensure everything we create earns its place in your wardrobe.',
  },
  {
    title: 'Intentional Design',
    description:
      'Every stitch, seam, and silhouette serves a purpose. Our design process strips away the unnecessary to reveal forms that are timeless, functional, and quietly confident.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-neutral-950 text-white py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
          GHAIN
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-light tracking-tight">
          The Art of Less
        </h1>
      </section>

      {/* Our Story */}
      <PageContainer className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight mb-8">
              Our Story
            </h2>
            <div className="space-y-5 text-sm leading-relaxed text-neutral-600">
              <p>
                Ghain was born from a belief that true luxury lies in simplicity.
                Named after the Arabic letter &ldquo;ghain&rdquo; &mdash; a
                sound that exists in the space between the familiar and the
                unseen &mdash; our brand sits at the intersection of minimalist
                design and cultural heritage.
              </p>
              <p>
                We started with a single question: what if every piece in your
                wardrobe was one you reached for again and again? Not because of
                a logo or a trend, but because the cut was perfect, the fabric
                extraordinary, and the design so considered it became invisible
                in the best possible way.
              </p>
              <p>
                Rooted in the traditions of Arabic craftsmanship and shaped by
                modern restraint, Ghain creates essentials that transcend
                seasons. We work with small, specialist ateliers, choosing
                quality over scale and permanence over novelty. Each collection
                is a study in reduction &mdash; every detail intentional, every
                element earned.
              </p>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="aspect-[4/5] bg-neutral-100 w-full" />
        </div>
      </PageContainer>

      {/* Values */}
      <section className="border-t border-neutral-200">
        <PageContainer className="py-16 md:py-24">
          <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="font-display text-sm font-bold uppercase tracking-widest mb-4">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  )
}
