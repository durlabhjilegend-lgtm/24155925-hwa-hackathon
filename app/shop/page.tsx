import type { Metadata } from "next";
import Link from "next/link";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Shop the meadow",
  description:
    "Dig mats, chew toys, puzzle games, forest scent pods and the WILDNEST breeze dispenser. Add pieces to your nest or build a whole kit.",
};

export default function ShopPage({ searchParams }: { searchParams?: { kind?: string | string[] } }) {
  const kind = typeof searchParams?.kind === "string" ? searchParams.kind : undefined;

  return (
    <>
      <section className="pb-8 pt-10 sm:pt-14">
        <div className="container-x">
          <nav className="flex items-center gap-2 text-xs font-bold text-forest-900/45" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-forest-900">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-forest-900/70">Shop</span>
          </nav>
          <div className="mt-5 grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <SectionHeading
              eyebrow="The meadow shop"
              title="Everything for a wild indoor den."
              description="Start with a meadow or browse the chew toys, puzzle games and forest air that make it a whole world. Everything can be added to one nest."
            />
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <span className="chip">Free shipping over $120</span>
              <span className="chip">30-day happy-dig guarantee</span>
              <span className="chip">Pay on delivery</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x">
          <ShopGrid initialKind={kind} />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Made for paws, not teeth",
              body: "Soft food-grade silicone buds are for digging; the chew toys are for chewing. The shop keeps the two jobs separate.",
            },
            {
              title: "Everything fits one nest",
              body: "Toys, puzzles and pods all sit beside the mat. The Classic Wild tray even has room for a folded scent sachet.",
            },
            {
              title: "Build it your way",
              body: "Use the kit builder to bundle a mat with your dog's favourites, then adjust quantities in the cart.",
            },
          ].map((item) => (
            <div key={item.title} className="card p-5">
              <h3 className="font-display text-lg font-extrabold">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-forest-900/60">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
