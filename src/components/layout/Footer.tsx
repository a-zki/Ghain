import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { IconInstagram, IconX } from './icons'
import { siteConfig } from '@/lib/constants/siteConfig'
import { footerNav } from '@/lib/constants/navigation'
import { FooterNewsletter } from './FooterNewsletter'

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Logo size="md" className="text-white" />
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={siteConfig.social.instagram || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-500 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <IconInstagram size={18} />
              </a>
              <a
                href={siteConfig.social.twitter || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-500 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <IconX size={18} />
              </a>
            </div>
          </div>

          {/* Navigation columns */}
          {footerNav.map((section) => (
            <div key={section.title}>
              <h3 className="font-display text-xs font-bold uppercase tracking-widest mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter column */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-widest mb-6">
              Newsletter
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
              Get early access to drops, exclusive offers, and more.
            </p>
            <FooterNewsletter />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-neutral-500 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-neutral-500 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
