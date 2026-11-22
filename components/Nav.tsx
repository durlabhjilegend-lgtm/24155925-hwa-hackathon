"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/Logo";
import { useCart } from "@/components/cart/CartProvider";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/product", label: "The mat" },
  { href: "/story", label: "A dog's day" },
  { href: "/customize", label: "Customize" },
  { href: "/build", label: "Build a kit" },
];

export function Nav() {
  const pathname = usePathname();
  const { count, openCart, hydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="relative z-40 bg-forest-900 text-cream-100">
        <div className="container-x flex items-center justify-center gap-2 py-2 text-center text-[11px] font-bold tracking-wide sm:text-xs">
          <svg viewBox="0 0 20 20" className="hidden h-3.5 w-3.5 text-moss-300 sm:block" fill="currentColor" aria-hidden="true">
            <path d="M10 1.5c3.7 2.3 5.5 5.3 5.5 9 0 1.4-.2 2.6-.7 3.8-1.5-2.6-3-4.3-4.7-5.2 1.2 1.9 1.9 4.2 2 6.9-1 .5-2 .7-3 .7-4.4 0-7.3-3.5-7.3-8.8C4.8 4.2 7 2.4 10 1.5Z" />
          </svg>
          Free shipping over $120
          <span className="px-1 text-cream-300/40" aria-hidden="true">·</span>
          30-day happy-dig guarantee
          <span className="hidden px-1 text-cream-300/40 sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline">Scent pods ship free with every mat</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-forest-900/10 bg-cream-100/85 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-cream-100/40 backdrop-blur-sm"
        }`}
      >
        <div className="container-x flex h-[74px] items-center justify-between gap-4">
          <Link href="/" className="shrink-0" aria-label="WILDNEST home">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-2 text-sm font-extrabold transition-colors ${
                    active
                      ? "bg-forest-900 text-cream-50"
                      : "text-forest-900/70 hover:bg-cream-200 hover:text-forest-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/customize" className="btn-primary hidden h-11 px-5 py-0 text-xs uppercase tracking-wider md:inline-flex">
              Start digging
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex h-11 items-center gap-2 rounded-full border-2 border-forest-900/15 bg-cream-50/80 px-4 text-sm font-extrabold text-forest-900 transition-colors hover:border-forest-900/30 hover:bg-cream-50"
              aria-label={`Open cart${hydrated && count > 0 ? `, ${count} items` : ""}`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <path d="M4 8h16l-1.5 11.2a2 2 0 0 1-2 1.8H7.5a2 2 0 0 1-2-1.8L4 8Z" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              <span
                className={`grid min-w-5 place-items-center rounded-full px-1 text-[11px] font-extrabold leading-5 ${
                  hydrated && count > 0 ? "bg-clay-500 text-cream-50" : "bg-forest-900/10 text-forest-900/60"
                }`}
                aria-hidden="true"
              >
                {hydrated ? count : 0}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-forest-900/15 bg-cream-50/80 text-forest-900 lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-forest-900/10 bg-cream-100/95 backdrop-blur-xl lg:hidden"
            >
              <div className="container-x flex flex-col gap-1 py-4">
                {LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-2xl px-4 py-3 text-base font-extrabold ${
                      pathname === link.href ? "bg-forest-900 text-cream-50" : "text-forest-900 hover:bg-cream-200"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/customize" className="btn-primary mt-2">
                  Start digging
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
