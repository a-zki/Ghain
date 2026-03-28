import type { Metadata } from 'next'
import Link from 'next/link'
import { PageContainer } from '@/components/layout/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Contact',
}

export default function ContactPage() {
  return (
    <PageContainer className="py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />

      <div className="mt-6 mb-12">
        <h1 className="font-display text-3xl font-light tracking-tight">
          Contact Us
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-16">
        {/* Contact Form */}
        <div>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium uppercase tracking-widest text-neutral-500 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-black placeholder:text-neutral-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium uppercase tracking-widest text-neutral-500 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-black placeholder:text-neutral-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-medium uppercase tracking-widest text-neutral-500 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-black placeholder:text-neutral-400"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium uppercase tracking-widest text-neutral-500 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-black placeholder:text-neutral-400 resize-none"
                placeholder="Tell us more..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center bg-black px-8 text-xs font-medium uppercase tracking-widest text-white transition-colors duration-200 hover:bg-neutral-900"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-xs font-bold uppercase tracking-widest mb-4">
                Email
              </h2>
              <a
                href="mailto:hello@ghain.com"
                className="text-sm text-neutral-600 hover:text-black transition-colors duration-200"
              >
                hello@ghain.com
              </a>
            </div>

            <div>
              <h2 className="font-display text-xs font-bold uppercase tracking-widest mb-4">
                Social
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://instagram.com/ghain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-600 hover:text-black transition-colors duration-200"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/ghain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-600 hover:text-black transition-colors duration-200"
                  >
                    X (Twitter)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xs font-bold uppercase tracking-widest mb-4">
                Hours
              </h2>
              <p className="text-sm text-neutral-600">
                Customer support is available Monday through Friday, 9am &ndash;
                6pm EST. We aim to respond to all inquiries within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
