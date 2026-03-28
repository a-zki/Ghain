import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="h-screen relative overflow-hidden">
      {/* Background image */}
      <Image
        src="https://picsum.photos/seed/ghain-hero/1920/1080"
        alt="Ghain hero"
        fill
        className="object-cover"
        priority
      />
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4">
          New Collection
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight">
          Defined by Restraint
        </h1>
        <p className="text-base md:text-lg text-neutral-400 mt-4">
          Luxury essentials for the modern wardrobe
        </p>
        <Link
          href="/shop"
          className="border border-white text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors mt-8 inline-block"
        >
          Shop the Collection
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
          Scroll
        </span>
        <div className="w-px h-8 bg-neutral-500 animate-pulse" />
      </div>
    </section>
  )
}
