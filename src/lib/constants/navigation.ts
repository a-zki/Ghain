export type NavItem = {
  label: string
  href: string
}

export type FooterSection = {
  title: string
  links: NavItem[]
}

export const mainNav: NavItem[] = [
  { label: 'New Arrivals', href: '/shop?sort=newest' },
  { label: 'Clothing', href: '/shop/clothing' },
  { label: 'Footwear', href: '/shop/footwear' },
  { label: 'Accessories', href: '/shop/accessories' },
]

export const footerNav: FooterSection[] = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', href: '/shop?sort=newest' },
      { label: 'Clothing', href: '/shop/clothing' },
      { label: 'Footwear', href: '/shop/footwear' },
      { label: 'Accessories', href: '/shop/accessories' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Shipping & Returns', href: '/shipping-returns' },
      { label: 'Size Guide', href: '/size-guide' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
]
