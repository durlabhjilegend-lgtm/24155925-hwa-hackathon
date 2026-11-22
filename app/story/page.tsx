import type { Metadata } from "next";
import Link from "next/link";
import { StoryMode } from "@/components/home/StoryMode";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "A dog's day",
  description:
    "An interactive story of one day with WILDNEST, told from 18 cm off the floor. The smells, the digs, the slow feast and the evening den.",
};

const NOTES = [
  {
    title: "The morning smell",
    body: "Scent pods aren't decoration. A dog maps a room with its nose first, so forest air tells the brain something worth exploring is nearby.",
  },
  {
    title: "The midday dig",
    body: "Pressure is the reward trigger. The mat doesn't dispense on a timer, so the dog's own paws control the pace — dig, pause, sniff, dig again.",
  },
  {
    title: "The evening den",
    body: "After the work comes the flop. The same buds that reward digging are soft enough to sleep on, which is why the meadow stays on the floor.",
  },
];

export default function StoryPage() {
  return (
    <>
      <section className="pb-10 pt-10 sm:pt-14">
        <div className="container-x">
          <nav className="flex items-center gap-2 text-xs font-bold text-forest-900/45" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-forest-900">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-forest-900/70">A dog&apos;s day</span>
          </nav>
          <div className="mt-5 max-w-3xl">
            <p className="chip">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-clay-500" aria-hidden="true" />
              Interactive story · 4 scenes
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] sm:text-6xl">
              One day, 18 cm off the floor.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-forest-900/68 sm:text-lg">
              We designed WILDNEST from a dog&apos;s point of view: what a room smells like,
              what a paw expects to find, and what &ldquo;going outside&rdquo; means when the door
              stays closed. Tap through the day below.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-x">
          <Reveal>
            <StoryMode />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-forest-900/10 bg-cream-200/40 py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Behind the scenes"
              title="What the story is really saying."
              description="Every scene maps to a design decision. Nothing is random — not the bud height, not the tray seal, not the scent."
            />
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {NOTES.map((note, index) => (
              <Reveal key={note.title} delay={index * 0.06}>
                <div className="card h-full p-6">
                  <p className="font-display text-3xl font-extrabold text-clay-500">0{index + 1}</p>
                  <h3 className="mt-2 font-display text-xl font-extrabold">{note.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-900/62">{note.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-9 flex flex-col items-center justify-between gap-4 rounded-3xl bg-forest-900 px-6 py-7 text-cream-50 sm:flex-row">
            <div>
              <p className="font-display text-2xl font-extrabold">Want this day to be your dog&apos;s?</p>
              <p className="mt-1 text-sm text-cream-200/70">
                Build a meadow, add forest air, and let the paws take it from there.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/customize" className="btn-light">Build your meadow</Link>
              <Link href="/shop" className="btn border-2 border-cream-100/25 text-cream-50 hover:bg-cream-100/10">
                Shop the collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
