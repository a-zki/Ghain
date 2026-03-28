# Ghain - Project Progress Tracker
> **Single source of truth.** This file is updated on every change. Read this to know exactly where the project stands.

---

## Project Overview
- **Name:** Ghain (غ) — E-commerce clothing store
- **Theme:** Black & white minimalist luxury streetwear
- **Stack:** Next.js 16.2.1 + TypeScript + Supabase + Tailwind CSS 4 + Stripe + Zustand + Resend
- **Hosting:** Vercel
- **Repo:** /Users/zaki/projects/ghain

---

## Current Status
- **Phase:** ALL 6 PHASES COMPLETE + Supabase integration + Manual testing PASSED
- **Build Status:** PASSING (zero errors, 31 routes)
- **Last Action:** Added picsum.photos placeholder images across the entire site
- **Next Step:** Replace placeholder images with real product photos, deploy to Vercel
- **Bug fixed:** Checkout page hydration issue (Zustand localStorage rehydration timing)

## Manual Test Results (2026-03-28)
| Test | Status | Notes |
|---|---|---|
| Home page loads | PASS | Hero, Collections (3 from DB), New Arrivals carousel (real products), Brand Story, Newsletter |
| Header nav | PASS | Logo, nav links, search/user/wishlist/cart icons |
| Shop /clothing | PASS | 6 products, filters (category/size/color/price), sort, breadcrumbs |
| Product detail | PASS | Variant selector (3 colors, 4 sizes from DB), price, description, accordions, size guide link |
| Add to cart | PASS | Size selection enables button, cart badge updates to "1" |
| Cart drawer | PASS | Opens from right, shows item with variant info, quantity controls, subtotal, checkout button |
| Search modal | PASS | Debounced search, "hoodie" returns Heavyweight Hoodie from DB full-text search |
| Checkout page | PASS | Shows order summary, "PAY WITH STRIPE" button (fixed hydration bug) |
| Auth login | PASS | Clean centered form, email/password, show/hide toggle, Google OAuth, register link |
| Admin dashboard | PASS | Dark sidebar, 4 stat cards, recent orders table with status badges |
| About page | PASS | Dark hero, Our Story section, brand narrative |
| Shipping & Returns | PASS | Accordion sections with policies |
| 404 page | PASS | Custom design with "BACK TO HOME" button |
| Footer | PASS | 4-column: brand, shop links, help links, newsletter |

---

## All 31 Routes
| Route | Type | Description |
|---|---|---|
| `/` | Static | Home — Hero, Collections, New Arrivals, Brand Story, Newsletter |
| `/shop` | Dynamic | Shop — Product grid with filters (category, size, color, price, sort) |
| `/shop/[category]` | Dynamic | Category page — Filtered shop |
| `/product/[slug]` | Dynamic | Product detail — Gallery, variants, cart, related, JSON-LD |
| `/search` | Dynamic | Search results page |
| `/wishlist` | Static | Wishlist page |
| `/checkout` | Static | Checkout — Order summary + Stripe redirect |
| `/checkout/success` | Dynamic | Order confirmation |
| `/auth/login` | Static | Sign in |
| `/auth/register` | Static | Create account |
| `/auth/forgot-password` | Static | Password reset |
| `/auth/callback` | Dynamic | OAuth callback |
| `/account` | Static | Order history |
| `/account/addresses` | Static | Saved addresses |
| `/account/settings` | Static | Profile + password |
| `/account/orders/[id]` | Dynamic | Order detail |
| `/admin` | Static | Admin dashboard — Stats + recent orders |
| `/admin/products` | Static | Product management |
| `/admin/products/[id]` | Dynamic | Product edit form |
| `/admin/orders` | Static | Order management |
| `/admin/orders/[id]` | Dynamic | Order detail (admin) |
| `/admin/customers` | Static | Customer list |
| `/admin/settings` | Static | Store settings |
| `/about` | Static | About page |
| `/contact` | Static | Contact form |
| `/shipping-returns` | Static | Shipping & returns policy |
| `/size-guide` | Static | Size guide tables |
| `/privacy` | Static | Privacy policy |
| `/terms` | Static | Terms & conditions |
| `/sitemap.xml` | Static | SEO sitemap |
| `/robots.txt` | Static | SEO robots |
| `/api/checkout` | Dynamic | Stripe session creation |
| `/api/webhooks/stripe` | Dynamic | Stripe webhook handler |

---

## Implementation Phases

### Phase 1: Foundation — COMPLETE
- [x] Next.js 16.2.1 project + all dependencies
- [x] Design system: Tailwind v4 theme, Space Grotesk + Inter fonts
- [x] 15 UI primitives + 9 layout components
- [x] 3 Zustand stores + 5 type files + utils + constants
- [x] Supabase clients + 8 SQL migrations + auth middleware
- [x] .env.example

### Phase 2: Product Catalog — COMPLETE
- [x] Home page (5 sections) + ProductCard + ProductGrid
- [x] Shop page with full filtering + Category pages
- [x] Product Detail (gallery, variants, cart, size guide, related)
- [x] Search (modal + results page)
- [x] Cart drawer (items, quantity, summary)
- [x] Mock data (12 products, 3 categories)

### Phase 3: Shopping & Payments — COMPLETE
- [x] Stripe Checkout integration (lazy init, session creation, webhook)
- [x] Checkout page + success page + cart clear
- [x] Wishlist page
- [x] Order confirmation email (react-email + Resend)

### Phase 4: Auth & Account — COMPLETE
- [x] Auth pages (login, register, forgot password, OAuth callback)
- [x] Social login (Google)
- [x] Account pages (orders, addresses, settings)
- [x] Static pages (about, contact, shipping & returns, size guide)

### Phase 5: Admin Dashboard — COMPLETE
- [x] Admin layout (dark sidebar, top bar)
- [x] Dashboard overview (stats, recent orders)
- [x] Product management (list, edit form with variants)
- [x] Order management (list, detail, status updates)
- [x] Customer list
- [x] Store settings

### Phase 6: Polish & Launch — COMPLETE
- [x] Loading skeletons (global, shop, product, search)
- [x] Error boundaries (global, shop-specific)
- [x] Custom 404 page
- [x] SEO: sitemap.xml, robots.txt, ProductJsonLd, enhanced OG metadata
- [x] Privacy Policy + Terms & Conditions pages

---

## Component Inventory (80+ components)

### UI Primitives (15) — src/components/ui/
Button, Input, Select, Textarea, Modal, Drawer, Accordion, Badge, Skeleton, Spinner, QuantitySelector, PriceDisplay, EmptyState, Logo, Breadcrumbs

### Layout (9) — src/components/layout/
Header, HeaderNav, HeaderActions, AnnouncementBar, MobileNav, Footer, FooterNewsletter, PageContainer, icons

### Home (5) — src/components/home/
HeroSection, FeaturedCollections, NewArrivalsCarousel, BrandStory, NewsletterCTA

### Product (6) — src/components/product/
ProductCard, ProductGrid, ProductImageGallery, ProductVariantSelector, ProductDetails, ProductRelated

### Filters (4) — src/components/filters/
FilterSidebar (+MobileFilterButton), FilterGroup, ActiveFilters, SortSelect

### Cart (4) — src/components/cart/
CartDrawer, CartItem, CartSummary, CartEmptyState

### Search (1) — src/components/search/
SearchModal

### Checkout (2) — src/components/checkout/
CheckoutButton, ClearCartOnMount

### Wishlist (1) — src/components/wishlist/
WishlistGrid

### Auth (4) — src/components/auth/
LoginForm, RegisterForm, ForgotPasswordForm, SocialLoginButtons

### Account (3) — src/components/account/
AccountSidebar, AccountMobileTabs, AddressForm

### Shared (1) — src/components/shared/
SizeGuideModal

### SEO (1) — src/components/seo/
ProductJsonLd

### Stores (3) — src/stores/
cartStore, wishlistStore, uiStore

---

## Architecture Decisions
| Decision | Choice | Reason |
|---|---|---|
| Database | Supabase (PostgreSQL) | User requirement |
| Auth | Supabase Auth | Same DB, RLS integration, free |
| Payments | Stripe Checkout (hosted) | PCI offloaded, 3D Secure |
| Email | Resend + react-email | React templates, great DX |
| Images | Supabase Storage + next/image | Centralized, auto optimization |
| Search | PostgreSQL full-text | Built into Supabase, no extra cost |
| Cart state | Zustand + persist | Lightweight, localStorage for guests |
| Styling | Tailwind CSS 4 | RSC-compatible, zero runtime |
| Fonts | Space Grotesk (display) + Inter (body) | Geometric + readable |

---

## Database (8 migration files ready)
profiles, categories, products, product_variants, addresses, orders, order_items, wishlist_items, cart_items

---

## To Go Live
1. ~~Create Supabase project + run migrations~~ DONE
2. ~~Set environment variables (.env.local from .env.example)~~ DONE
3. ~~Replace mock data with real Supabase queries in server actions~~ DONE
4. ~~Upload product images to Supabase Storage~~ Using picsum.photos placeholders (replace with real photos later)
5. Configure Stripe keys (test + live)
6. Set up Resend domain verification
7. Deploy to Vercel
8. Set up Stripe webhook endpoint URL in Stripe Dashboard
9. Configure Google OAuth in Supabase Auth

---

## Known Issues / Blockers
- None. Build passes cleanly with zero errors.
- All pages now query real Supabase database via server actions in `src/actions/products.ts`.
- Product images are picsum.photos placeholders (seeded by slug for consistency). Replace with real photos when available.
