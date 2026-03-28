import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/search/SearchModal";
import { MobileNav } from "@/components/layout/MobileNav";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ghain | Luxury Essentials",
    template: "%s | Ghain",
  },
  description:
    "Discover refined luxury streetwear at Ghain. Minimalist essentials crafted with intention.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  keywords: [
    "luxury streetwear",
    "minimalist fashion",
    "premium essentials",
    "monochrome clothing",
    "designer basics",
  ],
  authors: [{ name: "Ghain" }],
  creator: "Ghain",
  openGraph: {
    type: "website",
    siteName: "Ghain",
    title: "Ghain | Luxury Essentials",
    description:
      "Discover refined luxury streetwear at Ghain. Minimalist essentials crafted with intention.",
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Ghain - Luxury Essentials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghain | Luxury Essentials",
    description:
      "Discover refined luxury streetwear at Ghain. Minimalist essentials crafted with intention.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <CartDrawer />
        <SearchModal />
        <MobileNav />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#000",
              color: "#fff",
              borderRadius: "0",
              border: "none",
            },
          }}
        />
      </body>
    </html>
  );
}
