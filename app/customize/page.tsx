import type { Metadata } from "next";
import Link from "next/link";
import { PlayzoneCustomizer } from "@/components/customizer/PlayzoneCustomizer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Customize your playzone",
  description:
    "Pick the footprint, bud pattern, colour, forest scent and add-ons for your own WILDNEST indoor playzone. See the price update live.",
};

export default function CustomizePage() {
  return (
    <>
      <section className="pb-10 pt-10 sm:pt-14">
        <div className="container-x">
          <nav className="flex items-center gap-2 text-xs font-bold text-forest-900/45" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-forest-900">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-forest-900/70">Customize</span>
          </nav>
          <div className="mt-5 grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <SectionHeading
              eyebrow="Customize your playzone"
              title="Build a meadow that fits the den."
              description="Choose the footprint for your room, how the grass grows, the colour of the buds and the forest scent. Add a chew or puzzle kit if the nose needs more to do."
            />
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <span className="chip">Estimated dimensions shown</span>
              <span className="chip">Free shipping over $120</span>
              <span className="chip">30-day happy-dig guarantee</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-x">
          <Reveal>
            <PlayzoneCustomizer />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-forest-900/10 bg-cream-200/40 py-16">
        <div className="container-x grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Built to your configuration",
              body: "The size, pattern, colour and scent you choose are locked into the order line, so the studio knows exactly which meadow to pack.",
            },
            {
              title: "Scent pods included",
              body: "Any playzone with a scent selected ships with three matching pods. Prefer a neutral room? Choose no pods — the mat works the same.",
            },
            {
              title: "Sizes are estimates",
              body: "Final dimensions may shift by a few millimetres between prototype and production. If you're between sizes, go up when the room allows.",
            },
          ].map((item) => (
            <div key={item.title} className="card p-5">
              <h3 className="font-display text-lg font-extrabold">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-forest-900/62">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
