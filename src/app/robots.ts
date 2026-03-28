import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants/siteConfig'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/account', '/checkout', '/api'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
