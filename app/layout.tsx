import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Nunito } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://24155925-hwa-hackathon.vercel.app"),
  title: {
    default: "WILDNEST — an indoor meadow for dogs",
    template: "%s · WILDNEST",
  },
  description:
    "WILDNEST is a pressure-activated silicone dig mat that rewards indoor digging with kibble, plus forest scent pods, chew toys and puzzle games. Turn your living room into a wild little meadow.",
  openGraph: {
    title: "WILDNEST — an indoor meadow for dogs",
    description:
      "Pressure-activated kibble, soft grass buds and forest air. The indoor garden for dogs who were born to dig.",
    type: "website",
    url: "https://24155925-hwa-hackathon.vercel.app",
    siteName: "WILDNEST",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#1E4D35",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest-900 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-cream-50"
        >
          Skip to content
        </a>
        <CartProvider>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
