'use client'

import { type FormEvent, useState } from 'react'
import { toast } from 'sonner'

export function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email.trim()) return

    setIsSubmitting(true)

    // Simulate newsletter subscription
    await new Promise((resolve) => setTimeout(resolve, 500))

    toast.success('Subscribed successfully')
    setEmail('')
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        required
        className="h-12 w-full bg-transparent border border-neutral-700 px-4 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none transition-colors duration-200"
        aria-label="Email address for newsletter"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full bg-white text-black text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  )
}
