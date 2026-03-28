'use client'

import { type FormEvent, useRef } from 'react'
import { toast } from 'sonner'

export function NewsletterCTA() {
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    if (!email) return

    toast.success('Welcome to the list. We\u2019ll be in touch.')
    formRef.current?.reset()
  }

  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-lg mx-auto text-center px-4">
        <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight mb-4">
          Stay in the Loop
        </h2>
        <p className="text-neutral-400 mb-8">
          Be the first to know about new arrivals and exclusive offers.
        </p>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex gap-0"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="bg-transparent border border-neutral-700 text-white placeholder-neutral-500 px-4 h-12 flex-1 focus:border-white focus:outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-white text-black h-12 px-6 text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
