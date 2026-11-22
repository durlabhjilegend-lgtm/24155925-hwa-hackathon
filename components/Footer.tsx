import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { Dog } from "@/components/art/Dog";

const SHOP_LINKS = [
  { href: "/shop", label: "All products" },
  { href: "/shop?kind=mat", label: "Dig mats" },
  { href: "/shop?kind=chew", label: "Chew toys" },
  { href: "/shop?kind=puzzle", label: "Puzzle games" },
  { href: "/shop?kind=scent", label: "Outdoor scent" },
];

const LEARN_LINKS = [
  { href: "/product#how", label: "How it works" },
  { href: "/story", label: "A dog's day" },
  { href: "/customize", label: "Customize your playzone" },
  { href: "/build", label: "Build a kit" },
  { href: "/product#dimensions", label: "Sizes & dimensions" },
];

const HELP_LINKS = [
  { href: "/product#faq", label: "FAQ" },
  { href: "/product#care", label: "Cleaning & care" },
  { href: "/product#shipping", label: "Shipping & returns" },
  { href: "mailto:hello@wildnest.studio?subject=WILDNEST%20question", label: "hello@wildnest.studio" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden rounded-t-[2.5rem] bg-forest-950 text-cream-100 sm:rounded-t-[3.5rem]">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-forest-700/30 blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-moss-500/10 blur-3xl" aria-hidden="true" />

      <div className="container-x relative py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-11 w-11" />
              <span className="font-display text-2xl font-extrabold tracking-tight text-cream-50">
                WILD<span className="text-moss-300">NEST</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-200/75">
              An indoor meadow for dogs who were born to dig. Pressure-activated kibble,
              forest air and a place to be wild without leaving home.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Dog pose="sit" className="h-24 w-24 opacity-90" />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss-300/80">
                Made for
                <br />
                indoor wild ones
              </p>
            </div>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Learn" links={LEARN_LINKS} />
          <FooterColumn title="Help" links={HELP_LINKS} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream-100/10 pt-7 text-xs text-cream-200/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WILDNEST. Every dog deserves a patch of wild.</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-bold">
            <span>Pay on delivery</span>
            <span aria-hidden="true">·</span>
            <span>Instant order confirmation</span>
            <span aria-hidden="true">·</span>
            <span>Designed inside a living room</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-moss-300">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link href={link.href} className="text-sm font-semibold text-cream-100/75 transition-colors hover:text-cream-50">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
