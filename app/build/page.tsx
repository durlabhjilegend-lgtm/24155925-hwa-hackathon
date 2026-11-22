import type { Metadata } from "next";
import Link from "next/link";
import { PackageBuilder } from "@/components/builder/PackageBuilder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Build a kit",
  description:
    "Create a personalized WILDNEST package: choose a dig mat, chew toys, puzzle games and forest scent pods, then add the whole kit to your cart.",
};

export default function BuildPage() {
  return (
    <>
      <section className="pb-10 pt-10 sm:pt-14">
        <div className="container-x">
          <nav className="flex items-center gap-2 text-xs font-bold text-forest-900/45" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-forest-900">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-forest-900/70">Build a kit</span>
          </nav>
          <div className="mt-5 grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <SectionHeading
              eyebrow="Build a kit"
              title="One nest, filled your way."
              description="Start with the meadow, then add the chew toys, puzzle games and forest air your dog will actually use. The kit total updates as you build."
            />
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <span className="chip">Mix any toy + puzzle</span>
              <span className="chip">Edit in cart before checkout</span>
              <span className="chip">Pay on delivery</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-x">
          <Reveal>
            <PackageBuilder />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-forest-900/10 bg-cream-200/40 py-16">
        <div className="container-x">
          <SectionHeading
            eyebrow="A good kit"
            title="How to pack a nest that gets used."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Start with the dig",
                body: "The mat is the anchor. Pick a size that leaves room for a full-body dig and a flop afterwards.",
              },
              {
                title: "One mouth, one nose",
                body: "A chew for the mouth, a puzzle for the nose. Two or three extras is usually the sweet spot before toys start getting ignored.",
              },
              {
                title: "Finish with forest air",
                body: "A pod pack or the breeze dispenser turns the whole den into the trailhead the mat is pretending to be.",
              },
            ].map((item, index) => (
              <div key={item.title} className="card p-6">
                <p className="font-display text-3xl font-extrabold text-clay-500">0{index + 1}</p>
                <h3 className="mt-2 font-display text-xl font-extrabold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-900/62">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-forest-900/60">
            Prefer a completely custom mat?{" "}
            <Link href="/customize" className="font-extrabold text-forest-700 underline underline-offset-4">
              Build your playzone
            </Link>{" "}
            instead.
          </p>
        </div>
      </section>
    </>
  );
}
