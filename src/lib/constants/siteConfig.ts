export const siteConfig = {
  name: 'Ghain',
  description:
    'Minimalist luxury streetwear. Monochrome essentials crafted for those who move with intention.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ghain.com',
  ogImage: '/og.jpg',
  social: {
    instagram: '',
    twitter: '',
    tiktok: '',
  },
  contact: {
    email: 'support@ghain.com',
  },
} as const
